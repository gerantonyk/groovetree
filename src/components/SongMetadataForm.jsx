import React, { useState} from 'react';
import { TextField } from '@material-ui/core';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';

const SongMetadataForm = (props) => {
  console.log("RENDERING METADATAFORM")
    const [songDesc, setSongDesc] = useState("");
  const handleChange = (event) => {
        setSongDesc(event.target.value);
    };

    function handleTitleChange(event) {
      props.setSongTitle(event.target.value);
    }
    async function handleClick() {
      // props.setSongTitle(songTitle);
      console.log("set song submitted in SMetaDF to true");
      props.setSongSubmitted(true);
    }
    return (
        <div className="meta-data-form">
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
                value={props.songTitle}
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
        <Button variant="contained" onClick={handleClick}>Upload Song</Button>
        </div>
    );
}
export default SongMetadataForm;