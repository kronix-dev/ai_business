from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

from budgeting.models import (
    RevenueCategory,
    ExpensesCategory,
    Revenues,
    Budget,
    BudgetCategory,
    BudgetItem,
    Variance,
    RevenueForecast,
    Expenses,
)
import json
from ai import ai_api


class AddRevenue(APIView):
    def post(self, request):
        status = 0
        message = ""

        try:
            rev = Revenues(
                amount=request.data["amount"],
                description=request.data["description"],
                status="active",
                user=request.user,
                revenue_category=RevenueCategory.objects.get(
                    id=request.data["category"]
                ),
            )
            rev.save()
            message = "Revenue added successfully"
        except Exception as e:
            message = str(e)
        return Response(
            {
                "status": status,
                "message": message,
            }
        )


class AddExpenditure(APIView):
    def post(self, request):
        status = 0
        message = ""

        try:
            rev = Expenses(
                amount=request.data["amount"],
                description=request.data["description"],
                status="active",
                user=request.user,
                expense_category=ExpensesCategory.objects.get(
                    id=request.data["category"]
                ),
            )
            rev.save()
            message = "Expenditure recorded successfully"
        except Exception as e:
            message = str(e)
        return Response(
            {
                "status": status,
                "message": message,
            }
        )


class AddBudgetView(APIView):
    def post(self, request):
        status = 0
        aisug ={}
        message = ""
        ik = ""
        try:
            rev = Budget(
                name=request.data["name"],
                start_date=request.data["start_date"],
                end_date=request.data["end_date"],
            )
            rev.save()
            revenue_total = 0
            expense_total = 0
            for i in Revenues.objects.all():
                revenue_total = revenue_total + i.amount

            for i in Expenses.objects.filter():
                expense_total = expense_total + i.amount

            j = 0
            buf = ""
            for i in request.data["budget_items"]:
                j = j + 1
                bi = BudgetItem(
                    budget=rev,
                    category=BudgetCategory.objects.get(id=i["category"]),
                    amount=i["amount"],
                    type="user_input",
                    description=i["description"],
                )

                bi.save()
                buf = (
                    buf
                    + str(j)
                    + ". Title: "
                    + BudgetCategory.objects.get(id=i["category"]).name
                    + ", Description: "
                    + i["description"]
                    + ", Amount "
                    + str(i["amount"])
                    + " TZS. "
                )
            ik = ai_api.budgetAssistance(buf, str(revenue_total), str(expense_total))
            aisug = json.loads(ik[0])

            for i in aisug:
                bi = BudgetItem(
                    budget=rev,
                    category=BudgetCategory.objects.get(name=i["title"]),
                    amount=i["amount"],
                    type="ai_suggestion",
                    description=i["suggestion"],
                )
            message = "Budget created successfully"
        except Exception as e:
            message = str(e)
        return Response(
            {"status": status, "message": message, "buf": buf, "res": ik, "sug": aisug}
        )


class AddRevenueCategory(APIView):
    def post(self, request):
        status = 0
        message = ""
        try:
            rev = RevenueCategory(name=request.data["name"])
            rev.save()
        except Exception as e:
            message = str(e)
        return Response({"message": message, "status": status})
