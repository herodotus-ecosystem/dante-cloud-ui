// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { createI18n, useI18n } from 'vue-i18n/index';
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi';
import { en, zhHans } from 'vuetify/locale';

export const i18n = createI18n({
	legacy: false,
	locale: 'zh',
	fallbackLocale: 'en',
	messages: {
		en: en,
		zh: zhHans,
	},
});

export const vuetify = createVuetify({
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		},
	},
	locale: createVueI18nAdapter({
		i18n,
		useI18n,
	}),
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
