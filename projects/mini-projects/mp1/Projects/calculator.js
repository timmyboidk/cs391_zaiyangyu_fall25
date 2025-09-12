function power(base, exp) {
    let result = 1;
    //Must use a for loop for the power function.
    for (let i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

function performOperation(operation) {
    const firstNumber = parseFloat(document.getElementById('first-number').value);
    const secondNumber = parseFloat(document.getElementById('second-number').value);
    const outputElement = document.getElementById('output');

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        outputElement.innerHTML = "Please enter valid numbers.";
        outputElement.style.color = 'red';
        outputElement.style.backgroundColor = 'transparent';
        return;
    }

    let result;
    switch (operation) {
        case 'add':
            result = firstNumber + secondNumber;
            break;
        case 'subtract':
            result = firstNumber - secondNumber;
            break;
        case 'multiply':
            result = firstNumber * secondNumber;
            break;
        case 'divide':
            if (secondNumber === 0) {
                result = "Cannot divide by zero";
            } else {
                result = firstNumber / secondNumber;
            }
            break;
        case 'power':
            result = power(firstNumber, secondNumber);
            break;
    }

    outputElement.innerHTML = result;

    //Display negative results in red. variable can sometimes be a string
    if (typeof result === 'number' && result < 0) {
        outputElement.style.color = 'red';
        outputElement.style.backgroundColor = 'transparent';
    } else {
        outputElement.style.color = '#333'; // Reset to default color
        outputElement.style.backgroundColor = 'transparent';
    }
}

function clearCalculator() {
    document.getElementById('first-number').value = '';
    document.getElementById('second-number').value = '';
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = '';
    outputElement.style.color = '#333';
    outputElement.style.backgroundColor = 'transparent';
}