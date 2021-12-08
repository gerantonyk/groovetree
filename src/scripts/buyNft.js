import {ethers} from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function buyToken(marketContract, _tokenId, _price) {
  console.log("create Song Token for:", _tokenId)
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
  console.log("Buying from market CONTRACT", marketContract)
  const newsong = await marketContract.connect(signer).buyNFT(_tokenId, {gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 1000000, value: ethers.utils.parseEther(_price)});
  return newsong;
}

export { buyToken };