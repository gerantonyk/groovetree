import { ethers } from 'ethers';
import config from "../config.json";
// import Song from '../artifacts/Song.sol/Song.json';
import MusicNFT from '../artifacts/MusicNFT.sol/MusicNFT.json';
import Market from '../artifacts/Market.sol/Market.json';

async function getContracts(signer) {
    if(!signer) throw new Error("Error in getContracts: Signer is null or undefined");
    const MusicNftContract = await new ethers.Contract(config.MUSIC_NFT_SC_ADDRESS, MusicNFT.abi, signer);
    const MarketContract = await new ethers.Contract(config.MARKET_SC_ADDRESS, Market.abi, signer);
    return [MusicNftContract, MarketContract];
}

export default getContracts;