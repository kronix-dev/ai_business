from django.shortcuts import render
from django.contrib.auth.models import Group
from rest_framework.response import Response
from rest_framework.views import APIView

from app.models import AppUser

class UserDetails(APIView):
    def get(self,request):
        status = False
        message = 'ok'
        data = {}
        # user = User.objects.get(username=request.user.username)
        try:
            appuser = AppUser.objects.filter(user=request.user.id).first()
            data['username'] =  request.user.username
            data['fname'] = request.user.first_name
            data['lname'] = request.user.last_name
            data['email'] = request.user.email
            data['phone'] = appuser.phone_number
            data['profile'] = appuser.profile_photo,
            data['address']= appuser.address,
            data['group']= Group.objects.filter(id=appuser.group.id).first().name,
            status = True
        except Exception as e:
            message = str(e)

        return Response({
            'message':message,
            'data':data,
            'status':status
        })