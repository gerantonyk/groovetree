import './App.css';
import UploadPage from './components/UploadPage';
import SongViewPage from './components/SongViewPage';
import ViewAllSongs from './components/ViewAllSongs';
import getContracts from './scripts/getContracts';
import NavBar from './components/NavBar';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { addMusicNftContract, addMarketContract  } from './redux/actions'
// import config from "./config.json";

const App = (props) => {
  const [musicNftContract, setMusicNftSC] = useState(null);
  const [marketContract, setMarketSC] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addMusicNftContract(musicNftContract));
  }, [musicNftContract])
  useEffect(() => {
    dispatch(addMarketContract(marketContract));
  }, [marketContract])
  async function getSmartContracts() {
    const [musicNft, market] = await getContracts();
    setMusicNftSC(musicNft);
    setMarketSC(market);
    // dispatch(addContract(market));
    // dispatch(addContract(musicNft));
  }
  if (musicNftContract == null || marketContract == null) {
    getSmartContracts();
  }
  return (
    <Router>
      <main>
      <div className="App">
        <NavBar />
        <Routes>
            <Route path="/" element={<UploadPage songContract={ musicNftContract}/>} />
            <Route path="/song/:songId" element={<SongViewPage songContract={ musicNftContract}/>} />
            <Route path="/allsongs/" element={<ViewAllSongs />} songContract={ musicNftContract} mySongs={false}/>
            <Route path="/mysongs/" element={<ViewAllSongs />} mySongs={true}/>
        </Routes>
      </div>
    </main>
    </Router>
  );
}

export default App;
