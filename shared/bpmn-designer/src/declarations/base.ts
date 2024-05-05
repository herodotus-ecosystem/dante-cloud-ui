import type { SweetAlertResult } from 'sweetalert2';

import type {
  QTableOnRequestParameter,
  QTablePaginationProps,
  QTableOnRequestProps,
  QTableColumnProps
} from '@herodotus/core';

import type {
  UserEntity,
  UserQueryParams,
  UserSortBy,
  UserService,
  GroupEntity,
  GroupQueryParams,
  GroupSortBy,
  GroupService,
  DeploymentCreateRequestBody,
  DeploymentService,
  BpmnQueryByGetService,
  BpmnSortable,
  BpmnListEntity,
  BpmnListQueryParams,
  BpmnDeleteQueryParams,
  Page
} from '@herodotus/bpmn-apis';

import type { DynamicFormService } from '@herodotus/form-apis';

export type BpmnAlign = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'middle';

export interface BpmnError {
  warnings: string;
  message: string;
}

export interface BpmnDesignerResources {
  user(): UserService;
  group(): GroupService;
  deployment(): DeploymentService;
  dynamicForm(): DynamicFormService;
}

export type {
  UserEntity,
  UserQueryParams,
  UserSortBy,
  UserService,
  GroupEntity,
  GroupQueryParams,
  GroupSortBy,
  GroupService,
  DeploymentCreateRequestBody,
  DeploymentService,
  BpmnQueryByGetService,
  QTableOnRequestParameter,
  QTablePaginationProps,
  QTableOnRequestProps,
  QTableColumnProps,
  BpmnSortable,
  BpmnListEntity,
  BpmnListQueryParams,
  BpmnDeleteQueryParams,
  Page,
  SweetAlertResult,
  DynamicFormService
};
