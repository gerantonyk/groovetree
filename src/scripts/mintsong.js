

// import Song from '../contracts/Song.sol/Song.json';
import {ethers} from 'ethers';
// require('dotenv').config();

const provider = new ethers.providers.Web3Provider(window.ethereum);

async function deploy() {
  console.log("deploy")
  // value *= 1000000000000000000;
  // await window.ethereum.request({ method: 'eth_requestAccounts' });
  // const signer = provider.getSigner();
  // const factory = new ethers.ContractFactory(Song.abi, Song.bytecode, signer);
  // const contract = await factory.deploy();
  // return contract;

}



export { deploy };