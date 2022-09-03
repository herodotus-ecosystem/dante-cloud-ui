<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref } from 'vue';

import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';
import { SocialSource, AccessPrincipal } from '/@/lib/declarations';
import { useAuthenticationStore } from '/@/stores';
import { lodash } from '/@/lib/utils';

export default defineComponent({
	name: 'SocialSignInCallback',

	setup() {
		const route = useRoute();
		const router = useRouter();

		const source = ref() as Ref<SocialSource>;
		const accessPrincipal = ref({}) as Ref<AccessPrincipal>;

		const getAccessPrincipal = (source: SocialSource, route: RouteLocationNormalizedLoaded): AccessPrincipal => {
			if (route && !lodash.isEmpty(route.query)) {
				switch (source) {
					case 'WXAPP':
						break;
					default:
						accessPrincipal.value.code = route.query.code as string;
						accessPrincipal.value.state = route.query.state as string;
						break;
				}
			}

			return accessPrincipal.value;
		};

		const initParams = () => {
			if (route && !lodash.isEmpty(route.params) && route.params.source) {
				source.value = route.params.source as SocialSource;
				getAccessPrincipal(source.value, route);
			}
		};

		onMounted(() => {
			initParams();
			if (accessPrincipal.value.state) {
				const authentication = useAuthenticationStore();
				authentication.socialSignIn(source.value, accessPrincipal.value).then(() => {
					router.push('/');
				});
			}
		});

		return {
			source,
			accessPrincipal,
		};
	},
});
</script>
