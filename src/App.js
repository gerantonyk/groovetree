import './App.css';
import UploadPage from './components/UploadPage';
import SongViewPage from './components/SongViewPage';
import ViewAllSongs from './components/ViewAllSongs';
import getSongSC from './scripts/getSongSC';
import { create } from 'ipfs-http-client';
import { store, useGlobalState } from 'state-pool';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
const client = create('https://ipfs.infura.io:5001/api/v0')
console.log("ipfsClient after initialized", client);
store.setState("ipfsClient", client);
store.setState("songIsSubmitted", false);
store.setState("songContract", null);
function App() {
  const [ipfsClient] = useGlobalState("ipfsClient");
  const [songContract, setSongSC] = useGlobalState("songContract");
  console.log("sc is", songContract);
  async function getSong() {
    const song = await getSongSC();
    setSongSC(song);
    console.log("song SC ISSS:", song);
  }
  if (songContract == null) {
    console.log("sc is null");
    getSong();
  }
  console.log("ipfsClient in App functions", ipfsClient);
  return (
    <Router>
      <main>  
      <div className="App">
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/song/:songId" element={<SongViewPage />} />
          <Route path="/allsongs/" element={<ViewAllSongs />} />
        </Routes>
      </div>
    </main>
    </Router>
  );
}

export default App;
