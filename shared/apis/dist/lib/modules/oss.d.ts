import type { BucketEntity, AxiosHttpResult, RemoveBucketArgument, CreateMultipartUploadDto, CompleteMultipartUploadDto, MultipartUploadCreateResponse } from '../../declarations';
import { HttpConfig, BaseService, Service } from '../base';
declare class BucketService extends BaseService<BucketEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketService;
    getBaseAddress(): string;
    remove(dto: RemoveBucketArgument): Promise<AxiosHttpResult<string>>;
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
