/**
 * New node file
 */
var mysql = require('mysql');

var dbinfo = {
	host :'localhost',
	user :'root',
	password : '1234',
	database : 'pokergame'
};

exports.getid = function(user, callback){
	var connection = mysql.createConnection(dbinfo); 
	connection.connect(function(err, res){
		if(err)
			{return ;}
		else
			{return ;}
	});
	
	var members = [user.id, user.pass];
	
	connection.query("select * from memberinpo where id = ? and username = ?", members, function(err, res, field){
		console.log(res);
		if(res!=""){
			//console.log(res);
			callback(res);
		}
		else
		{
			//console.log(res);
			callback(false);
		}
		//callback("test");
		
	});
	connection.end();
};

exports.logincheck = function(user, callback){
	var connection = mysql.createConnection(dbinfo); 
	connection.connect(function(err, res){
		if(err)
			{return ;}
		else
			{return ;}
	});
	console.log(user.id+user.password);
	var members = [user.id, user.password];
	
	connection.query("select * from memberinpo where id = ? and userpassword = ?", members, function(err, res, field){
		console.log(res);
		if(res!=""){
			//console.log(res);
			callback(res);
		}
		else
		{
			//console.log(res);
			callback(false);
		}
		//callback("test");
		
	});
	connection.end();
};

exports.join = function(member, callback){
	console.log("join정보");//삭제대기
	console.log(member);//삭제대기
	var connection = mysql.createConnection(dbinfo); 
	connection.connect(function(err, res){
		if(err)
			{return ;}
		else
			{return ;}
	});
	
	
	connection.query("insert into memberinpo (id,username,userpassword,money,win,lose) values(?,?,?,300,0,0)", 
			[member.id, member.name, member.pass], function(err, row){
		
		if(err!=null){
			console.log("join실패");	
			callback(false);
		}
		else
		{
			console.log("join성공");	
			callback(row);
			
		}		
	});
	connection.end();
};



/*exports.IdFindOne = function(sql, callback){
	var connection = mysql.createConnection(dbinfo); 
	connection.connect(function(err, res){
		if(err)
			{return ;}
		else
			{return ;}
	});
	connection.query(sql, callback){
		
	}
}*/

/*
exports.doQuery = function(sql, callback){
	var connection = mysql.createConnection(dbinfo); 
	connection.connect(function(err, res){
		if(err)
			{return ;}
		else
			{return ;}
	});
	connection.query(sql, function(err, res, field){
		if(err)
			{
			console.log('error');
			return ;
			}
		else if(res.length > 0){
			if(res.length==1)
				{
				callback(res, 'query executed : '+ sql, {id : res[0].id, pass : res[0].userpassword});
				}
			return;
		}
	});
	connection.end();
};
*/