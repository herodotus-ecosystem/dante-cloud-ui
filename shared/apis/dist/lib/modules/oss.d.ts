import type { AxiosHttpResult, BucketDomain, ListBucketsRequest, BucketExistsRequest, MakeBucketRequest, RemoveBucketRequest, ObjectWriteDomain, BucketSettingBusiness, DeleteBucketEncryptionRequest, DeleteBucketPolicyRequest, DeleteBucketTagsRequest, DeleteObjectLockConfigurationRequest, SetBucketEncryptionRequest, SetBucketPolicyRequest, SetBucketTagsRequest, SetObjectLockConfigurationRequest, ObjectDomain, ListObjectsRequest, RemoveObjectRequest, RemoveObjectsRequest, DeleteErrorDomain, ObjectStreamDownloadRequest, MultipartUploadCreateRequest, MultipartUploadCompleteRequest, MultipartUploadCreateBusiness } from '../../declarations';
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
export { BucketService, BucketSettingService, MultipartUploadService, BucketEncryptionService, BucketPolicyService, BucketTagsService, ObjectLockConfigurationService, ObjectService, ObjectStreamService };
