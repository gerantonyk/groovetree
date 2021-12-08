import { ethers } from 'ethers';
import config from "../config.json";
// import Song from '../artifacts/Song.sol/Song.json';
import MusicNFT from '../artifacts/MusicNFT.sol/MusicNFT.json';
import Market from '../artifacts/Market.sol/Market.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
async function getContracts() {
    const MusicNftContract = await new ethers.Contract(config.MUSIC_NFT_SC_ADDRESS, MusicNFT.abi, provider);
    const MarketContract = await new ethers.Contract(config.MARKET_SC_ADDRESS, Market.abi, provider);
    return [MusicNftContract, MarketContract];
}

export default getContracts;