var express = require('express');
var router = express.Router();
var db = require('../member/db');
var db2 = require('../member/db2');
var fs = require('fs');
var session = require('session');

/* GET home page. */
router.get('/',function(req,res){
	res.render('mainpage', {title : '메인페이지'});
});
router.get('/member/join',function(req,res){
	res.render('join', {title : '회원가입'});
});


router.post('/member/memberadd', function(req, res) {
	var member = {id: req.param("id"), pass : req.param("pass"), name : req.param("name")};
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
	db2.getid("kim1234", function(result){
	
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
	});
	
});

module.exports = router;
