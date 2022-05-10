<template>
	<v-parallax :style="{ backgroundColor: backgroundColor }">
		<Particles id="tsparticles" :particlesInit="particlesInit" :options="particlesOptions" />
		<v-container color="grey" fluid>
			<v-row class="h-screen" justify="center">
				<v-col sm="4" align-self="center"
					><v-row justify="center">
						<v-col cols="10">
							<v-card class="elevation-20 mx-auto rounded-xl" border style="z-index: 5">
								<v-toolbar color="white" class="rounded-xl ma-2" flat>
									<template #prepend>
										<v-avatar>
											<v-img :src="logo" alt="John"></v-img>
										</v-avatar>
									</template>
									<v-spacer></v-spacer>

									<v-btn variant="text" class="text-h6" color="primary"> 欢迎使用 Herodotus Cloud</v-btn>
								</v-toolbar>
								<v-divider></v-divider>
								<slot></slot>
							</v-card>
						</v-col> </v-row
				></v-col>
			</v-row>
		</v-container>
		<h-sign-in-background :theme-color="backgroundThemeColor"></h-sign-in-background>
	</v-parallax>
</template>

<script lang="ts">
import type { Engine } from 'tsparticles-engine';

import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ThemeMode } from '/@/lib/enums';
import { useAuthenticationStore, useSettingsStore } from '/@/stores';
import { mixColor, getColorPalette, getVuetifyImage } from '/@/lib/utils';
import HSignInBackground from '../background/Index.vue';

import { options } from '/@/plugins/particles';
import { loadFull } from 'tsparticles';

export default defineComponent({
	name: 'HSignInLayout',
	components: {
		HSignInBackground,
	},
	setup() {
		const store = useAuthenticationStore();
		const settings = useSettingsStore();
		const router = useRouter();

		const passowrd = ref('');
		const username = ref('');

		const logo = getVuetifyImage('vuetify-logo-v3-light.svg');

		const particlesInit = async (engine: Engine) => {
			await loadFull(engine);
		};

		const signIn = () => {
			store.signIn(username.value, passowrd.value);
			if (store.access_token) {
				signInSuccess();
			}
		};

		const signInSuccess = () => {
			router.push('/');
		};

		const backgroundThemeColor = computed(() => {
			return settings.theme.mode === ThemeMode.DARK ? getColorPalette(settings.theme.primary, 7) : settings.theme.primary;
		});

		const backgroundColor = computed(() => {
			const COLOR_WHITE = '#ffffff';
			const ratio = settings.theme.mode === ThemeMode.DARK ? 0.5 : 0.2;
			return mixColor(COLOR_WHITE, settings.theme.primary, ratio);
		});

		const particlesOptions = options;

		return {
			signIn,
			signInSuccess,
			backgroundThemeColor,
			backgroundColor,
			logo,
			particlesOptions,
			particlesInit,
		};
	},
});
</script>
