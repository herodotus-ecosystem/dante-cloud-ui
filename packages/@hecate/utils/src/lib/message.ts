import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

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
class Notify {
    private static instance = new Notify();

    private constructor() {}

    public static getInstance(): Notify {
        return this.instance;
    }

    public information(title: string, icon: SweetAlertIcon): Promise<SweetAlertResult<string>> {
        return Swal.fire({
            position: 'top',
            title: title,
            icon: icon,
            timer: 2000,
            showConfirmButton: false,
        });
    }

    public info(text: string): Promise<SweetAlertResult<string>> {
        return this.information(text, 'info');
    }

    public error(text: string): Promise<SweetAlertResult<string>> {
        return this.information(text, 'error');
    }

    public warning(text: string): Promise<SweetAlertResult<string>> {
        return this.information(text, 'warning');
    }

    public success(text: string): Promise<SweetAlertResult<string>> {
        return this.information(text, 'success');
    }

    public question(text: string): Promise<SweetAlertResult<string>> {
        return this.information(text, 'question');
    }
}

export const _notify: Notify = Notify.getInstance();

export { Swal, SweetAlertIcon, SweetAlertResult };
