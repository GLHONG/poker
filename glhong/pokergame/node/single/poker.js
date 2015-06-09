var Deck = require('./deck.js');
var User = require('./user.js');
var Card = require('./card.js');
var PokerEvaluator = require('poker-evaluator');

function Poker(data){
   // pub methods
    this.init = function() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.user_card = new User();
        this.server_card = new User();
        this.community_cards = new User();

        this.user_card.hand(this.deck.pop());
        this.server_card.hand(this.deck.pop());
        this.user_card.hand(this.deck.pop());
        this.server_card.hand(this.deck.pop());

        this.stage = data.stage;
        this.betting_money = data.betting_money;
    };

    this.init();
}

Poker.prototype.flop = function(data){
    this.stage = data.stage;
    if(data.betting_option == "raise" || data.betting_option == "raise")
        this.betting_money = parseInt(this.betting_money) + parseInt(data.betting_money * 2);
    this.deck.pop();
    this.community_cards.hand(this.deck.pop());
    this.community_cards.hand(this.deck.pop());
    this.community_cards.hand(this.deck.pop());
}

Poker.prototype.turn = function(data){
    this.stage = data.stage;
    if(data.betting_option == "raise" || data.betting_option == "raise")
        this.betting_money = parseInt(this.betting_money) + parseInt(data.betting_money * 2);
    this.deck.pop();
    this.community_cards.hand(this.deck.pop());
}

Poker.prototype.river = function(data){
    this.stage = data.stage;
    if(data.betting_option == "raise" || data.betting_option == "raise")
        this.betting_money = parseInt(this.betting_money) + parseInt(data.betting_money * 2);
    this.deck.pop();
    this.community_cards.hand(this.deck.pop());
}

Poker.prototype.showdown = function(data){
    this.stage = data.stage;
    if(data.betting_option == "raise" || data.betting_option == "raise")
        this.betting_money = parseInt(this.betting_money) + parseInt(data.betting_money * 2);

    var card = new Card();
    var user_hands = [];
    var server_hands = [];

    for(var i=0; i<this.user_card.cards.length; i++){
        user_hands.push(card.get_short_name(this.user_card.cards[i].symbol, this.user_card.cards[i].rank));
        server_hands.push(card.get_short_name(this.server_card.cards[i].symbol, this.server_card.cards[i].rank));
    }
    for(var i=0; i<this.community_cards.cards.length; i++){
        user_hands.push(card.get_short_name(this.community_cards.cards[i].symbol, this.community_cards.cards[i].rank));
        server_hands.push(card.get_short_name(this.community_cards.cards[i].symbol, this.community_cards.cards[i].rank));
    }

    console.log("user_hands: " + user_hands);
    console.log("server_hands: " + server_hands);
    this.user_hands_result = PokerEvaluator.evalHand(user_hands);
    this.server_hands_result = PokerEvaluator.evalHand(server_hands);
}
module.exports = Poker;

//{ cards: [ { symbol: 2, rank: 4 }, { symbol: 0, rank: 13 } ] }

