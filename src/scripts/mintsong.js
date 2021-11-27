import {ethers} from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function createSongToken(contract, title) {
  console.log("create Song Token for:", title)
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
  const newsong = await contract.connect(signer).createToken(title, {gasPrice: ethers.utils.parseUnits('1', 'gwei'), gasLimit: 100000});
  return newsong;
}

export { createSongToken };