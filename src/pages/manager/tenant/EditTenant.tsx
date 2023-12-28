import { RoomEntity, UserEntity, getFullUserName } from '@/models';
import {
  App,
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';

// images mock
import face4 from '@/assets/images/face-4.jpg';
import { useApiClient } from '@/shared/hooks/api';
import { MANAGERS_PATH } from '@/routes/routeNames';
import dayjs from 'dayjs';

export default function EditTenant() {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [tenant, setTenant] = useState<UserEntity>();
  const [rooms, setRooms] = useState<RoomEntity[]>();
  const paths = window.location.pathname.split('/');
  // single page (/tenantId) -> -1, edit page -> -2 (/tenantId/edit)
  const tenantId =
    Number(paths[paths.length - 1]) || Number(paths[paths.length - 2]);

  const apiManager = useApiClient(MANAGERS_PATH);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiManager.getByIdExtend('/tenant', tenantId);

      if (res?.success) {
        setTenant(res.data.data);
      }
    };

    const fetchRoom = async () => {
      const res = await apiManager.getAllExtend('/rooms');

      if (res?.success) {
        setRooms(res.data.data);
      }
    };

    fetchData();
    fetchRoom();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = async (values: any) => {
    const res = await apiManager.updateExtend('/tenant', tenantId, {
      ...values,
      dob: values.dob.$d,
    });

    if (res?.success) {
      notification.success({
        message: 'Thay đổi thông tin người thuê thành công',
      });
      setTenant(res.data.data);
    }
  };

  const selectRoomOptions = useMemo(() => {
    if (tenant?.room === null) return rooms;

    return rooms?.filter((item) => {
      if (
        // get room have same id with room tenant is living
        item.id === tenant?.roomId ||
        // Or room have number of tenant < maxTenant available
        item.tenants.length < (Number(item.maxTenant) || 0)
      )
        return item;
    });
  }, [rooms]);

  if (!tenant) {
    return (
      <Card>
        <Empty />
      </Card>
    );
  }

  return (
    <Card>
      <Typography.Title level={3}>
        Thông tin: {getFullUserName(tenant)}
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        autoComplete="true"
        onFinish={handleUpdate}
        initialValues={{
          firstName: tenant.firstName,
          lastName: tenant.lastName,
          roomId: tenant.room?.id,
          address: tenant.address,
          phoneNumber: tenant.phoneNumber,
          dob: tenant.dob && dayjs(tenant.dob),
          citizenNumber: tenant.citizenNumber,
        }}
      >
        <Form.Item>
          <Avatar shape="square" src={face4} size={150} />
        </Form.Item>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <Form.Item name="lastName" label="Họ và tên đệm">
              <Input />
            </Form.Item>

            <Form.Item name="dob" label="Ngày tháng năm sinh">
              <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>

            <Form.Item name="address" label="Quê quán">
              <Input />
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
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="firstName" label="Tên">
              <Input />
            </Form.Item>

            <Form.Item name="roomId" label="Phòng">
              <Select
                options={selectRoomOptions?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>

            <Form.Item name="building" label="Tòa nhà">
              <p>
                Thuộc tòa nhà:
                <span className="font-bold"> {tenant.room?.building.name}</span>
              </p>
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
