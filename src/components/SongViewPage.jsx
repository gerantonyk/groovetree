import React, { useEffect, useState } from 'react';
import SongImage from './SongImage'
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import getSong from '../scripts/getSong';
import getConnectedAddress from '../scripts/getConnectedAddress';
import { Button } from '@material-ui/core';
import { listSong } from '../scripts/listSong';
import { buyToken } from '../scripts/buyNft';
import { makeOffer } from '../scripts/makeOffer';

const SongViewPage = (props) => {
    const [songLoaded, setSongLoaded] = useState(false); 
    const [songToken, setSongToken] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [songNotExists, setSongNotExists] = useState(false);
    const { songId } = useParams();
    console.log("Render SongViewPage for song id" + songId)
    useEffect(() => {
        if (songToken) {
            setSongLoaded(true);
        }
    },[songToken])
    async function checkIfOwner(song) {
        const connectedAddress = await getConnectedAddress();
        // console.log("song", song)
        // console.log("checking owner: ", connectedAddress, ":",song.owner);
        if (song.owner === connectedAddress) {
            console.log("set owner to true");
            setIsOwner(true);
        }
    }

    async function getSongTokenFromBlockchain() {
        const song = await getSong(props.musicNftContract, props.marketContract, songId).then(
            (song) => {
                console.log("songuri", song)
                if (song) {
                    setSongToken(song);
                    checkIfOwner(song);
                } else {
                    console.log("song not exists to true");
                    setSongNotExists(true);
                }
            });
        console.log("song in songview component", song);
    }
    function newVersionClick()  {
        console.log("Create New Version Clicked");
    }
    async function listTokenClick() {
        if (props.marketContract && props.musicNftContract) {
            await listSong(props.musicNftContract,props.marketContract,songId);
        }
        console.log("List Token Clicked");
    }
    async function buyTokenClick() {
        await buyToken(songId);
        console.log("Buy Token Clicked");
    }
    function bidTokenClick() {
        console.log("List Token Clicked");
        if (props.marketContract) {
            makeOffer(props.marketContract, songId, .1);
        }
    }
    if (!songLoaded) {
        if (props.musicNftContract && props.marketContract) {
            // console.log("songContract in SVP", props.songContract)
            getSongTokenFromBlockchain();
        }
        if (songNotExists) {
            return (
                <div>
                    <h1>Song {songId } does not exist</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
    } else {       
        // console.                                           log("song token audio:", songToken.audio)
        return (
            <div>
                <h1>Song Title: { songToken.title}</h1>
                <h2>{songToken.songId}</h2>
                <h3>I am owner: {isOwner ? "True" : "False"}</h3>
                <p>Artist: {songToken.artist}</p>
                <p>Description: {songToken.desc}</p>
                <SongImage
                    songImage={songToken.image}
                    canUploadSong={ false}
                />
                {isOwner &&
                    <div>
                        <Button variant="contained" onClick={newVersionClick}>Create New Version (not implemented) </Button>
                         <Button variant="contained" onClick={listTokenClick}>List Token</Button>
                         <h3>Current Offers....</h3>
                    </div>
                }
                {
                    !isOwner &&
                    <div>
                        {
                            songToken.listing && 
                            <Button variant="contained" onClick={buyTokenClick}>Buy for {songToken.listing.price}</Button>

                        }
                        <Button variant="contained" onClick={bidTokenClick}>Bid token </Button>
                    </div>
                }
                {
                    songToken.offers &&
                    songToken.offers.map(({ index, bidder, price }, idx) => (
                    <Box sx={{
                        flexDirection: 'column',
                        display: 'flex',
                    }} className="song-offer-row">
                        <p key={idx + ":" + bidder + ":" + price}>
                                {bidder} " for " {price}
                            
                        </p>
                    </Box>
                ))}
            </div >
        )
    }
}

export default SongViewPage;