import logo from './logo.svg';
import './App.css';
// import Upload from './Upload';
import SongMetadataForm from './components/SongMetadataForm';
import { create } from 'ipfs-http-client';
import { useState, useRef} from 'react'
const client = create('https://ipfs.infura.io:5001/api/v0');

function App() {
  
  const [file, setFile] = useState(null);
  const ref = useRef();
  const resetInput = () => {
    ref.current.value = "";
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Upload /> */}
        <SongMetadataForm/>
  
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
