# Generated by Django 3.0.6 on 2020-05-20 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_source_source_degree'),
    ]

    operations = [
        migrations.AddField(
            model_name='evidencereview',
            name='deduced_source_degree',
            field=models.CharField(choices=[('ORIGINAL', 'Original Research'), ('PRIMARY', 'Primary'), ('SECONDARY', 'Secondary'), ('TERTIARY', 'Tertiary')], default='PRIMARY', max_length=25),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='evidencereview',
            name='is_reliable',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]
