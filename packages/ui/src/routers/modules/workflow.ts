import type { RouteRecordRaw } from 'vue-router';

import { ComponentNameEnum } from '/@/lib/enums';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/workflow',
    component: () => import('/@/views/layouts/Index.vue'),
    meta: { title: '工作流程管理', sort: 5, icon: 'mdi-transit-connection-variant' },
    redirect: '/workflow/deployment',
    children: [
      {
        path: '/workflow/deployment',
        name: 'WorkflowDeployment',
        meta: { title: '流程部署管理', icon: 'mdi-cloud-braces', isHideAllChild: true },
        component: () => import('/@/views/pages/workflow/deployment/Index.vue'),
      },
      {
        path: '/workflow/process-definition',
        name: 'WorkflowProcessDefinition',
        meta: { title: '流程定义管理', icon: 'mdi-xml', isHideAllChild: true },
        component: () => import('/@/views/pages/workflow/process-definition/Index.vue'),
      },
      {
        path: '/workflow/process-instance',
        name: 'WorkflowProcessInstance',
        meta: { title: '流程实例管理', icon: 'mdi-motion-play', isHideAllChild: true },
        component: () => import('/@/views/pages/workflow/process-instance/Index.vue')
      },
      {
        path: '/workflow/dynamic-form',
        name: ComponentNameEnum.WORKFLOW_DYNAMIC_FORM,
        meta: { title: '动态表单管理', icon: 'mdi-monitor-dashboard', isHideAllChild: true },
        component: () => import('/@/views/pages/workflow/dynamic-form/Index.vue')
      },
    ]
  }
];

export default routes;
