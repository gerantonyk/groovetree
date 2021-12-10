import React from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import getSongs from '../scripts/getSongs';
import {useSelector} from 'react-redux'
/**
 * 
 * @param {mySongs={true} account={account} songContract={musicNftContract} marketContract={marketContract}} props 
 * @returns 
 */
const ViewAllSongs = (props) => {

    console.log("Rendering ViewAllSongs w musicNftContract:", props.musicNftContract); 
    async function getTokens() {
        let tokens = await getSongs(props.musicNftContract, props.marketContract, props.mySongs, props.account);
        props.setTokens(tokens);
    }
    if (!props.account.address) {
        return (
            <Box>
                <h1>Please connect your wallet using button on top right corner</h1>
            </Box>
        )
    } else if (!props.tokens) {
        if (props.musicNftContract && props.marketContract) {
            getTokens();
        }
        return (<div>Loading...</div>)
    } else {
        return (
            <div>
                {props.mySongs ? <h1>My Songs</h1>: <h1>All Songs</h1>}
                {props.tokens
                .filter(token => {
                    if(props.mySongs) {
                        return token.owner === props.account.address
                    } 
                    return true;
                })
                .map(({ title, artist, image, version }, index) => (
                    <Box sx={{
                        flexDirection: 'row',
                        display: 'flex',
                    }} className="song-list-row">
                        <img src={image} alt=""/>
                        <p key={index}>
                            <Link to={`/song/${index+1}`}>{title}</Link>
                            by {artist} (v{version})
                        </p>
                    </Box>
                ))}
            </div>
        );
    }
}

export default ViewAllSongs;