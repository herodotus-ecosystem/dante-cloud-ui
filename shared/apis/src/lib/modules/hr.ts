import type {
  SysDepartmentEntity,
  SysEmployeeEntity,
  SysOrganizationEntity,
  SysEmployeeAllocatable,
  AxiosHttpResult,
  Conditions,
  Pageable,
  Page,
  AllocatableRemove,
  AllocatableDeploy,
} from '@/declarations';

import { ContentTypeEnum } from '@/enums';

import { HttpConfig, AbstractService } from '../base';

class SysOrganizationService extends AbstractService<SysOrganizationEntity> {
  private static instance: SysOrganizationService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysOrganizationService {
    if (this.instance == null) {
      this.instance = new SysOrganizationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/hr/organization';
  }
}

class SysDepartmentService extends AbstractService<SysDepartmentEntity> {
  private static instance: SysDepartmentService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysDepartmentService {
    if (this.instance == null) {
      this.instance = new SysDepartmentService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/hr/department';
  }
}

class SysEmployeeService extends AbstractService<SysEmployeeEntity> {
  private static instance: SysEmployeeService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysEmployeeService {
    if (this.instance == null) {
      this.instance = new SysEmployeeService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/hr/employee';
  }

  public getAssignedAddress(): string {
    return this.getBaseAddress() + '/assigned';
  }

  public getAllocatableAddress(): string {
    return this.getBaseAddress() + '/allocatable';
  }

  public getEmployeeNamePath(employeeName: string): string {
    return this.getParamPath(this.getBaseAddress(), employeeName);
  }

  public fetchByEmployeeName(employeeName: string): Promise<AxiosHttpResult<SysEmployeeEntity>> {
    return this.getConfig()
      .getHttp()
      .get<SysEmployeeEntity, string>(this.getEmployeeNamePath(employeeName));
  }

  public fetchAssignedByPage(
    params: Pageable,
    others: Conditions = {},
  ): Promise<AxiosHttpResult<Page<SysEmployeeEntity>>> {
    const fullParams = Object.assign(params, others);
    return this.getConfig()
      .getHttp()
      .get<Page<SysEmployeeEntity>>(this.getAssignedAddress(), fullParams);
  }

  public deleteAllocatable(data: AllocatableRemove): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete(this.getAllocatableAddress(), data);
  }

  public saveAllocatable(data: AllocatableDeploy): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().post(this.getAllocatableAddress(), data);
  }

  public authorizeUser(data: any): Promise<AxiosHttpResult<SysEmployeeEntity>> {
    return this.getConfig().getHttp().put(this.getBaseAddress(), data, {
      contentType: ContentTypeEnum.URL_ENCODED,
    });
  }
}

/**
 * 为了在人员归属中，尽量使用已有的 hooks，临时定义的无意义service
 */
class SysEmployeeAllocatableService extends AbstractService<SysEmployeeAllocatable> {
  private static instance: SysEmployeeAllocatableService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysEmployeeAllocatableService {
    if (this.instance == null) {
      this.instance = new SysEmployeeAllocatableService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/';
  }
}

export {
  SysOrganizationService,
  SysDepartmentService,
  SysEmployeeService,
  SysEmployeeAllocatableService,
};
