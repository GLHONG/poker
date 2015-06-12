/**
 * New node file
 */

var io = require('socket.io').listen(3303);
console.log('socket server run!!');

var user_id;					//유저아이디
var card = new Array();		//덱
var user_card = new Array(); //유저카드
var com_card = new Array(); //컴퓨터카드
var community_card = new Array();//커뮤리티카드
var coin;


var EveryUser = new Array();


io.sockets.on('connection', function(socket){
	/*socket.on('call', function(data){
		console.log(data);
		io.emit('out', data);
	});*/
	socket.on('test', function(data){
		console.log('------test-----');
		console.log(data);
		user_id = data;						
		card.length = 0;
		user_card.length = 0;
		com_card.length =0;
		community_card.length =0;
		coin = 0;
		var oneuser = 	{
				user_id : user_id,
				card : card,
				user_card : user_card,
				com_card : com_card,
				community_card : community_card,
				coin : coin
			};
		EveryUser.push(oneuser);
		//console.log(EveryUser[0].user_name);
		console.log(EveryUser[0]);
	});
	socket.on('join', function(data){//게임방에 입장
		console.log('------join-----');
		user_id = data.user;					//유저아이디 저장
		card.length = 0;					//덱 초기화				
		user_card.length = 0;			//유저카드 초기화			
		com_card.length =0;				//컴퓨터카드 초기화
		community_card.length = 0;		//커뮤리티카드 초기화
		coin = 0;						//배팅코인 초기화
		var oneuser = 	{				//모든정보 json으로 변환
				user_id : user_id,
				card : card,
				user_card : user_card,
				com_card : com_card,
				community_card : community_card,
				coin : coin
			};
		EveryUser.push(oneuser);			//정보를 배열에 저장
		console.log(EveryUser[0]);
		
	});
	socket.on('start', function(data){//게임시작 요청 data = id
		console.log('------start-----');
		//console.log(EveryUser);
		for(var i=0; i<EveryUser.length;i++)
		{
			//console.log(EveryUser[0].user_id);
			//console.log(data);
			if(EveryUser[i].user_id==data.user)
			{
				console.log('------id check-----');					//join한 유저가 있다
				EveryUser[i].card = shuffle();						//카드 셔플해서 카드배열에 넣는다.
				EveryUser[i].user_card.push(EveryUser[i].card.pop());	//유저와 컴퓨터가 한장씩 두장을 받는다
				EveryUser[i].com_card.push(EveryUser[i].card.pop());
				EveryUser[i].user_card.push(EveryUser[i].card.pop());
				EveryUser[i].com_card.push(EveryUser[i].card.pop());
				console.log(EveryUser[i].user_card);
				console.log(EveryUser[i].com_card);
				
				io.emit('startend', {								//유저의 카드를 클라이언트 보낸다.
						user_card : EveryUser[i].user_card, nextgame : 'freeflop'});
						console.log(EveryUser[i].user_card);
						console.log('------startend-----');	
				break;
			}
			else
			{
				//join하지 않는 유저가 있으면
			}
		}
		//console.log("첫번째");
		//console.log(data);
		//console.log(socket);
	
		//카드 배분 응답
	});
	
	socket.on('freeflop', function(data){//프리플롭 배팅요청 data = id , coin
		//커뮤리티 카드3장 응답
		console.log('------freeflop-----');
		for(var i=0; i<EveryUser.length;i++)
		{
			if(EveryUser[i].user_id==data.user)
			{
				console.log('------id check-----');					//join한 유저가 있다
				EveryUser[i].coin += data.coin;							//코인을 누적시킨다.
				EveryUser[i].community_card.push(EveryUser[i].card.pop());//덱에서 3장을 커뮤리티 카드에 넣는다.
				EveryUser[i].community_card.push(EveryUser[i].card.pop());
				EveryUser[i].community_card.push(EveryUser[i].card.pop());
				
				io.emit('freeflopend', {								//커뮤리티카드를 클라이언트 보낸다.
					community_card : EveryUser[i].community_card, nextgame : 'postflop'});
						console.log(EveryUser[i].community_card);
						console.log(EveryUser[i].coin);
						console.log('------freeflopend-----');	
				break;
			}
			else
			{
				//join하지 않는 유저가 있으면
			}
		}
	});
	socket.on('postflop', function(data){//포스트 폴롭 배팅요청
		//커뮤리티 카드1장 추가 응답
		console.log('------postflop-----');
		for(var i=0; i<EveryUser.length;i++)
		{
			if(EveryUser[i].user_id==data.user)
			{
				console.log('------id check-----');					//join한 유저가 있다
				EveryUser[i].coin += data.coin;							//코인을 누적시킨다.
				EveryUser[i].community_card.push(EveryUser[i].card.pop());//덱에서 3장을 커뮤리티 카드에 넣는다.
			
				io.emit('postflopend', {								//커뮤리티카드를 클라이언트 보낸다.
					community_card : EveryUser[i].community_card, nextgame : 'batting'});
						console.log(EveryUser[i].community_card);
						console.log(EveryUser[i].coin);
						console.log('------postflopend-----');	
				break;
			}
			else
			{
				//join하지 않는 유저가 있으면
			}
		}
	});
	socket.on('batting', function(data){//배팅 요청
		//커뮤리티 카드1장 추가 응답
		console.log('------battion-----');
		for(var i=0; i<EveryUser.length;i++)
		{
			if(EveryUser[i].user_id==data.user)
			{
				console.log('------id check-----');					//join한 유저가 있다
				EveryUser[i].coin += data.coin;							//코인을 누적시킨다.
				EveryUser[i].community_card.push(EveryUser[i].card.pop());//덱에서 3장을 커뮤리티 카드에 넣는다.
			
				io.emit('battionend', {								//커뮤리티카드를 클라이언트 보낸다.
					community_card : EveryUser[i].community_card, nextgame : 'showdown'});
						console.log(EveryUser[i].community_card);
						console.log(EveryUser[i].coin);
						console.log('------battionend-----');	
				break;
			}
			else
			{
				//join하지 않는 유저가 있으면
			}
		}
	});
	socket.on('showdown', function(data){ //쇼타운 배팅요청
		//결과 응답 유저와 컴퓨터 카드 오픈 커뮤리티 카드 오픈
		console.log('------showdown-----');
		for(var i=0; i<EveryUser.length;i++)
		{
			if(EveryUser[i].user_id==data.user)
			{
				console.log('------id check-----');					//join한 유저가 있다
				EveryUser[i].coin += data.coin;							//코인을 누적시킨다.
				//EveryUser[i].community_card.push(EveryUser[i].card.pop());//덱에서 3장을 커뮤리티 카드에 넣는다.
				console.log(EveryUser[i].community_card.sort());
				
				io.emit('showdownend', {								//커뮤리티카드를 클라이언트 보낸다.
					community_card : EveryUser[i].community_card,	
					usercard : EveryUser[i].user_card,
					comcard : EveryUser[i].community_card,
					coin : EveryUser[i].coin,
					lastuser : EveryUser[i].user_card.concat(EveryUser[i].community_card)
					.sort(function(a,b){return a-b}),
					lastcom : EveryUser[i].com_card.concat(EveryUser[i].community_card)
					.sort(function(a,b){return a-b}),
					nextgame : 'end'
				});
						
					console.log(EveryUser[i].user_card);
					console.log(EveryUser[i].community_card);
					console.log(EveryUser[i].com_card);
					console.log(EveryUser[i].coin);
					console.log(EveryUser[i].user_card.concat(EveryUser[i].community_card)
							.sort(function(a,b){return a-b}));//오름차순으로 정렬
					console.log(EveryUser[i].com_card.concat(EveryUser[i].community_card)
							.sort(function(a,b){return a-b}));//오름차순으로 정렬
					console.log('------showdownend-----');	
				break;
			}
			else
			{
				//join하지 않는 유저가 있으면
			}
		}
	});
	socket.on('end', function(data){ //쇼타운 배팅요청
		//결과 응답 유저와 컴퓨터 카드 오픈 커뮤리티 카드 오픈
		console.log('------end-----');
		for(var i=0; i<EveryUser.length;i++)
		{
			if(EveryUser[i].user_id==data.user)
			{
				console.log('------id check-----');					//join한 유저가 있다
				EveryUser[i].card.length = 0;					//덱 초기화				
				EveryUser[i].user_card.length = 0;			//유저카드 초기화			
				EveryUser[i].com_card.length =0;				//컴퓨터카드 초기화
				EveryUser[i].community_card.length = 0;		//커뮤리티카드 초기화
				EveryUser[i].coin = 0;						//배팅코인 초기화
				//EveryUser[i].community_card.push(EveryUser[i].card.pop());//덱에서 3장을 커뮤리티 카드에 넣는다.
			
				io.emit('endend', {								//커뮤리티카드를 클라이언트 보낸다
					nextgame : 'start'
				});
					console.log('------endend-----');	
				break;
			}
			else
			{
				//join하지 않는 유저가 있으면
			}
		}
	});
	
});


function shuffle(){	//셔플
	var arr = new Array();
	for(var j=1;j<53;j++)//카드저장
	{
		arr.push(j);
	}
	
	 if(arr instanceof Array)
	 {
	  var len = arr.length;
	  if(len == 1) return arr;
	  var i = len * 2;
	  while(i > 0)
	  {
	   var idx1 = Math.floor(Math.random()* len);
	   var idx2 = Math.floor(Math.random()* len);
	   if(idx1 == idx2) continue;
	   var temp = arr[idx1];
	   arr[idx1] = arr[idx2];
	   arr[idx2] = temp;
	   i--;
	  }
	 }
	 return arr;
	}