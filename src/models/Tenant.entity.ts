export interface TenantEntity {
  id: number | string;
  user_id?: number | string;
  room_id?: number | string;
  building_id?: number | string;
  // just for test attribute
  name: string; // user name
  room: string; // room name or number
  building: string; // building name
  address: string;
  email: string;
  avatar?: string;
  role?: string[];
  is_active: boolean;
}
