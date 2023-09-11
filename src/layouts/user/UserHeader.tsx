import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';
import { Button, Col, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ChangeLanguage from '@/components/common/ChangeLanguage';

export default function UserHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Row gutter={[24, 24]}>
      <Col xs={12} lg={4}>
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={logo} className="w-12 h-12" alt="web logo" />
          <Typography.Title level={3} className="font-bold text-2xl mt-2">
            {t('webName')}
          </Typography.Title>
        </div>
      </Col>
      <Col
        lg={16}
        className="hidden pl-8 lg:flex items-center gap-6 font-semibold"
      >
        <Link to="#" className=" text-base">
          Rooms
        </Link>
        <Link to="#" className=" text-base">
          Chat
        </Link>
      </Col>
      <Col xs={12} lg={4} className="flex items-center justify-end gap-4">
        <ChangeLanguage />
        <Button className="border border-primary">
          <Link to={'/auth/sign-in'} className="font-bold">
            Sign In
          </Link>
        </Button>
      </Col>
    </Row>
  );
}
