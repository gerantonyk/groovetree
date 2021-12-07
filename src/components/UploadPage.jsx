import React, { useState, useEffect} from 'react';
import SongUpload from './SongUpload';
import SongImage from './SongImage';
import SongMetadataForm from './SongMetadataForm';

const UploadPage = (props) => {
    const [songSubmitted, setSongSubmitted] = useState(false);
    const [songMetaData, setSongMetaData] = useState({});
    const [uploadedSongImageFile, setUploadedSongImageFile] = useState(null);
    const [uploadedSongImageUrl, setUploadedSongImageUrl] = useState(null);
    useEffect(() => {
        if(uploadedSongImageFile) {
            setUploadedSongImageUrl(URL.createObjectURL(uploadedSongImageFile));
        }
    }, [uploadedSongImageFile])
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
                    songImage={uploadedSongImageUrl}
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