import { RoomEntity } from '@/models';
import { InvoiceTypeSelectOptions } from '@/models/Invoice.entity';
import { InvoiceTypeEntity } from '@/models/InvoiceType.entity';
import { INVOICES_PATH, MANAGERS_PATH } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { invoiceActions } from '@/store/slices/invoice.slice';
import { modalActions } from '@/store/slices/modal.slice';
import {
  App,
  Button,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function InvoiceForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const apiInvoice = useApiClient(INVOICES_PATH);
  const apiManager = useApiClient(MANAGERS_PATH);
  const { notification } = App.useApp();

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const invoice = useAppSelector((state) => state.invoice.invoice);

  const [invoiceTypes, setInvoiceTypes] = useState<InvoiceTypeEntity[]>([]);
  const [rooms, setRooms] = useState<RoomEntity[]>([]);

  const handleCancel = () => {
    dispatch(modalActions.setIsOpen(false));
    dispatch(invoiceActions.clear());
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateInvoice = async (values: any) => {
    try {
      const response = await apiInvoice.create({
        ...values,
      });
      if (response?.success) {
        notification.success({ message: t('invoice.create.success') });

        form.resetFields();
        handleCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateInvoice = async (values: any) => {
    try {
      if (!invoice) return;
      const response = await apiInvoice.update(invoice.id, {
        ...values,
      });

      if (response?.success) {
        notification.success({ message: t('invoice.update.success') });

        form.resetFields();
        handleCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchInvoiceTypes = async () => {
      try {
        const response = await apiInvoice.getAllExtend('/type');
        if (response?.success) {
          setInvoiceTypes(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRooms = async () => {
      try {
        const response = await apiManager.getAllExtend('/rooms');
        if (response?.success) {
          setRooms(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvoiceTypes();
    fetchRooms();
  }, []);

  return (
    <Modal
      title={invoice ? 'Chỉnh sửa thông tin hóa đơn' : 'Tạo hóa đơn mới'}
      open={isOpen}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={invoice ? handleUpdateInvoice : handleCreateInvoice}
        preserve={false}
        initialValues={
          invoice
            ? {
                invoiceTypeId: invoice.invoiceTypeId,
                roomId: invoice.roomId,
                total: invoice.total,
                status: invoice.status,
                dueDate: invoice.dueDate && dayjs(invoice.dueDate),
              }
            : {}
        }
      >
        <Form.Item
          name="invoiceTypeId"
          label="Loại"
          rules={[
            {
              required: true,
              message: t('common.requiredTrue'),
            },
          ]}
        >
          <Select
            options={invoiceTypes.map((type) => ({
              value: type.id,
              label: type.name,
            }))}
            placeholder={t('common.requiredTrue')}
          />
        </Form.Item>
        <Form.Item
          name="roomId"
          label="Phòng"
          rules={[
            {
              required: true,
              message: t('common.requiredTrue'),
            },
          ]}
        >
          <Select
            options={rooms.map((room) => ({
              label: `${room.name} - ${room.building.name}`,
              value: room.id,
            }))}
            placeholder={t('common.requiredTrue')}
          />
        </Form.Item>
        <Form.Item
          name="total"
          label="Tổng tiền"
          rules={[
            {
              required: true,
              message: t('common.requiredTrue'),
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value!.replace(/,/g, '')}
            className="w-full"
            placeholder={t('common.requiredTrue')}
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[
            {
              required: true,
              message: t('common.requiredTrue'),
            },
          ]}
        >
          <Select
            options={InvoiceTypeSelectOptions}
            placeholder={t('common.requiredTrue')}
          />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Ngày tới hạn"
          rules={[
            {
              required: true,
              message: t('common.requiredTrue'),
            },
          ]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={handleCancel}>{t('common.cancel')}</Button>
          <Button type="primary" htmlType="submit">
            {t('common.ok')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
