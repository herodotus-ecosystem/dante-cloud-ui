import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosInstance,
} from '@/lib/declarations';
import type {
  AxiosHttpResult,
  AxiosInstanceHooks,
  HttpRequestOptions,
  HttpResult,
} from '@/lib/declarations';

import qs from 'qs';
import { ContentTypeEnum } from '@/lib/enums';
import { IS_DEV } from '@/lib/utils';
import { lodash, variables, createApi, createBpmnApi, createOssApi, Axios } from '../base';

import { getSystemHeaders } from '@/stores';
import { processor } from './status';

const logResponse = (response: AxiosHttpResult<any>) => {
  if (process.env.NODE_ENV === 'development') {
    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255,
    )})`;
    console.log(
      '%c┍------------------------------------------------------------------------------------------┑',
      `color:${randomColor};`,
    );
    console.log('| 请求地址：', response.config.url);
    console.log('| 请求类型：', lodash.toUpper(response.config.method));
    console.log('| 请求参数：', qs.parse(response.config.params));
    console.log('| 响应数据：', response.data);
    console.log(
      '%c┕------------------------------------------------------------------------------------------┙',
      `color:${randomColor};`,
    );
  }
};

const isSuccess = <T = any>(response: AxiosHttpResult<T>) => {
  if (response && response.status) {
    return /^(2|3)\d{2}$/.test(String(response.status));
  } else {
    return false;
  }
};

export const axiosInstanceHooks: AxiosInstanceHooks = {
  // 请求之前处理config
  onRequestHook(config, options) {
    return config;
  },

  /**
   * @description: 请求成功处理
   */
  onResponseSuccessHook<T = unknown>(
    response: AxiosHttpResult<T>,
    options?: HttpRequestOptions,
  ): AxiosHttpResult<T> {
    if (isSuccess(response)) {
      if (options) {
        const { isTransformResponse } = options;
        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (isTransformResponse && 'statusText' in response) {
          return response.data;
        }
      }
    }
    return response;
  },

  onResponseErrorHook<D = any>(error: AxiosError, options?: HttpRequestOptions): HttpResult<D> {
    return error?.response?.data as HttpResult<D>;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors(config: InternalAxiosRequestConfig) {
    const headers = getSystemHeaders();

    Object.keys(headers).forEach((key) => {
      if (config.headers && !config.headers[key]) {
        config.headers[key] = headers[key];
      }
    });

    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors<T = unknown>(response: AxiosHttpResult<T>): Promise<AxiosHttpResult<T>> {
    if (IS_DEV) {
      logResponse(response);
    }
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (isSuccess(response)) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },

  requestInterceptorsError(axiosInstance: AxiosInstance, error: AxiosError): Promise<any> {
    return Promise.reject(error);
  },

  responseInterceptorsError(axiosInstance: AxiosInstance, error: AxiosError): Promise<any> {
    return processor(axiosInstance, error);
  },
};

const http = new Axios(
  {
    timeout: 1000 * 12,
    withCredentials: true,
  },
  axiosInstanceHooks,
  {
    contentType: ContentTypeEnum.JSON,
    // 是否阻止重复请求，
    prohibitRepeatRequests: true,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // 消息提示类型
    errorMessageMode: 'message',
    // 是否携带token
    withToken: true,
  },
);

const api = createApi(
  variables.getProject(),
  variables.getClientId(),
  variables.getClientSecret(),
  http,
  variables.isUseOidc(),
);

const bpmnApi = createBpmnApi(
  variables.getProject(),
  variables.getClientId(),
  variables.getClientSecret(),
  http,
);

const ossApi = createOssApi(
  variables.getProject(),
  variables.getClientId(),
  variables.getClientSecret(),
  http,
);

export { api, bpmnApi, ossApi };
