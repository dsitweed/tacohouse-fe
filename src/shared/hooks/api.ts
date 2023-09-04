import { App } from 'antd';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApiClient = <T = any>(url: string) => {
  const { notification } = App.useApp();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function getAll(params?: any) {
    const response = await axios.get<Response.IPaginationResult<T>>(url, {
      params: params,
    });

    if (response.success) return response;
    else notification.error({ message: response.message });
  }

  async function getById(id: number) {
    const response = await axios.get<T>(`${url}/${id}`);

    if (response.success) return response;
    else notification.error({ message: response.message });
  }

  async function create(data: T) {
    const response = await axios.post(url, data);

    if (response.success) return response;
    else notification.error({ message: response.message });
  }

  async function update(id: number, data: T) {
    const response = await axios.patch(`${url}/${id}`, data);

    if (response.success) return response;
    else notification.error({ message: response.message });
  }

  async function deleteById(id: number) {
    const response = await axios.delete(`${url}/${id}`);

    if (response.success) return response;
    else {
      notification.error({ message: response.message });
      throw new Error();
    }
  }

  return { getAll, getById, create, update, deleteById };
};
