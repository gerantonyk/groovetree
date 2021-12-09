import placeholderImage from '../resources/placeholder.png';
import React, { useRef } from 'react';

const SongImage = (props) => {
    const ref = useRef();
    console.log("Render SongImage props image: ", props.songImageUrl);
    var image = props.songImageUrl ? props.songImageUrl : placeholderImage;
    async function onChange(e) {
        const file = e.target.files[0];
        props.setSongImageFile(file);
    }

    return (
        <div>
            <img src={image} className="song-image" alt="song" />
            {props.canUpload &&
                <input id='file' type="file" ref={ref} onChange={onChange} />
            }
        </div>
    )

}

export default SongImage;