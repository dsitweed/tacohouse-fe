import { BuildingEntity } from '@/models';
import { BuildingService } from '@/services';
import { Form, Card, Input, InputNumber, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function EditBuilding() {
  const paths = window.location.pathname.split('/');
  const buildingId = Number(paths[paths.length - 2]);
  const [building, setBuilding] = useState<BuildingEntity>();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      const building = (await BuildingService.getBuilding(
        buildingId,
      )) as BuildingEntity;

      setBuilding(building);
    };

    fetch();
  }, [building]);

  const handleEdit = () => {
    console.log(`Edit building id: ${building?.id}`);
  };

  return !building ? (
    <Card>{paths}</Card>
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
          name="address"
          label={t('building.buildingAddress')}
          rules={[{ required: true, message: t('common.pleaseEnter') }]}
          initialValue={building.address}
        >
          <Input placeholder="Building address" />
        </Form.Item>

        <Form.Item
          name="electricPrice"
          label={'Tiền điện /1 Số'}
          initialValue={0}
        >
          <InputNumber placeholder="Tiền điện" className="w-[200px]" />
        </Form.Item>

        <Form.Item name="waterPrice" label={'Tiền nước /1 Số'} initialValue={0}>
          <InputNumber placeholder="Tiền nước" className="w-[200px]" />
        </Form.Item>

        <Form.Item name="wifiFee" label={'Tiền Wifi /1 tháng'} initialValue={0}>
          <InputNumber placeholder="Tiền wifi" className="w-[200px]" />
        </Form.Item>

        <Form.Item
          name="environmentPrice"
          label={'Tiền vệ sinh /1 tháng'}
          initialValue={0}
        >
          <InputNumber placeholder="Tiền điện" className="w-[200px]" />
        </Form.Item>

        <Form.Item
          name="lightPrice"
          label={'Tiền thắp sáng /1 tháng'}
          initialValue={0}
        >
          <InputNumber placeholder="Tiền điện" className="w-[200px]" />
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
            htmlType="submit"
            style={{
              backgroundColor: 'rgb(220 38 38)',
            }}
          >
            Xóa tòa nhà
          </Button>
        </div>
      </Form>
    </Card>
  );
}
