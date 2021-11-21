const ethers = require('ethers')
const hre = require('hardhat');
require('dotenv').config();

// const provider = new ethers.providers.Web3Provider(window.ethereum);

async function deploy() {
  const url = process.env.RINKEBY_URL;

  // value *= 1000000000000000000;
  // await window.ethereum.request({ method: 'eth_requestAccounts' });
  // const signer = provider.getSigner();
  // const factory = new ethers.ContractFactory(Song.abi, Song.bytecode, signer);
  // const contract = await factory.deploy();
  // console.log(contract);
  // return contract;

  let artifacts = await hre.artifacts.readArtifact("Song");
  const provider = new ethers.providers.JsonRpcProvider(url);
  let privateKey = process.env.RINKEBY_PRIVATE_KEY;
  let wallet = new ethers.Wallet(privateKey, provider);
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
  let song = await factory.deploy();

  console.log("Song SC  Address: ", song.address);
  await song.deployed();
}

deploy().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});

// export { deploy };