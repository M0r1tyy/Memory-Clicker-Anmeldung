
const cards = [
    "🍎", "🍌", "🍇", "🍒", "🍉", "🍍", "🥝", "🍑", "🍓", "🥥",
    "🍋", "🍊", "🍐", "🍈", "🍏", "🍅", "🥑", "🌽", "🥕", "🌶️",
    "🫐", "🍆", "🥔", "🧄", "🧅", "🍄", "🥦", "🍩", "🍪", "🍫",
    "🍿", "🍔", "🍕", "🌭", "🍣", "🍤", "🍰", "🍦", "🍧", "🍨",
    "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🎱", "🏓", "🏸", "🥊",
    "🚗", "🚕", "🚙", "🚌", "🚓", "🚑", "🚒", "🚜", "✈️", "🚀",
    "⌚", "📱", "💻", "🖥️", "🖨️", "📷", "🎧", "🎮", "🧩", "🔑"]

// PLAYER data
const PLAYER = [
    { name: "Spieler 1", pairs: 0 },
    { name: "Spieler 2", pairs: 0 }
];
let currentPlayer = 0;

let firstCard = null;
let secondCard = null;
let boardLocked = false;
let attempts = 0;
let winCount = 0;
var SIZE = 2;

let gesehenKarten  = {}; 
let zugLog = [];

buildBoard(SIZE);
updateBodyColor();


function logZug(spieler, id1, id2, symbol1, symbol2, match, bewertung) {
    zugLog.push({ spieler, id1, id2, symbol1, symbol2, match, bewertung });
    console.log(zugLog);
}

function getZugLogJSON() {
    return JSON.stringify(zugLog, null, 2);
}

// Speichert das komplette Spielergebnis in localStorage
function saveGameResult() {
    const result = {
        timestamp: new Date().toISOString(),
        boardSize: SIZE,
        players: PLAYER.map(p => ({ ...p })),
        winner:
            PLAYER[0].pairs > PLAYER[1].pairs ? PLAYER[0].name :
            PLAYER[1].pairs > PLAYER[0].pairs ? PLAYER[1].name :
            "Unentschieden",
        totalAttempts: attempts,
        zuege: zugLog // zugLog = array für jede Runde, zuege = array mit allen Zügen 
    };

    // Bisherige Ergebnisse laden und neues anhängen
    const existing = JSON.parse(localStorage.getItem("memoryStats") || "[]");
    existing.push(result);
    localStorage.setItem("memoryStats", JSON.stringify(existing));
}

function selectSize(event) {

    SIZE = event.currentTarget.value;
    buildBoard(SIZE);
}

function buildBoard(size) {

    const board = document.getElementById("board");
    board.innerHTML = "";

    attempts = 0;
    zugLog = [];   // Log zurücksetzen bei neuen Spiel
    gesehenKarten = {};
    PLAYER[0].pairs = 0;
    PLAYER[1].pairs = 0;
    currentPlayer = 0;
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

    // choose random symbol
    shuffle(cards);
    const gameSize = cards.slice(0, pairs);

    // choose board order
    const gameCards = [...gameSize, ...gameSize];
    shuffle(gameCards);

    gameCards.forEach((symbol, index) => {

        let card = document.createElement("div");
        card.classList.add("card");

        card.dataset.symbol = symbol;

        card.dataset.id = index;   // ID der KARTEN für Log

        card.addEventListener("click", onCardClick);

        board.appendChild(card);
    });
}



//Hauptfunktion
function onCardClick(event) {
    let targetCard = event.currentTarget;

    if (!flipCard(targetCard)) {
        return;
    }

    let hasMatch = checkMatch();
    // collect data 
    if (!hasMatch) {
        return;
    }
    if (!checkWin()) {
        return;
    }
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
    const id1     = parseInt(firstCard.dataset.id);
    const id2     = parseInt(secondCard.dataset.id);
    const sym1    = firstCard.dataset.symbol;
    const sym2    = secondCard.dataset.symbol;
    const isMatch = sym1 === sym2;
    const bewertung = bewerteZug(id1, id2, sym1, sym2, isMatch); 


    logZug(currentPlayer + 1, id1, id2, sym1, sym2, isMatch, bewertung);
    

    if (isMatch) {
        const matchClass = "matched-p" + (currentPlayer + 1);
        firstCard.classList.add(matchClass);
        secondCard.classList.add(matchClass);

        PLAYER[currentPlayer].pairs++;
        document.getElementById("p" + (currentPlayer + 1) + "pairs").textContent =
            PLAYER[currentPlayer].pairs;

        resetBoard();
        return true;
    } else {
        boardLocked = true;

        firstCard.classList.add("misMatch");
        secondCard.classList.add("misMatch");

        setTimeout(() => {
            firstCard.classList.remove("misMatch");
            secondCard.classList.remove("misMatch");

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");


            firstCard.textContent = "";
            secondCard.textContent = "";

            resetBoard();
            // switch PLAYER
            if (currentPlayer === 0) {
                currentPlayer = 1;
            } else {
                currentPlayer = 0;
            }
            document.getElementById("currentPlayer").textContent =
            PLAYER[currentPlayer].name + " ist dran";

            updateBodyColor();

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
    if (document.querySelectorAll(".card:not(.matched-p1):not(.matched-p2)").length === 0) {


        const winDialog = document.getElementById("winDialog");


        let resultText;
        if (PLAYER[0].pairs > PLAYER[1].pairs) {
            resultText = `Spieler 1 gewinnt mit ${PLAYER[0].pairs} zu ${PLAYER[1].pairs} Paaren!`;
        } else if (PLAYER[1].pairs > PLAYER[0].pairs) {
            resultText = `Spieler 2 gewinnt mit ${PLAYER[1].pairs} zu ${PLAYER[0].pairs} Paaren!`;
        } else {
            resultText = `Unentschieden! Beide haben ${PLAYER[0].pairs} Paare.`;
        }

        document.getElementById("dialogResult").textContent = resultText;

        // ERGEBNIS SPEICHERN
        saveGameResult();

        winDialog.showModal();

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

// Bewertung des Zuges
function bewerteZug(id1, id2, sym1, sym2, isMatch) {
    // id und sym zusammen damit eindeutig

    const sym1Bekannt = sym1 in gesehenKarten;
    const sym2Bekannt = sym2 in gesehenKarten;

    const id1Bekannt = id1 in gesehenKarten;
    const id2Bekannt = id2 in gesehenKarten;

    let bewertung;

    if (isMatch) {
        bewertung = "#d4edda"; // Grün

    } else if (!sym1Bekannt && !sym2Bekannt) {  // Beide Karten unbekannt
        bewertung = "#d4edda"; // Grün

    } else if (sym1Bekannt && sym2Bekannt && id1Bekannt && id2Bekannt) { // Alles bekannt
        bewertung = "#f8d7da"; // Rot

    } else if (sym1Bekannt && !id1Bekannt) { // Gegenstück gefunden
        bewertung = "#f8d7da";  // Rot

    } else if ((sym1Bekannt && id1Bekannt && !sym2Bekannt) || (sym1Bekannt && id1Bekannt && sym2Bekannt && !id2Bekannt)) { // erste Karte 2 mal nehmen
        bewertung = "#ffe8cc"; // Orange

    } else if (!sym1Bekannt && sym2Bekannt && id2Bekannt) { // zweite Karte 2 mal nehmen
        bewertung = "#ffe8cc";  // Orange

    } else if (!id1Bekannt && !id2Bekannt) { // id unbekannt
        bewertung = "#d4edda";  // grün

    } else {
        bewertung = "#6f60a8"; // debug 

    }

    // Angetipptes Symbol speichern wenn es nicht bekannt ist
    gesehenKarten[sym1] = true; // true ist  egal haupsache das Symbol+ID ist gespeichert 
    gesehenKarten[sym2] = true;
    gesehenKarten[id1] = true;
    gesehenKarten[id2] = true;

    return bewertung;
}



function onDialogCloseBtn(tag) {
    document.getElementById('winDialog').close();
    resetALL();
}

function updateBodyColor() {
    document.body.classList.remove("PLAYER1-turn", "PLAYER2-turn");
    document.body.classList.add("PLAYER" + (currentPlayer + 1) + "-turn");
}

