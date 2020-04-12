import router from '../routers';
import { storage, storageSync, notify, swal, moment } from './storage';

const utils = {
    auth: {
        logout() {
            storageSync.clear().then(() => {
                router.replace({ path: '/' });
            });
        },
    },
    constants: {
        statusDisplay: [
            { color: 'error', icon: 'warning' },
            { color: 'green', icon: 'check' },
            { color: 'error', icon: 'lock' },
            { color: 'warning', icon: 'history' },
        ],
    },
};

export { storage, storageSync, notify, swal, moment, utils };
