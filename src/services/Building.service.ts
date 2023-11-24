import { TIME_OUT } from './settings';
import { BuildingEntity } from '@/models/Building.entity';
import { ServiceEntity } from '@/models/Service.entity';

import ava1 from '@/assets/icons/logo-shopify.svg';
import ava2 from '@/assets/icons/logo-atlassian.svg';
import ava3 from '@/assets/icons/logo-slack.svg';
import ava4 from '@/assets/icons/logo-spotify.svg';
import ava5 from '@/assets/icons/logo-jira.svg';
import ava6 from '@/assets/icons/logo-invision.svg';

export const mockServicesSection: ServiceEntity[] = [
  {
    id: 1,
    building_id: 1,
    electricity_price: 3000,
    water_price: 40000,
    wifi_price: 30000,
    light_price: 20000,
    environment_price: 10000,
  },
];

export const mockBuildingSection: BuildingEntity[] = [
  {
    id: 1, // unique for define in antd table
    name: 'Building A1',
    address: 'New York No. 1 Lake Park',
    building: '', // now not save value
    room: 12,
    tenant: 12,
    income: 12000,
    completion: 80,
    owner: 'Nguyen Van Ky',
    icon: ava1,
  },
  {
    id: 2,
    building: '', // now not save value
    name: 'Building A2',
    room: 10,
    tenant: 10,
    address: 'Quang Minh, Me Linh, Ha Noi',
    income: 12000,
    completion: 100,
    owner: 'Nguyen Van Ky',
    icon: ava2,
  },
  {
    id: 3,
    building: '', // now not save value
    name: 'Building A1',
    room: 12,
    tenant: 12,
    address: 'New York No. 1 Lake Park',
    income: 12000,
    completion: 80,
    owner: 'Nguyen Van Ky',
    icon: ava3,
  },
  {
    id: 4,
    building: '', // now not save value
    name: 'Building A1',
    room: 12,
    tenant: 12,
    address: 'New York No. 1 Lake Park',
    income: 12000,
    completion: 80,
    owner: 'Nguyen Thi Mung',
    icon: ava5,
  },
  {
    id: 5,
    building: '', // now not save value
    name: 'Building A2',
    room: 10,
    tenant: 10,
    address: 'Quang Minh, Me Linh, Ha Noi',
    income: 12000,
    completion: 100,
    owner: 'Nguyen Thi Mung',
    icon: ava6,
  },
  {
    id: 6,
    building: '', // now not save value
    name: 'Building A1',
    room: 12,
    tenant: 12,
    address: 'New York No. 1 Lake Park',
    income: 12000,
    completion: 80,
    owner: 'Nguyen Thi Mung',
    icon: ava1,
  },
  {
    id: 7,
    building: '', // now not save value
    name: 'Building A2',
    room: 10,
    tenant: 10,
    address: 'Quang Minh, Me Linh, Ha Noi',
    income: 12000,
    completion: 100,
    owner: 'Nguyen Thi Mung',
    icon: ava2,
  },
  {
    id: 8,
    building: '', // now not save value
    name: 'Building A1',
    room: 12,
    tenant: 12,
    address: 'New York No. 1 Lake Park',
    income: 12000,
    completion: 80,
    owner: 'Nguyen Thi Mung',
    icon: ava1,
  },
  {
    id: 9,
    building: '', // now not save value
    name: 'Building A2',
    room: 10,
    tenant: 10,
    address: 'Quang Minh, Me Linh, Ha Noi',
    income: 12000,
    completion: 100,
    owner: 'Nguyen Thi Mung',
    icon: ava2,
  },
  {
    id: 10,
    building: '', // now not save value
    name: 'Building A2',
    room: 10,
    tenant: 10,
    address: 'Quang Minh, Me Linh, Ha Noi',
    income: 12000,
    completion: 100,
    owner: 'Nguyen Thi Mung',
    icon: ava4,
  },
];

export class BuildingService {
  static async getBuildings(owner: string): Promise<BuildingEntity[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBuildingSection.filter((item) => item.owner === owner));
      }, TIME_OUT);
    });
  }

  static async getService(
    building_id: number,
  ): Promise<ServiceEntity | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          mockServicesSection.find((item) => item.building_id === building_id),
        );
      }, TIME_OUT);
    });
  }

  static async getBuilding(building_id: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBuildingSection.find((item) => item.id === building_id));
      }, TIME_OUT);
    });
  }
}
