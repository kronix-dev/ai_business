from django.db import models
from django.contrib.auth.models import User, Group, Permission


class BusinessCategory(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name
    
class BusinessOwnerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='owner_profile')
    business_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    mentor_industry = models.CharField(max_length=255,blank=True, null=True)
    business_stage = models.CharField(max_length=255)  # e.g., startup, growth, established
    business_size = models.CharField(max_length=255)
    revenue = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    other_areas = models.TextField(blank=True, null=True)  # Comma-separated or JSON list
    goals = models.TextField()
    personality_traits = models.TextField(blank=True, null=True) #could be a JSON field.
    preferred_mentor_characteristics = models.TextField(blank=True, null=True)
    mentorship_areas = models.TextField(blank=True, null=True)  # Comma-separated or JSON list
    skills = models.TextField(blank=True, null=True)
    qualifications = models.TextField(blank=True, null=True) #could be a JSON field.
    # users = models.ManyToManyField(User,blank=True)
    def __str__(self):
        return self.business_name


class DefinedGoals(models.Model):
    name = models.TextField(max_length=255)
    
    def __str__(self):
        return self.name
    
