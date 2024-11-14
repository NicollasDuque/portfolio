// Variáveis globais
let board = ['', '', '', '', '', '', '', '', ''];  // Tabuleiro
let currentPlayer = 'X';  // Jogador inicial
let gameActive = true;

// Seleção dos elementos DOM
const openGameBtn = document.getElementById('openGameBtn');
const gamePopup = document.getElementById('gamePopup');
const closeBtn = document.getElementById('closeBtn');
const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('gameStatus');

// Função para abrir a pop-up
openGameBtn.addEventListener('click', () => {
    gamePopup.style.display = 'flex';
    resetGame();
});

// Função para fechar a pop-up
closeBtn.addEventListener('click', () => {
    gamePopup.style.display = 'none';
});

// Função para desenhar o tabuleiro
function renderBoard() {
    gameBoard.innerHTML = '';  // Limpar tabuleiro anterior
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        gameBoard.appendChild(cellElement);
    });
}

// Função que lida com o clique em uma célula
function handleCellClick(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        renderBoard();
        checkGameStatus();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Função para verificar o status do jogo
function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Checar se alguém ganhou
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameStatus.textContent = `${board[a]} venceu!`;
            gameActive = false;
            return;
        }
    }

    // Checar se o jogo empatou
    if (!board.includes('')) {
        gameStatus.textContent = 'Empate!';
        gameActive = false;
    } else {
        gameStatus.textContent = `É a vez de ${currentPlayer}`;
    }
}

// Função para resetar o jogo
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = `É a vez de ${currentPlayer}`;
    renderBoard();
}

// Inicializa o tabuleiro ao carregar
renderBoard();
