/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { IResponse } from '@/plugins/axios';

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<IResponse<T>> {}
}
