import type { SweetAlertIcon, SweetAlertResult } from '@herodotus-cloud/core';
import { Swal } from '@herodotus-cloud/core';
import { RouterUtilities } from './router';

import { useCryptoStore, useAuthenticationStore } from '../stores';

export class SignOutUtilities {
  // 静态私有实例引用
  private static _instance: SignOutUtilities | null = null;

  // 初始化标志
  private static _initialized = false;

  private extension: () => void;

  private constructor(extension: () => void) {
    this.extension = extension;
  }

  /**
   * 初始化单例（仅允许一次）
   * @param extension 扩展方法
   * @returns {OptionsUtilities} 单例实例
   */
  public static initialize(extension: () => void): SignOutUtilities {
    if (SignOutUtilities._initialized) {
      throw new Error('SignOutUtilities has already been initialized');
    }

    SignOutUtilities._instance = new SignOutUtilities(extension);
    SignOutUtilities._initialized = true;
    return SignOutUtilities._instance;
  }

  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  public static getInstance(): SignOutUtilities {
    if (!SignOutUtilities._instance) {
      throw new Error('SignOutUtilities not initialized. Call initialize() first.');
    }
    return SignOutUtilities._instance;
  }

  public signOut(isLocal = false): void {
    if (!isLocal) {
      const authentication = useAuthenticationStore();
      authentication.signOut();
    }

    this.extension();
    console.log('Clear Framework Kernel Data');
    useAuthenticationStore().$reset();
    useCryptoStore().$reset();

    RouterUtilities.getInstance().toSignIn();
  }

  public signOutWithDialog(): void {
    Swal.fire({
      title: '要走了么?',
      text: '您确定要退出系统！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的',
      cancelButtonText: '取消',
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        this.signOut();
      }
    });
  }

  public tokenExpires(title: string, text: string, icon: SweetAlertIcon, isLocal = false): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      confirmButtonText: '已阅!',
      willClose: () => {
        this.signOut(isLocal);
      },
    });
  }
}
