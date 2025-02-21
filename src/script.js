const inputPlayerName = document.querySelector(".player-name");
const setArea = document.querySelector(".area");
const playerForm = document.querySelector(".play-button");
const submitButton = document.getElementById("botao-submit");
const playerTier = document.getElementById("player-tier");
const timeTier = document.getElementById("time-tier");
const placeTier = document.getElementById("place-tier");
const tierlist = document.getElementById("rank-info");
const playerInfo = document.getElementById("player-info");
const downloadButton = document.createElement("button");
const clearButton = document.createElement("button");

let players = JSON.parse(localStorage.getItem("players")) || [];

//players.map((p, index) => `${index + 1}. ${p.name} - ${p.time}s`).join("\n")
const rankList = () => {
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const tableBody = document.getElementById("rank-info");

  // Clear existing table rows
  tableBody.innerHTML = "";


  //todo: style the table

  players.forEach((player, index) => {
    const row = document.createElement("tr");

    const rankCell = document.createElement("td");
    rankCell.textContent = index + 1;
    row.appendChild(rankCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = player.name;
    row.appendChild(nameCell);

    const areaCell = document.createElement("td");
    areaCell.textContent = player.area;
    row.appendChild(areaCell);

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

const downloadTxt = () => {
  const players = JSON.parse(localStorage.getItem("players")) || [];

  const now = new Date();
  const dateTime = now.toLocaleString();

  const playerData = players.map((p, index) => `${index + 1}. ${p.name} - ${p.area} - ${p.time}s`).join("\n");
  const fileContent = `Download Datetime: ${dateTime}\n\n${playerData}`;

  const blob = new Blob([fileContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "rank.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const clearLocalStorage = () => {
  const confirmation = prompt("Dude, do you really wanna erase all players rank data? Type 'YES' to confirm");
  if (confirmation === 'YES') {
    localStorage.clear();
    alert("Data erased");
    rankList(); 
  }
};

downloadButton.textContent = "Download players data";
downloadButton.addEventListener("click", downloadTxt);
document.body.appendChild(downloadButton);

clearButton.textContent = "Clear local data";
clearButton.addEventListener("click", clearLocalStorage);
document.body.appendChild(clearButton);

inputPlayerName.addEventListener("input", ValidatePlayer);
playerForm.addEventListener("submit", Play);
rankList();
