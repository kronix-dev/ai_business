from django.shortcuts import render
from django.utils import timezone
from datetime import timedelta

# Create your views here.
from .models import Suggestion
from app.filemanager import base642file, file2base64
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User
from .ai_api import overallBusinessAssistance, budgetAssistance
from budgeting.readviews import (
    getAllExpenses,
    getAllSales,
    getMonthSales,
    getMonthlyExpenses,
    getCurrentBudgetText,
)


class GetSuggestions(APIView):
    def get(self, request):
        status = True
        message = ""
        data = []
        u = request.user
        sev = timezone.now() - timedelta(days=7)
        l = Suggestion.objects.filter(Q(user=request.user) & Q(created_at__gte=sev))
        if len(l) < 1 and getMonthSales(u) > 0 and getMonthlyExpenses(u):
            d = overallBusinessAssistance(
                str(getCurrentBudgetText(u)), getMonthSales(u), getMonthlyExpenses(u)
            )
        d = Suggestion.objects.filter(user=request.user)
        for i in d:
            data.append({"description": i.description})
        return Response(
            {
                "data": data,
                "message": message,
            }
        )
