from django.db import models
from django.contrib.auth.models import User
from base.models import BusinessOwnerProfile


class MentorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mentor_profile')
    bio = models.TextField(blank=True, null=True)
    industry_expertise = models.JSONField(blank=True, null=True)
    mentorship_areas = models.JSONField(blank=True, null=True)
    availability = models.JSONField(blank=True, null=True) # e.g., days, times, weekly hours
    mentoring_style = models.TextField()
    past_mentorship_experience = models.TextField(blank=True, null=True)
    skills = models.JSONField(blank=True, null=True)
    personality_traits = models.TextField(blank=True, null=True) #could be a JSON field.
    qualifications = models.JSONField(blank=True, null=True)
    testimonials = models.TextField(blank=True, null=True)
    rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True) #if applicable
    created_at = models.DateTimeField(auto_now_add=True,blank=True, null=True)
    def __str__(self):
        return self.user.username

class Match(models.Model):
    owner = models.ForeignKey(BusinessOwnerProfile, on_delete=models.CASCADE, related_name='owner_matches')
    mentor = models.ForeignKey(MentorProfile, on_delete=models.CASCADE, related_name='mentor_matches')
    match_score = models.FloatField()
    reasons = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_accepted = models.BooleanField(default=False)
    has_acted = models.BooleanField(default=False)
    accepted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.owner.business_name} - {self.mentor.user.username}"

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender.username} to {self.receiver.username}"



class Feedback(models.Model):
    owner = models.ForeignKey(BusinessOwnerProfile, on_delete=models.CASCADE, related_name='owner_feedbacks')
    mentor = models.ForeignKey(MentorProfile, on_delete=models.CASCADE, related_name='mentor_feedbacks')
    rating = models.IntegerField()  # e.g., 1-5 stars
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.owner.business_name} - {self.mentor.user.username} - {self.rating}"

class Progress(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='progress')
    goal = models.TextField()
    progress = models.TextField()
    achieved =models.BooleanField(default=False)
    action_items = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.match}"

class Payment(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=255)
    transaction_id = models.CharField(max_length=255)
    status = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.match} - {self.amount}"