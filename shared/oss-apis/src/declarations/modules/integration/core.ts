export interface BaseOssArguments {
  extraHeaders?: Map<string, string>;
  extraQueryParams?: Map<string, string>;
}

export interface BaseBucketArguments extends BaseOssArguments {
  bucketName: string;
  region?: string;
  key?: string;
}

export interface CreateBucketArguments extends BaseBucketArguments {
  objectLock?: boolean;
}

export interface DeleteBucketArguments extends BaseBucketArguments {}
