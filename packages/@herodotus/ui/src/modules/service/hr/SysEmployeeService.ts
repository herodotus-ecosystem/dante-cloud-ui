import { SysDepartment } from './SysDepartmentService';
import {
    BaseSysEntity,
    BaseService,
    _constants,
    RestResponse,
    Page,
    Pageable,
    Result,
    Entity,
} from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';
import { _http, HttpContentType } from '@/lib/utils';
export interface SysEmployee extends BaseSysEntity {
    employeeId: string;
    employeeName: string;
    employeeNo: string;
    mobilePhoneNumber: string;
    officePhoneNumber: string;
    email: string;
    pkiEmail: string;
    a4BizEmpId: string;
    avatar: string;
    birthday: string;
    gender: number | EmptyObject;
    identity: number | EmptyObject;
    departments: Set<SysDepartment>;
}

export interface AllocatableDeploy extends Entity {
    organizationId: string;
    departmentId: string;
    employees: SysEmployee[];
}

export interface AllocatableRemove extends Entity {
    organizationId: string;
    departmentId: string;
    employeeId: string;
}

@Singleton
export class SysEmployeeService extends BaseService<SysEmployee> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/employee';
    }

    public getAllocatableAddress(): string {
        return this.getBaseAddress() + '/allocatable';
    }

    public getAssignedAddress(): string {
        return this.getBaseAddress() + '/assigned';
    }

    public getAuthorizeAddress(): string {
        return this.getBaseAddress() + '/authorize';
    }

    public getEmployeeNamePath(employeeName: string): string {
        return this.getParamPath(this.getBaseAddress(), employeeName);
    }

    public fetchByEmployeeName(employeeName: string): Promise<RestResponse<SysEmployee>> {
        return _http.get<SysEmployee>(this.getEmployeeNamePath(employeeName));
    }

    public fetchAllocatableByPage(params: Pageable, others = {}): Promise<RestResponse<Page<SysEmployee>>> {
        const fullParams = Object.assign(params, others);
        return _http.get<Page<SysEmployee>>(this.getAllocatableAddress(), fullParams);
    }

    public fetchAssignedByPage(params: Pageable, others = {}): Promise<RestResponse<Page<SysEmployee>>> {
        const fullParams = Object.assign(params, others);
        return _http.get<Page<SysEmployee>>(this.getAssignedAddress(), fullParams);
    }

    public saveAllocatable(data: AllocatableDeploy): Promise<Result<string>> {
        return _http.post(this.getAllocatableAddress(), data);
    }

    public deleteAllocatable(data: AllocatableRemove): Promise<RestResponse<string>> {
        return _http.delete(this.getAllocatableAddress(), data);
    }

    public authorizeUser(data: any): Promise<RestResponse<SysEmployee>> {
        return _http.put(this.getBaseAddress(), data, HttpContentType.URL_ENCODED);
    }
}
