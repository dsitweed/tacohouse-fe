import { Button, Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  FaParking,
  FaWifi,
  FaDog,
  FaGlassMartiniAlt,
  FaClock,
  FaBusAlt,
  FaBicycle,
  FaMapMarkedAlt,
} from 'react-icons/fa';
// images
import bgImg from '@/assets/images/mountain_2.jpg';
import aboutHotel from '@/assets/images/about-hotel.jpg';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { BsCursorFill } from 'react-icons/bs';
import HotelInformation from './HotelInfomation';
import AttractionPlace from './AtractionPlace';
import Review from './Review';
import GridItem from './ListingRoom/RoomGridItem';
import RoomGrid from './ListingRoom/RoomGrid';

const marketingsNumber = [
  {
    title: 'Year of service',
    number: 8,
  },
  {
    title: 'Sq. Meter area',
    number: 320,
  },
  {
    title: 'Nice rooms',
    number: 68,
  },
  {
    title: 'Happy visitors',
    number: 4567,
  },
];

const facilities = [
  {
    icon: <FaParking size={50} color={'blue'} />,
    name: 'Fee parking',
  },
  {
    icon: <FaWifi size={50} color={'blue'} />,
    name: 'Free wifi',
  },
  {
    icon: <FaDog size={50} color={'blue'} />,
    name: 'Pet friendly',
  },
  {
    icon: <FaGlassMartiniAlt size={50} color={'blue'} />,
    name: 'Mini bar',
  },
  {
    icon: <FaClock size={50} color={'blue'} />,
    name: '24-Hours Front Desk',
  },
  {
    icon: <FaBusAlt size={50} color={'blue'} />,
    name: 'Shuttle Bus Service',
  },
  {
    icon: <FaBicycle size={50} color={'blue'} />,
    name: 'Bicycle Rental',
  },
  {
    icon: <FaMapMarkedAlt size={50} color={'blue'} />,
    name: 'Downtown Location',
  },
];

const exampleMap = {
  size: {
    height: 600,
    width: 600,
  },
  center: {
    lng: 105.76688824797935,
    lat: 21.199146789009678,
  },
  zoom: 11,
};

export default function UserDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-y-20">
      <Row
        className="relative"
        style={{
          height: '86vh',
          marginLeft: '-40px',
          marginRight: '-40px',
        }}
      >
        <Col md={24} lg={16} className="z-10 text-white m-8">
          <h3 className="text-2xl">{'Welcome to'}</h3>
          <h1 className="text-8xl font-bold mt-8">
            {t('webName')}
            <br />
            Ha Noi
          </h1>
          <Button
            className="bg-white mt-8 text-base font-semibold h-fit py-2"
            onClick={() => navigate('#')}
          >
            Check Availability
          </Button>
        </Col>
        <img
          src={bgImg}
          className="w-full h-full absolute object-cover"
          alt="background image"
          loading="lazy"
        />
      </Row>

      <RoomGrid />

      {/* OVERVIEW INFORMATION */}
      {/* <Row gutter={[24, 24]}>
        <Col md={24} lg={12}>
          <img
            src={aboutHotel}
            width={500}
            height={500}
            className="object-cover rounded-md"
            loading="lazy"
          />
        </Col>
        <Col md={24} lg={12}>
          <Typography className="text-5xl font-semibold">
            Get Comfy in The Near of San Fransisco shoreline
          </Typography>
          <Typography.Paragraph className="mt-6">
            Purus mattis massa, uta eu facilisi nascetur eu risus sed dolor
            auctor arcu turpis elementum, nam venenatis nibh fusce pellentesque
            habitant donec consequat.
          </Typography.Paragraph>
          <Button className="border-primary border-2 mt-6 p-6 flex items-center hover:bg-slate-200">
            <Typography className="text-base font-semibold">
              Discover More
            </Typography>
          </Button>
        </Col>
      </Row> */}
      {/* <Row gutter={[12, 24]}>
        {marketingsNumber.map((item, index) => (
          <Col
            key={`overview-info-${index}`}
            xs={24}
            sm={12}
            md={6}
            className="flex flex-col justify-center items-center"
          >
            <Typography className="text-6xl">{item.number}</Typography>
            <Typography className="text-lg text-slate-600">
              {item.title.toUpperCase()}
            </Typography>
          </Col>
        ))}
      </Row> */}
      {/* DIRECT IN GOOGLE MAP */}
      {/* <Row gutter={[24, 32]}>
        <Col className="w-full flex gap-6 justify-between flex-col items-center md:flex-row">
          <div>
            <Typography className="text-4xl font-normal text-center md:text-left">
              How to Reach
            </Typography>
            <Typography className="text-slate-600 mt-4 tet-center md:text">
              Quang Minh, Me Linh, Ha Noi
            </Typography>
          </div>
          <div className="flex justify-end">
            <Button
              className="border-2 py-2 px-4 h-fit w-fit border-purple-600 hover:bg-indigo-50 font-bold text-base"
              icon={<BsCursorFill size={15} />}
            >
              Get directions
            </Button>
          </div>
        </Col>
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: 450,
          }}
          center={exampleMap.center}
          zoom={15}
          mapContainerClassName="border border-slate-300"
        >
          <MarkerF position={exampleMap.center} />
        </GoogleMap>
      </Row> */}
      {/* MARKETINGS FACILITIES */}
      {/* <Row gutter={[24, 60]}>
        <div className="w-full flex flex-col justify-center items-center">
          <Typography className="text-5xl mb-4">Facilities</Typography>
          <Typography.Paragraph className="text-base text-gray-700 w-2/3 text-center">
            Interdum curabitur platea turpis orci auctor in scelerisque ac ut
            eleifend at at leo laoreet at ut semper eget laoreet vestibulum a
            elementum nec
          </Typography.Paragraph>
        </div>
        {facilities.map((item, index) => (
          <Col
            key={`marketing-facility-${index}`}
            xs={12}
            md={6}
            className="flex flex-col items-center"
          >
            {item.icon}
            <Typography className="pt-2 text-lg">{item.name}</Typography>
          </Col>
        ))}
      </Row> */}
      {/* Best place for play */}
      {/* <AttractionPlace /> */}
      {/* HOTEL REVIEW */}
      {/* <Review /> */}
      {/* HOTEL INFORMATION */}
      {/* <HotelInformation /> */}
    </div>
  );
}
