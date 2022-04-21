import type { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { ContentType } from '../enums';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

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
	requestSuccessHook?: <D = unknown>(response: AxiosResponse<HttpResult<D>>, options: RequestOptions) => unknown;

	/**
	 * @description: 请求失败处理
	 */
	requestFailureHook?: (error: Error, options: RequestOptions) => Promise<any>;

	/**
	 * @description: 请求之前的拦截器
	 */
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

	/**
	 * @description: 请求之后的拦截器
	 */
	responseInterceptors?: (response: AxiosResponse<any>) => AxiosResponse<any>;

	/**
	 * @description: 请求之前的拦截器错误处理
	 */
	requestInterceptorsCatch?: (error: Error) => void;

	/**
	 * @description: 请求之后的拦截器错误处理
	 */
	responseInterceptorsCatch?: (error: Error) => void;
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
	dataConvert: (params: Record<string, any>) => any;
}
