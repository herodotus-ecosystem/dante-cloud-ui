import type {
  FormDesignerResources,
  DynamicFormService,
  FormApiResources,
} from '@herodotus-cloud/form-apis';
import type {
  DeploymentService,
  GroupService,
  UserService,
  BpmnApiResources,
} from '@herodotus-cloud/bpmn-apis';
import type { BpmnDesignerResources } from '@herodotus-cloud/bpmn-designer';

class BpmnDesignerStorage implements BpmnDesignerResources {
  private static instance: BpmnDesignerStorage;
  private formApi: FormApiResources;
  private bpmnApi: BpmnApiResources;

  private constructor(bpmnApi: BpmnApiResources, formApi: FormApiResources) {
    this.bpmnApi = bpmnApi;
    this.formApi = formApi;
  }

  public static getInstance(
    bpmnApi: BpmnApiResources,
    formApi: FormApiResources,
  ): BpmnDesignerStorage {
    if (this.instance == null) {
      this.instance = new BpmnDesignerStorage(bpmnApi, formApi);
    }
    return this.instance;
  }

  public user(): UserService {
    return this.bpmnApi.user();
  }

  public group(): GroupService {
    return this.bpmnApi.group();
  }

  public deployment(): DeploymentService {
    return this.bpmnApi.deployment();
  }

  public dynamicForm(): DynamicFormService {
    return this.formApi.dynamicForm();
  }
}

class FormDesignerStorage implements FormDesignerResources {
  private static instance: FormDesignerStorage;
  private formApi: FormApiResources;

  private constructor(formApi: FormApiResources) {
    this.formApi = formApi;
  }

  public static getInstance(formApi: FormApiResources): FormDesignerStorage {
    if (this.instance == null) {
      this.instance = new FormDesignerStorage(formApi);
    }
    return this.instance;
  }

  public dynamicForm(): DynamicFormService {
    return this.formApi.dynamicForm();
  }
}

export { BpmnDesignerStorage, FormDesignerStorage };
