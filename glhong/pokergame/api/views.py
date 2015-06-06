from django.contrib.auth import authenticate
from django.http import HttpResponse
from django.template import Context
from rest_framework.views import APIView
from user_manager.forms import join_form, login_form

# json 리턴
from user_manager.models import AuthUser


def json_response(x):
    import json
    return HttpResponse(json.dumps(x, sort_keys=True, indent=2),
                        content_type='application/json; charset=UTF-8')


class Join(APIView):

    def post(self, request):
        form = join_form(request.POST) # 사용자가 입력한 값 form에 저장
        if form.is_valid(): # form 유효성 검사
            form.save() # db에 데이터 저장
            return json_response({ # 성공 반환
                'result': True,
            })

        # 에러 내용과 함께 반환
        return json_response({
            'result': False,
            'error': form.errors,
        })

class Login(APIView):

    def post(self, request):
        form = login_form(request.POST) # 사용자가 입력한 값 form에 저장
        if form.is_valid(): # form 유효성 검사

            user = authenticate(
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password']
            )
            if user:
                # 로그인 성공시 세션 설정
                request.session['id'] = user.id
                request.session['email'] = user.email

                return json_response({ # 성공 반환
                    'result': True,
                })

            # 에러 내용과 함께 반환
            return json_response({
                'result': False,
            })

        # 에러 내용과 함께 반환
        return json_response({
            'result': False,
            'error': form.errors,
        })

class Logout(APIView):
    def post(self, request):
        try:
            # 세션 삭제
            del request.session['id']
            del request.session['email']
            # 성공 반환
            return json_response({
                'result': True,
            })
        except KeyError:
            # 실패 반환
            return json_response({
                'result': False,
            })

class Detail(APIView):
    def post(self, request):
        user = AuthUser.objects.get(id=request.session['id'], email=request.session['email'])
        if user:
            data = { 'email': user.email, 'coin': user.coin, 'win': user.win, 'lose': user.lose }
            return json_response({
                'result': True,
                'data': data,
            })

        return json_response({
            'result': False,
        })
