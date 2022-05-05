import type { AxiosResponse, AxiosRequestConfig } from 'axios';

import qs from 'qs';
import { lodash } from '/@/lib/utils/base';
import { Axios } from '/@/lib/definitions';
import { AxiosTransform, AxiosHttpResult, RequestOptions, ContentType } from '/@/lib/declarations';

import { useAuthenticationStore, useCryptoStore } from '/@/stores';

const transform: AxiosTransform = {
	// 请求之前处理config
	beforeRequestHook(config, options) {
		return config;
	},

	/**
	 * @description: 请求成功处理
	 */
	requestSuccessHook<D = unknown>(response: AxiosResponse<HttpResult<D>>, options: RequestOptions): AxiosHttpResult<D> {
		let isSuccess = false;
		const { status } = response;

		if (status) {
			isSuccess = /^(2|3)\d{2}$/.test(String(status));
		}

		if (isSuccess) {
			const { isTransformResponse } = options;
			// 不进行任何处理，直接返回
			// 用于页面代码可能需要直接获取code，data，message这些信息时开启
			if (isTransformResponse) {
				return response.data;
			}
		}
		return response;
	},

	/**
	 * @description: 请求拦截器处理
	 */
	requestInterceptors(config: AxiosRequestConfig) {
		const authentication = useAuthenticationStore();
		const crypto = useCryptoStore();
		const token = authentication.access_token;
		const sessionId = crypto.sessionId;

		if (token) {
			if (config.headers) {
				if (!config.headers.Authorization) {
					config.headers.Authorization = 'Bearer ' + token;
				}
			} else {
				config.headers = { Authorization: 'Bearer ' + token };
			}
		}

		if (sessionId) {
			if (config.headers) {
				if (!config.headers['X-Herodotus-Session']) {
					config.headers['X-Herodotus-Session'] = sessionId;
				}
			} else {
				config.headers = { 'X-Herodotus-Session': sessionId };
			}
		}

		return config;
	},

	/**
	 * @description: 响应拦截器处理
	 */
	responseInterceptors(response: AxiosResponse<any>) {
		if (process.env.NODE_ENV === 'development') {
			const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
			console.log('%c┍------------------------------------------------------------------------------------------┑', `color:${randomColor};`);
			console.log('| 请求地址：', response.config.url);
			console.log('| 请求类型：', lodash.toUpper(response.config.method));
			console.log('| 请求参数：', qs.parse(response.config.params));
			console.log('| 响应数据：', response.data);
			console.log('%c┕------------------------------------------------------------------------------------------┙', `color:${randomColor};`);
		}
		console.log('responseInterceptors', response);
		return response;
	},

	requestFailureHook(error: Error, options: RequestOptions): Promise<any> {
		return new Promise((resolve, reject) => {});
	},

	requestInterceptorsCatch(error: Error): void {},
	responseInterceptorsCatch(error: Error): void {},
};

export const http = new Axios(
	{
		timeout: 1000 * 12,
		baseURL: import.meta.env.VITE_APP_GATEWAY_ADDRESS as string,
	},
	transform,
	{
		contentType: ContentType.JSON,
		// 忽略重复请求
		ignoreCancelToken: true,
		// 需要对返回数据进行处理
		isTransformResponse: true,
		// 消息提示类型
		errorMessageMode: 'message',

		// 是否携带token
		withToken: true,
	}
);
