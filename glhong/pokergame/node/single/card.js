// Constructor
function Card(suit, rank) {
  // always initialize all instance properties
    symbol_names = ["Clubs", "Diamonds", "Hearts", "Spades"];
    rank_names = [null, "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]

    this.symbol = suit;
    this.rank = rank;
}

Card.prototype.print = function(symbol, rank) {
    console.log(symbol_names[symbol], rank_names[rank]);
}

// export the class
module.exports = Card;