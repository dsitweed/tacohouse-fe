export const getUniqueRoomName = (idUser1: number, idUser2: number) => {
  return `room_${[idUser1, idUser2].sort().join('_')}`;
};
