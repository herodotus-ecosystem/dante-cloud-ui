import type { App } from 'vue';
import { Quasar, Loading, AppFullscreen, Notify } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';
import quasarIconSet from 'quasar/icon-set/svg-mdi-v7';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/mdi-v7/mdi-v7.css';
// Import Quasar css
import 'quasar/dist/quasar.css';

export const setupQuasar = (app: App<Element>) => {
  app.use(Quasar, {
    plugins: {
      Loading,
      AppFullscreen,
      Notify
    },
    lang: quasarLang,
    iconSet: quasarIconSet,
    config: {
      loading: {
        spinnerColor: 'primary',
        spinnerSize: 100,
        message: '正在处理中. 请稍后...',
      }
    }
  });
};
