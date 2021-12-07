import {ethers} from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function createSongToken(contract, uri) {
  console.log("create Song Token for:", uri)
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
  console.log("THE CONTRACT", contract)
  const newsong = await contract.connect(signer).createSong(uri, 10, {gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 1000000});
  return newsong;
}

export { createSongToken };