import { BuildingEntity, UserEntity } from '.';
import { facilityEntity } from './FacilityEntity';

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
  invoices: string[];
  roomUnitPrices: string[];
}
