let runningTotal = 0;
let buffer = 0;
let previousOperator;

const screen = document.querySelector('#calculator-Display');
console.log(screen.innerText)

const buttonClick = value => {
    if (isNaN(value)) {
        handelSymbol(value)
    }
    else {
        handleNumber(value)
    }
    screen.innerText = buffer;
}

const handelSymbol = symbol => {
    switch (symbol) {
        case 'AC':
            buffer = '0';
            runningTotal = '0';
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case 'Del':
            if (buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.slice(0, - 1);
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol)
            break;
    }
}

const handleMath = symbol => {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer)
    }
    previousOperator = symbol;
    buffer = '0';
}


const flushOperation = intBuffer => {
    if (previousOperator === '+') {
        runningTotal += intBuffer
    }
    else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    }
    else if (previousOperator === '*') {
        runningTotal *= intBuffer;
    }
    else if (previousOperator === '/') {
        if (intBuffer === 0) {
            runningTotal = 0;
            buffer = '0';
            screen.innerText = 'Cannot divide by zero';
            return;
          }
          runningTotal /= intBuffer;
        
    }
} 

const handleNumber = numberString =>{
    if(buffer === '0'){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}


const btnInit = () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
      });
    });
  };
  
  btnInit();