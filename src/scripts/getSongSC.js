import { ethers } from 'ethers';
import config from "../config.json";
//import Song from '../artifacts/Song.sol/Song.json';
import MusicNFT from '../artifacts/MusicNFT.sol/MusicNFT.json';


const provider = new ethers.providers.Web3Provider(window.ethereum);
async function getSongSC() {
    //const SONG = await new ethers.Contract(config.SONG_SC_ADDR, Song.abi, provider);
    const SONG = await new ethers.Contract(config.SONG_SC_ADDR, MusicNFT.abi, provider);
    return SONG;
}

export default getSongSC;