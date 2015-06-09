/**
 * New node file
 */

var io = require('socket.io').listen(3303);
console.log('socket server run!!');

io.sockets.on('connection', function(socket){
	/*socket.on('call', function(data){
		console.log(data);
		io.emit('out', data);
	});*/

	socket.on('start', function(data){
		console.log(data);
		io.emit('out', data);
	});
	
	
});