import { TenantEntity } from "./Tenant.entity";

export interface RoomEntity {
  id: number;
  name: string | number; // name of room
  // tenant: TenantEntity[]; // real
  tenant_name: string[]; // for demo
  max_number_tenant?: number; //
  price: number;
  previous_electricity: number;
  current_electricity: number;
  electricity_price: number;
  water_price: number;
  wifi_price?: number;
  light_price: number; 
  parking_price?: number;
  environment_price: number;
  // Phí bảo trì và phi dịch vụ
  charing_price?: number;
  debt?: number;
  area?: number;
  deposit?: number;
  paid?: boolean;
}