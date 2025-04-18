from django.contrib import admin
from django.urls import path

from forum import createviews, readviews

urlpatterns = [
    path("getTopicCategories", readviews.ReadCats.as_view()),
    path("getComments", readviews.ReadComments.as_view()),
    path("getTopics", readviews.ReadTopics.as_view()),
    path("createTopic", createviews.AddTopic.as_view()),
    path("createComment", createviews.AddComments.as_view())
]