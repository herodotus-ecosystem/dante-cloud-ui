import type { AxiosHttpResult } from '/@/lib/declarations';
import { http, service, variables, Base64 } from '/@/lib/utils';
import { ContentType } from '/@/lib/declarations';

const OAUTH2_TOKEN = service.getUaa() + '/oauth2/token';

const CLIENT_ID = variables.getClientId();
const CLIENT_SECRET = variables.getClientSecret();

export function useOAuth2Api() {
	return {
		passwordFlow: (username: string, password: string): Promise<AxiosHttpResult> => {
			return http.post(
				OAUTH2_TOKEN,
				{
					username: username,
					password: password,
					grant_type: variables.getGrantType(),
				},
				{
					contentType: ContentType.URL_ENCODED,
				},
				{
					headers: {
						Authorization: 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET),
					},
				}
			);
		},
		authorizationCode: () => {},
	};
}
