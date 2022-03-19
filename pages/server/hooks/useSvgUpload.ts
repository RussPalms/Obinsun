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

const useSvgUpload = (file: any) => {
  const { data: session } = useSession();
  const userImage = `users/${session?.id}/images/`;

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');

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
