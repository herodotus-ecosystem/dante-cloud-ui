import type { Entity, Conditions } from '../base';
export type TagsDo = Record<string, string>;
export interface ObjectLockConfigurationDo {
    retentionMode: number;
    durationMode: number;
    duration: number;
}
export interface PrincipalDo {
    aws: Array<string>;
}
export interface StatementDo {
    effect: string;
    actions: Array<string>;
    resources: Array<string>;
    principal: PrincipalDo;
}
export interface PolicyDo {
    version: string;
    statements: Array<StatementDo>;
}
export interface DeleteObjectDo {
}
export interface BucketResponse extends Entity {
    name: string;
    creationDate: string;
}
export interface BucketSettingResponse extends Entity {
    serverSideEncryption: number;
    policy: number;
    tags: TagsDo;
    objectLock: ObjectLockConfigurationDo;
}
export interface MultipartUploadCreateResponse extends Entity {
    uploadId: string;
    chunkUploadUrls: Array<string>;
}
export interface GenericResponse extends Entity {
    headers: Map<string, string>;
    bucket: string;
    region: string;
    object: string;
}
export interface ObjectWriteResponse extends GenericResponse {
    etag: string;
    versionId: string;
}
export interface OwnerResponse extends Entity {
    id: string;
    displayName: string;
}
export interface ObjectResponse extends Entity {
    etag: string;
    objectName: string;
    lastModified: string;
    owner: OwnerResponse;
    size: number;
    storageClass: string;
    latest: boolean;
    userMetadata: Record<string, string>;
    dir: boolean;
}
export interface ErrorResponse extends Entity {
    code: string;
    message: string;
    bucketName: string;
    objectName: string;
    resource: string;
    requestId: string;
    hostId: string;
}
export interface ObjectDeleteResponse extends ErrorResponse {
}
export interface BucketConditions extends Conditions {
}
export interface ObjectWriteConditions extends Conditions {
}
export interface MultipartUploadCreateConditions extends Conditions {
}
export interface ObjectConditions extends Conditions {
}
export type BucketResponseProps = keyof BucketResponse;
export type ObjectWriteProps = keyof ObjectWriteResponse;
export type MultipartUploadCreateProps = keyof ObjectWriteResponse;
export type ObjectResponseProps = keyof ObjectResponse;
export interface BaseRequest {
    extraHeaders?: Map<string, string>;
    extraQueryParams?: Map<string, string>;
}
export interface BucketRequest extends BaseRequest {
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
export interface ListBucketsRequest extends BaseRequest {
}
export interface MakeBucketRequest extends BucketRequest {
    objectLock: boolean;
}
export interface BucketExistsRequest extends BucketRequest {
}
export interface RemoveBucketRequest extends BucketRequest {
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
    serverSideEncryption: number;
    kmsMasterKeyId?: string;
}
export interface SetBucketPolicyRequest extends BucketRequest {
    type: number;
    config?: PolicyDo;
}
export interface SetBucketTagsRequest extends BucketRequest {
    tags: TagsDo;
}
export interface SetObjectLockConfigurationRequest extends BucketRequest {
    objectLock: ObjectLockConfigurationDo;
}
export interface BaseMultipartUpdatedRequest extends BaseRequest {
    bucketName: string;
    objectName: string;
    region?: string;
}
export interface MultipartUploadCompleteRequest extends BaseMultipartUpdatedRequest {
    uploadId: string;
}
export interface MultipartUploadCreateRequest extends BaseMultipartUpdatedRequest {
    size: number;
}
export interface ListObjectsRequest extends BucketRequest {
    /**
     * 分隔符。如果recursive为true，那么默认值为'', 否则默认值为'/'
     */
    delimiter?: string;
    /**
     * 使用UrlEncoding, 默认开启，默认值为 true
     */
    useUrlEncodingType?: boolean;
    /**
     * 关键字
     */
    keyMarker?: string;
    /**
     * 最大关键字数量。关键字数量必须大于1，同时小于等于1000, 默认值 1000
     */
    maxKeys?: number;
    /**
     * 前缀
     */
    prefix?: string;
    /**
     * 是否递归，当前默认设置为 false
     */
    recursive?: boolean;
    /**
     * 是否使用V1 版本API。当前默认设置为 true
     */
    useApiVersion1?: boolean;
    /**
     * 是否包含版本信息。当前默认设置为 false。
     */
    includeVersions?: boolean;
    /**
     * 持续集成Token。仅当使用 V2 版本 API 时需要，即 useApiVersion1 == false
     */
    continuationToken?: string;
    /**
     * 获取Owner信息.仅当使用 V2 版本 API 时需要，即 useApiVersion1 == false
     */
    fetchOwner?: boolean;
    /**
     * 包含用户扩展自定义信息。仅当使用 V2 版本 API 时需要，即 useApiVersion1 == false
     */
    includeUserMetadata?: boolean;
    /**
     * 版本ID标记。仅在GetObjectVersions情况下使用
     */
    versionIdMarker?: string;
}
export interface DeleteObjectRequest extends ObjectVersionRequest {
    bypassGovernanceMode?: boolean;
}
export interface DeleteObjectsRequest extends BucketRequest {
    bypassGovernanceMode?: boolean;
    objects: Array<DeleteObjectDo>;
}
export interface DownloadObjectRequest extends ObjectReadRequest {
    /**
     * 文件名
     */
    filename: string;
    /**
     * 是否覆盖
     */
    overwrite?: boolean;
}
