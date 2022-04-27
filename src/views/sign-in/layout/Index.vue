<template>
	<v-parallax :style="{ backgroundColor: backgroundColor }">
		<v-container color="grey" fluid>
			<v-row class="h-screen" justify="center">
				<v-col sm="4" align-self="center"
					><v-row justify="center">
						<v-col cols="10">
            <slot></slot>

						</v-col> </v-row
				></v-col>
			</v-row>
		</v-container>
		<h-sign-in-background :theme-color="backgroundThemeColor"></h-sign-in-background>
	</v-parallax>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ThemeMode } from '/@/lib/declarations';
import { useAuthenticationStore, useSettingsStore } from '/@/stores';
import { mixColor, getColorPalette } from '/@/utils';
import { HSignInBackground } from '../background';

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

		const signIn = () => {
			store.signIn(username.value, passowrd.value);
			if (store.accessToken) {
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

		const getVuetifyImage = (name: string): string => {
			// 其实就是将图片导为模块
			// 获取图片模块
			const modules = import.meta.globEager('../../../assets/vuetify/*');
			// 获取指定的图片
			const path = `../../../assets/vuetify/${name}`;
			return modules[path].default;
		};

		return {
			signIn,
			signInSuccess,
			backgroundThemeColor,
			backgroundColor,
		};
	},
});
</script>
