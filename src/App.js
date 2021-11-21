import './App.css';
// import Upload from './Upload';
import SongMetadataForm from './components/SongMetadataForm';
import SongImage from './components/SongImage';
import SongUpload from './components/SongUpload';
import { create } from 'ipfs-http-client';
import { store, useGlobalState } from 'state-pool';

// const client = create('https://ipfs.infura.io:5001/api/v0');
const client = create('https://ipfs.infura.io:5001/api/v0')

console.log("ipfsClient after initialized", client);
store.setState("ipfsClient", client);
store.setState("SSAddress", "0x524beAc334589474B24247E0deABFfB9b16469F6");
store.setState("songIsSubmitted", false);
function App() {
  const [ipfsClient, setIpfsClient] = useGlobalState("ipfsClient");
  console.log("ipfsClient in App functions", ipfsClient);
  return (
    <div className="App">
      <header className="App-header">
        <h2>Create new BlockSong Token!</h2>
        <SongUpload/>
        <div className="song-upload">
          <SongImage/>
          <SongMetadataForm/>
        </div>
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
