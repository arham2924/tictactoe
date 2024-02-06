const board = document.getElementById('game-board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameWon = false;

function createCell(index) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = index;
    cell.addEventListener('click', handleClick);
    return cell;
}

function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = createCell(i);
        cell.textContent = gameBoard[i];
        board.appendChild(cell);
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameWon = true;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        return 'draw';
    }

    return null;
}


function handleClick(event) {
    const cellIndex = event.target.dataset.index;
    if (!gameBoard[cellIndex] && !gameWon) {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
        const winner = checkWinner();
        if (winner) {
            if (winner === 'draw') {
                message.textContent = "It's a draw!";
            } else {
                message.textContent = `Player ${winner} wins!`;
            }
        }
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameWon = false;
    currentPlayer = 'X';
    message.textContent = '';
    renderBoard();
}

renderBoard();
resetButton.addEventListener('click', resetGame);