# Generated by Django 5.2.1 on 2025-05-26 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budgeting', '0003_budgetitem_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budgetitem',
            name='category',
            field=models.CharField(),
        ),
    ]
