import './App.css';
import UploadPage from './components/UploadPage';
import SongViewPage from './components/SongViewPage';
import ViewAllSongs from './components/ViewAllSongs';
import getSongSC from './scripts/getSongSC';
import NavBar from './components/NavBar';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { addContract } from './redux/actions'
// import config from "./config.json";

const App = (props) => {
  const [songContract, setSongSC] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addContract(songContract));
  }, [songContract])
  async function getSong() {
    const song = await getSongSC();
    setSongSC(song);
    dispatch(addContract(song));
  }
  if (songContract == null) {
    getSong();
  }
  return (
    <Router>
      <main>
      <div className="App">
        <NavBar />
        <Routes>
            <Route path="/" element={<UploadPage songContract={ songContract}/>} />
            <Route path="/song/:songId" element={<SongViewPage songContract={ songContract}/>} />
            <Route path="/allsongs/" element={<ViewAllSongs />} songContract={ songContract} mySongs={false}/>
            <Route path="/mysongs/" element={<ViewAllSongs />} mySongs={true}/>
        </Routes>
      </div>
    </main>
    </Router>
  );
}

export default App;
