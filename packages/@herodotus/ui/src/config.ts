import { _constants, _token, _session, _enums, _action, _router, _http, _lib } from '@/lib/utils';
import _Vue from 'vue';
import { _identity } from './modules/security/identity';

export default {
    install(Vue: typeof _Vue): void {
        Vue.prototype.$token = _token;
        Vue.prototype.$session = _session;
        Vue.prototype.$enums = _enums;
        Vue.prototype.$constants = _constants;
        Vue.prototype.$axios = _http;
        Vue.prototype.$navigation = _router;
        Vue.prototype.$action = _action;
        Vue.prototype.$lib = _lib;
        Vue.prototype.$notify = _lib._notify;
        Vue.prototype.$security = _identity;
    },
};
