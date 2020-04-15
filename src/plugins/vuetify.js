import Vue from "vue";
import Vuetify from "vuetify/lib";
import VueI18n from "vue-i18n";
import { en, zh } from "../locales/index";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: "zh", // set locale
    messages: { en, zh }, // set locale messages
});

export default new Vuetify({
    icons: {
        iconfont: "md",
    },
    lang: {
        t: (key, ...params) => i18n.t(key, params),
    },
});
