import { Button, Card, DatePicker, Form, Input, Typography } from 'antd';

export default function CreateTenant() {
  const [form] = Form.useForm();

  const createTenant = () => {};

  return (
    <Card>
      <Typography.Title level={3}>Tạo người thuê</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        autoComplete="true"
        onFinish={createTenant}
      >
        <Form.Item name="name" label="Phòng đang thuê (Có thể thêm sau)">
          <Input placeholder="Nhập số phòng" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên"
          rules={[{ required: true, message: 'Hãy nhập tên' }]}
        >
          <Input placeholder="Input building name" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Hãy nhập số điện thoại' }]}
        >
          <Input placeholder="Input building name" />
        </Form.Item>

        <Form.Item name="dob" label="Ngày tháng năm sinh">
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>

        <Form.Item name="address" label="Quê quán">
          <Input placeholder="Building address" />
        </Form.Item>

        <Form.Item name="citizenNumber" label="Sô CCCD">
          <Input placeholder="Số căn cước công dân" />
        </Form.Item>

        <Form.Item name="tenantPicture" label="Ảnh chân dung - 1 bức">
          <Typography.Title level={5}>
            Ảnh chân dung sau này cho phép up ảnh - 1 cái
          </Typography.Title>
        </Form.Item>
        <Form.Item name="citizenPicture" label="Ảnh thẻ căn cước - 2 bức">
          <Typography.Title level={5}>
            Ảnh chân dung sau này cho phép up ảnh - 1 cái
          </Typography.Title>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Tạo người thuê
        </Button>
      </Form>
    </Card>
  );
}
