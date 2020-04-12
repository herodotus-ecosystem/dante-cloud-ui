import Vue from "vue";
import Vuetify from "vuetify/lib";
import VueI18n from "vue-i18n";
import zhHans from "vuetify/es5/locale/zh-Hans";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);
Vue.use(VueI18n);

const loadLocaleMessages = () => {
    const locales = require.context(
        "../locales",
        true,
        /[A-Za-z0-9-_,\s]+\.json$/i
    );
    const messages = {};

    locales.keys().forEach((key) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);

        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
};

const i18n = new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || "zh",
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
    messages: loadLocaleMessages(),
});

export default new Vuetify({
    icons: {
        iconfont: "md",
    },
    lang: {
        locales: { zhHans, i18n },
        current: "zh-Hans",
    },
});
