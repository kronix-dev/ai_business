from rest_framework import serializers
from budgeting.models import RevenueCategory,Revenues,Expenses,ExpensesCategory
class RevenuCatSerializer(serializers.ModelSerializer):
    class Meta:
        model =  RevenueCategory
        fields = ['id','name']
        
class ExpenseCatSerializer(serializers.ModelSerializer):
    class Meta:
        model =  ExpensesCategory
        fields = ['id','name']