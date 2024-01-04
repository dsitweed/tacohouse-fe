import { getFullUserName } from '@/models';
import { useAppSelector } from '@/store/hooks';
import { Avatar, Card, Divider, Empty } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export default function PartnerExpandInfo() {
  const { t } = useTranslation();
  const currentPartner = useAppSelector((state) => state.message.partner);

  if (!currentPartner) {
    return (
      <Card>
        <Empty />
      </Card>
    );
  }

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-bold">{getFullUserName(currentPartner)}</p>
          <p>{currentPartner.address}</p>
          <p>
            {t('common.phoneNumber')}: {currentPartner.phoneNumber}
          </p>
          <p>
            {t('common.age')}: {dayjs().diff(currentPartner.dob, 'years')}
          </p>
        </div>
        <Avatar src={currentPartner.avatarUrl} size={80} />
      </div>
      <Divider />
      Tổng quan đánh giá của người khác về người này. Gia nhập từ năm bao nhiêu
      các thú
    </div>
  );
}
