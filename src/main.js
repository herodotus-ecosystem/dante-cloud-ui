import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueConfiguration from "./plugins/configuration";
import VeeValidate from "./plugins/vee-validate";

Vue.config.productionTip = false;

Vue.use(VueConfiguration);
Vue.use(VeeValidate);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
