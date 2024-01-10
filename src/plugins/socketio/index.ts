import { getAccessTokenFromStorage } from '@/store/slices/auth.slice';
import { Socket, io } from 'socket.io-client';

const URL = import.meta.env.VITE_BACKEND_URL;
const token = getAccessTokenFromStorage();

export function newSocket(nameSpace = ''): Socket {
  return io(`${URL}/${nameSpace}`, {
    autoConnect: false,
    extraHeaders: {
      token: token,
    },
  });
}
