import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorWrapper = styled.div`
  max-width: 100%;

  .inputs {
    color: #FFF;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    margin-bottom: 15px;
  }

  input {
    background-color: rgba(245, 250, 225, 0.9);
    border: 1px solid #E5BEB5;
    color: #896C6C;
    padding: 8px;
    width: 100%;
    margin-bottom: 10px;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 12px;
  }

  button {
    background-color: #E5BEB5;
    color: #896C6C;
    border: 1px solid #d1a9a0;
    border-radius: 8px;
    font-size: calc(1rem + 0.25vw);
    font-weight: bold;
    padding: 15px 10px;
    cursor: pointer;
  }

  .output-area {
    margin-top: 20px;
    h3 {
      color: #FFF;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
    }
  }

  #output {
    background-color: rgba(245, 250, 225, 0.9);
    border-radius: 5px;
    padding: 10px;
    font-size: calc(1.25rem + 1vw);
    min-height: 40px;
  }
`;

export default function Calculator() {
    const [firstNumber, setFirstNumber] = useState<string>('');
    const [secondNumber, setSecondNumber] = useState<string>('');
    const [output, setOutput] = useState<string | number>('');
    const [outputStyle, setOutputStyle] = useState<React.CSSProperties>({ color: '#896C6C' });
    const power = (base: number, exp: number): number => {
        let result = 1;
        for (let i = 0; i < exp; i++) {
            result *= base;
        }return result;
    };

    const performOperation = (operation: string) => {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);
        if (isNaN(num1) || isNaN(num2)) {
            setOutput("Please enter valid numbers.");
            setOutputStyle({ color: 'red' });
            return;
        }

        let result: number | string;
        switch (operation) {
            case 'add': result = num1 + num2; break;
             case 'subtract': result = num1 - num2; break;
            case 'multiply': result = num1 * num2; break;
            case 'divide': result = num2 === 0 ? "Cannot divide by zero" : num1 / num2; break;
             case 'power': result = power(num1, num2); break;
            default: return;
        }
        setOutput(result);
        setOutputStyle({ color: typeof result === 'number' && result < 0 ? 'red' : '#896C6C' });
    };
    const clearCalculator = () => {
        setFirstNumber('');
        setSecondNumber('');
        setOutput('');
        setOutputStyle({ color: '#896C6C' });
    };return (
        <CalculatorWrapper>
            <div className="inputs">
                <label htmlFor="first-number">First Number:</label>
                <input type="number" id="first-number" value={firstNumber} onChange={(e) => setFirstNumber(e.target.value)} placeholder="Enter a number" />
                <label htmlFor="second-number">Second Number:</label>
                <input type="number" id="second-number" value={secondNumber} onChange={(e) => setSecondNumber(e.target.value)} placeholder="Enter a number" />
            </div>
            <div className="buttons">
                <button onClick={() => performOperation('add')}>+</button>
                <button onClick={() => performOperation('subtract')}>-</button>
                <button onClick={() => performOperation('multiply')}>*</button>
                <button onClick={() => performOperation('divide')}>/</button>
                <button onClick={() => performOperation('power')}>**</button>
                <button onClick={clearCalculator}>Clear</button>
            </div>
            <div className="output-area">
                <h3>Result:</h3>
                <p id="output" style={outputStyle}>{output}</p>
            </div>
        </CalculatorWrapper>
    );
}
