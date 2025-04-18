from django.db import models
from django.contrib.auth.models import User, Group, Permission

# Create your models here.
class AppUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.Case, related_name='user_profile')
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255,null=True, blank=True)
    profile_photo = models.CharField(max_length=255,null=True, blank=True)