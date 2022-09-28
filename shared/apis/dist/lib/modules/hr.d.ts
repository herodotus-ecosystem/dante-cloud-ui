import type { SysDepartment, SysEmployee, SysOrganization, SysEmployeeAllocatable, AxiosHttpResult, Conditions, Pageable, Page, AllocatableRemove, AllocatableDeploy } from '../../declarations';
import { ApiConfig, BaseService } from '../base';
declare class SysOrganizationService extends BaseService<SysOrganization> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): SysOrganizationService;
    getBaseAddress(): string;
}
declare class SysDepartmentService extends BaseService<SysDepartment> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): SysDepartmentService;
    getBaseAddress(): string;
}
declare class SysEmployeeService extends BaseService<SysEmployee> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): SysEmployeeService;
    getBaseAddress(): string;
    getAssignedAddress(): string;
    getAllocatableAddress(): string;
    getEmployeeNamePath(employeeName: string): string;
    fetchByEmployeeName(employeeName: string): Promise<AxiosHttpResult<SysEmployee>>;
    fetchAssignedByPage(params: Pageable, others?: Conditions): Promise<AxiosHttpResult<Page<SysEmployee>>>;
    deleteAllocatable(data: AllocatableRemove): Promise<AxiosHttpResult<string>>;
    saveAllocatable(data: AllocatableDeploy): Promise<AxiosHttpResult<string>>;
    authorizeUser(data: any): Promise<AxiosHttpResult<SysEmployee>>;
}
/**
 * 为了在人员归属中，尽量使用已有的 hooks，临时定义的无意义service
 */
declare class SysEmployeeAllocatableService extends BaseService<SysEmployeeAllocatable> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): SysEmployeeAllocatableService;
    getBaseAddress(): string;
}
export { SysOrganizationService, SysDepartmentService, SysEmployeeService, SysEmployeeAllocatableService };
