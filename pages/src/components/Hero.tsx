import React from "react";
import DesignFeature from "./DesignFeature";

type Props = {};

export default function Hero({}: Props) {
  return (
    <>
      <div className="relative">
        <DesignFeature />
        {/* <div className="relaive top-[50%] left-[50%] z-10">
          <h1 className="">Obinsun</h1>
        </div> */}
      </div>
    </>
  );
}
