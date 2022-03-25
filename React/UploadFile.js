import React from 'react';

/*
const showFile = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result);
      let data = readTextFile(text);
      this.generateData({data});
    };
    reader.readAsText(e.target.files[0])
}
*/

const UploadFile = (props) => {
    return (
        <div>
            <input type="file" onChange={(e) => props.readFile(e)} />
        </div>
    );
}

export default UploadFile;