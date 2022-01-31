// @ts-nocheck

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ImageGrid from "./Uploads/ImageGrid";
import Modal from "./Uploads/Modal";
import Title from "./Uploads/Title";
import UploadForm from "./Uploads/UploadForm";

type Props = {};

function VerifyDocuments({}: Props) {
  const { data: session, status } = useSession();
  const [selectedImg, setSelectedImg] = useState(null);
  // console.log(selectedImg);
  console.log(session);

  console.log("this is the selected image url:", selectedImg);

  const uploadingDocuments = async (e) => {
    // e.preventDefault();
    try {
      await axios.post("/api/stripe/upload-verification", {
        firebaseID: session?.id,
        stripeId: session?.user?.stripeId,
        personId: session?.user?.personId,
        documentUploadUrl: selectedImg,
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  // if (selectedImg != null) {
  //   axios.post("/api/stripe/upload-verification", {
  //     firebaseID: session?.id,
  //     stripeId: session?.user?.stripeId,
  //     documentUpload: selectedImg,
  //   });
  // } else return;

  useEffect(() => {
    uploadingDocuments();
    // if (selectedImg !== null) {
    // axios.post("/api/stripe/upload-verification", {
    //   firebaseID: session?.id,
    //   stripeId: session?.user?.stripeId,
    //   documentUpload: selectedImg,
    // });
    // } else return;
    console.log("selecting image: ", selectedImg);
  }, [selectedImg]);

  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal
          onClick={uploadingDocuments}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />
      )}
    </div>
  );
}

export default VerifyDocuments;
