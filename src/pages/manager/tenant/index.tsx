import { TenantEntity } from '@/models';
import { MANAGERS_PATH, routes } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import {
  App,
  Button,
  Card,
  Col,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function Tenant() {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const apiManager = useApiClient(MANAGERS_PATH);

  const [tenants, setTenants] = useState<TenantEntity[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiManager.getAllExtend('/tenants');

        if (response?.success) {
          setTenants(response.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTenant = async (tenantId: number) => {
    const res = await apiManager.deleteByIdExtend('/tenant', tenantId);

    if (res?.success) {
      notification.success({
        message: 'Xóa người thuê trọ thành công',
      });
      const deletedTenant: TenantEntity = res.data.data;
      setTenants(tenants?.filter((tenant) => tenant.id !== deletedTenant.id));
    }
  };

  const tenantsTableColumns: ColumnsType<TenantEntity> = [
    {
      title: 'Index',
      dataIndex: 'id',
      width: 20,
      render: (_value, _record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      render: (_, record) => (
        <Link to={`/managers/tenants/${record.id}/edit`}>
          {record.lastName} {record.firstName}
        </Link>
      ),
    },
    {
      title: 'Số phòng',
      dataIndex: 'room',
      render: (_, record) => (
        <Link to={`${routes.managers.rooms.index}/${record.roomId}`}>
          {record.room?.name}
        </Link>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },

    {
      title: 'Số CCCD',
      dataIndex: 'citizenNumber',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'Năm sinh',
      dataIndex: 'dob',
      render: (value) => <p>{dayjs(value).format('DD/MM/YYYY')}</p>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space>
          <Link to={`/managers/tenants/${record.id}/edit`}>Edit</Link>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa"
            onConfirm={() => handleDeleteTenant(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Row gutter={[24, 12]}>
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
          dataSource={tenants}
        />
      </Row>
    </Card>
  );
}
