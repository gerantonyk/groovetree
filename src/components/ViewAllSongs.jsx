import React, { useState } from 'react';
import { Link } from "react-router-dom";
import getSongs from '../scripts/getSongs';
import { connect } from 'react-redux'
import {useSelector} from 'react-redux'

const ViewAllSongs = () => {
    const [tokens, setTokens] = useState(null);
    const songContract = useSelector((state) => state.songContract)
    async function getTokens() {
        let tokens = await getSongs();
        console.log("tokens in ViewAll after call", tokens);
        setTokens(tokens);
    }
    if (tokens == null) {
        getTokens(songContract);
        return (<div>Loading...</div>)
    } else {
        return (
            <div>
                <h1>All Songs</h1>
                {tokens.map(({ title, owner }, index) => (
                    // <Link to={`/song/${index}`}>{title }</Link>
                    <p key={index}>{index }. <Link to={`/song/${index}`}>{title }</Link></p>
                    // <p key={index}>hghgjf : {title}</p>
                    // <p key={index}>{index} : {title } : {owner}</p>
                ))}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        songContract: state.contract
    }
}
export default connect(mapStateToProps)(ViewAllSongs);
// export default ViewAllSongs;