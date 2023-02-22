import type { App } from 'vue';
import { Quasar, Loading, AppFullscreen } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';
import quasarIconSet from 'quasar/icon-set/svg-mdi-v7';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/mdi-v7/mdi-v7.css';
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
        spinnerColor: 'primary'
      }
    }
  });
};
