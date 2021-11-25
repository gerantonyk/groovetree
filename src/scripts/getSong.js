// import { ethers } from 'ethers';
// import config from "../config.json";
// import Song from '../artifacts/Song.sol/Song.json';
// require('dotenv').config();

// const provider = new ethers.providers.Web3Provider(window.ethereum);
async function getSong(sc, songId) {
    // const SONG = await new ethers.Contract(SONG_SC_ADDR, Song.abi, provider);
    //TODO Error handle in case the song is not retrieved
    console.log("SC sent to getong", sc);
    const song = sc.getToken(songId);
    console.log("song from getSong: ", song);
    return song;

}

export default getSong;