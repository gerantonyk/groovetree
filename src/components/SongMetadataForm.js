import React, { useState, useRef} from 'react';
import { TextField } from '@material-ui/core';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import { useGlobalState } from 'state-pool';
import getSong from '../scripts/getSongSC';

const SongMetadataForm = () => {

    const [songDesc, setSongDesc] = useState("");
    const [songIsSubmitted, setSongIsSubmitted] = useGlobalState("songIsSubmitted"); 
    const handleChange = (event) => {
        setSongDesc(event.target.value);
    };

    async function handleClick() {
        // if (!file) return;
        const song = await getSong();
        console.log("song in React componet:", song);
        setSongIsSubmitted(true);
        //Trigger the song upload to IPFS in SongUploads.js
    }
    return (
        <div className="meta-data-form">
            
            {/* {fileUrl && <img src={fileUrl} alt = "Song Thumbnail"/>} */}

            <h3>Token Metadata (stored on chain)</h3>
            <Box
                
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          m: 3,
          bgcolor: 'background.paper',
        }}
      >
        <TextField id="song title" label="Title" variant="standard" />
        </Box>
        
        <h3>Song Metadata (stored with audio data on ipfs)</h3>
        <Box
                
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          m: 3,
          bgcolor: 'background.paper',
        }}
      >
        <TextField id="song artist" label="Artist" variant="standard" />
        <TextField
          id="outlined-multiline-flexible"
          label="Song Description"
          multiline
          rows={4}
          value={songDesc}
          onChange={handleChange}
          variant="filled"
          placeholder="Song description and notes"
                />       
        </Box>
        <Button variant="contained" onClick={ handleClick}>Upload Song</Button>
        </div>
    );
}
export default SongMetadataForm;