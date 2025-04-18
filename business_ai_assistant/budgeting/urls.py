from django.contrib import admin
from django.urls import path
from budgeting import createviews, readviews

urlpatterns = [
    path("addRevenue", createviews.AddRevenue.as_view()),
    path("addExpenditure", createviews.AddExpenditure.as_view()),
    path("addBudget", createviews.AddBudgetView.as_view()),
    path("addRevenueCategory", createviews.AddRevenueCategory.as_view()),
    path("listRevenues",readviews.RevenueListView.as_view()),
    path("listExpenses",readviews.ExpenseListView.as_view()),
    path("listBudgets",readviews.BudgetListView.as_view()),
    path("getExpenseCategories",readviews.ExpenseCategoryListView.as_view()),
    path("getRevenueCategories",readviews.RevenueCategoryListView.as_view()),
    path("getBudgetCategories",readviews.BudgetCategoryListView.as_view())
]
