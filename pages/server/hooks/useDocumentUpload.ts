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
  submitDocumentFile: File,
  verificationDocument: string
) =>
  //   designData: any,
  //   designName: string,
  //   designDescription: string,

  // cameraImage: any
  {
    //   console.log({ firestoreUpload: file });

    const { data: session } = useSession();
    //   const userImage = 'designs/';
    const userDocument = `users/${session.id}/documents/`;

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState('');

    useEffect(() => {
      console.log(submitDocumentFile);
      // console.log(documentFile);
      // let transformedName = designName.replace(' ', '_').toLocaleLowerCase();
      const documentFileEdit = submitDocumentFile.name
        ?.replace(' ', '_')
        .toLowerCase();

      // let documentFileEdit = submitDocumentFile.name;
      // .replace(' ', '_')
      // .toLowerCase();

      const metadata = {
        customMetadata: {
          documentName: 'verification_document',
          // description: designDescription,
          documentDescription: 'neccessary document for payouts',
        },
      };

      // const changedFileName = file.name.replace(' ', '_');

      // console.log({ svgFile: { file } });
      const storageRef = ref(
        projectStorage,
        // `${userDocument}${metadata.customMetadata.documentName}.png`
        `${userDocument}${documentFileEdit}`
      );

      const uploadTask = uploadBytesResumable(
        storageRef,
        submitDocumentFile,
        metadata
      );

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
            documentUrl: url,
            documentCreationDate: createdAt,
            documentName: metadata.customMetadata.documentName,
            documentDescription: metadata.customMetadata.documentDescription,
            // base64Document: verificationDocument,
            cameraImage: verificationDocument,
            stripeId: session.user.stripeId,
            username: session.id,
            // documentAction: 'bank-account-ownership',
            documentAction: 'business-tax-id',
          };

          const addDocument = {
            method: 'POST',
            body: JSON.stringify(documentAddition),
            headers: {
              // 'Content-Type': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          };

          // const uploadDocument = async () => {
          //   return await fetch(`/api/documents/`, addDocument)
          //     .then((res) => res.json())
          //     .then((data) => console.log(data));
          // };

          // await uploadDocument();

          await fetch('/api/documents', addDocument).then((res) =>
            console.log(res)
          );

          setUrl(url);
        }
      );
    }, [submitDocumentFile]);

    return { progress, url, error };
  };

export default useDocumentUpload;
