import type { AxiosHttpResult } from '/@/lib/declarations';
import { http, service, variables, Base64 } from '/@/lib/utils';
import { ContentTypeEnum } from '/@/lib/enums';

const OAUTH2_TOKEN = service.getUaa() + '/oauth2/token';
const OAUTH2_REVOKE = service.getUaa() + '/oauth2/revoke';
const OAUTH2_SIGN_OUT = service.getUaa() + '/oauth2/sign-out';

const CLIENT_ID = variables.getClientId();
const CLIENT_SECRET = variables.getClientSecret();

export function useOAuth2Api() {
	return {
		signOut: (token: string): Promise<AxiosHttpResult> => {
			return http.put(
				OAUTH2_SIGN_OUT,
				{
					accessToken: token,
				},
				{
					contentType: ContentTypeEnum.URL_ENCODED,
				},
				{
					headers: {
						Authorization: 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET),
					},
				}
			);
		},
		revoke: (token: string): Promise<AxiosHttpResult> => {
			return http.post(
				OAUTH2_REVOKE,
				{
					token: token,
				},
				{
					contentType: ContentTypeEnum.URL_ENCODED,
				},
				{
					headers: {
						Authorization: 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET),
					},
				}
			);
		},
		passwordFlow: (username: string, password: string): Promise<AxiosHttpResult> => {
			return http.post(
				OAUTH2_TOKEN,
				{
					username: username,
					password: password,
					grant_type: variables.getGrantType(),
				},
				{
					contentType: ContentTypeEnum.URL_ENCODED,
				},
				{
					headers: {
						Authorization: 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET),
					},
				}
			);
		},
	};
}
