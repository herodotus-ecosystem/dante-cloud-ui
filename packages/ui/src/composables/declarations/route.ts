export interface MenuItem {
  title: string | unknown;
  prependIcon: string | unknown;
  to?: string;
  value?: string;
  $children?: MenuItem[];
}

export interface WidgetItem {
  tooltip: string;
  icon: string;
  path: string;
}
