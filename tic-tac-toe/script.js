const board = document.getElementById("board");
const f1 = document.getElementById("field-1");
const f2 = document.getElementById("field-2");
const f3 = document.getElementById("field-3");
const f4 = document.getElementById("field-4");
const f5 = document.getElementById("field-5");
const f6 = document.getElementById("field-6");
const f7 = document.getElementById("field-7");
const f8 = document.getElementById("field-8");
const f9 = document.getElementById("field-9");
const message = document.getElementById("message");
const btn = document.getElementById("btn");

let playerTurn = "X";
let endGame = false;

board.addEventListener("click", (e) => {
    const field = document.getElementById(e.target.id);
    if(field.innerHTML === "" && !endGame) {
        field.innerHTML = playerTurn;
        hasWinner();
        if(!endGame) {
            (playerTurn === "X") ? playerTurn = "O" : playerTurn = "X";
            message.innerHTML = `Vez do jogador: ${playerTurn}`;
        }
    }
    if (gameTied()) message.innerHTML = `Fim de jogo! Ninguém venceu.`;
    btn.innerHTML = "Reiniciar";
})

btn.addEventListener("click", () => eventsBtn());

function gameTied() {
    let hasField = false;
    for(let i = 1; i < 10; i++) {
        if(document.getElementById(`field-${i}`).innerHTML === "") { 
            hasField = true;
            break;
        }
    }
    return !hasField;
}


function hasWinner() {
    if(f1.innerHTML === f2.innerHTML && f2.innerHTML === f3.innerHTML && f1.innerHTML !== "") { // Horizontal 123
        [f1, f2, f3].forEach(highlightsTheWinner);
    } else if(f4.innerHTML === f5.innerHTML && f5.innerHTML === f6.innerHTML && f4.innerHTML !== "") { // Horizonal 456
        [f4, f5, f6].forEach(highlightsTheWinner);
    } else if(f7.innerHTML === f8.innerHTML && f8.innerHTML === f9.innerHTML && f7.innerHTML !== "") { // Horizontal 789
        [f7, f8, f9].forEach(highlightsTheWinner);
    } else if(f1.innerHTML === f4.innerHTML && f4.innerHTML === f7.innerHTML && f1.innerHTML !== "") { // Vertical 147
        [f1, f4, f7].forEach(highlightsTheWinner);
    } else if(f2.innerHTML === f5.innerHTML && f5.innerHTML === f8.innerHTML && f2.innerHTML !== "") { // Vertical 258
        [f2, f5, f8].forEach(highlightsTheWinner);
    } else if(f3.innerHTML === f6.innerHTML && f6.innerHTML === f9.innerHTML && f3.innerHTML !== "") { // Vertical 369
        [f3, f6, f9].forEach(highlightsTheWinner);
    } else if(f1.innerHTML === f5.innerHTML && f5.innerHTML === f9.innerHTML && f1.innerHTML !== "") { // Diagonal 159
        [f1, f5, f9].forEach(highlightsTheWinner);
    } else if(f3.innerHTML === f5.innerHTML && f5.innerHTML === f7.innerHTML && f3.innerHTML !== "") { // Diagonal 357
        [f3, f5, f7].forEach(highlightsTheWinner);
    }
}

function highlightsTheWinner(field) {
    field.setAttribute("style", "color: green");
    endGame = true;
    message.innerHTML = `Fim de jogo! Vencedor: ${playerTurn}!`;
}

function eventsBtn() {
    if(btn.innerHTML.includes("Trocar jogador")) (playerTurn === "X") ? playerTurn = "O" : playerTurn = "X" ;
    if(btn.innerHTML.includes("Reiniciar")) clearBoard();
    message.innerHTML = `Começa pelo jogador: ${playerTurn}`;
}

function clearBoard(){
    for(let i = 1; i < 10; i++) {
        document.getElementById(`field-${i}`).innerHTML = "";
        document.getElementById(`field-${i}`).setAttribute("style", "color: white");
    }
    playerTurn = "X";
    endGame = false;
    message.innerHTML = `Vez do jogador: ${playerTurn}`;
    btn.innerHTML = "Trocar jogador";
}