# Generated by Django 3.0.6 on 2020-06-05 00:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_auto_20200604_1034'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='evidence',
            name='evidence_relationship',
        ),
    ]