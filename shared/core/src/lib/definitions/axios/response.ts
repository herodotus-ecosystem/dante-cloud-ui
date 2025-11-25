import type { HttpResult, AxiosHttpResult, AxiosResponseStatus } from '@/declarations';

import { lodash } from '../../utils';

import qs from 'qs';

export const parseResponseStatus = <T = any>(
  response: AxiosHttpResult<T>,
  message?: string,
): AxiosResponseStatus => {
  let data = {} as HttpResult<T>;

  // 判断是否为 AxiosResponse<HttpResult<T>> 类型
  if ('statusText' in response) {
    data = response.data;
  } else {
    data = response;
  }

  const responseStatus = { status: response.status, code: 0, detail: '' } as AxiosResponseStatus;

  responseStatus.code = data && data.code ? data.code : 0;
  responseStatus.detail = data.error && data.error.detail ? data.error.detail : '';

  if (data.message) {
    responseStatus.message = data.message;
  } else {
    if (data.error && data.error.message) {
      responseStatus.message = data.error.message;
    } else {
      if (message) {
        responseStatus.message = message;
      }
    }
  }

  return responseStatus;
};

export const logResponse = <T = any>(response: AxiosHttpResult<T>) => {
  const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255,
  )})`;
  console.log(
    '%c┍------------------------------------------------------------------------------------------┑',
    `color:${randomColor};`,
  );

  if ('config' in response) {
    // 判断是否为 AxiosResponse<HttpResult<T>> 类型
    console.log('| 请求地址：', response.config.url);
    console.log('| 请求类型：', lodash.toUpper(response.config.method));
    console.log('| 请求参数：', qs.parse(response.config.params));
    console.log('| 响应数据：', response.data);
  } else if ('status' in response) {
    // 判断是否为 HttpResult<T> 类型
    console.log('| 响应数据：', response.data);
  } else {
    console.log('| 响应数据：', response);
  }

  console.log(
    '%c┕------------------------------------------------------------------------------------------┙',
    `color:${randomColor};`,
  );
};

export const isSuccess = <T = any>(response: AxiosHttpResult<T>) => {
  if (response && 'statusText' in response) {
    return /^(2|3)\d{2}$/.test(String(response.status));
  } else {
    return false;
  }
};
