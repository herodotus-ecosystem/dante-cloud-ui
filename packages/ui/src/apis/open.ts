import type { AxiosHttpResult, CaptchaData, Coordinate, Verification, CaptchaResource } from '/@/lib/declarations';
import { CaptchaCategoryEnum, ContentTypeEnum } from '/@/lib/enums';

import { http, service, variables, Base64 } from '/@/lib/utils';

const CLIENT_ID = variables.getClientId();
const CLIENT_SECRET = variables.getClientSecret();

const SECURE_SESSION = service.getUaa() + '/open/identity/session';
const SECURE_EXCHANGE = service.getUaa() + '/open/identity/exchange';
const SECURE_PROMPT = service.getUaa() + '/open/identity/prompt';
const SECURE_CAPTCHA = service.getUaa() + '/open/captcha';
const SECURE_VERIFICATION_CODE = service.getUpms() + '/open/identity/verification-code';
const SECURE_SOCIAL_LIST = service.getUpms() + '/open/identity/sources';

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

		getPrompt: (username: string): Promise<AxiosHttpResult> => {
			return http.post(SECURE_PROMPT, {
				username: username,
			});
		},

		createCaptcha(sessionId: string, type: string): Promise<AxiosHttpResult<CaptchaResource>> {
			return http.get(SECURE_CAPTCHA, {
				identity: sessionId,
				category: type,
			});
		},

		verifyCaptcha(identity: string, category: string, data: CaptchaData): Promise<AxiosHttpResult<boolean>> {
			const verify: Verification = {
				identity: identity,
				category: category,
				coordinate: { x: 0, y: 0 },
				coordinates: [],
				characters: '',
			};

			if (category === CaptchaCategoryEnum.WORD_CLICK) {
				verify.coordinates = data as Array<Coordinate>;
			} else if (category === CaptchaCategoryEnum.JIGSAW) {
				verify.coordinate = data as Coordinate;
			} else {
				verify.characters = data as string;
			}

			return http.post(SECURE_CAPTCHA, verify);
		},

		createVerificationCode(mobile: string): Promise<AxiosHttpResult<string>> {
			return http.post(
				SECURE_VERIFICATION_CODE,
				{
					mobile: mobile,
				},
				{
					contentType: ContentTypeEnum.URL_ENCODED,
				}
			);
		},

		getSocialList(): Promise<AxiosHttpResult<Record<string, string>>> {
			return http.get(SECURE_SOCIAL_LIST);
		},
	};
};
