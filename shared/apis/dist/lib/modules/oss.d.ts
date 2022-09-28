import type { Bucket, AxiosHttpResult, RemoveBucketArgument, CreateMultipartUploadDto, CompleteMultipartUploadDto, MultipartUploadCreateResponse } from '../../declarations';
import { ApiConfig, BaseService, Service } from '../base';
declare class BucketService extends BaseService<Bucket> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): BucketService;
    getBaseAddress(): string;
    remove(dto: RemoveBucketArgument): Promise<AxiosHttpResult<string>>;
}
declare class MultipartUploadService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): MultipartUploadService;
    getBaseAddress(): string;
    getCreateMultipartUploadAddress(): string;
    getCompleteMultipartUploadAddress(): string;
    createMultipartUpload(domain: CreateMultipartUploadDto): Promise<AxiosHttpResult<MultipartUploadCreateResponse>>;
    completeMultipartUpload(domain: CompleteMultipartUploadDto): Promise<AxiosHttpResult<string>>;
}
export { BucketService, MultipartUploadService };
