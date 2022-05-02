import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch } from 'react';
import {
  selectDocumentFile,
  setDocumentFile,
} from 'pages/app/state/slices/documentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useDocumentUpload from 'pages/server/hooks/useDocumentUpload';
// import DocumentProgress from './DocumentProgress';

// import Image from 'next/image';

const ExistingDocument = () => {
  const documentReader = new FileReader();
  const documentTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  //   const documentReference = useRef(null);
  //   const documentDispatch = useDispatch();

  //   const documentFile = useSelector(selectDocumentFile);

  const [verificationDocument, setVerificationDocument] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [submitDocumentFile, setSubmitDocumentFile] = useState(null);
  const [documentSubmitError, setDocumentSubmitError] = useState('');
  const [documentDimensions, setDocumentDimensions] = useState({
    width: 0,
    height: 0,
  });

  //   const verificationDocument = (e: any) => {
  //     e.preventDefault();

  //     // const documentSource = documentReference.current.files[0];
  //     const documentSource = e.target.files[0];
  //     documentDispatch(setDocumentFile(documentSource));
  //   };

  /**
   * Returns image dimensions for specified URL.
   */
  const getImageDimensions = (
    url: string
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () =>
        resolve({
          width: img.width,
          height: img.height,
        });
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  };

  const loadDocument = (e: any) => {
    e.preventDefault();
    // let images = new Image();
    // images.onload = () => {
    //   console.log('Image Size', images.width, images.height);
    // };

    const selectedDocument = e.target.files[0];

    setDocumentFile(selectedDocument);

    // console.log(
    //   'natural:',
    //   selectedDocument.naturalWidth,
    //   selectedDocument.naturalHeight
    // );
    // console.log(
    //   'width,height:',
    //   selectedDocument.width,
    //   selectedDocument.height
    // );
    // console.log(
    //   'offsetW,offsetH:',
    //   selectedDocument.offsetWidth,
    //   selectedDocument.offsetHeight
    // );

    documentReader.readAsDataURL(selectedDocument);

    documentReader.onload = async (loaded) => {
      const documentText = loaded.target.result;

      try {
        const { width, height } = await getImageDimensions(
          documentText as string
        );
        console.log(`Image dimensions: ${width}px x ${height}px`);
        setDocumentDimensions({ width, height });
      } catch (e) {
        // Could not load image from specified URL
        console.error(e);
      }

      setVerificationDocument(documentText);
    };
  };

  const submitDocument = (e: any) => {
    e.preventDefault();

    console.log('submitting');

    console.log(documentTypes.includes(documentFile.type));

    if (documentFile && documentTypes.includes(documentFile.type)) {
      console.log('submitting document');

      setSubmitDocumentFile(documentFile);
      console.log({ submitting: documentFile.name });
    } else {
      setSubmitDocumentFile(null);
      setDocumentSubmitError(
        'Please select a .jpeg, .jpg or .png image' as any
      );
    }

    //   const { progress, url } = useDocumentUpload(documentFile);

    //   return {progress, url}
  };

  //   const {progress, url} = submitDocument()

  useEffect(() => {
    if (!verificationDocument) {
      console.log('no file selected');
    } else {
      console.log(verificationDocument);
      //   if (!submitDocumentFile) {
      //     setSubmitDocumentFile(null);
      //   }
    }
  }, [
    verificationDocument,
    // , submitDocumentFile
  ]);

  return (
    <div className="relative h-[100%] w-[100%] overflow-hidden flex flex-col items-center justify-center">
      <form
        className="h-[100%] w-[100%] flex items-center justify-center"
        onSubmit={(e) => {
          submitDocument(e);
        }}
      >
        <input
          className="flex-1"
          type="file"
          name="document"
          id="document_file"
          //   ref={documentReference}
          onChange={(e) => {
            loadDocument(e);
          }}
        />
        <div className="glass-container h-[25rem] w-[37.5rem] flex items-center justify-center">
          {verificationDocument !== null && (
            <img
              //   className={`object-contain h-[${documentDimensions.height}px] w-[${documentDimensions.width}px]`}
              className="h-full w-full border rounded-[0.625rem] object-contain"
              src={verificationDocument}
              alt="Verification Document"
            />
            // {/* <Image
            //   className="glass-container flex items-center justify-center h-[100%] w-[100%]"
            //   height={documentDimensions.height}
            //   width={documentDimensions.width}
            //   src={verificationDocument}
            //   alt="verification document"
            //   objectFit="fill"
            // /> */}
          )}
        </div>

        <input
          className="hidden"
          name="document_input"
          id="document_submit"
          type="submit"
        />
        <label className="cursor-pointer" htmlFor="document_submit">
          Upload Verification Document
        </label>
      </form>
      <div className="svg-output-container">
        {documentSubmitError && (
          <div className="error">{documentSubmitError}</div>
        )}
        {submitDocumentFile && <div>{submitDocumentFile.name}</div>}
        {submitDocumentFile && (
          <DocumentProgress
            submitDocumentFile={submitDocumentFile}
            setSubmitDocumentFile={setSubmitDocumentFile}
            verificationDocument={verificationDocument}
          />
        )}
      </div>
    </div>
  );
};

export default ExistingDocument;

export const DocumentProgress = ({
  submitDocumentFile,
  setSubmitDocumentFile,
  verificationDocument,
}) => {
  const { progress, url } = useDocumentUpload(
    submitDocumentFile,
    verificationDocument
  );

  useEffect(() => {
    if (url) {
      setSubmitDocumentFile(null);
    }
  }, [url, setSubmitDocumentFile]);

  return (
    <motion.div
      className="firebase-progress"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
};
