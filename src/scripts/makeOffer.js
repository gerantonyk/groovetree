import {ethers} from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function makeOffer(marketContract, _tokenId, _price) {
  console.log("buying song for ", _tokenId, " : ", _price);
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
    console.log("Buying from market CONTRACT", marketContract)
    // try {
        await marketContract.connect(signer).makeOffer(_tokenId, {gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 1000000, value: ethers.utils.parseEther(_price.toString())});
    // } catch (error) {
    //     console.log("Error:", error)
    // }
}

export { makeOffer };