import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AxiosTransform, AxiosHttpResult, RequestOptions, Policy, AxiosRequestPolicy, ContentType, HttpMethod } from '/@/lib/declarations';

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

	private getPolicy(contentType: ContentType): Policy {
		switch (contentType) {
			case ContentType.URL_ENCODED:
				return {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					dataConvert: (params: unknown) => {
						return qs.stringify(params, { arrayFormat: 'brackets' });
					},
				};
			case ContentType.MULTI_PART:
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

	private mergeRequestConfigs(config?: AxiosRequestConfig): AxiosRequestConfig {
		const requestConfigs = this.getAxiosConfig();
		if (config) {
			return Object.assign({}, requestConfigs, config);
		} else {
			return requestConfigs;
		}
	}

	private setupPolicy<D = unknown>(url: string, options: RequestOptions, config?: AxiosRequestConfig<D>): AxiosRequestPolicy {
		const { beforeRequestHook } = this.getAxiosTransform();

		const requestOptions = this.mergeRequestOptions(options);

		let axiosRequestConfig: AxiosRequestConfig = this.mergeRequestConfigs(config);
		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			axiosRequestConfig = beforeRequestHook(axiosRequestConfig, requestOptions);
		}

		const contentType: ContentType = requestOptions.contentType;
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

	public get<D = unknown>(url: string, params = {}, options = { contentType: ContentType.JSON }): Promise<AxiosHttpResult<D>> {
		let policy = this.setupPolicy(url, options, { params, method: HttpMethod.GET });
		return this.request<D>(policy.config, policy.options);
	}

	public post<D = unknown>(
		url: string,
		data: D,
		options = { contentType: ContentType.JSON },
		config?: AxiosRequestConfig<D>
	): Promise<AxiosHttpResult<D>> {
		let policy = this.setupPolicy<D>(url, options, { ...config, data, method: HttpMethod.POST });
		return this.request<D>(policy.config, policy.options);
	}

	public put<D = unknown>(
		url: string,
		data: D,
		options = { contentType: ContentType.JSON },
		config?: AxiosRequestConfig<D>
	): Promise<AxiosHttpResult<D>> {
		let policy = this.setupPolicy(url, options, { ...config, data, method: HttpMethod.PUT });
		return this.request<D>(policy.config, policy.options);
	}

	public delete<D = unknown>(url: string, params = {}, options = { contentType: ContentType.JSON }): Promise<AxiosHttpResult<D>> {
		let policy = this.setupPolicy(url, options, { params, method: HttpMethod.DELETE });
		return this.request<D>(policy.config, policy.options);
	}

	public request<D = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<AxiosHttpResult<D>> {
		return new Promise<AxiosHttpResult<D>>((resolve, reject) => {
			const { requestCatchHook, transformRequestHook } = this.getAxiosTransform();
			this.getAxiosInstance()
				.request<HttpResult<D>>(config)
				.then((response: AxiosResponse<HttpResult<D>>) => {
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
