import type {
  Router,
  RouteLocationRaw,
  RouteLocationNormalizedLoaded,
  NavigationFailure,
} from 'vue-router';

import type { RouterOptions } from '@/declarations';

import { isEmpty, split, dropRight, join } from 'lodash-es';

export class RouterUtilities {
  // 静态私有实例引用
  private static _instance: RouterUtilities | null = null;

  // 初始化标志
  private static _initialized = false;

  private options: RouterOptions;
  private router: Router = {} as Router;

  // 私有构造函数防止外部实例化
  private constructor(options: RouterOptions) {
    this.options = options;
    this.router = options.instance;
  }

  /**
   * 初始化单例（仅允许一次）
   * @param {RouterOptions} options 配置选项
   * @returns {RouterUtilities} 单例实例
   */
  public static initialize(options: RouterOptions): RouterUtilities {
    if (RouterUtilities._initialized) {
      throw new Error('RouterUtilities has already been initialized');
    }

    RouterUtilities._instance = new RouterUtilities(options);
    RouterUtilities._initialized = true;
    return RouterUtilities._instance;
  }

  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  public static getInstance(): RouterUtilities {
    if (!RouterUtilities._instance) {
      throw new Error('RouterUtilities not initialized. Call initialize() first.');
    }
    return RouterUtilities._instance;
  }

  public setRouter(router: Router): void {
    this.router = router;
  }

  public getRouter(): Router {
    return this.router;
  }

  private isRouterExist(): boolean {
    return !isEmpty(this.router);
  }

  public hasParameter(route: RouteLocationNormalizedLoaded): boolean {
    return !isEmpty(route.params) || !isEmpty(route.query);
  }

  /**
   * 判断是否为三级路由页面
   * @param route 当前路由 {@link RouteLocationNormalizedLoaded}
   * @returns true 是三级路由，false 不是三级路由
   */
  public isDetailRoute(route: RouteLocationNormalizedLoaded): boolean {
    if (route.meta) {
      if (route.meta.isDetailContent) {
        return true;
      }
    }
    return false;
  }

  public isValidDetailRoute(route: RouteLocationNormalizedLoaded): boolean {
    return this.isDetailRoute(route) && this.hasParameter(route);
  }

  public push(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined> {
    return this.router.push(to);
  }

  public replace(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined> {
    return this.router.replace(to);
  }

  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param isNewTab - 是否在新的浏览器Tab标签打开
   */
  public to(to: RouteLocationRaw, isPush = false): void {
    if (isPush) {
      this.push(to);
    } else {
      this.replace(to);
    }
  }

  /**
   * 打开新页面
   * @param to 需要跳转的路由
   */
  public open(to: RouteLocationRaw): void {
    const route = this.router.resolve(to);
    window.open(route.href, '_blank');
  }

  /**
   * 返回上一级路由
   *
   */
  public goBack(): void {
    this.router.go(-1);
  }

  public refresh(): void {
    if (this.isRouterExist()) {
      this.router.go(0);
    } else {
      window.location.reload();
    }
  }

  public toRoot(): void {
    if (this.isRouterExist()) {
      this.to(this.options.path.root);
    }
  }

  /**
   * 跳转首页
   */
  public toHome(): void {
    if (this.isRouterExist()) {
      this.to(this.options.path.home);
    }
  }

  public toSignIn() {
    if (this.isRouterExist()) {
      this.to(this.options.path.signIn);
    } else {
      this.refresh();
    }
  }

  private getParent(path: string): string {
    const array = split(path, '/');
    const result = dropRight(array);
    return join(result, '/');
  }

  public toPrev(route: RouteLocationNormalizedLoaded): void {
    if (route.path) {
      const destination = this.getParent(route.path);
      this.to({ path: destination });
    } else {
      this.goBack();
    }
  }
}
