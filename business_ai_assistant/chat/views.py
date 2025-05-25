# Create your views here.
from django.shortcuts import render
from .models import Message
from app.filemanager import base642file, file2base64
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User


class SendMessage(APIView):
    def post(self, request):
        data = []
        status = True
        message = ""

        try:
            com = str(request.user.id) + str(request.data["userId"])
            m = Message(
                sender=request.user,
                compact_id=com,
                message=request.data["message"],
                receiver=User.objects.get(
                    id=request.data["userId"],
                ),
            )   
            m.save()
        except Exception as e:
            message = str(e)
            status = False

        return Response({"status": status, "data": data, "message": message})


class GetMessages(APIView):
    def get(self, request, **kwargs):
        data = []
        status = True
        message = ""

        try:
            con = str(request.user.id) + str(kwargs["userId"])
            conw = str(kwargs["userId"]) + str(request.user.id)
            d = Message.objects.filter(Q(compact_id__icontains=con) | Q(compact_id__icontains=conw))
            for i in d:
                data.append(
                    {"message": i.message, "isMine": i.sender.id == request.user.id}
                )
        except Exception as e:
            message = str(e.__notes__)
            status = False

        return Response({"status": status, "data": data, "message": message})
