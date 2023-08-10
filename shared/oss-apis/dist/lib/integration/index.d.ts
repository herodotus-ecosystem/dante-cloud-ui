import type { AxiosHttpResult, BucketDomain, CreateBucketArguments, DeleteBucketArguments, ListObjectsArguments, ObjectListingDomain } from '../../declarations';
import { Service, HttpConfig } from '../base';
declare class BucketService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketService;
    getBaseAddress(): string;
    private getListAddress;
    private getExistsAddress;
    doesBucketExist(bucketName: string): Promise<AxiosHttpResult<boolean>>;
    listBuckets(): Promise<AxiosHttpResult<Array<BucketDomain>>>;
    createBucket(request: CreateBucketArguments): Promise<AxiosHttpResult<boolean>>;
    deleteBucket(request: DeleteBucketArguments): Promise<AxiosHttpResult<boolean>>;
}
declare class ObjectService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectService;
    getBaseAddress(): string;
    private getListAddress;
    listObjects(request: ListObjectsArguments): Promise<AxiosHttpResult<ObjectListingDomain>>;
}
export { BucketService, ObjectService };
