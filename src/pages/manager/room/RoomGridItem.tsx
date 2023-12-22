import { RoomEntity } from '@/models';
import { Typography } from 'antd';
import { MdOutlinePlace } from 'react-icons/md';
import { Link } from 'react-router-dom';
// import images
import bgDefault from '@/assets/images/home-decor-2.jpeg';

interface RoomGridItemProps {
  room: RoomEntity;
}

export default function RoomGridItem(props: RoomGridItemProps) {
  const { room } = props;

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <div className="relative w-[150px] h-[120px]">
        <img
          loading="lazy"
          src={room.imageUrls[0] || bgDefault}
          className="object-cover rounded-md w-full h-full"
        />
        <Typography className="bg-light-pink text-white px-2 absolute top-2 left-2 rounded-sm">
          For Rent
        </Typography>
      </div>

      <div className="flex flex-col gap-3">
        <Link className="font-bold text-base" to={`/managers/rooms/${room.id}`}>
          {room.name}
        </Link>
        <Typography className="flex items-center text-gray-600">
          <MdOutlinePlace size={18} />
          {room.building.address}
        </Typography>
        <Typography className="text-base text-light-pink">
          {room.price.toLocaleString()}VND /month
        </Typography>
      </div>
    </div>
  );
}
