import './App.css';
import UploadPage from './components/UploadPage';
import SongViewPage from './components/SongViewPage';
import ViewAllSongs from './components/ViewAllSongs';
import getSongSC from './scripts/getSongSC';
import { create } from 'ipfs-http-client';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
// import { store, useGlobalState } from 'state-pool';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { addContract } from './redux/actions'
// import { getNativeSelectUtilityClasses } from '@mui/material';


const client = create('https://ipfs.infura.io:5001/api/v0')
console.log("ipfsClient after initialized", client);
// store.setState("ipfsClient", client);
// store.setState("songIsSubmitted", false);
// store.setState("songContract", null);
const App = (props) => {
  const [ipfsClient] = useState("ipfsClient");
  // const [songContract, setSongSC] = useGlobalState("songContract");
  const [songContract, setSongSC] = useState(null);
  const dispatch = useDispatch()
  
  // useEffect(() => {
    
  // }, [songContract]);
  console.log("sc is", songContract);
  async function getSong() {
    const song = await getSongSC();
    dispatch(addContract({ text: song, id: song.address }))
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

// const mapDispatchToProps = dispatch => {
//     console.log("songContract in mapDispath", songContract);
//     return {
//         addContract: songContract => dispatch(addContract(songContract))
//     }
// }
// export default connect(mapDispatchToProps)(App);
// export default connect(mapStateToProps)(App);
export default App;
