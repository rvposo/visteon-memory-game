const inputPlayerName = document.querySelector(".player-name");
const setArea = document.querySelector(".area");
const playerForm = document.querySelector(".play-button");
const submitButton = document.getElementById("botao-submit");
const playerTier = document.getElementById("player-tier");
const timeTier = document.getElementById("time-tier");
const placeTier = document.getElementById("place-tier");
const tierlist = document.getElementById("rank-info");
const playerInfo = document.getElementById("player-info");
let players = JSON.parse(localStorage.getItem("players")) || [];

//players.map((p, index) => `${index + 1}. ${p.name} - ${p.time}s`).join("\n")
const rankList = () => {
  console.log(JSON.parse(localStorage.getItem("players")));

  console.log(
    players.map((p, index) => `${index + 1}. ${p.name} - ${p.time}s`).join("\n")
  );

  let playerRow = document.createElement("tr");

  // playerInfo.innerHTML = `<tr><td>${players[0]}</td></tr>
  //                         <tr><td>${localStorage.getItem("time")}</td> </tr>
  //                         <tr><td>${localStorage.getItem("")}</td> </tr>`; //usar localstorage PLAYERS

  playerInfo.innerHTML = players.map();
  tierlist.appendChild(playerInfo);

  // playerTier.innerHTML = localStorage.getItem("player");
};

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
  window.location = "pages/game.html";
};

inputPlayerName.addEventListener("input", ValidatePlayer);
playerForm.addEventListener("submit", Play);
rankList();
