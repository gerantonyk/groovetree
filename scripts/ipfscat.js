const { create } = require("ipfs-http-client");
const { CID } = require('multiformats/cid');
const all = require('it-all');
// import { extract } from 'it-tar'
const map = require('it-map')
const { extract} = require('it-tar');
const { pipe } = require('it-pipe');
const { concat } = require('uint8arrays/concat');
const { toString } = require('uint8arrays/to-string');
const toBuffer = require('it-to-buffer');
// var tar = require('tar-stream')

const ipfs = create("https://ipfs.infura.io:5001");


/**
 * @template T
 * @param {AsyncIterable<T>} source
 */
async function collect (source) {
    return all(source)
}

/**
 * @param {AsyncIterable<Uint8Array>} source
 */
async function * tarballed (source) {
    yield * pipe(
    source,
    extract(),
    async function * (source) {
        for await (const entry of source) {
        yield {
            ...entry,
            body: await toBuffer(map(entry.body, (buf) => buf.slice()))
        }
        }
    }
    )
}
async function getSong() {
    // console.log("GETTING SINGLE SONG songID");
    const tokenUri = CID.parse("QmYZ3dSEorNCoEJTsccmqAHC6PvyPqLjL9ZuCJjwJDH4dx");
    console.log("tokenuri from SC = ", tokenUri);
    const uri = concat(await all(ipfs.cat(tokenUri)))
    console.log("ipfs return", uri);
    const uriString = toString(uri);
    const parseuri = JSON.parse(uriString);
    console.log(parseuri);
    // const audiodata = concat(await all(ipfs.cat(audioCID)));
    const audioCID = CID.parse("QmapPj7koCCMp241CAhwZV413K3FrqVnYdKC2GeTQHsCuF")
    const output = await pipe(
        ipfs.get(audioCID),
        // tarballed,
        collect
    )
    console.log("output", output);
    // const outstring = toString(output);
    // console.log("outstring", outstring);
    // const outstringII = output.toString();
    // console.log("outstringII", outstringII);
    // const audiofile = await ipfs.cat(audioCID);
    // parseuri.audio = audiofile;
    // console.log(audiodata);
    // return parseuri;/\
}

async function simpleCat() {
    const stream = ipfs.cat('QmapPj7koCCMp241CAhwZV413K3FrqVnYdKC2GeTQHsCuF')
    let data = ''

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }

    console.log(data)
}
// async function catFile() {
//     let songdata = {}
//     for await (const data of ipfs.cat('QmYZ3dSEorNCoEJTsccmqAHC6PvyPqLjL9ZuCJjwJDH4dx')) {
//         console.log(data.toString())
//         const parseuri = JSON.parse(data);
//         songdata.audioUri = "QmapPj7koCCMp241CAhwZV413K3FrqVnYdKC2GeTQHsCuF"
//         for await (const audiofile of ipfs.cat(songdata.audioUri)) {
//             songdata.audiofile = audiofile
//             console.log("retrieved audiofile", songdata.audiofile);
//         }
//     }
// }

// catFile()
// simpleCat();
getSong();