from django.contrib import admin

# Register your models here.
from forum.models import Topic, TopicCategory, Comment

@admin.register(Topic)
class TopAdmin(admin.ModelAdmin):
    list_display = ['id','title']
    
@admin.register(TopicCategory)
class TopicCat(admin.ModelAdmin):
    list_display = ['id','name']
    
@admin.register(Comment)
class MentorProfileAdmin(admin.ModelAdmin):
    list_display = ['id','topic', 'comment']