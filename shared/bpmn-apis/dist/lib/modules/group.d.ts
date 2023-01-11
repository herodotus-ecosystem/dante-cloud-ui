import type { AxiosHttpResult, IdPathParams, Group, GroupQueryParams, GroupSortBy, GroupCreateBody, GroupUpdateBody } from '../../declarations';
import { HttpConfig, BpmnService, BaseBpmnService } from '../base';
declare class GroupService extends BaseBpmnService<Group, GroupQueryParams, GroupSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): GroupService;
    getBaseAddress(): string;
    getCreateAddress(): string;
    /**
     * Creates a new group.
     *
     * @param data {@link GroupCreateBody}
     * @returns This method returns no content
     */
    createTask(data: GroupCreateBody): Promise<AxiosHttpResult<string>>;
    /**
     * Updates a group.
     *
     * @param data {@link GroupUpdateBody}
     * @returns This method returns no content
     */
    updateTask(path: IdPathParams, data: GroupUpdateBody): Promise<AxiosHttpResult<string>>;
}
declare class GroupMemberService extends BpmnService {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): GroupMemberService;
    getBaseAddress(): string;
    private getRelationAddress;
    /**
     * Adds a member to a group.
     *
     * @param groupId
     * @param userId
     * @returns This method returns no content
     */
    create(groupId: string, userId: string): Promise<AxiosHttpResult<string>>;
    /**
     * Removes a member from a group.
     *
     * @param groupId
     * @param userId
     * @returns This method returns no content
     */
    delete(groupId: string, userId: string): Promise<AxiosHttpResult<string>>;
}
export { GroupService, GroupMemberService };
