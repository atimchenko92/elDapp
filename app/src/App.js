import React, { Component } from 'react';
import logo from './static/images/logo.svg';
import './static/css/App.css';
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import election_artifacts from './contracts/Election.json';
import { Alert, Table, Button, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import _ from 'lodash'

class App extends Component {
  constructor(args){
    super(args);
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
    }
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
      this.provider = window.web3.currentProvider;
    } else {
      console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    }
    window.web3 = new Web3(this.provider);

    this.election = contract(election_artifacts)
    this.election.setProvider(this.provider)

    //bind events
    this.electionEvents = this.electionEvents.bind(this)
  }

  loadCandidates(){
    this.election.deployed().then((electionInstance) => {
      this.electionInstance = electionInstance
      this.electionEvents()
      this.electionInstance.candidatesCount().then((candidatesCount) => {
        for (var i = 1; i <= candidatesCount; i++) {
          this.electionInstance.candidates(i).then((candidate) => {
            const candidates = [...this.state.candidates]
            candidates.push({
              id: candidate[0],
              name: candidate[1],
              voteCount: candidate[2]
            });
            this.setState({ candidates: candidates })
          });
        }
      })

      this.electionInstance.isVoted(this.state.account).then((hasVoted) => {
        console.log("hasvoted:" + hasVoted);
        this.setState({ hasVoted })
      })

    })
  }

  componentWillMount(){
    var self = this;
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
      self.loadCandidates();
    });
  }

  electionEvents() {
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      console.log("event casted!")
    })
  }

  submitVote(candidateId){
    if(candidateId !== "select"){
      this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>
        this.setState({ hasVoted: true })
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome,
            <div className="App-titleAcc">{this.state.account}!</div>
          </h1>
        </header>

        <div name="myTable">
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Candidate</th>
                <th>Number of votes</th>
              </tr>
            </thead>
            <tbody>
              {this.state.candidates.map((candidate) => {
                return(
                  <tr>
                    <th>{candidate.id.toNumber()}</th>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount.toNumber()}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
        <hr>
        </hr>
        { this.state.hasVoted ?
          <div name="alert!">
            <Alert bsStyle="warning">
              <strong>Holy guacamole!</strong> You have voted!.
            </Alert>
          </div>
        :
        <form onSubmit={(event) => {
        event.preventDefault();
        console.log(this.candidateId.value);
        this.submitVote(this.candidateId.value)
        //TODO: hide form.
        }}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
              <FormControl inputRef={(input) => this.candidateId = input} componentClass="select" placeholder="select">
                <option value="select">Select my candidate</option>
                {this.state.candidates.map((candidate) => {
                    return <option value={candidate.id}>{candidate.name}</option>
                  })}
              </FormControl>
              <Button type="submit" bsStyle="primary" bsSize="large" active>
                Submit my vote
              </Button>
          </FormGroup>
        </form>
      }
      </div>

    );
  }
}

export default App;
