import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCameraImage } from '../../../app/state/slices/cameraSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Content from 'pages/Production/Layout/Content';
import { getSession } from 'next-auth/react';
import { selectSelectedImage } from 'pages/app/state/slices/snapSlice';

type Props = {};

const DocumentView = () => {
  const selectedImage = useSelector(selectSelectedImage);
  // const history = useHistory();
  const router = useRouter();

  // console.log(selectedImage);

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    router.replace('/routes/protected/creator/documents');
  };

  return (
    <Content title="" description="">
      <div className="relative">
        <img
          src={selectedImage}
          onClick={exit}
          alt=""
          className="glass-container h-full w-full"
        />
        <div className="absolute top-0 right-0 m-[1rem]">
          <CountdownCircleTimer
            isPlaying
            duration={10}
            strokeWidth={6}
            size={50}
            colors={
              [
                ['#004777', 0.33],
                ['#F7B801', 0.33],
                ['#A30000', 0.33],
              ] as any
            }
          >
            {({ remainingTime }) => {
              if (remainingTime === 0) {
                exit();
              }

              return remainingTime;
            }}
          </CountdownCircleTimer>
        </div>
      </div>
    </Content>
  );
};

export default DocumentView;

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
