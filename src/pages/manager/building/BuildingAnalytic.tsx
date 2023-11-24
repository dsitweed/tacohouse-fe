import { BuildingEntity } from '@/models/Building.entity';
import { BuildingService } from '@/services/Building.service';
import { Radio, Table, Typography, Progress, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface BuildingAnalyticProps {
  pageSize?: number;
}

export default function ManagerBuilding(props: BuildingAnalyticProps) {
  const [data, setData] = useState<BuildingEntity[]>([]);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);

  useEffect(() => {
    const fetchData = async () => {
      const response = await BuildingService.getBuildings('Nguyen Van Ky');

      setData(response);
    };

    fetchData();
  }, []);

  const columns: ColumnsType<BuildingEntity> = [
    {
      title: 'Building',
      dataIndex: 'build',
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img className="h-6 w-6" src={record.icon} alt="building logo" />
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
    },
    {
      title: 'Tenant',
      dataIndex: 'tenant',
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
    <div>
      {/* BUILDING OVERVIEW HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={4}>Buildings</Title>
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
    </div>
  );
}
