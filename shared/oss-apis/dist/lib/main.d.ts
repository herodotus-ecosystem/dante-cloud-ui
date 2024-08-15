import { Axios, HttpConfig } from './base';
import { BucketService, ObjectService, ObjectStreamService, MultipartUploadService } from './integration';
import { OssConstantService, MinioBucketSettingService, MinioBucketEncryptionService, MinioBucketPolicyService, MinioBucketTagsService, MinioBucketQuotaService, MinioBucketVersioningService, MinioObjectLockConfigurationService, MinioObjectSettingService, MinioObjectTagsService, MinioObjectRetentionService, MinioObjectLegalHoldService } from './modules';
declare class OssApiResources {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): OssApiResources;
    getConfig(): HttpConfig;
    bucket(): BucketService;
    object(): ObjectService;
    objectStream(): ObjectStreamService;
    multipartUpload(): MultipartUploadService;
    constant(): OssConstantService;
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
declare const createOssApi: (project: string, clientId: string, clientSecret: string, http: Axios) => OssApiResources;
export { createOssApi };
