from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import Context
from django.template.context_processors import csrf
from django.template.loader import get_template
from rest_framework.views import APIView
from user_manage.forms import LoginForm, JoinForm
from user_manage.serializers import UserSerializer

# Create your views here.



class Login(APIView):
    # /login/ 으로 접속하였을 경우 로그인 페이지 출력.
    def get(self, request):
        template = get_template('login.html')
        context = Context({'login_form': LoginForm()})
        context.update(csrf(request))

        return HttpResponse(template.render(context))

class Join(APIView):
    def get(self, request):
        template = get_template('join.html')
        context = Context({'join_form': JoinForm()})
        context.update(csrf(request))
        return HttpResponse(template.render(context))

    def post(self, request):
        forms = JoinForm(request.POST)
        # 폼 검증
        if forms.is_valid() is False:
            # 데이터가 유효성 검사에 맞지 않다면 에러메시지 출력.
            template = get_template('join.html')
            context = Context({'join_form': forms})
            context.update(csrf(request))
            return HttpResponse(template.render(context))

        forms.cleaned_data

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse("<script>alert('Success');location.href('/user/login');</script>")

        return HttpResponse("<script>alert('fail1');</script>")

        # data = JSONParser().parse(request.POST)
        #
        # context = Context({'result': data})
        # return HttpResponse(template.render(context))
        # # serializer = UserSerializer(data=data)
        # #
        # # if serializer.is_valid():
        # #     serializer.save()
        # #     context = Context({'result': 'ok'})
        # #     return HttpResponse(template.render(context))
        # # else:
        # #     context = Context({'result': 'fail'})
        # #     return HttpResponse(template.render(context))
