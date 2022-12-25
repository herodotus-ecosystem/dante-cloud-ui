import type { BaseEntity, Conditions } from '../base';
import { NotificationCategoryEnum } from '../../enums';
export interface BaseSenderEntity extends BaseEntity {
    senderId: string;
    senderName: string;
    senderAvatar: string;
}
export interface Dialogue extends BaseEntity {
    dialogueId: string;
    latestNews: string;
}
export interface DialogueContact extends BaseSenderEntity {
    contactId: string;
    receiverId: string;
    dialogue: Dialogue;
}
export interface DialogueDetail extends BaseSenderEntity {
    detailId: string;
    receiverId: string;
    receiverName: string;
    receiverAvatar: string;
    content: string;
    dialogueId: string;
}
export interface Notification extends BaseSenderEntity {
    queueId: string;
    read: boolean;
    userId: string;
    content: string;
    category: NotificationCategoryEnum;
}
export interface DialogueContactConditions extends Conditions {
    receiverId: string;
}
export interface DialogueDetailConditions extends Conditions {
    dialogueId: string;
}
export interface NotificationConditions extends Conditions {
    userId: string;
    category?: NotificationCategoryEnum;
    read?: boolean;
}
