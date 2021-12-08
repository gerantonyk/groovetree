
// function 
import {ethers} from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function listSong(musicNftcontract, marketContract, _id) {
  console.log("List Song:", _id)
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
    console.log("THE CONTRACT TO LIST ON", marketContract)
    try {
        await musicNftcontract.connect(signer).approve(marketContract.address, _id, {gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 1000000});
        await marketContract.connect(signer).listToken(_id, ethers.utils.parseUnits('1', 'ether'),{gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 1000000});

    } catch (error) {
        console.log(error);
    }
}

export { listSong };