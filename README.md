# Chainshot MVP

This repo is both a hardhat repo and a react repo. 


### Installation

When you download the repo run

`npm install`
### Hardhat

Edit contracts in `contracts` folder. 

Use typical hardhat commands like:

`npx hardhat test`
`npx hardhat compile`

Run the following shell script to execute hardhat test and THEN copy the necessary artifacts into the React src:

`./refresh.sh`

### React

`npm run build` -> Build the React project locally

`npm start` -> Serve the react app on [localhost://3000](http://localhost:3001/)


### Environment Variables 
Create a .env file with the following properties
```
RINKEBY_URL=<Get from Alchemy>
RINKEBY_PRIVATE_KEY=<The Private Key that will deploying the contract>
```

