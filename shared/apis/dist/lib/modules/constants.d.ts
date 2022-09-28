import type { Dictionary, ConstantDictionary } from '../../declarations';
import { ApiConfig, BaseService } from '../base';
declare class UaaConstantService extends BaseService<Dictionary<ConstantDictionary[]>> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): UaaConstantService;
    getBaseAddress(): string;
}
declare class UpmsConstantService extends BaseService<Dictionary<ConstantDictionary[]>> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): UpmsConstantService;
    getBaseAddress(): string;
}
export { UaaConstantService, UpmsConstantService };
