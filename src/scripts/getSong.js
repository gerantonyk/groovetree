async function getSong(sc, songId) {
    // const song = sc.getToken(songId);
    let filter
    try{
        console.log("1",songId)
     filter = await sc.filters.TokenCreated(parseInt(songId))
    } catch(e) {console.log(e)}
    let events = await sc.queryFilter(filter)  
    const song = events.map(event=> {return {
        songId:event.args.index.toNumber(),
        title:event.args.tokenU,
        owner:event.args.owner
    }})    
    console.log("funciono")
    console.log("song", song[0])
    return song[0];
}

export default getSong;