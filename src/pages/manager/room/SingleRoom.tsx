import { RoomEntity } from '@/models';
import {
  Avatar,
  Card,
  Col,
  Divider,
  Image,
  Row,
  Space,
  Typography,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { ROOMS_PATH } from '@/routes/routeNames';
import { UserRole } from '@/shared/constants';
import { useApiClient } from '@/shared/hooks/api';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/auth.slice';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// import image
import HostInfo from '@/components/person/HostInfo';
import ReviewPane from '@/components/person/ReviewPane';
import { FaRegEdit } from 'react-icons/fa';
import { GoArrowSwitch, GoHeart, GoShareAndroid } from 'react-icons/go';
import { TfiPrinter } from 'react-icons/tfi';

export default function SingleRoom() {
  const paths = window.location.pathname.split('/');
  const roomId = Number(paths[paths.length - 1]);
  const { t } = useTranslation();

  const currentUser = useAppSelector(selectUser);
  const [room, setRoom] = useState<RoomEntity>();
  const [currentImage, setCurrentImage] = useState(0);

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
  }, [roomId]);

  const isOwner = useMemo(() => {
    return (
      currentUser?.id === room?.building.ownerId &&
      currentUser?.role === UserRole.MANAGER
    );
  }, [currentUser, room]);

  return !room ? (
    <>
      <Card>No have room</Card>
    </>
  ) : (
    <div className="flex flex-col gap-8">
      <Card>
        <Row gutter={[24, 24]}>
          <Col md={24} lg={16}>
            <div className="flex justify-between">
              <Typography.Title level={4}>
                {t('common.room')}: {room.name}
              </Typography.Title>

              {isOwner && (
                <Link
                  to={`/managers/rooms/${room.id}/edit`}
                  className="bg-primary p-2 px-4 text-white rounded-md hover:text-white hover:opacity-90 flex items-center gap-2"
                >
                  <FaRegEdit />
                  {t('common.update')}
                </Link>
              )}
            </div>
            <Typography>Địa chỉ: {room.building.address}</Typography>
            {isOwner && <Typography>Tòa nhà: {room.building.name}</Typography>}
          </Col>
          <Col md={24} lg={8} className="flex justify-between items-center">
            <Typography.Title level={2}>
              {room.price.toLocaleString()} VND/
              <span className="text-lg font-normal">tháng</span>
            </Typography.Title>
            <Space>
              <GoArrowSwitch size={16} />
              <GoHeart />
              <GoShareAndroid />
              <TfiPrinter />
            </Space>
          </Col>
        </Row>
        <Row gutter={[24, 24]} className="mt-6">
          <Image.PreviewGroup
            items={room.imageUrls}
            preview={{
              current: currentImage,
              onChange(current) {
                setCurrentImage(current);
              },
            }}
          >
            <Col lg={24} xl={16}>
              <Image
                height={524}
                width="100%"
                src={room.imageUrls[0]}
                className="object-cover rounded-lg"
              />
            </Col>
            <Col lg={24} xl={8}>
              <div className="grid grid-cols-2 gap-6">
                {room?.imageUrls.map(
                  (item, index) =>
                    index !== 0 &&
                    index <= 4 && (
                      <Image
                        height={250}
                        key={`image-single-room-${index}`}
                        src={item}
                        className="object-cover rounded-lg"
                        onClick={() => setCurrentImage(index)}
                      />
                    ),
                )}
              </div>
            </Col>
          </Image.PreviewGroup>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col md={24} lg={16} className="flex flex-col gap-6">
          <Card>
            <Col className="flex flex-col gap-5">
              <Space>
                <div className="px-3 py-2 bg-gray-100 rounded-lg">
                  {room.building.type}
                </div>
                <div className="px-3 py-2 bg-gray-100 rounded-lg">
                  {room.area} mm<sup>2</sup>
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
                  <p>Room ID: {room.id}</p>
                  <p>Property Type : {room.building.type}</p>
                  <p>Price: {room.price.toLocaleString()} VND/Tháng</p>
                  <p>Property Status : For Rent</p>
                  <p>
                    Diện tích: {room.area} m<sup>2</sup>
                  </p>
                </div>
              </div>

              <div>
                <Typography.Title level={5}>Thông tin bổ sung</Typography.Title>
                <div className="grid md:grid-cols-2 grid-cols-1">
                  <p>Đặt cọc: Đặt cọc 1 tháng</p>
                  <p>Tiền phòng: Trả đầu tháng</p>
                  <p>Năm xây dựng: 2019</p>
                  <a>Hợp dồng thuê nhà</a>
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
          <ReviewPane type="ROOM" targetId={roomId} />
        </Col>
        <Col md={24} lg={8} className="flex flex-col gap-3">
          {isOwner && (
            <Card>
              <Typography.Title level={3}>
                Số người: {room.tenants.length}
              </Typography.Title>
              <div className="flex flex-col gap-4">
                {room.tenants.map((tenant) => {
                  return (
                    <div
                      key={`${tenant.id}-tenants`}
                      className="flex gap-4 items-center"
                    >
                      <Avatar src={tenant.avatarUrl} size={80} />
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
          )}
          {/* room owner's information*/}
          <HostInfo roomId={room.id} />
        </Col>
      </Row>
    </div>
  );
}
