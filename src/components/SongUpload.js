import { useState, useRef , useEffect} from 'react';
import { store, useGlobalState } from 'state-pool';
store.setState("ipfsAudiofileUrl", "");
const SongUpload = () => {

    const [ipfsClient] = useGlobalState('ipfsClient');
    
    console.log("ipfsClient from state:", ipfsClient)
    const [songIsSubmitted, setSongIsSubmitted] = useGlobalState("songIsSubmitted"); 

    const [file, setFile] = useState(null);
    const [fileUrl, updateFileUrl] = useGlobalState('ipfsAudiofileUrl');
    const ref = useRef();
    const resetInput = () => {
        ref.current.value = "";
    };
    
    async function onChange(e) {
        console.log(e)
        const file = e.target.files[0];
        console.log('file:', file);
        setFile(file);
    }
    async function addToIpfs() {
        try {
            const added = await ipfsClient.add(file);
            const url = `http://ipfs.infura.io/ipfs/${added.path}`
            console.log("uploaded to ipfs in SongUpload:" + url);
            updateFileUrl(url);
            resetInput();
        } catch (err) {
            console.error(err);
        }
    }
    // useEffect(() => {
    if (songIsSubmitted) {
        console.log("songIsSubmitted is true in SongUpload");
        addToIpfs();
        console.log("ADDED TO IPFS");
        setSongIsSubmitted(false);
        console.log("SONGISSUBMITTED ==== False");
        }
    // }, []);
    return (

        <input type="file" ref={ref} onChange={onChange} />
    )
}

export default SongUpload