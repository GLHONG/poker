var express = require('express');
var router = express.Router();
//var db = require('../member/db');
var db = require('../member/db');
var fs = require('fs');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());
app.use(session({
	secret: 'secret key',
	key: 'rint',
	resave: false,
	saveUninitialized: true,
	cookie:{secure:true, maxAge : 60*1000}
}));


router.get('/socket',function(req,res){

	res.render('socket', {title : '소켓'});
	

});

router.get('/',function(req,res){

	
	//console.log(req.session);
	res.render('mainpage', {title : '메인페이지'});

	
	
});
router.post('/member/login',function(req,res){

	//console.log(req.session);
	//req.session.user = "asss";
	//var user = req.session.user;
	//console.log(req.session);
	var user = {id : req.body.id, password : req.body.password};
	
	db.logincheck(user, function(res2){
		console.log(res2);
		if(res2==false)
			{
				res.render('mainpage', {title : "로그인실패"});
			}
		else
			{
			
				var member = {id : res2[0].id, name : res2[0].username, 
						money : res2[0].money, win : res2[0].win, lose : res2[0].lose};
				//console.log(member.name);
				req.session.member = member;
				res.render('login', {title : "회원정보", lmember : req.session.member});
			}
		
	});
	
	//console.log(req.session.user);
	//res.end();
	
	
});
router.get('/member/join',function(req,res){
	//console.log(req.session);
	var user = req.session.user;
	console.log(req.session);
	//delete req.session.user;
	//console.log(req.session.user);
	
	res.render('join', {title : '회원가입'});
	
	
});


router.post('/member/memberadd', function(req, res) {
//	var member = {id: req.param("id"), pass : req.param("pass"), name : req.param("name")};
	var jmember = {id: req.body.id, pass : req.body.pass, name : req.body.name};
	db.join(jmember, function(err,res2){
		console.log(res2);
		if(!res2){
			res.render('mainpage', {title : "실패"});
		}
		else
		{
			res.render('mainpage', {title : '성공'});
		}
	});
	
	
});

router.post('/game/singlegame', function(req, res) {
	if(req.session.member==null)
		{
		res.redirect("/");
		}
	else
		{
		res.render('singlegame', {title : 'singlegame', lmember : req.session.member});
		
		}
});
router.get('/game/singlegame', function(req, res) {
		res.redirect("/");
});

function shuffle(arr){	//셔플
	 if(arr instanceof Array)
	 {
	  var len = arr.length;
	  if(len == 1) return arr;
	  var i = len * 2;
	  while(i > 0)
	  {
	   var idx1 = Math.floor(Math.random()* len);
	   var idx2 = Math.floor(Math.random()* len);
	   if(idx1 == idx2) continue;
	   var temp = arr[idx1];
	   arr[idx1] = arr[idx2];
	   arr[idx2] = temp;
	   i--;
	  }
	 }
	 return arr;
	}

router.post('/game/start',function(req,res) {
	console.log("확인!!");
	
	var card = new Array();
	//card.push(1);
	for(var i=1;i<53;i++)//카드저장
	{
		card.push(i);
	}
	shuffle(card);				//카드셔플
	// var a = parseFloat(req.body.a);
	// var b = parseFloat(req.body.b);
	// var result = a+b;
	var user = new Array();
	var computer = new Array();
	user.push(card.pop());
	computer.push=(card.pop());
	user.push(card.pop());
	computer.push=(card.pop());
	console.log(user.pop());
	//user.valueOf()
	req.session.user_card = user;
	req.session.computer_card=computer;
	req.session.card = card;
	
	
	 res.send({user: user});
	});

router.get('/', function(req, res){
	 res.send('hello world');
	});
	// 덧셈 연산 처리
router.post('/api/add',function(req,res) {
	console.log("확인!!");
	 var a = parseFloat(req.body.a);
	 var b = parseFloat(req.body.b);
	 var result = a+b;
	 res.send({result:result});
	});



module.exports = router;
