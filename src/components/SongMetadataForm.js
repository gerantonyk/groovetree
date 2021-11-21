import React, { useState, useRef} from 'react';
import { TextField } from '@material-ui/core';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import { useGlobalState, store } from 'state-pool';
import getSong from '../scripts/getSongSC';
store.setState("songTitle", "");
const SongMetadataForm = () => {
    const [songTitle, setSongTitle] = useGlobalState("songTitle");
    const [songDesc, setSongDesc] = useState("");
    const [songIsSubmitted, setSongIsSubmitted] = useGlobalState("songIsSubmitted"); 
    const handleChange = (event) => {
        setSongDesc(event.target.value);
    };
  // const handleTitleChange = (event) => {
  //   setSongTitle(event.target.value);
  // };
    function handleTitleChange(event) {
      setSongTitle(event.target.value);
      console.log(songTitle , "has been set");
    }
    async function handleClick() {
        // if (!file) return;
        const song = await getSong();
        console.log("song in React componet:", song);
        // setSongTitle(song.title);
        setSongIsSubmitted(true);
        //Trigger the song upload to IPFS in SongUploads.js
    }
    return (
        <div className="meta-data-form">
            
            {/* {fileUrl && <img src={fileUrl} alt = "Song Thumbnail"/>} */}

            <h4>Token Metadata (stored on chain)</h4>
            <Box
                
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          m: 3,
          bgcolor: 'background.paper',
        }}
      >
          <TextField
            id="song title"
            label="Title"
            variant="standard"
            onChange={handleTitleChange}
            value={songTitle}
          />
        </Box>
        
        <h4>Song Metadata (stored with audio data on ipfs)</h4>
        <Box
                
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 5,
          m: 5,
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
          variant="standard"
          placeholder="Song description and notes"
                />       
        </Box>
        <Button variant="contained" onClick={ handleClick}>Upload Song</Button>
        </div>
    );
}
export default SongMetadataForm;