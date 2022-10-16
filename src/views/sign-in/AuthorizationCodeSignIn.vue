<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { useAuthenticationStore, useCryptoStore } from '/@/stores';
import { lodash, variables } from '/@/lib/utils';
import { sign } from 'crypto';

export default defineComponent({
	name: 'AuthorizationCodeSignIn',

	setup() {
		const route = useRoute();
		const router = useRouter();

		const authentication = useAuthenticationStore();
		const crypto = useCryptoStore();

		const signIn = async (code: string, state = '') => {
			if (code) {
				await authentication.authorizationCode(code, state);
				router.push('/');
			}
		};

		onMounted(() => {
			console.log('---code sign in ---');
			if (route && !lodash.isEmpty(route.query)) {
				const state = route.query.state as string;
				const code = route.query.code as string;
				signIn(code, state);
			}
			router.push('/403');
		});
	},
});
</script>
