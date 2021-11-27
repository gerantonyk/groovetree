import React, { useState } from 'react';
import { Link } from "react-router-dom";
import getSongs from '../scripts/getSongs';
import {useSelector} from 'react-redux'

const ViewAllSongs = () => {
    const [tokens, setTokens] = useState(null);
    const songContract = useSelector((state) => state.songContract)

    async function getTokens() {
        if (songContract != null) {
            let tokens = await getSongs(songContract);
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
                {tokens.map(({ title, owner }, index) => (
                    <p key={index}>{index }. <Link to={`/song/${index}`}>{title }</Link></p>
                ))}
            </div>
        );
    }
}

export default ViewAllSongs;