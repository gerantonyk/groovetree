import logo from './logo.svg';
import './App.css';
import Upload from './Upload';
import { Button } from '@material-ui/core';
import { create } from 'ipfs-http-client';
import { useState, useRef} from 'react'
const client = create('https://ipfs.infura.io:5001/api/v0');

function App() {
  const [fileUrl, updateFileUrl] = useState('');
  const [file, setFile] = useState(null);
  const ref = useRef();
  const resetInput = () => {
    ref.current.value = "";
  };
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Upload />
        <Button variant="contained" onClick={ handleClick}>Upload Song</Button>
       
        <input type="file" ref={ ref } onChange={onChange} />
        {fileUrl && <img src={fileUrl} alt = "Song Thumbnail"/>}
        <p>
          IPFS Url: { fileUrl}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
