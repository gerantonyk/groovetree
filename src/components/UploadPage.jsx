import SongUpload from './SongUpload';
import SongImage from './SongImage';
import SongMetadataForm from './SongMetadataForm';

const UploadPage = () => {
    return (
        <div className="upload-page">
            <SongUpload/>
            <div className="song-upload">
                <SongImage/>
                <SongMetadataForm/>
            </div>
        </div>
    )
}

export default UploadPage;