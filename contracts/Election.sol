pragma solidity ^0.4.17;

contract Election {

  struct Candidate {
    uint id;
    string name;
    uint votes;
  }

  mapping(address => bool) public isVoted;
  mapping(uint => Candidate) public candidates;
  uint public candidatesCount;

  event votedEvent(
    uint indexed _candidateId
  );

  function Election() public {
    addCandidate("Candidate#1");
    addCandidate("Candidate#2");
    addCandidate("Candidate#3");
  }

  function addCandidate(string _name) private {
    candidatesCount++;
    candidates[candidatesCount] = Candidate (candidatesCount, _name, 0);
  }

  function vote(uint _candidateId) public {
    require(!isVoted[msg.sender]);
    require(_candidateId > 0 && _candidateId <= candidatesCount);
    isVoted[msg.sender] = true;
    candidates[_candidateId].votes++;
    emit votedEvent(_candidateId);
  }
}
