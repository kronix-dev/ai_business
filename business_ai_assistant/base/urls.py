from django.contrib import admin
from django.urls import path

from base import createviews, readviews

urlpatterns = [
    path("addProfile", createviews.CreateBusinessProfile.as_view()),
    path("getProfile",readviews.BusinessProfile.as_view()),
    path("listIndustries", readviews.BusinessCatList.as_view())
]
