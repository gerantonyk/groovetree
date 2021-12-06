import getSong from "./getSong";
import {ethers} from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function getConnectedAddress() {
  await provider.send("eth_requestAccounts", []);
  console.log("provider after req accounts", provider)
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());
}

async function getSongs(sc, mySongs) {
    const tokenData = []
    if (mySongs) {
        console.log("mySongs", mySongs)
        return mySongs
    } else {
        const count = (await sc.getTokenCount()).toNumber();
        const tokenCount = count;
        for (let i = 0; i < tokenCount; i++) {
            tokenData.push(await getSong(sc, i));
        }
        console.log(tokenData);
    }
    return tokenData;
}
export default getSongs;