import React, { useEffect, useRef, useState } from 'react';
import UploadSvg from '../Payments/UploadSvg';
import VerifyDocuments from '../Payments/VerifyDocuments';
import Logo from 'public/Grim2021.svg';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import axios from 'axios';
import Image from 'next/image';
import CutMeSomeSlacks from 'pages/src/assets/ObinsunVectors/CutMeSomeSlacks';
import ZLogo from 'pages/src/assets/ObinsunVectors/ZLogo';

type Props = {};

export const Studio = (props: Props) => {
  const reader = new FileReader();

  const ref = useRef(null);

  const [selectedSvg, setSelectedSvg] = useState(null);
  // const [svgPath, setSvgPath] = useState('');

  // const handleSubmit = async () => {
  //   const getSvg = await axios.get('/api/designs').then((response) => {
  //     console.log(response);
  //     const svg = Object.values(response)[0];
  //     return svg;
  //   });
  //   console.log(getSvg);
  // };

  const handleSvg = async (e: any) => {
    e.preventDefault();

    // const reader = new FileReader();

    const selectedFile = e.target.files[0];

    reader.readAsText(selectedFile);
    // reader.readAsDataURL(selectedFile);

    reader.onload = async (e) => {
      const text = e.target.result;
      // console.log(text);
      // alert(text);
      setSelectedSvg(text);
    };
    // const svgData = reader.readAsDataURL(selectedFile);
    // const svgData = reader.readAsArrayBuffer(selectedFile);
    // console.log(svgData);
    // setSelectedSvg(svgData);

    // const readFile = reader.readAsBinaryString(selectedFile);

    // reader.onload = async ()

    // const optimizedSvg = async (file: any) => {
    //   console.log(file);

    //   await axios
    //     .post('api/optimize-svg', {
    //       filePath: file,
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //     });
    // };

    // const currentSvg = ref.current;

    // if (currentSvg == null || ref == null) return;

    // let svg_file = currentSvg.querySelector('#svg_file');
    // console.log(readFile);

    // setSelectedSvg(svg_file);
    // console.log(selectedSvg);

    // setSelectedSvg(e.target.files[0].toString());

    // setSelectedSvg(ref.current.value);
    // let svg_file = currentSvg.querySelector('#svg_file');

    // console.log(selectedSvg);
  };

  // const svgDisplay = ref.current.value;

  // useEffect(() => {
  //   const currentSvg = ref.current;

  //   if (currentSvg == null || ref == null) return;

  //   // console.log(ref.current.value);
  //   // console.log(svg_file);
  //   // setSvgPath(ref.current.value);

  //   // let svg_file = currentSvg.querySelector('#svg_file');

  //   // setSelectedSvg(svg_file);
  //   // console.log(selectedSvg.value);
  //   // const base64fromSVG = window.svg64(svg)
  // }, [handleSvg]);

  useEffect(() => {
    // const base64fromSVG = window.svg64(svg)
    console.log(selectedSvg);
  }, [handleSvg]);

  return (
    <>
      <div ref={ref}>
        <form
          className="flex flex-col items-center justify-center"
          method="post"
          action="/api/designs"
          encType="multipart/form-data"
          // onSubmit={handleSubmit}
        >
          <input
            name="svg"
            id="svg_file"
            type="file"
            accept=".svg"
            // value="select svg"
            onChange={(e) => {
              handleSvg(e);
            }}
          />
          <div className="flex items-center justify-center h-[20em] w-[20em]">
            {selectedSvg === null ? (
              // <SvgLoader
              //   className="flex-1"
              //   width="100%"
              //   height="100%"
              //   // path="/Grim2021"
              //   path={`${process.env.NEXTAUTH_URL}/public/Grim2021.svg`}
              // />
              // <Image width="100%" height="100%" src="/Grim2021.svg" />
              <ZLogo className="h-full w-full" id="grim-2021" />
            ) : (
              // <CutMeSomeSlacks />
              <>
                <SvgLoader
                  className="flex-1"
                  id="selected-svg"
                  // width="300"
                  // height="300"
                  width="100%"
                  height="100%"
                  svgXML={selectedSvg}
                />
                {/* <div className="m-1 p-1"> */}
                <ol className="list-disc text-[0.9em] text-right list-inside">
                  <li>
                    If you don't see your design, try re-exporting it. Make sure
                    is centered within it's bounding box and it's not being
                    clipped by it's container.
                  </li>
                  <br />
                  <li>
                    If your design is still not rendering you may need to update
                    your studio software. Once you've taken care of that,
                    re-export your svg and load it in again.
                  </li>
                </ol>
                {/* </div> */}
              </>
            )}
          </div>

          {/* 
          {selectedSvg && (
            <SvgLoader width="100" height="100" svgXML={selectedSvg} />
            // <SvgLoader width="100" height="100" path={selectedSvg} />
          )} */}
          <input
            className="input border-bottom-right-glass text-[#666] bg-white max-w-[100px] cursor-pointer mb-[20px] font-semibold"
            type="submit"
            value="upload"
          />
        </form>

        <UploadSvg />
        {/* {selectedSvg} */}
        {/* <SvgLoader width="100" height="100" path={selectedSvg} /> */}
        {/* <SvgLoader width="100" height="100" svgXML={selectedSvg} /> */}
        {/* {selectedSvg ? (
          <SvgLoader width="100" height="100" svgXML={selectedSvg} />
        ) : (
          ''
        )} */}
      </div>
    </>
  );
};

export default Studio;
