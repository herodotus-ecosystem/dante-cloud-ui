import { BaseService, _constants, ConstantDictionary } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';

@Singleton
export class UserInfoService extends BaseService<Dictionary<ConstantDictionary[]>> {
    public getBaseAddress(): string {
        return _constants.UAA_ADDRESS + '/userinfo';
    }
}
