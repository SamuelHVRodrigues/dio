const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const start = document.querySelector("button");
const textLevel = document.querySelector("span");
const lock = document.getElementById("lock");

let level = 1;
const order = [];
const clickedOrder = [];
const colors = ["green", "red", "yellow", "blue"];
let counter = 0;

start.addEventListener("click", () => { // 
    startGame();
    start.setAttribute("style", "display: none;");
    textLevel.setAttribute("style", "display: inline;");
    textLevel.innerHTML = `Você está no nível: ${level}`;
})

green.addEventListener("click", () => {
    green.setAttribute("class", "green-light");
    red.setAttribute("class", "red");
    yellow.setAttribute("class", "yellow");
    blue.setAttribute("class", "blue");
    clickedOrder.push("green");
    setTimeout(() => green.classList.replace("green-light", "green"), 1000);
    counter++;
    checkOrder();
})

red.addEventListener("click", () => {
    red.setAttribute("class", "red-light");
    green.setAttribute("class", "green");
    yellow.setAttribute("class", "yellow");
    blue.setAttribute("class", "blue");
    clickedOrder.push("red");
    setTimeout(() => red.classList.replace("red-light", "red"), 1000);
    counter++;
    checkOrder();
})

yellow.addEventListener("click", () => {
    yellow.setAttribute("class", "yellow-light");
    green.setAttribute("class", "green");
    red.setAttribute("class", "red");
    blue.setAttribute("class", "blue");
    clickedOrder.push("yellow");
    setTimeout(() => yellow.classList.replace("yellow-light", "yellow"), 1000);
    counter++;
    checkOrder();
})

blue.addEventListener("click", () => {
    blue.setAttribute("class", "blue-light");
    green.setAttribute("class", "green");
    red.setAttribute("class", "red");
    yellow.setAttribute("class", "yellow");
    clickedOrder.push("blue");
    setTimeout(() => blue.classList.replace("blue-light", "blue"), 1000);
    counter++;
    checkOrder();
})

function startGame() {
    firstColors();
    flashLights();
}

function nextLevel() {
    lockClick();
    addAleatoryColor()
    setTimeout(() => flashLights(), 1000);
    while(clickedOrder.length > 0) clickedOrder.pop();
    level++;
    textLevel.innerHTML = `Você está no nível: ${level}`;
}

function gameOver() {
    textLevel.innerHTML = `Você chegou no nível: ${level}`;
    start.setAttribute("style", "display: block;");
    lockClick();
    while(order.length > 0) order.pop();
    while(clickedOrder.length > 0) clickedOrder.pop();
    counter = 0;
    level = 1;
}

function aleatoryColor() {
    const aleatoryColor = Math.floor(Math.random() * 4);
    return colors[aleatoryColor];
}

function firstColors() {
    for(let i = 0; i < 3; i++) {
        order.push(aleatoryColor());
    }
}

function addAleatoryColor() {
    order.push(aleatoryColor());
}

function flashLights() {
    let index = 0;
    let counterTicks = 0;
    const timer = setInterval(() => {
        if(counterTicks % 2 == 0) {
            document.getElementById(order[index]).className = `${order[index]}-light`;
        } else {
            document.getElementById(order[index]).className = `${order[index]}`;
            index++;
        }
        counterTicks++;
        if(counterTicks === 2*order.length) {
            clearInterval(timer);
            unlockClick();
        }
    }, 300);
}

function checkOrder() {
    let lose = false;
    for(let i = 0; i < clickedOrder.length; i++) {
        if(clickedOrder[i] !== order[i]) lose = true;
    }
    if(lose) {
        gameOver();
    } else if(order.length === clickedOrder.length) {
        nextLevel();
    }
}

function lockClick() {
    lock.setAttribute("style", "display: block;");
}

function unlockClick() {
    lock.setAttribute("style", "display: none;");
}