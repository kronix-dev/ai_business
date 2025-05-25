from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

from forum.models import Topic, Comment, TopicCategory

class AddTopic(APIView):
    def post(self,request):
        status =False
        message = 'Success'
        data = request.data
        try:
            top = Topic(
                title = data['title'],
                description = data['description'],
                category  = TopicCategory.objects.get(id=data['category']),
                created_by = request.user
            )
            top.save()
            status = True
        except Exception as e:
            message = str(e)
            
        return Response({
            'message': message,
            'status': status
        })

class AddComments(APIView):
    def post(self, request):
        status = False
        message = 'Success'
        data = request.data
        
        try:
            com =  Comment(
                topic = Topic.objects.get(id=data['topic']),
                comment = data['comment'],
                created_by = request.user
            )
            com.save()
        except Exception as e:
            message = str(e)
            
        return Response({
            'message': message,
            'status': status
        })