import { QTooltip, QBtn, QIcon, QCardSection, QSeparator, QCard, QToggle, QInput, QItemSection, QItem, QSpinner, QSpinnerAudio, QSpinnerBall, QSpinnerBars, QSpinnerBox, QSpinnerClock, QSpinnerComment, QSpinnerCube, QSpinnerDots, QSpinnerFacebook, QSpinnerGears, QSpinnerGrid, QSpinnerHearts, QSpinnerHourglass, QSpinnerInfinity, QSpinnerIos, QSpinnerOrbit, QSpinnerOval, QSpinnerPie, QSpinnerPuff, QSpinnerRadio, QSpinnerRings, QSpinnerTail, QInnerLoading, QPagination } from "quasar";
import { defineComponent, openBlock, createBlock, normalizeProps, guardReactiveProps, createSlots, withCtx, renderSlot, createTextVNode, toDisplayString, createCommentVNode, resolveComponent, mergeProps, computed, createVNode, createElementVNode, createElementBlock, normalizeClass, reactive, onMounted, onBeforeMount, toRefs, resolveDirective, withDirectives, resolveDynamicComponent } from "vue";
import { ParticlesComponent } from "particles.vue3";
import { loadFull } from "tsparticles";
const _sfc_main$e = defineComponent({
  name: "HButton",
  props: {
    tooltip: { type: String, default: "" }
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_tooltip = QTooltip;
  const _component_q_btn = QBtn;
  return openBlock(), createBlock(_component_q_btn, normalizeProps(guardReactiveProps(_ctx.$attrs)), createSlots({
    loading: withCtx(() => [
      renderSlot(_ctx.$slots, "loading")
    ]),
    _: 2
  }, [
    !_ctx.$slots.default && _ctx.tooltip ? {
      name: "default",
      fn: withCtx(() => [
        _ctx.tooltip ? (openBlock(), createBlock(_component_q_tooltip, { key: 0 }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.tooltip), 1)
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      key: "0"
    } : void 0
  ]), 1040);
}
const HButton = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
const _sfc_main$d = defineComponent({
  name: "HIconButton",
  components: {
    HButton
  },
  props: {
    color: { type: String, default: "" }
  }
});
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  return openBlock(), createBlock(_component_h_button, mergeProps({
    flat: "",
    round: "",
    color: _ctx.color
  }, _ctx.$attrs), null, 16, ["color"]);
}
const HIconButton = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
const _sfc_main$c = defineComponent({
  name: "HVisibilityButton",
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isShowPassword = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    return {
      isShowPassword
    };
  }
});
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_icon = QIcon;
  return openBlock(), createBlock(_component_q_icon, {
    name: _ctx.isShowPassword ? "visibility" : "visibility_off",
    class: "cursor-pointer",
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.isShowPassword = !_ctx.isShowPassword)
  }, null, 8, ["name"]);
}
const HVisibilityButton = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
HButton.install = (app) => {
  app.component(HButton.name, HButton);
};
HIconButton.install = (app) => {
  app.component(HIconButton.name, HIconButton);
};
HVisibilityButton.install = (app) => {
  app.component(HVisibilityButton.name, HVisibilityButton);
};
const _sfc_main$b = defineComponent({
  name: "HChartCard",
  props: {
    title: { type: String },
    subtitle: { type: String, default: "" }
  }
});
const _hoisted_1 = { class: "text-h6" };
const _hoisted_2 = {
  key: 0,
  class: "text-subtitle2"
};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_card_section = QCardSection;
  const _component_q_separator = QSeparator;
  const _component_q_card = QCard;
  return openBlock(), createBlock(_component_q_card, null, {
    default: withCtx(() => [
      createVNode(_component_q_card_section, null, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1, toDisplayString(_ctx.title), 1),
          _ctx.subtitle ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(_ctx.subtitle), 1)) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createVNode(_component_q_separator, { inset: "" }),
      createVNode(_component_q_card_section, null, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const HChartCard = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
HChartCard.install = (app) => {
  app.component(HChartCard.name, HChartCard);
};
var BreakPointEnum = /* @__PURE__ */ ((BreakPointEnum2) => {
  BreakPointEnum2["xs"] = "xs";
  BreakPointEnum2["sm"] = "sm";
  BreakPointEnum2["md"] = "md";
  BreakPointEnum2["lg"] = "lg";
  BreakPointEnum2["xl"] = "xl";
  return BreakPointEnum2;
})(BreakPointEnum || {});
var SpinnerEnum = /* @__PURE__ */ ((SpinnerEnum2) => {
  SpinnerEnum2["DEFAULT"] = "default";
  SpinnerEnum2["AUDIO"] = "audio";
  SpinnerEnum2["BALL"] = "ball";
  SpinnerEnum2["BARS"] = "bars";
  SpinnerEnum2["BOX"] = "box";
  SpinnerEnum2["CLOCK"] = "clock";
  SpinnerEnum2["COMMENT"] = "comment";
  SpinnerEnum2["CUBE"] = "cube";
  SpinnerEnum2["DOTS"] = "dots";
  SpinnerEnum2["FACEBOOK"] = "facebook";
  SpinnerEnum2["GEARS"] = "gears";
  SpinnerEnum2["GRID"] = "grid";
  SpinnerEnum2["HEARTS"] = "hearts";
  SpinnerEnum2["HOURGLASS"] = "hourglass";
  SpinnerEnum2["INFINITY"] = "infinity";
  SpinnerEnum2["IOS"] = "ios";
  SpinnerEnum2["ORBIT"] = "orbit";
  SpinnerEnum2["OVAL"] = "oval";
  SpinnerEnum2["PIE"] = "pie";
  SpinnerEnum2["PUFF"] = "puff";
  SpinnerEnum2["RADIO"] = "radio";
  SpinnerEnum2["RINGS"] = "rings";
  SpinnerEnum2["TAIL"] = "tail";
  return SpinnerEnum2;
})(SpinnerEnum || {});
const Symbol$3 = {
  DASH: "-"
};
const Content = {
  text: "text",
  bg: "bg"
};
const Grid = {
  auto: "auto",
  col: "col"
};
const createClass = (base, ...params) => {
  return base + Symbol$3.DASH + params.join(Symbol$3.DASH);
};
const createTextColor = (color) => {
  return createClass(Content.text, color);
};
const createBackgroundColor = (color) => {
  return createClass(Content.bg, color);
};
const createColClass = (breakpoint = "", size = "") => {
  if (breakpoint && size) {
    return createClass(Grid.col, breakpoint, size);
  } else {
    if (breakpoint) {
      return createClass(Grid.col, breakpoint);
    } else if (size) {
      return createClass(Grid.col, size);
    } else {
      return Grid.col;
    }
  }
};
const _sfc_main$a = defineComponent({
  name: "HColumn",
  props: {
    cols: { type: [String, Number], default: "" },
    xs: { type: String, default: "" },
    sm: { type: String, default: "" },
    md: { type: String, default: "" },
    lg: { type: String, default: "" },
    xl: { type: String, default: "" },
    auto: { type: Boolean, default: false },
    color: { type: String, default: "" }
  },
  setup(props) {
    const classes = computed(() => {
      let result = [];
      if (props.auto) {
        result.push(createColClass(Grid.auto));
      } else {
        if (props.cols) {
          result.push(createColClass("", props.cols));
        } else {
          result.push(createColClass());
          if (props.xs) {
            result.push(createColClass(BreakPointEnum.xs, props.xs));
          }
          if (props.sm) {
            result.push(createColClass(BreakPointEnum.sm, props.sm));
          }
          if (props.md) {
            result.push(createColClass(BreakPointEnum.md, props.md));
          }
          if (props.lg) {
            result.push(createColClass(BreakPointEnum.lg, props.lg));
          }
          if (props.xl) {
            result.push(createColClass(BreakPointEnum.xl, props.xl));
          }
        }
      }
      if (props.color) {
        result.push(createTextColor(props.color));
      }
      return result;
    });
    return { classes };
  }
});
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
const HColumn = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
const constants = {
  row: "row",
  column: "column",
  justify: "justify",
  self: "self",
  align: "items",
  gutter: "q-gutter",
  gutterWithCol: "q-col-gutter"
};
const _sfc_main$9 = defineComponent({
  name: "HRow",
  props: {
    column: { type: Boolean, default: false },
    self: { type: Boolean, default: false },
    align: { type: String, default: "none" },
    justify: { type: String, default: "none" },
    gutter: { type: String, default: "none" },
    gutterCol: { type: Boolean, default: false },
    horizontal: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = reactive([]);
    const createBase = () => {
      return props.column ? constants.column : constants.row;
    };
    const createGutter = (size = "", direction = "") => {
      let result = constants.gutter;
      if (props.gutterCol) {
        result = constants.gutterWithCol;
      }
      if (direction) {
        result = result + "-" + direction;
      }
      result = result + "-" + size;
      return result;
    };
    const createJustify = () => {
      if (props.justify !== "none") {
        return constants.justify + "-" + props.justify;
      } else {
        return "";
      }
    };
    const createAlign = () => {
      if (props.align !== "none") {
        let result = constants.align;
        if (props.self) {
          result = constants.self;
        }
        return result + "-" + props.align;
      } else {
        return "";
      }
    };
    const createHorizontalGutter = (size) => {
      return createGutter(size, "x");
    };
    const createVerticalGutter = (size) => {
      return createGutter(size, "y");
    };
    const appendClass = (value) => {
      if (value) {
        classes.push(value);
      }
    };
    const getClasses = () => {
      if (classes.length > 1) {
        return classes.join(" ");
      } else if (classes.length === 1) {
        return classes[0];
      } else {
        return constants.row;
      }
    };
    const initialize = () => {
      appendClass(createBase());
      appendClass(createJustify());
      appendClass(createAlign());
      if (props.gutter !== "none") {
        if (!props.horizontal && !props.vertical) {
          appendClass(createGutter(props.gutter));
        } else {
          if (props.horizontal) {
            appendClass(createHorizontalGutter(props.gutter));
          }
          if (props.vertical) {
            appendClass(createVerticalGutter(props.gutter));
          }
        }
      }
    };
    onMounted(() => {
      initialize();
    });
    return { getClasses };
  }
});
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.getClasses())
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
const HRow = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const _sfc_main$8 = defineComponent({
  name: "HContainer",
  components: {
    HRow,
    HColumn
  },
  props: {
    mode: { type: String, default: "three" },
    wider: { type: String, default: "default" },
    offset: { type: Number, default: 0 }
  },
  setup(props) {
    const defaultTwoCols = 6;
    const defaultThreeCols = 4;
    const state = reactive({
      leftCols: 4,
      centerCols: 4,
      rightCols: 4
    });
    const isTwoColumn = () => {
      if (props.mode === "two") {
        return true;
      } else {
        return false;
      }
    };
    const increment = (defaultValue) => {
      return defaultValue + props.offset;
    };
    const decrement = (defaultValue) => {
      return defaultValue - props.offset;
    };
    const leftIsWider = (defaultValue) => {
      state.leftCols = increment(defaultValue);
      state.rightCols = decrement(defaultValue);
    };
    const rightIsWider = (defaultValue) => {
      state.leftCols = decrement(defaultValue);
      state.rightCols = increment(defaultValue);
    };
    const setValue = (value, margin = 0) => {
      state.leftCols = value;
      state.rightCols = value + margin;
    };
    const setDefaultValueForTow = () => {
      setValue(defaultTwoCols);
    };
    const setDefaultValueForCenter = () => {
      state.centerCols = defaultThreeCols;
    };
    const setDefaultValueForThree = () => {
      setDefaultValueForCenter();
      setValue(defaultThreeCols);
    };
    const isEven = (value) => {
      return Math.abs(value % 2) === 0;
    };
    const maximum = () => {
      return defaultThreeCols + props.offset;
    };
    const getDifference = () => {
      return 12 - maximum();
    };
    const getSurplus = () => {
      return getDifference() / 2;
    };
    const isToTheLeft = computed(() => {
      return state.leftCols > state.rightCols;
    });
    const isToTheRight = computed(() => {
      return state.leftCols < state.rightCols;
    });
    const adjustWidth = () => {
      if (isTwoColumn()) {
        switch (props.wider) {
          case "start":
            leftIsWider(defaultTwoCols);
            break;
          case "end":
            rightIsWider(defaultTwoCols);
            break;
          default:
            setDefaultValueForTow();
            break;
        }
      } else {
        switch (props.wider) {
          case "center":
            state.centerCols = maximum();
            const surplus = getSurplus();
            if (isEven(getDifference())) {
              setValue(surplus);
            } else {
              setValue(surplus, 1);
            }
            break;
          case "start":
            setDefaultValueForCenter();
            leftIsWider(defaultThreeCols);
            break;
          case "end":
            setDefaultValueForCenter();
            rightIsWider(defaultThreeCols);
            break;
          default:
            setDefaultValueForThree();
            break;
        }
      }
    };
    onBeforeMount(() => {
      adjustWidth();
    });
    return {
      ...toRefs(state),
      isTwoColumn,
      isToTheLeft,
      isToTheRight
    };
  }
});
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_column = resolveComponent("h-column");
  const _component_h_row = resolveComponent("h-row");
  return _ctx.isTwoColumn() ? (openBlock(), createBlock(_component_h_row, normalizeProps(mergeProps({ key: 0 }, _ctx.$attrs)), {
    default: withCtx(() => [
      createVNode(_component_h_column, { cols: _ctx.leftCols }, {
        default: withCtx(() => [
          _ctx.isToTheLeft ? renderSlot(_ctx.$slots, "default", { key: 0 }) : renderSlot(_ctx.$slots, "left", { key: 1 })
        ]),
        _: 3
      }, 8, ["cols"]),
      createVNode(_component_h_column, { cols: _ctx.rightCols }, {
        default: withCtx(() => [
          _ctx.isToTheRight ? renderSlot(_ctx.$slots, "default", { key: 0 }) : renderSlot(_ctx.$slots, "right", { key: 1 })
        ]),
        _: 3
      }, 8, ["cols"])
    ]),
    _: 3
  }, 16)) : (openBlock(), createBlock(_component_h_row, normalizeProps(mergeProps({ key: 1 }, _ctx.$attrs)), {
    default: withCtx(() => [
      createVNode(_component_h_column, { cols: _ctx.leftCols }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "left")
        ]),
        _: 3
      }, 8, ["cols"]),
      createVNode(_component_h_column, { cols: _ctx.centerCols }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["cols"]),
      createVNode(_component_h_column, { cols: _ctx.rightCols }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "right")
        ]),
        _: 3
      }, 8, ["cols"])
    ]),
    _: 3
  }, 16));
}
const HContainer = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
HColumn.install = (app) => {
  app.component(HColumn.name, HColumn);
};
HContainer.install = (app) => {
  app.component(HContainer.name, HContainer);
};
HRow.install = (app) => {
  app.component(HRow.name, HRow);
};
const _sfc_main$7 = defineComponent({
  name: "HLabel",
  props: {
    size: {
      type: String,
      default: ""
    },
    weight: { type: String, default: "medium" },
    align: { type: String, default: "center" },
    text: String
  },
  setup(props) {
    const getTextClass = (value) => {
      return "text-" + value;
    };
    const getWeight = () => {
      return "font-weight-" + props.weight;
    };
    const getTypography = () => {
      if (props.size) {
        return getTextClass(props.size);
      } else {
        return "";
      }
    };
    const getAlignment = () => {
      return getTextClass(props.align);
    };
    const display = computed(() => {
      const value = [getAlignment(), getWeight()];
      const typography = getTypography();
      if (typography) {
        value.push(typography);
      }
      return value.join(" ");
    });
    return {
      display
    };
  }
});
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.display)
  }, toDisplayString(_ctx.text), 3);
}
const HLabel = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
HLabel.install = (app) => {
  app.component(HLabel.name, HLabel);
};
const _sfc_main$6 = defineComponent({
  name: "HDivider",
  components: {
    HContainer,
    HLabel
  },
  props: {
    wider: { type: String, default: "center" },
    weight: {
      type: String,
      default: "medium"
    },
    offset: { type: Number, default: 0 },
    label: String
  },
  setup(props) {
    const textWeight = computed(() => {
      return "text-center text-weight-" + props.weight;
    });
    return {
      textWeight
    };
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_separator = QSeparator;
  const _component_h_label = resolveComponent("h-label");
  const _component_h_container = resolveComponent("h-container");
  return openBlock(), createBlock(_component_h_container, {
    mode: "three",
    offset: _ctx.offset,
    wider: _ctx.wider,
    align: "center"
  }, {
    left: withCtx(() => [
      createVNode(_component_q_separator)
    ]),
    right: withCtx(() => [
      createVNode(_component_q_separator)
    ]),
    default: withCtx(() => [
      createVNode(_component_h_label, {
        text: _ctx.label,
        weight: _ctx.weight
      }, null, 8, ["text", "weight"])
    ]),
    _: 1
  }, 8, ["offset", "wider"]);
}
const HDivider = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
HDivider.install = (app) => {
  app.component(HDivider.name, HDivider);
};
const _sfc_main$5 = defineComponent({
  name: "HSwitch",
  props: {
    modelValue: { type: [Boolean, Number, String], defalut: false },
    trueValue: { type: [Boolean, Number, String], default: true },
    falseValue: { type: [Boolean, Number, String], default: false },
    color: { type: String, default: "primary" }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const switchValue = computed({
      get: () => props.modelValue ? props.modelValue : props.falseValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    return {
      switchValue
    };
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_toggle = QToggle;
  return openBlock(), createBlock(_component_q_toggle, mergeProps({
    modelValue: _ctx.switchValue,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.switchValue = $event),
    "true-value": _ctx.trueValue,
    "false-value": _ctx.falseValue,
    color: _ctx.color
  }, _ctx.$attrs), null, 16, ["modelValue", "true-value", "false-value", "color"]);
}
const HSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = defineComponent({
  name: "HTextField",
  props: {
    modelValue: { type: [String, Number] }
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const text = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    return {
      text
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_input = QInput;
  return openBlock(), createBlock(_component_q_input, mergeProps({
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.text = $event),
    outlined: "",
    clearable: "",
    "bottom-slots": ""
  }, _ctx.$attrs), createSlots({ _: 2 }, [
    _ctx.$slots.append ? {
      name: "append",
      fn: withCtx(() => [
        renderSlot(_ctx.$slots, "append")
      ]),
      key: "0"
    } : void 0,
    _ctx.$slots.before ? {
      name: "before",
      fn: withCtx(() => [
        renderSlot(_ctx.$slots, "before")
      ]),
      key: "1"
    } : void 0,
    _ctx.$slots.after ? {
      name: "after",
      fn: withCtx(() => [
        renderSlot(_ctx.$slots, "after")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["modelValue"]);
}
const HTextField = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
HSwitch.install = (app) => {
  app.component(HSwitch.name, HSwitch);
};
HTextField.install = (app) => {
  app.component(HTextField.name, HTextField);
};
const _sfc_main$3 = defineComponent({
  name: "HListItem",
  props: {
    label: { type: String },
    icon: { type: String }
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_icon = QIcon;
  const _component_q_item_section = QItemSection;
  const _component_q_item = QItem;
  const _directive_close_popup = resolveDirective("close-popup");
  const _directive_ripple = resolveDirective("ripple");
  return withDirectives((openBlock(), createBlock(_component_q_item, { clickable: "" }, {
    default: withCtx(() => [
      createVNode(_component_q_item_section, { avatar: "" }, {
        default: withCtx(() => [
          createVNode(_component_q_icon, { name: _ctx.icon }, null, 8, ["name"])
        ]),
        _: 1
      }),
      createVNode(_component_q_item_section, null, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ]),
        _: 1
      })
    ]),
    _: 1
  })), [
    [_directive_close_popup],
    [_directive_ripple]
  ]);
}
const HListItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
HListItem.install = (app) => {
  app.component(HListItem.name, HListItem);
};
const _sfc_main$2 = defineComponent({
  name: "HLoading",
  components: {
    DEFAULT: QSpinner,
    AUDIO: QSpinnerAudio,
    BALL: QSpinnerBall,
    BARS: QSpinnerBars,
    BOX: QSpinnerBox,
    CLOCK: QSpinnerClock,
    COMMENT: QSpinnerComment,
    CUBE: QSpinnerCube,
    DOTS: QSpinnerDots,
    FACEBOOK: QSpinnerFacebook,
    GEARS: QSpinnerGears,
    GRID: QSpinnerGrid,
    HEARTS: QSpinnerHearts,
    HOURGLASS: QSpinnerHourglass,
    INFINITY: QSpinnerInfinity,
    IOS: QSpinnerIos,
    ORBIT: QSpinnerOrbit,
    OVAL: QSpinnerOval,
    PIE: QSpinnerPie,
    PUFF: QSpinnerPuff,
    RADIO: QSpinnerRadio,
    RINGS: QSpinnerRings,
    TAIL: QSpinnerTail
  },
  props: {
    type: { type: String, default: "default" },
    color: { type: String, default: "primary" },
    size: { type: String, default: "60px" }
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_inner_loading = QInnerLoading;
  return openBlock(), createBlock(_component_q_inner_loading, {
    showing: "",
    color: _ctx.color,
    style: { "z-index": "50" }
  }, {
    default: withCtx(() => [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.type), {
        size: _ctx.size,
        color: _ctx.color
      }, null, 8, ["size", "color"]))
    ]),
    _: 1
  }, 8, ["color"]);
}
const HLoading = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
HLoading.install = (app) => {
  app.component(HLoading.name, HLoading);
};
const _sfc_main$1 = defineComponent({
  name: "HPagination",
  props: {
    modelValue: { type: Number, required: true },
    max: { type: Number, default: 0 },
    maxPage: { type: Number, default: 7 }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const pageNumber = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    return {
      pageNumber
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_pagination = QPagination;
  return openBlock(), createBlock(_component_q_pagination, mergeProps({
    modelValue: _ctx.pageNumber,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.pageNumber = $event),
    max: _ctx.max,
    "max-pages": _ctx.maxPage,
    "boundary-links": "",
    "direction-links": ""
  }, _ctx.$attrs, {
    "icon-first": "skip_previous",
    "icon-last": "skip_next",
    "icon-prev": "fast_rewind",
    "icon-next": "fast_forward"
  }), null, 16, ["modelValue", "max", "max-pages"]);
}
const HPagination = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
HPagination.install = (app) => {
  app.component(HPagination.name, HPagination);
};
const DefaultOptions = {
  fullScreen: {
    zIndex: 1
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
        speed: 3
      },
      push: {
        quantity: 4,
        particles_nb: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      grab: {
        distance: 200,
        line_linked: {
          opacity: 1
        }
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 4,
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
};
const currentOptions = DefaultOptions;
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
var nativeObjectToString$1 = objectProto$c.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$b = Object.prototype;
var nativeObjectToString = objectProto$b.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isArray = Array.isArray;
const isArray$1 = isArray;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$a = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
const WeakMap$1 = WeakMap;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function copyArray(source, array) {
  var index2 = -1, length = source.length;
  array || (array = Array(length));
  while (++index2 < length) {
    array[index2] = source[index2];
  }
  return array;
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$1 = defineProperty;
function arrayEach(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (iteratee(array[index2], index2, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index2 = -1, length = props.length;
  while (++index2 < length) {
    var key = props[index2];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var objectProto$8 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index2 = -1, result = Array(n);
  while (++index2 < n) {
    result[index2] = iteratee(index2);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$4.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map = getNative(root$1, "Map");
const Map$1 = Map;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index2 = -1, length = values.length, offset = array.length;
  while (++index2 < length) {
    array[offset + index2] = values[index2];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set = getNative(root$1, "Set");
const Set$1 = Set;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag(new Map$1()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$3 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
const _sfc_main = defineComponent({
  name: "HParticles",
  components: {
    Particles: ParticlesComponent
  },
  setup() {
    const particlesInit = async (engine) => {
      await loadFull(engine);
    };
    const particlesOptions = cloneDeep(currentOptions);
    return {
      particlesInit,
      particlesOptions
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Particles = resolveComponent("Particles");
  return openBlock(), createBlock(_component_Particles, {
    id: "tsparticles",
    particlesInit: _ctx.particlesInit,
    options: _ctx.particlesOptions
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["particlesInit", "options"]);
}
const HParticles = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
HParticles.install = (app) => {
  app.component(HParticles.name, HParticles);
};
const components = [
  HButton,
  HChartCard,
  HColumn,
  HContainer,
  HDivider,
  HIconButton,
  HLabel,
  HListItem,
  HLoading,
  HPagination,
  HParticles,
  HRow,
  HSwitch,
  HTextField,
  HVisibilityButton
];
const install = (app) => {
  components.map((component) => app.component(component.name, component));
};
const index = {
  install
};
export {
  BreakPointEnum,
  Content,
  Grid,
  HButton,
  HChartCard,
  HColumn,
  HContainer,
  HDivider,
  HIconButton,
  HLabel,
  HListItem,
  HLoading,
  HPagination,
  HParticles,
  HRow,
  HSwitch,
  HTextField,
  HVisibilityButton,
  SpinnerEnum,
  Symbol$3 as Symbol,
  createBackgroundColor,
  createClass,
  createColClass,
  createTextColor,
  index as default
};
