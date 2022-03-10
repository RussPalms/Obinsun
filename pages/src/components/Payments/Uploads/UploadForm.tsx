import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

type Props = {};

function UploadForm({}: Props) {
  const [file, setFile] = useState(null) as any;
  const [error, setError] = useState(null) as any;

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e: any) => {
    // console.log("event currently taking place", e);

    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);

      // console.log("this is the uploaded file", file);
      console.log('this is the selected image', file);

      setError('' as any);
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)' as any);
    }
  };

  // console.log("this is the uploaded file", file);

  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
}

export default UploadForm;
