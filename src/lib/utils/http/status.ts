// import type { ErrorMessageMode } from '/#/axios';
import type { AxiosError, AxiosResponse } from 'axios';

import { notify, ActionUtils } from '/@/lib/utils';

const responseMessageHandler = (response: AxiosResponse<any>, message?: string): string => {
	const data = response.data;
	if (data.message) {
		return data.message;
	} else {
		if (data.error && data.error.message) {
			return data.error.message;
		} else {
			if (message) {
				return message;
			} else {
				return '';
			}
		}
	}
};

const responseCodeHandler = (response: AxiosResponse<any>): number => {
	if (response.data && response.data.code) {
		return response.data.code;
	} else {
		return 0;
	}
};

export const processor = (error: AxiosError): void => {
	const { response, message } = error;

	if (!response) {
	} else {
		const content = responseMessageHandler(response, message);
		const status = response.status;
		const code = responseCodeHandler(response);

		switch (status) {
			case 401:
				if (!code || code === 40108) {
					ActionUtils.tokenExpires('认证失效!', '登录认证已过期，请重新登录！', 'warning');
				} else {
					notify.error(message);
				}
				break;
			case 403:
				break;
			// 404请求不存在
			case 404:
				notify.warning('请求的资源不存在，可能服务未启动！');
				break;
			case 405:
				break;
			case 406:
				notify.error(message);
				break;
			case 408:
				break;
			case 412:
				break;
			case 500:
				if (message) {
					notify.error(message);
				} else {
					notify.error('系统错误，请稍后再试！或者联系管理员');
				}
				break;
			case 503:
				notify.warning('网络抖动，请稍后再试！');
				break;
			case 504:
				notify.error(message);
				break;
			case 505:
				notify.error(message);
				break;
			default:
				notify.error(message);
				break;
		}
	}
};
