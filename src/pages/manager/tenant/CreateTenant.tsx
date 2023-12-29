import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import TenantForm from './TenantForm';

export default function CreateTenant() {
  const { t } = useTranslation();

  return (
    <Card>
      <Typography.Title level={3}>{t('tenant.new.new')}</Typography.Title>
      <TenantForm type="create" />
    </Card>
  );
}
