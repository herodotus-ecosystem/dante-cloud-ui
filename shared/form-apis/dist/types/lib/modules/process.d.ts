import { DynamicFormEntity, ProcessCommentsEntity, ProcessSpecificsEntity } from '../../declarations';
import { HttpConfig, BaseMongoService } from '../base';
declare class DynamicFormService extends BaseMongoService<DynamicFormEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DynamicFormService;
    getBaseAddress(): string;
}
declare class ProcessCommentsService extends BaseMongoService<ProcessCommentsEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProcessCommentsService;
    getBaseAddress(): string;
}
declare class ProcessSpecificsService extends BaseMongoService<ProcessSpecificsEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProcessSpecificsService;
    getBaseAddress(): string;
}
export { DynamicFormService, ProcessSpecificsService, ProcessCommentsService };
