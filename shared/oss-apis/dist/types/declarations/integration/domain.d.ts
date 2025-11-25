import { Entity, Conditions } from '../base';
export interface DeleteDomain extends Entity {
    objectName: string;
    versionId?: string;
}
export interface BucketDomain extends Entity {
    /**
     * 存储桶名称
     */
    bucketName: string;
    /**
     * 存储桶创建时间
     */
    creationDate: Date;
}
export interface OwnerDomain extends Entity {
    /**
     * 所有者 ID
     */
    id: string;
    /**
     * 所有者显示名称
     */
    displayName: string;
}
export interface DeletedObjectDomain extends DeleteDomain {
    deleteMarker?: boolean;
    deleteMarkerVersionId?: string;
}
export interface S3ErrorDomain extends DeleteDomain {
    code: string;
    message: string;
}
export interface RestoreStatusDomain extends Entity {
    isRestoreInProgress: boolean;
    restoreExpiryDate: Date;
}
export interface ObjectDomain extends Entity {
    objectName: string;
    lastModified: Date;
    eTag: string;
    checksumAlgorithm: Array<string>;
    size: number;
    storageClass: string;
    owner: OwnerDomain;
    restoreStatus: RestoreStatusDomain;
    isDir: boolean;
}
export interface SseCustomerDomain extends Entity {
    sseCustomerAlgorithm: string;
    sseCustomerKey: string;
    sseCustomerKeyMD5: string;
}
export interface SsekmsDomain extends SseCustomerDomain {
    ssekmsKeyId: string;
    ssekmsEncryptionContext: string;
}
export interface ChecksumDomain extends Entity {
    checksumCRC32: string;
    checksumCRC32C: string;
    checksumSHA1: string;
    checksumSHA256: string;
}
export type BucketDomainProps = keyof BucketDomain;
export type ObjectDomainProps = keyof ObjectDomain;
export interface BucketDomainConditions extends Conditions {
}
export interface ObjectDomainConditions extends Conditions {
}
