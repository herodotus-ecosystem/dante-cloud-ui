import type {
  DynamicFormEntity,
  ProcessCommentsEntity,
  ProcessSpecificsEntity,
} from '@/declarations';

import { HttpConfig, BaseMongoService } from '../base';

class DynamicFormService extends BaseMongoService<DynamicFormEntity> {
  private static instance: DynamicFormService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): DynamicFormService {
    if (this.instance == null) {
      this.instance = new DynamicFormService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn(true, true) + '/dynamic-form';
  }
}

class ProcessCommentsService extends BaseMongoService<ProcessCommentsEntity> {
  private static instance: ProcessCommentsService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ProcessCommentsService {
    if (this.instance == null) {
      this.instance = new ProcessCommentsService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn(true, true) + '/process-comments';
  }
}

class ProcessSpecificsService extends BaseMongoService<ProcessSpecificsEntity> {
  private static instance: ProcessSpecificsService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ProcessSpecificsService {
    if (this.instance == null) {
      this.instance = new ProcessSpecificsService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn(true, true) + '/process-specifics';
  }
}

export { DynamicFormService, ProcessSpecificsService, ProcessCommentsService };
