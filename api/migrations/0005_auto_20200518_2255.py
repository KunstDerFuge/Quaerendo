# Generated by Django 3.0.6 on 2020-05-18 22:55

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0004_auto_20200518_2252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='experts',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
