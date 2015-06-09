var express = require('express');
var router = express.Router();
var db = require('../member/db');
var db2 = require('../member/db2');
var fs = require('fs');
var session = require('express-session');

/* GET home page. */
router.get('/1',function(req,res){


	res.render('test1', {title : '1페이지', test : 'sessiontest'});
	//페이지에서 입력을 받습니다.
});
router.get('/2',function(req,res){

	console.log(req.param("id"));
	req.session.a123 = req.param("id");
	console.log("------2--");
	console.log(req.session.a123); //정상적으로 출력이 됩니다.
	res.render('test2', {title : '2페이지', test : req.session.a123});


});
router.get('/3',function(req,res){

	console.log("------3--");
	console.log(req.session.a123); //이부분에서 undefinde 출력이 됩니다.
	res.render('test3', {title : '3페이', test : req.session.a123});
	

});

router.get('/',function(req,res){

	
	console.log(req.session);
	res.render('mainpage', {title : '메인페이지'});

	
	
});
router.post('/member/login',function(req,res){

	//console.log(req.session);
	//req.session.user = "asss";
	//var user = req.session.user;
	//console.log(req.session);
	req.session.user = req.body.id;
	console.log(req.session);
	console.log("------------------");
	res.send();
	
	res.redirect('/');
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
	var member = {id: req.body.id, pass : req.body.pass, name : req.body.name};
	//console.log(member);
	db2.join(member, function(result){
		if(!result){
			res.render('mainpage', {title : 'express2'});
		}
		else
		{
			res.render('index', {title : 'express2'});
		}
	});
	
	
});
router.get('/test',function(req, res){
	/*db2.getid("kim1234", function(result){
	
		console.log(result);
		if(result==false)
			{
				res.render('mainpage', {title : 'express2'});
				
			
			}
		else
			{
				res.render('index', { title: 'Express2' ,id: result[0].id, pass: result[0].userpassword, 
				name : result[0].username});	
			
			}
	});*/
	
	res.session.svae.user1 = "bbb";
	//req.session.save.user = "aaa";
	
	res.render('index', { title: 'Express2' });	
		
	
});

module.exports = router;
