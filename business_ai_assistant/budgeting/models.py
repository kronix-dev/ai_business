from django.db import models
from django.contrib.auth.models import User
from django_currentuser.db.models import CurrentUserField


class ExpensesCategory(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class RevenueCategory(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Expenses(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    expense_category = models.ForeignKey(ExpensesCategory, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.expense_category.name} - {self.amount}"


class Revenues(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    revenue_category = models.ForeignKey(RevenueCategory, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.revenue_category.name} - {self.amount}"


class Budget(models.Model):
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    created_by = CurrentUserField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class BudgetCategory(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class BudgetItem(models.Model):
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    category = models.CharField()
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    type = models.CharField(
        choices=[("ai_suggesstion", "Ai Suggestion"), ("user_input", "User input")],
        default="user_input",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.category.name} - {self.amount}"


class Variance(models.Model):
    budget_item = models.ForeignKey(BudgetItem, on_delete=models.CASCADE)
    expense = models.DecimalField(
        max_digits=15, decimal_places=2, null=True, blank=True
    )
    revenue = models.DecimalField(
        max_digits=15, decimal_places=2, null=True, blank=True
    )
    variance_amount = models.DecimalField(max_digits=15, decimal_places=2)
    date = models.DateField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Variance - {self.date} - {self.variance_amount}"


class RevenueForecast(models.Model):
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    date = models.DateField()
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Revenue - {self.date} - {self.amount}"
