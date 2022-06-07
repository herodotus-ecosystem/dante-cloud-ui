<template>
	<q-drawer v-model="application.rightDrawer" side="right" behavior="mobile" bordered :width="240"></q-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useApplicationStore } from '/@/stores';

export default defineComponent({
	name: 'HAppRightDrawer',

	setup() {
		const application = useApplicationStore();

		return {
			application,
		};
	},
});
</script>
