from django.conf.urls import url
from api.views import Join, Login, Logout, Detail, Update

urlpatterns = [
    url(r'^user/join/', Join.as_view()),
    url(r'^user/login/', Login.as_view()),
    url(r'^user/logout/', Logout.as_view()),
    url(r'^user/detail/', Detail.as_view()),
    url(r'^user/update/(?P<type>.+)', Update.as_view()),
]
