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
      selectValue: ""
    }
    this.state = this.initialState;
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  render() {
    const { txtValue, selectValue } = this.state;

    return (
      <div className="App">
        <h1>Number Array Manipulator</h1>
        <p>Enter numbers below, separated by commas. Spaces not required.</p>
        <form id="formNumArr" onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            id="txtValue" 
            name="txtValue" 
            value={txtValue} 
            onChange={this.handleChange} 
            placeholder="Enter numbers here" 
            autoFocus
          />
          <select id="selectValue" name="selectValue" value={selectValue} onChange={this.handleChange}>
            <option value="" disabled>-- Choose an operation</option>
            <option value="sum">sum</option>
            <option value="average">average</option>
            <option value="mode">mode</option>
          </select>
          <p id="msg">...</p>
          <button id="btnNumArr">Calculate</button>
        </form>
      </div>
    );
  }
}


/* EXPORT */
export default App;
