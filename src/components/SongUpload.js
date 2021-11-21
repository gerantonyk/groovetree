import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { store, useGlobalState } from 'state-pool';
import { createSongToken } from '../scripts/mintsong';
store.setState("ipfsAudiofileUrl", "");
store.setState("songIsUploadedAndMinted", false);
const SongUpload = () => {
    const [songTitle] = useGlobalState("songTitle");
    console.log("songTitle in songUpload:", songTitle)
    const [ipfsClient] = useGlobalState('ipfsClient');
    const [songIsUploadedAndMinted, setSongIsUploadedAndMinted] = useGlobalState('songIsUploadedAndMinted');
    const [songIsSubmitted, setSongIsSubmitted] = useGlobalState("songIsSubmitted"); 

    const [file, setFile] = useState(null);
    const [fileUrl, updateFileUrl] = useGlobalState('ipfsAudiofileUrl');
    const ref = useRef();
    const resetInput = () => {
        ref.current.value = "";
    };
    
    async function onChange(e) {
        console.log(e)
        const file = e.target.files[0];
        console.log('file:', file);
        setFile(file);
    }
    async function addToIpfs() {
        try {
            const added = await ipfsClient.add(file);
            const url = `http://ipfs.infura.io/ipfs/${added.path}`
            console.log("uploaded to ipfs in SongUpload:" + url);
            updateFileUrl(url);
            resetInput();
            createSongToken("SongFromSongUpload");

        } catch (err) {
            console.error(err);
        }
    }
    // useEffect(() => {
    if (songIsSubmitted) {
        // console.log("songIsSubmitted is true in SongUpload");
        addToIpfs();
        // console.log("ADDED TO IPFS");
        setSongIsSubmitted(false);
        // console.log("SONGISSUBMITTED ==== False");
        setSongIsUploadedAndMinted(true);   
        }
    // }, []);
    return (
           <Box
                
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 1,
            m: 1,
          border: '3px pink',
          bgcolor: 'lightblue',
        }}
      >
      
            {/* <div className="upload-bar"> */}
            <h2>Create new BlockSong Token!</h2>
            {songIsUploadedAndMinted &&
                <p>Song has been uploaded: {songTitle }</p>
            }
                <input type="file" ref={ref} onChange={onChange} />
            {/* </div> */}
        </Box>
    )
}

export default SongUpload