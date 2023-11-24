import { RoomEntity } from '@/models';
import { Typography } from 'antd';
import { MdOutlinePlace } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

interface RoomGridItemProps {
  room: RoomEntity;
}

export default function RoomGridItem(props: RoomGridItemProps) {
  const { room } = props;
  const navigate = useNavigate();

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <div className="relative w-[150px] h-[120px]">
        <img
          src="https://findhouse-nextjs.netlify.app/_ipx/w_384,q_75/%2Fassets%2Fimages%2Fproperty%2Ffp1.jpg?url=%2Fassets%2Fimages%2Fproperty%2Ffp1.jpg&w=384&q=75"
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
          Building Address test string
        </Typography>
        <Typography className="text-base text-light-pink">
          {room.price.toLocaleString()}VND /month
        </Typography>
      </div>
    </div>
  );
}
