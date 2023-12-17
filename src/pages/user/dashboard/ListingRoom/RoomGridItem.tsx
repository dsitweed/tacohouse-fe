import { Avatar, Image, Skeleton, Typography } from 'antd';
import { MdOutlinePlace } from 'react-icons/md';
import { Link } from 'react-router-dom';

// import images
import bgDefault from '@/assets/images/home-decor-2.jpeg';
import avatar from '@/assets/images/avatar.jpg';
import { BsHeart } from 'react-icons/bs';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { RoomEntity } from '@/models';

interface RoomGridItemProps {
  room: RoomEntity;
}

export default function RoomGridItem({ room }: RoomGridItemProps) {
  const [like, setLike] = useState<boolean>(false);

  const renderOwnerName = (lastName: string, firstName: string) => {
    return `${lastName} ${firstName}`;
  };

  return (
    <div className="flex flex-col gap-3 flex-wrap w-fit p-3 shadow-lg rounded-md">
      <div className="relative w-[350px] h-[320px]">
        <Image
          width={350} // Set the desired width
          height={320} // Set the desired height
          src={room.imageUrls[0] || bgDefault} // URL of your image
          placeholder={<Skeleton.Image active />} // Placeholder component
          className="object-cover rounded-lg w-full h-full"
        />
        <Typography className="bg-light-pink text-white px-2 absolute top-2 left-2 rounded-sm">
          For Rent
        </Typography>
        <div
          className="absolute bottom-2 right-2 bg-black w-fit p-2 rounded-lg opacity-60 hover:cursor-pointer hover:bg-light-pink hover:opacity-100"
          onClick={() => setLike(!like)}
        >
          {like ? (
            <FaHeart color="red" size={15} />
          ) : (
            <BsHeart color="white" size={15} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Typography className="text-light-pink">
          {room.building?.type}
        </Typography>
        <Link className="font-bold text-base" to={`rooms/${room.id}`}>
          {room.name}
        </Link>
        <Typography className="flex items-center text-gray-600">
          <MdOutlinePlace size={18} /> {room.building?.address}
        </Typography>
        <div className="flex justify-between flex-wrap">
          <span>
            {room.area} m<sup>2</sup>
          </span>
          <Typography className="text-base  font-bold">
            {room.price.toLocaleString()} VND /month
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar src={room.building?.owner?.avatarUrl || avatar} />
        <Typography>
          {renderOwnerName(
            room.building?.owner?.lastName,
            room.building?.owner?.firstName,
          )}
        </Typography>
      </div>
    </div>
  );
}
