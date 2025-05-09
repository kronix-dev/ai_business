# Generated by Django 5.2 on 2025-04-28 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentorship', '0008_alter_mentorprofile_skills'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentorprofile',
            name='availability',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='mentorprofile',
            name='industry_expertise',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='mentorprofile',
            name='mentorship_areas',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='mentorprofile',
            name='qualifications',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='mentorprofile',
            name='skills',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
