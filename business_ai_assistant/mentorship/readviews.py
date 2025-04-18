from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
import json
from types import SimpleNamespace
from ai.ai_api import mentorMatching
from mentorship.models import MentorProfile
class FindMentor(APIView):
    def post(self,request):
        rq = request.data
        mentorString = ''
        status=True
        match = []
        message = ''
        
        
        try:
            mentors = MentorProfile.objects.all()
            
            for i in mentors:
                mestr = 'id: '+ i.id
                mestr += 'name: '+ i.user.first_name +' '+i.user.last_name+',\n'
                mestr += 'industry: '+ i.industry_expertise+',\n'
                mestr += 'skills: '+ ",".join(json.loads(i.skills,object_hook=lambda d: SimpleNamespace(**d)))+',\n'
                mestr += 'experience: '+ i.past_mentorship_experience+',\n'
                mestr += 'qualifications: '+ i.qualifications+'.\n'
                
                mentorString += mestr
            
            
            criteria = "skills of the mentor: " + ",".join(rq['skills']) +', \n'
            criteria += +"Experience : " + ",".join(rq['experience']) + ', \n'
            criteria += +"qualifications : " + ",".join(rq['qualifications']) + ', \n'
            criteria += +"industry : " + ",".join(rq['qualifications']) + '. \n'
            criteria += +"other criteriass : " + ",".join(rq['other_criteria']) + '. \n'
            
            match  = mentorMatching(criteria,mentorString)
        except Exception as e:
            message = str(e)
            status = False
            
        return Response({
            'data': match,
            'status': status,
            'message': message
        })

class GetMyProfileView(APIView):
    def get(self,request):
        status = True
        message = 'ok'
        pf = {}
        try:
            p = MentorProfile.objects.get(user= request.user)
            pf['bio'] = p.bio
            pf['availability'] = p.availability
            pf['area_expert'] = p.mentorship_areas
            pf['industry'] = p.industry_expertise
            pf['skills'] = p.skills
            pf['qualifications'] = p.qualifications
            pf['experience'] = p.past_mentorship_experience
            
        except Exception as e:
            message = str(e)
            status = False
        return Response({
            'hasProfile': status,
            'message': message,
            'data': pf
        })