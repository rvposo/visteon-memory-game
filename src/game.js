const grid = document.querySelector(".grid");

const carsCards = ["gm", "hyundai", "renault", "stellantis", "vw"];

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

  if (disabledCards.length === 10) {
    console.log(localStorage.getItem("player"));
    //ao adicionar mais cartas, usar comparação entre o array de cartas desabilitadas e o total de cartas (duplicateCards)
    setTimeout(() => {
      alert(
        `O jogador ${localStorage.getItem(
          "player"
        )} finalizou o jogo, setor ${localStorage.getItem("area")} `
      );
    }, 500);
  }
};

loadGame();
