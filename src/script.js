const inputPlayerName = document.querySelector(".player-name");
const setArea = document.querySelector(".area");
const playerForm = document.querySelector(".play-button");
const submitButton = document.getElementById("botao-submit");

const ValidatePlayer = ({ target }) => {
  if (target.value.length > 3) {
    submitButton.removeAttribute("disabled");
    console.log("teste");
    return;
  }
  submitButton.setAttribute("disabled", "");
};

const Play = (event) => {
  event.preventDefault();

  localStorage.setItem("player", inputPlayerName.value);
  localStorage.setItem("area", setArea.value);
  //window.location = "pages/game.html";
};

inputPlayerName.addEventListener("input", ValidatePlayer);
playerForm.addEventListener("submit", Play);
