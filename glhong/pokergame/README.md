# 설치 요소
```sh
$ pip install Django==1.8.2
$ pip install djangorestframework
$ pip install django-bootstrap3
$ pip install mysql-connector-python
```
* Django (1.8.2)
* djangorestframework (3.1.2)
* django-bootstrap3 (5.4.0)
* mysql-connector-python (2.0.4)


# Mysql 설정
* pokergame/settings.py, line87
```
DATABASES = {
    'default': {
        'ENGINE': 'mysql.connector.django',
        'NAME': 'pokergame', # Database name
        'USER': 'root',     # User id
        'PASSWORD': '12341234', # User password
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```
* 데이터베이스 세팅 및 테이블 생성 
```sh
$ python3 manage.py makemigration
$ python3 manage.py migrate
```
