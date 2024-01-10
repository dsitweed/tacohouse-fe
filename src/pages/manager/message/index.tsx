import { Col, Row } from 'antd';
import ListPartner from './ListPartner';
import ChatBox from './ChatBox';
import PartnerExpandInfo from './PartnerExpandInfo';

export default function ManagerMessage() {
  return (
    <Row className="bg-white h-full">
      <Col md={12} lg={5} className="h-full overflow-y-scroll scrollbar">
        <ListPartner />
      </Col>
      <Col md={12} lg={13} className="h-full">
        <ChatBox />
      </Col>
      <Col md={12} lg={6} className="h-full hidden lg:block">
        <PartnerExpandInfo />
      </Col>
    </Row>
  );
}
