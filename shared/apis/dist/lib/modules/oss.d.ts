import type { AxiosHttpResult, BucketResponse, ListBucketsRequest, BucketExistsRequest, MakeBucketRequest, RemoveBucketRequest, CreateMultipartUploadDto, CompleteMultipartUploadDto, MultipartUploadCreateResponse } from '../../declarations';
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
declare class MultipartUploadService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MultipartUploadService;
    getBaseAddress(): string;
    getCreateMultipartUploadAddress(): string;
    getCompleteMultipartUploadAddress(): string;
    createMultipartUpload(domain: CreateMultipartUploadDto): Promise<AxiosHttpResult<MultipartUploadCreateResponse>>;
    completeMultipartUpload(domain: CompleteMultipartUploadDto): Promise<AxiosHttpResult<string>>;
}
export { BucketService, MultipartUploadService };
