import { RoomEntity } from '@/models';
import { MANAGERS_PATH, routes } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import {
  App,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateTenant() {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const [listRooms, setListRooms] = useState<RoomEntity[]>();
  const apiManager = useApiClient(MANAGERS_PATH);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiManager.getAllExtend('/rooms');
      if (res?.success) {
        setListRooms(res.data.data);
      }
    };

    fetchData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createTenant = async (values: any) => {
    const response = await apiManager.createExtend('/tenant', {
      ...values,
      dob: values.dob.$d,
    });

    if (response?.success) {
      notification.success({
        message: 'Thêm người thuê trọ thành công',
      });
      navigate(routes.managers.tenants.index);
    } else {
      notification.error({
        message: response?.message,
      });
    }
  };

  return (
    <Card>
      <Typography.Title level={3}>Tạo người thuê</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        autoComplete="true"
        onFinish={createTenant}
      >
        <Form.Item
          name="roomId"
          label="Phòng đang thuê"
          rules={[{ required: true, message: 'Hãy chọn phòng đang thuê' }]}
        >
          <Select
            placeholder="Chọn phòng đang thuê"
            options={listRooms?.map((room) => ({
              label: `${room.name} - ${room.building.name}`,
              value: room.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Họ và tên đệm"
          rules={[{ required: true, message: 'Hãy nhập họ và tên' }]}
        >
          <Input placeholder="Nhập họ và tên đệm" />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="Tên"
          rules={[{ required: true, message: 'Hãy nhập tên' }]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Hãy nhập số điện thoại' },
            {
              len: 10,
              message: 'Hãy nhập số điện thoại 10 chữ số',
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Ngày tháng năm sinh"
          rules={[{ required: true, message: 'Hãy nhập ngày tháng năm sinh' }]}
        >
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Quê quán"
          rules={[{ required: true, message: 'Hãy nhập quê quán' }]}
        >
          <Input placeholder="Building address" />
        </Form.Item>

        <Form.Item
          name="citizenNumber"
          label="Sô CCCD"
          rules={[
            { required: true, message: 'Hãy nhập số điện thoại' },
            {
              len: 12,
              message: 'Hãy nhập CCCD 12 chữ số',
            },
          ]}
        >
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
