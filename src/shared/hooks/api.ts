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
    notification.error({ message: response.message });
  }

  async function getById(id: number, suffix?: string) {
    let response;

    if (suffix) {
      // replace / at beginning of suffix if have
      response = await axios.get<Response.ISingleResult<T>>(
        `${url}/${id}/${suffix.replace('/', '')}`,
      );
    } else {
      response = await axios.get<Response.ISingleResult<T>>(`${url}/${id}`);
    }

    if (response.success) return response;
    else notification.error({ message: response.message });
  }

  async function create(data?: T) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function getAllExtend(extendUrl: string, params?: any) {
    const response = await axios.get<Response.IPaginationResult<T>>(
      `${url}${extendUrl}`,
      {
        params: params,
      },
    );

    if (response.success) return response;
    else notification.error({ message: response.message });
  }

  async function getByIdExtend(extendUrl: string, id: number) {
    const response = await axios.get<Response.ISingleResult<T>>(
      `${url}${extendUrl}/${id}`,
    );

    if (response.success) return response;
    else notification.error({ message: response.message });
  }

  async function createExtend(extendUrl: string, data?: T) {
    const response = await axios.post(`${url}${extendUrl}`, data);

    if (response.success) return response;
    else notification.error({ message: response.message });
  }

  async function updateExtend(extendUrl: string, id: number, data: T) {
    const response = await axios.patch(`${url}${extendUrl}/${id}`, data);

    if (response.success) return response;
    else notification.error({ message: response.message });
  }

  async function deleteByIdExtend(extendUrl: string, id: number) {
    const response = await axios.delete(`${url}${extendUrl}/${id}`);

    if (response.success) return response;
    else {
      notification.error({ message: response.message });
      throw new Error();
    }
  }

  return {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getAllExtend,
    getByIdExtend,
    createExtend,
    updateExtend,
    deleteByIdExtend,
  };
};
