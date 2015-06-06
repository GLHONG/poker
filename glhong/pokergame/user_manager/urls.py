from django.conf.urls import url
from user_manager.views import Join, Login, UserDetail

urlpatterns = [
    url(r'^join/', Join.as_view()),
    url(r'^login/', Login.as_view()),
    url(r'^detail/', UserDetail.as_view()),
]
