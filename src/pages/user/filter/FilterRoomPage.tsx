import { Col, Row } from 'antd';
import FilterBar from './FilterBar';
import RoomGrid from '../dashboard/ListingRoom/RoomGrid';

export default function FilterRoomPage() {
  return (
    <Row className="bg-white p-4 rounded-md">
      <Col md={12} lg={7}>
        <FilterBar />
      </Col>
      <Col md={12} lg={17}>
        <RoomGrid />
      </Col>
    </Row>
  );
}
