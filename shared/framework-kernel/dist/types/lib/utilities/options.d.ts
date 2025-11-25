import { HttpConfig } from '@herodotus-cloud/core';
import { KernelOptions } from '../../declarations';
import { Router, RouteRecordRaw } from 'vue-router';
/**
 * Framework Kernel Options 工具类，方便在代码中传递 Options
 */
export declare class OptionsUtilities {
    private static _instance;
    private static _initialized;
    private options;
    private constructor();
    /**
     * 初始化单例（仅允许一次）
     * @param {KernelOptions} options 配置选项
     * @returns {OptionsUtilities} 单例实例
     */
    static initialize(options: KernelOptions): OptionsUtilities;
    /**
     * 获取单例实例
     * @returns {RouterUtilities} 单例实例
     */
    static getInstance(): OptionsUtilities;
    setOptions(options: KernelOptions): void;
    getOptions(): KernelOptions;
    static axiosConfig(): HttpConfig;
    private static getRouterOptions;
    static getRouter(): Router;
    static getRoutes(): RouteRecordRaw[];
    static getSecurityKey(): string;
    static getRedirectUri(): string;
    static isUseCrypto(): boolean;
    static isAutoRefreshToken(): boolean;
    static getTenantId(): string;
}
