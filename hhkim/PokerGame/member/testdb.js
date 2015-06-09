/**
 * New node file
 */
var mysql = require('mysql');

var connection;

var dbinfo = {
		host :'localhost',
		user :'root',
		password : '1234',
		database : 'pokergame'
};

exports.connect = function(){
	connection = mysql.createConnection(dbinfo);
	connection.connect(function(error, results){
		if(error){
			console.log('Connection Error : '+ error.message);
			return;
		}
		else
		{
			console.log('Connected to MySQL');
			return;
		}
	});
}

exports.getConnection = function(){
	return connection;
}