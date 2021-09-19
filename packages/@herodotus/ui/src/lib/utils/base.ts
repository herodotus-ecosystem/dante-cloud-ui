import { library } from '@hecate/utils';

export type StatusDisplay = {
    color: string;
    icon: string;
};

/**
 * 这里使用单例模式，主要是因为将静态类，赋值给Vue.prototype会出现 Property '' is a static member of type '' 错误。
 * 参考以下文章
 * {@see https://techformist.com/static-variables-methods-typescript/}
 * {@see https://www.xspdf.com/resolution/54250655.html}
 * {@see https://www.typescriptlang.org/docs/handbook/classes.html#static-properties}
 *
 * 单例模式饿汉式与懒汉式
 * {@see https://zhuanlan.zhihu.com/p/129264092}
 */
class Constants {
    private static GATEWAY_ADDRESS: string | undefined = process.env.VUE_APP_GATEWAY;

    public AUTHORIZATION_KEY_TOKEN = 'token';
    public AUTHORIZATION_KEY_EXPIRES = 'expires';

    public ENUMS = 'enums';

    public UAA_ADDRESS: string | undefined = Constants.GATEWAY_ADDRESS;
    public UPMS_ADDRESS: string | undefined = Constants.GATEWAY_ADDRESS;
    public BPMN_ADDRESS: string | undefined = Constants.GATEWAY_ADDRESS + '/engine-rest';

    public STATUS_DISPLAY: StatusDisplay[] = [
        { color: 'error', icon: 'warning' },
        { color: 'green', icon: 'check' },
        { color: 'error', icon: 'lock' },
        { color: 'warning', icon: 'history' },
    ];

    private static instance = new Constants();

    private constructor() {}

    public static getInstance(): Constants {
        return this.instance;
    }
}

export const _constants: Constants = Constants.getInstance();

export { library as _lib };
