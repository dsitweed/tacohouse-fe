import { useApiClient } from '@/shared/hooks/api';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/auth.slice';
import { App, Button, Card, Form, Input, InputNumber } from 'antd';
import { t } from 'i18next';

interface CreateBuildingForm {
  name: string;
  address: string;
  ownerId: number | undefined;
}

export default function CreateBuilding() {
  const [form] = Form.useForm();
  const apiBuilding = useApiClient('/buildings');

  const currentUser = useAppSelector(selectUser);

  const { notification } = App.useApp();

  const handleCreate = async (values: CreateBuildingForm) => {
    values.ownerId = currentUser?.id;

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

        <Button
          type="primary"
          htmlType="submit"
          className="bg-primary submit-button"
        >
          Tạo tòa nhà mới
        </Button>
      </Form>
    </Card>
  );
}
