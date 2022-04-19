import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { db, projectStorage, timestamp } from '../lib/database/firebaseStorage';
import { v4 as uuidv4 } from 'uuid';

const useDocumentUpload = (
  //   file: any,
  //   designData: any,
  //   designName: string,
  //   designDescription: string,

  cameraImage: any
) => {
  //   console.log({ firestoreUpload: file });

  const { data: session } = useSession();
  //   const userImage = 'designs/';
  const userDocument = `users/${session.id}/`;

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    // let transformedName = designName.replace(' ', '_').toLocaleLowerCase();

    const metadata = {
      customMetadata: {
        documentName: 'verification_document',
        // description: designDescription,
      },
    };

    // const changedFileName = file.name.replace(' ', '_');

    // console.log({ svgFile: { file } });
    const storageRef = ref(
      projectStorage,
      `${userDocument}${metadata.customMetadata.documentName}.png`
    );

    const uploadTask = uploadBytesResumable(storageRef, cameraImage, metadata);

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

        // const data = {
        //   url,
        //   createdAt,
        //   documentName: metadata.customMetadata.documentName,
        // //   description: metadata.customMetadata.description,
        // };

        const createUuid = uuidv4();

        const obinsunUuid = `0b!n$un_${createUuid}`;

        const documentAddition = {
          id: obinsunUuid,
          url,
          createdAt,
          name: metadata.customMetadata.documentName,
          //   description: metadata.customMetadata.description,
        };

        // const addDocument = {
        //   method: 'POST',
        //   body: JSON.stringify(documentAddition),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // };

        // const getDesigns = async () => {
        //   return await fetch(
        //     `/api/document/${documentAddition.name}`,
        //     addDocument
        //   )
        //     .then((res) => res.json())
        //     .then((data) => console.log(data));
        // };

        // await getDesigns();

        setUrl(url);
      }
    );
  }, [cameraImage]);

  return { progress, url, error };
};

export default useDocumentUpload;
