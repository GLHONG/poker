var Card = require('./card.js');

// Deck Class
function Deck(){
    this.cards = []
    // 카드 초기화
    for(i=0; i<4; i++){
        for(j=1; j<14; j++){
            card = new Card(i, j);
            this.cards.push(card);
        }
    }
}

// 현재 Deck의 카드 출력
Deck.prototype.get_card_list = function(){
    console.log(this.cards, this.cards.length);
}

// 카드 섞기
Deck.prototype.shuffle = function(){
    this.cards = shuffle(this.cards);
}

// 카드 빼기
Deck.prototype.pop = function(){
    popcard = this.cards.pop();
    return popcard;
}

// 배열을 넣으면 배열을 섞어주는 함수.
function shuffle(array){
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
}

// export the class
module.exports = Deck;