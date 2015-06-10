function Poker(){
    this.init = function() {
        var user_data = this.get_user_data();
        this.stage_name = [null, "Preflop!", "Flop!", "Turn!", "River!", "Showdown!"];
        this.email = user_data.data.email;
        this.username = user_data.data.username;
        this.coin = user_data.data.coin;
        this.room = this.email + this.username;
        this.stage = 1;
    }
    this.init();
}

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

Poker.prototype.user_betting = function(money){
    if(parseInt(money) > parseInt(this.coin))
        return false;

    this.coin = parseInt(this.coin) - parseInt(money);
    return true;

}

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

Poker.prototype.from_dealer = function(data) {
    if(data.stage === 1){
        $('#user_card_1').attr('src', '/static/img/cards/' + data.user_card.cards[0].symbol + data.user_card.cards[0].rank + '.png');
        $('#user_card_2').attr('src', '/static/img/cards/' + data.user_card.cards[1].symbol + data.user_card.cards[1].rank + '.png');
        poker.stage = poker.stage + 1;
        tag_abled();
        $('#notice').text('Preflop! 배팅하세요!');
        $('#all_betting_money').text(data.betting_money);
    } else if(data.stage === 2 || data.stage === 3 || data.stage === 4) {
        for(i=0; i<data.stage+1; i++)
            $('#community_card_' + (i+1)).attr('src', '/static/img/cards/' + data.community_cards.cards[i].symbol + data.community_cards.cards[i].rank + '.png');

        poker.stage = poker.stage + 1;
        tag_abled();
        $('#notice').text(this.stage_name[data.stage] + "배팅하세요!");
        $('#all_betting_money').text(data.betting_money);

    } else if(data.stage === 5){
        $('#server_card_1').attr('src', '/static/img/cards/' + data.server_card.cards[0].symbol + data.server_card.cards[0].rank + '.png');
        $('#server_card_2').attr('src', '/static/img/cards/' + data.server_card.cards[1].symbol + data.server_card.cards[1].rank + '.png');
        $('#user_result').text("Hand: " + data.user_hands_result.handName + ", Value: " + data.user_hands_result.value);
        $('#server_result').text("Hand: " + data.server_hands_result.handName + ", Value: " + data.server_hands_result.value);
        if(data.server_hands_result.value > data.user_hands_result.value)
            $('#result').text("당신은 패배했습니다.");
        else
            $('#result').text("당신은 승리했습니다.");

    } else {
        alert("bye");
        //
        // 사용자 돈 차감
        //
        location.href = '/game/';
    }
}

function tag_disabled() {
    $('#betting_money').attr("disabled", "disabled");
    $('#betting_btn').attr("disabled", "disabled");
    $('#betting_option').attr("disabled", "disabled");
    $('#betting_money').val("");
}

function tag_abled(){
    $('#betting_money').removeAttr("disabled");
    $('#betting_option').removeAttr("disabled");
    $('#betting_btn').removeAttr("disabled");
}