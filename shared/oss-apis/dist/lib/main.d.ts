import { Axios, HttpConfig } from './base';
import { BucketService, ObjectService } from './integration';
import { OssConstantService, MinioChunkUploadService, MinioBucketSettingService, MinioBucketEncryptionService, MinioBucketPolicyService, MinioBucketTagsService, MinioBucketQuotaService, MinioBucketVersioningService, MinioObjectLockConfigurationService, MinioObjectService, MinioObjectStreamService, MinioObjectSettingService, MinioObjectTagsService, MinioObjectRetentionService, MinioObjectLegalHoldService } from './modules';
declare class OssApiResources {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): OssApiResources;
    getConfig(): HttpConfig;
    bucket(): BucketService;
    object(): ObjectService;
    constant(): OssConstantService;
    minioBucketSetting(): MinioBucketSettingService;
    minioChunk(): MinioChunkUploadService;
    minioBucketEncryption(): MinioBucketEncryptionService;
    minioBucketPolicy(): MinioBucketPolicyService;
    minioBucketTags(): MinioBucketTagsService;
    minioBucketQuota(): MinioBucketQuotaService;
    minioBucketVersioning(): MinioBucketVersioningService;
    minioObjectLock(): MinioObjectLockConfigurationService;
    minioObject(): MinioObjectService;
    minioObjectStream(): MinioObjectStreamService;
    minioObjectSetting(): MinioObjectSettingService;
    minioObjectTags(): MinioObjectTagsService;
    minioObjectRetention(): MinioObjectRetentionService;
    minioObjectLegalHold(): MinioObjectLegalHoldService;
}
declare const createOssApi: (project: string, clientId: string, clientSecret: string, http: Axios) => OssApiResources;
export { createOssApi };
