const { create } = require("ipfs-http-client");
const ipfs = create("https://ipfs.infura.io:5001");
const IPFS_BASE_PATH = "https://gateway.ipfs.io/ipfs/";
const { CID } = require('multiformats/cid');
const { concat } = require('uint8arrays/concat');
const { toString } = require('uint8arrays/to-string');
const all = require('it-all');

async function getSong(sc, marketContract, songId) {
    console.log("GETTING SINGLE SONG songID:", songId);
    console.log("GETTING SINGLE SONG sc:", sc);
    console.log("GETTING SINGLE SONG sc:", sc);
    try {
        var tokenUri = await sc.tokenURI(songId);
        var owner = await sc.ownerOf(songId);
    } catch (e) {
        console.log("ERROR: ", e);
        return null;
    }
    const filter = await marketContract.filters.TokenListed()
    console.log("filter", filter)
    console.log("sc to get Event", marketContract);
    let listings = await marketContract.queryFilter(filter)
    console.log("listings from sc", listings)
    let listing = null;
    for (let i = listings.length - 1; i >= 0; i--) {
        console.log(listings[i])
        console.log("listings index", listings[i].args.index)
        if(listings[i].args.index === songId) {
            listing = listings[i];
            break;
        }
    }
    console.log("Listing determined", listing)

    const offer_filter = await marketContract.filters.OfferMade()
    let offers = await marketContract.queryFilter(offer_filter)
    console.log("all offers", offers)
    console.log("offers idx", offers[0].args ,  " : ", songId)
    let tokenOffers = offers.filter(offer => offer.args.index == songId)
    console.log("offers", tokenOffers)

    if (tokenUri.startsWith(IPFS_BASE_PATH)) {
        tokenUri = tokenUri.replace(IPFS_BASE_PATH, "");
    }
    const tokenCid = CID.parse(tokenUri);
    const uri = concat(await all(ipfs.cat(tokenCid)))
    const uriString = toString(uri);
    const parseuri = JSON.parse(uriString);
    parseuri.owner = owner;
    parseuri.listing = listing;
    parseuri.offers = tokenOffers;
    // console.log(parseuri);
    //TODO get audio

    return parseuri;
}

export default getSong;