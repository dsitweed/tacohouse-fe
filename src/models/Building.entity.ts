import { RoomEntity, UserEntity } from '.';
import { BuildingUnitPriceEntity } from './BuildingUnitPriceEntity';

export interface BuildingEntity {
  id: number;
  name: string;
  type: string;
  address: string;
  rooms: RoomEntity[]; // number of rooms

  // invoices: InvoiceEntity[];
  buildingUnitPrices: BuildingUnitPriceEntity[];
  ownerId: number;
  owner: UserEntity;

  tenants: UserEntity[]; // number of tenants
  income: number;
  completion: number; // level of completion
  icon?: string | undefined;
}
