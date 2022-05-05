import type { AxiosHttpResult } from '/@/lib/declarations';

import { http, service, variables } from '/@/lib/utils';

const CLIENT_ID = variables.getClientId();
const CLIENT_SECRET = variables.getClientSecret();

const SECURE_SESSION = service.getUaa() + '/open/identity/session';
const SECURE_EXCHANGE = service.getUaa() + '/open/identity/exchange';

export const useOpenApi = () => {
	return {
		createSession: (sessionId = ''): Promise<AxiosHttpResult> => {
			return http.post(SECURE_SESSION, {
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				sessionId: sessionId,
			});
		},
		exchange: (sessionId = '', confidential: string): Promise<AxiosHttpResult> => {
			return http.post(SECURE_EXCHANGE, {
				confidential: confidential,
				sessionId: sessionId,
			});
		},
	};
};
