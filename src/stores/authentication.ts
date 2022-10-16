import { defineStore } from 'pinia';
import type { UserErrorStatus, AxiosHttpResult, SocialSource, AccessPrincipal } from '/@/lib/declarations';

import jwt_decode from 'jwt-decode';
import { useCryptoStore } from '/@/stores';
import { useOAuth2Api, useOpenApi } from '/@/apis';
import { variables, moment } from '/@/lib/utils';

export const useAuthenticationStore = defineStore('Authentication', {
	state: () => ({
		access_token: '',
		expires_in: 0,
		refresh_token: '',
		license: '',
		openid: '',
		scope: '',
		idToken: '',
		token_type: '',
		errorTimes: 0,
		remainTimes: 0,
		locked: false,
		userId: '',
		userName: '',
		roles: [] as Array<string>,
	}),

	getters: {
		isNotExpired: (state) => {
			const expires = moment().add(state.expires_in, 'seconds').valueOf();
			const flag = moment(expires).add(1, 'seconds').diff(moment(), 'seconds');
			return flag !== 0;
		},
		token(state) {
			if (variables.getAutoRefreshToken()) {
				return state.access_token;
			} else {
				if (this.isNotExpired) {
					return state.access_token;
				} else {
					return '';
				}
			}
		},
	},

	actions: {
		setTokenInfo(data: OAuth2Token): void {
			this.access_token = data.access_token;
			this.expires_in = data.expires_in;
			this.refresh_token = data.refresh_token;
			this.license = data.license;
			this.scope = data.scope;
			this.token_type = data.token_type;
			if (data.id_token) {
				this.idToken = data.id_token;
				const jwt: OAuth2IdToken = jwt_decode(this.idToken);
				this.userId = jwt.openid;
				this.userName = jwt.sub;
				this.roles = jwt.roles;
			} else if (data.openid) {
				const crypto = useCryptoStore();
				this.openid = data.openid;
				const openid = crypto.decrypt(this.openid);
				const details = JSON.parse(openid);
				this.userId = details.userId;
				this.userName = details.userName;
				this.roles = details.roles;
			} else {
				console.error('Cannot fetch the use info from backend.');
			}
		},

		setUserErrorStatus(data: UserErrorStatus): void {
			this.remainTimes = data.remainTimes;
			this.errorTimes = data.errorTimes;
			this.locked = data.locked;
		},

		/**
		 * 判断是否是以非弹窗的形式显示的信息。
		 *
		 * 主要在登录页面中，将 Dialog 弹出形式的错误信息，转换为显示在输入框上部的错误信息，
		 * @param error
		 * @returns
		 */
		isAlertMessage(error: any): boolean {
			return error.code && [40106, 40111].includes(error.code);
		},

		setErrorPrompt(error: any, principal: string): void {
			const openApi = useOpenApi();
			if (this.isAlertMessage(error)) {
				openApi.getPrompt(principal).then((result) => {
					this.setUserErrorStatus(result.data as UserErrorStatus);
				});
			}
		},

		signIn(username: string, password: string) {
			const oauth2Api = useOAuth2Api();
			const openApi = useOpenApi();
			const crypto = useCryptoStore();
			if (variables.isUseCrypto()) {
				username = crypto.encrypt(username);
				password = crypto.encrypt(password);
			}
			return new Promise<boolean>((resolve, reject) => {
				oauth2Api
					.passwordFlow(username, password, variables.isUseCrypto())
					.then((response) => {
						if (response) {
							const data = response as unknown as OAuth2Token;
							this.setTokenInfo(data);
						}

						if (this.access_token) {
							resolve(true);
						} else {
							resolve(false);
						}
					})
					.catch((error) => {
						this.setErrorPrompt(error, username);
						reject(error);
					});
			});
		},
		refreshToken() {
			const oauth2Api = useOAuth2Api();
			return new Promise<boolean>((resolve, reject) => {
				oauth2Api
					.refreshTokenFlow(this.refresh_token, variables.isUseCrypto())
					.then((response) => {
						if (response) {
							const data = response as unknown as OAuth2Token;
							this.setTokenInfo(data);
						}

						if (this.access_token) {
							resolve(true);
						} else {
							resolve(false);
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		signOut(accessToken = '') {
			const oauth2Api = useOAuth2Api();
			const token = accessToken ? accessToken : this.access_token;
			return new Promise<AxiosHttpResult>((resolve, reject) => {
				oauth2Api
					.signOut(token)
					.then((response) => {
						resolve(response);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		authorizationCode(code: string, state = '') {
			const oauth2Api = useOAuth2Api();
			return new Promise<boolean>((resolve, reject) => {
				oauth2Api
					.authorizationCodeFlow(code, variables.getRedirectUri(), state, variables.isUseCrypto())
					.then((response) => {
						if (response) {
							const data = response as OAuth2Token;
							this.setTokenInfo(data);
						}

						if (this.access_token) {
							resolve(true);
						} else {
							resolve(false);
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		smsSignIn(mobile: string, code: string) {
			const oauth2Api = useOAuth2Api();
			const openApi = useOpenApi();
			const crypto = useCryptoStore();
			if (variables.isUseCrypto()) {
				mobile = crypto.encrypt(mobile);
				code = crypto.encrypt(code);
			}
			return new Promise<boolean>((resolve, reject) => {
				oauth2Api
					.socialCredentialsFlowBySms(mobile, code, variables.isUseCrypto())
					.then((response) => {
						if (response) {
							const data = response as unknown as OAuth2Token;
							this.setTokenInfo(data);
						}

						if (this.access_token) {
							resolve(true);
						} else {
							resolve(false);
						}
					})
					.catch((error) => {
						this.setErrorPrompt(error, mobile);
						reject(error);
					});
			});
		},

		socialSignIn(source: SocialSource, accessPrincipal: AccessPrincipal) {
			const oauth2Api = useOAuth2Api();
			return new Promise<boolean>((resolve, reject) => {
				oauth2Api
					.socialCredentialsFlowByJustAuth(source, accessPrincipal, variables.isUseCrypto())
					.then((response) => {
						if (response) {
							const data = response as unknown as OAuth2Token;
							this.setTokenInfo(data);
						}

						if (this.access_token) {
							resolve(true);
						} else {
							resolve(false);
						}
					})
					.catch((error) => {
						if (error.code && [40106, 40111].includes(error.code)) reject(error);
					});
			});
		},
	},
	persist: true,
});
