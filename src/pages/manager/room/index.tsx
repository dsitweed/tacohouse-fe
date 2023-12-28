import { RoomEntity } from '@/models';
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
import RoomGridItem from './RoomGridItem';
import { FaPlus } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useApiClient } from '@/shared/hooks/api';
import { MANAGERS_PATH, ROOMS_PATH } from '@/routes/routeNames';
import { useEffect, useState } from 'react';

export default function ManagerRoom() {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const apiRoom = useApiClient(ROOMS_PATH);
  const apiManager = useApiClient(MANAGERS_PATH);
  const [rooms, setRooms] = useState<RoomEntity[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiManager.getAllExtend('/rooms');
      if (response && response.status === 200) {
        setRooms(response.data.data);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRoom = async (roomId: number) => {
    const res = await apiRoom.deleteById(roomId);

    if (res.success) {
      notification.success({
        message: 'Xóa phòng thành công',
      });

      const deletedRoom: RoomEntity = res.data.data;
      setRooms(rooms?.filter((item) => item.id !== deletedRoom.id));
    }
  };

  const propertyTableColumns: ColumnsType<RoomEntity> = [
    {
      title: 'Index',
      dataIndex: 'id',
      width: 20,
      render: (_value, _record, index) => <p>{index + 1}</p>,
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
      dataIndex: 'isActive', // isActive == true -> Want to show this room public
      render: (value) =>
        value === true ? (
          <p className="font-bold text-green-500">Current posting publicly</p>
        ) : (
          <p className="font-bold text-red-500">Private</p>
        ),
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
          <Link to={`/managers/rooms/${record.id}/edit`}>Edit</Link>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa"
            onConfirm={() => handleDeleteRoom(record.id)}
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
          className="w-full overflow-auto"
          columns={propertyTableColumns}
          dataSource={rooms}
        />
      </Row>
    </Card>
  );
}
