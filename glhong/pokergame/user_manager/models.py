from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models

# Create your models here.

# django에서 기본적으로 지원하는 User 모델을 상속 받아서 재정의
class AuthUser(AbstractBaseUser):

    username = models.CharField(unique=True, max_length=20)
    email = models.EmailField(verbose_name='email address', unique=True, max_length=255)
    first_name = models.CharField(max_length=30, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True, null=False)
    is_staff = models.BooleanField(default=False, null=False)
    is_superuser = models.BooleanField(default=False, null=False)

    win = models.CharField(max_length=10, default='0')
    lose = models.CharField(max_length=10, default='0')
    coin = models.CharField(max_length=10, default='10000')

    objects = UserManager()

    USERNAME_FIELD = 'email'
