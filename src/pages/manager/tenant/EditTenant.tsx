import { Card, Typography } from 'antd';
import TenantForm from './TenantForm';
import { useTranslation } from 'react-i18next';

export default function EditTenant() {
  const { t } = useTranslation();

  return (
    <Card>
      <Typography.Title level={3}>{t('tenant.edit.edit')}</Typography.Title>
      <TenantForm type="edit" />
    </Card>
  );
}
