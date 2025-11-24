import type {
  RawAxiosRequestHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from '../base';

import { ContentTypeEnum } from '@/enums';
/**
 * Herodotus Cloud 后端 API 响应统一实体定义
 */
export type Result<T = unknown> = {
  code: number;
  message: string;
  path: string;
  data: T;
  status: number;
  timestamp: string;
  error?: { detail: string; message: string; code: string; field: string };
};
/**
 * Http 请求错误信息提示模式
 */
export type HttpErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
/**
 * 后端 API Http 请求返回数据类型定义
 */
export type HttpResult<T = unknown> = Result<T> & T[] & T & unknown;
/**
 * Axios 请求返回数据类型定义
 */
export type AxiosHttpResult<T = unknown> = AxiosResponse<HttpResult<T>> | HttpResult<T>;
/**
 * Axios Http 响应状态信息实体定义，方便解析具体内容
 */
export interface AxiosResponseStatus {
  message: string;
  status: number;
  code: number;
  detail?: string;
}
/**
 * 重试请求定义
 */
export type AxiosRetryRequest = (value: any) => void;
/**
 * Http 实例配置属性
 */
export interface HttpClientOptions {
  project: string;
  clientId: string;
  clientSecret: string;
  oidc?: boolean;
  proxy?: string;
}
/**
 * Http 请求选项
 */
export interface HttpRequestOptions {
  // 指定当前请求的 ContentType 类型
  contentType: ContentTypeEnum;
  // 禁止重复发送请求
  prohibitRepeatRequests?: boolean;
  // 是否转换响应结果
  isTransformResponse?: boolean;
  // Error message prompt type
  errorMessageMode?: HttpErrorMessageMode;
  // Whether to send token in header
  withToken?: boolean;
}

export interface AxiosInstanceHooks {
  /**
   * @description: 请求前处理配置
   */
  onRequestHook?: (config: AxiosRequestConfig, options: HttpRequestOptions) => AxiosRequestConfig;

  /**
   * @description: 请求成功处理
   */
  onResponseSuccessHook?: <T = any>(
    response: AxiosHttpResult<T>,
    options?: HttpRequestOptions,
  ) => AxiosHttpResult<T>;

  /**
   * @description: 请求失败处理
   */
  onResponseErrorHook?: <T = unknown>(
    error: AxiosError,
    options?: HttpRequestOptions,
  ) => AxiosHttpResult<T>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors: <T = unknown>(response: AxiosHttpResult<T>) => Promise<AxiosHttpResult<T>>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsError: (axiosInstance: AxiosInstance, error: AxiosError) => Promise<any>;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsError: (axiosInstance: AxiosInstance, error: AxiosError) => Promise<any>;
}

export interface HttpHeaderPolicy<D = any> {
  headers: RawAxiosRequestHeaders;
  dataConvert: (params: D) => D | string;
}

export interface HttpRequestPolicy {
  config: AxiosRequestConfig;
  options: HttpRequestOptions;
}
