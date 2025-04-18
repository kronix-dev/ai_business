from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

from forum.models import Topic, Comment, TopicCategory

class ReadTopics(APIView):
    def get(self,request):
        status = True
        message = "success"
        data = []
        try:
            data = Topic.objects.all()
            
        except Exception as e:
            message= str(e)
            status = False
        return Response({
            'data': data,
            'message':message,
            'status':status
        })
        
class ReadComments(APIView):
    def get(self, request):
        status = True,
        message = 'successs'
        data = []
        
        try:
            data = Comment.objects.filter(topic = Topic.objects.get(id=request.data['topic']))
        except Exception as e:
            message= str(e)
            status = False
        return Response({
            'data': data,
            'message':message,
            'status':status
        })
        
class ReadCats(APIView):
    def get(self, request):
        status = True,
        message = 'successs'
        data = []
        try:
            data = TopicCategory.objects.all()
        except Exception as e:
            message= str(e)
            status = False
        return Response({
            'data': data,
            'message':message,
            'status':status
        })   