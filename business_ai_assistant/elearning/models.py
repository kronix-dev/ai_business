from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Material(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    file_path = models.TextField(blank=True, null=True)
    file_type = models.TextField(blank=True, null=True)
    title =models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creator')
    description = models.TextField()
    
