import { BuildingEntity } from '@/models';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import BuildingService from './BuildingService';
import { BuildingService as MockService } from '@/services/Building.service';
import { useNavigate } from 'react-router-dom';
import ListRooms from './ListRooms';

export default function SingleBuilding() {
  const paths = window.location.pathname.split('/');
  const buildingId = Number(paths[paths.length - 1]);
  const [building, setBuilding] = useState<BuildingEntity>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const building = (await MockService.getBuilding(
        buildingId,
      )) as BuildingEntity;

      setBuilding(building);
    };

    fetch();
  }, [building]);

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
              <Typography.Title level={5}>{building.name}</Typography.Title>
              <Typography>{building.address}</Typography>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Typography.Title level={3}>Building Services</Typography.Title>
            <BuildingService building_id={building.id} />
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
