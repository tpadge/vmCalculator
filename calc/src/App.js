import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {
  const [input, setInput] = useState('');
  const [clear, setClear] = useState(false);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function calculate(string) {
    let s = string.trim();
    
    let values = [];
    let operators = [];

    for (let i = 0; i < s.length; i++) {
      if (s[i] >= '0' && s[i] <= '9') {
        let temp = '';
        while (i < s.length && s[i] >= '0' && s[i] <= '9') {
          temp += s[i];
        }
        values.push(parseInt(temp));
        i--;
      } else if (s[i] === '(') {
        operators.push(s[i]);
      } else if (s[i] === ')') {
        while (operators[operators.length - 1] !== '(') {
          values.push(evaluate(operators.pop(), values.pop(), values.pop()))
        }
        operators.pop();
      } else if (s[i] === '+' || s[i] === '-' || s[i] === '/' || s[i] === '*') {
        while (operators.length && priority(s[i], operators[operators.length - 1])) {
          values.push(evaluate(operators.pop(), values.pop(), values.pop()))
        }
        operators.push(s[i]);
      }
    }

    while (operators.length) {
      values.push(evaluate(operators.pop(), values.pop(), values.pop()))
    }
    return values.pop()
  }

  function priority(op1, op2) {
    if (op2 === '(' || op2 === ')') {
      return false;
    }
    if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')) {
      return false;
    }
    return true
  }

  function evaluate(op, b, a) {
    switch(op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        if (b === 0) {
          throw 'synatx error'
        }
        return a / b
    }
    return 'invalid input'
  }

  console.log(calculate('1 + 1'))

  return (
    <div className="App">
      <form>
        <label> Enter some math 
          <input name="calc"
           onChange={handleChange}
           value={input}
          ></input>
        </label>
        {console.log(input)}
        <button type="submit">Calculate!</button>
      </form>
      <button onClick={() => setInput('')}>Clear</button>
    </div>
  );
}

export default App;
