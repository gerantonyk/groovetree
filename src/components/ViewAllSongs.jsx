import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import getSongs from '../scripts/getSongs';
import {useSelector} from 'react-redux'

const ViewAllSongs = (props) => {
    const [tokens, setTokens] = useState(null);
    const songContract = useSelector((state) => state.songContract)

    async function getTokens() {
        if (songContract != null) {
            let tokens = await getSongs(songContract, props.mySongs);
            setTokens(tokens);
        }
    }
    if (tokens == null) {
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