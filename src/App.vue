<template>
	<v-theme-provider :theme="theme"> <router-view /></v-theme-provider>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { IN_BROWSER, getMatchMedia } from '/@/utils';
import { useGlobalSettingStore } from '/@/stores';

export default defineComponent({
	name: 'App',

	setup() {
		const setting = useGlobalSettingStore();

		const systemTheme = ref('light');
		if (IN_BROWSER) {
			let media: MediaQueryList;
			watch(
				() => setting.theme,
				(val) => {
					if (val === 'system') {
						media = getMatchMedia()!;
						media.addEventListener('change', onThemeChange);
						onThemeChange();
					} else if (media) {
						media.removeEventListener('change', onThemeChange);
					}
				},
				{ immediate: true }
			);
			function onThemeChange() {
				systemTheme.value = media!.matches ? 'dark' : 'light';
			}
		}

		const theme = computed(() => {
			return setting.theme === 'system' ? systemTheme.value : setting.theme;
		});

		return {
			theme,
			setting,
		};
	},
});
</script>
