# Generated by Django 5.2.1 on 2025-05-26 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='suggestion',
            name='title',
            field=models.CharField(blank=True, default=None, null=True),
        ),
    ]
