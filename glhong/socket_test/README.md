# Node.js + Django 소켓 통신

## 설치 방법 및 실행
###/node_socket/
```sh
$ npm install // socket.io 모듈 다운 및 설치
$ node socket.js // 소켓 서버 구동(3303포트)
$ cd ..
$ python3 manage.py runserver(8000포트) // 장고 프로젝트 실행
```
- 2개의 browser에서 localhost:8000/chat 접속
- 메시지 입력 후 전송시 다른 브라우저에서 메시지 전달을 받음.


## 구조설명
```sh
.
+-- chat
|   +-- settings.py 
|   +-- urls.py     
+-- chat_client
|   +-- templates
    |   +-- index.html
|   +-- views.py         
+-- node_socket
|   +-- package.json
|   +-- socket.js
```
중요 파일 위주로 작성해 놓았습니다.

  - settings.py : 프로젝트 설정 파일
  - urls.py: url 설정 파일
  - index.html: 사용자에게 보여지는 파일
  - views.py: /chat으로 접속시 views.py에서 index.html 화면을 띄움
  - package.json: socket.io 정의
  - socket.js: 소켓서버 파일



