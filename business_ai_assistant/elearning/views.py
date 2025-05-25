from django.shortcuts import render
from .models import Material
from app.filemanager import base642file, file2base64
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class CreateMaterial(APIView):
    def post(self, request):
        req = request.data
        message = "Ok"
        status = True
        try:
            m = Material(
                file=base642file(req["file"]),
                title=req["name"],
                description=req["description"],
                created_by=request.user,
            )
            m.save()
        except Exception as e:
            message = str(e)
            status = False

        return Response({"message": message, "status": status})


class ReadMaterial(APIView):
    def get(self, request):
        message = "Ok"
        status = True
        data = []
        try:
            g = Material.objects.all()
            for e in g:
                data.append(
                    {
                        "id": e.id,
                        "file": file2base64(e.file.path),
                        "title": e.title,
                        "description": e.description,
                    }
                )
        except Exception as e:
            message = str(e)
            status = False

        return Response({"data": data, "status": status, "message": message})


class ReadMyMaterials(APIView):
    def get(self, request):
        message = "ok"
        status = True
        data = []

        try:
            g = Material.objects.filter(created_by=request.user)
            for e in g:
                data.append(
                    {
                        "id": e.id,
                        "file": file2base64(e.file.path),
                        "title": e.title,
                        "fileUrl": e.file.url,
                        "description": e.description,
                    }
                )
        except Exception as e:
            message = str(e)
            status = False

        return Response({"data": data, "status": status, "message": message})
