import { ethers } from 'ethers';
import config from "../config.json";
// import Song from '../artifacts/Song.sol/Song.json';
import MusicNFT from '../artifacts/MusicNFT.sol/MusicNFT.json';
import Market from '../artifacts/Market.sol/Market.json';

async function getContracts(provider) {
    if(!provider) throw new Error("Error in getContracts: Provider is null or undefined"); 
    const MusicNftContract = await new ethers.Contract(config.MUSIC_NFT_SC_ADDRESS, MusicNFT.abi, provider);
    const MarketContract = await new ethers.Contract(config.MARKET_SC_ADDRESS, Market.abi, provider);
    return [MusicNftContract, MarketContract];
}

export default getContracts;