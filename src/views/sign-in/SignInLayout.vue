<template>
	<q-parallax class="window-height" :style="{ backgroundColor: backgroundColor }">
		<Particles id="tsparticles" :particlesInit="particlesInit" :options="particlesOptions" />
		<h-container class="window-width" style="z-index: 2">
			<h-row class="justify-center">
				<h-column :cols="8">
					<q-card class="rounded-xl">
						<q-card-section>
							<div class="text-h6">Our Changing Planet</div>
							<div class="text-subtitle2">by John Doe</div>
						</q-card-section>
					</q-card>
				</h-column>
			</h-row>
		</h-container>
		<background :theme-color="backgroundThemeColor"></background>
	</q-parallax>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import type { Engine } from 'tsparticles-engine';

import { getColorPalette, mixColor, lodash } from '/@/lib/utils';
import { ThemeModeEnum } from '/@/lib/enums';
import { useSettingsStore } from '/@/stores';

import { options } from '/@/plugins/particles';
import { loadFull } from 'tsparticles';

import { HContainer, HRow, HColumn } from '/@/components';
import { Background } from './background';

export default defineComponent({
	name: 'SignInLayout',

	components: {
		HContainer,
		HRow,
		HColumn,
		Background,
	},

	setup(props) {
		const settings = useSettingsStore();

		const backgroundThemeColor = computed(() => {
			return settings.theme.mode === ThemeModeEnum.DARK ? getColorPalette(settings.theme.primary, 7) : settings.theme.primary;
		});

		const backgroundColor = computed(() => {
			const COLOR_WHITE = '#ffffff';
			const ratio = settings.theme.mode === ThemeModeEnum.DARK ? 0.5 : 0.2;
			return mixColor(COLOR_WHITE, settings.theme.primary, ratio);
		});

		const particlesInit = async (engine: Engine) => {
			await loadFull(engine);
		};

		const particlesOptions = lodash.cloneDeep(options);

		return {
			backgroundThemeColor,
			backgroundColor,
			particlesOptions,
			particlesInit,
		};
	},
});
</script>

<style lang="scss" scoped>
.q-card {
	box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
	border-radius: 1rem;
	vertical-align: top;
	background: #fff;
	position: relative;
}
</style>
