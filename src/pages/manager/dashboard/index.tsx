import { Card, Col, Row, Typography, Button, Timeline } from 'antd';
import {
  RightOutlined,
  ShoppingCartOutlined,
  HeartFilled,
  UsergroupAddOutlined,
  DollarTwoTone,
} from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';

import card from '@/assets/images/info-card-1.jpg';
import LineChart from '@/components/chart/line-chart';
import BarChart from '@/components/chart/bar-chart';
import BuildingAnalytic from '../building/BuildingAnalytic';
import SEO from '@/components/common/SEO';

type ItemTimeLine = {
  title: string;
  time: string;
  color: string;
};

const timelineList: ItemTimeLine[] = [
  {
    title: '$2,400 - Redesign store',
    time: '09 JUN 7:20 PM',
    color: 'green',
  },
  {
    title: 'New order #3654323',
    time: '08 JUN 12:20 PM',
    color: 'green',
  },
  {
    title: 'Company server payments',
    time: '04 JUN 3:10 PM',
    color: 'green',
  },
  {
    title: 'New card added for order #4826321',
    time: '02 JUN 2:45 PM',
    color: 'red',
  },
  {
    title: 'Unlock folders for development',
    time: '18 MAY 1:30 PM',
    color: 'red',
  },
  {
    title: 'New order #46282344',
    time: '14 MAY 3:30 PM',
    color: 'gray',
  },
];

export default function ManagerDashboard() {
  const { Title, Text } = Typography;

  const count = [
    {
      today: 'Today’s Sales',
      title: '$53,000',
      persent: '+30%',
      icon: <DollarTwoTone style={{ fontSize: 24, color: 'white' }} />,
      color: '#52c41a', // green
    },
    {
      today: 'Today’s Users',
      title: '3,200',
      persent: '+20%',
      icon: <UsergroupAddOutlined style={{ fontSize: 24, color: 'white' }} />,
      color: '#52c41a', // green
    },
    {
      today: 'New Clients',
      title: '+1,200',
      persent: '-20%',
      icon: <HeartFilled style={{ fontSize: 24, color: 'white' }} />,
      color: 'red',
    },
    {
      today: 'New Orders',
      title: '$13,200',
      persent: '10%',
      icon: <ShoppingCartOutlined style={{ fontSize: 24, color: 'white' }} />,
      color: '#52c41a', // green
    },
  ];

  return (
    <div>
      <SEO title="Manager | Home Page" />
      {/* OVER VIEW CARDS */}
      <Row gutter={[24, 24]}>
        {count.map((c, index) => (
          <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6}>
            <Card bordered={false}>
              <Row align="middle" gutter={[24, 0]}>
                <Col xs={18}>
                  <span>{c.today}</span>
                  <Title level={3}>
                    {c.title}{' '}
                    <small style={{ color: `${c.color}` }}>{c.persent}</small>
                  </Title>
                </Col>
                <Col xs={6} className="flex justify-end">
                  <div
                    className="flex justify-center items-center rounded-lg p-3"
                    style={{ backgroundColor: '#1890ff' }}
                  >
                    {c.icon}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={24} className="my-8">
        <Col xs={24} sm={24} md={12} lg={12} xl={10}>
          <Card bordered={false} className="h-full">
            <BarChart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={14}>
          <Card bordered={false} className="h-full">
            <LineChart />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 0]} className="my-8">
        <Col xs={24} sm={24} md={12} lg={12} xl={16}>
          <Card bordered={false} className="h-full">
            <BuildingAnalytic />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card bordered={false} className="h-full">
            <div>
              <Title level={5}>Orders History</Title>
              <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                This month{' '}
                <span className="text-light-green font-bold text-base">
                  20%
                </span>
              </Paragraph>

              <Timeline
                items={timelineList.map((item) => ({
                  color: item.color,
                  children: (
                    <div>
                      <Title level={5}>{item.title}</Title>
                      <Text>{item.time}</Text>
                    </div>
                  ),
                }))}
              />
              <Button type="primary" className="w-full" size="large">
                See details
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} sm={24} lg={12} xl={14}>
          <Card bordered={false} className="h-full">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12} sm={24} lg={12} xl={14}>
                <div className="h-full">
                  <div>
                    <Text className=" text-gray-500 font-bold">
                      Built by developers
                    </Text>
                    <Title level={4} style={{ marginTop: 0 }}>
                      Muse Dashboard for Ant Design
                    </Title>
                    <Paragraph>
                      From colors, cards, typography to complex elements, you
                      will find the full documentation.
                    </Paragraph>
                  </div>
                  <div>
                    <a href="#" className=" text-blue-500">
                      Read More
                      {<RightOutlined />}
                    </a>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12} sm={24} lg={12} xl={10} className="col-img">
                <div className="ant-cret flex justify-end">
                  <img
                    src={card}
                    alt="card"
                    className="rounded-xl w-auto object-cover"
                    style={{ height: '180px' }}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={12} sm={24} lg={12} xl={10}>
          <Card bordered={false} className="h-full">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Title level={4}>Work with the best</Title>
                <p>
                  Wealth creation is an evolutionarily recent positive-sum game.
                  It is all about who take the opportunity first.
                </p>
              </div>
              <div>
                <a href="#" className="text-blue-500">
                  Read More
                  <RightOutlined />
                </a>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
