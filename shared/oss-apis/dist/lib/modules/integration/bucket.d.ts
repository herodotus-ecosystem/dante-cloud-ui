import type { AxiosHttpResult, BucketEntity, CreateBucketArguments, DeleteBucketArguments } from '../../../declarations';
import { Service, HttpConfig } from '../../base';
declare class BucketService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketService;
    getBaseAddress(): string;
    private getListAddress;
    private getExistsAddress;
    doesBucketExist(bucketName: string): Promise<AxiosHttpResult<boolean>>;
    listBuckets(): Promise<AxiosHttpResult<Array<BucketEntity>>>;
    createBucket(request: CreateBucketArguments): Promise<AxiosHttpResult<boolean>>;
    deleteBucket(request: DeleteBucketArguments): Promise<AxiosHttpResult<boolean>>;
}
export { BucketService };
