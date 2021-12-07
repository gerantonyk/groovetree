import getSong from "./getSong";
import {ethers} from 'ethers';
// const provider = new ethers.providers.Web3Provider(window.ethereum);

// async function getConnectedAddress() {
//   await provider.send("eth_requestAccounts", []);
//   console.log("provider after req accounts", provider)
//   const signer = provider.getSigner();
//   console.log("Account:", await signer.getAddress());
// }

async function getSongs(sc, mySongs) {
    console.log("sc for getSongs", sc)
    const tokenData = []
    if (mySongs) {
        console.log("mySongs", mySongs)
        return mySongs
    } else {
        const count = (await sc.getTokenCount()).toNumber();
        const tokenCount = count;
        console.log("token count", tokenCount)
        for (let i = 1; i <= tokenCount; i++) {
            tokenData.push(await getSong(sc, i));
        }
        console.log("tokendata",tokenData);
    }
    return tokenData;
}
export default getSongs;