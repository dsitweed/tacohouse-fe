import { Card, Col, Radio, Row, Typography } from 'antd';
import BuildingAnalytic from './BuildingAnalytic';
import BuildingUnitPrice from './buildingUnitPrice';

export default function ManagerBuilding() {
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
