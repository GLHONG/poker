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

exports.getid = function(id, callback){
	var connection = mysql.createConnection(dbinfo); 
	connection.connect(function(err, res){
		if(err)
			{return ;}
		else
			{return ;}
	});
	var name = 'khh';
	var members = ['kim1234', 'khh'];
	
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

exports.join = function(member, callback){
	console.log(member);
	var connection = mysql.createConnection(dbinfo); 
	connection.connect(function(err, res){
		if(err)
			{return ;}
		else
			{return ;}
	});
	var name = 'khh';
	var members = ['kim1234', 'khh'];
	
	connection.query("insert into memberinpo (id,username,userpassword) values(?,?,?)", 
			[member.id, member.name, member.pass], function(err, row){
		
		if(!err){
			//console.log(res);
			callback(false);
		}
		else
		{
			//console.log(res);
			callback(row);
		}
		//callback("test");
		
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