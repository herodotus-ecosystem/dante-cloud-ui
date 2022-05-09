// import type { ErrorMessageMode } from '/#/axios';
import type { AxiosError, AxiosResponse } from 'axios';

import { notify } from '/@/lib/utils/base';

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
			case 400:
				// errMessage = `${msg}`;
				break;
			// 401: Not logged in
			// Jump to the login page if not logged in, and carry the path of the current page
			// Return to the current page after successful login. This step needs to be operated on the login page.
			case 401:
				break;
			case 403:
				break;
			// 404请求不存在
			case 404:
				notify.warning('请求的资源不存在，可能服务未启动！');
				break;
			case 405:
				break;
			case 408:
				break;
			case 500:
				break;
			case 501:
				break;
			case 502:
				break;
			case 503:
				break;
			case 504:
				break;
			case 505:
				break;
			default:
		}
	}
};
