import type { AxiosHttpResult, BucketEntity } from '../../../declarations';
import { Service, HttpConfig } from '../../base';
declare class BucketService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketService;
    getBaseAddress(): string;
    private getListAddress;
    private getExistsAddress;
    getExistsPath(bucketName: string): string;
    doesBucketExist(bucketName: string): Promise<AxiosHttpResult<boolean>>;
    listBuckets(): Promise<AxiosHttpResult<Array<BucketEntity>>>;
}
export { BucketService };
