from django.contrib import admin

# Register your models here.
from budgeting.models import RevenueCategory,ExpensesCategory,RevenueForecast,BudgetCategory,Budget,Expenses, Revenues,BudgetItem

@admin.register(RevenueCategory)
class RevenueCatAdmin(admin.ModelAdmin):
    list_display = ['id','name']

@admin.register(ExpensesCategory)
class ExpensesCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

@admin.register(Expenses)
class ExpensesAdmin(admin.ModelAdmin):
    list_display = ['id', 'description','user']

@admin.register(Revenues)
class RevenuesAdmin(admin.ModelAdmin):
    list_display = ['id', 'description','user']
    

@admin.register(BudgetCategory)
class BudgetCategoryAdmin(admin.ModelAdmin):
    list_display = ['id','name']

@admin.register(RevenueForecast)
class RevenueForecastAdmin(admin.ModelAdmin):
    list_display = ['id', 'budget', 'amount','description','date']

@admin.register(Budget)
class BudgetView(admin.ModelAdmin):
    list_display= ['id','name']
    
@admin.register(BudgetItem)
class BudgetItem(admin.ModelAdmin):
    list_display= ['id','description']
