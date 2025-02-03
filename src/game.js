/* 
TO DO: Adicionar mais 1 par de cartas e fazer grid 3x4 ou 4x3 (done)
       Adicionar incremento de jogadores, armazenar no localStorage e acrescentar no rank.
       Atualizar layout das cartas front e talvez back.

*/
const spanPlayerName = document.getElementById("Player-name");
const grid = document.querySelector(".grid");
const timer = document.querySelector(".timer");
const carsCards = ["gm", "hyundai", "renault", "stellantis", "vw", "vw2"];
let players = JSON.parse(localStorage.getItem("players")) || [];

const rankPlayers = () => {
  let aux;
  const player = {
    name: localStorage.getItem("player"),
    area: localStorage.getItem("area"),
    time: localStorage.getItem("time"),
  };

  player.time = 30 - localStorage.getItem("time");

  players.push(player);
  //localStorage.setItem("players", JSON.stringify(players));
  console.log(`player ${player.name} added`);
  console.log(players);

  //ordenação
  for (let i = 0; i <= players.length - 1; i++) {
    let min_i = i;

    for (let j = i + 1; j < players.length; j++) {
      if (players[j].time < players[min_i].time) {
        min_i = j;
      }
      aux = players[i];
      players[i] = players[min_i];
      players[min_i] = aux;
    }
  }

  alert(
    players.map((p, index) => `${index + 1}. ${p.name} - ${p.time}s`).join("\n")
  );

  localStorage.setItem("players", JSON.stringify(players));
};

const startTimer = () => {
  let timeLeft = 30;
  timer.innerHTML = timeLeft;
  this.loop = setInterval(() => {
    timeLeft -= 1;
    timer.innerHTML = timeLeft;
    if (timeLeft === 0) {
      clearInterval(this.loop);
      alert("Game over");
      window.location = "../index.html";
    }
  }, 1000);
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const createCard = (car) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../src/img/${car}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);

  card.setAttribute("data-card", car);

  return card;
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const checkCards = () => {
  const firstCar = firstCard.getAttribute("data-card");
  const secondCar = secondCard.getAttribute("data-card");

  if (firstCar === secondCar) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const loadGame = () => {
  const duplicateCards = [...carsCards, ...carsCards];
  const randomArray = duplicateCards.sort(() => Math.random() - 0.5);

  randomArray.forEach((car) => {
    const card = createCard(car);
    grid.appendChild(card);
  });
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 12) {
    console.log(localStorage.getItem("player"));
    setTimeout(() => {
      console.log(localStorage.getItem("time"));
      console.log(timer.innerHTML);
      alert(
        `O jogador ${localStorage.getItem(
          "player"
        )} finalizou o jogo, setor ${localStorage.getItem("area")}, tempo: ${
          30 - timer.innerHTML
        } `
      );

      localStorage.setItem("time", +timer.innerHTML);

      rankPlayers();
      window.location = "../index.html";
    }, 500);
  }
};

window.onload = () => {
  const playerName = localStorage.getItem("player");
  spanPlayerName.innerHTML = playerName;
  startTimer();
  loadGame();
};
