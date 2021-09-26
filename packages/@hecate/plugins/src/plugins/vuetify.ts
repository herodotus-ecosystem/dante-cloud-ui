import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueI18n from 'vue-i18n';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { localize } from '@hecate/utils';

Vue.use(Vuetify);
Vue.use(VueI18n);

const { en, zh } = localize;

const i18n = new VueI18n({
    locale: 'zh',
    messages: { zh, en },
});

export default new Vuetify({
    lang: {
        t: (key, ...params) => i18n.t(key, params).toString(),
    },
});
