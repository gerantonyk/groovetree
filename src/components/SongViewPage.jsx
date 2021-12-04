import React, { useEffect, useState } from 'react';
import SongImage from './SongImage'
import { useParams } from "react-router-dom";
import getSong from '../scripts/getSong';

const SongViewPage = (props) => {
    const [songLoaded, setSongLoaded] = useState(false); 
    const [songToken, setSongToken] = useState(null);
    const { songId } = useParams();
    useEffect(() => {
        if (songToken) {
            setSongLoaded(true);
        }
    },[songToken])
    
    async function getSongTokenFromBlockchain() {
        const song = await getSong(props.songContract, songId).then(
            (song) => {
                console.log("songuri", song)
                setSongToken(song);
            });
        console.log("song in songview component", song);
    }
    if (!songLoaded) {
        if (props.songContract) {
            // console.log("songContract in SVP", props.songContract)
            getSongTokenFromBlockchain();
        } 
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    } else {
        console.log("song token audio:", songToken.audio)
        return (
            <div>
                <h1>Song Title: { songToken.title}</h1>
                <h2>{songToken.songId}</h2>
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