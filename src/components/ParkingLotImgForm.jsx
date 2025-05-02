import { useEffect, useState } from "react";
// import ParkingLotImg from "../assets/img/cinema-img.png";
import { GetParkingImage, SaveParkingImage } from "../api/storage";
import { useAuth } from "./contexts/Auth/hooks";
import { FaPen } from "react-icons/fa";

function ParkingLotImgForm() {
    const [imageUpload, setImageUpload] = useState(null);
    const [lotImg, setLotImg] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        GetParkingImage(currentUser.uid)
            .then(setLotImg)
            .finally(() => {
                setEditMode(false);
                setLoading(false);
            });
    }, []);

    const uploadHandler = () => {
        if (imageUpload == null) return;

        setUploading(true);

        SaveParkingImage(currentUser.uid, imageUpload)
            .then(setLotImg)
            .finally(() => {
                setEditMode(false);
                setLoading(false);
                setUploading(false);
            });
    };

    return (
        <div className="parking-lot-img-cont">
            {lotImg && (
                <div className="img-cont">
                    <button
                        className="edit-btn"
                        onClick={() => setEditMode((state) => !state)}
                    >
                        <FaPen />
                    </button>
                    {!editMode && <img src={lotImg} alt="" />}
                </div>
            )}
            {((!lotImg && !loading) || editMode) && (
                <div className="upload-cont">
                    <input
                        type="file"
                        name="parking-lot"
                        onChange={(e) => setImageUpload(e.target.files[0])}
                    />
                    <button
                        disabled={uploading}
                        onClick={uploadHandler}
                        className="upload-btn"
                    >
                        Upload
                    </button>
                </div>
            )}
        </div>
    );
}

export default ParkingLotImgForm;
