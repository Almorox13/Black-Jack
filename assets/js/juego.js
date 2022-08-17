let deck = [];
let puntosJugador = 0;
let puntosCrupier = 0;

const types = ["C", "H", "D", "S"];
const specials = ["A", "J", "Q", "K"];

const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

const txtJugador = document.querySelector("#txtJugador");
const txtCrupier = document.querySelector("#txtCrupier");

const divCartaJugador = document.querySelector("#cartas-jugador");
const divCartaCrupier = document.querySelector("#cartas-crupier");

const rutaImagenes = "assets/img/";
const extensionImg = ".png";

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
const pedirCarta = () =>
  deck === 0 ? "No quedan cartas en la baraja" : (carta = deck.pop());

//Valor de las cartas
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

//Pintar una carta
const pintarCarta = (carta, jugador) => {
  let img = document.createElement("img");
  img.src = rutaImagenes + carta + extensionImg;
  img.className = "carta";

  if (jugador === 0) {
    divCartaJugador.append(img);
  } else {
    divCartaCrupier.append(img);
  }
};

//Comprobacion de puntos del jugador
const comprobarPuntosJugador = () => {
  if (puntosJugador > 21) {
    txtJugador.style.color = "red";
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    puntosJugador = 0.1;
    turnoCrupier();
  }
  if (puntosJugador == 21) {
    txtJugador.style.color = "blue";
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCrupier();
  }
};

//Comprobacion de los puntos del crupier
const comprobarPuntosCrupier = () => {
  console.log(puntosCrupier);

  if (puntosCrupier > 21) {
    txtCrupier.style.color = "red";
    txtJugador.style.color = "blue";
  } else {
    if (puntosCrupier > puntosJugador || puntosCrupier == 21) {
      txtCrupier.style.color = "blue";
      txtJugador.style.color = "red";
    }
    if (puntosCrupier == puntosJugador) {
      txtCrupier.style.color = "yellow";
      txtJugador.style.color = "yellow";
    }
  }
};

//Turno del crupier
const turnoCrupier = () => {
  while (puntosJugador >= puntosCrupier && puntosCrupier < 21) {
    let carta = pedirCarta();
    pintarCarta(carta, 1);
    puntosCrupier = puntosCrupier + valorCarta(carta);
    txtCrupier.innerHTML = puntosCrupier;
  }
  comprobarPuntosCrupier();
};

//Evento pedir carta
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  pintarCarta(carta, 0);
  puntosJugador = puntosJugador + valorCarta(carta);
  txtJugador.innerHTML = puntosJugador;
  comprobarPuntosJugador();
});

//Evento nuevo juego
btnNuevo.addEventListener("click", () => {
  while (divCartaJugador.firstChild) {
    divCartaJugador.removeChild(divCartaJugador.lastChild);
  }
  while (divCartaCrupier.firstChild) {
    divCartaCrupier.removeChild(divCartaCrupier.lastChild);
  }
  puntosJugador = 0;
  puntosCrupier = 0;
  txtCrupier.innerHTML = puntosCrupier;
  txtJugador.innerHTML = puntosJugador;
  btnPedir.disabled = false;
  btnDetener.disabled = false;
  txtJugador.style.color = "white";
  txtCrupier.style.color = "white";
  crearDeck();
});

//Evento de plantarse
btnDetener.addEventListener("click", () => {
  turnoCrupier();
  btnPedir.disabled = true;
  btnDetener.disabled = true;
});

crearDeck();
