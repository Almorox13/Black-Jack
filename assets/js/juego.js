(() => {

  let deck = [],
      puntosJugador = 0,
      puntosCrupier = 0;

  const types = ["C", "H", "D", "S"],
        specials = ["A", "J", "Q", "K"];

  const btnNuevo = document.querySelector("#btnNuevo"),
        btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener");

  const txtJugador = document.querySelector("#txtJugador"),
        txtCrupier = document.querySelector("#txtCrupier");

  const divCartas = document.querySelectorAll('.divCartas');
        
  const rutaImagenes = "assets/img/";
        extensionImg = ".png";

  //Funcion para inicializar el juego
  const inicializar = () => {
    deck = crearDeck();
  }

  //Creacion de una baraja desordenada
  const crearDeck = () => {

    deck = [];

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
    return _.shuffle(deck);
  };

  //Funcion para dar una carta al usuario
  const pedirCarta = () =>
    deck === (0 || undefined) ? "No quedan cartas en la baraja" : (carta = deck.pop());

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
      divCartas[0].append(img);
    } else {
      divCartas[1].append(img);
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

  //Borramos las cartas de la mesa
  const borrarCartas = () => {

    while (divCartas.firstChild) {
      divCartas.removeChild(divCartas.lastChild);
    }
   
  }

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
    if(carta != "No quedan cartas en la baraja"){
      pintarCarta(carta, 0);
      puntosJugador = puntosJugador + valorCarta(carta);
      txtJugador.innerHTML = puntosJugador;
      comprobarPuntosJugador();
    }else{
      alert("Baraja vacía");
    }
  });

  //Evento nuevo juego
  btnNuevo.addEventListener("click", () => {
    
    borrarCartas();
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

  inicializar();
})();
