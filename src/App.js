import './App.css';
import UploadPage from './components/UploadPage';
import SongViewPage from './components/SongViewPage';
// import SongListPage from './components/SongListPage';
import { create } from 'ipfs-http-client';
import { store, useGlobalState } from 'state-pool';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"

// const client = create('https://ipfs.infura.io:5001/api/v0');
const client = create('https://ipfs.infura.io:5001/api/v0')

console.log("ipfsClient after initialized", client);
store.setState("ipfsClient", client);
store.setState("SSAddress", "0xdD760789a7d26994867850041F98AEeE15E6f14a");
store.setState("songIsSubmitted", false);
function App() {
  const [ipfsClient, setIpfsClient] = useGlobalState("ipfsClient");
  console.log("ipfsClient in App functions", ipfsClient);
  // const song = getSongSC();
  return (
    <Router>
      <main>  
      <div className="App">
        <Routes>
          {/* <Route path="/" component={UploadPage} /> */}
          <Route path="/" element={<UploadPage />} />
          <Route path="/song/:songId" element={<SongViewPage />} />
          {/* <Route path="/allsongs/" element={<SongListPage />} /> */}

        </Routes>
      </div>
    </main>
    </Router>
  );
}

export default App;
