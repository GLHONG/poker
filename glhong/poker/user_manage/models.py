from django.db import models

# Create your models here.
class Users(models.Model):
    user_id = models.CharField(max_length=20, unique=True)
    user_password = models.CharField(max_length=20)
    user_coin = models.CharField(max_length=10, default=0)
    user_win = models.CharField(max_length=10, default=0)
    user_lose = models.CharField(max_length=10, default=0)
    user_join_date = models.DateTimeField(auto_now=True)
