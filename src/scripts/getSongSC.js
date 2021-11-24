import { ethers } from 'ethers';
import Song from '../artifacts/Song.sol/Song.json';
// require('dotenv').config();

const provider = new ethers.providers.Web3Provider(window.ethereum);
const SONG_SC_ADDR = "0xdD760789a7d26994867850041F98AEeE15E6f14a";
async function getSong() {
    const SONG = await new ethers.Contract(SONG_SC_ADDR, Song.abi, provider);
    //TODO Error handle in case the song is not retrieved
    console.log(SONG)
    return SONG;
}

export default getSong;