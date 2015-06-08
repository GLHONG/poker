from django.conf.urls import url
from game.views import Content, Playing

urlpatterns = [
    url(r'^$', Content.as_view()),
    url(r'^playing/', Playing.as_view()),
]
