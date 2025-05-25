"""
URL configuration for business_ai_assistant project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from app.createviews import SignUpView, UpdateRoleView, UpdatePassword
from app.readviews import UserDetails

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/signup", SignUpView.as_view(), name="signup"),
    path("api/auth/changePassword", UpdatePassword.as_view(), name="update_password"),
    path("api/auth/updateRole", UpdateRoleView.as_view(), name="update_role"),
    path("api/auth/user", UserDetails.as_view(), name="getUser"),
    path("api/budgeting/", include("budgeting.urls")),
    path("api/base/", include("base.urls")),
    path("api/forum/", include("forum.urls")),
    path("api/mentorship/", include("mentorship.urls")),
    path("api/elearning/", include("elearning.urls")),
    path("api/messaging/",include("chat.urls")),
    path("api/ai/",include("ai.urls"))
]
