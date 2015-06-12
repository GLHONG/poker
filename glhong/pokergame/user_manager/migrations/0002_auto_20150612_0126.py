# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.auth.models


class Migration(migrations.Migration):

    dependencies = [
        ('user_manager', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='authuser',
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.RemoveField(
            model_name='authuser',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='authuser',
            name='user_permissions',
        ),
        migrations.AddField(
            model_name='authuser',
            name='draw',
            field=models.CharField(default='0', max_length=10),
        ),
        migrations.AlterField(
            model_name='authuser',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
    ]
