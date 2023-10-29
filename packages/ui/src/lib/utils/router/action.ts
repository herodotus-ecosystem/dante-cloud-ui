import type { SweetAlertIcon, SweetAlertResult } from '/@/lib/declarations';

import { useAuthenticationStore, clearPersistData, useWebSocketStore } from '/@/stores';
import { RouteUtils } from './route';
import { Swal } from '../base';

class ActionUtilities {
  private static instance = new ActionUtilities();

  private constructor() {}

  public static getInstance(): ActionUtilities {
    return this.instance;
  }

  public signOut(isLocal = false): void {
    if (!isLocal) {
      const authentication = useAuthenticationStore();
      authentication.signOut();
    }

    const webSocket = useWebSocketStore();
    webSocket.disconnect();

    clearPersistData();

    RouteUtils.toSignIn();
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
      cancelButtonText: '取消'
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
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      confirmButtonText: '已阅!',
      willClose: () => {
        this.signOut(isLocal);
      }
    });
  }
}

export const ActionUtils: ActionUtilities = ActionUtilities.getInstance();
