const { create } = require("ipfs-http-client");
const ipfs = create("https://ipfs.infura.io:5001");
const IPFS_BASE_PATH = "https://gateway.ipfs.io/ipfs/";
const { CID } = require('multiformats/cid');
const { concat } = require('uint8arrays/concat');
const { toString } = require('uint8arrays/to-string');
const all = require('it-all');

/**
 * @param {*} musicNftContract
 * @param {*} marketContract
 * @param {*} songId
 * @returns  the tokenURI's metadata
 */
async function getSong(musicNftContract, marketContract, songId) {
    console.log("GETTING SINGLE SONG songID:", songId);
    console.log("GETTING SINGLE SONG musicNftContract:", musicNftContract);
    console.log("GETTING SINGLE SONG musicNftContract:", musicNftContract);
    try {
        var tokenUri = await musicNftContract.tokenURI(songId);
        var owner = await musicNftContract.ownerOf(songId);
        var version = await musicNftContract.version(songId);
        var isActive = await musicNftContract.isActive(songId);
        var parentId;
        try{
            parentId = await musicNftContract.parent(songId);

        } catch (e) {
            console.log("No parentId found");
        }
    } catch (e) {
        console.log("ERROR: ", e);
        return null;
    }
    const filter = await marketContract.filters.TokenListed()
    console.log("filter", filter)
    console.log("musicNftContract to get Event", marketContract);
    let listings = await marketContract.queryFilter(filter)
    console.log("listings from musicNftContract", listings)
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
    let tokenOffers;
    if(offers && offers.length > 0) {
        console.log("all offers", offers)
        console.log("offers idx", offers[0].args ,  " : ", songId)
        tokenOffers = offers.filter(offer => offer.args.index == songId)
        console.log("offers", tokenOffers)
    }

    if (tokenUri.startsWith(IPFS_BASE_PATH)) {
        tokenUri = tokenUri.replace(IPFS_BASE_PATH, "");
    }
    const tokenCid = CID.parse(tokenUri);
    const uri = concat(await all(ipfs.cat(tokenCid)))
    const uriString = toString(uri);
    const songInfo = JSON.parse(uriString);
    songInfo.owner = owner;
    songInfo.parentId = Number(parentId);
    songInfo.version = Number(version);
    songInfo.listing = listing;
    songInfo.offers = tokenOffers;
    songInfo.isActive = isActive;
    console.log("songInfo: ", songInfo);
    return songInfo;
}

export default getSong;