<template>
	<router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, watch, nextTick, provide, ref } from 'vue';

import { useQuasar } from 'quasar';

import { reloadInjectionKey } from '/@/lib/symbol';
import { useSettingsStore } from '/@/stores';

export default defineComponent({
	name: 'App',

	setup() {
		const settings = useSettingsStore();
		const $q = useQuasar();

		// 局部组件刷新
		const isRouterAlive = ref(true);
		const reload = () => {
			isRouterAlive.value = false;
			nextTick(() => {
				isRouterAlive.value = true;
			});
		};
		provide(reloadInjectionKey, reload);

		watch(
			() => settings.isDark,
			(newValue: boolean) => {
				$q.dark.set(newValue);
			}
		);

		return {
			isRouterAlive,
		};
	},
});
</script>

<style lang="scss">
h2 {
	line-height: unset !important;
}
</style>
