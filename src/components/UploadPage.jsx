import React, { useState, useEffect} from 'react';
import SongUpload from './SongUpload';
import SongImage from './SongImage';
import SongMetadataForm from './SongMetadataForm';
import { useParams} from "react-router-dom";

/**
 *
 * @param {*} props
 *  musicNftContract: the MusicNFT.sol contract with an injected account.signer (Ethers.js Docs: https://docs.ethers.io/v5/api/contract/contract/)
 *  account: object with the following properties: {
        connected: true,
        provider,
        address,
        signer,
        balance: ethers.utils.formatEther(balance),
        isVerified: false
    }
 * @returns
 */
const UploadPage = (props) => {
    const [songSubmitted, setSongSubmitted] = useState(false);
    const [songMetaData, setSongMetaData] = useState({});
    const [uploadedSongImageFile, setUploadedSongImageFile] = useState(null);
    const [uploadedSongImageUrl, setUploadedSongImageUrl] = useState(null);
    const { parentId } = useParams();

    useEffect(() => {
        if(uploadedSongImageFile) {
            //TODO: this image needs to be converted to an IPFS url
            setUploadedSongImageUrl(URL.createObjectURL(uploadedSongImageFile));
        }
    }, [uploadedSongImageFile])

    const submitSong = (data, submitted) => {
        if(!props.musicNftContract){
            window.alert("Make sure to connect to a wallet first!");
            return;
        }
        if(!uploadedSongImageUrl){
            window.alert("Make sure to upload an image");
            return;
        }
        if(!data){
            window.alert("Make sure to input song information");
            return;
        }
        console.log("submit song in UpladoadPage",submitted)
        setSongMetaData(data);
        console.log("submit song in UpladoadPage")
        if(submitted) {
            setSongSubmitted(true);
        }
    }
    
    return (
        <div className="upload-page">
            {/* Gets the audio info */}
            <SongUpload
                songSubmitted={songSubmitted}
                setSongSubmitted={setSongSubmitted}
                musicNftContract={props.musicNftContract}
                songImageFile={uploadedSongImageFile}
                songMetaData={songMetaData}
                parentId={parentId}
            />
            <div className="song-upload">
                {/* Gets the image info */}
                <SongImage
                    songImageUrl={uploadedSongImageUrl} /* "url" State variable */
                    setSongImageFile={setUploadedSongImageFile} /*setter for the "file" state variable*/
                    canUpload={true}
                />
                {/* Gets the metadata info*/}
                <SongMetadataForm
                    submitSong={submitSong}
                />
            </div>
        </div>
    )
}

export default UploadPage;