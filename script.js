function createBoard(n) {
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.gridTemplateColumns = repeat(${n}, 50px);
  board.style.gridTemplateRows = repeat(${n}, 50px);

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const cell = document.createElement("div");
      cell.className = "cell " + ((row + col) % 2 === 0 ? "white" : "black");
      cell.id = cell-${row}-${col};
      board.appendChild(cell);
    }
  }
}

function placeQueens(board, row, n, callback) {
  if (row === n) {
    callback(board);
    return true;
  }

  for (let col = 0; col < n; col++) {
    if (isSafe(board, row, col)) {
      board[row] = col;
      if (placeQueens(board, row + 1, n, callback)) return true;
    }
  }

  return false;
}

function isSafe(board, row, col) {
  for (let i = 0; i < row; i++) {
    if (
      board[i] === col ||
      board[i] - i === col - row ||
      board[i] + i === col + row
    ) {
      return false;
    }
  }
  return true;
}

function drawQueens(boardArray) {
  const n = boardArray.length;
  for (let row = 0; row < n; row++) {
    const col = boardArray[row];
    const cell = document.getElementById(cell-${row}-${col});
    if (cell) {
      cell.classList.add("queen");
    }
  }
}

function startSimulation() {
  const n = parseInt(document.getElementById("boardSize").value);
  if (n < 4 || n > 20) {
    alert("Please enter N between 4 and 20");
    return;
  }

  createBoard(n);
  const boardArray = new Array(n).fill(-1);
  placeQueens(boardArray, 0, n, drawQueens);
}
