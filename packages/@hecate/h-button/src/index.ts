import _Vue from 'vue';

import HButton from './HButton.vue';

const HButtonPluginObject = {
    install(Vue: typeof _Vue): void {
        Vue.component(HButton.name, HButton);
    },
};

if (typeof window !== 'undefined' && (window as any).Vue) {
    HButtonPluginObject.install((window as any).Vue);
}

export default HButton;
export { HButtonPluginObject, HButton };
