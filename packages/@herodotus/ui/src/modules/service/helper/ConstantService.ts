import { BaseService, _constants, ConstantDictionary } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';

@Singleton
export class ConstantService extends BaseService<Dictionary<ConstantDictionary[]>> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/constants/enums';
    }
}
