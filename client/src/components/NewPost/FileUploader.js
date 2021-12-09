import React, { useEffect, useState } from 'react';
import { isEmpty } from '../Utils';

const FileUploader = ({onFilesSelect}) => {
  const [files, setFiles] = useState([]);

  const handleFileInput = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      setFiles(files => [...files, {url: URL.createObjectURL(e.target.files[i]), file: e.target.files[i]}]);
    }
  };

  const removeFile = (f) => {
    let newFiles = files;
    newFiles = newFiles.filter(file => file.url !== f.url);
    setFiles(newFiles);
  };

  useEffect(() => {
    onFilesSelect(files);
  }, [files]);

  return (
    <div className="file-uploader">
      <input id="file" className="inputfile" name="file" type="file" multiple={true} onChange={handleFileInput}></input>
      <label for="file"><span className="material-icons-outlined">image</span></label>
      <ul>
        {!isEmpty(files) && files.slice(0, 5).map((file) => {
          return (<li>
            <img className="preview-img" src={file.url} alt='file' />
            <span className="material-icons-outlined" onClick={() => removeFile(file)}>close</span>
          </li>)
        })}
      </ul>
    </div>
  );
};

export default FileUploader;