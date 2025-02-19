import type { RouteRecordRaw } from 'vue-router';

import type { WidgetItem } from '@/lib/declarations';

const WidgetRoute: RouteRecordRaw = {
  path: '/widgets',
  component: () => import('@/views/layouts/Widgets.vue'),
  meta: { title: '应用程序部件', icon: 'mdi-apps-box' },
  redirect: '/widgets/bpmn-designer',
  children: [
    {
      path: '/widgets/bpmn-designer',
      name: 'WidgetsBpmnDesigner',
      meta: { title: '流程设计器', icon: 'mdi-list-status' },
      component: () => import('@/views/widgets/bpmn-designer/Index.vue'),
    },
    {
      path: '/widgets/dynamic-forms',
      name: 'WidgetsDynamicForms',
      meta: { title: '动态表单', icon: 'mdi-format-textbox' },
      component: () => import('@/views/widgets/dynamic-forms/Index.vue'),
    },
  ],
};

const getWidgets = (): Array<WidgetItem> => {
  const children = WidgetRoute.children;
  if (children) {
    return children.map((item: RouteRecordRaw) => {
      const widgetItem: WidgetItem = {
        tooltip: item.meta?.title as string,
        icon: item.meta?.icon as string,
        path: item.path,
      };

      return widgetItem;
    });
  }

  return [] as Array<WidgetItem>;
};

export { WidgetRoute, getWidgets };
