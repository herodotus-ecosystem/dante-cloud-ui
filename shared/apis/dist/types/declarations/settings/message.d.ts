import { AbstractAuditEntity, AbstractEntity, Conditions } from '../base';
import { NotificationCategoryEnum } from '../../enums';
export interface BaseSenderEntity extends AbstractAuditEntity {
    senderId: string;
    senderName: string;
    senderAvatar: string;
}
export interface DialogueEntity extends AbstractEntity {
    dialogueId: string;
    latestNews: string;
}
export interface DialogueContactEntity extends BaseSenderEntity {
    contactId: string;
    receiverId: string;
    dialogue: DialogueEntity;
}
export interface DialogueDetailEntity extends BaseSenderEntity {
    detailId: string;
    receiverId: string;
    receiverName: string;
    receiverAvatar: string;
    content: string;
    dialogueId: string;
}
export interface NotificationEntity extends BaseSenderEntity {
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
export type DialogueProps = keyof DialogueEntity;
export type DialogueContactProps = keyof DialogueContactEntity;
export type DialogueDetailProps = keyof DialogueDetailEntity;
export type NotificationProps = keyof NotificationEntity;
