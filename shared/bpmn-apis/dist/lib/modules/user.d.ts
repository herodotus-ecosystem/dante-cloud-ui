import type { User, UserQueryParams, UserSortBy } from '../../declarations';
import { HttpConfig, BpmnQueryByGetService } from '../base';
declare class UserService extends BpmnQueryByGetService<User, UserQueryParams, UserSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): UserService;
    getBaseAddress(): string;
    getCreateAddress(): string;
}
export { UserService };
