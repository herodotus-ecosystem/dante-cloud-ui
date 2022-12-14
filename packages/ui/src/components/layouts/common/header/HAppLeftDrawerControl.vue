<template>
	<q-btn flat dense round @click="application.leftDrawer = !application.leftDrawer" icon="menu" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore } from '/@/stores';

export default defineComponent({
	name: 'HAppLeftDrawerControl',

	setup(props) {
		const application = useApplicationStore();

		return {
			application,
		};
	},
});
</script>
