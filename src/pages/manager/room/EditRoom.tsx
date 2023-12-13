import {
  App,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { BuildingEntity, RoomEntity } from '@/models';
import { useApiClient } from '@/shared/hooks/api';
import { BUILDINGS_PATH, ROOMS_PATH } from '@/routes/routeNames';

export default function EditRoom() {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [room, setRoom] = useState<RoomEntity>();
  const paths = window.location.pathname.split('/');
  const roomId = Number(paths[paths.length - 2]);

  const apiBuilding = useApiClient(BUILDINGS_PATH);
  const apiRoom = useApiClient(ROOMS_PATH);

  const [listBuilding, setListBuilding] = useState<BuildingEntity[]>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    // get this room information
    const fetchRoom = async () => {
      const response = await apiRoom.getById(roomId);

      if (response && response.status === 200) {
        setRoom(response.data.data);
      }
    };

    const fetchBuilding = async () => {
      const response = await apiBuilding.getAll();

      if (response?.status === 200) {
        setListBuilding(response.data.data);
      }
    };

    fetchRoom();
    fetchBuilding();
  }, [roomId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditRoom = async (values: any) => {
    const res = await apiRoom.update(roomId, {
      ...values,
    });

    if (res?.success) {
      notification.success({
        message: 'Thay đổi thông tin phòng thành công',
      });
    }

    console.log({
      values,
    });
  };

  return !room ? (
    <Card>No have this room</Card>
  ) : (
    <Card>
      {/* Basic room information + dropdown for Edit, delete func */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col md={24} lg={12} className="flex justify-between">
          <Typography.Title level={2}>
            Chỉnh sửa thông tin phòng
          </Typography.Title>
        </Col>
      </Row>

      <Row>
        <Col md={24} lg={24}>
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={handleEditRoom}
            initialValues={{
              buildingId: room.building.id,
              isActive: room.isActive,
              name: room.name,
              area: Number(room.area),
              maxTenant: room.maxTenant,
              price: room.price,
              deposit: room.deposit,
              debt: room.debt,
              description: room.description,
            }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="buildingId"
                  label="Thuộc tòa nhà"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={listBuilding?.map((building) => ({
                      label: building.name,
                      value: building.id,
                    }))}
                    placeholder="Chọn tòa nhà"
                  />
                </Form.Item>

                <Form.Item
                  name="buildingPictures"
                  label="Ảnh tòa nhà (tối đa 3 bức)"
                  valuePropName="fileList"
                  getValueFromEvent={normFile} // ? need research
                >
                  <Upload action="/upload.do" listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                {/* Problem: no match value to check box
                  https://stackoverflow.com/questions/65696317/antd-4-checkbox-doesnt-have-value-after-form-submit
                */}
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
              label="Số lượng người"
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

            <Form.Item label="Nợ" name="debt">
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
              label="Miêu tả (để đăng bài cho thuê)"
              name="description"
            >
              <Input.TextArea rows={10} />
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
