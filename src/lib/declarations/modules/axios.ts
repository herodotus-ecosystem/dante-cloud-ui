import type { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders, AxiosError, AxiosInstance } from 'axios';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export enum ContentType {
	URL_ENCODED,
	MULTI_PART,
	TEXT,
	JSON,
}

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export interface RequestOptions {
	// 指定当前请求的 ContentType 类型
	contentType: ContentType;
	ignoreCancelToken?: boolean;
	isTransformResponse?: boolean;
	// Error message prompt type
	errorMessageMode?: ErrorMessageMode;

	// Whether to send token in header
	withToken?: boolean;
}

export interface AxiosTransform {
	/**
	 * @description: 请求前处理配置
	 */
	beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

	/**
	 * @description: 请求成功处理
	 */
	transformRequestHook?: <D = unknown>(response: AxiosResponse<HttpResult<D>>, options?: RequestOptions) => AxiosHttpResult<D>;

	/**
	 * @description: 请求失败处理
	 */
	requestCatchHook?: (error: AxiosError, options?: RequestOptions) => Promise<any>;

	/**
	 * @description: 请求之前的拦截器
	 */
	requestInterceptors: (config: AxiosRequestConfig) => AxiosRequestConfig;

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

export interface AxiosConfig extends AxiosRequestConfig {
	authenticationScheme?: string;
	transform?: AxiosTransform;
	requestOptions?: RequestOptions;
}

export interface Policy {
	headers: AxiosRequestHeaders;
	dataConvert: (params: Record<string, any>) => any;
}

export interface AxiosRequestPolicy {
	config: AxiosRequestConfig;
	options: RequestOptions;
	dataConvert: (params: Record<string, any>) => any;
}

export type AxiosHttpResult<T = unknown> = AxiosResponse<HttpResult<T>> | HttpResult<T>;
