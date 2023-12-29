import { UserEntity, getFullUserName } from '@/models';
import { ROOMS_PATH } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import { Avatar, Button, Card, Empty, Skeleton, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoStar } from 'react-icons/io5';

interface Props {
  roomId: number;
}
/**
 * Show room owner's information
 */
export default function HostInfo({ roomId }: Props) {
  const apiRoom = useApiClient(ROOMS_PATH);
  const [owner, setOwner] = useState<UserEntity>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwner = async () => {
      const response = await apiRoom.getById(roomId, '/owner');

      if (response?.success) {
        setOwner(response.data.data);
      }
    };

    setLoading(true);
    fetchOwner();
    setLoading(false);
  }, [roomId]);

  return (
    <Skeleton loading={isLoading}>
      {!owner ? (
        <Card>
          <Empty />
        </Card>
      ) : (
        <Card>
          <Typography.Title level={3}>Host</Typography.Title>
          <div className="flex gap-4 items-center">
            <Avatar src={owner?.avatarUrl} size={80} />
            <div>
              <p className="font-bold text-xl">{getFullUserName(owner)}</p>
              <p>{owner.phoneNumber}</p>
              <p>{owner.email}</p>
            </div>
          </div>
          <div className="flex justify-around mt-3 items-center">
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">3</p>
              <p>Reviews</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold flex items-center gap-2">
                4.6 <IoStar size={18} />
              </p>

              <p>Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">
                {dayjs().diff(owner.createdAt, 'years')}
              </p>
              <p>Years hosting</p>
            </div>
          </div>
          <div className="mt-3">
            <Button type="primary" className="h-fit py-2">
              <span className="text-base">Message Host</span>
            </Button>
          </div>
        </Card>
      )}
    </Skeleton>
  );
}
