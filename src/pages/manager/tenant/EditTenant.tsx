import { TenantEntity } from '@/models';
import { TenantService } from '@/services';
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

// images mock
import face4 from '@/assets/images/face-4.jpg';

export default function EditTenant() {
  const [form] = Form.useForm();
  const [tenant, setTenant] = useState<TenantEntity>();
  const paths = window.location.pathname.split('/');
  const tenantId =
    Number(paths[paths.length - 1]) || Number(paths[paths.length - 2]);

  useEffect(() => {
    const fetch = async () => {
      const tenant = (await TenantService.getTenant(tenantId)) as TenantEntity;
      setTenant(tenant);
    };

    fetch();
  }, [tenant]);

  return !tenant ? (
    <Card>Không có tenant</Card>
  ) : (
    <Card>
      <Typography.Title level={3}>Thông tin: {tenant.name}</Typography.Title>
      <Form form={form} layout="vertical" autoComplete="true">
        <Form.Item>
          <Avatar shape="square" src={face4} size={150} />
        </Form.Item>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <Form.Item name="name" label="Tên" initialValue={tenant.name}>
              <Input placeholder={tenant.name} />
            </Form.Item>
            <Form.Item name="dob" label="Ngày tháng năm sinh">
              <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>

            <Form.Item
              name="address"
              label="Quê quán"
              initialValue={tenant.address}
            >
              <Input placeholder={tenant.address} />
            </Form.Item>

            <Form.Item
              name="citizenNumber"
              label="Sô CCCD"
              initialValue={tenant.citizenNumber}
            >
              <Input placeholder="Số căn cước công dân" />
            </Form.Item>
            <Form.Item name="tenantPicture" label="Ảnh chân dung - 1 bức">
              <Typography.Title level={5}>
                Ảnh chân dung sau này cho phép up ảnh - 1 cái
              </Typography.Title>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="room" label="Phòng" initialValue={tenant.room}>
              <Input />
            </Form.Item>
            <Form.Item
              name="building"
              label="Tòa nhà"
              initialValue={tenant.building}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              initialValue={tenant.phone}
            >
              <Input />
            </Form.Item>
            <Form.Item name="citizenPicture" label="Ảnh thẻ căn cước - 2 bức">
              <Typography.Title level={5}>
                Ảnh căn cước sau này cho phép up ảnh - 2 cái
              </Typography.Title>
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Chỉnh sửa thông tin
        </Button>
      </Form>
    </Card>
  );
}
