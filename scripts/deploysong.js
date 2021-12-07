const ethers = require('ethers')
const hre = require('hardhat');

require('dotenv').config();

async function deploy() {
  const url = process.env.RINKEBY_URL;

  let artifacts = await hre.artifacts.readArtifact("Song");
  const provider = new ethers.providers.JsonRpcProvider(url);
  let privateKey = process.env.RINKEBY_PRIVATE_KEY;
  let wallet = new ethers.Wallet(privateKey, provider);
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
  let song = await factory.deploy();

  console.log("Song SC  Address: ", song.address);
  await song.deployed();
  //TODO update config with new SC. 
}

deploy().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});

// export { deploy };