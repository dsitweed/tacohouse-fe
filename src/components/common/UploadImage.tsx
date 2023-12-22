import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { App, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import { FILE_PATH } from '@/routes/routeNames';
import axios from 'axios';

const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface UploadImageProps {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  maxCount?: number;
  maxSize?: number; // a = a MB
}

/**
 * UploadImage component props
 * @typedef {Object} UploadImageProps
 * @property {string[]} imageUrls - An array of image URLs.
 * @property {React.Dispatch<React.SetStateAction<string[]>>} setImageUrls - Function to set the image URLs.
 * @property {number} [maxCount=1] - The maximum number of allowed images.
 * @property {number} [maxSize=1] - The maximum size of each image in bytes (default is 1 MB).
 */

/**
 * UploadImage component
 * @param {UploadImageProps} props - Component props.
 * @returns {JSX.Element} - Rendered component.
 */
export default function UploadImage(props: UploadImageProps) {
  const { imageUrls, setImageUrls, maxCount = 2, maxSize = 2 } = props;

  const { t } = useTranslation();
  const { message } = App.useApp();
  const getFileList = () => {
    return imageUrls.map(
      (url) =>
        ({
          url: url,
        }) as UploadFile,
    );
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(getFileList);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    function getPathStorageFromUrl(url: string | undefined) {
      if (!url) return '';
      // Find the last '/' in the URL
      const lastSlashIndex = url.lastIndexOf('/');

      // Extract the file name from the URL
      const fileNameWithParams = url.substring(lastSlashIndex + 1);

      // Remove parameters from the file name
      const questionMarkIndex = fileNameWithParams.indexOf('?');
      let fileName =
        questionMarkIndex !== -1
          ? fileNameWithParams.substring(0, questionMarkIndex)
          : fileNameWithParams;
      fileName = fileName.replace(/%20/g, ' ');
      return fileName;
    }

    setPreviewTitle(file.name || getPathStorageFromUrl(file.url));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: UploadFile) => {
    if (!file.size) return false;
    const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtMaxSize) {
      message.error(t('uploadImage.errorUploadSize', { size: maxSize }));
    }

    // Add Upload.LIST_IGNORE for ignore failed image
    return isLtMaxSize || Upload.LIST_IGNORE;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRequest = async (values: any) => {
    const { file, headers, onSuccess, onError, onProgress } = values;
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post(`${FILE_PATH}/image`, formData, {
        headers,
        onUploadProgress: ({ total, loaded }) => {
          if (total !== undefined) {
            onProgress(
              { percent: Math.round((loaded / total) * 100).toFixed(2) },
              file,
            );
          }
        },
      });

      if (response.success) {
        // response.data.data = url and fileName of file
        const { url } = response.data.data;
        setImageUrls([...imageUrls, url]);
        file.url = url;
        onSuccess(null, file);
      }
    } catch (error) {
      console.error(error);
      onError(error);
    }
  };

  const onRemove = async (file: UploadFile) => {
    try {
      const deleteFile = imageUrls.find((url) => url === file?.url);
      if (deleteFile) {
        const newList = imageUrls.filter((url) => url !== file?.url);
        setImageUrls(newList);

        await axios.delete(`${FILE_PATH}`, {
          data: {
            fileUrl: deleteFile,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const UploadButton = (
    <div>
      <PlusOutlined />
      <p className="mt-1">{t('uploadImage.upload')}</p>
    </div>
  );

  return (
    <div>
      <Upload
        accept=".jpg, .jpeg, .png"
        listType="picture-card"
        fileList={fileList}
        maxCount={maxCount}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        onRemove={onRemove}
        progress={{
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          size: 3,
        }}
      >
        {fileList.length >= maxCount ? null : UploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="uploaded image"
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
}
