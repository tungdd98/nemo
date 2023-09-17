import { api } from '../axios';
import { AxiosResponse } from 'axios';
import { UserEndpointsEnum } from '@nemo/common-constants';
import { UserRequest, UserSearchParams } from '@nemo/common-types';

const getUsersApi = (params: UserSearchParams): Promise<AxiosResponse> => {
  return api.get(UserEndpointsEnum.LIST, {
    params,
  });
};

const createUserApi = (data: UserRequest): Promise<AxiosResponse> => {
  return api.post(UserEndpointsEnum.CREATE, data);
};

const updateUserApi = (
  id: string,
  data: UserRequest
): Promise<AxiosResponse> => {
  return api.put(UserEndpointsEnum.UPDATE.replace(':id', id), data);
};

const deleteUserApi = (id: string): Promise<AxiosResponse> => {
  return api.delete(UserEndpointsEnum.DELETE.replace(':id', id));
};

export const userApi = {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
};
