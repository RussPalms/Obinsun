import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { setCameraImage } from '../../../../app/state/slices/cameraSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useRouter } from 'next/router';

type Props = {};

const videoConstraints = {
  //   width: 250,
  //   height: 400,
  facingMode: 'user',
} as any;

export default function WebcamCapture({}: Props) {
  const webcamRef = useRef(null) as any;
  const dispatch = useDispatch() as any;
  const router = useRouter();
  // const {data: session, status} = useSession()

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    router.replace('/routes/protected/creator/preview');
  }, [webcamRef]);

  return (
    <>
      <div className="relative">
        <Webcam
          audio={false}
          // height={videoConstraints.height}
          // height="100%"
          height="720"
          ref={webcamRef}
          // screenshotFormat="image/jpeg"
          screenshotFormat="image/png"
          // width={videoConstraints.width}
          // width="100%"
          width="1080"
          videoConstraints={videoConstraints}
          mirrored={true}
          className="glass-container h-full w-full"
        />
        <RadioButtonUncheckedIcon
          className="absolute bottom-0 left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer text-black dark:text-[#4C8EFF]"
          onClick={capture}
          fontSize="large"
        />
      </div>
    </>
  );
}
