# elDapp

This is a decentralized app for election based on blockchain technology.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
This app requires Node.js and its components to be installed.
So firstly make sure you have installed [Node.js](https://nodejs.org/en/download/package-manager/)
Now having Node.js installed, install [Truffle](https://nodejs.org/en/download/package-manager/)
To prevent some dependency problems in future it is recommended to install Web3 aswell:
```
npm install web3
```
It is good to start with the [Ganache-Cli](http://truffleframework.com/docs/ganache/using) for local blockchain development.
This app is configured to run on localhost:8545. So if there is a need to use it
on the real blockchain network, consider changing the truffle.js settings.

[Metamask](https://metamask.io/) is a good tool to use normal Web-Browser as an web3-Browser.
This is basicaly a browser plugin which serves as a good tool to perform transactions on the blockchain.

### Installing
The first step would be to compile solidity contracts via truffle framework.  
Using terminal execute the following command:
```
truffle compile
```

This will create the binary versions of contracts in .json format and place it in
app/src/contracts/ directory.

The next step would be to install all the required node.js dependencies for the app
 according to package.json file in /app directory:
```
cd app
npm install
```

## Deployment
So by now we are ready to deploy our contracts to the blockchain.
Let's say we want to test it locally. Open the terminal somewhere and type in:
```
ganache-cli
```

This will start the local etherium blockchain. Now it is time to migrate our contracts
to the blockchain. Open the terminal and execute the following command in the main directory of the application:
```
truffle migrate
```

Now we are ready to start the application:
```
cd app
npm start
```

This will start the frontend on localhost:3000 by default. Don't forget to use metamask
  if you want to use a normal Web Browser.

## Built With
[Npm](https://www.npmjs.com/) - main package manager
[React](https://www.npmjs.com/package/create-react-app) - serves as frontend
[Web3](https://www.npmjs.com/package/web3) - library for the decentralized communication between frontend and blockchain
[Truffle](http://truffleframework.com/) - development framework for solidity contracts and deploy management

## Authors

Alexandr Timchenko  
Asis Schaumarow

See also the list of [contributors](https://github.com/atimchenko92/elDapp/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details
