/**
 * New node file
 */

var io = require('socket.io').listen(3303);
console.log('socket server run!!');

io.sockets.on('connection', function(socket){
	socket.on('chat', function(msg){
		io.emit('chat', msg)
	});
});