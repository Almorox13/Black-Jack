let deck = [];
let types = ["C", "H", "D", "S"];
let specials = ["A", "J", "Q", "K"];

//Creacion de una baraja desordenada
const crearDeck = () => {
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

//Funcion para dar una carta al usuario
const pedirCarta = () => deck === 0 ? 'No quedan cartas en la baraja' : deck.pop();

//Valor de las cartas
const valorCarta = (carta) => { 

  const valor = carta.substring(0, carta.length - 1);
  return (isNaN(valor)) ? 
          (valor === 'A') ? 11 : 10 : valor * 1;
}

crearDeck();
console.log({...deck});
console.log(valorCarta(pedirCarta()));
console.log(deck);
