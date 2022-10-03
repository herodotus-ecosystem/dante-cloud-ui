import { defineComponent, openBlock, createElementBlock, createElementVNode, resolveComponent, createVNode } from "vue";
const _sfc_main$2 = defineComponent({
  name: "HSignInCornerBottom",
  props: {
    startColor: {
      type: String,
      default: "#28aff0"
    },
    endColor: {
      type: String,
      default: "#120fc4"
    }
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$2 = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  height: "896",
  width: "967.8852157128662"
};
const _hoisted_2$2 = /* @__PURE__ */ createElementVNode("path", {
  id: "path-2",
  opacity: "1",
  "fill-rule": "evenodd",
  d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\r\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\r\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
}, null, -1);
const _hoisted_3$1 = {
  id: "linearGradient-3",
  x1: "0.5",
  y1: "0",
  x2: "0.5",
  y2: "1"
};
const _hoisted_4$1 = ["stop-color"];
const _hoisted_5$1 = ["stop-color"];
const _hoisted_6$1 = /* @__PURE__ */ createElementVNode("g", { opacity: "1" }, [
  /* @__PURE__ */ createElementVNode("use", {
    "xlink:href": "#path-2",
    fill: "url(#linearGradient-3)",
    "fill-opacity": "1"
  })
], -1);
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [
    createElementVNode("defs", null, [
      _hoisted_2$2,
      createElementVNode("linearGradient", _hoisted_3$1, [
        createElementVNode("stop", {
          offset: "0",
          "stop-color": _ctx.startColor,
          "stop-opacity": "1"
        }, null, 8, _hoisted_4$1),
        createElementVNode("stop", {
          offset: "1",
          "stop-color": _ctx.endColor,
          "stop-opacity": "1"
        }, null, 8, _hoisted_5$1)
      ])
    ]),
    _hoisted_6$1
  ]);
}
const HSignInCornerBottom = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = defineComponent({
  name: "HSignInCornerTop",
  props: {
    startColor: {
      type: String,
      default: "#28aff0"
    },
    endColor: {
      type: String,
      default: "#120fc4"
    }
  }
});
const _hoisted_1$1 = {
  height: "1337",
  width: "1337"
};
const _hoisted_2$1 = /* @__PURE__ */ createElementVNode("path", {
  id: "path-1",
  opacity: "1",
  "fill-rule": "evenodd",
  d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
}, null, -1);
const _hoisted_3 = {
  id: "linearGradient-2",
  x1: "0.79",
  y1: "0.62",
  x2: "0.21",
  y2: "0.86"
};
const _hoisted_4 = ["stop-color"];
const _hoisted_5 = ["stop-color"];
const _hoisted_6 = /* @__PURE__ */ createElementVNode("g", { opacity: "1" }, [
  /* @__PURE__ */ createElementVNode("use", {
    "xlink:href": "#path-1",
    fill: "url(#linearGradient-2)",
    "fill-opacity": "1"
  })
], -1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [
    createElementVNode("defs", null, [
      _hoisted_2$1,
      createElementVNode("linearGradient", _hoisted_3, [
        createElementVNode("stop", {
          offset: "0",
          "stop-color": _ctx.startColor,
          "stop-opacity": "1"
        }, null, 8, _hoisted_4),
        createElementVNode("stop", {
          offset: "1",
          "stop-color": _ctx.endColor,
          "stop-opacity": "1"
        }, null, 8, _hoisted_5)
      ])
    ]),
    _hoisted_6
  ]);
}
const HSignInCornerTop = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  name: "HSignInBackground",
  components: {
    HSignInCornerBottom,
    HSignInCornerTop
  },
  props: {
    startColor: { type: String, required: true },
    endColor: { type: String, required: true }
  }
});
const HSignInBackground_vue_vue_type_style_index_0_scoped_2a9badba_lang = "";
const _hoisted_1 = { class: "corner-top" };
const _hoisted_2 = { class: "corner-bottom" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_sign_in_corner_top = resolveComponent("h-sign-in-corner-top");
  const _component_h_sign_in_corner_bottom = resolveComponent("h-sign-in-corner-bottom");
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("div", _hoisted_1, [
      createVNode(_component_h_sign_in_corner_top, {
        "start-color": _ctx.startColor,
        "end-color": _ctx.endColor
      }, null, 8, ["start-color", "end-color"])
    ]),
    createElementVNode("div", _hoisted_2, [
      createVNode(_component_h_sign_in_corner_bottom, {
        "start-color": _ctx.endColor,
        "end-color": _ctx.startColor
      }, null, 8, ["start-color", "end-color"])
    ])
  ]);
}
const HSignInBackground = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2a9badba"]]);
HSignInBackground.install = (app) => {
  app.component(HSignInBackground.name, HSignInBackground);
};
const components = [HSignInBackground];
const install = (app) => {
  components.map((component) => app.component(component.name, component));
};
const index = {
  install
};
export {
  HSignInBackground,
  index as default
};
