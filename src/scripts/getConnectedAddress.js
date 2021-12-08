import {ethers} from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

//TODO: Should remove in favor of getting account from App.js
async function getConnectedAddress() {
    await provider.send("eth_requestAccounts", []);
    // console.log("provider after req accounts", provider)
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    return addr
    
}

export default getConnectedAddress;