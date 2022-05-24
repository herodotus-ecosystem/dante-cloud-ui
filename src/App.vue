<template>
	<v-theme-provider :theme="theme"> <router-view></router-view></v-theme-provider>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { IN_BROWSER, getMatchMedia } from '/@/lib/utils';
import { ThemeMode } from '/@/lib/enums';
import { useSettingsStore, useCryptoStore } from '/@/stores';

export default defineComponent({
	name: 'App',

	setup() {
		const settings = useSettingsStore();
		const crypto = useCryptoStore();

		const systemTheme = ref<string>(ThemeMode.DARK);
		if (IN_BROWSER) {
			let media: MediaQueryList;
			watch(
				() => settings.theme.mode,
				(val) => {
					if (val === ThemeMode.SYSTEM) {
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
				systemTheme.value = media!.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
			}
		}

		const theme = computed(() => {
			return settings.isSystem ? systemTheme.value : settings.theme.mode;
		});

		return {
			theme,
		};
	},
});
</script>
