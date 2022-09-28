import type { Entity, Conditions } from '../base';

export interface Bucket extends Entity {
	name: string;
	creationDate: string;
}

export interface MultipartUploadCreateResponse extends Entity {
	uploadId: string;
	chunkUploadUrls: Array<string>;
}

export interface BaseMinioArgument {
	extraHeaders?: Map<string, string>;
	extraQueryParams?: Map<string, string>;
}

export interface BucketArgument extends BaseMinioArgument {
	bucketName: string;
	region?: string;
}

export interface RemoveBucketArgument extends BucketArgument {}

export interface BaseMinioDto {
	bucketName: string;
}

export interface BaseBucketDto extends BaseMinioDto {
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

export interface BucketConditions extends Conditions {}
