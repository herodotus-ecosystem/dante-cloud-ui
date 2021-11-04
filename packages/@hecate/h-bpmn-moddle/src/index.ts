import Vue from 'vue';

import HBpmnModdle from './HBpmnModdle.vue';

const HBpmnModdleInstall = {
    install(vue: typeof Vue): void {
        vue.component('HBpmnModdle', HBpmnModdle);
    },
};

export default HBpmnModdle;
export { HBpmnModdleInstall as HBpmnModdleComponent };
