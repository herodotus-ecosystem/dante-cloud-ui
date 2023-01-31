import { defineStore } from 'pinia';
export const useEditorSettingStore = defineStore('EditorSetting', {
  state: () => ({
    // 是否使用官方属性面板
    useOfficialPanel: true,
    // 是否使用官方模版选择器
    useOfficialTemplateChooser: true,
    // 是否使用官方背景
    useOfficialBackground: true,
    // 是否使用其它模块配置
    useOtherModule: true,
    // 开启缩略图
    openMiniMap: true,
    // 开启 Bpmn 提示
    openBpmnLint: true,
    // 使用的工作流引擎
    processEngine: 'camunda'
  })
});
