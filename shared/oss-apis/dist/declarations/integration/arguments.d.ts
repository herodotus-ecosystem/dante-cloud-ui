export interface BaseArguments {
    extraHeaders?: Map<string, string>;
    extraQueryParams?: Map<string, string>;
}
export interface BucketArguments extends BaseArguments {
    bucketName: string;
    region?: string;
    key?: string;
}
export interface CreateBucketArguments extends BucketArguments {
    objectLock?: boolean;
}
export interface DeleteBucketArguments extends BucketArguments {
}
