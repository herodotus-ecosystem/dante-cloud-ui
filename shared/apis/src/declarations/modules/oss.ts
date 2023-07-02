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

export interface RetentionDomain extends Entity {
  retentionMode: number;
  retainUntilDate: string;
}

export interface BucketDomain extends Entity {
  name: string;
  creationDate: string;
}

export interface DeleteErrorDomain extends Entity {
  code: string;
  message: string;
  bucketName: string;
  objectName: string;
  resource: string;
  requestId: string;
  hostId: string;
}

export interface DeleteObjectDomain extends Entity {
  name: string;
  versionId?: string;
}

export interface ObjectDomain extends Entity {
  etag: string;
  objectName: string;
  lastModified: string;
  ownerId: string;
  ownerDisplayName: string;
  size: number;
  storageClass: string;
  latest: boolean;
  userMetadata: Record<string, string>;
  dir: boolean;
}

export interface ObjectLockConfigurationDomain {
  retentionMode: number;
  durationMode: number;
  duration: number;
}

export interface VersioningConfigurationDomain {
  status: number;
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

export interface BucketConditions extends Conditions {}
export interface ObjectWriteConditions extends Conditions {}
export interface ChunkUploadCreateConditions extends Conditions {}
export interface ObjectConditions extends Conditions {}

export type BucketDomainProps = keyof BucketDomain;
export type ObjectDomainProps = keyof ObjectDomain;
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

export interface ListBucketsRequest extends BaseRequest {}
export interface BucketExistsRequest extends BucketRequest {}
export interface MakeBucketRequest extends BucketRequest {
  objectLock: boolean;
}
export interface RemoveBucketRequest extends BucketRequest {}
export interface DeleteBucketEncryptionRequest extends BucketRequest {}
export interface DeleteBucketPolicyRequest extends BucketRequest {}
export interface DeleteBucketTagsRequest extends BucketRequest {}
export interface DeleteObjectLockConfigurationRequest extends BucketRequest {}
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

export interface DisableObjectLegalHoldRequest extends ObjectVersionRequest {}
export interface EnableObjectLegalHoldRequest extends ObjectVersionRequest {}
export interface DeleteObjectTagsRequest extends ObjectVersionRequest {}
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
export interface RemoveObjectRequest extends ObjectVersionRequest {
  bypassGovernanceMode?: boolean;
}
export interface RemoveObjectsRequest extends BucketRequest {
  bypassGovernanceMode?: boolean;
  objects: Array<DeleteObjectDomain>;
}

export interface ObjectStreamDownloadRequest extends ObjectRequest {}
