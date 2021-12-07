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
        return mySongs
    } else {
        const filter = await sc.filters.TokenCreated()

        let events = await sc.queryFilter(filter)  

        const songtokens = events.map(event=> {return {
            index:event.args.index.toNumber(),
            uri:event.args.tokenU,
            owner:event.args.owner
        }
        })
        for (let songtoken of songtokens) {
            const song = await getSong(sc, songtoken.index)
            tokenData.push({...song, ...songtoken})
        }
        
    }
    return tokenData;
}
export default getSongs;