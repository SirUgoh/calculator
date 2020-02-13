const screen = document.querySelector(".screen");
const btns = document.querySelector(".calc-btn");
let buffer = "0";
let operator;
let runningTotal = 0;

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    }else{
        buffer += value;
    }
}

function flushOperation(value) {
    if (operator === "+") {
        runningTotal += value;
    }else if (operator === "−") {
        runningTotal -= value;
    }else if (operator === "×") {
        runningTotal *= value;
    }else if (operator === "÷") {
        runningTotal /= value;
    }else{
        runningTotal %= value;
    }
}

function handleMath(value) {
    if (buffer === "0") {
        //do nothing
        return;
    }
    const intBuffer = +buffer;

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    operator = value;

    buffer = "0";
}

function handleSymbol(value) {
    switch(value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "=":
            if (operator === null) {
                //You need two numbers to do math
                return;
            }
            flushOperation(+buffer);
            operator = null;
            buffer = +runningTotal;
            runningTotal = 0;
            break;
        case ".":
            if (buffer.includes(".")) {
                //do nothing
                return;
            }else if (buffer === "0" || runningTotal !== false) {
                buffer += ".";
            }
            break;
        case "+":
        case "−":
        case "×":
        case "÷":
        case "%":
            handleMath(value);
            break;
    }
}

function rerender() {
    screen.innerText = buffer;
}

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerender();
}

function init() {
    btns.addEventListener("click", e => {
        console.log(e.target.innerText);
        buttonClick(e.target.innerText);
    });
}

init();