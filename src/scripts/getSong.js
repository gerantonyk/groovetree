import { ethers } from 'ethers';
// import config from "../config.json";
// import Song from '../artifacts/Song.sol/Song.json';
// require('dotenv').config();

// const provider = new ethers.providers.Web3Provider(window.ethereum);
async function getSong(sc, songId) {
    // const SONG = await new ethers.Contract(SONG_SC_ADDR, Song.abi, provider);
    //TODO Error handle in case the song is not retrieved
    console.log("SC sent to getong", sc);
    sc.getToken(songId).then(song => {
        console.log("song:", song);
        return song;
    }).catch(err => {
        console.log("err:", err);
    });
    // console.log(SONG)
    // return song;
}

export default getSong;