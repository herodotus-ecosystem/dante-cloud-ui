import { defineStore } from 'pinia';

import { useCryptoStore } from '/@/stores';
import { useOAuth2Api } from '/@/apis';
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
	}),

	getters: {
		isNotExpired(state) {
			const flag = moment(state.expires_in).diff(moment(), 'seconds');
			return flag >= 60;
		},
		getToken(state) {
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
						reject(error);
					});
			});
		},
		async signOut() {
			const oauth2Api = useOAuth2Api();
			const token = this.getToken;
			if (token) {
				await oauth2Api.signOut(token);
			}

			this.$reset();
		},
	},
	persist: true,
});
