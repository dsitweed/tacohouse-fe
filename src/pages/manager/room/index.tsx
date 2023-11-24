import { RoomEntity } from '@/models';
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import RoomGridItem from './RoomGridItem';
import { mockRoomsSection } from '@/services';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const propertyTableColumns: ColumnsType<RoomEntity> = [
  {
    title: 'Index',
    dataIndex: 'id',
    width: 20,
    render: (value, record, index) => <p>{index + 1}</p>,
  },
  {
    title: 'Property',
    render: (_, record) => <RoomGridItem room={record} />,
  },
  {
    title: 'Date published',
    dataIndex: 'datePublished',
    render: () => <p>12/11/2023. Fake</p>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: () => <p>Rent. Fake</p>,
  },
  {
    title: 'View',
    dataIndex: 'view',
    render: () => <p>12. Fake</p>,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (_, record) => (
      <Space>
        <a href="">Edit</a>
        <a href="">Delete</a>
      </Space>
    ),
  },
];

export default function ManagerRoom() {
  const navigate = useNavigate();

  return (
    <Card>
      <Row gutter={[24, 12]}>
        <Col sm={24} md={24} lg={12}>
          <Typography.Title level={2}>Danh sách các phòng</Typography.Title>
        </Col>
        <Col sm={24} md={24} lg={12}>
          <Space wrap>
            <Input.Search />
            <Select
              style={{ width: 120 }}
              options={[
                {
                  label: 'Renting',
                  value: 0,
                },
                {
                  label: 'Available',
                  value: 1,
                },
              ]}
            />

            <Button
              className="bg-primary"
              onClick={() => navigate('/managers/rooms/new')}
            >
              <FaPlus color={'white'} size={20} />
            </Button>
          </Space>
        </Col>

        <Table
          bordered={true}
          rowKey={'id'}
          className="w-full"
          columns={propertyTableColumns}
          dataSource={mockRoomsSection}
        />
      </Row>
    </Card>
  );
}
