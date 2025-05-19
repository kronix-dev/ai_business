from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

from forum.models import Topic, Comment, TopicCategory


class ReadTopics(APIView):
    def get(self, request):
        status = True
        message = "success"
        data = []
        try:
            for i in Topic.objects.all():
                data.append(
                    {"title": i.title, "description": i.description, "id": i.id}
                )

        except Exception as e:
            message = str(e)
            status = False
        return Response({"data": data, "message": message, "status": status})


class ReadComments(APIView):
    def get(self, request):
        status = (True,)
        message = "successs"
        data = []

        try:
            r = Comment.objects.filter(
                topic=Topic.objects.get(id=request.data["topic"])
            )
            for i in r:
                data.append(
                    {
                        "message": i.comment,
                        "commenter": i.created_by.first_name
                        + " "
                        + i.created_by.last_name,
                    }
                )
        except Exception as e:
            message = str(e)
            status = False
        return Response({"data": data, "message": message, "status": status})


class ReadCats(APIView):
    def get(self, request):
        status = (True,)
        message = "successs"
        data = []
        try:
            for i in TopicCategory.objects.all():
                data.append({"name": i.name, "id": i.id})

        except Exception as e:
            message = str(e)
            status = False
        return Response({"data": data, "message": message, "status": status})
