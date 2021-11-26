import { ethers } from 'ethers';
import config from "../config.json";
import Song from '../artifacts/Song.sol/Song.json';
// require('dotenv').config();

const provider = new ethers.providers.Web3Provider(window.ethereum);

async function getSongs(songContract) {
    console.log("song Contract sent to getSongs:", songContract);
    const sc = await new ethers.Contract(config.SONG_SC_ADDR, Song.abi, provider);
    const songs = await sc.getTokens();
    console.log("songs from getSongs: ", songs);
    return songs;
}
export default getSongs;