<template>
	<div>
		<v-alert title="Error" prominent rounded="t-xl b-lg" type="error">
			I'm an alert with top and bottom borders. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum esse quis eius delectus odio repellat
			voluptates ullam doloribus eaque dignissimos
		</v-alert>
		<v-btn :to="{ name: 'SysUserContent', params: { ddd: 'aaa' } }">编辑</v-btn>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'SysUser',

	setup() {
		const router = useRouter();

		const goToDetails = () => {
			router.replace({ name: 'SysUserContent' });
		};

		return {
			goToDetails,
		};
	},
});
</script>
