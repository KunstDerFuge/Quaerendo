# Generated by Django 3.0.6 on 2020-05-15 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_source_date_retrieved'),
    ]

    operations = [
        migrations.AddField(
            model_name='claimevidence',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]