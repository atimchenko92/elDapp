import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import election_artifacts from './contracts/Election.json'
var Election = contract(election_artifacts);

// set the provider you want from Web3.providers
var MY_ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

class App extends Component {
  constructor(args){
    super(args);
    this.state = {

    }

  }
  componentWillMount(){
    console.log(MY_ETHEREUM_CLIENT);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React LOL</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
