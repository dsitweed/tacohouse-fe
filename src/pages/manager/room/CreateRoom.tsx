import {
  App,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd';

import { useEffect, useState } from 'react';
import { useApiClient } from '@/shared/hooks/api';
import { MANAGERS_PATH, ROOMS_PATH } from '@/routes/routeNames';
import { BuildingEntity, RoomEntity } from '@/models';
import UploadImage from '@/components/common/UploadImage';

export default function CreateRoom() {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const apiManager = useApiClient(MANAGERS_PATH);
  const apiRoom = useApiClient<RoomEntity>(ROOMS_PATH);
  const [buildings, setBuildings] = useState<BuildingEntity[]>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await apiManager.getAllExtend('/buildings');

      if (response && response.status === 200) {
        setBuildings(response.data.data);
      }
    };

    fetchBuildings();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelCreate = async (values: any) => {
    const res = await apiRoom.create({
      ...values,
      imageUrls: imageUrls.map((url) => url),
    });

    if (res?.success) {
      notification.success({ message: 'Tạo phòng thành công' });
    }
  };

  return (
    <Card>
      {/* Basic room information + dropdown for Edit, delete func */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col md={24} lg={12} className="flex justify-between">
          <Typography.Title level={2}>Tạo phòng mới</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col md={24} lg={24}>
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            name="edit_room"
            onFinish={handelCreate}
            onFinishFailed={(err) => console.error(err)}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="buildingId"
                  label="Thuộc tòa nhà"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={buildings?.map((building) => {
                      return {
                        label: building.name,
                        value: building.id,
                      };
                    })}
                    placeholder="Chọn tòa nhà"
                  />
                </Form.Item>

                <Form.Item
                  name="imageUrls"
                  label="Ảnh phòng trọ (tối đa 3 bức)"
                >
                  <UploadImage
                    imageUrls={imageUrls}
                    setImageUrls={setImageUrls}
                    maxCount={3}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="isActive"
                  valuePropName="checked"
                  label="Muốn đăng bài?"
                >
                  <Checkbox>
                    <Tooltip title="Nếu tích sẽ đăng bài công khai">
                      <p>Đăng bài</p>
                    </Tooltip>
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Tên phòng"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giá thuê"
              name="price"
              rules={[{ required: true }]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value!.replace(/,/g, '')}
                style={{
                  width: 600,
                }}
              />
            </Form.Item>

            <Form.Item
              label="Diện tích"
              name="area"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{
                  width: 600,
                }}
              />
            </Form.Item>

            <Form.Item
              label="Số lượng người tối đa ở"
              name="maxTenant"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{
                  width: 600,
                }}
              />
            </Form.Item>

            <Form.Item
              label="Tiền đặt cọc"
              name="deposit"
              rules={[{ required: true }]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value!.replace(/,/g, '')}
                style={{
                  width: 600,
                }}
              />
            </Form.Item>

            <Form.Item label="Ngày thu tiền" name="dueDate">
              <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>

            <Form.Item
              label="Miêu tả (để đăng bài cho thuê)"
              name="description"
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary submit-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
