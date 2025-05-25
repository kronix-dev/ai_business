from django.contrib import admin

# Register your models here.
from .models import Message

@admin.register(Message)
class MessageAdmn(admin.ModelAdmin):
    list_display =["message","compact_id"]