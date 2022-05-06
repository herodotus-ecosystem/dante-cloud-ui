import { defineStore } from 'pinia';

import { useCryptoStore } from '/@/stores';
import { useOAuth2Api } from '/@/apis';
import { variables } from '/@/lib/utils';

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
		signOut() {},
	},
	persist: true,
});
