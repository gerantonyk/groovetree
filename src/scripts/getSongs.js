import getSong from "./getSong";

async function getSongs(sc) {
    const count = (await sc.getTokenCount()).toNumber();
    const tokenCount = count;
    const tokenData = []
    for (let i = 0; i < tokenCount; i++) {
        tokenData.push(await getSong(sc, i));
    }
    console.log(tokenData);
    return tokenData;
}
export default getSongs;