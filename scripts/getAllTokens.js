const ethers = require('ethers')
const hre = require('hardhat');
require('dotenv').config();
import {getSong} from './getSong'
// const SONG_SC_ADDR = "0xdB7d8578a95AeD28a6bFD92e7B028B322C3D745a";


async function getTokenCount() {
  const url = process.env.RINKEBY_URL;

  let artifacts = await hre.artifacts.readArtifact("Song");
  const provider = new ethers.providers.JsonRpcProvider(url);
    const SONG = await new ethers.Contract(SONG_SC_ADDR, artifacts.abi, provider);
    const count = await SONG.getTokenCount();
    const tokenCount = count.toNumber();
    tokens = []
    for (let i = 0; i < tokenCount; i++) {
        const token = await SONG.tokenURI(i);
        console.log(token)
        tokens.push(token)
    }
    console.log("tokens", tokens)
    return tokens;
}

getTokenCount().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
