import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
declare const standardDeleteNotify: (onConfirm: () => void, onCancel?: () => void) => void;
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
declare class Notify {
    private static instance;
    private constructor();
    static getInstance(): Notify;
    information(title: string, icon: SweetAlertIcon): Promise<SweetAlertResult<string>>;
    info(text: string): Promise<SweetAlertResult<string>>;
    error(text: string): Promise<SweetAlertResult<string>>;
    warning(text: string): Promise<SweetAlertResult<string>>;
    success(text: string): Promise<SweetAlertResult<string>>;
    question(text: string): Promise<SweetAlertResult<string>>;
}
declare const notify: Notify;
declare class Toast {
    private static instance;
    private constructor();
    static getInstance(): Toast;
    information(title: string, icon: SweetAlertIcon): Promise<SweetAlertResult<string>>;
    info(text: string): Promise<SweetAlertResult<string>>;
    error(text: string): Promise<SweetAlertResult<string>>;
    warning(text: string): Promise<SweetAlertResult<string>>;
    success(text: string): Promise<SweetAlertResult<string>>;
    question(text: string): Promise<SweetAlertResult<string>>;
}
declare const toast: Toast;
export { Swal, notify, toast, standardDeleteNotify };
