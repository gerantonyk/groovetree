import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import getSongs from '../scripts/getSongs';
import {useSelector} from 'react-redux'

const ViewAllSongs = (props) => {
    const [tokens, setTokens] = useState(null);
    const musicNftContract = useSelector((state) => state.musicNftContract)
    console.log("Rendering ViewAllSongs w musicNftContract:", musicNftContract)
    async function getTokens() {
        let tokens = await getSongs(musicNftContract, props.mySongs, props.account);
        setTokens(tokens);
    }
    if (musicNftContract == null) {
        return (
            <Box>
                <h1>Please connect your wallet using button on top right corner</h1>
            </Box>
        )
    } else if (tokens == null) {
        getTokens();
        return (<div>Loading...</div>)
    } else {
        return (
            <div>
                <h1>All Songs</h1>
                {tokens.map(({ title, artist, image }, index) => (
                    <Box sx={{
                        flexDirection: 'row',
                        display: 'flex',
                    }} className="song-list-row">
                        <img src={image} alt=""/>
                        <p key={index}>
                            <Link to={`/song/${index}`}>{title}</Link>
                            by {artist}
                        </p>
                    </Box>
                ))}
            </div>
        );
    }
}

export default ViewAllSongs;