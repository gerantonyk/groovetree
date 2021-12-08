import './App.css';
import UploadPage from './components/UploadPage';
import SongViewPage from './components/SongViewPage';
import ViewAllSongs from './components/ViewAllSongs';
import getContracts from './scripts/getContracts';
import Web3 from './components/Web3';
import NavBar from './components/NavBar';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { addMusicNftContract, addMarketContract  } from './redux/actions'
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
  const [musicNftContract, setMusicNftSC] = useState(null);
  const [marketContract, setMarketSC] = useState(null);
  const [account, setAccount] = useState({ connected: false });
  const [tokens, setTokens] = useState(null);
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(addMusicNftContract(musicNftContract));
  }, [musicNftContract, dispatch])
  useEffect(() => {
    dispatch(addMarketContract(marketContract));
  }, [marketContract, dispatch])
  
  async function getSmartContracts() {
    if(!account.provider) {
      console.log("Must connect your wallet BEFORE getting smart contract"); 
      return;
    }
    const [musicNft, market] = await getContracts(account.provider);
    setMusicNftSC(musicNft);
    setMarketSC(market);
    // dispatch(addContract(market));
    // dispatch(addContract(musicNft));
  }
  
  if (musicNftContract == null || marketContract == null) {
    getSmartContracts();
  }

  /******Functions that connect use to wallet *******/
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

  return (
    <Router>
      <main>
        <div className="App">
          <NavBar web3Modal={<Web3 account={account} connect={connect} signMessage={signMessage}/>} />

          <Routes>
            <Route path="/" element={<UploadPage songContract={musicNftContract}/>} />
            <Route path="/song/:songId" element={<SongViewPage musicNftContract={musicNftContract} marketContract={marketContract}/>} />
            <Route
              path="/allsongs/"
              element={
                <ViewAllSongs
                  mySongs={false}
                  account={account}
                  setTokens={setTokens}
                  tokens={tokens}
                  songContract={musicNftContract}
                />}
            />
            <Route path="/mysongs/" element={<ViewAllSongs mySongs={true} account={account}/>}  />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
