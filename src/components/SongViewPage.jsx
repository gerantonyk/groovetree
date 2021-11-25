import { useState } from 'react';
import SongImage from './SongImage'
import { useParams } from "react-router-dom";
import { useGlobalState } from 'state-pool';
import getSong from '../scripts/getSong';
const SongViewPage = () => {
    const [songContract] = useGlobalState("songContract");
    console.log("songContract in songivewpage", songContract);
    const { songId } = useParams();
    console.log("songId" + songId);
    const [songTitle] = useState('');
    const song = getSong(songContract, songId);
    console.log("song:::", song);

    return (
        <div>
            <h1>{songTitle}</h1>
            <div className="song-upload">
                <SongImage />
                <p>{song}</p>
                {/* <SongMetadataForm/> */}
            </div>
        </div>    
    ) 
}

export default SongViewPage;