const NUMBER_OF_ROWS = 3;
const turns = NUMBER_OF_ROWS ** 2;
const container = document.querySelector(".container");
let currentPlayer = "X";
let turnsCounter = 3;

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const row = Math.floor(index / NUMBER_OF_ROWS);
  const col = index % NUMBER_OF_ROWS;
  console.log({ cell, row, col });
};

const createBoard = () => {
  const board = document.createElement("div");
  board.classList.add("board");

  for (let i = 0; i < NUMBER_OF_ROWS ** 2; i++) {
    const cellElementString = `<div class="cell"><span class="value"></span></div>`;
    const cellElement = document
      .createRange()
      .createContextualFragment(cellElementString);
    cellElement.querySelector(".cell").onclick = (event) =>
      cellClickHandler(event, i);
    board.appendChild(cellElement);

    document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
  }

  container.insertAdjacentElement("afterbegin", board);
};
createBoard();
