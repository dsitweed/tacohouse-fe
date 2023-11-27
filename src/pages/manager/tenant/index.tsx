import { TenantEntity } from '@/models';
import { mockTenantSection } from '@/services';
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
import { FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const tenantsTableColumns: ColumnsType<TenantEntity> = [
  {
    title: 'Index',
    dataIndex: 'id',
    width: 20,
    render: (value, record, index) => <p>{index + 1}</p>,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    render: (_, record) => (
      <Link to={`/managers/tenants/${record.id}/edit`}>{record.name}</Link>
    ),
  },
  {
    title: 'Số phòng',
    dataIndex: 'room',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
  },
  {
    title: 'address',
    dataIndex: 'address',
  },
  {
    title: 'Số CCCD',
    dataIndex: 'citizenNumber',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (_, record) => (
      <Space>
        <Link to={`/managers/tenants/${record.id}/edit`}>Edit</Link>
        <Link to={'#'}>Delete</Link>
      </Space>
    ),
  },
];

export default function Tenant() {
  const navigate = useNavigate();

  return (
    <Card>
      <Row>
        <Col sm={24} md={24} lg={12}>
          <Typography.Title level={2}>Danh sách người thuê</Typography.Title>
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
                  label: 'Has left',
                  value: 1,
                },
              ]}
            />

            <Button
              type="primary"
              onClick={() => navigate('/managers/tenants/new')}
            >
              <FaPlus color={'white'} size={20} />
            </Button>
          </Space>
        </Col>

        <Table
          bordered
          rowKey={'id'}
          className="w-full"
          columns={tenantsTableColumns}
          dataSource={mockTenantSection}
        />
      </Row>
    </Card>
  );
}
