import { SweetAlertIcon } from '@herodotus-cloud/core';
export declare class SignOutUtilities {
    private static _instance;
    private static _initialized;
    private extension;
    private constructor();
    /**
     * 初始化单例（仅允许一次）
     * @param extension 扩展方法
     * @returns {OptionsUtilities} 单例实例
     */
    static initialize(extension: () => void): SignOutUtilities;
    /**
     * 获取单例实例
     * @returns {RouterUtilities} 单例实例
     */
    static getInstance(): SignOutUtilities;
    signOut(isLocal?: boolean): void;
    signOutWithDialog(): void;
    tokenExpires(title: string, text: string, icon: SweetAlertIcon, isLocal?: boolean): void;
}
