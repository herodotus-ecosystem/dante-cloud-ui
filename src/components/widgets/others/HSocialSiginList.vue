<template>
	<h-row justify="center" gutter="xs"
		><q-btn v-if="!hasConfig" round color="primary" icon="mdi-wechat" />
		<template v-else>
			<q-btn v-for="(value, key, index) in list" flat round :key="index" :href="value" target="_blank">
				<q-avatar size="30px">
					<img :src="getImage(key)" />
				</q-avatar>
			</q-btn>
		</template>
		<h-button color="primary" icon="mdi-login" flat round :href="authorizationCodeUrl" tooltip="授权码模式登录"></h-button>
	</h-row>
</template>

<script lang="ts">
import { defineComponent, Ref } from 'vue';
import { useOpenApi } from '/@/apis';
import { getSocialLogo, lodash, variables, service } from '/@/lib/utils';
import { HButton } from '/@/components';

export default defineComponent({
	name: 'HSocialSiginList',

	components: {
		HButton,
	},

	setup() {
		const openApi = useOpenApi();

		const list = ref({}) as Ref<Record<string, string>>;

		const init = () => {
			openApi.getSocialList().then((result) => {
				list.value = result.data as Record<string, string>;
			});
		};

		const getImage = (source: string) => {
			const name = source.toLowerCase();
			return getSocialLogo(name);
		};

		const hasConfig = computed(() => {
			return !lodash.isEmpty(list.value);
		});

		const createAuthorizationCodeAddress = () => {
			const project = variables.getProject();
			let address = variables.getApiUrl();

			if (lodash.endsWith(address, '/')) {
				address = address.substring(0, address.length - 1);
			}

			if (project && (project === 'dante' || project === 'herodotus')) {
				address += service.getUaa();
			}

			return address + '/oauth2/authorize';
		};

		const createAuthorizationCodeParams = () => {
			const param = `?response_type=code&client_id=${variables.getClientId()}&client_secret=${variables.getClientSecret()}&redirect_uri=${variables.getRedirectUri()}&scope=openid`;
			return param;
		};

		const authorizationCodeUrl = computed(() => {
			return createAuthorizationCodeAddress() + createAuthorizationCodeParams();
		});

		onMounted(() => {
			init();
		});

		return {
			list,
			getImage,
			hasConfig,
			authorizationCodeUrl,
		};
	},
});
</script>
