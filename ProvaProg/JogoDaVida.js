const numRows = 17;
const numCols = 20;
let board = createBoard(numRows, numCols);

// Cria um tabuleiro vazio com o número de linhas e colunas especificado
function createBoard(rows, cols) {
  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}

// Inicializa o tabuleiro HTML com células vazias
function initializeBoard() {
  const table = document.getElementById("board");
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("td");
      cell.addEventListener("click", toggleCellState);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Altera o estado de uma célula quando ela é clicada
function toggleCellState() {
  this.classList.toggle("alive");
  const row = this.parentNode.rowIndex;
  const col = this.cellIndex;
  board[row][col] = board[row][col] === 0 ? 1 : 0;
}

// Atualiza o estado do tabuleiro de acordo com as regras do jogo
function updateBoard() {
  const newBoard = createBoard(numRows, numCols);
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const numNeighbors = countNeighbors(i, j);
      if (board[i][j] === 1 && (numNeighbors === 2 || numNeighbors === 3)) {
        newBoard[i][j] = 1;
      } else if (board[i][j] === 0 && numNeighbors === 3) {
        newBoard[i][j] = 1;
      }
    }
  }
  board = newBoard;
  renderBoard();
}

// Conta o número de vizinhos vivos de uma célula
function countNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const neighborRow = (row + i + numRows) % numRows;
      const neighborCol = (col + j + numCols) % numCols;
      count += board[neighborRow][neighborCol];
    }
  }
  return count;
}

// Renderiza o estado atual do tabuleiro no HTML
function renderBoard() {
  const table = document.getElementById("board");
  const cells = table.getElementsByTagName("td");
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cellIndex = i * numCols + j;
      if (board[i][j] === 1) {
        cells[cellIndex].classList.add("alive");
      } else {
        cells[cellIndex].classList.remove("alive");
      }
    }
  }
}

// Inicializa o tabuleiro e atualiza a cada segundo
initializeBoard();
setInterval(updateBoard, 1000);
