import { defineStore } from 'pinia';

import type { DesignerSetting } from '/@/declarations';

export const useSettingStore = defineStore('BpmnDesignerSetting', {
  state: (): DesignerSetting => ({
    // 是否使用官方属性面板
    useOfficialPanel: true,
    // 是否使用官方模版选择器
    useOfficialTemplateChooser: false,
    // 是否使用官方背景
    useOfficialBackground: true,
    // 是否使用其它模块配置
    useOtherModule: true,
    // 是否显示缩略图
    showMiniMap: true,
    // 是否开启 Bpmn 提示
    showBpmnLint: true,
    processId: `Process_${new Date().getTime()}`,
    processName: `业务流程`,
    // 使用的工作流引擎
    processEngine: 'camunda'
  })
});
