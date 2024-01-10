import { Button, Divider, Form, Input, Select, Slider } from 'antd';
import { useTranslation } from 'react-i18next';

export default function FilterBar() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <div>
      <Form form={form} layout="vertical">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">Lọc</p>
          <Button htmlType="submit" type="primary" className="font-bold">
            Xác nhận
          </Button>
        </div>
        <Divider className="m-4 border" />
        <Form.Item label="Tên phòng">
          <Input placeholder="room name" />
        </Form.Item>
        <Form.Item label="address">
          <Input placeholder="room address" />
        </Form.Item>
        <div className="flex gap-4 items-center">
          <p className="basis-1/4">Giá tiền (VND)</p>
          <Form.Item name="price" className="basis-3/4 m-0 pr-6">
            <Slider
              range
              step={100000}
              min={100000}
              max={10000000}
              defaultValue={[1000000, 8000000]}
              tooltip={{
                formatter: (value) => value?.toLocaleString(),
              }}
            />
          </Form.Item>
        </div>
        <div className="flex gap-4 items-center">
          <p className="basis-1/4">Diện tích</p>
          <Form.Item name="area" className="basis-3/4 m-0 pr-6">
            <Slider
              range
              min={10}
              max={100}
              defaultValue={[20, 80]}
              tooltip={{
                formatter: (value) => value?.toLocaleString(),
              }}
            />
          </Form.Item>
        </div>
        <Form.Item label="Loại" name="type">
          <Select placeholder={t('common.requiredTrue')} />
        </Form.Item>
        <Button className="w-full text-primary font-bold border-primary hover:bg-primary-container">
          Đặt lại
        </Button>
      </Form>
    </div>
  );
}
