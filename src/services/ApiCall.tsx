import AsyncStorage from '@react-native-community/async-storage';
import axios, { AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import { v4 as uuid } from 'uuid';
import Config from 'react-native-config';

export const convertFromApiToApp = (
  result: any,
  mapping: Array<{
    api: string;
    app: string;
    defaultValue?: any;
  }>,
): Object => {
  let ret: any = {};
  mapping.forEach(({ api, app, defaultValue }) => {
    if (!(api in result)) {
      if (defaultValue !== undefined) {
        ret[app] = defaultValue;
      }
      return;
    }
    if (result[api] !== null) {
      ret[app] = result[api];
    } else {
      ret[app] = '';
    }
  });
  return ret;
};

export const requestGet = async (
  endpoint: string,
  options?: {
    data?: Object;
    params?: Object;
    needToken?: boolean;
  },
) => {
  const token: any = await AsyncStorage.getItem('authToken');
  const auth = JSON.parse(token);
  const userToken = options?.needToken ? auth : null;

  let header = {
    'content-type': 'application/json',
    ...(options?.needToken && { Authorization: userToken }),
  };
  const response: AxiosResponse = await axios.request({
    baseURL: Config.API_BASE,
    url: endpoint,
    method: 'GET',
    data: options?.data,
    params: options?.params,
    timeout: 20000,
    headers: header,
  });
  return response;
};

export const requestPost = async (
  endpoint: string,
  options?: {
    data?: any;
    params?: Object;
    needToken?: boolean;
    formData?: boolean;
  },
) => {
  const token: any = await AsyncStorage.getItem('authToken');
  const auth = JSON.parse(token);
  const userToken = options?.needToken ? auth : null;
  const data = options?.data;
  let header = {
    'content-type': options?.formData
      ? 'multipart/form-data'
      : 'application/json',
    ...(options?.needToken && { Authorization: userToken }),
  };
  let formData = new FormData();
  if (options?.formData) {
    // Infer the type of the image
    const file = {
      uri: data?.path,
      name: Platform.OS === 'ios' ? data?.filename : uuid(),
      type: data?.mime,
    };
    formData.append('avatar', file);
  }
  const response: AxiosResponse = await axios.request({
    baseURL: Config.API_BASE,
    url: endpoint,
    method: 'POST',
    data: options?.formData ? formData : options?.data,
    params: options?.params,
    timeout: 20000,
    headers: header,
  });
  return response;
};
