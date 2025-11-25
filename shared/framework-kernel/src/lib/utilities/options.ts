import type { HttpConfig } from '@herodotus-cloud/core';
import type { KernelOptions, RouterOptions } from '@/declarations';
import type { Router, RouteRecordRaw } from 'vue-router';

/**
 * Framework Kernel Options 工具类，方便在代码中传递 Options
 */
export class OptionsUtilities {
  // 静态私有实例引用
  private static _instance: OptionsUtilities | null = null;

  // 初始化标志
  private static _initialized = false;

  private options: KernelOptions;

  // 私有构造函数防止外部实例化
  private constructor(options: KernelOptions) {
    this.options = options;
  }

  /**
   * 初始化单例（仅允许一次）
   * @param {KernelOptions} options 配置选项
   * @returns {OptionsUtilities} 单例实例
   */
  public static initialize(options: KernelOptions): OptionsUtilities {
    if (OptionsUtilities._initialized) {
      throw new Error('RouterUtilities has already been initialized');
    }

    OptionsUtilities._instance = new OptionsUtilities(options);
    OptionsUtilities._initialized = true;
    return OptionsUtilities._instance;
  }

  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  public static getInstance(): OptionsUtilities {
    if (!OptionsUtilities._instance) {
      throw new Error('RouterUtilities not initialized. Call initialize() first.');
    }
    return OptionsUtilities._instance;
  }

  public setOptions(options: KernelOptions): void {
    this.options = options;
  }

  public getOptions(): KernelOptions {
    return this.options;
  }

  public static axiosConfig(): HttpConfig {
    return this.getInstance().getOptions().config;
  }

  private static getRouterOptions(): RouterOptions {
    return this.getInstance().getOptions().router;
  }

  public static getRouter(): Router {
    return this.getRouterOptions().instance;
  }

  public static getRoutes(): RouteRecordRaw[] {
    return this.getInstance().getOptions().staticRoutes;
  }

  public static getSecurityKey(): string {
    return this.getInstance().getOptions().variables.securityKey;
  }

  public static getRedirectUri(): string {
    return this.getInstance().getOptions().variables.redirectUri;
  }

  public static isUseCrypto(): boolean {
    return this.getInstance().getOptions().variables.isUseCrypto;
  }

  public static isAutoRefreshToken(): boolean {
    return this.getInstance().getOptions().variables.isAutoRefreshToken;
  }

  public static getTenantId(): string {
    return this.getInstance().getOptions().variables.tenantId;
  }
}
