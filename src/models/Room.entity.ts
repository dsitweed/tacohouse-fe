import { BuildingEntity, UserEntity } from '.';

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

  buildingId: number;
  building: BuildingEntity;

  tenants: UserEntity[];
  facilities: string[];
  invoices: string[];
  roomUnitPrices: string[];
}
