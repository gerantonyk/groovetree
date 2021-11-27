// import { ethers } from 'ethers';
// import config from "../config.json";
// import Song from '../artifacts/Song.sol/Song.json';
// require('dotenv').config();

// const provider = new ethers.providers.Web3Provider(window.ethereum);

async function getSongs(sc) {
    // const sc = await new ethers.Contract(config.SONG_SC_ADDR, Song.abi, provider);
    const songtokens = await sc.getTokens();
    // console.log("songtokens in getsong", songtokens)
    return songtokens;
}
export default getSongs;