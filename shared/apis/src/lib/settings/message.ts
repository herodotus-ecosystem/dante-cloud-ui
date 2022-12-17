import type { DialogueContact, DialogueDetail, Notification } from '/@/declarations';

import { HttpConfig, BaseService } from '../base';

class DialogueContactService extends BaseService<DialogueContact> {
  private static instance: DialogueContactService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): DialogueContactService {
    if (this.instance == null) {
      this.instance = new DialogueContactService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getMsg() + '/message/contact';
  }
}

class DialogueDetailService extends BaseService<DialogueDetail> {
  private static instance: DialogueDetailService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): DialogueDetailService {
    if (this.instance == null) {
      this.instance = new DialogueDetailService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getMsg() + '/message/detail';
  }
}

class NotificationService extends BaseService<Notification> {
  private static instance: NotificationService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): NotificationService {
    if (this.instance == null) {
      this.instance = new NotificationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getMsg() + '/message/notification';
  }
}

export { DialogueContactService, DialogueDetailService, NotificationService };
