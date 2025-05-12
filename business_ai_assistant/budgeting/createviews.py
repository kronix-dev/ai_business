from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

from budgeting.models import RevenueCategory,ExpensesCategory,Revenues,Budget,BudgetCategory, BudgetItem,Variance,RevenueForecast,Expenses

class AddRevenue(APIView):
    def post(self,request):
        status = 0
        message = ''

        try:
            rev = Revenues(
                     amount=request.data['amount'],
                     description=request.data['description'],
                     status= "active",
                     user = request.user,
                     revenue_category = RevenueCategory.objects.get(id=request.data['category']),
                     )
            rev.save()
            message = 'Revenue added successfully'
        except Exception as e:
            message = str(e)
        return Response({
            'status': status,
            'message':message,
        })

class AddExpenditure(APIView):
    def post(self,request):
        status = 0
        message = ''

        try:
            rev = Expenses(
                     amount=request.data['amount'],
                     description=request.data['description'],
                     status= "active",
                     user= request.user,
                     expense_category = ExpensesCategory.objects.get(id=request.data['category']),
                     )
            rev.save()
            message = 'Expenditure recorded successfully'
        except Exception as e:
            message = str(e)
        return Response({
            'status': status,
            'message':message,
        })

class AddBudgetView(APIView):
    def post(self,request):
        status = 0
        message = ''

        try:
            rev = Budget(
                     name=request.data['name'],
                     start_date=request.data['start_date'],
                     end_date=request.data['end_date'],
                     )
            rev.save()
            for i in request.data['budget_items']:
                bi = BudgetItem(budget = rev, 
                                category= BudgetCategory.objects.get(id=i['category']),
                                amount = i['amount'],
                                description = i['description']
                                )
                bi.save()
            message = 'Budget created successfully'
        except Exception as e:
            message = str(e)
        return Response({
            'status': status,
            'message':message,
        })

class AddRevenueCategory(APIView):
    def post(self, request):
        status = 0
        message = ""
        try:
            rev = RevenueCategory(
                name=request.data['name']
            )
            rev.save()
        except Exception as e:
            message = str(e)
        return Response({
            'message': message,
            'status':status
        })