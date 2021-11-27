import React, { useState} from 'react';
import SongUpload from './SongUpload';
import SongImage from './SongImage';
import SongMetadataForm from './SongMetadataForm';

const UploadPage = (props) => {
    // console.log("RENDERING UPLOAD PAGE")
    const [songSubmitted, setSongSubmitted] = useState(false);
    const [songTitle, setSongTitle] = useState("");

    return (
        <div className="upload-page">
            <SongUpload
                songSubmitted={songSubmitted}
                setSongSubmitted={setSongSubmitted}
                songContract={props.songContract}
                songTitle={songTitle }
            />
            <div className="song-upload">
                <SongImage/>
                <SongMetadataForm
                    setSongSubmitted={setSongSubmitted}
                    setSongTitle={setSongTitle}
                />
            </div>
        </div>
    )
}

export default UploadPage;