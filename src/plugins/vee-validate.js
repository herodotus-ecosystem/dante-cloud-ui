import zhCN from 'vee-validate/dist/locale/zh_CN.json'; // 引入本地化语言
import { required, email } from 'vee-validate/dist/rules.umd';
import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode,
    localize
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
    ...required,
    message: '{_field_} 不能为空'
});

extend('email', {
    ...email,
    message: '请输入有效的电子邮件地址！'
});

localize('zh_CN', zhCN);

const VeeValidate = {
    install(Vue, options) {
        Vue.component('ValidationProvider', ValidationProvider);
        Vue.component('ValidationObserver', ValidationObserver);
    }
};

export default VeeValidate;
