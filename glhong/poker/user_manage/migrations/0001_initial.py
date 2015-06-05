# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('user_id', models.CharField(unique=True, max_length=20)),
                ('user_password', models.CharField(max_length=20)),
                ('user_coin', models.CharField(default=0, max_length=10)),
                ('user_win', models.CharField(default=0, max_length=10)),
                ('user_lose', models.CharField(default=0, max_length=10)),
                ('user_join_date', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
