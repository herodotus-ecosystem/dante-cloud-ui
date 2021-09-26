import { Entity, BaseService, _constants } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';

export interface SysOwnershipView extends Entity {
    ownershipId: string;
    organizationId: string;
    organizationName: string;
    organizationParentId: string;
    departmentId: string;
    departmentName: string;
    departmentParentId: string;
    employeeId: string;
    employeeName: string;
    email: string;
    pkiEmail: string;
    phoneNumber: string;
    identity: number | EmptyObject;
}

@Singleton
export class SysOwnershipViewService extends BaseService<SysOwnershipView> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/ownership-view';
    }
}
