import type { Entity, Conditions } from '../base';
export type TagsDo = Record<string, string>;
export interface BaseDomain {
    bucketName: string;
    region?: string;
    objectName: string;
}
export interface GenericDomain extends BaseDomain {
    headers: Record<string, string>;
}
export interface BaseRetentionDomain {
    mode: number;
}
export interface RetentionDomain extends BaseRetentionDomain {
    retainUntilDate: string;
}
export interface ObjectLockConfigurationDomain extends BaseRetentionDomain {
    unit: number;
    validity: number;
}
export interface PrincipalDomain {
    aws: Array<string>;
}
export interface StatementDomain {
    effect: string;
    actions: Array<string>;
    resources: Array<string>;
    principal: PrincipalDomain;
}
export interface PolicyDomain {
    version: string;
    statements: Array<StatementDomain>;
}
export interface VersioningConfigurationDomain {
    status: string;
    mfaDelete: boolean;
}
export interface ObjectWriteDomain extends GenericDomain {
    etag: string;
    versionId: string;
}
export interface BucketSettingBusiness extends Entity {
    sseConfiguration: number;
    policy: number;
    tags: Record<string, string>;
    objectLock: ObjectLockConfigurationDomain;
    quota: number;
    versioning: VersioningConfigurationDomain;
}
export interface ObjectSettingBusiness extends Entity {
    /**
     * 标签
     */
    tags: Record<string, string>;
    /**
     * 保留模式
     */
    retentionMode: number;
    /**
     * 保留截止日期
     */
    retentionRetainUntilDate: string;
    /**
     * 是否合规持有
     */
    legalHold: boolean;
    /**
     * 是否标记删除
     */
    deleteMarker: boolean;
    /**
     * ETag
     */
    etag: string;
    /**
     * 最后修改时间
     */
    lastModified: string;
    /**
     * 对象大小
     */
    size: number;
    /**
     * 用户自定义元数据
     */
    userMetadata: Record<string, string>;
}
export interface ChunkUploadCreateBusiness extends Entity {
    uploadId: string;
    chunkUploadUrls: Array<string>;
}
export interface ObjectWriteConditions extends Conditions {
}
export interface ChunkUploadCreateConditions extends Conditions {
}
export type ObjectWriteDomainProps = keyof ObjectWriteDomain;
export type ChunkUploadCreateBusinessProps = keyof ChunkUploadCreateBusiness;
export interface BaseRequest {
    extraHeaders?: Map<string, string>;
    extraQueryParams?: Map<string, string>;
}
export interface BucketRequest extends BaseRequest {
    /**
     * Bucket names cannot be no less than 3 and no more than 63 characters long
     */
    bucketName: string;
    region?: string;
}
export interface ObjectRequest extends BucketRequest {
    objectName: string;
}
export interface ObjectVersionRequest extends ObjectRequest {
    versionId?: string;
}
export interface ObjectReadRequest extends ObjectVersionRequest {
    /**
     * 服务端加密自定义Key,Minio 默认仅支持 256 位 AES
     */
    customerKey?: string;
}
export interface ObjectConditionalReadArgs extends ObjectReadRequest {
    offset?: number;
    length?: number;
    matchETag?: string;
    notMatchETag?: string;
    modifiedSince?: string;
    unmodifiedSince?: string;
}
export interface DeleteBucketEncryptionRequest extends BucketRequest {
}
export interface DeleteBucketPolicyRequest extends BucketRequest {
}
export interface DeleteBucketTagsRequest extends BucketRequest {
}
export interface DeleteObjectLockConfigurationRequest extends BucketRequest {
}
export interface SetBucketEncryptionRequest extends BucketRequest {
    sseConfiguration: number;
    kmsMasterKeyId?: string;
}
export interface SetBucketPolicyRequest extends BucketRequest {
    type: number;
    config?: PolicyDomain;
}
export interface SetBucketTagsRequest extends BucketRequest {
    tags: Record<string, string>;
}
export interface SetObjectLockConfigurationRequest extends BucketRequest {
    objectLock: ObjectLockConfigurationDomain;
}
export interface SetBucketQuotaRequest extends Entity {
    bucketName: string;
    size: number;
    unit: number;
}
export interface SetBucketVersioningRequest extends BucketRequest {
    config: VersioningConfigurationDomain;
}
export interface DisableObjectLegalHoldRequest extends ObjectVersionRequest {
}
export interface EnableObjectLegalHoldRequest extends ObjectVersionRequest {
}
export interface DeleteObjectTagsRequest extends ObjectVersionRequest {
}
export interface SetObjectTagsRequest extends ObjectVersionRequest {
    tags: Record<string, string>;
}
export interface SetObjectRetentionRequest extends ObjectVersionRequest {
    retention: RetentionDomain;
    bypassGovernanceMode?: boolean;
}
export interface ChunkUploadCompleteRequest extends BaseDomain {
    uploadId: string;
}
export interface ChunkUploadCreateRequest extends BaseDomain {
    size: number;
}
export interface ObjectStreamDownloadRequest extends ObjectRequest {
}
