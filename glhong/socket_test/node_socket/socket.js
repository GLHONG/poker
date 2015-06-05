var socketio = require('socket.io');
var io = socketio.listen(3303);

io.sockets.on('connection', function(socket){
	socket.emit('connection', 'hello');
	socket.on('toserver', function(data){
		socket.broadcast.emit('fromserver', data.msg);
	})
});