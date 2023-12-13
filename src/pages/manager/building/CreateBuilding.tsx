import { BuildingEntity } from '@/models';
import {
  BUILDINGS_PATH,
  BUILDING_UNIT_PRICES_PATH,
  routes,
} from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import { App, Button, Card, Form, Input, InputNumber, Select } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const buildingUnits = [
  {
    name: 'electricity',
    label: 'Nhập tiền điện',
  },
  {
    name: 'water',
    label: 'Nhập tiền nước',
  },
  {
    name: 'wifi',
    label: 'Nhập tiền wifi',
  },
  {
    name: 'light',
    label: 'Nhập tiền chiếu sáng',
  },
  {
    name: 'environment',
    label: 'Nhập tiền vệ sinh',
  },
];

export default function CreateBuilding() {
  const [form] = Form.useForm();
  const apiBuilding = useApiClient(BUILDINGS_PATH);
  const apiBuildingUnitPrice = useApiClient(BUILDING_UNIT_PRICES_PATH);
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [buildingType, setBuildingType] = useState<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (values: any) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { electricity, water, wifi, light, environment, ...buildingDto } =
        values;

      const newBuildingRes = await apiBuilding.create({
        ...buildingDto,
      });

      if (newBuildingRes && newBuildingRes.status === 201) {
        const newBuilding = newBuildingRes.data.data as BuildingEntity;
        // Create building units price
        buildingUnits.forEach(async (unit) => {
          await apiBuildingUnitPrice.create({
            buildingId: newBuilding.id,
            name: unit.name,
            price: values[unit.name],
          });
        });

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
          name="address"
          label={t('building.buildingAddress')}
          rules={[{ required: true, message: t('common.pleaseEnter') }]}
        >
          <Input placeholder="Building address" />
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
              // {
              //   label: t('building.type.entireHouse'),
              //   value: 'ENTIRE_HOUSE',
              // },
            ]}
            onChange={(value) => setBuildingType(value)}
            placeholder="Select"
          />
        </Form.Item>

        {buildingType === 'HOSTEL' && (
          <div className="grid-cols-2">
            {buildingUnits.map((item, index) => (
              <Form.Item
                key={`buildingUnitPrice-${index}`}
                name={item.name}
                label={item.label}
                rules={[{ required: true, message: t('common.pleaseEnter') }]}
              >
                <InputNumber
                  placeholder="Đơn vị VNĐ"
                  className="w-40"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value!.replace(/,/g, '')}
                />
              </Form.Item>
            ))}
          </div>
        )}

        <Button type="primary" htmlType="submit">
          Tạo tòa nhà mới
        </Button>
      </Form>
    </Card>
  );
}
