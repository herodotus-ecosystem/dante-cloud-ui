import type { AxiosHttpResult, SocialSource, AccessPrincipal } from '/@/lib/declarations';

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

		refreshTokenFlow: (refreshToken: string, oidc = false): Promise<AxiosHttpResult> => {
			return http.post(
				OAUTH2_TOKEN,
				oidc
					? { refresh_token: refreshToken, grant_type: 'refresh_token', scope: 'openid' }
					: { refresh_token: refreshToken, grant_type: 'refresh_token' },
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
		passwordFlow: (username: string, password: string, oidc = false): Promise<AxiosHttpResult> => {
			return http.post(
				OAUTH2_TOKEN,
				oidc
					? { username: username, password: password, grant_type: 'password', scope: 'openid' }
					: { username: username, password: password, grant_type: 'password' },
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
		authorizationCodeFlow: (code: string, redirect_uri: string, state = '', oidc = false): Promise<AxiosHttpResult<OAuth2Token>> => {
			return http.post(
				OAUTH2_TOKEN,
				oidc
					? { code: code, state: state, redirect_uri: redirect_uri, grant_type: 'authorization_code', scope: 'openid' }
					: { code: code, state: state, redirect_uri: redirect_uri, grant_type: 'authorization_code' },
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

		socialCredentialsFlowBySms: (mobile: string, code: string, oidc = false): Promise<AxiosHttpResult> => {
			return http.post(
				OAUTH2_TOKEN,
				oidc
					? { mobile, code, grant_type: 'social_credentials', source: 'SMS', scope: 'openid' }
					: { mobile, code, grant_type: 'social_credentials', source: 'SMS' },
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
		socialCredentialsFlowByJustAuth: (source: SocialSource, accessPrincipal: AccessPrincipal, oidc = false): Promise<AxiosHttpResult> => {
			return http.post(
				OAUTH2_TOKEN,
				oidc
					? { ...accessPrincipal, grant_type: 'social_credentials', source: source, scope: 'openid' }
					: { ...accessPrincipal, grant_type: 'social_credentials', source: source },
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
