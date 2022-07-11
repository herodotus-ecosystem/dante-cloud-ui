import { defineStore } from 'pinia';
import type { UserErrorStatus, AxiosHttpResult } from '/@/lib/declarations';

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
		token_type: '',
		errorTimes: 0,
		remainTimes: 0,
		locked: false,
	}),

	getters: {
		isNotExpired: (state) => {
			const expires = moment().add(state.expires_in, 'seconds').valueOf();
			const flag = moment(expires).diff(moment(), 'seconds');
			return flag >= 60;
		},
		token(state) {
			if (this.isNotExpired) {
				return state.access_token;
			} else {
				return '';
			}
		},
	},

	actions: {
		signIn(username: string, password: string) {
			const oauth2Api = useOAuth2Api();
			const openApi = useOpenApi();
			if (variables.isUseCrypto()) {
				const crypto = useCryptoStore();
				username = crypto.encrypt(username);
				password = crypto.encrypt(password);
			}
			return new Promise<boolean>((resolve, reject) => {
				oauth2Api
					.passwordFlow(username, password)
					.then((response) => {
						if (response) {
							const data = response as unknown as OAuth2Token;

							this.access_token = data.access_token;
							this.expires_in = data.expires_in;
							this.refresh_token = data.refresh_token;
							this.license = data.license;
							this.openid = data.openid;
							this.scope = data.scope;
							this.token_type = data.token_type;
						}

						if (this.access_token) {
							resolve(true);
						} else {
							resolve(false);
						}
					})
					.catch((error) => {
						if (error.code && [40106, 40111].includes(error.code))
							openApi.getPrompt(username).then((result) => {
								const data = result.data as UserErrorStatus;
								this.remainTimes = data.remainTimes;
								this.errorTimes = data.errorTimes;
								this.locked = data.locked;
							});
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
	},
	persist: true,
});
