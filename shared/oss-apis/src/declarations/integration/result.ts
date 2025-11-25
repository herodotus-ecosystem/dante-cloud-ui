import type { Entity } from '../base';
import type {
  BucketDomain,
  OwnerDomain,
  DeletedObjectDomain,
  S3ErrorDomain,
  ObjectDomain,
  SsekmsDomain,
  ChecksumDomain,
} from './domain';

export interface AbstractResult extends Entity {
  cloudFrontId: string;
  extendedRequestId: string;
  requestId: string;
  statusText: string;
  statusCode: number;
  successful: boolean;
}

export interface AbstractObjectResult extends AbstractResult {
  deleteMarker: boolean;
  versionId: string;
  requestCharged: string;
}

export interface AbstractRequestChargedResult extends AbstractResult {
  requestCharged: string;
  bucketKeyEnabled: boolean;
}

export interface CreateBucketResult extends AbstractResult {
  location: string;
}

export interface DeleteBucketResult extends AbstractResult {}

export interface ListBucketsResult extends AbstractResult {
  buckets: Array<BucketDomain>;
  owner: OwnerDomain;
}

export interface DeleteObjectResult extends AbstractObjectResult {}

export interface DeleteObjectsResult extends AbstractResult {
  deleted: Array<DeletedObjectDomain>;
  requestCharged: string;
  errors: Array<S3ErrorDomain>;
}

export interface ListObjectsV2Result extends AbstractResult {
  isTruncated: boolean;
  contents: Array<ObjectDomain>;
  bucketName: string;
  prefix: string;
  delimiter: string;
  maxKeys: number;
  encodingType: string;
  keyCount: number;
  continuationToken: string;
  nextContinuationToken: string;
  startAfter: string;
  requestCharged: string;
}

export interface UploadPartResult extends AbstractRequestChargedResult {
  serverSideEncryption: string;
  eTag: string;
  checksum: ChecksumDomain;
  ssekms: SsekmsDomain;
}

export interface PutObjectResult extends UploadPartResult {
  expiration: string;
  versionId: string;
}

// ------------------------------ 以下未整理，上面是新整的内容 ------------------------------

export interface BaseDomain extends Entity {
  bucketName: string;
  region?: string;
  objectName: string;
}

export interface ObjectWriteDomain extends BaseDomain {
  etag: string;
  versionId: string;
}

export interface CompleteMultipartUploadDomain extends ObjectWriteDomain {}

// ------------------------------ Business ------------------------------

export interface CreateMultipartUploadBusiness extends Entity {
  uploadId: string;
  uploadUrls: Array<string>;
}
