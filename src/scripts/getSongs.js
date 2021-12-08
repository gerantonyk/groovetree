import getSong from "./getSong";
import getConnectedAddress from "./getConnectedAddress";

async function getSongs(sc, mySongs) {
    console.log("sc for getSongs", sc)
    const tokenData = []
    if (mySongs) {
        return mySongs
    } else {
        const filter = await sc.filters.TokenCreated()
        console.log("filter", filter)
        console.log("sc to get Event", sc);
        let events = await sc.queryFilter(filter)
        console.log("events from sc", events)
        const connectedAddress = await getConnectedAddress()
        console.log("connectAddress", connectedAddress)
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