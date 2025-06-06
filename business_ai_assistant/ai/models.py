from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Suggestion(models.Model):
    description = models.TextField()
    title = models.CharField(default=None, blank=True, null = True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)