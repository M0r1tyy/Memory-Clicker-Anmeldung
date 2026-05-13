
const cards = [
    "🍎", "🍌", "🍇", "🍒", "🍉", "🍍", "🥝", "🍑", "🍓", "🥥",
    "🍋", "🍊", "🍐", "🍈", "🍏", "🍅", "🥑", "🌽", "🥕", "🌶️",
    "🫐", "🍆", "🥔", "🧄", "🧅", "🍄", "🥦", "🍩", "🍪", "🍫",
    "🍿", "🍔", "🍕", "🌭", "🍣", "🍤", "🍰", "🍦", "🍧", "🍨",
    "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🎱", "🏓", "🏸", "🥊",
    "🚗", "🚕", "🚙", "🚌", "🚓", "🚑", "🚒", "🚜", "✈️", "🚀",
    "⌚", "📱", "💻", "🖥️", "🖨️", "📷", "🎧", "🎮", "🧩", "🔑"]

let firstCard = null;
let secondCard = null;
let boardLocked = false;
let attempts = 0;
let winCount = 0;
var SIZE = 2;


function selectSize(event) {

    SIZE = event.currentTarget.value;
    buildBoard(SIZE);
}

function buildBoard(size) {

    const board = document.getElementById("board");
    board.innerHTML = "";

    attempts = 0;
    document.getElementById("attempts").textContent = attempts;

    let columns;

    if (size <= 4) columns = 2;
    else if (size <= 8) columns = 4;
    else if (size <= 18) columns = 6;
    else if (size <= 32) columns = 8;
    else if (size <= 50) columns = 10;
    else if (size <= 72) columns = 12;
    else if (size <= 98) columns = 14;
    else columns = 4;

    board.style.gridTemplateColumns = `repeat(${columns}, 100px)`;

    let pairs = size / 2;

    const gameSize = cards.slice(0, pairs);

    const gameCards = [...gameSize, ...gameSize];
    shuffle(gameCards);

    gameCards.forEach(symbol => {

        let card = document.createElement("div");
        card.classList.add("card");

        card.dataset.symbol = symbol;

        card.addEventListener("click", onCardClick);

        board.appendChild(card);
    });
}

// hasTwoCards != true
// !hasTwoCards
// if(!flipCard())

function onCardClick(event) {
    let targetCard = event.currentTarget;

    if (!flipCard(targetCard)) {
        return;
    }

    let hasMatch = checkMatch();
    if (!hasMatch) {
        return;
    }
    if (!checkWin()) {
        return;
    }
    resetALL();
}




// trigger on cardclick
function flipCard(targetCard) {


    if (targetCard.classList.contains("flipped")) {

        return false;
    }

    if (boardLocked) return false;

    if (targetCard === firstCard) return false;

    targetCard.classList.add("flipped");
    targetCard.textContent = targetCard.dataset.symbol;

    if (!firstCard) {
        firstCard = targetCard;
        return false;
    }

    secondCard = targetCard;

    attempts++;
    document.getElementById("attempts").textContent = attempts;
    return true;
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        console.log("add class");
        console.log(secondCard.classList);

        resetBoard();
        return true;
    } else {
        boardLocked = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");


            firstCard.textContent = "";
            secondCard.textContent = "";

            resetBoard();

        }, 800);
        return false;
    }
}

function resetBoard() {

    firstCard = null;
    secondCard = null;
    boardLocked = false;
}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkWin() {
    // select all not matched 
    if (document.querySelectorAll(".card:not(.matched)").length === 0) {

        alert("Gewonnen!");
        console.log("test");
        winCount++;
        document.getElementById("winCount").textContent = "Siege: " + winCount;
        return true;
    }
}

function resetALL() {

    firstCard = null;
    secondCard = null;
    boardLocked = false;
    buildBoard(SIZE);
}

