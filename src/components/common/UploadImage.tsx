import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { App, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/plugins/firebase/config';

const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface UploadImageProps {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function UploadImage(props: UploadImageProps) {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: UploadFile) => {
    if (!file.size) return false;
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error(t('uploadImage.errorSize1M'));
    }

    return isLt1M || Upload.LIST_IGNORE;
  };

  const customUpload = async ({
    file,
    onSuccess,
    onError,
  }: {
    file: UploadFile;
    onSuccess: any;
    onError: any;
  }) => {
    try {
      const imageRef = ref(storage, `images/${file.uid + file.name}`);
      const snapshot = await uploadBytes(imageRef, file as RcFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // save image url -> HOC
      props.setImageUrl(downloadURL);
      onSuccess(null, file);
    } catch (error) {
      console.error(error);
      onError();
    }
  };

  const UploadButton = (
    <div>
      <PlusOutlined />
      <p>{t('uploadImage.upload')}</p>
    </div>
  );

  return (
    <div>
      <Upload
        accept=".jpg, .jpeg, .png"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        customRequest={customUpload}
      >
        {fileList.length == 1 ? null : UploadButton}
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
