from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
import json
from types import SimpleNamespace
from ai.ai_api import mentorMatching
from mentorship.models import MentorProfile

class CreateProfile(APIView):
    def post(self,request):
        req=request.data
        message = 'ok'
        status = True
        try:    
            mentor = MentorProfile(
                bio= req['bio'], 
                industry_expertise = req["industry"],
                availability = req['availability'],
                mentoring_style = "smooth",
                past_mentorship_experience = req['experience'],
                qualifications = req['qualifications'],
                mentorship_areas = req['area_expert'],
                user = request.user
                )
            mentor.save()
        except Exception as e:
            message = str(e)
            status = False
        
        return Response({
            'status': status,
            'message': message
        })