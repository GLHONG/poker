function Poker(){

    // 게임 초기화
    this.init = function() {
        var user_data = this.get_user_data();
        this.stage_name = [null, "Preflop!", "Flop!", "Turn!", "River!", "Showdown!"];
        this.email = user_data.data.email;
        this.username = user_data.data.username;
        this.coin = user_data.data.coin;
        this.room = this.email + this.username;
        this.stage = 1;

        $('#notice').text("첫 배팅 금액을 입력 후 게임을 시작하세요.");
        $('#usercoin').text(this.coin);
        $('#betting_money').text("0");
        $('#betting').val("0");
        $('#betting').removeAttr("disabled");
        $('#betting_btn').removeAttr("disabled");
        $("#betting_option").val("default");
        $('#betting_option').attr("disabled", "disabled");
        $('.play-panel').css('border-color', '');
        $('.play-panel').css('border-width', '');
        $('.panel-result').text('');
        $('.img-responsive').attr('src', '/static/img/cards/back.png');
    }
    this.init();
}

// 회원 정보 가져오기
Poker.prototype.get_user_data = function(){
    var data = "";
    $.ajax({
        url : "/api/user/detail/",
        type : "GET",
        dataType: "JSON",
        async: false,
        success : function(json) {
          data = json;
        },
        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
    return data;
}

// 사용자가 배팅한 금액 검사
// 배팅한 금액이 사용자가 소지한 금액보다 적을시에는 error 리턴
// 배팅한 금액 이상을 소지한 경우에는 사용자의 코인에서 배팅 금액 차감
Poker.prototype.isBetting = function(money){
    if(parseInt(money) > parseInt(this.coin))
        return false;

    this.coin = parseInt(this.coin) - parseInt(money);
    return true;

}

// 서버에게 게임 진행 통신
// 스테이지 1일 경우에는 서버에 값을 보내서 게임 방을 생성
Poker.prototype.to_dealer = function(money, option) {

    if(this.stage == 1) {
        tag_disabled();
        socket.emit('join', {
            "room": poker.room,
            "stage": poker.stage,
            "betting_money": money
        });
    } else if(this.stage === 2 || this.stage === 3 || this.stage === 4 || this.stage === 5) {
        tag_disabled();
        socket.emit('to_dealer', {
            "room": poker.room,
            "stage": poker.stage,
            "betting_option": option,
            "betting_money": money
        });
    }
}


// 서버로부터 값을 받아온 경우
// 스테이지 1인 경우에는 사용자의 카드를 화면에 띄운 후 배팅할 수 있도록 필요 태그들 활성화
// 스테이지 2, 3, 4의 경우에는 커뮤니티 카드를 차례대로 공개
// 스테지이지 5의 경우에는 마지막 스테이지이므로 상대방의 카드를 공개하고 결과를 표시.
// 그 후 결과를 db에 적용
// 배팅 옵션이 fold인 경우에는 배팅한 금액을 db에 적용
Poker.prototype.from_dealer = function(data) {
    if(data.stage === 1){
        $('#user_card_1').attr('src', '/static/img/cards/' + data.user_card.cards[0].symbol + data.user_card.cards[0].rank + '.png');
        $('#user_card_2').attr('src', '/static/img/cards/' + data.user_card.cards[1].symbol + data.user_card.cards[1].rank + '.png');
        poker.stage = poker.stage + 1;
        tag_abled();
        $('#notice').text('Preflop! 배팅하세요!');
        $('#betting_money').text(data.betting_money);
    } else if(data.stage === 2 || data.stage === 3 || data.stage === 4) {
        for(i=0; i<data.stage+1; i++)
            $('#community_card_' + (i+1)).attr('src', '/static/img/cards/' + data.community_cards.cards[i].symbol + data.community_cards.cards[i].rank + '.png');

        poker.stage = poker.stage + 1;
        tag_abled();
        $('#notice').text(this.stage_name[data.stage] + " 배팅하세요!");
        $('#betting_money').text(data.betting_money);

    } else if(data.stage === 5){
        var win = 0, draw = 0, lose = 0, result_coin = 0;
        $('#server_card_1').attr('src', '/static/img/cards/' + data.server_card.cards[0].symbol + data.server_card.cards[0].rank + '.png');
        $('#server_card_2').attr('src', '/static/img/cards/' + data.server_card.cards[1].symbol + data.server_card.cards[1].rank + '.png');
        $('#user_result').text("Hand: " + data.user_hands_result.handName + ", Value: " + data.user_hands_result.value);
        $('#server_result').text("Hand: " + data.server_hands_result.handName + ", Value: " + data.server_hands_result.value);

        $('.play-panel').css('border-width', 'thick');
        if(data.server_hands_result.value > data.user_hands_result.value){
            $('.user-panel').css('border-color', 'red');
            $('.server-panel').css('border-color', 'green');
            lose = 1;
            result_coin = this.coin;
        } else if(data.server_hands_result.value < data.user_hands_result.value){
            $('.user-panel').css('border-color', 'green');
            $('.server-panel').css('border-color', 'red');
            win = 1;
            result_coin = (parseInt(this.coin) + parseInt(data.betting_money));
        } else {
            $('.user-panel').css('border-color', 'yellow');
            $('.server-panel').css('border-color', 'yellow');
            lose = 1;
            result_coin = (parseInt(this.coin) + (parseInt(data.betting_money) / 2))
        }
        
        update_user_info(result_coin, win, draw, lose);


    } else {
        update_user_info(this.coin, 0, 0, 1);
    }
}

// 회원 정보 수정(코인, 승, 무, 패)
function update_user_info(coin, win, draw, lose) {
    $.ajax({
        url : "/api/user/update/game_result",
        type : "GET",
        data : "email=" + poker.email + "&coin=" + coin + "&win=" + win + "&draw=" + draw + "&lose=" + lose,
        dataType: "JSON",
        success : function(json) {
            if(confirm("한 번 더 하시겠습니까?")){
                poker.init();
            } else {
                update_user_info(result_coin, win, draw, lose);
                location.href='/game/';
            }
        },
        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });


}

// 태그 비활성화
function tag_disabled() {
    $('#betting_money').attr("disabled", "disabled");
    $('#betting_btn').attr("disabled", "disabled");
    $('#betting_option').attr("disabled", "disabled");
    $('#betting_money').val("");
}

// 태그 활성화
function tag_abled(){
    $('#betting_money').removeAttr("disabled");
    $('#betting_option').removeAttr("disabled");
    $('#betting_btn').removeAttr("disabled");
}