import type { ConstantDictionary } from '../../declarations';
import { HttpConfig, BaseService } from '../base';
declare class OssConstantService extends BaseService<Record<string, ConstantDictionary[]>> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OssConstantService;
    getBaseAddress(): string;
}
export { OssConstantService };
