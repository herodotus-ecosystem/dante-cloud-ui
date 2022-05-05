import type { AxiosResponse } from 'axios';
import type { Session } from '/@/lib/declarations';

import { http, service } from '/@/lib/utils';

const CLIENT_ID = import.meta.env.VITE_OAUTH2_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_OAUTH2_CLIENT_SECRET;

const SECURE_SESSION = service.getUaa() + '/open/identity/session';
const SECURE_EXCHANGE = service.getUaa() + '/open/identity/exchange';

export const useOpenApi = () => {
	return {
		createSession: (sessionId = ''): Promise<AxiosResponse<HttpResult<Session>>> => {
			return http.post(SECURE_SESSION, {
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				sessionId: sessionId,
			});
		},
		exchange: (sessionId = '', confidential: string): Promise<AxiosResponse<HttpResult<string>>> => {
			return http.post(SECURE_EXCHANGE, {
				confidential: confidential,
				sessionId: sessionId,
			});
		},
	};
};
