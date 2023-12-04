import { BuildingEntity } from '@/models';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import BuildingUnitPrice from './buildingUnitPrice';
import { useNavigate } from 'react-router-dom';
import ListRooms from './ListRooms';
import { useApiClient } from '@/shared/hooks/api';
import { BUILDINGS_PATH } from '@/routes/routeNames';

export default function SingleBuilding() {
  const paths = window.location.pathname.split('/');
  const buildingId = Number(paths[paths.length - 1]);
  const [building, setBuilding] = useState<BuildingEntity>();
  const navigate = useNavigate();
  const apiBuilding = useApiClient(BUILDINGS_PATH);

  useEffect(() => {
    const fetch = async () => {
      const response = await apiBuilding.getById(buildingId);

      if (response && response.status === 200) {
        const building = response.data.data;
        setBuilding(building);
      }
    };

    fetch();
  }, []);

  return !building ? (
    <Card>
      <Typography.Title>Building not exits</Typography.Title>
    </Card>
  ) : (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card>
            <div className="flex justify-between">
              <Typography.Title level={3}>
                Building information
              </Typography.Title>
              <div className="flex gap-2">
                <Button onClick={() => navigate('/managers/rooms/new')}>
                  Create new room
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/managers/buildings/${building.id}/edit`)
                  }
                >
                  Edit building
                </Button>
              </div>
            </div>
            <div>
              <Typography.Title level={5}>
                Tên: {building.name}
              </Typography.Title>
              <Typography>Loại tòa nhà: {building.type}</Typography>
              <Typography>Địa chỉ: {building.address}</Typography>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Typography.Title level={3}>Building Services</Typography.Title>
            <BuildingUnitPrice buildingId={building.id} />
          </Card>
        </Col>

        {/* Rooms of Building */}
        <Card className="w-full">
          <Typography.Title level={4}>Danh sách các phòng</Typography.Title>
          <ListRooms buildingId={building.id} />
        </Card>
      </Row>
    </div>
  );
}
