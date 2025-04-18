from django.contrib import admin
from django.urls import path

from mentorship import  readviews,createviews

urlpatterns = [
    path("findMentor", readviews.FindMentor.as_view()),
    path("createProfile", createviews.CreateProfile.as_view()),
    path('getProfile', readviews.GetMyProfileView.as_view())
]