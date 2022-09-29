import type { BaseTree } from './module';

import { OperationEnum } from '/@/lib/enums';

export interface RemoteRouteMeta {
  title: string;
  icon: string;
  sort: number;
  isHaveChild?: boolean;
  isNotKeepAlive?: boolean;
  isHideAllChild?: boolean;
  isDetailContent?: boolean;
  isIgnoreAuth?: boolean;
}
export interface RemoteRoute extends BaseTree {
  componentName: string;
  componentPath: string;
  redirect: string;
  meta: RemoteRouteMeta;
  roles: Array<string>;
  children?: Array<RemoteRoute>;
}

export interface PushParam {
  item: string;
  operation: OperationEnum;
}

export type RoutePushParam = Record<string, PushParam>;
