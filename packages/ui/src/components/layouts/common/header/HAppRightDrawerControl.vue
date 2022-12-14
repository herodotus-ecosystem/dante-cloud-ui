<template>
	<q-btn round dense flat color="grey-8" icon="settings" @click="application.rightDrawer = !application.rightDrawer">
		<q-tooltip>设置</q-tooltip>
	</q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore } from '/@/stores';

export default defineComponent({
	name: 'HAppRightDrawerControl',

	setup(props) {
		const application = useApplicationStore();

		return {
			application,
		};
	},
});
</script>
