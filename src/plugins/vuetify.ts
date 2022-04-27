import type { App } from 'vue';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/lib/components/index';
import * as directives from 'vuetify/lib/directives/index';
import { fa } from 'vuetify/lib/iconsets/fa';
import { mdi } from 'vuetify/lib/iconsets/mdi';
import { md } from 'vuetify/lib/iconsets/md';
import { mdi as mdiSvg } from 'vuetify/lib/iconsets/mdi-svg';

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { createI18n, useI18n } from 'vue-i18n/index';
import { en, zhHans } from 'vuetify/locale';

const i18n = createI18n({
	legacy: false,
	locale: 'zh',
	fallbackLocale: 'en',
	messages: {
		en: en,
		zh: zhHans,
	},
});

const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: 'mdi',
		sets: {
			fa,
			mdi,
			md,
			mdiSvg,
		},
	},
	theme: {
		themes: {
			light: {
				colors: {
					primary: '#1867c0',
					secondary: '#5CBBF6',
					tertiary: '#E57373',
					accent: '#005CAF',
				},
			},
		},
	},
	locale: createVueI18nAdapter({
		i18n,
		useI18n,
	}),
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

export const setupVuetifyAndI18n = (app: App<Element>) => {
	app.use(i18n);
	app.use(vuetify);
};
