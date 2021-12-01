import React, { useState, useRef, useEffect } from 'react';
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

    useEffect(() => {
        if (mintingSong && props.songContract) {
            console.log("listening for emission on", props.songContract);
            listenForTokenCreation();
        }
    }, [mintingSong])
    async function listenForTokenCreation() {
        props.songContract.on('TokenCreated', (idx, owner, addr) => {
            console.log("TokenCreated event emitted");
            console.log(idx, "::", owner, "::", addr);
            setLastSongId(idx);
            setSongMinted(true);
            setMintingSong(false);
        });
    }
    useEffect(() => {
        if (props.songSubmitted) {
            console.log("use effect for songSubmitted")
            props.setSongSubmitted(false);
            setMintingSong(true);
            setSongMinted(false);
            console.log("Song has been submitted in SongUpload, minting song")
            mintSong();
        }
    }, [props.songSubmitted]);

    async function onChange(e) {
        const file = e.target.files[0];
        setFile(file);
    }
    async function mintSong() {
        // console.log("MINT SONG")
        try {
            const added = await ipfsclient.add(file);
            const url = `http://ipfs.infura.io/ipfs/${added.path}`
            console.log('added:', url);
            // updateFileUrl(url);
            const songtokenid = await createSongToken(props.songContract, url);
            // setMintingSong(true);
            setLastSongId(songtokenid.hash);
            console.log("songotkenis after createSongtoken", songtokenid)
            resetInput();

        } catch (err) {
            console.error(err);
        }
    }

    console.log("lastSongId, songMinted: " + lastSongId + " : " + songMinted);
    console.log(lastSongId == -1);
    var songComponent;
    console.log("mintingSong && lastSongId: " + mintingSong + ":" + lastSongId);
    if (mintingSong && lastSongId != -1) {
        console.log("mintingSong && lastSongId: " + mintingSong + ":" + lastSongId);
        songComponent = <div>
            <p>Minting song...</p>
        </div>
    } else if(songMinted && lastSongId == -1) {
        console.log("mintingSong && lastSongId: " + mintingSong + ":" + lastSongId);
        songComponent = <div>
            <p><Link to={`/song/${lastSongId}`}>{props.songTitle }</Link> has been minted!</p>
            {/* <p>Song ID: {lastSongId}</p> */}
        </div>
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
            { songComponent}
            {/* {songMinted && lastSongId > -1 &&
                <p>Song has been uploaded: <Link to={`/song/${lastSongId}`}>{props.songTitle }</Link></p>
            } */}
                <input type="file" ref={ref} onChange={onChange} />
        </Box>
    )
}

export default SongUpload