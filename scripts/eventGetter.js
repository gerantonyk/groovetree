const hre = require('hardhat');

async function eventGetter() {

  const MusicNFT = await ethers.getContractAt('MusicNFT','0xd325f010A6ce0086B42C6B68a6A1dE202f6387BB');
	
  const filter = await MusicNFT.filters.TokenCreated()

  let events = await MusicNFT.queryFilter(filter)  
  const mapeado = events.map(event=> {return {
    index:event.args.index.toNumber(),
    title:event.args.tokenU,
    owner:event.args.owner
  }})

  console.log(mapeado)  
}



eventGetter().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});