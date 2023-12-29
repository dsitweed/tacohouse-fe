/* FOR API BACK END */
export const AUTH_PATH = '/auth';
export const BUILDINGS_PATH = '/buildings';
export const ROOMS_PATH = '/rooms';
export const TENANTS_PATH = '/tenants';
export const ROOM_UNIT_PRICES_PATH = '/room-unit-prices';
export const BUILDING_UNIT_PRICES_PATH = '/building-unit-prices';
export const FACILITIES_PATH = '/facilities';
export const MANAGERS_PATH = '/managers';
export const INVOICES_PATH = '/invoices';
export const FILE_PATH = '/file';
export const USER_PATH = '/user';
export const ME_PATH = '/me';
export const VOTES_PATH = '/votes';

/* FOR FRONT END */
export const routes = {
  managers: {
    index: '/managers',
    buildings: {
      index: '/managers/buildings',
    },
    tenants: {
      index: '/managers/tenants',
    },
    rooms: {
      index: '/managers/rooms',
    },
  },
};
