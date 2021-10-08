import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Component from 'vue-class-component';
import { default as liberay } from './config';
import Particles from 'particles.vue';
import { Vuetify as vuetify, VeeValidate, HecatePlugins } from '@hecate/plugins';
import { HButtonPluginObject } from '@hecate/h-button';
import { HTablePluginObject } from '@hecate/h-table';
import { HBpmnModdlePluginObject } from '@hecate/h-bpmn-moddle';
import VueChartist from 'vue-chartist';
import 'chartist/dist/chartist.min.css';

Vue.config.productionTip = false;

Vue.use(VueChartist);

Vue.use(VeeValidate);
Vue.use(HecatePlugins);
Vue.use(liberay);
Vue.use(Particles);
Vue.use(HButtonPluginObject);
Vue.use(HTablePluginObject);
Vue.use(HBpmnModdlePluginObject);

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');