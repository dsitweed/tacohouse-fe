import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  MenuProps,
  Row,
  Select,
  SelectProps,
  Typography,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { mockBuildingSection } from '@/services';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    icon: null,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];

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

export default function CreateRoom() {
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Card>
        {/* Basic room information + dropdown for Edit, delete func */}
        <Row gutter={[24, 24]} className="mb-6">
          <Col md={24} lg={12} className="flex justify-between">
            <Typography.Title level={2}>Tạo phòng mới</Typography.Title>
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <BsThreeDotsVertical size={18} />
              </a>
            </Dropdown>
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
              <Form.Item
                name="building"
                label="Thuộc tòa nhà"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: 600 }}
                  options={buildingsSelectOptions}
                  placeholder="Chọn tòa nhà"
                />
              </Form.Item>
              <Form.Item
                label="Upload"
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
                <Input />
              </Form.Item>

              <Form.Item
                label="Số lượng người"
                name="maxTenant"
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
    </>
  );
}
