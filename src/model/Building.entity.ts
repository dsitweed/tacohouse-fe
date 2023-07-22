
export interface BuildingEntity {
  id: number;
  name: string;
  room: number; // number of rooms
  tenant: number; // number of tenants
  address: string;
  income: number;
  completion: number; // level of completion
  icon?: string | undefined;
}