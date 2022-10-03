import type { App } from 'vue';

import { createI18n } from 'vue-i18n';
import { zh_CN, en_US } from '../i18n';

const i18n = createI18n({
	legacy: false,
	locale: 'zh',
	fallbackLocale: 'en',
	messages: {
		en: en_US,
		zh: zh_CN,
	},
});

export const setupI18n = (app: App<Element>) => {
	app.use(i18n);
};

export default i18n;
