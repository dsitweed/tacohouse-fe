import { Col, Row, Typography } from 'antd';
import {
  FaInfoCircle,
  FaClock,
  FaPhone,
  FaFax,
  FaSmokingBan,
  FaDog,
} from 'react-icons/fa';

export default function HotelInformation() {
  return (
    <div>
      <Typography className="text-4xl">Hotel Information</Typography>
      <Row className="mt-6">
        <Col xs={24} sm={12} md={6} className="flex gap-3">
          <FaInfoCircle size={22} color="blue" />
          <Col className="w-4/5">
            <Typography.Title level={5}>HOTEL ALERT</Typography.Title>
            <Typography className=" text-slate-600 text-base">
              Some hotel features, including vitae, varius ipsum ultrices
              adipiscing senectus turpis non due to COVID-19.
            </Typography>
          </Col>
        </Col>
        <Col xs={24} sm={12} md={6} className="flex flex-col gap-5 pl-16">
          <div className="flex gap-3">
            <FaClock size={22} color="blue" />
            <div>
              <Typography.Title level={5}>CHECK IN</Typography.Title>
              <Typography className="text-slate-600 text-base">
                04:00 PM
              </Typography>
            </div>
          </div>
          <div className="flex gap-3">
            <FaClock size={22} color="blue" />
            <div>
              <Typography.Title level={5}>CHECK OUT</Typography.Title>
              <Typography className="text-slate-600 text-base">
                11:00 AM
              </Typography>
            </div>
          </div>
        </Col>

        {/* CONTACT WAYS */}
        <Col xs={24} sm={12} md={6} className="flex flex-col gap-5 pl-16">
          <div className="flex gap-3">
            <FaPhone size={22} color="blue" />
            <div>
              <Typography.Title level={5}>PHONE NUMBER</Typography.Title>
              <Typography className="text-slate-600 text-base">
                (84) 038 504 5958
              </Typography>
            </div>
          </div>
          <div className="flex gap-3">
            <FaFax size={22} color="blue" />
            <div>
              <Typography.Title level={5}>FAX NUMBER</Typography.Title>
              <Typography className="text-slate-600 text-base">
                (415) 234-5678
              </Typography>
            </div>
          </div>
        </Col>

        {/* RULES */}
        <Col xs={24} sm={12} md={6} className="flex flex-col gap-5 pl-16">
          <div className="flex gap-3">
            <FaSmokingBan size={22} color="blue" />
            <div>
              <Typography.Title level={5}>NO SMOKING</Typography.Title>
              <Typography className="text-slate-600 text-base">
                100% Smoke free
              </Typography>
            </div>
          </div>
          <div className="flex gap-3">
            <FaDog size={22} color="blue" />
            <div>
              <Typography.Title level={5}>PET POLICY</Typography.Title>
              <Typography className="text-slate-600 text-base">
                Pet allowed: Yes
              </Typography>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
