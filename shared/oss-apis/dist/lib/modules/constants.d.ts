import { HttpConfig, BaseService } from '../base';
import { ConstantDictionary } from '../../declarations';

declare class OssConstantService extends BaseService<Record<string, ConstantDictionary[]>> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OssConstantService;
    getBaseAddress(): string;
}
export { OssConstantService };
