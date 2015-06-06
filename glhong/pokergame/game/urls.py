from django.conf.urls import url
from game.views import Content

urlpatterns = [
    url(r'^$', Content.as_view()),
]
