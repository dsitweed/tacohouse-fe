export interface ServiceEntity {
  id: number;
  building_id: number;
  electricity_price: number;
  water_price: number;
  wifi_price?: number;
  light_price: number; 
  parking_price?: number;
  environment_price: number;
  // Phí bảo trì và phi dịch vụ
  charing_price?: number;
}