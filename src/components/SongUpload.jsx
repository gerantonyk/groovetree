import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { create } from 'ipfs-http-client';
import { createSongToken } from '../scripts/mintsong';
import { Link } from "react-router-dom";

const ipfsclient = create('https://ipfs.infura.io:5001/api/v0')

const SongUpload = (props) => {
    console.log("RENDERING SongUpload", props.songSubmitted);
    const [ lastSongId, setLastSongId ] = useState(-1);
    const [songMinted, setSongMinted] = useState(false);
    const [mintingSong, setMintingSong] = useState(false);
    const [file, setFile] = useState(null);
    const ref = useRef();
    const resetInput = () => {
        ref.current.value = "";
    };

    async function onChange(e) {
        const file = e.target.files[0];
        setFile(file);
    }
    async function mintSong() {
        console.log("MINT SONG")
        try {
            const added = await ipfsclient.add(file);
            const url = `http://ipfs.infura.io/ipfs/${added.path}`
            console.log('added:', url);
            // updateFileUrl(url);
            const songtokenid = await createSongToken(props.songContract, props.songTitle);
            // setMintingSong(true);
            console.log("songotkenis after createSongtoken", songtokenid)
            resetInput();

        } catch (err) {
            console.error(err);
        }
    }
    if (props.songContract && mintingSong) {
        console.log("listening for emission on", props.songContract);
        props.songContract.on('TokenCreated', (idx, owner, addr) => {
            console.log("TokenCreated event emitted");
            console.log(idx, "::", owner, "::", addr);
            console.log("listening for emitter")
            setLastSongId(idx);
            setSongMinted(true);
            setMintingSong(false);
        });
    }
   
    if (props.songSubmitted && !mintingSong) {
        props.setSongSubmitted(false);
        setMintingSong(true);
        setSongMinted(false);
        console.log("Song has been submitted in SongUpload, minting song")
        mintSong();
    }
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
      
            <h2>Create new BlockSong Token!</h2>
            {songMinted && lastSongId > -1 &&
                <p>Song has been uploaded: <Link to={`/song/${lastSongId}`}>{props.songTitle }</Link></p>
            }
                <input type="file" ref={ref} onChange={onChange} />
        </Box>
    )
}

export default SongUpload