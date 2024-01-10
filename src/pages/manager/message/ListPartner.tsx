import { UserEntity, getFullUserName } from '@/models';
import { USERS_PATH } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { messageActions } from '@/store/slices/message.slice';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Badge, Empty, Input, Skeleton, Typography } from 'antd';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuSettings2 } from 'react-icons/lu';
import { SlMenu } from 'react-icons/sl';

const sampleMessage =
  'Last message Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut quod distinctio optio enim placeat possimus exercitationem eligendi at, quibusdam totam mollitia dolor asperiores! Maxime perferendis quae saepe reprehenderit omnis quam.';

export default function ListPartner() {
  const selectedPartner = useAppSelector((state) => state.message.partner);
  const dispatch = useAppDispatch();
  const apiUser = useApiClient(USERS_PATH);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [listPartner, setListPartner] = useState<UserEntity[]>();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await apiUser.getAll();
      const partners: UserEntity[] = response?.data.data || [];

      // set default partner
      if (partners.length > 0 && !selectedPartner) {
        dispatch(messageActions.selectPartner(partners[0]));
      }
      // set state
      setListPartner(partners);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading !== false && listPartner?.length === 0) {
    return <Empty />;
  }

  return (
    <Skeleton loading={isLoading}>
      <div className="p-2">
        {/* Header */}
        <div className="flex justify-between py-2 pb-2 items-center">
          <div className="flex items-center gap-3">
            <SlMenu size={18} className="hover:cursor-pointer" />
            <Badge count={2} offset={[6, 6]}>
              <p className="text-2xl font-semibold">Tin nhắn</p>
            </Badge>
          </div>
          <LuSettings2 size={22} className="hover:cursor-pointer" />
        </div>
        {/* Search */}
        <div className="mb-4">
          <Input
            className="flex"
            prefix={<SearchOutlined className="mr-1" />}
            placeholder={`${t('common.search')}`}
          />
        </div>
        {/* List partner */}
        {listPartner?.map((partner) => (
          <div
            key={`partner-message-${partner.id}`}
            className={cn(
              'flex items-center gap-2 relative rounded-lg p-2 hover:cursor-pointer',
              selectedPartner?.id === partner.id && 'bg-primary-container',
            )}
            onClick={() => dispatch(messageActions.selectPartner(partner))}
          >
            <div>
              <Avatar src={partner.avatarUrl} size={42} />
            </div>
            <div className="overflow-hidden">
              <p>reading status</p>
              <p className="font-bold">{getFullUserName(partner)}</p>
              <Typography.Paragraph
                ellipsis={{
                  rows: 1,
                }}
              >
                {sampleMessage.split(' ', 8).join(' ')}
              </Typography.Paragraph>
            </div>
            {/* Time */}
            <div className="absolute top-1 right-3 text-gray-500">10h ago</div>
          </div>
        ))}
      </div>
    </Skeleton>
  );
}
