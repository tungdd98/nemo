import { api } from '@nemo/api';
import { AxiosResponse } from 'axios';
import { UserEndpointsEnum } from '../constants/user.endpoints';

const getUsersApi = (): Promise<AxiosResponse> => {
  return api.get(UserEndpointsEnum.LIST);
};

export const userApi = {
  getUsersApi,
};
