import {ethers} from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

//async function createSongToken(contract, title) {
async function createSongToken(contract, tokenURI) {
  
  console.log("create Song Token for:", tokenURI)
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
  //const newsong = await contract.connect(signer).createToken(title, {gasPrice: ethers.utils.parseUnits('1', 'gwei'), gasLimit: 100000});
  const newsong = await contract.connect(signer).createSong(tokenURI, {gasPrice: ethers.utils.parseUnits('1', 'gwei'), gasLimit: 10000000});
  return newsong;
}

export { createSongToken };