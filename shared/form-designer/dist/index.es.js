import { QIcon, QBtn, QToolbarTitle, QToolbar, QHeader, QDrawer, QLayout } from "quasar";
import { defineComponent, resolveComponent, openBlock, createElementBlock, Fragment, renderList, createElementVNode, toDisplayString, createVNode, withCtx, createTextVNode, ref, createBlock, normalizeStyle } from "vue";
import Draggable from "vuedraggable";
import { defineStore } from "pinia";
import { lodash } from "@herodotus/utils";
import { lodash as lodash2 } from "@herodotus/utils";
import { WIDGET_DEFINITIONS, DataObjectUtils } from "@herodotus/form-engine";
import { DataObjectUtils as DataObjectUtils2, WIDGET_DEFINITIONS as WIDGET_DEFINITIONS2 } from "@herodotus/form-engine";
const useDataObjectStore = defineStore("CanvasDataObjects", {
  state: () => ({
    drawingDataObjects: [],
    currentDataObject: {}
  }),
  getters: {
    isSelected(state) {
      return (id) => {
        if (!lodash.isEmpty(state.currentDataObject)) {
          if (state.currentDataObject.id) {
            return state.currentDataObject.config.renderKey === id;
          }
        }
        return false;
      };
    }
  },
  actions: {
    addDataObject(dataObject) {
      this.drawingDataObjects.push(dataObject);
      this.selectDataObject(dataObject);
    },
    removeDataObject(dataObject) {
    },
    selectDataObject(dataObject) {
      this.currentDataObject = dataObject;
    }
  }
});
const _sfc_main$1 = defineComponent({
  name: "HWidgetPanel",
  components: {
    Draggable
  },
  setup() {
    const widgetGroups = WIDGET_DEFINITIONS;
    const store = useDataObjectStore();
    const cloneWidget = (widget) => {
      const dataObject = DataObjectUtils.create(widget);
      console.log(dataObject);
      return dataObject;
    };
    const addWidget = (widget) => {
      const dataObject = cloneWidget(widget);
      storeDataObject(dataObject);
    };
    const storeDataObject = (dataObject) => {
      store.addDataObject(dataObject);
    };
    return {
      widgetGroups,
      cloneWidget,
      addWidget
    };
  }
});
const HWidgetPanel_vue_vue_type_style_index_0_scoped_b1550002_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
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
const __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-b1550002"]]);
const _sfc_main = {
  name: "HDynamicForms",
  components: {
    HWidgetPanel: __unplugin_components_4
  },
  props: {
    title: { type: String, default: "Dante Cloud Form Designer" },
    container: { type: Boolean, default: false },
    height: { type: String, default: "90vh" }
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      }
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_btn = QBtn;
  const _component_q_toolbar_title = QToolbarTitle;
  const _component_q_toolbar = QToolbar;
  const _component_q_header = QHeader;
  const _component_h_widget_panel = __unplugin_components_4;
  const _component_q_drawer = QDrawer;
  const _component_q_layout = QLayout;
  return openBlock(), createBlock(_component_q_layout, {
    view: "lHr LpR fFf",
    container: $props.container,
    class: "bg-grey-2",
    style: normalizeStyle(`height: ${$props.height}`)
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
                onClick: _cache[0] || (_cache[0] = ($event) => $setup.leftDrawerOpen = !$setup.leftDrawerOpen)
              }),
              createVNode(_component_q_toolbar_title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($props.title), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_q_drawer, {
        "show-if-above": "",
        modelValue: $setup.leftDrawerOpen,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.leftDrawerOpen = $event),
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
        modelValue: $setup.rightDrawerOpen,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.rightDrawerOpen = $event),
        side: "right",
        behavior: "desktop",
        bordered: ""
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
  DataObjectUtils2 as DataObjectUtils,
  HDynamicForms,
  WIDGET_DEFINITIONS2 as WIDGET_DEFINITIONS,
  index as default,
  lodash2 as lodash,
  useDataObjectStore
};
