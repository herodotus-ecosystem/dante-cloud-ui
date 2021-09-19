import _Vue from 'vue';

import HBpmnModdle from './HBpmnModdle.vue';

// {@see : https://www.mistergoodcat.com/post/vuejs-plugins-with-typescript}
const HBpmnModdlePluginObject = {
    install(Vue: typeof _Vue): void {
        Vue.component(HBpmnModdle.name, HBpmnModdle);
    },
};

if (typeof window !== 'undefined' && (window as any).Vue) {
    HBpmnModdlePluginObject.install((window as any).Vue);
}

export default HBpmnModdle;
export { HBpmnModdlePluginObject, HBpmnModdle };
