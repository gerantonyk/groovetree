import React, { useState, useEffect} from 'react';
import SongUpload from './SongUpload';
import SongImage from './SongImage';
import SongMetadataForm from './SongMetadataForm';
import placeholderImage from '../resources/placeholder.png';

const UploadPage = (props) => {
    const [songSubmitted, setSongSubmitted] = useState(false);
    const [songMetaData, setSongMetaData] = useState({});
    const [uploadedSongImageFile, setUploadedSongImageFile] = useState(placeholderImage);
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
                songImage={uploadedSongImageFile}
                songMetaData={songMetaData}
            />
            <div className="song-upload">
                <SongImage
                    setSongImage={setUploadedSongImageFile}
                    canUpload={ true}
                />
                <SongMetadataForm
                    submitSong={submitSong }
                />
            </div>
        </div>
    )
}

export default UploadPage;