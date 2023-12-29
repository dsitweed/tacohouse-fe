import { RoomEntity, UserEntity } from '@/models';
import {
  App,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';

// images mock
import UploadImage from '@/components/common/UploadImage';
import { MANAGERS_PATH, routes } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: 'edit' | 'create';
}

export default function TenantForm({ type }: Props) {
  const paths = window.location.pathname.split('/');
  // single page (/tenantId) -> -1, edit page -> -2 (/tenantId/edit)
  const tenantId =
    Number(paths[paths.length - 1]) || Number(paths[paths.length - 2]);

  const { notification } = App.useApp();
  const { t } = useTranslation();
  const apiManager = useApiClient(MANAGERS_PATH);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [tenant, setTenant] = useState<UserEntity>();
  const [rooms, setRooms] = useState<RoomEntity[]>();
  const [avatarUrl, setAvatarUrl] = useState<string[]>([]);
  const [citizenImageUrls, setCitizenImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchTenant = async () => {
      const res = await apiManager.getByIdExtend('/tenant', tenantId);

      if (res?.success) {
        const getTenant: UserEntity = res.data.data;

        setTenant(getTenant);
        if (getTenant?.avatarUrl) {
          setAvatarUrl([getTenant.avatarUrl]);
        }
        if (getTenant?.citizenImageUrls) {
          setCitizenImageUrls(getTenant.citizenImageUrls);
        }
      }
    };

    const fetchRoom = async () => {
      const res = await apiManager.getAllExtend('/rooms');

      if (res?.success) {
        setRooms(res.data.data);
      }
    };

    fetchRoom();
    if (type === 'edit') {
      fetchTenant();
    }
  }, [tenantId]);

  const selectRoomOptions = useMemo(() => {
    if (tenant?.room === null) return rooms;

    return rooms?.filter((item) => {
      if (
        // get room have same id with room tenant is living
        item.id === tenant?.roomId ||
        // Or room have number of tenant < maxTenant available
        item.tenants.length < (Number(item.maxTenant) || 0)
      )
        return item;
    });
  }, [rooms, tenant]);

  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      const res = await apiManager.updateExtend('/tenant', tenantId, {
        ...values,
        dob: values.dob.$d,
        avatarUrl: avatarUrl[0],
        citizenImageUrls: citizenImageUrls,
      });

      if (res?.success) {
        notification.success({
          message: t('tenant.edit.success'),
        });
        setTenant(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      const values = form.getFieldsValue();
      const res = await apiManager.createExtend('/tenant', {
        ...values,
        dob: values.dob.$d,
        avatarUrl: avatarUrl[0] || '',
        citizenImageUrls: citizenImageUrls,
      });

      if (res?.success) {
        notification.success({
          message: t('tenant.new.success'),
        });
        setTenant(res.data.data);
        navigate(routes.managers.tenants.index);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!tenant && type === 'edit') {
    return (
      <Card>
        <Empty />
      </Card>
    );
  }

  return (
    <Form
      form={form}
      onFinish={type === 'edit' ? handleUpdate : handleCreate}
      layout="vertical"
      autoComplete="true"
      initialValues={
        tenant && {
          firstName: tenant.firstName,
          lastName: tenant.lastName,
          roomId: tenant.room?.id,
          address: tenant.address,
          phoneNumber: tenant.phoneNumber,
          dob: tenant.dob && dayjs(tenant.dob),
          citizenNumber: tenant.citizenNumber,
        }
      }
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <Form.Item name="avatar" label={t('common.avatar')}>
            <UploadImage
              imageUrls={avatarUrl}
              setImageUrls={setAvatarUrl}
              maxCount={1}
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={t('common.lastName')}
            rules={[
              {
                required: true,
                message: t('common.requiredTrue'),
              },
            ]}
          >
            <Input placeholder={t('common.requiredTrue')} />
          </Form.Item>

          <Form.Item
            name="dob"
            label={t('common.dateOfBirth')}
            rules={[
              {
                required: true,
                message: t('common.requiredTrue'),
              },
            ]}
          >
            <DatePicker format={'DD/MM/YYYY'} />
          </Form.Item>

          <Form.Item
            name="address"
            label={t('common.hometown')}
            rules={[
              {
                required: true,
                message: t('common.requiredTrue'),
              },
            ]}
          >
            <Input placeholder={t('common.requiredTrue')} />
          </Form.Item>

          <Form.Item
            name="citizenNumber"
            label={t('common.citizenNumber')}
            rules={[
              { required: true, message: 'Hãy nhập số điện thoại' },
              {
                len: 12,
                message: 'Hãy nhập CCCD 12 chữ số',
              },
            ]}
          >
            <Input placeholder={t('common.requiredTrue')} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item name="citizenPictures" label={t('common.citizenPictures')}>
            <UploadImage
              imageUrls={citizenImageUrls}
              setImageUrls={setCitizenImageUrls}
              maxCount={2}
            />
          </Form.Item>
          <Form.Item
            name="firstName"
            label={t('common.fistName')}
            rules={[
              {
                required: true,
                message: t('common.requiredTrue'),
              },
            ]}
          >
            <Input placeholder={t('common.requiredTrue')} />
          </Form.Item>

          <Form.Item
            name="roomId"
            label={t('common.room')}
            rules={[
              {
                required: true,
                message: t('common.requiredTrue'),
              },
            ]}
          >
            <Select
              options={selectRoomOptions?.map((item) => ({
                label: `${item.name} - ${t('common.building')} ${item.building
                  ?.name}`,
                value: item.id,
              }))}
              placeholder={t('common.requiredTrue')}
            />
          </Form.Item>

          {tenant && (
            <Form.Item label="Tòa nhà">
              <p>
                Thuộc tòa nhà:
                <span className="font-bold"> {tenant.room?.building.name}</span>
              </p>
            </Form.Item>
          )}

          <Form.Item
            name="phoneNumber"
            label={t('common.phoneNumber')}
            rules={[
              { required: true, message: 'Hãy nhập số điện thoại' },
              {
                len: 10,
                message: 'Hãy nhập số điện thoại 10 chữ số',
              },
            ]}
          >
            <Input placeholder={t('common.requiredTrue')} />
          </Form.Item>
        </Col>
      </Row>

      {type === 'create' && (
        <Button type="primary" htmlType="submit">
          {t('common.create')}
        </Button>
      )}
      {type === 'edit' && (
        <Button type="primary" htmlType="submit">
          {t('common.update')}
        </Button>
      )}
    </Form>
  );
}
