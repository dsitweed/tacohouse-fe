import { RoomEntity } from '.';

export enum FacilityStatus {
  GOOD,
  BAD,
  FIXING,
}

export interface facilityEntity {
  id: number;
  name: string;
  status: FacilityStatus;

  price?: number;
  buyPrice?: number;
  brand?: string;
  facilityTypeId: number;
  facilityType: number;
  roomId: number;
  room: RoomEntity;
}
