from django.conf.urls import url
from user_manage.views import Login, Join

urlpatterns = [
    url(r'^login/', Login.as_view()),
    url(r'^join/', Join.as_view())
]
