import { QTooltip, QBtn, QIcon, QCardSection, QSeparator, QCard, ClosePopup, QDate, QPopupProxy, QTime, QInput, QSelect, QItemSection, QItemLabel, QItem, QToggle, Ripple, QSpinner, QSpinnerAudio, QSpinnerBall, QSpinnerBars, QSpinnerBox, QSpinnerClock, QSpinnerComment, QSpinnerCube, QSpinnerDots, QSpinnerFacebook, QSpinnerGears, QSpinnerGrid, QSpinnerHearts, QSpinnerHourglass, QSpinnerInfinity, QSpinnerIos, QSpinnerOrbit, QSpinnerOval, QSpinnerPie, QSpinnerPuff, QSpinnerRadio, QSpinnerRings, QSpinnerTail, QInnerLoading, QPagination } from "quasar";
import { defineComponent, openBlock, createBlock, normalizeProps, guardReactiveProps, createSlots, withCtx, renderSlot, createTextVNode, toDisplayString, createCommentVNode, resolveComponent, mergeProps, computed, createVNode, createElementVNode, createElementBlock, normalizeClass, reactive, onMounted, onBeforeMount, toRefs, resolveDirective, withDirectives, ref, watch, resolveDynamicComponent } from "vue";
import * as allIcons from "@mdi/js";
import { ParticlesComponent } from "particles.vue3";
import { loadFull } from "tsparticles";
const _sfc_main$l = defineComponent({
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
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
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
const HButton = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
const _sfc_main$k = defineComponent({
  name: "HIconButton",
  components: {
    HButton
  },
  props: {
    color: { type: String, default: "" },
    size: { type: String, default: "" },
    dense: { type: Boolean, default: false }
  }
});
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  return openBlock(), createBlock(_component_h_button, mergeProps({
    flat: "",
    round: "",
    color: _ctx.color,
    dense: _ctx.dense,
    size: _ctx.size
  }, _ctx.$attrs), null, 16, ["color", "dense", "size"]);
}
const HIconButton = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
const _sfc_main$j = defineComponent({
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
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_icon = QIcon;
  return openBlock(), createBlock(_component_q_icon, {
    name: _ctx.isShowPassword ? "visibility" : "visibility_off",
    class: "cursor-pointer",
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.isShowPassword = !_ctx.isShowPassword)
  }, null, 8, ["name"]);
}
const HVisibilityButton = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
HButton.install = (app) => {
  app.component(HButton.name, HButton);
};
HIconButton.install = (app) => {
  app.component(HIconButton.name, HIconButton);
};
HVisibilityButton.install = (app) => {
  app.component(HVisibilityButton.name, HVisibilityButton);
};
const _sfc_main$i = defineComponent({
  name: "HChartCard",
  props: {
    title: { type: String },
    subtitle: { type: String, default: "" }
  }
});
const _hoisted_1$4 = { class: "text-h6" };
const _hoisted_2$4 = {
  key: 0,
  class: "text-subtitle2"
};
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_card_section = QCardSection;
  const _component_q_separator = QSeparator;
  const _component_q_card = QCard;
  return openBlock(), createBlock(_component_q_card, null, {
    default: withCtx(() => [
      createVNode(_component_q_card_section, null, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$4, toDisplayString(_ctx.title), 1),
          _ctx.subtitle ? (openBlock(), createElementBlock("div", _hoisted_2$4, toDisplayString(_ctx.subtitle), 1)) : createCommentVNode("", true)
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
const HChartCard = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
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
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var sweetalert2_all = { exports: {} };
/*!
* sweetalert2 v11.4.38
* Released under the MIT License.
*/
(function(module2, exports2) {
  (function(global2, factory) {
    module2.exports = factory();
  })(commonjsGlobal, function() {
    var privateProps = {
      awaitingPromise: /* @__PURE__ */ new WeakMap(),
      promise: /* @__PURE__ */ new WeakMap(),
      innerParams: /* @__PURE__ */ new WeakMap(),
      domCache: /* @__PURE__ */ new WeakMap()
    };
    const swalPrefix = "swal2-";
    const prefix = (items) => {
      const result = {};
      for (const i in items) {
        result[items[i]] = swalPrefix + items[i];
      }
      return result;
    };
    const swalClasses = prefix(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "show", "hide", "close", "title", "html-container", "actions", "confirm", "deny", "cancel", "default-outline", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "input-label", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loader", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error", "no-war"]);
    const iconTypes = prefix(["success", "warning", "info", "question", "error"]);
    const consolePrefix = "SweetAlert2:";
    const uniqueArray = (arr) => {
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
          result.push(arr[i]);
        }
      }
      return result;
    };
    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const warn2 = (message) => {
      console.warn("".concat(consolePrefix, " ").concat(typeof message === "object" ? message.join(" ") : message));
    };
    const error = (message) => {
      console.error("".concat(consolePrefix, " ").concat(message));
    };
    const previousWarnOnceMessages = [];
    const warnOnce = (message) => {
      if (!previousWarnOnceMessages.includes(message)) {
        previousWarnOnceMessages.push(message);
        warn2(message);
      }
    };
    const warnAboutDeprecation = (deprecatedParam, useInstead) => {
      warnOnce('"'.concat(deprecatedParam, '" is deprecated and will be removed in the next major release. Please use "').concat(useInstead, '" instead.'));
    };
    const callIfFunction = (arg) => typeof arg === "function" ? arg() : arg;
    const hasToPromiseFn = (arg) => arg && typeof arg.toPromise === "function";
    const asPromise = (arg) => hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);
    const isPromise = (arg) => arg && Promise.resolve(arg) === arg;
    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getContainer = () => document.body.querySelector(".".concat(swalClasses.container));
    const elementBySelector = (selectorString) => {
      const container = getContainer();
      return container ? container.querySelector(selectorString) : null;
    };
    const elementByClass = (className) => {
      return elementBySelector(".".concat(className));
    };
    const getPopup = () => elementByClass(swalClasses.popup);
    const getIcon = () => elementByClass(swalClasses.icon);
    const getTitle = () => elementByClass(swalClasses.title);
    const getHtmlContainer = () => elementByClass(swalClasses["html-container"]);
    const getImage = () => elementByClass(swalClasses.image);
    const getProgressSteps = () => elementByClass(swalClasses["progress-steps"]);
    const getValidationMessage = () => elementByClass(swalClasses["validation-message"]);
    const getConfirmButton = () => elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.confirm));
    const getDenyButton = () => elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.deny));
    const getInputLabel = () => elementByClass(swalClasses["input-label"]);
    const getLoader = () => elementBySelector(".".concat(swalClasses.loader));
    const getCancelButton = () => elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.cancel));
    const getActions = () => elementByClass(swalClasses.actions);
    const getFooter = () => elementByClass(swalClasses.footer);
    const getTimerProgressBar = () => elementByClass(swalClasses["timer-progress-bar"]);
    const getCloseButton = () => elementByClass(swalClasses.close);
    const focusable = '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n';
    const getFocusableElements = () => {
      const focusableElementsWithTabindex = Array.from(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((a, b) => {
        const tabindexA = parseInt(a.getAttribute("tabindex"));
        const tabindexB = parseInt(b.getAttribute("tabindex"));
        if (tabindexA > tabindexB) {
          return 1;
        } else if (tabindexA < tabindexB) {
          return -1;
        }
        return 0;
      });
      const otherFocusableElements = Array.from(getPopup().querySelectorAll(focusable)).filter((el) => el.getAttribute("tabindex") !== "-1");
      return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter((el) => isVisible(el));
    };
    const isModal = () => {
      return hasClass(document.body, swalClasses.shown) && !hasClass(document.body, swalClasses["toast-shown"]) && !hasClass(document.body, swalClasses["no-backdrop"]);
    };
    const isToast = () => {
      return getPopup() && hasClass(getPopup(), swalClasses.toast);
    };
    const isLoading = () => {
      return getPopup().hasAttribute("data-loading");
    };
    const states = {
      previousBodyPadding: null
    };
    const setInnerHtml = (elem, html) => {
      elem.textContent = "";
      if (html) {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(html, "text/html");
        Array.from(parsed.querySelector("head").childNodes).forEach((child) => {
          elem.appendChild(child);
        });
        Array.from(parsed.querySelector("body").childNodes).forEach((child) => {
          if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) {
            elem.appendChild(child.cloneNode(true));
          } else {
            elem.appendChild(child);
          }
        });
      }
    };
    const hasClass = (elem, className) => {
      if (!className) {
        return false;
      }
      const classList = className.split(/\s+/);
      for (let i = 0; i < classList.length; i++) {
        if (!elem.classList.contains(classList[i])) {
          return false;
        }
      }
      return true;
    };
    const removeCustomClasses = (elem, params) => {
      Array.from(elem.classList).forEach((className) => {
        if (!Object.values(swalClasses).includes(className) && !Object.values(iconTypes).includes(className) && !Object.values(params.showClass).includes(className)) {
          elem.classList.remove(className);
        }
      });
    };
    const applyCustomClass = (elem, params, className) => {
      removeCustomClasses(elem, params);
      if (params.customClass && params.customClass[className]) {
        if (typeof params.customClass[className] !== "string" && !params.customClass[className].forEach) {
          return warn2("Invalid type of customClass.".concat(className, '! Expected string or iterable object, got "').concat(typeof params.customClass[className], '"'));
        }
        addClass(elem, params.customClass[className]);
      }
    };
    const getInput = (popup, inputClass) => {
      if (!inputClass) {
        return null;
      }
      switch (inputClass) {
        case "select":
        case "textarea":
        case "file":
          return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses[inputClass]));
        case "checkbox":
          return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.checkbox, " input"));
        case "radio":
          return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.radio, " input:checked")) || popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.radio, " input:first-child"));
        case "range":
          return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.range, " input"));
        default:
          return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.input));
      }
    };
    const focusInput = (input) => {
      input.focus();
      if (input.type !== "file") {
        const val = input.value;
        input.value = "";
        input.value = val;
      }
    };
    const toggleClass = (target, classList, condition) => {
      if (!target || !classList) {
        return;
      }
      if (typeof classList === "string") {
        classList = classList.split(/\s+/).filter(Boolean);
      }
      classList.forEach((className) => {
        if (Array.isArray(target)) {
          target.forEach((elem) => {
            condition ? elem.classList.add(className) : elem.classList.remove(className);
          });
        } else {
          condition ? target.classList.add(className) : target.classList.remove(className);
        }
      });
    };
    const addClass = (target, classList) => {
      toggleClass(target, classList, true);
    };
    const removeClass = (target, classList) => {
      toggleClass(target, classList, false);
    };
    const getDirectChildByClass = (elem, className) => {
      const children = Array.from(elem.children);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child instanceof HTMLElement && hasClass(child, className)) {
          return child;
        }
      }
    };
    const applyNumericalStyle = (elem, property, value) => {
      if (value === "".concat(parseInt(value))) {
        value = parseInt(value);
      }
      if (value || parseInt(value) === 0) {
        elem.style[property] = typeof value === "number" ? "".concat(value, "px") : value;
      } else {
        elem.style.removeProperty(property);
      }
    };
    const show = function(elem) {
      let display = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "flex";
      elem.style.display = display;
    };
    const hide = (elem) => {
      elem.style.display = "none";
    };
    const setStyle = (parent, selector, property, value) => {
      const el = parent.querySelector(selector);
      if (el) {
        el.style[property] = value;
      }
    };
    const toggle = function(elem, condition) {
      let display = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "flex";
      condition ? show(elem, display) : hide(elem);
    };
    const isVisible = (elem) => !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
    const allButtonsAreHidden = () => !isVisible(getConfirmButton()) && !isVisible(getDenyButton()) && !isVisible(getCancelButton());
    const isScrollable = (elem) => !!(elem.scrollHeight > elem.clientHeight);
    const hasCssAnimation = (elem) => {
      const style = window.getComputedStyle(elem);
      const animDuration = parseFloat(style.getPropertyValue("animation-duration") || "0");
      const transDuration = parseFloat(style.getPropertyValue("transition-duration") || "0");
      return animDuration > 0 || transDuration > 0;
    };
    const animateTimerProgressBar = function(timer) {
      let reset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      const timerProgressBar = getTimerProgressBar();
      if (isVisible(timerProgressBar)) {
        if (reset) {
          timerProgressBar.style.transition = "none";
          timerProgressBar.style.width = "100%";
        }
        setTimeout(() => {
          timerProgressBar.style.transition = "width ".concat(timer / 1e3, "s linear");
          timerProgressBar.style.width = "0%";
        }, 10);
      }
    };
    const stopTimerProgressBar = () => {
      const timerProgressBar = getTimerProgressBar();
      const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
      timerProgressBar.style.removeProperty("transition");
      timerProgressBar.style.width = "100%";
      const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
      const timerProgressBarPercent = timerProgressBarWidth / timerProgressBarFullWidth * 100;
      timerProgressBar.style.removeProperty("transition");
      timerProgressBar.style.width = "".concat(timerProgressBarPercent, "%");
    };
    const RESTORE_FOCUS_TIMEOUT = 100;
    const globalState = {};
    const focusPreviousActiveElement = () => {
      if (globalState.previousActiveElement instanceof HTMLElement) {
        globalState.previousActiveElement.focus();
        globalState.previousActiveElement = null;
      } else if (document.body) {
        document.body.focus();
      }
    };
    const restoreActiveElement = (returnFocus) => {
      return new Promise((resolve) => {
        if (!returnFocus) {
          return resolve();
        }
        const x = window.scrollX;
        const y = window.scrollY;
        globalState.restoreFocusTimeout = setTimeout(() => {
          focusPreviousActiveElement();
          resolve();
        }, RESTORE_FOCUS_TIMEOUT);
        window.scrollTo(x, y);
      });
    };
    const isNodeEnv = () => typeof window === "undefined" || typeof document === "undefined";
    const sweetHTML = '\n <div aria-labelledby="'.concat(swalClasses.title, '" aria-describedby="').concat(swalClasses["html-container"], '" class="').concat(swalClasses.popup, '" tabindex="-1">\n   <button type="button" class="').concat(swalClasses.close, '"></button>\n   <ul class="').concat(swalClasses["progress-steps"], '"></ul>\n   <div class="').concat(swalClasses.icon, '"></div>\n   <img class="').concat(swalClasses.image, '" />\n   <h2 class="').concat(swalClasses.title, '" id="').concat(swalClasses.title, '"></h2>\n   <div class="').concat(swalClasses["html-container"], '" id="').concat(swalClasses["html-container"], '"></div>\n   <input class="').concat(swalClasses.input, '" />\n   <input type="file" class="').concat(swalClasses.file, '" />\n   <div class="').concat(swalClasses.range, '">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(swalClasses.select, '"></select>\n   <div class="').concat(swalClasses.radio, '"></div>\n   <label for="').concat(swalClasses.checkbox, '" class="').concat(swalClasses.checkbox, '">\n     <input type="checkbox" />\n     <span class="').concat(swalClasses.label, '"></span>\n   </label>\n   <textarea class="').concat(swalClasses.textarea, '"></textarea>\n   <div class="').concat(swalClasses["validation-message"], '" id="').concat(swalClasses["validation-message"], '"></div>\n   <div class="').concat(swalClasses.actions, '">\n     <div class="').concat(swalClasses.loader, '"></div>\n     <button type="button" class="').concat(swalClasses.confirm, '"></button>\n     <button type="button" class="').concat(swalClasses.deny, '"></button>\n     <button type="button" class="').concat(swalClasses.cancel, '"></button>\n   </div>\n   <div class="').concat(swalClasses.footer, '"></div>\n   <div class="').concat(swalClasses["timer-progress-bar-container"], '">\n     <div class="').concat(swalClasses["timer-progress-bar"], '"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, "");
    const resetOldContainer = () => {
      const oldContainer = getContainer();
      if (!oldContainer) {
        return false;
      }
      oldContainer.remove();
      removeClass([document.documentElement, document.body], [swalClasses["no-backdrop"], swalClasses["toast-shown"], swalClasses["has-column"]]);
      return true;
    };
    const resetValidationMessage = () => {
      globalState.currentInstance.resetValidationMessage();
    };
    const addInputChangeListeners = () => {
      const popup = getPopup();
      const input = getDirectChildByClass(popup, swalClasses.input);
      const file = getDirectChildByClass(popup, swalClasses.file);
      const range = popup.querySelector(".".concat(swalClasses.range, " input"));
      const rangeOutput = popup.querySelector(".".concat(swalClasses.range, " output"));
      const select = getDirectChildByClass(popup, swalClasses.select);
      const checkbox = popup.querySelector(".".concat(swalClasses.checkbox, " input"));
      const textarea = getDirectChildByClass(popup, swalClasses.textarea);
      input.oninput = resetValidationMessage;
      file.onchange = resetValidationMessage;
      select.onchange = resetValidationMessage;
      checkbox.onchange = resetValidationMessage;
      textarea.oninput = resetValidationMessage;
      range.oninput = () => {
        resetValidationMessage();
        rangeOutput.value = range.value;
      };
      range.onchange = () => {
        resetValidationMessage();
        rangeOutput.value = range.value;
      };
    };
    const getTarget = (target) => typeof target === "string" ? document.querySelector(target) : target;
    const setupAccessibility = (params) => {
      const popup = getPopup();
      popup.setAttribute("role", params.toast ? "alert" : "dialog");
      popup.setAttribute("aria-live", params.toast ? "polite" : "assertive");
      if (!params.toast) {
        popup.setAttribute("aria-modal", "true");
      }
    };
    const setupRTL = (targetElement) => {
      if (window.getComputedStyle(targetElement).direction === "rtl") {
        addClass(getContainer(), swalClasses.rtl);
      }
    };
    const init = (params) => {
      const oldContainerExisted = resetOldContainer();
      if (isNodeEnv()) {
        error("SweetAlert2 requires document to initialize");
        return;
      }
      const container = document.createElement("div");
      container.className = swalClasses.container;
      if (oldContainerExisted) {
        addClass(container, swalClasses["no-transition"]);
      }
      setInnerHtml(container, sweetHTML);
      const targetElement = getTarget(params.target);
      targetElement.appendChild(container);
      setupAccessibility(params);
      setupRTL(targetElement);
      addInputChangeListeners();
    };
    const parseHtmlToContainer = (param, target) => {
      if (param instanceof HTMLElement) {
        target.appendChild(param);
      } else if (typeof param === "object") {
        handleObject(param, target);
      } else if (param) {
        setInnerHtml(target, param);
      }
    };
    const handleObject = (param, target) => {
      if (param.jquery) {
        handleJqueryElem(target, param);
      } else {
        setInnerHtml(target, param.toString());
      }
    };
    const handleJqueryElem = (target, elem) => {
      target.textContent = "";
      if (0 in elem) {
        for (let i = 0; i in elem; i++) {
          target.appendChild(elem[i].cloneNode(true));
        }
      } else {
        target.appendChild(elem.cloneNode(true));
      }
    };
    const animationEndEvent = (() => {
      if (isNodeEnv()) {
        return false;
      }
      const testEl = document.createElement("div");
      const transEndEventNames = {
        WebkitAnimation: "webkitAnimationEnd",
        animation: "animationend"
      };
      for (const i in transEndEventNames) {
        if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== "undefined") {
          return transEndEventNames[i];
        }
      }
      return false;
    })();
    const measureScrollbar = () => {
      const scrollDiv = document.createElement("div");
      scrollDiv.className = swalClasses["scrollbar-measure"];
      document.body.appendChild(scrollDiv);
      const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };
    const renderActions = (instance, params) => {
      const actions = getActions();
      const loader = getLoader();
      if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
        hide(actions);
      } else {
        show(actions);
      }
      applyCustomClass(actions, params, "actions");
      renderButtons(actions, loader, params);
      setInnerHtml(loader, params.loaderHtml);
      applyCustomClass(loader, params, "loader");
    };
    function renderButtons(actions, loader, params) {
      const confirmButton = getConfirmButton();
      const denyButton = getDenyButton();
      const cancelButton = getCancelButton();
      renderButton(confirmButton, "confirm", params);
      renderButton(denyButton, "deny", params);
      renderButton(cancelButton, "cancel", params);
      handleButtonsStyling(confirmButton, denyButton, cancelButton, params);
      if (params.reverseButtons) {
        if (params.toast) {
          actions.insertBefore(cancelButton, confirmButton);
          actions.insertBefore(denyButton, confirmButton);
        } else {
          actions.insertBefore(cancelButton, loader);
          actions.insertBefore(denyButton, loader);
          actions.insertBefore(confirmButton, loader);
        }
      }
    }
    function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
      if (!params.buttonsStyling) {
        removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
        return;
      }
      addClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
      if (params.confirmButtonColor) {
        confirmButton.style.backgroundColor = params.confirmButtonColor;
        addClass(confirmButton, swalClasses["default-outline"]);
      }
      if (params.denyButtonColor) {
        denyButton.style.backgroundColor = params.denyButtonColor;
        addClass(denyButton, swalClasses["default-outline"]);
      }
      if (params.cancelButtonColor) {
        cancelButton.style.backgroundColor = params.cancelButtonColor;
        addClass(cancelButton, swalClasses["default-outline"]);
      }
    }
    function renderButton(button, buttonType, params) {
      toggle(button, params["show".concat(capitalizeFirstLetter(buttonType), "Button")], "inline-block");
      setInnerHtml(button, params["".concat(buttonType, "ButtonText")]);
      button.setAttribute("aria-label", params["".concat(buttonType, "ButtonAriaLabel")]);
      button.className = swalClasses[buttonType];
      applyCustomClass(button, params, "".concat(buttonType, "Button"));
      addClass(button, params["".concat(buttonType, "ButtonClass")]);
    }
    const renderCloseButton = (instance, params) => {
      const closeButton = getCloseButton();
      setInnerHtml(closeButton, params.closeButtonHtml);
      applyCustomClass(closeButton, params, "closeButton");
      toggle(closeButton, params.showCloseButton);
      closeButton.setAttribute("aria-label", params.closeButtonAriaLabel);
    };
    const renderContainer = (instance, params) => {
      const container = getContainer();
      if (!container) {
        return;
      }
      handleBackdropParam(container, params.backdrop);
      handlePositionParam(container, params.position);
      handleGrowParam(container, params.grow);
      applyCustomClass(container, params, "container");
    };
    function handleBackdropParam(container, backdrop) {
      if (typeof backdrop === "string") {
        container.style.background = backdrop;
      } else if (!backdrop) {
        addClass([document.documentElement, document.body], swalClasses["no-backdrop"]);
      }
    }
    function handlePositionParam(container, position) {
      if (position in swalClasses) {
        addClass(container, swalClasses[position]);
      } else {
        warn2('The "position" parameter is not valid, defaulting to "center"');
        addClass(container, swalClasses.center);
      }
    }
    function handleGrowParam(container, grow) {
      if (grow && typeof grow === "string") {
        const growClass = "grow-".concat(grow);
        if (growClass in swalClasses) {
          addClass(container, swalClasses[growClass]);
        }
      }
    }
    const inputClasses = ["input", "file", "range", "select", "radio", "checkbox", "textarea"];
    const renderInput = (instance, params) => {
      const popup = getPopup();
      const innerParams = privateProps.innerParams.get(instance);
      const rerender = !innerParams || params.input !== innerParams.input;
      inputClasses.forEach((inputClass) => {
        const inputContainer = getDirectChildByClass(popup, swalClasses[inputClass]);
        setAttributes(inputClass, params.inputAttributes);
        inputContainer.className = swalClasses[inputClass];
        if (rerender) {
          hide(inputContainer);
        }
      });
      if (params.input) {
        if (rerender) {
          showInput(params);
        }
        setCustomClass(params);
      }
    };
    const showInput = (params) => {
      if (!renderInputType[params.input]) {
        error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(params.input, '"'));
        return;
      }
      const inputContainer = getInputContainer(params.input);
      const input = renderInputType[params.input](inputContainer, params);
      show(inputContainer);
      setTimeout(() => {
        focusInput(input);
      });
    };
    const removeAttributes = (input) => {
      for (let i = 0; i < input.attributes.length; i++) {
        const attrName = input.attributes[i].name;
        if (!["type", "value", "style"].includes(attrName)) {
          input.removeAttribute(attrName);
        }
      }
    };
    const setAttributes = (inputClass, inputAttributes) => {
      const input = getInput(getPopup(), inputClass);
      if (!input) {
        return;
      }
      removeAttributes(input);
      for (const attr in inputAttributes) {
        input.setAttribute(attr, inputAttributes[attr]);
      }
    };
    const setCustomClass = (params) => {
      const inputContainer = getInputContainer(params.input);
      if (typeof params.customClass === "object") {
        addClass(inputContainer, params.customClass.input);
      }
    };
    const setInputPlaceholder = (input, params) => {
      if (!input.placeholder || params.inputPlaceholder) {
        input.placeholder = params.inputPlaceholder;
      }
    };
    const setInputLabel = (input, prependTo, params) => {
      if (params.inputLabel) {
        input.id = swalClasses.input;
        const label = document.createElement("label");
        const labelClass = swalClasses["input-label"];
        label.setAttribute("for", input.id);
        label.className = labelClass;
        if (typeof params.customClass === "object") {
          addClass(label, params.customClass.inputLabel);
        }
        label.innerText = params.inputLabel;
        prependTo.insertAdjacentElement("beforebegin", label);
      }
    };
    const getInputContainer = (inputType) => {
      return getDirectChildByClass(getPopup(), swalClasses[inputType] || swalClasses.input);
    };
    const checkAndSetInputValue = (input, inputValue) => {
      if (["string", "number"].includes(typeof inputValue)) {
        input.value = "".concat(inputValue);
      } else if (!isPromise(inputValue)) {
        warn2('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof inputValue, '"'));
      }
    };
    const renderInputType = {};
    renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = (input, params) => {
      checkAndSetInputValue(input, params.inputValue);
      setInputLabel(input, input, params);
      setInputPlaceholder(input, params);
      input.type = params.input;
      return input;
    };
    renderInputType.file = (input, params) => {
      setInputLabel(input, input, params);
      setInputPlaceholder(input, params);
      return input;
    };
    renderInputType.range = (range, params) => {
      const rangeInput = range.querySelector("input");
      const rangeOutput = range.querySelector("output");
      checkAndSetInputValue(rangeInput, params.inputValue);
      rangeInput.type = params.input;
      checkAndSetInputValue(rangeOutput, params.inputValue);
      setInputLabel(rangeInput, range, params);
      return range;
    };
    renderInputType.select = (select, params) => {
      select.textContent = "";
      if (params.inputPlaceholder) {
        const placeholder = document.createElement("option");
        setInnerHtml(placeholder, params.inputPlaceholder);
        placeholder.value = "";
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);
      }
      setInputLabel(select, select, params);
      return select;
    };
    renderInputType.radio = (radio) => {
      radio.textContent = "";
      return radio;
    };
    renderInputType.checkbox = (checkboxContainer, params) => {
      const checkbox = getInput(getPopup(), "checkbox");
      checkbox.value = "1";
      checkbox.id = swalClasses.checkbox;
      checkbox.checked = Boolean(params.inputValue);
      const label = checkboxContainer.querySelector("span");
      setInnerHtml(label, params.inputPlaceholder);
      return checkbox;
    };
    renderInputType.textarea = (textarea, params) => {
      checkAndSetInputValue(textarea, params.inputValue);
      setInputPlaceholder(textarea, params);
      setInputLabel(textarea, textarea, params);
      const getMargin = (el) => parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);
      setTimeout(() => {
        if ("MutationObserver" in window) {
          const initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
          const textareaResizeHandler = () => {
            const textareaWidth = textarea.offsetWidth + getMargin(textarea);
            if (textareaWidth > initialPopupWidth) {
              getPopup().style.width = "".concat(textareaWidth, "px");
            } else {
              getPopup().style.width = null;
            }
          };
          new MutationObserver(textareaResizeHandler).observe(textarea, {
            attributes: true,
            attributeFilter: ["style"]
          });
        }
      });
      return textarea;
    };
    const renderContent = (instance, params) => {
      const htmlContainer = getHtmlContainer();
      applyCustomClass(htmlContainer, params, "htmlContainer");
      if (params.html) {
        parseHtmlToContainer(params.html, htmlContainer);
        show(htmlContainer, "block");
      } else if (params.text) {
        htmlContainer.textContent = params.text;
        show(htmlContainer, "block");
      } else {
        hide(htmlContainer);
      }
      renderInput(instance, params);
    };
    const renderFooter = (instance, params) => {
      const footer = getFooter();
      toggle(footer, params.footer);
      if (params.footer) {
        parseHtmlToContainer(params.footer, footer);
      }
      applyCustomClass(footer, params, "footer");
    };
    const renderIcon = (instance, params) => {
      const innerParams = privateProps.innerParams.get(instance);
      const icon = getIcon();
      if (innerParams && params.icon === innerParams.icon) {
        setContent(icon, params);
        applyStyles(icon, params);
        return;
      }
      if (!params.icon && !params.iconHtml) {
        hide(icon);
        return;
      }
      if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
        error('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(params.icon, '"'));
        hide(icon);
        return;
      }
      show(icon);
      setContent(icon, params);
      applyStyles(icon, params);
      addClass(icon, params.showClass.icon);
    };
    const applyStyles = (icon, params) => {
      for (const iconType in iconTypes) {
        if (params.icon !== iconType) {
          removeClass(icon, iconTypes[iconType]);
        }
      }
      addClass(icon, iconTypes[params.icon]);
      setColor(icon, params);
      adjustSuccessIconBackgroundColor();
      applyCustomClass(icon, params, "icon");
    };
    const adjustSuccessIconBackgroundColor = () => {
      const popup = getPopup();
      const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue("background-color");
      const successIconParts = popup.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");
      for (let i = 0; i < successIconParts.length; i++) {
        successIconParts[i].style.backgroundColor = popupBackgroundColor;
      }
    };
    const successIconHtml = '\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n';
    const errorIconHtml = '\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';
    const setContent = (icon, params) => {
      let oldContent = icon.innerHTML;
      let newContent;
      if (params.iconHtml) {
        newContent = iconContent(params.iconHtml);
      } else if (params.icon === "success") {
        newContent = successIconHtml;
        oldContent = oldContent.replace(/ style=".*?"/g, "");
      } else if (params.icon === "error") {
        newContent = errorIconHtml;
      } else {
        const defaultIconHtml = {
          question: "?",
          warning: "!",
          info: "i"
        };
        newContent = iconContent(defaultIconHtml[params.icon]);
      }
      if (oldContent.trim() !== newContent.trim()) {
        setInnerHtml(icon, newContent);
      }
    };
    const setColor = (icon, params) => {
      if (!params.iconColor) {
        return;
      }
      icon.style.color = params.iconColor;
      icon.style.borderColor = params.iconColor;
      for (const sel of [".swal2-success-line-tip", ".swal2-success-line-long", ".swal2-x-mark-line-left", ".swal2-x-mark-line-right"]) {
        setStyle(icon, sel, "backgroundColor", params.iconColor);
      }
      setStyle(icon, ".swal2-success-ring", "borderColor", params.iconColor);
    };
    const iconContent = (content) => '<div class="'.concat(swalClasses["icon-content"], '">').concat(content, "</div>");
    const renderImage = (instance, params) => {
      const image = getImage();
      if (!params.imageUrl) {
        hide(image);
        return;
      }
      show(image, "");
      image.setAttribute("src", params.imageUrl);
      image.setAttribute("alt", params.imageAlt);
      applyNumericalStyle(image, "width", params.imageWidth);
      applyNumericalStyle(image, "height", params.imageHeight);
      image.className = swalClasses.image;
      applyCustomClass(image, params, "image");
    };
    const renderPopup = (instance, params) => {
      const container = getContainer();
      const popup = getPopup();
      if (params.toast) {
        applyNumericalStyle(container, "width", params.width);
        popup.style.width = "100%";
        popup.insertBefore(getLoader(), getIcon());
      } else {
        applyNumericalStyle(popup, "width", params.width);
      }
      applyNumericalStyle(popup, "padding", params.padding);
      if (params.color) {
        popup.style.color = params.color;
      }
      if (params.background) {
        popup.style.background = params.background;
      }
      hide(getValidationMessage());
      addClasses(popup, params);
    };
    const addClasses = (popup, params) => {
      popup.className = "".concat(swalClasses.popup, " ").concat(isVisible(popup) ? params.showClass.popup : "");
      if (params.toast) {
        addClass([document.documentElement, document.body], swalClasses["toast-shown"]);
        addClass(popup, swalClasses.toast);
      } else {
        addClass(popup, swalClasses.modal);
      }
      applyCustomClass(popup, params, "popup");
      if (typeof params.customClass === "string") {
        addClass(popup, params.customClass);
      }
      if (params.icon) {
        addClass(popup, swalClasses["icon-".concat(params.icon)]);
      }
    };
    const renderProgressSteps = (instance, params) => {
      const progressStepsContainer = getProgressSteps();
      if (!params.progressSteps || params.progressSteps.length === 0) {
        hide(progressStepsContainer);
        return;
      }
      show(progressStepsContainer);
      progressStepsContainer.textContent = "";
      if (params.currentProgressStep >= params.progressSteps.length) {
        warn2("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)");
      }
      params.progressSteps.forEach((step, index2) => {
        const stepEl = createStepElement(step);
        progressStepsContainer.appendChild(stepEl);
        if (index2 === params.currentProgressStep) {
          addClass(stepEl, swalClasses["active-progress-step"]);
        }
        if (index2 !== params.progressSteps.length - 1) {
          const lineEl = createLineElement(params);
          progressStepsContainer.appendChild(lineEl);
        }
      });
    };
    const createStepElement = (step) => {
      const stepEl = document.createElement("li");
      addClass(stepEl, swalClasses["progress-step"]);
      setInnerHtml(stepEl, step);
      return stepEl;
    };
    const createLineElement = (params) => {
      const lineEl = document.createElement("li");
      addClass(lineEl, swalClasses["progress-step-line"]);
      if (params.progressStepsDistance) {
        applyNumericalStyle(lineEl, "width", params.progressStepsDistance);
      }
      return lineEl;
    };
    const renderTitle = (instance, params) => {
      const title = getTitle();
      toggle(title, params.title || params.titleText, "block");
      if (params.title) {
        parseHtmlToContainer(params.title, title);
      }
      if (params.titleText) {
        title.innerText = params.titleText;
      }
      applyCustomClass(title, params, "title");
    };
    const render = (instance, params) => {
      renderPopup(instance, params);
      renderContainer(instance, params);
      renderProgressSteps(instance, params);
      renderIcon(instance, params);
      renderImage(instance, params);
      renderTitle(instance, params);
      renderCloseButton(instance, params);
      renderContent(instance, params);
      renderActions(instance, params);
      renderFooter(instance, params);
      if (typeof params.didRender === "function") {
        params.didRender(getPopup());
      }
    };
    function hideLoading() {
      const innerParams = privateProps.innerParams.get(this);
      if (!innerParams) {
        return;
      }
      const domCache = privateProps.domCache.get(this);
      hide(domCache.loader);
      if (isToast()) {
        if (innerParams.icon) {
          show(getIcon());
        }
      } else {
        showRelatedButton(domCache);
      }
      removeClass([domCache.popup, domCache.actions], swalClasses.loading);
      domCache.popup.removeAttribute("aria-busy");
      domCache.popup.removeAttribute("data-loading");
      domCache.confirmButton.disabled = false;
      domCache.denyButton.disabled = false;
      domCache.cancelButton.disabled = false;
    }
    const showRelatedButton = (domCache) => {
      const buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute("data-button-to-replace"));
      if (buttonToReplace.length) {
        show(buttonToReplace[0], "inline-block");
      } else if (allButtonsAreHidden()) {
        hide(domCache.actions);
      }
    };
    function getInput$1(instance) {
      const innerParams = privateProps.innerParams.get(instance || this);
      const domCache = privateProps.domCache.get(instance || this);
      if (!domCache) {
        return null;
      }
      return getInput(domCache.popup, innerParams.input);
    }
    const isVisible$1 = () => {
      return isVisible(getPopup());
    };
    const clickConfirm = () => getConfirmButton() && getConfirmButton().click();
    const clickDeny = () => getDenyButton() && getDenyButton().click();
    const clickCancel = () => getCancelButton() && getCancelButton().click();
    const DismissReason = Object.freeze({
      cancel: "cancel",
      backdrop: "backdrop",
      close: "close",
      esc: "esc",
      timer: "timer"
    });
    const removeKeydownHandler = (globalState2) => {
      if (globalState2.keydownTarget && globalState2.keydownHandlerAdded) {
        globalState2.keydownTarget.removeEventListener("keydown", globalState2.keydownHandler, {
          capture: globalState2.keydownListenerCapture
        });
        globalState2.keydownHandlerAdded = false;
      }
    };
    const addKeydownHandler = (instance, globalState2, innerParams, dismissWith) => {
      removeKeydownHandler(globalState2);
      if (!innerParams.toast) {
        globalState2.keydownHandler = (e) => keydownHandler(instance, e, dismissWith);
        globalState2.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
        globalState2.keydownListenerCapture = innerParams.keydownListenerCapture;
        globalState2.keydownTarget.addEventListener("keydown", globalState2.keydownHandler, {
          capture: globalState2.keydownListenerCapture
        });
        globalState2.keydownHandlerAdded = true;
      }
    };
    const setFocus = (innerParams, index2, increment) => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length) {
        index2 = index2 + increment;
        if (index2 === focusableElements.length) {
          index2 = 0;
        } else if (index2 === -1) {
          index2 = focusableElements.length - 1;
        }
        return focusableElements[index2].focus();
      }
      getPopup().focus();
    };
    const arrowKeysNextButton = ["ArrowRight", "ArrowDown"];
    const arrowKeysPreviousButton = ["ArrowLeft", "ArrowUp"];
    const keydownHandler = (instance, e, dismissWith) => {
      const innerParams = privateProps.innerParams.get(instance);
      if (!innerParams) {
        return;
      }
      if (e.isComposing || e.keyCode === 229) {
        return;
      }
      if (innerParams.stopKeydownPropagation) {
        e.stopPropagation();
      }
      if (e.key === "Enter") {
        handleEnter(instance, e, innerParams);
      } else if (e.key === "Tab") {
        handleTab(e, innerParams);
      } else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(e.key)) {
        handleArrows(e.key);
      } else if (e.key === "Escape") {
        handleEsc(e, innerParams, dismissWith);
      }
    };
    const handleEnter = (instance, e, innerParams) => {
      if (!callIfFunction(innerParams.allowEnterKey)) {
        return;
      }
      if (e.target && instance.getInput() && e.target instanceof HTMLElement && e.target.outerHTML === instance.getInput().outerHTML) {
        if (["textarea", "file"].includes(innerParams.input)) {
          return;
        }
        clickConfirm();
        e.preventDefault();
      }
    };
    const handleTab = (e, innerParams) => {
      const targetElement = e.target;
      const focusableElements = getFocusableElements();
      let btnIndex = -1;
      for (let i = 0; i < focusableElements.length; i++) {
        if (targetElement === focusableElements[i]) {
          btnIndex = i;
          break;
        }
      }
      if (!e.shiftKey) {
        setFocus(innerParams, btnIndex, 1);
      } else {
        setFocus(innerParams, btnIndex, -1);
      }
      e.stopPropagation();
      e.preventDefault();
    };
    const handleArrows = (key) => {
      const confirmButton = getConfirmButton();
      const denyButton = getDenyButton();
      const cancelButton = getCancelButton();
      if (document.activeElement instanceof HTMLElement && ![confirmButton, denyButton, cancelButton].includes(document.activeElement)) {
        return;
      }
      const sibling = arrowKeysNextButton.includes(key) ? "nextElementSibling" : "previousElementSibling";
      let buttonToFocus = document.activeElement;
      for (let i = 0; i < getActions().children.length; i++) {
        buttonToFocus = buttonToFocus[sibling];
        if (!buttonToFocus) {
          return;
        }
        if (buttonToFocus instanceof HTMLButtonElement && isVisible(buttonToFocus)) {
          break;
        }
      }
      if (buttonToFocus instanceof HTMLButtonElement) {
        buttonToFocus.focus();
      }
    };
    const handleEsc = (e, innerParams, dismissWith) => {
      if (callIfFunction(innerParams.allowEscapeKey)) {
        e.preventDefault();
        dismissWith(DismissReason.esc);
      }
    };
    var privateMethods = {
      swalPromiseResolve: /* @__PURE__ */ new WeakMap(),
      swalPromiseReject: /* @__PURE__ */ new WeakMap()
    };
    const setAriaHidden = () => {
      const bodyChildren = Array.from(document.body.children);
      bodyChildren.forEach((el) => {
        if (el === getContainer() || el.contains(getContainer())) {
          return;
        }
        if (el.hasAttribute("aria-hidden")) {
          el.setAttribute("data-previous-aria-hidden", el.getAttribute("aria-hidden"));
        }
        el.setAttribute("aria-hidden", "true");
      });
    };
    const unsetAriaHidden = () => {
      const bodyChildren = Array.from(document.body.children);
      bodyChildren.forEach((el) => {
        if (el.hasAttribute("data-previous-aria-hidden")) {
          el.setAttribute("aria-hidden", el.getAttribute("data-previous-aria-hidden"));
          el.removeAttribute("data-previous-aria-hidden");
        } else {
          el.removeAttribute("aria-hidden");
        }
      });
    };
    const iOSfix = () => {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
      if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
        const offset2 = document.body.scrollTop;
        document.body.style.top = "".concat(offset2 * -1, "px");
        addClass(document.body, swalClasses.iosfix);
        lockBodyScroll();
        addBottomPaddingForTallPopups();
      }
    };
    const addBottomPaddingForTallPopups = () => {
      const ua = navigator.userAgent;
      const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
      const webkit = !!ua.match(/WebKit/i);
      const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
      if (iOSSafari) {
        const bottomPanelHeight = 44;
        if (getPopup().scrollHeight > window.innerHeight - bottomPanelHeight) {
          getContainer().style.paddingBottom = "".concat(bottomPanelHeight, "px");
        }
      }
    };
    const lockBodyScroll = () => {
      const container = getContainer();
      let preventTouchMove;
      container.ontouchstart = (e) => {
        preventTouchMove = shouldPreventTouchMove(e);
      };
      container.ontouchmove = (e) => {
        if (preventTouchMove) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
    };
    const shouldPreventTouchMove = (event) => {
      const target = event.target;
      const container = getContainer();
      if (isStylus(event) || isZoom(event)) {
        return false;
      }
      if (target === container) {
        return true;
      }
      if (!isScrollable(container) && target instanceof HTMLElement && target.tagName !== "INPUT" && target.tagName !== "TEXTAREA" && !(isScrollable(getHtmlContainer()) && getHtmlContainer().contains(target))) {
        return true;
      }
      return false;
    };
    const isStylus = (event) => {
      return event.touches && event.touches.length && event.touches[0].touchType === "stylus";
    };
    const isZoom = (event) => {
      return event.touches && event.touches.length > 1;
    };
    const undoIOSfix = () => {
      if (hasClass(document.body, swalClasses.iosfix)) {
        const offset2 = parseInt(document.body.style.top, 10);
        removeClass(document.body, swalClasses.iosfix);
        document.body.style.top = "";
        document.body.scrollTop = offset2 * -1;
      }
    };
    const fixScrollbar = () => {
      if (states.previousBodyPadding !== null) {
        return;
      }
      if (document.body.scrollHeight > window.innerHeight) {
        states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"));
        document.body.style.paddingRight = "".concat(states.previousBodyPadding + measureScrollbar(), "px");
      }
    };
    const undoScrollbar = () => {
      if (states.previousBodyPadding !== null) {
        document.body.style.paddingRight = "".concat(states.previousBodyPadding, "px");
        states.previousBodyPadding = null;
      }
    };
    function removePopupAndResetState(instance, container, returnFocus, didClose) {
      if (isToast()) {
        triggerDidCloseAndDispose(instance, didClose);
      } else {
        restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose));
        removeKeydownHandler(globalState);
      }
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari) {
        container.setAttribute("style", "display:none !important");
        container.removeAttribute("class");
        container.innerHTML = "";
      } else {
        container.remove();
      }
      if (isModal()) {
        undoScrollbar();
        undoIOSfix();
        unsetAriaHidden();
      }
      removeBodyClasses();
    }
    function removeBodyClasses() {
      removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses["height-auto"], swalClasses["no-backdrop"], swalClasses["toast-shown"]]);
    }
    function close(resolveValue) {
      resolveValue = prepareResolveValue(resolveValue);
      const swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
      const didClose = triggerClosePopup(this);
      if (this.isAwaitingPromise()) {
        if (!resolveValue.isDismissed) {
          handleAwaitingPromise(this);
          swalPromiseResolve(resolveValue);
        }
      } else if (didClose) {
        swalPromiseResolve(resolveValue);
      }
    }
    function isAwaitingPromise() {
      return !!privateProps.awaitingPromise.get(this);
    }
    const triggerClosePopup = (instance) => {
      const popup = getPopup();
      if (!popup) {
        return false;
      }
      const innerParams = privateProps.innerParams.get(instance);
      if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
        return false;
      }
      removeClass(popup, innerParams.showClass.popup);
      addClass(popup, innerParams.hideClass.popup);
      const backdrop = getContainer();
      removeClass(backdrop, innerParams.showClass.backdrop);
      addClass(backdrop, innerParams.hideClass.backdrop);
      handlePopupAnimation(instance, popup, innerParams);
      return true;
    };
    function rejectPromise(error2) {
      const rejectPromise2 = privateMethods.swalPromiseReject.get(this);
      handleAwaitingPromise(this);
      if (rejectPromise2) {
        rejectPromise2(error2);
      }
    }
    const handleAwaitingPromise = (instance) => {
      if (instance.isAwaitingPromise()) {
        privateProps.awaitingPromise.delete(instance);
        if (!privateProps.innerParams.get(instance)) {
          instance._destroy();
        }
      }
    };
    const prepareResolveValue = (resolveValue) => {
      if (typeof resolveValue === "undefined") {
        return {
          isConfirmed: false,
          isDenied: false,
          isDismissed: true
        };
      }
      return Object.assign({
        isConfirmed: false,
        isDenied: false,
        isDismissed: false
      }, resolveValue);
    };
    const handlePopupAnimation = (instance, popup, innerParams) => {
      const container = getContainer();
      const animationIsSupported = animationEndEvent && hasCssAnimation(popup);
      if (typeof innerParams.willClose === "function") {
        innerParams.willClose(popup);
      }
      if (animationIsSupported) {
        animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose);
      } else {
        removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose);
      }
    };
    const animatePopup = (instance, popup, container, returnFocus, didClose) => {
      globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, returnFocus, didClose);
      popup.addEventListener(animationEndEvent, function(e) {
        if (e.target === popup) {
          globalState.swalCloseEventFinishedCallback();
          delete globalState.swalCloseEventFinishedCallback;
        }
      });
    };
    const triggerDidCloseAndDispose = (instance, didClose) => {
      setTimeout(() => {
        if (typeof didClose === "function") {
          didClose.bind(instance.params)();
        }
        instance._destroy();
      });
    };
    function setButtonsDisabled(instance, buttons, disabled) {
      const domCache = privateProps.domCache.get(instance);
      buttons.forEach((button) => {
        domCache[button].disabled = disabled;
      });
    }
    function setInputDisabled(input, disabled) {
      if (!input) {
        return;
      }
      if (input.type === "radio") {
        const radiosContainer = input.parentNode.parentNode;
        const radios = radiosContainer.querySelectorAll("input");
        for (let i = 0; i < radios.length; i++) {
          radios[i].disabled = disabled;
        }
      } else {
        input.disabled = disabled;
      }
    }
    function enableButtons() {
      setButtonsDisabled(this, ["confirmButton", "denyButton", "cancelButton"], false);
    }
    function disableButtons() {
      setButtonsDisabled(this, ["confirmButton", "denyButton", "cancelButton"], true);
    }
    function enableInput() {
      setInputDisabled(this.getInput(), false);
    }
    function disableInput() {
      setInputDisabled(this.getInput(), true);
    }
    function showValidationMessage(error2) {
      const domCache = privateProps.domCache.get(this);
      const params = privateProps.innerParams.get(this);
      setInnerHtml(domCache.validationMessage, error2);
      domCache.validationMessage.className = swalClasses["validation-message"];
      if (params.customClass && params.customClass.validationMessage) {
        addClass(domCache.validationMessage, params.customClass.validationMessage);
      }
      show(domCache.validationMessage);
      const input = this.getInput();
      if (input) {
        input.setAttribute("aria-invalid", true);
        input.setAttribute("aria-describedby", swalClasses["validation-message"]);
        focusInput(input);
        addClass(input, swalClasses.inputerror);
      }
    }
    function resetValidationMessage$1() {
      const domCache = privateProps.domCache.get(this);
      if (domCache.validationMessage) {
        hide(domCache.validationMessage);
      }
      const input = this.getInput();
      if (input) {
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
        removeClass(input, swalClasses.inputerror);
      }
    }
    function getProgressSteps$1() {
      const domCache = privateProps.domCache.get(this);
      return domCache.progressSteps;
    }
    const defaultParams = {
      title: "",
      titleText: "",
      text: "",
      html: "",
      footer: "",
      icon: void 0,
      iconColor: void 0,
      iconHtml: void 0,
      template: void 0,
      toast: false,
      showClass: {
        popup: "swal2-show",
        backdrop: "swal2-backdrop-show",
        icon: "swal2-icon-show"
      },
      hideClass: {
        popup: "swal2-hide",
        backdrop: "swal2-backdrop-hide",
        icon: "swal2-icon-hide"
      },
      customClass: {},
      target: "body",
      color: void 0,
      backdrop: true,
      heightAuto: true,
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      stopKeydownPropagation: true,
      keydownListenerCapture: false,
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: false,
      preConfirm: void 0,
      preDeny: void 0,
      confirmButtonText: "OK",
      confirmButtonAriaLabel: "",
      confirmButtonColor: void 0,
      denyButtonText: "No",
      denyButtonAriaLabel: "",
      denyButtonColor: void 0,
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "",
      cancelButtonColor: void 0,
      buttonsStyling: true,
      reverseButtons: false,
      focusConfirm: true,
      focusDeny: false,
      focusCancel: false,
      returnFocus: true,
      showCloseButton: false,
      closeButtonHtml: "&times;",
      closeButtonAriaLabel: "Close this dialog",
      loaderHtml: "",
      showLoaderOnConfirm: false,
      showLoaderOnDeny: false,
      imageUrl: void 0,
      imageWidth: void 0,
      imageHeight: void 0,
      imageAlt: "",
      timer: void 0,
      timerProgressBar: false,
      width: void 0,
      padding: void 0,
      background: void 0,
      input: void 0,
      inputPlaceholder: "",
      inputLabel: "",
      inputValue: "",
      inputOptions: {},
      inputAutoTrim: true,
      inputAttributes: {},
      inputValidator: void 0,
      returnInputValueOnDeny: false,
      validationMessage: void 0,
      grow: false,
      position: "center",
      progressSteps: [],
      currentProgressStep: void 0,
      progressStepsDistance: void 0,
      willOpen: void 0,
      didOpen: void 0,
      didRender: void 0,
      willClose: void 0,
      didClose: void 0,
      didDestroy: void 0,
      scrollbarPadding: true
    };
    const updatableParams = ["allowEscapeKey", "allowOutsideClick", "background", "buttonsStyling", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonText", "closeButtonAriaLabel", "closeButtonHtml", "color", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonText", "currentProgressStep", "customClass", "denyButtonAriaLabel", "denyButtonColor", "denyButtonText", "didClose", "didDestroy", "footer", "hideClass", "html", "icon", "iconColor", "iconHtml", "imageAlt", "imageHeight", "imageUrl", "imageWidth", "preConfirm", "preDeny", "progressSteps", "returnFocus", "reverseButtons", "showCancelButton", "showCloseButton", "showConfirmButton", "showDenyButton", "text", "title", "titleText", "willClose"];
    const deprecatedParams = {};
    const toastIncompatibleParams = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusDeny", "focusCancel", "returnFocus", "heightAuto", "keydownListenerCapture"];
    const isValidParameter = (paramName) => {
      return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
    };
    const isUpdatableParameter = (paramName) => {
      return updatableParams.indexOf(paramName) !== -1;
    };
    const isDeprecatedParameter = (paramName) => {
      return deprecatedParams[paramName];
    };
    const checkIfParamIsValid = (param) => {
      if (!isValidParameter(param)) {
        warn2('Unknown parameter "'.concat(param, '"'));
      }
    };
    const checkIfToastParamIsValid = (param) => {
      if (toastIncompatibleParams.includes(param)) {
        warn2('The parameter "'.concat(param, '" is incompatible with toasts'));
      }
    };
    const checkIfParamIsDeprecated = (param) => {
      if (isDeprecatedParameter(param)) {
        warnAboutDeprecation(param, isDeprecatedParameter(param));
      }
    };
    const showWarningsForParams = (params) => {
      if (!params.backdrop && params.allowOutsideClick) {
        warn2('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
      }
      for (const param in params) {
        checkIfParamIsValid(param);
        if (params.toast) {
          checkIfToastParamIsValid(param);
        }
        checkIfParamIsDeprecated(param);
      }
    };
    function update(params) {
      const popup = getPopup();
      const innerParams = privateProps.innerParams.get(this);
      if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
        return warn2("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
      }
      const validUpdatableParams = filterValidParams(params);
      const updatedParams = Object.assign({}, innerParams, validUpdatableParams);
      render(this, updatedParams);
      privateProps.innerParams.set(this, updatedParams);
      Object.defineProperties(this, {
        params: {
          value: Object.assign({}, this.params, params),
          writable: false,
          enumerable: true
        }
      });
    }
    const filterValidParams = (params) => {
      const validUpdatableParams = {};
      Object.keys(params).forEach((param) => {
        if (isUpdatableParameter(param)) {
          validUpdatableParams[param] = params[param];
        } else {
          warn2("Invalid parameter to update: ".concat(param));
        }
      });
      return validUpdatableParams;
    };
    function _destroy() {
      const domCache = privateProps.domCache.get(this);
      const innerParams = privateProps.innerParams.get(this);
      if (!innerParams) {
        disposeWeakMaps(this);
        return;
      }
      if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
        globalState.swalCloseEventFinishedCallback();
        delete globalState.swalCloseEventFinishedCallback;
      }
      if (typeof innerParams.didDestroy === "function") {
        innerParams.didDestroy();
      }
      disposeSwal(this);
    }
    const disposeSwal = (instance) => {
      disposeWeakMaps(instance);
      delete instance.params;
      delete globalState.keydownHandler;
      delete globalState.keydownTarget;
      delete globalState.currentInstance;
    };
    const disposeWeakMaps = (instance) => {
      if (instance.isAwaitingPromise()) {
        unsetWeakMaps(privateProps, instance);
        privateProps.awaitingPromise.set(instance, true);
      } else {
        unsetWeakMaps(privateMethods, instance);
        unsetWeakMaps(privateProps, instance);
      }
    };
    const unsetWeakMaps = (obj, instance) => {
      for (const i in obj) {
        obj[i].delete(instance);
      }
    };
    var instanceMethods = /* @__PURE__ */ Object.freeze({
      hideLoading,
      disableLoading: hideLoading,
      getInput: getInput$1,
      close,
      isAwaitingPromise,
      rejectPromise,
      handleAwaitingPromise,
      closePopup: close,
      closeModal: close,
      closeToast: close,
      enableButtons,
      disableButtons,
      enableInput,
      disableInput,
      showValidationMessage,
      resetValidationMessage: resetValidationMessage$1,
      getProgressSteps: getProgressSteps$1,
      update,
      _destroy
    });
    const showLoading = (buttonToReplace) => {
      let popup = getPopup();
      if (!popup) {
        new Swal2();
      }
      popup = getPopup();
      const loader = getLoader();
      if (isToast()) {
        hide(getIcon());
      } else {
        replaceButton(popup, buttonToReplace);
      }
      show(loader);
      popup.setAttribute("data-loading", "true");
      popup.setAttribute("aria-busy", "true");
      popup.focus();
    };
    const replaceButton = (popup, buttonToReplace) => {
      const actions = getActions();
      const loader = getLoader();
      if (!buttonToReplace && isVisible(getConfirmButton())) {
        buttonToReplace = getConfirmButton();
      }
      show(actions);
      if (buttonToReplace) {
        hide(buttonToReplace);
        loader.setAttribute("data-button-to-replace", buttonToReplace.className);
      }
      loader.parentNode.insertBefore(loader, buttonToReplace);
      addClass([popup, actions], swalClasses.loading);
    };
    const handleInputOptionsAndValue = (instance, params) => {
      if (params.input === "select" || params.input === "radio") {
        handleInputOptions(instance, params);
      } else if (["text", "email", "number", "tel", "textarea"].includes(params.input) && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
        showLoading(getConfirmButton());
        handleInputValue(instance, params);
      }
    };
    const getInputValue = (instance, innerParams) => {
      const input = instance.getInput();
      if (!input) {
        return null;
      }
      switch (innerParams.input) {
        case "checkbox":
          return getCheckboxValue(input);
        case "radio":
          return getRadioValue(input);
        case "file":
          return getFileValue(input);
        default:
          return innerParams.inputAutoTrim ? input.value.trim() : input.value;
      }
    };
    const getCheckboxValue = (input) => input.checked ? 1 : 0;
    const getRadioValue = (input) => input.checked ? input.value : null;
    const getFileValue = (input) => input.files.length ? input.getAttribute("multiple") !== null ? input.files : input.files[0] : null;
    const handleInputOptions = (instance, params) => {
      const popup = getPopup();
      const processInputOptions = (inputOptions) => {
        populateInputOptions[params.input](popup, formatInputOptions(inputOptions), params);
      };
      if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
        showLoading(getConfirmButton());
        asPromise(params.inputOptions).then((inputOptions) => {
          instance.hideLoading();
          processInputOptions(inputOptions);
        });
      } else if (typeof params.inputOptions === "object") {
        processInputOptions(params.inputOptions);
      } else {
        error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof params.inputOptions));
      }
    };
    const handleInputValue = (instance, params) => {
      const input = instance.getInput();
      hide(input);
      asPromise(params.inputValue).then((inputValue) => {
        input.value = params.input === "number" ? "".concat(parseFloat(inputValue) || 0) : "".concat(inputValue);
        show(input);
        input.focus();
        instance.hideLoading();
      }).catch((err) => {
        error("Error in inputValue promise: ".concat(err));
        input.value = "";
        show(input);
        input.focus();
        instance.hideLoading();
      });
    };
    const populateInputOptions = {
      select: (popup, inputOptions, params) => {
        const select = getDirectChildByClass(popup, swalClasses.select);
        const renderOption = (parent, optionLabel, optionValue) => {
          const option = document.createElement("option");
          option.value = optionValue;
          setInnerHtml(option, optionLabel);
          option.selected = isSelected(optionValue, params.inputValue);
          parent.appendChild(option);
        };
        inputOptions.forEach((inputOption) => {
          const optionValue = inputOption[0];
          const optionLabel = inputOption[1];
          if (Array.isArray(optionLabel)) {
            const optgroup = document.createElement("optgroup");
            optgroup.label = optionValue;
            optgroup.disabled = false;
            select.appendChild(optgroup);
            optionLabel.forEach((o) => renderOption(optgroup, o[1], o[0]));
          } else {
            renderOption(select, optionLabel, optionValue);
          }
        });
        select.focus();
      },
      radio: (popup, inputOptions, params) => {
        const radio = getDirectChildByClass(popup, swalClasses.radio);
        inputOptions.forEach((inputOption) => {
          const radioValue = inputOption[0];
          const radioLabel = inputOption[1];
          const radioInput = document.createElement("input");
          const radioLabelElement = document.createElement("label");
          radioInput.type = "radio";
          radioInput.name = swalClasses.radio;
          radioInput.value = radioValue;
          if (isSelected(radioValue, params.inputValue)) {
            radioInput.checked = true;
          }
          const label = document.createElement("span");
          setInnerHtml(label, radioLabel);
          label.className = swalClasses.label;
          radioLabelElement.appendChild(radioInput);
          radioLabelElement.appendChild(label);
          radio.appendChild(radioLabelElement);
        });
        const radios = radio.querySelectorAll("input");
        if (radios.length) {
          radios[0].focus();
        }
      }
    };
    const formatInputOptions = (inputOptions) => {
      const result = [];
      if (typeof Map !== "undefined" && inputOptions instanceof Map) {
        inputOptions.forEach((value, key) => {
          let valueFormatted = value;
          if (typeof valueFormatted === "object") {
            valueFormatted = formatInputOptions(valueFormatted);
          }
          result.push([key, valueFormatted]);
        });
      } else {
        Object.keys(inputOptions).forEach((key) => {
          let valueFormatted = inputOptions[key];
          if (typeof valueFormatted === "object") {
            valueFormatted = formatInputOptions(valueFormatted);
          }
          result.push([key, valueFormatted]);
        });
      }
      return result;
    };
    const isSelected = (optionValue, inputValue) => {
      return inputValue && inputValue.toString() === optionValue.toString();
    };
    const handleConfirmButtonClick = (instance) => {
      const innerParams = privateProps.innerParams.get(instance);
      instance.disableButtons();
      if (innerParams.input) {
        handleConfirmOrDenyWithInput(instance, "confirm");
      } else {
        confirm(instance, true);
      }
    };
    const handleDenyButtonClick = (instance) => {
      const innerParams = privateProps.innerParams.get(instance);
      instance.disableButtons();
      if (innerParams.returnInputValueOnDeny) {
        handleConfirmOrDenyWithInput(instance, "deny");
      } else {
        deny(instance, false);
      }
    };
    const handleCancelButtonClick = (instance, dismissWith) => {
      instance.disableButtons();
      dismissWith(DismissReason.cancel);
    };
    const handleConfirmOrDenyWithInput = (instance, type) => {
      const innerParams = privateProps.innerParams.get(instance);
      if (!innerParams.input) {
        error('The "input" parameter is needed to be set when using returnInputValueOn'.concat(capitalizeFirstLetter(type)));
        return;
      }
      const inputValue = getInputValue(instance, innerParams);
      if (innerParams.inputValidator) {
        handleInputValidator(instance, inputValue, type);
      } else if (!instance.getInput().checkValidity()) {
        instance.enableButtons();
        instance.showValidationMessage(innerParams.validationMessage);
      } else if (type === "deny") {
        deny(instance, inputValue);
      } else {
        confirm(instance, inputValue);
      }
    };
    const handleInputValidator = (instance, inputValue, type) => {
      const innerParams = privateProps.innerParams.get(instance);
      instance.disableInput();
      const validationPromise = Promise.resolve().then(() => asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage)));
      validationPromise.then((validationMessage) => {
        instance.enableButtons();
        instance.enableInput();
        if (validationMessage) {
          instance.showValidationMessage(validationMessage);
        } else if (type === "deny") {
          deny(instance, inputValue);
        } else {
          confirm(instance, inputValue);
        }
      });
    };
    const deny = (instance, value) => {
      const innerParams = privateProps.innerParams.get(instance || void 0);
      if (innerParams.showLoaderOnDeny) {
        showLoading(getDenyButton());
      }
      if (innerParams.preDeny) {
        privateProps.awaitingPromise.set(instance || void 0, true);
        const preDenyPromise = Promise.resolve().then(() => asPromise(innerParams.preDeny(value, innerParams.validationMessage)));
        preDenyPromise.then((preDenyValue) => {
          if (preDenyValue === false) {
            instance.hideLoading();
            handleAwaitingPromise(instance);
          } else {
            instance.close({
              isDenied: true,
              value: typeof preDenyValue === "undefined" ? value : preDenyValue
            });
          }
        }).catch((error$$1) => rejectWith(instance || void 0, error$$1));
      } else {
        instance.close({
          isDenied: true,
          value
        });
      }
    };
    const succeedWith = (instance, value) => {
      instance.close({
        isConfirmed: true,
        value
      });
    };
    const rejectWith = (instance, error$$1) => {
      instance.rejectPromise(error$$1);
    };
    const confirm = (instance, value) => {
      const innerParams = privateProps.innerParams.get(instance || void 0);
      if (innerParams.showLoaderOnConfirm) {
        showLoading();
      }
      if (innerParams.preConfirm) {
        instance.resetValidationMessage();
        privateProps.awaitingPromise.set(instance || void 0, true);
        const preConfirmPromise = Promise.resolve().then(() => asPromise(innerParams.preConfirm(value, innerParams.validationMessage)));
        preConfirmPromise.then((preConfirmValue) => {
          if (isVisible(getValidationMessage()) || preConfirmValue === false) {
            instance.hideLoading();
            handleAwaitingPromise(instance);
          } else {
            succeedWith(instance, typeof preConfirmValue === "undefined" ? value : preConfirmValue);
          }
        }).catch((error$$1) => rejectWith(instance || void 0, error$$1));
      } else {
        succeedWith(instance, value);
      }
    };
    const handlePopupClick = (instance, domCache, dismissWith) => {
      const innerParams = privateProps.innerParams.get(instance);
      if (innerParams.toast) {
        handleToastClick(instance, domCache, dismissWith);
      } else {
        handleModalMousedown(domCache);
        handleContainerMousedown(domCache);
        handleModalClick(instance, domCache, dismissWith);
      }
    };
    const handleToastClick = (instance, domCache, dismissWith) => {
      domCache.popup.onclick = () => {
        const innerParams = privateProps.innerParams.get(instance);
        if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
          return;
        }
        dismissWith(DismissReason.close);
      };
    };
    const isAnyButtonShown = (innerParams) => {
      return innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton;
    };
    let ignoreOutsideClick = false;
    const handleModalMousedown = (domCache) => {
      domCache.popup.onmousedown = () => {
        domCache.container.onmouseup = function(e) {
          domCache.container.onmouseup = void 0;
          if (e.target === domCache.container) {
            ignoreOutsideClick = true;
          }
        };
      };
    };
    const handleContainerMousedown = (domCache) => {
      domCache.container.onmousedown = () => {
        domCache.popup.onmouseup = function(e) {
          domCache.popup.onmouseup = void 0;
          if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
            ignoreOutsideClick = true;
          }
        };
      };
    };
    const handleModalClick = (instance, domCache, dismissWith) => {
      domCache.container.onclick = (e) => {
        const innerParams = privateProps.innerParams.get(instance);
        if (ignoreOutsideClick) {
          ignoreOutsideClick = false;
          return;
        }
        if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
          dismissWith(DismissReason.backdrop);
        }
      };
    };
    const isJqueryElement = (elem) => typeof elem === "object" && elem.jquery;
    const isElement = (elem) => elem instanceof Element || isJqueryElement(elem);
    const argsToParams = (args) => {
      const params = {};
      if (typeof args[0] === "object" && !isElement(args[0])) {
        Object.assign(params, args[0]);
      } else {
        ["title", "html", "icon"].forEach((name, index2) => {
          const arg = args[index2];
          if (typeof arg === "string" || isElement(arg)) {
            params[name] = arg;
          } else if (arg !== void 0) {
            error("Unexpected type of ".concat(name, '! Expected "string" or "Element", got ').concat(typeof arg));
          }
        });
      }
      return params;
    };
    function fire() {
      const Swal3 = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return new Swal3(...args);
    }
    function mixin(mixinParams) {
      class MixinSwal extends this {
        _main(params, priorityMixinParams) {
          return super._main(params, Object.assign({}, mixinParams, priorityMixinParams));
        }
      }
      return MixinSwal;
    }
    const getTimerLeft = () => {
      return globalState.timeout && globalState.timeout.getTimerLeft();
    };
    const stopTimer = () => {
      if (globalState.timeout) {
        stopTimerProgressBar();
        return globalState.timeout.stop();
      }
    };
    const resumeTimer = () => {
      if (globalState.timeout) {
        const remaining = globalState.timeout.start();
        animateTimerProgressBar(remaining);
        return remaining;
      }
    };
    const toggleTimer = () => {
      const timer = globalState.timeout;
      return timer && (timer.running ? stopTimer() : resumeTimer());
    };
    const increaseTimer = (n2) => {
      if (globalState.timeout) {
        const remaining = globalState.timeout.increase(n2);
        animateTimerProgressBar(remaining, true);
        return remaining;
      }
    };
    const isTimerRunning = () => {
      return globalState.timeout && globalState.timeout.isRunning();
    };
    let bodyClickListenerAdded = false;
    const clickHandlers = {};
    function bindClickHandler() {
      let attr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "data-swal-template";
      clickHandlers[attr] = this;
      if (!bodyClickListenerAdded) {
        document.body.addEventListener("click", bodyClickListener);
        bodyClickListenerAdded = true;
      }
    }
    const bodyClickListener = (event) => {
      for (let el = event.target; el && el !== document; el = el.parentNode) {
        for (const attr in clickHandlers) {
          const template = el.getAttribute(attr);
          if (template) {
            clickHandlers[attr].fire({
              template
            });
            return;
          }
        }
      }
    };
    var staticMethods = /* @__PURE__ */ Object.freeze({
      isValidParameter,
      isUpdatableParameter,
      isDeprecatedParameter,
      argsToParams,
      isVisible: isVisible$1,
      clickConfirm,
      clickDeny,
      clickCancel,
      getContainer,
      getPopup,
      getTitle,
      getHtmlContainer,
      getImage,
      getIcon,
      getInputLabel,
      getCloseButton,
      getActions,
      getConfirmButton,
      getDenyButton,
      getCancelButton,
      getLoader,
      getFooter,
      getTimerProgressBar,
      getFocusableElements,
      getValidationMessage,
      isLoading,
      fire,
      mixin,
      showLoading,
      enableLoading: showLoading,
      getTimerLeft,
      stopTimer,
      resumeTimer,
      toggleTimer,
      increaseTimer,
      isTimerRunning,
      bindClickHandler
    });
    class Timer {
      constructor(callback, delay) {
        this.callback = callback;
        this.remaining = delay;
        this.running = false;
        this.start();
      }
      start() {
        if (!this.running) {
          this.running = true;
          this.started = new Date();
          this.id = setTimeout(this.callback, this.remaining);
        }
        return this.remaining;
      }
      stop() {
        if (this.running) {
          this.running = false;
          clearTimeout(this.id);
          this.remaining -= new Date().getTime() - this.started.getTime();
        }
        return this.remaining;
      }
      increase(n2) {
        const running = this.running;
        if (running) {
          this.stop();
        }
        this.remaining += n2;
        if (running) {
          this.start();
        }
        return this.remaining;
      }
      getTimerLeft() {
        if (this.running) {
          this.stop();
          this.start();
        }
        return this.remaining;
      }
      isRunning() {
        return this.running;
      }
    }
    const swalStringParams = ["swal-title", "swal-html", "swal-footer"];
    const getTemplateParams = (params) => {
      const template = typeof params.template === "string" ? document.querySelector(params.template) : params.template;
      if (!template) {
        return {};
      }
      const templateContent = template.content;
      showWarningsForElements(templateContent);
      const result = Object.assign(getSwalParams(templateContent), getSwalButtons(templateContent), getSwalImage(templateContent), getSwalIcon(templateContent), getSwalInput(templateContent), getSwalStringParams(templateContent, swalStringParams));
      return result;
    };
    const getSwalParams = (templateContent) => {
      const result = {};
      const swalParams = Array.from(templateContent.querySelectorAll("swal-param"));
      swalParams.forEach((param) => {
        showWarningsForAttributes(param, ["name", "value"]);
        const paramName = param.getAttribute("name");
        const value = param.getAttribute("value");
        if (typeof defaultParams[paramName] === "boolean") {
          result[paramName] = value !== "false";
        } else if (typeof defaultParams[paramName] === "object") {
          result[paramName] = JSON.parse(value);
        } else {
          result[paramName] = value;
        }
      });
      return result;
    };
    const getSwalButtons = (templateContent) => {
      const result = {};
      const swalButtons = Array.from(templateContent.querySelectorAll("swal-button"));
      swalButtons.forEach((button) => {
        showWarningsForAttributes(button, ["type", "color", "aria-label"]);
        const type = button.getAttribute("type");
        result["".concat(type, "ButtonText")] = button.innerHTML;
        result["show".concat(capitalizeFirstLetter(type), "Button")] = true;
        if (button.hasAttribute("color")) {
          result["".concat(type, "ButtonColor")] = button.getAttribute("color");
        }
        if (button.hasAttribute("aria-label")) {
          result["".concat(type, "ButtonAriaLabel")] = button.getAttribute("aria-label");
        }
      });
      return result;
    };
    const getSwalImage = (templateContent) => {
      const result = {};
      const image = templateContent.querySelector("swal-image");
      if (image) {
        showWarningsForAttributes(image, ["src", "width", "height", "alt"]);
        if (image.hasAttribute("src")) {
          result.imageUrl = image.getAttribute("src");
        }
        if (image.hasAttribute("width")) {
          result.imageWidth = image.getAttribute("width");
        }
        if (image.hasAttribute("height")) {
          result.imageHeight = image.getAttribute("height");
        }
        if (image.hasAttribute("alt")) {
          result.imageAlt = image.getAttribute("alt");
        }
      }
      return result;
    };
    const getSwalIcon = (templateContent) => {
      const result = {};
      const icon = templateContent.querySelector("swal-icon");
      if (icon) {
        showWarningsForAttributes(icon, ["type", "color"]);
        if (icon.hasAttribute("type")) {
          result.icon = icon.getAttribute("type");
        }
        if (icon.hasAttribute("color")) {
          result.iconColor = icon.getAttribute("color");
        }
        result.iconHtml = icon.innerHTML;
      }
      return result;
    };
    const getSwalInput = (templateContent) => {
      const result = {};
      const input = templateContent.querySelector("swal-input");
      if (input) {
        showWarningsForAttributes(input, ["type", "label", "placeholder", "value"]);
        result.input = input.getAttribute("type") || "text";
        if (input.hasAttribute("label")) {
          result.inputLabel = input.getAttribute("label");
        }
        if (input.hasAttribute("placeholder")) {
          result.inputPlaceholder = input.getAttribute("placeholder");
        }
        if (input.hasAttribute("value")) {
          result.inputValue = input.getAttribute("value");
        }
      }
      const inputOptions = Array.from(templateContent.querySelectorAll("swal-input-option"));
      if (inputOptions.length) {
        result.inputOptions = {};
        inputOptions.forEach((option) => {
          showWarningsForAttributes(option, ["value"]);
          const optionValue = option.getAttribute("value");
          const optionName = option.innerHTML;
          result.inputOptions[optionValue] = optionName;
        });
      }
      return result;
    };
    const getSwalStringParams = (templateContent, paramNames) => {
      const result = {};
      for (const i in paramNames) {
        const paramName = paramNames[i];
        const tag = templateContent.querySelector(paramName);
        if (tag) {
          showWarningsForAttributes(tag, []);
          result[paramName.replace(/^swal-/, "")] = tag.innerHTML.trim();
        }
      }
      return result;
    };
    const showWarningsForElements = (templateContent) => {
      const allowedElements = swalStringParams.concat(["swal-param", "swal-button", "swal-image", "swal-icon", "swal-input", "swal-input-option"]);
      Array.from(templateContent.children).forEach((el) => {
        const tagName = el.tagName.toLowerCase();
        if (!allowedElements.includes(tagName)) {
          warn2("Unrecognized element <".concat(tagName, ">"));
        }
      });
    };
    const showWarningsForAttributes = (el, allowedAttributes) => {
      Array.from(el.attributes).forEach((attribute) => {
        if (allowedAttributes.indexOf(attribute.name) === -1) {
          warn2(['Unrecognized attribute "'.concat(attribute.name, '" on <').concat(el.tagName.toLowerCase(), ">."), "".concat(allowedAttributes.length ? "Allowed attributes are: ".concat(allowedAttributes.join(", ")) : "To set the value, use HTML within the element.")]);
        }
      });
    };
    const SHOW_CLASS_TIMEOUT = 10;
    const openPopup = (params) => {
      const container = getContainer();
      const popup = getPopup();
      if (typeof params.willOpen === "function") {
        params.willOpen(popup);
      }
      const bodyStyles = window.getComputedStyle(document.body);
      const initialBodyOverflow = bodyStyles.overflowY;
      addClasses$1(container, popup, params);
      setTimeout(() => {
        setScrollingVisibility(container, popup);
      }, SHOW_CLASS_TIMEOUT);
      if (isModal()) {
        fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
        setAriaHidden();
      }
      if (!isToast() && !globalState.previousActiveElement) {
        globalState.previousActiveElement = document.activeElement;
      }
      if (typeof params.didOpen === "function") {
        setTimeout(() => params.didOpen(popup));
      }
      removeClass(container, swalClasses["no-transition"]);
    };
    const swalOpenAnimationFinished = (event) => {
      const popup = getPopup();
      if (event.target !== popup) {
        return;
      }
      const container = getContainer();
      popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
      container.style.overflowY = "auto";
    };
    const setScrollingVisibility = (container, popup) => {
      if (animationEndEvent && hasCssAnimation(popup)) {
        container.style.overflowY = "hidden";
        popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
      } else {
        container.style.overflowY = "auto";
      }
    };
    const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
      iOSfix();
      if (scrollbarPadding && initialBodyOverflow !== "hidden") {
        fixScrollbar();
      }
      setTimeout(() => {
        container.scrollTop = 0;
      });
    };
    const addClasses$1 = (container, popup, params) => {
      addClass(container, params.showClass.backdrop);
      popup.style.setProperty("opacity", "0", "important");
      show(popup, "grid");
      setTimeout(() => {
        addClass(popup, params.showClass.popup);
        popup.style.removeProperty("opacity");
      }, SHOW_CLASS_TIMEOUT);
      addClass([document.documentElement, document.body], swalClasses.shown);
      if (params.heightAuto && params.backdrop && !params.toast) {
        addClass([document.documentElement, document.body], swalClasses["height-auto"]);
      }
    };
    var defaultInputValidators = {
      email: (string, validationMessage) => {
        return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || "Invalid email address");
      },
      url: (string, validationMessage) => {
        return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || "Invalid URL");
      }
    };
    function setDefaultInputValidators(params) {
      if (!params.inputValidator) {
        Object.keys(defaultInputValidators).forEach((key) => {
          if (params.input === key) {
            params.inputValidator = defaultInputValidators[key];
          }
        });
      }
    }
    function validateCustomTargetElement(params) {
      if (!params.target || typeof params.target === "string" && !document.querySelector(params.target) || typeof params.target !== "string" && !params.target.appendChild) {
        warn2('Target parameter is not valid, defaulting to "body"');
        params.target = "body";
      }
    }
    function setParameters(params) {
      setDefaultInputValidators(params);
      if (params.showLoaderOnConfirm && !params.preConfirm) {
        warn2("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request");
      }
      validateCustomTargetElement(params);
      if (typeof params.title === "string") {
        params.title = params.title.split("\n").join("<br />");
      }
      init(params);
    }
    let currentInstance;
    class SweetAlert {
      constructor() {
        if (typeof window === "undefined") {
          return;
        }
        currentInstance = this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        const outerParams = Object.freeze(this.constructor.argsToParams(args));
        Object.defineProperties(this, {
          params: {
            value: outerParams,
            writable: false,
            enumerable: true,
            configurable: true
          }
        });
        const promise = currentInstance._main(currentInstance.params);
        privateProps.promise.set(this, promise);
      }
      _main(userParams) {
        let mixinParams = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        showWarningsForParams(Object.assign({}, mixinParams, userParams));
        if (globalState.currentInstance) {
          globalState.currentInstance._destroy();
          if (isModal()) {
            unsetAriaHidden();
          }
        }
        globalState.currentInstance = currentInstance;
        const innerParams = prepareParams(userParams, mixinParams);
        setParameters(innerParams);
        Object.freeze(innerParams);
        if (globalState.timeout) {
          globalState.timeout.stop();
          delete globalState.timeout;
        }
        clearTimeout(globalState.restoreFocusTimeout);
        const domCache = populateDomCache(currentInstance);
        render(currentInstance, innerParams);
        privateProps.innerParams.set(currentInstance, innerParams);
        return swalPromise(currentInstance, domCache, innerParams);
      }
      then(onFulfilled) {
        const promise = privateProps.promise.get(this);
        return promise.then(onFulfilled);
      }
      finally(onFinally) {
        const promise = privateProps.promise.get(this);
        return promise.finally(onFinally);
      }
    }
    const swalPromise = (instance, domCache, innerParams) => {
      return new Promise((resolve, reject) => {
        const dismissWith = (dismiss) => {
          instance.close({
            isDismissed: true,
            dismiss
          });
        };
        privateMethods.swalPromiseResolve.set(instance, resolve);
        privateMethods.swalPromiseReject.set(instance, reject);
        domCache.confirmButton.onclick = () => {
          handleConfirmButtonClick(instance);
        };
        domCache.denyButton.onclick = () => {
          handleDenyButtonClick(instance);
        };
        domCache.cancelButton.onclick = () => {
          handleCancelButtonClick(instance, dismissWith);
        };
        domCache.closeButton.onclick = () => {
          dismissWith(DismissReason.close);
        };
        handlePopupClick(instance, domCache, dismissWith);
        addKeydownHandler(instance, globalState, innerParams, dismissWith);
        handleInputOptionsAndValue(instance, innerParams);
        openPopup(innerParams);
        setupTimer(globalState, innerParams, dismissWith);
        initFocus(domCache, innerParams);
        setTimeout(() => {
          domCache.container.scrollTop = 0;
        });
      });
    };
    const prepareParams = (userParams, mixinParams) => {
      const templateParams = getTemplateParams(userParams);
      const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams);
      params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
      params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
      return params;
    };
    const populateDomCache = (instance) => {
      const domCache = {
        popup: getPopup(),
        container: getContainer(),
        actions: getActions(),
        confirmButton: getConfirmButton(),
        denyButton: getDenyButton(),
        cancelButton: getCancelButton(),
        loader: getLoader(),
        closeButton: getCloseButton(),
        validationMessage: getValidationMessage(),
        progressSteps: getProgressSteps()
      };
      privateProps.domCache.set(instance, domCache);
      return domCache;
    };
    const setupTimer = (globalState$$1, innerParams, dismissWith) => {
      const timerProgressBar = getTimerProgressBar();
      hide(timerProgressBar);
      if (innerParams.timer) {
        globalState$$1.timeout = new Timer(() => {
          dismissWith("timer");
          delete globalState$$1.timeout;
        }, innerParams.timer);
        if (innerParams.timerProgressBar) {
          show(timerProgressBar);
          applyCustomClass(timerProgressBar, innerParams, "timerProgressBar");
          setTimeout(() => {
            if (globalState$$1.timeout && globalState$$1.timeout.running) {
              animateTimerProgressBar(innerParams.timer);
            }
          });
        }
      }
    };
    const initFocus = (domCache, innerParams) => {
      if (innerParams.toast) {
        return;
      }
      if (!callIfFunction(innerParams.allowEnterKey)) {
        blurActiveElement();
        return;
      }
      if (!focusButton(domCache, innerParams)) {
        setFocus(innerParams, -1, 1);
      }
    };
    const focusButton = (domCache, innerParams) => {
      if (innerParams.focusDeny && isVisible(domCache.denyButton)) {
        domCache.denyButton.focus();
        return true;
      }
      if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
        domCache.cancelButton.focus();
        return true;
      }
      if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
        domCache.confirmButton.focus();
        return true;
      }
      return false;
    };
    const blurActiveElement = () => {
      if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
      }
    };
    if (typeof window !== "undefined" && /^ru\b/.test(navigator.language) && location.host.match(/\.(ru|su|xn--p1ai)$/)) {
      if (Math.random() < 0.3) {
        const noWar = document.createElement("div");
        noWar.className = "save-yourself-from-war";
        const video = getRandomElement([{
          text: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430 \u0441\u0435\u0439\u0447\u0430\u0441 - \u043D\u0435 \u043F\u043E\u043F\u0430\u0441\u0442\u044C \u043D\u0430 \u0432\u043E\u0439\u043D\u0443 \u0438 \u043F\u043E\u043C\u043E\u0447\u044C \u0441\u0432\u043E\u0438\u043C \u0431\u043B\u0438\u0436\u043D\u0438\u043C \u043D\u0435 \u0431\u044B\u0442\u044C \u043C\u043E\u0431\u0438\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u044B\u043C\u0438.",
          id: "X39ZkynPjpQ"
        }]);
        setInnerHtml(noWar, "<div>".concat(video.text, '</div>\n      <iframe width="560" height="315" src="https://www.youtube.com/embed/').concat(video.id, '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n      <div>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u0441\u0435\u0431\u044F \u0438 \u0441\u0432\u043E\u0438\u0445 \u0431\u043B\u0438\u0437\u043A\u0438\u0445!</div>\n      '));
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "&times;";
        closeButton.onclick = () => noWar.remove();
        noWar.appendChild(closeButton);
        window.addEventListener("load", () => {
          setTimeout(() => {
            document.body.appendChild(noWar);
          }, 1e3);
        });
      }
    }
    Object.assign(SweetAlert.prototype, instanceMethods);
    Object.assign(SweetAlert, staticMethods);
    Object.keys(instanceMethods).forEach((key) => {
      SweetAlert[key] = function() {
        if (currentInstance) {
          return currentInstance[key](...arguments);
        }
      };
    });
    SweetAlert.DismissReason = DismissReason;
    SweetAlert.version = "11.4.38";
    const Swal2 = SweetAlert;
    Swal2.default = Swal2;
    return Swal2;
  });
  if (typeof commonjsGlobal !== "undefined" && commonjsGlobal.Sweetalert2) {
    commonjsGlobal.swal = commonjsGlobal.sweetAlert = commonjsGlobal.Swal = commonjsGlobal.SweetAlert = commonjsGlobal.Sweetalert2;
  }
  "undefined" != typeof document && function(e, t) {
    var n2 = e.createElement("style");
    if (e.getElementsByTagName("head")[0].appendChild(n2), n2.styleSheet)
      n2.styleSheet.disabled || (n2.styleSheet.cssText = t);
    else
      try {
        n2.innerHTML = t;
      } catch (e2) {
        n2.innerText = t;
      }
  }(document, '.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px hsla(0deg,0%,0%,.075),0 1px 2px hsla(0deg,0%,0%,.075),1px 2px 4px hsla(0deg,0%,0%,.075),1px 3px 8px hsla(0deg,0%,0%,.075),2px 4px 16px hsla(0deg,0%,0%,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 3px}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:0 0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:0 0;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:0 0;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:0 0;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.save-yourself-from-war{display:flex;position:fixed;z-index:1939;top:0;right:0;bottom:0;left:0;flex-direction:column;align-items:center;justify-content:center;padding:25px 0 20px;background:#20232a;color:#fff;text-align:center}.save-yourself-from-war div{max-width:560px;margin:10px;line-height:146%}.save-yourself-from-war iframe{max-width:100%;max-height:55.5555555556vmin;margin:16px auto}.save-yourself-from-war strong{border-bottom:2px dashed #fff}.save-yourself-from-war button{display:flex;position:fixed;z-index:1940;top:0;right:0;align-items:center;justify-content:center;width:48px;height:48px;margin-right:10px;margin-bottom:-10px;border:none;background:0 0;color:#aaa;font-size:48px;font-weight:700;cursor:pointer}.save-yourself-from-war button:hover{color:#fff}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}');
})(sweetalert2_all);
const Swal = sweetalert2_all.exports;
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var hookCallback$1;
function hooks$1() {
  return hookCallback$1.apply(null, arguments);
}
function setHookCallback$1(callback) {
  hookCallback$1 = callback;
}
function isArray$4(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function isObject$3(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function hasOwnProp$1(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
function isObjectEmpty$1(obj) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj).length === 0;
  } else {
    var k;
    for (k in obj) {
      if (hasOwnProp$1(obj, k)) {
        return false;
      }
    }
    return true;
  }
}
function isUndefined$2(input) {
  return input === void 0;
}
function isNumber$2(input) {
  return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
}
function isDate$2(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
function map$1(arr, fn) {
  var res = [], i, arrLen = arr.length;
  for (i = 0; i < arrLen; ++i) {
    res.push(fn(arr[i], i));
  }
  return res;
}
function extend$2(a, b) {
  for (var i in b) {
    if (hasOwnProp$1(b, i)) {
      a[i] = b[i];
    }
  }
  if (hasOwnProp$1(b, "toString")) {
    a.toString = b.toString;
  }
  if (hasOwnProp$1(b, "valueOf")) {
    a.valueOf = b.valueOf;
  }
  return a;
}
function createUTC$1(input, format2, locale2, strict) {
  return createLocalOrUTC$1(input, format2, locale2, strict, true).utc();
}
function defaultParsingFlags$1() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags$1(m) {
  if (m._pf == null) {
    m._pf = defaultParsingFlags$1();
  }
  return m._pf;
}
var some$1;
if (Array.prototype.some) {
  some$1 = Array.prototype.some;
} else {
  some$1 = function(fun) {
    var t = Object(this), len = t.length >>> 0, i;
    for (i = 0; i < len; i++) {
      if (i in t && fun.call(this, t[i], i, t)) {
        return true;
      }
    }
    return false;
  };
}
function isValid$3(m) {
  if (m._isValid == null) {
    var flags = getParsingFlags$1(m), parsedParts = some$1.call(flags.parsedDateParts, function(i) {
      return i != null;
    }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
    if (m._strict) {
      isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
    }
    if (Object.isFrozen == null || !Object.isFrozen(m)) {
      m._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }
  return m._isValid;
}
function createInvalid$2(flags) {
  var m = createUTC$1(NaN);
  if (flags != null) {
    extend$2(getParsingFlags$1(m), flags);
  } else {
    getParsingFlags$1(m).userInvalidated = true;
  }
  return m;
}
var momentProperties$1 = hooks$1.momentProperties = [], updateInProgress$1 = false;
function copyConfig$1(to2, from2) {
  var i, prop, val, momentPropertiesLen = momentProperties$1.length;
  if (!isUndefined$2(from2._isAMomentObject)) {
    to2._isAMomentObject = from2._isAMomentObject;
  }
  if (!isUndefined$2(from2._i)) {
    to2._i = from2._i;
  }
  if (!isUndefined$2(from2._f)) {
    to2._f = from2._f;
  }
  if (!isUndefined$2(from2._l)) {
    to2._l = from2._l;
  }
  if (!isUndefined$2(from2._strict)) {
    to2._strict = from2._strict;
  }
  if (!isUndefined$2(from2._tzm)) {
    to2._tzm = from2._tzm;
  }
  if (!isUndefined$2(from2._isUTC)) {
    to2._isUTC = from2._isUTC;
  }
  if (!isUndefined$2(from2._offset)) {
    to2._offset = from2._offset;
  }
  if (!isUndefined$2(from2._pf)) {
    to2._pf = getParsingFlags$1(from2);
  }
  if (!isUndefined$2(from2._locale)) {
    to2._locale = from2._locale;
  }
  if (momentPropertiesLen > 0) {
    for (i = 0; i < momentPropertiesLen; i++) {
      prop = momentProperties$1[i];
      val = from2[prop];
      if (!isUndefined$2(val)) {
        to2[prop] = val;
      }
    }
  }
  return to2;
}
function Moment$1(config) {
  copyConfig$1(this, config);
  this._d = new Date(config._d != null ? config._d.getTime() : NaN);
  if (!this.isValid()) {
    this._d = new Date(NaN);
  }
  if (updateInProgress$1 === false) {
    updateInProgress$1 = true;
    hooks$1.updateOffset(this);
    updateInProgress$1 = false;
  }
}
function isMoment$1(obj) {
  return obj instanceof Moment$1 || obj != null && obj._isAMomentObject != null;
}
function warn$1(msg) {
  if (hooks$1.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
    console.warn("Deprecation warning: " + msg);
  }
}
function deprecate$1(msg, fn) {
  var firstTime = true;
  return extend$2(function() {
    if (hooks$1.deprecationHandler != null) {
      hooks$1.deprecationHandler(null, msg);
    }
    if (firstTime) {
      var args = [], arg, i, key, argLen = arguments.length;
      for (i = 0; i < argLen; i++) {
        arg = "";
        if (typeof arguments[i] === "object") {
          arg += "\n[" + i + "] ";
          for (key in arguments[0]) {
            if (hasOwnProp$1(arguments[0], key)) {
              arg += key + ": " + arguments[0][key] + ", ";
            }
          }
          arg = arg.slice(0, -2);
        } else {
          arg = arguments[i];
        }
        args.push(arg);
      }
      warn$1(
        msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
      );
      firstTime = false;
    }
    return fn.apply(this, arguments);
  }, fn);
}
var deprecations$1 = {};
function deprecateSimple$1(name, msg) {
  if (hooks$1.deprecationHandler != null) {
    hooks$1.deprecationHandler(name, msg);
  }
  if (!deprecations$1[name]) {
    warn$1(msg);
    deprecations$1[name] = true;
  }
}
hooks$1.suppressDeprecationWarnings = false;
hooks$1.deprecationHandler = null;
function isFunction$3(input) {
  return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
}
function set$2(config) {
  var prop, i;
  for (i in config) {
    if (hasOwnProp$1(config, i)) {
      prop = config[i];
      if (isFunction$3(prop)) {
        this[i] = prop;
      } else {
        this["_" + i] = prop;
      }
    }
  }
  this._config = config;
  this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function mergeConfigs$1(parentConfig, childConfig) {
  var res = extend$2({}, parentConfig), prop;
  for (prop in childConfig) {
    if (hasOwnProp$1(childConfig, prop)) {
      if (isObject$3(parentConfig[prop]) && isObject$3(childConfig[prop])) {
        res[prop] = {};
        extend$2(res[prop], parentConfig[prop]);
        extend$2(res[prop], childConfig[prop]);
      } else if (childConfig[prop] != null) {
        res[prop] = childConfig[prop];
      } else {
        delete res[prop];
      }
    }
  }
  for (prop in parentConfig) {
    if (hasOwnProp$1(parentConfig, prop) && !hasOwnProp$1(childConfig, prop) && isObject$3(parentConfig[prop])) {
      res[prop] = extend$2({}, res[prop]);
    }
  }
  return res;
}
function Locale$1(config) {
  if (config != null) {
    this.set(config);
  }
}
var keys$2;
if (Object.keys) {
  keys$2 = Object.keys;
} else {
  keys$2 = function(obj) {
    var i, res = [];
    for (i in obj) {
      if (hasOwnProp$1(obj, i)) {
        res.push(i);
      }
    }
    return res;
  };
}
var defaultCalendar$1 = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar$2(key, mom, now2) {
  var output = this._calendar[key] || this._calendar["sameElse"];
  return isFunction$3(output) ? output.call(mom, now2) : output;
}
function zeroFill$1(number, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
  return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens$1 = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens$1 = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions$1 = {}, formatTokenFunctions$1 = {};
function addFormatToken$1(token2, padded, ordinal2, callback) {
  var func = callback;
  if (typeof callback === "string") {
    func = function() {
      return this[callback]();
    };
  }
  if (token2) {
    formatTokenFunctions$1[token2] = func;
  }
  if (padded) {
    formatTokenFunctions$1[padded[0]] = function() {
      return zeroFill$1(func.apply(this, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal2) {
    formatTokenFunctions$1[ordinal2] = function() {
      return this.localeData().ordinal(
        func.apply(this, arguments),
        token2
      );
    };
  }
}
function removeFormattingTokens$1(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function makeFormatFunction$1(format2) {
  var array = format2.match(formattingTokens$1), i, length;
  for (i = 0, length = array.length; i < length; i++) {
    if (formatTokenFunctions$1[array[i]]) {
      array[i] = formatTokenFunctions$1[array[i]];
    } else {
      array[i] = removeFormattingTokens$1(array[i]);
    }
  }
  return function(mom) {
    var output = "", i2;
    for (i2 = 0; i2 < length; i2++) {
      output += isFunction$3(array[i2]) ? array[i2].call(mom, format2) : array[i2];
    }
    return output;
  };
}
function formatMoment$1(m, format2) {
  if (!m.isValid()) {
    return m.localeData().invalidDate();
  }
  format2 = expandFormat$1(format2, m.localeData());
  formatFunctions$1[format2] = formatFunctions$1[format2] || makeFormatFunction$1(format2);
  return formatFunctions$1[format2](m);
}
function expandFormat$1(format2, locale2) {
  var i = 5;
  function replaceLongDateFormatTokens(input) {
    return locale2.longDateFormat(input) || input;
  }
  localFormattingTokens$1.lastIndex = 0;
  while (i >= 0 && localFormattingTokens$1.test(format2)) {
    format2 = format2.replace(
      localFormattingTokens$1,
      replaceLongDateFormatTokens
    );
    localFormattingTokens$1.lastIndex = 0;
    i -= 1;
  }
  return format2;
}
var defaultLongDateFormat$1 = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat$1(key) {
  var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
  if (format2 || !formatUpper) {
    return format2;
  }
  this._longDateFormat[key] = formatUpper.match(formattingTokens$1).map(function(tok) {
    if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
      return tok.slice(1);
    }
    return tok;
  }).join("");
  return this._longDateFormat[key];
}
var defaultInvalidDate$1 = "Invalid date";
function invalidDate$1() {
  return this._invalidDate;
}
var defaultOrdinal$1 = "%d", defaultDayOfMonthOrdinalParse$1 = /\d{1,2}/;
function ordinal$1(number) {
  return this._ordinal.replace("%d", number);
}
var defaultRelativeTime$1 = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime$2(number, withoutSuffix, string, isFuture) {
  var output = this._relativeTime[string];
  return isFunction$3(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
}
function pastFuture$1(diff2, output) {
  var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
  return isFunction$3(format2) ? format2(output) : format2.replace(/%s/i, output);
}
var aliases$1 = {};
function addUnitAlias$1(unit, shorthand) {
  var lowerCase = unit.toLowerCase();
  aliases$1[lowerCase] = aliases$1[lowerCase + "s"] = aliases$1[shorthand] = unit;
}
function normalizeUnits$1(units) {
  return typeof units === "string" ? aliases$1[units] || aliases$1[units.toLowerCase()] : void 0;
}
function normalizeObjectUnits$1(inputObject) {
  var normalizedInput = {}, normalizedProp, prop;
  for (prop in inputObject) {
    if (hasOwnProp$1(inputObject, prop)) {
      normalizedProp = normalizeUnits$1(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var priorities$1 = {};
function addUnitPriority$1(unit, priority) {
  priorities$1[unit] = priority;
}
function getPrioritizedUnits$1(unitsObj) {
  var units = [], u;
  for (u in unitsObj) {
    if (hasOwnProp$1(unitsObj, u)) {
      units.push({ unit: u, priority: priorities$1[u] });
    }
  }
  units.sort(function(a, b) {
    return a.priority - b.priority;
  });
  return units;
}
function isLeapYear$1(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function absFloor$1(number) {
  if (number < 0) {
    return Math.ceil(number) || 0;
  } else {
    return Math.floor(number);
  }
}
function toInt$1(argumentForCoercion) {
  var coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor$1(coercedNumber);
  }
  return value;
}
function makeGetSet$1(unit, keepTime) {
  return function(value) {
    if (value != null) {
      set$1$1(this, unit, value);
      hooks$1.updateOffset(this, keepTime);
      return this;
    } else {
      return get$3(this, unit);
    }
  };
}
function get$3(mom, unit) {
  return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
}
function set$1$1(mom, unit, value) {
  if (mom.isValid() && !isNaN(value)) {
    if (unit === "FullYear" && isLeapYear$1(mom.year()) && mom.month() === 1 && mom.date() === 29) {
      value = toInt$1(value);
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
        value,
        mom.month(),
        daysInMonth$1(value, mom.month())
      );
    } else {
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
  }
}
function stringGet$1(units) {
  units = normalizeUnits$1(units);
  if (isFunction$3(this[units])) {
    return this[units]();
  }
  return this;
}
function stringSet$1(units, value) {
  if (typeof units === "object") {
    units = normalizeObjectUnits$1(units);
    var prioritized = getPrioritizedUnits$1(units), i, prioritizedLen = prioritized.length;
    for (i = 0; i < prioritizedLen; i++) {
      this[prioritized[i].unit](units[prioritized[i].unit]);
    }
  } else {
    units = normalizeUnits$1(units);
    if (isFunction$3(this[units])) {
      return this[units](value);
    }
  }
  return this;
}
var match1$1 = /\d/, match2$1 = /\d\d/, match3$1 = /\d{3}/, match4$1 = /\d{4}/, match6$1 = /[+-]?\d{6}/, match1to2$1 = /\d\d?/, match3to4$1 = /\d\d\d\d?/, match5to6$1 = /\d\d\d\d\d\d?/, match1to3$1 = /\d{1,3}/, match1to4$1 = /\d{1,4}/, match1to6$1 = /[+-]?\d{1,6}/, matchUnsigned$1 = /\d+/, matchSigned$1 = /[+-]?\d+/, matchOffset$1 = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset$1 = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp$1 = /[+-]?\d+(\.\d{1,3})?/, matchWord$1 = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes$1;
regexes$1 = {};
function addRegexToken$1(token2, regex, strictRegex) {
  regexes$1[token2] = isFunction$3(regex) ? regex : function(isStrict, localeData2) {
    return isStrict && strictRegex ? strictRegex : regex;
  };
}
function getParseRegexForToken$1(token2, config) {
  if (!hasOwnProp$1(regexes$1, token2)) {
    return new RegExp(unescapeFormat$1(token2));
  }
  return regexes$1[token2](config._strict, config._locale);
}
function unescapeFormat$1(s) {
  return regexEscape$1(
    s.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
      }
    )
  );
}
function regexEscape$1(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var tokens$1 = {};
function addParseToken$1(token2, callback) {
  var i, func = callback, tokenLen;
  if (typeof token2 === "string") {
    token2 = [token2];
  }
  if (isNumber$2(callback)) {
    func = function(input, array) {
      array[callback] = toInt$1(input);
    };
  }
  tokenLen = token2.length;
  for (i = 0; i < tokenLen; i++) {
    tokens$1[token2[i]] = func;
  }
}
function addWeekParseToken$1(token2, callback) {
  addParseToken$1(token2, function(input, array, config, token3) {
    config._w = config._w || {};
    callback(input, config._w, config, token3);
  });
}
function addTimeToArrayFromToken$1(token2, input, config) {
  if (input != null && hasOwnProp$1(tokens$1, token2)) {
    tokens$1[token2](input, config._a, config, token2);
  }
}
var YEAR$1 = 0, MONTH$1 = 1, DATE$1 = 2, HOUR$1 = 3, MINUTE$1 = 4, SECOND$1 = 5, MILLISECOND$1 = 6, WEEK$1 = 7, WEEKDAY$1 = 8;
function mod$2(n2, x) {
  return (n2 % x + x) % x;
}
var indexOf$1;
if (Array.prototype.indexOf) {
  indexOf$1 = Array.prototype.indexOf;
} else {
  indexOf$1 = function(o) {
    var i;
    for (i = 0; i < this.length; ++i) {
      if (this[i] === o) {
        return i;
      }
    }
    return -1;
  };
}
function daysInMonth$1(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  var modMonth = mod$2(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear$1(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
addFormatToken$1("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken$1("MMM", 0, 0, function(format2) {
  return this.localeData().monthsShort(this, format2);
});
addFormatToken$1("MMMM", 0, 0, function(format2) {
  return this.localeData().months(this, format2);
});
addUnitAlias$1("month", "M");
addUnitPriority$1("month", 8);
addRegexToken$1("M", match1to2$1);
addRegexToken$1("MM", match1to2$1, match2$1);
addRegexToken$1("MMM", function(isStrict, locale2) {
  return locale2.monthsShortRegex(isStrict);
});
addRegexToken$1("MMMM", function(isStrict, locale2) {
  return locale2.monthsRegex(isStrict);
});
addParseToken$1(["M", "MM"], function(input, array) {
  array[MONTH$1] = toInt$1(input) - 1;
});
addParseToken$1(["MMM", "MMMM"], function(input, array, config, token2) {
  var month = config._locale.monthsParse(input, token2, config._strict);
  if (month != null) {
    array[MONTH$1] = month;
  } else {
    getParsingFlags$1(config).invalidMonth = input;
  }
});
var defaultLocaleMonths$1 = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), defaultLocaleMonthsShort$1 = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT$1 = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex$1 = matchWord$1, defaultMonthsRegex$1 = matchWord$1;
function localeMonths$1(m, format2) {
  if (!m) {
    return isArray$4(this._months) ? this._months : this._months["standalone"];
  }
  return isArray$4(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT$1).test(format2) ? "format" : "standalone"][m.month()];
}
function localeMonthsShort$1(m, format2) {
  if (!m) {
    return isArray$4(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
  }
  return isArray$4(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT$1.test(format2) ? "format" : "standalone"][m.month()];
}
function handleStrictParse$2(monthName, format2, strict) {
  var i, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i = 0; i < 12; ++i) {
      mom = createUTC$1([2e3, i]);
      this._shortMonthsParse[i] = this.monthsShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "MMM") {
      ii = indexOf$1.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf$1.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "MMM") {
      ii = indexOf$1.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf$1.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf$1.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf$1.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeMonthsParse$1(monthName, format2, strict) {
  var i, mom, regex;
  if (this._monthsParseExact) {
    return handleStrictParse$2.call(this, monthName, format2, strict);
  }
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }
  for (i = 0; i < 12; i++) {
    mom = createUTC$1([2e3, i]);
    if (strict && !this._longMonthsParse[i]) {
      this._longMonthsParse[i] = new RegExp(
        "^" + this.months(mom, "").replace(".", "") + "$",
        "i"
      );
      this._shortMonthsParse[i] = new RegExp(
        "^" + this.monthsShort(mom, "").replace(".", "") + "$",
        "i"
      );
    }
    if (!strict && !this._monthsParse[i]) {
      regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
      this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
      return i;
    } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
      return i;
    } else if (!strict && this._monthsParse[i].test(monthName)) {
      return i;
    }
  }
}
function setMonth$1(mom, value) {
  var dayOfMonth;
  if (!mom.isValid()) {
    return mom;
  }
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      value = toInt$1(value);
    } else {
      value = mom.localeData().monthsParse(value);
      if (!isNumber$2(value)) {
        return mom;
      }
    }
  }
  dayOfMonth = Math.min(mom.date(), daysInMonth$1(mom.year(), value));
  mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
  return mom;
}
function getSetMonth$1(value) {
  if (value != null) {
    setMonth$1(this, value);
    hooks$1.updateOffset(this, true);
    return this;
  } else {
    return get$3(this, "Month");
  }
}
function getDaysInMonth$1() {
  return daysInMonth$1(this.year(), this.month());
}
function monthsShortRegex$1(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp$1(this, "_monthsRegex")) {
      computeMonthsParse$1.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp$1(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex$1;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}
function monthsRegex$1(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp$1(this, "_monthsRegex")) {
      computeMonthsParse$1.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp$1(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex$1;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
}
function computeMonthsParse$1() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
  for (i = 0; i < 12; i++) {
    mom = createUTC$1([2e3, i]);
    shortPieces.push(this.monthsShort(mom, ""));
    longPieces.push(this.months(mom, ""));
    mixedPieces.push(this.months(mom, ""));
    mixedPieces.push(this.monthsShort(mom, ""));
  }
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  for (i = 0; i < 12; i++) {
    shortPieces[i] = regexEscape$1(shortPieces[i]);
    longPieces[i] = regexEscape$1(longPieces[i]);
  }
  for (i = 0; i < 24; i++) {
    mixedPieces[i] = regexEscape$1(mixedPieces[i]);
  }
  this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._monthsShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
}
addFormatToken$1("Y", 0, 0, function() {
  var y = this.year();
  return y <= 9999 ? zeroFill$1(y, 4) : "+" + y;
});
addFormatToken$1(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken$1(0, ["YYYY", 4], 0, "year");
addFormatToken$1(0, ["YYYYY", 5], 0, "year");
addFormatToken$1(0, ["YYYYYY", 6, true], 0, "year");
addUnitAlias$1("year", "y");
addUnitPriority$1("year", 1);
addRegexToken$1("Y", matchSigned$1);
addRegexToken$1("YY", match1to2$1, match2$1);
addRegexToken$1("YYYY", match1to4$1, match4$1);
addRegexToken$1("YYYYY", match1to6$1, match6$1);
addRegexToken$1("YYYYYY", match1to6$1, match6$1);
addParseToken$1(["YYYYY", "YYYYYY"], YEAR$1);
addParseToken$1("YYYY", function(input, array) {
  array[YEAR$1] = input.length === 2 ? hooks$1.parseTwoDigitYear(input) : toInt$1(input);
});
addParseToken$1("YY", function(input, array) {
  array[YEAR$1] = hooks$1.parseTwoDigitYear(input);
});
addParseToken$1("Y", function(input, array) {
  array[YEAR$1] = parseInt(input, 10);
});
function daysInYear$1(year) {
  return isLeapYear$1(year) ? 366 : 365;
}
hooks$1.parseTwoDigitYear = function(input) {
  return toInt$1(input) + (toInt$1(input) > 68 ? 1900 : 2e3);
};
var getSetYear$1 = makeGetSet$1("FullYear", true);
function getIsLeapYear$1() {
  return isLeapYear$1(this.year());
}
function createDate$1(y, m, d, h, M, s, ms) {
  var date;
  if (y < 100 && y >= 0) {
    date = new Date(y + 400, m, d, h, M, s, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y);
    }
  } else {
    date = new Date(y, m, d, h, M, s, ms);
  }
  return date;
}
function createUTCDate$1(y) {
  var date, args;
  if (y < 100 && y >= 0) {
    args = Array.prototype.slice.call(arguments);
    args[0] = y + 400;
    date = new Date(Date.UTC.apply(null, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
  } else {
    date = new Date(Date.UTC.apply(null, arguments));
  }
  return date;
}
function firstWeekOffset$1(year, dow, doy) {
  var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate$1(year, 0, fwd).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks$1(year, week, weekday, dow, doy) {
  var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset$1(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear$1(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear$1(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear$1(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear$1(mom, dow, doy) {
  var weekOffset = firstWeekOffset$1(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
  if (week < 1) {
    resYear = mom.year() - 1;
    resWeek = week + weeksInYear$1(resYear, dow, doy);
  } else if (week > weeksInYear$1(mom.year(), dow, doy)) {
    resWeek = week - weeksInYear$1(mom.year(), dow, doy);
    resYear = mom.year() + 1;
  } else {
    resYear = mom.year();
    resWeek = week;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear$1(year, dow, doy) {
  var weekOffset = firstWeekOffset$1(year, dow, doy), weekOffsetNext = firstWeekOffset$1(year + 1, dow, doy);
  return (daysInYear$1(year) - weekOffset + weekOffsetNext) / 7;
}
addFormatToken$1("w", ["ww", 2], "wo", "week");
addFormatToken$1("W", ["WW", 2], "Wo", "isoWeek");
addUnitAlias$1("week", "w");
addUnitAlias$1("isoWeek", "W");
addUnitPriority$1("week", 5);
addUnitPriority$1("isoWeek", 5);
addRegexToken$1("w", match1to2$1);
addRegexToken$1("ww", match1to2$1, match2$1);
addRegexToken$1("W", match1to2$1);
addRegexToken$1("WW", match1to2$1, match2$1);
addWeekParseToken$1(
  ["w", "ww", "W", "WW"],
  function(input, week, config, token2) {
    week[token2.substr(0, 1)] = toInt$1(input);
  }
);
function localeWeek$1(mom) {
  return weekOfYear$1(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek$1 = {
  dow: 0,
  doy: 6
};
function localeFirstDayOfWeek$1() {
  return this._week.dow;
}
function localeFirstDayOfYear$1() {
  return this._week.doy;
}
function getSetWeek$1(input) {
  var week = this.localeData().week(this);
  return input == null ? week : this.add((input - week) * 7, "d");
}
function getSetISOWeek$1(input) {
  var week = weekOfYear$1(this, 1, 4).week;
  return input == null ? week : this.add((input - week) * 7, "d");
}
addFormatToken$1("d", 0, "do", "day");
addFormatToken$1("dd", 0, 0, function(format2) {
  return this.localeData().weekdaysMin(this, format2);
});
addFormatToken$1("ddd", 0, 0, function(format2) {
  return this.localeData().weekdaysShort(this, format2);
});
addFormatToken$1("dddd", 0, 0, function(format2) {
  return this.localeData().weekdays(this, format2);
});
addFormatToken$1("e", 0, 0, "weekday");
addFormatToken$1("E", 0, 0, "isoWeekday");
addUnitAlias$1("day", "d");
addUnitAlias$1("weekday", "e");
addUnitAlias$1("isoWeekday", "E");
addUnitPriority$1("day", 11);
addUnitPriority$1("weekday", 11);
addUnitPriority$1("isoWeekday", 11);
addRegexToken$1("d", match1to2$1);
addRegexToken$1("e", match1to2$1);
addRegexToken$1("E", match1to2$1);
addRegexToken$1("dd", function(isStrict, locale2) {
  return locale2.weekdaysMinRegex(isStrict);
});
addRegexToken$1("ddd", function(isStrict, locale2) {
  return locale2.weekdaysShortRegex(isStrict);
});
addRegexToken$1("dddd", function(isStrict, locale2) {
  return locale2.weekdaysRegex(isStrict);
});
addWeekParseToken$1(["dd", "ddd", "dddd"], function(input, week, config, token2) {
  var weekday = config._locale.weekdaysParse(input, token2, config._strict);
  if (weekday != null) {
    week.d = weekday;
  } else {
    getParsingFlags$1(config).invalidWeekday = input;
  }
});
addWeekParseToken$1(["d", "e", "E"], function(input, week, config, token2) {
  week[token2] = toInt$1(input);
});
function parseWeekday$1(input, locale2) {
  if (typeof input !== "string") {
    return input;
  }
  if (!isNaN(input)) {
    return parseInt(input, 10);
  }
  input = locale2.weekdaysParse(input);
  if (typeof input === "number") {
    return input;
  }
  return null;
}
function parseIsoWeekday$1(input, locale2) {
  if (typeof input === "string") {
    return locale2.weekdaysParse(input) % 7 || 7;
  }
  return isNaN(input) ? null : input;
}
function shiftWeekdays$1(ws, n2) {
  return ws.slice(n2, 7).concat(ws.slice(0, n2));
}
var defaultLocaleWeekdays$1 = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort$1 = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin$1 = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex$1 = matchWord$1, defaultWeekdaysShortRegex$1 = matchWord$1, defaultWeekdaysMinRegex$1 = matchWord$1;
function localeWeekdays$1(m, format2) {
  var weekdays = isArray$4(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
  return m === true ? shiftWeekdays$1(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
}
function localeWeekdaysShort$1(m) {
  return m === true ? shiftWeekdays$1(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}
function localeWeekdaysMin$1(m) {
  return m === true ? shiftWeekdays$1(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}
function handleStrictParse$1$1(weekdayName, format2, strict) {
  var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._minWeekdaysParse = [];
    for (i = 0; i < 7; ++i) {
      mom = createUTC$1([2e3, 1]).day(i);
      this._minWeekdaysParse[i] = this.weekdaysMin(
        mom,
        ""
      ).toLocaleLowerCase();
      this._shortWeekdaysParse[i] = this.weekdaysShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "dddd") {
      ii = indexOf$1.call(this._weekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf$1.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf$1.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "dddd") {
      ii = indexOf$1.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf$1.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf$1.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf$1.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf$1.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf$1.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf$1.call(this._minWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf$1.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf$1.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeWeekdaysParse$1(weekdayName, format2, strict) {
  var i, mom, regex;
  if (this._weekdaysParseExact) {
    return handleStrictParse$1$1.call(this, weekdayName, format2, strict);
  }
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._minWeekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._fullWeekdaysParse = [];
  }
  for (i = 0; i < 7; i++) {
    mom = createUTC$1([2e3, 1]).day(i);
    if (strict && !this._fullWeekdaysParse[i]) {
      this._fullWeekdaysParse[i] = new RegExp(
        "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._shortWeekdaysParse[i] = new RegExp(
        "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._minWeekdaysParse[i] = new RegExp(
        "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
    }
    if (!this._weekdaysParse[i]) {
      regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
      this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
      return i;
    }
  }
}
function getSetDayOfWeek$1(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  if (input != null) {
    input = parseWeekday$1(input, this.localeData());
    return this.add(input - day, "d");
  } else {
    return day;
  }
}
function getSetLocaleDayOfWeek$1(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return input == null ? weekday : this.add(input - weekday, "d");
}
function getSetISODayOfWeek$1(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    var weekday = parseIsoWeekday$1(input, this.localeData());
    return this.day(this.day() % 7 ? weekday : weekday - 7);
  } else {
    return this.day() || 7;
  }
}
function weekdaysRegex$1(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp$1(this, "_weekdaysRegex")) {
      computeWeekdaysParse$1.call(this);
    }
    if (isStrict) {
      return this._weekdaysStrictRegex;
    } else {
      return this._weekdaysRegex;
    }
  } else {
    if (!hasOwnProp$1(this, "_weekdaysRegex")) {
      this._weekdaysRegex = defaultWeekdaysRegex$1;
    }
    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }
}
function weekdaysShortRegex$1(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp$1(this, "_weekdaysRegex")) {
      computeWeekdaysParse$1.call(this);
    }
    if (isStrict) {
      return this._weekdaysShortStrictRegex;
    } else {
      return this._weekdaysShortRegex;
    }
  } else {
    if (!hasOwnProp$1(this, "_weekdaysShortRegex")) {
      this._weekdaysShortRegex = defaultWeekdaysShortRegex$1;
    }
    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }
}
function weekdaysMinRegex$1(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp$1(this, "_weekdaysRegex")) {
      computeWeekdaysParse$1.call(this);
    }
    if (isStrict) {
      return this._weekdaysMinStrictRegex;
    } else {
      return this._weekdaysMinRegex;
    }
  } else {
    if (!hasOwnProp$1(this, "_weekdaysMinRegex")) {
      this._weekdaysMinRegex = defaultWeekdaysMinRegex$1;
    }
    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }
}
function computeWeekdaysParse$1() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
  for (i = 0; i < 7; i++) {
    mom = createUTC$1([2e3, 1]).day(i);
    minp = regexEscape$1(this.weekdaysMin(mom, ""));
    shortp = regexEscape$1(this.weekdaysShort(mom, ""));
    longp = regexEscape$1(this.weekdays(mom, ""));
    minPieces.push(minp);
    shortPieces.push(shortp);
    longPieces.push(longp);
    mixedPieces.push(minp);
    mixedPieces.push(shortp);
    mixedPieces.push(longp);
  }
  minPieces.sort(cmpLenRev);
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._weekdaysShortRegex = this._weekdaysRegex;
  this._weekdaysMinRegex = this._weekdaysRegex;
  this._weekdaysStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._weekdaysShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
  this._weekdaysMinStrictRegex = new RegExp(
    "^(" + minPieces.join("|") + ")",
    "i"
  );
}
function hFormat$1() {
  return this.hours() % 12 || 12;
}
function kFormat$1() {
  return this.hours() || 24;
}
addFormatToken$1("H", ["HH", 2], 0, "hour");
addFormatToken$1("h", ["hh", 2], 0, hFormat$1);
addFormatToken$1("k", ["kk", 2], 0, kFormat$1);
addFormatToken$1("hmm", 0, 0, function() {
  return "" + hFormat$1.apply(this) + zeroFill$1(this.minutes(), 2);
});
addFormatToken$1("hmmss", 0, 0, function() {
  return "" + hFormat$1.apply(this) + zeroFill$1(this.minutes(), 2) + zeroFill$1(this.seconds(), 2);
});
addFormatToken$1("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill$1(this.minutes(), 2);
});
addFormatToken$1("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill$1(this.minutes(), 2) + zeroFill$1(this.seconds(), 2);
});
function meridiem$1(token2, lowercase) {
  addFormatToken$1(token2, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      lowercase
    );
  });
}
meridiem$1("a", true);
meridiem$1("A", false);
addUnitAlias$1("hour", "h");
addUnitPriority$1("hour", 13);
function matchMeridiem$1(isStrict, locale2) {
  return locale2._meridiemParse;
}
addRegexToken$1("a", matchMeridiem$1);
addRegexToken$1("A", matchMeridiem$1);
addRegexToken$1("H", match1to2$1);
addRegexToken$1("h", match1to2$1);
addRegexToken$1("k", match1to2$1);
addRegexToken$1("HH", match1to2$1, match2$1);
addRegexToken$1("hh", match1to2$1, match2$1);
addRegexToken$1("kk", match1to2$1, match2$1);
addRegexToken$1("hmm", match3to4$1);
addRegexToken$1("hmmss", match5to6$1);
addRegexToken$1("Hmm", match3to4$1);
addRegexToken$1("Hmmss", match5to6$1);
addParseToken$1(["H", "HH"], HOUR$1);
addParseToken$1(["k", "kk"], function(input, array, config) {
  var kInput = toInt$1(input);
  array[HOUR$1] = kInput === 24 ? 0 : kInput;
});
addParseToken$1(["a", "A"], function(input, array, config) {
  config._isPm = config._locale.isPM(input);
  config._meridiem = input;
});
addParseToken$1(["h", "hh"], function(input, array, config) {
  array[HOUR$1] = toInt$1(input);
  getParsingFlags$1(config).bigHour = true;
});
addParseToken$1("hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR$1] = toInt$1(input.substr(0, pos));
  array[MINUTE$1] = toInt$1(input.substr(pos));
  getParsingFlags$1(config).bigHour = true;
});
addParseToken$1("hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR$1] = toInt$1(input.substr(0, pos1));
  array[MINUTE$1] = toInt$1(input.substr(pos1, 2));
  array[SECOND$1] = toInt$1(input.substr(pos2));
  getParsingFlags$1(config).bigHour = true;
});
addParseToken$1("Hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR$1] = toInt$1(input.substr(0, pos));
  array[MINUTE$1] = toInt$1(input.substr(pos));
});
addParseToken$1("Hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR$1] = toInt$1(input.substr(0, pos1));
  array[MINUTE$1] = toInt$1(input.substr(pos1, 2));
  array[SECOND$1] = toInt$1(input.substr(pos2));
});
function localeIsPM$1(input) {
  return (input + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse$1 = /[ap]\.?m?\.?/i, getSetHour$1 = makeGetSet$1("Hours", true);
function localeMeridiem$1(hours2, minutes2, isLower) {
  if (hours2 > 11) {
    return isLower ? "pm" : "PM";
  } else {
    return isLower ? "am" : "AM";
  }
}
var baseConfig$1 = {
  calendar: defaultCalendar$1,
  longDateFormat: defaultLongDateFormat$1,
  invalidDate: defaultInvalidDate$1,
  ordinal: defaultOrdinal$1,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse$1,
  relativeTime: defaultRelativeTime$1,
  months: defaultLocaleMonths$1,
  monthsShort: defaultLocaleMonthsShort$1,
  week: defaultLocaleWeek$1,
  weekdays: defaultLocaleWeekdays$1,
  weekdaysMin: defaultLocaleWeekdaysMin$1,
  weekdaysShort: defaultLocaleWeekdaysShort$1,
  meridiemParse: defaultLocaleMeridiemParse$1
};
var locales$1 = {}, localeFamilies$1 = {}, globalLocale$1;
function commonPrefix$1(arr1, arr2) {
  var i, minl = Math.min(arr1.length, arr2.length);
  for (i = 0; i < minl; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return i;
    }
  }
  return minl;
}
function normalizeLocale$1(key) {
  return key ? key.toLowerCase().replace("_", "-") : key;
}
function chooseLocale$1(names) {
  var i = 0, j, next, locale2, split;
  while (i < names.length) {
    split = normalizeLocale$1(names[i]).split("-");
    j = split.length;
    next = normalizeLocale$1(names[i + 1]);
    next = next ? next.split("-") : null;
    while (j > 0) {
      locale2 = loadLocale$1(split.slice(0, j).join("-"));
      if (locale2) {
        return locale2;
      }
      if (next && next.length >= j && commonPrefix$1(split, next) >= j - 1) {
        break;
      }
      j--;
    }
    i++;
  }
  return globalLocale$1;
}
function isLocaleNameSane$1(name) {
  return name.match("^[^/\\\\]*$") != null;
}
function loadLocale$1(name) {
  var oldLocale = null, aliasedRequire;
  if (locales$1[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane$1(name)) {
    try {
      oldLocale = globalLocale$1._abbr;
      aliasedRequire = require;
      aliasedRequire("./locale/" + name);
      getSetGlobalLocale$1(oldLocale);
    } catch (e) {
      locales$1[name] = null;
    }
  }
  return locales$1[name];
}
function getSetGlobalLocale$1(key, values) {
  var data2;
  if (key) {
    if (isUndefined$2(values)) {
      data2 = getLocale$1(key);
    } else {
      data2 = defineLocale$1(key, values);
    }
    if (data2) {
      globalLocale$1 = data2;
    } else {
      if (typeof console !== "undefined" && console.warn) {
        console.warn(
          "Locale " + key + " not found. Did you forget to load it?"
        );
      }
    }
  }
  return globalLocale$1._abbr;
}
function defineLocale$1(name, config) {
  if (config !== null) {
    var locale2, parentConfig = baseConfig$1;
    config.abbr = name;
    if (locales$1[name] != null) {
      deprecateSimple$1(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      );
      parentConfig = locales$1[name]._config;
    } else if (config.parentLocale != null) {
      if (locales$1[config.parentLocale] != null) {
        parentConfig = locales$1[config.parentLocale]._config;
      } else {
        locale2 = loadLocale$1(config.parentLocale);
        if (locale2 != null) {
          parentConfig = locale2._config;
        } else {
          if (!localeFamilies$1[config.parentLocale]) {
            localeFamilies$1[config.parentLocale] = [];
          }
          localeFamilies$1[config.parentLocale].push({
            name,
            config
          });
          return null;
        }
      }
    }
    locales$1[name] = new Locale$1(mergeConfigs$1(parentConfig, config));
    if (localeFamilies$1[name]) {
      localeFamilies$1[name].forEach(function(x) {
        defineLocale$1(x.name, x.config);
      });
    }
    getSetGlobalLocale$1(name);
    return locales$1[name];
  } else {
    delete locales$1[name];
    return null;
  }
}
function updateLocale$1(name, config) {
  if (config != null) {
    var locale2, tmpLocale, parentConfig = baseConfig$1;
    if (locales$1[name] != null && locales$1[name].parentLocale != null) {
      locales$1[name].set(mergeConfigs$1(locales$1[name]._config, config));
    } else {
      tmpLocale = loadLocale$1(name);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config = mergeConfigs$1(parentConfig, config);
      if (tmpLocale == null) {
        config.abbr = name;
      }
      locale2 = new Locale$1(config);
      locale2.parentLocale = locales$1[name];
      locales$1[name] = locale2;
    }
    getSetGlobalLocale$1(name);
  } else {
    if (locales$1[name] != null) {
      if (locales$1[name].parentLocale != null) {
        locales$1[name] = locales$1[name].parentLocale;
        if (name === getSetGlobalLocale$1()) {
          getSetGlobalLocale$1(name);
        }
      } else if (locales$1[name] != null) {
        delete locales$1[name];
      }
    }
  }
  return locales$1[name];
}
function getLocale$1(key) {
  var locale2;
  if (key && key._locale && key._locale._abbr) {
    key = key._locale._abbr;
  }
  if (!key) {
    return globalLocale$1;
  }
  if (!isArray$4(key)) {
    locale2 = loadLocale$1(key);
    if (locale2) {
      return locale2;
    }
    key = [key];
  }
  return chooseLocale$1(key);
}
function listLocales$1() {
  return keys$2(locales$1);
}
function checkOverflow$1(m) {
  var overflow, a = m._a;
  if (a && getParsingFlags$1(m).overflow === -2) {
    overflow = a[MONTH$1] < 0 || a[MONTH$1] > 11 ? MONTH$1 : a[DATE$1] < 1 || a[DATE$1] > daysInMonth$1(a[YEAR$1], a[MONTH$1]) ? DATE$1 : a[HOUR$1] < 0 || a[HOUR$1] > 24 || a[HOUR$1] === 24 && (a[MINUTE$1] !== 0 || a[SECOND$1] !== 0 || a[MILLISECOND$1] !== 0) ? HOUR$1 : a[MINUTE$1] < 0 || a[MINUTE$1] > 59 ? MINUTE$1 : a[SECOND$1] < 0 || a[SECOND$1] > 59 ? SECOND$1 : a[MILLISECOND$1] < 0 || a[MILLISECOND$1] > 999 ? MILLISECOND$1 : -1;
    if (getParsingFlags$1(m)._overflowDayOfYear && (overflow < YEAR$1 || overflow > DATE$1)) {
      overflow = DATE$1;
    }
    if (getParsingFlags$1(m)._overflowWeeks && overflow === -1) {
      overflow = WEEK$1;
    }
    if (getParsingFlags$1(m)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY$1;
    }
    getParsingFlags$1(m).overflow = overflow;
  }
  return m;
}
var extendedIsoRegex$1 = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex$1 = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex$1 = /Z|[+-]\d\d(?::?\d\d)?/, isoDates$1 = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], isoTimes$1 = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex$1 = /^\/?Date\((-?\d+)/i, rfc2822$1 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets$1 = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO$1(config) {
  var i, l, string = config._i, match = extendedIsoRegex$1.exec(string) || basicIsoRegex$1.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates$1.length, isoTimesLen = isoTimes$1.length;
  if (match) {
    getParsingFlags$1(config).iso = true;
    for (i = 0, l = isoDatesLen; i < l; i++) {
      if (isoDates$1[i][1].exec(match[1])) {
        dateFormat = isoDates$1[i][0];
        allowTime = isoDates$1[i][2] !== false;
        break;
      }
    }
    if (dateFormat == null) {
      config._isValid = false;
      return;
    }
    if (match[3]) {
      for (i = 0, l = isoTimesLen; i < l; i++) {
        if (isoTimes$1[i][1].exec(match[3])) {
          timeFormat = (match[2] || " ") + isoTimes$1[i][0];
          break;
        }
      }
      if (timeFormat == null) {
        config._isValid = false;
        return;
      }
    }
    if (!allowTime && timeFormat != null) {
      config._isValid = false;
      return;
    }
    if (match[4]) {
      if (tzRegex$1.exec(match[4])) {
        tzFormat = "Z";
      } else {
        config._isValid = false;
        return;
      }
    }
    config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
    configFromStringAndFormat$1(config);
  } else {
    config._isValid = false;
  }
}
function extractFromRFC2822Strings$1(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = [
    untruncateYear$1(yearStr),
    defaultLocaleMonthsShort$1.indexOf(monthStr),
    parseInt(dayStr, 10),
    parseInt(hourStr, 10),
    parseInt(minuteStr, 10)
  ];
  if (secondStr) {
    result.push(parseInt(secondStr, 10));
  }
  return result;
}
function untruncateYear$1(yearStr) {
  var year = parseInt(yearStr, 10);
  if (year <= 49) {
    return 2e3 + year;
  } else if (year <= 999) {
    return 1900 + year;
  }
  return year;
}
function preprocessRFC2822$1(s) {
  return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday$1(weekdayStr, parsedInput, config) {
  if (weekdayStr) {
    var weekdayProvided = defaultLocaleWeekdaysShort$1.indexOf(weekdayStr), weekdayActual = new Date(
      parsedInput[0],
      parsedInput[1],
      parsedInput[2]
    ).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags$1(config).weekdayMismatch = true;
      config._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset$1(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets$1[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
    return h * 60 + m;
  }
}
function configFromRFC2822$1(config) {
  var match = rfc2822$1.exec(preprocessRFC2822$1(config._i)), parsedArray;
  if (match) {
    parsedArray = extractFromRFC2822Strings$1(
      match[4],
      match[3],
      match[2],
      match[5],
      match[6],
      match[7]
    );
    if (!checkWeekday$1(match[1], parsedArray, config)) {
      return;
    }
    config._a = parsedArray;
    config._tzm = calculateOffset$1(match[8], match[9], match[10]);
    config._d = createUTCDate$1.apply(null, config._a);
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    getParsingFlags$1(config).rfc2822 = true;
  } else {
    config._isValid = false;
  }
}
function configFromString$1(config) {
  var matched = aspNetJsonRegex$1.exec(config._i);
  if (matched !== null) {
    config._d = new Date(+matched[1]);
    return;
  }
  configFromISO$1(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  configFromRFC2822$1(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  if (config._strict) {
    config._isValid = false;
  } else {
    hooks$1.createFromInputFallback(config);
  }
}
hooks$1.createFromInputFallback = deprecate$1(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(config) {
    config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
  }
);
function defaults$5(a, b, c) {
  if (a != null) {
    return a;
  }
  if (b != null) {
    return b;
  }
  return c;
}
function currentDateArray$1(config) {
  var nowValue = new Date(hooks$1.now());
  if (config._useUTC) {
    return [
      nowValue.getUTCFullYear(),
      nowValue.getUTCMonth(),
      nowValue.getUTCDate()
    ];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray$1(config) {
  var i, date, input = [], currentDate, expectedWeekday, yearToUse;
  if (config._d) {
    return;
  }
  currentDate = currentDateArray$1(config);
  if (config._w && config._a[DATE$1] == null && config._a[MONTH$1] == null) {
    dayOfYearFromWeekInfo$1(config);
  }
  if (config._dayOfYear != null) {
    yearToUse = defaults$5(config._a[YEAR$1], currentDate[YEAR$1]);
    if (config._dayOfYear > daysInYear$1(yearToUse) || config._dayOfYear === 0) {
      getParsingFlags$1(config)._overflowDayOfYear = true;
    }
    date = createUTCDate$1(yearToUse, 0, config._dayOfYear);
    config._a[MONTH$1] = date.getUTCMonth();
    config._a[DATE$1] = date.getUTCDate();
  }
  for (i = 0; i < 3 && config._a[i] == null; ++i) {
    config._a[i] = input[i] = currentDate[i];
  }
  for (; i < 7; i++) {
    config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
  }
  if (config._a[HOUR$1] === 24 && config._a[MINUTE$1] === 0 && config._a[SECOND$1] === 0 && config._a[MILLISECOND$1] === 0) {
    config._nextDay = true;
    config._a[HOUR$1] = 0;
  }
  config._d = (config._useUTC ? createUTCDate$1 : createDate$1).apply(
    null,
    input
  );
  expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
  if (config._tzm != null) {
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  }
  if (config._nextDay) {
    config._a[HOUR$1] = 24;
  }
  if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
    getParsingFlags$1(config).weekdayMismatch = true;
  }
}
function dayOfYearFromWeekInfo$1(config) {
  var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  w = config._w;
  if (w.GG != null || w.W != null || w.E != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults$5(
      w.GG,
      config._a[YEAR$1],
      weekOfYear$1(createLocal$1(), 1, 4).year
    );
    week = defaults$5(w.W, 1);
    weekday = defaults$5(w.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;
    curWeek = weekOfYear$1(createLocal$1(), dow, doy);
    weekYear = defaults$5(w.gg, config._a[YEAR$1], curWeek.year);
    week = defaults$5(w.w, curWeek.week);
    if (w.d != null) {
      weekday = w.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w.e != null) {
      weekday = w.e + dow;
      if (w.e < 0 || w.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear$1(weekYear, dow, doy)) {
    getParsingFlags$1(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags$1(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks$1(weekYear, week, weekday, dow, doy);
    config._a[YEAR$1] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
}
hooks$1.ISO_8601 = function() {
};
hooks$1.RFC_2822 = function() {
};
function configFromStringAndFormat$1(config) {
  if (config._f === hooks$1.ISO_8601) {
    configFromISO$1(config);
    return;
  }
  if (config._f === hooks$1.RFC_2822) {
    configFromRFC2822$1(config);
    return;
  }
  config._a = [];
  getParsingFlags$1(config).empty = true;
  var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
  tokens2 = expandFormat$1(config._f, config._locale).match(formattingTokens$1) || [];
  tokenLen = tokens2.length;
  for (i = 0; i < tokenLen; i++) {
    token2 = tokens2[i];
    parsedInput = (string.match(getParseRegexForToken$1(token2, config)) || [])[0];
    if (parsedInput) {
      skipped = string.substr(0, string.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags$1(config).unusedInput.push(skipped);
      }
      string = string.slice(
        string.indexOf(parsedInput) + parsedInput.length
      );
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions$1[token2]) {
      if (parsedInput) {
        getParsingFlags$1(config).empty = false;
      } else {
        getParsingFlags$1(config).unusedTokens.push(token2);
      }
      addTimeToArrayFromToken$1(token2, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags$1(config).unusedTokens.push(token2);
    }
  }
  getParsingFlags$1(config).charsLeftOver = stringLength - totalParsedInputLength;
  if (string.length > 0) {
    getParsingFlags$1(config).unusedInput.push(string);
  }
  if (config._a[HOUR$1] <= 12 && getParsingFlags$1(config).bigHour === true && config._a[HOUR$1] > 0) {
    getParsingFlags$1(config).bigHour = void 0;
  }
  getParsingFlags$1(config).parsedDateParts = config._a.slice(0);
  getParsingFlags$1(config).meridiem = config._meridiem;
  config._a[HOUR$1] = meridiemFixWrap$1(
    config._locale,
    config._a[HOUR$1],
    config._meridiem
  );
  era = getParsingFlags$1(config).era;
  if (era !== null) {
    config._a[YEAR$1] = config._locale.erasConvertYear(era, config._a[YEAR$1]);
  }
  configFromArray$1(config);
  checkOverflow$1(config);
}
function meridiemFixWrap$1(locale2, hour, meridiem2) {
  var isPm;
  if (meridiem2 == null) {
    return hour;
  }
  if (locale2.meridiemHour != null) {
    return locale2.meridiemHour(hour, meridiem2);
  } else if (locale2.isPM != null) {
    isPm = locale2.isPM(meridiem2);
    if (isPm && hour < 12) {
      hour += 12;
    }
    if (!isPm && hour === 12) {
      hour = 0;
    }
    return hour;
  } else {
    return hour;
  }
}
function configFromStringAndArray$1(config) {
  var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
  if (configfLen === 0) {
    getParsingFlags$1(config).invalidFormat = true;
    config._d = new Date(NaN);
    return;
  }
  for (i = 0; i < configfLen; i++) {
    currentScore = 0;
    validFormatFound = false;
    tempConfig = copyConfig$1({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i];
    configFromStringAndFormat$1(tempConfig);
    if (isValid$3(tempConfig)) {
      validFormatFound = true;
    }
    currentScore += getParsingFlags$1(tempConfig).charsLeftOver;
    currentScore += getParsingFlags$1(tempConfig).unusedTokens.length * 10;
    getParsingFlags$1(tempConfig).score = currentScore;
    if (!bestFormatIsValid) {
      if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
        if (validFormatFound) {
          bestFormatIsValid = true;
        }
      }
    } else {
      if (currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
  }
  extend$2(config, bestMoment || tempConfig);
}
function configFromObject$1(config) {
  if (config._d) {
    return;
  }
  var i = normalizeObjectUnits$1(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
  config._a = map$1(
    [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
    function(obj) {
      return obj && parseInt(obj, 10);
    }
  );
  configFromArray$1(config);
}
function createFromConfig$1(config) {
  var res = new Moment$1(checkOverflow$1(prepareConfig$1(config)));
  if (res._nextDay) {
    res.add(1, "d");
    res._nextDay = void 0;
  }
  return res;
}
function prepareConfig$1(config) {
  var input = config._i, format2 = config._f;
  config._locale = config._locale || getLocale$1(config._l);
  if (input === null || format2 === void 0 && input === "") {
    return createInvalid$2({ nullInput: true });
  }
  if (typeof input === "string") {
    config._i = input = config._locale.preparse(input);
  }
  if (isMoment$1(input)) {
    return new Moment$1(checkOverflow$1(input));
  } else if (isDate$2(input)) {
    config._d = input;
  } else if (isArray$4(format2)) {
    configFromStringAndArray$1(config);
  } else if (format2) {
    configFromStringAndFormat$1(config);
  } else {
    configFromInput$1(config);
  }
  if (!isValid$3(config)) {
    config._d = null;
  }
  return config;
}
function configFromInput$1(config) {
  var input = config._i;
  if (isUndefined$2(input)) {
    config._d = new Date(hooks$1.now());
  } else if (isDate$2(input)) {
    config._d = new Date(input.valueOf());
  } else if (typeof input === "string") {
    configFromString$1(config);
  } else if (isArray$4(input)) {
    config._a = map$1(input.slice(0), function(obj) {
      return parseInt(obj, 10);
    });
    configFromArray$1(config);
  } else if (isObject$3(input)) {
    configFromObject$1(config);
  } else if (isNumber$2(input)) {
    config._d = new Date(input);
  } else {
    hooks$1.createFromInputFallback(config);
  }
}
function createLocalOrUTC$1(input, format2, locale2, strict, isUTC) {
  var c = {};
  if (format2 === true || format2 === false) {
    strict = format2;
    format2 = void 0;
  }
  if (locale2 === true || locale2 === false) {
    strict = locale2;
    locale2 = void 0;
  }
  if (isObject$3(input) && isObjectEmpty$1(input) || isArray$4(input) && input.length === 0) {
    input = void 0;
  }
  c._isAMomentObject = true;
  c._useUTC = c._isUTC = isUTC;
  c._l = locale2;
  c._i = input;
  c._f = format2;
  c._strict = strict;
  return createFromConfig$1(c);
}
function createLocal$1(input, format2, locale2, strict) {
  return createLocalOrUTC$1(input, format2, locale2, strict, false);
}
var prototypeMin$1 = deprecate$1(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal$1.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid$2();
    }
  }
), prototypeMax$1 = deprecate$1(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal$1.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid$2();
    }
  }
);
function pickBy$1(fn, moments) {
  var res, i;
  if (moments.length === 1 && isArray$4(moments[0])) {
    moments = moments[0];
  }
  if (!moments.length) {
    return createLocal$1();
  }
  res = moments[0];
  for (i = 1; i < moments.length; ++i) {
    if (!moments[i].isValid() || moments[i][fn](res)) {
      res = moments[i];
    }
  }
  return res;
}
function min$1() {
  var args = [].slice.call(arguments, 0);
  return pickBy$1("isBefore", args);
}
function max$1() {
  var args = [].slice.call(arguments, 0);
  return pickBy$1("isAfter", args);
}
var now$1 = function() {
  return Date.now ? Date.now() : +new Date();
};
var ordering$1 = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid$1(m) {
  var key, unitHasDecimal = false, i, orderLen = ordering$1.length;
  for (key in m) {
    if (hasOwnProp$1(m, key) && !(indexOf$1.call(ordering$1, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
      return false;
    }
  }
  for (i = 0; i < orderLen; ++i) {
    if (m[ordering$1[i]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (parseFloat(m[ordering$1[i]]) !== toInt$1(m[ordering$1[i]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function isValid$1$1() {
  return this._isValid;
}
function createInvalid$1$1() {
  return createDuration$1(NaN);
}
function Duration$1(duration) {
  var normalizedInput = normalizeObjectUnits$1(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
  this._isValid = isDurationValid$1(normalizedInput);
  this._milliseconds = +milliseconds2 + seconds2 * 1e3 + minutes2 * 6e4 + hours2 * 1e3 * 60 * 60;
  this._days = +days2 + weeks2 * 7;
  this._months = +months2 + quarters * 3 + years2 * 12;
  this._data = {};
  this._locale = getLocale$1();
  this._bubble();
}
function isDuration$1(obj) {
  return obj instanceof Duration$1;
}
function absRound$1(number) {
  if (number < 0) {
    return Math.round(-1 * number) * -1;
  } else {
    return Math.round(number);
  }
}
function compareArrays$1(array1, array2, dontConvert) {
  var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
  for (i = 0; i < len; i++) {
    if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt$1(array1[i]) !== toInt$1(array2[i])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function offset$1(token2, separator) {
  addFormatToken$1(token2, 0, 0, function() {
    var offset2 = this.utcOffset(), sign2 = "+";
    if (offset2 < 0) {
      offset2 = -offset2;
      sign2 = "-";
    }
    return sign2 + zeroFill$1(~~(offset2 / 60), 2) + separator + zeroFill$1(~~offset2 % 60, 2);
  });
}
offset$1("Z", ":");
offset$1("ZZ", "");
addRegexToken$1("Z", matchShortOffset$1);
addRegexToken$1("ZZ", matchShortOffset$1);
addParseToken$1(["Z", "ZZ"], function(input, array, config) {
  config._useUTC = true;
  config._tzm = offsetFromString$1(matchShortOffset$1, input);
});
var chunkOffset$1 = /([\+\-]|\d\d)/gi;
function offsetFromString$1(matcher, string) {
  var matches = (string || "").match(matcher), chunk, parts, minutes2;
  if (matches === null) {
    return null;
  }
  chunk = matches[matches.length - 1] || [];
  parts = (chunk + "").match(chunkOffset$1) || ["-", 0, 0];
  minutes2 = +(parts[1] * 60) + toInt$1(parts[2]);
  return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
}
function cloneWithOffset$1(input, model) {
  var res, diff2;
  if (model._isUTC) {
    res = model.clone();
    diff2 = (isMoment$1(input) || isDate$2(input) ? input.valueOf() : createLocal$1(input).valueOf()) - res.valueOf();
    res._d.setTime(res._d.valueOf() + diff2);
    hooks$1.updateOffset(res, false);
    return res;
  } else {
    return createLocal$1(input).local();
  }
}
function getDateOffset$1(m) {
  return -Math.round(m._d.getTimezoneOffset());
}
hooks$1.updateOffset = function() {
};
function getSetOffset$1(input, keepLocalTime, keepMinutes) {
  var offset2 = this._offset || 0, localAdjust;
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    if (typeof input === "string") {
      input = offsetFromString$1(matchShortOffset$1, input);
      if (input === null) {
        return this;
      }
    } else if (Math.abs(input) < 16 && !keepMinutes) {
      input = input * 60;
    }
    if (!this._isUTC && keepLocalTime) {
      localAdjust = getDateOffset$1(this);
    }
    this._offset = input;
    this._isUTC = true;
    if (localAdjust != null) {
      this.add(localAdjust, "m");
    }
    if (offset2 !== input) {
      if (!keepLocalTime || this._changeInProgress) {
        addSubtract$2(
          this,
          createDuration$1(input - offset2, "m"),
          1,
          false
        );
      } else if (!this._changeInProgress) {
        this._changeInProgress = true;
        hooks$1.updateOffset(this, true);
        this._changeInProgress = null;
      }
    }
    return this;
  } else {
    return this._isUTC ? offset2 : getDateOffset$1(this);
  }
}
function getSetZone$1(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== "string") {
      input = -input;
    }
    this.utcOffset(input, keepLocalTime);
    return this;
  } else {
    return -this.utcOffset();
  }
}
function setOffsetToUTC$1(keepLocalTime) {
  return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal$1(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;
    if (keepLocalTime) {
      this.subtract(getDateOffset$1(this), "m");
    }
  }
  return this;
}
function setOffsetToParsedOffset$1() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === "string") {
    var tZone = offsetFromString$1(matchOffset$1, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    } else {
      this.utcOffset(0, true);
    }
  }
  return this;
}
function hasAlignedHourOffset$1(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal$1(input).utcOffset() : 0;
  return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime$1() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted$1() {
  if (!isUndefined$2(this._isDSTShifted)) {
    return this._isDSTShifted;
  }
  var c = {}, other;
  copyConfig$1(c, this);
  c = prepareConfig$1(c);
  if (c._a) {
    other = c._isUTC ? createUTC$1(c._a) : createLocal$1(c._a);
    this._isDSTShifted = this.isValid() && compareArrays$1(c._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }
  return this._isDSTShifted;
}
function isLocal$1() {
  return this.isValid() ? !this._isUTC : false;
}
function isUtcOffset$1() {
  return this.isValid() ? this._isUTC : false;
}
function isUtc$1() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var aspNetRegex$1 = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex$1 = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration$1(input, key) {
  var duration = input, match = null, sign2, ret, diffRes;
  if (isDuration$1(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months
    };
  } else if (isNumber$2(input) || !isNaN(+input)) {
    duration = {};
    if (key) {
      duration[key] = +input;
    } else {
      duration.milliseconds = +input;
    }
  } else if (match = aspNetRegex$1.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: 0,
      d: toInt$1(match[DATE$1]) * sign2,
      h: toInt$1(match[HOUR$1]) * sign2,
      m: toInt$1(match[MINUTE$1]) * sign2,
      s: toInt$1(match[SECOND$1]) * sign2,
      ms: toInt$1(absRound$1(match[MILLISECOND$1] * 1e3)) * sign2
    };
  } else if (match = isoRegex$1.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: parseIso$1(match[2], sign2),
      M: parseIso$1(match[3], sign2),
      w: parseIso$1(match[4], sign2),
      d: parseIso$1(match[5], sign2),
      h: parseIso$1(match[6], sign2),
      m: parseIso$1(match[7], sign2),
      s: parseIso$1(match[8], sign2)
    };
  } else if (duration == null) {
    duration = {};
  } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
    diffRes = momentsDifference$1(
      createLocal$1(duration.from),
      createLocal$1(duration.to)
    );
    duration = {};
    duration.ms = diffRes.milliseconds;
    duration.M = diffRes.months;
  }
  ret = new Duration$1(duration);
  if (isDuration$1(input) && hasOwnProp$1(input, "_locale")) {
    ret._locale = input._locale;
  }
  if (isDuration$1(input) && hasOwnProp$1(input, "_isValid")) {
    ret._isValid = input._isValid;
  }
  return ret;
}
createDuration$1.fn = Duration$1.prototype;
createDuration$1.invalid = createInvalid$1$1;
function parseIso$1(inp, sign2) {
  var res = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res) ? 0 : res) * sign2;
}
function positiveMomentsDifference$1(base, other) {
  var res = {};
  res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
  if (base.clone().add(res.months, "M").isAfter(other)) {
    --res.months;
  }
  res.milliseconds = +other - +base.clone().add(res.months, "M");
  return res;
}
function momentsDifference$1(base, other) {
  var res;
  if (!(base.isValid() && other.isValid())) {
    return { milliseconds: 0, months: 0 };
  }
  other = cloneWithOffset$1(other, base);
  if (base.isBefore(other)) {
    res = positiveMomentsDifference$1(base, other);
  } else {
    res = positiveMomentsDifference$1(other, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }
  return res;
}
function createAdder$1(direction, name) {
  return function(val, period) {
    var dur, tmp;
    if (period !== null && !isNaN(+period)) {
      deprecateSimple$1(
        name,
        "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
      );
      tmp = val;
      val = period;
      period = tmp;
    }
    dur = createDuration$1(val, period);
    addSubtract$2(this, dur, direction);
    return this;
  };
}
function addSubtract$2(mom, duration, isAdding, updateOffset) {
  var milliseconds2 = duration._milliseconds, days2 = absRound$1(duration._days), months2 = absRound$1(duration._months);
  if (!mom.isValid()) {
    return;
  }
  updateOffset = updateOffset == null ? true : updateOffset;
  if (months2) {
    setMonth$1(mom, get$3(mom, "Month") + months2 * isAdding);
  }
  if (days2) {
    set$1$1(mom, "Date", get$3(mom, "Date") + days2 * isAdding);
  }
  if (milliseconds2) {
    mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
  }
  if (updateOffset) {
    hooks$1.updateOffset(mom, days2 || months2);
  }
}
var add$3 = createAdder$1(1, "add"), subtract$2 = createAdder$1(-1, "subtract");
function isString$2(input) {
  return typeof input === "string" || input instanceof String;
}
function isMomentInput$1(input) {
  return isMoment$1(input) || isDate$2(input) || isString$2(input) || isNumber$2(input) || isNumberOrStringArray$1(input) || isMomentInputObject$1(input) || input === null || input === void 0;
}
function isMomentInputObject$1(input) {
  var objectTest = isObject$3(input) && !isObjectEmpty$1(input), propertyTest = false, properties = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i, property, propertyLen = properties.length;
  for (i = 0; i < propertyLen; i += 1) {
    property = properties[i];
    propertyTest = propertyTest || hasOwnProp$1(input, property);
  }
  return objectTest && propertyTest;
}
function isNumberOrStringArray$1(input) {
  var arrayTest = isArray$4(input), dataTypeTest = false;
  if (arrayTest) {
    dataTypeTest = input.filter(function(item) {
      return !isNumber$2(item) && isString$2(input);
    }).length === 0;
  }
  return arrayTest && dataTypeTest;
}
function isCalendarSpec$1(input) {
  var objectTest = isObject$3(input) && !isObjectEmpty$1(input), propertyTest = false, properties = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i, property;
  for (i = 0; i < properties.length; i += 1) {
    property = properties[i];
    propertyTest = propertyTest || hasOwnProp$1(input, property);
  }
  return objectTest && propertyTest;
}
function getCalendarFormat$1(myMoment, now2) {
  var diff2 = myMoment.diff(now2, "days", true);
  return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
}
function calendar$1$1(time, formats) {
  if (arguments.length === 1) {
    if (!arguments[0]) {
      time = void 0;
      formats = void 0;
    } else if (isMomentInput$1(arguments[0])) {
      time = arguments[0];
      formats = void 0;
    } else if (isCalendarSpec$1(arguments[0])) {
      formats = arguments[0];
      time = void 0;
    }
  }
  var now2 = time || createLocal$1(), sod = cloneWithOffset$1(now2, this).startOf("day"), format2 = hooks$1.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction$3(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
  return this.format(
    output || this.localeData().calendar(format2, this, createLocal$1(now2))
  );
}
function clone$2() {
  return new Moment$1(this);
}
function isAfter$1(input, units) {
  var localInput = isMoment$1(input) ? input : createLocal$1(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits$1(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() > localInput.valueOf();
  } else {
    return localInput.valueOf() < this.clone().startOf(units).valueOf();
  }
}
function isBefore$1(input, units) {
  var localInput = isMoment$1(input) ? input : createLocal$1(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits$1(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() < localInput.valueOf();
  } else {
    return this.clone().endOf(units).valueOf() < localInput.valueOf();
  }
}
function isBetween$1(from2, to2, units, inclusivity) {
  var localFrom = isMoment$1(from2) ? from2 : createLocal$1(from2), localTo = isMoment$1(to2) ? to2 : createLocal$1(to2);
  if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
    return false;
  }
  inclusivity = inclusivity || "()";
  return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}
function isSame$1(input, units) {
  var localInput = isMoment$1(input) ? input : createLocal$1(input), inputMs;
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits$1(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() === localInput.valueOf();
  } else {
    inputMs = localInput.valueOf();
    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  }
}
function isSameOrAfter$1(input, units) {
  return this.isSame(input, units) || this.isAfter(input, units);
}
function isSameOrBefore$1(input, units) {
  return this.isSame(input, units) || this.isBefore(input, units);
}
function diff$1(input, units, asFloat) {
  var that, zoneDelta, output;
  if (!this.isValid()) {
    return NaN;
  }
  that = cloneWithOffset$1(input, this);
  if (!that.isValid()) {
    return NaN;
  }
  zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  units = normalizeUnits$1(units);
  switch (units) {
    case "year":
      output = monthDiff$1(this, that) / 12;
      break;
    case "month":
      output = monthDiff$1(this, that);
      break;
    case "quarter":
      output = monthDiff$1(this, that) / 3;
      break;
    case "second":
      output = (this - that) / 1e3;
      break;
    case "minute":
      output = (this - that) / 6e4;
      break;
    case "hour":
      output = (this - that) / 36e5;
      break;
    case "day":
      output = (this - that - zoneDelta) / 864e5;
      break;
    case "week":
      output = (this - that - zoneDelta) / 6048e5;
      break;
    default:
      output = this - that;
  }
  return asFloat ? output : absFloor$1(output);
}
function monthDiff$1(a, b) {
  if (a.date() < b.date()) {
    return -monthDiff$1(b, a);
  }
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
  if (b - anchor < 0) {
    anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
    adjust = (b - anchor) / (anchor - anchor2);
  } else {
    anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
    adjust = (b - anchor) / (anchor2 - anchor);
  }
  return -(wholeMonthDiff + adjust) || 0;
}
hooks$1.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks$1.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString$3() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString$2(keepOffset) {
  if (!this.isValid()) {
    return null;
  }
  var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
  if (m.year() < 0 || m.year() > 9999) {
    return formatMoment$1(
      m,
      utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );
  }
  if (isFunction$3(Date.prototype.toISOString)) {
    if (utc) {
      return this.toDate().toISOString();
    } else {
      return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment$1(m, "Z"));
    }
  }
  return formatMoment$1(
    m,
    utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function inspect$1() {
  if (!this.isValid()) {
    return "moment.invalid(/* " + this._i + " */)";
  }
  var func = "moment", zone = "", prefix, year, datetime, suffix;
  if (!this.isLocal()) {
    func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
    zone = "Z";
  }
  prefix = "[" + func + '("]';
  year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
  datetime = "-MM-DD[T]HH:mm:ss.SSS";
  suffix = zone + '[")]';
  return this.format(prefix + year + datetime + suffix);
}
function format$1(inputString) {
  if (!inputString) {
    inputString = this.isUtc() ? hooks$1.defaultFormatUtc : hooks$1.defaultFormat;
  }
  var output = formatMoment$1(this, inputString);
  return this.localeData().postformat(output);
}
function from$1(time, withoutSuffix) {
  if (this.isValid() && (isMoment$1(time) && time.isValid() || createLocal$1(time).isValid())) {
    return createDuration$1({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function fromNow$1(withoutSuffix) {
  return this.from(createLocal$1(), withoutSuffix);
}
function to$1(time, withoutSuffix) {
  if (this.isValid() && (isMoment$1(time) && time.isValid() || createLocal$1(time).isValid())) {
    return createDuration$1({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function toNow$1(withoutSuffix) {
  return this.to(createLocal$1(), withoutSuffix);
}
function locale$1(key) {
  var newLocaleData;
  if (key === void 0) {
    return this._locale._abbr;
  } else {
    newLocaleData = getLocale$1(key);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }
    return this;
  }
}
var lang$1 = deprecate$1(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(key) {
    if (key === void 0) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  }
);
function localeData$1() {
  return this._locale;
}
var MS_PER_SECOND$1 = 1e3, MS_PER_MINUTE$1 = 60 * MS_PER_SECOND$1, MS_PER_HOUR$1 = 60 * MS_PER_MINUTE$1, MS_PER_400_YEARS$1 = (365 * 400 + 97) * 24 * MS_PER_HOUR$1;
function mod$1$1(dividend, divisor) {
  return (dividend % divisor + divisor) % divisor;
}
function localStartOfDate$1(y, m, d) {
  if (y < 100 && y >= 0) {
    return new Date(y + 400, m, d) - MS_PER_400_YEARS$1;
  } else {
    return new Date(y, m, d).valueOf();
  }
}
function utcStartOfDate$1(y, m, d) {
  if (y < 100 && y >= 0) {
    return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS$1;
  } else {
    return Date.UTC(y, m, d);
  }
}
function startOf$1(units) {
  var time, startOfDate;
  units = normalizeUnits$1(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate$1 : localStartOfDate$1;
  switch (units) {
    case "year":
      time = startOfDate(this.year(), 0, 1);
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      time = startOfDate(this.year(), this.month(), 1);
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date());
      break;
    case "hour":
      time = this._d.valueOf();
      time -= mod$1$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE$1),
        MS_PER_HOUR$1
      );
      break;
    case "minute":
      time = this._d.valueOf();
      time -= mod$1$1(time, MS_PER_MINUTE$1);
      break;
    case "second":
      time = this._d.valueOf();
      time -= mod$1$1(time, MS_PER_SECOND$1);
      break;
  }
  this._d.setTime(time);
  hooks$1.updateOffset(this, true);
  return this;
}
function endOf$1(units) {
  var time, startOfDate;
  units = normalizeUnits$1(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate$1 : localStartOfDate$1;
  switch (units) {
    case "year":
      time = startOfDate(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      time = startOfDate(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      time = this._d.valueOf();
      time += MS_PER_HOUR$1 - mod$1$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE$1),
        MS_PER_HOUR$1
      ) - 1;
      break;
    case "minute":
      time = this._d.valueOf();
      time += MS_PER_MINUTE$1 - mod$1$1(time, MS_PER_MINUTE$1) - 1;
      break;
    case "second":
      time = this._d.valueOf();
      time += MS_PER_SECOND$1 - mod$1$1(time, MS_PER_SECOND$1) - 1;
      break;
  }
  this._d.setTime(time);
  hooks$1.updateOffset(this, true);
  return this;
}
function valueOf$2() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix$1() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate$1() {
  return new Date(this.valueOf());
}
function toArray$2() {
  var m = this;
  return [
    m.year(),
    m.month(),
    m.date(),
    m.hour(),
    m.minute(),
    m.second(),
    m.millisecond()
  ];
}
function toObject$1() {
  var m = this;
  return {
    years: m.year(),
    months: m.month(),
    date: m.date(),
    hours: m.hours(),
    minutes: m.minutes(),
    seconds: m.seconds(),
    milliseconds: m.milliseconds()
  };
}
function toJSON$1() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2$1() {
  return isValid$3(this);
}
function parsingFlags$1() {
  return extend$2({}, getParsingFlags$1(this));
}
function invalidAt$1() {
  return getParsingFlags$1(this).overflow;
}
function creationData$1() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken$1("N", 0, 0, "eraAbbr");
addFormatToken$1("NN", 0, 0, "eraAbbr");
addFormatToken$1("NNN", 0, 0, "eraAbbr");
addFormatToken$1("NNNN", 0, 0, "eraName");
addFormatToken$1("NNNNN", 0, 0, "eraNarrow");
addFormatToken$1("y", ["y", 1], "yo", "eraYear");
addFormatToken$1("y", ["yy", 2], 0, "eraYear");
addFormatToken$1("y", ["yyy", 3], 0, "eraYear");
addFormatToken$1("y", ["yyyy", 4], 0, "eraYear");
addRegexToken$1("N", matchEraAbbr$1);
addRegexToken$1("NN", matchEraAbbr$1);
addRegexToken$1("NNN", matchEraAbbr$1);
addRegexToken$1("NNNN", matchEraName$1);
addRegexToken$1("NNNNN", matchEraNarrow$1);
addParseToken$1(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(input, array, config, token2) {
    var era = config._locale.erasParse(input, token2, config._strict);
    if (era) {
      getParsingFlags$1(config).era = era;
    } else {
      getParsingFlags$1(config).invalidEra = input;
    }
  }
);
addRegexToken$1("y", matchUnsigned$1);
addRegexToken$1("yy", matchUnsigned$1);
addRegexToken$1("yyy", matchUnsigned$1);
addRegexToken$1("yyyy", matchUnsigned$1);
addRegexToken$1("yo", matchEraYearOrdinal$1);
addParseToken$1(["y", "yy", "yyy", "yyyy"], YEAR$1);
addParseToken$1(["yo"], function(input, array, config, token2) {
  var match;
  if (config._locale._eraYearOrdinalRegex) {
    match = input.match(config._locale._eraYearOrdinalRegex);
  }
  if (config._locale.eraYearOrdinalParse) {
    array[YEAR$1] = config._locale.eraYearOrdinalParse(input, match);
  } else {
    array[YEAR$1] = parseInt(input, 10);
  }
});
function localeEras$1(m, format2) {
  var i, l, date, eras = this._eras || getLocale$1("en")._eras;
  for (i = 0, l = eras.length; i < l; ++i) {
    switch (typeof eras[i].since) {
      case "string":
        date = hooks$1(eras[i].since).startOf("day");
        eras[i].since = date.valueOf();
        break;
    }
    switch (typeof eras[i].until) {
      case "undefined":
        eras[i].until = Infinity;
        break;
      case "string":
        date = hooks$1(eras[i].until).startOf("day").valueOf();
        eras[i].until = date.valueOf();
        break;
    }
  }
  return eras;
}
function localeErasParse$1(eraName, format2, strict) {
  var i, l, eras = this.eras(), name, abbr, narrow;
  eraName = eraName.toUpperCase();
  for (i = 0, l = eras.length; i < l; ++i) {
    name = eras[i].name.toUpperCase();
    abbr = eras[i].abbr.toUpperCase();
    narrow = eras[i].narrow.toUpperCase();
    if (strict) {
      switch (format2) {
        case "N":
        case "NN":
        case "NNN":
          if (abbr === eraName) {
            return eras[i];
          }
          break;
        case "NNNN":
          if (name === eraName) {
            return eras[i];
          }
          break;
        case "NNNNN":
          if (narrow === eraName) {
            return eras[i];
          }
          break;
      }
    } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
      return eras[i];
    }
  }
}
function localeErasConvertYear$1(era, year) {
  var dir = era.since <= era.until ? 1 : -1;
  if (year === void 0) {
    return hooks$1(era.since).year();
  } else {
    return hooks$1(era.since).year() + (year - era.offset) * dir;
  }
}
function getEraName$1() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].name;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].name;
    }
  }
  return "";
}
function getEraNarrow$1() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].narrow;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].narrow;
    }
  }
  return "";
}
function getEraAbbr$1() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].abbr;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].abbr;
    }
  }
  return "";
}
function getEraYear$1() {
  var i, l, dir, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    dir = eras[i].since <= eras[i].until ? 1 : -1;
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
      return (this.year() - hooks$1(eras[i].since).year()) * dir + eras[i].offset;
    }
  }
  return this.year();
}
function erasNameRegex$1(isStrict) {
  if (!hasOwnProp$1(this, "_erasNameRegex")) {
    computeErasParse$1.call(this);
  }
  return isStrict ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex$1(isStrict) {
  if (!hasOwnProp$1(this, "_erasAbbrRegex")) {
    computeErasParse$1.call(this);
  }
  return isStrict ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex$1(isStrict) {
  if (!hasOwnProp$1(this, "_erasNarrowRegex")) {
    computeErasParse$1.call(this);
  }
  return isStrict ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr$1(isStrict, locale2) {
  return locale2.erasAbbrRegex(isStrict);
}
function matchEraName$1(isStrict, locale2) {
  return locale2.erasNameRegex(isStrict);
}
function matchEraNarrow$1(isStrict, locale2) {
  return locale2.erasNarrowRegex(isStrict);
}
function matchEraYearOrdinal$1(isStrict, locale2) {
  return locale2._eraYearOrdinalRegex || matchUnsigned$1;
}
function computeErasParse$1() {
  var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    namePieces.push(regexEscape$1(eras[i].name));
    abbrPieces.push(regexEscape$1(eras[i].abbr));
    narrowPieces.push(regexEscape$1(eras[i].narrow));
    mixedPieces.push(regexEscape$1(eras[i].name));
    mixedPieces.push(regexEscape$1(eras[i].abbr));
    mixedPieces.push(regexEscape$1(eras[i].narrow));
  }
  this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
  this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
  this._erasNarrowRegex = new RegExp(
    "^(" + narrowPieces.join("|") + ")",
    "i"
  );
}
addFormatToken$1(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken$1(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken$1(token2, getter) {
  addFormatToken$1(0, [token2, token2.length], 0, getter);
}
addWeekYearFormatToken$1("gggg", "weekYear");
addWeekYearFormatToken$1("ggggg", "weekYear");
addWeekYearFormatToken$1("GGGG", "isoWeekYear");
addWeekYearFormatToken$1("GGGGG", "isoWeekYear");
addUnitAlias$1("weekYear", "gg");
addUnitAlias$1("isoWeekYear", "GG");
addUnitPriority$1("weekYear", 1);
addUnitPriority$1("isoWeekYear", 1);
addRegexToken$1("G", matchSigned$1);
addRegexToken$1("g", matchSigned$1);
addRegexToken$1("GG", match1to2$1, match2$1);
addRegexToken$1("gg", match1to2$1, match2$1);
addRegexToken$1("GGGG", match1to4$1, match4$1);
addRegexToken$1("gggg", match1to4$1, match4$1);
addRegexToken$1("GGGGG", match1to6$1, match6$1);
addRegexToken$1("ggggg", match1to6$1, match6$1);
addWeekParseToken$1(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(input, week, config, token2) {
    week[token2.substr(0, 2)] = toInt$1(input);
  }
);
addWeekParseToken$1(["gg", "GG"], function(input, week, config, token2) {
  week[token2] = hooks$1.parseTwoDigitYear(input);
});
function getSetWeekYear$1(input) {
  return getSetWeekYearHelper$1.call(
    this,
    input,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function getSetISOWeekYear$1(input) {
  return getSetWeekYearHelper$1.call(
    this,
    input,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function getISOWeeksInYear$1() {
  return weeksInYear$1(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear$1() {
  return weeksInYear$1(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear$1() {
  var weekInfo = this.localeData()._week;
  return weeksInYear$1(this.year(), weekInfo.dow, weekInfo.doy);
}
function getWeeksInWeekYear$1() {
  var weekInfo = this.localeData()._week;
  return weeksInYear$1(this.weekYear(), weekInfo.dow, weekInfo.doy);
}
function getSetWeekYearHelper$1(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear$1(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear$1(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll$1.call(this, input, week, weekday, dow, doy);
  }
}
function setWeekAll$1(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks$1(weekYear, week, weekday, dow, doy), date = createUTCDate$1(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
addFormatToken$1("Q", 0, "Qo", "quarter");
addUnitAlias$1("quarter", "Q");
addUnitPriority$1("quarter", 7);
addRegexToken$1("Q", match1$1);
addParseToken$1("Q", function(input, array) {
  array[MONTH$1] = (toInt$1(input) - 1) * 3;
});
function getSetQuarter$1(input) {
  return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken$1("D", ["DD", 2], "Do", "date");
addUnitAlias$1("date", "D");
addUnitPriority$1("date", 9);
addRegexToken$1("D", match1to2$1);
addRegexToken$1("DD", match1to2$1, match2$1);
addRegexToken$1("Do", function(isStrict, locale2) {
  return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
});
addParseToken$1(["D", "DD"], DATE$1);
addParseToken$1("Do", function(input, array) {
  array[DATE$1] = toInt$1(input.match(match1to2$1)[0]);
});
var getSetDayOfMonth$1 = makeGetSet$1("Date", true);
addFormatToken$1("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addUnitAlias$1("dayOfYear", "DDD");
addUnitPriority$1("dayOfYear", 4);
addRegexToken$1("DDD", match1to3$1);
addRegexToken$1("DDDD", match3$1);
addParseToken$1(["DDD", "DDDD"], function(input, array, config) {
  config._dayOfYear = toInt$1(input);
});
function getSetDayOfYear$1(input) {
  var dayOfYear = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
}
addFormatToken$1("m", ["mm", 2], 0, "minute");
addUnitAlias$1("minute", "m");
addUnitPriority$1("minute", 14);
addRegexToken$1("m", match1to2$1);
addRegexToken$1("mm", match1to2$1, match2$1);
addParseToken$1(["m", "mm"], MINUTE$1);
var getSetMinute$1 = makeGetSet$1("Minutes", false);
addFormatToken$1("s", ["ss", 2], 0, "second");
addUnitAlias$1("second", "s");
addUnitPriority$1("second", 15);
addRegexToken$1("s", match1to2$1);
addRegexToken$1("ss", match1to2$1, match2$1);
addParseToken$1(["s", "ss"], SECOND$1);
var getSetSecond$1 = makeGetSet$1("Seconds", false);
addFormatToken$1("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken$1(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken$1(0, ["SSS", 3], 0, "millisecond");
addFormatToken$1(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken$1(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken$1(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken$1(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken$1(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken$1(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addUnitAlias$1("millisecond", "ms");
addUnitPriority$1("millisecond", 16);
addRegexToken$1("S", match1to3$1, match1$1);
addRegexToken$1("SS", match1to3$1, match2$1);
addRegexToken$1("SSS", match1to3$1, match3$1);
var token$1, getSetMillisecond$1;
for (token$1 = "SSSS"; token$1.length <= 9; token$1 += "S") {
  addRegexToken$1(token$1, matchUnsigned$1);
}
function parseMs$1(input, array) {
  array[MILLISECOND$1] = toInt$1(("0." + input) * 1e3);
}
for (token$1 = "S"; token$1.length <= 9; token$1 += "S") {
  addParseToken$1(token$1, parseMs$1);
}
getSetMillisecond$1 = makeGetSet$1("Milliseconds", false);
addFormatToken$1("z", 0, 0, "zoneAbbr");
addFormatToken$1("zz", 0, 0, "zoneName");
function getZoneAbbr$1() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName$1() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto$3 = Moment$1.prototype;
proto$3.add = add$3;
proto$3.calendar = calendar$1$1;
proto$3.clone = clone$2;
proto$3.diff = diff$1;
proto$3.endOf = endOf$1;
proto$3.format = format$1;
proto$3.from = from$1;
proto$3.fromNow = fromNow$1;
proto$3.to = to$1;
proto$3.toNow = toNow$1;
proto$3.get = stringGet$1;
proto$3.invalidAt = invalidAt$1;
proto$3.isAfter = isAfter$1;
proto$3.isBefore = isBefore$1;
proto$3.isBetween = isBetween$1;
proto$3.isSame = isSame$1;
proto$3.isSameOrAfter = isSameOrAfter$1;
proto$3.isSameOrBefore = isSameOrBefore$1;
proto$3.isValid = isValid$2$1;
proto$3.lang = lang$1;
proto$3.locale = locale$1;
proto$3.localeData = localeData$1;
proto$3.max = prototypeMax$1;
proto$3.min = prototypeMin$1;
proto$3.parsingFlags = parsingFlags$1;
proto$3.set = stringSet$1;
proto$3.startOf = startOf$1;
proto$3.subtract = subtract$2;
proto$3.toArray = toArray$2;
proto$3.toObject = toObject$1;
proto$3.toDate = toDate$1;
proto$3.toISOString = toISOString$2;
proto$3.inspect = inspect$1;
if (typeof Symbol !== "undefined" && Symbol.for != null) {
  proto$3[Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  };
}
proto$3.toJSON = toJSON$1;
proto$3.toString = toString$3;
proto$3.unix = unix$1;
proto$3.valueOf = valueOf$2;
proto$3.creationData = creationData$1;
proto$3.eraName = getEraName$1;
proto$3.eraNarrow = getEraNarrow$1;
proto$3.eraAbbr = getEraAbbr$1;
proto$3.eraYear = getEraYear$1;
proto$3.year = getSetYear$1;
proto$3.isLeapYear = getIsLeapYear$1;
proto$3.weekYear = getSetWeekYear$1;
proto$3.isoWeekYear = getSetISOWeekYear$1;
proto$3.quarter = proto$3.quarters = getSetQuarter$1;
proto$3.month = getSetMonth$1;
proto$3.daysInMonth = getDaysInMonth$1;
proto$3.week = proto$3.weeks = getSetWeek$1;
proto$3.isoWeek = proto$3.isoWeeks = getSetISOWeek$1;
proto$3.weeksInYear = getWeeksInYear$1;
proto$3.weeksInWeekYear = getWeeksInWeekYear$1;
proto$3.isoWeeksInYear = getISOWeeksInYear$1;
proto$3.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear$1;
proto$3.date = getSetDayOfMonth$1;
proto$3.day = proto$3.days = getSetDayOfWeek$1;
proto$3.weekday = getSetLocaleDayOfWeek$1;
proto$3.isoWeekday = getSetISODayOfWeek$1;
proto$3.dayOfYear = getSetDayOfYear$1;
proto$3.hour = proto$3.hours = getSetHour$1;
proto$3.minute = proto$3.minutes = getSetMinute$1;
proto$3.second = proto$3.seconds = getSetSecond$1;
proto$3.millisecond = proto$3.milliseconds = getSetMillisecond$1;
proto$3.utcOffset = getSetOffset$1;
proto$3.utc = setOffsetToUTC$1;
proto$3.local = setOffsetToLocal$1;
proto$3.parseZone = setOffsetToParsedOffset$1;
proto$3.hasAlignedHourOffset = hasAlignedHourOffset$1;
proto$3.isDST = isDaylightSavingTime$1;
proto$3.isLocal = isLocal$1;
proto$3.isUtcOffset = isUtcOffset$1;
proto$3.isUtc = isUtc$1;
proto$3.isUTC = isUtc$1;
proto$3.zoneAbbr = getZoneAbbr$1;
proto$3.zoneName = getZoneName$1;
proto$3.dates = deprecate$1(
  "dates accessor is deprecated. Use date instead.",
  getSetDayOfMonth$1
);
proto$3.months = deprecate$1(
  "months accessor is deprecated. Use month instead",
  getSetMonth$1
);
proto$3.years = deprecate$1(
  "years accessor is deprecated. Use year instead",
  getSetYear$1
);
proto$3.zone = deprecate$1(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  getSetZone$1
);
proto$3.isDSTShifted = deprecate$1(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  isDaylightSavingTimeShifted$1
);
function createUnix$1(input) {
  return createLocal$1(input * 1e3);
}
function createInZone$1() {
  return createLocal$1.apply(null, arguments).parseZone();
}
function preParsePostFormat$1(string) {
  return string;
}
var proto$1$1 = Locale$1.prototype;
proto$1$1.calendar = calendar$2;
proto$1$1.longDateFormat = longDateFormat$1;
proto$1$1.invalidDate = invalidDate$1;
proto$1$1.ordinal = ordinal$1;
proto$1$1.preparse = preParsePostFormat$1;
proto$1$1.postformat = preParsePostFormat$1;
proto$1$1.relativeTime = relativeTime$2;
proto$1$1.pastFuture = pastFuture$1;
proto$1$1.set = set$2;
proto$1$1.eras = localeEras$1;
proto$1$1.erasParse = localeErasParse$1;
proto$1$1.erasConvertYear = localeErasConvertYear$1;
proto$1$1.erasAbbrRegex = erasAbbrRegex$1;
proto$1$1.erasNameRegex = erasNameRegex$1;
proto$1$1.erasNarrowRegex = erasNarrowRegex$1;
proto$1$1.months = localeMonths$1;
proto$1$1.monthsShort = localeMonthsShort$1;
proto$1$1.monthsParse = localeMonthsParse$1;
proto$1$1.monthsRegex = monthsRegex$1;
proto$1$1.monthsShortRegex = monthsShortRegex$1;
proto$1$1.week = localeWeek$1;
proto$1$1.firstDayOfYear = localeFirstDayOfYear$1;
proto$1$1.firstDayOfWeek = localeFirstDayOfWeek$1;
proto$1$1.weekdays = localeWeekdays$1;
proto$1$1.weekdaysMin = localeWeekdaysMin$1;
proto$1$1.weekdaysShort = localeWeekdaysShort$1;
proto$1$1.weekdaysParse = localeWeekdaysParse$1;
proto$1$1.weekdaysRegex = weekdaysRegex$1;
proto$1$1.weekdaysShortRegex = weekdaysShortRegex$1;
proto$1$1.weekdaysMinRegex = weekdaysMinRegex$1;
proto$1$1.isPM = localeIsPM$1;
proto$1$1.meridiem = localeMeridiem$1;
function get$1$1(format2, index2, field, setter) {
  var locale2 = getLocale$1(), utc = createUTC$1().set(setter, index2);
  return locale2[field](utc, format2);
}
function listMonthsImpl$1(format2, index2, field) {
  if (isNumber$2(format2)) {
    index2 = format2;
    format2 = void 0;
  }
  format2 = format2 || "";
  if (index2 != null) {
    return get$1$1(format2, index2, field, "month");
  }
  var i, out = [];
  for (i = 0; i < 12; i++) {
    out[i] = get$1$1(format2, i, field, "month");
  }
  return out;
}
function listWeekdaysImpl$1(localeSorted, format2, index2, field) {
  if (typeof localeSorted === "boolean") {
    if (isNumber$2(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  } else {
    format2 = localeSorted;
    index2 = format2;
    localeSorted = false;
    if (isNumber$2(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  }
  var locale2 = getLocale$1(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
  if (index2 != null) {
    return get$1$1(format2, (index2 + shift) % 7, field, "day");
  }
  for (i = 0; i < 7; i++) {
    out[i] = get$1$1(format2, (i + shift) % 7, field, "day");
  }
  return out;
}
function listMonths$1(format2, index2) {
  return listMonthsImpl$1(format2, index2, "months");
}
function listMonthsShort$1(format2, index2) {
  return listMonthsImpl$1(format2, index2, "monthsShort");
}
function listWeekdays$1(localeSorted, format2, index2) {
  return listWeekdaysImpl$1(localeSorted, format2, index2, "weekdays");
}
function listWeekdaysShort$1(localeSorted, format2, index2) {
  return listWeekdaysImpl$1(localeSorted, format2, index2, "weekdaysShort");
}
function listWeekdaysMin$1(localeSorted, format2, index2) {
  return listWeekdaysImpl$1(localeSorted, format2, index2, "weekdaysMin");
}
getSetGlobalLocale$1("en", {
  eras: [
    {
      since: "0001-01-01",
      until: Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(number) {
    var b = number % 10, output = toInt$1(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }
});
hooks$1.lang = deprecate$1(
  "moment.lang is deprecated. Use moment.locale instead.",
  getSetGlobalLocale$1
);
hooks$1.langData = deprecate$1(
  "moment.langData is deprecated. Use moment.localeData instead.",
  getLocale$1
);
var mathAbs$1 = Math.abs;
function abs$2() {
  var data2 = this._data;
  this._milliseconds = mathAbs$1(this._milliseconds);
  this._days = mathAbs$1(this._days);
  this._months = mathAbs$1(this._months);
  data2.milliseconds = mathAbs$1(data2.milliseconds);
  data2.seconds = mathAbs$1(data2.seconds);
  data2.minutes = mathAbs$1(data2.minutes);
  data2.hours = mathAbs$1(data2.hours);
  data2.months = mathAbs$1(data2.months);
  data2.years = mathAbs$1(data2.years);
  return this;
}
function addSubtract$1$1(duration, input, value, direction) {
  var other = createDuration$1(input, value);
  duration._milliseconds += direction * other._milliseconds;
  duration._days += direction * other._days;
  duration._months += direction * other._months;
  return duration._bubble();
}
function add$1$1(input, value) {
  return addSubtract$1$1(this, input, value, 1);
}
function subtract$1$1(input, value) {
  return addSubtract$1$1(this, input, value, -1);
}
function absCeil$1(number) {
  if (number < 0) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
}
function bubble$1() {
  var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data2 = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
  if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
    milliseconds2 += absCeil$1(monthsToDays$1(months2) + days2) * 864e5;
    days2 = 0;
    months2 = 0;
  }
  data2.milliseconds = milliseconds2 % 1e3;
  seconds2 = absFloor$1(milliseconds2 / 1e3);
  data2.seconds = seconds2 % 60;
  minutes2 = absFloor$1(seconds2 / 60);
  data2.minutes = minutes2 % 60;
  hours2 = absFloor$1(minutes2 / 60);
  data2.hours = hours2 % 24;
  days2 += absFloor$1(hours2 / 24);
  monthsFromDays = absFloor$1(daysToMonths$1(days2));
  months2 += monthsFromDays;
  days2 -= absCeil$1(monthsToDays$1(monthsFromDays));
  years2 = absFloor$1(months2 / 12);
  months2 %= 12;
  data2.days = days2;
  data2.months = months2;
  data2.years = years2;
  return this;
}
function daysToMonths$1(days2) {
  return days2 * 4800 / 146097;
}
function monthsToDays$1(months2) {
  return months2 * 146097 / 4800;
}
function as$1(units) {
  if (!this.isValid()) {
    return NaN;
  }
  var days2, months2, milliseconds2 = this._milliseconds;
  units = normalizeUnits$1(units);
  if (units === "month" || units === "quarter" || units === "year") {
    days2 = this._days + milliseconds2 / 864e5;
    months2 = this._months + daysToMonths$1(days2);
    switch (units) {
      case "month":
        return months2;
      case "quarter":
        return months2 / 3;
      case "year":
        return months2 / 12;
    }
  } else {
    days2 = this._days + Math.round(monthsToDays$1(this._months));
    switch (units) {
      case "week":
        return days2 / 7 + milliseconds2 / 6048e5;
      case "day":
        return days2 + milliseconds2 / 864e5;
      case "hour":
        return days2 * 24 + milliseconds2 / 36e5;
      case "minute":
        return days2 * 1440 + milliseconds2 / 6e4;
      case "second":
        return days2 * 86400 + milliseconds2 / 1e3;
      case "millisecond":
        return Math.floor(days2 * 864e5) + milliseconds2;
      default:
        throw new Error("Unknown unit " + units);
    }
  }
}
function valueOf$1$1() {
  if (!this.isValid()) {
    return NaN;
  }
  return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt$1(this._months / 12) * 31536e6;
}
function makeAs$1(alias) {
  return function() {
    return this.as(alias);
  };
}
var asMilliseconds$1 = makeAs$1("ms"), asSeconds$1 = makeAs$1("s"), asMinutes$1 = makeAs$1("m"), asHours$1 = makeAs$1("h"), asDays$1 = makeAs$1("d"), asWeeks$1 = makeAs$1("w"), asMonths$1 = makeAs$1("M"), asQuarters$1 = makeAs$1("Q"), asYears$1 = makeAs$1("y");
function clone$1$1() {
  return createDuration$1(this);
}
function get$2$1(units) {
  units = normalizeUnits$1(units);
  return this.isValid() ? this[units + "s"]() : NaN;
}
function makeGetter$1(name) {
  return function() {
    return this.isValid() ? this._data[name] : NaN;
  };
}
var milliseconds$1 = makeGetter$1("milliseconds"), seconds$1 = makeGetter$1("seconds"), minutes$1 = makeGetter$1("minutes"), hours$1 = makeGetter$1("hours"), days$1 = makeGetter$1("days"), months$1 = makeGetter$1("months"), years$1 = makeGetter$1("years");
function weeks$1() {
  return absFloor$1(this.days() / 7);
}
var round$1 = Math.round, thresholds$1 = {
  ss: 44,
  s: 45,
  m: 45,
  h: 22,
  d: 26,
  w: null,
  M: 11
};
function substituteTimeAgo$1(string, number, withoutSuffix, isFuture, locale2) {
  return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime$1$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
  var duration = createDuration$1(posNegDuration).abs(), seconds2 = round$1(duration.as("s")), minutes2 = round$1(duration.as("m")), hours2 = round$1(duration.as("h")), days2 = round$1(duration.as("d")), months2 = round$1(duration.as("M")), weeks2 = round$1(duration.as("w")), years2 = round$1(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
  if (thresholds2.w != null) {
    a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
  }
  a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
  a[2] = withoutSuffix;
  a[3] = +posNegDuration > 0;
  a[4] = locale2;
  return substituteTimeAgo$1.apply(null, a);
}
function getSetRelativeTimeRounding$1(roundingFunction) {
  if (roundingFunction === void 0) {
    return round$1;
  }
  if (typeof roundingFunction === "function") {
    round$1 = roundingFunction;
    return true;
  }
  return false;
}
function getSetRelativeTimeThreshold$1(threshold, limit) {
  if (thresholds$1[threshold] === void 0) {
    return false;
  }
  if (limit === void 0) {
    return thresholds$1[threshold];
  }
  thresholds$1[threshold] = limit;
  if (threshold === "s") {
    thresholds$1.ss = limit - 1;
  }
  return true;
}
function humanize$1(argWithSuffix, argThresholds) {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var withSuffix = false, th = thresholds$1, locale2, output;
  if (typeof argWithSuffix === "object") {
    argThresholds = argWithSuffix;
    argWithSuffix = false;
  }
  if (typeof argWithSuffix === "boolean") {
    withSuffix = argWithSuffix;
  }
  if (typeof argThresholds === "object") {
    th = Object.assign({}, thresholds$1, argThresholds);
    if (argThresholds.s != null && argThresholds.ss == null) {
      th.ss = argThresholds.s - 1;
    }
  }
  locale2 = this.localeData();
  output = relativeTime$1$1(this, !withSuffix, th, locale2);
  if (withSuffix) {
    output = locale2.pastFuture(+this, output);
  }
  return locale2.postformat(output);
}
var abs$1$1 = Math.abs;
function sign$1(x) {
  return (x > 0) - (x < 0) || +x;
}
function toISOString$1$1() {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var seconds2 = abs$1$1(this._milliseconds) / 1e3, days2 = abs$1$1(this._days), months2 = abs$1$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
  if (!total) {
    return "P0D";
  }
  minutes2 = absFloor$1(seconds2 / 60);
  hours2 = absFloor$1(minutes2 / 60);
  seconds2 %= 60;
  minutes2 %= 60;
  years2 = absFloor$1(months2 / 12);
  months2 %= 12;
  s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
  totalSign = total < 0 ? "-" : "";
  ymSign = sign$1(this._months) !== sign$1(total) ? "-" : "";
  daysSign = sign$1(this._days) !== sign$1(total) ? "-" : "";
  hmsSign = sign$1(this._milliseconds) !== sign$1(total) ? "-" : "";
  return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
}
var proto$2$1 = Duration$1.prototype;
proto$2$1.isValid = isValid$1$1;
proto$2$1.abs = abs$2;
proto$2$1.add = add$1$1;
proto$2$1.subtract = subtract$1$1;
proto$2$1.as = as$1;
proto$2$1.asMilliseconds = asMilliseconds$1;
proto$2$1.asSeconds = asSeconds$1;
proto$2$1.asMinutes = asMinutes$1;
proto$2$1.asHours = asHours$1;
proto$2$1.asDays = asDays$1;
proto$2$1.asWeeks = asWeeks$1;
proto$2$1.asMonths = asMonths$1;
proto$2$1.asQuarters = asQuarters$1;
proto$2$1.asYears = asYears$1;
proto$2$1.valueOf = valueOf$1$1;
proto$2$1._bubble = bubble$1;
proto$2$1.clone = clone$1$1;
proto$2$1.get = get$2$1;
proto$2$1.milliseconds = milliseconds$1;
proto$2$1.seconds = seconds$1;
proto$2$1.minutes = minutes$1;
proto$2$1.hours = hours$1;
proto$2$1.days = days$1;
proto$2$1.weeks = weeks$1;
proto$2$1.months = months$1;
proto$2$1.years = years$1;
proto$2$1.humanize = humanize$1;
proto$2$1.toISOString = toISOString$1$1;
proto$2$1.toString = toISOString$1$1;
proto$2$1.toJSON = toISOString$1$1;
proto$2$1.locale = locale$1;
proto$2$1.localeData = localeData$1;
proto$2$1.toIsoString = deprecate$1(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  toISOString$1$1
);
proto$2$1.lang = lang$1;
addFormatToken$1("X", 0, 0, "unix");
addFormatToken$1("x", 0, 0, "valueOf");
addRegexToken$1("x", matchSigned$1);
addRegexToken$1("X", matchTimestamp$1);
addParseToken$1("X", function(input, array, config) {
  config._d = new Date(parseFloat(input) * 1e3);
});
addParseToken$1("x", function(input, array, config) {
  config._d = new Date(toInt$1(input));
});
//! moment.js
hooks$1.version = "2.29.4";
setHookCallback$1(createLocal$1);
hooks$1.fn = proto$3;
hooks$1.min = min$1;
hooks$1.max = max$1;
hooks$1.now = now$1;
hooks$1.utc = createUTC$1;
hooks$1.unix = createUnix$1;
hooks$1.months = listMonths$1;
hooks$1.isDate = isDate$2;
hooks$1.locale = getSetGlobalLocale$1;
hooks$1.invalid = createInvalid$2;
hooks$1.duration = createDuration$1;
hooks$1.isMoment = isMoment$1;
hooks$1.weekdays = listWeekdays$1;
hooks$1.parseZone = createInZone$1;
hooks$1.localeData = getLocale$1;
hooks$1.isDuration = isDuration$1;
hooks$1.monthsShort = listMonthsShort$1;
hooks$1.weekdaysMin = listWeekdaysMin$1;
hooks$1.defineLocale = defineLocale$1;
hooks$1.updateLocale = updateLocale$1;
hooks$1.locales = listLocales$1;
hooks$1.weekdaysShort = listWeekdaysShort$1;
hooks$1.normalizeUnits = normalizeUnits$1;
hooks$1.relativeTimeRounding = getSetRelativeTimeRounding$1;
hooks$1.relativeTimeThreshold = getSetRelativeTimeThreshold$1;
hooks$1.calendarFormat = getCalendarFormat$1;
hooks$1.prototype = proto$3;
hooks$1.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm",
  TIME_SECONDS: "HH:mm:ss",
  TIME_MS: "HH:mm:ss.SSS",
  WEEK: "GGGG-[W]WW",
  MONTH: "YYYY-MM"
};
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$2 = root$1.Symbol;
const Symbol$3 = Symbol$2;
var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
var nativeObjectToString$1 = objectProto$c.toString;
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : void 0;
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
var symToStringTag = Symbol$3 ? Symbol$3.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag$2 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$2;
}
function arrayMap(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index2 < length) {
    result[index2] = iteratee(array[index2], index2, array);
  }
  return result;
}
var isArray$2 = Array.isArray;
const isArray$3 = isArray$2;
var INFINITY = 1 / 0;
var symbolProto$1 = Symbol$3 ? Symbol$3.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$3(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function isObject$2(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$2(value) {
  if (!isObject$2(value)) {
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
  if (!isObject$2(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap$1 = getNative(root$1, "WeakMap");
const WeakMap$2 = WeakMap$1;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto2) {
    if (!isObject$2(proto2)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto2);
    }
    object.prototype = proto2;
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
  return value != null && isLength(value.length) && !isFunction$2(value);
}
var objectProto$8 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto2 = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
  return value === proto2;
}
function baseTimes(n2, iteratee) {
  var index2 = -1, result = Array(n2);
  while (++index2 < n2) {
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
var Buffer$2 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$2 ? Buffer$2.isBuffer : void 0;
var isBuffer$1 = nativeIsBuffer || stubFalse;
const isBuffer$2 = isBuffer$1;
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
var isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$2 = isTypedArray$1;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$3(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$2(value), isType = !isArr && !isArg && !isBuff && isTypedArray$2(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
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
function keys$1(object) {
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
  if (!isObject$2(object)) {
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
  var data2 = this.__data__;
  if (nativeCreate$1) {
    var result = data2[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$2.call(data2, key) ? data2[key] : void 0;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function hashHas(key) {
  var data2 = this.__data__;
  return nativeCreate$1 ? data2[key] !== void 0 : hasOwnProperty$1.call(data2, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data2 = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data2[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
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
  var data2 = this.__data__, index2 = assocIndexOf(data2, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data2.length - 1;
  if (index2 == lastIndex) {
    data2.pop();
  } else {
    splice.call(data2, index2, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data2 = this.__data__, index2 = assocIndexOf(data2, key);
  return index2 < 0 ? void 0 : data2[index2][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data2 = this.__data__, index2 = assocIndexOf(data2, key);
  if (index2 < 0) {
    ++this.size;
    data2.push([key, value]);
  } else {
    data2[index2][1] = value;
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
var Map$1 = getNative(root$1, "Map");
const Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map2, key) {
  var data2 = map2.__data__;
  return isKeyable(key) ? data2[typeof key == "string" ? "string" : "hash"] : data2.map;
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
  var data2 = getMapData(this, key), size = data2.size;
  data2.set(key, value);
  this.size += data2.size == size ? 0 : 1;
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
function toString$2(value) {
  return value == null ? "" : baseToString(value);
}
function arrayPush(array, values) {
  var index2 = -1, length = values.length, offset2 = array.length;
  while (++index2 < length) {
    array[offset2 + index2] = values[index2];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index2 = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index2];
  }
  while (++index2 < length) {
    accumulator = iteratee(accumulator, array[index2], index2, array);
  }
  return accumulator;
}
function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var deburredLetters = {
  "\xC0": "A",
  "\xC1": "A",
  "\xC2": "A",
  "\xC3": "A",
  "\xC4": "A",
  "\xC5": "A",
  "\xE0": "a",
  "\xE1": "a",
  "\xE2": "a",
  "\xE3": "a",
  "\xE4": "a",
  "\xE5": "a",
  "\xC7": "C",
  "\xE7": "c",
  "\xD0": "D",
  "\xF0": "d",
  "\xC8": "E",
  "\xC9": "E",
  "\xCA": "E",
  "\xCB": "E",
  "\xE8": "e",
  "\xE9": "e",
  "\xEA": "e",
  "\xEB": "e",
  "\xCC": "I",
  "\xCD": "I",
  "\xCE": "I",
  "\xCF": "I",
  "\xEC": "i",
  "\xED": "i",
  "\xEE": "i",
  "\xEF": "i",
  "\xD1": "N",
  "\xF1": "n",
  "\xD2": "O",
  "\xD3": "O",
  "\xD4": "O",
  "\xD5": "O",
  "\xD6": "O",
  "\xD8": "O",
  "\xF2": "o",
  "\xF3": "o",
  "\xF4": "o",
  "\xF5": "o",
  "\xF6": "o",
  "\xF8": "o",
  "\xD9": "U",
  "\xDA": "U",
  "\xDB": "U",
  "\xDC": "U",
  "\xF9": "u",
  "\xFA": "u",
  "\xFB": "u",
  "\xFC": "u",
  "\xDD": "Y",
  "\xFD": "y",
  "\xFF": "y",
  "\xC6": "Ae",
  "\xE6": "ae",
  "\xDE": "Th",
  "\xFE": "th",
  "\xDF": "ss",
  "\u0100": "A",
  "\u0102": "A",
  "\u0104": "A",
  "\u0101": "a",
  "\u0103": "a",
  "\u0105": "a",
  "\u0106": "C",
  "\u0108": "C",
  "\u010A": "C",
  "\u010C": "C",
  "\u0107": "c",
  "\u0109": "c",
  "\u010B": "c",
  "\u010D": "c",
  "\u010E": "D",
  "\u0110": "D",
  "\u010F": "d",
  "\u0111": "d",
  "\u0112": "E",
  "\u0114": "E",
  "\u0116": "E",
  "\u0118": "E",
  "\u011A": "E",
  "\u0113": "e",
  "\u0115": "e",
  "\u0117": "e",
  "\u0119": "e",
  "\u011B": "e",
  "\u011C": "G",
  "\u011E": "G",
  "\u0120": "G",
  "\u0122": "G",
  "\u011D": "g",
  "\u011F": "g",
  "\u0121": "g",
  "\u0123": "g",
  "\u0124": "H",
  "\u0126": "H",
  "\u0125": "h",
  "\u0127": "h",
  "\u0128": "I",
  "\u012A": "I",
  "\u012C": "I",
  "\u012E": "I",
  "\u0130": "I",
  "\u0129": "i",
  "\u012B": "i",
  "\u012D": "i",
  "\u012F": "i",
  "\u0131": "i",
  "\u0134": "J",
  "\u0135": "j",
  "\u0136": "K",
  "\u0137": "k",
  "\u0138": "k",
  "\u0139": "L",
  "\u013B": "L",
  "\u013D": "L",
  "\u013F": "L",
  "\u0141": "L",
  "\u013A": "l",
  "\u013C": "l",
  "\u013E": "l",
  "\u0140": "l",
  "\u0142": "l",
  "\u0143": "N",
  "\u0145": "N",
  "\u0147": "N",
  "\u014A": "N",
  "\u0144": "n",
  "\u0146": "n",
  "\u0148": "n",
  "\u014B": "n",
  "\u014C": "O",
  "\u014E": "O",
  "\u0150": "O",
  "\u014D": "o",
  "\u014F": "o",
  "\u0151": "o",
  "\u0154": "R",
  "\u0156": "R",
  "\u0158": "R",
  "\u0155": "r",
  "\u0157": "r",
  "\u0159": "r",
  "\u015A": "S",
  "\u015C": "S",
  "\u015E": "S",
  "\u0160": "S",
  "\u015B": "s",
  "\u015D": "s",
  "\u015F": "s",
  "\u0161": "s",
  "\u0162": "T",
  "\u0164": "T",
  "\u0166": "T",
  "\u0163": "t",
  "\u0165": "t",
  "\u0167": "t",
  "\u0168": "U",
  "\u016A": "U",
  "\u016C": "U",
  "\u016E": "U",
  "\u0170": "U",
  "\u0172": "U",
  "\u0169": "u",
  "\u016B": "u",
  "\u016D": "u",
  "\u016F": "u",
  "\u0171": "u",
  "\u0173": "u",
  "\u0174": "W",
  "\u0175": "w",
  "\u0176": "Y",
  "\u0177": "y",
  "\u0178": "Y",
  "\u0179": "Z",
  "\u017B": "Z",
  "\u017D": "Z",
  "\u017A": "z",
  "\u017C": "z",
  "\u017E": "z",
  "\u0132": "IJ",
  "\u0133": "ij",
  "\u0152": "Oe",
  "\u0153": "oe",
  "\u0149": "'n",
  "\u017F": "s"
};
var deburrLetter = basePropertyOf(deburredLetters);
const deburrLetter$1 = deburrLetter;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsCombo$1 = "[" + rsComboRange$1 + "]";
var reComboMark = RegExp(rsCombo$1, "g");
function deburr(string) {
  string = toString$2(string);
  return string && string.replace(reLatin, deburrLetter$1).replace(reComboMark, "");
}
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos$1 = "['\u2019]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}
function words(string, pattern, guard) {
  string = toString$2(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}
var rsApos = "['\u2019]";
var reApos = RegExp(rsApos, "g");
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
  };
}
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data2 = this.__data__, result = data2["delete"](key);
  this.size = data2.size;
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
  var data2 = this.__data__;
  if (data2 instanceof ListCache) {
    var pairs = data2.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data2.size;
      return this;
    }
    data2 = this.__data__ = new MapCache(pairs);
  }
  data2.set(key, value);
  this.size = data2.size;
  return this;
}
function Stack(entries) {
  var data2 = this.__data__ = new ListCache(entries);
  this.size = data2.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys$1(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer$1 = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : void 0;
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
  return isArray$3(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys$1, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView$1 = getNative(root$1, "DataView");
const DataView$2 = DataView$1;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
const Set$2 = Set$1;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$2), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$2);
var getTag = baseGetTag;
if (DataView$2 && getTag(new DataView$2(new ArrayBuffer(1))) != dataViewTag$2 || Map$2 && getTag(new Map$2()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$3 || WeakMap$2 && getTag(new WeakMap$2()) != weakMapTag$1) {
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
var Uint8Array$1 = root$1.Uint8Array;
const Uint8Array$2 = Uint8Array$1;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
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
var symbolProto = Symbol$3 ? Symbol$3.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
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
  if (!isObject$2(value)) {
    return value;
  }
  var isArr = isArray$3(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$2(value)) {
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
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys$1;
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
var kebabCase = createCompounder(function(result, word, index2) {
  return result + (index2 ? "-" : "") + word.toLowerCase();
});
const kebabCase$1 = kebabCase;
var axios$2 = { exports: {} };
var axios$1 = { exports: {} };
var bind$4 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$3 = bind$4;
var toString$1 = Object.prototype.toString;
var kindOf = function(cache) {
  return function(thing) {
    var str = toString$1.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}
function isArray$1(val) {
  return Array.isArray(val);
}
function isUndefined$1(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined$1(val) && val.constructor !== null && !isUndefined$1(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString$1(val) {
  return typeof val === "string";
}
function isNumber$1(val) {
  return typeof val === "number";
}
function isObject$1(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (kindOf(val) !== "object") {
    return false;
  }
  var prototype2 = Object.getPrototypeOf(val);
  return prototype2 === null || prototype2 === Object.prototype;
}
var isDate$1 = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
function isFunction$1(val) {
  return toString$1.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject$1(val) && isFunction$1(val.pipe);
}
function isFormData(thing) {
  var pattern = "[object FormData]";
  return thing && (typeof FormData === "function" && thing instanceof FormData || toString$1.call(thing) === pattern || isFunction$1(thing.toString) && thing.toString() === pattern);
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray$1(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge() {
  var result = {};
  function assignValue2(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray$1(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue2);
  }
  return result;
}
function extend$1(a, b, thisArg) {
  forEach(b, function assignValue2(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind$3(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
function inherits(constructor, superConstructor, props, descriptors2) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}
function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
}
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}
function toArray$1(thing) {
  if (!thing)
    return null;
  var i = thing.length;
  if (isUndefined$1(i))
    return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}
var isTypedArray = function(TypedArray2) {
  return function(thing) {
    return TypedArray2 && thing instanceof TypedArray2;
  };
}(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
var utils$c = {
  isArray: isArray$1,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString: isString$1,
  isNumber: isNumber$1,
  isObject: isObject$1,
  isPlainObject,
  isUndefined: isUndefined$1,
  isDate: isDate$1,
  isFile,
  isBlob,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend: extend$1,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray: toArray$1,
  isTypedArray,
  isFileList
};
var utils$b = utils$c;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$1 = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$b.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$b.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$b.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$b.forEach(val, function parseValue(v) {
        if (utils$b.isDate(v)) {
          v = v.toISOString();
        } else if (utils$b.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + "=" + encode(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$a = utils$c;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$a.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$9 = utils$c;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$9.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
var utils$8 = utils$c;
function AxiosError$2(message, code, config, request2, response) {
  Error.call(this);
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request2 && (this.request = request2);
  response && (this.response = response);
}
utils$8.inherits(AxiosError$2, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError$2.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(code) {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$2, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError$2.from = function(error, code, config, request2, response, customProps) {
  var axiosError = Object.create(prototype);
  utils$8.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });
  AxiosError$2.call(axiosError, error.message, code, config, request2, response);
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_1 = AxiosError$2;
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var utils$7 = utils$c;
function toFormData$1(obj, formData) {
  formData = formData || new FormData();
  var stack = [];
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$7.isDate(value)) {
      return value.toISOString();
    }
    if (utils$7.isArrayBuffer(value) || utils$7.isTypedArray(value)) {
      return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function build(data2, parentKey) {
    if (utils$7.isPlainObject(data2) || utils$7.isArray(data2)) {
      if (stack.indexOf(data2) !== -1) {
        throw Error("Circular reference detected in " + parentKey);
      }
      stack.push(data2);
      utils$7.forEach(data2, function each(value, key) {
        if (utils$7.isUndefined(value))
          return;
        var fullKey = parentKey ? parentKey + "." + key : key;
        var arr;
        if (value && !parentKey && typeof value === "object") {
          if (utils$7.endsWith(key, "{}")) {
            value = JSON.stringify(value);
          } else if (utils$7.endsWith(key, "[]") && (arr = utils$7.toArray(value))) {
            arr.forEach(function(el) {
              !utils$7.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }
        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data2));
    }
  }
  build(obj);
  return formData;
}
var toFormData_1 = toFormData$1;
var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle)
    return settle;
  hasRequiredSettle = 1;
  var AxiosError2 = AxiosError_1;
  settle = function settle2(resolve, reject, response) {
    var validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError2(
        "Request failed with status code " + response.status,
        [AxiosError2.ERR_BAD_REQUEST, AxiosError2.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  };
  return settle;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies)
    return cookies;
  hasRequiredCookies = 1;
  var utils2 = utils$c;
  cookies = utils2.isStandardBrowserEnv() ? function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + "=" + encodeURIComponent(value));
        if (utils2.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils2.isString(path)) {
          cookie.push("path=" + path);
        }
        if (utils2.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read(name) {
        var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    };
  }() : function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read() {
        return null;
      },
      remove: function remove() {
      }
    };
  }();
  return cookies;
}
var isAbsoluteURL$1 = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL2 = isAbsoluteURL$1;
var combineURLs2 = combineURLs$1;
var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL2(requestedURL)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
};
var parseHeaders;
var hasRequiredParseHeaders;
function requireParseHeaders() {
  if (hasRequiredParseHeaders)
    return parseHeaders;
  hasRequiredParseHeaders = 1;
  var utils2 = utils$c;
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  parseHeaders = function parseHeaders2(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils2.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key = utils2.trim(line.substr(0, i)).toLowerCase();
      val = utils2.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
  return parseHeaders;
}
var isURLSameOrigin;
var hasRequiredIsURLSameOrigin;
function requireIsURLSameOrigin() {
  if (hasRequiredIsURLSameOrigin)
    return isURLSameOrigin;
  hasRequiredIsURLSameOrigin = 1;
  var utils2 = utils$c;
  isURLSameOrigin = utils2.isStandardBrowserEnv() ? function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    function resolveURL(url) {
      var href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      var parsed = utils2.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : function nonStandardBrowserEnv() {
    return function isURLSameOrigin2() {
      return true;
    };
  }();
  return isURLSameOrigin;
}
var CanceledError_1;
var hasRequiredCanceledError;
function requireCanceledError() {
  if (hasRequiredCanceledError)
    return CanceledError_1;
  hasRequiredCanceledError = 1;
  var AxiosError2 = AxiosError_1;
  var utils2 = utils$c;
  function CanceledError2(message) {
    AxiosError2.call(this, message == null ? "canceled" : message, AxiosError2.ERR_CANCELED);
    this.name = "CanceledError";
  }
  utils2.inherits(CanceledError2, AxiosError2, {
    __CANCEL__: true
  });
  CanceledError_1 = CanceledError2;
  return CanceledError_1;
}
var parseProtocol;
var hasRequiredParseProtocol;
function requireParseProtocol() {
  if (hasRequiredParseProtocol)
    return parseProtocol;
  hasRequiredParseProtocol = 1;
  parseProtocol = function parseProtocol2(url) {
    var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  };
  return parseProtocol;
}
var xhr;
var hasRequiredXhr;
function requireXhr() {
  if (hasRequiredXhr)
    return xhr;
  hasRequiredXhr = 1;
  var utils2 = utils$c;
  var settle2 = requireSettle();
  var cookies2 = requireCookies();
  var buildURL3 = buildURL$1;
  var buildFullPath3 = buildFullPath$1;
  var parseHeaders2 = requireParseHeaders();
  var isURLSameOrigin2 = requireIsURLSameOrigin();
  var transitionalDefaults2 = transitional;
  var AxiosError2 = AxiosError_1;
  var CanceledError2 = requireCanceledError();
  var parseProtocol2 = requireParseProtocol();
  xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
      var onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils2.isFormData(requestData) && utils2.isStandardBrowserEnv()) {
        delete requestHeaders["Content-Type"];
      }
      var request2 = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath3(config.baseURL, config.url);
      request2.open(config.method.toUpperCase(), buildURL3(fullPath, config.params, config.paramsSerializer), true);
      request2.timeout = config.timeout;
      function onloadend() {
        if (!request2) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
        var response = {
          data: responseData,
          status: request2.status,
          statusText: request2.statusText,
          headers: responseHeaders,
          config,
          request: request2
        };
        settle2(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request2 = null;
      }
      if ("onloadend" in request2) {
        request2.onloadend = onloadend;
      } else {
        request2.onreadystatechange = function handleLoad() {
          if (!request2 || request2.readyState !== 4) {
            return;
          }
          if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request2.onabort = function handleAbort() {
        if (!request2) {
          return;
        }
        reject(new AxiosError2("Request aborted", AxiosError2.ECONNABORTED, config, request2));
        request2 = null;
      };
      request2.onerror = function handleError() {
        reject(new AxiosError2("Network Error", AxiosError2.ERR_NETWORK, config, request2, request2));
        request2 = null;
      };
      request2.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        var transitional3 = config.transitional || transitionalDefaults2;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError2(
          timeoutErrorMessage,
          transitional3.clarifyTimeoutError ? AxiosError2.ETIMEDOUT : AxiosError2.ECONNABORTED,
          config,
          request2
        ));
        request2 = null;
      };
      if (utils2.isStandardBrowserEnv()) {
        var xsrfValue = (config.withCredentials || isURLSameOrigin2(fullPath)) && config.xsrfCookieName ? cookies2.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request2) {
        utils2.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request2.setRequestHeader(key, val);
          }
        });
      }
      if (!utils2.isUndefined(config.withCredentials)) {
        request2.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request2.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request2.addEventListener("progress", config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === "function" && request2.upload) {
        request2.upload.addEventListener("progress", config.onUploadProgress);
      }
      if (config.cancelToken || config.signal) {
        onCanceled = function(cancel) {
          if (!request2) {
            return;
          }
          reject(!cancel || cancel && cancel.type ? new CanceledError2() : cancel);
          request2.abort();
          request2 = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      if (!requestData) {
        requestData = null;
      }
      var protocol = parseProtocol2(fullPath);
      if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
        reject(new AxiosError2("Unsupported protocol " + protocol + ":", AxiosError2.ERR_BAD_REQUEST, config));
        return;
      }
      request2.send(requestData);
    });
  };
  return xhr;
}
var _null;
var hasRequired_null;
function require_null() {
  if (hasRequired_null)
    return _null;
  hasRequired_null = 1;
  _null = null;
  return _null;
}
var utils$6 = utils$c;
var normalizeHeaderName2 = normalizeHeaderName$1;
var AxiosError$1 = AxiosError_1;
var transitionalDefaults = transitional;
var toFormData = toFormData_1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = requireXhr();
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = requireXhr();
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$6.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$6.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$4 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$6.isFormData(data2) || utils$6.isArrayBuffer(data2) || utils$6.isBuffer(data2) || utils$6.isStream(data2) || utils$6.isFile(data2) || utils$6.isBlob(data2)) {
      return data2;
    }
    if (utils$6.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$6.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    var isObjectPayload = utils$6.isObject(data2);
    var contentType = headers && headers["Content-Type"];
    var isFileList2;
    if ((isFileList2 = utils$6.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList2 ? { "files[]": data2 } : data2, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$4.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: require_null()
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$6.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$4.headers[method] = {};
});
utils$6.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$4.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$4;
var utils$5 = utils$c;
var defaults$3 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$3;
  utils$5.forEach(fns, function transform(fn) {
    data2 = fn.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1;
var hasRequiredIsCancel;
function requireIsCancel() {
  if (hasRequiredIsCancel)
    return isCancel$1;
  hasRequiredIsCancel = 1;
  isCancel$1 = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
  };
  return isCancel$1;
}
var utils$4 = utils$c;
var transformData2 = transformData$1;
var isCancel = requireIsCancel();
var defaults$2 = defaults_1;
var CanceledError = requireCanceledError();
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData2.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );
  config.headers = utils$4.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );
  utils$4.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );
  var adapter = config.adapter || defaults$2.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData2.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }
    return Promise.reject(reason);
  });
};
var utils$3 = utils$c;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source)) {
      return utils$3.merge(target, source);
    } else if (utils$3.isPlainObject(source)) {
      return utils$3.merge({}, source);
    } else if (utils$3.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "beforeRedirect": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};
var data;
var hasRequiredData;
function requireData() {
  if (hasRequiredData)
    return data;
  hasRequiredData = 1;
  data = {
    "version": "0.27.2"
  };
  return data;
}
var VERSION = requireData().version;
var AxiosError = AxiosError_1;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys2 = Object.keys(options);
  var i = keys2.length;
  while (i-- > 0) {
    var opt = keys2[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$2 = utils$c;
var buildURL2 = buildURL$1;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var buildFullPath2 = buildFullPath$1;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config) {
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional3 = config.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  var fullPath = buildFullPath2(config.baseURL, config.url);
  return buildURL2(fullPath, config.params, config.paramsSerializer);
};
utils$2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$2.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_1 = Axios$1;
var CancelToken_1;
var hasRequiredCancelToken;
function requireCancelToken() {
  if (hasRequiredCancelToken)
    return CancelToken_1;
  hasRequiredCancelToken = 1;
  var CanceledError2 = requireCanceledError();
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token2 = this;
    this.promise.then(function(cancel) {
      if (!token2._listeners)
        return;
      var i;
      var l = token2._listeners.length;
      for (i = 0; i < l; i++) {
        token2._listeners[i](cancel);
      }
      token2._listeners = null;
    });
    this.promise.then = function(onfulfilled) {
      var _resolve;
      var promise = new Promise(function(resolve) {
        token2.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token2.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message) {
      if (token2.reason) {
        return;
      }
      token2.reason = new CanceledError2(message);
      resolvePromise(token2.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  };
  CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token2 = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token2,
      cancel
    };
  };
  CancelToken_1 = CancelToken;
  return CancelToken_1;
}
var spread;
var hasRequiredSpread;
function requireSpread() {
  if (hasRequiredSpread)
    return spread;
  hasRequiredSpread = 1;
  spread = function spread2(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  return spread;
}
var isAxiosError;
var hasRequiredIsAxiosError;
function requireIsAxiosError() {
  if (hasRequiredIsAxiosError)
    return isAxiosError;
  hasRequiredIsAxiosError = 1;
  var utils2 = utils$c;
  isAxiosError = function isAxiosError2(payload) {
    return utils2.isObject(payload) && payload.isAxiosError === true;
  };
  return isAxiosError;
}
var utils$1 = utils$c;
var bind$2 = bind$4;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults$1 = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind$2(Axios.prototype.request, context);
  utils$1.extend(instance, Axios.prototype, context);
  utils$1.extend(instance, context);
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults$1);
axios.Axios = Axios;
axios.CanceledError = requireCanceledError();
axios.CancelToken = requireCancelToken();
axios.isCancel = requireIsCancel();
axios.VERSION = requireData().version;
axios.toFormData = toFormData_1;
axios.AxiosError = AxiosError_1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = requireSpread();
axios.isAxiosError = requireIsAxiosError();
axios$1.exports = axios;
axios$1.exports.default = axios;
(function(module2) {
  module2.exports = axios$1.exports;
})(axios$2);
var shams = function hasSymbols() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj = {};
  var sym = Symbol("test");
  var symObj = Object(sym);
  if (typeof sym === "string") {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
    return false;
  }
  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = shams;
var hasSymbols$1 = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }
  if (typeof Symbol !== "function") {
    return false;
  }
  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }
  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }
  return hasSymbolSham();
};
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = "[object Function]";
var implementation$1 = function bind2(that) {
  var target = this;
  if (typeof target !== "function" || toStr.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slice.call(arguments, 1);
  var bound;
  var binder = function() {
    if (this instanceof bound) {
      var result = target.apply(
        this,
        args.concat(slice.call(arguments))
      );
      if (Object(result) === result) {
        return result;
      }
      return this;
    } else {
      return target.apply(
        that,
        args.concat(slice.call(arguments))
      );
    }
  };
  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    boundArgs.push("$" + i);
  }
  bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
  if (target.prototype) {
    var Empty = function Empty2() {
    };
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
};
var implementation = implementation$1;
var functionBind = Function.prototype.bind || implementation;
var bind$1 = functionBind;
var src$1 = bind$1.call(Function.call, Object.prototype.hasOwnProperty);
var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e) {
  }
};
var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
  try {
    $gOPD({}, "");
  } catch (e) {
    $gOPD = null;
  }
}
var throwTypeError = function() {
  throw new $TypeError();
};
var ThrowTypeError = $gOPD ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols2 = hasSymbols$1();
var getProto = Object.getPrototypeOf || function(x) {
  return x.__proto__;
};
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" ? undefined$1 : getProto(Uint8Array);
var INTRINSICS = {
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols2 ? getProto([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols2 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols2 ? getProto(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
};
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen) {
      value = getProto(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind3 = functionBind;
var hasOwn = src$1;
var $concat = bind3.call(Function.call, Array.prototype.concat);
var $spliceApply = bind3.call(Function.apply, Array.prototype.splice);
var $replace = bind3.call(Function.call, String.prototype.replace);
var $strSlice = bind3.call(Function.call, String.prototype.slice);
var $exec = bind3.call(Function.call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace(string, rePropName, function(match, number, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError('"allowMissing" argument must be a boolean');
  }
  if ($exec(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var callBind$1 = { exports: {} };
(function(module2) {
  var bind4 = functionBind;
  var GetIntrinsic3 = getIntrinsic;
  var $apply = GetIntrinsic3("%Function.prototype.apply%");
  var $call = GetIntrinsic3("%Function.prototype.call%");
  var $reflectApply = GetIntrinsic3("%Reflect.apply%", true) || bind4.call($call, $apply);
  var $gOPD2 = GetIntrinsic3("%Object.getOwnPropertyDescriptor%", true);
  var $defineProperty = GetIntrinsic3("%Object.defineProperty%", true);
  var $max = GetIntrinsic3("%Math.max%");
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty = null;
    }
  }
  module2.exports = function callBind2(originalFunction) {
    var func = $reflectApply(bind4, $call, arguments);
    if ($gOPD2 && $defineProperty) {
      var desc = $gOPD2(func, "length");
      if (desc.configurable) {
        $defineProperty(
          func,
          "length",
          { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
        );
      }
    }
    return func;
  };
  var applyBind = function applyBind2() {
    return $reflectApply(bind4, $apply, arguments);
  };
  if ($defineProperty) {
    $defineProperty(module2.exports, "apply", { value: applyBind });
  } else {
    module2.exports.apply = applyBind;
  }
})(callBind$1);
var GetIntrinsic$1 = getIntrinsic;
var callBind = callBind$1.exports;
var $indexOf = callBind(GetIntrinsic$1("String.prototype.indexOf"));
var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$1(name, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
    return callBind(intrinsic);
  }
  return intrinsic;
};
var GetIntrinsic2 = getIntrinsic;
var callBound = callBound$1;
GetIntrinsic2("%TypeError%");
GetIntrinsic2("%WeakMap%", true);
GetIntrinsic2("%Map%", true);
callBound("WeakMap.prototype.get", true);
callBound("WeakMap.prototype.set", true);
callBound("WeakMap.prototype.has", true);
callBound("Map.prototype.get", true);
callBound("Map.prototype.set", true);
callBound("Map.prototype.has", true);
(function() {
  var array = [];
  for (var i = 0; i < 256; ++i) {
    array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return array;
})();
var jsbn = { exports: {} };
(function(module2, exports2) {
  (function() {
    var dbits;
    var canary = 244837814094590;
    var j_lm = (canary & 16777215) == 15715070;
    function BigInteger2(a, b, c) {
      if (a != null)
        if ("number" == typeof a)
          this.fromNumber(a, b, c);
        else if (b == null && "string" != typeof a)
          this.fromString(a, 256);
        else
          this.fromString(a, b);
    }
    function nbi() {
      return new BigInteger2(null);
    }
    function am1(i, x, w, j, c, n2) {
      while (--n2 >= 0) {
        var v = x * this[i++] + w[j] + c;
        c = Math.floor(v / 67108864);
        w[j++] = v & 67108863;
      }
      return c;
    }
    function am2(i, x, w, j, c, n2) {
      var xl = x & 32767, xh = x >> 15;
      while (--n2 >= 0) {
        var l = this[i] & 32767;
        var h = this[i++] >> 15;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
        w[j++] = l & 1073741823;
      }
      return c;
    }
    function am3(i, x, w, j, c, n2) {
      var xl = x & 16383, xh = x >> 14;
      while (--n2 >= 0) {
        var l = this[i] & 16383;
        var h = this[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 16383) << 14) + w[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w[j++] = l & 268435455;
      }
      return c;
    }
    var inBrowser = typeof navigator !== "undefined";
    if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
      BigInteger2.prototype.am = am2;
      dbits = 30;
    } else if (inBrowser && j_lm && navigator.appName != "Netscape") {
      BigInteger2.prototype.am = am1;
      dbits = 26;
    } else {
      BigInteger2.prototype.am = am3;
      dbits = 28;
    }
    BigInteger2.prototype.DB = dbits;
    BigInteger2.prototype.DM = (1 << dbits) - 1;
    BigInteger2.prototype.DV = 1 << dbits;
    var BI_FP = 52;
    BigInteger2.prototype.FV = Math.pow(2, BI_FP);
    BigInteger2.prototype.F1 = BI_FP - dbits;
    BigInteger2.prototype.F2 = 2 * dbits - BI_FP;
    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
    var BI_RC = new Array();
    var rr, vv;
    rr = "0".charCodeAt(0);
    for (vv = 0; vv <= 9; ++vv)
      BI_RC[rr++] = vv;
    rr = "a".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    rr = "A".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    function int2char(n2) {
      return BI_RM.charAt(n2);
    }
    function intAt(s, i) {
      var c = BI_RC[s.charCodeAt(i)];
      return c == null ? -1 : c;
    }
    function bnpCopyTo(r) {
      for (var i = this.t - 1; i >= 0; --i)
        r[i] = this[i];
      r.t = this.t;
      r.s = this.s;
    }
    function bnpFromInt(x) {
      this.t = 1;
      this.s = x < 0 ? -1 : 0;
      if (x > 0)
        this[0] = x;
      else if (x < -1)
        this[0] = x + this.DV;
      else
        this.t = 0;
    }
    function nbv(i) {
      var r = nbi();
      r.fromInt(i);
      return r;
    }
    function bnpFromString(s, b) {
      var k;
      if (b == 16)
        k = 4;
      else if (b == 8)
        k = 3;
      else if (b == 256)
        k = 8;
      else if (b == 2)
        k = 1;
      else if (b == 32)
        k = 5;
      else if (b == 4)
        k = 2;
      else {
        this.fromRadix(s, b);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i = s.length, mi = false, sh = 0;
      while (--i >= 0) {
        var x = k == 8 ? s[i] & 255 : intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-")
            mi = true;
          continue;
        }
        mi = false;
        if (sh == 0)
          this[this.t++] = x;
        else if (sh + k > this.DB) {
          this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
          this[this.t++] = x >> this.DB - sh;
        } else
          this[this.t - 1] |= x << sh;
        sh += k;
        if (sh >= this.DB)
          sh -= this.DB;
      }
      if (k == 8 && (s[0] & 128) != 0) {
        this.s = -1;
        if (sh > 0)
          this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
      }
      this.clamp();
      if (mi)
        BigInteger2.ZERO.subTo(this, this);
    }
    function bnpClamp() {
      var c = this.s & this.DM;
      while (this.t > 0 && this[this.t - 1] == c)
        --this.t;
    }
    function bnToString(b) {
      if (this.s < 0)
        return "-" + this.negate().toString(b);
      var k;
      if (b == 16)
        k = 4;
      else if (b == 8)
        k = 3;
      else if (b == 2)
        k = 1;
      else if (b == 32)
        k = 5;
      else if (b == 4)
        k = 2;
      else
        return this.toRadix(b);
      var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
      var p = this.DB - i * this.DB % k;
      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) > 0) {
          m = true;
          r = int2char(d);
        }
        while (i >= 0) {
          if (p < k) {
            d = (this[i] & (1 << p) - 1) << k - p;
            d |= this[--i] >> (p += this.DB - k);
          } else {
            d = this[i] >> (p -= k) & km;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if (d > 0)
            m = true;
          if (m)
            r += int2char(d);
        }
      }
      return m ? r : "0";
    }
    function bnNegate() {
      var r = nbi();
      BigInteger2.ZERO.subTo(this, r);
      return r;
    }
    function bnAbs() {
      return this.s < 0 ? this.negate() : this;
    }
    function bnCompareTo(a) {
      var r = this.s - a.s;
      if (r != 0)
        return r;
      var i = this.t;
      r = i - a.t;
      if (r != 0)
        return this.s < 0 ? -r : r;
      while (--i >= 0)
        if ((r = this[i] - a[i]) != 0)
          return r;
      return 0;
    }
    function nbits(x) {
      var r = 1, t2;
      if ((t2 = x >>> 16) != 0) {
        x = t2;
        r += 16;
      }
      if ((t2 = x >> 8) != 0) {
        x = t2;
        r += 8;
      }
      if ((t2 = x >> 4) != 0) {
        x = t2;
        r += 4;
      }
      if ((t2 = x >> 2) != 0) {
        x = t2;
        r += 2;
      }
      if ((t2 = x >> 1) != 0) {
        x = t2;
        r += 1;
      }
      return r;
    }
    function bnBitLength() {
      if (this.t <= 0)
        return 0;
      return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
    }
    function bnpDLShiftTo(n2, r) {
      var i;
      for (i = this.t - 1; i >= 0; --i)
        r[i + n2] = this[i];
      for (i = n2 - 1; i >= 0; --i)
        r[i] = 0;
      r.t = this.t + n2;
      r.s = this.s;
    }
    function bnpDRShiftTo(n2, r) {
      for (var i = n2; i < this.t; ++i)
        r[i - n2] = this[i];
      r.t = Math.max(this.t - n2, 0);
      r.s = this.s;
    }
    function bnpLShiftTo(n2, r) {
      var bs = n2 % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n2 / this.DB), c = this.s << bs & this.DM, i;
      for (i = this.t - 1; i >= 0; --i) {
        r[i + ds + 1] = this[i] >> cbs | c;
        c = (this[i] & bm) << bs;
      }
      for (i = ds - 1; i >= 0; --i)
        r[i] = 0;
      r[ds] = c;
      r.t = this.t + ds + 1;
      r.s = this.s;
      r.clamp();
    }
    function bnpRShiftTo(n2, r) {
      r.s = this.s;
      var ds = Math.floor(n2 / this.DB);
      if (ds >= this.t) {
        r.t = 0;
        return;
      }
      var bs = n2 % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r[0] = this[ds] >> bs;
      for (var i = ds + 1; i < this.t; ++i) {
        r[i - ds - 1] |= (this[i] & bm) << cbs;
        r[i - ds] = this[i] >> bs;
      }
      if (bs > 0)
        r[this.t - ds - 1] |= (this.s & bm) << cbs;
      r.t = this.t - ds;
      r.clamp();
    }
    function bnpSubTo(a, r) {
      var i = 0, c = 0, m = Math.min(a.t, this.t);
      while (i < m) {
        c += this[i] - a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c -= a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c -= a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c < -1)
        r[i++] = this.DV + c;
      else if (c > 0)
        r[i++] = c;
      r.t = i;
      r.clamp();
    }
    function bnpMultiplyTo(a, r) {
      var x = this.abs(), y = a.abs();
      var i = x.t;
      r.t = i + y.t;
      while (--i >= 0)
        r[i] = 0;
      for (i = 0; i < y.t; ++i)
        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
      r.s = 0;
      r.clamp();
      if (this.s != a.s)
        BigInteger2.ZERO.subTo(r, r);
    }
    function bnpSquareTo(r) {
      var x = this.abs();
      var i = r.t = 2 * x.t;
      while (--i >= 0)
        r[i] = 0;
      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);
        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
          r[i + x.t] -= x.DV;
          r[i + x.t + 1] = 1;
        }
      }
      if (r.t > 0)
        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
      r.s = 0;
      r.clamp();
    }
    function bnpDivRemTo(m, q, r) {
      var pm = m.abs();
      if (pm.t <= 0)
        return;
      var pt = this.abs();
      if (pt.t < pm.t) {
        if (q != null)
          q.fromInt(0);
        if (r != null)
          this.copyTo(r);
        return;
      }
      if (r == null)
        r = nbi();
      var y = nbi(), ts = this.s, ms = m.s;
      var nsh = this.DB - nbits(pm[pm.t - 1]);
      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else {
        pm.copyTo(y);
        pt.copyTo(r);
      }
      var ys = y.t;
      var y0 = y[ys - 1];
      if (y0 == 0)
        return;
      var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
      var i = r.t, j = i - ys, t2 = q == null ? nbi() : q;
      y.dlShiftTo(j, t2);
      if (r.compareTo(t2) >= 0) {
        r[r.t++] = 1;
        r.subTo(t2, r);
      }
      BigInteger2.ONE.dlShiftTo(ys, t2);
      t2.subTo(y, y);
      while (y.t < ys)
        y[y.t++] = 0;
      while (--j >= 0) {
        var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
          y.dlShiftTo(j, t2);
          r.subTo(t2, r);
          while (r[i] < --qd)
            r.subTo(t2, r);
        }
      }
      if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms)
          BigInteger2.ZERO.subTo(q, q);
      }
      r.t = ys;
      r.clamp();
      if (nsh > 0)
        r.rShiftTo(nsh, r);
      if (ts < 0)
        BigInteger2.ZERO.subTo(r, r);
    }
    function bnMod(a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);
      if (this.s < 0 && r.compareTo(BigInteger2.ZERO) > 0)
        a.subTo(r, r);
      return r;
    }
    function Classic(m) {
      this.m = m;
    }
    function cConvert(x) {
      if (x.s < 0 || x.compareTo(this.m) >= 0)
        return x.mod(this.m);
      else
        return x;
    }
    function cRevert(x) {
      return x;
    }
    function cReduce(x) {
      x.divRemTo(this.m, null, x);
    }
    function cMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    function cSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;
    function bnpInvDigit() {
      if (this.t < 1)
        return 0;
      var x = this[0];
      if ((x & 1) == 0)
        return 0;
      var y = x & 3;
      y = y * (2 - (x & 15) * y) & 15;
      y = y * (2 - (x & 255) * y) & 255;
      y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
      y = y * (2 - x * y % this.DV) % this.DV;
      return y > 0 ? this.DV - y : -y;
    }
    function Montgomery(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << m.DB - 15) - 1;
      this.mt2 = 2 * m.t;
    }
    function montConvert(x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t, r);
      r.divRemTo(this.m, null, r);
      if (x.s < 0 && r.compareTo(BigInteger2.ZERO) > 0)
        this.m.subTo(r, r);
      return r;
    }
    function montRevert(x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }
    function montReduce(x) {
      while (x.t <= this.mt2)
        x[x.t++] = 0;
      for (var i = 0; i < this.m.t; ++i) {
        var j = x[i] & 32767;
        var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
        j = i + this.m.t;
        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        while (x[j] >= x.DV) {
          x[j] -= x.DV;
          x[++j]++;
        }
      }
      x.clamp();
      x.drShiftTo(this.m.t, x);
      if (x.compareTo(this.m) >= 0)
        x.subTo(this.m, x);
    }
    function montSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    function montMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;
    function bnpIsEven() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    }
    function bnpExp(e, z2) {
      if (e > 4294967295 || e < 1)
        return BigInteger2.ONE;
      var r = nbi(), r2 = nbi(), g = z2.convert(this), i = nbits(e) - 1;
      g.copyTo(r);
      while (--i >= 0) {
        z2.sqrTo(r, r2);
        if ((e & 1 << i) > 0)
          z2.mulTo(r2, g, r);
        else {
          var t2 = r;
          r = r2;
          r2 = t2;
        }
      }
      return z2.revert(r);
    }
    function bnModPowInt(e, m) {
      var z2;
      if (e < 256 || m.isEven())
        z2 = new Classic(m);
      else
        z2 = new Montgomery(m);
      return this.exp(e, z2);
    }
    BigInteger2.prototype.copyTo = bnpCopyTo;
    BigInteger2.prototype.fromInt = bnpFromInt;
    BigInteger2.prototype.fromString = bnpFromString;
    BigInteger2.prototype.clamp = bnpClamp;
    BigInteger2.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger2.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger2.prototype.lShiftTo = bnpLShiftTo;
    BigInteger2.prototype.rShiftTo = bnpRShiftTo;
    BigInteger2.prototype.subTo = bnpSubTo;
    BigInteger2.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger2.prototype.squareTo = bnpSquareTo;
    BigInteger2.prototype.divRemTo = bnpDivRemTo;
    BigInteger2.prototype.invDigit = bnpInvDigit;
    BigInteger2.prototype.isEven = bnpIsEven;
    BigInteger2.prototype.exp = bnpExp;
    BigInteger2.prototype.toString = bnToString;
    BigInteger2.prototype.negate = bnNegate;
    BigInteger2.prototype.abs = bnAbs;
    BigInteger2.prototype.compareTo = bnCompareTo;
    BigInteger2.prototype.bitLength = bnBitLength;
    BigInteger2.prototype.mod = bnMod;
    BigInteger2.prototype.modPowInt = bnModPowInt;
    BigInteger2.ZERO = nbv(0);
    BigInteger2.ONE = nbv(1);
    function bnClone() {
      var r = nbi();
      this.copyTo(r);
      return r;
    }
    function bnIntValue() {
      if (this.s < 0) {
        if (this.t == 1)
          return this[0] - this.DV;
        else if (this.t == 0)
          return -1;
      } else if (this.t == 1)
        return this[0];
      else if (this.t == 0)
        return 0;
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    }
    function bnByteValue() {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    }
    function bnShortValue() {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    }
    function bnpChunkSize(r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    }
    function bnSigNum() {
      if (this.s < 0)
        return -1;
      else if (this.t <= 0 || this.t == 1 && this[0] <= 0)
        return 0;
      else
        return 1;
    }
    function bnpToRadix(b) {
      if (b == null)
        b = 10;
      if (this.signum() == 0 || b < 2 || b > 36)
        return "0";
      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a), y = nbi(), z2 = nbi(), r = "";
      this.divRemTo(d, y, z2);
      while (y.signum() > 0) {
        r = (a + z2.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z2);
      }
      return z2.intValue().toString(b) + r;
    }
    function bnpFromRadix(s, b) {
      this.fromInt(0);
      if (b == null)
        b = 10;
      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
      for (var i = 0; i < s.length; ++i) {
        var x = intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-" && this.signum() == 0)
            mi = true;
          continue;
        }
        w = b * w + x;
        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }
      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }
      if (mi)
        BigInteger2.ZERO.subTo(this, this);
    }
    function bnpFromNumber(a, b, c) {
      if ("number" == typeof b) {
        if (a < 2)
          this.fromInt(1);
        else {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1))
            this.bitwiseTo(BigInteger2.ONE.shiftLeft(a - 1), op_or, this);
          if (this.isEven())
            this.dAddOffset(1, 0);
          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a)
              this.subTo(BigInteger2.ONE.shiftLeft(a - 1), this);
          }
        }
      } else {
        var x = new Array(), t2 = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t2 > 0)
          x[0] &= (1 << t2) - 1;
        else
          x[0] = 0;
        this.fromString(x, 256);
      }
    }
    function bnToByteArray() {
      var i = this.t, r = new Array();
      r[0] = this.s;
      var p = this.DB - i * this.DB % 8, d, k = 0;
      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
          r[k++] = d | this.s << this.DB - p;
        while (i >= 0) {
          if (p < 8) {
            d = (this[i] & (1 << p) - 1) << 8 - p;
            d |= this[--i] >> (p += this.DB - 8);
          } else {
            d = this[i] >> (p -= 8) & 255;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if ((d & 128) != 0)
            d |= -256;
          if (k == 0 && (this.s & 128) != (d & 128))
            ++k;
          if (k > 0 || d != this.s)
            r[k++] = d;
        }
      }
      return r;
    }
    function bnEquals(a) {
      return this.compareTo(a) == 0;
    }
    function bnMin(a) {
      return this.compareTo(a) < 0 ? this : a;
    }
    function bnMax(a) {
      return this.compareTo(a) > 0 ? this : a;
    }
    function bnpBitwiseTo(a, op, r) {
      var i, f, m = Math.min(a.t, this.t);
      for (i = 0; i < m; ++i)
        r[i] = op(this[i], a[i]);
      if (a.t < this.t) {
        f = a.s & this.DM;
        for (i = m; i < this.t; ++i)
          r[i] = op(this[i], f);
        r.t = this.t;
      } else {
        f = this.s & this.DM;
        for (i = m; i < a.t; ++i)
          r[i] = op(f, a[i]);
        r.t = a.t;
      }
      r.s = op(this.s, a.s);
      r.clamp();
    }
    function op_and(x, y) {
      return x & y;
    }
    function bnAnd(a) {
      var r = nbi();
      this.bitwiseTo(a, op_and, r);
      return r;
    }
    function op_or(x, y) {
      return x | y;
    }
    function bnOr(a) {
      var r = nbi();
      this.bitwiseTo(a, op_or, r);
      return r;
    }
    function op_xor(x, y) {
      return x ^ y;
    }
    function bnXor(a) {
      var r = nbi();
      this.bitwiseTo(a, op_xor, r);
      return r;
    }
    function op_andnot(x, y) {
      return x & ~y;
    }
    function bnAndNot(a) {
      var r = nbi();
      this.bitwiseTo(a, op_andnot, r);
      return r;
    }
    function bnNot() {
      var r = nbi();
      for (var i = 0; i < this.t; ++i)
        r[i] = this.DM & ~this[i];
      r.t = this.t;
      r.s = ~this.s;
      return r;
    }
    function bnShiftLeft(n2) {
      var r = nbi();
      if (n2 < 0)
        this.rShiftTo(-n2, r);
      else
        this.lShiftTo(n2, r);
      return r;
    }
    function bnShiftRight(n2) {
      var r = nbi();
      if (n2 < 0)
        this.lShiftTo(-n2, r);
      else
        this.rShiftTo(n2, r);
      return r;
    }
    function lbit(x) {
      if (x == 0)
        return -1;
      var r = 0;
      if ((x & 65535) == 0) {
        x >>= 16;
        r += 16;
      }
      if ((x & 255) == 0) {
        x >>= 8;
        r += 8;
      }
      if ((x & 15) == 0) {
        x >>= 4;
        r += 4;
      }
      if ((x & 3) == 0) {
        x >>= 2;
        r += 2;
      }
      if ((x & 1) == 0)
        ++r;
      return r;
    }
    function bnGetLowestSetBit() {
      for (var i = 0; i < this.t; ++i)
        if (this[i] != 0)
          return i * this.DB + lbit(this[i]);
      if (this.s < 0)
        return this.t * this.DB;
      return -1;
    }
    function cbit(x) {
      var r = 0;
      while (x != 0) {
        x &= x - 1;
        ++r;
      }
      return r;
    }
    function bnBitCount() {
      var r = 0, x = this.s & this.DM;
      for (var i = 0; i < this.t; ++i)
        r += cbit(this[i] ^ x);
      return r;
    }
    function bnTestBit(n2) {
      var j = Math.floor(n2 / this.DB);
      if (j >= this.t)
        return this.s != 0;
      return (this[j] & 1 << n2 % this.DB) != 0;
    }
    function bnpChangeBit(n2, op) {
      var r = BigInteger2.ONE.shiftLeft(n2);
      this.bitwiseTo(r, op, r);
      return r;
    }
    function bnSetBit(n2) {
      return this.changeBit(n2, op_or);
    }
    function bnClearBit(n2) {
      return this.changeBit(n2, op_andnot);
    }
    function bnFlipBit(n2) {
      return this.changeBit(n2, op_xor);
    }
    function bnpAddTo(a, r) {
      var i = 0, c = 0, m = Math.min(a.t, this.t);
      while (i < m) {
        c += this[i] + a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c += a.s;
        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c += a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c > 0)
        r[i++] = c;
      else if (c < -1)
        r[i++] = this.DV + c;
      r.t = i;
      r.clamp();
    }
    function bnAdd(a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    }
    function bnSubtract(a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    }
    function bnMultiply(a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    }
    function bnSquare() {
      var r = nbi();
      this.squareTo(r);
      return r;
    }
    function bnDivide(a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    }
    function bnRemainder(a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    }
    function bnDivideAndRemainder(a) {
      var q = nbi(), r = nbi();
      this.divRemTo(a, q, r);
      return new Array(q, r);
    }
    function bnpDMultiply(n2) {
      this[this.t] = this.am(0, n2 - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    }
    function bnpDAddOffset(n2, w) {
      if (n2 == 0)
        return;
      while (this.t <= w)
        this[this.t++] = 0;
      this[w] += n2;
      while (this[w] >= this.DV) {
        this[w] -= this.DV;
        if (++w >= this.t)
          this[this.t++] = 0;
        ++this[w];
      }
    }
    function NullExp() {
    }
    function nNop(x) {
      return x;
    }
    function nMulTo(x, y, r) {
      x.multiplyTo(y, r);
    }
    function nSqrTo(x, r) {
      x.squareTo(r);
    }
    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;
    function bnPow(e) {
      return this.exp(e, new NullExp());
    }
    function bnpMultiplyLowerTo(a, n2, r) {
      var i = Math.min(this.t + a.t, n2);
      r.s = 0;
      r.t = i;
      while (i > 0)
        r[--i] = 0;
      var j;
      for (j = r.t - this.t; i < j; ++i)
        r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
      for (j = Math.min(a.t, n2); i < j; ++i)
        this.am(0, a[i], r, i, 0, n2 - i);
      r.clamp();
    }
    function bnpMultiplyUpperTo(a, n2, r) {
      --n2;
      var i = r.t = this.t + a.t - n2;
      r.s = 0;
      while (--i >= 0)
        r[i] = 0;
      for (i = Math.max(n2 - this.t, 0); i < a.t; ++i)
        r[this.t + i - n2] = this.am(n2 - i, a[i], r, 0, 0, this.t + i - n2);
      r.clamp();
      r.drShiftTo(1, r);
    }
    function Barrett(m) {
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger2.ONE.dlShiftTo(2 * m.t, this.r2);
      this.mu = this.r2.divide(m);
      this.m = m;
    }
    function barrettConvert(x) {
      if (x.s < 0 || x.t > 2 * this.m.t)
        return x.mod(this.m);
      else if (x.compareTo(this.m) < 0)
        return x;
      else {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    }
    function barrettRevert(x) {
      return x;
    }
    function barrettReduce(x) {
      x.drShiftTo(this.m.t - 1, this.r2);
      if (x.t > this.m.t + 1) {
        x.t = this.m.t + 1;
        x.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x.compareTo(this.r2) < 0)
        x.dAddOffset(1, this.m.t + 1);
      x.subTo(this.r2, x);
      while (x.compareTo(this.m) >= 0)
        x.subTo(this.m, x);
    }
    function barrettSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    function barrettMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;
    function bnModPow(e, m) {
      var i = e.bitLength(), k, r = nbv(1), z2;
      if (i <= 0)
        return r;
      else if (i < 18)
        k = 1;
      else if (i < 48)
        k = 3;
      else if (i < 144)
        k = 4;
      else if (i < 768)
        k = 5;
      else
        k = 6;
      if (i < 8)
        z2 = new Classic(m);
      else if (m.isEven())
        z2 = new Barrett(m);
      else
        z2 = new Montgomery(m);
      var g = new Array(), n2 = 3, k1 = k - 1, km = (1 << k) - 1;
      g[1] = z2.convert(this);
      if (k > 1) {
        var g2 = nbi();
        z2.sqrTo(g[1], g2);
        while (n2 <= km) {
          g[n2] = nbi();
          z2.mulTo(g2, g[n2 - 2], g[n2]);
          n2 += 2;
        }
      }
      var j = e.t - 1, w, is1 = true, r2 = nbi(), t2;
      i = nbits(e[j]) - 1;
      while (j >= 0) {
        if (i >= k1)
          w = e[j] >> i - k1 & km;
        else {
          w = (e[j] & (1 << i + 1) - 1) << k1 - i;
          if (j > 0)
            w |= e[j - 1] >> this.DB + i - k1;
        }
        n2 = k;
        while ((w & 1) == 0) {
          w >>= 1;
          --n2;
        }
        if ((i -= n2) < 0) {
          i += this.DB;
          --j;
        }
        if (is1) {
          g[w].copyTo(r);
          is1 = false;
        } else {
          while (n2 > 1) {
            z2.sqrTo(r, r2);
            z2.sqrTo(r2, r);
            n2 -= 2;
          }
          if (n2 > 0)
            z2.sqrTo(r, r2);
          else {
            t2 = r;
            r = r2;
            r2 = t2;
          }
          z2.mulTo(r2, g[w], r);
        }
        while (j >= 0 && (e[j] & 1 << i) == 0) {
          z2.sqrTo(r, r2);
          t2 = r;
          r = r2;
          r2 = t2;
          if (--i < 0) {
            i = this.DB - 1;
            --j;
          }
        }
      }
      return z2.revert(r);
    }
    function bnGCD(a) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t2 = x;
        x = y;
        y = t2;
      }
      var i = x.getLowestSetBit(), g = y.getLowestSetBit();
      if (g < 0)
        return x;
      if (i < g)
        g = i;
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      while (x.signum() > 0) {
        if ((i = x.getLowestSetBit()) > 0)
          x.rShiftTo(i, x);
        if ((i = y.getLowestSetBit()) > 0)
          y.rShiftTo(i, y);
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }
      if (g > 0)
        y.lShiftTo(g, y);
      return y;
    }
    function bnpModInt(n2) {
      if (n2 <= 0)
        return 0;
      var d = this.DV % n2, r = this.s < 0 ? n2 - 1 : 0;
      if (this.t > 0)
        if (d == 0)
          r = this[0] % n2;
        else
          for (var i = this.t - 1; i >= 0; --i)
            r = (d * r + this[i]) % n2;
      return r;
    }
    function bnModInverse(m) {
      var ac = m.isEven();
      if (this.isEven() && ac || m.signum() == 0)
        return BigInteger2.ZERO;
      var u = m.clone(), v = this.clone();
      var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);
          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this, a);
              b.subTo(m, b);
            }
            a.rShiftTo(1, a);
          } else if (!b.isEven())
            b.subTo(m, b);
          b.rShiftTo(1, b);
        }
        while (v.isEven()) {
          v.rShiftTo(1, v);
          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this, c);
              d.subTo(m, d);
            }
            c.rShiftTo(1, c);
          } else if (!d.isEven())
            d.subTo(m, d);
          d.rShiftTo(1, d);
        }
        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);
          if (ac)
            a.subTo(c, a);
          b.subTo(d, b);
        } else {
          v.subTo(u, v);
          if (ac)
            c.subTo(a, c);
          d.subTo(b, d);
        }
      }
      if (v.compareTo(BigInteger2.ONE) != 0)
        return BigInteger2.ZERO;
      if (d.compareTo(m) >= 0)
        return d.subtract(m);
      if (d.signum() < 0)
        d.addTo(m, d);
      else
        return d;
      if (d.signum() < 0)
        return d.add(m);
      else
        return d;
    }
    var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
    var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
    function bnIsProbablePrime(t2) {
      var i, x = this.abs();
      if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i)
          if (x[0] == lowprimes[i])
            return true;
        return false;
      }
      if (x.isEven())
        return false;
      i = 1;
      while (i < lowprimes.length) {
        var m = lowprimes[i], j = i + 1;
        while (j < lowprimes.length && m < lplim)
          m *= lowprimes[j++];
        m = x.modInt(m);
        while (i < j)
          if (m % lowprimes[i++] == 0)
            return false;
      }
      return x.millerRabin(t2);
    }
    function bnpMillerRabin(t2) {
      var n1 = this.subtract(BigInteger2.ONE);
      var k = n1.getLowestSetBit();
      if (k <= 0)
        return false;
      var r = n1.shiftRight(k);
      t2 = t2 + 1 >> 1;
      if (t2 > lowprimes.length)
        t2 = lowprimes.length;
      var a = nbi();
      for (var i = 0; i < t2; ++i) {
        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y = a.modPow(r, this);
        if (y.compareTo(BigInteger2.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;
          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this);
            if (y.compareTo(BigInteger2.ONE) == 0)
              return false;
          }
          if (y.compareTo(n1) != 0)
            return false;
        }
      }
      return true;
    }
    BigInteger2.prototype.chunkSize = bnpChunkSize;
    BigInteger2.prototype.toRadix = bnpToRadix;
    BigInteger2.prototype.fromRadix = bnpFromRadix;
    BigInteger2.prototype.fromNumber = bnpFromNumber;
    BigInteger2.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger2.prototype.changeBit = bnpChangeBit;
    BigInteger2.prototype.addTo = bnpAddTo;
    BigInteger2.prototype.dMultiply = bnpDMultiply;
    BigInteger2.prototype.dAddOffset = bnpDAddOffset;
    BigInteger2.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger2.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger2.prototype.modInt = bnpModInt;
    BigInteger2.prototype.millerRabin = bnpMillerRabin;
    BigInteger2.prototype.clone = bnClone;
    BigInteger2.prototype.intValue = bnIntValue;
    BigInteger2.prototype.byteValue = bnByteValue;
    BigInteger2.prototype.shortValue = bnShortValue;
    BigInteger2.prototype.signum = bnSigNum;
    BigInteger2.prototype.toByteArray = bnToByteArray;
    BigInteger2.prototype.equals = bnEquals;
    BigInteger2.prototype.min = bnMin;
    BigInteger2.prototype.max = bnMax;
    BigInteger2.prototype.and = bnAnd;
    BigInteger2.prototype.or = bnOr;
    BigInteger2.prototype.xor = bnXor;
    BigInteger2.prototype.andNot = bnAndNot;
    BigInteger2.prototype.not = bnNot;
    BigInteger2.prototype.shiftLeft = bnShiftLeft;
    BigInteger2.prototype.shiftRight = bnShiftRight;
    BigInteger2.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger2.prototype.bitCount = bnBitCount;
    BigInteger2.prototype.testBit = bnTestBit;
    BigInteger2.prototype.setBit = bnSetBit;
    BigInteger2.prototype.clearBit = bnClearBit;
    BigInteger2.prototype.flipBit = bnFlipBit;
    BigInteger2.prototype.add = bnAdd;
    BigInteger2.prototype.subtract = bnSubtract;
    BigInteger2.prototype.multiply = bnMultiply;
    BigInteger2.prototype.divide = bnDivide;
    BigInteger2.prototype.remainder = bnRemainder;
    BigInteger2.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger2.prototype.modPow = bnModPow;
    BigInteger2.prototype.modInverse = bnModInverse;
    BigInteger2.prototype.pow = bnPow;
    BigInteger2.prototype.gcd = bnGCD;
    BigInteger2.prototype.isProbablePrime = bnIsProbablePrime;
    BigInteger2.prototype.square = bnSquare;
    BigInteger2.prototype.Barrett = Barrett;
    var rng_state;
    var rng_pool;
    var rng_pptr;
    function rng_seed_int(x) {
      rng_pool[rng_pptr++] ^= x & 255;
      rng_pool[rng_pptr++] ^= x >> 8 & 255;
      rng_pool[rng_pptr++] ^= x >> 16 & 255;
      rng_pool[rng_pptr++] ^= x >> 24 & 255;
      if (rng_pptr >= rng_psize)
        rng_pptr -= rng_psize;
    }
    function rng_seed_time() {
      rng_seed_int(new Date().getTime());
    }
    if (rng_pool == null) {
      rng_pool = new Array();
      rng_pptr = 0;
      var t;
      if (typeof window !== "undefined" && window.crypto) {
        if (window.crypto.getRandomValues) {
          var ua = new Uint8Array(32);
          window.crypto.getRandomValues(ua);
          for (t = 0; t < 32; ++t)
            rng_pool[rng_pptr++] = ua[t];
        } else if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
          var z = window.crypto.random(32);
          for (t = 0; t < z.length; ++t)
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
        }
      }
      while (rng_pptr < rng_psize) {
        t = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t >>> 8;
        rng_pool[rng_pptr++] = t & 255;
      }
      rng_pptr = 0;
      rng_seed_time();
    }
    function rng_get_byte() {
      if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
          rng_pool[rng_pptr] = 0;
        rng_pptr = 0;
      }
      return rng_state.next();
    }
    function rng_get_bytes(ba) {
      var i;
      for (i = 0; i < ba.length; ++i)
        ba[i] = rng_get_byte();
    }
    function SecureRandom2() {
    }
    SecureRandom2.prototype.nextBytes = rng_get_bytes;
    function Arcfour() {
      this.i = 0;
      this.j = 0;
      this.S = new Array();
    }
    function ARC4init(key) {
      var i, j, t2;
      for (i = 0; i < 256; ++i)
        this.S[i] = i;
      j = 0;
      for (i = 0; i < 256; ++i) {
        j = j + this.S[i] + key[i % key.length] & 255;
        t2 = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = t2;
      }
      this.i = 0;
      this.j = 0;
    }
    function ARC4next() {
      var t2;
      this.i = this.i + 1 & 255;
      this.j = this.j + this.S[this.i] & 255;
      t2 = this.S[this.i];
      this.S[this.i] = this.S[this.j];
      this.S[this.j] = t2;
      return this.S[t2 + this.S[this.i] & 255];
    }
    Arcfour.prototype.init = ARC4init;
    Arcfour.prototype.next = ARC4next;
    function prng_newstate() {
      return new Arcfour();
    }
    var rng_psize = 256;
    {
      module2.exports = {
        default: BigInteger2,
        BigInteger: BigInteger2,
        SecureRandom: SecureRandom2
      };
    }
  }).call(commonjsGlobal);
})(jsbn);
const { BigInteger: BigInteger$3 } = jsbn.exports;
function bigintToValue(bigint) {
  let h = bigint.toString(16);
  if (h[0] !== "-") {
    if (h.length % 2 === 1)
      h = "0" + h;
    else if (!h.match(/^[0-7]/))
      h = "00" + h;
  } else {
    h = h.substr(1);
    let len = h.length;
    if (len % 2 === 1)
      len += 1;
    else if (!h.match(/^[0-7]/))
      len += 2;
    let mask = "";
    for (let i = 0; i < len; i++)
      mask += "f";
    mask = new BigInteger$3(mask, 16);
    h = mask.xor(bigint).add(BigInteger$3.ONE);
    h = h.toString(16).replace(/^-/, "");
  }
  return h;
}
class ASN1Object {
  constructor() {
    this.tlv = null;
    this.t = "00";
    this.l = "00";
    this.v = "";
  }
  getEncodedHex() {
    if (!this.tlv) {
      this.v = this.getValue();
      this.l = this.getLength();
      this.tlv = this.t + this.l + this.v;
    }
    return this.tlv;
  }
  getLength() {
    const n2 = this.v.length / 2;
    let nHex = n2.toString(16);
    if (nHex.length % 2 === 1)
      nHex = "0" + nHex;
    if (n2 < 128) {
      return nHex;
    } else {
      const head = 128 + nHex.length / 2;
      return head.toString(16) + nHex;
    }
  }
  getValue() {
    return "";
  }
}
class DERInteger extends ASN1Object {
  constructor(bigint) {
    super();
    this.t = "02";
    if (bigint)
      this.v = bigintToValue(bigint);
  }
  getValue() {
    return this.v;
  }
}
class DERSequence extends ASN1Object {
  constructor(asn1Array) {
    super();
    this.t = "30";
    this.asn1Array = asn1Array;
  }
  getValue() {
    this.v = this.asn1Array.map((asn1Object) => asn1Object.getEncodedHex()).join("");
    return this.v;
  }
}
function getLenOfL(str, start) {
  if (+str[start + 2] < 8)
    return 1;
  return +str.substr(start + 2, 2) & 127 + 1;
}
function getL(str, start) {
  const len = getLenOfL(str, start);
  const l = str.substr(start + 2, len * 2);
  if (!l)
    return -1;
  const bigint = +l[0] < 8 ? new BigInteger$3(l, 16) : new BigInteger$3(l.substr(2), 16);
  return bigint.intValue();
}
function getStartOfV(str, start) {
  const len = getLenOfL(str, start);
  return start + (len + 1) * 2;
}
var asn1 = {
  encodeDer(r, s) {
    const derR = new DERInteger(r);
    const derS = new DERInteger(s);
    const derSeq = new DERSequence([derR, derS]);
    return derSeq.getEncodedHex();
  },
  decodeDer(input) {
    const start = getStartOfV(input, 0);
    const vIndexR = getStartOfV(input, start);
    const lR = getL(input, start);
    const vR = input.substr(vIndexR, lR * 2);
    const nextStart = vIndexR + vR.length;
    const vIndexS = getStartOfV(input, nextStart);
    const lS = getL(input, nextStart);
    const vS = input.substr(vIndexS, lS * 2);
    const r = new BigInteger$3(vR, 16);
    const s = new BigInteger$3(vS, 16);
    return { r, s };
  }
};
const { BigInteger: BigInteger$2 } = jsbn.exports;
const TWO = new BigInteger$2("2");
const THREE = new BigInteger$2("3");
class ECFieldElementFp {
  constructor(q, x) {
    this.x = x;
    this.q = q;
  }
  equals(other) {
    if (other === this)
      return true;
    return this.q.equals(other.q) && this.x.equals(other.x);
  }
  toBigInteger() {
    return this.x;
  }
  negate() {
    return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
  }
  add(b) {
    return new ECFieldElementFp(this.q, this.x.add(b.toBigInteger()).mod(this.q));
  }
  subtract(b) {
    return new ECFieldElementFp(this.q, this.x.subtract(b.toBigInteger()).mod(this.q));
  }
  multiply(b) {
    return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger()).mod(this.q));
  }
  divide(b) {
    return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger().modInverse(this.q)).mod(this.q));
  }
  square() {
    return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
  }
}
class ECPointFp {
  constructor(curve2, x, y, z) {
    this.curve = curve2;
    this.x = x;
    this.y = y;
    this.z = z == null ? BigInteger$2.ONE : z;
    this.zinv = null;
  }
  getX() {
    if (this.zinv === null)
      this.zinv = this.z.modInverse(this.curve.q);
    return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  }
  getY() {
    if (this.zinv === null)
      this.zinv = this.z.modInverse(this.curve.q);
    return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  }
  equals(other) {
    if (other === this)
      return true;
    if (this.isInfinity())
      return other.isInfinity();
    if (other.isInfinity())
      return this.isInfinity();
    const u = other.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(other.z)).mod(this.curve.q);
    if (!u.equals(BigInteger$2.ZERO))
      return false;
    const v = other.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(other.z)).mod(this.curve.q);
    return v.equals(BigInteger$2.ZERO);
  }
  isInfinity() {
    if (this.x === null && this.y === null)
      return true;
    return this.z.equals(BigInteger$2.ZERO) && !this.y.toBigInteger().equals(BigInteger$2.ZERO);
  }
  negate() {
    return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
  }
  add(b) {
    if (this.isInfinity())
      return b;
    if (b.isInfinity())
      return this;
    const x1 = this.x.toBigInteger();
    const y1 = this.y.toBigInteger();
    const z1 = this.z;
    const x2 = b.x.toBigInteger();
    const y2 = b.y.toBigInteger();
    const z2 = b.z;
    const q = this.curve.q;
    const w1 = x1.multiply(z2).mod(q);
    const w2 = x2.multiply(z1).mod(q);
    const w3 = w1.subtract(w2);
    const w4 = y1.multiply(z2).mod(q);
    const w5 = y2.multiply(z1).mod(q);
    const w6 = w4.subtract(w5);
    if (BigInteger$2.ZERO.equals(w3)) {
      if (BigInteger$2.ZERO.equals(w6)) {
        return this.twice();
      }
      return this.curve.infinity;
    }
    const w7 = w1.add(w2);
    const w8 = z1.multiply(z2).mod(q);
    const w9 = w3.square().mod(q);
    const w10 = w3.multiply(w9).mod(q);
    const w11 = w8.multiply(w6.square()).subtract(w7.multiply(w9)).mod(q);
    const x3 = w3.multiply(w11).mod(q);
    const y3 = w6.multiply(w9.multiply(w1).subtract(w11)).subtract(w4.multiply(w10)).mod(q);
    const z3 = w10.multiply(w8).mod(q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
  }
  twice() {
    if (this.isInfinity())
      return this;
    if (!this.y.toBigInteger().signum())
      return this.curve.infinity;
    const x1 = this.x.toBigInteger();
    const y1 = this.y.toBigInteger();
    const z1 = this.z;
    const q = this.curve.q;
    const a = this.curve.a.toBigInteger();
    const w1 = x1.square().multiply(THREE).add(a.multiply(z1.square())).mod(q);
    const w2 = y1.shiftLeft(1).multiply(z1).mod(q);
    const w3 = y1.square().mod(q);
    const w4 = w3.multiply(x1).multiply(z1).mod(q);
    const w5 = w2.square().mod(q);
    const w6 = w1.square().subtract(w4.shiftLeft(3)).mod(q);
    const x3 = w2.multiply(w6).mod(q);
    const y3 = w1.multiply(w4.shiftLeft(2).subtract(w6)).subtract(w5.shiftLeft(1).multiply(w3)).mod(q);
    const z3 = w2.multiply(w5).mod(q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
  }
  multiply(k) {
    if (this.isInfinity())
      return this;
    if (!k.signum())
      return this.curve.infinity;
    const k3 = k.multiply(THREE);
    const neg = this.negate();
    let Q = this;
    for (let i = k3.bitLength() - 2; i > 0; i--) {
      Q = Q.twice();
      const k3Bit = k3.testBit(i);
      const kBit = k.testBit(i);
      if (k3Bit !== kBit) {
        Q = Q.add(k3Bit ? this : neg);
      }
    }
    return Q;
  }
}
class ECCurveFp$1 {
  constructor(q, a, b) {
    this.q = q;
    this.a = this.fromBigInteger(a);
    this.b = this.fromBigInteger(b);
    this.infinity = new ECPointFp(this, null, null);
  }
  equals(other) {
    if (other === this)
      return true;
    return this.q.equals(other.q) && this.a.equals(other.a) && this.b.equals(other.b);
  }
  fromBigInteger(x) {
    return new ECFieldElementFp(this.q, x);
  }
  decodePointHex(s) {
    switch (parseInt(s.substr(0, 2), 16)) {
      case 0:
        return this.infinity;
      case 2:
      case 3:
        const x = this.fromBigInteger(new BigInteger$2(s.substr(2), 16));
        let y = this.fromBigInteger(x.multiply(x.square()).add(
          x.multiply(this.a)
        ).add(this.b).toBigInteger().modPow(
          this.q.divide(new BigInteger$2("4")).add(BigInteger$2.ONE),
          this.q
        ));
        if (!y.toBigInteger().mod(TWO).equals(new BigInteger$2(s.substr(0, 2), 16).subtract(TWO))) {
          y = y.negate();
        }
        return new ECPointFp(this, x, y);
      case 4:
      case 6:
      case 7:
        const len = (s.length - 2) / 2;
        const xHex = s.substr(2, len);
        const yHex = s.substr(len + 2, len);
        return new ECPointFp(this, this.fromBigInteger(new BigInteger$2(xHex, 16)), this.fromBigInteger(new BigInteger$2(yHex, 16)));
      default:
        return null;
    }
  }
}
var ec = {
  ECPointFp,
  ECCurveFp: ECCurveFp$1
};
const { BigInteger: BigInteger$1, SecureRandom } = jsbn.exports;
const { ECCurveFp } = ec;
const rng = new SecureRandom();
const { curve: curve$1, G: G$1, n: n$1 } = generateEcparam();
function getGlobalCurve() {
  return curve$1;
}
function generateEcparam() {
  const p = new BigInteger$1("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", 16);
  const a = new BigInteger$1("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", 16);
  const b = new BigInteger$1("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", 16);
  const curve2 = new ECCurveFp(p, a, b);
  const gxHex = "32C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7";
  const gyHex = "BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0";
  const G2 = curve2.decodePointHex("04" + gxHex + gyHex);
  const n2 = new BigInteger$1("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", 16);
  return { curve: curve2, G: G2, n: n2 };
}
function generateKeyPairHex(a, b, c) {
  const random = a ? new BigInteger$1(a, b, c) : new BigInteger$1(n$1.bitLength(), rng);
  const d = random.mod(n$1.subtract(BigInteger$1.ONE)).add(BigInteger$1.ONE);
  const privateKey = leftPad$1(d.toString(16), 64);
  const P = G$1.multiply(d);
  const Px = leftPad$1(P.getX().toBigInteger().toString(16), 64);
  const Py = leftPad$1(P.getY().toBigInteger().toString(16), 64);
  const publicKey = "04" + Px + Py;
  return { privateKey, publicKey };
}
function compressPublicKeyHex(s) {
  if (s.length !== 130)
    throw new Error("Invalid public key to compress");
  const len = (s.length - 2) / 2;
  const xHex = s.substr(2, len);
  const y = new BigInteger$1(s.substr(len + 2, len), 16);
  let prefix = "03";
  if (y.mod(new BigInteger$1("2")).equals(BigInteger$1.ZERO))
    prefix = "02";
  return prefix + xHex;
}
function utf8ToHex(input) {
  input = unescape(encodeURIComponent(input));
  const length = input.length;
  const words2 = [];
  for (let i = 0; i < length; i++) {
    words2[i >>> 2] |= (input.charCodeAt(i) & 255) << 24 - i % 4 * 8;
  }
  const hexChars = [];
  for (let i = 0; i < length; i++) {
    const bite = words2[i >>> 2] >>> 24 - i % 4 * 8 & 255;
    hexChars.push((bite >>> 4).toString(16));
    hexChars.push((bite & 15).toString(16));
  }
  return hexChars.join("");
}
function leftPad$1(input, num) {
  if (input.length >= num)
    return input;
  return new Array(num - input.length + 1).join("0") + input;
}
function arrayToHex(arr) {
  return arr.map((item) => {
    item = item.toString(16);
    return item.length === 1 ? "0" + item : item;
  }).join("");
}
function arrayToUtf8$1(arr) {
  const words2 = [];
  let j = 0;
  for (let i = 0; i < arr.length * 2; i += 2) {
    words2[i >>> 3] |= parseInt(arr[j], 10) << 24 - i % 8 * 4;
    j++;
  }
  try {
    const latin1Chars = [];
    for (let i = 0; i < arr.length; i++) {
      const bite = words2[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      latin1Chars.push(String.fromCharCode(bite));
    }
    return decodeURIComponent(escape(latin1Chars.join("")));
  } catch (e) {
    throw new Error("Malformed UTF-8 data");
  }
}
function hexToArray$2(hexStr) {
  const words2 = [];
  let hexStrLength = hexStr.length;
  if (hexStrLength % 2 !== 0) {
    hexStr = leftPad$1(hexStr, hexStrLength + 1);
  }
  hexStrLength = hexStr.length;
  for (let i = 0; i < hexStrLength; i += 2) {
    words2.push(parseInt(hexStr.substr(i, 2), 16));
  }
  return words2;
}
function verifyPublicKey(publicKey) {
  const point = curve$1.decodePointHex(publicKey);
  if (!point)
    return false;
  const x = point.getX();
  const y = point.getY();
  return y.square().equals(x.multiply(x.square()).add(x.multiply(curve$1.a)).add(curve$1.b));
}
function comparePublicKeyHex(publicKey1, publicKey2) {
  const point1 = curve$1.decodePointHex(publicKey1);
  if (!point1)
    return false;
  const point2 = curve$1.decodePointHex(publicKey2);
  if (!point2)
    return false;
  return point1.equals(point2);
}
var utils = {
  getGlobalCurve,
  generateEcparam,
  generateKeyPairHex,
  compressPublicKeyHex,
  utf8ToHex,
  leftPad: leftPad$1,
  arrayToHex,
  arrayToUtf8: arrayToUtf8$1,
  hexToArray: hexToArray$2,
  verifyPublicKey,
  comparePublicKeyHex
};
function rotl$1(x, n2) {
  const result = [];
  const a = ~~(n2 / 8);
  const b = n2 % 8;
  for (let i = 0, len = x.length; i < len; i++) {
    result[i] = (x[(i + a) % len] << b & 255) + (x[(i + a + 1) % len] >>> 8 - b & 255);
  }
  return result;
}
function xor(x, y) {
  const result = [];
  for (let i = x.length - 1; i >= 0; i--)
    result[i] = (x[i] ^ y[i]) & 255;
  return result;
}
function and(x, y) {
  const result = [];
  for (let i = x.length - 1; i >= 0; i--)
    result[i] = x[i] & y[i] & 255;
  return result;
}
function or(x, y) {
  const result = [];
  for (let i = x.length - 1; i >= 0; i--)
    result[i] = (x[i] | y[i]) & 255;
  return result;
}
function add$2(x, y) {
  const result = [];
  let temp = 0;
  for (let i = x.length - 1; i >= 0; i--) {
    const sum = x[i] + y[i] + temp;
    if (sum > 255) {
      temp = 1;
      result[i] = sum & 255;
    } else {
      temp = 0;
      result[i] = sum & 255;
    }
  }
  return result;
}
function not(x) {
  const result = [];
  for (let i = x.length - 1; i >= 0; i--)
    result[i] = ~x[i] & 255;
  return result;
}
function P0(X) {
  return xor(xor(X, rotl$1(X, 9)), rotl$1(X, 17));
}
function P1(X) {
  return xor(xor(X, rotl$1(X, 15)), rotl$1(X, 23));
}
function FF(X, Y, Z, j) {
  return j >= 0 && j <= 15 ? xor(xor(X, Y), Z) : or(or(and(X, Y), and(X, Z)), and(Y, Z));
}
function GG(X, Y, Z, j) {
  return j >= 0 && j <= 15 ? xor(xor(X, Y), Z) : or(and(X, Y), and(not(X), Z));
}
function CF(V, Bi) {
  const W = [];
  const M = [];
  for (let i = 0; i < 16; i++) {
    const start = i * 4;
    W.push(Bi.slice(start, start + 4));
  }
  for (let j = 16; j < 68; j++) {
    W.push(xor(
      xor(
        P1(
          xor(
            xor(W[j - 16], W[j - 9]),
            rotl$1(W[j - 3], 15)
          )
        ),
        rotl$1(W[j - 13], 7)
      ),
      W[j - 6]
    ));
  }
  for (let j = 0; j < 64; j++) {
    M.push(xor(W[j], W[j + 4]));
  }
  const T1 = [121, 204, 69, 25];
  const T2 = [122, 135, 157, 138];
  let A = V.slice(0, 4);
  let B = V.slice(4, 8);
  let C = V.slice(8, 12);
  let D = V.slice(12, 16);
  let E = V.slice(16, 20);
  let F = V.slice(20, 24);
  let G2 = V.slice(24, 28);
  let H = V.slice(28, 32);
  let SS1;
  let SS2;
  let TT1;
  let TT2;
  for (let j = 0; j < 64; j++) {
    const T = j >= 0 && j <= 15 ? T1 : T2;
    SS1 = rotl$1(add$2(
      add$2(rotl$1(A, 12), E),
      rotl$1(T, j)
    ), 7);
    SS2 = xor(SS1, rotl$1(A, 12));
    TT1 = add$2(add$2(add$2(FF(A, B, C, j), D), SS2), M[j]);
    TT2 = add$2(add$2(add$2(GG(E, F, G2, j), H), SS1), W[j]);
    D = C;
    C = rotl$1(B, 9);
    B = A;
    A = TT1;
    H = G2;
    G2 = rotl$1(F, 19);
    F = E;
    E = P0(TT2);
  }
  return xor([].concat(A, B, C, D, E, F, G2, H), V);
}
function sm3$2(array) {
  let len = array.length * 8;
  let k = len % 512;
  k = k >= 448 ? 512 - k % 448 - 1 : 448 - k - 1;
  const kArr = new Array((k - 7) / 8);
  for (let i = 0, len2 = kArr.length; i < len2; i++)
    kArr[i] = 0;
  const lenArr = [];
  len = len.toString(2);
  for (let i = 7; i >= 0; i--) {
    if (len.length > 8) {
      const start = len.length - 8;
      lenArr[i] = parseInt(len.substr(start), 2);
      len = len.substr(0, start);
    } else if (len.length > 0) {
      lenArr[i] = parseInt(len, 2);
      len = "";
    } else {
      lenArr[i] = 0;
    }
  }
  const m = [].concat(array, [128], kArr, lenArr);
  const n2 = m.length / 64;
  let V = [115, 128, 22, 111, 73, 20, 178, 185, 23, 36, 66, 215, 218, 138, 6, 0, 169, 111, 48, 188, 22, 49, 56, 170, 227, 141, 238, 77, 176, 251, 14, 78];
  for (let i = 0; i < n2; i++) {
    const start = 64 * i;
    const B = m.slice(start, start + 64);
    V = CF(V, B);
  }
  return V;
}
const blockLen = 64;
const iPad = new Array(blockLen);
const oPad = new Array(blockLen);
for (let i = 0; i < blockLen; i++) {
  iPad[i] = 54;
  oPad[i] = 92;
}
function hmac$1(input, key) {
  if (key.length > blockLen)
    key = sm3$2(key);
  while (key.length < blockLen)
    key.push(0);
  const iPadKey = xor(key, iPad);
  let hash = iPadKey.concat(input);
  hash = sm3$2(hash);
  const oPadKey = xor(key, oPad);
  hash = oPadKey.concat(hash);
  hash = sm3$2(hash);
  return hash;
}
var sm3_1$1 = {
  sm3: sm3$2,
  hmac: hmac$1
};
const { BigInteger } = jsbn.exports;
const { encodeDer, decodeDer } = asn1;
const _ = utils;
const sm3$1 = sm3_1$1.sm3;
const { G, curve, n } = _.generateEcparam();
const C1C2C3 = 0;
function doEncrypt(msg, publicKey, cipherMode = 1) {
  msg = typeof msg === "string" ? _.hexToArray(_.utf8ToHex(msg)) : Array.prototype.slice.call(msg);
  publicKey = _.getGlobalCurve().decodePointHex(publicKey);
  const keypair = _.generateKeyPairHex();
  const k = new BigInteger(keypair.privateKey, 16);
  let c1 = keypair.publicKey;
  if (c1.length > 128)
    c1 = c1.substr(c1.length - 128);
  const p = publicKey.multiply(k);
  const x2 = _.hexToArray(_.leftPad(p.getX().toBigInteger().toRadix(16), 64));
  const y2 = _.hexToArray(_.leftPad(p.getY().toBigInteger().toRadix(16), 64));
  const c3 = _.arrayToHex(sm3$1([].concat(x2, msg, y2)));
  let ct = 1;
  let offset2 = 0;
  let t = [];
  const z = [].concat(x2, y2);
  const nextT = () => {
    t = sm3$1([...z, ct >> 24 & 255, ct >> 16 & 255, ct >> 8 & 255, ct & 255]);
    ct++;
    offset2 = 0;
  };
  nextT();
  for (let i = 0, len = msg.length; i < len; i++) {
    if (offset2 === t.length)
      nextT();
    msg[i] ^= t[offset2++] & 255;
  }
  const c2 = _.arrayToHex(msg);
  return cipherMode === C1C2C3 ? c1 + c2 + c3 : c1 + c3 + c2;
}
function doDecrypt(encryptData, privateKey, cipherMode = 1, {
  output = "string"
} = {}) {
  privateKey = new BigInteger(privateKey, 16);
  let c3 = encryptData.substr(128, 64);
  let c2 = encryptData.substr(128 + 64);
  if (cipherMode === C1C2C3) {
    c3 = encryptData.substr(encryptData.length - 64);
    c2 = encryptData.substr(128, encryptData.length - 128 - 64);
  }
  const msg = _.hexToArray(c2);
  const c1 = _.getGlobalCurve().decodePointHex("04" + encryptData.substr(0, 128));
  const p = c1.multiply(privateKey);
  const x2 = _.hexToArray(_.leftPad(p.getX().toBigInteger().toRadix(16), 64));
  const y2 = _.hexToArray(_.leftPad(p.getY().toBigInteger().toRadix(16), 64));
  let ct = 1;
  let offset2 = 0;
  let t = [];
  const z = [].concat(x2, y2);
  const nextT = () => {
    t = sm3$1([...z, ct >> 24 & 255, ct >> 16 & 255, ct >> 8 & 255, ct & 255]);
    ct++;
    offset2 = 0;
  };
  nextT();
  for (let i = 0, len = msg.length; i < len; i++) {
    if (offset2 === t.length)
      nextT();
    msg[i] ^= t[offset2++] & 255;
  }
  const checkC3 = _.arrayToHex(sm3$1([].concat(x2, msg, y2)));
  if (checkC3 === c3.toLowerCase()) {
    return output === "array" ? msg : _.arrayToUtf8(msg);
  } else {
    return output === "array" ? [] : "";
  }
}
function doSignature(msg, privateKey, {
  pointPool,
  der,
  hash,
  publicKey,
  userId
} = {}) {
  let hashHex = typeof msg === "string" ? _.utf8ToHex(msg) : _.arrayToHex(msg);
  if (hash) {
    publicKey = publicKey || getPublicKeyFromPrivateKey(privateKey);
    hashHex = getHash(hashHex, publicKey, userId);
  }
  const dA = new BigInteger(privateKey, 16);
  const e = new BigInteger(hashHex, 16);
  let k = null;
  let r = null;
  let s = null;
  do {
    do {
      let point;
      if (pointPool && pointPool.length) {
        point = pointPool.pop();
      } else {
        point = getPoint();
      }
      k = point.k;
      r = e.add(point.x1).mod(n);
    } while (r.equals(BigInteger.ZERO) || r.add(k).equals(n));
    s = dA.add(BigInteger.ONE).modInverse(n).multiply(k.subtract(r.multiply(dA))).mod(n);
  } while (s.equals(BigInteger.ZERO));
  if (der)
    return encodeDer(r, s);
  return _.leftPad(r.toString(16), 64) + _.leftPad(s.toString(16), 64);
}
function doVerifySignature(msg, signHex, publicKey, { der, hash, userId } = {}) {
  let hashHex = typeof msg === "string" ? _.utf8ToHex(msg) : _.arrayToHex(msg);
  if (hash) {
    hashHex = getHash(hashHex, publicKey, userId);
  }
  let r;
  let s;
  if (der) {
    const decodeDerObj = decodeDer(signHex);
    r = decodeDerObj.r;
    s = decodeDerObj.s;
  } else {
    r = new BigInteger(signHex.substring(0, 64), 16);
    s = new BigInteger(signHex.substring(64), 16);
  }
  const PA = curve.decodePointHex(publicKey);
  const e = new BigInteger(hashHex, 16);
  const t = r.add(s).mod(n);
  if (t.equals(BigInteger.ZERO))
    return false;
  const x1y1 = G.multiply(s).add(PA.multiply(t));
  const R = e.add(x1y1.getX().toBigInteger()).mod(n);
  return r.equals(R);
}
function getHash(hashHex, publicKey, userId = "1234567812345678") {
  userId = _.utf8ToHex(userId);
  const a = _.leftPad(G.curve.a.toBigInteger().toRadix(16), 64);
  const b = _.leftPad(G.curve.b.toBigInteger().toRadix(16), 64);
  const gx = _.leftPad(G.getX().toBigInteger().toRadix(16), 64);
  const gy = _.leftPad(G.getY().toBigInteger().toRadix(16), 64);
  let px;
  let py;
  if (publicKey.length === 128) {
    px = publicKey.substr(0, 64);
    py = publicKey.substr(64, 64);
  } else {
    const point = G.curve.decodePointHex(publicKey);
    px = _.leftPad(point.getX().toBigInteger().toRadix(16), 64);
    py = _.leftPad(point.getY().toBigInteger().toRadix(16), 64);
  }
  const data2 = _.hexToArray(userId + a + b + gx + gy + px + py);
  const entl = userId.length * 4;
  data2.unshift(entl & 255);
  data2.unshift(entl >> 8 & 255);
  const z = sm3$1(data2);
  return _.arrayToHex(sm3$1(z.concat(_.hexToArray(hashHex))));
}
function getPublicKeyFromPrivateKey(privateKey) {
  const PA = G.multiply(new BigInteger(privateKey, 16));
  const x = _.leftPad(PA.getX().toBigInteger().toString(16), 64);
  const y = _.leftPad(PA.getY().toBigInteger().toString(16), 64);
  return "04" + x + y;
}
function getPoint() {
  const keypair = _.generateKeyPairHex();
  const PA = curve.decodePointHex(keypair.publicKey);
  keypair.k = new BigInteger(keypair.privateKey, 16);
  keypair.x1 = PA.getX().toBigInteger();
  return keypair;
}
var sm2 = {
  generateKeyPairHex: _.generateKeyPairHex,
  compressPublicKeyHex: _.compressPublicKeyHex,
  comparePublicKeyHex: _.comparePublicKeyHex,
  doEncrypt,
  doDecrypt,
  doSignature,
  doVerifySignature,
  getPoint,
  verifyPublicKey: _.verifyPublicKey
};
const { sm3, hmac } = sm3_1$1;
function leftPad(input, num) {
  if (input.length >= num)
    return input;
  return new Array(num - input.length + 1).join("0") + input;
}
function ArrayToHex$1(arr) {
  return arr.map((item) => {
    item = item.toString(16);
    return item.length === 1 ? "0" + item : item;
  }).join("");
}
function hexToArray$1(hexStr) {
  const words2 = [];
  let hexStrLength = hexStr.length;
  if (hexStrLength % 2 !== 0) {
    hexStr = leftPad(hexStr, hexStrLength + 1);
  }
  hexStrLength = hexStr.length;
  for (let i = 0; i < hexStrLength; i += 2) {
    words2.push(parseInt(hexStr.substr(i, 2), 16));
  }
  return words2;
}
function utf8ToArray$1(str) {
  const arr = [];
  for (let i = 0, len = str.length; i < len; i++) {
    const point = str.codePointAt(i);
    if (point <= 127) {
      arr.push(point);
    } else if (point <= 2047) {
      arr.push(192 | point >>> 6);
      arr.push(128 | point & 63);
    } else if (point <= 55295 || point >= 57344 && point <= 65535) {
      arr.push(224 | point >>> 12);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else if (point >= 65536 && point <= 1114111) {
      i++;
      arr.push(240 | point >>> 18 & 28);
      arr.push(128 | point >>> 12 & 63);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else {
      arr.push(point);
      throw new Error("input is not supported");
    }
  }
  return arr;
}
var sm3_1 = function(input, options) {
  input = typeof input === "string" ? utf8ToArray$1(input) : Array.prototype.slice.call(input);
  if (options) {
    const mode = options.mode || "hmac";
    if (mode !== "hmac")
      throw new Error("invalid mode");
    let key = options.key;
    if (!key)
      throw new Error("invalid key");
    key = typeof key === "string" ? hexToArray$1(key) : Array.prototype.slice.call(key);
    return ArrayToHex$1(hmac(input, key));
  }
  return ArrayToHex$1(sm3(input));
};
const DECRYPT = 0;
const ROUND = 32;
const BLOCK = 16;
const Sbox = [
  214,
  144,
  233,
  254,
  204,
  225,
  61,
  183,
  22,
  182,
  20,
  194,
  40,
  251,
  44,
  5,
  43,
  103,
  154,
  118,
  42,
  190,
  4,
  195,
  170,
  68,
  19,
  38,
  73,
  134,
  6,
  153,
  156,
  66,
  80,
  244,
  145,
  239,
  152,
  122,
  51,
  84,
  11,
  67,
  237,
  207,
  172,
  98,
  228,
  179,
  28,
  169,
  201,
  8,
  232,
  149,
  128,
  223,
  148,
  250,
  117,
  143,
  63,
  166,
  71,
  7,
  167,
  252,
  243,
  115,
  23,
  186,
  131,
  89,
  60,
  25,
  230,
  133,
  79,
  168,
  104,
  107,
  129,
  178,
  113,
  100,
  218,
  139,
  248,
  235,
  15,
  75,
  112,
  86,
  157,
  53,
  30,
  36,
  14,
  94,
  99,
  88,
  209,
  162,
  37,
  34,
  124,
  59,
  1,
  33,
  120,
  135,
  212,
  0,
  70,
  87,
  159,
  211,
  39,
  82,
  76,
  54,
  2,
  231,
  160,
  196,
  200,
  158,
  234,
  191,
  138,
  210,
  64,
  199,
  56,
  181,
  163,
  247,
  242,
  206,
  249,
  97,
  21,
  161,
  224,
  174,
  93,
  164,
  155,
  52,
  26,
  85,
  173,
  147,
  50,
  48,
  245,
  140,
  177,
  227,
  29,
  246,
  226,
  46,
  130,
  102,
  202,
  96,
  192,
  41,
  35,
  171,
  13,
  83,
  78,
  111,
  213,
  219,
  55,
  69,
  222,
  253,
  142,
  47,
  3,
  255,
  106,
  114,
  109,
  108,
  91,
  81,
  141,
  27,
  175,
  146,
  187,
  221,
  188,
  127,
  17,
  217,
  92,
  65,
  31,
  16,
  90,
  216,
  10,
  193,
  49,
  136,
  165,
  205,
  123,
  189,
  45,
  116,
  208,
  18,
  184,
  229,
  180,
  176,
  137,
  105,
  151,
  74,
  12,
  150,
  119,
  126,
  101,
  185,
  241,
  9,
  197,
  110,
  198,
  132,
  24,
  240,
  125,
  236,
  58,
  220,
  77,
  32,
  121,
  238,
  95,
  62,
  215,
  203,
  57,
  72
];
const CK = [
  462357,
  472066609,
  943670861,
  1415275113,
  1886879365,
  2358483617,
  2830087869,
  3301692121,
  3773296373,
  4228057617,
  404694573,
  876298825,
  1347903077,
  1819507329,
  2291111581,
  2762715833,
  3234320085,
  3705924337,
  4177462797,
  337322537,
  808926789,
  1280531041,
  1752135293,
  2223739545,
  2695343797,
  3166948049,
  3638552301,
  4110090761,
  269950501,
  741554753,
  1213159005,
  1684763257
];
function hexToArray(str) {
  const arr = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    arr.push(parseInt(str.substr(i, 2), 16));
  }
  return arr;
}
function ArrayToHex(arr) {
  return arr.map((item) => {
    item = item.toString(16);
    return item.length === 1 ? "0" + item : item;
  }).join("");
}
function utf8ToArray(str) {
  const arr = [];
  for (let i = 0, len = str.length; i < len; i++) {
    const point = str.codePointAt(i);
    if (point <= 127) {
      arr.push(point);
    } else if (point <= 2047) {
      arr.push(192 | point >>> 6);
      arr.push(128 | point & 63);
    } else if (point <= 55295 || point >= 57344 && point <= 65535) {
      arr.push(224 | point >>> 12);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else if (point >= 65536 && point <= 1114111) {
      i++;
      arr.push(240 | point >>> 18 & 28);
      arr.push(128 | point >>> 12 & 63);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else {
      arr.push(point);
      throw new Error("input is not supported");
    }
  }
  return arr;
}
function arrayToUtf8(arr) {
  const str = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] >= 240 && arr[i] <= 247) {
      str.push(String.fromCodePoint(((arr[i] & 7) << 18) + ((arr[i + 1] & 63) << 12) + ((arr[i + 2] & 63) << 6) + (arr[i + 3] & 63)));
      i += 3;
    } else if (arr[i] >= 224 && arr[i] <= 239) {
      str.push(String.fromCodePoint(((arr[i] & 15) << 12) + ((arr[i + 1] & 63) << 6) + (arr[i + 2] & 63)));
      i += 2;
    } else if (arr[i] >= 192 && arr[i] <= 223) {
      str.push(String.fromCodePoint(((arr[i] & 31) << 6) + (arr[i + 1] & 63)));
      i++;
    } else {
      str.push(String.fromCodePoint(arr[i]));
    }
  }
  return str.join("");
}
function rotl(x, y) {
  return x << y | x >>> 32 - y;
}
function byteSub(a) {
  return (Sbox[a >>> 24 & 255] & 255) << 24 | (Sbox[a >>> 16 & 255] & 255) << 16 | (Sbox[a >>> 8 & 255] & 255) << 8 | Sbox[a & 255] & 255;
}
function l1(b) {
  return b ^ rotl(b, 2) ^ rotl(b, 10) ^ rotl(b, 18) ^ rotl(b, 24);
}
function l2(b) {
  return b ^ rotl(b, 13) ^ rotl(b, 23);
}
function sms4Crypt(input, output, roundKey) {
  const x = new Array(4);
  const tmp = new Array(4);
  for (let i = 0; i < 4; i++) {
    tmp[0] = input[4 * i] & 255;
    tmp[1] = input[4 * i + 1] & 255;
    tmp[2] = input[4 * i + 2] & 255;
    tmp[3] = input[4 * i + 3] & 255;
    x[i] = tmp[0] << 24 | tmp[1] << 16 | tmp[2] << 8 | tmp[3];
  }
  for (let r = 0, mid; r < 32; r += 4) {
    mid = x[1] ^ x[2] ^ x[3] ^ roundKey[r + 0];
    x[0] ^= l1(byteSub(mid));
    mid = x[2] ^ x[3] ^ x[0] ^ roundKey[r + 1];
    x[1] ^= l1(byteSub(mid));
    mid = x[3] ^ x[0] ^ x[1] ^ roundKey[r + 2];
    x[2] ^= l1(byteSub(mid));
    mid = x[0] ^ x[1] ^ x[2] ^ roundKey[r + 3];
    x[3] ^= l1(byteSub(mid));
  }
  for (let j = 0; j < 16; j += 4) {
    output[j] = x[3 - j / 4] >>> 24 & 255;
    output[j + 1] = x[3 - j / 4] >>> 16 & 255;
    output[j + 2] = x[3 - j / 4] >>> 8 & 255;
    output[j + 3] = x[3 - j / 4] & 255;
  }
}
function sms4KeyExt(key, roundKey, cryptFlag) {
  const x = new Array(4);
  const tmp = new Array(4);
  for (let i = 0; i < 4; i++) {
    tmp[0] = key[0 + 4 * i] & 255;
    tmp[1] = key[1 + 4 * i] & 255;
    tmp[2] = key[2 + 4 * i] & 255;
    tmp[3] = key[3 + 4 * i] & 255;
    x[i] = tmp[0] << 24 | tmp[1] << 16 | tmp[2] << 8 | tmp[3];
  }
  x[0] ^= 2746333894;
  x[1] ^= 1453994832;
  x[2] ^= 1736282519;
  x[3] ^= 2993693404;
  for (let r = 0, mid; r < 32; r += 4) {
    mid = x[1] ^ x[2] ^ x[3] ^ CK[r + 0];
    roundKey[r + 0] = x[0] ^= l2(byteSub(mid));
    mid = x[2] ^ x[3] ^ x[0] ^ CK[r + 1];
    roundKey[r + 1] = x[1] ^= l2(byteSub(mid));
    mid = x[3] ^ x[0] ^ x[1] ^ CK[r + 2];
    roundKey[r + 2] = x[2] ^= l2(byteSub(mid));
    mid = x[0] ^ x[1] ^ x[2] ^ CK[r + 3];
    roundKey[r + 3] = x[3] ^= l2(byteSub(mid));
  }
  if (cryptFlag === DECRYPT) {
    for (let r = 0, mid; r < 16; r++) {
      mid = roundKey[r];
      roundKey[r] = roundKey[31 - r];
      roundKey[31 - r] = mid;
    }
  }
}
function sm4(inArray, key, cryptFlag, {
  padding = "pkcs#7",
  mode,
  iv = [],
  output = "string"
} = {}) {
  if (mode === "cbc") {
    if (typeof iv === "string")
      iv = hexToArray(iv);
    if (iv.length !== 128 / 8) {
      throw new Error("iv is invalid");
    }
  }
  if (typeof key === "string")
    key = hexToArray(key);
  if (key.length !== 128 / 8) {
    throw new Error("key is invalid");
  }
  if (typeof inArray === "string") {
    if (cryptFlag !== DECRYPT) {
      inArray = utf8ToArray(inArray);
    } else {
      inArray = hexToArray(inArray);
    }
  } else {
    inArray = [...inArray];
  }
  if ((padding === "pkcs#5" || padding === "pkcs#7") && cryptFlag !== DECRYPT) {
    const paddingCount = BLOCK - inArray.length % BLOCK;
    for (let i = 0; i < paddingCount; i++)
      inArray.push(paddingCount);
  }
  const roundKey = new Array(ROUND);
  sms4KeyExt(key, roundKey, cryptFlag);
  const outArray = [];
  let lastVector = iv;
  let restLen = inArray.length;
  let point = 0;
  while (restLen >= BLOCK) {
    const input = inArray.slice(point, point + 16);
    const output2 = new Array(16);
    if (mode === "cbc") {
      for (let i = 0; i < BLOCK; i++) {
        if (cryptFlag !== DECRYPT) {
          input[i] ^= lastVector[i];
        }
      }
    }
    sms4Crypt(input, output2, roundKey);
    for (let i = 0; i < BLOCK; i++) {
      if (mode === "cbc") {
        if (cryptFlag === DECRYPT) {
          output2[i] ^= lastVector[i];
        }
      }
      outArray[point + i] = output2[i];
    }
    if (mode === "cbc") {
      if (cryptFlag !== DECRYPT) {
        lastVector = output2;
      } else {
        lastVector = input;
      }
    }
    restLen -= BLOCK;
    point += BLOCK;
  }
  if ((padding === "pkcs#5" || padding === "pkcs#7") && cryptFlag === DECRYPT) {
    const len = outArray.length;
    const paddingCount = outArray[len - 1];
    for (let i = 1; i <= paddingCount; i++) {
      if (outArray[len - i] !== paddingCount)
        throw new Error("padding is invalid");
    }
    outArray.splice(len - paddingCount, paddingCount);
  }
  if (output !== "array") {
    if (cryptFlag !== DECRYPT) {
      return ArrayToHex(outArray);
    } else {
      return arrayToUtf8(outArray);
    }
  } else {
    return outArray;
  }
}
var sm4_1 = {
  encrypt(inArray, key, options) {
    return sm4(inArray, key, 1, options);
  },
  decrypt(inArray, key, options) {
    return sm4(inArray, key, 0, options);
  }
};
var src = {
  sm2,
  sm3: sm3_1,
  sm4: sm4_1
};
typeof TextDecoder === "function" ? new TextDecoder() : void 0;
typeof TextEncoder === "function" ? new TextEncoder() : void 0;
const b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64chs = Array.prototype.slice.call(b64ch);
((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
String.fromCharCode.bind(String);
typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const SwalToast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2e3,
  timerProgressBar: false,
  didOpen: (toast2) => {
    toast2.addEventListener("mouseenter", Swal.stopTimer);
    toast2.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
const _Notify = class {
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  information(title, icon) {
    return Swal.fire({
      title,
      icon,
      timer: 2e3,
      showConfirmButton: false,
      showClass: {
        popup: "animate__animated animate__fadeIn"
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut"
      }
    });
  }
  info(text) {
    return this.information(text, "info");
  }
  error(text) {
    return this.information(text, "error");
  }
  warning(text) {
    return this.information(text, "warning");
  }
  success(text) {
    return this.information(text, "success");
  }
  question(text) {
    return this.information(text, "question");
  }
};
let Notify = _Notify;
__publicField(Notify, "instance", new _Notify());
Notify.getInstance();
const _Toast = class {
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  information(title, icon) {
    return SwalToast.fire({
      icon,
      title
    });
  }
  info(text) {
    return this.information(text, "info");
  }
  error(text) {
    return this.information(text, "error");
  }
  warning(text) {
    return this.information(text, "warning");
  }
  success(text) {
    return this.information(text, "success");
  }
  question(text) {
    return this.information(text, "question");
  }
};
let Toast = _Toast;
__publicField(Toast, "instance", new _Toast());
Toast.getInstance();
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var hookCallback;
function hooks() {
  return hookCallback.apply(null, arguments);
}
function setHookCallback(callback) {
  hookCallback = callback;
}
function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function isObject(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function hasOwnProp(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
function isObjectEmpty(obj) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj).length === 0;
  } else {
    var k;
    for (k in obj) {
      if (hasOwnProp(obj, k)) {
        return false;
      }
    }
    return true;
  }
}
function isUndefined(input) {
  return input === void 0;
}
function isNumber(input) {
  return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
}
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
function map(arr, fn) {
  var res = [], i, arrLen = arr.length;
  for (i = 0; i < arrLen; ++i) {
    res.push(fn(arr[i], i));
  }
  return res;
}
function extend(a, b) {
  for (var i in b) {
    if (hasOwnProp(b, i)) {
      a[i] = b[i];
    }
  }
  if (hasOwnProp(b, "toString")) {
    a.toString = b.toString;
  }
  if (hasOwnProp(b, "valueOf")) {
    a.valueOf = b.valueOf;
  }
  return a;
}
function createUTC(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, true).utc();
}
function defaultParsingFlags() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags(m) {
  if (m._pf == null) {
    m._pf = defaultParsingFlags();
  }
  return m._pf;
}
var some;
if (Array.prototype.some) {
  some = Array.prototype.some;
} else {
  some = function(fun) {
    var t = Object(this), len = t.length >>> 0, i;
    for (i = 0; i < len; i++) {
      if (i in t && fun.call(this, t[i], i, t)) {
        return true;
      }
    }
    return false;
  };
}
function isValid(m) {
  if (m._isValid == null) {
    var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
      return i != null;
    }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
    if (m._strict) {
      isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
    }
    if (Object.isFrozen == null || !Object.isFrozen(m)) {
      m._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }
  return m._isValid;
}
function createInvalid(flags) {
  var m = createUTC(NaN);
  if (flags != null) {
    extend(getParsingFlags(m), flags);
  } else {
    getParsingFlags(m).userInvalidated = true;
  }
  return m;
}
var momentProperties = hooks.momentProperties = [], updateInProgress = false;
function copyConfig(to2, from2) {
  var i, prop, val, momentPropertiesLen = momentProperties.length;
  if (!isUndefined(from2._isAMomentObject)) {
    to2._isAMomentObject = from2._isAMomentObject;
  }
  if (!isUndefined(from2._i)) {
    to2._i = from2._i;
  }
  if (!isUndefined(from2._f)) {
    to2._f = from2._f;
  }
  if (!isUndefined(from2._l)) {
    to2._l = from2._l;
  }
  if (!isUndefined(from2._strict)) {
    to2._strict = from2._strict;
  }
  if (!isUndefined(from2._tzm)) {
    to2._tzm = from2._tzm;
  }
  if (!isUndefined(from2._isUTC)) {
    to2._isUTC = from2._isUTC;
  }
  if (!isUndefined(from2._offset)) {
    to2._offset = from2._offset;
  }
  if (!isUndefined(from2._pf)) {
    to2._pf = getParsingFlags(from2);
  }
  if (!isUndefined(from2._locale)) {
    to2._locale = from2._locale;
  }
  if (momentPropertiesLen > 0) {
    for (i = 0; i < momentPropertiesLen; i++) {
      prop = momentProperties[i];
      val = from2[prop];
      if (!isUndefined(val)) {
        to2[prop] = val;
      }
    }
  }
  return to2;
}
function Moment(config) {
  copyConfig(this, config);
  this._d = new Date(config._d != null ? config._d.getTime() : NaN);
  if (!this.isValid()) {
    this._d = new Date(NaN);
  }
  if (updateInProgress === false) {
    updateInProgress = true;
    hooks.updateOffset(this);
    updateInProgress = false;
  }
}
function isMoment(obj) {
  return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
}
function warn(msg) {
  if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
    console.warn("Deprecation warning: " + msg);
  }
}
function deprecate(msg, fn) {
  var firstTime = true;
  return extend(function() {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(null, msg);
    }
    if (firstTime) {
      var args = [], arg, i, key, argLen = arguments.length;
      for (i = 0; i < argLen; i++) {
        arg = "";
        if (typeof arguments[i] === "object") {
          arg += "\n[" + i + "] ";
          for (key in arguments[0]) {
            if (hasOwnProp(arguments[0], key)) {
              arg += key + ": " + arguments[0][key] + ", ";
            }
          }
          arg = arg.slice(0, -2);
        } else {
          arg = arguments[i];
        }
        args.push(arg);
      }
      warn(
        msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
      );
      firstTime = false;
    }
    return fn.apply(this, arguments);
  }, fn);
}
var deprecations = {};
function deprecateSimple(name, msg) {
  if (hooks.deprecationHandler != null) {
    hooks.deprecationHandler(name, msg);
  }
  if (!deprecations[name]) {
    warn(msg);
    deprecations[name] = true;
  }
}
hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;
function isFunction(input) {
  return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
}
function set(config) {
  var prop, i;
  for (i in config) {
    if (hasOwnProp(config, i)) {
      prop = config[i];
      if (isFunction(prop)) {
        this[i] = prop;
      } else {
        this["_" + i] = prop;
      }
    }
  }
  this._config = config;
  this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function mergeConfigs(parentConfig, childConfig) {
  var res = extend({}, parentConfig), prop;
  for (prop in childConfig) {
    if (hasOwnProp(childConfig, prop)) {
      if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
        res[prop] = {};
        extend(res[prop], parentConfig[prop]);
        extend(res[prop], childConfig[prop]);
      } else if (childConfig[prop] != null) {
        res[prop] = childConfig[prop];
      } else {
        delete res[prop];
      }
    }
  }
  for (prop in parentConfig) {
    if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
      res[prop] = extend({}, res[prop]);
    }
  }
  return res;
}
function Locale(config) {
  if (config != null) {
    this.set(config);
  }
}
var keys;
if (Object.keys) {
  keys = Object.keys;
} else {
  keys = function(obj) {
    var i, res = [];
    for (i in obj) {
      if (hasOwnProp(obj, i)) {
        res.push(i);
      }
    }
    return res;
  };
}
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar(key, mom, now2) {
  var output = this._calendar[key] || this._calendar["sameElse"];
  return isFunction(output) ? output.call(mom, now2) : output;
}
function zeroFill(number, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
  return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(token2, padded, ordinal2, callback) {
  var func = callback;
  if (typeof callback === "string") {
    func = function() {
      return this[callback]();
    };
  }
  if (token2) {
    formatTokenFunctions[token2] = func;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function() {
      return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal2) {
    formatTokenFunctions[ordinal2] = function() {
      return this.localeData().ordinal(
        func.apply(this, arguments),
        token2
      );
    };
  }
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function makeFormatFunction(format2) {
  var array = format2.match(formattingTokens), i, length;
  for (i = 0, length = array.length; i < length; i++) {
    if (formatTokenFunctions[array[i]]) {
      array[i] = formatTokenFunctions[array[i]];
    } else {
      array[i] = removeFormattingTokens(array[i]);
    }
  }
  return function(mom) {
    var output = "", i2;
    for (i2 = 0; i2 < length; i2++) {
      output += isFunction(array[i2]) ? array[i2].call(mom, format2) : array[i2];
    }
    return output;
  };
}
function formatMoment(m, format2) {
  if (!m.isValid()) {
    return m.localeData().invalidDate();
  }
  format2 = expandFormat(format2, m.localeData());
  formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
  return formatFunctions[format2](m);
}
function expandFormat(format2, locale2) {
  var i = 5;
  function replaceLongDateFormatTokens(input) {
    return locale2.longDateFormat(input) || input;
  }
  localFormattingTokens.lastIndex = 0;
  while (i >= 0 && localFormattingTokens.test(format2)) {
    format2 = format2.replace(
      localFormattingTokens,
      replaceLongDateFormatTokens
    );
    localFormattingTokens.lastIndex = 0;
    i -= 1;
  }
  return format2;
}
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat(key) {
  var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
  if (format2 || !formatUpper) {
    return format2;
  }
  this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
    if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
      return tok.slice(1);
    }
    return tok;
  }).join("");
  return this._longDateFormat[key];
}
var defaultInvalidDate = "Invalid date";
function invalidDate() {
  return this._invalidDate;
}
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(number) {
  return this._ordinal.replace("%d", number);
}
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime(number, withoutSuffix, string, isFuture) {
  var output = this._relativeTime[string];
  return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
}
function pastFuture(diff2, output) {
  var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
  return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
}
var aliases = {};
function addUnitAlias(unit, shorthand) {
  var lowerCase = unit.toLowerCase();
  aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
}
function normalizeUnits(units) {
  return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
}
function normalizeObjectUnits(inputObject) {
  var normalizedInput = {}, normalizedProp, prop;
  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var priorities = {};
function addUnitPriority(unit, priority) {
  priorities[unit] = priority;
}
function getPrioritizedUnits(unitsObj) {
  var units = [], u;
  for (u in unitsObj) {
    if (hasOwnProp(unitsObj, u)) {
      units.push({ unit: u, priority: priorities[u] });
    }
  }
  units.sort(function(a, b) {
    return a.priority - b.priority;
  });
  return units;
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function absFloor(number) {
  if (number < 0) {
    return Math.ceil(number) || 0;
  } else {
    return Math.floor(number);
  }
}
function toInt(argumentForCoercion) {
  var coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
function makeGetSet(unit, keepTime) {
  return function(value) {
    if (value != null) {
      set$1(this, unit, value);
      hooks.updateOffset(this, keepTime);
      return this;
    } else {
      return get(this, unit);
    }
  };
}
function get(mom, unit) {
  return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
}
function set$1(mom, unit, value) {
  if (mom.isValid() && !isNaN(value)) {
    if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
      value = toInt(value);
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
        value,
        mom.month(),
        daysInMonth(value, mom.month())
      );
    } else {
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
  }
}
function stringGet(units) {
  units = normalizeUnits(units);
  if (isFunction(this[units])) {
    return this[units]();
  }
  return this;
}
function stringSet(units, value) {
  if (typeof units === "object") {
    units = normalizeObjectUnits(units);
    var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
    for (i = 0; i < prioritizedLen; i++) {
      this[prioritized[i].unit](units[prioritized[i].unit]);
    }
  } else {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units](value);
    }
  }
  return this;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
regexes = {};
function addRegexToken(token2, regex, strictRegex) {
  regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
    return isStrict && strictRegex ? strictRegex : regex;
  };
}
function getParseRegexForToken(token2, config) {
  if (!hasOwnProp(regexes, token2)) {
    return new RegExp(unescapeFormat(token2));
  }
  return regexes[token2](config._strict, config._locale);
}
function unescapeFormat(s) {
  return regexEscape(
    s.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
      }
    )
  );
}
function regexEscape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var tokens = {};
function addParseToken(token2, callback) {
  var i, func = callback, tokenLen;
  if (typeof token2 === "string") {
    token2 = [token2];
  }
  if (isNumber(callback)) {
    func = function(input, array) {
      array[callback] = toInt(input);
    };
  }
  tokenLen = token2.length;
  for (i = 0; i < tokenLen; i++) {
    tokens[token2[i]] = func;
  }
}
function addWeekParseToken(token2, callback) {
  addParseToken(token2, function(input, array, config, token3) {
    config._w = config._w || {};
    callback(input, config._w, config, token3);
  });
}
function addTimeToArrayFromToken(token2, input, config) {
  if (input != null && hasOwnProp(tokens, token2)) {
    tokens[token2](input, config._a, config, token2);
  }
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function mod(n2, x) {
  return (n2 % x + x) % x;
}
var indexOf;
if (Array.prototype.indexOf) {
  indexOf = Array.prototype.indexOf;
} else {
  indexOf = function(o) {
    var i;
    for (i = 0; i < this.length; ++i) {
      if (this[i] === o) {
        return i;
      }
    }
    return -1;
  };
}
function daysInMonth(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  var modMonth = mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
addFormatToken("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken("MMM", 0, 0, function(format2) {
  return this.localeData().monthsShort(this, format2);
});
addFormatToken("MMMM", 0, 0, function(format2) {
  return this.localeData().months(this, format2);
});
addUnitAlias("month", "M");
addUnitPriority("month", 8);
addRegexToken("M", match1to2);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", function(isStrict, locale2) {
  return locale2.monthsShortRegex(isStrict);
});
addRegexToken("MMMM", function(isStrict, locale2) {
  return locale2.monthsRegex(isStrict);
});
addParseToken(["M", "MM"], function(input, array) {
  array[MONTH] = toInt(input) - 1;
});
addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
  var month = config._locale.monthsParse(input, token2, config._strict);
  if (month != null) {
    array[MONTH] = month;
  } else {
    getParsingFlags(config).invalidMonth = input;
  }
});
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(m, format2) {
  if (!m) {
    return isArray(this._months) ? this._months : this._months["standalone"];
  }
  return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
}
function localeMonthsShort(m, format2) {
  if (!m) {
    return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
  }
  return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
}
function handleStrictParse(monthName, format2, strict) {
  var i, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i = 0; i < 12; ++i) {
      mom = createUTC([2e3, i]);
      this._shortMonthsParse[i] = this.monthsShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeMonthsParse(monthName, format2, strict) {
  var i, mom, regex;
  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format2, strict);
  }
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }
  for (i = 0; i < 12; i++) {
    mom = createUTC([2e3, i]);
    if (strict && !this._longMonthsParse[i]) {
      this._longMonthsParse[i] = new RegExp(
        "^" + this.months(mom, "").replace(".", "") + "$",
        "i"
      );
      this._shortMonthsParse[i] = new RegExp(
        "^" + this.monthsShort(mom, "").replace(".", "") + "$",
        "i"
      );
    }
    if (!strict && !this._monthsParse[i]) {
      regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
      this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
      return i;
    } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
      return i;
    } else if (!strict && this._monthsParse[i].test(monthName)) {
      return i;
    }
  }
}
function setMonth(mom, value) {
  var dayOfMonth;
  if (!mom.isValid()) {
    return mom;
  }
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      value = toInt(value);
    } else {
      value = mom.localeData().monthsParse(value);
      if (!isNumber(value)) {
        return mom;
      }
    }
  }
  dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
  mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
  return mom;
}
function getSetMonth(value) {
  if (value != null) {
    setMonth(this, value);
    hooks.updateOffset(this, true);
    return this;
  } else {
    return get(this, "Month");
  }
}
function getDaysInMonth() {
  return daysInMonth(this.year(), this.month());
}
function monthsShortRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}
function monthsRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
}
function computeMonthsParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
  for (i = 0; i < 12; i++) {
    mom = createUTC([2e3, i]);
    shortPieces.push(this.monthsShort(mom, ""));
    longPieces.push(this.months(mom, ""));
    mixedPieces.push(this.months(mom, ""));
    mixedPieces.push(this.monthsShort(mom, ""));
  }
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  for (i = 0; i < 12; i++) {
    shortPieces[i] = regexEscape(shortPieces[i]);
    longPieces[i] = regexEscape(longPieces[i]);
  }
  for (i = 0; i < 24; i++) {
    mixedPieces[i] = regexEscape(mixedPieces[i]);
  }
  this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._monthsShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
}
addFormatToken("Y", 0, 0, function() {
  var y = this.year();
  return y <= 9999 ? zeroFill(y, 4) : "+" + y;
});
addFormatToken(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken(0, ["YYYY", 4], 0, "year");
addFormatToken(0, ["YYYYY", 5], 0, "year");
addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
addUnitAlias("year", "y");
addUnitPriority("year", 1);
addRegexToken("Y", matchSigned);
addRegexToken("YY", match1to2, match2);
addRegexToken("YYYY", match1to4, match4);
addRegexToken("YYYYY", match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);
addParseToken(["YYYYY", "YYYYYY"], YEAR);
addParseToken("YYYY", function(input, array) {
  array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken("YY", function(input, array) {
  array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken("Y", function(input, array) {
  array[YEAR] = parseInt(input, 10);
});
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
hooks.parseTwoDigitYear = function(input) {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
};
var getSetYear = makeGetSet("FullYear", true);
function getIsLeapYear() {
  return isLeapYear(this.year());
}
function createDate(y, m, d, h, M, s, ms) {
  var date;
  if (y < 100 && y >= 0) {
    date = new Date(y + 400, m, d, h, M, s, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y);
    }
  } else {
    date = new Date(y, m, d, h, M, s, ms);
  }
  return date;
}
function createUTCDate(y) {
  var date, args;
  if (y < 100 && y >= 0) {
    args = Array.prototype.slice.call(arguments);
    args[0] = y + 400;
    date = new Date(Date.UTC.apply(null, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
  } else {
    date = new Date(Date.UTC.apply(null, arguments));
  }
  return date;
}
function firstWeekOffset(year, dow, doy) {
  var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
  var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear(mom, dow, doy) {
  var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
  if (week < 1) {
    resYear = mom.year() - 1;
    resWeek = week + weeksInYear(resYear, dow, doy);
  } else if (week > weeksInYear(mom.year(), dow, doy)) {
    resWeek = week - weeksInYear(mom.year(), dow, doy);
    resYear = mom.year() + 1;
  } else {
    resYear = mom.year();
    resWeek = week;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear(year, dow, doy) {
  var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addUnitAlias("week", "w");
addUnitAlias("isoWeek", "W");
addUnitPriority("week", 5);
addUnitPriority("isoWeek", 5);
addRegexToken("w", match1to2);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2);
addRegexToken("WW", match1to2, match2);
addWeekParseToken(
  ["w", "ww", "W", "WW"],
  function(input, week, config, token2) {
    week[token2.substr(0, 1)] = toInt(input);
  }
);
function localeWeek(mom) {
  return weekOfYear(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
  dow: 0,
  doy: 6
};
function localeFirstDayOfWeek() {
  return this._week.dow;
}
function localeFirstDayOfYear() {
  return this._week.doy;
}
function getSetWeek(input) {
  var week = this.localeData().week(this);
  return input == null ? week : this.add((input - week) * 7, "d");
}
function getSetISOWeek(input) {
  var week = weekOfYear(this, 1, 4).week;
  return input == null ? week : this.add((input - week) * 7, "d");
}
addFormatToken("d", 0, "do", "day");
addFormatToken("dd", 0, 0, function(format2) {
  return this.localeData().weekdaysMin(this, format2);
});
addFormatToken("ddd", 0, 0, function(format2) {
  return this.localeData().weekdaysShort(this, format2);
});
addFormatToken("dddd", 0, 0, function(format2) {
  return this.localeData().weekdays(this, format2);
});
addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");
addUnitAlias("day", "d");
addUnitAlias("weekday", "e");
addUnitAlias("isoWeekday", "E");
addUnitPriority("day", 11);
addUnitPriority("weekday", 11);
addUnitPriority("isoWeekday", 11);
addRegexToken("d", match1to2);
addRegexToken("e", match1to2);
addRegexToken("E", match1to2);
addRegexToken("dd", function(isStrict, locale2) {
  return locale2.weekdaysMinRegex(isStrict);
});
addRegexToken("ddd", function(isStrict, locale2) {
  return locale2.weekdaysShortRegex(isStrict);
});
addRegexToken("dddd", function(isStrict, locale2) {
  return locale2.weekdaysRegex(isStrict);
});
addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
  var weekday = config._locale.weekdaysParse(input, token2, config._strict);
  if (weekday != null) {
    week.d = weekday;
  } else {
    getParsingFlags(config).invalidWeekday = input;
  }
});
addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
  week[token2] = toInt(input);
});
function parseWeekday(input, locale2) {
  if (typeof input !== "string") {
    return input;
  }
  if (!isNaN(input)) {
    return parseInt(input, 10);
  }
  input = locale2.weekdaysParse(input);
  if (typeof input === "number") {
    return input;
  }
  return null;
}
function parseIsoWeekday(input, locale2) {
  if (typeof input === "string") {
    return locale2.weekdaysParse(input) % 7 || 7;
  }
  return isNaN(input) ? null : input;
}
function shiftWeekdays(ws, n2) {
  return ws.slice(n2, 7).concat(ws.slice(0, n2));
}
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(m, format2) {
  var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
  return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
}
function localeWeekdaysShort(m) {
  return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}
function localeWeekdaysMin(m) {
  return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}
function handleStrictParse$1(weekdayName, format2, strict) {
  var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._minWeekdaysParse = [];
    for (i = 0; i < 7; ++i) {
      mom = createUTC([2e3, 1]).day(i);
      this._minWeekdaysParse[i] = this.weekdaysMin(
        mom,
        ""
      ).toLocaleLowerCase();
      this._shortWeekdaysParse[i] = this.weekdaysShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeWeekdaysParse(weekdayName, format2, strict) {
  var i, mom, regex;
  if (this._weekdaysParseExact) {
    return handleStrictParse$1.call(this, weekdayName, format2, strict);
  }
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._minWeekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._fullWeekdaysParse = [];
  }
  for (i = 0; i < 7; i++) {
    mom = createUTC([2e3, 1]).day(i);
    if (strict && !this._fullWeekdaysParse[i]) {
      this._fullWeekdaysParse[i] = new RegExp(
        "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._shortWeekdaysParse[i] = new RegExp(
        "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._minWeekdaysParse[i] = new RegExp(
        "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
    }
    if (!this._weekdaysParse[i]) {
      regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
      this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
      return i;
    }
  }
}
function getSetDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  if (input != null) {
    input = parseWeekday(input, this.localeData());
    return this.add(input - day, "d");
  } else {
    return day;
  }
}
function getSetLocaleDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return input == null ? weekday : this.add(input - weekday, "d");
}
function getSetISODayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    var weekday = parseIsoWeekday(input, this.localeData());
    return this.day(this.day() % 7 ? weekday : weekday - 7);
  } else {
    return this.day() || 7;
  }
}
function weekdaysRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysStrictRegex;
    } else {
      return this._weekdaysRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      this._weekdaysRegex = defaultWeekdaysRegex;
    }
    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }
}
function weekdaysShortRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysShortStrictRegex;
    } else {
      return this._weekdaysShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysShortRegex")) {
      this._weekdaysShortRegex = defaultWeekdaysShortRegex;
    }
    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }
}
function weekdaysMinRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysMinStrictRegex;
    } else {
      return this._weekdaysMinRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysMinRegex")) {
      this._weekdaysMinRegex = defaultWeekdaysMinRegex;
    }
    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }
}
function computeWeekdaysParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
  for (i = 0; i < 7; i++) {
    mom = createUTC([2e3, 1]).day(i);
    minp = regexEscape(this.weekdaysMin(mom, ""));
    shortp = regexEscape(this.weekdaysShort(mom, ""));
    longp = regexEscape(this.weekdays(mom, ""));
    minPieces.push(minp);
    shortPieces.push(shortp);
    longPieces.push(longp);
    mixedPieces.push(minp);
    mixedPieces.push(shortp);
    mixedPieces.push(longp);
  }
  minPieces.sort(cmpLenRev);
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._weekdaysShortRegex = this._weekdaysRegex;
  this._weekdaysMinRegex = this._weekdaysRegex;
  this._weekdaysStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._weekdaysShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
  this._weekdaysMinStrictRegex = new RegExp(
    "^(" + minPieces.join("|") + ")",
    "i"
  );
}
function hFormat() {
  return this.hours() % 12 || 12;
}
function kFormat() {
  return this.hours() || 24;
}
addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, hFormat);
addFormatToken("k", ["kk", 2], 0, kFormat);
addFormatToken("hmm", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});
addFormatToken("hmmss", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
addFormatToken("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2);
});
addFormatToken("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
function meridiem(token2, lowercase) {
  addFormatToken(token2, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      lowercase
    );
  });
}
meridiem("a", true);
meridiem("A", false);
addUnitAlias("hour", "h");
addUnitPriority("hour", 13);
function matchMeridiem(isStrict, locale2) {
  return locale2._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2);
addRegexToken("h", match1to2);
addRegexToken("k", match1to2);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);
addRegexToken("kk", match1to2, match2);
addRegexToken("hmm", match3to4);
addRegexToken("hmmss", match5to6);
addRegexToken("Hmm", match3to4);
addRegexToken("Hmmss", match5to6);
addParseToken(["H", "HH"], HOUR);
addParseToken(["k", "kk"], function(input, array, config) {
  var kInput = toInt(input);
  array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(["a", "A"], function(input, array, config) {
  config._isPm = config._locale.isPM(input);
  config._meridiem = input;
});
addParseToken(["h", "hh"], function(input, array, config) {
  array[HOUR] = toInt(input);
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
  getParsingFlags(config).bigHour = true;
});
addParseToken("Hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
});
addParseToken("Hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
});
function localeIsPM(input) {
  return (input + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
function localeMeridiem(hours2, minutes2, isLower) {
  if (hours2 > 11) {
    return isLower ? "pm" : "PM";
  } else {
    return isLower ? "am" : "AM";
  }
}
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
};
var locales = {}, localeFamilies = {}, globalLocale;
function commonPrefix(arr1, arr2) {
  var i, minl = Math.min(arr1.length, arr2.length);
  for (i = 0; i < minl; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return i;
    }
  }
  return minl;
}
function normalizeLocale(key) {
  return key ? key.toLowerCase().replace("_", "-") : key;
}
function chooseLocale(names) {
  var i = 0, j, next, locale2, split;
  while (i < names.length) {
    split = normalizeLocale(names[i]).split("-");
    j = split.length;
    next = normalizeLocale(names[i + 1]);
    next = next ? next.split("-") : null;
    while (j > 0) {
      locale2 = loadLocale(split.slice(0, j).join("-"));
      if (locale2) {
        return locale2;
      }
      if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
        break;
      }
      j--;
    }
    i++;
  }
  return globalLocale;
}
function isLocaleNameSane(name) {
  return name.match("^[^/\\\\]*$") != null;
}
function loadLocale(name) {
  var oldLocale = null, aliasedRequire;
  if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
    try {
      oldLocale = globalLocale._abbr;
      aliasedRequire = require;
      aliasedRequire("./locale/" + name);
      getSetGlobalLocale(oldLocale);
    } catch (e) {
      locales[name] = null;
    }
  }
  return locales[name];
}
function getSetGlobalLocale(key, values) {
  var data2;
  if (key) {
    if (isUndefined(values)) {
      data2 = getLocale(key);
    } else {
      data2 = defineLocale(key, values);
    }
    if (data2) {
      globalLocale = data2;
    } else {
      if (typeof console !== "undefined" && console.warn) {
        console.warn(
          "Locale " + key + " not found. Did you forget to load it?"
        );
      }
    }
  }
  return globalLocale._abbr;
}
function defineLocale(name, config) {
  if (config !== null) {
    var locale2, parentConfig = baseConfig;
    config.abbr = name;
    if (locales[name] != null) {
      deprecateSimple(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      );
      parentConfig = locales[name]._config;
    } else if (config.parentLocale != null) {
      if (locales[config.parentLocale] != null) {
        parentConfig = locales[config.parentLocale]._config;
      } else {
        locale2 = loadLocale(config.parentLocale);
        if (locale2 != null) {
          parentConfig = locale2._config;
        } else {
          if (!localeFamilies[config.parentLocale]) {
            localeFamilies[config.parentLocale] = [];
          }
          localeFamilies[config.parentLocale].push({
            name,
            config
          });
          return null;
        }
      }
    }
    locales[name] = new Locale(mergeConfigs(parentConfig, config));
    if (localeFamilies[name]) {
      localeFamilies[name].forEach(function(x) {
        defineLocale(x.name, x.config);
      });
    }
    getSetGlobalLocale(name);
    return locales[name];
  } else {
    delete locales[name];
    return null;
  }
}
function updateLocale(name, config) {
  if (config != null) {
    var locale2, tmpLocale, parentConfig = baseConfig;
    if (locales[name] != null && locales[name].parentLocale != null) {
      locales[name].set(mergeConfigs(locales[name]._config, config));
    } else {
      tmpLocale = loadLocale(name);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config = mergeConfigs(parentConfig, config);
      if (tmpLocale == null) {
        config.abbr = name;
      }
      locale2 = new Locale(config);
      locale2.parentLocale = locales[name];
      locales[name] = locale2;
    }
    getSetGlobalLocale(name);
  } else {
    if (locales[name] != null) {
      if (locales[name].parentLocale != null) {
        locales[name] = locales[name].parentLocale;
        if (name === getSetGlobalLocale()) {
          getSetGlobalLocale(name);
        }
      } else if (locales[name] != null) {
        delete locales[name];
      }
    }
  }
  return locales[name];
}
function getLocale(key) {
  var locale2;
  if (key && key._locale && key._locale._abbr) {
    key = key._locale._abbr;
  }
  if (!key) {
    return globalLocale;
  }
  if (!isArray(key)) {
    locale2 = loadLocale(key);
    if (locale2) {
      return locale2;
    }
    key = [key];
  }
  return chooseLocale(key);
}
function listLocales() {
  return keys(locales);
}
function checkOverflow(m) {
  var overflow, a = m._a;
  if (a && getParsingFlags(m).overflow === -2) {
    overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
    if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
      overflow = DATE;
    }
    if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
      overflow = WEEK;
    }
    if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY;
    }
    getParsingFlags(m).overflow = overflow;
  }
  return m;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], isoTimes = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO(config) {
  var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
  if (match) {
    getParsingFlags(config).iso = true;
    for (i = 0, l = isoDatesLen; i < l; i++) {
      if (isoDates[i][1].exec(match[1])) {
        dateFormat = isoDates[i][0];
        allowTime = isoDates[i][2] !== false;
        break;
      }
    }
    if (dateFormat == null) {
      config._isValid = false;
      return;
    }
    if (match[3]) {
      for (i = 0, l = isoTimesLen; i < l; i++) {
        if (isoTimes[i][1].exec(match[3])) {
          timeFormat = (match[2] || " ") + isoTimes[i][0];
          break;
        }
      }
      if (timeFormat == null) {
        config._isValid = false;
        return;
      }
    }
    if (!allowTime && timeFormat != null) {
      config._isValid = false;
      return;
    }
    if (match[4]) {
      if (tzRegex.exec(match[4])) {
        tzFormat = "Z";
      } else {
        config._isValid = false;
        return;
      }
    }
    config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
    configFromStringAndFormat(config);
  } else {
    config._isValid = false;
  }
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = [
    untruncateYear(yearStr),
    defaultLocaleMonthsShort.indexOf(monthStr),
    parseInt(dayStr, 10),
    parseInt(hourStr, 10),
    parseInt(minuteStr, 10)
  ];
  if (secondStr) {
    result.push(parseInt(secondStr, 10));
  }
  return result;
}
function untruncateYear(yearStr) {
  var year = parseInt(yearStr, 10);
  if (year <= 49) {
    return 2e3 + year;
  } else if (year <= 999) {
    return 1900 + year;
  }
  return year;
}
function preprocessRFC2822(s) {
  return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday(weekdayStr, parsedInput, config) {
  if (weekdayStr) {
    var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
      parsedInput[0],
      parsedInput[1],
      parsedInput[2]
    ).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags(config).weekdayMismatch = true;
      config._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
    return h * 60 + m;
  }
}
function configFromRFC2822(config) {
  var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
  if (match) {
    parsedArray = extractFromRFC2822Strings(
      match[4],
      match[3],
      match[2],
      match[5],
      match[6],
      match[7]
    );
    if (!checkWeekday(match[1], parsedArray, config)) {
      return;
    }
    config._a = parsedArray;
    config._tzm = calculateOffset(match[8], match[9], match[10]);
    config._d = createUTCDate.apply(null, config._a);
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    getParsingFlags(config).rfc2822 = true;
  } else {
    config._isValid = false;
  }
}
function configFromString(config) {
  var matched = aspNetJsonRegex.exec(config._i);
  if (matched !== null) {
    config._d = new Date(+matched[1]);
    return;
  }
  configFromISO(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  configFromRFC2822(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  if (config._strict) {
    config._isValid = false;
  } else {
    hooks.createFromInputFallback(config);
  }
}
hooks.createFromInputFallback = deprecate(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(config) {
    config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
  }
);
function defaults(a, b, c) {
  if (a != null) {
    return a;
  }
  if (b != null) {
    return b;
  }
  return c;
}
function currentDateArray(config) {
  var nowValue = new Date(hooks.now());
  if (config._useUTC) {
    return [
      nowValue.getUTCFullYear(),
      nowValue.getUTCMonth(),
      nowValue.getUTCDate()
    ];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray(config) {
  var i, date, input = [], currentDate, expectedWeekday, yearToUse;
  if (config._d) {
    return;
  }
  currentDate = currentDateArray(config);
  if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
    dayOfYearFromWeekInfo(config);
  }
  if (config._dayOfYear != null) {
    yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
    if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
      getParsingFlags(config)._overflowDayOfYear = true;
    }
    date = createUTCDate(yearToUse, 0, config._dayOfYear);
    config._a[MONTH] = date.getUTCMonth();
    config._a[DATE] = date.getUTCDate();
  }
  for (i = 0; i < 3 && config._a[i] == null; ++i) {
    config._a[i] = input[i] = currentDate[i];
  }
  for (; i < 7; i++) {
    config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
  }
  if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
    config._nextDay = true;
    config._a[HOUR] = 0;
  }
  config._d = (config._useUTC ? createUTCDate : createDate).apply(
    null,
    input
  );
  expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
  if (config._tzm != null) {
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  }
  if (config._nextDay) {
    config._a[HOUR] = 24;
  }
  if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
    getParsingFlags(config).weekdayMismatch = true;
  }
}
function dayOfYearFromWeekInfo(config) {
  var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  w = config._w;
  if (w.GG != null || w.W != null || w.E != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults(
      w.GG,
      config._a[YEAR],
      weekOfYear(createLocal(), 1, 4).year
    );
    week = defaults(w.W, 1);
    weekday = defaults(w.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;
    curWeek = weekOfYear(createLocal(), dow, doy);
    weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
    week = defaults(w.w, curWeek.week);
    if (w.d != null) {
      weekday = w.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w.e != null) {
      weekday = w.e + dow;
      if (w.e < 0 || w.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
}
hooks.ISO_8601 = function() {
};
hooks.RFC_2822 = function() {
};
function configFromStringAndFormat(config) {
  if (config._f === hooks.ISO_8601) {
    configFromISO(config);
    return;
  }
  if (config._f === hooks.RFC_2822) {
    configFromRFC2822(config);
    return;
  }
  config._a = [];
  getParsingFlags(config).empty = true;
  var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
  tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
  tokenLen = tokens2.length;
  for (i = 0; i < tokenLen; i++) {
    token2 = tokens2[i];
    parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
    if (parsedInput) {
      skipped = string.substr(0, string.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config).unusedInput.push(skipped);
      }
      string = string.slice(
        string.indexOf(parsedInput) + parsedInput.length
      );
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions[token2]) {
      if (parsedInput) {
        getParsingFlags(config).empty = false;
      } else {
        getParsingFlags(config).unusedTokens.push(token2);
      }
      addTimeToArrayFromToken(token2, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags(config).unusedTokens.push(token2);
    }
  }
  getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
  if (string.length > 0) {
    getParsingFlags(config).unusedInput.push(string);
  }
  if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
    getParsingFlags(config).bigHour = void 0;
  }
  getParsingFlags(config).parsedDateParts = config._a.slice(0);
  getParsingFlags(config).meridiem = config._meridiem;
  config._a[HOUR] = meridiemFixWrap(
    config._locale,
    config._a[HOUR],
    config._meridiem
  );
  era = getParsingFlags(config).era;
  if (era !== null) {
    config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
  }
  configFromArray(config);
  checkOverflow(config);
}
function meridiemFixWrap(locale2, hour, meridiem2) {
  var isPm;
  if (meridiem2 == null) {
    return hour;
  }
  if (locale2.meridiemHour != null) {
    return locale2.meridiemHour(hour, meridiem2);
  } else if (locale2.isPM != null) {
    isPm = locale2.isPM(meridiem2);
    if (isPm && hour < 12) {
      hour += 12;
    }
    if (!isPm && hour === 12) {
      hour = 0;
    }
    return hour;
  } else {
    return hour;
  }
}
function configFromStringAndArray(config) {
  var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
  if (configfLen === 0) {
    getParsingFlags(config).invalidFormat = true;
    config._d = new Date(NaN);
    return;
  }
  for (i = 0; i < configfLen; i++) {
    currentScore = 0;
    validFormatFound = false;
    tempConfig = copyConfig({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i];
    configFromStringAndFormat(tempConfig);
    if (isValid(tempConfig)) {
      validFormatFound = true;
    }
    currentScore += getParsingFlags(tempConfig).charsLeftOver;
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
    getParsingFlags(tempConfig).score = currentScore;
    if (!bestFormatIsValid) {
      if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
        if (validFormatFound) {
          bestFormatIsValid = true;
        }
      }
    } else {
      if (currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
  }
  extend(config, bestMoment || tempConfig);
}
function configFromObject(config) {
  if (config._d) {
    return;
  }
  var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
  config._a = map(
    [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
    function(obj) {
      return obj && parseInt(obj, 10);
    }
  );
  configFromArray(config);
}
function createFromConfig(config) {
  var res = new Moment(checkOverflow(prepareConfig(config)));
  if (res._nextDay) {
    res.add(1, "d");
    res._nextDay = void 0;
  }
  return res;
}
function prepareConfig(config) {
  var input = config._i, format2 = config._f;
  config._locale = config._locale || getLocale(config._l);
  if (input === null || format2 === void 0 && input === "") {
    return createInvalid({ nullInput: true });
  }
  if (typeof input === "string") {
    config._i = input = config._locale.preparse(input);
  }
  if (isMoment(input)) {
    return new Moment(checkOverflow(input));
  } else if (isDate(input)) {
    config._d = input;
  } else if (isArray(format2)) {
    configFromStringAndArray(config);
  } else if (format2) {
    configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }
  if (!isValid(config)) {
    config._d = null;
  }
  return config;
}
function configFromInput(config) {
  var input = config._i;
  if (isUndefined(input)) {
    config._d = new Date(hooks.now());
  } else if (isDate(input)) {
    config._d = new Date(input.valueOf());
  } else if (typeof input === "string") {
    configFromString(config);
  } else if (isArray(input)) {
    config._a = map(input.slice(0), function(obj) {
      return parseInt(obj, 10);
    });
    configFromArray(config);
  } else if (isObject(input)) {
    configFromObject(config);
  } else if (isNumber(input)) {
    config._d = new Date(input);
  } else {
    hooks.createFromInputFallback(config);
  }
}
function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
  var c = {};
  if (format2 === true || format2 === false) {
    strict = format2;
    format2 = void 0;
  }
  if (locale2 === true || locale2 === false) {
    strict = locale2;
    locale2 = void 0;
  }
  if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
    input = void 0;
  }
  c._isAMomentObject = true;
  c._useUTC = c._isUTC = isUTC;
  c._l = locale2;
  c._i = input;
  c._f = format2;
  c._strict = strict;
  return createFromConfig(c);
}
function createLocal(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, false);
}
var prototypeMin = deprecate(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  }
), prototypeMax = deprecate(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }
);
function pickBy(fn, moments) {
  var res, i;
  if (moments.length === 1 && isArray(moments[0])) {
    moments = moments[0];
  }
  if (!moments.length) {
    return createLocal();
  }
  res = moments[0];
  for (i = 1; i < moments.length; ++i) {
    if (!moments[i].isValid() || moments[i][fn](res)) {
      res = moments[i];
    }
  }
  return res;
}
function min() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isBefore", args);
}
function max() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isAfter", args);
}
var now = function() {
  return Date.now ? Date.now() : +new Date();
};
var ordering = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid(m) {
  var key, unitHasDecimal = false, i, orderLen = ordering.length;
  for (key in m) {
    if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
      return false;
    }
  }
  for (i = 0; i < orderLen; ++i) {
    if (m[ordering[i]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function isValid$1() {
  return this._isValid;
}
function createInvalid$1() {
  return createDuration(NaN);
}
function Duration(duration) {
  var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
  this._isValid = isDurationValid(normalizedInput);
  this._milliseconds = +milliseconds2 + seconds2 * 1e3 + minutes2 * 6e4 + hours2 * 1e3 * 60 * 60;
  this._days = +days2 + weeks2 * 7;
  this._months = +months2 + quarters * 3 + years2 * 12;
  this._data = {};
  this._locale = getLocale();
  this._bubble();
}
function isDuration(obj) {
  return obj instanceof Duration;
}
function absRound(number) {
  if (number < 0) {
    return Math.round(-1 * number) * -1;
  } else {
    return Math.round(number);
  }
}
function compareArrays(array1, array2, dontConvert) {
  var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
  for (i = 0; i < len; i++) {
    if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function offset(token2, separator) {
  addFormatToken(token2, 0, 0, function() {
    var offset2 = this.utcOffset(), sign2 = "+";
    if (offset2 < 0) {
      offset2 = -offset2;
      sign2 = "-";
    }
    return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
  });
}
offset("Z", ":");
offset("ZZ", "");
addRegexToken("Z", matchShortOffset);
addRegexToken("ZZ", matchShortOffset);
addParseToken(["Z", "ZZ"], function(input, array, config) {
  config._useUTC = true;
  config._tzm = offsetFromString(matchShortOffset, input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, string) {
  var matches = (string || "").match(matcher), chunk, parts, minutes2;
  if (matches === null) {
    return null;
  }
  chunk = matches[matches.length - 1] || [];
  parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
  minutes2 = +(parts[1] * 60) + toInt(parts[2]);
  return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
}
function cloneWithOffset(input, model) {
  var res, diff2;
  if (model._isUTC) {
    res = model.clone();
    diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
    res._d.setTime(res._d.valueOf() + diff2);
    hooks.updateOffset(res, false);
    return res;
  } else {
    return createLocal(input).local();
  }
}
function getDateOffset(m) {
  return -Math.round(m._d.getTimezoneOffset());
}
hooks.updateOffset = function() {
};
function getSetOffset(input, keepLocalTime, keepMinutes) {
  var offset2 = this._offset || 0, localAdjust;
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    if (typeof input === "string") {
      input = offsetFromString(matchShortOffset, input);
      if (input === null) {
        return this;
      }
    } else if (Math.abs(input) < 16 && !keepMinutes) {
      input = input * 60;
    }
    if (!this._isUTC && keepLocalTime) {
      localAdjust = getDateOffset(this);
    }
    this._offset = input;
    this._isUTC = true;
    if (localAdjust != null) {
      this.add(localAdjust, "m");
    }
    if (offset2 !== input) {
      if (!keepLocalTime || this._changeInProgress) {
        addSubtract(
          this,
          createDuration(input - offset2, "m"),
          1,
          false
        );
      } else if (!this._changeInProgress) {
        this._changeInProgress = true;
        hooks.updateOffset(this, true);
        this._changeInProgress = null;
      }
    }
    return this;
  } else {
    return this._isUTC ? offset2 : getDateOffset(this);
  }
}
function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== "string") {
      input = -input;
    }
    this.utcOffset(input, keepLocalTime);
    return this;
  } else {
    return -this.utcOffset();
  }
}
function setOffsetToUTC(keepLocalTime) {
  return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;
    if (keepLocalTime) {
      this.subtract(getDateOffset(this), "m");
    }
  }
  return this;
}
function setOffsetToParsedOffset() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === "string") {
    var tZone = offsetFromString(matchOffset, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    } else {
      this.utcOffset(0, true);
    }
  }
  return this;
}
function hasAlignedHourOffset(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal(input).utcOffset() : 0;
  return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }
  var c = {}, other;
  copyConfig(c, this);
  c = prepareConfig(c);
  if (c._a) {
    other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
    this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }
  return this._isDSTShifted;
}
function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}
function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}
function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key) {
  var duration = input, match = null, sign2, ret, diffRes;
  if (isDuration(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months
    };
  } else if (isNumber(input) || !isNaN(+input)) {
    duration = {};
    if (key) {
      duration[key] = +input;
    } else {
      duration.milliseconds = +input;
    }
  } else if (match = aspNetRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: 0,
      d: toInt(match[DATE]) * sign2,
      h: toInt(match[HOUR]) * sign2,
      m: toInt(match[MINUTE]) * sign2,
      s: toInt(match[SECOND]) * sign2,
      ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
    };
  } else if (match = isoRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: parseIso(match[2], sign2),
      M: parseIso(match[3], sign2),
      w: parseIso(match[4], sign2),
      d: parseIso(match[5], sign2),
      h: parseIso(match[6], sign2),
      m: parseIso(match[7], sign2),
      s: parseIso(match[8], sign2)
    };
  } else if (duration == null) {
    duration = {};
  } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
    diffRes = momentsDifference(
      createLocal(duration.from),
      createLocal(duration.to)
    );
    duration = {};
    duration.ms = diffRes.milliseconds;
    duration.M = diffRes.months;
  }
  ret = new Duration(duration);
  if (isDuration(input) && hasOwnProp(input, "_locale")) {
    ret._locale = input._locale;
  }
  if (isDuration(input) && hasOwnProp(input, "_isValid")) {
    ret._isValid = input._isValid;
  }
  return ret;
}
createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;
function parseIso(inp, sign2) {
  var res = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res) ? 0 : res) * sign2;
}
function positiveMomentsDifference(base, other) {
  var res = {};
  res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
  if (base.clone().add(res.months, "M").isAfter(other)) {
    --res.months;
  }
  res.milliseconds = +other - +base.clone().add(res.months, "M");
  return res;
}
function momentsDifference(base, other) {
  var res;
  if (!(base.isValid() && other.isValid())) {
    return { milliseconds: 0, months: 0 };
  }
  other = cloneWithOffset(other, base);
  if (base.isBefore(other)) {
    res = positiveMomentsDifference(base, other);
  } else {
    res = positiveMomentsDifference(other, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }
  return res;
}
function createAdder(direction, name) {
  return function(val, period) {
    var dur, tmp;
    if (period !== null && !isNaN(+period)) {
      deprecateSimple(
        name,
        "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
      );
      tmp = val;
      val = period;
      period = tmp;
    }
    dur = createDuration(val, period);
    addSubtract(this, dur, direction);
    return this;
  };
}
function addSubtract(mom, duration, isAdding, updateOffset) {
  var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
  if (!mom.isValid()) {
    return;
  }
  updateOffset = updateOffset == null ? true : updateOffset;
  if (months2) {
    setMonth(mom, get(mom, "Month") + months2 * isAdding);
  }
  if (days2) {
    set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
  }
  if (milliseconds2) {
    mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
  }
  if (updateOffset) {
    hooks.updateOffset(mom, days2 || months2);
  }
}
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString(input) {
  return typeof input === "string" || input instanceof String;
}
function isMomentInput(input) {
  return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
}
function isMomentInputObject(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i, property, propertyLen = properties.length;
  for (i = 0; i < propertyLen; i += 1) {
    property = properties[i];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function isNumberOrStringArray(input) {
  var arrayTest = isArray(input), dataTypeTest = false;
  if (arrayTest) {
    dataTypeTest = input.filter(function(item) {
      return !isNumber(item) && isString(input);
    }).length === 0;
  }
  return arrayTest && dataTypeTest;
}
function isCalendarSpec(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i, property;
  for (i = 0; i < properties.length; i += 1) {
    property = properties[i];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function getCalendarFormat(myMoment, now2) {
  var diff2 = myMoment.diff(now2, "days", true);
  return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
}
function calendar$1(time, formats) {
  if (arguments.length === 1) {
    if (!arguments[0]) {
      time = void 0;
      formats = void 0;
    } else if (isMomentInput(arguments[0])) {
      time = arguments[0];
      formats = void 0;
    } else if (isCalendarSpec(arguments[0])) {
      formats = arguments[0];
      time = void 0;
    }
  }
  var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
  return this.format(
    output || this.localeData().calendar(format2, this, createLocal(now2))
  );
}
function clone() {
  return new Moment(this);
}
function isAfter(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() > localInput.valueOf();
  } else {
    return localInput.valueOf() < this.clone().startOf(units).valueOf();
  }
}
function isBefore(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() < localInput.valueOf();
  } else {
    return this.clone().endOf(units).valueOf() < localInput.valueOf();
  }
}
function isBetween(from2, to2, units, inclusivity) {
  var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
  if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
    return false;
  }
  inclusivity = inclusivity || "()";
  return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}
function isSame(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input), inputMs;
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() === localInput.valueOf();
  } else {
    inputMs = localInput.valueOf();
    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  }
}
function isSameOrAfter(input, units) {
  return this.isSame(input, units) || this.isAfter(input, units);
}
function isSameOrBefore(input, units) {
  return this.isSame(input, units) || this.isBefore(input, units);
}
function diff(input, units, asFloat) {
  var that, zoneDelta, output;
  if (!this.isValid()) {
    return NaN;
  }
  that = cloneWithOffset(input, this);
  if (!that.isValid()) {
    return NaN;
  }
  zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  units = normalizeUnits(units);
  switch (units) {
    case "year":
      output = monthDiff(this, that) / 12;
      break;
    case "month":
      output = monthDiff(this, that);
      break;
    case "quarter":
      output = monthDiff(this, that) / 3;
      break;
    case "second":
      output = (this - that) / 1e3;
      break;
    case "minute":
      output = (this - that) / 6e4;
      break;
    case "hour":
      output = (this - that) / 36e5;
      break;
    case "day":
      output = (this - that - zoneDelta) / 864e5;
      break;
    case "week":
      output = (this - that - zoneDelta) / 6048e5;
      break;
    default:
      output = this - that;
  }
  return asFloat ? output : absFloor(output);
}
function monthDiff(a, b) {
  if (a.date() < b.date()) {
    return -monthDiff(b, a);
  }
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
  if (b - anchor < 0) {
    anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
    adjust = (b - anchor) / (anchor - anchor2);
  } else {
    anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
    adjust = (b - anchor) / (anchor2 - anchor);
  }
  return -(wholeMonthDiff + adjust) || 0;
}
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString(keepOffset) {
  if (!this.isValid()) {
    return null;
  }
  var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
  if (m.year() < 0 || m.year() > 9999) {
    return formatMoment(
      m,
      utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );
  }
  if (isFunction(Date.prototype.toISOString)) {
    if (utc) {
      return this.toDate().toISOString();
    } else {
      return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
    }
  }
  return formatMoment(
    m,
    utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function inspect() {
  if (!this.isValid()) {
    return "moment.invalid(/* " + this._i + " */)";
  }
  var func = "moment", zone = "", prefix, year, datetime, suffix;
  if (!this.isLocal()) {
    func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
    zone = "Z";
  }
  prefix = "[" + func + '("]';
  year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
  datetime = "-MM-DD[T]HH:mm:ss.SSS";
  suffix = zone + '[")]';
  return this.format(prefix + year + datetime + suffix);
}
function format(inputString) {
  if (!inputString) {
    inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  }
  var output = formatMoment(this, inputString);
  return this.localeData().postformat(output);
}
function from(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function fromNow(withoutSuffix) {
  return this.from(createLocal(), withoutSuffix);
}
function to(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function toNow(withoutSuffix) {
  return this.to(createLocal(), withoutSuffix);
}
function locale(key) {
  var newLocaleData;
  if (key === void 0) {
    return this._locale._abbr;
  } else {
    newLocaleData = getLocale(key);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }
    return this;
  }
}
var lang = deprecate(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(key) {
    if (key === void 0) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  }
);
function localeData() {
  return this._locale;
}
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
function mod$1(dividend, divisor) {
  return (dividend % divisor + divisor) % divisor;
}
function localStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return new Date(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return new Date(y, m, d).valueOf();
  }
}
function utcStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return Date.UTC(y, m, d);
  }
}
function startOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year(), 0, 1);
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      time = startOfDate(this.year(), this.month(), 1);
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date());
      break;
    case "hour":
      time = this._d.valueOf();
      time -= mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      );
      break;
    case "minute":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_MINUTE);
      break;
    case "second":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_SECOND);
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function endOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      time = startOfDate(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      time = this._d.valueOf();
      time += MS_PER_HOUR - mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      ) - 1;
      break;
    case "minute":
      time = this._d.valueOf();
      time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
      break;
    case "second":
      time = this._d.valueOf();
      time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function valueOf() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate() {
  return new Date(this.valueOf());
}
function toArray() {
  var m = this;
  return [
    m.year(),
    m.month(),
    m.date(),
    m.hour(),
    m.minute(),
    m.second(),
    m.millisecond()
  ];
}
function toObject() {
  var m = this;
  return {
    years: m.year(),
    months: m.month(),
    date: m.date(),
    hours: m.hours(),
    minutes: m.minutes(),
    seconds: m.seconds(),
    milliseconds: m.milliseconds()
  };
}
function toJSON2() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2() {
  return isValid(this);
}
function parsingFlags() {
  return extend({}, getParsingFlags(this));
}
function invalidAt() {
  return getParsingFlags(this).overflow;
}
function creationData() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken("N", 0, 0, "eraAbbr");
addFormatToken("NN", 0, 0, "eraAbbr");
addFormatToken("NNN", 0, 0, "eraAbbr");
addFormatToken("NNNN", 0, 0, "eraName");
addFormatToken("NNNNN", 0, 0, "eraNarrow");
addFormatToken("y", ["y", 1], "yo", "eraYear");
addFormatToken("y", ["yy", 2], 0, "eraYear");
addFormatToken("y", ["yyy", 3], 0, "eraYear");
addFormatToken("y", ["yyyy", 4], 0, "eraYear");
addRegexToken("N", matchEraAbbr);
addRegexToken("NN", matchEraAbbr);
addRegexToken("NNN", matchEraAbbr);
addRegexToken("NNNN", matchEraName);
addRegexToken("NNNNN", matchEraNarrow);
addParseToken(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(input, array, config, token2) {
    var era = config._locale.erasParse(input, token2, config._strict);
    if (era) {
      getParsingFlags(config).era = era;
    } else {
      getParsingFlags(config).invalidEra = input;
    }
  }
);
addRegexToken("y", matchUnsigned);
addRegexToken("yy", matchUnsigned);
addRegexToken("yyy", matchUnsigned);
addRegexToken("yyyy", matchUnsigned);
addRegexToken("yo", matchEraYearOrdinal);
addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
addParseToken(["yo"], function(input, array, config, token2) {
  var match;
  if (config._locale._eraYearOrdinalRegex) {
    match = input.match(config._locale._eraYearOrdinalRegex);
  }
  if (config._locale.eraYearOrdinalParse) {
    array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
  } else {
    array[YEAR] = parseInt(input, 10);
  }
});
function localeEras(m, format2) {
  var i, l, date, eras = this._eras || getLocale("en")._eras;
  for (i = 0, l = eras.length; i < l; ++i) {
    switch (typeof eras[i].since) {
      case "string":
        date = hooks(eras[i].since).startOf("day");
        eras[i].since = date.valueOf();
        break;
    }
    switch (typeof eras[i].until) {
      case "undefined":
        eras[i].until = Infinity;
        break;
      case "string":
        date = hooks(eras[i].until).startOf("day").valueOf();
        eras[i].until = date.valueOf();
        break;
    }
  }
  return eras;
}
function localeErasParse(eraName, format2, strict) {
  var i, l, eras = this.eras(), name, abbr, narrow;
  eraName = eraName.toUpperCase();
  for (i = 0, l = eras.length; i < l; ++i) {
    name = eras[i].name.toUpperCase();
    abbr = eras[i].abbr.toUpperCase();
    narrow = eras[i].narrow.toUpperCase();
    if (strict) {
      switch (format2) {
        case "N":
        case "NN":
        case "NNN":
          if (abbr === eraName) {
            return eras[i];
          }
          break;
        case "NNNN":
          if (name === eraName) {
            return eras[i];
          }
          break;
        case "NNNNN":
          if (narrow === eraName) {
            return eras[i];
          }
          break;
      }
    } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
      return eras[i];
    }
  }
}
function localeErasConvertYear(era, year) {
  var dir = era.since <= era.until ? 1 : -1;
  if (year === void 0) {
    return hooks(era.since).year();
  } else {
    return hooks(era.since).year() + (year - era.offset) * dir;
  }
}
function getEraName() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].name;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].name;
    }
  }
  return "";
}
function getEraNarrow() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].narrow;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].narrow;
    }
  }
  return "";
}
function getEraAbbr() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].abbr;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].abbr;
    }
  }
  return "";
}
function getEraYear() {
  var i, l, dir, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    dir = eras[i].since <= eras[i].until ? 1 : -1;
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
      return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
    }
  }
  return this.year();
}
function erasNameRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNameRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex(isStrict) {
  if (!hasOwnProp(this, "_erasAbbrRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNarrowRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr(isStrict, locale2) {
  return locale2.erasAbbrRegex(isStrict);
}
function matchEraName(isStrict, locale2) {
  return locale2.erasNameRegex(isStrict);
}
function matchEraNarrow(isStrict, locale2) {
  return locale2.erasNarrowRegex(isStrict);
}
function matchEraYearOrdinal(isStrict, locale2) {
  return locale2._eraYearOrdinalRegex || matchUnsigned;
}
function computeErasParse() {
  var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    namePieces.push(regexEscape(eras[i].name));
    abbrPieces.push(regexEscape(eras[i].abbr));
    narrowPieces.push(regexEscape(eras[i].narrow));
    mixedPieces.push(regexEscape(eras[i].name));
    mixedPieces.push(regexEscape(eras[i].abbr));
    mixedPieces.push(regexEscape(eras[i].narrow));
  }
  this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
  this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
  this._erasNarrowRegex = new RegExp(
    "^(" + narrowPieces.join("|") + ")",
    "i"
  );
}
addFormatToken(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(token2, getter) {
  addFormatToken(0, [token2, token2.length], 0, getter);
}
addWeekYearFormatToken("gggg", "weekYear");
addWeekYearFormatToken("ggggg", "weekYear");
addWeekYearFormatToken("GGGG", "isoWeekYear");
addWeekYearFormatToken("GGGGG", "isoWeekYear");
addUnitAlias("weekYear", "gg");
addUnitAlias("isoWeekYear", "GG");
addUnitPriority("weekYear", 1);
addUnitPriority("isoWeekYear", 1);
addRegexToken("G", matchSigned);
addRegexToken("g", matchSigned);
addRegexToken("GG", match1to2, match2);
addRegexToken("gg", match1to2, match2);
addRegexToken("GGGG", match1to4, match4);
addRegexToken("gggg", match1to4, match4);
addRegexToken("GGGGG", match1to6, match6);
addRegexToken("ggggg", match1to6, match6);
addWeekParseToken(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(input, week, config, token2) {
    week[token2.substr(0, 2)] = toInt(input);
  }
);
addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
  week[token2] = hooks.parseTwoDigitYear(input);
});
function getSetWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function getSetISOWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear() {
  return weeksInYear(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
function getWeeksInWeekYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
}
function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll.call(this, input, week, weekday, dow, doy);
  }
}
function setWeekAll(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addUnitAlias("quarter", "Q");
addUnitPriority("quarter", 7);
addRegexToken("Q", match1);
addParseToken("Q", function(input, array) {
  array[MONTH] = (toInt(input) - 1) * 3;
});
function getSetQuarter(input) {
  return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addUnitAlias("date", "D");
addUnitPriority("date", 9);
addRegexToken("D", match1to2);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function(isStrict, locale2) {
  return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
});
addParseToken(["D", "DD"], DATE);
addParseToken("Do", function(input, array) {
  array[DATE] = toInt(input.match(match1to2)[0]);
});
var getSetDayOfMonth = makeGetSet("Date", true);
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addUnitAlias("dayOfYear", "DDD");
addUnitPriority("dayOfYear", 4);
addRegexToken("DDD", match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function(input, array, config) {
  config._dayOfYear = toInt(input);
});
function getSetDayOfYear(input) {
  var dayOfYear = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
}
addFormatToken("m", ["mm", 2], 0, "minute");
addUnitAlias("minute", "m");
addUnitPriority("minute", 14);
addRegexToken("m", match1to2);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", false);
addFormatToken("s", ["ss", 2], 0, "second");
addUnitAlias("second", "s");
addUnitPriority("second", 15);
addRegexToken("s", match1to2);
addRegexToken("ss", match1to2, match2);
addParseToken(["s", "ss"], SECOND);
var getSetSecond = makeGetSet("Seconds", false);
addFormatToken("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addUnitAlias("millisecond", "ms");
addUnitPriority("millisecond", 16);
addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);
var token, getSetMillisecond;
for (token = "SSSS"; token.length <= 9; token += "S") {
  addRegexToken(token, matchUnsigned);
}
function parseMs(input, array) {
  array[MILLISECOND] = toInt(("0." + input) * 1e3);
}
for (token = "S"; token.length <= 9; token += "S") {
  addParseToken(token, parseMs);
}
getSetMillisecond = makeGetSet("Milliseconds", false);
addFormatToken("z", 0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");
function getZoneAbbr() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto = Moment.prototype;
proto.add = add;
proto.calendar = calendar$1;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid$2;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
if (typeof Symbol !== "undefined" && Symbol.for != null) {
  proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  };
}
proto.toJSON = toJSON2;
proto.toString = toString;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates = deprecate(
  "dates accessor is deprecated. Use date instead.",
  getSetDayOfMonth
);
proto.months = deprecate(
  "months accessor is deprecated. Use month instead",
  getSetMonth
);
proto.years = deprecate(
  "years accessor is deprecated. Use year instead",
  getSetYear
);
proto.zone = deprecate(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  getSetZone
);
proto.isDSTShifted = deprecate(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  isDaylightSavingTimeShifted
);
function createUnix(input) {
  return createLocal(input * 1e3);
}
function createInZone() {
  return createLocal.apply(null, arguments).parseZone();
}
function preParsePostFormat(string) {
  return string;
}
var proto$1 = Locale.prototype;
proto$1.calendar = calendar;
proto$1.longDateFormat = longDateFormat;
proto$1.invalidDate = invalidDate;
proto$1.ordinal = ordinal;
proto$1.preparse = preParsePostFormat;
proto$1.postformat = preParsePostFormat;
proto$1.relativeTime = relativeTime;
proto$1.pastFuture = pastFuture;
proto$1.set = set;
proto$1.eras = localeEras;
proto$1.erasParse = localeErasParse;
proto$1.erasConvertYear = localeErasConvertYear;
proto$1.erasAbbrRegex = erasAbbrRegex;
proto$1.erasNameRegex = erasNameRegex;
proto$1.erasNarrowRegex = erasNarrowRegex;
proto$1.months = localeMonths;
proto$1.monthsShort = localeMonthsShort;
proto$1.monthsParse = localeMonthsParse;
proto$1.monthsRegex = monthsRegex;
proto$1.monthsShortRegex = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;
proto$1.weekdays = localeWeekdays;
proto$1.weekdaysMin = localeWeekdaysMin;
proto$1.weekdaysShort = localeWeekdaysShort;
proto$1.weekdaysParse = localeWeekdaysParse;
proto$1.weekdaysRegex = weekdaysRegex;
proto$1.weekdaysShortRegex = weekdaysShortRegex;
proto$1.weekdaysMinRegex = weekdaysMinRegex;
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;
function get$1(format2, index2, field, setter) {
  var locale2 = getLocale(), utc = createUTC().set(setter, index2);
  return locale2[field](utc, format2);
}
function listMonthsImpl(format2, index2, field) {
  if (isNumber(format2)) {
    index2 = format2;
    format2 = void 0;
  }
  format2 = format2 || "";
  if (index2 != null) {
    return get$1(format2, index2, field, "month");
  }
  var i, out = [];
  for (i = 0; i < 12; i++) {
    out[i] = get$1(format2, i, field, "month");
  }
  return out;
}
function listWeekdaysImpl(localeSorted, format2, index2, field) {
  if (typeof localeSorted === "boolean") {
    if (isNumber(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  } else {
    format2 = localeSorted;
    index2 = format2;
    localeSorted = false;
    if (isNumber(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  }
  var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
  if (index2 != null) {
    return get$1(format2, (index2 + shift) % 7, field, "day");
  }
  for (i = 0; i < 7; i++) {
    out[i] = get$1(format2, (i + shift) % 7, field, "day");
  }
  return out;
}
function listMonths(format2, index2) {
  return listMonthsImpl(format2, index2, "months");
}
function listMonthsShort(format2, index2) {
  return listMonthsImpl(format2, index2, "monthsShort");
}
function listWeekdays(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdays");
}
function listWeekdaysShort(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysShort");
}
function listWeekdaysMin(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysMin");
}
getSetGlobalLocale("en", {
  eras: [
    {
      since: "0001-01-01",
      until: Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(number) {
    var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }
});
hooks.lang = deprecate(
  "moment.lang is deprecated. Use moment.locale instead.",
  getSetGlobalLocale
);
hooks.langData = deprecate(
  "moment.langData is deprecated. Use moment.localeData instead.",
  getLocale
);
var mathAbs = Math.abs;
function abs() {
  var data2 = this._data;
  this._milliseconds = mathAbs(this._milliseconds);
  this._days = mathAbs(this._days);
  this._months = mathAbs(this._months);
  data2.milliseconds = mathAbs(data2.milliseconds);
  data2.seconds = mathAbs(data2.seconds);
  data2.minutes = mathAbs(data2.minutes);
  data2.hours = mathAbs(data2.hours);
  data2.months = mathAbs(data2.months);
  data2.years = mathAbs(data2.years);
  return this;
}
function addSubtract$1(duration, input, value, direction) {
  var other = createDuration(input, value);
  duration._milliseconds += direction * other._milliseconds;
  duration._days += direction * other._days;
  duration._months += direction * other._months;
  return duration._bubble();
}
function add$1(input, value) {
  return addSubtract$1(this, input, value, 1);
}
function subtract$1(input, value) {
  return addSubtract$1(this, input, value, -1);
}
function absCeil(number) {
  if (number < 0) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
}
function bubble() {
  var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data2 = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
  if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
    milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
    days2 = 0;
    months2 = 0;
  }
  data2.milliseconds = milliseconds2 % 1e3;
  seconds2 = absFloor(milliseconds2 / 1e3);
  data2.seconds = seconds2 % 60;
  minutes2 = absFloor(seconds2 / 60);
  data2.minutes = minutes2 % 60;
  hours2 = absFloor(minutes2 / 60);
  data2.hours = hours2 % 24;
  days2 += absFloor(hours2 / 24);
  monthsFromDays = absFloor(daysToMonths(days2));
  months2 += monthsFromDays;
  days2 -= absCeil(monthsToDays(monthsFromDays));
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  data2.days = days2;
  data2.months = months2;
  data2.years = years2;
  return this;
}
function daysToMonths(days2) {
  return days2 * 4800 / 146097;
}
function monthsToDays(months2) {
  return months2 * 146097 / 4800;
}
function as(units) {
  if (!this.isValid()) {
    return NaN;
  }
  var days2, months2, milliseconds2 = this._milliseconds;
  units = normalizeUnits(units);
  if (units === "month" || units === "quarter" || units === "year") {
    days2 = this._days + milliseconds2 / 864e5;
    months2 = this._months + daysToMonths(days2);
    switch (units) {
      case "month":
        return months2;
      case "quarter":
        return months2 / 3;
      case "year":
        return months2 / 12;
    }
  } else {
    days2 = this._days + Math.round(monthsToDays(this._months));
    switch (units) {
      case "week":
        return days2 / 7 + milliseconds2 / 6048e5;
      case "day":
        return days2 + milliseconds2 / 864e5;
      case "hour":
        return days2 * 24 + milliseconds2 / 36e5;
      case "minute":
        return days2 * 1440 + milliseconds2 / 6e4;
      case "second":
        return days2 * 86400 + milliseconds2 / 1e3;
      case "millisecond":
        return Math.floor(days2 * 864e5) + milliseconds2;
      default:
        throw new Error("Unknown unit " + units);
    }
  }
}
function valueOf$1() {
  if (!this.isValid()) {
    return NaN;
  }
  return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
}
function makeAs(alias) {
  return function() {
    return this.as(alias);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
function clone$1() {
  return createDuration(this);
}
function get$2(units) {
  units = normalizeUnits(units);
  return this.isValid() ? this[units + "s"]() : NaN;
}
function makeGetter(name) {
  return function() {
    return this.isValid() ? this._data[name] : NaN;
  };
}
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() {
  return absFloor(this.days() / 7);
}
var round = Math.round, thresholds = {
  ss: 44,
  s: 45,
  m: 45,
  h: 22,
  d: 26,
  w: null,
  M: 11
};
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
  return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
  var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
  if (thresholds2.w != null) {
    a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
  }
  a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
  a[2] = withoutSuffix;
  a[3] = +posNegDuration > 0;
  a[4] = locale2;
  return substituteTimeAgo.apply(null, a);
}
function getSetRelativeTimeRounding(roundingFunction) {
  if (roundingFunction === void 0) {
    return round;
  }
  if (typeof roundingFunction === "function") {
    round = roundingFunction;
    return true;
  }
  return false;
}
function getSetRelativeTimeThreshold(threshold, limit) {
  if (thresholds[threshold] === void 0) {
    return false;
  }
  if (limit === void 0) {
    return thresholds[threshold];
  }
  thresholds[threshold] = limit;
  if (threshold === "s") {
    thresholds.ss = limit - 1;
  }
  return true;
}
function humanize(argWithSuffix, argThresholds) {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var withSuffix = false, th = thresholds, locale2, output;
  if (typeof argWithSuffix === "object") {
    argThresholds = argWithSuffix;
    argWithSuffix = false;
  }
  if (typeof argWithSuffix === "boolean") {
    withSuffix = argWithSuffix;
  }
  if (typeof argThresholds === "object") {
    th = Object.assign({}, thresholds, argThresholds);
    if (argThresholds.s != null && argThresholds.ss == null) {
      th.ss = argThresholds.s - 1;
    }
  }
  locale2 = this.localeData();
  output = relativeTime$1(this, !withSuffix, th, locale2);
  if (withSuffix) {
    output = locale2.pastFuture(+this, output);
  }
  return locale2.postformat(output);
}
var abs$1 = Math.abs;
function sign(x) {
  return (x > 0) - (x < 0) || +x;
}
function toISOString$1() {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
  if (!total) {
    return "P0D";
  }
  minutes2 = absFloor(seconds2 / 60);
  hours2 = absFloor(minutes2 / 60);
  seconds2 %= 60;
  minutes2 %= 60;
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
  totalSign = total < 0 ? "-" : "";
  ymSign = sign(this._months) !== sign(total) ? "-" : "";
  daysSign = sign(this._days) !== sign(total) ? "-" : "";
  hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
  return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
}
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1;
proto$2.abs = abs;
proto$2.add = add$1;
proto$2.subtract = subtract$1;
proto$2.as = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds = asSeconds;
proto$2.asMinutes = asMinutes;
proto$2.asHours = asHours;
proto$2.asDays = asDays;
proto$2.asWeeks = asWeeks;
proto$2.asMonths = asMonths;
proto$2.asQuarters = asQuarters;
proto$2.asYears = asYears;
proto$2.valueOf = valueOf$1;
proto$2._bubble = bubble;
proto$2.clone = clone$1;
proto$2.get = get$2;
proto$2.milliseconds = milliseconds;
proto$2.seconds = seconds;
proto$2.minutes = minutes;
proto$2.hours = hours;
proto$2.days = days;
proto$2.weeks = weeks;
proto$2.months = months;
proto$2.years = years;
proto$2.humanize = humanize;
proto$2.toISOString = toISOString$1;
proto$2.toString = toISOString$1;
proto$2.toJSON = toISOString$1;
proto$2.locale = locale;
proto$2.localeData = localeData;
proto$2.toIsoString = deprecate(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  toISOString$1
);
proto$2.lang = lang;
addFormatToken("X", 0, 0, "unix");
addFormatToken("x", 0, 0, "valueOf");
addRegexToken("x", matchSigned);
addRegexToken("X", matchTimestamp);
addParseToken("X", function(input, array, config) {
  config._d = new Date(parseFloat(input) * 1e3);
});
addParseToken("x", function(input, array, config) {
  config._d = new Date(toInt(input));
});
//! moment.js
hooks.version = "2.29.4";
setHookCallback(createLocal);
hooks.fn = proto;
hooks.min = min;
hooks.max = max;
hooks.now = now;
hooks.utc = createUTC;
hooks.unix = createUnix;
hooks.months = listMonths;
hooks.isDate = isDate;
hooks.locale = getSetGlobalLocale;
hooks.invalid = createInvalid;
hooks.duration = createDuration;
hooks.isMoment = isMoment;
hooks.weekdays = listWeekdays;
hooks.parseZone = createInZone;
hooks.localeData = getLocale;
hooks.isDuration = isDuration;
hooks.monthsShort = listMonthsShort;
hooks.weekdaysMin = listWeekdaysMin;
hooks.defineLocale = defineLocale;
hooks.updateLocale = updateLocale;
hooks.locales = listLocales;
hooks.weekdaysShort = listWeekdaysShort;
hooks.normalizeUnits = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat = getCalendarFormat;
hooks.prototype = proto;
hooks.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm",
  TIME_SECONDS: "HH:mm:ss",
  TIME_MS: "HH:mm:ss.SSS",
  WEEK: "GGGG-[W]WW",
  MONTH: "YYYY-MM"
};
//! moment.js locale configuration
hooks.defineLocale("zh-cn", {
  months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split(
    "_"
  ),
  monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split(
    "_"
  ),
  weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
  weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"),
  weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY/MM/DD",
    LL: "YYYY\u5E74M\u6708D\u65E5",
    LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206",
    LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206",
    l: "YYYY/M/D",
    ll: "YYYY\u5E74M\u6708D\u65E5",
    lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
    llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function(hour, meridiem2) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem2 === "\u51CC\u6668" || meridiem2 === "\u65E9\u4E0A" || meridiem2 === "\u4E0A\u5348") {
      return hour;
    } else if (meridiem2 === "\u4E0B\u5348" || meridiem2 === "\u665A\u4E0A") {
      return hour + 12;
    } else {
      return hour >= 11 ? hour : hour + 12;
    }
  },
  meridiem: function(hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 600) {
      return "\u51CC\u6668";
    } else if (hm < 900) {
      return "\u65E9\u4E0A";
    } else if (hm < 1130) {
      return "\u4E0A\u5348";
    } else if (hm < 1230) {
      return "\u4E2D\u5348";
    } else if (hm < 1800) {
      return "\u4E0B\u5348";
    } else {
      return "\u665A\u4E0A";
    }
  },
  calendar: {
    sameDay: "[\u4ECA\u5929]LT",
    nextDay: "[\u660E\u5929]LT",
    nextWeek: function(now2) {
      if (now2.week() !== this.week()) {
        return "[\u4E0B]dddLT";
      } else {
        return "[\u672C]dddLT";
      }
    },
    lastDay: "[\u6628\u5929]LT",
    lastWeek: function(now2) {
      if (this.week() !== now2.week()) {
        return "[\u4E0A]dddLT";
      } else {
        return "[\u672C]dddLT";
      }
    },
    sameElse: "L"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function(number, period) {
    switch (period) {
      case "d":
      case "D":
      case "DDD":
        return number + "\u65E5";
      case "M":
        return number + "\u6708";
      case "w":
      case "W":
        return number + "\u5468";
      default:
        return number;
    }
  },
  relativeTime: {
    future: "%s\u540E",
    past: "%s\u524D",
    s: "\u51E0\u79D2",
    ss: "%d \u79D2",
    m: "1 \u5206\u949F",
    mm: "%d \u5206\u949F",
    h: "1 \u5C0F\u65F6",
    hh: "%d \u5C0F\u65F6",
    d: "1 \u5929",
    dd: "%d \u5929",
    w: "1 \u5468",
    ww: "%d \u5468",
    M: "1 \u4E2A\u6708",
    MM: "%d \u4E2A\u6708",
    y: "1 \u5E74",
    yy: "%d \u5E74"
  },
  week: {
    dow: 1,
    doy: 4
  }
});
hooks$1.locale("zh-cn");
const _SM2Utilities = class {
  constructor() {
    __publicField(this, "cipherMode", 1);
  }
  static getInstance() {
    return this.instance;
  }
  createKeyPair() {
    return src.sm2.generateKeyPairHex();
  }
  encrypt(content, publicKey) {
    return "04" + src.sm2.doEncrypt(content, publicKey, this.cipherMode);
  }
  decrypt(content, privateKey) {
    let data2 = content.substring(2).toLocaleLowerCase();
    return src.sm2.doDecrypt(data2, privateKey, this.cipherMode);
  }
};
let SM2Utilities = _SM2Utilities;
__publicField(SM2Utilities, "instance", new _SM2Utilities());
const _SM4Utilities = class {
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  encrypt(content, publicKey) {
    return src.sm4.encrypt(content, publicKey);
  }
  decrypt(content, privateKey) {
    return src.sm4.decrypt(content, privateKey);
  }
};
let SM4Utilities = _SM4Utilities;
__publicField(SM4Utilities, "instance", new _SM4Utilities());
SM2Utilities.getInstance();
SM4Utilities.getInstance();
const DURATION_UNITS = [
  { text: "\u5929", value: "days" },
  { text: "\u5C0F\u65F6", value: "hours" },
  { text: "\u5206", value: "minutes" },
  { text: "\u79D2", value: "seconds" }
];
const Symbol$1 = {
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
  return base + Symbol$1.DASH + params.join(Symbol$1.DASH);
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
const _sfc_main$h = defineComponent({
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
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
const HColumn = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
const constants = {
  row: "row",
  column: "column",
  justify: "justify",
  self: "self",
  align: "items",
  gutter: "q-gutter",
  gutterWithCol: "q-col-gutter"
};
const _sfc_main$g = defineComponent({
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
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.getClasses())
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
const HRow = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
const _sfc_main$f = defineComponent({
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
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
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
const HContainer = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
HColumn.install = (app) => {
  app.component(HColumn.name, HColumn);
};
HContainer.install = (app) => {
  app.component(HContainer.name, HContainer);
};
HRow.install = (app) => {
  app.component(HRow.name, HRow);
};
const _sfc_main$e = defineComponent({
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
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.display)
  }, toDisplayString(_ctx.text), 3);
}
const HLabel = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
HLabel.install = (app) => {
  app.component(HLabel.name, HLabel);
};
const _sfc_main$d = defineComponent({
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
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
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
const HDivider = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
HDivider.install = (app) => {
  app.component(HDivider.name, HDivider);
};
const _sfc_main$c = defineComponent({
  name: "HDateTime",
  props: {
    modelValue: { type: String },
    errorMessage: { type: String }
  },
  directives: {
    ClosePopup
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const dateTimeValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    const hasError = computed(() => {
      return props.errorMessage ? true : false;
    });
    return {
      dateTimeValue,
      hasError
    };
  }
});
const _hoisted_1$3 = { class: "row items-center justify-end" };
const _hoisted_2$3 = { class: "row items-center justify-end" };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_btn = QBtn;
  const _component_q_date = QDate;
  const _component_q_popup_proxy = QPopupProxy;
  const _component_q_icon = QIcon;
  const _component_q_time = QTime;
  const _component_q_input = QInput;
  const _directive_close_popup = resolveDirective("close-popup");
  return openBlock(), createBlock(_component_q_input, mergeProps({
    modelValue: _ctx.dateTimeValue,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.dateTimeValue = $event),
    outlined: "",
    clearable: "",
    "bottom-slots": _ctx.hasError,
    error: _ctx.hasError,
    "error-message": _ctx.errorMessage
  }, _ctx.$attrs), {
    prepend: withCtx(() => [
      createVNode(_component_q_icon, {
        name: "event",
        class: "cursor-pointer"
      }, {
        default: withCtx(() => [
          createVNode(_component_q_popup_proxy, {
            cover: "",
            "transition-show": "scale",
            "transition-hide": "scale"
          }, {
            default: withCtx(() => [
              createVNode(_component_q_date, {
                modelValue: _ctx.dateTimeValue,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.dateTimeValue = $event),
                mask: "YYYY-MM-DD HH:mm"
              }, {
                default: withCtx(() => [
                  createElementVNode("div", _hoisted_1$3, [
                    withDirectives(createVNode(_component_q_btn, {
                      label: "\u5173\u95ED",
                      color: "primary"
                    }, null, 512), [
                      [_directive_close_popup]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    append: withCtx(() => [
      createVNode(_component_q_icon, {
        name: "access_time",
        class: "cursor-pointer"
      }, {
        default: withCtx(() => [
          createVNode(_component_q_popup_proxy, {
            cover: "",
            "transition-show": "scale",
            "transition-hide": "scale"
          }, {
            default: withCtx(() => [
              createVNode(_component_q_time, {
                modelValue: _ctx.dateTimeValue,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.dateTimeValue = $event),
                mask: "YYYY-MM-DD HH:mm",
                format24h: ""
              }, {
                default: withCtx(() => [
                  createElementVNode("div", _hoisted_2$3, [
                    withDirectives(createVNode(_component_q_btn, {
                      label: "\u5173\u95ED",
                      color: "primary"
                    }, null, 512), [
                      [_directive_close_popup]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 16, ["modelValue", "bottom-slots", "error", "error-message"]);
}
const HDateTime = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
const _sfc_main$b = defineComponent({
  name: "HSelect",
  props: {
    modelValue: { type: [Number, String, Array, Object] },
    optionLabel: { type: String, default: "text" },
    optionValue: { type: String, default: "value" },
    errorMessage: { type: String }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    const hasError = computed(() => {
      return props.errorMessage ? true : false;
    });
    return {
      selectedValue,
      hasError
    };
  }
});
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_select = QSelect;
  return openBlock(), createBlock(_component_q_select, mergeProps({
    modelValue: _ctx.selectedValue,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selectedValue = $event),
    "option-label": _ctx.optionLabel,
    "option-value": _ctx.optionValue,
    outlined: "",
    clearable: "",
    "emit-value": "",
    "map-options": "",
    "transition-show": "scale",
    "transition-hide": "scale",
    "bottom-slots": _ctx.hasError,
    error: _ctx.hasError,
    "error-message": _ctx.errorMessage
  }, _ctx.$attrs), null, 16, ["modelValue", "option-label", "option-value", "bottom-slots", "error", "error-message"]);
}
const HSelect = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
const _sfc_main$a = defineComponent({
  name: "HDuration",
  components: {
    HSelect
  },
  props: {
    modelValue: { type: [String, Number], defalut: "" }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const amount = ref(0);
    const unit = ref("");
    const options = ref(DURATION_UNITS);
    const durationValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    const convertDurationToData = (value) => {
      if (value) {
        let duration = hooks$1.duration(value, "second");
        if (duration) {
          const data2 = duration._data;
          for (let item in data2) {
            let key = item;
            let value2 = data2[key];
            if (value2) {
              amount.value = value2;
              unit.value = key;
            }
          }
        }
      }
    };
    const convertDataToDuration = (amount2, unit2) => {
      if (amount2 && unit2) {
        const u = unit2;
        const result = hooks$1.duration(amount2, u).toISOString();
        durationValue.value = result;
      }
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          convertDurationToData(newValue);
        }
      },
      {
        immediate: true
      }
    );
    watch(
      () => unit.value,
      (newValue) => {
        if (newValue) {
          convertDataToDuration(amount.value, newValue);
        }
      }
    );
    watch(
      () => amount.value,
      (newValue) => {
        if (newValue) {
          convertDataToDuration(newValue, unit.value);
        }
      }
    );
    return {
      durationValue,
      amount,
      unit,
      options
    };
  }
});
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_text_field = resolveComponent("h-text-field");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_container = resolveComponent("h-container");
  return openBlock(), createBlock(_component_h_container, {
    mode: "two",
    gutter: "xs",
    "gutter-col": "",
    horizontal: ""
  }, {
    left: withCtx(() => [
      createVNode(_component_h_text_field, {
        modelValue: _ctx.amount,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.amount = $event),
        modelModifiers: { number: true },
        label: "\u6570\u503C",
        placeholder: "\u8BF7\u8F93\u5165\u6570\u503C",
        type: "number",
        "hide-hint": ""
      }, null, 8, ["modelValue"])
    ]),
    right: withCtx(() => [
      createVNode(_component_h_select, {
        modelValue: _ctx.unit,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.unit = $event),
        options: _ctx.options,
        label: "\u5355\u4F4D",
        "hide-hint": ""
      }, null, 8, ["modelValue", "options"])
    ]),
    _: 1
  });
}
const HDuration = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
const _sfc_main$9 = defineComponent({
  name: "HIconSelect",
  props: {
    modelValue: { type: String },
    optionLabel: { type: String, default: "text" },
    optionValue: { type: String, default: "value" },
    errorMessage: { type: String }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("update:modelValue", newValue);
      }
    });
    let icons = [];
    const options = ref(icons);
    onMounted(() => {
      icons = Object.keys(allIcons).map((icon) => {
        return kebabCase$1(icon);
      });
    });
    const filter = (value, update, abort) => {
      if (value.length < 3) {
        abort();
        return;
      }
      update(() => {
        const needle = value.toLowerCase();
        options.value = icons.filter((v) => v.toLowerCase().match(needle));
      });
    };
    return {
      selectedValue,
      options,
      filter
    };
  }
});
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_icon = QIcon;
  const _component_q_item_section = QItemSection;
  const _component_q_item_label = QItemLabel;
  const _component_q_item = QItem;
  const _component_q_select = QSelect;
  return openBlock(), createBlock(_component_q_select, mergeProps({
    ref: "selectRef",
    modelValue: _ctx.selectedValue,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selectedValue = $event),
    options: _ctx.options,
    outlined: "",
    clearable: "",
    "use-input": "",
    "use-chips": "",
    "emit-value": "",
    "bottom-slots": "",
    "input-debounce": "300",
    "transition-show": "scale",
    "transition-hide": "scale",
    onFilter: _ctx.filter
  }, _ctx.$attrs), createSlots({
    option: withCtx((scope) => [
      createVNode(_component_q_item, normalizeProps(guardReactiveProps(scope.itemProps)), {
        default: withCtx(() => [
          createVNode(_component_q_item_section, { avatar: "" }, {
            default: withCtx(() => [
              createVNode(_component_q_icon, {
                name: scope.opt
              }, null, 8, ["name"])
            ]),
            _: 2
          }, 1024),
          createVNode(_component_q_item_section, null, {
            default: withCtx(() => [
              createVNode(_component_q_item_label, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(scope.opt), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1024)
        ]),
        _: 2
      }, 1040)
    ]),
    "no-option": withCtx(() => [
      createVNode(_component_q_item, null, {
        default: withCtx(() => [
          createVNode(_component_q_item_section, { class: "text-grey" }, {
            default: withCtx(() => [
              createTextVNode("\u6CA1\u6709\u6570\u636E")
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 2
  }, [
    _ctx.selectedValue ? {
      name: "prepend",
      fn: withCtx(() => [
        createVNode(_component_q_icon, {
          name: _ctx.selectedValue,
          color: "primary"
        }, null, 8, ["name"])
      ]),
      key: "0"
    } : void 0
  ]), 1040, ["modelValue", "options", "onFilter"]);
}
const HIconSelect = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const _sfc_main$8 = defineComponent({
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
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_toggle = QToggle;
  return openBlock(), createBlock(_component_q_toggle, mergeProps({
    modelValue: _ctx.switchValue,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.switchValue = $event),
    "true-value": _ctx.trueValue,
    "false-value": _ctx.falseValue,
    color: _ctx.color
  }, _ctx.$attrs), null, 16, ["modelValue", "true-value", "false-value", "color"]);
}
const HSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
const _sfc_main$7 = defineComponent({
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
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
const HTextField = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
HDateTime.install = (app) => {
  app.component(HDateTime.name, HDateTime);
};
HDuration.install = (app) => {
  app.component(HDuration.name, HDuration);
};
HIconSelect.install = (app) => {
  app.component(HIconSelect.name, HIconSelect);
};
HSelect.install = (app) => {
  app.component(HSelect.name, HSelect);
};
HSwitch.install = (app) => {
  app.component(HSwitch.name, HSwitch);
};
HTextField.install = (app) => {
  app.component(HTextField.name, HTextField);
};
const _sfc_main$6 = defineComponent({
  name: "HListItem",
  directives: {
    ClosePopup,
    Ripple
  },
  props: {
    label: { type: String },
    icon: { type: String }
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
const HListItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
HListItem.install = (app) => {
  app.component(HListItem.name, HListItem);
};
const _sfc_main$5 = defineComponent({
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
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
const HLoading = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
HLoading.install = (app) => {
  app.component(HLoading.name, HLoading);
};
const _sfc_main$4 = defineComponent({
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
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
const HPagination = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
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
const _sfc_main$3 = defineComponent({
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
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
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
const HParticles = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
HParticles.install = (app) => {
  app.component(HParticles.name, HParticles);
};
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
const components = [
  HButton,
  HChartCard,
  HColumn,
  HContainer,
  HDateTime,
  HDivider,
  HDuration,
  HIconButton,
  HIconSelect,
  HLabel,
  HListItem,
  HLoading,
  HPagination,
  HParticles,
  HRow,
  HSelect,
  HSignInBackground,
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
  DURATION_UNITS,
  Grid,
  HButton,
  HChartCard,
  HColumn,
  HContainer,
  HDateTime,
  HDivider,
  HDuration,
  HIconButton,
  HIconSelect,
  HLabel,
  HListItem,
  HLoading,
  HPagination,
  HParticles,
  HRow,
  HSelect,
  HSignInBackground,
  HSwitch,
  HTextField,
  HVisibilityButton,
  SpinnerEnum,
  Symbol$1 as Symbol,
  createBackgroundColor,
  createClass,
  createColClass,
  createTextColor,
  index as default,
  hooks$1 as moment
};
