//@ts-nocheck

import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { setCameraImage } from "../../../../app/state/slices/cameraSlice";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useRouter } from "next/router";

type Props = {};

const videoConstraints = {
  //   width: 250,
  //   height: 400,
  facingMode: "user",
};

export default function WebcamCapture({}: Props) {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    router.replace("/routes/protected/creator/preview");
  }, [webcamRef]);

  return (
    <>
      <div className="relative">
        <Webcam
          audio={false}
          height={videoConstraints.height}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
          mirrored={true}
        />
        <RadioButtonUncheckedIcon
          className="absolute bottom-0 left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer text-white"
          onClick={capture}
          fontSize="large"
        />
      </div>
    </>
  );
}
