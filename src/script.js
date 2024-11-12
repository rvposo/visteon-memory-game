const inputPlayerName = document.querySelector(".player-name");
const playButton = document.querySelector(".play-button");

const ValidatePlayer = ({ target }) => {
  if (target.value.length > 3) {
    playButton.removeAttribute("disabled");
    return;
  }
  playButton.setAttribute("disabled", "");
};

const Play = (event) => {
  event.preventDefault();

  localStorage.setItem("players", inputPlayerName.value);
  //window.location = "pages/game.html";
};

inputPlayerName.addEventListener("input", ValidatePlayer);
playButton.addEventListener("submit", Play);
