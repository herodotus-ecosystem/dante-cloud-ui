<template>
	<v-theme-provider :theme="theme"> <router-view /></v-theme-provider>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { IN_BROWSER, getMatchMedia } from '/@/utils';
import { ThemeMode } from '/@/lib/declarations';
import { useSettingsStore } from '/@/stores';

export default defineComponent({
	name: 'App',

	setup() {
		const settings = useSettingsStore();

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
			return settings.theme.mode === ThemeMode.SYSTEM ? systemTheme.value : settings.theme.mode;
		});

		return {
			theme,
		};
	},
});
</script>

<style lang="sass">
a:not(:hover)
  text-decoration: none

code
  padding: 0.1em 0.2em
  border-radius: 4px
  background: rgba(var(--v-border-color), var(--v-idle-opacity))

p
  margin-bottom: 1rem

  a, a:visited
    color: rgb(var(--v-theme-primary))

h1
  + p
    font-size: 1.25rem
    font-weight: 300

ul:not([class])
  padding-left: 20px
  margin-bottom: 16px
</style>
