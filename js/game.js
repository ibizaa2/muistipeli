import { createBoard, resetBoard, resetAttempts } from './board.js';


let cardCount;

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    const gameBoard = document.getElementById('game-board');


    cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);
    if (cardCount % 2 !== 0) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }
    createBoard(cardCount);

    restartBtn.onclick = () => {
        resetAttempts();
        cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);
          if (cardCount % 2 !== 0) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }
        gameBoard.innerHTML = '';  // tyhjennä laudalta vanhat kortit
        resetBoard();              
        createBoard(cardCount);    
    };
});
