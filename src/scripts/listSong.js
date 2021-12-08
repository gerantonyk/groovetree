
// function 
import {ethers} from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function listSong(contract, _id) {
  console.log("create Song Token for:", uri)
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
  console.log("THE CONTRACT", contract)
  await contract.connect(signer).listToken(_id, 1);
}

export { listSong };