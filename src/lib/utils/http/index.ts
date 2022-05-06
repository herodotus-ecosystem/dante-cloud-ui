import type { AxiosResponse, AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';

import qs from 'qs';
import { Axios } from '/@/lib/definitions';
import { AxiosTransform, AxiosHttpResult, RequestOptions, ContentType } from '/@/lib/declarations';
import { lodash, variables } from '/@/lib/utils';

import { useAuthenticationStore, useCryptoStore } from '/@/stores';
import { processor } from './status';

const logResponse = (response: AxiosResponse<any>) => {
	if (process.env.NODE_ENV === 'development') {
		const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
		console.log('%c┍------------------------------------------------------------------------------------------┑', `color:${randomColor};`);
		console.log('| 请求地址：', response.config.url);
		console.log('| 请求类型：', lodash.toUpper(response.config.method));
		console.log('| 请求参数：', qs.parse(response.config.params));
		console.log('| 响应数据：', response.data);
		console.log('%c┕------------------------------------------------------------------------------------------┙', `color:${randomColor};`);
	}
};

const isSuccess = (response: AxiosResponse<any>) => {
	if (response && response.status) {
		return /^(2|3)\d{2}$/.test(String(response.status));
	} else {
		return false;
	}
};

const transform: AxiosTransform = {
	// 请求之前处理config
	beforeRequestHook(config, options) {
		return config;
	},

	/**
	 * @description: 请求成功处理
	 */
	transformRequestHook<D = unknown>(response: AxiosResponse<HttpResult<D>>, options?: RequestOptions): AxiosHttpResult<D> {
		if (isSuccess(response)) {
			if (options) {
				const { isTransformResponse } = options;
				// 不进行任何处理，直接返回
				// 用于页面代码可能需要直接获取code，data，message这些信息时开启
				if (isTransformResponse) {
					return response.data;
				}
			}
		}
		return response;
	},

	requestCatchHook(error: AxiosError, options?: RequestOptions): Promise<any> {
		console.log('requestCatchHook');
		return new Promise((resolve, reject) => {});
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

		if (sessionId && variables.isUseCrypto()) {
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
	responseInterceptors(response: AxiosResponse<any>): Promise<any> {
		logResponse(response);
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
		// 否则的话抛出错误
		if (isSuccess(response)) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},

	requestInterceptorsCatch(axiosInstance: AxiosInstance, error: AxiosError): Promise<any> {
		return Promise.reject(error);
	},
	responseInterceptorsCatch(axiosInstance: AxiosInstance, error: AxiosError): Promise<any> {
		processor(error);
		return Promise.reject(error);
	},
};

export const http = new Axios(
	{
		timeout: 1000 * 12,
		baseURL: variables.getApiUrl(),
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
