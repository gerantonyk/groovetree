import './App.css';
import UploadPage from './components/UploadPage';
import SongViewPage from './components/SongViewPage';
import ViewAllSongs from './components/ViewAllSongs';
import getSongSC from './scripts/getSongSC';
import { create } from 'ipfs-http-client';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { addContract } from './redux/actions'
// import config from "./config.json";


// const client = create('https://ipfs.infura.io:5001/api/v0')

const App = (props) => {
  // const [ipfsClient] = useState("ipfsClient");
  const [songContract, setSongSC] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addContract(songContract));
  }, [songContract])
  async function getSong() {
    const song = await getSongSC();
    setSongSC(song);
    // dispatch(addContract(song));
  }
  if (songContract == null) {
    getSong();
  }
  return (
    <Router>
      <main>  
      <div className="App">
        <Routes>
            <Route path="/" element={<UploadPage songContract={ songContract}/>} />
            <Route path="/song/:songId" element={<SongViewPage songContract={ songContract}/>} />
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
