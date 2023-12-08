import { RoomEntity } from '@/models';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Rate,
  Row,
  Space,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { GoArrowSwitch, GoHeart, GoShareAndroid } from 'react-icons/go';
import { TfiPrinter } from 'react-icons/tfi';

import { Link } from 'react-router-dom';
import { useApiClient } from '@/shared/hooks/api';
import { ROOMS_PATH } from '@/routes/routeNames';
import dayjs from 'dayjs';
// import image
import face1 from '@/assets/images/face-1.jpg';
import avatarDefault from '@/assets/images/avatar.jpg';

export default function SingleRoom() {
  const paths = window.location.pathname.split('/');
  const roomId = Number(paths[paths.length - 1]);
  const [room, setRoom] = useState<RoomEntity>();

  const apiRoom = useApiClient(ROOMS_PATH);

  // GET ROOM DATA
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRoom.getById(roomId);

      if (response && response.status === 200) {
        setRoom(response.data.data);
      }
    };

    fetchData();
  }, [room]);

  return !room ? (
    <>
      <Card>No have room</Card>
    </>
  ) : (
    <div className="flex flex-col gap-8">
      <Card>
        <Row gutter={[24, 24]}>
          <Col sm={24} md={16}>
            <div className="flex justify-between">
              <Typography.Title level={4}>Phòng: {room.name}</Typography.Title>

              <Link
                className="bg-primary p-2 px-4 text-white rounded-md hover:text-white hover:opacity-90"
                to={`/managers/rooms/${room.id}/edit`}
              >
                Chỉnh sửa thông tin phòng
              </Link>
            </div>
            <Typography.Text>Địa chỉ: {room.building.name}</Typography.Text>
          </Col>
          <Col sm={24} md={8} className="flex justify-between items-center">
            <Typography>
              {room.price.toLocaleString()} VND/<span>tháng</span>
            </Typography>
            <Space>
              <GoArrowSwitch size={16} />
              <GoHeart />
              <GoShareAndroid />
              <TfiPrinter />
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={16} className="flex flex-col gap-6">
          <Card>
            <Col className="flex flex-col gap-5">
              <Space>
                <div className="px-3 py-2 bg-gray-100 rounded-lg">
                  {room.building.type}
                </div>
                <div className="px-3 py-2 bg-gray-100 rounded-lg">
                  {room.area} m&sup2;
                </div>
              </Space>

              <div>
                <Typography.Title level={5}>Miêu tả</Typography.Title>
                <Typography.Paragraph
                  ellipsis={{
                    rows: 5,
                    expandable: true,
                    symbol: 'Mở rộng',
                  }}
                  className="mt-4"
                >
                  {room.description || 'Không có miêu tả'}
                </Typography.Paragraph>
                <Divider className="border" />
              </div>

              <div>
                <Typography.Title level={5}>
                  Thông tin chi tiết
                </Typography.Title>
                <div className="grid grid-cols-2">
                  <div>
                    <p>Room ID: {room.id}</p>
                    <p>Price: {room.price.toLocaleString()} VND/Tháng</p>
                    <p>Diện tích: {room.area} m&sup2;</p>
                  </div>
                  <div>
                    <p>Property Type : {room.building.type}</p>
                    <p>Property Status : For Rent</p>
                  </div>
                </div>
              </div>
            </Col>
          </Card>
          {/* Features */}
          <Card>
            <Typography.Title level={5}>Features</Typography.Title>
            <div className="grid md:grid-cols-2 grid-cols-1">
              {room.facilities.map((item, index) => (
                <p key={`facility-${index}`}>{item.name}</p>
              ))}
            </div>
          </Card>
          {/* Location */}
          <Card>
            <Typography.Title level={5}>Location</Typography.Title>
            <p>Embarea google map</p>
          </Card>
          {/* Reviews */}
          <Card>
            {/* Overview */}
            <div className="mb-5">
              <Typography>room.reviews.count() Reviews</Typography>
              <Space>
                <Typography className="text-2xl">4.5</Typography>{' '}
                <Rate allowHalf defaultValue={4.5} />
              </Space>
            </div>
            {/* All comments */}
            <Row gutter={[0, 16]}>
              <div className="flex gap-4">
                <div>
                  <Avatar size={64} src={face1} />
                </div>
                <div>
                  <Space>
                    <span className="font-bold text-sm">user.name</span>
                    <Rate allowHalf defaultValue={3.5} />
                  </Space>
                  <Typography.Paragraph>
                    user.comments Fully furnished. Elegantly appointed
                    condominium unit situated on premier location. PS6. The wide
                    entry hall leads to a large living room with dining area.
                  </Typography.Paragraph>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Avatar size={64} src={face1} />
                </div>
                <div>
                  <Space>
                    <span className="font-bold text-sm">user.name</span>
                    <Rate allowHalf defaultValue={3.5} />
                  </Space>
                  <Typography.Paragraph>
                    user.comments Fully furnished. Elegantly appointed
                    condominium unit situated on premier location. PS6. The wide
                    entry hall leads to a large living room with dining area.
                  </Typography.Paragraph>
                </div>
              </div>
            </Row>
            <Divider className="border" />
            {/* Create new comment */}
            <div>
              <Typography.Title level={4}>Write a Review</Typography.Title>
              <div>
                <Space>
                  <Rate allowHalf /> <span>Your Rating & Review</span>
                </Space>
                <Input.TextArea
                  className="mt-4"
                  placeholder="Your Review"
                  rows={4}
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primary mt-4 flex justify-center items-center text-base p-5"
                >
                  Submit review
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Typography.Title level={3}>
              Số người: {room.tenants.length}
            </Typography.Title>
            <div className="flex flex-col gap-4">
              {room.tenants.map((tenant) => {
                return (
                  <div
                    key={`${tenant.id}-tenants`}
                    className="flex gap-3 items-center"
                  >
                    <Avatar src={tenant.avatarUrl || avatarDefault} size={80} />
                    <div>
                      <p>{`${tenant.lastName} ${tenant.firstName}`}</p>
                      <p>Phone: {tenant.phoneNumber}</p>
                      <p>
                        Ngày sinh: {dayjs(tenant.dob).format('DD/MM/YYYY')} (
                        {dayjs().diff(tenant.dob, 'years')} tuổi)
                      </p>
                      <p>Address: {tenant.address}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
