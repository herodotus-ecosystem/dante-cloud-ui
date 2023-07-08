import type { ConstantDictionary } from '../../declarations';
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
declare class OssConstantService extends BaseService<Record<string, ConstantDictionary[]>> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OssConstantService;
    getBaseAddress(): string;
}
export { UaaConstantService, UpmsConstantService, OssConstantService };
