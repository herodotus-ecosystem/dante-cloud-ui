import { BaseSysEntity, BaseService, RestResponse } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';
import { _http, _constants } from '@/lib/utils';

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

    public getTreeAddress(): string {
        return this.getBaseAddress() + '/tree';
    }

    public fetchTree(params: Dictionary<string> = {}): Promise<RestResponse<SysDepartment[]>> {
        return _http.get<SysDepartment[]>(this.getTreeAddress(), params);
    }
}
