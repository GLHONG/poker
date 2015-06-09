var socketio = require('socket.io');
var User = require('./user.js');
var Poker = require('./poker.js');


var io = socketio.listen(3303); // 3303포트로 소켓서버 오픈
game = {};
io.sockets.on('connection', function(socket){
	// io.sockets.manager.rooms 룸 리스트 정보 가져오기
	// 방 생성 및 게임 초기화
	socket.on('join', function(data){
		socket.join(data.room); // room 입장
		console.log(data);
		game[data.room] = new Poker(data);
		io.sockets.in(data.room).emit('from_dealer',
			{
				"user_card": game[data.room].user_card,
			 	"stage": game[data.room].stage,
				"betting_money": game[data.room].betting_money
			}
		);
	});
	socket.on('to_dealer', function(data){
		if(data.betting_option === "fold") {
			io.sockets.in(data.room).emit('from_dealer', {
				"stage": 6
			});
		}
		if(data.stage == 2)
			game[data.room].flop(data);
		else if(data.stage == 3)
			game[data.room].turn(data);
		else if(data.stage == 4)
			game[data.room].river(data);
		else
			game[data.room].showdown(data);

		var return_data = {
				"user_card": game[data.room].user_card,
				"community_cards": game[data.room].community_cards,
				"stage": game[data.room].stage,
				"betting_money": game[data.room].betting_money
			};
		if(data.stage == 5) {
			return_data.user_hands_result = game[data.room].user_hands_result;
			return_data.server_hands_result = game[data.room].server_hands_result;
			return_data.server_card = game[data.room].server_card;
		}
		console.log(return_data);

		io.sockets.in(data.room).emit('from_dealer', return_data);
	});
});
