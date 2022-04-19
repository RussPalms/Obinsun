import React, { useCallback, useEffect, useRef, useState } from 'react';
import UploadSvg from '../Payments/UploadSvg';
import VerifyDocuments from '../Payments/VerifyDocuments';
import Logo from 'public/Grim2021.svg';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import axios from 'axios';
import Image from 'next/image';
import CutMeSomeSlacks from 'pages/src/assets/ObinsunVectors/CutMeSomeSlacks';
import ZLogo from 'pages/src/assets/ObinsunVectors/ZLogo';
import { Todo, todoApi } from 'pages/app/state/rtkApi';
import { GetServerSideProps } from 'next';
import { async } from '@firebase/util';

export const Studio = () => {
  // const { data: todos } = todoApi.useGetAllQuery();
  // const [updateTodo] = todoApi.useUpdateTodoMutation();
  // const [deleteTodo] = todoApi.useDeleteTodoMutation();
  // const [addTodo] = todoApi.useAddTodoMutation();

  // const onToggle = useCallback(
  //   (todo: Todo) => updateTodo({ ...todo, done: !todo.done }),
  //   [updateTodo]
  // );

  // const onDelete = useCallback((todo: Todo) => deleteTodo(todo), [deleteTodo]);

  // const textRef = useRef<HTMLInputElement>(null);

  // const onAdd = useCallback(
  //   () => addTodo(textRef.current!.value ?? ''),
  //   [addTodo]
  // );

  const reader = new FileReader();

  const ref = useRef(null);

  // const [selectedSvg, setSelectedSvg] = useState(null);
  const [selectedSvg, setSelectedSvg] = useState(null);
  // const [svgPath, setSvgPath] = useState('');

  const handleSubmit = async () => {
    const getSvg = await axios.get('/api/designs').then((response) => {
      console.log(response);
      const svg = Object.values(response)[0];
      return svg;
    });
    console.log(getSvg);
  };

  const handleSvg = async (e: any) => {
    e.preventDefault();

    // const reader = new FileReader();

    const selectedFile = e.target.files[0];

    reader.readAsText(selectedFile);
    // reader.readAsDataURL(selectedFile);

    reader.onload = (e) => {
      const text = e.target.result;
      // console.log(text);
      // alert(text);
      setSelectedSvg(() => text);
      // console.log({ selectedSvg: selectedSvg });
    };

    // console.log(reader.result);

    // const { result } = await reader;
    // console.log(result);
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
    // // console.log(readFile);
    // console.log(svg_file);

    // setSelectedSvg(svg_file);
    // console.log(selectedSvg);

    // setSelectedSvg(e.target.files[0].toString());

    // setSelectedSvg(ref.current.value);
    // let svg_file = currentSvg.querySelector('#svg_file');

    // console.log({ selectedSvg: selectedSvg });
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

  // useEffect(() => {
  //   const siteData = async () => {
  //     const retrieveSiteData = await fetch(process.env.NEXTAUTH_URL);
  //     console.log(retrieveSiteData);
  //   };
  //   siteData();
  // }, []);

  // useEffect(() => {
  //   // const base64fromSVG = window.svg64(svg)
  //   // console.log({ selectedSvg: selectedSvg });
  //   // console.log(selectedSvg);
  //   console.log('Displaying selected SVG');
  // }, [handleSvg]);

  return (
    <>
      <div ref={ref}>
        <form
          className="flex flex-col items-center justify-center"
          method="post"
          action="/api/designs"
          encType="multipart/form-data"
          target="_self"
          // onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center justify-center h-[5em] w-[50em]">
                <input
                  className="flex-1"
                  name="svg"
                  id="svg_file"
                  type="file"
                  // accept=".svg"
                  accept=".svg"
                  // value="select svg"
                  onChange={(e) => {
                    handleSvg(e);
                  }}
                />
                <input name="name" id="design_name" type="text" />
                <input name="description" id="design_description" type="text" />
              </div>

              {/* <div className="flex items-center justify-center h-[25em] w-[25em]"> */}
              <div className="relative flex flex-col items-center justify-center h-[20em] w-[20em]">
                {selectedSvg === null ? (
                  <div className="flex justify-center items center h-[10em] w-[10em]">
                    <SvgLoader
                      className="flex-1"
                      width="100%"
                      height="100%"
                      path="/Grim2021.svg"
                      // path={`${process.env.NEXTAUTH_URL}/public/Grim2021.svg`}
                    />
                  </div>
                ) : (
                  // <Image width="100%" height="100%" src="/Grim2021.svg" />
                  // <ZLogo className="h-full w-full" id="grim-2021" />
                  <>
                    <div className="h-full w-full flex flex-col justify-center items-center flex-1">
                      <div className="flex justify-center items center h-[10em] w-[10em]">
                        <SvgLoader
                          className="flex-1"
                          id="selected-svg"
                          width="100%"
                          height="100%"
                          // width="100"
                          // height="100"
                          svgXML={selectedSvg}
                        />
                      </div>
                      {/* <ol className="list-disc text-[0.9em] text-left list-inside w-full h-[20em]">
                        <li>
                          If you don't see your design, try re-exporting it.
                          Make sure is centered within it's bounding box and
                          it's not being clipped by it's container.
                        </li>
                        <br />
                        <li>
                          If your design is still not rendering you may need to
                          update your studio software. Once you've taken care of
                          that, re-export your svg and load it in again.
                        </li>
                      </ol> */}
                    </div>
                  </>
                )}
              </div>
              {/* </div> */}
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
          </div>
        </form>
        {/* <div className="flex items-center justify-center min-w-[25em] min-h-[25em]">
          <SvgLoader
            src="/Grim2021.svg"
            className="flex-1 h-[20em] w-[20em]"
            width="100%"
            height="100%"
            // path="public/Grim2021.svg"
            // path={`${process.env.NEXTAUTH_URL}/public/Grim2021.svg`}
            path="/Grim2021.svg"
          />
        </div> */}
        <UploadSvg />
        {/* {selectedSvg} */}
        {/* <SvgLoader width="100" height="100" path={selectedSvg} /> */}
        {/* <SvgLoader width="100" height="100" svgXML={selectedSvg} /> */}
        {/* {selectedSvg ? (
          <SvgLoader width="100" height="100" svgXML={selectedSvg} />
        ) : (
          ''
        )} */}
        {/* <div className="todoApp">
          <div className="todos">
            {todos?.map((todo) => (
              <React.Fragment key={todo.id}>
                <div>
                  <input
                    type="todoCheckbox"
                    checked={todo.done}
                    onChange={() => onToggle(todo)}
                  />
                  <span>{todo.text}</span>
                </div>
                <button onClick={() => onDelete(todo)}>Delete</button>
              </React.Fragment>
            ))}
          </div>
          <div className="todoAdd">
            <input type="todoText" ref={textRef} />
            <button onClick={onAdd}>Add</button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Studio;
