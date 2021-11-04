import Vue from 'vue';
import HTable from './HTable.vue';

// {@see : https://www.mistergoodcat.com/post/vuejs-plugins-with-typescript}

const HTableInstall = {
    install: (vue: typeof Vue) => {
        vue.component('HTable', HTable);
    },
};

export { HTableInstall as HTableComponent };
export default HTable;
