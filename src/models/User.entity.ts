import { BuildingEntity, RoomEntity } from '.';

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  role: string;
  refreshTOken?: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  address: string;
  citizenNumber?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  dob?: Date | string;

  buildings: BuildingEntity[];
  roomId: number;
  room: RoomEntity;
}
