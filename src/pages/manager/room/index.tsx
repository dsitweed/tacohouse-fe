import { RoomEntity } from "@/model/Room.entity";
import { RoomService } from "@/services/Room.service";
import { Card, Col, List, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import BuildingAnalytic from "../building/BuildingAnalytic";
import Service from "../building/Service";

export default function ManageRoom() {
  const [rooms, setRooms] = useState<RoomEntity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const roomsData = await RoomService.getRooms();
      setRooms(roomsData);
    };

    fetchData();
  }, [rooms]);

  const roomsTableColumns: ColumnsType<RoomEntity> = [
    {
      title: "Room",
      dataIndex: "name",
    },
    {
      title: "Tenants",
      dataIndex: "tenant_name",
      render: (_, record) => <p>{record.tenant_name.join(", ")}</p>,
    },
    {
      title: "Room price",
      dataIndex: "price",
      render: (_, record) => <p>{record.price.toLocaleString()}</p>,
    },
    {
      title: (
        <span>
          Current
          <br />
          electricity
        </span>
      ),
      dataIndex: "current_electricity",
      render: (_, record) => (
        <p>{record.current_electricity.toLocaleString()}</p>
      ),
    },
    {
      title: (
        <span>
          Previous
          <br />
          electricity
        </span>
      ),
      dataIndex: "previous_electricity",
      render: (_, record) => (
        <p>{record.previous_electricity.toLocaleString()}</p>
      ),
    },
    {
      title: (
        <span>
          Total
          <br />
          electricity
        </span>
      ),
      dataIndex: "total_electricity",
      render: (value, record, index) => {
        const consume =
          record.current_electricity - record.previous_electricity;
        return <p>{consume.toLocaleString()}</p>;
      },
    },
    {
      title: (
        <span>
          Electricity
          <br />
          price
        </span>
      ),
      dataIndex: "electricity_price",
      render: (_, record) => <p>{record.electricity_price.toLocaleString()}</p>,
    },
    {
      title: (
        <span>
          Electricity
          <br />
          fee
        </span>
      ),
      dataIndex: "electricity_fee",
      render: (value, record, index) => {
        const totalCost =
          (record.current_electricity - record.previous_electricity) *
          record.electricity_price;
        return <p>{totalCost.toLocaleString()}</p>;
      },
    },
    {
      title: (
        <span>
          Water
          <br />
          price
        </span>
      ),
      dataIndex: "water_price",
      render: (_, record) => <p>{record.water_price.toLocaleString()}</p>,
    },
    {
      title: (
        <span>
          Wifi
          <br />
          price
        </span>
      ),
      dataIndex: "wifi_price",
      render: (_, record) => <p>{record.wifi_price?.toLocaleString() || 0}</p>,
    },
    {
      title: (
        <span>
          Light
          <br />
          price
        </span>
      ),
      dataIndex: "light_price",
      render: (_, record) => <p>{record.light_price.toLocaleString()}</p>,
    },
    {
      title: (
        <span>
          Environ
          <br />
          price
        </span>
      ),
      dataIndex: "environment_price",
      render: (_, record) => <p>{record.environment_price.toLocaleString()}</p>,
    },
    {
      title: (
        <span>
          Tenant's <br /> debt
        </span>
      ),
      dataIndex: "debt",
      render: (_, record) => <p>{record.debt?.toLocaleString() || 0}</p>,
    },
    {
      title: "Deposit",
      dataIndex: "deposit",
      render: (_, record) => <p>{record.deposit?.toLocaleString() || 0}</p>,
    },
    {
      title: "Total money",
      dataIndex: "environment_price",
      render: (_, record) => {
        const {
          price,
          previous_electricity,
          current_electricity,
          electricity_price,
          water_price,
          environment_price,
          wifi_price,
          light_price,
          debt,
          parking_price,
          charing_price,
        } = record;
        const electricity_fee =
          electricity_price * (current_electricity - previous_electricity);

        const total =
          price +
          electricity_fee +
          water_price +
          (wifi_price || 0) +
          environment_price +
          light_price +
          (debt || 0) +
          (parking_price || 0) +
          (charing_price || 0);

        return <p>{total.toLocaleString()}</p>;
      },
    },
    {
      title: "Paid",
      dataIndex: "paid",
      render: (_, record) => <p>{record.paid ? "Paid" : "Pending"}</p>,
    },
  ];

  return (
    <div>
      <Row gutter={[24, 24]} className=" mb-6">
        <Col xs={24} lg={16}>
          <Card bordered={false} className="h-full">
            <BuildingAnalytic />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={<p className="text-lg">Services</p>} className="mb-6">
            <Service building_id={1} />
          </Card>
          <Card title={<p className="text-lg">Utilities</p>}>
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: "Fridge",
                  status: true,
                },
                {
                  title: "Air conditioner",
                  status: true,
                },
                {
                  title: "Electric water heater",
                  status: true,
                },
                {
                  title: "Washing machine",
                  status: false,
                },
              ]}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta title={item.title} />
                  {item.status ? (
                    <p className="font-bold text-light-green">Have</p>
                  ) : (
                    <p className="text-red-400">Not have</p>
                  )}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Row gutter={[12, 12]}>
        <Card className="w-full">
          <Table
            bordered={true}
            rowKey={"id"}
            columns={roomsTableColumns}
            dataSource={rooms}
            className="w-full"
          />
        </Card>
      </Row>
    </div>
  );
}
