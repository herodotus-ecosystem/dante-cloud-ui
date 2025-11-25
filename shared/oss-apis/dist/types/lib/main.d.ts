import { HttpClientOptions } from '../declarations';
import { Axios, HttpConfig } from './base';
import { BucketService, ObjectService, MultipartUploadService } from './integration';
import { MinioBucketSettingService, MinioBucketEncryptionService, MinioBucketPolicyService, MinioBucketTagsService, MinioBucketQuotaService, MinioBucketVersioningService, MinioObjectLockConfigurationService, MinioObjectSettingService, MinioObjectTagsService, MinioObjectRetentionService, MinioObjectLegalHoldService } from './modules';
export declare class OssApiResources {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): OssApiResources;
    getConfig(): HttpConfig;
    bucket(): BucketService;
    object(): ObjectService;
    multipartUpload(): MultipartUploadService;
    minioBucketSetting(): MinioBucketSettingService;
    minioBucketEncryption(): MinioBucketEncryptionService;
    minioBucketPolicy(): MinioBucketPolicyService;
    minioBucketTags(): MinioBucketTagsService;
    minioBucketQuota(): MinioBucketQuotaService;
    minioBucketVersioning(): MinioBucketVersioningService;
    minioObjectLock(): MinioObjectLockConfigurationService;
    minioObjectSetting(): MinioObjectSettingService;
    minioObjectTags(): MinioObjectTagsService;
    minioObjectRetention(): MinioObjectRetentionService;
    minioObjectLegalHold(): MinioObjectLegalHoldService;
}
declare const createOssApi: (http: Axios, options: HttpClientOptions) => OssApiResources;
export { createOssApi };
