<template>
	<div>
		<v-alert type="success">I'm a success alert.</v-alert>
		<v-btn rounded="lg" color="primary" @click="signIn()"> Rounded Button </v-btn>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthenticationStore } from '/@/stores';
import { initFrontEndRoutes } from '/@/routers';

export default defineComponent({
	setup() {
		const store = useAuthenticationStore();
		const router = useRouter();

		const passowrd = ref('');
		const username = ref('');

		const signIn = () => {
			store.signIn(username.value, passowrd.value);
			if (store.accessToken) {
				initFrontEndRoutes();
				signInSuccess();
			}
		};

		const signInSuccess = () => {
			router.push('/');
		};

		return {
			signIn,
			signInSuccess,
		};
	},
});
</script>
