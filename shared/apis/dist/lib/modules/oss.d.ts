import type { AxiosHttpResult, BucketDomain, ListBucketsRequest, BucketExistsRequest, MakeBucketRequest, RemoveBucketRequest, ObjectWriteDomain, BucketSettingBusiness, DeleteBucketEncryptionRequest, DeleteBucketPolicyRequest, DeleteBucketTagsRequest, DeleteObjectLockConfigurationRequest, SetBucketEncryptionRequest, SetBucketPolicyRequest, SetBucketTagsRequest, SetObjectLockConfigurationRequest, ObjectDomain, ListObjectsRequest, RemoveObjectRequest, RemoveObjectsRequest, DeleteErrorDomain, ObjectStreamDownloadRequest, ObjectSettingBusiness, EnableObjectLegalHoldRequest, DisableObjectLegalHoldRequest, DeleteObjectTagsRequest, SetObjectTagsRequest, SetObjectRetentionRequest, ChunkUploadCreateRequest, ChunkUploadCompleteRequest, ChunkUploadCreateBusiness, SetBucketQuotaRequest, SetBucketVersioningRequest } from '../../declarations';
import { HttpConfig, Service } from '../base';
declare class BucketService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketService;
    getBaseAddress(): string;
    private getListAddress;
    private getExistsAddress;
    list(request?: ListBucketsRequest): Promise<AxiosHttpResult<Array<BucketDomain>>>;
    exists(request: BucketExistsRequest): Promise<AxiosHttpResult<boolean>>;
    make(request: MakeBucketRequest): Promise<AxiosHttpResult<boolean>>;
    remove(request: RemoveBucketRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class BucketSettingService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketSettingService;
    getBaseAddress(): string;
    get(bucketName: string, region?: string): Promise<AxiosHttpResult<BucketSettingBusiness>>;
}
declare class ChunkUploadService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ChunkUploadService;
    getBaseAddress(): string;
    getChunkUploadCreateAddress(): string;
    getChunkUploadCompleteAddress(): string;
    createChunkUpload(request: ChunkUploadCreateRequest): Promise<AxiosHttpResult<ChunkUploadCreateBusiness>>;
    completeChunkUpload(request: ChunkUploadCompleteRequest): Promise<AxiosHttpResult<ObjectWriteDomain>>;
}
declare class BucketEncryptionService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketEncryptionService;
    getBaseAddress(): string;
    set(request: SetBucketEncryptionRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteBucketEncryptionRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class BucketPolicyService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketPolicyService;
    getBaseAddress(): string;
    set(request: SetBucketPolicyRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteBucketPolicyRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class BucketTagsService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketTagsService;
    getBaseAddress(): string;
    set(request: SetBucketTagsRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteBucketTagsRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class BucketQuotaService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketQuotaService;
    getBaseAddress(): string;
    set(request: SetBucketQuotaRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class BucketVersioningService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketVersioningService;
    getBaseAddress(): string;
    set(request: SetBucketVersioningRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class ObjectLockConfigurationService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectLockConfigurationService;
    getBaseAddress(): string;
    set(request: SetObjectLockConfigurationRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteObjectLockConfigurationRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class ObjectService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectService;
    getBaseAddress(): string;
    private getListAddress;
    private getMultiDeleteAddress;
    list(request: ListObjectsRequest): Promise<AxiosHttpResult<ObjectDomain[]>>;
    delete(request: RemoveObjectRequest): Promise<AxiosHttpResult<boolean>>;
    batchDelete(request: RemoveObjectsRequest): Promise<AxiosHttpResult<Array<DeleteErrorDomain>>>;
}
declare class ObjectStreamService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectStreamService;
    getBaseAddress(): string;
    getDownloadAddress(): string;
    getUploadAddress(): string;
    download(request: ObjectStreamDownloadRequest): Promise<AxiosHttpResult<Blob>>;
    upload(bucketName: string, file: File): Promise<AxiosHttpResult<ObjectWriteDomain>>;
}
declare class ObjectSettingService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectSettingService;
    getBaseAddress(): string;
    get(bucketName: string, objectName: string): Promise<AxiosHttpResult<ObjectSettingBusiness>>;
}
declare class ObjectTagsService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectTagsService;
    getBaseAddress(): string;
    set(request: SetObjectTagsRequest): Promise<AxiosHttpResult<boolean>>;
    delete(request: DeleteObjectTagsRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class ObjectRetentionService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectRetentionService;
    getBaseAddress(): string;
    set(request: SetObjectRetentionRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class ObjectLegalHoldService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectLegalHoldService;
    getBaseAddress(): string;
    getEnableAddress(): string;
    getDisableAddress(): string;
    enable(request: EnableObjectLegalHoldRequest): Promise<AxiosHttpResult<boolean>>;
    disable(request: DisableObjectLegalHoldRequest): Promise<AxiosHttpResult<boolean>>;
}
export { BucketService, BucketSettingService, BucketEncryptionService, BucketPolicyService, BucketTagsService, BucketQuotaService, BucketVersioningService, ChunkUploadService, ObjectLockConfigurationService, ObjectService, ObjectStreamService, ObjectSettingService, ObjectTagsService, ObjectRetentionService, ObjectLegalHoldService };
