import type { App } from 'vue';
import { Quasar, Loading, AppFullscreen } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';
import quasarIconSet from 'quasar/icon-set/mdi-v6';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';
// Import Quasar css
import 'quasar/dist/quasar.css';

export const setupQuasar = (app: App<Element>) => {
	app.use(Quasar, {
		plugins: { Loading, AppFullscreen }, // import Quasar plugins and add here
		lang: quasarLang,
		iconSet: quasarIconSet,
		config: {
			loading: {
				color: 'primary',
				size: '100px',
				spinnerColor: 'primary',
			},
		},
		/*
    config: {
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      notify: {...}, // default set of options for Notify Quasar plugin
      loading: {...}, // default set of options for Loading Quasar plugin
      loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
    */
	});
};
