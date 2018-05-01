import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import election_artifacts from './contracts/Election.json';

class App extends Component {
  constructor(args){
    super(args);
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
      loading: true,
      voting: false,
    }
    window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    }

    });

  }
/*
  myFct(){

    this.Election.deployed().then(function(instance) {
      this.electInstance = instance;
      return this.elect.candidatesCount.call();
    }).then(function(value) {
      console.log(value.valueOf());
      console.log(e);
    }).catch(function(e) {
    });
  }*/



  componentWillMount(){
    var self = this;
    // Get the initial account balance so it can be displayed.
    window.web3.eth.getCoinbase(function(err, account) {
      if (err != null) {
        alert("There was an error fetching your account.");
        console.log(err);
        return;
      }

      if (account == null) {
        alert("Couldn't load account! Make sure your Ethereum client is configured correctly.");
        return;
      }

      self.setState({account: account});
      console.log(self.state.account);

    });
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
