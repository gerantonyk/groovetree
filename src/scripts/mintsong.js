
import {ethers} from 'ethers';

async function createNewSong(musicNftContract, uri, royalty) {
  console.log("Attempting to create new token with uri: " + uri)
  const transaction = await musicNftContract.createSong(uri, royalty, {gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 1000000});
  console.log("Transaction sent. Awaiting confirmation...", transaction);
  const receipt = await transaction.wait();
  const event = receipt.events.filter(event => event.event === 'TokenCreated')[0];
  const tokenId = event.args[0];
  console.log("Token minted with ID: " + tokenId)
  return [transaction.hash, tokenId]
}

async function createNewVersion(musicNftContract, parentId, uri, royalty) {
  console.log("Attempting to create new version on top of token: " + parentId);
  const transaction = await musicNftContract.createNewV(parentId, uri, royalty, {gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 1000000})
  const receipt = await transaction.wait();
  const event = receipt.events.filter(event => event.event === 'NewVersionCreated')[0];
  const tokenId = event.args[0];
  console.log("Token minted with ID: " + tokenId)
  return [transaction.hash, tokenId]
}

export { createNewSong, createNewVersion};

