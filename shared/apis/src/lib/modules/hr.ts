import type {
  SysDepartment,
  SysEmployee,
  SysOrganization,
  SysEmployeeAllocatable,
  AxiosHttpResult,
  Conditions,
  Pageable,
  Page,
  AllocatableRemove,
  AllocatableDeploy
} from '/@/declarations';

import { ContentTypeEnum } from '/@/enums';

import { ApiConfig, BaseService } from '../base';

class SysOrganizationService extends BaseService<SysOrganization> {
  private static instance: SysOrganizationService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysOrganizationService {
    if (this.instance == null) {
      this.instance = new SysOrganizationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/organization';
  }
}

class SysDepartmentService extends BaseService<SysDepartment> {
  private static instance: SysDepartmentService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysDepartmentService {
    if (this.instance == null) {
      this.instance = new SysDepartmentService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/department';
  }
}

class SysEmployeeService extends BaseService<SysEmployee> {
  private static instance: SysEmployeeService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysEmployeeService {
    if (this.instance == null) {
      this.instance = new SysEmployeeService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/employee';
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

  public fetchByEmployeeName(employeeName: string): Promise<AxiosHttpResult<SysEmployee>> {
    return this.getConfig().getHttp().get<SysEmployee, string>(this.getEmployeeNamePath(employeeName));
  }

  public fetchAssignedByPage(params: Pageable, others: Conditions = {}): Promise<AxiosHttpResult<Page<SysEmployee>>> {
    const fullParams = Object.assign(params, others);
    return this.getConfig().getHttp().get<Page<SysEmployee>>(this.getAssignedAddress(), fullParams);
  }

  public deleteAllocatable(data: AllocatableRemove): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete(this.getAllocatableAddress(), data);
  }

  public saveAllocatable(data: AllocatableDeploy): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().post(this.getAllocatableAddress(), data);
  }

  public authorizeUser(data: any): Promise<AxiosHttpResult<SysEmployee>> {
    return this.getConfig().getHttp().put(this.getBaseAddress(), data, {
      contentType: ContentTypeEnum.URL_ENCODED
    });
  }
}

/**
 * 为了在人员归属中，尽量使用已有的 hooks，临时定义的无意义service
 */
class SysEmployeeAllocatableService extends BaseService<SysEmployeeAllocatable> {
  private static instance: SysEmployeeAllocatableService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysEmployeeAllocatableService {
    if (this.instance == null) {
      this.instance = new SysEmployeeAllocatableService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/';
  }
}

export { SysOrganizationService, SysDepartmentService, SysEmployeeService, SysEmployeeAllocatableService };
