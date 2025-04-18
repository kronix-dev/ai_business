from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

from base.models import BusinessOwnerProfile


class CreateBusinessProfile(APIView):
    def post(self, request):
        status =True
        message = ''
        dat =[]
        
        rd = request.data
        try:
            bp = BusinessOwnerProfile(
                business_name= rd['name'],
                user= request.user,
                revenue = rd['revenue'],
                business_size = rd['size'],
                goals =",".join(rd['goals']),
                industry =rd['industry'],
                business_stage =rd['stage']
                )
            bp.save()
            message = "Success"
        except Exception as e:
            message = str(e)
            status = False
        
        return Response({
            'status': status,
            'message': message
        })