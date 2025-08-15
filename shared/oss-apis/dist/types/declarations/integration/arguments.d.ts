import { Entity } from '../base';
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
export interface ObjectVersionArguments extends ObjectArguments {
    versionId?: string;
}
export interface CreateBucketArguments extends BucketArguments {
    objectLock?: boolean;
}
export interface DeleteBucketArguments extends BucketArguments {
}
export interface ListObjectsArguments extends BucketArguments {
    prefix?: string;
    marker?: string;
    delimiter?: string;
    maxKeys?: number;
    encodingType?: string;
    recursive?: boolean;
}
export interface ListObjectsV2Arguments extends ListObjectsArguments {
    continuationToken?: string;
    fetchOwner?: boolean;
    versionIdMarker?: string;
}
export interface DeletedObjectArguments extends Entity {
    objectName: string;
    versionId?: string;
}
export interface DeleteObjectArguments extends ObjectVersionArguments {
    bypassGovernanceMode?: boolean;
}
export interface DeleteObjectsArguments extends BucketArguments {
    bypassGovernanceMode?: boolean;
    objects: Array<DeletedObjectArguments>;
}
export interface ObjectStreamDownloadArguments extends ObjectArguments {
}
export interface CreateMultipartUploadArguments extends ObjectArguments {
    partNumber: number;
}
export interface CompleteMultipartUploadArguments extends BasePartArguments {
}
