from django.contrib import admin
from django.urls import path

from .views import CreateMaterial, ReadMaterial, ReadMyMaterials


urlpatterns = [
    path("materials/create", CreateMaterial.as_view()),
    path("materials/list", ReadMaterial.as_view()),
    path("materials/listMine", ReadMyMaterials.as_view()),
]
