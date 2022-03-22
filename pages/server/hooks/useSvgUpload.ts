import { addDoc, collection } from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { db, projectStorage, timestamp } from '../lib/database/firebaseStorage';
import axios from 'axios';
import loadSvgFile from 'load-svg-file';

const useSvgUpload = (file: any) => {
  const { data: session } = useSession();
  const userImage = `users/${session?.id}/images/`;

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');

  const optimizedSvg = async (file: any) => {
    console.log(file);

    await axios
      // .post(`${process.env.NEXTAUTH_URL}/api/optimize-svg`, {
      .post('api/optimize-svg', {
        // filePath: loadSvgFile(file.webkitRelativePath),
        filePath: file,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  optimizedSvg(file);

  useEffect(() => {
    const storageRef = ref(projectStorage, `${userImage}${file.name}`);
    const collectionRef = collection(db, userImage);

    // let serializedSVG = new XMLSerializer().serializeToString(file)

    // var base64Data = window.btoa(serializedSVG);

    // const base64File = file.toString('base64')

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err as any);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = timestamp;

        await addDoc(collectionRef, {
          url,
          createdAt,
        });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useSvgUpload;
