from django.http import HttpResponse, HttpResponseRedirect
from django.template import Context
from django.template.loader import get_template
from rest_framework.views import APIView
from user_manager.forms import join_form, login_form

class Join(APIView):
    # /user/join 에서 GET으로 들어온 요청은 회원가입 페이지 출력
    def get(self, request):
        # 이미 로그인한 경우에 메인 페이지로 이동:
        if 'id' in request.session and 'email' in request.session:
            return HttpResponseRedirect('/game/')

        template = get_template('join.html') # 페이지 지정
        context = Context({'form': join_form()}) # 회원가입 폼
        return HttpResponse(template.render(context))

class Login(APIView):
    # /user/login 에서 GET으로 들어온 요청은 로그인 페이지 출력
    def get(self, request):
        # 이미 로그인한 경우에 메인 페이지롱 이동
        if 'id' in request.session and 'email' in request.session:
            return HttpResponseRedirect('/game/')

        tempalte = get_template('login.html') # 페이지 지정
        context = Context({'form': login_form()}) # 로그인 폼
        return HttpResponse(tempalte.render(context))

class UserDetail(APIView):
    def get(self, request):
        if 'id' in request.session and 'email' in request.session:
            template = get_template('detail.html')
            return HttpResponse(template.render())

        return HttpResponseRedirect('/user/login')

