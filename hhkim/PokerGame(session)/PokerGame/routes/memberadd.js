var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
password : '1234',
database : 'pokergame'
});
var sqlQuery = 'insert into memberinpo SET ?';

function callback(err,result){
    if(err){
        throw err
    }
    console.log("Insert Complete!");
    console.log(query.sql);
}


/* GET home page. */
router.post('/', function(req, res, next) {
	//var port = {}
	/*var post={id:req.param('id'),username:req.param('name'),
			userpassword:req.param('password')};*/
	var post={id:'kim1234',username:'abc',
			userpassword:'1234',money: 200,win:0,lose:0};
	connection.connect();
	var query= connection.query(sqlQuery, post, callback);
	connection.end();
	res.render('mainpage', { title: 'Express2' , id : req.param('id')});
});



module.exports = router;
