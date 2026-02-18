import { createCardElement } from "./card.js";

const allCards = [
    "🍎","🍐","🍒","🍉","🍇","🍓","🍌","🍍","🥝","🥥","🍑","🍈","🍋","🍊","🍏","🍅"
];
const gameBoard = document.getElementById("game-board");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
export let attempts = 0;

// fisher yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function createBoard(cardCount) {
    gameBoard.dataset.cardCount = cardCount;
    gameBoard.innerHTML = "";

    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);
    

    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement.addEventListener("click", handleCardFlip);
        gameBoard.appendChild(cardElement);
    });
}




function handleCardFlip(cardElement) {
    const card = cardElement.currentTarget;

    if (card.classList.contains("flipped")) return;
    if (lockBoard) return;

    card.classList.add("flipped");
    card.textContent = card.dataset.card;

  
    if (!firstCard) {
        firstCard = card;
        return;
    }


    
    secondCard = card;
    attempts++;
 

    console.log(attempts)
    lockBoard = true;

   
    checkForMatch();
}

export function resetAttempts(){
   
    attempts = 0;
}





function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();

    //tarkista onko peli voitettu
    const allCards = document.querySelectorAll(".card")
    if ([...allCards].every(card => card.classList.contains("flipped"))){
        alert("Voitit pelin! Yrityksiä: " + attempts)
    }
}

function disableCards() {
    firstCard.removeEventListener("click", handleCardFlip);
    secondCard.removeEventListener("click", handleCardFlip);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = "";
        secondCard.textContent = "";
        resetBoard();
    }, 1500);
}


export function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
