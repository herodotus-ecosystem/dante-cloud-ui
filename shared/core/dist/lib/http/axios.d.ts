import { AxiosTransform, AxiosHttpResult, RequestOptions, RawAxiosRequestConfig } from '../../declarations';
import { ContentTypeEnum } from '../../enums';

/**
 * @description:  axios module
 */
export declare class Axios {
    private axiosInstance;
    private readonly axiosConfig;
    private readonly axiosTransform;
    private readonly defaultRequestOptions;
    constructor(config: RawAxiosRequestConfig, transform: AxiosTransform, options: RequestOptions);
    private createAxiosInstance;
    private getAxiosConfig;
    private getAxiosTransform;
    private getAxiosInstance;
    private getDefaultRequestOptions;
    private getPolicy;
    private setupInterceptors;
    /**
     * 把当前请求的 options 与全局 options 整合获得一个完整的 options
     */
    private mergeRequestOptions;
    /**
     * 把当前请求的 AxiosRequestConfig 与全局 AxiosRequestConfig 整合获得一个完整的 AxiosRequestConfig
     */
    private mergeRequestConfigs;
    private setupPolicy;
    get<T = any, D = any>(url: string, params?: {}, options?: {
        contentType: ContentTypeEnum;
    }): Promise<AxiosHttpResult<T>>;
    /**
     * POST
     *
     * <T> 返回响应中实际 data 中的内容类型
     * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
     *
     * @param url 请求地址
     * @param data 放置在 RequestBody 中的数据
     * @param options 对当前请求设置的参数。
     * @param config 当前请求对 axios 特殊设置
     * @returns
     */
    post<T = any, D = any>(url: string, data: D, options?: {
        contentType: ContentTypeEnum;
    }, config?: RawAxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
    /**
     * POST
     *
     * <T> 返回响应中实际 data 中的内容类型
     * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
     *
     * @param url 请求地址
     * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
     * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
     * @param config 当前请求对 axios 特殊设置
     * @returns
     */
    postWithParams<T = any, D = any>(url: string, params?: {}, data?: D, options?: {
        contentType: ContentTypeEnum;
    }, config?: RawAxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
    /**
     * 更新操作。
     *
     * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
     *
     * <T> 返回响应中实际 data 中的内容类型
     * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
     *
     * @param url 请求地址
     * @param data 放置在 RequestBody 中的数据
     * @param options 对当前请求设置的参数。
     * @param config 当前请求对 axios 特殊设置
     * @returns 响应数据
     */
    put<T = any, D = any>(url: string, data: D, options?: {
        contentType: ContentTypeEnum;
    }, config?: RawAxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
    /**
     * 更新操作。
     *
     * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
     *
     * <T> 返回响应中实际 data 中的内容类型
     * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
     *
     * @param url 请求地址
     * @param data 放置在 RequestBody 中的数据
     * @param options 对当前请求设置的参数。
     * @param config 当前请求对 axios 特殊设置
     * @returns 响应数据
     */
    putWithParams<T = any, D = any>(url: string, params?: {}, data?: D, options?: {
        contentType: ContentTypeEnum;
    }, config?: RawAxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
    /**
     * 删除操作
     *
     * <T> 返回响应中实际 data 中的内容类型
     * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
     *
     * @param url 请求地址
     * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
     * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
     * @param options 对当前请求设置的参数。
     * @returns 响应数据
     */
    delete<T = any, D = any>(url: string, data?: D, options?: {
        contentType: ContentTypeEnum;
    }): Promise<AxiosHttpResult<T>>;
    /**
     * 删除操作。
     *
     * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
     *
     * <T> 返回响应中实际 data 中的内容类型
     * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
     *
     * @param url 请求地址
     * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
     * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
     * @param options 对当前请求设置的参数。
     * @returns 响应数据
     */
    deleteWithParams<T = any, D = any>(url: string, params?: {}, data?: D, options?: {
        contentType: ContentTypeEnum;
    }): Promise<AxiosHttpResult<T>>;
    /**
     * 请求核心方法
     * @param config axios request 必要参数
     * @param options 针对每个请求特别指定的参数
     * @returns 响应数据
     */
    request<T = any, D = any>(config: RawAxiosRequestConfig<D>, options?: RequestOptions): Promise<AxiosHttpResult<T>>;
}
