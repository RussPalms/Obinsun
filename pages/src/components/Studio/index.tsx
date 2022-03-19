import React, { useState } from 'react';
import UploadSvg from '../Payments/UploadSvg';
import VerifyDocuments from '../Payments/VerifyDocuments';

type Props = {};

export const Studio = (props: Props) => {
  const [selectedSvg, setSelectedSvg] = useState(null);

  const handleSvg = (e: any) => {
    e.preventDefault();

    setSelectedSvg(e.target.files[0]);

    console.log(selectedSvg);
  };

  return (
    <>
      {/* <input
        type="file"
        accept=".svg"
        onChange={(e) => {
          handleSvg(e);
        }}
      /> */}
      <UploadSvg />
    </>
  );
};
