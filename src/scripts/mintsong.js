import Song from '../artifacts/Song.sol/Song.json';
import {ethers} from 'ethers';
// require('dotenv').config();
const SSAddress = "0xdD760789a7d26994867850041F98AEeE15E6f14a";
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function createSongToken(title) {
  console.log("create Song Token for:", title)

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
  const token = await new ethers.Contract(SSAddress, Song.abi, provider);
  console.log("token:", token);
  const newsong = await token.connect(signer).createToken(title, {gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 100000});
  // const newsong = await token.connect(signer).createToken(title);

  console.log("created token in mintsong script", newsong);
  // value *= 1000000000000000000;
  // await window.ethereum.request({ method: 'eth_requestAccounts' });
  // const signer = provider.getSigner();
  // const factory = new ethers.ContractFactory(Song.abi, Song.bytecode, signer);
  // const contract = await factory.deploy();
  // return contract;

}



export { createSongToken };