import type { AxiosHttpResult, GraphCaptchaData, Coordinate, Verification, CaptchaContent } from '/@/lib/declarations';
import { CaptchaCategory } from '/@/lib/enums';

import { http, service, variables } from '/@/lib/utils';

const CLIENT_ID = variables.getClientId();
const CLIENT_SECRET = variables.getClientSecret();

const SECURE_SESSION = service.getUaa() + '/open/identity/session';
const SECURE_EXCHANGE = service.getUaa() + '/open/identity/exchange';
const SECURE_CAPTCHA = service.getUaa() + '/open/captcha';

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

		createCaptcha(sessionId: string, type: string): Promise<AxiosHttpResult<CaptchaContent>> {
			return http.get(SECURE_CAPTCHA, {
				identity: sessionId,
				category: type,
			});
		},

		verifyCaptcha(identity: string, category: string, data: GraphCaptchaData): Promise<AxiosHttpResult<boolean>> {
			const verify: Verification = {
				identity: identity,
				category: category,
				coordinate: { x: 0, y: 0 },
				coordinates: [],
				characters: '',
			};

			if (category === CaptchaCategory.WORD_CLICK) {
				verify.coordinates = data as Array<Coordinate>;
			} else if (category === CaptchaCategory.JIGSAW) {
				verify.coordinate = data as Coordinate;
			} else {
				verify.characters = data as string;
			}

			return http.post(SECURE_CAPTCHA, verify);
		},
	};
};
