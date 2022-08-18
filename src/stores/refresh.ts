import { defineStore } from 'pinia';
import type { RetryRequest } from '/@/lib/declarations';

import { useAuthenticationStore } from '/@/stores';
import { ActionUtils } from '/@/lib/utils';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export const useRefreshStore = defineStore('Refresh', {
	state: () => ({
		refreshing: false,
		requests: [] as Array<RetryRequest>,
	}),

	getters: {},

	actions: {
		addTokenToHeader(token: string, config: AxiosRequestConfig) {
			if (config.headers) {
				config.headers.Authorization = 'Bearer ' + token;
			}
		},

		onRefresh(axiosInstance: AxiosInstance, config: AxiosRequestConfig): Promise<any> {
			if (!this.refreshing) {
				this.refreshing = true;
				const auth = useAuthenticationStore();
				return auth
					.refreshToken()
					.then((res) => {
						// 已经刷新了token，将所有队列中的请求进行重试
						const newToken = auth.access_token;
						this.addTokenToHeader(newToken, config);
						this.requests.forEach((cb) => cb(newToken));
						this.requests = [];
						return axiosInstance(config);
					})
					.catch((res) => {
						console.error('refreshtoken error =>', res);
						ActionUtils.tokenExpires('认证失效!', '登录认证已过期，请重新登录！', 'warning');
					})
					.finally(() => {
						this.refreshing = false;
					});
			} else {
				// 正在刷新token，将返回一个未执行resolve的promise
				return new Promise((resolve) => {
					// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
					console.log('push refresh list');
					this.requests.push((newToken: string) => {
						this.addTokenToHeader(newToken, config);
						resolve(axiosInstance(config));
					});
				});
			}
		},
	},
	persist: true,
});
