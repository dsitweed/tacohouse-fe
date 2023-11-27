import {
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
  SelectProps,
  Typography,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import {
  RoomService,
  mockBuildingSection,
  mockTenantSection,
} from '@/services';
import { RoomEntity } from '@/models';

const facilitiesSelectOption: SelectProps['options'] = [
  {
    label: 'Điều hòa',
    value: 1,
  },
  {
    label: 'Bình nóng lạnh',
    value: 2,
  },
  {
    label: 'Tủ lạnh',
    value: 3,
  },
];

const buildingsSelectOptions: SelectProps['options'] = mockBuildingSection.map(
  (item) => ({
    label: item.name,
    value: item.id,
  }),
);

export default function EditRoom() {
  const [form] = Form.useForm();
  const [room, setRoom] = useState<RoomEntity>();
  const [isActive, setIsActive] = useState(false);
  const paths = window.location.pathname.split('/');
  const roomId = Number(paths[paths.length - 2]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    const fetch = async () => {
      const room = (await RoomService.getRoom(roomId)) as RoomEntity;
      setRoom(room);
    };

    fetch();
  }, [room]);

  return !room ? (
    <Card>No have this room</Card>
  ) : (
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
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="building"
                  label="Thuộc tòa nhà"
                  rules={[{ required: true }]}
                  initialValue="room.buildingName"
                >
                  <Select
                    options={buildingsSelectOptions}
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

                <Form.Item>
                  <Checkbox
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  >
                    Phòng đã được thuê
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="tenants"
                  label="Chọn người đang thuê"
                  initialValue={room.tenant_name}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Chọn người đang thuê"
                    options={mockTenantSection.map((tenant) => {
                      return {
                        label: `${tenant.name} - ${tenant.room}`,
                        value: `${tenant.id}`,
                      };
                    })}
                  />
                </Form.Item>
                <Typography.Title level={5}>
                  Chỉnh sửa lúc chọn người thuê phòng hiển thị như lúc view
                  singgleRoom
                </Typography.Title>
              </Col>
            </Row>

            <Form.Item
              label="Tên phòng"
              name="name"
              rules={[{ required: true }]}
              initialValue={room.name}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Diện tích"
              name="area"
              rules={[{ required: true }]}
              initialValue={room.area}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số lượng người"
              name="maxTenant"
              rules={[{ required: true }]}
              initialValue={room.max_number_tenant}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giá thuê"
              name="price"
              rules={[{ required: true }]}
              initialValue={room.price}
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
              initialValue={room.deposit}
            >
              <InputNumber
                style={{
                  width: 600,
                }}
              />
            </Form.Item>

            <Form.Item label="Nợ" name="debt" initialValue={room.debt}>
              <InputNumber
                style={{
                  width: 600,
                }}
              />
            </Form.Item>

            <Form.Item label="Ngày phòng sẽ trống" name="dateBecomeAvailable">
              <DatePicker />
            </Form.Item>

            <Form.Item label="Ngày thu tiền" name="dueDate" initialValue={31}>
              <InputNumber
                min={1}
                max={31}
                style={{
                  width: 600,
                }}
              />
            </Form.Item>

            <Form.Item
              label="Miêu tả (để đăng bài cho thuê)"
              name="description"
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Các tiện ích" name="facilities">
              <Select
                mode="multiple"
                allowClear
                placeholder="Chọn các tiện ích của phòng"
                options={facilitiesSelectOption}
              ></Select>
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
