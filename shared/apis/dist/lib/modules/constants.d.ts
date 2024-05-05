import { ConstantDictionary } from '../../declarations';
import { HttpConfig, BaseService } from '../base';

declare class UaaConstantService extends BaseService<Record<string, ConstantDictionary[]>> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): UaaConstantService;
    getBaseAddress(): string;
}
declare class UpmsConstantService extends BaseService<Record<string, ConstantDictionary[]>> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): UpmsConstantService;
    getBaseAddress(): string;
}
export { UaaConstantService, UpmsConstantService };
