from django.contrib.auth.models import User, Group
from app.models import AppUser
from rest_framework.views import APIView
from rest_framework.response import Response

class SignUpView(APIView):
    def post(self, request):
        status = False
        message = 'ok'
        req = request.data
        try:
            user = User.objects.create_user(username=req['email'],
                                             email=req['email'],
                                             first_name=req['fname'],
                                             last_name=req['lname'],
                                             password=req['password'],
                                             
                                             )
            user.groups.set([Group.objects.get(name="default")])
            appuser = AppUser(user=user,
                              group= Group.objects.get(name="default"))
            appuser.save()
            status = True
        except Exception as e:
            message = str(e)
        return Response({
            'message':message,
            'status': status,
        })
        
class UpdateRoleView(APIView):
    def post(self, request):
        status = True
        message = 'ok'
        req = request.data
        try:
            user = User.objects.get(id=request.user.id)
            user.groups.set([Group.objects.get(name=req['role'])])
            user.save()
        except Exception as e:
            message = str(e)
            status= False
        
        return Response({
            'message':message,
            'status':status
        })
            