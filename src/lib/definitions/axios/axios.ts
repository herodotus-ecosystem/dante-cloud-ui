import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { AxiosTransform, AxiosHttpResult, RequestOptions, Policy, AxiosRequestPolicy } from '/@/lib/declarations';

import { ContentTypeEnum, HttpMethodEnum } from '/@/lib/enums';

import axios from 'axios';
import qs from 'qs';

import { AxiosCanceler } from './canceler';
import { isFunction, isEmpty } from 'lodash-es';

/**
 * @description:  axios module
 */
export class Axios {
	private axiosInstance: AxiosInstance;
	private readonly axiosConfig: AxiosRequestConfig;
	private readonly axiosTransform: AxiosTransform;
	private readonly defaultRequestOptions: RequestOptions;

	constructor(config: AxiosRequestConfig, transform: AxiosTransform, options: RequestOptions) {
		this.axiosConfig = config;
		this.axiosTransform = transform;
		this.defaultRequestOptions = options;
		this.axiosInstance = this.createAxiosInstance(config);
		this.setupInterceptors();
	}

	private createAxiosInstance(config: AxiosRequestConfig): AxiosInstance {
		return axios.create(config);
	}

	private getAxiosConfig(): AxiosRequestConfig {
		return this.axiosConfig;
	}

	private getAxiosTransform(): AxiosTransform {
		return this.axiosTransform;
	}

	private getAxiosInstance(): AxiosInstance {
		return this.axiosInstance;
	}

	private getDefaultRequestOptions(): RequestOptions {
		return this.defaultRequestOptions;
	}

	private getPolicy(contentType: ContentTypeEnum): Policy {
		switch (contentType) {
			case ContentTypeEnum.URL_ENCODED:
				return {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					dataConvert: (params: unknown) => {
						return qs.stringify(params, { arrayFormat: 'brackets' });
					},
				};
			case ContentTypeEnum.MULTI_PART:
				return {
					headers: { 'Content-Type': 'multipart/form-data' },
					dataConvert: (params: unknown) => {
						return params;
					},
				};
			default:
				return {
					headers: { 'Content-Type': 'application/json' },
					dataConvert: (params: unknown) => {
						return JSON.stringify(params);
					},
				};
		}
	}

	private setupInterceptors(): void {
		const transform = this.getAxiosTransform();

		if (!transform) {
			return;
		}

		const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } = transform;

		const axiosCanceler = new AxiosCanceler();

		// Request interceptor configuration processing
		this.getAxiosInstance().interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// If cancel repeat request is turned on, then cancel repeat request is prohibited
				const { ignoreCancelToken } = this.getDefaultRequestOptions();

				!ignoreCancelToken && axiosCanceler.addPending(config);
				return requestInterceptors(config);
			},
			(error: AxiosError) => {
				return requestInterceptorsCatch(this.getAxiosInstance(), error);
			}
		);

		// Response result interceptor processing
		this.getAxiosInstance().interceptors.response.use(
			(response: AxiosResponse<any>) => {
				response && axiosCanceler.removePending(response.config);
				return responseInterceptors(response);
			},
			(error: AxiosError) => {
				return responseInterceptorsCatch(this.getAxiosInstance(), error);
			}
		);
	}

	private mergeRequestOptions(options?: RequestOptions): RequestOptions {
		const requestOptions = this.getDefaultRequestOptions();
		if (options) {
			return Object.assign({}, requestOptions, options);
		} else {
			return requestOptions;
		}
	}

	private mergeRequestConfigs<D = any>(config?: AxiosRequestConfig<D>): AxiosRequestConfig {
		const requestConfigs = this.getAxiosConfig();
		if (config) {
			return Object.assign({}, requestConfigs, config);
		} else {
			return requestConfigs;
		}
	}

	private setupPolicy<D = any>(url: string, options: RequestOptions, config?: AxiosRequestConfig<D>): AxiosRequestPolicy {
		const { beforeRequestHook } = this.getAxiosTransform();

		const requestOptions = this.mergeRequestOptions(options);

		let axiosRequestConfig: AxiosRequestConfig = this.mergeRequestConfigs<D>(config);
		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			axiosRequestConfig = beforeRequestHook(axiosRequestConfig, requestOptions);
		}

		const contentType: ContentTypeEnum = requestOptions.contentType;
		const policy = this.getPolicy(contentType);

		if (axiosRequestConfig.headers) {
			axiosRequestConfig.headers = Object.assign(axiosRequestConfig.headers, policy.headers);
		} else {
			axiosRequestConfig.headers = policy.headers;
		}

		axiosRequestConfig.url = url;
		if (!isEmpty(axiosRequestConfig.data)) {
			axiosRequestConfig.data = policy.dataConvert(axiosRequestConfig.data);
		}

		return {
			config: axiosRequestConfig,
			options: requestOptions,
			dataConvert: policy.dataConvert,
		};
	}

	public get<T = any, D = any>(url: string, params = {}, options = { contentType: ContentTypeEnum.JSON }): Promise<AxiosHttpResult<T>> {
		let policy = this.setupPolicy<D>(url, options, { params, method: HttpMethodEnum.GET });
		return this.request<T, D>(policy.config, policy.options);
	}

	public post<T = any, D = any>(
		url: string,
		data: D,
		options = { contentType: ContentTypeEnum.JSON },
		config?: AxiosRequestConfig<D>
	): Promise<AxiosHttpResult<T>> {
		let policy = this.setupPolicy<D>(url, options, { ...config, data, method: HttpMethodEnum.POST });
		return this.request<T, D>(policy.config, policy.options);
	}

	public put<T = any, D = any>(
		url: string,
		data: D,
		options = { contentType: ContentTypeEnum.JSON },
		config?: AxiosRequestConfig<D>
	): Promise<AxiosHttpResult<T>> {
		let policy = this.setupPolicy<D>(url, options, { ...config, data, method: HttpMethodEnum.PUT });
		return this.request<T, D>(policy.config, policy.options);
	}

	public delete<T = any, D = any>(url: string, params = {}, options = { contentType: ContentTypeEnum.JSON }): Promise<AxiosHttpResult<T>> {
		let policy = this.setupPolicy<D>(url, options, { params, method: HttpMethodEnum.DELETE });
		return this.request<T, D>(policy.config, policy.options);
	}

	public request<T = any, D = any>(config: AxiosRequestConfig<D>, options?: RequestOptions): Promise<AxiosHttpResult<T>> {
		return new Promise<AxiosHttpResult<T>>((resolve, reject) => {
			const { requestCatchHook, transformRequestHook } = this.getAxiosTransform();
			this.getAxiosInstance()
				.request<HttpResult<T>>(config)
				.then((response: AxiosResponse<HttpResult<T>>) => {
					if (transformRequestHook && isFunction(transformRequestHook)) {
						const result = transformRequestHook(response, options);
						resolve(result);
					} else {
						resolve(response);
					}
				})
				.catch((error: AxiosError) => {
					if (requestCatchHook && isFunction(requestCatchHook)) {
						reject(requestCatchHook(error, options));
					} else {
						reject(error);
					}
				});
		});
	}
}
