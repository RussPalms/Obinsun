import React, { useRef, useState } from 'react';
import SvgProgress from './SvgProgress';
import { SvgLoader, SvgProxy } from 'react-svgmt';

function SelectSvg() {
  const reader = new FileReader();

  const [selectedSvg, setSelectedSvg] = useState(null);
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null) as any;
  const [error, setError] = useState(null) as any;
  const [editing, setEditing] = useState(true);
  // const [designData, setDesignData] = useState({ name: '', description: '' });
  const [designData, setDesignData] = useState({});
  const [designName, setDesignName] = useState('');
  const [designDescription, setDesignDescription] = useState('');

  const nameRef: React.MutableRefObject<any> = useRef();
  const descriptionRef: React.MutableRefObject<any> = useRef();

  const types = ['image/svg+xml'];

  // const handleName = (e: any) => {
  //   e.preventDefault();
  //   setDesignName(e.target.value);
  // };

  // const handleDescription = (e: any) => {
  //   e.preventDefault();
  //   setDesignDescription(e.target.value);
  // };

  const handleChange = (e: any) => {
    // let selected = e.target.files[0];
    let selectedFile = e.target.files[0];

    setSelected(selectedFile);
    // console.log(selected);

    reader.readAsText(selectedFile);
    // reader.readAsDataURL(selectedFile);

    reader.onload = (e) => {
      const text = e.target.result;
      // console.log(text);
      // alert(text);
      setSelectedSvg(() => text);
      setEditing(false);
      // console.log({ selectedSvg: selectedSvg });
    };

    // if (selected && types.includes(selected.type)) {
    //   setFile(selected);
    //   console.log('this is the selected SVG', selected);

    //   setError('' as any);
    // } else {
    //   setFile(null);
    //   setError('Please select an svg' as any);
    // }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(e.target);

    // let selected = e.target.files[0];
    // let transformName = nameRef.current?.value as string;
    // const name = transformName.replace(' ', '_').toLocaleLowerCase();

    const description = descriptionRef.current?.value as string;

    if (selected && types.includes(selected.type) && editing === false) {
      setFile(selected);
      // setDesignData({ name, description });
      // setDesignData({ designName, designDescription });
      console.log('this is the selected SVG', selected);

      // setError('' as any);
    } else {
      setFile(null);
      setError('Please select an svg' as any);
    }
  };

  return (
    <form className="svg-form-container" onSubmit={(e) => handleSubmit(e)}>
      <label className="svg-label-input">
        <input className="svg-input" type="file" onChange={handleChange} />
        <span>+</span>
      </label>

      <input
        className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
        type="submit"
        value="Upload Design"
      />

      <input
        name="name"
        id="design_name"
        type="text"
        // ref={nameRef}
        // value={designData.name}
        onChange={(e) => {
          // setDesignName(e.target.value);
          // designData.name = e.target.value;
          // designData[]
          // designData['name'] = e.target.value;
          setDesignName(e.target.value);
        }}
        value={designName}
        // value={designData['name']}
      />
      <input
        name="description"
        id="design_description"
        type="text"
        // ref={descriptionRef}
        onChange={(e) => {
          // setDesignDescription(e.target.value);
          // designData.description = e.target.value;
          // console.log(e.target);
          // designData['description'] = e.target.value;
          setDesignDescription(e.target.value);
        }}
        value={designDescription}
        // value={designData['description']}
      />
      <div className="relative flex flex-col items-center justify-center h-[20em] w-[20em] border-2">
        {selectedSvg === null ? (
          <div className="flex justify-center items center h-[10em] w-[10em]">
            <SvgLoader
              className="flex-1"
              width="100%"
              height="100%"
              path="/Grim2021.svg"
            />
          </div>
        ) : (
          <>
            <div className="h-full w-full flex flex-col justify-center items-center flex-1">
              <div className="flex justify-center items center h-[10em] w-[10em]">
                <SvgLoader
                  className="flex-1"
                  id="selected-svg"
                  width="100%"
                  height="100%"
                  svgXML={selectedSvg}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="svg-output-container">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && (
          <SvgProgress
            file={file}
            setFile={setFile}
            designData={designData}
            setDesignData={setDesignData}
            designName={designName}
            setDesignName={setDesignName}
            designDescription={designDescription}
            setDesignDescription={setDesignDescription}
          />
        )}
      </div>
    </form>
  );
}

export default SelectSvg;
