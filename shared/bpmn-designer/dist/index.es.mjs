import { QToolbar, QFile, QIcon, QSeparator, QBtnDropdown, QList, QBtnGroup, QBtn, QDialog, QCard, QCardSection, QCardActions } from "quasar";
import { defineComponent, ref, computed, watch, resolveComponent, resolveDirective, createBlock, openBlock, withCtx, createVNode, createElementVNode, withDirectives, onBeforeUnmount, onMounted, normalizeStyle, createElementBlock } from "vue";
import { HTextField, HSwitch, HListItem } from "@herodotus/components";
import { DeploymentService } from "@herodotus/bpmn-apis";
import { lodash, toast, standardDeleteNotify } from "@herodotus/core";
import { Swal, lodash as lodash2, standardDeleteNotify as standardDeleteNotify2, toast as toast2 } from "@herodotus/core";
import BpmnModeler from "bpmn-js/lib/Modeler";
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, CamundaPlatformPropertiesProviderModule } from "bpmn-js-properties-panel";
import TokenSimulation from "bpmn-js-token-simulation";
import camundaModdleDescriptors from "camunda-bpmn-moddle/resources/camunda";
import BpmnViewer from "bpmn-js/lib/Viewer";
const _sfc_main$2 = defineComponent({
  name: "HBpmnDesignerToolbar",
  components: {
    HListItem,
    HSwitch,
    HTextField
  },
  props: {
    file: { type: String, required: true },
    zoom: { type: Number, default: 1 }
  },
  emits: [
    "update:file",
    "downloadXml",
    "downloadSvg",
    "downloadBpmn",
    "alignLeft",
    "alignRight",
    "alignTop",
    "alignBottom",
    "alignHorizontalCenter",
    "alignVerticalCenter",
    "zoomMinus",
    "zoomPlus",
    "zoomReset",
    "undo",
    "redo",
    "refresh",
    "simulation",
    "save"
  ],
  setup(props, { emit }) {
    const bpmnModelFile = ref(null);
    const simulation = ref(false);
    const showUploadDialog = ref(false);
    const name = ref("");
    const selectedFile = computed({
      get: () => props.file,
      set: (newValue) => {
        emit("update:file", newValue);
      }
    });
    const readFileContent = async (file) => {
      if (file) {
        const content = await file.text();
        name.value = file.name;
        if (content) {
          selectedFile.value = content;
        }
      } else {
        selectedFile.value = "";
      }
    };
    const deploymentName = ref("");
    const tenantId = ref("");
    const enableDuplicateCheck = ref(false);
    const deployChangedOnly = ref(false);
    const disableNameInput = ref(false);
    watch(bpmnModelFile, (newValue) => {
      readFileContent(newValue);
    });
    watch(
      () => name.value,
      (newValue) => {
        if (newValue) {
          deploymentName.value = newValue;
          disableNameInput.value = true;
        }
      },
      { immediate: true }
    );
    watch(
      deployChangedOnly,
      (newValue) => {
        if (newValue) {
          enableDuplicateCheck.value = true;
        }
      },
      { immediate: true }
    );
    const onDownloadXml = () => {
      emit("downloadXml");
    };
    const onDownloadSvg = () => {
      emit("downloadSvg");
    };
    const onDownloadBpmn = () => {
      emit("downloadBpmn");
    };
    const onAlignLeft = () => {
      emit("alignLeft");
    };
    const onAlignRight = () => {
      emit("alignRight");
    };
    const onAlignTop = () => {
      emit("alignTop");
    };
    const onAlignBottom = () => {
      emit("alignBottom");
    };
    const onAlignHorizontalCenter = () => {
      emit("alignHorizontalCenter");
    };
    const onAlignVerticalCenter = () => {
      emit("alignVerticalCenter");
    };
    const onZoomMinus = () => {
      emit("zoomMinus");
    };
    const onZoomPlus = () => {
      emit("zoomPlus");
    };
    const onZoomReset = () => {
      emit("zoomReset");
    };
    const onUndo = () => {
      emit("undo");
    };
    const onRedo = () => {
      emit("redo");
    };
    const onRefresh = () => {
      emit("refresh");
    };
    const onSimulation = () => {
      simulation.value = !simulation.value;
      emit("simulation");
    };
    const onSave = () => {
      showUploadDialog.value = false;
      const data = {
        deploymentName: deploymentName.value,
        enableDuplicateFiltering: enableDuplicateCheck.value,
        deployChangedOnly: deployChangedOnly.value,
        resource: selectedFile.value
      };
      emit("save", data);
    };
    return {
      bpmnModelFile,
      onDownloadXml,
      onDownloadSvg,
      onDownloadBpmn,
      onAlignLeft,
      onAlignRight,
      onAlignTop,
      onAlignBottom,
      onAlignHorizontalCenter,
      onAlignVerticalCenter,
      onZoomMinus,
      onZoomPlus,
      onZoomReset,
      onUndo,
      onRedo,
      onRefresh,
      simulation,
      onSimulation,
      showUploadDialog,
      onSave,
      name,
      deploymentName,
      tenantId,
      enableDuplicateCheck,
      deployChangedOnly,
      disableNameInput
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_icon = QIcon;
  const _component_q_file = QFile;
  const _component_q_separator = QSeparator;
  const _component_h_list_item = resolveComponent("h-list-item");
  const _component_q_list = QList;
  const _component_q_btn_dropdown = QBtnDropdown;
  const _component_h_button = resolveComponent("h-button");
  const _component_q_btn_group = QBtnGroup;
  const _component_q_btn = QBtn;
  const _component_q_card_section = QCardSection;
  const _component_h_text_field = resolveComponent("h-text-field");
  const _component_h_switch = resolveComponent("h-switch");
  const _component_q_card_actions = QCardActions;
  const _component_q_card = QCard;
  const _component_q_dialog = QDialog;
  const _component_q_toolbar = QToolbar;
  const _directive_close_popup = resolveDirective("close-popup");
  return openBlock(), createBlock(_component_q_toolbar, { class: "bg-primary text-white q-px-none" }, {
    default: withCtx(() => [
      createVNode(_component_q_file, {
        modelValue: _ctx.bpmnModelFile,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.bpmnModelFile = $event),
        "label-color": "white",
        "bg-color": "primary",
        square: "",
        standout: "",
        dense: "",
        clearable: "",
        label: "打开"
      }, {
        prepend: withCtx(() => [
          createVNode(_component_q_icon, {
            name: "mdi-folder-open",
            color: "white"
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(_component_q_separator, {
        vertical: "",
        color: "white"
      }),
      createVNode(_component_q_btn_dropdown, {
        stretch: "",
        flat: "",
        label: "下载",
        dense: "",
        icon: "mdi-download-box"
      }, {
        default: withCtx(() => [
          createVNode(_component_q_list, null, {
            default: withCtx(() => [
              createVNode(_component_q_list, null, {
                default: withCtx(() => [
                  createVNode(_component_h_list_item, {
                    label: "下载为XML文件",
                    icon: "mdi-xml",
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.onDownloadXml())
                  }),
                  createVNode(_component_h_list_item, {
                    label: "下载为SVG文件",
                    icon: "mdi-svg",
                    onClick: _cache[2] || (_cache[2] = ($event) => _ctx.onDownloadSvg())
                  }),
                  createVNode(_component_h_list_item, {
                    label: "下载为BPMN文件",
                    icon: "mdi-codepen",
                    onClick: _cache[3] || (_cache[3] = ($event) => _ctx.onDownloadBpmn())
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_q_separator, {
        vertical: "",
        color: "white"
      }),
      createVNode(_component_q_btn_dropdown, {
        stretch: "",
        flat: "",
        label: "代码",
        dense: "",
        icon: "mdi-eye"
      }, {
        default: withCtx(() => [
          createVNode(_component_q_list, null, {
            default: withCtx(() => [
              createVNode(_component_q_list, null, {
                default: withCtx(() => [
                  createVNode(_component_h_list_item, {
                    label: "预览XML",
                    icon: "mdi-xml"
                  }),
                  createVNode(_component_h_list_item, {
                    label: "预览JSON",
                    icon: "mdi-code-json"
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_q_separator, {
        vertical: "",
        color: "white"
      }),
      createVNode(_component_h_button, {
        stretch: "",
        flat: "",
        color: "primary",
        dense: "",
        "text-color": "white",
        icon: _ctx.simulation ? "mdi-play-pause" : "mdi-play",
        tooltip: _ctx.simulation ? "退出模拟" : "开启模拟",
        label: _ctx.simulation ? "退出模拟" : "开启模拟",
        onClick: _cache[4] || (_cache[4] = ($event) => _ctx.onSimulation())
      }, null, 8, ["icon", "tooltip", "label"]),
      createVNode(_component_q_separator, {
        vertical: "",
        color: "white"
      }),
      createVNode(_component_h_button, {
        stretch: "",
        flat: "",
        color: "primary",
        dense: "",
        "text-color": "white",
        icon: "mdi-cloud-upload",
        tooltip: "上传至服务器",
        label: "上传云端",
        onClick: _cache[5] || (_cache[5] = ($event) => _ctx.showUploadDialog = true)
      }),
      createVNode(_component_q_separator, {
        vertical: "",
        color: "white"
      }),
      createVNode(_component_q_btn_group, { class: "q-ml-sm" }, {
        default: withCtx(() => [
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-align-horizontal-left",
            tooltip: "向左对齐",
            onClick: _cache[6] || (_cache[6] = ($event) => _ctx.onAlignLeft())
          }),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-align-horizontal-right",
            tooltip: "向右对齐",
            onClick: _cache[7] || (_cache[7] = ($event) => _ctx.onAlignRight())
          }),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-align-vertical-top",
            tooltip: "向上对齐",
            onClick: _cache[8] || (_cache[8] = ($event) => _ctx.onAlignTop())
          }),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-align-vertical-bottom",
            tooltip: "向下对齐",
            onClick: _cache[9] || (_cache[9] = ($event) => _ctx.onAlignBottom())
          }),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-align-horizontal-center",
            tooltip: "水平居中",
            onClick: _cache[10] || (_cache[10] = ($event) => _ctx.onAlignHorizontalCenter())
          }),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-align-vertical-center",
            tooltip: "垂直居中",
            onClick: _cache[11] || (_cache[11] = ($event) => _ctx.onAlignVerticalCenter())
          })
        ]),
        _: 1
      }),
      createVNode(_component_q_btn_group, { class: "q-ml-xs" }, {
        default: withCtx(() => [
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-magnify-minus",
            tooltip: "缩小视图",
            disable: _ctx.zoom < 0.2,
            onClick: _cache[12] || (_cache[12] = ($event) => _ctx.onZoomMinus())
          }, null, 8, ["disable"]),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_q_btn, {
            color: "white",
            "text-color": "grey-8",
            dense: "",
            class: "q-px-sm",
            label: Math.floor(_ctx.zoom * 10 * 10) + "%",
            disable: ""
          }, null, 8, ["label"]),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-magnify-plus",
            tooltip: "放大视图",
            disable: _ctx.zoom > 4,
            onClick: _cache[13] || (_cache[13] = ($event) => _ctx.onZoomPlus())
          }, null, 8, ["disable"]),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-magnify-scan",
            tooltip: "重置视图并居中",
            onClick: _cache[14] || (_cache[14] = ($event) => _ctx.onZoomReset())
          })
        ]),
        _: 1
      }),
      createVNode(_component_q_btn_group, { class: "q-mx-xs" }, {
        default: withCtx(() => [
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-undo-variant",
            tooltip: "撤销",
            onClick: _ctx.onUndo
          }, null, 8, ["onClick"]),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-redo-variant",
            tooltip: "恢复",
            onClick: _ctx.onRedo
          }, null, 8, ["onClick"]),
          createVNode(_component_q_separator, {
            vertical: "",
            color: "grey-6"
          }),
          createVNode(_component_h_button, {
            color: "white",
            "text-color": "grey-8",
            class: "q-px-sm",
            dense: "",
            icon: "mdi-refresh",
            onClick: _ctx.onRefresh
          }, null, 8, ["onClick"])
        ]),
        _: 1
      }),
      createVNode(_component_q_dialog, {
        modelValue: _ctx.showUploadDialog,
        "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => _ctx.showUploadDialog = $event)
      }, {
        default: withCtx(() => [
          createVNode(_component_q_card, null, {
            default: withCtx(() => [
              createVNode(_component_q_card_section, null, {
                default: withCtx(() => [..._cache[20] || (_cache[20] = [
                  createElementVNode("div", { class: "text-h6" }, "模型信息", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_q_separator),
              createVNode(_component_q_card_section, {
                style: { "max-height": "50vh" },
                class: "scroll"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_text_field, {
                    modelValue: _ctx.deploymentName,
                    "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => _ctx.deploymentName = $event),
                    label: "模型名称",
                    placeholder: "请输入模型名称",
                    disable: _ctx.disableNameInput
                  }, null, 8, ["modelValue", "disable"]),
                  createVNode(_component_h_switch, {
                    modelValue: _ctx.enableDuplicateCheck,
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => _ctx.enableDuplicateCheck = $event),
                    label: "开启部署重复检查"
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_h_switch, {
                    modelValue: _ctx.deployChangedOnly,
                    "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => _ctx.deployChangedOnly = $event),
                    label: "仅在模型存在变化时部署"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_q_separator),
              createVNode(_component_q_card_actions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_q_btn, {
                    label: "取消",
                    color: "red"
                  }, null, 512), [
                    [_directive_close_popup]
                  ]),
                  createVNode(_component_q_btn, {
                    label: "部署",
                    color: "primary",
                    onClick: _cache[18] || (_cache[18] = ($event) => _ctx.onSave())
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  });
}
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const DefaultDiagram = '<?xml version="1.0" encoding="UTF-8"?>\n<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">\n  <bpmn2:process id="Process_1" isExecutable="false">\n    <bpmn2:startEvent id="StartEvent_1"/>\n  </bpmn2:process>\n  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn2:definitions>';
const log = (message, ...optionalParams) => {
  console.log("[Herodotus] |- " + message, ...optionalParams);
};
const error = (message, ...optionalParams) => {
  console.error("[Herodotus] |- " + message, ...optionalParams);
};
const exception = (description, error2) => {
  const { warnings, message } = error2;
  error2(description, warnings, message);
};
const download = (href, filename) => {
  if (href && filename) {
    const a = document.createElement("a");
    a.download = filename;
    a.href = href;
    a.click();
    URL.revokeObjectURL(a.href);
  }
};
const downloadEncode = (type, filename = "diagram", data) => {
  const encodedData = encodeURIComponent(data);
  return {
    filename: `${filename}.${type}`,
    href: `data:application/${type === "svg" ? "text/xml" : "bpmn20-xml"};charset=UTF-8,${encodedData}`,
    data
  };
};
const BpmnJs = {
  "Activate the create/remove space tool": "启动创建/删除空间工具",
  "Activate the global connect tool": "启动全局连接工具",
  "Activate the hand tool": "启动手动工具",
  "Activate the lasso tool": "启动 Lasso 工具",
  "Ad-hoc": "Ad-hoc子流程",
  "Add Lane above": "添加到通道之上",
  "Add Lane below": "添加到通道之下",
  "Append compensation activity": "追加补偿活动",
  "Append {type}": "追加 {type}",
  "Business Rule Task": "规则任务",
  "Call Activity": "引用流程",
  "Cancel Boundary Event": "取消边界事件",
  "Cancel End Event": "结束取消事件",
  "Change type": "更改类型",
  "Collapsed Pool": "折叠池",
  "Compensation Boundary Event": "补偿边界事件",
  "Compensation End Event": "结束补偿事件",
  "Compensation Intermediate Throw Event": "中间补偿抛出事件",
  "Compensation Start Event": "补偿启动事件",
  "Complex Gateway": "复杂网关",
  "Conditional Boundary Event (non-interrupting)": "条件边界事件 (非中断)",
  "Conditional Boundary Event": "条件边界事件",
  "Conditional Intermediate Catch Event": "中间条件捕获事件",
  "Conditional Start Event (non-interrupting)": "条件启动事件 (非中断)",
  "Conditional Start Event": "条件启动事件",
  "Connect using Association": "文本关联",
  "Connect using DataInputAssociation": "数据关联",
  "Connect using Sequence/MessageFlow or Association": "消息关联",
  "Create IntermediateThrowEvent/BoundaryEvent": "创建中间抛出/边界事件",
  "Create Pool/Participant": "创建池/参与者",
  "Create expanded SubProcess": "创建可折叠子流程",
  "Create {type}": "创建 {type}",
  "Divide into three Lanes": "分成三条通道",
  "Divide into two Lanes": "分成两条通道",
  "End Event": "结束事件",
  "Error Boundary Event": "错误边界事件",
  "Error End Event": "结束错误事件",
  "Error Start Event": "错误启动事件",
  "Escalation Boundary Event (non-interrupting)": "升级边界事件 (非中断)",
  "Escalation Boundary Event": "升级边界事件",
  "Escalation End Event": "结束升级事件",
  "Escalation Intermediate Throw Event": "中间升级抛出事件",
  "Escalation Start Event (non-interrupting)": "升级启动事件 (非中断)",
  "Escalation Start Event": "升级启动事件",
  "Event Sub Process": "事件子流程",
  "Event based Gateway": "事件网关",
  "Exclusive Gateway": "独占网关",
  "Expanded Pool": "展开池",
  "Inclusive Gateway": "包容网关",
  "Intermediate Throw Event": "中间抛出事件",
  "Link Intermediate Catch Event": "中间链接捕获事件",
  "Link Intermediate Throw Event": "中间链接抛出事件",
  Loop: "循环",
  "Manual Task": "手动任务",
  "Message Boundary Event (non-interrupting)": "消息边界事件 (非中断)",
  "Message Boundary Event": "消息边界事件",
  "Message End Event": "结束消息事件",
  "Message Intermediate Catch Event": "中间消息捕获事件",
  "Message Intermediate Throw Event": "中间消息抛出事件",
  "Message Start Event (non-interrupting)": "消息启动事件 (非中断)",
  "Message Start Event": "消息启动事件",
  "Parallel Gateway": "并行网关",
  "Parallel Multi Instance": "并行多实例",
  "Receive Task": "接受任务",
  Remove: "移除",
  "Script Task": "脚本任务",
  "Send Task": "发送任务",
  "Sequential Multi Instance": "串行多实例",
  "Service Task": "服务任务",
  "Signal Boundary Event (non-interrupting)": "信号边界事件 (非中断)",
  "Signal Boundary Event": "信号边界事件",
  "Signal End Event": "结束信号事件",
  "Signal Intermediate Catch Event": "中间信号捕获事件",
  "Signal Intermediate Throw Event": "中间信号抛出事件",
  "Signal Start Event (non-interrupting)": "信号启动事件 (非中断)",
  "Signal Start Event": "信号启动事件",
  "Start Event": "开始事件",
  "Sub Process (collapsed)": "可折叠子流程",
  "Sub Process (expanded)": "可展开子流程",
  "Sub Process": "子流程",
  Task: "任务",
  "Terminate End Event": "终止边界事件",
  "Timer Boundary Event (non-interrupting)": "定时边界事件 (非中断)",
  "Timer Boundary Event": "定时边界事件",
  "Timer Intermediate Catch Event": "中间定时捕获事件",
  "Timer Start Event (non-interrupting)": "定时启动事件 (非中断)",
  "Timer Start Event": "定时启动事件",
  Transaction: "事务",
  "User Task": "用户任务",
  "already rendered {element}": "{element} 已呈现",
  "diagram not part of bpmn:Definitions": "图表不是 bpmn:Definitions 的一部分",
  "element required": "需要元素",
  "element {element} referenced by {referenced}#{property} not yet drawn": "元素 {element} 的引用 {referenced}#{property} 尚未绘制",
  "failed to import {element}": "{element} 导入失败",
  "flow elements must be children of pools/participants": "元素必须是池/参与者的子级",
  "more than {count} child lanes": "超过 {count} 条通道",
  "no diagram to display": "没有要显示的图表",
  "no parent for {element} in {parent}": "在 {element} 中没有父元素 {parent}",
  "no process or collaboration to display": "没有可显示的流程或协作",
  "no shape type specified": "未指定形状类型",
  "out of bounds release": "越界释放"
};
const PropertiesPanel = {
  "Asynchronous Continuations": "异步延续",
  "Candidate starter": "候选发起人",
  create: "创建",
  "Create new list item": "创建新列表项",
  Documentation: "文档",
  General: "常规",
  "Execution listeners": "执行监听器",
  "Extension properties": "扩展属性",
  "External task": "外部任务",
  Forms: "表单",
  "History cleanup": "历史清理",
  Inputs: "输入",
  "Job execution": "调度执行",
  Outputs: "输出",
  Tasklist: "任务列表"
};
const translations = {
  ...BpmnJs,
  ...PropertiesPanel
};
function translate(template, replacements) {
  replacements = replacements || {};
  const resources = translations;
  template = resources[template] || template;
  return template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || "{" + key + "}";
  });
}
function useModelerCreator(containerHtmlId, panelHtmlId, type = "camunda") {
  const additionalModules = () => {
    const Modules = [];
    const TranslateModule = {
      translate: ["value", translate]
    };
    Modules.push(TranslateModule);
    Modules.push(TokenSimulation);
    Modules.push(BpmnPropertiesPanelModule);
    Modules.push(BpmnPropertiesProviderModule);
    Modules.push(CamundaPlatformPropertiesProviderModule);
    return Modules;
  };
  const moddleExtensions = () => {
    const Extensions = {};
    if (type === "camunda") {
      Extensions["camunda"] = camundaModdleDescriptors;
    }
    return Extensions;
  };
  const createBpmnModeler = () => {
    return new BpmnModeler({
      container: containerHtmlId,
      // 添加控制板
      propertiesPanel: {
        parent: panelHtmlId
      },
      keyboard: { bindTo: document },
      additionalModules: additionalModules(),
      moddleExtensions: moddleExtensions()
    });
  };
  return {
    createBpmnModeler
  };
}
function useModelerOperator(containerHtmlId, panelHtmlId, type = "camunda") {
  let bpmnModeler = {};
  const zoom = ref(1);
  ref(false);
  const { createBpmnModeler } = useModelerCreator(containerHtmlId, panelHtmlId, type);
  const getAction = (action) => {
    return bpmnModeler.get(action);
  };
  const getCanvas = () => {
    return getAction("canvas");
  };
  const getEventBus = () => {
    return getAction("eventBus");
  };
  const getToggleMode = () => {
    return getAction("toggleMode");
  };
  const getCommandStack = () => {
    return getAction("commandStack");
  };
  const getAlignElements = () => {
    return getAction("alignElements");
  };
  const getSelection = () => {
    return getAction("selection");
  };
  const importDiagram = async (diagram) => {
    try {
      const result = await bpmnModeler.importXML(diagram);
      const { warnings } = result;
    } catch (error2) {
      exception("Could not create BPMN 2.0 diagram!", error2);
    }
  };
  const createModelerListeners = () => {
    const EventBus = getEventBus();
    const EventTypes = [
      "diagram.init",
      "element.hover",
      "element.out",
      "element.click",
      "element.dblclick",
      "element.mousedown",
      "element.mouseup"
    ];
    EventTypes.forEach((action) => {
      EventBus.on(action, (event) => {
        action.replace(/\./g, "-");
        event ? event.element : null;
      });
    });
  };
  const init = (diagram) => {
    bpmnModeler = createBpmnModeler();
    createModelerListeners();
    importDiagram(diagram);
  };
  const destroy = () => {
    if (!lodash.isEmpty(bpmnModeler)) {
      bpmnModeler.destroy();
      bpmnModeler = {};
    }
  };
  const downloadProcess = async (type2, name = "diagram") => {
    try {
      if (type2 === "xml" || type2 === "bpmn") {
        const { xml } = await bpmnModeler.saveXML();
        const { href, filename } = downloadEncode(type2, name, xml);
        download(href, filename);
      } else {
        const { svg } = await bpmnModeler.saveSVG();
        const { href, filename } = downloadEncode("svg", name, svg);
        download(href, filename);
      }
    } catch (error2) {
      exception("Could not download diagram!", error2);
    }
  };
  const downloadAsXml = (name = "diagram") => {
    downloadProcess("xml", name);
  };
  const downloadAsBpmn = (name = "diagram") => {
    downloadProcess("bpmn", name);
  };
  const downloadAsSvg = (name = "diagram") => {
    downloadProcess("svg", name);
  };
  const undo = () => {
    return getCommandStack().undo();
  };
  const redo = () => {
    return getCommandStack().redo();
  };
  const zoomMinus = (step = 0.1) => {
    const newZoom = Math.floor(zoom.value * 100 - step * 100) / 100;
    zoom.value = newZoom;
    getCanvas().zoom(zoom.value);
  };
  const zoomPlus = (step = 0.1) => {
    const newZoom = Math.floor(zoom.value * 100 + step * 100) / 100;
    zoom.value = newZoom;
    getCanvas().zoom(zoom.value);
  };
  const zoomReset = () => {
    zoom.value = 1;
    getCanvas().zoom("fit-viewport", "auto");
  };
  const alignment = (align) => {
    const alignElements = getAlignElements();
    const selection = getSelection();
    const selectedElements = selection.get();
    if (!selectedElements || selectedElements.length <= 1) {
      toast.warning("请按住 Ctrl 键选择多个元素对齐");
      return;
    }
    standardDeleteNotify(() => {
      alignElements.trigger(selectedElements, align);
    });
  };
  const alignLeft = () => {
    alignment("left");
  };
  const alignRight = () => {
    alignment("right");
  };
  const alignTop = () => {
    alignment("top");
  };
  const alignBottom = () => {
    alignment("bottom");
  };
  const alignHorizontalCenter = () => {
    alignment("center");
  };
  const alignVerticalCenter = () => {
    alignment("middle");
  };
  const playSimulation = () => {
    getToggleMode().toggleMode();
  };
  return {
    init,
    destroy,
    importDiagram,
    downloadAsXml,
    downloadAsBpmn,
    downloadAsSvg,
    undo,
    redo,
    zoom,
    zoomMinus,
    zoomPlus,
    zoomReset,
    alignLeft,
    alignRight,
    alignTop,
    alignBottom,
    alignHorizontalCenter,
    alignVerticalCenter,
    playSimulation
  };
}
function useViewerCreator(containerHtmlId, height, highlightNodes) {
  let bpmnViewer = {};
  const createBpmnViewer = () => {
    return new BpmnViewer({
      container: containerHtmlId,
      height
    });
  };
  const importDiagram = async (diagram) => {
    await bpmnViewer.importXML(diagram);
    const canvas = bpmnViewer.get("canvas");
    canvas.zoom("fit-viewport", "auto");
    if (!lodash.isEmpty(highlightNodes)) {
      highlightNodes.forEach((item) => {
        canvas.addMarker(item, "highlight");
        const ele = document.querySelector(".highlight")?.querySelector(".djs-visual rect");
        if (ele) {
          ele.setAttribute("stroke-dasharray", "4,4");
        }
      });
    }
  };
  const init = (diagram) => {
    bpmnViewer = createBpmnViewer();
    importDiagram(diagram);
  };
  const destroy = () => {
    if (!lodash.isEmpty(bpmnViewer)) {
      bpmnViewer.destroy();
      bpmnViewer = {};
    }
  };
  return {
    init,
    destroy
  };
}
const _sfc_main$1 = defineComponent({
  name: "HBpmnDesigner",
  props: {
    diagram: { type: String, default: "" },
    type: { type: String, default: "camunda" },
    service: { type: Object, required: true },
    height: { type: String, default: "90vh" }
  },
  setup(props) {
    const openedDiagram = ref("");
    const {
      init,
      destroy,
      importDiagram,
      downloadAsXml,
      downloadAsBpmn,
      downloadAsSvg,
      undo,
      redo,
      zoom,
      zoomPlus,
      zoomMinus,
      zoomReset,
      alignLeft,
      alignRight,
      alignTop,
      alignBottom,
      alignHorizontalCenter,
      alignVerticalCenter,
      playSimulation
    } = useModelerOperator("#bpmn-canvas", "#bpmn-properties-panel", props.type);
    onBeforeUnmount(() => {
      destroy();
    });
    onMounted(() => {
      try {
        init(DefaultDiagram);
      } catch (error2) {
      }
    });
    watch(openedDiagram, (newValue) => {
      importDiagram(newValue);
    });
    const onReset = () => {
      importDiagram(DefaultDiagram);
    };
    const onSave = (data) => {
      props.service.create(data).then((response) => {
        toast.success("模型部署成功!");
      }).catch((error2) => {
        toast.error("模型部署失败!");
      });
    };
    return {
      openedDiagram,
      onReset,
      importDiagram,
      downloadAsXml,
      downloadAsBpmn,
      downloadAsSvg,
      undo,
      redo,
      zoom,
      zoomPlus,
      zoomMinus,
      zoomReset,
      alignLeft,
      alignRight,
      alignTop,
      alignBottom,
      alignHorizontalCenter,
      alignVerticalCenter,
      playSimulation,
      onSave
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_bpmn_designer_toolbar = __unplugin_components_0;
  const _component_h_column = resolveComponent("h-column");
  const _component_h_row = resolveComponent("h-row");
  const _component_q_card = QCard;
  return openBlock(), createBlock(_component_q_card, null, {
    default: withCtx(() => [
      createVNode(_component_h_row, {
        style: normalizeStyle(`height: ${_ctx.height}`)
      }, {
        default: withCtx(() => [
          createVNode(_component_h_column, { cols: 10 }, {
            default: withCtx(() => [
              createVNode(_component_h_bpmn_designer_toolbar, {
                file: _ctx.openedDiagram,
                "onUpdate:file": _cache[0] || (_cache[0] = ($event) => _ctx.openedDiagram = $event),
                zoom: _ctx.zoom,
                onDownloadXml: _cache[1] || (_cache[1] = ($event) => _ctx.downloadAsXml()),
                onDownloadSvg: _cache[2] || (_cache[2] = ($event) => _ctx.downloadAsSvg()),
                onDownloadBpmn: _cache[3] || (_cache[3] = ($event) => _ctx.downloadAsBpmn()),
                onAlignRight: _cache[4] || (_cache[4] = ($event) => _ctx.alignRight()),
                onAlignLeft: _cache[5] || (_cache[5] = ($event) => _ctx.alignLeft()),
                onAlignTop: _cache[6] || (_cache[6] = ($event) => _ctx.alignTop()),
                onAlignBottom: _cache[7] || (_cache[7] = ($event) => _ctx.alignBottom()),
                onAlignHorizontalCenter: _cache[8] || (_cache[8] = ($event) => _ctx.alignHorizontalCenter()),
                onAlignVerticalCenter: _cache[9] || (_cache[9] = ($event) => _ctx.alignVerticalCenter()),
                onZoomPlus: _cache[10] || (_cache[10] = ($event) => _ctx.zoomPlus()),
                onZoomMinus: _cache[11] || (_cache[11] = ($event) => _ctx.zoomMinus()),
                onZoomReset: _cache[12] || (_cache[12] = ($event) => _ctx.zoomReset()),
                onRedo: _cache[13] || (_cache[13] = ($event) => _ctx.redo()),
                onUndo: _cache[14] || (_cache[14] = ($event) => _ctx.undo()),
                onRefresh: _cache[15] || (_cache[15] = ($event) => _ctx.onReset()),
                onSimulation: _cache[16] || (_cache[16] = ($event) => _ctx.playSimulation()),
                onSave: _ctx.onSave
              }, null, 8, ["file", "zoom", "onSave"]),
              _cache[17] || (_cache[17] = createElementVNode("div", { class: "bpmn-container full-height" }, [
                createElementVNode("div", {
                  id: "bpmn-canvas",
                  class: "bpmn-canvas"
                })
              ], -1))
            ]),
            _: 1
          }),
          createVNode(_component_h_column, { cols: 2 }, {
            default: withCtx(() => [..._cache[18] || (_cache[18] = [
              createElementVNode("div", {
                id: "bpmn-properties-panel",
                class: "full-height"
              }, null, -1)
            ])]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["style"])
    ]),
    _: 1
  });
}
const HBpmnDesigner = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  name: "HBpmnViewer",
  props: {
    diagram: { type: String, default: "" },
    nodes: { type: Array, default: () => [] },
    height: { type: [String, Number], default: "500px" }
  },
  setup(props) {
    const { init, destroy } = useViewerCreator("#bpmn-viewer", props.height, props.nodes);
    onBeforeUnmount(() => {
      destroy();
    });
    onMounted(() => {
      try {
        init(props.diagram);
      } catch (error2) {
      }
    });
    return {};
  }
});
const _hoisted_1 = {
  id: "bpmn-viewer",
  class: "bpmn-viewer-canvas"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1);
}
const HBpmnViewer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
HBpmnDesigner.install = (app) => {
  app.component(HBpmnDesigner.name, HBpmnDesigner);
};
HBpmnViewer.install = (app) => {
  app.component(HBpmnViewer.name, HBpmnViewer);
};
const components = [HBpmnDesigner, HBpmnViewer];
const install = (app) => {
  components.map((component) => app.component(component.name, component));
};
const index = { install };
export {
  DeploymentService,
  Swal,
  translate as Translator,
  index as default,
  download,
  downloadEncode,
  error,
  exception,
  lodash2 as lodash,
  log,
  standardDeleteNotify2 as standardDeleteNotify,
  toast2 as toast
};
