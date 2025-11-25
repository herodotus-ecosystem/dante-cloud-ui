import type { Tree, Entity } from '../application';

export interface ElementRouteMeta {
  title: string;
  icon: string;
  sort: number;
  isHaveChild?: boolean;
  isNotKeepAlive?: boolean;
  isHideAllChild?: boolean;
  isDetailContent?: boolean;
  isIgnoreAuth?: boolean;
}

export interface ElementRouteTree extends Tree {
  componentName: string;
  componentPath: string;
  redirect: string;
  meta: ElementRouteMeta;
  scenario: string;
  children?: Array<ElementRouteTree>;
}

export interface Elements extends Entity {
  menus: ElementRouteTree[];
  buttons: string[];
}
