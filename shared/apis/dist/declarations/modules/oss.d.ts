import type { Entity, Conditions } from '../base';
export interface BucketResponse extends Entity {
    name: string;
    creationDate: string;
}
export interface BucketConditions extends Conditions {
}
export type BucketResponseProps = keyof BucketResponse;
export interface BaseRequest {
    extraHeaders?: Map<string, string>;
    extraQueryParams?: Map<string, string>;
}
export interface BucketRequest extends BaseRequest {
    bucketName: string;
    region?: string;
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
export interface MultipartUploadCreateResponse extends Entity {
    uploadId: string;
    chunkUploadUrls: Array<string>;
}
export interface BaseOssMinioDto {
    bucketName: string;
}
export interface BaseBucketDto extends BaseOssMinioDto {
    region?: string;
}
export interface BaseObjectDto extends BaseBucketDto {
    objectName: string;
}
export interface CompleteMultipartUploadDto extends BaseObjectDto {
    uploadId: string;
}
export interface CreateMultipartUploadDto extends BaseObjectDto {
    size: number;
}
