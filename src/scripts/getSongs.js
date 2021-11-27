
async function getSongs(sc) {
    const songtokens = await sc.getTokens();
    return songtokens;
}
export default getSongs;