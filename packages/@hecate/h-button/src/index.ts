import Vue from 'vue';

import HButton from './HButton.vue';

const HButtonInstall = {
    install(vue: typeof Vue): void {
        vue.component('HButton', HButton);
    },
};

export default HButton;
export { HButtonInstall as HButtonComponent };
