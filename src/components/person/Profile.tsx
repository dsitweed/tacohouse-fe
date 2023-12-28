import { getFullUserName } from '@/models';
import {
  App,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Typography,
} from 'antd';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { authActions, selectUser } from '@/store/slices/auth.slice';
import dayjs from 'dayjs';
import UploadImage from '../common/UploadImage';
import axios from 'axios';

export default function Profile() {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [avatarUrl, setAvatarUrl] = useState<string[]>(
    user?.avatarUrl ? [user.avatarUrl] : [],
  );
  const [citizenImageUrls, setCitizenImageUrls] = useState<string[]>(
    user?.citizenImageUrls ? user.citizenImageUrls : [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = async () => {
    if (!user) return;

    const values = form.getFieldsValue();

    const res = await axios.patch('/me', {
      ...values,
      avatarUrl: avatarUrl[0] || '',
      citizenImageUrls: citizenImageUrls,
    });

    if (res?.success) {
      notification.success({ message: 'Cập nhật thông tin thành công!' });
      dispatch(authActions.updateProfile(res.data.data));
    } else {
      notification.error({ message: 'Đã cố lỗi xảy ra. ' + res.message });
    }
  };

  if (!user) {
    return (
      <Card>
        <Empty />
      </Card>
    );
  }

  return (
    <Card>
      <Typography.Title level={3}>
        Thông tin: {getFullUserName(user)}
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        autoComplete="true"
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          roomId: user.room?.id,
          address: user.address,
          phoneNumber: user.phoneNumber,
          dob: user.dob && dayjs(user.dob),
          citizenNumber: user.citizenNumber,
        }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <Form.Item name="firstName" label="Tên">
              <Input placeholder="Nhập tên" />
            </Form.Item>
            <Form.Item name="lastName" label="Họ và tên đệm">
              <Input placeholder="Nhập tên đệm" />
            </Form.Item>

            <Form.Item name="dob" label="Ngày tháng năm sinh">
              <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>

            <Form.Item name="address" label="Quê quán">
              <Input placeholder="Quê quán" />
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
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="avatar" label="Ảnh chân dung - 1 bức (dưới 1MB)">
              <UploadImage
                imageUrls={avatarUrl}
                setImageUrls={setAvatarUrl}
                maxCount={1}
              />
            </Form.Item>
            <Form.Item
              name="citizenPictures"
              label="Ảnh thẻ căn cước - 2 bức (dưới 1MB)"
            >
              <UploadImage
                imageUrls={citizenImageUrls}
                setImageUrls={setCitizenImageUrls}
                maxCount={2}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" onClick={() => handleUpdate()}>
          Chỉnh sửa thông tin
        </Button>
      </Form>
    </Card>
  );
}
