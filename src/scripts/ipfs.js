const { create } = require("ipfs-http-client");

const ipfs = create("https://ipfs.infura.io:5001");

async function ipfsUri(data) {
  console.log("song file", data.audio)
  console.log("data", data)
  //TODO upload image
    //upload audio
  let ipfsData = {}
  if (data.audio) {
    const added = await ipfs.add(data.audio);
    ipfsData.audio = `https://gateway.ipfs.io/ipfs/${added.path}`
    console.log("loaded audio", added);
  }

  ipfsData.title = (data.title) ? data.title : "Untitled"
  ipfsData.desc = (data.desc) ? data.desc : "No description"
  ipfsData.artist = (data.artist) ? data.artist : "Unknown"

  console.log("Stringified json data", JSON.stringify(ipfsData));
  const file = {
    path: '/',
    content: JSON.stringify(ipfsData)
  };
  const result = await ipfs.add(file);
    console.log(result);
    return `https://gateway.ipfs.io/ipfs/${result.path}`;
}

export { ipfsUri };
