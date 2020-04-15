import {
    header,
    http,
    axios,
    storage,
    storageSync,
    local,
    notify,
    swal,
    moment,
    utils,
    api,
} from "../configurations/api";

const VueConfiguration = {
    install(Vue, options) {
        Vue.prototype.$http = http;
        Vue.prototype.$header = header;
        Vue.prototype.$axios = axios;
        Vue.prototype.$storage = storage;
        Vue.prototype.$storageSync = storageSync;
        Vue.prototype.$local = local;
        Vue.prototype.$notify = notify;
        Vue.prototype.$swal = swal;
        Vue.filter("dateFormat", function (
            daraStr,
            pattern = "YYYY-MM-DD HH:mm:ss"
        ) {
            return moment(daraStr).format(pattern);
        });
        Vue.prototype.$moment = moment;
        Vue.prototype.$utils = utils;
        Vue.prototype.$api = api;
    },
};
export default VueConfiguration;
