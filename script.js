const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const aiToggleBtn = document.getElementById('ai-toggle-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');
let isAIActive = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;

    if (isAIActive && currentPlayer === 'O') {
        setTimeout(aiMove, 500);
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function aiMove() {
    const availableCells = gameState
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = Array(9).fill('');
    cells.forEach(cell => (cell.textContent = ''));
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function toggleAI() {
    isAIActive = !isAIActive;
    aiToggleBtn.textContent = isAIActive ? 'Play Against Human' : 'Play Against AI';
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
aiToggleBtn.addEventListener('click', toggleAI);

statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
