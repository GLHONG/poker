var socketio = require('socket.io');
var io = socketio.listen(3303); // 3303포트로 소켓서버 오픈

io.sockets.on('connection', function(socket){
	socket.emit('connection', 'hello');
	socket.on('toserver', function(data){
		socket.broadcast.emit('fromserver', data.msg);
	})
});