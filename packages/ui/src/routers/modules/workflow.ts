import type { RouteRecordRaw } from 'vue-router';

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
        children: [
          {
            path: '/workflow/deployment/content',
            name: 'WorkflowDeploymentContent',
            meta: { title: '流程部署详情', icon: 'mdi-cloud-alert', isDetailContent: true },
            component: () => import('/@/views/pages/workflow/deployment/Content.vue')
          }
        ]
      },
      {
        path: '/workflow/process-definition',
        name: 'WorkflowProcessDefinition',
        meta: { title: '流程定义管理', icon: 'mdi-xml', isHideAllChild: true },
        component: () => import('/@/views/pages/workflow/process-definition/Index.vue'),
        children: [
          {
            path: '/workflow/process-definition/diagram',
            name: 'WorkflowProcessDefinitionDiagram',
            meta: { title: '流程定义图形', icon: 'mdi-image-multiple', isDetailContent: true },
            component: () => import('/@/views/pages/workflow/process-definition/Diagram.vue')
          }
        ]
      },
      {
        path: '/workflow/process-instance',
        name: 'WorkflowProcessInstance',
        meta: { title: '流程实例管理', icon: 'mdi-motion-play', isHideAllChild: true },
        component: () => import('/@/views/pages/workflow/process-instance/Index.vue')
      },
      // {
      //   path: '/workflow/leave-flow',
      //   name: 'LeaveFlow',
      //   meta: { title: '请假流程', icon: 'mdi-account-arrow-right', isHideAllChild: true },
      //   component: () => import('/@/views/pages/workflow/leave/Index.vue'),
      //   children: [
      //     {
      //       path: '/workflow/leave-flow/content',
      //       name: 'LeaveFlowContent',
      //       meta: { title: '请假填报', icon: 'mdi-calendar-edit', isDetailContent: true },
      //       component: () => import('/@/views/pages/workflow/leave/Content.vue')
      //     }
      //   ]
      // },
      {
        path: '/workflow/pending',
        name: 'WorkflowPending',
        meta: { title: '待办任务', icon: 'mdi-clipboard-list', isHideAllChild: true },
        component: () => import('/@/views/pages/workflow/pending/Index.vue')
      }
    ]
  }
];

export default routes;
