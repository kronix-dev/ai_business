from django.contrib import admin
from django.urls import path

from .views import SendMessage, GetMessages


urlpatterns = [
    path("getMessages/<int:userId>", GetMessages.as_view()),
    path("sendMessage", SendMessage.as_view()),
]
