import { BuildingEntity, RoomEntity } from '.';

export interface InvoiceEntity {
  id: number;
  total: number;
  status: string;

  tenantIds: number[];
  roomId: number;
  room: RoomEntity;
  invoiceTypeId: number;
  invoiceType: string;
  buildingId: number;
  building: BuildingEntity;
}
