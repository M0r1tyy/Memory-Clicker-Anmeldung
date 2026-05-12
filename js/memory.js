
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


document.getElementById("sizeSelect").addEventListener("change", function () {
    const size = parseInt(this.value);
    buildBoard(size);
})


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

        card.addEventListener("click", flipCard);

        board.appendChild(card);
    });
}

// trigger on cardclick
function flipCard() {


    if (this.classList.contains("flipped")) {
        return;
    }

    if (boardLocked) return;

    if (this === firstCard) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;

    attempts++;
    document.getElementById("attempts").textContent = attempts;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        console.log("add class");
                    console.log(secondCard.classList);

        // resetBoard();
        checkWin();
    } else {
        boardLocked = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");


            firstCard.textContent = "";
            secondCard.textContent = "";

            resetBoard();
        }, 800);
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
        resetALL();
    }
}

function resetALL() {

    firstCard = null;
    secondCard = null;
    boardLocked = false;
    buildBoard(2);
}


const defaultSize = parseInt(document.getElementById("sizeSelect").value);
buildBoard(defaultSize);
