import _Vue from 'vue';

import HTable from './HTable.vue';

// {@see : https://www.mistergoodcat.com/post/vuejs-plugins-with-typescript}

const HTablePluginObject = {
    install(Vue: typeof _Vue): void {
        Vue.component(HTable.name, HTable);
    },
};

if (typeof window !== 'undefined' && (window as any).Vue) {
    HTablePluginObject.install((window as any).Vue);
}

export default HTable;
export { HTablePluginObject, HTable };
