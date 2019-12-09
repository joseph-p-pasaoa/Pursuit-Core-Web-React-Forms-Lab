/*
Joseph P. Pasaoa
React with Forms Lab
*/


/* IMPORTS */
import React from 'react';
import './App.css';




/* APP */
class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      txtValue: "",
      selectValue: "",
      message: "...",
      input: "",
      output: ""
    }
    this.state = this.initialState;
    this.accepted = {
      "8": true,
      "13": true,
      "32": true,
      "37": true,
      "39": true,
      "48": true,
      "49": true,
      "50": true,
      "51": true,
      "52": true,
      "53": true,
      "54": true,
      "55": true,
      "56": true,
      "57": true,
      "188": true,
      "189": true,
      "190": true
    }
  }

  parseInput = (inputStr) => {
    const inputArrayed = inputStr.split(',');
    return inputArrayed.filter(el => !!el && !!el.trim() && !isNaN(parseFloat(el)))
      .map(el => parseFloat(el.trim()));
  }

  doMath = (operation, parsedInput) => {
    switch (operation) {
      case "sum":
        return parsedInput.reduce((sum, curr) => sum += curr);
      case "average":
        const sum = parsedInput.reduce((sum, curr) => sum += curr);
        return (sum / parsedInput.length).toFixed(3);
      case "mode":
        const counter = {};
        let highestCounter = 0;
        let mode = [];
        for (let num of parsedInput) {
          if (!counter[num]) {
            counter[num] = 1;
          } else {
            counter[num] += 1;
          }
          if (counter[num] > highestCounter) {
            highestCounter = counter[num];
            mode = [];
            mode.push(num);
          } else if (counter[num] === highestCounter) {
            mode.push(num);
          }
        }
        return mode.join(', ');
      default:
        return "error: please check your input and try again";
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target[1].value) {
      this.setState({
          message: "Please choose an operation to execute"
      });
    } else if (!e.target[0].value || !e.target[0].value.trim()) {
      this.setState({
          message: "Please enter a valid comma-delimited list of numbers"
      });
    } else {
      const parsedIn = this.parseInput(e.target[0].value.trim());
      const showInput = 'input:\n' + parsedIn.join('\n');
      const output = this.doMath(e.target[1].value, parsedIn);
      const showOutput = e.target[1].value + ':\n' + output;
      this.setState({
          input: showInput,
          output: showOutput
      });
    }
  }

  handleKeyDown = (e) => {
    if (!this.accepted[e.keyCode]) {
      e.preventDefault();
      this.setState({
          message: "Only numbers, commas, and decimal points are allowed."
      });
      setTimeout(() => {
        this.setState({
            message: "..."
        });
      }, 4000);
    }
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  render() {
    const { txtValue, selectValue, message, input, output } = this.state;

    return (
      <div className="App">
        <div id="flex-base">
          <h1>Number Array Manipulator</h1>
          <p id="author">Copyright ©2019 by Joseph P. Pasaoa. All rights reserved.</p>
          <p>Enter numbers below, separated by commas. Spaces not required.</p>
          <form id="formNumArr" onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              id="txtValue" 
              name="txtValue" 
              value={txtValue} 
              // style={{ backgroundColor: "#0e693b", color: "#fff" }}
              onKeyDown={this.handleKeyDown} 
              onChange={this.handleChange} 
              placeholder="Enter numbers here" 
              required 
              autoFocus
            />
            <select id="selectValue" name="selectValue" value={selectValue} onChange={this.handleChange}>
              <option value="" disabled>-- Choose an operation</option>
              <option value="sum">sum</option>
              <option value="average">average</option>
              <option value="mode">mode</option>
            </select>
            <p id="msg">{message}</p>
            <button id="btnNumArr">Calculate</button>
          </form>
          <div>
            <textarea id="areaInput" value={input} disabled></textarea>
            <textarea id="areaOutput" value={output} disabled></textarea>
          </div>
        </div>
      </div>
    );
  }
}


/* EXPORT */
export default App;
