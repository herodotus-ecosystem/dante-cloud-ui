import type {
  DialogueContact,
  DialogueDetail,
  Notification,
  AxiosHttpResult,
  Dictionary,
  ConstantDictionary
} from '/@/declarations';

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
    return this.getConfig().getMsg() + '/dialogue/contact';
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
    return this.getConfig().getMsg() + '/dialogue/detail';
  }

  public getDeleteDialoguePath(id: string): string {
    return this.getParamPath(this.getBaseAddress(), id);
  }

  public deleteDialogueById(id: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, string>(this.getDeleteDialoguePath(id));
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
    return this.getConfig().getMsg() + '/notification';
  }

  public getAllReadAddress(): string {
    return this.getBaseAddress() + '/all-read';
  }

  public setAllRead(userId: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().put<string, Dictionary<string>>(this.getAllReadAddress(), { userId });
  }
}

class WebSocketMessageService {
  private static instance: WebSocketMessageService;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): WebSocketMessageService {
    if (this.instance == null) {
      this.instance = new WebSocketMessageService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.config.getMsg() + '/message/websocket';
  }

  public getStatAddress(): string {
    return this.getBaseAddress() + '/stat';
  }

  public fetchAllStat(): Promise<AxiosHttpResult<Dictionary<any>>> {
    return this.config.getHttp().get<Dictionary<any>, string>(this.getStatAddress());
  }
}

export { DialogueContactService, DialogueDetailService, NotificationService, WebSocketMessageService };
