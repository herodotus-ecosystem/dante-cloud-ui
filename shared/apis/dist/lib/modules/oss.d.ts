import type { AxiosHttpResult, BucketResponse, ListBucketsRequest, BucketExistsRequest, MakeBucketRequest, RemoveBucketRequest, ObjectWriteResponse, BucketSettingResponse, DeleteBucketEncryptionRequest, DeleteBucketPolicyRequest, DeleteBucketTagsRequest, DeleteObjectLockConfigurationRequest, SetBucketEncryptionRequest, SetBucketPolicyRequest, SetBucketTagsRequest, SetObjectLockConfigurationRequest, MultipartUploadCreateRequest, MultipartUploadCompleteRequest, MultipartUploadCreateResponse } from '../../declarations';
import { HttpConfig, Service } from '../base';
declare class BucketService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketService;
    getBaseAddress(): string;
    private getListAddress;
    private getExistsAddress;
    list(request?: ListBucketsRequest): Promise<AxiosHttpResult<BucketResponse[]>>;
    exists(request: BucketExistsRequest): Promise<AxiosHttpResult<boolean>>;
    make(request: MakeBucketRequest): Promise<AxiosHttpResult<boolean>>;
    remove(request: RemoveBucketRequest): Promise<AxiosHttpResult<boolean>>;
}
declare class BucketSettingService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketSettingService;
    getBaseAddress(): string;
    get(bucketName: string, region?: string): Promise<AxiosHttpResult<BucketSettingResponse>>;
}
declare class MultipartUploadService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MultipartUploadService;
    getBaseAddress(): string;
    getMultipartUploadCreateAddress(): string;
    getMultipartUploadCompleteAddress(): string;
    createMultipartUpload(request: MultipartUploadCreateRequest): Promise<AxiosHttpResult<MultipartUploadCreateResponse>>;
    completeMultipartUpload(request: MultipartUploadCompleteRequest): Promise<AxiosHttpResult<ObjectWriteResponse>>;
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
export { BucketService, BucketSettingService, MultipartUploadService, BucketEncryptionService, BucketPolicyService, BucketTagsService, ObjectLockConfigurationService };
