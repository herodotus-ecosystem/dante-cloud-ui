import type { Entity } from '../base';
import type { DeleteDomain, SseCustomerDomain } from './domain';

// ------------------------------ Argument ------------------------------

export interface AbstractArgument extends Entity {}

export interface AbstractBucketArgument extends AbstractArgument {
  bucketName: string;
}

export interface AbstractExpectedBucketOwnerArgument extends AbstractBucketArgument {
  expectedBucketOwner?: string;
}

export interface AbstractObjectRequestPayerArgument extends AbstractExpectedBucketOwnerArgument {
  requestPayer?: string;
}

export interface AbstractObjectArgument extends AbstractObjectRequestPayerArgument {
  objectName: string;
}

export interface AbstractObjectVersionArgument extends AbstractObjectArgument {
  versionId?: string;
}

export interface AbstractGetObjectArgument extends AbstractObjectVersionArgument {
  ifMatch?: string;
  ifModifiedSince?: Date;
  ifNoneMatch?: string;
  ifUnmodifiedSince?: Date;
  range?: string;
  responseCacheControl?: string;
  responseContentDisposition?: string;
  responseContentEncoding?: string;
  responseContentLanguage?: string;
  responseContentType?: string;
  responseExpires?: Date;
  sseCustomer?: SseCustomerDomain;
  partNumber?: number;
  checksumMode?: string;
}

export interface CreateBucketArgument extends AbstractBucketArgument {
  acl?: string;
  grantFullControl?: string;
  grantRead?: string;
  grantReadACP?: string;
  grantWrite?: string;
  grantWriteACP?: string;
  objectLockEnabledForBucket?: boolean;
  objectOwnership?: string;
}

export interface DeleteBucketArgument extends AbstractExpectedBucketOwnerArgument {}

export interface ListBucketsArgument extends AbstractArgument {}

export interface DeleteObjectArgument extends AbstractObjectVersionArgument {
  mfa?: string;
  bypassGovernanceRetention?: boolean;
}

export interface DeleteObjectsArgument extends AbstractObjectRequestPayerArgument {
  delete: Array<DeleteDomain>;
  quiet?: boolean;
  mfa?: string;
  bypassGovernanceRetention?: boolean;
  checksumAlgorithm?: string;
}

export interface ListObjectsV2Argument extends AbstractObjectRequestPayerArgument {
  delimiter?: string;
  encodingType?: string;
  maxKeys?: number;
  prefix?: string;
  continuationToken?: string;
  fetchOwner?: boolean;
  startAfter?: string;
}

export interface GetObjectArgument extends AbstractGetObjectArgument {}

// ------------------------------ 以下未整理，上面是新整的内容 ------------------------------

export interface BaseArguments extends Entity {
  extraHeaders?: Map<string, string>;
  extraQueryParams?: Map<string, string>;
}

export interface BucketArguments extends BaseArguments {
  bucketName: string;
  region?: string;
}

export interface ObjectArguments extends BucketArguments {
  objectName: string;
}

export interface BasePartArguments extends ObjectArguments {
  uploadId: string;
}

// ------------------------------ Special ------------------------------

export interface CreateMultipartUploadArguments extends ObjectArguments {
  partNumber: number;
}
export interface CompleteMultipartUploadArguments extends BasePartArguments {}
