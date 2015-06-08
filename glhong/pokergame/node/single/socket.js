var socketio = require('socket.io');
var Deck = require('./deck.js');
var User = require('./user.js');


var io = socketio.listen(3303); // 3303포트로 소켓서버 오픈
game = {};
io.sockets.on('connection', function(socket){

	// 방 생성 및 게임 초기화
	socket.on('join', function(data){
		socket.join(data); // room 입장
		game_init(data);
		console.log('JOIN ROOM LIST', io.sockets.manager.rooms);
		console.log('Room Information', game);
		io.sockets.in(data).emit('fromserver',
			{
				"user_card": game[data].user_card,
			 	"stage": game[data].stage,
				"test": game
			}
		);
	});

});

//게임 초기화 홤수
function game_init(data){
	var deck = new Deck(); // 덱 생성
	deck.shuffle(); // 덱에 있는 전체 카드 섞음
	var user_card = new User(); // 사용자
	var server_card = new User(); // 서버 카드

	// 차례대로 패를 나눠 가짐
	user_card.hand(deck.pop());
	server_card.hand(deck.pop());
	user_card.hand(deck.pop());
	server_card.hand(deck.pop());

	var game_state = {
		"deck" : deck,
		"user_card": user_card,
		"server_card": server_card,
		"stage": "1"
	};

	game[data] = game_state;
}