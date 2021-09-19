import { BaseService, BaseSysEntity, _constants } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';

export interface SysDepartment extends BaseSysEntity {
    departmentId: string;
    departmentName: string;
    a4BizDeptId: string;
    bizDeptCode: string;
    bizDeptDesc: string;
    bizDeptId: string;
    bizDeptName: string;
    bizDeptType: string;
    partitionCode: string;
    shortName: string;
    parentId: string;
    organizationId: string;
}

@Singleton
export class SysDepartmentService extends BaseService<SysDepartment> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/department';
    }
}
