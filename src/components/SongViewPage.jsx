import React, { useEffect, useState } from 'react';
import SongImage from './SongImage'
import { useParams } from "react-router-dom";
import getSong from '../scripts/getSong';
import getConnectedAddress from '../scripts/getConnectedAddress';
import { Button } from '@material-ui/core';

const SongViewPage = (props) => {
    const [songLoaded, setSongLoaded] = useState(false); 
    const [songToken, setSongToken] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [songNotExists, setSongNotExists] = useState(false);
    const { songId } = useParams();
    useEffect(() => {
        if (songToken) {
            setSongLoaded(true);
        }
    },[songToken])
    async function checkIfOwner(song) {
        const connectedAddress = await getConnectedAddress();
        console.log("song", song)
        console.log("checking owner: ", connectedAddress, ":",song.owner);
        if (song.owner === connectedAddress) {
            console.log("set owner to true");
            setIsOwner(true);
        }
    }

    async function getSongTokenFromBlockchain() {
        const song = await getSong(props.songContract, songId).then(
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
    function listTokenClick()  {
        console.log("List Token Clicked");
    }
    if (!songLoaded) {
        if (props.songContract) {
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
        console.log("song token audio:", songToken.audio)
        console.log("song image:", songToken.image)
        console.log("I am owner:", isOwner ? "T" : "F")
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
                        <Button variant="contained" onClick={newVersionClick}>Create New Version</Button>
                         <Button variant="contained" onClick={listTokenClick}>List Token</Button>
                    </div>
                }
            </div >
        )
    }
}

export default SongViewPage;