/**
 * Created by Hong on 15. 6. 8..
 */
var Card = require('./card.js');
var Deck = require('./deck.js');
var User = require('./user.js');

var card = new Card(0, 2);
var deck = new Deck();
deck.shuffle();
deck.get_card_list();

var user1 = new User();
var user2 = new User();

user1.hand(deck.pop());
user1.hand(deck.pop());

console.log(user1.cards);