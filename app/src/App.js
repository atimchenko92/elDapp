import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import election_artifacts from './contracts/Election.json'
var Election = contract(election_artifacts);

const provider = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var accounts;
var account;

class App extends Component {
  constructor(args){
    super(args);
    this.state = {
    }
  }

  myFct(){
    var self = this;
    var elect;

    Election.deployed().then(function(instance) {
      elect = instance;
      return elect.candidatesCount.call();
    }).then(function(value) {
      console.log(value.valueOf());
    }).catch(function(e) {
      console.log(e);
    });
  }

  componentWillMount(){
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Election.setProvider(provider.currentProvider);

    // Get the initial account balance so it can be displayed.
    provider.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      self.myFct();
    });
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
