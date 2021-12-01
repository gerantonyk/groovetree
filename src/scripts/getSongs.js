
async function getSongs(sc) {
    //const songtokens = await sc.getTokens();
    const filter = await sc.filters.TokenCreated()

    let events = await sc.queryFilter(filter)  

    const songtokens = events.map(event=> {return {
        index:event.args.index.toNumber(),
        title:event.args.tokenU,
        owner:event.args.owner
    }})

    return songtokens;
}
export default getSongs;