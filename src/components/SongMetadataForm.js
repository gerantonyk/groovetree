import React, { useState} from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
const SongMetadataForm = () => {
    const [fileUrl, updateFileUrl] = useState('');
    async function onChange(e) {
    console.log(e)
    const file = e.target.files[0];
    console.log('file:', file);
    setFile(file);
    // const reader = new FileReader();
  }
  async function handleClick() {
    if (!file) return;
    // console.log('handleClick');
    // const file = await client.get(fileUrl);
    // console.log(file);
    try {
      const added = await client.add(file);
      const url = `http://ipfs.infura.io/ipfs/${added.path}`
      console.log("uploaded to ipfs:" + url);
      // updateFileUrl(added[0].path);
      updateFileUrl(url);
      // setFile(null);
      resetInput();
    } catch (err) {
      console.error(err);
    }
  }
    return (
        <div className="meta-data-form">
            <h1>Create new Song Smart Contract</h1>
            <Button variant="contained" onClick={ handleClick}>Upload Song</Button>
       
            <input type="file" ref={ ref } onChange={onChange} />
            {fileUrl && <img src={fileUrl} alt = "Song Thumbnail"/>}
                <p>
                    IPFS Url: { fileUrl}
                </p>
            <TextField id="song title" label="Title" variant="standard" />
            <TextField id="song artist" label="Artist" variant="standard" />
        </div>
    );
}
export default SongMetadataForm;