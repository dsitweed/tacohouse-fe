import { BuildingEntity, RoomEntity } from '.';

export interface RoomUnitPriceEntity {
  id: number;
  before: number;
  current: number;

  roomId: number;
  room: RoomEntity;
  buildingUnitPriceId: number;
  buildingUnitPrice: BuildingEntity;
}
