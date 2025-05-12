from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
import json
from types import SimpleNamespace
from ai.ai_api import mentorMatching
from mentorship.models import MentorProfile, Match

from base.models import BusinessOwnerProfile


class FindMentor(APIView):
    def post(self, request):
        rq = request.data
        mentorString = ""
        status = True
        match = []
        message = ""
        mentor = []
        res = []
        criteria = ""
        mat_Res = ""
        try:
            mentors = MentorProfile.objects.all()
            for i in mentors:
                mestr = "id: " + str(i.id)
                mestr += "name: " + i.user.first_name + " " + i.user.last_name + ","
                mestr += "industry: " + ",".join(i.industry_expertise) + ","
                mestr += "skills: " + ",".join(i.skills) + ","
                mestr += "experience: " + str(i.past_mentorship_experience) + ", "
                mestr += "qualifications: " + ",".join(i.qualifications) + ". "
                mentorString += mestr
            criteria = "skills of the mentor: " + ",".join(rq["skills"]) + "."
            criteria += "Experience : " + rq["experience"] + "."
            criteria += "qualifications : " + ",".join(rq["qualifications"]) + "."
            criteria += "industry : " + rq["industry"] + "."
            criteria += "other criteriass : " + ". \n"
            mat_Res = mentorMatching(criteria, mentorString)

            match = json.loads(mat_Res)
            for i in match:
                men = getMentor(MentorProfile.objects.get(id=i["mentor_id"]))
                mentor = {
                    "mentor": men,
                    "reason": i["reason"],
                    "score": i["score"],
                }
                res.append(mentor)

        except Exception as e:
            message = str(e)
            status = False

        return Response(
            {
                "data": res,
                "status": status,
                "message": message,
                "mlResponse": mat_Res,
                "mentorString": criteria,
            }
        )


class GetMyProfileView(APIView):
    def get(self, request):
        status = True
        message = "ok"
        pf = []
        try:
            pf = getMentor(
                MentorProfile.objects.get(
                    user=request.user,
                )
            )
        except Exception as e:
            message = str(e)
            status = False
        return Response({"hasProfile": status, "message": message, "data": pf})


class GetMatchRequests(APIView):
    def get(self, request):
        status = True
        message = "ok"
        pf = {}
        data = []
        try:
            pf = Match.objects.filter(
                mentor=MentorProfile.objects.get(user=request.user), has_acted=False
            )
            for i in pf:
                data.append(
                    {
                        "business_name": i.owner.business_name,
                        "match_id": i.id,
                    }
                )
        except Exception as e:
            message = str(e)
            status = False
        return Response({"status": status, "message": message, "data": data})


class GetMyMentors(APIView):
    def get(self, request):
        status = True
        message = "ok"

        data = []
        try:
            pf = Match.objects.filter(
                mentor=Match.objects.get(
                    owner=BusinessOwnerProfile.objects.get(user=request.user)
                ),
                has_acted=True,
                is_accepted=True,
            )
            for i in pf:
                data.append(getMentor(i.mentor))
        except Exception as e:
            message = str(e)
            status = False
        return Response({"hasProfile": status, "message": message, "data": data})


def getMentor(p):
    pf = {}
    pf["bio"] = p.bio
    pf["availability"] = p.availability
    pf["area_expert"] = p.mentorship_areas
    pf["industry"] = p.industry_expertise
    pf["skills"] = p.skills
    pf["qualifications"] = p.qualifications
    pf["experience"] = p.past_mentorship_experience
    pf["fname"] = p.user.first_name
    pf["lname"] = p.user.last_name
    pf["id"] =p.id
    return pf
