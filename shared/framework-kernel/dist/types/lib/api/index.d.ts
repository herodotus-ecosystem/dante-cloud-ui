import { HttpConfig } from '@herodotus-cloud/core';
import { OAuth2ApiService } from './authentication';
import { OpenApiService } from './open';
export declare class SecurityApiResources {
    private static _instance;
    private static _initialized;
    private config;
    private constructor();
    /**
     * 初始化单例（仅允许一次）
     * @param {KernelOptions} config 配置选项
     * @returns {SecurityApiResources} 单例实例
     */
    static initialize(config: HttpConfig): SecurityApiResources;
    /**
     * 获取单例实例
     * @returns {RouterUtilities} 单例实例
     */
    static getInstance(): SecurityApiResources;
    getConfig(): HttpConfig;
    open(): OpenApiService;
    oauth2(): OAuth2ApiService;
}
