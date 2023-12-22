import { BuildingEntity } from '@/models';
import { BUILDINGS_PATH, routes } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import { Form, Card, Input, Button, App, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function EditBuilding() {
  const { notification } = App.useApp();
  const paths = window.location.pathname.split('/');
  const buildingId = Number(paths[paths.length - 2]);

  const [building, setBuilding] = useState<BuildingEntity>();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiBuilding = useApiClient<BuildingEntity>(BUILDINGS_PATH);

  useEffect(() => {
    const fetch = async () => {
      const response = await apiBuilding.getById(buildingId);
      if (response) {
        setBuilding(response.data.data);
      }
    };

    fetch();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = async (values: any) => {
    try {
      const editedBuilding = await apiBuilding.update(buildingId, {
        ...values,
      });

      if (editedBuilding && editedBuilding.status === 200) {
        notification.success({
          message: t('building.edit.success', { name: building?.name }),
        });
        navigate(routes.managers.buildings.index);
      } else {
        notification.error({
          message: t('building.edit.failed', { name: building?.name }),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handelDelete = async () => {
    try {
      const deletedBuilding = await apiBuilding.deleteById(buildingId);

      if (deletedBuilding && deletedBuilding.status === 200) {
        notification.success({
          message: t('building.delete.success'),
        });
        navigate(routes.managers.buildings.index);
      } else {
        notification.error({
          message: t('building.delete.failed'),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return !building ? (
    <Card>Không tồn tại tòa nhà</Card>
  ) : (
    <Card>
      <Form
        id="createForm"
        layout="vertical"
        autoComplete="true"
        form={form}
        onFinish={handleEdit}
        onFinishFailed={(error) => console.error(error)}
      >
        <Form.Item
          name="name"
          label={t('building.buildingName')}
          rules={[{ required: true, message: t('common.pleaseEnter') }]}
          initialValue={building.name}
        >
          <Input placeholder="Input building name" />
        </Form.Item>

        <Form.Item
          name="type"
          label={t('building.buildingType')}
          rules={[{ required: true, message: t('common.pleaseEnter') }]}
          initialValue={building.type}
        >
          <Select
            disabled
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
          />
        </Form.Item>

        <Form.Item
          name="address"
          label={t('building.buildingAddress')}
          rules={[{ required: true, message: t('common.pleaseEnter') }]}
          initialValue={building.address}
        >
          <Input placeholder="Building address" />
        </Form.Item>

        <div className="flex gap-2">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-primary submit-button"
          >
            Cập nhật thông tin
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: 'rgb(220 38 38)',
            }}
            onClick={() => handelDelete()}
          >
            Xóa tòa nhà
          </Button>
        </div>
      </Form>
    </Card>
  );
}
