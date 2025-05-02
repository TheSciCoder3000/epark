import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const SaveParkingImage = async (ownerId, img) => {
    return uploadBytes(ref(storage, `images/${ownerId}/lot`), img).then(
        (snapshot) => getDownloadURL(snapshot.ref)
    );
};

export const GetParkingImage = async (ownerId) => {
    return getDownloadURL(ref(storage, `images/${ownerId}/lot`));
};
