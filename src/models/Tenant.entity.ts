import { RoomEntity } from '.';

export interface TenantEntity {
  id: number;
  roomId?: number | string;
  firstName: string;
  lastName: string;
  room: RoomEntity; // room name or number
  building: string; // building name
  address: string;
  email: string;
  avatar?: string;
  role?: string[];
}
