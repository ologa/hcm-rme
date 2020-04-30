# Generated by Django 2.1.1 on 2018-09-03 07:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('emr_core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('neighborhood', models.CharField(max_length=50)),
                ('street', models.CharField(max_length=100)),
                ('house_number', models.PositiveIntegerField()),
                ('cell', models.CharField(max_length=2)),
                ('block', models.CharField(max_length=4)),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='emr_core.Person')),
            ],
        ),
        migrations.CreateModel(
            name='GeoLocation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[('country', 'Pais'), ('province', 'Provincia'), ('district', 'Distrito'), ('administrative-post', 'Posto Administrativo'), ('locality', 'Localidade')], max_length=20)),
                ('parent', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='emr_core.GeoLocation')),
            ],
            options={
                'db_table': 'geo_location',
            },
        ),
        migrations.CreateModel(
            name='IdentificationDocument',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=50)),
                ('issue_date', models.DateField(blank=True)),
                ('expiry_date', models.DateField(blank=True)),
                ('type', models.CharField(choices=[('ID', 'B.I'), ('PASSPORT', 'Passaport')], max_length=20)),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='emr_core.Person')),
            ],
            options={
                'db_table': 'identification_document',
            },
        ),
        migrations.AlterField(
            model_name='patient',
            name='registration_date',
            field=models.DateTimeField(),
        ),
    ]