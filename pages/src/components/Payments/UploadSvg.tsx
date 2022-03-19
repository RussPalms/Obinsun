import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ImageGrid from './Uploads/ImageGrid';
import Modal from './Uploads/Modal';
import SelectSvg from './Uploads/SelectSvg';
import SvgGrid from './Uploads/SvgGrid';
import Title from './Uploads/Title';
import UploadForm from './Uploads/UploadForm';

type Props = {};

function UploadSvg({}: Props) {
  const { data: session, status } = useSession() as any;
  const [selectedImg, setSelectedImg] = useState(null);
  console.log(session);

  console.log('this is the selected image url:', selectedImg);

  //   const uploadingDocuments = async () => {
  //     try {
  //       await axios.post('/api/stripe/upload-verification', {
  //         firebaseID: session?.id,
  //         stripeId: session?.user?.stripeId,
  //         personId: session?.user?.personId,
  //         documentUploadUrl: selectedImg,
  //       });
  //     } catch (errors) {
  //       console.log(errors);
  //     }
  //   };

  //   useEffect(() => {
  //     // uploadingDocuments();
  //     console.log('selecting image: ', selectedImg);
  //   }, [selectedImg]);

  return (
    <div className="svg-contianer">
      <Title />
      <SelectSvg />
      <SvgGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal
          //   onClick={uploadingDocuments}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />
      )}
    </div>
  );
}

export default UploadSvg;
