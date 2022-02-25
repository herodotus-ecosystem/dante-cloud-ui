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
    private static PROJECT_TYPE: string | undefined = process.env.VUE_APP_PROJECT;

    public LOCAL_SECRET_KEY: string | undefined = process.env.VUE_APP_SECRET_KEY;
    public AUTHORIZATION_KEY_TOKEN = 'token';
    public AUTHORIZATION_KEY_EXPIRES = 'expires';
    public AUTHORIZATION_KEY_SESSION = 'HSESSIONID';
    public AUTHORIZATION_KEY_SECRET_KEY = 'secret_key';

    public ENUMS = 'enums';

    public UAA_ADDRESS: string | undefined;
    public UPMS_ADDRESS: string | undefined;
    public BPMN_ADDRESS: string | undefined;

    public STATUS_DISPLAY: StatusDisplay[] = [
        { color: 'green', icon: 'check' },
        { color: 'error', icon: 'warning' },
        { color: 'error', icon: 'lock' },
        { color: 'warning', icon: 'history' },
    ];

    private static instance = new Constants();

    private constructor() {
        this.changeAddress(Constants.PROJECT_TYPE);
    }

    public changeAddress(type: string): void {
        switch (type) {
            case 'eurynome':
                this.UAA_ADDRESS = Constants.GATEWAY_ADDRESS + '/eurynome-cloud-uaa';
                this.UPMS_ADDRESS = Constants.GATEWAY_ADDRESS + '/eurynome-cloud-upms';
                this.BPMN_ADDRESS = Constants.GATEWAY_ADDRESS + '/eurynome-cloud-bpmn-ability/engine-rest';
                break;
            case 'herodotus':
                this.UAA_ADDRESS = Constants.GATEWAY_ADDRESS + '/herodotus-cloud-uaa';
                this.UPMS_ADDRESS = Constants.GATEWAY_ADDRESS + '/herodotus-cloud-upms';
                this.BPMN_ADDRESS = Constants.GATEWAY_ADDRESS + '/herodotus-cloud-bpmn-ability/engine-rest';
                break;
            default:
                this.UAA_ADDRESS = Constants.GATEWAY_ADDRESS;
                this.UPMS_ADDRESS = Constants.GATEWAY_ADDRESS;
                this.BPMN_ADDRESS = Constants.GATEWAY_ADDRESS + '/engine-rest';
        }
    }

    public static getInstance(): Constants {
        return this.instance;
    }
}

export const _constants: Constants = Constants.getInstance();

export { library as _lib };
