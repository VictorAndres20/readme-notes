import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function UploadInput({ value, setValue }) {
  const [loading, setLoading] = useState(false);
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
        setLoading(true);
        return;
    }
    if (info.file.status === 'error') {
        setLoading(false);
        return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const indexExtension = info.file.name.lastIndexOf(".");
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        // Setter
        let bytesData = url;
        if(indexExtension !== -1) bytesData = `${info.file.name.slice(indexExtension + 1, info.file.name.length)}\n${bytesData}`;
        setValue(bytesData);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
            marginTop: 8,
        }}
      >
        Subir archivo
      </div>
    </div>
  );
  return (
    <>
      <Upload
        customRequest={(e) => {
            const isLt2M = e.file.size / 1024 / 1024 < 30;
            if (!isLt2M) {
                message.error('Archivo sobre pasa los 30MB');
                e.onError(`Image must smaller than 30MB!`);
            } else if(e.file.name.lastIndexOf(".") === -1){
                message.error('Archivo sin extensión');
                e.onError(`File without extension`);
            } else {
                e.onSuccess("ok");
            }
            
        }}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        onChange={handleChange}
        onRemove={() => {
            setValue('')
        }}
      >
        {value === '' && uploadButton}
      </Upload>
    </>
  );
};