const screen = document.querySelector(".screen");
const btns = document.querySelector(".calc-btn");
let buffer = "0";
let runningTotal = 0;

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    }else{
        buffer += value;
    }
}

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
}

function init() {
    btns.addEventListener("click", e => {
        console.log(e.target.innerText);
        buttonClick(e.target.innerText);
    });
}

init();