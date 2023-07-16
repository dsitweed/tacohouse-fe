import { TenantEntity } from "@/model/Tenant.entity";

import face from "@/assets/images/face-1.jpg";
import face2 from "@/assets/images/face-2.jpg";
import face3 from "@/assets/images/face-3.jpg";
import face4 from "@/assets/images/face-4.jpg";
import face5 from "@/assets/images/face-5.jpeg";
import face6 from "@/assets/images/face-6.jpeg";
import { TIME_OUT } from "./settings";

const mockTenantSection: TenantEntity[] = [
  {
    id: 1,
    avatar: face,
    name: "Michael John",
    email: "michael@gmail.com",
    role: ["Tenant", "Vicegerent"],
    is_active: true,
    room: "P123",
    building: "A1",
    address: "New York No. 1 Lake Park",
  },
  {
    id: 2,
    avatar: face2,
    name: "Michael John",
    email: "michael@gmail.com",
    role: ["Tenant", "Vicegerent"],
    is_active: false,
    room: "P123",
    building: "A1",
    address: "New York No. 1 Lake Park",
  },
  {
    id: 3,
    avatar: face3,
    name: "Michael John",
    email: "michael@gmail.com",
    role: ["Tenant", "Vicegerent"],
    is_active: false,
    room: "P123",
    building: "A1",
    address: "New York No. 1 Lake Park",
  },
  {
    id: 4,
    avatar: face4,
    name: "Michael John",
    email: "michael@gmail.com",
    role: ["Tenant", "Vicegerent"],
    is_active: true,
    room: "P123",
    building: "A1",
    address: "New York No. 1 Lake Park",
  },
];

export class TenantService {
  static async getTenants(): Promise<TenantEntity[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockTenantSection);
      }, TIME_OUT);
    });
  }
}
