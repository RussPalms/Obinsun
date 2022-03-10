import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCameraImage } from '../../../app/state/slices/cameraSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

type Props = {};

const DocumentView = () => {
  const selectedImage = useSelector(selectCameraImage);
  // const history = useHistory();
  const router = useRouter();

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    router.replace('/routes/protected/creator/documents');
  };

  return (
    <div className="relative">
      <img src={selectedImage} onClick={exit} alt="" />
      <div className="absolute top-0 right-0 m-[10px]">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
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
  );
};

export default DocumentView;
