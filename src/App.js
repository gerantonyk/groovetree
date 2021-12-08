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
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import config from "./config.json";

const providerOptions = {
  portis: {
    package: Portis,
    options: {
      id: 'dbf44f2c-5acb-4780-80fa-47a4a8748059'
    }
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "acce2138e92f4608aaa7f0358e40b292" //Got this from Dan so we would need to switch this later
    }
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions // required
});

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
          <NavBar web3Modal={<Web3 />} />

          <Routes>
            <Route path="/" element={<UploadPage songContract={songContract} />} />
            <Route path="/song/:songId" element={<SongViewPage songContract={songContract} />} />
            <Route path="/allsongs/" element={<ViewAllSongs />} songContract={songContract} mySongs={false} />
            <Route path="/mysongs/" element={<ViewAllSongs />} mySongs={true} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

function Web3() {
  const [account, setAccount] = useState({ connected: false });

  async function connect() {
    const web3ModalProvider = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3ModalProvider);

    async function setAccountFromProvider() {
      const signer = await provider.getSigner(0);
      const address = await signer.getAddress();
      const balance = await signer.getBalance();

      setAccount({
        connected: true,
        provider,
        address,
        signer,
        balance: ethers.utils.formatEther(balance),
        isVerified: false
      });
    }

    setAccountFromProvider();

    web3ModalProvider.on("accountsChanged", () => {
      setAccountFromProvider();
    });
  }

  async function signMessage() {
    const message = "Please Login to our website!";
    const signedMessage = await account.signer.signMessage(message);
    const walletPublicKey = await ethers.utils.verifyMessage(message, signedMessage);
    if (walletPublicKey === account.address) {
      setAccount({
        ...account,
        isVerified: true
      });
    }
  }

  if (!account.connected) {
    return (
      <button className="button" onClick={connect}>
        Connect Wallet
      </button>
    )
  }
  else {
    return (
      <div className="account">
        <div>
          {"Connected Address: " + account.address}
        </div>
        <div>
          {"Account Balance: " + account.balance}
        </div>
        {account.isVerified
          ? "Verified!"
          : <button className="button" onClick={signMessage}>Verify Account</button>
        }
      </div>
    )
  }

}

export default App;
