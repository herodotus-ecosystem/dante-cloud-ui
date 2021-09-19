import { BaseSysEntity, BaseService, _constants } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';
import { SysOrganization } from './SysOrganizationService';
import { SysDepartment } from './SysDepartmentService';

export interface SysEmployee extends BaseSysEntity {
    employeeId: string;
    employeeName: string;
    employeeNo: string;
    mobilePhoneNumber: string;
    officePhoneNumber: string;
    email: string;
    pkiEmail: string;
    organization: SysOrganization;
    department: SysDepartment;
    a4BizEmpId: string;
    avatar: string;
    birthday: string;
    gender: number | EmptyObject;
    identity: number | EmptyObject;
}

@Singleton
export class SysEmployeeService extends BaseService<SysEmployee> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/employee';
    }
}
