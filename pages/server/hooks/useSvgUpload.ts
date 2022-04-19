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
import axios from 'axios';
import loadSvgFile from 'load-svg-file';
import { v4 as uuidv4 } from 'uuid';

const useSvgUpload = (
  file: any,
  designData: any,
  designName: string,
  designDescription: string
) => {
  console.log({ firestoreUpload: file });

  const { data: session } = useSession();
  // const userImage = `users/${session?.id}/images/`;
  const userImage = 'designs/';

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');

  // const optimizedSvg = async (file: any) => {
  //   console.log(file);

  //   await axios
  //     // .post(`${process.env.NEXTAUTH_URL}/api/optimize-svg`, {
  //     .post('api/optimize-svg', {
  //       // filePath: loadSvgFile(file.webkitRelativePath),
  //       filePath: file,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // };

  // optimizedSvg(file);

  useEffect(() => {
    // let name = 'coolest cat';
    // let transformedName = designData.name.replace(' ', '_').toLocaleLowerCase();
    let transformedName = designName.replace(' ', '_').toLocaleLowerCase();

    const metadata = {
      // contentType: 'image/svg+xml',
      customMetadata: {
        name: transformedName,
        description: designDescription,
      },
    };

    const changedFileName = file.name.replace(' ', '_');

    console.log({ svgFile: { file } });
    const storageRef = ref(projectStorage, `${userImage}${changedFileName}`);
    // const collectionRef = collection(db, userImage);
    const documentRef = doc(db, 'designs', metadata.customMetadata.name);

    // let serializedSVG = new XMLSerializer().serializeToString(file)

    // var base64Data = window.btoa(serializedSVG);

    // const base64File = file.toString('base64')

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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

        const data = {
          url,
          createdAt,
          name: metadata.customMetadata.name,
          description: metadata.customMetadata.description,
        };

        // await addDoc(collectionRef, {
        //   // url,
        //   // createdAt,
        //   data,
        // });

        // await setDoc(documentRef, data);

        const createUuid = uuidv4();

        const obinsunUuid = `0b!n$un_${createUuid}`;

        const designAddition = {
          id: obinsunUuid,
          // file: url,
          url,
          createdAt,
          name: metadata.customMetadata.name,
          description: metadata.customMetadata.description,
        };

        const addDesign = {
          method: 'POST',
          body: JSON.stringify(designAddition),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const getDesigns = async () => {
          return await fetch(
            // `${process.env.NEXTAUTH_URL}/api/design/${designAddition.name}`,
            `/api/design/${designAddition.name}`,
            addDesign
          )
            .then((res) => res.json())
            .then((data) => console.log(data));
        };

        await getDesigns();

        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useSvgUpload;
