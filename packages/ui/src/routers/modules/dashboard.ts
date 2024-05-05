import { RouteRecordRaw } from 'vue-router';
import { PathEnum, ComponentNameEnum } from '/@/lib/enums';

const routes: Array<RouteRecordRaw> = [
  {
    path: PathEnum.HOME,
    name: 'Dashboard',
    component: () => import('/@/views/layouts/Index.vue'),
    redirect: '/dashboard/console',
    meta: {
      title: 'Dashboard',
      sort: 0,
      icon: 'mdi-view-dashboard',
      group: 'herodotus'
    },
    children: [
      {
        path: '/dashboard/console',
        name: 'DashboardConsole',
        meta: { title: '主控台', icon: 'mdi-sign-text', isHideAllChild: true },
        component: () => import('/@/views/dashboard/console/Index.vue')
      },
      {
        path: '/dashboard/workbench',
        name: 'DashboardWorkbench',
        meta: { title: '我的工作台', icon: 'mdi-desktop-classic', isHideAllChild: true },
        component: () => import('/@/views/dashboard/workbench/Index.vue'),
        children: [
          {
            path: '/dashboard/workbench/process-start',
            name: ComponentNameEnum.WORKFLOW_PROCESS_START,
            meta: { title: '审批流程', icon: 'mdi-format-list-group-plus', isDetailContent: true },
            component: () => import('/@/views/pages/workflow/process/WorkflowProcessStart.vue')
          },
          {
            path: '/dashboard/workbench/process-approve',
            name: ComponentNameEnum.WORKFLOW_PROCESS_APPROVE,
            meta: { title: '任务流程', icon: 'mdi-check-decagram', isDetailContent: true },
            component: () => import('/@/views/pages/workflow/process/WorkflowProcessApprove.vue')
          }
        ]
      }
    ]
  }
];

export default routes;
