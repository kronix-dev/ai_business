from django.contrib import admin
from django.urls import path
from .views import GetSuggestions

urlpatterns = [path("getSuggestions", GetSuggestions.as_view())]
