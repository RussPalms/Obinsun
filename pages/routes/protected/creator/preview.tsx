import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import {
  resetCameraImage,
  selectCameraImage,
} from '../../../app/state/slices/cameraSlice';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  db,
  projectStorage,
  timestamp,
} from '../../../server/lib/database/firebaseStorage';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

type Props = {};

const Preview = () => {
  const id = uuid();

  const { data: session } = useSession();
  //   const [progress, setProgress] = useState(0);

  const cameraImage = useSelector(selectCameraImage);
  const router = useRouter();
  const dispatch = useDispatch();

  //   const imageFile =

  useEffect(() => {
    if (!cameraImage) {
      router.replace('/routes/protected/creator/webcam-capture');
    }
  }, [cameraImage, router]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const capturedImage = `users/${session?.id}/documents/`;

    const imageRef = ref(projectStorage, `${capturedImage}${id}.jpeg`);

    const capturedImageRef = collection(db, capturedImage);

    uploadString(imageRef, cameraImage, 'data_url').then((snapshot) => {
      const getUrl = async () => {
        const imageUrl = await getDownloadURL(snapshot.ref);
        const createdAt = timestamp;

        await addDoc(capturedImageRef, {
          imageUrl,
          read: false,
          createdAt,
        });
      };

      getUrl();
      router.replace('/routes/protected/creator/documents');
    });
  };
  return (
    <>
      <div className="relative">
        <CloseIcon
          onClick={closePreview}
          className="absolute top-0 margin-[5px] cursor-pointer bg-white"
        />
        <img src={cameraImage} alt="" />
        <div
          onClick={sendPost}
          className="absolute bottom-0 right-[-25px] transform translate-x-[-50%] translate-y-[-50%] bg-yellow-50 text-black flex space-evenly items-center border-[30px] p-[7px] cursor-pointer"
        >
          <h2>Save</h2>
          <SendIcon fontSize="small" className="text-large" />
        </div>
      </div>
    </>
  );
};

export default Preview;
