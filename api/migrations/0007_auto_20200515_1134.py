# Generated by Django 3.0.6 on 2020-05-15 11:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_claim_claim_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='claim',
            name='source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source_of_claims', to='api.Source'),
        ),
        migrations.AlterField(
            model_name='claimevidence',
            name='claim',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_evidence', to='api.Claim'),
        ),
        migrations.AlterField(
            model_name='claimevidence',
            name='source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cited_in_evidence', to='api.Source'),
        ),
    ]
