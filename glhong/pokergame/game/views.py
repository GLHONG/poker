from django.http import HttpResponse, HttpResponseRedirect
from django.template.loader import get_template
from rest_framework.views import APIView


class Content(APIView):

    def get(self, request):
        # 로그인이 되어 있는 경우
        if 'id' in request.session and 'email' in request.session:
            template = get_template('index.html')
            return HttpResponse(template.render())

        # 세션이 없는 경우에는 로그인 페이지로 이동
        return HttpResponseRedirect('/user/login')