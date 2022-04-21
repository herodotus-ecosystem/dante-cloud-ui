// import type { ErrorMessageMode } from '/#/axios';

export function checkStatus(status: number, msg: string): void {
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
