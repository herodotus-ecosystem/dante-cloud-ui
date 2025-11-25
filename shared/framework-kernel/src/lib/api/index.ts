import type { HttpConfig } from '@herodotus-cloud/core';

import { OAuth2ApiService } from './authentication';
import { OpenApiService } from './open';

export class SecurityApiResources {
  // 静态私有实例引用
  private static _instance: SecurityApiResources | null = null;

  // 初始化标志
  private static _initialized = false;

  private config = {} as HttpConfig;

  // 私有构造函数防止外部实例化
  private constructor(config: HttpConfig) {
    this.config = config;
  }

  /**
   * 初始化单例（仅允许一次）
   * @param {KernelOptions} config 配置选项
   * @returns {SecurityApiResources} 单例实例
   */
  public static initialize(config: HttpConfig): SecurityApiResources {
    if (SecurityApiResources._initialized) {
      throw new Error('SecurityApiResources has already been initialized');
    }

    SecurityApiResources._instance = new SecurityApiResources(config);
    SecurityApiResources._initialized = true;
    return SecurityApiResources._instance;
  }

  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  public static getInstance(): SecurityApiResources {
    if (!SecurityApiResources._instance) {
      throw new Error('SecurityApiResources not initialized. Call initialize() first.');
    }
    return SecurityApiResources._instance;
  }

  public getConfig(): HttpConfig {
    return this.config;
  }

  public open(): OpenApiService {
    return OpenApiService.getInstance(this.config);
  }

  public oauth2(): OAuth2ApiService {
    return OAuth2ApiService.getInstance(this.config);
  }
}
