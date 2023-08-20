import type { Entity, Conditions } from '../base';
import type { DeletedObjectArguments, ListObjectsArguments, ListObjectsV2Arguments } from './arguments';
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
export interface BaseDomain extends Entity {
    bucketName: string;
    region?: string;
    objectName: string;
}
export interface BucketDomain extends Entity {
    /**
     * 存储桶名称
     */
    bucketName: string;
    /**
     * 存储桶所有者信息
     */
    owner?: OwnerDomain;
    /**
     * 存储桶创建时间
     */
    creationDate: Date;
}
export interface ObjectDomain extends Entity {
    /**
     * 存储桶名称
     */
    bucketName: string;
    /**
     * 存储此对象的密钥
     */
    objectName: string;
    /**
     * ETag。此对象内容的十六进制编码MD5哈希
     */
    eTag: string;
    /**
     * 此对象的大小，以字节为单位
     */
    size: number;
    /**
     * 对象最后一次被修改的日期
     */
    lastModified: Date;
    /**
     * 存储此对象的存储类
     */
    storageClass: string;
    /**
     * 如果请求者没有查看对象所有权信息的权限，则此对象的所有者可以为null
     */
    owner: OwnerDomain;
    /**
     * 是否为文件夹
     */
    isDir: boolean;
}
export type BucketDomainProps = keyof BucketDomain;
export type ObjectDomainProps = keyof ObjectDomain;
export interface BucketDomainConditions extends Conditions {
}
export interface ObjectDomainConditions extends Conditions {
}
export interface ObjectWriteDomain extends BaseDomain {
    etag: string;
    versionId: string;
}
export interface ObjectListingDomain extends ListObjectsArguments {
    summaries: Array<ObjectDomain>;
    nextMarker: string;
    isTruncated: boolean;
}
export interface ObjectListingV2Domain extends ListObjectsV2Arguments {
    summaries: Array<ObjectDomain>;
    isTruncated: boolean;
    keyCount: number;
    nextContinuationToken: string;
}
export interface DeleteObjectDomain extends DeletedObjectArguments {
}
export interface DeleteObjectsDomain extends Entity {
    deletedObjects: Array<DeleteObjectDomain>;
}
export interface PutObjectDomain extends ObjectWriteDomain {
}
export interface CompleteMultipartUploadDomain extends ObjectWriteDomain {
}
export interface CreateMultipartUploadBusiness extends Entity {
    uploadId: string;
    uploadUrls: Array<string>;
}
