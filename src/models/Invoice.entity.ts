import i18n from '@/locales/i18n';
import { BuildingEntity, RoomEntity } from '.';
import { InvoiceTypeEntity } from './InvoiceType.entity';
import type { SelectProps } from 'antd';

export const InvoiceTypeSelectOptions: SelectProps['options'] = [
  {
    label: i18n.t('invoice.status.PENDING'),
    value: 'PENDING',
  },
  {
    label: i18n.t('invoice.status.OVERDUE'),
    value: 'OVERDUE',
  },
  {
    label: i18n.t('invoice.status.PAID'),
    value: 'PAID',
  },
];

export interface InvoiceEntity {
  id: number;
  total: number;
  status: 'PENDING' | 'OVERDUE' | 'PAID';
  dueDate: string;

  tenantIds: number[];
  roomId: number;
  room: RoomEntity;
  invoiceTypeId: number;
  invoiceType: InvoiceTypeEntity;
  buildingId: number;
  building: BuildingEntity;

  createdAt: string;
  updatedAt: string;
}
