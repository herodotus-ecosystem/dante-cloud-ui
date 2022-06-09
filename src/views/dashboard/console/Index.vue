<template>
	<div>
		I'm an alert with no rounded borders. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur recusandae, est itaque laboriosam amet
		officia? Officia repellat provident sed est adipisci voluptatibus, voluptas reprehenderit dicta voluptatum, optio enim, placeat nostrum.
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { useConstantsStore } from '/@/stores';

export default defineComponent({
	name: 'DashboardConsole',
	setup() {
		const constants = useConstantsStore();

		onMounted(() => {
			constants.init();
		});
	},
});
</script>
