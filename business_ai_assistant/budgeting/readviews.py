from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.serializers import serialize
from budgeting.serializers import RevenuCatSerializer
from budgeting.models import (
    RevenueCategory,
    ExpensesCategory,
    Revenues,
    Expenses,
    Budget,
    BudgetCategory,
    BudgetItem,
    Variance,
    RevenueForecast,
)


class RevenueListView(APIView):
    def get(self, request):
        status = 0
        message = "ok"
        data = []
        try:
            for i in Revenues.objects.filter(user=request.user):
                data.append(
                    {
                        "category": i.revenue_category.name,
                        "amount": i.amount,
                        "description": i.description,
                        "id": i.id,
                    }
                )
        except Exception as e:
            message = str(e)

        return Response({"data": data, "message": message, "status": status})


class RevenueCategoryListView(APIView):
    def get(self, request):
        status = 0
        message = "ok"
        data = []
        try:
            for i in RevenueCategory.objects.all():
                data.append({"id": i.id, "name": i.name})
        except Exception as e:
            message = str(e)

        return Response({"data": data, "message": message, "status": status})


class ExpenseListView(APIView):
    def get(self, request):
        status = 0
        message = "ok"
        data = []
        try:
            for i in Expenses.objects.filter(user=request.user):
                data.append(
                    {
                        "category": i.expense_category.name,
                        "amount": i.amount,
                        "description": i.description,
                        "id": i.id,
                    }
                )
        except Exception as e:
            message = str(e)

        return Response({"data": data, "message": message, "status": status})


class ExpenseCategoryListView(APIView):
    def get(self, request):
        status = 0
        message = "ok"
        data = []
        try:
            for i in ExpensesCategory.objects.all():
                data.append({"id": i.id, "name": i.name})
        except Exception as e:
            message = str(e)

        return Response({"data": data, "message": message, "status": status})


class BudgetListView(APIView):
    def get(self, request):
        status = 0
        message = "ok"
        budgt = []
        try:
            for i in Budget.objects.filter(created_by=request.user):
                p = {}
                p["id"] = i.id
                p["name"] = i.name
                p["start_date"] = i.start_date
                p["end_date"] = i.end_date
                p["items"] = []
                p["suggestion_items"] = []
                for b in BudgetItem.objects.filter(budget=i, type="user_input"):
                    p["items"].append(
                        {
                            "category": b.category,
                            "amount": b.amount,
                            "description": b.description,
                        }
                    )
                for b in BudgetItem.objects.filter(budget=i, type="ai_suggestion"):
                    p["suggestion_items"].append(
                        {
                            "category": b.category,
                            "amount": b.amount,
                            "description": b.description,
                        }
                    )
                budgt.append(p)
        except Exception as e:
            message = str(e)

        return Response({"data": budgt, "message": message, "status": status})


class BudgetCategoryListView(APIView):
    def get(self, request):
        status = 0
        message = "ok"
        data = []
        try:
            for i in BudgetCategory.objects.all():
                data.append({"id": i.id, "name": i.name})
        except Exception as e:
            message = str(e)

        return Response({"data": data, "message": message, "status": status})


class BusinessDashboard(APIView):
    def get(self, request):
        status = True
        message = ""
        data = {}
        try:
            data = {
                "monthlyExpenses": getMonthlyExpenses(request.user),
                "allExpenses": getAllExpenses(request.user),
                "monthlySales": getMonthlyExpenses(request.user),
                "allSales": getAllSales(request.user),
            }
        except Exception as e:
            message = str(e)
            status = False
        return Response({"data": data, "status": status, "message": message})


def getMonthSales(business):
    data = 0
    for i in Revenues.objects.filter(user=business):
        data = data + i.amount

    return data


def getAllSales(business):
    data = 0
    for i in Revenues.objects.filter(user=business):
        data = data + i.amount

    return data


def getAllExpenses(business):
    data = 0
    for i in Expenses.objects.filter(user=business):
        data = data + i.amount

    return data


def getMonthlyExpenses(business):
    data = 0
    for i in Expenses.objects.filter(user=business):
        data = data + i.amount

    return data


def getCurrentBudgetText(user):
    i = 1
    b = Budget.objects.filter(created_by=user).last()
    p = []
    p["items"] = []
    for b in BudgetItem.objects.filter(budget=i, type="user_input"):
        p["items"].append(
            {
                "category": b.category.name,
                "amount": b.amount,
                "description": b.description,
            }
        )
    for b in BudgetItem.objects.filter(budget=i, type="user_input"):
        p["suggestion_items"].append(
            {
                "category": b.category.name,
                "amount": b.amount,
                "description": b.description,
            }
        )
    return p
