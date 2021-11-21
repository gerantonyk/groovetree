import Song from '../artifacts/Song.sol/Song.json';
import {ethers} from 'ethers';
// require('dotenv').config();
const SSAddress = "0x524beAc334589474B24247E0deABFfB9b16469F6";
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function createSongToken() {
  console.log("deploy")

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
  const token = await new ethers.Contract(SSAddress, Song.abi, provider);
  console.log("token in deploy", token);
  // value *= 1000000000000000000;
  // await window.ethereum.request({ method: 'eth_requestAccounts' });
  // const signer = provider.getSigner();
  // const factory = new ethers.ContractFactory(Song.abi, Song.bytecode, signer);
  // const contract = await factory.deploy();
  // return contract;

}



export { createSongToken };