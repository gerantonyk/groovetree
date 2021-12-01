import React, { useState} from 'react';
import SongUpload from './SongUpload';
import SongImage from './SongImage';
import SongMetadataForm from './SongMetadataForm';

const UploadPage = (props) => {
    // console.log("RENDERING UPLOAD PAGE")
    const [songSubmitted, setSongSubmitted] = useState(false);
    // const [songTitle, setSongTitle] = useState("");
    const [songMetaData, setSongMetaData] = useState({});
    const submitSong = (data, submitted) => {
        setSongMetaData(data);
        if(submitted) {
            setSongSubmitted(true);
        }
    }
    return (
        <div className="upload-page">
            <SongUpload
                songSubmitted={songSubmitted}
                setSongSubmitted={setSongSubmitted}
                songContract={props.songContract}
                songMetaData={songMetaData}
                // songTi/tle={songTitle }
            />
            <div className="song-upload">
                <SongImage/>
                <SongMetadataForm
                    submitSong={submitSong }
                    // setSongSubmitted={setSongSubmitted}
                />
            </div>
        </div>
    )
}

export default UploadPage;