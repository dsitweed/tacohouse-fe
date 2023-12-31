import { BuildingEntity } from '@/models/Building.entity';
import { useApiClient } from '@/shared/hooks/api';
import { Radio, Table, Typography, Progress, Button, Skeleton } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// building logo icon example
import buildingIcon from '@/assets/logo.png';
import { BUILDINGS_PATH } from '@/routes/routeNames';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

interface BuildingAnalyticProps {
  pageSize?: number;
}

export default function ManagerBuilding(props: BuildingAnalyticProps) {
  const navigate = useNavigate();
  const apiBuilding = useApiClient(BUILDINGS_PATH);
  const { t } = useTranslation();

  const [data, setData] = useState<BuildingEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await apiBuilding.getAll();

      if (response?.status) {
        setData(response.data.data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const columns: ColumnsType<BuildingEntity> = [
    {
      title: 'Building',
      dataIndex: 'build',
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            className="h-6 w-6"
            src={record.icon || buildingIcon}
            alt="building logo"
          />
          <div>
            <Link
              className="font-semibold"
              to={`/managers/buildings/${record.id}`}
            >
              {record.name}
            </Link>
            <p>{record.address}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Room',
      dataIndex: 'room',
      render: (_, record) => <p>{record.rooms.length}</p>,
    },
    {
      title: 'Tenant',
      dataIndex: 'tenant',
      render: (_, record) => {
        let sum = 0;
        record.rooms.map((room) => (sum += room.tenants.length));
        return <p>{sum}</p>;
      },
    },
    {
      title: 'Income',
      dataIndex: 'income',
      render: (_, record) => <p>{record.income?.toLocaleString()}$</p>,
    },
    {
      title: 'COMPLETION',
      dataIndex: 'completion',
      render: (_, record) => <Progress percent={record.completion} />,
    },
  ];

  return (
    <Skeleton loading={isLoading}>
      {/* BUILDING OVERVIEW HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={4}>{t('common.building')}</Title>
          <Paragraph>
            Done this month{' '}
            <span className="text-blue-600 font-bold text-base">40%</span>
          </Paragraph>
        </div>
        <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
          <Radio.Group onChange={onChange} defaultValue="a">
            <Radio.Button value="a">ALL</Radio.Button>
            <Radio.Button value="b">ONLINE</Radio.Button>
            <Radio.Button value="c">STORES</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      {/* LIST BUILDINGS */}
      <div className="ant-list-box table-responsive">
        <Table
          rowKey={'id'}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: props.pageSize || 5,
          }}
        />
      </div>

      <div className="w-full">
        <Button
          className="border border-black"
          onClick={() => navigate('/managers/buildings/new')}
        >
          <span>
            Click to Create <span className="font-bold">new building</span>
          </span>
        </Button>
      </div>
    </Skeleton>
  );
}
