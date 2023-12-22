import { BuildingEntity, UserEntity } from '.';
import { facilityEntity } from './FacilityEntity';
import { InvoiceEntity } from './Invoice.entity';
import { RoomUnitPriceEntity } from './RoomUnitPriceEntity';

export interface RoomEntity {
  id: number;
  imageUrls: string[];
  name: string; // name of room
  maxTenant?: number; //
  price: number;
  area: number;
  isActive: boolean;
  dateBecomeAvailable?: string;
  dueDate?: string;
  deposit?: number;
  debt?: number;
  description?: string;

  buildingId: number;
  building: BuildingEntity;

  tenants: UserEntity[];
  facilities: facilityEntity[];
  invoices: InvoiceEntity[];
  roomUnitPrices: RoomUnitPriceEntity[];
}
