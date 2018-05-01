import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import election_artifacts from './contracts/Election.json';

var Election = contract(election_artifacts);
var provider;

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
    this.initializeProvider();
    // Bootstrap the MetaCoin abstraction for Use.
    Election.setProvider(provider.currentProvider);

    // Get the initial account balance so it can be displayed.
    var self = this;
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

  initializeProvider(){
    if (typeof provider !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
      provider = new Web3(Web3.currentProvider);
    } else {
      console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      provider = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  }

  makeVote(){
  //TODO

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
