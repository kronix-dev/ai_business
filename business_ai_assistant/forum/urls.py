from django.contrib import admin
from django.urls import path

from forum import createviews, readviews

urlpatterns = [
    path("getCategories", readviews.ReadCats.as_view()),
    path("getComments/<int:topic>", readviews.ReadComments.as_view()),
    path("getTopics", readviews.ReadTopics.as_view()),
    path("createTopic", createviews.AddTopic.as_view()),
    path("postComment", createviews.AddComments.as_view()),
    
]
