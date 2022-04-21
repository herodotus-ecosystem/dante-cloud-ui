import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosTransform, RequestOptions, Policy, AxiosRequestPolicy, ContentType } from '/@/lib/declarations/modules';

import axios from 'axios';
import qs from 'qs';

import { AxiosCanceler } from './axios-cancelerr';
import { isFunction, cloneDeep } from 'lodash-es';

/**
 * @description:  axios module
 */
export class Axios {
	private axiosInstance: AxiosInstance;
	private readonly axiosConfig: AxiosRequestConfig;
	private readonly axiosTransform: AxiosTransform;
	private readonly defaultRequestOptions: RequestOptions;

	constructor(config: AxiosRequestConfig, transform: AxiosTransform, options?: RequestOptions) {
		this.axiosConfig = config;
		this.axiosTransform = transform;
		this.defaultRequestOptions = options;
		this.axiosInstance = this.createAxiosInstance(config);
		this.setupInterceptors();
	}

	private createAxiosInstance(config: AxiosRequestConfig): AxiosInstance {
		return axios.create(config);
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
		this.getAxiosInstance().interceptors.request.use((config: AxiosRequestConfig) => {
			// If cancel repeat request is turned on, then cancel repeat request is prohibited
			const {
				headers: { ignoreCancelToken },
			} = config;

			const ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : this.getDefaultRequestOptions().ignoreCancelToken;

			!ignoreCancel && axiosCanceler.addPending(config);
			if (requestInterceptors && isFunction(requestInterceptors)) {
				config = requestInterceptors(config);
			}

			return config;
		}, undefined);

		// Request interceptor error capture
		requestInterceptorsCatch &&
			isFunction(requestInterceptorsCatch) &&
			this.getAxiosInstance().interceptors.request.use(undefined, requestInterceptorsCatch);

		// Response result interceptor processing
		this.getAxiosInstance().interceptors.response.use((response: AxiosResponse<unknown>) => {
			response && axiosCanceler.removePending(response.config);
			console.log('response---', response);
			if (responseInterceptors && isFunction(responseInterceptors)) {
				response = responseInterceptors(response);
			}
			return response;
		}, undefined);

		// Response result interceptor error capture
		responseInterceptorsCatch &&
			isFunction(responseInterceptorsCatch) &&
			this.getAxiosInstance().interceptors.response.use(undefined, responseInterceptorsCatch);
	}

	private mergeRequestOptions(options?: RequestOptions): RequestOptions {
		const requestOptions = this.getDefaultRequestOptions();
		if (options) {
			return Object.assign({}, requestOptions, options);
		} else {
			return requestOptions;
		}
	}

	private setupPolicy<D = unknown>(config: AxiosRequestConfig<D>, options: RequestOptions): AxiosRequestPolicy {
		const { beforeRequestHook } = this.getAxiosTransform();

		let axiosRequestConfig: AxiosRequestConfig = cloneDeep(config);
		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			axiosRequestConfig = beforeRequestHook(axiosRequestConfig, options);
		}

		const contentType: ContentType = options.contentType;
		const policy = this.getPolicy(contentType);

		Object.assign(axiosRequestConfig.headers, policy.headers);

		return {
			config,
			dataConvert: policy.dataConvert,
		};
	}

	public get<D = unknown>(url: string, params = {}, options = { contentType: ContentType.JSON }): Promise<AxiosResponse<HttpResult<D>>> {
		const requestOptions = this.mergeRequestOptions(options);
		let policy = this.setupPolicy({ params }, requestOptions);
		return new Promise<AxiosResponse<HttpResult<D>>>((resolve, reject) => {
			const { requestFailureHook, requestSuccessHook } = this.getAxiosTransform();
			this.getAxiosInstance()
				.get<HttpResult<D>>(url, policy.config)
				.then((response: AxiosResponse<HttpResult<D>>) => {
					if (requestSuccessHook && isFunction(requestSuccessHook)) {
						const result = requestSuccessHook(response, requestOptions);
						resolve(result);
					} else {
						resolve(response);
					}
				})
				.catch((error: Error) => {
					if (requestFailureHook && isFunction(requestFailureHook)) {
						reject(requestFailureHook(error, requestOptions));
					} else {
						reject(error);
					}
				});
		});
	}

	public post<D = unknown>(
		url: string,
		data = {},
		options = { contentType: ContentType.JSON },
		config?: AxiosRequestConfig<D>
	): Promise<AxiosResponse<HttpResult<D>>> {
		const requestOptions = this.mergeRequestOptions(options);
		let policy = this.setupPolicy(config, requestOptions);

		return new Promise<AxiosResponse<HttpResult<D>>>((resolve, reject) => {
			const { requestFailureHook, requestSuccessHook } = this.getAxiosTransform();
			this.getAxiosInstance()
				.post<HttpResult<D>>(url, policy.dataConvert(data), policy.config)
				.then((response: AxiosResponse<HttpResult<D>>) => {
					if (requestSuccessHook && isFunction(requestSuccessHook)) {
						const result = requestSuccessHook(response, requestOptions);
						resolve(result);
					} else {
						resolve(response);
					}
				})
				.catch((error: Error) => {
					if (requestFailureHook && isFunction(requestFailureHook)) {
						reject(requestFailureHook(error, requestOptions));
					} else {
						reject(error);
					}
				});
		});
	}

	public put<D = unknown>(
		url: string,
		data = {},
		options = { contentType: ContentType.JSON },
		config?: AxiosRequestConfig<D>
	): Promise<AxiosResponse<HttpResult<D>>> {
		const requestOptions = this.mergeRequestOptions(options);
		let policy = this.setupPolicy(config, requestOptions);
		return new Promise<AxiosResponse<HttpResult<D>>>((resolve, reject) => {
			const { requestFailureHook, requestSuccessHook } = this.getAxiosTransform();
			this.getAxiosInstance()
				.put<HttpResult<D>>(url, policy.dataConvert(data), policy.config)
				.then((response: AxiosResponse<HttpResult<D>>) => {
					if (requestSuccessHook && isFunction(requestSuccessHook)) {
						const result = requestSuccessHook(response, requestOptions);
						resolve(result);
					} else {
						resolve(response);
					}
				})
				.catch((error: Error) => {
					if (requestFailureHook && isFunction(requestFailureHook)) {
						reject(requestFailureHook(error, requestOptions));
					} else {
						reject(error);
					}
				});
		});
	}

	public delete<D = unknown>(url: string, params = {}, options = { contentType: ContentType.JSON }): Promise<AxiosResponse<HttpResult<D>>> {
		const requestOptions = this.mergeRequestOptions(options);
		let policy = this.setupPolicy({ params }, requestOptions);
		return new Promise<AxiosResponse<HttpResult<D>>>((resolve, reject) => {
			const { requestFailureHook, requestSuccessHook } = this.getAxiosTransform();
			this.getAxiosInstance()
				.delete<HttpResult<D>>(url, policy.config)
				.then((response: AxiosResponse<HttpResult<D>>) => {
					if (requestSuccessHook && isFunction(requestSuccessHook)) {
						const result = requestSuccessHook(response, requestOptions);
						resolve(result);
					} else {
						resolve(response);
					}
				})
				.catch((error: Error) => {
					if (requestFailureHook && isFunction(requestFailureHook)) {
						reject(requestFailureHook(error, requestOptions));
					} else {
						reject(error);
					}
				});
		});
	}
}
