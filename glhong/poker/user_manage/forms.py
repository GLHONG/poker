#-*- coding: utf-8 -*-
from django import forms
from django.core.exceptions import ValidationError
from user_manage.models import Users


class LoginForm(forms.Form):
    user_id = forms.CharField(label="Id",
                              max_length=20)
    user_password = forms.CharField(label="Password",
                                    min_length=6,
                                    max_length=20,
                                    widget=forms.PasswordInput)

class JoinForm(forms.Form):
    user_id = forms.CharField(label="Id",
                              min_length=4,
                              max_length=20,
                              required=True)
    user_password = forms.CharField(label="Password",
                               min_length=6,
                               max_length=20,
                               required=True,
                               widget=forms.PasswordInput)
    password_check = forms.CharField(label="Password(again)",
                                     min_length=6,
                                     max_length=12,
                                     required=True,
                                     widget=forms.PasswordInput,
                                     error_messages={'min_length': '에러! %(limit_value)d 자리 이상 입력해주세요.'})

    def clean(self):
        if 'user_password' in self.cleaned_data and 'password_check' in self.cleaned_data:
            if self.cleaned_data['user_password'] != self.cleaned_data['password_check']:
                self.add_error('password_check', "비밀번호가 일치하지 않습니다. 다시 입력해주세요.")

        if Users.objects.filter(user_id=self.cleaned_data['user_id']):
                self.add_error('user_id', "Id가 중복됩니다. 다시 입력해주세요.")

        return self.cleaned_data




