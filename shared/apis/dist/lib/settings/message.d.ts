import type { DialogueContact, DialogueDetail, Notification } from '../../declarations';
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
}
declare class NotificationService extends BaseService<Notification> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): NotificationService;
    getBaseAddress(): string;
}
export { DialogueContactService, DialogueDetailService, NotificationService };
