import type { Entity, Conditions } from '../base';

export type TagsDo = Record<string, string>;
export interface RuleDo {
  retentionMode: number;
  durationMode: number;
  duration: number;
}
export interface ObjectLockConfigurationDo {
  objectLockEnabled: string;
  rule: RuleDo;
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

export interface MultipartUploadCreateResponse extends Entity {
  uploadId: string;
  chunkUploadUrls: Array<string>;
}

export interface BucketConditions extends Conditions {}
export interface ObjectWriteConditions extends Conditions {}
export interface MultipartUploadCreateConditions extends Conditions {}

export type BucketResponseProps = keyof BucketResponse;
export type ObjectWriteProps = keyof ObjectWriteResponse;
export type MultipartUploadCreateProps = keyof ObjectWriteResponse;

export interface BaseRequest {
  extraHeaders?: Map<string, string>;
  extraQueryParams?: Map<string, string>;
}

export interface BucketRequest extends BaseRequest {
  bucketName: string;
  region?: string;
}

export interface ListBucketsRequest extends BaseRequest {}

export interface MakeBucketRequest extends BucketRequest {
  objectLock: boolean;
}

export interface BucketExistsRequest extends BucketRequest {}

export interface RemoveBucketRequest extends BucketRequest {}

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
