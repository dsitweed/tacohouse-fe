import { BuildingEntity, RoomEntity } from '.';

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  role: string;
  refreshToken?: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  address: string;
  citizenNumber?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  citizenImageUrls: string[];
  dob?: Date | string;

  buildings: BuildingEntity[];
  roomId: number;
  room: RoomEntity;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export function getFullUserName(user: UserEntity): string {
  if (!user?.lastName && !user?.firstName) return 'NaN';
  return `${user?.lastName || ''} ${user?.firstName || ''}`;
}
