import React, { useEffect, useRef, useState } from 'react';
import UploadSvg from '../Payments/UploadSvg';
import VerifyDocuments from '../Payments/VerifyDocuments';
import Logo from 'public/Grim2021.svg';

type Props = {};

export const Studio = (props: Props) => {
  const ref = useRef(null);

  const [selectedSvg, setSelectedSvg] = useState(null);

  const handleSvg = (e: any) => {
    e.preventDefault();

    setSelectedSvg(e.target.files[0]);

    // console.log(selectedSvg);
  };

  // console.log(ref.current.value)
  // useEffect(() => {
  //   console.log(ref.current.value);
  // }, [handleSvg]);

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept=".svg"
        onChange={(e) => {
          handleSvg(e);
        }}
      />
      <UploadSvg />
      {/* {selectedSvg} */}
    </>
  );
};
