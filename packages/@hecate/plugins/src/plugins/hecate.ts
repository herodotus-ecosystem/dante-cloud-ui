import Draggable from 'vuedraggable';
import _Vue from 'vue';

import { library } from '@hecate/utils';

const HecatePlugins = {
    install(Vue: typeof _Vue): void {
        Vue.prototype.$lib = library;
        Vue.prototype.$notify = library._notify;
        Vue.component('draggable', Draggable);
    },
};

export default HecatePlugins;
