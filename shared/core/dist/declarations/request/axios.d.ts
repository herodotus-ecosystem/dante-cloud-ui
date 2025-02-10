import { AxiosRequestConfig, RawAxiosRequestConfig, AxiosRequestHeaders, RawAxiosRequestHeaders, AxiosProgressEvent, AxiosInstance, AxiosResponse, AxiosError, Canceler, InternalAxiosRequestConfig, ParamsSerializerOptions } from 'axios';
import { HttpResult } from './http';
import { ContentTypeEnum } from '../../enums';
export type AxiosHttpResult<T = unknown> = AxiosResponse<HttpResult<T>> | HttpResult<T>;
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export type RetryRequest = (value: any) => void;
export interface RequestOptions {
    contentType: ContentTypeEnum;
    prohibitRepeatRequests?: boolean;
    isTransformResponse?: boolean;
    errorMessageMode?: ErrorMessageMode;
    withToken?: boolean;
}
export interface AxiosTransform {
    /**
     * @description: 请求前处理配置
     */
    beforeRequestHook?: (config: RawAxiosRequestConfig, options: RequestOptions) => RawAxiosRequestConfig;
    /**
     * @description: 请求成功处理
     */
    transformRequestHook?: <D = unknown>(response: AxiosResponse<HttpResult<D>>, options?: RequestOptions) => AxiosHttpResult<D>;
    /**
     * @description: 请求失败处理
     */
    requestCatchHook?: <D = unknown>(error: AxiosError, options?: RequestOptions) => HttpResult<D>;
    /**
     * @description: 请求之前的拦截器
     */
    requestInterceptors: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
    /**
     * @description: 请求之后的拦截器
     */
    responseInterceptors: (response: AxiosResponse<any>) => Promise<any>;
    /**
     * @description: 请求之前的拦截器错误处理
     */
    requestInterceptorsCatch: (axiosInstance: AxiosInstance, error: AxiosError) => Promise<any>;
    /**
     * @description: 请求之后的拦截器错误处理
     */
    responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: AxiosError) => Promise<any>;
}
export interface AxiosConfig extends RawAxiosRequestConfig {
    authenticationScheme?: string;
    transform?: AxiosTransform;
    requestOptions?: RequestOptions;
}
export interface Policy {
    headers: RawAxiosRequestHeaders;
    dataConvert: (params: Record<string, any>) => any;
}
export interface AxiosRequestPolicy {
    config: RawAxiosRequestConfig;
    options: RequestOptions;
    dataConvert: (params: Record<string, any>) => any;
}
export type { AxiosRequestConfig, RawAxiosRequestConfig, AxiosRequestHeaders, RawAxiosRequestHeaders, AxiosProgressEvent, ParamsSerializerOptions, InternalAxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError, Canceler, };
