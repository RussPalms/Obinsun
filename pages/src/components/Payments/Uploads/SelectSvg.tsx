import React, { useState } from 'react';
import SvgProgress from './SvgProgress';

type Props = {};

function SelectSvg({}: Props) {
  const [file, setFile] = useState(null) as any;
  const [error, setError] = useState(null) as any;

  const types = ['image/svg+xml'];

  const handleChange = (e: any) => {
    let selected = e.target.files[0];
    console.log(selected);

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      console.log('this is the selected image', file);

      setError('' as any);
    } else {
      setFile(null);
      setError('Please select an svg' as any);
    }
  };

  return (
    <form className="svg-form-container">
      <label className="svg-label-input">
        <input className="svg-input" type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="svg-output-container">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <SvgProgress file={file} setFile={setFile} />}
      </div>
    </form>
  );
}

export default SelectSvg;
