import { BUILDINGS_PATH, routes } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import { App, Button, Card, Form, Input, Select } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateBuilding() {
  const [form] = Form.useForm();
  const apiBuilding = useApiClient(BUILDINGS_PATH);
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const [buildingType, setBuildingType] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (values: any) => {
    try {
      const newBuilding = await apiBuilding.create({
        ...values,
      });

      if (newBuilding && newBuilding.status === 201) {
        notification.success({ message: t('building.new.success') });
        navigate(routes.managers.buildings.index);
      } else {
        notification.error({ message: t('building.new.failed') });
      }

      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <Form
        id="createForm"
        layout="vertical"
        autoComplete="true"
        form={form}
        onFinish={handleCreate}
        onFinishFailed={(error) => console.error(error)}
      >
        <Form.Item
          name="name"
          label={t('building.buildingName')}
          rules={[{ required: true, message: t('common.pleaseEnter') }]}
        >
          <Input placeholder="Input building name" />
        </Form.Item>

        <Form.Item
          name="type"
          label={t('building.buildingType')}
          rules={[{ required: true, message: t('common.pleaseEnter') }]}
        >
          <Select
            options={[
              {
                label: t('building.type.hostel'),
                value: 'HOSTEL',
              },
              {
                label: t('building.type.entireHouse'),
                value: 'ENTIRE_HOUSE',
              },
            ]}
            placeholder="Select"
            onChange={(value) => setBuildingType(value)}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label={t('building.buildingAddress')}
          rules={[{ required: true, message: t('common.pleaseEnter') }]}
        >
          <Input placeholder="Building address" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Tạo tòa nhà mới
        </Button>
      </Form>
    </Card>
  );
}
