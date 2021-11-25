import { useEffect, useState } from 'react';
import SongImage from './SongImage'
import { useParams } from "react-router-dom";
import getSong from '../scripts/getSong';
import getSongSC from '../scripts/getSongSC';
const SongViewPage = () => {
    const [songLoaded, setSongLoaded] = useState(false); 
    const [songContract, setSongContract] = useState(null);
    const [songToken, setSongToken] = useState(null);
    console.log("songContract in songivewpage", songContract);
    const { songId } = useParams();
    console.log("songId: " + songId);
    useEffect(() => {
        console.log("useEffect in songView", songToken);
        if (songToken) {
            setSongLoaded(true);
        }
    },[songToken])
    
    async function getSongTokenFromBlockchain() {
        let currContract = songContract;
        if (currContract == null) {
            console.log("contract is null in Songviewpage");
            currContract = await getSongSC();
            console.log("sc retrieved in SVPage", currContract);
            setSongContract(currContract);
            console.log("song  contract set in SVPage: ", songContract);
        }
        console.log("SC before grabbing song in SongViewPage", songContract);
        const song = await getSong(currContract, songId).then(
            (song) => {
                console.log("song retrieved", song);
                setSongToken(song);
                // setSongLoaded(true);
            });
        console.log("song in songview component", song);
    }
    if (!songLoaded) {
        getSongTokenFromBlockchain();
        console.log("Loading")
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return (
            <div>
                <h1>{songToken.title}</h1>
                <h2>{songToken.songId}</h2>
                <div className="song-upload">
                    <SongImage />
                    <p>Owner Address: {songToken.owner}</p>
                    {/* <SongMetadataForm/> */}
                </div>
            </div >
        )
    }
}

export default SongViewPage;