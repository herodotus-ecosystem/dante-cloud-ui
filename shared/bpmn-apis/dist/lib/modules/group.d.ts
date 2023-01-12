import type { AxiosHttpResult, BpmnIdPathParams, GroupEntity, GroupQueryParams, GroupSortBy, GroupCreateRequestBody, GroupUpdateRequestBody } from '../../declarations';
import { HttpConfig, BpmnService, BaseBpmnService } from '../base';
declare class GroupService extends BaseBpmnService<GroupEntity, GroupQueryParams, GroupSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): GroupService;
    getBaseAddress(): string;
    getCreateAddress(): string;
    /**
     * Creates a new group.
     *
     * @param data {@link GroupCreateRequestBody}
     * @returns This method returns no content
     */
    createTask(data: GroupCreateRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Updates a group.
     *
     * @param data {@link GroupUpdateRequestBody}
     * @returns This method returns no content
     */
    updateTask(path: BpmnIdPathParams, data: GroupUpdateRequestBody): Promise<AxiosHttpResult<string>>;
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
