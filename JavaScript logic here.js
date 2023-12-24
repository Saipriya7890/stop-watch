// JavaScript logic here

// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to handle player move
function playerMove(cell) {
  const index = cell.dataset.index;

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
    togglePlayer();
  }
}

// Function to check for a win or draw
function checkResult() {
  for (let i = 0; i < winCombinations.length; i++) {
    const [a, b, c] = winCombinations[i];
    if (
      gameBoard[a] !== '' &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameActive = false;
      displayStatus(`${currentPlayer} wins!`);
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    displayStatus('It\'s a draw!');
  }
}

// Function to toggle players
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to display game status
function displayStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
  });

  displayStatus('');
}

// Create the game board
const board = document.getElementById('board');
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', () => playerMove(cell));
  board.appendChild(cell);
}
