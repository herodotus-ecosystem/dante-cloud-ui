import { HttpConfig, BpmnQueryByGetService } from '../base';
import { UserEntity, UserQueryParams, UserSortBy } from '../../declarations';

declare class UserService extends BpmnQueryByGetService<UserEntity, UserQueryParams, UserSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): UserService;
    getBaseAddress(): string;
    getCreateAddress(): string;
}
export { UserService };
