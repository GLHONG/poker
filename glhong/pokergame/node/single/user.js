// Deck Class
function User(){
    this.cards = [];
}
User.prototype.hand = function(card){
    this.cards.push(card);
}

User.prototype.print = function(){
    console.log(this.cards);
}


module.exports = User;