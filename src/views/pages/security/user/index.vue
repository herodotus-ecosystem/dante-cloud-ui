<template>
	<div>
		<v-alert title="Error" prominent rounded="t-xl b-lg" type="error">
			I'm an alert with top and bottom borders. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum esse quis eius delectus odio repellat
			voluptates ullam doloribus eaque dignissimos
		</v-alert>
		<v-btn to="/security/user/content" replace>编辑</v-btn>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SysUser',

	data() {
		return {
			//
		};
	},
});
</script>
