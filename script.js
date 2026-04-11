const NUMBER_OF_ROWS = 3;
const turns = NUMBER_OF_ROWS ** 2;
const container = document.querySelector(".container");
const resetButton = document.querySelector("#reset");

let currentPlayer = "X";
let turnsCounter = 0;

let board = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];

const resetBoard = () => {
  document.querySelector(".board").remove();
  createBoard();
  board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  currentPlayer = "X";
  turnsCounter = 0;
};

const checkRows = (currentPlayer) => {
  let column = 0;

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    while (column < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        column = 0;
        break;
      }
      column++;
    }
    if (column === NUMBER_OF_ROWS) return true;
  }
};

const checkColumns = (currentPlayer) => {
  let row = 0;

  for (let column = 0; column < NUMBER_OF_ROWS; column++) {
    while (row < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        row = 0;
        break;
      }
      row++;
    }
    if (row === NUMBER_OF_ROWS) return true;
  }
};

const checkMainDiagonals = (currentPlayer) => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][count] !== currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === NUMBER_OF_ROWS) return true;
};

const checkReverseDiagonals = (currentPlayer) => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][NUMBER_OF_ROWS - 1 - count] !== currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === NUMBER_OF_ROWS) return true;
};

const checkWin = (currentPlayer) => {
  return (
    checkRows(currentPlayer) ||
    checkColumns(currentPlayer) ||
    checkMainDiagonals(currentPlayer) ||
    checkReverseDiagonals(currentPlayer)
  );
  /*
  if (checkRows(currentPlayer)) return true;

  if (checkColumns(currentPlayer)) return true;

  if (checkMainDiagonals(currentPlayer)) return true;

  if (checkReverseDiagonals(currentPlayer)) return true;
  
  return false;
  */
};

const runWinEvent = (currentPlayer) => {
  setTimeout(() => {
    alert(`Player ${currentPlayer} WON !`);
    resetBoard();
  }, 100);
};

const runDrawEvent = () => {
  setTimeout(() => {
    alert("Draw!");
    resetBoard();
  }, 100);
};

const getCellPlacement = (index, nOfRows) => {
  const row = Math.floor(index / nOfRows);
  const col = index % nOfRows;

  return [row, col];
};

const drawMarkInCell = (cell, currentPlayer) => {
  cell.querySelector(".value").textContent = currentPlayer;
  cell.classList.add(`cell--${currentPlayer}`);
};

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const [row, col] = getCellPlacement(index, NUMBER_OF_ROWS);

  if (board[row][col] === "_") {
    turnsCounter++;
    board[row][col] = currentPlayer;
    drawMarkInCell(cell, currentPlayer);

    if (checkWin(currentPlayer)) {
      runWinEvent(currentPlayer);
    } else {
      turnsCounter === turns && runDrawEvent();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
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

resetButton.addEventListener("click", resetBoard);

createBoard();
