let deck = [];
let types = ["C", "H", "D", "S"];
let specials = ["A", "J", "Q", "K"];

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (const type of types) {
      deck.push(i + type);
    }
  }
  for (const special of specials) {
    for (const type of types) {
      deck.push(special + type);
    }
  }
  deck = _.shuffle(deck);
};

createDeck();
console.log(deck);
