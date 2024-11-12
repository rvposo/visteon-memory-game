const inputPlayerName = document.querySelector(".player-name");
const playButton = document.querySelector(".play-button");

const ValidatePlayer = ({ target }) => {
  if (target.value.length > 3) {
    playButton.removeAttribute("disabled");
    return;
    console.log("working");
  }
  playButton.setAttribute("disabled", "");
};

const Play = (event) => {
  event.preventDefault();
  localStorage.setItem("player", inputPlayerName.value);
  console.log(inputPlayerName.value);
};

inputPlayerName.addEventListener("input", ValidatePlayer);
playButton.addEventListener("submit", Play);
