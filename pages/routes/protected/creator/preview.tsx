import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import {
  resetCameraImage,
  selectCameraImage,
} from '../../../app/state/slices/cameraSlice';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
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
import Content from 'pages/Production/Layout/Content';

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
    const capturedImage = `users/${session.id}/documents/`;

    // const imageRef = ref(projectStorage, `${capturedImage}${id}.jpeg`);
    const imageRef = ref(projectStorage, `${capturedImage}${id}.png`);

    const capturedImageRef = collection(db, capturedImage);

    uploadString(imageRef, cameraImage, 'data_url').then((snapshot) => {
      const getUrl = async () => {
        const imageUrl = await getDownloadURL(snapshot.ref);
        const createdAt = timestamp;

        await addDoc(capturedImageRef, {
          imageUrl,
          read: false,
          createdAt,
          username: session.user.username,
        });
      };

      getUrl();
      // router.replace('/routes/protected/creator/documents');
      router.replace('/routes/protected/creator/documents');
    });
  };
  return (
    <Content title="" description="">
      <div className="relative">
        <CloseIcon
          onClick={closePreview}
          className="absolute top-0 left-0 margin-[5px] cursor-pointer z-50 glass-container"
        />
        <img
          src={cameraImage}
          alt=""
          className="glass-container h-full w-full"
        />
        <div
          onClick={sendPost}
          className="absolute bottom-0 right-0 glass-container flex justify-center items-center border-[1rem] p-[1rem] cursor-pointer"
        >
          <h2>Save</h2>
          <SendIcon fontSize="small" className="text-large" />
        </div>
      </div>
    </Content>
  );
};

export default Preview;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
