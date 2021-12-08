import { ethers } from 'ethers';
import config from "../config.json";
// import Song from '../artifacts/Song.sol/Song.json';
import MusicNFT from '../artifacts/MusicNFT.sol/MusicNFT.json';

async function getSongSC(provider) {
    if(!provider) throw new ("Error! Attempted to get song contract without connecting wallet first!");
    const MusicNftContract = await new ethers.Contract(config.SONG_SC_ADDR, MusicNFT.abi, provider);
    return MusicNftContract;
}

export default getSongSC;