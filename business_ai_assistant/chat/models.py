from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_message')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_message')
    message = models.TextField()
    compact_id = models.CharField(default=None, null=True, blank=True)
    sent_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender.username} to {self.receiver.username}"