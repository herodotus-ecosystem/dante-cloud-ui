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
import { _http } from '@/lib/utils';
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

export interface OwnershipConfig extends Entity {
    organizationId: string;
    departmentId: string;
    employees: SysEmployee[];
}

@Singleton
export class SysEmployeeService extends BaseService<SysEmployee> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/employee';
    }

    public getAllocatableAddress(): string {
        return this.getBaseAddress() + '/allocatable';
    }

    public fetchAllocatableByPage(params: Pageable, others = {}): Promise<RestResponse<Page<SysEmployee>>> {
        const fullParams = Object.assign(params, others);
        return _http.get<Page<SysEmployee>>(this.getAllocatableAddress(), fullParams);
    }

    public saveAllocatable(data: OwnershipConfig): Promise<Result<string>> {
        return _http.post(this.getAllocatableAddress(), data);
    }
}
