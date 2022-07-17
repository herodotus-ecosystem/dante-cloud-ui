<template>
	<router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, watch, nextTick, provide, ref, onMounted, onUnmounted } from 'vue';

import { useQuasar } from 'quasar';

import { reloadInjectionKey } from '/@/lib/symbol';
import { useSettingsStore, useAuthenticationStore } from '/@/stores';
import { ActionUtils } from '/@/lib/utils';

export default defineComponent({
	name: 'App',

	setup() {
		const settings = useSettingsStore();
		const authentication = useAuthenticationStore();
		const $q = useQuasar();
		const gapTime = ref(0);
		const beforeUnloadTime = ref(0);

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

		const beforeUnloadHandler = () => {
			beforeUnloadTime.value = new Date().getTime();
		};

		const unloadHandler = () => {
			gapTime.value = new Date().getTime() - beforeUnloadTime.value;
			// 刷新时onbeforeunload与onunload的时间差一般都远大于5
			// 浏览器关闭
			// 判断是窗口关闭还是刷新 毫秒数判断 网上大部分写的是5
			if (gapTime.value <= 10) {
				if (authentication.token) {
					authentication.signOut();
				}
				localStorage.clear();
				sessionStorage.clear();
			} else {
				return confirm('确定要离开本系统么？');
			}
		};

		onMounted(() => {
			// 监听浏览器关闭
			window.addEventListener('beforeunload', () => beforeUnloadHandler());
			window.addEventListener('unload', () => unloadHandler());
		});

		onUnmounted(() => {
			window.removeEventListener('beforeunload', () => beforeUnloadHandler());
			window.removeEventListener('unload', () => unloadHandler());
		});

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
