import { ethers } from 'ethers';
import config from "../config.json";
import Song from '../artifacts/Song.sol/Song.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
async function getSongSC() {
    const SONG = await new ethers.Contract(config.SONG_SC_ADDR, Song.abi, provider);
    //TODO Error handle in case the song is not retrieved

    console.log("SC RETRIEVED IS:",SONG)
    return SONG;
}

export default getSongSC;