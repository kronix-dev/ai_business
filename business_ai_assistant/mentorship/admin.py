from django.contrib import admin

# Register your models here.
from mentorship.models import MentorProfile,Match, Feedback,Progress


@admin.register(MentorProfile)
class MentorProfileAdmin(admin.ModelAdmin):
    list_display = ['id','user','industry_expertise', 'rate']
    
@admin.register(Match)
class MentorProfileAdmin(admin.ModelAdmin):
    list_display = ['id','owner','mentor', 'has_acted','is_accepted']
