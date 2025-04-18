from django.db import models
from django.contrib.auth.models import User

class TopicCategory(models.Model):
    name = models.TextField()
    def __str__(self):
        return self.name

class Topic(models.Model):
    title = models.TextField()
    description = models.TextField()
    likes = models.IntegerField(default=0)
    category = models.ForeignKey(TopicCategory, on_delete= models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at= models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title
    
class Comment(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    comment = models.TextField()
    likes = models.IntegerField(default=0)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.comment
    
