import type { AxiosHttpResult, BucketDomain, ListBucketsRequest, BucketExistsRequest, MakeBucketRequest, RemoveBucketRequest, ObjectWriteDomain, BucketSettingBusiness, DeleteBucketEncryptionRequest, DeleteBucketPolicyRequest, DeleteBucketTagsRequest, DeleteObjectLockConfigurationRequest, SetBucketEncryptionRequest, SetBucketPolicyRequest, SetBucketTagsRequest, SetObjectLockConfigurationRequest, ObjectDomain, ListObjectsRequest, RemoveObjectRequest, RemoveObjectsRequest, DeleteErrorDomain, ObjectStreamDownloadRequest, ObjectSettingBusiness, EnableObjectLegalHoldRequest, DisableObjectLegalHoldRequest, DeleteObjectTagsRequest, SetObjectTagsRequest, SetObjectRetentionRequest, MultipartUploadCreateRequest, MultipartUploadCompleteRequest, MultipartUploadCreateBusiness } from '../../declarations';
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
declare class MultipartUploadService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MultipartUploadService;
    getBaseAddress(): string;
    getMultipartUploadCreateAddress(): string;
    getMultipartUploadCompleteAddress(): string;
    createMultipartUpload(request: MultipartUploadCreateRequest): Promise<AxiosHttpResult<MultipartUploadCreateBusiness>>;
    completeMultipartUpload(request: MultipartUploadCompleteRequest): Promise<AxiosHttpResult<ObjectWriteDomain>>;
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
    download(request: ObjectStreamDownloadRequest): Promise<AxiosHttpResult<Blob>>;
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
export { BucketService, BucketSettingService, MultipartUploadService, BucketEncryptionService, BucketPolicyService, BucketTagsService, ObjectLockConfigurationService, ObjectService, ObjectStreamService, ObjectSettingService, ObjectTagsService, ObjectRetentionService, ObjectLegalHoldService };
