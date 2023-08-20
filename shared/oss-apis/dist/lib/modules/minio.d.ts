import type { AxiosHttpResult, BucketSettingBusiness, DeleteBucketEncryptionRequest, DeleteBucketPolicyRequest, DeleteBucketTagsRequest, DeleteObjectLockConfigurationRequest, SetBucketEncryptionRequest, SetBucketPolicyRequest, SetBucketTagsRequest, SetObjectLockConfigurationRequest, ObjectSettingBusiness, EnableObjectLegalHoldRequest, DisableObjectLegalHoldRequest, DeleteObjectTagsRequest, SetObjectTagsRequest, SetObjectRetentionRequest, SetBucketQuotaRequest, SetBucketVersioningRequest } from '../../declarations';
import { HttpConfig, Service } from '../base';
declare class MinioBucketSettingService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioBucketSettingService;
    getBaseAddress(): string;
    get(bucketName: string, region?: string): Promise<AxiosHttpResult<BucketSettingBusiness>>;
}
declare class MinioBucketEncryptionService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioBucketEncryptionService;
    getBaseAddress(): string;
    set(request: SetBucketEncryptionRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteBucketEncryptionRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class MinioBucketPolicyService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioBucketPolicyService;
    getBaseAddress(): string;
    set(request: SetBucketPolicyRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteBucketPolicyRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class MinioBucketTagsService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioBucketTagsService;
    getBaseAddress(): string;
    set(request: SetBucketTagsRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteBucketTagsRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class MinioBucketQuotaService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioBucketQuotaService;
    getBaseAddress(): string;
    set(request: SetBucketQuotaRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class MinioBucketVersioningService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioBucketVersioningService;
    getBaseAddress(): string;
    set(request: SetBucketVersioningRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class MinioObjectLockConfigurationService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioObjectLockConfigurationService;
    getBaseAddress(): string;
    set(request: SetObjectLockConfigurationRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteObjectLockConfigurationRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class MinioObjectSettingService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioObjectSettingService;
    getBaseAddress(): string;
    get(bucketName: string, objectName: string): Promise<AxiosHttpResult<ObjectSettingBusiness>>;
}
declare class MinioObjectTagsService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioObjectTagsService;
    getBaseAddress(): string;
    set(request: SetObjectTagsRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteObjectTagsRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class MinioObjectRetentionService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioObjectRetentionService;
    getBaseAddress(): string;
    set(request: SetObjectRetentionRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class MinioObjectLegalHoldService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MinioObjectLegalHoldService;
    getBaseAddress(): string;
    getEnableAddress(): string;
    getDisableAddress(): string;
    enable(request: EnableObjectLegalHoldRequest): Promise<AxiosHttpResult<boolean>>;
    disable(request: DisableObjectLegalHoldRequest): Promise<AxiosHttpResult<boolean>>;
}
export { MinioBucketSettingService, MinioBucketEncryptionService, MinioBucketPolicyService, MinioBucketTagsService, MinioBucketQuotaService, MinioBucketVersioningService, MinioObjectLockConfigurationService, MinioObjectSettingService, MinioObjectTagsService, MinioObjectRetentionService, MinioObjectLegalHoldService };
