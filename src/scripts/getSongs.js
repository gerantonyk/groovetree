import getSong from "./getSong";

async function getSongs(sc, marketContract, mySongs, account) {
    console.log("getSongs() called...");
    const tokenData = []

    const filter = await sc.filters.TokenCreated()
    console.log("filter", filter)
    console.log("sc to get Event", sc);
    let events = await sc.queryFilter(filter)
    console.log("events from sc", events)
    let songtokens = events.map(event => {
        return {
            index: event.args.index.toNumber(),
            uri: event.args.tokenU,
            owner: event.args.owner
        }
    })
    let mySongTokens; 
    if (mySongs) {
        console.log("songtokens.length: ", songtokens.length ); 
        mySongTokens = songtokens.filter(songtoken => {
            console.log(songtoken.owner); 
            return songtoken.owner === account.address
        });
        songtokens = mySongTokens; 
        console.log("songtokens.length: ", songtokens.length ); 
    }
    for (let songtoken of songtokens) {
        const song = await getSong(sc,marketContract, songtoken.index)
        tokenData.push({ ...song, ...songtoken })
    }
    return tokenData;
}
export default getSongs;