from django.contrib import admin
from app.models import AppUser


@admin.register(AppUser)
class AppUserAdmin(admin.ModelAdmin):
    list_display = ['user','group','phone_number',]
# Register your models here.
