import { ethers } from 'ethers';
import Song from '../artifacts/Song.sol/Song.json';
// require('dotenv').config();

const provider = new ethers.providers.Web3Provider(window.ethereum);
const SONG_SC_ADDR = "0x524beAc334589474B24247E0deABFfB9b16469F6";
async function getSong() {
    const SONG = await new ethers.Contract(SONG_SC_ADDR, Song.abi, provider);
    //TODO Error handle in case the song is not retrieved
    console.log(SONG)
    return SONG;
}

export default getSong;