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
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const tableBody = document.getElementById("rank-info");

  // Clear existing table rows
  tableBody.innerHTML = "";

  players.forEach((player, index) => {
    const row = document.createElement("tr");

    const rankCell = document.createElement("td");
    rankCell.textContent = index + 1;
    row.appendChild(rankCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = player.name;
    row.appendChild(nameCell);

    const timeCell = document.createElement("td");
    timeCell.textContent = player.time;
    row.appendChild(timeCell);

    tableBody.appendChild(row);
  });
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
