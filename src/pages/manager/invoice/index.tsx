import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Typography,
} from "antd";

import {
  PlusOutlined,
  ExclamationOutlined,
  WifiOutlined,
  BankOutlined,
  EditFilled,
  DownloadOutlined,
  DeleteFilled,
  CalendarFilled,
  MinusOutlined,
} from "@ant-design/icons";

import mastercard from "@/assets/images/mastercard-logo.png";
import paypal from "@/assets/images/paypal-logo-2.png";
import visa from "@/assets/images/visa-logo.png";

import card_bg from "@/assets/images/info-card-3.jpg";
import Icon from "@/components/common/Icon";

const { Title, Text } = Typography;

export default function Invoice() {
  const data = [
    {
      title: "March, 01, 2021",
      description: "#MS-415646",
      amount: "$180",
    },
    {
      title: "February, 12, 2021",
      description: "#RV-126749",
      amount: "$250",
    },
    {
      title: "April, 05, 2020",
      description: "#FB-212562",
      amount: "$550",
    },
    {
      title: "June, 25, 2019",
      description: "#QW-103578",
      amount: "$400",
    },
    {
      title: "March, 03, 2019",
      description: "#AR-803481",
      amount: "$700",
    },
  ];

  const information = [
    {
      title: "Oliver Liam",
      description: "Viking Burrito",
      address: "oliver@burrito.com",
      vat: "FRB1235476",
    },
    {
      title: "Lucas Harper",
      description: "Stone Tech Zone",
      address: "lucas@syone-tech.com",
      vat: "FRB1235476",
    },
    {
      title: "Oliver Liam",
      description: "ethan@fiber.com",
      vat: "NumberFRB1235476",
    },
  ];

  const newest = [
    {
      headding: <h6>NEWEST</h6>,
      avatar: <MinusOutlined />,
      title: "Netflix",
      description: "27 March 2021, at 12:30 PM",
      amount: "- $2,500",
      type: "minus",
    },
    {
      avatar: <PlusOutlined />,
      title: "Apple",
      description: "27 March 2021, at 04:30 AM",
      amount: "+ $2,000",
      type: "plus",
    },
  ];

  const yesterday = [
    {
      avatar: <PlusOutlined />,
      title: "Stripe",
      description: "26 March 2021, at 12:30 AM",
      amount: "+ $750",
      type: 'plus',
    },
    {
      avatar: <PlusOutlined />,
      title: "HubSpot",
      description: "26 March 2021, at 11:30 AM",
      amount: "+ $1,050",
      textclass: "text-fill",
      amountcolor: "text-success",
      type: 'plus',
    },
    {
      avatar: <PlusOutlined />,
      title: "Creative Tim",
      description: "26 March 2021, at 07:30 AM",
      amount: "+ $2,400",
      type: 'plus',
    },
    {
      avatar: <ExclamationOutlined />,
      title: "Webflow",
      description: "26 March 2021, at 04:00 AM",
      amount: "Pending",
      type: 'plus',
    },
  ];

  return (
    <div>
      <Row gutter={[24, 0]} className="mb-8">
        <Col xs={24} md={16}>
          <Row gutter={[24, 24]} className="h-full">
            {/* Manager card information */}
            <Col xs={24} xl={12}>
              <Card
                bordered={false}
                className="card-credit h-full text-white"
                style={{
                  backgroundImage: `url(${card_bg})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div>
                  <WifiOutlined style={{ fontSize: 28, marginBottom: 30 }} />
                </div>
                <h5
                  className="mb-11 text-xl font-semibold"
                  style={{ wordSpacing: 10, fontFamily: "monospace" }}
                >
                  <span>4562 1122 4594 7852</span>
                </h5>

                <div className="card-footer flex items-center gap-6">
                  <div className="flex flex-col">
                    <p>Card Holder</p>
                    <h6 className="text-base font-bold">Jack Peterson</h6>
                  </div>
                  <div className="flex flex-col">
                    <p>Expires</p>
                    <h6 className="text-base font-bold">11/22</h6>
                  </div>
                  <div className="ml-auto">
                    <img
                      src={mastercard}
                      alt="mastercard"
                      className=" w-13 h-8"
                    />
                  </div>
                </div>
              </Card>
            </Col>

            {/* Total expense: Employee payments or other maintenance costs */}
            <Col xs={12} xl={6}>
              <Card bordered={false} className="h-full">
                <div className="flex flex-col text-center">
                  <div className="flex justify-center mb-2">
                    <Icon icon={<BankOutlined />} />
                  </div>
                  <Title level={5}>Salary</Title>
                  <p className="text-gray-400">Belong Interactive</p>
                  <Title level={4} className="mt-6">
                    <PlusOutlined />
                    $2,000
                  </Title>
                </div>
              </Card>
            </Col>

            {/* Total income */}
            <Col xs={12} xl={6}>
              <Card bordered={false} className="h-full">
                <div className="flex flex-col text-center">
                  <div className="flex justify-center mb-2">
                    <Icon
                      icon={
                        <img src={paypal} height={22} width={22} alt="paypal" />
                      }
                    />
                  </div>
                  <Title level={5}>Paypal</Title>
                  <p className="text-gray-400">Freelance Paymente</p>
                  <Title level={4} className="mt-6">
                    <PlusOutlined />
                    $49,000
                  </Title>
                </div>
              </Card>
            </Col>

            {/* Payment methods */}
            <Col xs={24}>
              <Card
                className="h-full"
                title={
                  <div className="flex justify-between">
                    <h6 className="font-semibold">Payment Methods</h6>
                    <Button className="bg-primary" type="primary">
                      ADD NEW CARD
                    </Button>
                  </div>
                }
              >
                <Row gutter={[24, 12]}>
                  <Col span={24} lg={12}>
                    <Card className="h-full">
                      <div className="flex items-center gap-3">
                        <img
                          src={mastercard}
                          alt="mastercard"
                          className=" w-8 h-5"
                        />
                        <span style={{ wordSpacing: 10, fontSize: 16 }}>
                          **** **** **** 7362
                        </span>
                        <Button type="link" className="flex items-center">
                          <EditFilled
                            style={{ color: "black", fontSize: 16 }}
                          />
                        </Button>
                      </div>
                    </Card>
                  </Col>
                  <Col span={24} lg={12}>
                    <Card className="h-full">
                      <div className="flex items-center gap-3">
                        <img src={visa} alt="visa" className=" w-8 h-5" />
                        <span style={{ wordSpacing: 10, fontSize: 16 }}>
                          **** **** **** 3288
                        </span>
                        <Button type="link" className="flex items-center">
                          <EditFilled
                            style={{ color: "black", fontSize: 16 }}
                          />
                        </Button>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={8}>
          <Card
            bordered={false}
            className="h-full"
            title={<Title level={4}>Invoices</Title>}
            extra={
              <Button className="bg-primary" type="primary">
                <span>VIEW ALL</span>
              </Button>
            }
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item
                  key={`invoices-list-${index}`}
                  actions={[
                    <Button
                      className="flex flex-col justify-center items-center"
                      type="link"
                    >
                      <DownloadOutlined /> PDF
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className="amount">{item.amount}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 0]}>
        {/* Bill information */}
        <Col span={24} lg={16} className="mb-8">
          <Card
            className="h-full"
            bordered={false}
            title={<p className="text-lg">Billing Information</p>}
            bodyStyle={{ paddingTop: "0" }}
          >
            <Row gutter={[24, 24]}>
              {information.map((item, index) => (
                <Col span={24} key={`list-bill-${index}`}>
                  <Card className="bg-gray-100" bordered={false}>
                    <div className="flex">
                      <Descriptions title={item.title} size="small">
                        <Descriptions.Item label="Company Name" span={3}>
                          {item.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email Address" span={3}>
                          {item.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="VAT Number" span={3}>
                          {item.vat}
                        </Descriptions.Item>
                      </Descriptions>
                      <div className="flex">
                        <Button icon={<DeleteFilled />} type="link" danger>
                          DELETE
                        </Button>
                        <Button
                          icon={<EditFilled />}
                          type="link"
                          className="text-black"
                        >
                          EDIT
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Your transaction - have to do soon */}
        <Col span={24} lg={8} className="mb-8">
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="h-full"
            title={<p>Your Transactions</p>}
            extra={
              <p className="flex gap-2">
                <CalendarFilled />
                <span>23 - 30 March 2021</span>
              </p>
            }
          >
            <List
              header={<h6 className="text-gray-500">NEWEST</h6>}
              itemLayout="horizontal"
              dataSource={newest}
              renderItem={(item, index) => (
                <List.Item key={`newest-list-${index}`}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="small"
                        style={
                          item.type === "plus"
                            ? { backgroundColor: "#edf9e7" , color: "#52c41a"}
                            : { backgroundColor: "#fde3cf", color: "#f56a00" }
                        }
                      >
                        {item.avatar}
                      </Avatar>
                    }
                    title={item.title}
                    description={item.description}
                  />
                  <div className="amount">
                    <span
                      className={
                        item.type === "plus"
                          ? "text-light-green"
                          : "text-red-500"
                      }
                      style={{ fontWeight: 600}}
                    >
                      {item.amount}
                    </span>
                  </div>
                </List.Item>
              )}
            />

            <List
              header={<h6 className="text-gray-500">YESTERDAY</h6>}
              itemLayout="horizontal"
              dataSource={yesterday}
              renderItem={(item, index) => (
                <List.Item key={`yesterday-list-${index}`}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="small"
                        style={
                          item.type === "plus"
                            ? { backgroundColor: "#edf9e7" , color: "#52c41a"}
                            : { backgroundColor: "#fde3cf", color: "#f56a00" }
                        }
                      >
                        {item.avatar}
                      </Avatar>
                    }
                    title={item.title}
                    description={item.description}
                  />
                  <div className="amount">
                    <span
                      className={
                        item.type === "plus"
                          ? "text-light-green"
                          : "text-red-500"
                      }
                      style={{ fontWeight: 600}}
                    >
                      {item.amount}
                    </span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
