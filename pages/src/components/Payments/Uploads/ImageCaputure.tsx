import React from "react";
import WebcamCapture from "./WebcamCapture";

type Props = {};

export default function ImageCaputure({}: Props) {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <WebcamCapture />
      </div>
    </>
  );
}
