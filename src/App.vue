<template>
	<router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue';

import { useQuasar } from 'quasar';

import { useSettingsStore } from '/@/stores';

export default defineComponent({
	name: 'App',

	setup() {
		const settings = useSettingsStore();
		const $q = useQuasar();

		watch(
			() => settings.isDark,
			(newValue: boolean) => {
				$q.dark.set(newValue);
			},
			{
				immediate: true,
			}
		);

		return {};
	},
});
</script>

<style lang="scss">
#nprogress {
	position: relative;
	z-index: 9999999;
}
</style>
