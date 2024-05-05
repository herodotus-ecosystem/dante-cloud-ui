import { QInput, QList, QSpace, QBtn, QCardSection, QCardActions, QCard, QDialog, QPage, QPageContainer, QExpansionItem, QPopupEdit, QTd, QTr, QTable, QTab, QTabs, QSeparator, QTabPanel, QTabPanels, QIcon, QToolbarTitle, QToolbar, QHeader, QDrawer, QLayout } from "quasar";
import { defineComponent, ref, openBlock, createBlock, withCtx, createVNode, computed, createElementVNode, renderSlot, mergeProps, resolveComponent, normalizeClass, createCommentVNode, createSlots, pushScopeId, popScopeId, createTextVNode, toDisplayString, resolveDynamicComponent, createElementBlock, Fragment, renderList, watch, onUnmounted, normalizeStyle } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { lodash, toast, Swal } from "@herodotus/core";
import { Swal as Swal2, lodash as lodash2, toast as toast2 } from "@herodotus/core";
import { HRendererForm, HRendererEngine, WIDGET_DEFINITIONS, ElementUtils } from "@herodotus/form-engine";
import { ElementUtils as ElementUtils2, WIDGET_DEFINITIONS as WIDGET_DEFINITIONS2 } from "@herodotus/form-engine";
import { HTextField, HSwitch } from "@herodotus/components";
import Draggable from "vuedraggable";
const Attributes = {
  HideBottomSpace: "hide-bottom-space",
  ItemAligned: "item-aligned"
};
const useFormCanvasStore = defineStore("FormDesignerCanvas", {
  state: () => {
    return {
      isClosed: false,
      canvasElements: [],
      sheet: {},
      selectedElement: {},
      id: "",
      name: "",
      activityName: ""
    };
  },
  getters: {
    isSelected(state) {
      return (id) => {
        if (!lodash.isEmpty(state.selectedElement)) {
          if (state.selectedElement.id) {
            return state.selectedElement.config.renderKey === id;
          }
        }
        return false;
      };
    },
    isEmptyCanvas: (state) => lodash.isEmpty(state.canvasElements),
    getElements: (state) => state.canvasElements,
    currentSchema() {
      return !lodash.isEmpty(this.selectedElement) && !lodash.isEmpty(this.selectedElement.schema) ? this.selectedElement.schema : {};
    },
    currentConfig() {
      return !lodash.isEmpty(this.selectedElement) && !lodash.isEmpty(this.selectedElement.config) ? this.selectedElement.config : {};
    },
    currentPanel() {
      return !lodash.isEmpty(this.currentConfig) && !lodash.isEmpty(this.currentConfig.panel) ? this.currentConfig.panel : "INFORMATION_PANEL";
    },
    isInformationPanel() {
      return this.currentPanel === "INFORMATION_PANEL";
    },
    condition() {
      if (lodash.isEmpty(this.sheet.condition)) {
        this.sheet["condition"] = { variable: "", options: [] };
      }
      return this.sheet.condition;
    }
  },
  actions: {
    selectElement(element) {
      this.selectedElement = element;
    },
    selectFirstElement() {
      if (!lodash.isEmpty(this.canvasElements)) {
        this.selectElement(this.canvasElements[0]);
      }
    },
    loading(entity) {
      if (!lodash.isEmpty(entity.modeler)) {
        this.canvasElements = entity.modeler.elements;
        this.sheet = entity.modeler.sheet;
      }
      this.id = entity.id;
      this.name = entity.name;
      this.activityName = entity.activityName;
      this.selectFirstElement();
    },
    compose() {
      return {
        id: this.id,
        name: this.name,
        activityName: this.activityName,
        modeler: { elements: this.canvasElements, sheet: this.sheet }
      };
    },
    addElement(element) {
      if (typeof this.canvasElements === "undefined") {
        this.canvasElements = [];
      }
      this.canvasElements.push(element);
      this.selectElement(element);
    },
    removeElement(element) {
      if (!lodash.isEmpty(this.canvasElements) && element.id) {
        lodash.remove(this.canvasElements, (item) => {
          return item.id === element.id;
        });
        this.selectFirstElement();
      }
    }
  }
});
const useFormResourceStore = defineStore("FormDesignerResources", {
  state: () => ({
    resources: {}
  }),
  getters: {
    dynamicForm: (state) => state.resources.dynamicForm()
  },
  actions: {
    init(instance) {
      this.resources = instance;
    }
  }
});
const _sfc_main$g = defineComponent({
  name: "HFormInformation",
  setup(props, { emit }) {
    const store = useFormCanvasStore();
    const { id, name, activityName } = store;
    const nameRef = ref(null);
    const activityNameRef = ref(null);
    const validate = () => {
      const nameElement = nameRef.value;
      const activityNameElement = activityNameRef.value;
      nameElement.validate();
      activityNameElement.validate();
      return !nameElement.hasError && !activityNameElement.hasError;
    };
    return {
      id,
      name,
      activityName,
      nameRef,
      activityNameRef,
      validate
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
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_input = QInput;
  const _component_q_list = QList;
  return openBlock(), createBlock(_component_q_list, null, {
    default: withCtx(() => [
      createVNode(_component_q_input, {
        modelValue: _ctx.id,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.id = $event),
        dense: "",
        outlined: "",
        label: "ID"
      }, null, 8, ["modelValue"]),
      createVNode(_component_q_input, {
        ref: "nameRef",
        modelValue: _ctx.name,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.name = $event),
        dense: "",
        outlined: "",
        label: "表单名称",
        rules: [(val) => !!val || "表单名称不能为空"]
      }, null, 8, ["modelValue", "rules"]),
      createVNode(_component_q_input, {
        ref: "activityNameRef",
        modelValue: _ctx.activityName,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.activityName = $event),
        dense: "",
        outlined: "",
        label: "流程节点名称",
        rules: [(val) => !!val || "流程节点不能为空"]
      }, null, 8, ["modelValue", "rules"])
    ]),
    _: 1
  });
}
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
const _sfc_main$f = defineComponent({
  name: "HFormUploadDialog",
  components: {
    HFormInformation: __unplugin_components_3
  },
  props: {
    modelValue: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:open", "save"],
  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    const infoRef = ref(null);
    const resource = useFormResourceStore();
    const canvas = useFormCanvasStore();
    const showComfirm = () => {
      Swal.fire({
        title: "保存成功！",
        text: "您是否需要关闭设计器？",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "确定!",
        cancelButtonText: "取消",
        showClass: {
          popup: "animate__animated animate__fadeIn"
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut"
        }
      }).then((confirm) => {
        if (confirm.value) {
          canvas.isClosed = true;
        }
      });
    };
    const onSave = () => {
      if (infoRef.value) {
        const isValid = infoRef.value.validate();
        if (isValid) {
          const entity = canvas.compose();
          resource.dynamicForm.saveOrUpdate(entity).then((result) => {
            isOpen.value = false;
            showComfirm();
          }).catch((error) => {
            isOpen.value = false;
            toast.error("保存失败！");
          });
        }
      }
    };
    return {
      isOpen,
      onSave,
      infoRef
    };
  }
});
const _hoisted_1$8 = /* @__PURE__ */ createElementVNode("div", { class: "text-h6" }, "上传表单", -1);
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_space = QSpace;
  const _component_q_btn = QBtn;
  const _component_q_card_section = QCardSection;
  const _component_h_form_information = __unplugin_components_3;
  const _component_q_card_actions = QCardActions;
  const _component_q_card = QCard;
  const _component_q_dialog = QDialog;
  return openBlock(), createBlock(_component_q_dialog, {
    modelValue: _ctx.isOpen,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.isOpen = $event),
    persistent: "",
    "transition-show": "scale",
    "transition-hide": "scale"
  }, {
    default: withCtx(() => [
      createVNode(_component_q_card, { style: { "width": "20vw" } }, {
        default: withCtx(() => [
          createVNode(_component_q_card_section, { class: "row items-center q-pb-none" }, {
            default: withCtx(() => [
              _hoisted_1$8,
              createVNode(_component_q_space),
              createVNode(_component_q_btn, {
                icon: "close",
                flat: "",
                round: "",
                dense: "",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.isOpen = false)
              })
            ]),
            _: 1
          }),
          createVNode(_component_q_card_section, null, {
            default: withCtx(() => [
              createVNode(_component_h_form_information, { ref: "infoRef" }, null, 512)
            ]),
            _: 1
          }),
          createVNode(_component_q_card_actions, { align: "right" }, {
            default: withCtx(() => [
              createVNode(_component_q_btn, {
                label: "取消",
                color: "red",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.isOpen = false)
              }),
              createVNode(_component_q_btn, {
                label: "保存",
                color: "primary",
                onClick: _cache[2] || (_cache[2] = ($event) => _ctx.onSave())
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
const __unplugin_components_9 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
const _sfc_main$e = defineComponent({
  name: "HCanvasLayout"
});
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_card = QCard;
  const _component_q_page = QPage;
  const _component_q_page_container = QPageContainer;
  return openBlock(), createBlock(_component_q_page_container, null, {
    default: withCtx(() => [
      createVNode(_component_q_page, null, {
        default: withCtx(() => [
          createVNode(_component_q_card, { class: "q-ma-md" }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
const _sfc_main$d = defineComponent({
  name: "HExpansionItem",
  props: {
    headerClass: { type: String, default: "text-primary" }
  }
});
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_card_section = QCardSection;
  const _component_q_card = QCard;
  const _component_q_expansion_item = QExpansionItem;
  return openBlock(), createBlock(_component_q_expansion_item, mergeProps({
    "expand-separator": "",
    "header-class": _ctx.headerClass
  }, _ctx.$attrs), {
    default: withCtx(() => [
      createVNode(_component_q_card, null, {
        default: withCtx(() => [
          createVNode(_component_q_card_section, null, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["header-class"]);
}
const __unplugin_components_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
const _sfc_main$c = defineComponent({
  name: "HFormPreviewDialog",
  components: {
    HRendererForm
  },
  props: {
    modelValue: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const store = useFormCanvasStore();
    const { canvasElements } = store;
    const isOpen = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    const onClose = () => {
      isOpen.value = false;
    };
    const state = ref({});
    return {
      isOpen,
      state,
      canvasElements,
      onClose
    };
  }
});
const _hoisted_1$7 = /* @__PURE__ */ createElementVNode("div", { class: "text-h6" }, "预览", -1);
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_space = QSpace;
  const _component_q_btn = QBtn;
  const _component_q_card_section = QCardSection;
  const _component_h_renderer_form = resolveComponent("h-renderer-form");
  const _component_q_card_actions = QCardActions;
  const _component_q_card = QCard;
  const _component_q_dialog = QDialog;
  return openBlock(), createBlock(_component_q_dialog, {
    modelValue: _ctx.isOpen,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.isOpen = $event),
    persistent: "",
    "transition-show": "scale",
    "transition-hide": "scale"
  }, {
    default: withCtx(() => [
      createVNode(_component_q_card, null, {
        default: withCtx(() => [
          createVNode(_component_q_card_section, { class: "row items-center q-pb-none" }, {
            default: withCtx(() => [
              _hoisted_1$7,
              createVNode(_component_q_space),
              createVNode(_component_q_btn, {
                icon: "close",
                flat: "",
                round: "",
                dense: "",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onClose())
              })
            ]),
            _: 1
          }),
          createVNode(_component_q_card_section, null, {
            default: withCtx(() => [
              createVNode(_component_h_renderer_form, {
                modelValue: _ctx.state,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.state = $event),
                elements: _ctx.canvasElements
              }, null, 8, ["modelValue", "elements"])
            ]),
            _: 1
          }),
          createVNode(_component_q_card_actions, {
            align: "right",
            class: "bg-white text-red"
          }, {
            default: withCtx(() => [
              createVNode(_component_q_btn, {
                flat: "",
                label: "确定",
                onClick: _cache[2] || (_cache[2] = ($event) => _ctx.onClose())
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
const __unplugin_components_8 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
const _sfc_main$b = defineComponent({
  name: "HCanvasElement",
  components: {
    HRendererEngine
  },
  props: {
    element: { type: Object, required: true },
    selectedId: { type: Number, required: true }
  },
  setup(props) {
    const isHover = ref(false);
    const store = useFormCanvasStore();
    const schemas = computed(() => {
      return [props.element.schema];
    });
    const isSelected = computed(() => {
      return store.isSelected(props.selectedId);
    });
    const onDelete = () => {
      store.removeElement(props.element);
    };
    return {
      isHover,
      schemas,
      isSelected,
      onDelete
    };
  }
});
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_renderer_engine = resolveComponent("h-renderer-engine");
  const _component_q_btn = QBtn;
  const _component_q_card_actions = QCardActions;
  const _component_q_card = QCard;
  return openBlock(), createBlock(_component_q_card, {
    class: normalizeClass([_ctx.isSelected && !_ctx.isHover ? "canvas-item-selected" : "canvas-item"]),
    onMouseover: _cache[0] || (_cache[0] = ($event) => _ctx.isHover = true),
    onMouseleave: _cache[1] || (_cache[1] = ($event) => _ctx.isHover = false)
  }, {
    default: withCtx(() => [
      createVNode(_component_h_renderer_engine, { schemas: _ctx.schemas }, null, 8, ["schemas"]),
      _ctx.isHover ? (openBlock(), createBlock(_component_q_card_actions, {
        key: 0,
        class: "justify-end q-pa-none"
      }, {
        default: withCtx(() => [
          createVNode(_component_q_btn, {
            flat: "",
            round: "",
            size: "sm",
            color: "red",
            icon: "mdi-delete",
            onClick: _ctx.onDelete
          }, null, 8, ["onClick"]),
          createVNode(_component_q_btn, {
            flat: "",
            round: "",
            size: "sm",
            color: "accent",
            icon: "bookmark"
          }),
          createVNode(_component_q_btn, {
            flat: "",
            round: "",
            size: "sm",
            color: "primary",
            icon: "share"
          })
        ]),
        _: 1
      })) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["class"]);
}
const __unplugin_components_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-c2ab7fab"]]);
const _sfc_main$a = defineComponent({
  name: "HCanvasContainer",
  components: {
    Draggable,
    HCanvasElement: __unplugin_components_0$1,
    HCanvasLayout: __unplugin_components_1
  },
  setup(props) {
    const store = useFormCanvasStore();
    const { canvasElements } = store;
    const isEmptyCanvas = computed(() => {
      return store.isEmptyCanvas;
    });
    const onSelectedItem = (element) => {
      store.selectElement(element);
    };
    return {
      isEmptyCanvas,
      canvasElements,
      onSelectedItem
    };
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-54c2f724"), n = n(), popScopeId(), n);
const _hoisted_1$6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "row text-center canvas-container" }, [
  /* @__PURE__ */ createElementVNode("div", { class: "col-12 self-center text-h6 text-weight-medium text-grey-5" }, "从左侧拖拽或点击来添加字段")
], -1));
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_canvas_element = __unplugin_components_0$1;
  const _component_draggable = resolveComponent("draggable");
  const _component_h_canvas_layout = __unplugin_components_1;
  return openBlock(), createBlock(_component_h_canvas_layout, null, {
    default: withCtx(() => [
      createVNode(_component_draggable, {
        "item-key": "id",
        list: _ctx.canvasElements,
        animation: 300,
        group: "widgetGroup",
        class: "canvas-container"
      }, createSlots({
        item: withCtx(({ element }) => [
          (openBlock(), createBlock(_component_h_canvas_element, {
            element,
            key: element.config.renderKey,
            "selected-id": element.config.renderKey,
            onClick: ($event) => _ctx.onSelectedItem(element)
          }, null, 8, ["element", "selected-id", "onClick"]))
        ]),
        _: 2
      }, [
        _ctx.isEmptyCanvas ? {
          name: "footer",
          fn: withCtx(() => [
            _hoisted_1$6
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["list"])
    ]),
    _: 1
  });
}
const __unplugin_components_7$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-54c2f724"]]);
const _sfc_main$9 = defineComponent({
  name: "HConditionVariable",
  components: {
    HExpansionItem: __unplugin_components_0$2,
    HTextField
  },
  setup(props) {
    const store = useFormCanvasStore();
    const { condition } = store;
    const tableColumns = [
      { align: "center", name: "label", field: "calories", label: "标签" },
      { align: "center", name: "value", field: "fat", label: "值" }
    ];
    const tableRows = ref([
      { label: "option1", value: true },
      { label: "option2", value: false }
    ]);
    const onModify = () => {
      condition.options = tableRows.value;
    };
    return {
      tableColumns,
      tableRows,
      condition,
      onModify
    };
  }
});
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_text_field = resolveComponent("h-text-field");
  const _component_q_input = QInput;
  const _component_q_popup_edit = QPopupEdit;
  const _component_q_td = QTd;
  const _component_q_tr = QTr;
  const _component_q_table = QTable;
  const _component_h_expansion_item = __unplugin_components_0$2;
  return openBlock(), createBlock(_component_h_expansion_item, {
    icon: "mdi-variable",
    label: "流程变量"
  }, {
    default: withCtx(() => [
      createVNode(_component_h_text_field, {
        modelValue: _ctx.condition.variable,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.condition.variable = $event),
        dense: "",
        label: "变量名称"
      }, null, 8, ["modelValue"]),
      createVNode(_component_q_table, {
        rows: _ctx.tableRows,
        columns: _ctx.tableColumns,
        "row-key": "name",
        dense: "",
        flat: "",
        bordered: "",
        "hide-pagination": "",
        "card-container-class": "q-ml-2"
      }, {
        body: withCtx((props) => [
          createVNode(_component_q_tr, { props }, {
            default: withCtx(() => [
              createVNode(_component_q_td, {
                key: "label",
                props
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(props.row.label) + " ", 1),
                  createVNode(_component_q_popup_edit, {
                    modelValue: props.row.label,
                    "onUpdate:modelValue": [($event) => props.row.label = $event, _ctx.onModify],
                    title: "修改标签",
                    buttons: "",
                    "label-set": "确定",
                    "label-cancel": "取消"
                  }, {
                    default: withCtx((scope) => [
                      createVNode(_component_q_input, {
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        autofocus: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1032, ["props"]),
              createVNode(_component_q_td, {
                key: "value",
                props
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(props.row.value), 1)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        _: 1
      }, 8, ["rows", "columns"])
    ]),
    _: 1
  });
}
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const _sfc_main$8 = defineComponent({
  name: "HSheetPanel",
  components: {
    HConditionVariable: __unplugin_components_0
  }
});
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_condition_variable = __unplugin_components_0;
  const _component_q_list = QList;
  return openBlock(), createBlock(_component_q_list, { bordered: "" }, {
    default: withCtx(() => [
      createVNode(_component_h_condition_variable)
    ]),
    _: 1
  });
}
const __unplugin_components_7 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
const _sfc_main$7 = defineComponent({
  name: "HDatePanel",
  components: {
    HExpansionItem: __unplugin_components_0$2,
    HSwitch,
    HTextField
  },
  props: {
    schema: { type: Object, required: true }
  },
  setup(props) {
    const ATTRIBUTES = Attributes;
    const properties = computed(() => {
      return props.schema.attrs;
    });
    const models = computed(() => {
      return props.schema.models;
    });
    return {
      ATTRIBUTES,
      properties,
      models
    };
  }
});
const _hoisted_1$5 = { class: "q-gutter-y-sm column" };
const _hoisted_2$5 = { class: "q-gutter-y-sm column" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_text_field = resolveComponent("h-text-field");
  const _component_h_expansion_item = __unplugin_components_0$2;
  const _component_h_switch = resolveComponent("h-switch");
  const _component_q_list = QList;
  return openBlock(), createBlock(_component_q_list, { bordered: "" }, {
    default: withCtx(() => [
      createVNode(_component_h_expansion_item, {
        icon: "mdi-information",
        label: "常规",
        "default-opened": ""
      }, {
        default: withCtx(() => [
          createVNode(_component_h_text_field, {
            modelValue: _ctx.models.modelValue.name,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models.modelValue.name = $event),
            dense: "",
            label: "名称"
          }, null, 8, ["modelValue"]),
          createVNode(_component_h_text_field, {
            modelValue: _ctx.properties.label,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.properties.label = $event),
            dense: "",
            label: "Label"
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-eject-circle",
        label: "状态"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$5, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.disable,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.properties.disable = $event),
              label: "Disable"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.readonly,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.properties.readonly = $event),
              label: "Readonly"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-image-edit",
        label: "外观"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$5, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dark,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.properties.dark = $event),
              label: "Dark"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.filled,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.properties.filled = $event),
              label: "Filled"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.outlined,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.properties.outlined = $event),
              label: "Outlined"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.borderless,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.properties.borderless = $event),
              label: "Borderless"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.standout,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.properties.standout = $event),
              label: "Standout"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace],
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace] = $event),
              label: "Hide Bottom Space"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.rounded,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.properties.rounded = $event),
              label: "Rounded"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.square,
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.properties.square = $event),
              label: "Square"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dense,
              "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => _ctx.properties.dense = $event),
              label: "Dense"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.ItemAligned],
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.ItemAligned] = $event),
              label: "Item Aligned"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const HDatePanel = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const _sfc_main$6 = defineComponent({
  name: "HPasswordPanel",
  components: {
    HExpansionItem: __unplugin_components_0$2,
    HSwitch,
    HTextField
  },
  props: {
    schema: { type: Object, required: true }
  },
  setup(props) {
    const ATTRIBUTES = Attributes;
    const properties = computed(() => {
      return props.schema.attrs;
    });
    const models = computed(() => {
      return props.schema.models;
    });
    return {
      ATTRIBUTES,
      properties,
      models
    };
  }
});
const _hoisted_1$4 = { class: "q-gutter-y-sm column" };
const _hoisted_2$4 = { class: "q-gutter-y-sm column" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_text_field = resolveComponent("h-text-field");
  const _component_h_expansion_item = __unplugin_components_0$2;
  const _component_h_switch = resolveComponent("h-switch");
  const _component_q_list = QList;
  return openBlock(), createBlock(_component_q_list, { bordered: "" }, {
    default: withCtx(() => [
      createVNode(_component_h_expansion_item, {
        icon: "mdi-information",
        label: "常规",
        "default-opened": ""
      }, {
        default: withCtx(() => [
          createVNode(_component_h_text_field, {
            modelValue: _ctx.models.modelValue.name,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models.modelValue.name = $event),
            dense: "",
            label: "名称"
          }, null, 8, ["modelValue"]),
          createVNode(_component_h_text_field, {
            modelValue: _ctx.properties.label,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.properties.label = $event),
            dense: "",
            label: "Label"
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-eject-circle",
        label: "状态"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$4, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.disable,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.properties.disable = $event),
              label: "Disable"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.readonly,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.properties.readonly = $event),
              label: "Readonly"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-image-edit",
        label: "外观"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$4, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dark,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.properties.dark = $event),
              label: "Dark"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.filled,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.properties.filled = $event),
              label: "Filled"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.outlined,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.properties.outlined = $event),
              label: "Outlined"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.borderless,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.properties.borderless = $event),
              label: "Borderless"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.standout,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.properties.standout = $event),
              label: "Standout"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace],
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace] = $event),
              label: "Hide Bottom Space"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.rounded,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.properties.rounded = $event),
              label: "Rounded"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.square,
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.properties.square = $event),
              label: "Square"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dense,
              "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => _ctx.properties.dense = $event),
              label: "Dense"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.ItemAligned],
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.ItemAligned] = $event),
              label: "Item Aligned"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const HPasswordPanel = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const _sfc_main$5 = defineComponent({
  name: "HTextareaPanel",
  components: {
    HExpansionItem: __unplugin_components_0$2,
    HSwitch,
    HTextField
  },
  props: {
    schema: { type: Object, required: true }
  },
  setup(props) {
    const ATTRIBUTES = Attributes;
    const properties = computed(() => {
      return props.schema.attrs;
    });
    const models = computed(() => {
      return props.schema.models;
    });
    return {
      ATTRIBUTES,
      properties,
      models
    };
  }
});
const _hoisted_1$3 = { class: "q-gutter-y-sm column" };
const _hoisted_2$3 = { class: "q-gutter-y-sm column" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_text_field = resolveComponent("h-text-field");
  const _component_h_expansion_item = __unplugin_components_0$2;
  const _component_h_switch = resolveComponent("h-switch");
  const _component_q_list = QList;
  return openBlock(), createBlock(_component_q_list, { bordered: "" }, {
    default: withCtx(() => [
      createVNode(_component_h_expansion_item, {
        icon: "mdi-information",
        label: "常规",
        "default-opened": ""
      }, {
        default: withCtx(() => [
          createVNode(_component_h_text_field, {
            modelValue: _ctx.models.modelValue.name,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models.modelValue.name = $event),
            dense: "",
            label: "名称"
          }, null, 8, ["modelValue"]),
          createVNode(_component_h_text_field, {
            modelValue: _ctx.properties.label,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.properties.label = $event),
            dense: "",
            label: "Label"
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-eject-circle",
        label: "状态"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$3, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.disable,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.properties.disable = $event),
              label: "Disable"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.readonly,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.properties.readonly = $event),
              label: "Readonly"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-image-edit",
        label: "外观"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$3, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dark,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.properties.dark = $event),
              label: "Dark"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.filled,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.properties.filled = $event),
              label: "Filled"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.outlined,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.properties.outlined = $event),
              label: "Outlined"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.borderless,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.properties.borderless = $event),
              label: "Borderless"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.standout,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.properties.standout = $event),
              label: "Standout"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace],
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace] = $event),
              label: "Hide Bottom Space"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.rounded,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.properties.rounded = $event),
              label: "Rounded"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.square,
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.properties.square = $event),
              label: "Square"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dense,
              "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => _ctx.properties.dense = $event),
              label: "Dense"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.ItemAligned],
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.ItemAligned] = $event),
              label: "Item Aligned"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const HTextareaPanel = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = defineComponent({
  name: "HTextFieldPanel",
  components: {
    HExpansionItem: __unplugin_components_0$2,
    HSwitch,
    HTextField
  },
  props: {
    schema: { type: Object, required: true }
  },
  setup(props) {
    const ATTRIBUTES = Attributes;
    const properties = computed(() => {
      return props.schema.attrs;
    });
    const models = computed(() => {
      return props.schema.models;
    });
    return {
      ATTRIBUTES,
      properties,
      models
    };
  }
});
const _hoisted_1$2 = { class: "q-gutter-y-sm column" };
const _hoisted_2$2 = { class: "q-gutter-y-sm column" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_text_field = resolveComponent("h-text-field");
  const _component_h_expansion_item = __unplugin_components_0$2;
  const _component_h_switch = resolveComponent("h-switch");
  const _component_q_list = QList;
  return openBlock(), createBlock(_component_q_list, { bordered: "" }, {
    default: withCtx(() => [
      createVNode(_component_h_expansion_item, {
        icon: "mdi-information",
        label: "常规",
        "default-opened": ""
      }, {
        default: withCtx(() => [
          createVNode(_component_h_text_field, {
            modelValue: _ctx.models.modelValue.name,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models.modelValue.name = $event),
            dense: "",
            label: "名称"
          }, null, 8, ["modelValue"]),
          createVNode(_component_h_text_field, {
            modelValue: _ctx.properties.label,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.properties.label = $event),
            dense: "",
            label: "Label"
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-eject-circle",
        label: "状态"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$2, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.disable,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.properties.disable = $event),
              label: "Disable"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.readonly,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.properties.readonly = $event),
              label: "Readonly"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-image-edit",
        label: "外观"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$2, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dark,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.properties.dark = $event),
              label: "Dark"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.filled,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.properties.filled = $event),
              label: "Filled"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.outlined,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.properties.outlined = $event),
              label: "Outlined"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.borderless,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.properties.borderless = $event),
              label: "Borderless"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.standout,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.properties.standout = $event),
              label: "Standout"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace],
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace] = $event),
              label: "Hide Bottom Space"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.rounded,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.properties.rounded = $event),
              label: "Rounded"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.square,
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.properties.square = $event),
              label: "Square"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dense,
              "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => _ctx.properties.dense = $event),
              label: "Dense"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.ItemAligned],
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.ItemAligned] = $event),
              label: "Item Aligned"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const HTextFieldPanel = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = defineComponent({
  name: "HTimePanel",
  components: {
    HExpansionItem: __unplugin_components_0$2,
    HSwitch,
    HTextField
  },
  props: {
    schema: { type: Object, required: true }
  },
  setup(props) {
    const ATTRIBUTES = Attributes;
    const properties = computed(() => {
      return props.schema.attrs;
    });
    const models = computed(() => {
      return props.schema.models;
    });
    return {
      ATTRIBUTES,
      properties,
      models
    };
  }
});
const _hoisted_1$1 = { class: "q-gutter-y-sm column" };
const _hoisted_2$1 = { class: "q-gutter-y-sm column" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_text_field = resolveComponent("h-text-field");
  const _component_h_expansion_item = __unplugin_components_0$2;
  const _component_h_switch = resolveComponent("h-switch");
  const _component_q_list = QList;
  return openBlock(), createBlock(_component_q_list, { bordered: "" }, {
    default: withCtx(() => [
      createVNode(_component_h_expansion_item, {
        icon: "mdi-information",
        label: "常规",
        "default-opened": ""
      }, {
        default: withCtx(() => [
          createVNode(_component_h_text_field, {
            modelValue: _ctx.models.modelValue.name,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.models.modelValue.name = $event),
            dense: "",
            label: "名称"
          }, null, 8, ["modelValue"]),
          createVNode(_component_h_text_field, {
            modelValue: _ctx.properties.label,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.properties.label = $event),
            dense: "",
            label: "Label"
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-eject-circle",
        label: "状态"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$1, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.disable,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.properties.disable = $event),
              label: "Disable"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.readonly,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.properties.readonly = $event),
              label: "Readonly"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      }),
      createVNode(_component_h_expansion_item, {
        icon: "mdi-image-edit",
        label: "外观"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$1, [
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dark,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.properties.dark = $event),
              label: "Dark"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.filled,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.properties.filled = $event),
              label: "Filled"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.outlined,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.properties.outlined = $event),
              label: "Outlined"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.borderless,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.properties.borderless = $event),
              label: "Borderless"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.standout,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.properties.standout = $event),
              label: "Standout"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace],
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.HideBottomSpace] = $event),
              label: "Hide Bottom Space"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.rounded,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.properties.rounded = $event),
              label: "Rounded"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.square,
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.properties.square = $event),
              label: "Square"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties.dense,
              "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => _ctx.properties.dense = $event),
              label: "Dense"
            }, null, 8, ["modelValue"]),
            createVNode(_component_h_switch, {
              modelValue: _ctx.properties[_ctx.ATTRIBUTES.ItemAligned],
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => _ctx.properties[_ctx.ATTRIBUTES.ItemAligned] = $event),
              label: "Item Aligned"
            }, null, 8, ["modelValue"])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const HTimePanel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  name: "HGeneratorLayout",
  components: {
    HSheetPanel: __unplugin_components_7,
    HFormInformation: __unplugin_components_3,
    DATE_PICKER: HDatePanel,
    PASSWORD: HPasswordPanel,
    TEXT_AREA: HTextareaPanel,
    TEXT_FIELD: HTextFieldPanel,
    TIME_PICKER: HTimePanel
  },
  setup() {
    const store = useFormCanvasStore();
    const { isInformationPanel, currentSchema, currentPanel } = storeToRefs(store);
    const formTab = ref("info");
    const elementTab = ref("display");
    return {
      formTab,
      elementTab,
      isInformationPanel,
      currentSchema,
      currentPanel
    };
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_tab = QTab;
  const _component_q_tabs = QTabs;
  const _component_q_separator = QSeparator;
  const _component_h_form_information = __unplugin_components_3;
  const _component_q_tab_panel = QTabPanel;
  const _component_q_tab_panels = QTabPanels;
  const _component_q_card = QCard;
  const _component_h_sheet_panel = __unplugin_components_7;
  return $setup.isInformationPanel ? (openBlock(), createBlock(_component_q_card, { key: 0 }, {
    default: withCtx(() => [
      createVNode(_component_q_tabs, {
        modelValue: $setup.formTab,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.formTab = $event),
        dense: "",
        class: "text-grey",
        "active-color": "primary",
        "indicator-color": "primary",
        align: "justify",
        "narrow-indicator": ""
      }, {
        default: withCtx(() => [
          createVNode(_component_q_tab, {
            name: "info",
            label: "信息"
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(_component_q_separator),
      createVNode(_component_q_tab_panels, {
        modelValue: $setup.formTab,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.formTab = $event),
        animated: ""
      }, {
        default: withCtx(() => [
          createVNode(_component_q_tab_panel, { name: "info" }, {
            default: withCtx(() => [
              createVNode(_component_h_form_information)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  })) : (openBlock(), createBlock(_component_q_card, { key: 1 }, {
    default: withCtx(() => [
      createVNode(_component_q_tabs, {
        modelValue: $setup.elementTab,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.elementTab = $event),
        dense: "",
        class: "text-grey",
        "active-color": "primary",
        "indicator-color": "primary",
        align: "justify",
        "narrow-indicator": ""
      }, {
        default: withCtx(() => [
          createVNode(_component_q_tab, {
            name: "display",
            label: "显示"
          }),
          createVNode(_component_q_tab, {
            name: "sheet",
            label: "表单"
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(_component_q_separator),
      createVNode(_component_q_tab_panels, {
        modelValue: $setup.elementTab,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.elementTab = $event),
        animated: ""
      }, {
        default: withCtx(() => [
          createVNode(_component_q_tab_panel, {
            name: "display",
            class: "q-pa-none"
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent($setup.currentPanel), { schema: $setup.currentSchema }, null, 8, ["schema"]))
            ]),
            _: 1
          }),
          createVNode(_component_q_tab_panel, {
            name: "sheet",
            class: "q-pa-none"
          }, {
            default: withCtx(() => [
              createVNode(_component_h_sheet_panel)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }));
}
const __unplugin_components_6 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = defineComponent({
  name: "HWidgetPanel",
  components: {
    Draggable
  },
  setup() {
    const widgetGroups = WIDGET_DEFINITIONS;
    const store = useFormCanvasStore();
    const cloneWidget = (widget) => {
      const element = ElementUtils.create(widget);
      return element;
    };
    const addWidget = (widget) => {
      const element = cloneWidget(widget);
      store.addElement(element);
    };
    return {
      widgetGroups,
      cloneWidget,
      addWidget
    };
  }
});
const _hoisted_1 = { class: "widget-list" };
const _hoisted_2 = { class: "widget-title" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "widget-body" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_icon = QIcon;
  const _component_draggable = resolveComponent("draggable");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.widgetGroups, (widgetGroup, groupIndex) => {
      return openBlock(), createElementBlock("div", { key: groupIndex }, [
        createElementVNode("div", _hoisted_2, toDisplayString(widgetGroup.title), 1),
        createVNode(_component_draggable, {
          modelValue: widgetGroup.list,
          "onUpdate:modelValue": ($event) => widgetGroup.list = $event,
          "item-key": "schemaName",
          draggable: ".widget-item",
          sort: false,
          group: { name: "widgetGroup", pull: "clone", put: false },
          clone: _ctx.cloneWidget
        }, {
          item: withCtx(({ element }) => [
            createElementVNode("div", {
              class: "widget-item",
              onClick: ($event) => _ctx.addWidget(element)
            }, [
              createElementVNode("div", _hoisted_4, [
                createVNode(_component_q_icon, {
                  name: element.icon
                }, null, 8, ["name"]),
                createTextVNode(" " + toDisplayString(element.title), 1)
              ])
            ], 8, _hoisted_3)
          ]),
          _: 2
        }, 1032, ["modelValue", "onUpdate:modelValue", "clone"])
      ]);
    }), 128))
  ]);
}
const __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-8d89d665"]]);
const _sfc_main = defineComponent({
  name: "HDynamicForms",
  components: {
    HWidgetPanel: __unplugin_components_4,
    HPropertyPanel: __unplugin_components_6,
    HCanvasContainer: __unplugin_components_7$1,
    HFormPreviewDialog: __unplugin_components_8,
    HFormUploadDialog: __unplugin_components_9
  },
  props: {
    instance: { type: Object, required: true },
    title: { type: String, default: "Dante Cloud Form Designer" },
    container: { type: Boolean, default: false },
    height: { type: String, default: "90vh" },
    item: { type: Object, default: () => ({}) }
  },
  emits: ["close"],
  setup(props, { emit }) {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const openPreview = ref(false);
    const openUpload = ref(false);
    const resource = useFormResourceStore();
    const canvas = useFormCanvasStore();
    watch(
      () => props.item,
      (newValue) => {
        resource.init(props.instance);
        canvas.loading(newValue);
      },
      { deep: true, immediate: true }
    );
    watch(
      () => canvas.isClosed,
      (newValue) => {
        if (newValue) {
          emit("close");
        }
      }
    );
    onUnmounted(() => {
      resource.$reset();
      canvas.$reset();
    });
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      openPreview,
      openUpload
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_btn = QBtn;
  const _component_q_toolbar_title = QToolbarTitle;
  const _component_q_toolbar = QToolbar;
  const _component_q_header = QHeader;
  const _component_h_widget_panel = __unplugin_components_4;
  const _component_q_drawer = QDrawer;
  const _component_h_property_panel = __unplugin_components_6;
  const _component_h_canvas_container = __unplugin_components_7$1;
  const _component_h_form_preview_dialog = __unplugin_components_8;
  const _component_h_form_upload_dialog = __unplugin_components_9;
  const _component_q_layout = QLayout;
  return openBlock(), createBlock(_component_q_layout, {
    view: "lHr LpR lfr",
    container: _ctx.container,
    class: "bg-grey-2",
    style: normalizeStyle(`height: ${_ctx.height}`)
  }, {
    default: withCtx(() => [
      createVNode(_component_q_header, {
        bordered: "",
        class: "text-primary bg-white"
      }, {
        default: withCtx(() => [
          createVNode(_component_q_toolbar, null, {
            default: withCtx(() => [
              createVNode(_component_q_btn, {
                dense: "",
                flat: "",
                round: "",
                icon: "menu",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.leftDrawerOpen = !_ctx.leftDrawerOpen)
              }),
              createVNode(_component_q_toolbar_title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ]),
                _: 1
              }),
              createVNode(_component_q_btn, {
                flat: "",
                round: "",
                dense: "",
                icon: "mdi-eye",
                class: "q-mr-xs",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.openPreview = true)
              }),
              createVNode(_component_q_btn, {
                flat: "",
                round: "",
                dense: "",
                icon: "mdi-cloud-upload",
                onClick: _cache[2] || (_cache[2] = ($event) => _ctx.openUpload = true)
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_q_drawer, {
        "show-if-above": "",
        modelValue: _ctx.leftDrawerOpen,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.leftDrawerOpen = $event),
        side: "left",
        behavior: "desktop",
        bordered: ""
      }, {
        default: withCtx(() => [
          createVNode(_component_h_widget_panel)
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(_component_q_drawer, {
        "show-if-above": "",
        modelValue: _ctx.rightDrawerOpen,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.rightDrawerOpen = $event),
        side: "right",
        behavior: "desktop",
        bordered: ""
      }, {
        default: withCtx(() => [
          createVNode(_component_h_property_panel)
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(_component_h_canvas_container),
      createVNode(_component_h_form_preview_dialog, {
        modelValue: _ctx.openPreview,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.openPreview = $event)
      }, null, 8, ["modelValue"]),
      createVNode(_component_h_form_upload_dialog, {
        modelValue: _ctx.openUpload,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.openUpload = $event)
      }, null, 8, ["modelValue"])
    ]),
    _: 1
  }, 8, ["container", "style"]);
}
const HDynamicForms = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
HDynamicForms.install = (app) => {
  app.component(HDynamicForms.name, HDynamicForms);
};
const components = [HDynamicForms];
const install = (app) => {
  components.map((component) => app.component(component.name, component));
};
const index = {
  install
};
export {
  Attributes,
  ElementUtils2 as ElementUtils,
  HDynamicForms,
  Swal2 as Swal,
  WIDGET_DEFINITIONS2 as WIDGET_DEFINITIONS,
  index as default,
  lodash2 as lodash,
  toast2 as toast
};
