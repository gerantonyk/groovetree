import placeholderImage from '../resources/placeholder.png';
import React, { useState, useEffect, useRef } from 'react';

const SongImage = (props) => {
    console.log("Rendering SongImage.jsx");
    const [image, setImage] = useState(placeholderImage);
    const ref = useRef();
    useEffect(() => {
        if (props.songImage) {
            setImage(props.image);
        }
    }, []);
    async function onChange(e) {
        const file = e.target.files[0];
        const uploadedImageUrl = URL.createObjectURL(file);
        setImage(uploadedImageUrl)
        props.setSongImage(file);
    }

    return (
        <div>
            <img src={props.songImage} className="song-image" alt="song image" />
            {props.canUpload &&
                <input id='file' type="file" ref={ref} onChange={onChange} />
            }
        </div>
    )
    
}
 
export default SongImage;