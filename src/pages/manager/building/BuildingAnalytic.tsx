import { BuildingEntity } from '@/models/Building.entity';
import { BuildingService } from '@/services/Building.service';
import { Radio, Table, Typography, Progress } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import CreateBuilding from './CreateBuilding';

const { Title, Paragraph } = Typography;

interface BuildingAnalyticProps {
  pageSize?: number;
}

export default function BuildingAnalytic(props: BuildingAnalyticProps) {
  const [data, setData] = useState<BuildingEntity[]>([]);

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
      render: (text, record) => (
        <div className="flex gap-2 items-center">
          <img className="h-6 w-6" src={record.icon} alt="building logo" />
          <a>
            <p>{record.name}</p>
            <p className=" text-gray-500 hover:text-inherit">
              {record.address}
            </p>
          </a>
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
      render: (text, record) => <p>{record.income?.toLocaleString()}$</p>,
    },
    {
      title: 'COMPLETION',
      dataIndex: 'completion',
      render: (text, record) => <Progress percent={record.completion} />,
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
        <CreateBuilding />
      </div>
    </div>
  );
}
