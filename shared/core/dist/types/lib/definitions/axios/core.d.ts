import { AxiosHttpResult, AxiosInstanceHooks, AxiosRequestConfig, HttpRequestOptions } from '../../../declarations';
import { ContentTypeEnum } from '../../../enums';
/**
 * @description:  axios module
 */
export declare class Axios {
    private axiosInstance;
    private readonly defaultAxiosRequestConfig;
    private readonly defaultRequestOptions;
    private readonly axiosInstanceHooks;
    constructor(defaultAxiosRequestConfig: AxiosRequestConfig, axiosInstanceHooks: AxiosInstanceHooks, defaultRequestOptions: HttpRequestOptions);
    private createAxiosInstance;
    private getDefaultAxiosRequestConfig;
    private getDefaultRequestOptions;
    private getAxiosInstanceHooks;
    private getAxiosInstance;
    private createHttpHeaderPolicy;
    private setupInterceptors;
    /**
     * 把当前请求的 options 与全局 options 整合获得一个完整的 options
     * @param currentRequestOptions 当前请求的 options
     * @returns 合并后的 options
     */
    private mergeHttpRequestOptions;
    /**
     * 把当前请求的 AxiosRequestConfig 与全局 AxiosRequestConfig 整合获得一个完整的 AxiosRequestConfig
     * @param currentAxiosRequestConfig 当前请求的 AxiosRequestConfig
     * @returns 合并后的 AxiosRequestConfig
     */
    private mergeAxiosRequestConfigs;
    private setupRequestStrategy;
    /**
     * 请求核心方法
     * @param config axios request 必要参数
     * @param options 针对每个请求特别指定的参数
     * @returns 响应数据
     */
    request<T = any, D = any>(config: AxiosRequestConfig<D>, options?: HttpRequestOptions): Promise<AxiosHttpResult<T>>;
    /**
     * 处理请求。提取公共代码，避免每个方法中都要写一遍
     * @param url 请求地址
     * @param config axios request 必要参数
     * @param options 针对每个请求特别指定的参数
     * @returns 响应数据
     */
    private process;
    /**
     * GET
     *
     * <T> 返回响应中实际 data 中的内容类型
     * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
     *
     * @param url 请求地址
     * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
     * @param options 对当前请求设置的参数
     * @returns
     */
    get<T = any, D = any>(url: string, params?: {}, options?: {
        contentType: ContentTypeEnum;
    }): Promise<AxiosHttpResult<T>>;
    /**
     * POST
     *
     * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
     *
     * <T> 返回响应中实际 data 中的内容类型
     * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
     *
     * @param url 请求地址
     * @param data 放置在 RequestBody 中的数据
     * @param options 对当前请求设置的参数。
     * @param config 当前请求对 axios 特殊设置。POST 操作会有不同的 Content Type，以及不同的设置。
     * @returns
     */
    post<T = any, D = any>(url: string, data: D, options?: {
        contentType: ContentTypeEnum;
    }, config?: AxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
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
    postWithParams<T = any, D = any>(url: string, params: Record<string, any>, data?: D, options?: {
        contentType: ContentTypeEnum;
    }, config?: AxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
    /**
     * PUT。更新操作。
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
    }, config?: AxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
    /**
     * PUT。更新操作。
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
    putWithParams<T = any, D = any>(url: string, params: Record<string, any>, data?: D, options?: {
        contentType: ContentTypeEnum;
    }, config?: AxiosRequestConfig<D>): Promise<AxiosHttpResult<T>>;
    /**
     * DELETE。删除操作
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
     * DELETE。删除操作
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
    deleteWithParams<T = any, D = any>(url: string, params: Record<string, any>, data?: D, options?: {
        contentType: ContentTypeEnum;
    }): Promise<AxiosHttpResult<T>>;
}
