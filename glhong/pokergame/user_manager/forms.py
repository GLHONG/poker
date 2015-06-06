from django import forms
from user_manager.models import AuthUser

class login_form(forms.Form):
    email = forms.EmailField(
        label="User Email"
    )
    password = forms.CharField(
        label="User Password",
        widget=forms.PasswordInput
    )

class join_form(forms.ModelForm):
    email = forms.EmailField(
        label="User Email"
    )
    username = forms.CharField(
        label="User Name"
    )
    password = forms.CharField(
        label="User Password",
        widget=forms.PasswordInput
    )
    password_check = forms.CharField(
        label="User Password(Again)",
        widget=forms.PasswordInput
    )

    class Meta:
        model = AuthUser
        fields = ['email', 'username', 'password', 'password']

    # 사용자가 입력한 2개의 비밀번호가 일치하는지 확인. 일치하지 않으면 에러
    def clean_password_check(self):
        # Check that the two password entries match
        password = self.cleaned_data.get("password")
        password_check = self.cleaned_data.get("password_check")
        if password and password_check and password != password_check:
            raise forms.ValidationError("Passwords don't match")
        return password_check

    # db에 저장
    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(join_form, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

