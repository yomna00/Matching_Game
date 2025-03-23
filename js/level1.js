const grid = document.querySelector(".grid");
const restartBtn = document.getElementById("restart");
const matchSound = document.getElementById("match-sound");
const mismatchSound = document.getElementById("mismatch-sound");
const timerDisplay = document.getElementById("timer");

let symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🥝", "🍊", "🍍"];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedCards = [];
let timer;
let timeElapsed = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
  clearInterval(timer);
  timeElapsed = 0;
  timer = setInterval(() => {
    timeElapsed++;
    let minutes = String(Math.floor(timeElapsed / 60)).padStart(2, "0");
    let seconds = String(timeElapsed % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function createBoard() {
  grid.innerHTML = "";
  cards = shuffle(cards);
  cards.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.innerHTML = "?";
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });
  startTimer();
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    this.classList.add("flipped");
    this.innerHTML = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchSound.play();
    matchedCards.push(card1, card2);

    if (matchedCards.length === cards.length) {
      clearInterval(timer);
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.innerHTML = "?";
    card2.innerHTML = "?";
    mismatchSound.play();
  }
  flippedCards = [];
}

restartBtn.addEventListener("click", () => {
  matchedCards = [];
  flippedCards = [];
  createBoard();
});

createBoard();
