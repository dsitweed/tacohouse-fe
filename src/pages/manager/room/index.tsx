import { Card, Col, Dropdown, MenuProps, Row, Typography } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';

const { Title, Text } = Typography;
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

export default function Room() {
  return (
    <Card>
      <Row gutter={[24, 24]} className="mb-6">
        <Col md={24} lg={12} className="flex justify-between">
          <div>
            <Title level={4} style={{ marginBottom: 0 }}>
              Room 1
            </Title>
            <Text className=" text-gray-600">Building A1</Text>
          </div>
          <div>
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <BsThreeDotsVertical size={18} />
              </a>
            </Dropdown>
          </div>
        </Col>
        <Col md={24} lg={12}></Col>
      </Row>
    </Card>
  );
}
