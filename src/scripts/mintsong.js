// import Song from '../artifacts/Song.sol/Song.json';
import {ethers} from 'ethers';
// const SSAddress = "0xdD760789a7d26994867850041F98AEeE15E6f14a";
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function createSongToken(contract, title) {
  console.log("create Song Token for:", title)
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
  // console.log("contract in createSongToken:", contract);
  const newsong = await contract.connect(signer).createToken(title, {gasPrice: ethers.utils.parseUnits('1', 'gwei'), gasLimit: 100000});

  // console.log("created token in mintsong script", newsong);


}



export { createSongToken };