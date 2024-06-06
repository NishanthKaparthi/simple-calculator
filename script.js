class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand + number;
    }

    getNumberDisplay(number) {
        const stringNumber = number.toString();
        let integerDigits = parseInt(stringNumber.split('.')[0]);
        let decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en');
        }

        if(decimalDigits != null || decimalDigits != undefined) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getNumberDisplay(this.currentOperand);
        if(this.operation != '') {
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.operation = operation;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation) {
            case '+': computation = prev + curr; break;
            case '-': computation = prev - curr; break;
            case '÷': computation = prev / curr; break;
            case '*': computation = prev * curr; break;
            default: return;
        }
        this.currentOperand = computation.toLocaleString('en', {maximumFractionDigits: 2});
        this.previousOperand = '';
        this.operation = '';
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalbutton = document.querySelector('[data-equal]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalbutton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})


allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});


deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});






