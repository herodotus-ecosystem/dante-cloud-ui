import { BaseService, BaseSysEntity, _constants } from '@/lib/declarations';
import { Singleton } from 'typescript-ioc';

export interface Supplier extends BaseSysEntity {
    supplierId: string;
    supplierName: string;
    supplierCode: string;
    supplierType: number | EmptyObject;
    parentId: string;
}

@Singleton
export class SupplierService extends BaseService<Supplier> {
    public getBaseAddress(): string {
        return _constants.UPMS_ADDRESS + '/microservice/supplier';
    }
}
