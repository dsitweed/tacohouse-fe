import { Card, Col, Radio, Row, TabsProps, Typography } from 'antd';
import { Tab } from 'rc-tabs/lib/interface';
import { useEffect, useState } from 'react';
import BuildingAnalytic from './BuildingAnalytic';
import BuildingUnitPrice from './buildingUnitPrice';
import ListRooms from './ListRooms';
import { BuildingEntity } from '@/models';
import { BuildingService as MockService } from '@/services/Building.service';

export default function ManagerBuilding() {
  const [buildings, setBuildings] = useState<BuildingEntity[]>([]);
  const [tabsBuilding, setTabsBuilding] = useState<Tab[]>([]);

  useEffect(() => {
    const handleData = async () => {
      const buildings = await MockService.getBuildings('Nguyen Van Ky');
      setBuildings(buildings);
      const tabs = getTabsBuilding(buildings);
      setTabsBuilding(tabs);
    };

    handleData();
  }, [buildings]);

  const getTabsBuilding = (data: BuildingEntity[]) => {
    const tabs: TabsProps['items'] = data.map((item) => ({
      key: `${item.id}`,
      label: item.name,
      children: <ListRooms buildingId={item.id} />,
    }));
    return tabs;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);

  return (
    <div>
      <Row gutter={[24, 24]} className=" mb-6">
        <Col xs={24} lg={16}>
          <Card bordered={false} className="h-full">
            <BuildingAnalytic />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={<p className="text-lg">Services</p>}
            className="mb-6 border"
          >
            <BuildingUnitPrice buildingId={1} />
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Row gutter={[12, 12]} className=" overflow-auto">
        <Card>
          <div>
            <div className="flex gap-4 justify-between w-full">
              <Typography.Title level={4}>List rooms</Typography.Title>
              <Radio.Group onChange={onChange} defaultValue={'a'}>
                <Radio.Button value={'a'}>Incomplete</Radio.Button>
                <Radio.Button value={'b'}>Completed</Radio.Button>
              </Radio.Group>
            </div>
            {/* SHOW LIST ROOMS OF BUILDING + CAN CHANGE BUILDINGS */}
          </div>
        </Card>
      </Row>
    </div>
  );
}
