import { RoomEntity } from '.';
import { BuildingUnitPriceEntity } from './BuildingUnitPriceEntity';

export interface RoomUnitPriceEntity {
  id: number;
  before: number;
  current: number;

  roomId: number;
  room: RoomEntity;
  buildingUnitPriceId: number;
  buildingUnitPrice: BuildingUnitPriceEntity;
}
