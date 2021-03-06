# Generated by Django 3.0.6 on 2020-05-18 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Claim',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('claim_text', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Entity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Evidence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('evidence_relationship', models.CharField(choices=[('PROVES', 'Proves'), ('SUPPORTS', 'Supports'), ('UNRELATED', 'Unrelated'), ('INCONCLUSIVE', 'Inconclusive'), ('DISPUTES', 'Disputes'), ('DISPROVES', 'Disproves')], max_length=25)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField(blank=True)),
                ('description', models.TextField(blank=True)),
                ('date_retrieved', models.DateTimeField(auto_now_add=True)),
                ('authors', models.ManyToManyField(to='api.Entity')),
            ],
        ),
        migrations.CreateModel(
            name='EvidenceReview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deduced_evidence_relationship', models.CharField(choices=[('PROVES', 'Proves'), ('SUPPORTS', 'Supports'), ('UNRELATED', 'Unrelated'), ('INCONCLUSIVE', 'Inconclusive'), ('DISPUTES', 'Disputes'), ('DISPROVES', 'Disproves')], max_length=25)),
                ('additional_comments', models.CharField(blank=True, max_length=500)),
                ('evidence', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='api.Evidence')),
            ],
        ),
    ]
