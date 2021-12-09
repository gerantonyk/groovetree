import React, { useEffect, useState } from 'react';
import SongImage from './SongImage'
import {ethers} from 'ethers';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import getSong from '../scripts/getSong';
import getConnectedAddress from '../scripts/getConnectedAddress';
import { Button } from '@material-ui/core';
import { listSong } from '../scripts/listSong';
import { buyToken } from '../scripts/buyNft';
import { makeOffer } from '../scripts/makeOffer';
import { Link } from "react-router-dom";

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
    }, [songToken])

    useEffect(() => {
        if (props.musicNftContract && props.marketContract) {
            getSongTokenFromBlockchain(songId);
        }
    }, [props.account])

    async function checkIfOwner(song) {
        console.log(`checkIfOwner got called. song.owner: ${song.owner}, props.account.address: ${props.account.address}`);
        if (song.owner === props.account.address) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    }

    async function getSongTokenFromBlockchain(tokenId) {
        await getSong(props.musicNftContract, props.marketContract, tokenId).then(
            (song) => {
                if (song) {
                    console.log("We found the song");
                    setSongToken(song);
                    checkIfOwner(song);
                } else {
                    console.log("song not exists to true");
                    setSongNotExists(true);
                }
            });
    }

    function viewParentClick() {
        getSongTokenFromBlockchain(songToken.parentId);
    }

    async function listTokenClick() {
        if (props.marketContract && props.musicNftContract) {
            await listSong(props.musicNftContract, props.marketContract, songId);
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
            getSongTokenFromBlockchain(songId);
        }
        if (songNotExists) {
            return (
                <div>
                    <h1>Song {songId} does not exist</h1>
                </div>
            )
        } else if (!props.account.address) {
            return (
                <div>
                    <h1>Please connect wallet using button on top right corner</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
    } else {
        return (
            <div>
                <h1>{songToken.title}</h1>
                <h2>I am owner: {isOwner ? "True" : "False"} </h2>
                <h4>Artist: {songToken.artist}</h4>
                <h4>Description: {songToken.desc}</h4>
                <p> Version: {songToken.version}</p>
                <p> isActive: {songToken.isActive + ''}</p>
                <p> Token ID: {songId}</p>
                {songToken.parentId ? (
                    <Link to={`/song/${songToken.parentId}`}  onClick={viewParentClick}>
                        Visit Parent
                    </Link>) : null}
                <SongImage
                    songImageUrl={songToken.image}
                    canUploadSong={false}
                />
                {isOwner &&
                    <div>
                        <Link to={`/newversion/${songId}`}>
                            <Button variant="contained">
                                <p>Create New Version</p>
                            </Button>
                        </Link>
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
                    <div>
                        <h3>Current Offers</h3>
                        {songToken.offers.map(({ args }, idx) => (
                            <Box sx={{
                                flexDirection: 'column',
                                display: 'flex',
                            }} className="song-offer-row">
                                <p key={idx + ":" + args.bidder + ":" + ethers.utils.formatEther(args.price)}>
                                    {args.bidder} " for " {ethers.utils.formatEther(args.price)}
                            
                                </p>
                            </Box>
                        ))}
                    </div>
                }
            </div >
        )
    }
}

export default SongViewPage;