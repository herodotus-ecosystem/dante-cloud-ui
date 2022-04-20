import { createApp } from 'vue';

import App from './App.vue';
import { loadFonts } from './plugins/webfontloader';
import { i18n, vuetify } from './plugins/vuetify';
import { router, pinia } from './routers';

loadFonts();

const app = createApp(App);

app.use(i18n);
app.use(vuetify);
app.use(pinia);
app.use(router);

router.isReady().then(() => {
	app.mount('#app');
});
