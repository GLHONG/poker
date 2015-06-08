/**
 * New node file
 */

var express = require("express");
var mysql = require("mysql");
var app = express();

var pool = mysql.createPool({
	connection: 100,
	host: "localhost",
	user: "root",
	port: "3306",
	password: "1234",
	database: "pokergame",
	debug: false
});

function handle_database(req, res) {
	
	pool.getConnection(function(err,connection){
		if(err){
			connection.release();
			res.json({"code" : 100, "status" : "Error in connection database"});
			return;
		}
		console.log('connected as id' + connection.threadId);
		
		connection.query("select * from memberinpo",function(err,rows){
			connection.release();
			if(!err){
				res.json(rows);
			}
		});
		connection.on('error', function(err){
			res.json({"code" : 100, "status" : "Error ini connection databas"});
			return;
		});
		
	});
	
}

app.get("/",function(req,res){
	handle_database(req,res);
	res.render("index", { title: '회원가입'});
});

app.listen(3000);

