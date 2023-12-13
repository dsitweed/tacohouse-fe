import { useEffect, useState } from 'react';
import {
  App,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Row,
} from 'antd';
import { useApiClient } from '@/shared/hooks/api';
import { BuildingUnitPriceEntity } from '@/models/BuildingUnitPriceEntity';
import { BUILDING_UNIT_PRICES_PATH } from '@/routes/routeNames';
import { useForm } from 'antd/es/form/Form';
import { useTranslation } from 'react-i18next';

export interface ServiceProps {
  buildingId: number;
}

export default function BuildingUnitPrice(props: ServiceProps) {
  const [unitPrices, setUnitPrices] = useState<BuildingUnitPriceEntity[]>();
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const apiBuildingUnitPrice = useApiClient<BuildingUnitPriceEntity>(
    BUILDING_UNIT_PRICES_PATH,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flagReload, setFlagReload] = useState(0); // flag to reload components
  const [form] = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiBuildingUnitPrice.getAll({
        buildingId: props.buildingId,
      });

      if (response && response.status === 200) {
        setUnitPrices(response.data.data);
      }
    };

    fetchData();
  }, [flagReload]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (values: any) => {
    try {
      const newUnitPrice = await apiBuildingUnitPrice.create({
        ...values,
        buildingId: props.buildingId,
      });

      if (newUnitPrice && newUnitPrice.status === 201) {
        notification.success({ message: t('buildingUnitPrice.new.success') });
      } else {
        notification.error({ message: t('buildingUnitPrice.new.failed') });
      }
    } catch (error) {
      console.error(error);
    }

    // reload component
    setFlagReload(flagReload + 1);
    setIsModalOpen(false);
  };

  const handleDelete = async (unitId: number) => {
    try {
      const newUnitPrice = await apiBuildingUnitPrice.deleteById(unitId);

      if (newUnitPrice && newUnitPrice.status === 200) {
        notification.success({
          message: t('buildingUnitPrice.delete.success'),
        });
      } else {
        notification.error({ message: t('buildingUnitPrice.delete.failed') });
      }
    } catch (error) {
      console.error(error);
    }

    // reload component
    setFlagReload(flagReload + 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <List
        itemLayout="horizontal"
        dataSource={unitPrices}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="edit">edit</a>,
              <a
                className="text-red-500 pointer-events-none"
                key="delete"
                onClick={() => handleDelete(item.id)}
              >
                delete
              </a>,
            ]}
          >
            <List.Item.Meta title={item.name} />
            <p>{item.price.toLocaleString()} VND</p>
            <p> VND</p>
          </List.Item>
        )}
      />

      <Button
        hidden
        className="border border-black"
        onClick={() => showModal()}
      >
        <span>
          Click to Create{' '}
          <span className="font-bold">new building unit price</span>
        </span>
      </Button>
      <Modal
        title="Add Building Unit Price"
        open={isModalOpen}
        footer={null}
        onCancel={() => handleCancel()}
      >
        <Form layout="vertical" form={form} onFinish={handleCreate}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Form.Item name="name" label="Building unit name">
                <Input placeholder="building unit name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="price" label="Building unit price">
                <InputNumber placeholder="building unit price" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-2">
            <Button type="default" onClick={() => handleCancel()}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Đồng ý
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
