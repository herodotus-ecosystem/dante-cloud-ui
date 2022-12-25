import type { DialogueContact, DialogueDetail, Notification, AxiosHttpResult } from '../../declarations';
import { HttpConfig, BaseService } from '../base';
declare class DialogueContactService extends BaseService<DialogueContact> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DialogueContactService;
    getBaseAddress(): string;
}
declare class DialogueDetailService extends BaseService<DialogueDetail> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DialogueDetailService;
    getBaseAddress(): string;
    getDeleteDialoguePath(id: string): string;
    deleteDialogueById(id: string): Promise<AxiosHttpResult<string>>;
}
declare class NotificationService extends BaseService<Notification> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): NotificationService;
    getBaseAddress(): string;
    getAllReadAddress(): string;
    setAllRead(userId: string): Promise<AxiosHttpResult<string>>;
}
export { DialogueContactService, DialogueDetailService, NotificationService };
