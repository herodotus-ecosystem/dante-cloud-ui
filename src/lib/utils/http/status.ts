// import type { ErrorMessageMode } from '/#/axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { Loading } from 'quasar';

import { notify, ActionUtils, toast } from '/@/lib/utils';

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

const excludedRequest = ['/open/captcha', '/oauth2/token'];

const isIncluded = (response: AxiosResponse<any>) => {
	const request = response.config.url;
	return !(request && excludedRequest.includes(request));
};

export const processor = (error: AxiosError) => {
	const { response, message, code } = error;

	if (code && (code === 'ECONNABORTED' || code === 'ERR_NETWORK')) {
		ActionUtils.tokenExpires('网络错误!', '响应超时，请稍后再试！', 'error');
		return new Promise((resolve, reject) => {});
	} else {
		if (response && isIncluded(response)) {
			const content = responseMessageHandler(response, message);
			const status = response.status;
			const code = responseCodeHandler(response);

			switch (status) {
				case 401:
					if (!code || code === 40109) {
						ActionUtils.tokenExpires('认证失效!', '登录认证已过期，请重新登录！', 'warning');
					} else if ([40103, 40106, 40105, 40111].includes(code)) {
					} else {
						notify.error(content);
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
					notify.error(content);
					break;
				case 408:
					break;
				case 412:
					break;
				case 500:
					if (message) {
						notify.error(content);
					} else {
						notify.error('系统错误，请稍后再试！或者联系管理员');
					}
					break;
				case 503:
					notify.warning('网络抖动，请稍后再试！');
					break;
				case 504:
					notify.error(content);
					break;
				case 505:
					notify.error(content);
					break;
				default:
					notify.error(content);
					break;
			}
		}

		return Promise.reject(error);
	}
};
