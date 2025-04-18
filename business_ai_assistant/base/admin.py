from django.contrib import admin

# Register your models here.
from base.models import DefinedGoals, BusinessOwnerProfile,BusinessCategory

@admin.register(DefinedGoals)
class DefinedGoalsAdmin(admin.ModelAdmin):
    list_display = ['id','name']

@admin.register(BusinessOwnerProfile)
class BusinessOwnerProfileAdmon(admin.ModelAdmin):
    list_display = ['id','business_name','industry','user']

@admin.register(BusinessCategory)
class BusinessCatAdmin(admin.ModelAdmin):
    list_display = ['id','name']