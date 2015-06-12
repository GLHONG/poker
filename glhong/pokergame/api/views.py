from django.contrib.auth import authenticate
from django.http import HttpResponse
from django.template import Context
from rest_framework.views import APIView
from user_manager.forms import join_form, login_form
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
                request.session.set_expiry(1200) # 20분 동안 아무런 동작이 없는 경우 세션 삭제
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
    def get(self, request):
        user = AuthUser.objects.get(id=request.session['id'], email=request.session['email']) # 세션에 저장되어 있는 id와 email로 회원 정보 가져옴
        if user: # 회원이 있는 경우
            data = { 'id': user.id, 'email': user.email, 'username': user.username, 'coin': user.coin, 'win': user.win, 'draw': user.draw, 'lose': user.lose } # 필요한 값 저장
            return json_response({
                'result': True,
                'data': data,
            })
        # 존재하지 않는 회원인 경우 실패 반환
        return json_response({
            'result': False,
        })

class Update(APIView):
    def get(self, request,  **kwargs):
        if self.kwargs['type'] == "game_result": # 게임 결과 수정
            user = AuthUser.objects.get(id=request.session['id'], email=request.session['email'])
            user.win = int(user.win) + int(request.GET['win'])
            user.draw = int(user.draw) + int(request.GET['draw'])
            user.lose = int(user.lose) + int(request.GET['lose'])
            AuthUser.objects.filter(email=request.GET['email']).update(coin=request.GET['coin'], win = user.win, draw=user.draw, lose=user.lose)
            return json_response({
                'result': True,
                'data': request.GET,
            })