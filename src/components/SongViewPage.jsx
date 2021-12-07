import React, { useEffect, useState } from 'react';
import SongImage from './SongImage'
import { useParams } from "react-router-dom";
import getSong from '../scripts/getSong';
import getConnectedAddress from '../scripts/getConnectedAddress';

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
        if (song.owner === connectedAddress) {
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
        return (
            <div>
                {

                }
                <h1>Song Title: { songToken.title}</h1>
                <h2>{songToken.songId}</h2>
                <h3>I am owner: { }</h3>
                <p>Artist: {songToken.artist}</p>
                <p>Description: {songToken.desc}</p>
                <SongImage
                    songImage={songToken.image}
                    canUploadSong={ false}
                />
            </div >
        )
    }
}

export default SongViewPage;