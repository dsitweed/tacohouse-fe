import { BuildingEntity } from "@/model/Building.entity";
import { TIME_OUT } from './settings'

import ava1 from "@/assets/images/logo-shopify.svg";
import ava2 from "@/assets/images/logo-atlassian.svg";
import ava3 from "@/assets/images/logo-slack.svg";
import ava4 from "@/assets/images/logo-spotify.svg";
import ava5 from "@/assets/images/logo-jira.svg";
import ava6 from "@/assets/images/logo-invision.svg";
import { ServiceEntity } from "@/model/Service.entity";

const mockServicesSection: ServiceEntity[] = [
  {
    id: 1,
    building_id: 1,
    electricity_price: 3000,
    water_price: 40000,
    wifi_price: 30000,
    light_price: 20000,
    environment_price: 10000,
  },
]

const mockBuildingSection: BuildingEntity[] = [
  {
    id: 1, // unique for define in antd table
    name: "Building A1",
    address: "New York No. 1 Lake Park",
    building: "", // now not save value
    room: 12,
    tenant: 12,
    income: 12000,
    completion: 80,
    owner: "Nguyen Van Ky",
    icon: ava1,
  },
  {
    id: 2,
    building: "", // now not save value
    name: "Building A2",
    room: 10,
    tenant: 10,
    address: "Quang Minh, Me Linh, Ha Noi",
    income: 12000,
    completion: 100,
    owner: "Nguyen Van Ky",
    icon: ava2,
  },
  {
    id: 3,
    building: "", // now not save value
    name: "Building A1",
    room: 12,
    tenant: 12,
    address: "New York No. 1 Lake Park",
    income: 12000,
    completion: 80,
    owner: "Nguyen Van Ky",
    icon: ava3,
  },
  {
    id: 4,
    building: "", // now not save value
    name: "Building A1",
    room: 12,
    tenant: 12,
    address: "New York No. 1 Lake Park",
    income: 12000,
    completion: 80,
    owner: "Nguyen Thi Mung",
    icon: ava5,
  },
  {
    id: 5,
    building: "", // now not save value
    name: "Building A2",
    room: 10,
    tenant: 10,
    address: "Quang Minh, Me Linh, Ha Noi",
    income: 12000,
    completion: 100,
    owner: "Nguyen Thi Mung",
    icon: ava6,
  },
  {
    id: 6,
    building: "", // now not save value
    name: "Building A1",
    room: 12,
    tenant: 12,
    address: "New York No. 1 Lake Park",
    income: 12000,
    completion: 80,
    owner: "Nguyen Thi Mung",
    icon: ava1,
  },
  {
    id: 7,
    building: "", // now not save value
    name: "Building A2",
    room: 10,
    tenant: 10,
    address: "Quang Minh, Me Linh, Ha Noi",
    income: 12000,
    completion: 100,
    owner: "Nguyen Thi Mung",
    icon: ava2,
  },
  {
    id: 8,
    building: "", // now not save value
    name: "Building A1",
    room: 12,
    tenant: 12,
    address: "New York No. 1 Lake Park",
    income: 12000,
    completion: 80,
    owner: "Nguyen Thi Mung",
    icon: ava1,
  },
  {
    id: 9,
    building: "", // now not save value
    name: "Building A2",
    room: 10,
    tenant: 10,
    address: "Quang Minh, Me Linh, Ha Noi",
    income: 12000,
    completion: 100,
    owner: "Nguyen Thi Mung",
    icon: ava2,
  },
  {
    id: 10,
    building: "", // now not save value
    name: "Building A2",
    room: 10,
    tenant: 10,
    address: "Quang Minh, Me Linh, Ha Noi",
    income: 12000,
    completion: 100,
    owner: "Nguyen Thi Mung",
    icon: ava4,
  },
];


export class BuildingService {
  static async getBuildings(owner: string | null): Promise<BuildingEntity[]> {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockBuildingSection.filter((item) => item.owner === owner));
      }, TIME_OUT);
    });
  }

  static async getService(building_id: number): Promise<ServiceEntity | undefined> {
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockServicesSection.find(item => item.building_id === building_id));
      }, TIME_OUT);
    })
  }
}
