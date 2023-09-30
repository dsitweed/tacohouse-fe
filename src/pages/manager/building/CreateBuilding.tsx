import { useApiClient } from '@/shared/hooks/api';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/auth.slice';
import { App, Button, Form, Input, Modal } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';

interface CreateBuildingForm {
  name: string;
  address: string;
  ownerId: number | undefined;
}

export default function CreateBuilding() {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const apiBuilding = useApiClient('/buildings');

  const currentUser = useAppSelector(selectUser);

  const { notification } = App.useApp();

  const handleCreate = async (values: CreateBuildingForm) => {
    values.ownerId = currentUser?.userId;

    try {
      console.log(values);
      const newBuilding = await apiBuilding.create({
        ...values,
      });
      if (newBuilding?.status === 201) {
        notification.success({ message: t('building.new.success') });
      } else {
        notification.error({ message: t('building.new.failed') });
      }
      console.log({
        newBuilding,
      });
      form.resetFields();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button className="border border-black" onClick={() => setIsOpen(true)}>
        <span>
          Click to Create <span className="font-bold">new building</span>
        </span>
      </Button>
      {/* popup modal */}
      <Modal
        title={t('building.new.create')}
        open={isOpen}
        onCancel={onCancel}
        width={1000}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        footer={[
          <Button
            form="createForm"
            key="submit"
            htmlType="submit"
            type="primary"
            className="bg-primary"
          >
            <p className=" text-base">{t('common.create')}</p>
          </Button>,
        ]}
      >
        <Form
          id="createForm"
          layout="vertical"
          autoComplete="true"
          form={form}
          onFinish={handleCreate}
          onFinishFailed={(error) => console.error(error)}
        >
          <Form.Item
            name="address"
            label={t('building.buildingAddress')}
            rules={[{ required: true, message: t('common.pleaseEnter') }]}
          >
            <Input placeholder="Building address" />
          </Form.Item>
          <Form.Item
            name="name"
            label={t('building.buildingName')}
            rules={[{ required: true, message: t('common.pleaseEnter') }]}
          >
            <Input placeholder="Input building name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
