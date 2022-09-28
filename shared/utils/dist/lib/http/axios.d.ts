import type { AxiosRequestConfig } from 'axios';
import type { AxiosTransform, AxiosHttpResult, RequestOptions } from '../../declarations';
import { ContentTypeEnum } from '../../enums';
/**
 * @description:  axios module
 */
export declare class Axios {
    private axiosInstance;
    private readonly axiosConfig;
    private readonly axiosTransform;
    private readonly defaultRequestOptions;
    constructor(config: AxiosRequestConfig, transform: AxiosTransform, options: RequestOptions);
    private createAxiosInstance;
    private getAxiosConfig;
    private getAxiosTransform;
    private getAxiosInstance;
    private getDefaultRequestOptions;
    private getPolicy;
    private setupInterceptors;
    private mergeRequestOptions;
    private mergeRequestConfigs;
    private setupPolicy;
    get<T = any, D = any>(url: string, params?: {}, options?: {
        contentType: ContentTypeEnum;
    }): Promise<AxiosHttpResult<T>>;
    post<T = any, D = any>(url: string, data: D, options?: {
        contentType: ContentTypeEnum;
    }, config?: AxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
    put<T = any, D = any>(url: string, data: D, options?: {
        contentType: ContentTypeEnum;
    }, config?: AxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
    delete<T = any, D = any>(url: string, data?: D, options?: {
        contentType: ContentTypeEnum;
    }): Promise<AxiosHttpResult<T>>;
    request<T = any, D = any>(config: AxiosRequestConfig<D>, options?: RequestOptions): Promise<AxiosHttpResult<T>>;
}
