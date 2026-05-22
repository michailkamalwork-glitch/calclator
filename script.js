let currentInput = "0";
let firstOperand = null;
let operator = null;
let shouldResetScreen = false;

const mainDisplay = document.getElementById('mainDisplay');
const opDisplay = document.getElementById('operationDisplay');
const historyList = document.getElementById('historyList');

// تبديل الوضع المظلم
document.getElementById('themeToggle').onclick = function() {
    document.getElementById('calculatorApp').classList.toggle('dark-mode');
};

function updateDisplay() {
    mainDisplay.innerText = currentInput;
}

function appendNumber(num) {
    if (currentInput === "0" || shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        if (num === "." && currentInput.includes(".")) return;
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(nextOperator) {
    const value = parseFloat(currentInput);

    if (operator && shouldResetScreen) {
        operator = nextOperator;
        opDisplay.innerText = `${firstOperand} ${operator}`;
        return;
    }

    if (firstOperand === null) {
        firstOperand = value;
    } else if (operator) {
        const result = performCalculation(firstOperand, value, operator);
        currentInput = String(result);
        firstOperand = result;
    }

    operator = nextOperator;
    shouldResetScreen = true;
    opDisplay.innerText = `${firstOperand} ${operator}`;
    updateDisplay();
}

function performCalculation(v1, v2, op) {
    switch(op) {
        case '+': return v1 + v2;
        case '-': return v1 - v2;
        case '*': return v1 * v2;
        case '/': return v2 === 0 ? "Error" : v1 / v2;
        case '%': return v1 % v2;
        default: return v2;
    }
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    const secondOperand = parseFloat(currentInput);
    const result = performCalculation(firstOperand, secondOperand, operator);

    const expression = `${firstOperand} ${operator} ${secondOperand} =`;
    addToHistory(expression, result);

    opDisplay.innerText = expression;
    currentInput = String(result);
    operator = null;
    firstOperand = null;
    shouldResetScreen = true;
    updateDisplay();
}

function advancedCalc(type) {
    let val = parseFloat(currentInput);
    let result;
    let exp;

    if (type === 'sqrt') { result = Math.sqrt(val); exp = `√(${val})`; }
    if (type === 'sqr') { result = val * val; exp = `sqr(${val})`; }
    if (type === 'inv') { result = 1 / val; exp = `1/(${val})`; }

    addToHistory(exp + " =", result);
    currentInput = String(result);
    opDisplay.innerText = exp + " =";
    shouldResetScreen = true;
    updateDisplay();
}

function addToHistory(exp, res) {
    if (historyList.querySelector('.empty-msg')) historyList.innerHTML = "";
    
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `<div class="h-exp">${exp}</div><div class="h-res">${res}</div>`;
    div.onclick = () => { currentInput = String(res); updateDisplay(); };
    
    historyList.prepend(div);
}

function clearAll() {
    currentInput = "0"; firstOperand = null; operator = null;
    opDisplay.innerText = ""; updateDisplay();
}

function clearEntry() {
    currentInput = "0"; updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    updateDisplay();
}

function toggleSign() {
    currentInput = String(parseFloat(currentInput) * -1);
    updateDisplay();
}