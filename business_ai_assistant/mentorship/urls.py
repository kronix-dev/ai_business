from django.contrib import admin
from django.urls import path

from mentorship import readviews, createviews

urlpatterns = [
    path("findMentor", readviews.FindMentor.as_view()),
    path("createProfile", createviews.CreateProfile.as_view()),
    path("getProfile", readviews.GetMyProfileView.as_view()),
    path("getMentorshipRequest", readviews.GetMatchRequests.as_view()),
    path("sendRequest", createviews.MatchMentor().as_view()),
    path("acceptRequest", createviews.AcceptMentorship().as_view()),
    path("myMentors", readviews.GetMyMentors().as_view()),
]
