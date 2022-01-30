import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState, useEffect } from "react";
// import { db } from "../lib/database/firebaseStorage";
import {
  // app,
  db,
  projectStorage,
  timestamp,
} from "../lib/database/firebaseStorage";

// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

// const projectStorage = getStorage(app);
// const db = getFirestore(app);

const useStorage = (file: any) => {
  console.log(file);

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    // references
    // const storageRef = projectStorage.ref(file.name);
    const storageRef = ref(projectStorage, file.name);
    // const collectionRef = db.collection("images");
    const collectionRef = collection(db, "images");

    const uploadTask = uploadBytesResumable(storageRef, file);

    // storageRef.put(file).on(
    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err as any);
      },
      async () => {
        // const url = await storageRef.getDownloadURL();
        // const url = await getDownloadURL(uploadTask.snapshot.ref).then(

        const url = await getDownloadURL(uploadTask.snapshot.ref);

        // await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   setUrl(downloadURL);
        //   console.log(url);

        //   console.log("File available at", downloadURL);

        //   // const createdAt = timestamp;

        //   // addDoc(collectionRef, {
        //   //   downloadURL,
        //   //   createdAt,
        //   // });
        //   console.log("this is the download url", downloadURL);
        //   console.log("this is the download url", url);

        //   // await setDoc(collectionRef, { url, createdAt });
        //   // setUrl(url as any);

        //   // async () => {
        //   //   await setUrl(downloadURL as any);
        //   //   console.log(url);
        //   // };

        //   // setUrl(downloadURL as any);

        //   // console.log(url);
        //   // console.log(url);
        // });
        const createdAt = timestamp;

        await addDoc(collectionRef, {
          url,
          createdAt,
        });

        // const createdAt = timestamp();
        // const createdAt = timestamp;
        // const createdAt = serverTimestamp();
        // console.log(createdAt);
        // await collectionRef.add({ url, createdAt });

        // await addDoc(collectionRef, {
        //   url,
        //   // , createdAt
        // });

        // console.log(url);
        // // await setDoc(collectionRef, { url, createdAt });
        // // setUrl(url as any);
        setUrl(url);

        console.log("this is the image url", url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
