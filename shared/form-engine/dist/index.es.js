var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value2) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __publicField = (obj, key, value2) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value2);
  return value2;
};
import { shortid, lodash } from "@herodotus/utils";
function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map2[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value2) {
  return !!value2 || value2 === "";
}
function normalizeStyle(value2) {
  if (isArray(value2)) {
    const res = {};
    for (let i = 0; i < value2.length; i++) {
      const item = value2[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value2)) {
    return value2;
  } else if (isObject$1(value2)) {
    return value2;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value2) {
  let res = "";
  if (isString(value2)) {
    res = value2;
  } else if (isArray(value2)) {
    for (let i = 0; i < value2.length; i++) {
      const normalized = normalizeClass(value2[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value2)) {
    for (const name in value2) {
      if (value2[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const EMPTY_OBJ = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
const EMPTY_ARR = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove$1 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value2) => objectToString.call(value2);
const toRawType = (value2) => {
  return toTypeString(value2).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value2, oldValue) => !Object.is(value2, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value2) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value: value2
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (process.env.NODE_ENV !== "production") {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : "");
const MAP_KEY_ITERATE_KEY = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target2, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target2);
    if (!depsMap) {
      targetMap.set(target2, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = process.env.NODE_ENV !== "production" ? { effect: activeEffect, target: target2, type, key } : void 0;
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (process.env.NODE_ENV !== "production" && activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger$2(target2, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target2);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target2)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target2)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target2)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target2)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target2)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target2)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = process.env.NODE_ENV !== "production" ? { target: target2, type, key, newValue, oldValue, oldTarget } : void 0;
  if (deps.length === 1) {
    if (deps[0]) {
      if (process.env.NODE_ENV !== "production") {
        triggerEffects(deps[0], eventInfo);
      } else {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    if (process.env.NODE_ENV !== "production") {
      triggerEffects(createDep(effects), eventInfo);
    } else {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (process.env.NODE_ENV !== "production" && effect.onTrigger) {
      effect.onTrigger(extend$1({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target2, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target2)) {
      return target2;
    }
    const targetIsArray = isArray(target2);
    if (!isReadonly2 && targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target2, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target2, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target2, key, value2, receiver) {
    let oldValue = target2[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value2)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow$1(value2) && !isReadonly(value2)) {
        oldValue = toRaw(oldValue);
        value2 = toRaw(value2);
      }
      if (!isArray(target2) && isRef(oldValue) && !isRef(value2)) {
        oldValue.value = value2;
        return true;
      }
    }
    const hadKey = isArray(target2) && isIntegerKey(key) ? Number(key) < target2.length : hasOwn$1(target2, key);
    const result = Reflect.set(target2, key, value2, receiver);
    if (target2 === toRaw(receiver)) {
      if (!hadKey) {
        trigger$2(target2, "add", key, value2);
      } else if (hasChanged(value2, oldValue)) {
        trigger$2(target2, "set", key, value2, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target2, key) {
  const hadKey = hasOwn$1(target2, key);
  const oldValue = target2[key];
  const result = Reflect.deleteProperty(target2, key);
  if (result && hadKey) {
    trigger$2(target2, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target2, key) {
  const result = Reflect.has(target2, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target2, "has", key);
  }
  return result;
}
function ownKeys(target2) {
  track(target2, "iterate", isArray(target2) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target2);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target2, key) {
    if (process.env.NODE_ENV !== "production") {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target2);
    }
    return true;
  },
  deleteProperty(target2, key) {
    if (process.env.NODE_ENV !== "production") {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target2);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend$1({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend$1({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value2) => value2;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1$1(target2, key, isReadonly2 = false, isShallow2 = false) {
  target2 = target2["__v_raw"];
  const rawTarget = toRaw(target2);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target2.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target2.get(rawKey));
  } else if (target2 !== rawTarget) {
    target2.get(key);
  }
}
function has$1$1(key, isReadonly2 = false) {
  const target2 = this["__v_raw"];
  const rawTarget = toRaw(target2);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target2.has(key) : target2.has(key) || target2.has(rawKey);
}
function size$1(target2, isReadonly2 = false) {
  target2 = target2["__v_raw"];
  !isReadonly2 && track(toRaw(target2), "iterate", ITERATE_KEY);
  return Reflect.get(target2, "size", target2);
}
function add(value2) {
  value2 = toRaw(value2);
  const target2 = toRaw(this);
  const proto = getProto(target2);
  const hadKey = proto.has.call(target2, value2);
  if (!hadKey) {
    target2.add(value2);
    trigger$2(target2, "add", value2, value2);
  }
  return this;
}
function set$1$1(key, value2) {
  value2 = toRaw(value2);
  const target2 = toRaw(this);
  const { has: has2, get: get2 } = getProto(target2);
  let hadKey = has2.call(target2, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target2, key);
  } else if (process.env.NODE_ENV !== "production") {
    checkIdentityKeys(target2, has2, key);
  }
  const oldValue = get2.call(target2, key);
  target2.set(key, value2);
  if (!hadKey) {
    trigger$2(target2, "add", key, value2);
  } else if (hasChanged(value2, oldValue)) {
    trigger$2(target2, "set", key, value2, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target2 = toRaw(this);
  const { has: has2, get: get2 } = getProto(target2);
  let hadKey = has2.call(target2, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target2, key);
  } else if (process.env.NODE_ENV !== "production") {
    checkIdentityKeys(target2, has2, key);
  }
  const oldValue = get2 ? get2.call(target2, key) : void 0;
  const result = target2.delete(key);
  if (hadKey) {
    trigger$2(target2, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target2 = toRaw(this);
  const hadItems = target2.size !== 0;
  const oldTarget = process.env.NODE_ENV !== "production" ? isMap(target2) ? new Map(target2) : new Set(target2) : void 0;
  const result = target2.clear();
  if (hadItems) {
    trigger$2(target2, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target2 = observed["__v_raw"];
    const rawTarget = toRaw(target2);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target2.forEach((value2, key) => {
      return callback.call(thisArg, wrap(value2), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target2 = this["__v_raw"];
    const rawTarget = toRaw(target2);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target2[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value: value2, done } = innerIterator.next();
        return done ? { value: value2, done } : {
          value: isPair ? [wrap(value2[0]), wrap(value2[1])] : wrap(value2),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (process.env.NODE_ENV !== "production") {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1$1(this, key);
    },
    get size() {
      return size$1(this);
    },
    has: has$1$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, false, true);
    },
    get size() {
      return size$1(this);
    },
    has: has$1$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, true, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target2, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target2;
    }
    return Reflect.get(hasOwn$1(instrumentations, key) && key in target2 ? instrumentations : target2, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target2, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target2, rawKey)) {
    const type = toRawType(target2);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value2) {
  return value2["__v_skip"] || !Object.isExtensible(value2) ? 0 : targetTypeMap(toRawType(value2));
}
function reactive(target2) {
  if (isReadonly(target2)) {
    return target2;
  }
  return createReactiveObject(target2, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target2) {
  return createReactiveObject(target2, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target2) {
  return createReactiveObject(target2, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target2) {
  return createReactiveObject(target2, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target2, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target2)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`value cannot be made reactive: ${String(target2)}`);
    }
    return target2;
  }
  if (target2["__v_raw"] && !(isReadonly2 && target2["__v_isReactive"])) {
    return target2;
  }
  const existingProxy = proxyMap.get(target2);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target2);
  if (targetType === 0) {
    return target2;
  }
  const proxy = new Proxy(target2, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target2, proxy);
  return proxy;
}
function isReactive(value2) {
  if (isReadonly(value2)) {
    return isReactive(value2["__v_raw"]);
  }
  return !!(value2 && value2["__v_isReactive"]);
}
function isReadonly(value2) {
  return !!(value2 && value2["__v_isReadonly"]);
}
function isShallow$1(value2) {
  return !!(value2 && value2["__v_isShallow"]);
}
function isProxy(value2) {
  return isReactive(value2) || isReadonly(value2);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value2) {
  def(value2, "__v_skip", true);
  return value2;
}
const toReactive = (value2) => isObject$1(value2) ? reactive(value2) : value2;
const toReadonly = (value2) => isObject$1(value2) ? readonly(value2) : value2;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    if (process.env.NODE_ENV !== "production") {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    } else {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    if (process.env.NODE_ENV !== "production") {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    } else {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value2) {
  return createRef(value2, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value2, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value2 : toRaw(value2);
    this._value = __v_isShallow ? value2 : toReactive(value2);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow$1(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target2, key, receiver) => unref(Reflect.get(target2, key, receiver)),
  set: (target2, key, value2, receiver) => {
    const oldValue = target2[key];
    if (isRef(oldValue) && !isRef(value2)) {
      oldValue.value = value2;
      return true;
    } else {
      return Reflect.set(target2, key, value2, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = process.env.NODE_ENV !== "production" ? () => {
      console.warn("Write operation failed: computed value is readonly");
    } : NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (process.env.NODE_ENV !== "production" && debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack$1 = [];
function pushWarningContext(vnode) {
  stack$1.push(vnode);
}
function popWarningContext() {
  stack$1.pop();
}
function warn(msg, ...args) {
  pauseTracking();
  const instance = stack$1.length ? stack$1[stack$1.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack$1[stack$1.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open2 = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open2, ...formatProps(vnode.props), close] : [open2 + close];
}
function formatProps(props2) {
  const res = [];
  const keys = Object.keys(props2);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props2[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value2, raw) {
  if (isString(value2)) {
    value2 = JSON.stringify(value2);
    return raw ? value2 : [`${key}=${value2}`];
  } else if (typeof value2 === "number" || typeof value2 === "boolean" || value2 == null) {
    return raw ? value2 : [`${key}=${value2}`];
  } else if (isRef(value2)) {
    value2 = formatProp(key, toRaw(value2.value), true);
    return raw ? value2 : [`${key}=Ref<`, value2, `>`];
  } else if (isFunction(value2)) {
    return [`${key}=fn${value2.name ? `<${value2.name}>` : ``}`];
  } else {
    value2 = toRaw(value2);
    return raw ? value2 : [`${key}=`, value2];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = process.env.NODE_ENV !== "production" ? ErrorTypeStrings[type] : type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  if (process.env.NODE_ENV !== "production") {
    const info = ErrorTypeStrings[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id2) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue$1[middle]);
    middleJobId < id2 ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue$1.length || !queue$1.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue$1.indexOf(job);
  if (i > flushIndex) {
    queue$1.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  if (process.env.NODE_ENV !== "production") {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue$1.length; i++) {
    const cb = queue$1[i];
    if (cb && cb.pre) {
      if (process.env.NODE_ENV !== "production" && checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue$1.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (process.env.NODE_ENV !== "production") {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (process.env.NODE_ENV !== "production" && checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  if (process.env.NODE_ENV !== "production") {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator);
  const check = process.env.NODE_ENV !== "production" ? (job) => checkRecursiveUpdates(seen, job) : NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (process.env.NODE_ENV !== "production" && check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
if (process.env.NODE_ENV !== "production") {
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id2 = instance.type.__hmrId;
  let record = map.get(id2);
  if (!record) {
    createRecord(id2, instance.type);
    record = map.get(id2);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id2, initialDef) {
  if (map.has(id2)) {
    return false;
  }
  map.set(id2, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id2, newRender) {
  const record = map.get(id2);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id2, newComp) {
  const record = map.get(id2);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      queueJob(instance.parent.update);
      if (instance.parent.type.__asyncLoader && instance.parent.ceReload) {
        instance.parent.ceReload(newComp.styles);
      }
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend$1(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id2, arg) => {
    try {
      return fn(id2, arg);
    } catch (e) {
      console.error(e);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
    }
  };
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target2) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))) {
    const replay = target2.__VUE_DEVTOOLS_HOOK_REPLAY__ = target2.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target2);
    });
    setTimeout(() => {
      if (!devtools) {
        target2.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app2, version2) {
  emit("app:init", app2, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app2) {
  emit("app:unmount", app2);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook("component:added");
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated");
const devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook("component:removed");
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:start");
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:end");
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props2 = instance.vnode.props || EMPTY_OBJ;
  if (process.env.NODE_ENV !== "production") {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props2) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props2[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    }
    if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  if (process.env.NODE_ENV !== "production" || false) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (process.env.NODE_ENV !== "production") {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props2[toHandlerKey(lowerCaseEvent)]) {
      warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props2[handlerName = toHandlerKey(event)] || props2[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props2[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props2[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    if (process.env.NODE_ENV !== "production" || false) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props: props2, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  if (process.env.NODE_ENV !== "production") {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props2, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (process.env.NODE_ENV !== "production" && attrs === props2) {
        markAttrsAccessed();
      }
      result = normalizeVNode(render2.length > 1 ? render2(props2, process.env.NODE_ENV !== "production" ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render2(props2, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (process.env.NODE_ENV !== "production" && result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (process.env.NODE_ENV !== "production" && !accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
        }
        if (eventAttrs.length) {
          warn(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
        }
      }
    }
  }
  if (vnode.dirs) {
    if (process.env.NODE_ENV !== "production" && !isElementRoot(root)) {
      warn(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (process.env.NODE_ENV !== "production" && !isElementRoot(root)) {
      warn(`Component inside <Transition> renders non-element root node that cannot be animated.`);
    }
    root.transition = vnode.transition;
  }
  if (process.env.NODE_ENV !== "production" && setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index2 = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index2] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props2) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props2)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits2 = component.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits2);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits2, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits2);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value2) {
  if (!currentInstance) {
    if (process.env.NODE_ENV !== "production") {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value2;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else if (process.env.NODE_ENV !== "production") {
      warn(`injection "${String(key)}" not found.`);
    }
  } else if (process.env.NODE_ENV !== "production") {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (process.env.NODE_ENV !== "production" && !isFunction(cb)) {
    warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (process.env.NODE_ENV !== "production" && !cb) {
    if (immediate !== void 0) {
      warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s) => {
    warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow$1(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow$1(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        process.env.NODE_ENV !== "production" && warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    process.env.NODE_ENV !== "production" && warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (process.env.NODE_ENV !== "production") {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove$1(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value2, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value2)) {
    cb = value2;
  } else {
    cb = value2.handler;
    options = value2;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value2, seen) {
  if (!isObject$1(value2) || value2["__v_skip"]) {
    return value2;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value2)) {
    return value2;
  }
  seen.add(value2);
  if (isRef(value2)) {
    traverse(value2.value, seen);
  } else if (isArray(value2)) {
    for (let i = 0; i < value2.length; i++) {
      traverse(value2[i], seen);
    }
  } else if (isSet(value2) || isMap(value2)) {
    value2.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject$1(value2)) {
    for (const key in value2) {
      traverse(value2[key], seen);
    }
  }
  return value2;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c of children) {
          if (c.type !== Comment) {
            if (process.env.NODE_ENV !== "production" && hasFound) {
              warn("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            child = c;
            hasFound = true;
            if (!(process.env.NODE_ENV !== "production"))
              break;
          }
        }
      }
      const rawProps = toRaw(props2);
      const { mode } = rawProps;
      if (process.env.NODE_ENV !== "production" && mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props2, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props2;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props2, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
  name: `KeepAlive`,
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const sharedContext = instance.ctx;
    if (!sharedContext.renderer) {
      return () => {
        const children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }
    const cache = /* @__PURE__ */ new Map();
    const keys = /* @__PURE__ */ new Set();
    let current = null;
    if (process.env.NODE_ENV !== "production" || false) {
      instance.__v_cache = cache;
    }
    const parentSuspense = instance.suspense;
    const { renderer: { p: patch, m: move, um: _unmount, o: { createElement } } } = sharedContext;
    const storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
      const instance2 = vnode.component;
      move(vnode, container, anchor, 0, parentSuspense);
      patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
      queuePostRenderEffect(() => {
        instance2.isDeactivated = false;
        if (instance2.a) {
          invokeArrayFns(instance2.a);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
      }, parentSuspense);
      if (process.env.NODE_ENV !== "production" || false) {
        devtoolsComponentAdded(instance2);
      }
    };
    sharedContext.deactivate = (vnode) => {
      const instance2 = vnode.component;
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance2.da) {
          invokeArrayFns(instance2.da);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
        instance2.isDeactivated = true;
      }, parentSuspense);
      if (process.env.NODE_ENV !== "production" || false) {
        devtoolsComponentAdded(instance2);
      }
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type);
        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      const cached = cache.get(key);
      if (!current || cached.type !== current.type) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch(
      () => [props2.include, props2.exclude],
      ([include, exclude]) => {
        include && pruneCache((name) => matches(include, name));
        exclude && pruneCache((name) => !matches(exclude, name));
      },
      { flush: "post", deep: true }
    );
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach((cached) => {
        const { subTree, suspense } = instance;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type) {
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        if (process.env.NODE_ENV !== "production") {
          warn(`KeepAlive should contain exactly one component child.`);
        }
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type;
      const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
      const { include, exclude, max } = props2;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
};
const KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
  if (isArray(pattern)) {
    return pattern.some((p2) => matches(p2, name));
  } else if (isString(pattern)) {
    return pattern.split(",").includes(name);
  } else if (pattern.test) {
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target2) {
  registerKeepAliveHook(hook, "a", target2);
}
function onDeactivated(hook, target2) {
  registerKeepAliveHook(hook, "da", target2);
}
function registerKeepAliveHook(hook, type, target2 = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target2;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target2);
  if (target2) {
    let current = target2.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target2, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target2, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove$1(keepAliveRoot[type], injected);
  }, target2);
}
function resetShapeFlag(vnode) {
  let shapeFlag = vnode.shapeFlag;
  if (shapeFlag & 256) {
    shapeFlag -= 256;
  }
  if (shapeFlag & 512) {
    shapeFlag -= 512;
  }
  vnode.shapeFlag = shapeFlag;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}
function injectHook(type, hook, target2 = currentInstance, prepend = false) {
  if (target2) {
    const hooks = target2[type] || (target2[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target2.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target2);
      const res = callWithAsyncErrorHandling(hook, target2, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (process.env.NODE_ENV !== "production") {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
    warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const createHook = (lifecycle) => (hook, target2 = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target2);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target2 = currentInstance) {
  injectHook("ec", hook, target2);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    process.env.NODE_ENV !== "production" && warn(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value2, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    if (dir.deep) {
      traverse(value2);
    }
    bindings.push({
      dir,
      instance,
      value: value2,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component, false);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (process.env.NODE_ENV !== "production" && warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else if (process.env.NODE_ENV !== "production") {
    warn(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index2) {
  let ret;
  const cached = cache && cache[index2];
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    if (process.env.NODE_ENV !== "production" && !Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index2] = ret;
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => process.env.NODE_ENV !== "production" ? shallowReadonly(i.props) : i.props,
  $attrs: (i) => process.env.NODE_ENV !== "production" ? shallowReadonly(i.attrs) : i.attrs,
  $slots: (i) => process.env.NODE_ENV !== "production" ? shallowReadonly(i.slots) : i.slots,
  $refs: (i) => process.env.NODE_ENV !== "production" ? shallowReadonly(i.refs) : i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
  $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
  $watch: (i) => instanceWatch.bind(i)
});
const isReservedPrefix = (key) => key === "_" || key === "$";
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props: props2, accessCache, type, appContext } = instance;
    if (process.env.NODE_ENV !== "production" && key === "__isVue") {
      return true;
    }
    if (process.env.NODE_ENV !== "production" && setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      return setupState[key];
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props2[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)) {
        accessCache[key] = 3;
        return props2[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        process.env.NODE_ENV !== "production" && markAttrsAccessed();
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (process.env.NODE_ENV !== "production" && currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$1(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value2) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
      setupState[key] = value2;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value2;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      process.env.NODE_ENV !== "production" && warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      process.env.NODE_ENV !== "production" && warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (process.env.NODE_ENV !== "production" && key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value: value2
        });
      } else {
        ctx[key] = value2;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || setupState !== EMPTY_OBJ && hasOwn$1(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target2, key, descriptor) {
    if (descriptor.get != null) {
      target2._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target2, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target2, key, descriptor);
  }
};
if (process.env.NODE_ENV !== "production" && true) {
  PublicInstanceProxyHandlers.ownKeys = (target2) => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target2);
  };
}
function createDevRenderContext(instance) {
  const target2 = {};
  Object.defineProperty(target2, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target2, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target2;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components: components2,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = process.env.NODE_ENV !== "production" ? createDuplicateChecker() : null;
  if (process.env.NODE_ENV !== "production") {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        if (process.env.NODE_ENV !== "production") {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          ctx[key] = methodHandler.bind(publicThis);
        }
        if (process.env.NODE_ENV !== "production") {
          checkDuplicateProperties("Methods", key);
        }
      } else if (process.env.NODE_ENV !== "production") {
        warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (process.env.NODE_ENV !== "production" && !isFunction(dataOptions)) {
      warn(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (process.env.NODE_ENV !== "production" && isPromise(data)) {
      warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      process.env.NODE_ENV !== "production" && warn(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      if (process.env.NODE_ENV !== "production") {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (process.env.NODE_ENV !== "production" && get2 === NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : process.env.NODE_ENV !== "production" ? () => {
        warn(`Write operation failed: computed property "${key}" is readonly.`);
      } : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (process.env.NODE_ENV !== "production") {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components2)
    instance.components = components2;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        if (process.env.NODE_ENV !== "production") {
          warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    if (process.env.NODE_ENV !== "production") {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else if (process.env.NODE_ENV !== "production") {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else if (process.env.NODE_ENV !== "production") {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else if (process.env.NODE_ENV !== "production") {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      process.env.NODE_ENV !== "production" && warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend$1(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend$1(extend$1(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props2 = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props2, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props2)) {
      props2[key] = void 0;
    }
  }
  if (process.env.NODE_ENV !== "production") {
    validateProps(rawProps || {}, props2, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props2 : shallowReactive(props2);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props2;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props: props2, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props2);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!(process.env.NODE_ENV !== "production" && isInHmrContext(instance)) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value2 = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value2 !== attrs[key]) {
              attrs[key] = value2;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props2[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value2, instance, false);
          }
        } else {
          if (value2 !== attrs[key]) {
            attrs[key] = value2;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props2, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn$1(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props2[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props2[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger$2(instance, "set", "$attrs");
  }
  if (process.env.NODE_ENV !== "production") {
    validateProps(rawProps || {}, props2, instance);
  }
}
function setFullProps(instance, rawProps, props2, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value2 = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props2[camelKey] = value2;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value2;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value2 !== attrs[key]) {
          attrs[key] = value2;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props2);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props2[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props2, key, value2, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value2 === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value2 = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value2 = propsDefaults[key] = defaultValue.call(null, props2);
          unsetCurrentInstance();
        }
      } else {
        value2 = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value2 = false;
      } else if (opt[1] && (value2 === "" || value2 === hyphenate(key))) {
        value2 = true;
      }
    }
  }
  return value2;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props2, keys] = normalizePropsOptions(raw2, appContext, true);
      extend$1(normalized, props2);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (process.env.NODE_ENV !== "production" && !isString(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (process.env.NODE_ENV !== "production" && !isObject$1(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else if (process.env.NODE_ENV !== "production") {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props2, instance) {
  const resolvedValues = toRaw(props2);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value2, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value2 == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value2, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value2, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value2)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value2, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value2;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value2 instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value2);
  } else if (expectedType === "Array") {
    valid = isArray(value2);
  } else if (expectedType === "null") {
    valid = value2 === null;
  } else {
    valid = value2 instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value2, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value2);
  const expectedValue = styleValue(value2, expectedType);
  const receivedValue = styleValue(value2, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value2, type) {
  if (type === "String") {
    return `"${value2}"`;
  } else if (type === "Number") {
    return `${Number(value2)}`;
  } else {
    return `${value2}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value2) => isArray(value2) ? value2.map(normalizeVNode) : [normalizeVNode(value2)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (process.env.NODE_ENV !== "production" && currentInstance) {
      warn(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value2 = rawSlots[key];
    if (isFunction(value2)) {
      slots[key] = normalizeSlot(key, value2, ctx);
    } else if (value2 != null) {
      if (process.env.NODE_ENV !== "production" && true) {
        warn(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue(value2);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (process.env.NODE_ENV !== "production" && !isKeepAlive(instance.vnode) && true) {
    warn(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (process.env.NODE_ENV !== "production" && isHmrUpdating) {
        extend$1(slots, children);
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend$1(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      process.env.NODE_ENV !== "production" && warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (process.env.NODE_ENV !== "production") {
          warn(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          process.env.NODE_ENV !== "production" && warn(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else if (process.env.NODE_ENV !== "production") {
          warn(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (process.env.NODE_ENV !== "production") {
            warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app2;
      },
      component(name, component) {
        if (process.env.NODE_ENV !== "production") {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (process.env.NODE_ENV !== "production" && context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (process.env.NODE_ENV !== "production") {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (process.env.NODE_ENV !== "production" && context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (process.env.NODE_ENV !== "production" && rootContainer.__vue_app__) {
            warn(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (process.env.NODE_ENV !== "production") {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          if (process.env.NODE_ENV !== "production" || false) {
            app2._instance = vnode.component;
            devtoolsInitApp(app2, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else if (process.env.NODE_ENV !== "production") {
          warn(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app2._container);
          if (process.env.NODE_ENV !== "production" || false) {
            app2._instance = null;
            devtoolsUnmountApp(app2);
          }
          delete app2._container.__vue_app__;
        } else if (process.env.NODE_ENV !== "production") {
          warn(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value2) {
        if (process.env.NODE_ENV !== "production" && key in context.provides) {
          warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value2;
        return app2;
      }
    };
    return app2;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value2 = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (process.env.NODE_ENV !== "production" && !owner) {
    warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn$1(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value2, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray(existing) && remove$1(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn$1(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value2;
          if (hasOwn$1(setupState, ref2)) {
            setupState[ref2] = value2;
          }
        } else if (_isRef) {
          ref2.value = value2;
          if (rawRef.k)
            refs[rawRef.k] = value2;
        } else if (process.env.NODE_ENV !== "production") {
          warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value2) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (process.env.NODE_ENV !== "production") {
      warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  if (process.env.NODE_ENV !== "production" || false) {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  if (process.env.NODE_ENV !== "production" || false) {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
function initFeatureFlags() {
  const needWarn = [];
  if (process.env.NODE_ENV !== "production" && needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target2 = getGlobalThis();
  target2.__VUE__ = true;
  if (process.env.NODE_ENV !== "production" || false) {
    setDevtoolsHook(target2.__VUE_DEVTOOLS_GLOBAL_HOOK__, target2);
  }
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = process.env.NODE_ENV !== "production" && isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else if (process.env.NODE_ENV !== "production") {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (process.env.NODE_ENV !== "production") {
          warn("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props: props2, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props2 && props2.is, props2);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    if (props2) {
      for (const key in props2) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props2[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props2) {
        hostPatchProp(el, "value", null, props2.value);
      }
      if (vnodeHook = props2.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (process.env.NODE_ENV !== "production" || false) {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props2 && props2.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (process.env.NODE_ENV !== "production" && subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (process.env.NODE_ENV !== "production" && isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      if (process.env.NODE_ENV !== "production" && parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (process.env.NODE_ENV !== "production" && (isHmrUpdating || patchFlag & 2048)) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (process.env.NODE_ENV !== "production" && parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        } else if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (process.env.NODE_ENV !== "production" && instance.type.__hmrId) {
      registerHMR(instance);
    }
    if (process.env.NODE_ENV !== "production") {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      if (process.env.NODE_ENV !== "production") {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      if (process.env.NODE_ENV !== "production") {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    if (process.env.NODE_ENV !== "production") {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (process.env.NODE_ENV !== "production") {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        if (process.env.NODE_ENV !== "production") {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props: props2 } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (process.env.NODE_ENV !== "production") {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            if (process.env.NODE_ENV !== "production") {
              endMeasure(instance, `render`);
            }
            if (process.env.NODE_ENV !== "production") {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            if (process.env.NODE_ENV !== "production") {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (process.env.NODE_ENV !== "production") {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          if (process.env.NODE_ENV !== "production") {
            endMeasure(instance, `render`);
          }
          if (process.env.NODE_ENV !== "production") {
            startMeasure(instance, `patch`);
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          if (process.env.NODE_ENV !== "production") {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        if (process.env.NODE_ENV !== "production" || false) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        if (process.env.NODE_ENV !== "production") {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        if (process.env.NODE_ENV !== "production") {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        if (process.env.NODE_ENV !== "production") {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (process.env.NODE_ENV !== "production") {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          hostParentNode(prevTree.el),
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        if (process.env.NODE_ENV !== "production") {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
        if (process.env.NODE_ENV !== "production" || false) {
          devtoolsComponentUpdated(instance);
        }
        if (process.env.NODE_ENV !== "production") {
          popWarningContext();
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update2),
      instance.scope
    );
    const update2 = instance.update = () => effect.run();
    update2.id = instance.uid;
    toggleRecurse(instance, true);
    if (process.env.NODE_ENV !== "production") {
      effect.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
      effect.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
      update2.ownerInstance = instance;
    }
    update2();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (process.env.NODE_ENV !== "production" && keyToNewIndexMap.has(nextChild.key)) {
            warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props: props2, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (process.env.NODE_ENV !== "production" && vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (process.env.NODE_ENV !== "production" && instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update: update2, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update2) {
      update2.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    if (process.env.NODE_ENV !== "production" || false) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update: update2 }, allowed) {
  effect.allowRecurse = update2.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (process.env.NODE_ENV !== "production" && c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props2) => props2 && (props2.disabled || props2.disabled === "");
const isTargetSVG = (target2) => typeof SVGElement !== "undefined" && target2 instanceof SVGElement;
const resolveTarget = (props2, select) => {
  const targetSelector = props2 && props2.to;
  if (isString(targetSelector)) {
    if (!select) {
      process.env.NODE_ENV !== "production" && warn(`Current renderer does not support string target for Teleports. (missing querySelector renderer option)`);
      return null;
    } else {
      const target2 = select(targetSelector);
      if (!target2) {
        process.env.NODE_ENV !== "production" && warn(`Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`);
      }
      return target2;
    }
  } else {
    if (process.env.NODE_ENV !== "production" && !targetSelector && !isTeleportDisabled(props2)) {
      warn(`Invalid Teleport target: ${targetSelector}`);
    }
    return targetSelector;
  }
};
const TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (process.env.NODE_ENV !== "production" && isHmrUpdating) {
      optimized = false;
      dynamicChildren = null;
    }
    if (n1 == null) {
      const placeholder = n2.el = process.env.NODE_ENV !== "production" ? createComment("teleport start") : createText("");
      const mainAnchor = n2.anchor = process.env.NODE_ENV !== "production" ? createComment("teleport end") : createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target2 = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target2) {
        insert(targetAnchor, target2);
        isSVG = isSVG || isTargetSVG(target2);
      } else if (process.env.NODE_ENV !== "production" && !disabled) {
        warn("Invalid Teleport target on mount:", target2, `(${typeof target2})`);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target2) {
        mount(target2, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target2 = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target2;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target2);
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(n2, container, mainAnchor, internals, 1);
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0);
          } else if (process.env.NODE_ENV !== "production") {
            warn("Invalid Teleport target on update:", target2, `(${typeof target2})`);
          }
        } else if (wasDisabled) {
          moveTeleport(n2, target2, targetAnchor, internals, 1);
        }
      }
    }
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target: target2, props: props2 } = vnode;
    if (target2) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props2)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props: props2 } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props2)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, parentAnchor, 2);
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
  const target2 = vnode.target = resolveTarget(vnode.props, querySelector);
  if (target2) {
    const targetNode = target2._lpa || target2.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(targetNode, vnode, target2, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
const Fragment = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0);
const Text = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0);
const Comment = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
const Static = Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value2) {
  isBlockTreeEnabled += value2;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props2, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props2, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props2, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props2, children, patchFlag, dynamicProps, true));
}
function isVNode(value2) {
  return value2 ? value2.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (process.env.NODE_ENV !== "production" && n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...args);
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props: props2,
    key: props2 && normalizeKey(props2),
    ref: props2 && normalizeRef(props2),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (process.env.NODE_ENV !== "production" && vnode.key !== vnode.key) {
    warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = process.env.NODE_ENV !== "production" ? createVNodeWithArgsTransform : _createVNode;
function _createVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (process.env.NODE_ENV !== "production" && !type) {
      warn(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props2, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props2) {
    props2 = guardReactiveProps(props2);
    let { class: klass, style } = props2;
    if (klass && !isString(klass)) {
      props2.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend$1({}, style);
      }
      props2.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
  if (process.env.NODE_ENV !== "production" && shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
  }
  return createBaseVNode(type, props2, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props2) {
  if (!props2)
    return null;
  return isProxy(props2) || InternalObjectKey in props2 ? extend$1({}, props2) : props2;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props: props2, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props2 || {}, extraProps) : props2;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid$1$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (process.env.NODE_ENV !== "production") {
    instance.ctx = createDevRenderContext(instance);
  } else {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props: props2, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props2, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a2;
  const Component = instance.type;
  if (process.env.NODE_ENV !== "production") {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  if (process.env.NODE_ENV !== "production") {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [process.env.NODE_ENV !== "production" ? shallowReadonly(instance.props) : instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (process.env.NODE_ENV !== "production" && !instance.suspense) {
          const name = (_a2 = Component.name) !== null && _a2 !== void 0 ? _a2 : "Anonymous";
          warn(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (process.env.NODE_ENV !== "production" && isVNode(setupResult)) {
      warn(`setup() should not return VNodes directly - return a render function instead.`);
    }
    if (process.env.NODE_ENV !== "production" || false) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    if (process.env.NODE_ENV !== "production") {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (process.env.NODE_ENV !== "production" && setupResult !== void 0) {
    warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (process.env.NODE_ENV !== "production") {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend$1(extend$1({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
        if (process.env.NODE_ENV !== "production") {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (process.env.NODE_ENV !== "production" && !Component.render && instance.render === NOOP && !isSSR) {
    if (Component.template) {
      warn(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, process.env.NODE_ENV !== "production" ? {
    get(target2, key) {
      markAttrsAccessed();
      track(instance, "get", "$attrs");
      return target2[key];
    },
    set() {
      warn(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn(`setupContext.attrs is readonly.`);
      return false;
    }
  } : {
    get(target2, key) {
      track(instance, "get", "$attrs");
      return target2[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (process.env.NODE_ENV !== "production" && instance.exposed) {
      warn(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  if (process.env.NODE_ENV !== "production") {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  } else {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target2, key) {
        if (key in target2) {
          return target2[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value2) {
  return isFunction(value2) && "__vccOpts" in value2;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$1(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
Symbol(process.env.NODE_ENV !== "production" ? `ssrContext` : ``);
function isShallow(value2) {
  return !!(value2 && value2["__v_isShallow"]);
}
function initCustomFormatter() {
  if (!(process.env.NODE_ENV !== "production") || typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter2 = {
    header(obj) {
      if (!isObject$1(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target2) {
    target2 = extend$1({}, target2);
    if (!Object.keys(target2).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target2).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target2[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject$1(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray(opts) && opts.includes(key) || isObject$1(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter2);
  } else {
    window.devtoolsFormatters = [formatter2];
  }
}
const version = "3.2.40";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props2) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props2 && props2.multiple != null) {
      el.setAttribute("multiple", props2.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id2) {
    el.setAttribute(id2, "");
  },
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value2, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value2 = (value2 ? [value2, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value2 == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value2);
  } else {
    el.className = value2;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes$1 = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes$1.length; i++) {
    const prefixed = prefixes$1[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value2, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value2 == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value2);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value2 == null || isBoolean2 && !includeBooleanAttr(value2)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value2);
    }
  }
}
function patchDOMProp(el, key, value2, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value2 == null ? "" : value2;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value2;
    const newValue = value2 == null ? "" : value2;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value2 == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value2 === "" || value2 == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value2 = includeBooleanAttr(value2);
    } else if (value2 == null && type === "string") {
      value2 = "";
      needRemove = true;
    } else if (type === "number") {
      value2 = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value2;
  } catch (e) {
    if (process.env.NODE_ENV !== "production" && !needRemove) {
      warn(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value2} is invalid.`, e);
    }
  }
  needRemove && el.removeAttribute(key);
}
const [_getNow, skipTimestampCheck] = /* @__PURE__ */ (() => {
  let _getNow2 = Date.now;
  let skipTimestampCheck2 = false;
  if (typeof window !== "undefined") {
    if (Date.now() > document.createEvent("Event").timeStamp) {
      _getNow2 = performance.now.bind(performance);
    }
    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck2 = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }
  return [_getNow2, skipTimestampCheck2];
})();
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    const timeStamp = e.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value2) {
  if (isArray(value2)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value2.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value2;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value2, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value2)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value2)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props2, { slots }) => h(BaseTransition, resolveTransitionProps(props2), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = /* @__PURE__ */ extend$1({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type, duration: duration2, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration2);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend$1(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration2) {
  if (duration2 == null) {
    return null;
  } else if (isObject$1(duration2)) {
    return [NumberOf(duration2.enter), NumberOf(duration2.leave)];
  } else {
    const n = NumberOf(duration2);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  if (process.env.NODE_ENV !== "production")
    validateDuration(res);
  return res;
}
function validateDuration(val) {
  if (typeof val !== "number") {
    warn(`<transition> explicit duration is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn(`<transition> explicit duration is NaN - the duration expression might be incorrect.`);
  }
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id2 = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id2 === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout: timeout2, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout2 + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(TRANSITION + "Delay");
  const transitionDurations = getStyleProperties(TRANSITION + "Duration");
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + "Delay");
  const animationDurations = getStyleProperties(ANIMATION + "Duration");
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout2 = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout2 = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout2 = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout2 = Math.max(transitionTimeout, animationTimeout);
    type = timeout2 > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
  return {
    type,
    timeout: timeout2,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const vShow = {
  beforeMount(el, { value: value2 }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value2) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value2);
    }
  },
  mounted(el, { value: value2 }, { transition }) {
    if (transition && value2) {
      transition.enter(el);
    }
  },
  updated(el, { value: value2, oldValue }, { transition }) {
    if (!value2 === !oldValue)
      return;
    if (transition) {
      if (value2) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value2);
    }
  },
  beforeUnmount(el, { value: value2 }) {
    setDisplay(el, value2);
  }
};
function setDisplay(el, value2) {
  el.style.display = value2 ? el._vod : "none";
}
const rendererOptions = /* @__PURE__ */ extend$1({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  if (process.env.NODE_ENV !== "production") {
    injectNativeTagCheck(app2);
    injectCompilerOptionsCheck(app2);
  }
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function injectNativeTagCheck(app2) {
  Object.defineProperty(app2.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app2) {
  {
    const isCustomElement = app2.config.isCustomElement;
    Object.defineProperty(app2.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
      }
    });
    const compilerOptions = app2.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
    Object.defineProperty(app2.config, "compilerOptions", {
      get() {
        warn(msg);
        return compilerOptions;
      },
      set() {
        warn(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (process.env.NODE_ENV !== "production" && !res) {
      warn(`Failed to mount app: mount target selector "${container}" returned null.`);
    }
    return res;
  }
  if (process.env.NODE_ENV !== "production" && window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
  }
  return container;
}
function initDev() {
  {
    initCustomFormatter();
  }
}
if (process.env.NODE_ENV !== "production") {
  initDev();
}
/*!
 * Quasar Framework v2.9.0
 * (c) 2015-present Razvan Stoenescu
 * Released under the MIT License.
 */
function injectProp(e, t, o, n) {
  return Object.defineProperty(e, t, { get: o, set: n, enumerable: true }), e;
}
function injectMultipleProps(e, t) {
  for (const o in t)
    injectProp(e, o, t[o]);
  return e;
}
const isRuntimeSsrPreHydration = ref(false);
let iosCorrection;
function getMatch(e, t) {
  const o = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(vivaldi)[\/]([\w.]+)/.exec(e) || /(chrome|crios)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(firefox|fxios)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) || [];
  return { browser: o[5] || o[3] || o[1] || "", version: o[2] || o[4] || "0", versionNumber: o[4] || o[2] || "0", platform: t[0] || "" };
}
function getPlatformMatch(e) {
  return /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(silk)/.exec(e) || /(android)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || /(playbook)/.exec(e) || /(bb)/.exec(e) || /(blackberry)/.exec(e) || [];
}
const hasTouch = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function applyIosCorrection(e) {
  iosCorrection = { is: { ...e } }, delete e.mac, delete e.desktop;
  const t = Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(e, { mobile: true, ios: true, platform: t, [t]: true });
}
function getPlatform(e) {
  const t = e.toLowerCase(), o = getPlatformMatch(t), n = getMatch(t, o), a = {};
  n.browser && (a[n.browser] = true, a.version = n.version, a.versionNumber = parseInt(n.versionNumber, 10)), n.platform && (a[n.platform] = true);
  const l = a.android || a.ios || a.bb || a.blackberry || a.ipad || a.iphone || a.ipod || a.kindle || a.playbook || a.silk || a["windows phone"];
  return true === l || t.indexOf("mobile") > -1 ? (a.mobile = true, a.edga || a.edgios ? (a.edge = true, n.browser = "edge") : a.crios ? (a.chrome = true, n.browser = "chrome") : a.fxios && (a.firefox = true, n.browser = "firefox")) : a.desktop = true, (a.ipod || a.ipad || a.iphone) && (a.ios = true), a["windows phone"] && (a.winphone = true, delete a["windows phone"]), (a.chrome || a.opr || a.safari || a.vivaldi || true === a.mobile && true !== a.ios && true !== l) && (a.webkit = true), a.edg && (n.browser = "edgechromium", a.edgeChromium = true), (a.safari && a.blackberry || a.bb) && (n.browser = "blackberry", a.blackberry = true), a.safari && a.playbook && (n.browser = "playbook", a.playbook = true), a.opr && (n.browser = "opera", a.opera = true), a.safari && a.android && (n.browser = "android", a.android = true), a.safari && a.kindle && (n.browser = "kindle", a.kindle = true), a.safari && a.silk && (n.browser = "silk", a.silk = true), a.vivaldi && (n.browser = "vivaldi", a.vivaldi = true), a.name = n.browser, a.platform = n.platform, t.indexOf("electron") > -1 ? a.electron = true : document.location.href.indexOf("-extension://") > -1 ? a.bex = true : (void 0 !== window.Capacitor ? (a.capacitor = true, a.nativeMobile = true, a.nativeMobileWrapper = "capacitor") : void 0 === window._cordovaNative && void 0 === window.cordova || (a.cordova = true, a.nativeMobile = true, a.nativeMobileWrapper = "cordova"), true === hasTouch && true === a.mac && (true === a.desktop && true === a.safari || true === a.nativeMobile && true !== a.android && true !== a.ios && true !== a.ipad) && applyIosCorrection(a)), a;
}
const userAgent = navigator.userAgent || navigator.vendor || window.opera, ssrClient = { has: { touch: false, webStorage: false }, within: { iframe: false } }, client = { userAgent, is: getPlatform(userAgent), has: { touch: hasTouch }, within: { iframe: window.self !== window.top } }, Platform = { install(e) {
  const { $q: t } = e;
  true === isRuntimeSsrPreHydration.value ? (e.onSSRHydrated.push(() => {
    isRuntimeSsrPreHydration.value = false, Object.assign(t.platform, client), iosCorrection = void 0;
  }), t.platform = reactive(this)) : t.platform = this;
} };
{
  let e;
  injectProp(client.has, "webStorage", () => {
    if (void 0 !== e)
      return e;
    try {
      if (window.localStorage)
        return e = true, true;
    } catch (e2) {
    }
    return e = false, false;
  }), true === client.is.ios && window.navigator.vendor.toLowerCase().indexOf("apple"), true === isRuntimeSsrPreHydration.value ? Object.assign(Platform, client, iosCorrection, ssrClient) : Object.assign(Platform, client);
}
var defineReactivePlugin = (e, t) => {
  const o = reactive(e);
  for (const n in e)
    injectProp(t, n, () => o[n], (e2) => {
      o[n] = e2;
    });
  return t;
};
const listenOpts = { hasPassive: false, passiveCapture: true, notPassiveCapture: true };
try {
  const e = Object.defineProperty({}, "passive", { get() {
    Object.assign(listenOpts, { hasPassive: true, passive: { passive: true }, notPassive: { passive: false }, passiveCapture: { passive: true, capture: true }, notPassiveCapture: { passive: false, capture: true } });
  } });
  window.addEventListener("qtest", null, e), window.removeEventListener("qtest", null, e);
} catch (e) {
}
function noop() {
}
function leftClick(e) {
  return 0 === e.button;
}
function position(e) {
  return e.touches && e.touches[0] ? e = e.touches[0] : e.changedTouches && e.changedTouches[0] ? e = e.changedTouches[0] : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]), { top: e.clientY, left: e.clientX };
}
function getEventPath(e) {
  if (e.path)
    return e.path;
  if (e.composedPath)
    return e.composedPath();
  const t = [];
  let o = e.target;
  while (o) {
    if (t.push(o), "HTML" === o.tagName)
      return t.push(document), t.push(window), t;
    o = o.parentElement;
  }
}
function stop(e) {
  e.stopPropagation();
}
function prevent(e) {
  false !== e.cancelable && e.preventDefault();
}
function stopAndPrevent(e) {
  false !== e.cancelable && e.preventDefault(), e.stopPropagation();
}
function preventDraggable(e, t) {
  if (void 0 === e || true === t && true === e.__dragPrevented)
    return;
  const o = true === t ? (e2) => {
    e2.__dragPrevented = true, e2.addEventListener("dragstart", prevent, listenOpts.notPassiveCapture);
  } : (e2) => {
    delete e2.__dragPrevented, e2.removeEventListener("dragstart", prevent, listenOpts.notPassiveCapture);
  };
  e.querySelectorAll("a, img").forEach(o);
}
function addEvt(e, t, o) {
  const n = `__q_${t}_evt`;
  e[n] = void 0 !== e[n] ? e[n].concat(o) : o, o.forEach((t2) => {
    t2[0].addEventListener(t2[1], e[t2[2]], listenOpts[t2[3]]);
  });
}
function cleanEvt(e, t) {
  const o = `__q_${t}_evt`;
  void 0 !== e[o] && (e[o].forEach((t2) => {
    t2[0].removeEventListener(t2[1], e[t2[2]], listenOpts[t2[3]]);
  }), e[o] = void 0);
}
function debounce(e, t = 250, o) {
  let n;
  function a() {
    const a2 = arguments, l = () => {
      n = void 0, true !== o && e.apply(this, a2);
    };
    clearTimeout(n), true === o && void 0 === n && e.apply(this, a2), n = setTimeout(l, t);
  }
  return a.cancel = () => {
    clearTimeout(n);
  }, a;
}
const SIZE_LIST = ["sm", "md", "lg", "xl"], { passive: passive$4 } = listenOpts;
defineReactivePlugin({ width: 0, height: 0, name: "xs", sizes: { sm: 600, md: 1024, lg: 1440, xl: 1920 }, lt: { sm: true, md: true, lg: true, xl: true }, gt: { xs: false, sm: false, md: false, lg: false }, xs: true, sm: false, md: false, lg: false, xl: false }, { setSizes: noop, setDebounce: noop, install({ $q: e, onSSRHydrated: t }) {
  if (e.screen = this, true === this.__installed)
    return void (void 0 !== e.config.screen && (false === e.config.screen.bodyClasses ? document.body.classList.remove(`screen--${this.name}`) : this.__update(true)));
  const { visualViewport: o } = window, n = o || window, a = document.scrollingElement || document.documentElement, l = void 0 === o || true === client.is.mobile ? () => [Math.max(window.innerWidth, a.clientWidth), Math.max(window.innerHeight, a.clientHeight)] : () => [o.width * o.scale + window.innerWidth - a.clientWidth, o.height * o.scale + window.innerHeight - a.clientHeight], i = void 0 !== e.config.screen && true === e.config.screen.bodyClasses;
  this.__update = (e2) => {
    const [t2, o2] = l();
    if (o2 !== this.height && (this.height = o2), t2 !== this.width)
      this.width = t2;
    else if (true !== e2)
      return;
    let n2 = this.sizes;
    this.gt.xs = t2 >= n2.sm, this.gt.sm = t2 >= n2.md, this.gt.md = t2 >= n2.lg, this.gt.lg = t2 >= n2.xl, this.lt.sm = t2 < n2.sm, this.lt.md = t2 < n2.md, this.lt.lg = t2 < n2.lg, this.lt.xl = t2 < n2.xl, this.xs = this.lt.sm, this.sm = true === this.gt.xs && true === this.lt.md, this.md = true === this.gt.sm && true === this.lt.lg, this.lg = true === this.gt.md && true === this.lt.xl, this.xl = this.gt.lg, n2 = (true === this.xs ? "xs" : true === this.sm && "sm") || true === this.md && "md" || true === this.lg && "lg" || "xl", n2 !== this.name && (true === i && (document.body.classList.remove(`screen--${this.name}`), document.body.classList.add(`screen--${n2}`)), this.name = n2);
  };
  let r, s = {}, u = 16;
  this.setSizes = (e2) => {
    SIZE_LIST.forEach((t2) => {
      void 0 !== e2[t2] && (s[t2] = e2[t2]);
    });
  }, this.setDebounce = (e2) => {
    u = e2;
  };
  const c = () => {
    const e2 = getComputedStyle(document.body);
    e2.getPropertyValue("--q-size-sm") && SIZE_LIST.forEach((t2) => {
      this.sizes[t2] = parseInt(e2.getPropertyValue(`--q-size-${t2}`), 10);
    }), this.setSizes = (e3) => {
      SIZE_LIST.forEach((t2) => {
        e3[t2] && (this.sizes[t2] = e3[t2]);
      }), this.__update(true);
    }, this.setDebounce = (e3) => {
      void 0 !== r && n.removeEventListener("resize", r, passive$4), r = e3 > 0 ? debounce(this.__update, e3) : this.__update, n.addEventListener("resize", r, passive$4);
    }, this.setDebounce(u), Object.keys(s).length > 0 ? (this.setSizes(s), s = void 0) : this.__update(), true === i && "xs" === this.name && document.body.classList.add("screen--xs");
  };
  true === isRuntimeSsrPreHydration.value ? t.push(c) : c();
} });
const Plugin$9 = defineReactivePlugin({ isActive: false, mode: false }, { __media: void 0, set(e) {
  Plugin$9.mode = e, "auto" === e ? (void 0 === Plugin$9.__media && (Plugin$9.__media = window.matchMedia("(prefers-color-scheme: dark)"), Plugin$9.__updateMedia = () => {
    Plugin$9.set("auto");
  }, Plugin$9.__media.addListener(Plugin$9.__updateMedia)), e = Plugin$9.__media.matches) : void 0 !== Plugin$9.__media && (Plugin$9.__media.removeListener(Plugin$9.__updateMedia), Plugin$9.__media = void 0), Plugin$9.isActive = true === e, document.body.classList.remove(`body--${true === e ? "light" : "dark"}`), document.body.classList.add(`body--${true === e ? "dark" : "light"}`);
}, toggle() {
  Plugin$9.set(false === Plugin$9.isActive);
}, install({ $q: e, onSSRHydrated: t, ssrContext: o }) {
  const { dark: n } = e.config;
  if (e.dark = this, true === this.__installed && void 0 === n)
    return;
  this.isActive = true === n;
  const a = void 0 !== n && n;
  if (true === isRuntimeSsrPreHydration.value) {
    const e2 = (e3) => {
      this.__fromSSR = e3;
    }, o2 = this.set;
    this.set = e2, e2(a), t.push(() => {
      this.set = o2, this.set(this.__fromSSR);
    });
  } else
    this.set(a);
} }), getTrue = () => true;
function filterInvalidPath(e) {
  return "string" === typeof e && "" !== e && "/" !== e && "#/" !== e;
}
function normalizeExitPath(e) {
  return true === e.startsWith("#") && (e = e.substring(1)), false === e.startsWith("/") && (e = "/" + e), true === e.endsWith("/") && (e = e.substring(0, e.length - 1)), "#" + e;
}
function getShouldExitFn(e) {
  if (false === e.backButtonExit)
    return () => false;
  if ("*" === e.backButtonExit)
    return getTrue;
  const t = ["#/"];
  return true === Array.isArray(e.backButtonExit) && t.push(...e.backButtonExit.filter(filterInvalidPath).map(normalizeExitPath)), () => t.includes(window.location.hash);
}
var History = { __history: [], add: noop, remove: noop, install({ $q: e }) {
  if (true === this.__installed)
    return;
  const { cordova: t, capacitor: o } = client.is;
  if (true !== t && true !== o)
    return;
  const n = e.config[true === t ? "cordova" : "capacitor"];
  if (void 0 !== n && false === n.backButton)
    return;
  if (true === o && (void 0 === window.Capacitor || void 0 === window.Capacitor.Plugins.App))
    return;
  this.add = (e2) => {
    void 0 === e2.condition && (e2.condition = getTrue), this.__history.push(e2);
  }, this.remove = (e2) => {
    const t2 = this.__history.indexOf(e2);
    t2 >= 0 && this.__history.splice(t2, 1);
  };
  const a = getShouldExitFn(Object.assign({ backButtonExit: true }, n)), l = () => {
    if (this.__history.length) {
      const e2 = this.__history[this.__history.length - 1];
      true === e2.condition() && (this.__history.pop(), e2.handler());
    } else
      true === a() ? navigator.app.exitApp() : window.history.back();
  };
  true === t ? document.addEventListener("deviceready", () => {
    document.addEventListener("backbutton", l, false);
  }) : window.Capacitor.Plugins.App.addListener("backButton", l);
} }, defaultLang = { isoName: "en-US", nativeName: "English (US)", label: { clear: "Clear", ok: "OK", cancel: "Cancel", close: "Close", set: "Set", select: "Select", reset: "Reset", remove: "Remove", update: "Update", create: "Create", search: "Search", filter: "Filter", refresh: "Refresh", expand: (e) => e ? `Expand "${e}"` : "Expand", collapse: (e) => e ? `Collapse "${e}"` : "Collapse" }, date: { days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), firstDayOfWeek: 0, format24h: false, pluralDay: "days" }, table: { noData: "No data available", noResults: "No matching records found", loading: "Loading...", selectedRecords: (e) => 1 === e ? "1 record selected." : (0 === e ? "No" : e) + " records selected.", recordsPerPage: "Records per page:", allRows: "All", pagination: (e, t, o) => e + "-" + t + " of " + o, columns: "Columns" }, editor: { url: "URL", bold: "Bold", italic: "Italic", strikethrough: "Strikethrough", underline: "Underline", unorderedList: "Unordered List", orderedList: "Ordered List", subscript: "Subscript", superscript: "Superscript", hyperlink: "Hyperlink", toggleFullscreen: "Toggle Fullscreen", quote: "Quote", left: "Left align", center: "Center align", right: "Right align", justify: "Justify align", print: "Print", outdent: "Decrease indentation", indent: "Increase indentation", removeFormat: "Remove formatting", formatting: "Formatting", fontSize: "Font Size", align: "Align", hr: "Insert Horizontal Rule", undo: "Undo", redo: "Redo", heading1: "Heading 1", heading2: "Heading 2", heading3: "Heading 3", heading4: "Heading 4", heading5: "Heading 5", heading6: "Heading 6", paragraph: "Paragraph", code: "Code", size1: "Very small", size2: "A bit small", size3: "Normal", size4: "Medium-large", size5: "Big", size6: "Very big", size7: "Maximum", defaultFont: "Default Font", viewSource: "View Source" }, tree: { noNodes: "No nodes available", noResults: "No matching nodes found" } };
function getLocale() {
  const e = true === Array.isArray(navigator.languages) && navigator.languages.length > 0 ? navigator.languages[0] : navigator.language;
  if ("string" === typeof e)
    return e.split(/[-_]/).map((e2, t) => 0 === t ? e2.toLowerCase() : t > 1 || e2.length < 4 ? e2.toUpperCase() : e2[0].toUpperCase() + e2.slice(1).toLowerCase()).join("-");
}
const Plugin$8 = defineReactivePlugin({ __langPack: {} }, { getLocale, set(e = defaultLang, t) {
  const o = { ...e, rtl: true === e.rtl, getLocale };
  {
    const e2 = document.documentElement;
    e2.setAttribute("dir", true === o.rtl ? "rtl" : "ltr"), e2.setAttribute("lang", o.isoName), o.set = Plugin$8.set, Object.assign(Plugin$8.__langPack, o), Plugin$8.props = o, Plugin$8.isoName = o.isoName, Plugin$8.nativeName = o.nativeName;
  }
}, install({ $q: e, lang: t, ssrContext: o }) {
  e.lang = Plugin$8.__langPack, true === this.__installed ? void 0 !== t && this.set(t) : this.set(t || defaultLang);
} });
function shouldIgnoreKey(e) {
  return e !== Object(e) || true === e.isComposing || true === e.qKeyEvent;
}
function isKeyCode(e, t) {
  return true !== shouldIgnoreKey(e) && [].concat(t).includes(e.keyCode);
}
var materialIcons = { name: "material-icons", type: { positive: "check_circle", negative: "warning", info: "info", warning: "priority_high" }, arrow: { up: "arrow_upward", right: "arrow_forward", down: "arrow_downward", left: "arrow_back", dropdown: "arrow_drop_down" }, chevron: { left: "chevron_left", right: "chevron_right" }, colorPicker: { spectrum: "gradient", tune: "tune", palette: "style" }, pullToRefresh: { icon: "refresh" }, carousel: { left: "chevron_left", right: "chevron_right", up: "keyboard_arrow_up", down: "keyboard_arrow_down", navigationIcon: "lens" }, chip: { remove: "cancel", selected: "check" }, datetime: { arrowLeft: "chevron_left", arrowRight: "chevron_right", now: "access_time", today: "today" }, editor: { bold: "format_bold", italic: "format_italic", strikethrough: "strikethrough_s", underline: "format_underlined", unorderedList: "format_list_bulleted", orderedList: "format_list_numbered", subscript: "vertical_align_bottom", superscript: "vertical_align_top", hyperlink: "link", toggleFullscreen: "fullscreen", quote: "format_quote", left: "format_align_left", center: "format_align_center", right: "format_align_right", justify: "format_align_justify", print: "print", outdent: "format_indent_decrease", indent: "format_indent_increase", removeFormat: "format_clear", formatting: "text_format", fontSize: "format_size", align: "format_align_left", hr: "remove", undo: "undo", redo: "redo", heading: "format_size", code: "code", size: "format_size", font: "font_download", viewSource: "code" }, expansionItem: { icon: "keyboard_arrow_down", denseIcon: "arrow_drop_down" }, fab: { icon: "add", activeIcon: "close" }, field: { clear: "cancel", error: "error" }, pagination: { first: "first_page", prev: "keyboard_arrow_left", next: "keyboard_arrow_right", last: "last_page" }, rating: { icon: "grade" }, stepper: { done: "check", active: "edit", error: "warning" }, tabs: { left: "chevron_left", right: "chevron_right", up: "keyboard_arrow_up", down: "keyboard_arrow_down" }, table: { arrowUp: "arrow_upward", warning: "warning", firstPage: "first_page", prevPage: "chevron_left", nextPage: "chevron_right", lastPage: "last_page" }, tree: { icon: "play_arrow" }, uploader: { done: "done", clear: "clear", add: "add_box", upload: "cloud_upload", removeQueue: "clear_all", removeUploaded: "done_all" } };
const Plugin$7 = defineReactivePlugin({ iconMapFn: null, __icons: {} }, { set(e, t) {
  const o = { ...e, rtl: true === e.rtl };
  o.set = Plugin$7.set, Object.assign(Plugin$7.__icons, o);
}, install({ $q: e, iconSet: t, ssrContext: o }) {
  void 0 !== e.config.iconMapFn && (this.iconMapFn = e.config.iconMapFn), e.iconSet = this.__icons, injectProp(e, "iconMapFn", () => this.iconMapFn, (e2) => {
    this.iconMapFn = e2;
  }), true === this.__installed ? void 0 !== t && this.set(t) : this.set(t || materialIcons);
} }), timelineKey = "_q_t_", stepperKey = "_q_s_", layoutKey = "_q_l_", pageContainerKey = "_q_pc_", fabKey = "_q_f_", formKey = "_q_fo_", tabsKey = "_q_tabs_", uploaderKey = "_q_u_", globalConfig = {};
function isDeepEqual(e, t) {
  if (e === t)
    return true;
  if (null !== e && null !== t && "object" === typeof e && "object" === typeof t) {
    if (e.constructor !== t.constructor)
      return false;
    let o, n;
    if (e.constructor === Array) {
      if (o = e.length, o !== t.length)
        return false;
      for (n = o; 0 !== n--; )
        if (true !== isDeepEqual(e[n], t[n]))
          return false;
      return true;
    }
    if (e.constructor === Map) {
      if (e.size !== t.size)
        return false;
      n = e.entries().next();
      while (true !== n.done) {
        if (true !== t.has(n.value[0]))
          return false;
        n = n.next();
      }
      n = e.entries().next();
      while (true !== n.done) {
        if (true !== isDeepEqual(n.value[1], t.get(n.value[0])))
          return false;
        n = n.next();
      }
      return true;
    }
    if (e.constructor === Set) {
      if (e.size !== t.size)
        return false;
      n = e.entries().next();
      while (true !== n.done) {
        if (true !== t.has(n.value[0]))
          return false;
        n = n.next();
      }
      return true;
    }
    if (null != e.buffer && e.buffer.constructor === ArrayBuffer) {
      if (o = e.length, o !== t.length)
        return false;
      for (n = o; 0 !== n--; )
        if (e[n] !== t[n])
          return false;
      return true;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    const a = Object.keys(e).filter((t2) => void 0 !== e[t2]);
    if (o = a.length, o !== Object.keys(t).filter((e2) => void 0 !== t[e2]).length)
      return false;
    for (n = o; 0 !== n--; ) {
      const o2 = a[n];
      if (true !== isDeepEqual(e[o2], t[o2]))
        return false;
    }
    return true;
  }
  return e !== e && t !== t;
}
function isObject(e) {
  return null !== e && "object" === typeof e && true !== Array.isArray(e);
}
function isDate(e) {
  return "[object Date]" === Object.prototype.toString.call(e);
}
function isRegexp(e) {
  return "[object RegExp]" === Object.prototype.toString.call(e);
}
function isNumber(e) {
  return "number" === typeof e && isFinite(e);
}
function createChildApp(e, t) {
  const o = createApp(e);
  o.config.globalProperties = t.config.globalProperties;
  const { reload: n, ...a } = t._context;
  return Object.assign(o._context, a), o;
}
const createComponent = (e) => markRaw(defineComponent(e)), createDirective = (e) => markRaw(e), units = ["B", "KB", "MB", "GB", "TB", "PB"];
function humanStorageSize(e) {
  let t = 0;
  while (parseInt(e, 10) >= 1024 && t < units.length - 1)
    e /= 1024, ++t;
  return `${e.toFixed(1)}${units[t]}`;
}
function between(e, t, o) {
  return o <= t ? t : Math.min(o, Math.max(t, e));
}
function normalizeToInterval(e, t, o) {
  if (o <= t)
    return t;
  const n = o - t + 1;
  let a = t + (e - t) % n;
  return a < t && (a = n + a), 0 === a ? 0 : a;
}
function pad(e, t = 2, o = "0") {
  if (void 0 === e || null === e)
    return e;
  const n = "" + e;
  return n.length >= t ? n : new Array(t - n.length + 1).join(o) + n;
}
const xhr = XMLHttpRequest, open = xhr.prototype.open, positionValues = ["top", "right", "bottom", "left"];
let stack = [], highjackCount = 0;
function translate({ p: e, pos: t, active: o, horiz: n, reverse: a, dir: l }) {
  let i = 1, r = 1;
  return true === n ? (true === a && (i = -1), "bottom" === t && (r = -1), { transform: `translate3d(${i * (e - 100)}%,${o ? 0 : -200 * r}%,0)` }) : (true === a && (r = -1), "right" === t && (i = -1), { transform: `translate3d(${o ? 0 : l * i * -200}%,${r * (e - 100)}%,0)` });
}
function inc(e, t) {
  return "number" !== typeof t && (t = e < 25 ? 3 * Math.random() + 3 : e < 65 ? 3 * Math.random() : e < 85 ? 2 * Math.random() : e < 99 ? 0.6 : 0), between(e + t, 0, 100);
}
function highjackAjax(e) {
  highjackCount++, stack.push(e), highjackCount > 1 || (xhr.prototype.open = function(e2, t) {
    const o = [], n = () => {
      stack.forEach((e3) => {
        null !== e3.hijackFilter.value && true !== e3.hijackFilter.value(t) || (e3.start(), o.push(e3.stop));
      });
    }, a = () => {
      o.forEach((e3) => {
        e3();
      });
    };
    this.addEventListener("loadstart", n, { once: true }), this.addEventListener("loadend", a, { once: true }), open.apply(this, arguments);
  });
}
function restoreAjax(e) {
  stack = stack.filter((t) => t.start !== e), highjackCount = Math.max(0, highjackCount - 1), 0 === highjackCount && (xhr.prototype.open = open);
}
var QAjaxBar = createComponent({ name: "QAjaxBar", props: { position: { type: String, default: "top", validator: (e) => positionValues.includes(e) }, size: { type: String, default: "2px" }, color: String, skipHijack: Boolean, reverse: Boolean, hijackFilter: Function }, emits: ["start", "stop"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), n = ref(0), a = ref(false), l = ref(true);
  let i, r, s = 0;
  const u = computed(() => `q-loading-bar q-loading-bar--${e.position}` + (void 0 !== e.color ? ` bg-${e.color}` : "") + (true === l.value ? "" : " no-transition")), c = computed(() => "top" === e.position || "bottom" === e.position), d = computed(() => true === c.value ? "height" : "width"), p2 = computed(() => {
    const t2 = a.value, l2 = translate({ p: n.value, pos: e.position, active: t2, horiz: c.value, reverse: true === o.$q.lang.rtl && ["top", "bottom"].includes(e.position) ? false === e.reverse : e.reverse, dir: true === o.$q.lang.rtl ? -1 : 1 });
    return l2[d.value] = e.size, l2.opacity = t2 ? 1 : 0, l2;
  }), v = computed(() => true === a.value ? { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": n.value } : { "aria-hidden": "true" });
  function m(e2 = 300) {
    const o2 = r;
    return r = Math.max(0, e2) || 0, s++, s > 1 ? (0 === o2 && e2 > 0 ? b() : o2 > 0 && e2 <= 0 && clearTimeout(i), s) : (clearTimeout(i), t("start"), n.value = 0, i = setTimeout(() => {
      l.value = true, e2 > 0 && b();
    }, true === a.value ? 500 : 1), true !== a.value && (a.value = true, l.value = false), s);
  }
  function f(e2) {
    return s > 0 && (n.value = inc(n.value, e2)), s;
  }
  function g() {
    if (s = Math.max(0, s - 1), s > 0)
      return s;
    clearTimeout(i), t("stop");
    const e2 = () => {
      l.value = true, n.value = 100, i = setTimeout(() => {
        a.value = false;
      }, 1e3);
    };
    return 0 === n.value ? i = setTimeout(e2, 1) : e2(), s;
  }
  function b() {
    n.value < 100 && (i = setTimeout(() => {
      f(), b();
    }, r));
  }
  let y;
  return onMounted(() => {
    true !== e.skipHijack && (y = true, highjackAjax({ start: m, stop: g, hijackFilter: computed(() => e.hijackFilter || null) }));
  }), onBeforeUnmount(() => {
    clearTimeout(i), true === y && restoreAjax(m);
  }), Object.assign(o, { start: m, stop: g, increment: f }), () => h("div", { class: u.value, style: p2.value, ...v.value });
} });
const useSizeDefaults = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 }, useSizeProps = { size: String };
function useSize(e, t = useSizeDefaults) {
  return computed(() => void 0 !== e.size ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size } : null);
}
function hSlot(e, t) {
  return void 0 !== e && e() || t;
}
function hUniqueSlot(e, t) {
  if (void 0 !== e) {
    const t2 = e();
    if (void 0 !== t2 && null !== t2)
      return t2.slice();
  }
  return t;
}
function hMergeSlot(e, t) {
  return void 0 !== e ? t.concat(e()) : t;
}
function hMergeSlotSafely(e, t) {
  return void 0 === e ? t : void 0 !== t ? t.concat(e()) : e();
}
function hDir(e, t, o, n, a, l) {
  t.key = n + a;
  const i = h(e, t, o);
  return true === a ? withDirectives(i, l()) : i;
}
const defaultViewBox = "0 0 24 24", sameFn = (e) => e, ionFn = (e) => `ionicons ${e}`, libMap = { "mdi-": (e) => `mdi ${e}`, "icon-": sameFn, "bt-": (e) => `bt ${e}`, "eva-": (e) => `eva ${e}`, "ion-md": ionFn, "ion-ios": ionFn, "ion-logo": ionFn, "iconfont ": sameFn, "ti-": (e) => `themify-icon ${e}`, "bi-": (e) => `bootstrap-icons ${e}` }, matMap = { o_: "-outlined", r_: "-round", s_: "-sharp" }, symMap = { sym_o_: "-outlined", sym_r_: "-rounded", sym_s_: "-sharp" }, libRE = new RegExp("^(" + Object.keys(libMap).join("|") + ")"), matRE = new RegExp("^(" + Object.keys(matMap).join("|") + ")"), symRE = new RegExp("^(" + Object.keys(symMap).join("|") + ")"), mRE = /^[Mm]\s?[-+]?\.?\d/, imgRE = /^img:/, svgUseRE = /^svguse:/, ionRE = /^ion-/, faRE = /^(fa-(solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var QIcon = createComponent({ name: "QIcon", props: { ...useSizeProps, tag: { type: String, default: "i" }, name: String, color: String, left: Boolean, right: Boolean }, setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useSize(e), a = computed(() => "q-icon" + (true === e.left ? " on-left" : "") + (true === e.right ? " on-right" : "") + (void 0 !== e.color ? ` text-${e.color}` : "")), l = computed(() => {
    let t2, n2 = e.name;
    if ("none" === n2 || !n2)
      return { none: true };
    if (null !== o.iconMapFn) {
      const e2 = o.iconMapFn(n2);
      if (void 0 !== e2) {
        if (void 0 === e2.icon)
          return { cls: e2.cls, content: void 0 !== e2.content ? e2.content : " " };
        if (n2 = e2.icon, "none" === n2 || !n2)
          return { none: true };
      }
    }
    if (true === mRE.test(n2)) {
      const [e2, t3 = defaultViewBox] = n2.split("|");
      return { svg: true, viewBox: t3, nodes: e2.split("&&").map((e3) => {
        const [t4, o2, n3] = e3.split("@@");
        return h("path", { style: o2, d: t4, transform: n3 });
      }) };
    }
    if (true === imgRE.test(n2))
      return { img: true, src: n2.substring(4) };
    if (true === svgUseRE.test(n2)) {
      const [e2, t3 = defaultViewBox] = n2.split("|");
      return { svguse: true, src: e2.substring(7), viewBox: t3 };
    }
    let a2 = " ";
    const l2 = n2.match(libRE);
    if (null !== l2)
      t2 = libMap[l2[1]](n2);
    else if (true === faRE.test(n2))
      t2 = n2;
    else if (true === ionRE.test(n2))
      t2 = `ionicons ion-${true === o.platform.is.ios ? "ios" : "md"}${n2.substring(3)}`;
    else if (true === symRE.test(n2)) {
      t2 = "notranslate material-symbols";
      const e2 = n2.match(symRE);
      null !== e2 && (n2 = n2.substring(6), t2 += symMap[e2[1]]), a2 = n2;
    } else {
      t2 = "notranslate material-icons";
      const e2 = n2.match(matRE);
      null !== e2 && (n2 = n2.substring(2), t2 += matMap[e2[1]]), a2 = n2;
    }
    return { cls: t2, content: a2 };
  });
  return () => {
    const o2 = { class: a.value, style: n.value, "aria-hidden": "true", role: "presentation" };
    return true === l.value.none ? h(e.tag, o2, hSlot(t.default)) : true === l.value.img ? h("span", o2, hMergeSlot(t.default, [h("img", { src: l.value.src })])) : true === l.value.svg ? h("span", o2, hMergeSlot(t.default, [h("svg", { viewBox: l.value.viewBox || "0 0 24 24" }, l.value.nodes)])) : true === l.value.svguse ? h("span", o2, hMergeSlot(t.default, [h("svg", { viewBox: l.value.viewBox }, [h("use", { "xlink:href": l.value.src })])])) : (void 0 !== l.value.cls && (o2.class += " " + l.value.cls), h(e.tag, o2, hMergeSlot(t.default, [l.value.content])));
  };
} }), QAvatar = createComponent({ name: "QAvatar", props: { ...useSizeProps, fontSize: String, color: String, textColor: String, icon: String, square: Boolean, rounded: Boolean }, setup(e, { slots: t }) {
  const o = useSize(e), n = computed(() => "q-avatar" + (e.color ? ` bg-${e.color}` : "") + (e.textColor ? ` text-${e.textColor} q-chip--colored` : "") + (true === e.square ? " q-avatar--square" : true === e.rounded ? " rounded-borders" : "")), a = computed(() => e.fontSize ? { fontSize: e.fontSize } : null);
  return () => {
    const l = void 0 !== e.icon ? [h(QIcon, { name: e.icon })] : void 0;
    return h("div", { class: n.value, style: o.value }, [h("div", { class: "q-avatar__content row flex-center overflow-hidden", style: a.value }, hMergeSlotSafely(t.default, l))]);
  };
} });
const alignValues$3 = ["top", "middle", "bottom"];
var QBadge = createComponent({ name: "QBadge", props: { color: String, textColor: String, floating: Boolean, transparent: Boolean, multiLine: Boolean, outline: Boolean, rounded: Boolean, label: [Number, String], align: { type: String, validator: (e) => alignValues$3.includes(e) } }, setup(e, { slots: t }) {
  const o = computed(() => {
    return void 0 !== e.align ? { verticalAlign: e.align } : null;
  }), n = computed(() => {
    const t2 = true === e.outline && e.color || e.textColor;
    return `q-badge flex inline items-center no-wrap q-badge--${true === e.multiLine ? "multi" : "single"}-line` + (true === e.outline ? " q-badge--outline" : void 0 !== e.color ? ` bg-${e.color}` : "") + (void 0 !== t2 ? ` text-${t2}` : "") + (true === e.floating ? " q-badge--floating" : "") + (true === e.rounded ? " q-badge--rounded" : "") + (true === e.transparent ? " q-badge--transparent" : "");
  });
  return () => h("div", { class: n.value, style: o.value, role: "alert", "aria-label": e.label }, hMergeSlot(t.default, void 0 !== e.label ? [e.label] : []));
} });
const useDarkProps = { dark: { type: Boolean, default: null } };
function useDark(e, t) {
  return computed(() => null === e.dark ? t.dark.isActive : e.dark);
}
var QBanner = createComponent({ name: "QBanner", props: { ...useDarkProps, inlineActions: Boolean, dense: Boolean, rounded: Boolean }, setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useDark(e, o), a = computed(() => "q-banner row items-center" + (true === e.dense ? " q-banner--dense" : "") + (true === n.value ? " q-banner--dark q-dark" : "") + (true === e.rounded ? " rounded-borders" : "")), l = computed(() => `q-banner__actions row items-center justify-end col-${true === e.inlineActions ? "auto" : "all"}`);
  return () => {
    const o2 = [h("div", { class: "q-banner__avatar col-auto row items-center self-start" }, hSlot(t.avatar)), h("div", { class: "q-banner__content col text-body2" }, hSlot(t.default))], n2 = hSlot(t.action);
    return void 0 !== n2 && o2.push(h("div", { class: l.value }, n2)), h("div", { class: a.value + (false === e.inlineActions && void 0 !== n2 ? " q-banner--top-padding" : ""), role: "alert" }, o2);
  };
} }), QBar = createComponent({ name: "QBar", props: { ...useDarkProps, dense: Boolean }, setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useDark(e, o), a = computed(() => `q-bar row no-wrap items-center q-bar--${true === e.dense ? "dense" : "standard"}  q-bar--${true === n.value ? "dark" : "light"}`);
  return () => h("div", { class: a.value, role: "toolbar" }, hSlot(t.default));
} });
const alignMap = { left: "start", center: "center", right: "end", between: "between", around: "around", evenly: "evenly", stretch: "stretch" }, alignValues$2 = Object.keys(alignMap), useAlignProps = { align: { type: String, validator: (e) => alignValues$2.includes(e) } };
function useAlign(e) {
  return computed(() => {
    const t = void 0 === e.align ? true === e.vertical ? "stretch" : "left" : e.align;
    return `${true === e.vertical ? "items" : "justify"}-${alignMap[t]}`;
  });
}
function getParentProxy(e) {
  if (Object(e.$parent) === e.$parent)
    return e.$parent;
  let { parent: t } = e.$;
  while (Object(t) === t) {
    if (Object(t.proxy) === t.proxy)
      return t.proxy;
    t = t.parent;
  }
}
function fillNormalizedVNodes(e, t) {
  "symbol" === typeof t.type ? true === Array.isArray(t.children) && t.children.forEach((t2) => {
    fillNormalizedVNodes(e, t2);
  }) : e.add(t);
}
function getNormalizedVNodes(e) {
  const t = /* @__PURE__ */ new Set();
  return e.forEach((e2) => {
    fillNormalizedVNodes(t, e2);
  }), Array.from(t);
}
function vmHasRouter(e) {
  return void 0 !== e.appContext.config.globalProperties.$router;
}
function vmIsDestroyed(e) {
  return true === e.isUnmounted || true === e.isDeactivated;
}
const disabledValues = ["", true];
var QBreadcrumbs = createComponent({ name: "QBreadcrumbs", props: { ...useAlignProps, separator: { type: String, default: "/" }, separatorColor: String, activeColor: { type: String, default: "primary" }, gutter: { type: String, validator: (e) => ["none", "xs", "sm", "md", "lg", "xl"].includes(e), default: "sm" } }, setup(e, { slots: t }) {
  const o = useAlign(e), n = computed(() => `flex items-center ${o.value}${"none" === e.gutter ? "" : ` q-gutter-${e.gutter}`}`), a = computed(() => e.separatorColor ? ` text-${e.separatorColor}` : ""), l = computed(() => ` text-${e.activeColor}`);
  return () => {
    const o2 = getNormalizedVNodes(hSlot(t.default));
    if (0 === o2.length)
      return;
    let i = 1;
    const r = [], s = o2.filter((e2) => void 0 !== e2.type && "QBreadcrumbsEl" === e2.type.name).length, u = void 0 !== t.separator ? t.separator : () => e.separator;
    return o2.forEach((e2) => {
      if (void 0 !== e2.type && "QBreadcrumbsEl" === e2.type.name) {
        const t2 = i < s, o3 = null !== e2.props && disabledValues.includes(e2.props.disable), n2 = (true === t2 ? "" : " q-breadcrumbs--last") + (true !== o3 && true === t2 ? l.value : "");
        i++, r.push(h("div", { class: `flex items-center${n2}` }, [e2])), true === t2 && r.push(h("div", { class: "q-breadcrumbs__separator" + a.value }, u()));
      } else
        r.push(e2);
    }), h("div", { class: "q-breadcrumbs" }, [h("div", { class: n.value }, r)]);
  };
} });
function getOriginalPath(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
function isSameRouteRecord(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function includesParams(e, t) {
  for (const o in t) {
    const n = t[o], a = e[o];
    if ("string" === typeof n) {
      if (n !== a)
        return false;
    } else if (false === Array.isArray(a) || a.length !== n.length || n.some((e2, t2) => e2 !== a[t2]))
      return false;
  }
  return true;
}
function isEquivalentArray(e, t) {
  return true === Array.isArray(t) ? e.length === t.length && e.every((e2, o) => e2 === t[o]) : 1 === e.length && e[0] === t;
}
function isSameRouteLocationParamsValue(e, t) {
  return true === Array.isArray(e) ? isEquivalentArray(e, t) : true === Array.isArray(t) ? isEquivalentArray(t, e) : e === t;
}
function isSameRouteLocationParams(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return false;
  for (const o in e)
    if (false === isSameRouteLocationParamsValue(e[o], t[o]))
      return false;
  return true;
}
const useRouterLinkProps = { to: [String, Object], replace: Boolean, exact: Boolean, activeClass: { type: String, default: "q-router-link--active" }, exactActiveClass: { type: String, default: "q-router-link--exact-active" }, href: String, target: String, disable: Boolean };
function useRouterLink({ fallbackTag: e, useDisableForRouterLinkProps: t = true } = {}) {
  const o = getCurrentInstance(), { props: n, proxy: a, emit: l } = o, i = vmHasRouter(o), r = computed(() => true !== n.disable && void 0 !== n.href), s = computed(true === t ? () => true === i && true !== n.disable && true !== r.value && void 0 !== n.to && null !== n.to && "" !== n.to : () => true === i && true !== r.value && void 0 !== n.to && null !== n.to && "" !== n.to), u = computed(() => true === s.value ? b(n.to) : null), c = computed(() => null !== u.value), d = computed(() => true === r.value || true === c.value), p2 = computed(() => "a" === n.type || true === d.value ? "a" : n.tag || e || "div"), v = computed(() => true === r.value ? { href: n.href, target: n.target } : true === c.value ? { href: u.value.href, target: n.target } : {}), m = computed(() => {
    if (false === c.value)
      return -1;
    const { matched: e2 } = u.value, { length: t2 } = e2, o2 = e2[t2 - 1];
    if (void 0 === o2)
      return -1;
    const n2 = a.$route.matched;
    if (0 === n2.length)
      return -1;
    const l2 = n2.findIndex(isSameRouteRecord.bind(null, o2));
    if (l2 > -1)
      return l2;
    const i2 = getOriginalPath(e2[t2 - 2]);
    return t2 > 1 && getOriginalPath(o2) === i2 && n2[n2.length - 1].path !== i2 ? n2.findIndex(isSameRouteRecord.bind(null, e2[t2 - 2])) : l2;
  }), f = computed(() => true === c.value && -1 !== m.value && includesParams(a.$route.params, u.value.params)), h2 = computed(() => true === f.value && m.value === a.$route.matched.length - 1 && isSameRouteLocationParams(a.$route.params, u.value.params)), g = computed(() => true === c.value ? true === h2.value ? ` ${n.exactActiveClass} ${n.activeClass}` : true === n.exact ? "" : true === f.value ? ` ${n.activeClass}` : "" : "");
  function b(e2) {
    try {
      return a.$router.resolve(e2);
    } catch (e3) {
    }
    return null;
  }
  function y(e2, { returnRouterError: t2, to: o2 = n.to, replace: l2 = n.replace } = {}) {
    if (true === n.disable)
      return e2.preventDefault(), Promise.resolve(false);
    if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey || void 0 !== e2.button && 0 !== e2.button || "_blank" === n.target)
      return Promise.resolve(false);
    e2.preventDefault();
    const i2 = a.$router[true === l2 ? "replace" : "push"](o2);
    return true === t2 ? i2 : i2.then(() => {
    }).catch(() => {
    });
  }
  function S(e2) {
    if (true === c.value) {
      const t2 = (t3) => y(e2, t3);
      l("click", e2, t2), true !== e2.defaultPrevented && t2();
    } else
      l("click", e2);
  }
  return { hasRouterLink: c, hasHrefLink: r, hasLink: d, linkTag: p2, resolvedLink: u, linkIsActive: f, linkIsExactActive: h2, linkClass: g, linkAttrs: v, getLink: b, navigateToRouterLink: y, navigateOnClick: S };
}
var QBreadcrumbsEl = createComponent({ name: "QBreadcrumbsEl", props: { ...useRouterLinkProps, label: String, icon: String, tag: { type: String, default: "span" } }, emits: ["click"], setup(e, { slots: t }) {
  const { linkTag: o, linkAttrs: n, linkClass: a, navigateOnClick: l } = useRouterLink(), i = computed(() => {
    return { class: "q-breadcrumbs__el q-link flex inline items-center relative-position " + (true !== e.disable ? "q-link--focusable" + a.value : "q-breadcrumbs__el--disable"), ...n.value, onClick: l };
  }), r = computed(() => "q-breadcrumbs__el-icon" + (void 0 !== e.label ? " q-breadcrumbs__el-icon--with-label" : ""));
  return () => {
    const n2 = [];
    return void 0 !== e.icon && n2.push(h(QIcon, { class: r.value, name: e.icon })), void 0 !== e.label && n2.push(e.label), h(o.value, { ...i.value }, hMergeSlot(t.default, n2));
  };
} });
const useSpinnerProps = { size: { type: [Number, String], default: "1em" }, color: String };
function useSpinner(e) {
  return { cSize: computed(() => e.size in useSizeDefaults ? `${useSizeDefaults[e.size]}px` : e.size), classes: computed(() => "q-spinner" + (e.color ? ` text-${e.color}` : "")) };
}
var QSpinner = createComponent({ name: "QSpinner", props: { ...useSpinnerProps, thickness: { type: Number, default: 5 } }, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value + " q-spinner-mat", width: t.value, height: t.value, viewBox: "25 25 50 50" }, [h("circle", { class: "path", cx: "50", cy: "50", r: "20", fill: "none", stroke: "currentColor", "stroke-width": e.thickness, "stroke-miterlimit": "10" })]);
} });
function offset(e) {
  if (e === window)
    return { top: 0, left: 0 };
  const { top: t, left: o } = e.getBoundingClientRect();
  return { top: t, left: o };
}
function height(e) {
  return e === window ? window.innerHeight : e.getBoundingClientRect().height;
}
function css(e, t) {
  const o = e.style;
  for (const n in t)
    o[n] = t[n];
}
function getElement$1(e) {
  if (void 0 === e || null === e)
    return;
  if ("string" === typeof e)
    try {
      return document.querySelector(e) || void 0;
    } catch (e2) {
      return;
    }
  const t = unref(e);
  return t ? t.$el || t : void 0;
}
function childHasFocus(e, t) {
  if (void 0 === e || null === e || true === e.contains(t))
    return true;
  for (let o = e.nextElementSibling; null !== o; o = o.nextElementSibling)
    if (o.contains(t))
      return true;
  return false;
}
function throttle(e, t = 250) {
  let o, n = false;
  return function() {
    return false === n && (n = true, setTimeout(() => {
      n = false;
    }, t), o = e.apply(this, arguments)), o;
  };
}
function showRipple(e, t, o, n) {
  true === o.modifiers.stop && stop(e);
  const a = o.modifiers.color;
  let l = o.modifiers.center;
  l = true === l || true === n;
  const i = document.createElement("span"), r = document.createElement("span"), s = position(e), { left: u, top: c, width: d, height: p2 } = t.getBoundingClientRect(), v = Math.sqrt(d * d + p2 * p2), m = v / 2, f = `${(d - v) / 2}px`, h2 = l ? f : `${s.left - u - m}px`, g = `${(p2 - v) / 2}px`, b = l ? g : `${s.top - c - m}px`;
  r.className = "q-ripple__inner", css(r, { height: `${v}px`, width: `${v}px`, transform: `translate3d(${h2},${b},0) scale3d(.2,.2,1)`, opacity: 0 }), i.className = `q-ripple${a ? " text-" + a : ""}`, i.setAttribute("dir", "ltr"), i.appendChild(r), t.appendChild(i);
  const y = () => {
    i.remove(), clearTimeout(S);
  };
  o.abort.push(y);
  let S = setTimeout(() => {
    r.classList.add("q-ripple__inner--enter"), r.style.transform = `translate3d(${f},${g},0) scale3d(1,1,1)`, r.style.opacity = 0.2, S = setTimeout(() => {
      r.classList.remove("q-ripple__inner--enter"), r.classList.add("q-ripple__inner--leave"), r.style.opacity = 0, S = setTimeout(() => {
        i.remove(), o.abort.splice(o.abort.indexOf(y), 1);
      }, 275);
    }, 250);
  }, 50);
}
function updateModifiers$1(e, { modifiers: t, value: o, arg: n }) {
  const a = Object.assign({}, e.cfg.ripple, t, o);
  e.modifiers = { early: true === a.early, stop: true === a.stop, center: true === a.center, color: a.color || n, keyCodes: [].concat(a.keyCodes || 13) };
}
var Ripple = createDirective({ name: "ripple", beforeMount(e, t) {
  const o = t.instance.$.appContext.config.globalProperties.$q.config || {};
  if (false === o.ripple)
    return;
  const n = { cfg: o, enabled: false !== t.value, modifiers: {}, abort: [], start(t2) {
    true === n.enabled && true !== t2.qSkipRipple && t2.type === (true === n.modifiers.early ? "pointerdown" : "click") && showRipple(t2, e, n, true === t2.qKeyEvent);
  }, keystart: throttle((t2) => {
    true === n.enabled && true !== t2.qSkipRipple && true === isKeyCode(t2, n.modifiers.keyCodes) && t2.type === `key${true === n.modifiers.early ? "down" : "up"}` && showRipple(t2, e, n, true);
  }, 300) };
  updateModifiers$1(n, t), e.__qripple = n, addEvt(n, "main", [[e, "pointerdown", "start", "passive"], [e, "click", "start", "passive"], [e, "keydown", "keystart", "passive"], [e, "keyup", "keystart", "passive"]]);
}, updated(e, t) {
  if (t.oldValue !== t.value) {
    const o = e.__qripple;
    void 0 !== o && (o.enabled = false !== t.value, true === o.enabled && Object(t.value) === t.value && updateModifiers$1(o, t));
  }
}, beforeUnmount(e) {
  const t = e.__qripple;
  void 0 !== t && (t.abort.forEach((e2) => {
    e2();
  }), cleanEvt(t, "main"), delete e._qripple);
} });
const padding = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }, defaultSizes$2 = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 }, formTypes = ["button", "submit", "reset"], mediaTypeRE = /[^\s]\/[^\s]/, useBtnProps = { ...useSizeProps, ...useRouterLinkProps, type: { type: String, default: "button" }, label: [Number, String], icon: String, iconRight: String, round: Boolean, square: Boolean, outline: Boolean, flat: Boolean, unelevated: Boolean, rounded: Boolean, push: Boolean, glossy: Boolean, size: String, fab: Boolean, fabMini: Boolean, padding: String, color: String, textColor: String, noCaps: Boolean, noWrap: Boolean, dense: Boolean, tabindex: [Number, String], ripple: { type: [Boolean, Object], default: true }, align: { ...useAlignProps.align, default: "center" }, stack: Boolean, stretch: Boolean, loading: { type: Boolean, default: null }, disable: Boolean };
function useBtn(e) {
  const t = useSize(e, defaultSizes$2), o = useAlign(e), { hasRouterLink: n, hasLink: a, linkTag: l, linkAttrs: i, navigateOnClick: r } = useRouterLink({ fallbackTag: "button" }), s = computed(() => {
    const o2 = false === e.fab && false === e.fabMini ? t.value : {};
    return void 0 !== e.padding ? Object.assign({}, o2, { padding: e.padding.split(/\s+/).map((e2) => e2 in padding ? padding[e2] + "px" : e2).join(" "), minWidth: "0", minHeight: "0" }) : o2;
  }), u = computed(() => true === e.rounded || true === e.fab || true === e.fabMini), c = computed(() => true !== e.disable && true !== e.loading), d = computed(() => true === c.value ? e.tabindex || 0 : -1), p2 = computed(() => {
    return true === e.flat ? "flat" : true === e.outline ? "outline" : true === e.push ? "push" : true === e.unelevated ? "unelevated" : "standard";
  }), v = computed(() => {
    const t2 = { tabindex: d.value };
    return true === a.value ? Object.assign(t2, i.value) : true === formTypes.includes(e.type) && (t2.type = e.type), "a" === l.value ? (true === e.disable ? t2["aria-disabled"] = "true" : void 0 === t2.href && (t2.role = "button"), true !== n.value && true === mediaTypeRE.test(e.type) && (t2.type = e.type)) : true === e.disable && (t2.disabled = "", t2["aria-disabled"] = "true"), true === e.loading && void 0 !== e.percentage && Object.assign(t2, { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": e.percentage }), t2;
  }), m = computed(() => {
    let t2;
    void 0 !== e.color ? t2 = true === e.flat || true === e.outline ? `text-${e.textColor || e.color}` : `bg-${e.color} text-${e.textColor || "white"}` : e.textColor && (t2 = `text-${e.textColor}`);
    const o2 = true === e.round ? "round" : `rectangle${true === u.value ? " q-btn--rounded" : true === e.square ? " q-btn--square" : ""}`;
    return `q-btn--${p2.value} q-btn--${o2}` + (void 0 !== t2 ? " " + t2 : "") + (true === c.value ? " q-btn--actionable q-focusable q-hoverable" : true === e.disable ? " disabled" : "") + (true === e.fab ? " q-btn--fab" : true === e.fabMini ? " q-btn--fab-mini" : "") + (true === e.noCaps ? " q-btn--no-uppercase" : "") + (true === e.dense ? " q-btn--dense" : "") + (true === e.stretch ? " no-border-radius self-stretch" : "") + (true === e.glossy ? " glossy" : "") + (e.square ? " q-btn--square" : "");
  }), f = computed(() => o.value + (true === e.stack ? " column" : " row") + (true === e.noWrap ? " no-wrap text-no-wrap" : "") + (true === e.loading ? " q-btn__content--hidden" : ""));
  return { classes: m, style: s, innerClasses: f, attributes: v, hasLink: a, linkTag: l, navigateOnClick: r, isActionable: c };
}
const { passiveCapture } = listenOpts;
let touchTarget = null, keyboardTarget = null, mouseTarget = null;
var QBtn = createComponent({ name: "QBtn", props: { ...useBtnProps, percentage: Number, darkPercentage: Boolean, onTouchstart: [Function, Array] }, emits: ["click", "keydown", "mousedown", "keyup"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { classes: a, style: l, innerClasses: i, attributes: r, hasLink: s, linkTag: u, navigateOnClick: c, isActionable: d } = useBtn(e), p2 = ref(null), v = ref(null);
  let m, f, g = null;
  const b = computed(() => void 0 !== e.label && null !== e.label && "" !== e.label), y = computed(() => true !== e.disable && false !== e.ripple && { keyCodes: true === s.value ? [13, 32] : [13], ...true === e.ripple ? {} : e.ripple }), S = computed(() => ({ center: e.round })), w = computed(() => {
    const t2 = Math.max(0, Math.min(100, e.percentage));
    return t2 > 0 ? { transition: "transform 0.6s", transform: `translateX(${t2 - 100}%)` } : {};
  }), C = computed(() => {
    if (true === e.loading)
      return { onMousedown: M, onTouchstart: M, onClick: M, onKeydown: M, onKeyup: M };
    if (true === d.value) {
      const t2 = { onClick: k, onKeydown: _, onMousedown: T };
      if (true === n.$q.platform.has.touch) {
        const o2 = void 0 !== e.onTouchstart ? "" : "Passive";
        t2[`onTouchstart${o2}`] = q;
      }
      return t2;
    }
    return { onClick: stopAndPrevent };
  }), x = computed(() => ({ ref: p2, class: "q-btn q-btn-item non-selectable no-outline " + a.value, style: l.value, ...r.value, ...C.value }));
  function k(t2) {
    if (null !== p2.value) {
      if (void 0 !== t2) {
        if (true === t2.defaultPrevented)
          return;
        const o2 = document.activeElement;
        if ("submit" === e.type && o2 !== document.body && false === p2.value.contains(o2) && false === o2.contains(p2.value)) {
          p2.value.focus();
          const e2 = () => {
            document.removeEventListener("keydown", stopAndPrevent, true), document.removeEventListener("keyup", e2, passiveCapture), null !== p2.value && p2.value.removeEventListener("blur", e2, passiveCapture);
          };
          document.addEventListener("keydown", stopAndPrevent, true), document.addEventListener("keyup", e2, passiveCapture), p2.value.addEventListener("blur", e2, passiveCapture);
        }
      }
      c(t2);
    }
  }
  function _(e2) {
    null !== p2.value && (o("keydown", e2), true === isKeyCode(e2, [13, 32]) && keyboardTarget !== p2.value && (null !== keyboardTarget && $(), true !== e2.defaultPrevented && (p2.value.focus(), keyboardTarget = p2.value, p2.value.classList.add("q-btn--active"), document.addEventListener("keyup", P, true), p2.value.addEventListener("blur", P, passiveCapture)), stopAndPrevent(e2)));
  }
  function q(e2) {
    null !== p2.value && (o("touchstart", e2), true !== e2.defaultPrevented && (touchTarget !== p2.value && (null !== touchTarget && $(), touchTarget = p2.value, g = e2.target, g.addEventListener("touchcancel", P, passiveCapture), g.addEventListener("touchend", P, passiveCapture)), m = true, clearTimeout(f), f = setTimeout(() => {
      m = false;
    }, 200)));
  }
  function T(e2) {
    null !== p2.value && (e2.qSkipRipple = true === m, o("mousedown", e2), true !== e2.defaultPrevented && mouseTarget !== p2.value && (null !== mouseTarget && $(), mouseTarget = p2.value, p2.value.classList.add("q-btn--active"), document.addEventListener("mouseup", P, passiveCapture)));
  }
  function P(e2) {
    if (null !== p2.value && (void 0 === e2 || "blur" !== e2.type || document.activeElement !== p2.value)) {
      if (void 0 !== e2 && "keyup" === e2.type) {
        if (keyboardTarget === p2.value && true === isKeyCode(e2, [13, 32])) {
          const t2 = new MouseEvent("click", e2);
          t2.qKeyEvent = true, true === e2.defaultPrevented && prevent(t2), true === e2.cancelBubble && stop(t2), p2.value.dispatchEvent(t2), stopAndPrevent(e2), e2.qKeyEvent = true;
        }
        o("keyup", e2);
      }
      $();
    }
  }
  function $(e2) {
    const t2 = v.value;
    true === e2 || touchTarget !== p2.value && mouseTarget !== p2.value || null === t2 || t2 === document.activeElement || (t2.setAttribute("tabindex", -1), t2.focus()), touchTarget === p2.value && (null !== g && (g.removeEventListener("touchcancel", P, passiveCapture), g.removeEventListener("touchend", P, passiveCapture)), touchTarget = g = null), mouseTarget === p2.value && (document.removeEventListener("mouseup", P, passiveCapture), mouseTarget = null), keyboardTarget === p2.value && (document.removeEventListener("keyup", P, true), null !== p2.value && p2.value.removeEventListener("blur", P, passiveCapture), keyboardTarget = null), null !== p2.value && p2.value.classList.remove("q-btn--active");
  }
  function M(e2) {
    stopAndPrevent(e2), e2.qSkipRipple = true;
  }
  return onBeforeUnmount(() => {
    $(true);
  }), Object.assign(n, { click: k }), () => {
    let o2 = [];
    void 0 !== e.icon && o2.push(h(QIcon, { name: e.icon, left: false === e.stack && true === b.value, role: "img", "aria-hidden": "true" })), true === b.value && o2.push(h("span", { class: "block" }, [e.label])), o2 = hMergeSlot(t.default, o2), void 0 !== e.iconRight && false === e.round && o2.push(h(QIcon, { name: e.iconRight, right: false === e.stack && true === b.value, role: "img", "aria-hidden": "true" }));
    const n2 = [h("span", { class: "q-focus-helper", ref: v })];
    return true === e.loading && void 0 !== e.percentage && n2.push(h("span", { class: "q-btn__progress absolute-full overflow-hidden" + (true === e.darkPercentage ? " q-btn__progress--dark" : "") }, [h("span", { class: "q-btn__progress-indicator fit block", style: w.value })])), n2.push(h("span", { class: "q-btn__content text-center col items-center q-anchor--skip " + i.value }, o2)), null !== e.loading && n2.push(h(Transition, { name: "q-transition--fade" }, () => true === e.loading ? [h("span", { key: "loading", class: "absolute-full flex flex-center" }, void 0 !== t.loading ? t.loading() : [h(QSpinner)])] : null)), withDirectives(h(u.value, x.value, n2), [[Ripple, y.value, void 0, S.value]]);
  };
} }), QBtnGroup = createComponent({ name: "QBtnGroup", props: { unelevated: Boolean, outline: Boolean, flat: Boolean, rounded: Boolean, square: Boolean, push: Boolean, stretch: Boolean, glossy: Boolean, spread: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => {
    const t2 = ["unelevated", "outline", "flat", "rounded", "square", "push", "stretch", "glossy"].filter((t3) => true === e[t3]).map((e2) => `q-btn-group--${e2}`).join(" ");
    return `q-btn-group row no-wrap${t2.length > 0 ? " " + t2 : ""}` + (true === e.spread ? " q-btn-group--spread" : " inline");
  });
  return () => h("div", { class: o.value }, hSlot(t.default));
} });
function clearSelection() {
  if (void 0 !== window.getSelection) {
    const e = window.getSelection();
    void 0 !== e.empty ? e.empty() : void 0 !== e.removeAllRanges && (e.removeAllRanges(), true !== Platform.is.mobile && e.addRange(document.createRange()));
  } else
    void 0 !== document.selection && document.selection.empty();
}
const useAnchorProps = { target: { default: true }, noParentEvent: Boolean, contextMenu: Boolean };
function useAnchor({ showing: e, avoidEmit: t, configureAnchorEl: o }) {
  const { props: n, proxy: a, emit: l } = getCurrentInstance(), i = ref(null);
  let r;
  function s(e2) {
    return null !== i.value && (void 0 === e2 || void 0 === e2.touches || e2.touches.length <= 1);
  }
  const u = {};
  function c() {
    cleanEvt(u, "anchor");
  }
  function d(e2) {
    i.value = e2;
    while (i.value.classList.contains("q-anchor--skip"))
      i.value = i.value.parentNode;
    o();
  }
  function p2() {
    if (false === n.target || "" === n.target || null === a.$el.parentNode)
      i.value = null;
    else if (true === n.target)
      d(a.$el.parentNode);
    else {
      let e2 = n.target;
      if ("string" === typeof n.target)
        try {
          e2 = document.querySelector(n.target);
        } catch (t2) {
          e2 = void 0;
        }
      void 0 !== e2 && null !== e2 ? (i.value = e2.$el || e2, o()) : (i.value = null, console.error(`Anchor: target "${n.target}" not found`));
    }
  }
  return void 0 === o && (Object.assign(u, { hide(e2) {
    a.hide(e2);
  }, toggle(e2) {
    a.toggle(e2), e2.qAnchorHandled = true;
  }, toggleKey(e2) {
    true === isKeyCode(e2, 13) && u.toggle(e2);
  }, contextClick(e2) {
    a.hide(e2), prevent(e2), nextTick(() => {
      a.show(e2), e2.qAnchorHandled = true;
    });
  }, prevent, mobileTouch(e2) {
    if (u.mobileCleanup(e2), true !== s(e2))
      return;
    a.hide(e2), i.value.classList.add("non-selectable");
    const t2 = e2.target;
    addEvt(u, "anchor", [[t2, "touchmove", "mobileCleanup", "passive"], [t2, "touchend", "mobileCleanup", "passive"], [t2, "touchcancel", "mobileCleanup", "passive"], [i.value, "contextmenu", "prevent", "notPassive"]]), r = setTimeout(() => {
      a.show(e2), e2.qAnchorHandled = true;
    }, 300);
  }, mobileCleanup(t2) {
    i.value.classList.remove("non-selectable"), clearTimeout(r), true === e.value && void 0 !== t2 && clearSelection();
  } }), o = function(e2 = n.contextMenu) {
    if (true === n.noParentEvent || null === i.value)
      return;
    let t2;
    t2 = true === e2 ? true === a.$q.platform.is.mobile ? [[i.value, "touchstart", "mobileTouch", "passive"]] : [[i.value, "mousedown", "hide", "passive"], [i.value, "contextmenu", "contextClick", "notPassive"]] : [[i.value, "click", "toggle", "passive"], [i.value, "keyup", "toggleKey", "passive"]], addEvt(u, "anchor", t2);
  }), watch(() => n.contextMenu, (e2) => {
    null !== i.value && (c(), o(e2));
  }), watch(() => n.target, () => {
    null !== i.value && c(), p2();
  }), watch(() => n.noParentEvent, (e2) => {
    null !== i.value && (true === e2 ? c() : o());
  }), onMounted(() => {
    p2(), true !== t && true === n.modelValue && null === i.value && l("update:modelValue", false);
  }), onBeforeUnmount(() => {
    clearTimeout(r), c();
  }), { anchorEl: i, canShow: s, anchorEvents: u };
}
function useScrollTarget(e, t) {
  const o = ref(null);
  let n;
  function a(e2, t2) {
    const o2 = `${void 0 !== t2 ? "add" : "remove"}EventListener`, a2 = void 0 !== t2 ? t2 : n;
    e2 !== window && e2[o2]("scroll", a2, listenOpts.passive), window[o2]("scroll", a2, listenOpts.passive), n = t2;
  }
  function l() {
    null !== o.value && (a(o.value), o.value = null);
  }
  const i = watch(() => e.noParentEvent, () => {
    null !== o.value && (l(), t());
  });
  return onBeforeUnmount(i), { localScrollTarget: o, unconfigureScrollTarget: l, changeScrollEvent: a };
}
const useModelToggleProps = { modelValue: { type: Boolean, default: null }, "onUpdate:modelValue": [Function, Array] }, useModelToggleEmits = ["before-show", "show", "before-hide", "hide"];
function useModelToggle({ showing: e, canShow: t, hideOnRouteChange: o, handleShow: n, handleHide: a, processOnMount: l }) {
  const i = getCurrentInstance(), { props: r, emit: s, proxy: u } = i;
  let c;
  function d(t2) {
    true === e.value ? m(t2) : p2(t2);
  }
  function p2(e2) {
    if (true === r.disable || void 0 !== e2 && true === e2.qAnchorHandled || void 0 !== t && true !== t(e2))
      return;
    const o2 = void 0 !== r["onUpdate:modelValue"];
    true === o2 && (s("update:modelValue", true), c = e2, nextTick(() => {
      c === e2 && (c = void 0);
    })), null !== r.modelValue && false !== o2 || v(e2);
  }
  function v(t2) {
    true !== e.value && (e.value = true, s("before-show", t2), void 0 !== n ? n(t2) : s("show", t2));
  }
  function m(e2) {
    if (true === r.disable)
      return;
    const t2 = void 0 !== r["onUpdate:modelValue"];
    true === t2 && (s("update:modelValue", false), c = e2, nextTick(() => {
      c === e2 && (c = void 0);
    })), null !== r.modelValue && false !== t2 || f(e2);
  }
  function f(t2) {
    false !== e.value && (e.value = false, s("before-hide", t2), void 0 !== a ? a(t2) : s("hide", t2));
  }
  function h2(t2) {
    if (true === r.disable && true === t2)
      void 0 !== r["onUpdate:modelValue"] && s("update:modelValue", false);
    else if (true === t2 !== e.value) {
      const e2 = true === t2 ? v : f;
      e2(c);
    }
  }
  watch(() => r.modelValue, h2), void 0 !== o && true === vmHasRouter(i) && watch(() => u.$route.fullPath, () => {
    true === o.value && true === e.value && m();
  }), true === l && onMounted(() => {
    h2(r.modelValue);
  });
  const g = { show: p2, hide: m, toggle: d };
  return Object.assign(u, g), g;
}
let queue = [], waitFlags = [];
function clearFlag(e) {
  waitFlags = waitFlags.filter((t) => t !== e);
}
function addFocusWaitFlag(e) {
  clearFlag(e), waitFlags.push(e);
}
function removeFocusWaitFlag(e) {
  clearFlag(e), 0 === waitFlags.length && queue.length > 0 && (queue[queue.length - 1](), queue = []);
}
function addFocusFn(e) {
  0 === waitFlags.length ? e() : queue.push(e);
}
function removeFocusFn(e) {
  queue = queue.filter((t) => t !== e);
}
const globalNodes = [];
let target = document.body;
function createGlobalNode(e) {
  const t = document.createElement("div");
  if (void 0 !== e && (t.id = e), void 0 !== globalConfig.globalNodes) {
    const e2 = globalConfig.globalNodes.class;
    void 0 !== e2 && (t.className = e2);
  }
  return target.appendChild(t), globalNodes.push(t), t;
}
function removeGlobalNode(e) {
  globalNodes.splice(globalNodes.indexOf(e), 1), e.remove();
}
function changeGlobalNodesTarget(e) {
  e !== target && (target = e, globalNodes.forEach((e2) => {
    false === e2.contains(target) && target.appendChild(e2);
  }));
}
const portalProxyList = [];
function getPortalProxy(e) {
  return portalProxyList.find((t) => null !== t.__qPortalInnerRef.value && t.__qPortalInnerRef.value.contains(e));
}
function closePortalMenus(e, t) {
  do {
    if ("QMenu" === e.$options.name) {
      if (e.hide(t), true === e.$props.separateClosePopup)
        return getParentProxy(e);
    } else if (void 0 !== e.__qPortalInnerRef) {
      const o = getParentProxy(e);
      return void 0 !== o && "QPopupProxy" === o.$options.name ? (e.hide(t), o) : e;
    }
    e = getParentProxy(e);
  } while (void 0 !== e && null !== e);
}
function closePortals(e, t, o) {
  while (0 !== o && void 0 !== e && null !== e) {
    if (void 0 !== e.__qPortalInnerRef) {
      if (o--, "QMenu" === e.$options.name) {
        e = closePortalMenus(e, t);
        continue;
      }
      e.hide(t);
    }
    e = getParentProxy(e);
  }
}
function isOnGlobalDialog(e) {
  e = e.parent;
  while (void 0 !== e && null !== e) {
    if ("QGlobalDialog" === e.type.name)
      return true;
    if ("QDialog" === e.type.name || "QMenu" === e.type.name)
      return false;
    e = e.parent;
  }
  return false;
}
function usePortal(e, t, o, n) {
  const a = ref(false), l = ref(false);
  let i = null;
  const r = {}, s = true === n && isOnGlobalDialog(e);
  function u(t2) {
    if (true === t2)
      return removeFocusWaitFlag(r), void (l.value = true);
    l.value = false, false === a.value && (false === s && null === i && (i = createGlobalNode()), a.value = true, portalProxyList.push(e.proxy), addFocusWaitFlag(r));
  }
  function c(t2) {
    if (l.value = false, true !== t2)
      return;
    removeFocusWaitFlag(r), a.value = false;
    const o2 = portalProxyList.indexOf(e.proxy);
    -1 !== o2 && portalProxyList.splice(o2, 1), null !== i && (removeGlobalNode(i), i = null);
  }
  return onUnmounted(() => {
    c(true);
  }), e.proxy.__qPortalInnerRef = t, { showPortal: u, hidePortal: c, portalIsActive: a, portalIsAccessible: l, renderPortal: () => true === s ? o() : true === a.value ? [h(Teleport, { to: i }, o())] : void 0 };
}
const useTransitionProps = { transitionShow: { type: String, default: "fade" }, transitionHide: { type: String, default: "fade" }, transitionDuration: { type: [String, Number], default: 300 } };
function useTransition(e, t) {
  const o = ref(t.value);
  return watch(t, (e2) => {
    nextTick(() => {
      o.value = e2;
    });
  }), { transition: computed(() => "q-transition--" + (true === o.value ? e.transitionHide : e.transitionShow)), transitionStyle: computed(() => `--q-transition-duration: ${e.transitionDuration}ms`) };
}
function useTick() {
  let e;
  const t = getCurrentInstance();
  function o() {
    e = void 0;
  }
  return onDeactivated(o), onBeforeUnmount(o), { removeTick: o, registerTick(o2) {
    e = o2, nextTick(() => {
      e === o2 && (false === vmIsDestroyed(t) && e(), e = void 0);
    });
  } };
}
function useTimeout() {
  let e;
  const t = getCurrentInstance();
  function o() {
    clearTimeout(e);
  }
  return onDeactivated(o), onBeforeUnmount(o), { removeTimeout: o, registerTimeout(o2, n) {
    clearTimeout(e), false === vmIsDestroyed(t) && (e = setTimeout(o2, n));
  } };
}
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(e, t) {
  let o = getElement$1(t);
  if (void 0 === o) {
    if (void 0 === e || null === e)
      return window;
    o = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(o) ? window : o;
}
function getScrollHeight(e) {
  return (e === window ? document.body : e).scrollHeight;
}
function getVerticalScrollPosition(e) {
  return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop;
}
function getHorizontalScrollPosition(e) {
  return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft;
}
function animVerticalScrollTo(e, t, o = 0) {
  const n = void 0 === arguments[3] ? performance.now() : arguments[3], a = getVerticalScrollPosition(e);
  o <= 0 ? a !== t && setScroll$1(e, t) : requestAnimationFrame((l) => {
    const i = l - n, r = a + (t - a) / Math.max(i, o) * i;
    setScroll$1(e, r), r !== t && animVerticalScrollTo(e, t, o - i, l);
  });
}
function animHorizontalScrollTo(e, t, o = 0) {
  const n = void 0 === arguments[3] ? performance.now() : arguments[3], a = getHorizontalScrollPosition(e);
  o <= 0 ? a !== t && setHorizontalScroll(e, t) : requestAnimationFrame((l) => {
    const i = l - n, r = a + (t - a) / Math.max(i, o) * i;
    setHorizontalScroll(e, r), r !== t && animHorizontalScrollTo(e, t, o - i, l);
  });
}
function setScroll$1(e, t) {
  e !== window ? e.scrollTop = t : window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t);
}
function setHorizontalScroll(e, t) {
  e !== window ? e.scrollLeft = t : window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
}
function setVerticalScrollPosition(e, t, o) {
  o ? animVerticalScrollTo(e, t, o) : setScroll$1(e, t);
}
function setHorizontalScrollPosition(e, t, o) {
  o ? animHorizontalScrollTo(e, t, o) : setHorizontalScroll(e, t);
}
let size;
function getScrollbarWidth() {
  if (void 0 !== size)
    return size;
  const e = document.createElement("p"), t = document.createElement("div");
  css(e, { width: "100%", height: "200px" }), css(t, { position: "absolute", top: "0px", left: "0px", visibility: "hidden", width: "200px", height: "150px", overflow: "hidden" }), t.appendChild(e), document.body.appendChild(t);
  const o = e.offsetWidth;
  t.style.overflow = "scroll";
  let n = e.offsetWidth;
  return o === n && (n = t.clientWidth), t.remove(), size = o - n, size;
}
function hasScrollbar(e, t = true) {
  return !(!e || e.nodeType !== Node.ELEMENT_NODE) && (t ? e.scrollHeight > e.clientHeight && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"])) : e.scrollWidth > e.clientWidth && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"])));
}
const handlers$1 = [];
let escDown;
function onKeydown(e) {
  escDown = 27 === e.keyCode;
}
function onBlur() {
  true === escDown && (escDown = false);
}
function onKeyup(e) {
  true === escDown && (escDown = false, true === isKeyCode(e, 27) && handlers$1[handlers$1.length - 1](e));
}
function update$4(e) {
  window[e]("keydown", onKeydown), window[e]("blur", onBlur), window[e]("keyup", onKeyup), escDown = false;
}
function addEscapeKey(e) {
  true === client.is.desktop && (handlers$1.push(e), 1 === handlers$1.length && update$4("addEventListener"));
}
function removeEscapeKey(e) {
  const t = handlers$1.indexOf(e);
  t > -1 && (handlers$1.splice(t, 1), 0 === handlers$1.length && update$4("removeEventListener"));
}
const handlers = [];
function trigger$1(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(e) {
  true === client.is.desktop && (handlers.push(e), 1 === handlers.length && document.body.addEventListener("focusin", trigger$1));
}
function removeFocusout(e) {
  const t = handlers.indexOf(e);
  t > -1 && (handlers.splice(t, 1), 0 === handlers.length && document.body.removeEventListener("focusin", trigger$1));
}
let timer;
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(e) {
  clearTimeout(timer);
  const t = e.target;
  if (void 0 === t || 8 === t.nodeType || true === t.classList.contains("no-pointer-events"))
    return;
  let o = portalProxyList.length - 1;
  while (o >= 0) {
    const e2 = portalProxyList[o].$;
    if ("QDialog" !== e2.type.name)
      break;
    if (true !== e2.props.seamless)
      return;
    o--;
  }
  for (let n = registeredList.length - 1; n >= 0; n--) {
    const o2 = registeredList[n];
    if (null !== o2.anchorEl.value && false !== o2.anchorEl.value.contains(t) || t !== document.body && (null === o2.innerRef.value || false !== o2.innerRef.value.contains(t)))
      return;
    e.qClickOutside = true, o2.onClickOutside(e);
  }
}
function addClickOutside(e) {
  registeredList.push(e), 1 === registeredList.length && (document.addEventListener("mousedown", globalHandler, notPassiveCapture), document.addEventListener("touchstart", globalHandler, notPassiveCapture));
}
function removeClickOutside(e) {
  const t = registeredList.findIndex((t2) => t2 === e);
  t > -1 && (registeredList.splice(t, 1), 0 === registeredList.length && (clearTimeout(timer), document.removeEventListener("mousedown", globalHandler, notPassiveCapture), document.removeEventListener("touchstart", globalHandler, notPassiveCapture)));
}
let vpLeft, vpTop;
function validatePosition(e) {
  const t = e.split(" ");
  return 2 === t.length && (true !== ["top", "center", "bottom"].includes(t[0]) ? (console.error("Anchor/Self position must start with one of top/center/bottom"), false) : true === ["left", "middle", "right", "start", "end"].includes(t[1]) || (console.error("Anchor/Self position must end with one of left/middle/right/start/end"), false));
}
function validateOffset(e) {
  return !e || 2 === e.length && ("number" === typeof e[0] && "number" === typeof e[1]);
}
const horizontalPos = { "start#ltr": "left", "start#rtl": "right", "end#ltr": "right", "end#rtl": "left" };
function parsePosition(e, t) {
  const o = e.split(" ");
  return { vertical: o[0], horizontal: horizontalPos[`${o[1]}#${true === t ? "rtl" : "ltr"}`] };
}
function getAnchorProps(e, t) {
  let { top: o, left: n, right: a, bottom: l, width: i, height: r } = e.getBoundingClientRect();
  return void 0 !== t && (o -= t[1], n -= t[0], l += t[1], a += t[0], i += t[0], r += t[1]), { top: o, left: n, right: a, bottom: l, width: i, height: r, middle: n + (a - n) / 2, center: o + (l - o) / 2 };
}
function getTargetProps(e) {
  return { top: 0, center: e.offsetHeight / 2, bottom: e.offsetHeight, left: 0, middle: e.offsetWidth / 2, right: e.offsetWidth };
}
function setPosition(e) {
  if (true === client.is.ios && void 0 !== window.visualViewport) {
    const e2 = document.body.style, { offsetLeft: t2, offsetTop: o2 } = window.visualViewport;
    t2 !== vpLeft && (e2.setProperty("--q-pe-left", t2 + "px"), vpLeft = t2), o2 !== vpTop && (e2.setProperty("--q-pe-top", o2 + "px"), vpTop = o2);
  }
  let t;
  const { scrollLeft: o, scrollTop: n } = e.el;
  if (void 0 === e.absoluteOffset)
    t = getAnchorProps(e.anchorEl, true === e.cover ? [0, 0] : e.offset);
  else {
    const { top: o2, left: n2 } = e.anchorEl.getBoundingClientRect(), a2 = o2 + e.absoluteOffset.top, l2 = n2 + e.absoluteOffset.left;
    t = { top: a2, left: l2, width: 1, height: 1, right: l2 + 1, center: a2, middle: l2, bottom: a2 + 1 };
  }
  let a = { maxHeight: e.maxHeight, maxWidth: e.maxWidth, visibility: "visible" };
  true !== e.fit && true !== e.cover || (a.minWidth = t.width + "px", true === e.cover && (a.minHeight = t.height + "px")), Object.assign(e.el.style, a);
  const l = getTargetProps(e.el), i = { top: t[e.anchorOrigin.vertical] - l[e.selfOrigin.vertical], left: t[e.anchorOrigin.horizontal] - l[e.selfOrigin.horizontal] };
  applyBoundaries(i, t, l, e.anchorOrigin, e.selfOrigin), a = { top: i.top + "px", left: i.left + "px" }, void 0 !== i.maxHeight && (a.maxHeight = i.maxHeight + "px", t.height > i.maxHeight && (a.minHeight = a.maxHeight)), void 0 !== i.maxWidth && (a.maxWidth = i.maxWidth + "px", t.width > i.maxWidth && (a.minWidth = a.maxWidth)), Object.assign(e.el.style, a), e.el.scrollTop !== n && (e.el.scrollTop = n), e.el.scrollLeft !== o && (e.el.scrollLeft = o);
}
function applyBoundaries(e, t, o, n, a) {
  const l = o.bottom, i = o.right, r = getScrollbarWidth(), s = window.innerHeight - r, u = document.body.clientWidth;
  if (e.top < 0 || e.top + l > s)
    if ("center" === a.vertical)
      e.top = t[n.vertical] > s / 2 ? Math.max(0, s - l) : 0, e.maxHeight = Math.min(l, s);
    else if (t[n.vertical] > s / 2) {
      const o2 = Math.min(s, "center" === n.vertical ? t.center : n.vertical === a.vertical ? t.bottom : t.top);
      e.maxHeight = Math.min(l, o2), e.top = Math.max(0, o2 - l);
    } else
      e.top = Math.max(0, "center" === n.vertical ? t.center : n.vertical === a.vertical ? t.top : t.bottom), e.maxHeight = Math.min(l, s - e.top);
  if (e.left < 0 || e.left + i > u)
    if (e.maxWidth = Math.min(i, u), "middle" === a.horizontal)
      e.left = t[n.horizontal] > u / 2 ? Math.max(0, u - i) : 0;
    else if (t[n.horizontal] > u / 2) {
      const o2 = Math.min(u, "middle" === n.horizontal ? t.middle : n.horizontal === a.horizontal ? t.right : t.left);
      e.maxWidth = Math.min(i, o2), e.left = Math.max(0, o2 - e.maxWidth);
    } else
      e.left = Math.max(0, "middle" === n.horizontal ? t.middle : n.horizontal === a.horizontal ? t.left : t.right), e.maxWidth = Math.min(i, u - e.left);
}
["left", "middle", "right"].forEach((e) => {
  horizontalPos[`${e}#ltr`] = e, horizontalPos[`${e}#rtl`] = e;
});
var QMenu = createComponent({ name: "QMenu", inheritAttrs: false, props: { ...useAnchorProps, ...useModelToggleProps, ...useDarkProps, ...useTransitionProps, persistent: Boolean, autoClose: Boolean, separateClosePopup: Boolean, noRouteDismiss: Boolean, noRefocus: Boolean, noFocus: Boolean, fit: Boolean, cover: Boolean, square: Boolean, anchor: { type: String, validator: validatePosition }, self: { type: String, validator: validatePosition }, offset: { type: Array, validator: validateOffset }, scrollTarget: { default: void 0 }, touchPosition: Boolean, maxHeight: { type: String, default: null }, maxWidth: { type: String, default: null } }, emits: [...useModelToggleEmits, "click", "escape-key"], setup(e, { slots: t, emit: o, attrs: n }) {
  let a, l, i, r = null;
  const s = getCurrentInstance(), { proxy: u } = s, { $q: c } = u, d = ref(null), p2 = ref(false), v = computed(() => true !== e.persistent && true !== e.noRouteDismiss), m = useDark(e, c), { registerTick: f, removeTick: g } = useTick(), { registerTimeout: b } = useTimeout(), { transition: y, transitionStyle: S } = useTransition(e, p2), { localScrollTarget: w, changeScrollEvent: C, unconfigureScrollTarget: x } = useScrollTarget(e, F), { anchorEl: k, canShow: _ } = useAnchor({ showing: p2 }), { hide: q } = useModelToggle({ showing: p2, canShow: _, handleShow: R, handleHide: D, hideOnRouteChange: v, processOnMount: true }), { showPortal: T, hidePortal: P, renderPortal: $ } = usePortal(s, d, j), M = { anchorEl: k, innerRef: d, onClickOutside(t2) {
    if (true !== e.persistent && true === p2.value)
      return q(t2), ("touchstart" === t2.type || t2.target.classList.contains("q-dialog__backdrop")) && stopAndPrevent(t2), true;
  } }, B = computed(() => parsePosition(e.anchor || (true === e.cover ? "center middle" : "bottom start"), c.lang.rtl)), Q = computed(() => true === e.cover ? B.value : parsePosition(e.self || "top start", c.lang.rtl)), E = computed(() => (true === e.square ? " q-menu--square" : "") + (true === m.value ? " q-menu--dark q-dark" : "")), O = computed(() => true === e.autoClose ? { onClick: I } : {}), A = computed(() => true === p2.value && true !== e.persistent);
  function L() {
    addFocusFn(() => {
      let e2 = d.value;
      e2 && true !== e2.contains(document.activeElement) && (e2 = e2.querySelector("[autofocus], [data-autofocus]") || e2, e2.focus({ preventScroll: true }));
    });
  }
  function R(t2) {
    if (r = false === e.noRefocus ? document.activeElement : null, addFocusout(V), T(), F(), a = void 0, void 0 !== t2 && (e.touchPosition || e.contextMenu)) {
      const e2 = position(t2);
      if (void 0 !== e2.left) {
        const { top: t3, left: o2 } = k.value.getBoundingClientRect();
        a = { left: e2.left - o2, top: e2.top - t3 };
      }
    }
    void 0 === l && (l = watch(() => c.screen.width + "|" + c.screen.height + "|" + e.self + "|" + e.anchor + "|" + c.lang.rtl, H)), true !== e.noFocus && document.activeElement.blur(), f(() => {
      H(), true !== e.noFocus && L();
    }), b(() => {
      true === c.platform.is.ios && (i = e.autoClose, d.value.click()), H(), T(true), o("show", t2);
    }, e.transitionDuration);
  }
  function D(t2) {
    g(), P(), z(true), null === r || void 0 !== t2 && true === t2.qClickOutside || (r.focus(), r = null), b(() => {
      P(true), o("hide", t2);
    }, e.transitionDuration);
  }
  function z(e2) {
    a = void 0, void 0 !== l && (l(), l = void 0), true !== e2 && true !== p2.value || (removeFocusout(V), x(), removeClickOutside(M), removeEscapeKey(N)), true !== e2 && (r = null);
  }
  function F() {
    null === k.value && void 0 === e.scrollTarget || (w.value = getScrollTarget(k.value, e.scrollTarget), C(w.value, H));
  }
  function I(e2) {
    true !== i ? (closePortalMenus(u, e2), o("click", e2)) : i = false;
  }
  function V(t2) {
    true === A.value && true !== e.noFocus && true !== childHasFocus(d.value, t2.target) && L();
  }
  function N(e2) {
    o("escape-key"), q(e2);
  }
  function H() {
    const t2 = d.value;
    null !== t2 && null !== k.value && setPosition({ el: t2, offset: e.offset, anchorEl: k.value, anchorOrigin: B.value, selfOrigin: Q.value, absoluteOffset: a, fit: e.fit, cover: e.cover, maxHeight: e.maxHeight, maxWidth: e.maxWidth });
  }
  function j() {
    return h(Transition, { name: y.value, appear: true }, () => true === p2.value ? h("div", { role: "menu", ...n, ref: d, tabindex: -1, class: ["q-menu q-position-engine scroll" + E.value, n.class], style: [n.style, S.value], ...O.value }, hSlot(t.default)) : null);
  }
  return watch(A, (e2) => {
    true === e2 ? (addEscapeKey(N), addClickOutside(M)) : (removeEscapeKey(N), removeClickOutside(M));
  }), onBeforeUnmount(z), Object.assign(u, { focus: L, updatePosition: H }), $;
} });
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let e = 0; e < 256; e++)
  hexBytes[e] = (e + 256).toString(16).substring(1);
const randomBytes = (() => {
  const e = "undefined" !== typeof crypto ? crypto : "undefined" !== typeof window ? window.crypto || window.msCrypto : void 0;
  if (void 0 !== e) {
    if (void 0 !== e.randomBytes)
      return e.randomBytes;
    if (void 0 !== e.getRandomValues)
      return (t) => {
        const o = new Uint8Array(t);
        return e.getRandomValues(o), o;
      };
  }
  return (e2) => {
    const t = [];
    for (let o = e2; o > 0; o--)
      t.push(Math.floor(256 * Math.random()));
    return t;
  };
})(), BUFFER_SIZE = 4096;
function uid$3() {
  (void 0 === buf || bufIdx + 16 > BUFFER_SIZE) && (bufIdx = 0, buf = randomBytes(BUFFER_SIZE));
  const e = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  return e[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, hexBytes[e[0]] + hexBytes[e[1]] + hexBytes[e[2]] + hexBytes[e[3]] + "-" + hexBytes[e[4]] + hexBytes[e[5]] + "-" + hexBytes[e[6]] + hexBytes[e[7]] + "-" + hexBytes[e[8]] + hexBytes[e[9]] + "-" + hexBytes[e[10]] + hexBytes[e[11]] + hexBytes[e[12]] + hexBytes[e[13]] + hexBytes[e[14]] + hexBytes[e[15]];
}
var QBtnDropdown = createComponent({ name: "QBtnDropdown", props: { ...useBtnProps, modelValue: Boolean, split: Boolean, dropdownIcon: String, contentClass: [Array, String, Object], contentStyle: [Array, String, Object], cover: Boolean, persistent: Boolean, noRouteDismiss: Boolean, autoClose: Boolean, menuAnchor: { type: String, default: "bottom end" }, menuSelf: { type: String, default: "top end" }, menuOffset: Array, disableMainBtn: Boolean, disableDropdown: Boolean, noIconAnimation: Boolean, toggleAriaLabel: String }, emits: ["update:modelValue", "click", "before-show", "show", "before-hide", "hide"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), a = ref(e.modelValue), l = ref(null), i = uid$3(), r = computed(() => {
    const t2 = { "aria-expanded": true === a.value ? "true" : "false", "aria-haspopup": "true", "aria-controls": i, "aria-owns": i, "aria-label": e.toggleAriaLabel || n.$q.lang.label[true === a.value ? "collapse" : "expand"](e.label) };
    return (true === e.disable || false === e.split && true === e.disableMainBtn || true === e.disableDropdown) && (t2["aria-disabled"] = "true"), t2;
  }), s = computed(() => "q-btn-dropdown__arrow" + (true === a.value && false === e.noIconAnimation ? " rotate-180" : "") + (false === e.split ? " q-btn-dropdown__arrow-container" : ""));
  function u(e2) {
    a.value = true, o("before-show", e2);
  }
  function c(e2) {
    o("show", e2), o("update:modelValue", true);
  }
  function d(e2) {
    a.value = false, o("before-hide", e2);
  }
  function p2(e2) {
    o("hide", e2), o("update:modelValue", false);
  }
  function v(e2) {
    o("click", e2);
  }
  function m(e2) {
    stop(e2), b(), o("click", e2);
  }
  function f(e2) {
    null !== l.value && l.value.toggle(e2);
  }
  function g(e2) {
    null !== l.value && l.value.show(e2);
  }
  function b(e2) {
    null !== l.value && l.value.hide(e2);
  }
  return watch(() => e.modelValue, (e2) => {
    null !== l.value && l.value[e2 ? "show" : "hide"]();
  }), watch(() => e.split, b), Object.assign(n, { show: g, hide: b, toggle: f }), onMounted(() => {
    true === e.modelValue && g();
  }), () => {
    const o2 = [h(QIcon, { class: s.value, name: e.dropdownIcon || n.$q.iconSet.arrow.dropdown })];
    return true !== e.disableDropdown && o2.push(h(QMenu, { ref: l, id: i, class: e.contentClass, style: e.contentStyle, cover: e.cover, fit: true, persistent: e.persistent, noRouteDismiss: e.noRouteDismiss, autoClose: e.autoClose, anchor: e.menuAnchor, self: e.menuSelf, offset: e.menuOffset, separateClosePopup: true, onBeforeShow: u, onShow: c, onBeforeHide: d, onHide: p2 }, t.default)), false === e.split ? h(QBtn, { class: "q-btn-dropdown q-btn-dropdown--simple", ...e, disable: true === e.disable || true === e.disableMainBtn, noWrap: true, round: false, ...r.value, onClick: v }, { default: () => hSlot(t.label, []).concat(o2), loading: t.loading }) : h(QBtnGroup, { class: "q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item", outline: e.outline, flat: e.flat, rounded: e.rounded, square: e.square, push: e.push, unelevated: e.unelevated, glossy: e.glossy, stretch: e.stretch }, () => [h(QBtn, { class: "q-btn-dropdown--current", ...e, disable: true === e.disable || true === e.disableMainBtn, noWrap: true, iconRight: e.iconRight, round: false, onClick: m }, { default: t.label, loading: t.loading }), h(QBtn, { class: "q-btn-dropdown__arrow-container q-anchor--skip", ...r.value, disable: true === e.disable || true === e.disableDropdown, outline: e.outline, flat: e.flat, rounded: e.rounded, push: e.push, size: e.size, color: e.color, textColor: e.textColor, dense: e.dense, ripple: e.ripple }, () => o2)]);
  };
} });
const useFormProps = { name: String };
function useFormAttrs(e) {
  return computed(() => ({ type: "hidden", name: e.name, value: e.modelValue }));
}
function useFormInject(e = {}) {
  return (t, o, n) => {
    t[o](h("input", { class: "hidden" + (n || ""), ...e.value }));
  };
}
function useFormInputNameAttr(e) {
  return computed(() => e.name || e.for);
}
var QBtnToggle = createComponent({ name: "QBtnToggle", props: { ...useFormProps, modelValue: { required: true }, options: { type: Array, required: true, validator: (e) => e.every((e2) => ("label" in e2 || "icon" in e2 || "slot" in e2) && "value" in e2) }, color: String, textColor: String, toggleColor: { type: String, default: "primary" }, toggleTextColor: String, outline: Boolean, flat: Boolean, unelevated: Boolean, rounded: Boolean, push: Boolean, glossy: Boolean, size: String, padding: String, noCaps: Boolean, noWrap: Boolean, dense: Boolean, readonly: Boolean, disable: Boolean, stack: Boolean, stretch: Boolean, spread: Boolean, clearable: Boolean, ripple: { type: [Boolean, Object], default: true } }, emits: ["update:modelValue", "clear", "click"], setup(e, { slots: t, emit: o }) {
  const n = computed(() => void 0 !== e.options.find((t2) => t2.value === e.modelValue)), a = computed(() => ({ type: "hidden", name: e.name, value: e.modelValue })), l = useFormInject(a), i = computed(() => e.options.map((t2, o2) => {
    const { attrs: n2, value: a2, slot: l2, ...i2 } = t2;
    return { slot: l2, props: { key: o2, onClick(e2) {
      r(a2, t2, e2);
    }, "aria-pressed": a2 === e.modelValue ? "true" : "false", ...n2, ...i2, outline: e.outline, flat: e.flat, rounded: e.rounded, push: e.push, unelevated: e.unelevated, dense: e.dense, disable: true === e.disable || true === i2.disable, color: a2 === e.modelValue ? s(i2, "toggleColor") : s(i2, "color"), textColor: a2 === e.modelValue ? s(i2, "toggleTextColor") : s(i2, "textColor"), noCaps: true === s(i2, "noCaps"), noWrap: true === s(i2, "noWrap"), size: s(i2, "size"), padding: s(i2, "padding"), ripple: s(i2, "ripple"), stack: true === s(i2, "stack"), stretch: true === s(i2, "stretch") } };
  }));
  function r(t2, n2, a2) {
    true !== e.readonly && (e.modelValue === t2 ? true === e.clearable && (o("update:modelValue", null, null), o("clear")) : o("update:modelValue", t2, n2), o("click", a2));
  }
  function s(t2, o2) {
    return void 0 === t2[o2] ? e[o2] : t2[o2];
  }
  function u() {
    const o2 = i.value.map((e2) => {
      return h(QBtn, e2.props, void 0 !== e2.slot ? t[e2.slot] : void 0);
    });
    return void 0 !== e.name && true !== e.disable && true === n.value && l(o2, "push"), hMergeSlot(t.default, o2);
  }
  return () => h(QBtnGroup, { class: "q-btn-toggle", outline: e.outline, flat: e.flat, rounded: e.rounded, push: e.push, stretch: e.stretch, unelevated: e.unelevated, glossy: e.glossy, spread: e.spread }, u);
} }), QCard = createComponent({ name: "QCard", props: { ...useDarkProps, tag: { type: String, default: "div" }, square: Boolean, flat: Boolean, bordered: Boolean }, setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useDark(e, o), a = computed(() => "q-card" + (true === n.value ? " q-card--dark q-dark" : "") + (true === e.bordered ? " q-card--bordered" : "") + (true === e.square ? " q-card--square no-border-radius" : "") + (true === e.flat ? " q-card--flat no-shadow" : ""));
  return () => h(e.tag, { class: a.value }, hSlot(t.default));
} }), QCardSection = createComponent({ name: "QCardSection", props: { tag: { type: String, default: "div" }, horizontal: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => `q-card__section q-card__section--${true === e.horizontal ? "horiz row no-wrap" : "vert"}`);
  return () => h(e.tag, { class: o.value }, hSlot(t.default));
} }), QCardActions = createComponent({ name: "QCardActions", props: { ...useAlignProps, vertical: Boolean }, setup(e, { slots: t }) {
  const o = useAlign(e), n = computed(() => `q-card__actions ${o.value} q-card__actions--${true === e.vertical ? "vert column" : "horiz row"}`);
  return () => h("div", { class: n.value }, hSlot(t.default));
} });
const modifiersAll = { left: true, right: true, up: true, down: true, horizontal: true, vertical: true }, directionList = Object.keys(modifiersAll);
function getModifierDirections(e) {
  const t = {};
  for (const o of directionList)
    true === e[o] && (t[o] = true);
  return 0 === Object.keys(t).length ? modifiersAll : (true === t.horizontal ? t.left = t.right = true : true === t.left && true === t.right && (t.horizontal = true), true === t.vertical ? t.up = t.down = true : true === t.up && true === t.down && (t.vertical = true), true === t.horizontal && true === t.vertical && (t.all = true), t);
}
function shouldStart(e, t) {
  return void 0 === t.event && void 0 !== e.target && true !== e.target.draggable && "function" === typeof t.handler && "INPUT" !== e.target.nodeName.toUpperCase() && (void 0 === e.qClonedBy || -1 === e.qClonedBy.indexOf(t.uid));
}
function parseArg(e) {
  const t = [0.06, 6, 50];
  return "string" === typeof e && e.length && e.split(":").forEach((e2, o) => {
    const n = parseFloat(e2);
    n && (t[o] = n);
  }), t;
}
modifiersAll.all = true;
var TouchSwipe = createDirective({ name: "touch-swipe", beforeMount(e, { value: t, arg: o, modifiers: n }) {
  if (true !== n.mouse && true !== client.has.touch)
    return;
  const a = true === n.mouseCapture ? "Capture" : "", l = { handler: t, sensitivity: parseArg(o), direction: getModifierDirections(n), noop, mouseStart(e2) {
    shouldStart(e2, l) && leftClick(e2) && (addEvt(l, "temp", [[document, "mousemove", "move", `notPassive${a}`], [document, "mouseup", "end", "notPassiveCapture"]]), l.start(e2, true));
  }, touchStart(e2) {
    if (shouldStart(e2, l)) {
      const t2 = e2.target;
      addEvt(l, "temp", [[t2, "touchmove", "move", "notPassiveCapture"], [t2, "touchcancel", "end", "notPassiveCapture"], [t2, "touchend", "end", "notPassiveCapture"]]), l.start(e2);
    }
  }, start(t2, o2) {
    true === client.is.firefox && preventDraggable(e, true);
    const n2 = position(t2);
    l.event = { x: n2.left, y: n2.top, time: Date.now(), mouse: true === o2, dir: false };
  }, move(e2) {
    if (void 0 === l.event)
      return;
    if (false !== l.event.dir)
      return void stopAndPrevent(e2);
    const t2 = Date.now() - l.event.time;
    if (0 === t2)
      return;
    const o2 = position(e2), n2 = o2.left - l.event.x, a2 = Math.abs(n2), i = o2.top - l.event.y, r = Math.abs(i);
    if (true !== l.event.mouse) {
      if (a2 < l.sensitivity[1] && r < l.sensitivity[1])
        return void l.end(e2);
    } else if (a2 < l.sensitivity[2] && r < l.sensitivity[2])
      return;
    const s = a2 / t2, u = r / t2;
    true === l.direction.vertical && a2 < r && a2 < 100 && u > l.sensitivity[0] && (l.event.dir = i < 0 ? "up" : "down"), true === l.direction.horizontal && a2 > r && r < 100 && s > l.sensitivity[0] && (l.event.dir = n2 < 0 ? "left" : "right"), true === l.direction.up && a2 < r && i < 0 && a2 < 100 && u > l.sensitivity[0] && (l.event.dir = "up"), true === l.direction.down && a2 < r && i > 0 && a2 < 100 && u > l.sensitivity[0] && (l.event.dir = "down"), true === l.direction.left && a2 > r && n2 < 0 && r < 100 && s > l.sensitivity[0] && (l.event.dir = "left"), true === l.direction.right && a2 > r && n2 > 0 && r < 100 && s > l.sensitivity[0] && (l.event.dir = "right"), false !== l.event.dir ? (stopAndPrevent(e2), true === l.event.mouse && (document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), clearSelection(), l.styleCleanup = (e3) => {
      l.styleCleanup = void 0, document.body.classList.remove("non-selectable");
      const t3 = () => {
        document.body.classList.remove("no-pointer-events--children");
      };
      true === e3 ? setTimeout(t3, 50) : t3();
    }), l.handler({ evt: e2, touch: true !== l.event.mouse, mouse: l.event.mouse, direction: l.event.dir, duration: t2, distance: { x: a2, y: r } })) : l.end(e2);
  }, end(t2) {
    void 0 !== l.event && (cleanEvt(l, "temp"), true === client.is.firefox && preventDraggable(e, false), void 0 !== l.styleCleanup && l.styleCleanup(true), void 0 !== t2 && false !== l.event.dir && stopAndPrevent(t2), l.event = void 0);
  } };
  e.__qtouchswipe = l, true === n.mouse && addEvt(l, "main", [[e, "mousedown", "mouseStart", `passive${a}`]]), true === client.has.touch && addEvt(l, "main", [[e, "touchstart", "touchStart", `passive${true === n.capture ? "Capture" : ""}`], [e, "touchmove", "noop", "notPassiveCapture"]]);
}, updated(e, t) {
  const o = e.__qtouchswipe;
  void 0 !== o && (t.oldValue !== t.value && ("function" !== typeof t.value && o.end(), o.handler = t.value), o.direction = getModifierDirections(t.modifiers));
}, beforeUnmount(e) {
  const t = e.__qtouchswipe;
  void 0 !== t && (cleanEvt(t, "main"), cleanEvt(t, "temp"), true === client.is.firefox && preventDraggable(e, false), void 0 !== t.styleCleanup && t.styleCleanup(), delete e.__qtouchswipe);
} });
function useCache() {
  const e = /* @__PURE__ */ new Map();
  return { getCache: function(t, o) {
    return void 0 === e[t] ? e[t] = o : e[t];
  }, getCacheWithFn: function(t, o) {
    return void 0 === e[t] ? e[t] = o() : e[t];
  } };
}
const usePanelChildProps = { name: { required: true }, disable: Boolean }, PanelWrapper$1 = { setup(e, { slots: t }) {
  return () => h("div", { class: "q-panel scroll", role: "tabpanel" }, hSlot(t.default));
} }, usePanelProps = { modelValue: { required: true }, animated: Boolean, infinite: Boolean, swipeable: Boolean, vertical: Boolean, transitionPrev: String, transitionNext: String, transitionDuration: { type: [String, Number], default: 300 }, keepAlive: Boolean, keepAliveInclude: [String, Array, RegExp], keepAliveExclude: [String, Array, RegExp], keepAliveMax: Number }, usePanelEmits = ["update:modelValue", "before-transition", "transition"];
function usePanel() {
  const { props: e, emit: t, proxy: o } = getCurrentInstance(), { getCacheWithFn: n } = useCache();
  let a, l;
  const i = ref(null), r = ref(null);
  function s(t2) {
    const n2 = true === e.vertical ? "up" : "left";
    k((true === o.$q.lang.rtl ? -1 : 1) * (t2.direction === n2 ? 1 : -1));
  }
  const u = computed(() => {
    return [[TouchSwipe, s, void 0, { horizontal: true !== e.vertical, vertical: e.vertical, mouse: true }]];
  }), c = computed(() => e.transitionPrev || `slide-${true === e.vertical ? "down" : "right"}`), d = computed(() => e.transitionNext || `slide-${true === e.vertical ? "up" : "left"}`), p2 = computed(() => `--q-transition-duration: ${e.transitionDuration}ms`), v = computed(() => "string" === typeof e.modelValue || "number" === typeof e.modelValue ? e.modelValue : String(e.modelValue)), m = computed(() => ({ include: e.keepAliveInclude, exclude: e.keepAliveExclude, max: e.keepAliveMax })), f = computed(() => void 0 !== e.keepAliveInclude || void 0 !== e.keepAliveExclude);
  function g() {
    k(1);
  }
  function b() {
    k(-1);
  }
  function y(e2) {
    t("update:modelValue", e2);
  }
  function S(e2) {
    return void 0 !== e2 && null !== e2 && "" !== e2;
  }
  function w(e2) {
    return a.findIndex((t2) => {
      return t2.props.name === e2 && "" !== t2.props.disable && true !== t2.props.disable;
    });
  }
  function C() {
    return a.filter((e2) => {
      return "" !== e2.props.disable && true !== e2.props.disable;
    });
  }
  function x(t2) {
    const o2 = 0 !== t2 && true === e.animated && -1 !== i.value ? "q-transition--" + (-1 === t2 ? c.value : d.value) : null;
    r.value !== o2 && (r.value = o2);
  }
  function k(o2, n2 = i.value) {
    let r2 = n2 + o2;
    while (r2 > -1 && r2 < a.length) {
      const e2 = a[r2];
      if (void 0 !== e2 && "" !== e2.props.disable && true !== e2.props.disable)
        return x(o2), l = true, t("update:modelValue", e2.props.name), void setTimeout(() => {
          l = false;
        });
      r2 += o2;
    }
    true === e.infinite && a.length > 0 && -1 !== n2 && n2 !== a.length && k(o2, -1 === o2 ? a.length : -1);
  }
  function _() {
    const t2 = w(e.modelValue);
    return i.value !== t2 && (i.value = t2), true;
  }
  function q() {
    const t2 = true === S(e.modelValue) && _() && a[i.value];
    return true === e.keepAlive ? [h(KeepAlive, m.value, [h(true === f.value ? n(v.value, () => ({ ...PanelWrapper$1, name: v.value })) : PanelWrapper$1, { key: v.value, style: p2.value }, () => t2)])] : [h("div", { class: "q-panel scroll", style: p2.value, key: v.value, role: "tabpanel" }, [t2])];
  }
  function T() {
    if (0 !== a.length)
      return true === e.animated ? [h(Transition, { name: r.value }, q)] : q();
  }
  function P(e2) {
    return a = getNormalizedVNodes(hSlot(e2.default, [])).filter((e3) => null !== e3.props && void 0 === e3.props.slot && true === S(e3.props.name)), a.length;
  }
  function $() {
    return a;
  }
  return watch(() => e.modelValue, (e2, o2) => {
    const n2 = true === S(e2) ? w(e2) : -1;
    true !== l && x(-1 === n2 ? 0 : n2 < w(o2) ? -1 : 1), i.value !== n2 && (i.value = n2, t("before-transition", e2, o2), nextTick(() => {
      t("transition", e2, o2);
    }));
  }), Object.assign(o, { next: g, previous: b, goTo: y }), { panelIndex: i, panelDirectives: u, updatePanelsList: P, updatePanelIndex: _, getPanelContent: T, getEnabledPanels: C, getPanels: $, isValidPanelName: S, keepAliveProps: m, needsUniqueKeepAliveWrapper: f, goToPanelByOffset: k, goToPanel: y, nextPanel: g, previousPanel: b };
}
let counter = 0;
const useFullscreenProps = { fullscreen: Boolean, noRouteFullscreenExit: Boolean }, useFullscreenEmits = ["update:fullscreen", "fullscreen"];
function useFullscreen() {
  const e = getCurrentInstance(), { props: t, emit: o, proxy: n } = e;
  let a, l, i;
  const r = ref(false);
  function s() {
    true === r.value ? c() : u();
  }
  function u() {
    true !== r.value && (r.value = true, i = n.$el.parentNode, i.replaceChild(l, n.$el), document.body.appendChild(n.$el), counter++, 1 === counter && document.body.classList.add("q-body--fullscreen-mixin"), a = { handler: c }, History.add(a));
  }
  function c() {
    true === r.value && (void 0 !== a && (a = void 0), i.replaceChild(n.$el, l), r.value = false, counter = Math.max(0, counter - 1), 0 === counter && (document.body.classList.remove("q-body--fullscreen-mixin"), void 0 !== n.$el.scrollIntoView && setTimeout(() => {
      n.$el.scrollIntoView();
    })));
  }
  return true === vmHasRouter(e) && watch(() => n.$route.fullPath, () => {
    true !== t.noRouteFullscreenExit && c();
  }), watch(() => t.fullscreen, (e2) => {
    r.value !== e2 && s();
  }), watch(r, (e2) => {
    o("update:fullscreen", e2), o("fullscreen", e2);
  }), onBeforeMount(() => {
    l = document.createElement("span");
  }), onMounted(() => {
    true === t.fullscreen && u();
  }), onBeforeUnmount(c), Object.assign(n, { toggleFullscreen: s, setFullscreen: u, exitFullscreen: c }), { inFullscreen: r, toggleFullscreen: s };
}
const navigationPositionOptions = ["top", "right", "bottom", "left"], controlTypeOptions = ["regular", "flat", "outline", "push", "unelevated"];
var QCarousel = createComponent({ name: "QCarousel", props: { ...useDarkProps, ...usePanelProps, ...useFullscreenProps, transitionPrev: { type: String, default: "fade" }, transitionNext: { type: String, default: "fade" }, height: String, padding: Boolean, controlColor: String, controlTextColor: String, controlType: { type: String, validator: (e) => controlTypeOptions.includes(e), default: "flat" }, autoplay: [Number, Boolean], arrows: Boolean, prevIcon: String, nextIcon: String, navigation: Boolean, navigationPosition: { type: String, validator: (e) => navigationPositionOptions.includes(e) }, navigationIcon: String, navigationActiveIcon: String, thumbnails: Boolean }, emits: [...useFullscreenEmits, ...usePanelEmits], setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useDark(e, o);
  let a, l;
  const { updatePanelsList: i, getPanelContent: r, panelDirectives: s, goToPanel: u, previousPanel: c, nextPanel: d, getEnabledPanels: p2, panelIndex: v } = usePanel(), { inFullscreen: m } = useFullscreen(), f = computed(() => true !== m.value && void 0 !== e.height ? { height: e.height } : {}), g = computed(() => true === e.vertical ? "vertical" : "horizontal"), b = computed(() => `q-carousel q-panel-parent q-carousel--with${true === e.padding ? "" : "out"}-padding` + (true === m.value ? " fullscreen" : "") + (true === n.value ? " q-carousel--dark q-dark" : "") + (true === e.arrows ? ` q-carousel--arrows-${g.value}` : "") + (true === e.navigation ? ` q-carousel--navigation-${C.value}` : "")), y = computed(() => {
    const t2 = [e.prevIcon || o.iconSet.carousel[true === e.vertical ? "up" : "left"], e.nextIcon || o.iconSet.carousel[true === e.vertical ? "down" : "right"]];
    return false === e.vertical && true === o.lang.rtl ? t2.reverse() : t2;
  }), S = computed(() => e.navigationIcon || o.iconSet.carousel.navigationIcon), w = computed(() => e.navigationActiveIcon || S.value), C = computed(() => e.navigationPosition || (true === e.vertical ? "right" : "bottom")), x = computed(() => ({ color: e.controlColor, textColor: e.controlTextColor, round: true, [e.controlType]: true, dense: true }));
  function k() {
    const t2 = true === isNumber(e.autoplay) ? e.autoplay : 5e3;
    a = setTimeout(t2 >= 0 ? d : c, Math.abs(t2));
  }
  function _(t2, o2) {
    return h("div", { class: `q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${t2} q-carousel__navigation--${C.value}` + (void 0 !== e.controlColor ? ` text-${e.controlColor}` : "") }, [h("div", { class: "q-carousel__navigation-inner flex flex-center no-wrap" }, p2().map(o2))]);
  }
  function q() {
    const o2 = [];
    if (true === e.navigation) {
      const e2 = void 0 !== t["navigation-icon"] ? t["navigation-icon"] : (e3) => h(QBtn, { key: "nav" + e3.name, class: `q-carousel__navigation-icon q-carousel__navigation-icon--${true === e3.active ? "" : "in"}active`, ...e3.btnProps, onClick: e3.onClick }), n2 = l - 1;
      o2.push(_("buttons", (t2, o3) => {
        const a2 = t2.props.name, l2 = v.value === o3;
        return e2({ index: o3, maxIndex: n2, name: a2, active: l2, btnProps: { icon: true === l2 ? w.value : S.value, size: "sm", ...x.value }, onClick: () => {
          u(a2);
        } });
      }));
    } else if (true === e.thumbnails) {
      const t2 = void 0 !== e.controlColor ? ` text-${e.controlColor}` : "";
      o2.push(_("thumbnails", (o3) => {
        const n2 = o3.props;
        return h("img", { key: "tmb#" + n2.name, class: `q-carousel__thumbnail q-carousel__thumbnail--${n2.name === e.modelValue ? "" : "in"}active` + t2, src: n2.imgSrc || n2["img-src"], onClick: () => {
          u(n2.name);
        } });
      }));
    }
    return true === e.arrows && v.value >= 0 && ((true === e.infinite || v.value > 0) && o2.push(h("div", { key: "prev", class: `q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${g.value} absolute flex flex-center` }, [h(QBtn, { icon: y.value[0], ...x.value, onClick: c })])), (true === e.infinite || v.value < l - 1) && o2.push(h("div", { key: "next", class: `q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${g.value} absolute flex flex-center` }, [h(QBtn, { icon: y.value[1], ...x.value, onClick: d })]))), hMergeSlot(t.control, o2);
  }
  return watch(() => e.modelValue, () => {
    e.autoplay && (clearInterval(a), k());
  }), watch(() => e.autoplay, (e2) => {
    e2 ? k() : clearInterval(a);
  }), onMounted(() => {
    e.autoplay && k();
  }), onBeforeUnmount(() => {
    clearInterval(a);
  }), () => {
    return l = i(t), h("div", { class: b.value, style: f.value }, [hDir("div", { class: "q-carousel__slides-container" }, r(), "sl-cont", e.swipeable, () => s.value)].concat(q()));
  };
} }), QCarouselSlide = createComponent({ name: "QCarouselSlide", props: { ...usePanelChildProps, imgSrc: String }, setup(e, { slots: t }) {
  const o = computed(() => e.imgSrc ? { backgroundImage: `url("${e.imgSrc}")` } : {});
  return () => h("div", { class: "q-carousel__slide", style: o.value }, hSlot(t.default));
} }), QCarouselControl = createComponent({ name: "QCarouselControl", props: { position: { type: String, default: "bottom-right", validator: (e) => ["top-right", "top-left", "bottom-right", "bottom-left", "top", "right", "bottom", "left"].includes(e) }, offset: { type: Array, default: () => [18, 18], validator: (e) => 2 === e.length } }, setup(e, { slots: t }) {
  const o = computed(() => `q-carousel__control absolute absolute-${e.position}`), n = computed(() => ({ margin: `${e.offset[1]}px ${e.offset[0]}px` }));
  return () => h("div", { class: o.value, style: n.value }, hSlot(t.default));
} }), QChatMessage = createComponent({ name: "QChatMessage", props: { sent: Boolean, label: String, bgColor: String, textColor: String, name: String, avatar: String, text: Array, stamp: String, size: String, labelHtml: Boolean, nameHtml: Boolean, textHtml: Boolean, stampHtml: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => true === e.sent ? "sent" : "received"), n = computed(() => `q-message-text-content q-message-text-content--${o.value}` + (void 0 !== e.textColor ? ` text-${e.textColor}` : "")), a = computed(() => `q-message-text q-message-text--${o.value}` + (void 0 !== e.bgColor ? ` text-${e.bgColor}` : "")), l = computed(() => "q-message-container row items-end no-wrap" + (true === e.sent ? " reverse" : "")), i = computed(() => void 0 !== e.size ? `col-${e.size}` : ""), r = computed(() => ({ msg: true === e.textHtml ? "innerHTML" : "textContent", stamp: true === e.stampHtml ? "innerHTML" : "textContent", name: true === e.nameHtml ? "innerHTML" : "textContent", label: true === e.labelHtml ? "innerHTML" : "textContent" }));
  function s(o2) {
    return void 0 !== t.stamp ? [o2, h("div", { class: "q-message-stamp" }, t.stamp())] : e.stamp ? [o2, h("div", { class: "q-message-stamp", [r.value.stamp]: e.stamp })] : [o2];
  }
  function u(e2, t2) {
    const o2 = true === t2 ? e2.length > 1 ? (e3) => e3 : (e3) => h("div", [e3]) : (e3) => h("div", { [r.value.msg]: e3 });
    return e2.map((e3, t3) => h("div", { key: t3, class: a.value }, [h("div", { class: n.value }, s(o2(e3)))]));
  }
  return () => {
    const n2 = [];
    void 0 !== t.avatar ? n2.push(t.avatar()) : void 0 !== e.avatar && n2.push(h("img", { class: `q-message-avatar q-message-avatar--${o.value}`, src: e.avatar, "aria-hidden": "true" }));
    const a2 = [];
    void 0 !== t.name ? a2.push(h("div", { class: `q-message-name q-message-name--${o.value}` }, t.name())) : void 0 !== e.name && a2.push(h("div", { class: `q-message-name q-message-name--${o.value}`, [r.value.name]: e.name })), void 0 !== t.default ? a2.push(u(getNormalizedVNodes(t.default()), true)) : void 0 !== e.text && a2.push(u(e.text)), n2.push(h("div", { class: i.value }, a2));
    const s2 = [];
    return void 0 !== t.label ? s2.push(h("div", { class: "q-message-label" }, t.label())) : void 0 !== e.label && s2.push(h("div", { class: "q-message-label", [r.value.label]: e.label })), s2.push(h("div", { class: l.value }, n2)), h("div", { class: `q-message q-message-${o.value}` }, s2);
  };
} });
function useRefocusTarget(e, t) {
  const o = ref(null), n = computed(() => {
    return true === e.disable ? null : h("span", { ref: o, class: "no-outline", tabindex: -1 });
  });
  function a(e2) {
    const n2 = t.value;
    void 0 !== e2 && 0 === e2.type.indexOf("key") ? null !== n2 && document.activeElement !== n2 && true === n2.contains(document.activeElement) && n2.focus() : null !== o.value && (void 0 === e2 || null !== n2 && true === n2.contains(e2.target)) && o.value.focus();
  }
  return { refocusTargetEl: n, refocusTarget: a };
}
var optionSizes = { xs: 30, sm: 35, md: 40, lg: 50, xl: 60 };
const useCheckboxProps = { ...useDarkProps, ...useSizeProps, ...useFormProps, modelValue: { required: true, default: null }, val: {}, trueValue: { default: true }, falseValue: { default: false }, indeterminateValue: { default: null }, checkedIcon: String, uncheckedIcon: String, indeterminateIcon: String, toggleOrder: { type: String, validator: (e) => "tf" === e || "ft" === e }, toggleIndeterminate: Boolean, label: String, leftLabel: Boolean, color: String, keepColor: Boolean, dense: Boolean, disable: Boolean, tabindex: [String, Number] }, useCheckboxEmits = ["update:modelValue"];
function useCheckbox(e, t) {
  const { props: o, slots: n, emit: a, proxy: l } = getCurrentInstance(), { $q: i } = l, r = useDark(o, i), s = ref(null), { refocusTargetEl: u, refocusTarget: c } = useRefocusTarget(o, s), d = useSize(o, optionSizes), p2 = computed(() => void 0 !== o.val && Array.isArray(o.modelValue)), v = computed(() => {
    const e2 = toRaw(o.val);
    return true === p2.value ? o.modelValue.findIndex((t2) => toRaw(t2) === e2) : -1;
  }), m = computed(() => true === p2.value ? v.value > -1 : toRaw(o.modelValue) === toRaw(o.trueValue)), f = computed(() => true === p2.value ? -1 === v.value : toRaw(o.modelValue) === toRaw(o.falseValue)), g = computed(() => false === m.value && false === f.value), b = computed(() => true === o.disable ? -1 : o.tabindex || 0), y = computed(() => `q-${e} cursor-pointer no-outline row inline no-wrap items-center` + (true === o.disable ? " disabled" : "") + (true === r.value ? ` q-${e}--dark` : "") + (true === o.dense ? ` q-${e}--dense` : "") + (true === o.leftLabel ? " reverse" : "")), S = computed(() => {
    const t2 = true === m.value ? "truthy" : true === f.value ? "falsy" : "indet", n2 = void 0 === o.color || true !== o.keepColor && ("toggle" === e ? true !== m.value : true === f.value) ? "" : ` text-${o.color}`;
    return `q-${e}__inner relative-position non-selectable q-${e}__inner--${t2}${n2}`;
  }), w = computed(() => {
    const e2 = { type: "checkbox" };
    return void 0 !== o.name && Object.assign(e2, { "^checked": true === m.value ? "checked" : void 0, name: o.name, value: true === p2.value ? o.val : o.trueValue }), e2;
  }), C = useFormInject(w), x = computed(() => {
    const e2 = { tabindex: b.value, role: "checkbox", "aria-label": o.label, "aria-checked": true === g.value ? "mixed" : true === m.value ? "true" : "false" };
    return true === o.disable && (e2["aria-disabled"] = "true"), e2;
  });
  function k(e2) {
    void 0 !== e2 && (stopAndPrevent(e2), c(e2)), true !== o.disable && a("update:modelValue", _(), e2);
  }
  function _() {
    if (true === p2.value) {
      if (true === m.value) {
        const e2 = o.modelValue.slice();
        return e2.splice(v.value, 1), e2;
      }
      return o.modelValue.concat([o.val]);
    }
    if (true === m.value) {
      if ("ft" !== o.toggleOrder || false === o.toggleIndeterminate)
        return o.falseValue;
    } else {
      if (true !== f.value)
        return "ft" !== o.toggleOrder ? o.trueValue : o.falseValue;
      if ("ft" === o.toggleOrder || false === o.toggleIndeterminate)
        return o.trueValue;
    }
    return o.indeterminateValue;
  }
  function q(e2) {
    13 !== e2.keyCode && 32 !== e2.keyCode || stopAndPrevent(e2);
  }
  function T(e2) {
    13 !== e2.keyCode && 32 !== e2.keyCode || k(e2);
  }
  const P = t(m, g);
  return Object.assign(l, { toggle: k }), () => {
    const t2 = P();
    true !== o.disable && C(t2, "unshift", ` q-${e}__native absolute q-ma-none q-pa-none`);
    const a2 = [h("div", { class: S.value, style: d.value, "aria-hidden": "true" }, t2)];
    null !== u.value && a2.push(u.value);
    const l2 = void 0 !== o.label ? hMergeSlot(n.default, [o.label]) : hSlot(n.default);
    return void 0 !== l2 && a2.push(h("div", { class: `q-${e}__label q-anchor--skip` }, l2)), h("div", { ref: s, class: y.value, ...x.value, onClick: k, onKeydown: q, onKeyup: T }, a2);
  };
}
const bgNode = h("div", { key: "svg", class: "q-checkbox__bg absolute" }, [h("svg", { class: "q-checkbox__svg fit absolute-full", viewBox: "0 0 24 24" }, [h("path", { class: "q-checkbox__truthy", fill: "none", d: "M1.73,12.91 8.1,19.28 22.79,4.59" }), h("path", { class: "q-checkbox__indet", d: "M4,14H20V10H4" })])]);
var QCheckbox = createComponent({ name: "QCheckbox", props: useCheckboxProps, emits: useCheckboxEmits, setup(e) {
  function t(t2, o) {
    const n = computed(() => (true === t2.value ? e.checkedIcon : true === o.value ? e.indeterminateIcon : e.uncheckedIcon) || null);
    return () => null !== n.value ? [h("div", { key: "icon", class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap" }, [h(QIcon, { class: "q-checkbox__icon", name: n.value })])] : [bgNode];
  }
  return useCheckbox("checkbox", t);
} });
const defaultSizes$1 = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 };
var QChip = createComponent({ name: "QChip", props: { ...useDarkProps, ...useSizeProps, dense: Boolean, icon: String, iconRight: String, iconRemove: String, iconSelected: String, label: [String, Number], color: String, textColor: String, modelValue: { type: Boolean, default: true }, selected: { type: Boolean, default: null }, square: Boolean, outline: Boolean, clickable: Boolean, removable: Boolean, removeAriaLabel: String, tabindex: [String, Number], disable: Boolean, ripple: { type: [Boolean, Object], default: true } }, emits: ["update:modelValue", "update:selected", "remove", "click"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useDark(e, n), l = useSize(e, defaultSizes$1), i = computed(() => true === e.selected || void 0 !== e.icon), r = computed(() => true === e.selected ? e.iconSelected || n.iconSet.chip.selected : e.icon), s = computed(() => e.iconRemove || n.iconSet.chip.remove), u = computed(() => false === e.disable && (true === e.clickable || null !== e.selected)), c = computed(() => {
    const t2 = true === e.outline && e.color || e.textColor;
    return "q-chip row inline no-wrap items-center" + (false === e.outline && void 0 !== e.color ? ` bg-${e.color}` : "") + (t2 ? ` text-${t2} q-chip--colored` : "") + (true === e.disable ? " disabled" : "") + (true === e.dense ? " q-chip--dense" : "") + (true === e.outline ? " q-chip--outline" : "") + (true === e.selected ? " q-chip--selected" : "") + (true === u.value ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (true === e.square ? " q-chip--square" : "") + (true === a.value ? " q-chip--dark q-dark" : "");
  }), d = computed(() => true === e.disable ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: e.tabindex || 0, role: "button", "aria-hidden": "false", "aria-label": e.removeAriaLabel || n.lang.label.remove });
  function p2(e2) {
    13 === e2.keyCode && v(e2);
  }
  function v(t2) {
    e.disable || (o("update:selected", !e.selected), o("click", t2));
  }
  function m(t2) {
    void 0 !== t2.keyCode && 13 !== t2.keyCode || (stopAndPrevent(t2), false === e.disable && (o("update:modelValue", false), o("remove")));
  }
  function f() {
    const o2 = [];
    true === u.value && o2.push(h("div", { class: "q-focus-helper" })), true === i.value && o2.push(h(QIcon, { class: "q-chip__icon q-chip__icon--left", name: r.value }));
    const n2 = void 0 !== e.label ? [h("div", { class: "ellipsis" }, [e.label])] : void 0;
    return o2.push(h("div", { class: "q-chip__content col row no-wrap items-center q-anchor--skip" }, hMergeSlotSafely(t.default, n2))), e.iconRight && o2.push(h(QIcon, { class: "q-chip__icon q-chip__icon--right", name: e.iconRight })), true === e.removable && o2.push(h(QIcon, { class: "q-chip__icon q-chip__icon--remove cursor-pointer", name: s.value, ...d.value, onClick: m, onKeyup: m })), o2;
  }
  return () => {
    if (false === e.modelValue)
      return;
    const t2 = { class: c.value, style: l.value };
    return true === u.value && Object.assign(t2, d.value, { onClick: v, onKeyup: p2 }), hDir("div", t2, f(), "ripple", false !== e.ripple && true !== e.disable, () => [[Ripple, e.ripple]]);
  };
} });
const useCircularCommonProps = { ...useSizeProps, min: { type: Number, default: 0 }, max: { type: Number, default: 100 }, color: String, centerColor: String, trackColor: String, fontSize: String, rounded: Boolean, thickness: { type: Number, default: 0.2, validator: (e) => e >= 0 && e <= 1 }, angle: { type: Number, default: 0 }, showValue: Boolean, reverse: Boolean, instantFeedback: Boolean }, radius = 50, diameter = 2 * radius, circumference = diameter * Math.PI, strokeDashArray = Math.round(1e3 * circumference) / 1e3;
var QCircularProgress = createComponent({ name: "QCircularProgress", props: { ...useCircularCommonProps, value: { type: Number, default: 0 }, animationSpeed: { type: [String, Number], default: 600 }, indeterminate: Boolean }, setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useSize(e), a = computed(() => {
    const t2 = (true === o.lang.rtl ? -1 : 1) * e.angle;
    return { transform: e.reverse !== (true === o.lang.rtl) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - t2}deg)` : `rotate3d(0, 0, 1, ${t2 - 90}deg)` };
  }), l = computed(() => true !== e.instantFeedback && true !== e.indeterminate ? { transition: `stroke-dashoffset ${e.animationSpeed}ms ease 0s, stroke ${e.animationSpeed}ms ease` } : ""), i = computed(() => diameter / (1 - e.thickness / 2)), r = computed(() => `${i.value / 2} ${i.value / 2} ${i.value} ${i.value}`), s = computed(() => between(e.value, e.min, e.max)), u = computed(() => circumference * (1 - (s.value - e.min) / (e.max - e.min))), c = computed(() => e.thickness / 2 * i.value);
  function d({ thickness: e2, offset: t2, color: o2, cls: n2, rounded: a2 }) {
    return h("circle", { class: "q-circular-progress__" + n2 + (void 0 !== o2 ? ` text-${o2}` : ""), style: l.value, fill: "transparent", stroke: "currentColor", "stroke-width": e2, "stroke-dasharray": strokeDashArray, "stroke-dashoffset": t2, "stroke-linecap": a2, cx: i.value, cy: i.value, r: radius });
  }
  return () => {
    const o2 = [];
    void 0 !== e.centerColor && "transparent" !== e.centerColor && o2.push(h("circle", { class: `q-circular-progress__center text-${e.centerColor}`, fill: "currentColor", r: radius - c.value / 2, cx: i.value, cy: i.value })), void 0 !== e.trackColor && "transparent" !== e.trackColor && o2.push(d({ cls: "track", thickness: c.value, offset: 0, color: e.trackColor })), o2.push(d({ cls: "circle", thickness: c.value, offset: u.value, color: e.color, rounded: true === e.rounded ? "round" : void 0 }));
    const l2 = [h("svg", { class: "q-circular-progress__svg", style: a.value, viewBox: r.value, "aria-hidden": "true" }, o2)];
    return true === e.showValue && l2.push(h("div", { class: "q-circular-progress__text absolute-full row flex-center content-center", style: { fontSize: e.fontSize } }, void 0 !== t.default ? t.default() : [h("div", s.value)])), h("div", { class: `q-circular-progress q-circular-progress--${true === e.indeterminate ? "in" : ""}determinate`, style: n.value, role: "progressbar", "aria-valuemin": e.min, "aria-valuemax": e.max, "aria-valuenow": true === e.indeterminate ? void 0 : s.value }, hMergeSlotSafely(t.internal, l2));
  };
} });
function getChanges(e, t, o) {
  const n = position(e);
  let a, l = n.left - t.event.x, i = n.top - t.event.y, r = Math.abs(l), s = Math.abs(i);
  const u = t.direction;
  true === u.horizontal && true !== u.vertical ? a = l < 0 ? "left" : "right" : true !== u.horizontal && true === u.vertical ? a = i < 0 ? "up" : "down" : true === u.up && i < 0 ? (a = "up", r > s && (true === u.left && l < 0 ? a = "left" : true === u.right && l > 0 && (a = "right"))) : true === u.down && i > 0 ? (a = "down", r > s && (true === u.left && l < 0 ? a = "left" : true === u.right && l > 0 && (a = "right"))) : true === u.left && l < 0 ? (a = "left", r < s && (true === u.up && i < 0 ? a = "up" : true === u.down && i > 0 && (a = "down"))) : true === u.right && l > 0 && (a = "right", r < s && (true === u.up && i < 0 ? a = "up" : true === u.down && i > 0 && (a = "down")));
  let c = false;
  if (void 0 === a && false === o) {
    if (true === t.event.isFirst || void 0 === t.event.lastDir)
      return {};
    a = t.event.lastDir, c = true, "left" === a || "right" === a ? (n.left -= l, r = 0, l = 0) : (n.top -= i, s = 0, i = 0);
  }
  return { synthetic: c, payload: { evt: e, touch: true !== t.event.mouse, mouse: true === t.event.mouse, position: n, direction: a, isFirst: t.event.isFirst, isFinal: true === o, duration: Date.now() - t.event.time, distance: { x: r, y: s }, offset: { x: l, y: i }, delta: { x: n.left - t.event.lastX, y: n.top - t.event.lastY } } };
}
let uid$2 = 0;
var TouchPan = createDirective({ name: "touch-pan", beforeMount(e, { value: t, modifiers: o }) {
  if (true !== o.mouse && true !== client.has.touch)
    return;
  function n(e2, t2) {
    true === o.mouse && true === t2 ? stopAndPrevent(e2) : (true === o.stop && stop(e2), true === o.prevent && prevent(e2));
  }
  const a = { uid: "qvtp_" + uid$2++, handler: t, modifiers: o, direction: getModifierDirections(o), noop, mouseStart(e2) {
    shouldStart(e2, a) && leftClick(e2) && (addEvt(a, "temp", [[document, "mousemove", "move", "notPassiveCapture"], [document, "mouseup", "end", "passiveCapture"]]), a.start(e2, true));
  }, touchStart(e2) {
    if (shouldStart(e2, a)) {
      const t2 = e2.target;
      addEvt(a, "temp", [[t2, "touchmove", "move", "notPassiveCapture"], [t2, "touchcancel", "end", "passiveCapture"], [t2, "touchend", "end", "passiveCapture"]]), a.start(e2);
    }
  }, start(t2, n2) {
    if (true === client.is.firefox && preventDraggable(e, true), a.lastEvt = t2, true === n2 || true === o.stop) {
      if (true !== a.direction.all && (true !== n2 || true !== a.modifiers.mouseAllDir)) {
        const e2 = t2.type.indexOf("mouse") > -1 ? new MouseEvent(t2.type, t2) : new TouchEvent(t2.type, t2);
        true === t2.defaultPrevented && prevent(e2), true === t2.cancelBubble && stop(e2), Object.assign(e2, { qKeyEvent: t2.qKeyEvent, qClickOutside: t2.qClickOutside, qAnchorHandled: t2.qAnchorHandled, qClonedBy: void 0 === t2.qClonedBy ? [a.uid] : t2.qClonedBy.concat(a.uid) }), a.initialEvent = { target: t2.target, event: e2 };
      }
      stop(t2);
    }
    const { left: l, top: i } = position(t2);
    a.event = { x: l, y: i, time: Date.now(), mouse: true === n2, detected: false, isFirst: true, isFinal: false, lastX: l, lastY: i };
  }, move(e2) {
    if (void 0 === a.event)
      return;
    const t2 = position(e2), l = t2.left - a.event.x, i = t2.top - a.event.y;
    if (0 === l && 0 === i)
      return;
    a.lastEvt = e2;
    const r = true === a.event.mouse, s = () => {
      n(e2, r), true !== o.preserveCursor && (document.documentElement.style.cursor = "grabbing"), true === r && document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), clearSelection(), a.styleCleanup = (e3) => {
        if (a.styleCleanup = void 0, true !== o.preserveCursor && (document.documentElement.style.cursor = ""), document.body.classList.remove("non-selectable"), true === r) {
          const t3 = () => {
            document.body.classList.remove("no-pointer-events--children");
          };
          void 0 !== e3 ? setTimeout(() => {
            t3(), e3();
          }, 50) : t3();
        } else
          void 0 !== e3 && e3();
      };
    };
    if (true === a.event.detected) {
      true !== a.event.isFirst && n(e2, a.event.mouse);
      const { payload: t3, synthetic: o2 } = getChanges(e2, a, false);
      return void (void 0 !== t3 && (false === a.handler(t3) ? a.end(e2) : (void 0 === a.styleCleanup && true === a.event.isFirst && s(), a.event.lastX = t3.position.left, a.event.lastY = t3.position.top, a.event.lastDir = true === o2 ? void 0 : t3.direction, a.event.isFirst = false)));
    }
    if (true === a.direction.all || true === r && true === a.modifiers.mouseAllDir)
      return s(), a.event.detected = true, void a.move(e2);
    const u = Math.abs(l), c = Math.abs(i);
    u !== c && (true === a.direction.horizontal && u > c || true === a.direction.vertical && u < c || true === a.direction.up && u < c && i < 0 || true === a.direction.down && u < c && i > 0 || true === a.direction.left && u > c && l < 0 || true === a.direction.right && u > c && l > 0 ? (a.event.detected = true, a.move(e2)) : a.end(e2, true));
  }, end(t2, o2) {
    if (void 0 !== a.event) {
      if (cleanEvt(a, "temp"), true === client.is.firefox && preventDraggable(e, false), true === o2)
        void 0 !== a.styleCleanup && a.styleCleanup(), true !== a.event.detected && void 0 !== a.initialEvent && a.initialEvent.target.dispatchEvent(a.initialEvent.event);
      else if (true === a.event.detected) {
        true === a.event.isFirst && a.handler(getChanges(void 0 === t2 ? a.lastEvt : t2, a).payload);
        const { payload: e2 } = getChanges(void 0 === t2 ? a.lastEvt : t2, a, true), o3 = () => {
          a.handler(e2);
        };
        void 0 !== a.styleCleanup ? a.styleCleanup(o3) : o3();
      }
      a.event = void 0, a.initialEvent = void 0, a.lastEvt = void 0;
    }
  } };
  e.__qtouchpan = a, true === o.mouse && addEvt(a, "main", [[e, "mousedown", "mouseStart", `passive${true === o.mouseCapture ? "Capture" : ""}`]]), true === client.has.touch && addEvt(a, "main", [[e, "touchstart", "touchStart", `passive${true === o.capture ? "Capture" : ""}`], [e, "touchmove", "noop", "notPassiveCapture"]]);
}, updated(e, t) {
  const o = e.__qtouchpan;
  void 0 !== o && (t.oldValue !== t.value && ("function" !== typeof value && o.end(), o.handler = t.value), o.direction = getModifierDirections(t.modifiers));
}, beforeUnmount(e) {
  const t = e.__qtouchpan;
  void 0 !== t && (void 0 !== t.event && t.end(), cleanEvt(t, "main"), cleanEvt(t, "temp"), true === client.is.firefox && preventDraggable(e, false), void 0 !== t.styleCleanup && t.styleCleanup(), delete e.__qtouchpan);
} });
const markerPrefixClass = "q-slider__marker-labels", defaultMarkerConvertFn = (e) => ({ value: e }), defaultMarkerLabelRenderFn = ({ marker: e }) => h("div", { key: e.value, style: e.style, class: e.classes }, e.label), keyCodes$2 = [34, 37, 40, 33, 39, 38], useSliderProps = { ...useDarkProps, ...useFormProps, min: { type: Number, default: 0 }, max: { type: Number, default: 100 }, innerMin: Number, innerMax: Number, step: { type: Number, default: 1, validator: (e) => e >= 0 }, snap: Boolean, vertical: Boolean, reverse: Boolean, hideSelection: Boolean, color: String, markerLabelsClass: String, label: Boolean, labelColor: String, labelTextColor: String, labelAlways: Boolean, switchLabelSide: Boolean, markers: [Boolean, Number], markerLabels: [Boolean, Array, Object, Function], switchMarkerLabelsSide: Boolean, trackImg: String, trackColor: String, innerTrackImg: String, innerTrackColor: String, selectionColor: String, selectionImg: String, thumbSize: { type: String, default: "20px" }, trackSize: { type: String, default: "4px" }, disable: Boolean, readonly: Boolean, dense: Boolean, tabindex: [String, Number], thumbColor: String, thumbPath: { type: String, default: "M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0" } }, useSliderEmits = ["pan", "update:modelValue", "change"];
function useSlider({ updateValue: e, updatePosition: t, getDragging: o, formAttrs: n }) {
  const { props: a, emit: l, slots: i, proxy: { $q: r } } = getCurrentInstance(), s = useDark(a, r), u = useFormInject(n), c = ref(false), d = ref(false), p2 = ref(false), v = ref(false), m = computed(() => true === a.vertical ? "--v" : "--h"), f = computed(() => "-" + (true === a.switchLabelSide ? "switched" : "standard")), g = computed(() => true === a.vertical ? true === a.reverse : a.reverse !== (true === r.lang.rtl)), b = computed(() => true === isNaN(a.innerMin) || a.innerMin < a.min ? a.min : a.innerMin), y = computed(() => true === isNaN(a.innerMax) || a.innerMax > a.max ? a.max : a.innerMax), S = computed(() => true !== a.disable && true !== a.readonly && b.value < y.value), w = computed(() => (String(a.step).trim().split(".")[1] || "").length), C = computed(() => 0 === a.step ? 1 : a.step), x = computed(() => true === S.value ? a.tabindex || 0 : -1), k = computed(() => a.max - a.min), _ = computed(() => y.value - b.value), q = computed(() => W(b.value)), T = computed(() => W(y.value)), P = computed(() => true === a.vertical ? true === g.value ? "bottom" : "top" : true === g.value ? "right" : "left"), $ = computed(() => true === a.vertical ? "height" : "width"), M = computed(() => true === a.vertical ? "width" : "height"), B = computed(() => true === a.vertical ? "vertical" : "horizontal"), Q = computed(() => {
    const e2 = { role: "slider", "aria-valuemin": b.value, "aria-valuemax": y.value, "aria-orientation": B.value, "data-step": a.step };
    return true === a.disable ? e2["aria-disabled"] = "true" : true === a.readonly && (e2["aria-readonly"] = "true"), e2;
  }), E = computed(() => `q-slider q-slider${m.value} q-slider--${true === c.value ? "" : "in"}active inline no-wrap ` + (true === a.vertical ? "row" : "column") + (true === a.disable ? " disabled" : " q-slider--enabled" + (true === S.value ? " q-slider--editable" : "")) + ("both" === p2.value ? " q-slider--focus" : "") + (a.label || true === a.labelAlways ? " q-slider--label" : "") + (true === a.labelAlways ? " q-slider--label-always" : "") + (true === s.value ? " q-slider--dark" : "") + (true === a.dense ? " q-slider--dense q-slider--dense" + m.value : ""));
  function O(e2) {
    const t2 = "q-slider__" + e2;
    return `${t2} ${t2}${m.value} ${t2}${m.value}${f.value}`;
  }
  function A(e2) {
    const t2 = "q-slider__" + e2;
    return `${t2} ${t2}${m.value}`;
  }
  const L = computed(() => {
    const e2 = a.selectionColor || a.color;
    return "q-slider__selection absolute" + (void 0 !== e2 ? ` text-${e2}` : "");
  }), R = computed(() => A("markers") + " absolute overflow-hidden"), D = computed(() => A("track-container")), z = computed(() => O("pin")), F = computed(() => O("label")), I = computed(() => O("text-container")), V = computed(() => O("marker-labels-container") + (void 0 !== a.markerLabelsClass ? ` ${a.markerLabelsClass}` : "")), N = computed(() => "q-slider__track relative-position no-outline" + (void 0 !== a.trackColor ? ` bg-${a.trackColor}` : "")), H = computed(() => {
    const e2 = { [M.value]: a.trackSize };
    return void 0 !== a.trackImg && (e2.backgroundImage = `url(${a.trackImg}) !important`), e2;
  }), j = computed(() => "q-slider__inner absolute" + (void 0 !== a.innerTrackColor ? ` bg-${a.innerTrackColor}` : "")), U = computed(() => {
    const e2 = { [P.value]: `${100 * q.value}%`, [$.value]: `${100 * (T.value - q.value)}%` };
    return void 0 !== a.innerTrackImg && (e2.backgroundImage = `url(${a.innerTrackImg}) !important`), e2;
  });
  function K(e2) {
    const { min: t2, max: o2, step: n2 } = a;
    let l2 = t2 + e2 * (o2 - t2);
    if (n2 > 0) {
      const e3 = (l2 - t2) % n2;
      l2 += (Math.abs(e3) >= n2 / 2 ? (e3 < 0 ? -1 : 1) * n2 : 0) - e3;
    }
    return w.value > 0 && (l2 = parseFloat(l2.toFixed(w.value))), between(l2, b.value, y.value);
  }
  function W(e2) {
    return 0 === k.value ? 0 : (e2 - a.min) / k.value;
  }
  function Y(e2, t2) {
    const o2 = position(e2), n2 = true === a.vertical ? between((o2.top - t2.top) / t2.height, 0, 1) : between((o2.left - t2.left) / t2.width, 0, 1);
    return between(true === g.value ? 1 - n2 : n2, q.value, T.value);
  }
  const G = computed(() => true === isNumber(a.markers) ? a.markers : C.value), X = computed(() => {
    const e2 = [], t2 = G.value, o2 = a.max;
    let n2 = a.min;
    do {
      e2.push(n2), n2 += t2;
    } while (n2 < o2);
    return e2.push(o2), e2;
  }), Z = computed(() => {
    const e2 = ` ${markerPrefixClass}${m.value}-`;
    return markerPrefixClass + `${e2}${true === a.switchMarkerLabelsSide ? "switched" : "standard"}${e2}${true === g.value ? "rtl" : "ltr"}`;
  }), J = computed(() => {
    return false === a.markerLabels ? null : oe(a.markerLabels).map((e2, t2) => ({ index: t2, value: e2.value, label: e2.label || e2.value, classes: Z.value + (void 0 !== e2.classes ? " " + e2.classes : ""), style: { ...ne(e2.value), ...e2.style || {} } }));
  }), ee = computed(() => ({ markerList: J.value, markerMap: ae.value, classes: Z.value, getStyle: ne })), te = computed(() => {
    if (0 !== _.value) {
      const e2 = 100 * G.value / _.value;
      return { ...U.value, backgroundSize: true === a.vertical ? `2px ${e2}%` : `${e2}% 2px` };
    }
    return null;
  });
  function oe(e2) {
    if (false === e2)
      return null;
    if (true === e2)
      return X.value.map(defaultMarkerConvertFn);
    if ("function" === typeof e2)
      return X.value.map((t3) => {
        const o2 = e2(t3);
        return true === isObject(o2) ? { ...o2, value: t3 } : { value: t3, label: o2 };
      });
    const t2 = ({ value: e3 }) => e3 >= a.min && e3 <= a.max;
    return true === Array.isArray(e2) ? e2.map((e3) => true === isObject(e3) ? e3 : { value: e3 }).filter(t2) : Object.keys(e2).map((t3) => {
      const o2 = e2[t3], n2 = Number(t3);
      return true === isObject(o2) ? { ...o2, value: n2 } : { value: n2, label: o2 };
    }).filter(t2);
  }
  function ne(e2) {
    return { [P.value]: `${100 * (e2 - a.min) / k.value}%` };
  }
  const ae = computed(() => {
    if (false === a.markerLabels)
      return null;
    const e2 = {};
    return J.value.forEach((t2) => {
      e2[t2.value] = t2;
    }), e2;
  });
  function le() {
    if (void 0 !== i["marker-label-group"])
      return i["marker-label-group"](ee.value);
    const e2 = i["marker-label"] || defaultMarkerLabelRenderFn;
    return J.value.map((t2) => e2({ marker: t2, ...ee.value }));
  }
  const ie = computed(() => {
    return [[TouchPan, re, void 0, { [B.value]: true, prevent: true, stop: true, mouse: true, mouseAllDir: true }]];
  });
  function re(n2) {
    true === n2.isFinal ? (void 0 !== v.value && (t(n2.evt), true === n2.touch && e(true), v.value = void 0, l("pan", "end")), c.value = false, p2.value = false) : true === n2.isFirst ? (v.value = o(n2.evt), t(n2.evt), e(), c.value = true, l("pan", "start")) : (t(n2.evt), e());
  }
  function se() {
    p2.value = false;
  }
  function ue(n2) {
    t(n2, o(n2)), e(), d.value = true, c.value = true, document.addEventListener("mouseup", ce, true);
  }
  function ce() {
    d.value = false, c.value = false, e(true), se(), document.removeEventListener("mouseup", ce, true);
  }
  function de(n2) {
    t(n2, o(n2)), e(true);
  }
  function pe(t2) {
    keyCodes$2.includes(t2.keyCode) && e(true);
  }
  function ve(e2) {
    if (true === a.vertical)
      return null;
    const t2 = r.lang.rtl !== a.reverse ? 1 - e2 : e2;
    return { transform: `translateX(calc(${2 * t2 - 1} * ${a.thumbSize} / 2 + ${50 - 100 * t2}%))` };
  }
  function me(e2) {
    const t2 = computed(() => false !== d.value || p2.value !== e2.focusValue && "both" !== p2.value ? "" : " q-slider--focus"), o2 = computed(() => `q-slider__thumb q-slider__thumb${m.value} q-slider__thumb${m.value}-${true === g.value ? "rtl" : "ltr"} absolute non-selectable` + t2.value + (void 0 !== e2.thumbColor.value ? ` text-${e2.thumbColor.value}` : "")), n2 = computed(() => ({ width: a.thumbSize, height: a.thumbSize, [P.value]: `${100 * e2.ratio.value}%`, zIndex: p2.value === e2.focusValue ? 2 : void 0 })), l2 = computed(() => void 0 !== e2.labelColor.value ? ` text-${e2.labelColor.value}` : ""), i2 = computed(() => ve(e2.ratio.value)), r2 = computed(() => "q-slider__text" + (void 0 !== e2.labelTextColor.value ? ` text-${e2.labelTextColor.value}` : ""));
    return () => {
      const t3 = [h("svg", { class: "q-slider__thumb-shape absolute-full", viewBox: "0 0 20 20", "aria-hidden": "true" }, [h("path", { d: a.thumbPath })]), h("div", { class: "q-slider__focus-ring fit" })];
      return true !== a.label && true !== a.labelAlways || (t3.push(h("div", { class: z.value + " absolute fit no-pointer-events" + l2.value }, [h("div", { class: F.value, style: { minWidth: a.thumbSize } }, [h("div", { class: I.value, style: i2.value }, [h("span", { class: r2.value }, e2.label.value)])])])), void 0 !== a.name && true !== a.disable && u(t3, "push")), h("div", { class: o2.value, style: n2.value, ...e2.getNodeData() }, t3);
    };
  }
  function fe(e2, t2, o2, n2) {
    const l2 = [];
    "transparent" !== a.innerTrackColor && l2.push(h("div", { key: "inner", class: j.value, style: U.value })), "transparent" !== a.selectionColor && l2.push(h("div", { key: "selection", class: L.value, style: e2.value })), false !== a.markers && l2.push(h("div", { key: "marker", class: R.value, style: te.value })), n2(l2);
    const i2 = [hDir("div", { key: "trackC", class: D.value, tabindex: t2.value, ...o2.value }, [h("div", { class: N.value, style: H.value }, l2)], "slide", S.value, () => ie.value)];
    if (false !== a.markerLabels) {
      const e3 = true === a.switchMarkerLabelsSide ? "unshift" : "push";
      i2[e3](h("div", { key: "markerL", class: V.value }, le()));
    }
    return i2;
  }
  return onBeforeUnmount(() => {
    document.removeEventListener("mouseup", ce, true);
  }), { state: { active: c, focus: p2, preventFocus: d, dragging: v, editable: S, classes: E, tabindex: x, attributes: Q, step: C, decimals: w, trackLen: k, innerMin: b, innerMinRatio: q, innerMax: y, innerMaxRatio: T, positionProp: P, sizeProp: $, isReversed: g }, methods: { onActivate: ue, onMobileClick: de, onBlur: se, onKeyup: pe, getContent: fe, getThumbRenderFn: me, convertRatioToModel: K, convertModelToRatio: W, getDraggingRatio: Y } };
}
const getNodeData = () => ({});
var QSlider = createComponent({ name: "QSlider", props: { ...useSliderProps, modelValue: { required: true, default: null, validator: (e) => "number" === typeof e || null === e }, labelValue: [String, Number] }, emits: useSliderEmits, setup(e, { emit: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), { state: n, methods: a } = useSlider({ updateValue: m, updatePosition: g, getDragging: f, formAttrs: useFormAttrs(e) }), l = ref(null), i = ref(0), r = ref(0);
  function s() {
    r.value = null === e.modelValue ? n.innerMin.value : between(e.modelValue, n.innerMin.value, n.innerMax.value);
  }
  watch(() => `${e.modelValue}|${n.innerMin.value}|${n.innerMax.value}`, s), s();
  const u = computed(() => a.convertModelToRatio(r.value)), c = computed(() => true === n.active.value ? i.value : u.value), d = computed(() => {
    const t2 = { [n.positionProp.value]: `${100 * n.innerMinRatio.value}%`, [n.sizeProp.value]: `${100 * (c.value - n.innerMinRatio.value)}%` };
    return void 0 !== e.selectionImg && (t2.backgroundImage = `url(${e.selectionImg}) !important`), t2;
  }), p2 = a.getThumbRenderFn({ focusValue: true, getNodeData, ratio: c, label: computed(() => void 0 !== e.labelValue ? e.labelValue : r.value), thumbColor: computed(() => e.thumbColor || e.color), labelColor: computed(() => e.labelColor), labelTextColor: computed(() => e.labelTextColor) }), v = computed(() => {
    return true !== n.editable.value ? {} : true === o.platform.is.mobile ? { onClick: a.onMobileClick } : { onMousedown: a.onActivate, onFocus: b, onBlur: a.onBlur, onKeydown: y, onKeyup: a.onKeyup };
  });
  function m(o2) {
    r.value !== e.modelValue && t("update:modelValue", r.value), true === o2 && t("change", r.value);
  }
  function f() {
    return l.value.getBoundingClientRect();
  }
  function g(t2, o2 = n.dragging.value) {
    const l2 = a.getDraggingRatio(t2, o2);
    r.value = a.convertRatioToModel(l2), i.value = true !== e.snap || 0 === e.step ? l2 : a.convertModelToRatio(r.value);
  }
  function b() {
    n.focus.value = true;
  }
  function y(t2) {
    if (!keyCodes$2.includes(t2.keyCode))
      return;
    stopAndPrevent(t2);
    const o2 = ([34, 33].includes(t2.keyCode) ? 10 : 1) * n.step.value, a2 = ([34, 37, 40].includes(t2.keyCode) ? -1 : 1) * (true === n.isReversed.value ? -1 : 1) * (true === e.vertical ? -1 : 1) * o2;
    r.value = between(parseFloat((r.value + a2).toFixed(n.decimals.value)), n.innerMin.value, n.innerMax.value), m();
  }
  return () => {
    const t2 = a.getContent(d, n.tabindex, v, (e2) => {
      e2.push(p2());
    });
    return h("div", { ref: l, class: n.classes.value + (null === e.modelValue ? " q-slider--no-value" : ""), ...n.attributes.value, "aria-valuenow": e.modelValue }, t2);
  };
} });
function useCanRender() {
  const e = ref(!isRuntimeSsrPreHydration.value);
  return false === e.value && onMounted(() => {
    e.value = true;
  }), e;
}
const hasObserver = "undefined" !== typeof ResizeObserver, resizeProps = true === hasObserver ? {} : { style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;", url: "about:blank" };
var QResizeObserver = createComponent({ name: "QResizeObserver", props: { debounce: { type: [String, Number], default: 100 } }, emits: ["resize"], setup(e, { emit: t }) {
  let o, n = null, a = { width: -1, height: -1 };
  function l(t2) {
    true === t2 || 0 === e.debounce || "0" === e.debounce ? i() : null === n && (n = setTimeout(i, e.debounce));
  }
  function i() {
    if (clearTimeout(n), n = null, o) {
      const { offsetWidth: e2, offsetHeight: n2 } = o;
      e2 === a.width && n2 === a.height || (a = { width: e2, height: n2 }, t("resize", a));
    }
  }
  const { proxy: r } = getCurrentInstance();
  if (true === hasObserver) {
    let e2;
    return onMounted(() => {
      nextTick(() => {
        o = r.$el.parentNode, o && (e2 = new ResizeObserver(l), e2.observe(o), i());
      });
    }), onBeforeUnmount(() => {
      clearTimeout(n), void 0 !== e2 && (void 0 !== e2.disconnect ? e2.disconnect() : o && e2.unobserve(o));
    }), noop;
  }
  {
    let s = function() {
      clearTimeout(n), void 0 !== t2 && (void 0 !== t2.removeEventListener && t2.removeEventListener("resize", l, listenOpts.passive), t2 = void 0);
    }, u = function() {
      s(), o && o.contentDocument && (t2 = o.contentDocument.defaultView, t2.addEventListener("resize", l, listenOpts.passive), i());
    };
    const e2 = useCanRender();
    let t2;
    return onMounted(() => {
      nextTick(() => {
        o = r.$el, o && u();
      });
    }), onBeforeUnmount(s), r.trigger = l, () => {
      if (true === e2.value)
        return h("object", { style: resizeProps.style, tabindex: -1, type: "text/html", data: resizeProps.url, "aria-hidden": "true", onLoad: u });
    };
  }
} });
let rtlHasScrollBug = false;
{
  const e = document.createElement("div");
  e.setAttribute("dir", "rtl"), Object.assign(e.style, { width: "1px", height: "1px", overflow: "auto" });
  const t = document.createElement("div");
  Object.assign(t.style, { width: "1000px", height: "1px" }), document.body.appendChild(e), e.appendChild(t), e.scrollLeft = -1e3, rtlHasScrollBug = e.scrollLeft >= 0, e.remove();
}
function getIndicatorClass(e, t, o) {
  const n = true === o ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${true === t ? n[0] : n[1]}${e ? ` text-${e}` : ""}`;
}
const alignValues$1 = ["left", "center", "right", "justify"];
var QTabs = createComponent({ name: "QTabs", props: { modelValue: [Number, String], align: { type: String, default: "center", validator: (e) => alignValues$1.includes(e) }, breakpoint: { type: [String, Number], default: 600 }, vertical: Boolean, shrink: Boolean, stretch: Boolean, activeClass: String, activeColor: String, activeBgColor: String, indicatorColor: String, leftIcon: String, rightIcon: String, outsideArrows: Boolean, mobileArrows: Boolean, switchIndicator: Boolean, narrowIndicator: Boolean, inlineLabel: Boolean, noCaps: Boolean, dense: Boolean, contentClass: String, "onUpdate:modelValue": [Function, Array] }, setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, { registerTick: l } = useTick(), { registerTick: i } = useTick(), { registerTick: r } = useTick(), { registerTimeout: s, removeTimeout: u } = useTimeout(), { registerTimeout: c, removeTimeout: d } = useTimeout(), p2 = ref(null), v = ref(null), m = ref(e.modelValue), f = ref(false), g = ref(true), b = ref(false), y = ref(false), S = computed(() => true === a.platform.is.desktop || true === e.mobileArrows), w = [], C = ref(0), x = ref(false);
  let k, _, q, T = true === S.value ? I : noop;
  const P = computed(() => ({ activeClass: e.activeClass, activeColor: e.activeColor, activeBgColor: e.activeBgColor, indicatorClass: getIndicatorClass(e.indicatorColor, e.switchIndicator, e.vertical), narrowIndicator: e.narrowIndicator, inlineLabel: e.inlineLabel, noCaps: e.noCaps })), $ = computed(() => {
    const e2 = C.value, t2 = m.value;
    for (let o2 = 0; o2 < e2; o2++)
      if (w[o2].name.value === t2)
        return true;
    return false;
  }), M = computed(() => {
    const t2 = true === f.value ? "left" : true === y.value ? "justify" : e.align;
    return `q-tabs__content--align-${t2}`;
  }), B = computed(() => `q-tabs row no-wrap items-center q-tabs--${true === f.value ? "" : "not-"}scrollable q-tabs--${true === e.vertical ? "vertical" : "horizontal"} q-tabs__arrows--${true === S.value && true === e.outsideArrows ? "outside" : "inside"}` + (true === e.dense ? " q-tabs--dense" : "") + (true === e.shrink ? " col-shrink" : "") + (true === e.stretch ? " self-stretch" : "")), Q = computed(() => "q-tabs__content row no-wrap items-center self-stretch hide-scrollbar relative-position " + M.value + (void 0 !== e.contentClass ? ` ${e.contentClass}` : "") + (true === a.platform.is.mobile ? " scroll" : "")), E = computed(() => true === e.vertical ? { container: "height", content: "offsetHeight", scroll: "scrollHeight" } : { container: "width", content: "offsetWidth", scroll: "scrollWidth" }), O = computed(() => true !== e.vertical && true === a.lang.rtl), A = computed(() => false === rtlHasScrollBug && true === O.value);
  function L({ name: t2, setCurrent: n2, skipEmit: a2, fromRoute: l2 }) {
    m.value !== t2 && (true !== a2 && void 0 !== e["onUpdate:modelValue"] && o("update:modelValue", t2), true !== n2 && void 0 !== e["onUpdate:modelValue"] || (z(m.value, t2), m.value = t2));
  }
  function R() {
    l(() => {
      D({ width: p2.value.offsetWidth, height: p2.value.offsetHeight });
    });
  }
  function D(t2) {
    if (void 0 === E.value || null === v.value)
      return;
    const o2 = t2[E.value.container], n2 = Math.min(v.value[E.value.scroll], Array.prototype.reduce.call(v.value.children, (e2, t3) => e2 + (t3[E.value.content] || 0), 0)), a2 = o2 > 0 && n2 > o2;
    f.value = a2, true === a2 && i(T), y.value = o2 < parseInt(e.breakpoint, 10);
  }
  function z(t2, o2) {
    const n2 = void 0 !== t2 && null !== t2 && "" !== t2 ? w.find((e2) => e2.name.value === t2) : null, a2 = void 0 !== o2 && null !== o2 && "" !== o2 ? w.find((e2) => e2.name.value === o2) : null;
    if (n2 && a2) {
      const t3 = n2.tabIndicatorRef.value, o3 = a2.tabIndicatorRef.value;
      clearTimeout(k), t3.style.transition = "none", t3.style.transform = "none", o3.style.transition = "none", o3.style.transform = "none";
      const l2 = t3.getBoundingClientRect(), i2 = o3.getBoundingClientRect();
      o3.style.transform = true === e.vertical ? `translate3d(0,${l2.top - i2.top}px,0) scale3d(1,${i2.height ? l2.height / i2.height : 1},1)` : `translate3d(${l2.left - i2.left}px,0,0) scale3d(${i2.width ? l2.width / i2.width : 1},1,1)`, r(() => {
        k = setTimeout(() => {
          o3.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)", o3.style.transform = "none";
        }, 70);
      });
    }
    a2 && true === f.value && F(a2.rootRef.value);
  }
  function F(t2) {
    const { left: o2, width: n2, top: a2, height: l2 } = v.value.getBoundingClientRect(), i2 = t2.getBoundingClientRect();
    let r2 = true === e.vertical ? i2.top - a2 : i2.left - o2;
    if (r2 < 0)
      return v.value[true === e.vertical ? "scrollTop" : "scrollLeft"] += Math.floor(r2), void T();
    r2 += true === e.vertical ? i2.height - l2 : i2.width - n2, r2 > 0 && (v.value[true === e.vertical ? "scrollTop" : "scrollLeft"] += Math.ceil(r2), T());
  }
  function I() {
    const t2 = v.value;
    if (null !== t2) {
      const o2 = t2.getBoundingClientRect(), n2 = true === e.vertical ? t2.scrollTop : Math.abs(t2.scrollLeft);
      true === O.value ? (g.value = Math.ceil(n2 + o2.width) < t2.scrollWidth - 1, b.value = n2 > 0) : (g.value = n2 > 0, b.value = true === e.vertical ? Math.ceil(n2 + o2.height) < t2.scrollHeight : Math.ceil(n2 + o2.width) < t2.scrollWidth);
    }
  }
  function V(e2) {
    j(), _ = setInterval(() => {
      true === W(e2) && j();
    }, 5);
  }
  function N() {
    V(true === A.value ? Number.MAX_SAFE_INTEGER : 0);
  }
  function H() {
    V(true === A.value ? 0 : Number.MAX_SAFE_INTEGER);
  }
  function j() {
    clearInterval(_);
  }
  function U(t2, o2) {
    const n2 = Array.prototype.filter.call(v.value.children, (e2) => e2 === o2 || e2.matches && true === e2.matches(".q-tab.q-focusable")), a2 = n2.length;
    if (0 === a2)
      return;
    if (36 === t2)
      return F(n2[0]), n2[0].focus(), true;
    if (35 === t2)
      return F(n2[a2 - 1]), n2[a2 - 1].focus(), true;
    const l2 = t2 === (true === e.vertical ? 38 : 37), i2 = t2 === (true === e.vertical ? 40 : 39), r2 = true === l2 ? -1 : true === i2 ? 1 : void 0;
    if (void 0 !== r2) {
      const e2 = true === O.value ? -1 : 1, t3 = n2.indexOf(o2) + r2 * e2;
      return t3 >= 0 && t3 < a2 && (F(n2[t3]), n2[t3].focus({ preventScroll: true })), true;
    }
  }
  watch(O, T), watch(() => e.modelValue, (e2) => {
    L({ name: e2, setCurrent: true, skipEmit: true });
  }), watch(() => e.outsideArrows, () => {
    R();
  }), watch(S, (e2) => {
    T = true === e2 ? I : noop, R();
  });
  const K = computed(() => true === A.value ? { get: (e2) => Math.abs(e2.scrollLeft), set: (e2, t2) => {
    e2.scrollLeft = -t2;
  } } : true === e.vertical ? { get: (e2) => e2.scrollTop, set: (e2, t2) => {
    e2.scrollTop = t2;
  } } : { get: (e2) => e2.scrollLeft, set: (e2, t2) => {
    e2.scrollLeft = t2;
  } });
  function W(e2) {
    const t2 = v.value, { get: o2, set: n2 } = K.value;
    let a2 = false, l2 = o2(t2);
    const i2 = e2 < l2 ? -1 : 1;
    return l2 += 5 * i2, l2 < 0 ? (a2 = true, l2 = 0) : (-1 === i2 && l2 <= e2 || 1 === i2 && l2 >= e2) && (a2 = true, l2 = e2), n2(t2, l2), T(), a2;
  }
  function Y(e2, t2) {
    for (const o2 in e2)
      if (e2[o2] !== t2[o2])
        return false;
    return true;
  }
  function G() {
    let e2 = null, t2 = { matchedLen: 0, queryDiff: 9999, hrefLen: 0 };
    const o2 = w.filter((e3) => void 0 !== e3.routeData && true === e3.routeData.hasRouterLink.value), { hash: a2, query: l2 } = n.$route, i2 = Object.keys(l2).length;
    for (const n2 of o2) {
      const o3 = true === n2.routeData.exact.value;
      if (true !== n2.routeData[true === o3 ? "linkIsExactActive" : "linkIsActive"].value)
        continue;
      const { hash: r2, query: s2, matched: u2, href: c2 } = n2.routeData.resolvedLink.value, d2 = Object.keys(s2).length;
      if (true === o3) {
        if (r2 !== a2)
          continue;
        if (d2 !== i2 || false === Y(l2, s2))
          continue;
        e2 = n2.name.value;
        break;
      }
      if ("" !== r2 && r2 !== a2)
        continue;
      if (0 !== d2 && false === Y(s2, l2))
        continue;
      const p3 = { matchedLen: u2.length, queryDiff: i2 - d2, hrefLen: c2.length - r2.length };
      if (p3.matchedLen > t2.matchedLen)
        e2 = n2.name.value, t2 = p3;
      else if (p3.matchedLen === t2.matchedLen) {
        if (p3.queryDiff < t2.queryDiff)
          e2 = n2.name.value, t2 = p3;
        else if (p3.queryDiff !== t2.queryDiff)
          continue;
        p3.hrefLen > t2.hrefLen && (e2 = n2.name.value, t2 = p3);
      }
    }
    null === e2 && true === w.some((e3) => void 0 === e3.routeData && e3.name.value === m.value) || L({ name: e2, setCurrent: true });
  }
  function X(e2) {
    if (u(), true !== x.value && null !== p2.value && e2.target && "function" === typeof e2.target.closest) {
      const t2 = e2.target.closest(".q-tab");
      t2 && true === p2.value.contains(t2) && (x.value = true, true === f.value && F(t2));
    }
  }
  function Z() {
    s(() => {
      x.value = false;
    }, 30);
  }
  function J() {
    false === ne.avoidRouteWatcher ? c(G) : d();
  }
  function ee() {
    if (void 0 === q) {
      const e2 = watch(() => n.$route.fullPath, J);
      q = () => {
        e2(), q = void 0;
      };
    }
  }
  function te(e2) {
    w.push(e2), C.value++, R(), void 0 === e2.routeData ? c(() => {
      if (true === f.value) {
        const e3 = m.value, t2 = void 0 !== e3 && null !== e3 && "" !== e3 ? w.find((t3) => t3.name.value === e3) : null;
        t2 && F(t2.rootRef.value);
      }
    }) : (ee(), true === e2.routeData.hasRouterLink.value && J());
  }
  function oe(e2) {
    w.splice(w.indexOf(e2), 1), C.value--, R(), void 0 !== q && void 0 !== e2.routeData && (true === w.every((e3) => void 0 === e3.routeData) && q(), J());
  }
  const ne = { currentModel: m, tabProps: P, hasFocus: x, hasActiveTab: $, registerTab: te, unregisterTab: oe, verifyRouteModel: J, updateModel: L, onKbdNavigate: U, avoidRouteWatcher: false };
  function ae() {
    clearTimeout(k), j(), void 0 !== q && q();
  }
  let le;
  return provide(tabsKey, ne), onBeforeUnmount(ae), onDeactivated(() => {
    le = void 0 !== q, ae();
  }), onActivated(() => {
    true === le && ee(), R();
  }), () => {
    const o2 = [h(QResizeObserver, { onResize: D }), h("div", { ref: v, class: Q.value, onScroll: T }, hSlot(t.default))];
    return true === S.value && o2.push(h(QIcon, { class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (true === g.value ? "" : " q-tabs__arrow--faded"), name: e.leftIcon || a.iconSet.tabs[true === e.vertical ? "up" : "left"], onMousedownPassive: N, onTouchstartPassive: N, onMouseupPassive: j, onMouseleavePassive: j, onTouchendPassive: j }), h(QIcon, { class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (true === b.value ? "" : " q-tabs__arrow--faded"), name: e.rightIcon || a.iconSet.tabs[true === e.vertical ? "down" : "right"], onMousedownPassive: H, onTouchstartPassive: H, onMouseupPassive: j, onMouseleavePassive: j, onTouchendPassive: j })), h("div", { ref: p2, class: B.value, role: "tablist", onFocusin: X, onFocusout: Z }, o2);
  };
} });
let id$1 = 0;
const useTabEmits = ["click", "keydown"], useTabProps = { icon: String, label: [Number, String], alert: [Boolean, String], alertIcon: String, name: { type: [Number, String], default: () => `t_${id$1++}` }, noCaps: Boolean, tabindex: [String, Number], disable: Boolean, contentClass: String, ripple: { type: [Boolean, Object], default: true } };
function useTab(e, t, o, n) {
  const a = inject(tabsKey, () => {
    console.error("QTab/QRouteTab component needs to be child of QTabs");
  }), { proxy: l } = getCurrentInstance(), i = ref(null), r = ref(null), s = ref(null), u = computed(() => true !== e.disable && false !== e.ripple && Object.assign({ keyCodes: [13, 32], early: true }, true === e.ripple ? {} : e.ripple)), c = computed(() => a.currentModel.value === e.name), d = computed(() => "q-tab relative-position self-stretch flex flex-center text-center" + (true === c.value ? " q-tab--active" + (a.tabProps.value.activeClass ? " " + a.tabProps.value.activeClass : "") + (a.tabProps.value.activeColor ? ` text-${a.tabProps.value.activeColor}` : "") + (a.tabProps.value.activeBgColor ? ` bg-${a.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (e.icon && e.label && false === a.tabProps.value.inlineLabel ? " q-tab--full" : "") + (true === e.noCaps || true === a.tabProps.value.noCaps ? " q-tab--no-caps" : "") + (true === e.disable ? " disabled" : " q-focusable q-hoverable cursor-pointer") + (void 0 !== n ? n.linkClass.value : "")), p2 = computed(() => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + (true === a.tabProps.value.inlineLabel ? "row no-wrap q-tab__content--inline" : "column") + (void 0 !== e.contentClass ? ` ${e.contentClass}` : "")), v = computed(() => true === e.disable || true === a.hasFocus.value || false === c.value && true === a.hasActiveTab.value ? -1 : e.tabindex || 0);
  function m(t2, l2) {
    if (true !== l2 && null !== i.value && i.value.focus(), true !== e.disable) {
      if (void 0 === n)
        return a.updateModel({ name: e.name }), void o("click", t2);
      if (true === n.hasRouterLink.value) {
        const l3 = (o2 = {}) => {
          let l4;
          const i2 = void 0 === o2.to || true === isDeepEqual(o2.to, e.to) ? a.avoidRouteWatcher = uid$3() : null;
          return n.navigateToRouterLink(t2, { ...o2, returnRouterError: true }).catch((e2) => {
            l4 = e2;
          }).then((t3) => {
            if (i2 === a.avoidRouteWatcher && (a.avoidRouteWatcher = false, void 0 !== l4 || void 0 !== t3 && true !== t3.message.startsWith("Avoided redundant navigation") || a.updateModel({ name: e.name })), true === o2.returnRouterError)
              return void 0 !== l4 ? Promise.reject(l4) : t3;
          });
        };
        return o("click", t2, l3), void (true !== t2.defaultPrevented && l3());
      }
      o("click", t2);
    } else
      void 0 !== n && true === n.hasRouterLink.value && stopAndPrevent(t2);
  }
  function f(e2) {
    isKeyCode(e2, [13, 32]) ? m(e2, true) : true !== shouldIgnoreKey(e2) && e2.keyCode >= 35 && e2.keyCode <= 40 && true !== e2.altKey && true !== e2.metaKey && true === a.onKbdNavigate(e2.keyCode, l.$el) && stopAndPrevent(e2), o("keydown", e2);
  }
  function g() {
    const o2 = a.tabProps.value.narrowIndicator, n2 = [], l2 = h("div", { ref: s, class: ["q-tab__indicator", a.tabProps.value.indicatorClass] });
    void 0 !== e.icon && n2.push(h(QIcon, { class: "q-tab__icon", name: e.icon })), void 0 !== e.label && n2.push(h("div", { class: "q-tab__label" }, e.label)), false !== e.alert && n2.push(void 0 !== e.alertIcon ? h(QIcon, { class: "q-tab__alert-icon", color: true !== e.alert ? e.alert : void 0, name: e.alertIcon }) : h("div", { class: "q-tab__alert" + (true !== e.alert ? ` text-${e.alert}` : "") })), true === o2 && n2.push(l2);
    const r2 = [h("div", { class: "q-focus-helper", tabindex: -1, ref: i }), h("div", { class: p2.value }, hMergeSlot(t.default, n2))];
    return false === o2 && r2.push(l2), r2;
  }
  const b = { name: computed(() => e.name), rootRef: r, tabIndicatorRef: s, routeData: n };
  function y(t2, o2) {
    const n2 = { ref: r, class: d.value, tabindex: v.value, role: "tab", "aria-selected": true === c.value ? "true" : "false", "aria-disabled": true === e.disable ? "true" : void 0, onClick: m, onKeydown: f, ...o2 };
    return withDirectives(h(t2, n2, g()), [[Ripple, u.value]]);
  }
  return onBeforeUnmount(() => {
    a.unregisterTab(b);
  }), onMounted(() => {
    a.registerTab(b);
  }), { renderTab: y, $tabs: a };
}
var QTab = createComponent({ name: "QTab", props: useTabProps, emits: useTabEmits, setup(e, { slots: t, emit: o }) {
  const { renderTab: n } = useTab(e, t, o);
  return () => n("div");
} }), QTabPanels = createComponent({ name: "QTabPanels", props: { ...usePanelProps, ...useDarkProps }, emits: usePanelEmits, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark(e, o.proxy.$q), { updatePanelsList: a, getPanelContent: l, panelDirectives: i } = usePanel(), r = computed(() => "q-tab-panels q-panel-parent" + (true === n.value ? " q-tab-panels--dark q-dark" : ""));
  return () => {
    return a(t), hDir("div", { class: r.value }, l(), "pan", e.swipeable, () => i.value);
  };
} }), QTabPanel = createComponent({ name: "QTabPanel", props: usePanelChildProps, setup(e, { slots: t }) {
  return () => h("div", { class: "q-tab-panel" }, hSlot(t.default));
} });
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/, testPattern = { date: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e), time: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e), fulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e), timeOrFulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e), email: (e) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e), hexColor: (e) => hex.test(e), hexaColor: (e) => hexa.test(e), hexOrHexaColor: (e) => hexOrHexa.test(e), rgbColor: (e) => rgb.test(e), rgbaColor: (e) => rgba.test(e), rgbOrRgbaColor: (e) => rgb.test(e) || rgba.test(e), hexOrRgbColor: (e) => hex.test(e) || rgb.test(e), hexaOrRgbaColor: (e) => hexa.test(e) || rgba.test(e), anyColor: (e) => hexOrHexa.test(e) || rgb.test(e) || rgba.test(e) };
const reRGBA = /^rgb(a)?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?([01]?\.?\d*?)?\)$/;
function rgbToHex({ r: e, g: t, b: o, a: n }) {
  const a = void 0 !== n;
  if (e = Math.round(e), t = Math.round(t), o = Math.round(o), e > 255 || t > 255 || o > 255 || a && n > 100)
    throw new TypeError("Expected 3 numbers below 256 (and optionally one below 100)");
  return n = a ? (256 | Math.round(255 * n / 100)).toString(16).slice(1) : "", "#" + (o | t << 8 | e << 16 | 1 << 24).toString(16).slice(1) + n;
}
function rgbToString({ r: e, g: t, b: o, a: n }) {
  return `rgb${void 0 !== n ? "a" : ""}(${e},${t},${o}${void 0 !== n ? "," + n / 100 : ""})`;
}
function hexToRgb(e) {
  if ("string" !== typeof e)
    throw new TypeError("Expected a string");
  e = e.replace(/^#/, ""), 3 === e.length ? e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : 4 === e.length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] + e[3] + e[3]);
  const t = parseInt(e, 16);
  return e.length > 6 ? { r: t >> 24 & 255, g: t >> 16 & 255, b: t >> 8 & 255, a: Math.round((255 & t) / 2.55) } : { r: t >> 16, g: t >> 8 & 255, b: 255 & t };
}
function hsvToRgb({ h: e, s: t, v: o, a: n }) {
  let a, l, i;
  t /= 100, o /= 100, e /= 360;
  const r = Math.floor(6 * e), s = 6 * e - r, u = o * (1 - t), c = o * (1 - s * t), d = o * (1 - (1 - s) * t);
  switch (r % 6) {
    case 0:
      a = o, l = d, i = u;
      break;
    case 1:
      a = c, l = o, i = u;
      break;
    case 2:
      a = u, l = o, i = d;
      break;
    case 3:
      a = u, l = c, i = o;
      break;
    case 4:
      a = d, l = u, i = o;
      break;
    case 5:
      a = o, l = u, i = c;
      break;
  }
  return { r: Math.round(255 * a), g: Math.round(255 * l), b: Math.round(255 * i), a: n };
}
function rgbToHsv({ r: e, g: t, b: o, a: n }) {
  const a = Math.max(e, t, o), l = Math.min(e, t, o), i = a - l, r = 0 === a ? 0 : i / a, s = a / 255;
  let u;
  switch (a) {
    case l:
      u = 0;
      break;
    case e:
      u = t - o + i * (t < o ? 6 : 0), u /= 6 * i;
      break;
    case t:
      u = o - e + 2 * i, u /= 6 * i;
      break;
    case o:
      u = e - t + 4 * i, u /= 6 * i;
      break;
  }
  return { h: Math.round(360 * u), s: Math.round(100 * r), v: Math.round(100 * s), a: n };
}
function textToRgb(e) {
  if ("string" !== typeof e)
    throw new TypeError("Expected a string");
  const t = e.replace(/ /g, ""), o = reRGBA.exec(t);
  if (null === o)
    return hexToRgb(t);
  const n = { r: Math.min(255, parseInt(o[2], 10)), g: Math.min(255, parseInt(o[3], 10)), b: Math.min(255, parseInt(o[4], 10)) };
  if (o[1]) {
    const e2 = parseFloat(o[5]);
    n.a = 100 * Math.min(1, true === isNaN(e2) ? 1 : e2);
  }
  return n;
}
function luminosity(e) {
  if ("string" !== typeof e && (!e || void 0 === e.r))
    throw new TypeError("Expected a string or a {r, g, b} object as color");
  const t = "string" === typeof e ? textToRgb(e) : e, o = t.r / 255, n = t.g / 255, a = t.b / 255, l = o <= 0.03928 ? o / 12.92 : Math.pow((o + 0.055) / 1.055, 2.4), i = n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4), r = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * l + 0.7152 * i + 0.0722 * r;
}
const palette = ["rgb(255,204,204)", "rgb(255,230,204)", "rgb(255,255,204)", "rgb(204,255,204)", "rgb(204,255,230)", "rgb(204,255,255)", "rgb(204,230,255)", "rgb(204,204,255)", "rgb(230,204,255)", "rgb(255,204,255)", "rgb(255,153,153)", "rgb(255,204,153)", "rgb(255,255,153)", "rgb(153,255,153)", "rgb(153,255,204)", "rgb(153,255,255)", "rgb(153,204,255)", "rgb(153,153,255)", "rgb(204,153,255)", "rgb(255,153,255)", "rgb(255,102,102)", "rgb(255,179,102)", "rgb(255,255,102)", "rgb(102,255,102)", "rgb(102,255,179)", "rgb(102,255,255)", "rgb(102,179,255)", "rgb(102,102,255)", "rgb(179,102,255)", "rgb(255,102,255)", "rgb(255,51,51)", "rgb(255,153,51)", "rgb(255,255,51)", "rgb(51,255,51)", "rgb(51,255,153)", "rgb(51,255,255)", "rgb(51,153,255)", "rgb(51,51,255)", "rgb(153,51,255)", "rgb(255,51,255)", "rgb(255,0,0)", "rgb(255,128,0)", "rgb(255,255,0)", "rgb(0,255,0)", "rgb(0,255,128)", "rgb(0,255,255)", "rgb(0,128,255)", "rgb(0,0,255)", "rgb(128,0,255)", "rgb(255,0,255)", "rgb(245,0,0)", "rgb(245,123,0)", "rgb(245,245,0)", "rgb(0,245,0)", "rgb(0,245,123)", "rgb(0,245,245)", "rgb(0,123,245)", "rgb(0,0,245)", "rgb(123,0,245)", "rgb(245,0,245)", "rgb(214,0,0)", "rgb(214,108,0)", "rgb(214,214,0)", "rgb(0,214,0)", "rgb(0,214,108)", "rgb(0,214,214)", "rgb(0,108,214)", "rgb(0,0,214)", "rgb(108,0,214)", "rgb(214,0,214)", "rgb(163,0,0)", "rgb(163,82,0)", "rgb(163,163,0)", "rgb(0,163,0)", "rgb(0,163,82)", "rgb(0,163,163)", "rgb(0,82,163)", "rgb(0,0,163)", "rgb(82,0,163)", "rgb(163,0,163)", "rgb(92,0,0)", "rgb(92,46,0)", "rgb(92,92,0)", "rgb(0,92,0)", "rgb(0,92,46)", "rgb(0,92,92)", "rgb(0,46,92)", "rgb(0,0,92)", "rgb(46,0,92)", "rgb(92,0,92)", "rgb(255,255,255)", "rgb(205,205,205)", "rgb(178,178,178)", "rgb(153,153,153)", "rgb(127,127,127)", "rgb(102,102,102)", "rgb(76,76,76)", "rgb(51,51,51)", "rgb(25,25,25)", "rgb(0,0,0)"], thumbPath = "M5 5 h10 v10 h-10 v-10 z", alphaTrackImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==";
var QColor = createComponent({ name: "QColor", props: { ...useDarkProps, ...useFormProps, modelValue: String, defaultValue: String, defaultView: { type: String, default: "spectrum", validator: (e) => ["spectrum", "tune", "palette"].includes(e) }, formatModel: { type: String, default: "auto", validator: (e) => ["auto", "hex", "rgb", "hexa", "rgba"].includes(e) }, palette: Array, noHeader: Boolean, noHeaderTabs: Boolean, noFooter: Boolean, square: Boolean, flat: Boolean, bordered: Boolean, disable: Boolean, readonly: Boolean }, emits: ["update:modelValue", "change"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), { $q: n } = o, a = useDark(e, n), { getCache: l } = useCache(), i = ref(null), r = ref(null), s = computed(() => "auto" === e.formatModel ? null : e.formatModel.indexOf("hex") > -1), u = computed(() => "auto" === e.formatModel ? null : e.formatModel.indexOf("a") > -1), c = ref("auto" === e.formatModel ? void 0 === e.modelValue || null === e.modelValue || "" === e.modelValue || e.modelValue.startsWith("#") ? "hex" : "rgb" : e.formatModel.startsWith("hex") ? "hex" : "rgb"), d = ref(e.defaultView), p2 = ref($(e.modelValue || e.defaultValue)), v = computed(() => true !== e.disable && true !== e.readonly), m = computed(() => void 0 === e.modelValue || null === e.modelValue || "" === e.modelValue || e.modelValue.startsWith("#")), f = computed(() => null !== s.value ? s.value : m.value), g = computed(() => ({ type: "hidden", name: e.name, value: p2.value[true === f.value ? "hex" : "rgb"] })), b = useFormInject(g), y = computed(() => null !== u.value ? u.value : void 0 !== p2.value.a), S = computed(() => ({ backgroundColor: p2.value.rgb || "#000" })), w = computed(() => {
    const e2 = void 0 !== p2.value.a && p2.value.a < 65 || luminosity(p2.value) > 0.4;
    return `q-color-picker__header-content q-color-picker__header-content--${e2 ? "light" : "dark"}`;
  }), C = computed(() => ({ background: `hsl(${p2.value.h},100%,50%)` })), x = computed(() => ({ top: `${100 - p2.value.v}%`, [true === n.lang.rtl ? "right" : "left"]: `${p2.value.s}%` })), k = computed(() => void 0 !== e.palette && e.palette.length > 0 ? e.palette : palette), _ = computed(() => "q-color-picker" + (true === e.bordered ? " q-color-picker--bordered" : "") + (true === e.square ? " q-color-picker--square no-border-radius" : "") + (true === e.flat ? " q-color-picker--flat no-shadow" : "") + (true === e.disable ? " disabled" : "") + (true === a.value ? " q-color-picker--dark q-dark" : "")), q = computed(() => {
    return true === e.disable ? { "aria-disabled": "true" } : true === e.readonly ? { "aria-readonly": "true" } : {};
  }), T = computed(() => {
    return [[TouchPan, A, void 0, { prevent: true, stop: true, mouse: true }]];
  });
  function P(e2, o2) {
    p2.value.hex = rgbToHex(e2), p2.value.rgb = rgbToString(e2), p2.value.r = e2.r, p2.value.g = e2.g, p2.value.b = e2.b, p2.value.a = e2.a;
    const n2 = p2.value[true === f.value ? "hex" : "rgb"];
    t("update:modelValue", n2), true === o2 && t("change", n2);
  }
  function $(t2) {
    const o2 = void 0 !== u.value ? u.value : "auto" === e.formatModel ? null : e.formatModel.indexOf("a") > -1;
    if ("string" !== typeof t2 || 0 === t2.length || true !== testPattern.anyColor(t2.replace(/ /g, "")))
      return { h: 0, s: 0, v: 0, r: 0, g: 0, b: 0, a: true === o2 ? 100 : void 0, hex: void 0, rgb: void 0 };
    const n2 = textToRgb(t2);
    return true === o2 && void 0 === n2.a && (n2.a = 100), n2.hex = rgbToHex(n2), n2.rgb = rgbToString(n2), Object.assign(n2, rgbToHsv(n2));
  }
  function M(e2, t2, o2) {
    const a2 = i.value;
    if (null === a2)
      return;
    const l2 = a2.clientWidth, r2 = a2.clientHeight, s2 = a2.getBoundingClientRect();
    let u2 = Math.min(l2, Math.max(0, e2 - s2.left));
    true === n.lang.rtl && (u2 = l2 - u2);
    const c2 = Math.min(r2, Math.max(0, t2 - s2.top)), d2 = Math.round(100 * u2 / l2), v2 = Math.round(100 * Math.max(0, Math.min(1, -c2 / r2 + 1))), m2 = hsvToRgb({ h: p2.value.h, s: d2, v: v2, a: true === y.value ? p2.value.a : void 0 });
    p2.value.s = d2, p2.value.v = v2, P(m2, o2);
  }
  function B(e2, t2) {
    const o2 = Math.round(e2), n2 = hsvToRgb({ h: o2, s: p2.value.s, v: p2.value.v, a: true === y.value ? p2.value.a : void 0 });
    p2.value.h = o2, P(n2, t2);
  }
  function Q(e2, t2, n2, a2, l2) {
    if (void 0 !== a2 && stop(a2), !/^[0-9]+$/.test(e2))
      return void (true === l2 && o.$forceUpdate());
    const i2 = Math.floor(Number(e2));
    if (i2 < 0 || i2 > n2)
      return void (true === l2 && o.$forceUpdate());
    const r2 = { r: "r" === t2 ? i2 : p2.value.r, g: "g" === t2 ? i2 : p2.value.g, b: "b" === t2 ? i2 : p2.value.b, a: true === y.value ? "a" === t2 ? i2 : p2.value.a : void 0 };
    if ("a" !== t2) {
      const e3 = rgbToHsv(r2);
      p2.value.h = e3.h, p2.value.s = e3.s, p2.value.v = e3.v;
    }
    if (P(r2, l2), void 0 !== a2 && true !== l2 && void 0 !== a2.target.selectionEnd) {
      const e3 = a2.target.selectionEnd;
      nextTick(() => {
        a2.target.setSelectionRange(e3, e3);
      });
    }
  }
  function E(e2, t2) {
    let o2;
    const n2 = e2.target.value;
    if (stop(e2), "hex" === c.value) {
      if (n2.length !== (true === y.value ? 9 : 7) || !/^#[0-9A-Fa-f]+$/.test(n2))
        return true;
      o2 = hexToRgb(n2);
    } else {
      let e3;
      if (!n2.endsWith(")"))
        return true;
      if (true !== y.value && n2.startsWith("rgb(")) {
        if (e3 = n2.substring(4, n2.length - 1).split(",").map((e4) => parseInt(e4, 10)), 3 !== e3.length || !/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/.test(n2))
          return true;
      } else {
        if (true !== y.value || !n2.startsWith("rgba("))
          return true;
        {
          if (e3 = n2.substring(5, n2.length - 1).split(","), 4 !== e3.length || !/^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/.test(n2))
            return true;
          for (let o3 = 0; o3 < 3; o3++) {
            const t4 = parseInt(e3[o3], 10);
            if (t4 < 0 || t4 > 255)
              return true;
            e3[o3] = t4;
          }
          const t3 = parseFloat(e3[3]);
          if (t3 < 0 || t3 > 1)
            return true;
          e3[3] = t3;
        }
      }
      if (e3[0] < 0 || e3[0] > 255 || e3[1] < 0 || e3[1] > 255 || e3[2] < 0 || e3[2] > 255 || true === y.value && (e3[3] < 0 || e3[3] > 1))
        return true;
      o2 = { r: e3[0], g: e3[1], b: e3[2], a: true === y.value ? 100 * e3[3] : void 0 };
    }
    const a2 = rgbToHsv(o2);
    if (p2.value.h = a2.h, p2.value.s = a2.s, p2.value.v = a2.v, P(o2, t2), true !== t2) {
      const t3 = e2.target.selectionEnd;
      nextTick(() => {
        e2.target.setSelectionRange(t3, t3);
      });
    }
  }
  function O(e2) {
    const t2 = $(e2), o2 = { r: t2.r, g: t2.g, b: t2.b, a: t2.a };
    void 0 === o2.a && (o2.a = p2.value.a), p2.value.h = t2.h, p2.value.s = t2.s, p2.value.v = t2.v, P(o2, true);
  }
  function A(e2) {
    e2.isFinal ? M(e2.position.left, e2.position.top, true) : L(e2);
  }
  watch(() => e.modelValue, (t2) => {
    const o2 = $(t2 || e.defaultValue);
    o2.hex !== p2.value.hex && (p2.value = o2);
  }), watch(() => e.defaultValue, (t2) => {
    if (!e.modelValue && t2) {
      const e2 = $(t2);
      e2.hex !== p2.value.hex && (p2.value = e2);
    }
  });
  const L = throttle((e2) => {
    M(e2.position.left, e2.position.top);
  }, 20);
  function R(e2) {
    M(e2.pageX - window.pageXOffset, e2.pageY - window.pageYOffset, true);
  }
  function D(e2) {
    M(e2.pageX - window.pageXOffset, e2.pageY - window.pageYOffset);
  }
  function z(e2) {
    null !== r.value && (r.value.$el.style.opacity = e2 ? 1 : 0);
  }
  function F() {
    const t2 = [];
    return true !== e.noHeaderTabs && t2.push(h(QTabs, { class: "q-color-picker__header-tabs", modelValue: c.value, dense: true, align: "justify", ...l("topVTab", { "onUpdate:modelValue": (e2) => {
      c.value = e2;
    } }) }, () => [h(QTab, { label: "HEX" + (true === y.value ? "A" : ""), name: "hex", ripple: false }), h(QTab, { label: "RGB" + (true === y.value ? "A" : ""), name: "rgb", ripple: false })])), t2.push(h("div", { class: "q-color-picker__header-banner row flex-center no-wrap" }, [h("input", { class: "fit", value: p2.value[c.value], ...true !== v.value ? { readonly: true } : {}, ...l("topIn", { onInput: (e2) => {
      z(true === E(e2));
    }, onChange: stop, onBlur: (e2) => {
      true === E(e2, true) && o.$forceUpdate(), z(false);
    } }) }), h(QIcon, { ref: r, class: "q-color-picker__error-icon absolute no-pointer-events", name: n.iconSet.type.negative })])), h("div", { class: "q-color-picker__header relative-position overflow-hidden" }, [h("div", { class: "q-color-picker__header-bg absolute-full" }), h("div", { class: w.value, style: S.value }, t2)]);
  }
  function I() {
    return h(QTabPanels, { modelValue: d.value, animated: true }, () => [h(QTabPanel, { class: "q-color-picker__spectrum-tab overflow-hidden", name: "spectrum" }, N), h(QTabPanel, { class: "q-pa-md q-color-picker__tune-tab", name: "tune" }, H), h(QTabPanel, { class: "q-color-picker__palette-tab", name: "palette" }, j)]);
  }
  function V() {
    return h("div", { class: "q-color-picker__footer relative-position overflow-hidden" }, [h(QTabs, { class: "absolute-full", modelValue: d.value, dense: true, align: "justify", ...l("ftIn", { "onUpdate:modelValue": (e2) => {
      d.value = e2;
    } }) }, () => [h(QTab, { icon: n.iconSet.colorPicker.spectrum, name: "spectrum", ripple: false }), h(QTab, { icon: n.iconSet.colorPicker.tune, name: "tune", ripple: false }), h(QTab, { icon: n.iconSet.colorPicker.palette, name: "palette", ripple: false })])]);
  }
  function N() {
    const e2 = { ref: i, class: "q-color-picker__spectrum non-selectable relative-position cursor-pointer" + (true !== v.value ? " readonly" : ""), style: C.value, ...true === v.value ? { onClick: R, onMousedown: D } : {} }, t2 = [h("div", { style: { paddingBottom: "100%" } }), h("div", { class: "q-color-picker__spectrum-white absolute-full" }), h("div", { class: "q-color-picker__spectrum-black absolute-full" }), h("div", { class: "absolute", style: x.value }, [void 0 !== p2.value.hex ? h("div", { class: "q-color-picker__spectrum-circle" }) : null])], o2 = [h(QSlider, { class: "q-color-picker__hue non-selectable", modelValue: p2.value.h, min: 0, max: 360, trackSize: "8px", innerTrackColor: "transparent", selectionColor: "transparent", readonly: true !== v.value, thumbPath, "onUpdate:modelValue": B, ...l("lazyhue", { onChange: (e3) => B(e3, true) }) })];
    return true === y.value && o2.push(h(QSlider, { class: "q-color-picker__alpha non-selectable", modelValue: p2.value.a, min: 0, max: 100, trackSize: "8px", trackColor: "white", innerTrackColor: "transparent", selectionColor: "transparent", trackImg: alphaTrackImg, readonly: true !== v.value, hideSelection: true, thumbPath, ...l("alphaSlide", { "onUpdate:modelValue": (e3) => Q(e3, "a", 100), onChange: (e3) => Q(e3, "a", 100, void 0, true) }) })), [hDir("div", e2, t2, "spec", v.value, () => T.value), h("div", { class: "q-color-picker__sliders" }, o2)];
  }
  function H() {
    return [h("div", { class: "row items-center no-wrap" }, [h("div", "R"), h(QSlider, { modelValue: p2.value.r, min: 0, max: 255, color: "red", dark: a.value, readonly: true !== v.value, ...l("rSlide", { "onUpdate:modelValue": (e2) => Q(e2, "r", 255), onChange: (e2) => Q(e2, "r", 255, void 0, true) }) }), h("input", { value: p2.value.r, maxlength: 3, readonly: true !== v.value, onChange: stop, ...l("rIn", { onInput: (e2) => Q(e2.target.value, "r", 255, e2), onBlur: (e2) => Q(e2.target.value, "r", 255, e2, true) }) })]), h("div", { class: "row items-center no-wrap" }, [h("div", "G"), h(QSlider, { modelValue: p2.value.g, min: 0, max: 255, color: "green", dark: a.value, readonly: true !== v.value, ...l("gSlide", { "onUpdate:modelValue": (e2) => Q(e2, "g", 255), onChange: (e2) => Q(e2, "g", 255, void 0, true) }) }), h("input", { value: p2.value.g, maxlength: 3, readonly: true !== v.value, onChange: stop, ...l("gIn", { onInput: (e2) => Q(e2.target.value, "g", 255, e2), onBlur: (e2) => Q(e2.target.value, "g", 255, e2, true) }) })]), h("div", { class: "row items-center no-wrap" }, [h("div", "B"), h(QSlider, { modelValue: p2.value.b, min: 0, max: 255, color: "blue", readonly: true !== v.value, dark: a.value, ...l("bSlide", { "onUpdate:modelValue": (e2) => Q(e2, "b", 255), onChange: (e2) => Q(e2, "b", 255, void 0, true) }) }), h("input", { value: p2.value.b, maxlength: 3, readonly: true !== v.value, onChange: stop, ...l("bIn", { onInput: (e2) => Q(e2.target.value, "b", 255, e2), onBlur: (e2) => Q(e2.target.value, "b", 255, e2, true) }) })]), true === y.value ? h("div", { class: "row items-center no-wrap" }, [h("div", "A"), h(QSlider, { modelValue: p2.value.a, color: "grey", readonly: true !== v.value, dark: a.value, ...l("aSlide", { "onUpdate:modelValue": (e2) => Q(e2, "a", 100), onChange: (e2) => Q(e2, "a", 100, void 0, true) }) }), h("input", { value: p2.value.a, maxlength: 3, readonly: true !== v.value, onChange: stop, ...l("aIn", { onInput: (e2) => Q(e2.target.value, "a", 100, e2), onBlur: (e2) => Q(e2.target.value, "a", 100, e2, true) }) })]) : null];
  }
  function j() {
    const e2 = (e3) => h("div", { class: "q-color-picker__cube col-auto", style: { backgroundColor: e3 }, ...true === v.value ? l("palette#" + e3, { onClick: () => {
      O(e3);
    } }) : {} });
    return [h("div", { class: "row items-center q-color-picker__palette-rows" + (true === v.value ? " q-color-picker__palette-rows--editable" : "") }, k.value.map(e2))];
  }
  return () => {
    const t2 = [I()];
    return void 0 !== e.name && true !== e.disable && b(t2, "push"), true !== e.noHeader && t2.unshift(F()), true !== e.noFooter && t2.push(V()), h("div", { class: _.value, ...q.value }, t2);
  };
} });
const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
function toJalaali(e, t, o) {
  return "[object Date]" === Object.prototype.toString.call(e) && (o = e.getDate(), t = e.getMonth() + 1, e = e.getFullYear()), d2j(g2d(e, t, o));
}
function toGregorian(e, t, o) {
  return d2g(j2d(e, t, o));
}
function isLeapJalaaliYear(e) {
  return 0 === jalCalLeap(e);
}
function jalaaliMonthLength(e, t) {
  return t <= 6 ? 31 : t <= 11 ? 30 : isLeapJalaaliYear(e) ? 30 : 29;
}
function jalCalLeap(e) {
  const t = breaks.length;
  let o, n, a, l, i, r = breaks[0];
  if (e < r || e >= breaks[t - 1])
    throw new Error("Invalid Jalaali year " + e);
  for (i = 1; i < t; i += 1) {
    if (o = breaks[i], n = o - r, e < o)
      break;
    r = o;
  }
  return l = e - r, n - l < 6 && (l = l - n + 33 * div(n + 4, 33)), a = mod(mod(l + 1, 33) - 1, 4), -1 === a && (a = 4), a;
}
function jalCal(e, t) {
  const o = breaks.length, n = e + 621;
  let a, l, i, r, s, u = -14, c = breaks[0];
  if (e < c || e >= breaks[o - 1])
    throw new Error("Invalid Jalaali year " + e);
  for (s = 1; s < o; s += 1) {
    if (a = breaks[s], l = a - c, e < a)
      break;
    u = u + 8 * div(l, 33) + div(mod(l, 33), 4), c = a;
  }
  r = e - c, u = u + 8 * div(r, 33) + div(mod(r, 33) + 3, 4), 4 === mod(l, 33) && l - r === 4 && (u += 1);
  const d = div(n, 4) - div(3 * (div(n, 100) + 1), 4) - 150, p2 = 20 + u - d;
  return t || (l - r < 6 && (r = r - l + 33 * div(l + 4, 33)), i = mod(mod(r + 1, 33) - 1, 4), -1 === i && (i = 4)), { leap: i, gy: n, march: p2 };
}
function j2d(e, t, o) {
  const n = jalCal(e, true);
  return g2d(n.gy, 3, n.march) + 31 * (t - 1) - div(t, 7) * (t - 7) + o - 1;
}
function d2j(e) {
  const t = d2g(e).gy;
  let o, n, a, l = t - 621;
  const i = jalCal(l, false), r = g2d(t, 3, i.march);
  if (a = e - r, a >= 0) {
    if (a <= 185)
      return n = 1 + div(a, 31), o = mod(a, 31) + 1, { jy: l, jm: n, jd: o };
    a -= 186;
  } else
    l -= 1, a += 179, 1 === i.leap && (a += 1);
  return n = 7 + div(a, 30), o = mod(a, 30) + 1, { jy: l, jm: n, jd: o };
}
function g2d(e, t, o) {
  let n = div(1461 * (e + div(t - 8, 6) + 100100), 4) + div(153 * mod(t + 9, 12) + 2, 5) + o - 34840408;
  return n = n - div(3 * div(e + 100100 + div(t - 8, 6), 100), 4) + 752, n;
}
function d2g(e) {
  let t = 4 * e + 139361631;
  t = t + 4 * div(3 * div(4 * e + 183187720, 146097), 4) - 3908;
  const o = 5 * div(mod(t, 1461), 4) + 308, n = div(mod(o, 153), 5) + 1, a = mod(div(o, 153), 12) + 1, l = div(t, 1461) - 100100 + div(8 - a, 6);
  return { gy: l, gm: a, gd: n };
}
function div(e, t) {
  return ~~(e / t);
}
function mod(e, t) {
  return e - ~~(e / t) * t;
}
const calendars = ["gregorian", "persian"], useDatetimeProps = { modelValue: { required: true }, mask: { type: String }, locale: Object, calendar: { type: String, validator: (e) => calendars.includes(e), default: "gregorian" }, landscape: Boolean, color: String, textColor: String, square: Boolean, flat: Boolean, bordered: Boolean, readonly: Boolean, disable: Boolean }, useDatetimeEmits = ["update:modelValue"];
function getDayHash(e) {
  return e.year + "/" + pad(e.month) + "/" + pad(e.day);
}
function useDatetime(e, t) {
  const o = computed(() => {
    return true !== e.disable && true !== e.readonly;
  }), n = computed(() => {
    return true === e.editable ? 0 : -1;
  }), a = computed(() => {
    const t2 = [];
    return void 0 !== e.color && t2.push(`bg-${e.color}`), void 0 !== e.textColor && t2.push(`text-${e.textColor}`), t2.join(" ");
  });
  function l() {
    return void 0 !== e.locale ? { ...t.lang.date, ...e.locale } : t.lang.date;
  }
  function i(t2) {
    const o2 = new Date(), n2 = true === t2 ? null : 0;
    if ("persian" === e.calendar) {
      const e2 = toJalaali(o2);
      return { year: e2.jy, month: e2.jm, day: e2.jd };
    }
    return { year: o2.getFullYear(), month: o2.getMonth() + 1, day: o2.getDate(), hour: n2, minute: n2, second: n2, millisecond: n2 };
  }
  return { editable: o, tabindex: n, headerClass: a, getLocale: l, getCurrentDate: i };
}
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(e, t) {
  const o = "(" + t.days.join("|") + ")", n = e + o;
  if (void 0 !== regexStore[n])
    return regexStore[n];
  const a = "(" + t.daysShort.join("|") + ")", l = "(" + t.months.join("|") + ")", i = "(" + t.monthsShort.join("|") + ")", r = {};
  let s = 0;
  const u = e.replace(reverseToken, (e2) => {
    switch (s++, e2) {
      case "YY":
        return r.YY = s, "(-?\\d{1,2})";
      case "YYYY":
        return r.YYYY = s, "(-?\\d{1,4})";
      case "M":
        return r.M = s, "(\\d{1,2})";
      case "MM":
        return r.M = s, "(\\d{2})";
      case "MMM":
        return r.MMM = s, i;
      case "MMMM":
        return r.MMMM = s, l;
      case "D":
        return r.D = s, "(\\d{1,2})";
      case "Do":
        return r.D = s++, "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        return r.D = s, "(\\d{2})";
      case "H":
        return r.H = s, "(\\d{1,2})";
      case "HH":
        return r.H = s, "(\\d{2})";
      case "h":
        return r.h = s, "(\\d{1,2})";
      case "hh":
        return r.h = s, "(\\d{2})";
      case "m":
        return r.m = s, "(\\d{1,2})";
      case "mm":
        return r.m = s, "(\\d{2})";
      case "s":
        return r.s = s, "(\\d{1,2})";
      case "ss":
        return r.s = s, "(\\d{2})";
      case "S":
        return r.S = s, "(\\d{1})";
      case "SS":
        return r.S = s, "(\\d{2})";
      case "SSS":
        return r.S = s, "(\\d{3})";
      case "A":
        return r.A = s, "(AM|PM)";
      case "a":
        return r.a = s, "(am|pm)";
      case "aa":
        return r.aa = s, "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return a;
      case "dddd":
        return o;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "w":
        return "(\\d{1,2})";
      case "ww":
        return "(\\d{2})";
      case "Z":
        return r.Z = s, "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        return r.ZZ = s, "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        return r.X = s, "(-?\\d+)";
      case "x":
        return r.x = s, "(-?\\d{4,})";
      default:
        return s--, "[" === e2[0] && (e2 = e2.substring(1, e2.length - 1)), e2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  }), c = { map: r, regex: new RegExp("^" + u) };
  return regexStore[n] = c, c;
}
function getDateLocale(e, t) {
  return void 0 !== e ? e : void 0 !== t ? t.date : defaultLang.date;
}
function formatTimezone(e, t = "") {
  const o = e > 0 ? "-" : "+", n = Math.abs(e), a = Math.floor(n / 60), l = n % 60;
  return o + pad(a) + t + pad(l);
}
function __splitDate(e, t, o, n, a) {
  const l = { year: null, month: null, day: null, hour: null, minute: null, second: null, millisecond: null, timezoneOffset: null, dateHash: null, timeHash: null };
  if (void 0 !== a && Object.assign(l, a), void 0 === e || null === e || "" === e || "string" !== typeof e)
    return l;
  void 0 === t && (t = defaultMask);
  const i = getDateLocale(o, Plugin$8.props), r = i.months, s = i.monthsShort, { regex: u, map: c } = getRegexData(t, i), d = e.match(u);
  if (null === d)
    return l;
  let p2 = "";
  if (void 0 !== c.X || void 0 !== c.x) {
    const e2 = parseInt(d[void 0 !== c.X ? c.X : c.x], 10);
    if (true === isNaN(e2) || e2 < 0)
      return l;
    const t2 = new Date(e2 * (void 0 !== c.X ? 1e3 : 1));
    l.year = t2.getFullYear(), l.month = t2.getMonth() + 1, l.day = t2.getDate(), l.hour = t2.getHours(), l.minute = t2.getMinutes(), l.second = t2.getSeconds(), l.millisecond = t2.getMilliseconds();
  } else {
    if (void 0 !== c.YYYY)
      l.year = parseInt(d[c.YYYY], 10);
    else if (void 0 !== c.YY) {
      const e2 = parseInt(d[c.YY], 10);
      l.year = e2 < 0 ? e2 : 2e3 + e2;
    }
    if (void 0 !== c.M) {
      if (l.month = parseInt(d[c.M], 10), l.month < 1 || l.month > 12)
        return l;
    } else
      void 0 !== c.MMM ? l.month = s.indexOf(d[c.MMM]) + 1 : void 0 !== c.MMMM && (l.month = r.indexOf(d[c.MMMM]) + 1);
    if (void 0 !== c.D) {
      if (l.day = parseInt(d[c.D], 10), null === l.year || null === l.month || l.day < 1)
        return l;
      const e2 = "persian" !== n ? new Date(l.year, l.month, 0).getDate() : jalaaliMonthLength(l.year, l.month);
      if (l.day > e2)
        return l;
    }
    void 0 !== c.H ? l.hour = parseInt(d[c.H], 10) % 24 : void 0 !== c.h && (l.hour = parseInt(d[c.h], 10) % 12, (c.A && "PM" === d[c.A] || c.a && "pm" === d[c.a] || c.aa && "p.m." === d[c.aa]) && (l.hour += 12), l.hour = l.hour % 24), void 0 !== c.m && (l.minute = parseInt(d[c.m], 10) % 60), void 0 !== c.s && (l.second = parseInt(d[c.s], 10) % 60), void 0 !== c.S && (l.millisecond = parseInt(d[c.S], 10) * 10 ** (3 - d[c.S].length)), void 0 === c.Z && void 0 === c.ZZ || (p2 = void 0 !== c.Z ? d[c.Z].replace(":", "") : d[c.ZZ], l.timezoneOffset = ("+" === p2[0] ? -1 : 1) * (60 * p2.slice(1, 3) + 1 * p2.slice(3, 5)));
  }
  return l.dateHash = pad(l.year, 6) + "/" + pad(l.month) + "/" + pad(l.day), l.timeHash = pad(l.hour) + ":" + pad(l.minute) + ":" + pad(l.second) + p2, l;
}
function getWeekOfYear(e) {
  const t = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  t.setDate(t.getDate() - (t.getDay() + 6) % 7 + 3);
  const o = new Date(t.getFullYear(), 0, 4);
  o.setDate(o.getDate() - (o.getDay() + 6) % 7 + 3);
  const n = t.getTimezoneOffset() - o.getTimezoneOffset();
  t.setHours(t.getHours() - n);
  const a = (t - o) / (7 * MILLISECONDS_IN_DAY);
  return 1 + Math.floor(a);
}
function startOfDate(e, t, o) {
  const n = new Date(e), a = `set${true === o ? "UTC" : ""}`;
  switch (t) {
    case "year":
    case "years":
      n[`${a}Month`](0);
    case "month":
    case "months":
      n[`${a}Date`](1);
    case "day":
    case "days":
    case "date":
      n[`${a}Hours`](0);
    case "hour":
    case "hours":
      n[`${a}Minutes`](0);
    case "minute":
    case "minutes":
      n[`${a}Seconds`](0);
    case "second":
    case "seconds":
      n[`${a}Milliseconds`](0);
  }
  return n;
}
function getDiff(e, t, o) {
  return (e.getTime() - e.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / o;
}
function getDateDiff(e, t, o = "days") {
  const n = new Date(e), a = new Date(t);
  switch (o) {
    case "years":
    case "year":
      return n.getFullYear() - a.getFullYear();
    case "months":
    case "month":
      return 12 * (n.getFullYear() - a.getFullYear()) + n.getMonth() - a.getMonth();
    case "days":
    case "day":
    case "date":
      return getDiff(startOfDate(n, "day"), startOfDate(a, "day"), MILLISECONDS_IN_DAY);
    case "hours":
    case "hour":
      return getDiff(startOfDate(n, "hour"), startOfDate(a, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
    case "minute":
      return getDiff(startOfDate(n, "minute"), startOfDate(a, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
    case "second":
      return getDiff(startOfDate(n, "second"), startOfDate(a, "second"), 1e3);
  }
}
function getDayOfYear(e) {
  return getDateDiff(e, startOfDate(e, "year"), "days") + 1;
}
function getOrdinal(e) {
  if (e >= 11 && e <= 13)
    return `${e}th`;
  switch (e % 10) {
    case 1:
      return `${e}st`;
    case 2:
      return `${e}nd`;
    case 3:
      return `${e}rd`;
  }
  return `${e}th`;
}
const formatter = { YY(e, t, o) {
  const n = this.YYYY(e, t, o) % 100;
  return n >= 0 ? pad(n) : "-" + pad(Math.abs(n));
}, YYYY(e, t, o) {
  return void 0 !== o && null !== o ? o : e.getFullYear();
}, M(e) {
  return e.getMonth() + 1;
}, MM(e) {
  return pad(e.getMonth() + 1);
}, MMM(e, t) {
  return t.monthsShort[e.getMonth()];
}, MMMM(e, t) {
  return t.months[e.getMonth()];
}, Q(e) {
  return Math.ceil((e.getMonth() + 1) / 3);
}, Qo(e) {
  return getOrdinal(this.Q(e));
}, D(e) {
  return e.getDate();
}, Do(e) {
  return getOrdinal(e.getDate());
}, DD(e) {
  return pad(e.getDate());
}, DDD(e) {
  return getDayOfYear(e);
}, DDDD(e) {
  return pad(getDayOfYear(e), 3);
}, d(e) {
  return e.getDay();
}, dd(e, t) {
  return this.dddd(e, t).slice(0, 2);
}, ddd(e, t) {
  return t.daysShort[e.getDay()];
}, dddd(e, t) {
  return t.days[e.getDay()];
}, E(e) {
  return e.getDay() || 7;
}, w(e) {
  return getWeekOfYear(e);
}, ww(e) {
  return pad(getWeekOfYear(e));
}, H(e) {
  return e.getHours();
}, HH(e) {
  return pad(e.getHours());
}, h(e) {
  const t = e.getHours();
  return 0 === t ? 12 : t > 12 ? t % 12 : t;
}, hh(e) {
  return pad(this.h(e));
}, m(e) {
  return e.getMinutes();
}, mm(e) {
  return pad(e.getMinutes());
}, s(e) {
  return e.getSeconds();
}, ss(e) {
  return pad(e.getSeconds());
}, S(e) {
  return Math.floor(e.getMilliseconds() / 100);
}, SS(e) {
  return pad(Math.floor(e.getMilliseconds() / 10));
}, SSS(e) {
  return pad(e.getMilliseconds(), 3);
}, A(e) {
  return this.H(e) < 12 ? "AM" : "PM";
}, a(e) {
  return this.H(e) < 12 ? "am" : "pm";
}, aa(e) {
  return this.H(e) < 12 ? "a.m." : "p.m.";
}, Z(e, t, o, n) {
  const a = void 0 === n || null === n ? e.getTimezoneOffset() : n;
  return formatTimezone(a, ":");
}, ZZ(e, t, o, n) {
  const a = void 0 === n || null === n ? e.getTimezoneOffset() : n;
  return formatTimezone(a);
}, X(e) {
  return Math.floor(e.getTime() / 1e3);
}, x(e) {
  return e.getTime();
} };
function formatDate(e, t, o, n, a) {
  if (0 !== e && !e || e === 1 / 0 || e === -1 / 0)
    return;
  const l = new Date(e);
  if (isNaN(l))
    return;
  void 0 === t && (t = defaultMask);
  const i = getDateLocale(o, Plugin$8.props);
  return t.replace(token, (e2, t2) => e2 in formatter ? formatter[e2](l, i, n, a) : void 0 === t2 ? e2 : t2.split("\\]").join("]"));
}
const yearsInterval = 20, views = ["Calendar", "Years", "Months"], viewIsValid = (e) => views.includes(e), yearMonthValidator = (e) => /^-?[\d]+\/[0-1]\d$/.test(e), lineStr = " \u2014 ";
function getMonthHash(e) {
  return e.year + "/" + pad(e.month);
}
var QDate = createComponent({ name: "QDate", props: { ...useDatetimeProps, ...useFormProps, ...useDarkProps, multiple: Boolean, range: Boolean, title: String, subtitle: String, mask: { default: "YYYY/MM/DD" }, defaultYearMonth: { type: String, validator: yearMonthValidator }, yearsInMonthView: Boolean, events: [Array, Function], eventColor: [String, Function], emitImmediately: Boolean, options: [Array, Function], navigationMinYearMonth: { type: String, validator: yearMonthValidator }, navigationMaxYearMonth: { type: String, validator: yearMonthValidator }, noUnset: Boolean, firstDayOfWeek: [String, Number], todayBtn: Boolean, minimal: Boolean, defaultView: { type: String, default: "Calendar", validator: viewIsValid } }, emits: [...useDatetimeEmits, "range-start", "range-end", "navigation"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = useDark(e, a), { getCache: i } = useCache(), { tabindex: r, headerClass: s, getLocale: u, getCurrentDate: c } = useDatetime(e, a);
  let d;
  const p2 = useFormAttrs(e), v = useFormInject(p2), m = ref(null), f = ref(de()), g = ref(u()), b = computed(() => de()), y = computed(() => u()), S = computed(() => c()), w = ref(ve(f.value, g.value)), C = ref(e.defaultView), x = true === a.lang.rtl ? "right" : "left", k = ref(x.value), _ = ref(x.value), q = w.value.year, T = ref(q - q % yearsInterval - (q < 0 ? yearsInterval : 0)), P = ref(null), $ = computed(() => {
    const t2 = true === e.landscape ? "landscape" : "portrait";
    return `q-date q-date--${t2} q-date--${t2}-${true === e.minimal ? "minimal" : "standard"}` + (true === l.value ? " q-date--dark q-dark" : "") + (true === e.bordered ? " q-date--bordered" : "") + (true === e.square ? " q-date--square no-border-radius" : "") + (true === e.flat ? " q-date--flat no-shadow" : "") + (true === e.disable ? " disabled" : true === e.readonly ? " q-date--readonly" : "");
  }), M = computed(() => {
    return e.color || "primary";
  }), B = computed(() => {
    return e.textColor || "white";
  }), Q = computed(() => true === e.emitImmediately && true !== e.multiple && true !== e.range), E = computed(() => true === Array.isArray(e.modelValue) ? e.modelValue : null !== e.modelValue && void 0 !== e.modelValue ? [e.modelValue] : []), O = computed(() => E.value.filter((e2) => "string" === typeof e2).map((e2) => pe(e2, f.value, g.value)).filter((e2) => null !== e2.dateHash && null !== e2.day && null !== e2.month && null !== e2.year)), A = computed(() => {
    const e2 = (e3) => pe(e3, f.value, g.value);
    return E.value.filter((e3) => true === isObject(e3) && void 0 !== e3.from && void 0 !== e3.to).map((t2) => ({ from: e2(t2.from), to: e2(t2.to) })).filter((e3) => null !== e3.from.dateHash && null !== e3.to.dateHash && e3.from.dateHash < e3.to.dateHash);
  }), L = computed(() => "persian" !== e.calendar ? (e2) => new Date(e2.year, e2.month - 1, e2.day) : (e2) => {
    const t2 = toGregorian(e2.year, e2.month, e2.day);
    return new Date(t2.gy, t2.gm - 1, t2.gd);
  }), R = computed(() => "persian" === e.calendar ? getDayHash : (e2, t2, o2) => formatDate(new Date(e2.year, e2.month - 1, e2.day, e2.hour, e2.minute, e2.second, e2.millisecond), void 0 === t2 ? f.value : t2, void 0 === o2 ? g.value : o2, e2.year, e2.timezoneOffset)), D = computed(() => O.value.length + A.value.reduce((e2, t2) => e2 + 1 + getDateDiff(L.value(t2.to), L.value(t2.from)), 0)), z = computed(() => {
    if (void 0 !== e.title && null !== e.title && e.title.length > 0)
      return e.title;
    if (null !== P.value) {
      const e2 = P.value.init, t3 = L.value(e2);
      return g.value.daysShort[t3.getDay()] + ", " + g.value.monthsShort[e2.month - 1] + " " + e2.day + lineStr + "?";
    }
    if (0 === D.value)
      return lineStr;
    if (D.value > 1)
      return `${D.value} ${g.value.pluralDay}`;
    const t2 = O.value[0], o2 = L.value(t2);
    return true === isNaN(o2.valueOf()) ? lineStr : void 0 !== g.value.headerTitle ? g.value.headerTitle(o2, t2) : g.value.daysShort[o2.getDay()] + ", " + g.value.monthsShort[t2.month - 1] + " " + t2.day;
  }), F = computed(() => {
    const e2 = O.value.concat(A.value.map((e3) => e3.from)).sort((e3, t2) => e3.year - t2.year || e3.month - t2.month);
    return e2[0];
  }), I = computed(() => {
    const e2 = O.value.concat(A.value.map((e3) => e3.to)).sort((e3, t2) => t2.year - e3.year || t2.month - e3.month);
    return e2[0];
  }), V = computed(() => {
    if (void 0 !== e.subtitle && null !== e.subtitle && e.subtitle.length > 0)
      return e.subtitle;
    if (0 === D.value)
      return lineStr;
    if (D.value > 1) {
      const e2 = F.value, t2 = I.value, o2 = g.value.monthsShort;
      return o2[e2.month - 1] + (e2.year !== t2.year ? " " + e2.year + lineStr + o2[t2.month - 1] + " " : e2.month !== t2.month ? lineStr + o2[t2.month - 1] : "") + " " + t2.year;
    }
    return O.value[0].year;
  }), N = computed(() => {
    const e2 = [a.iconSet.datetime.arrowLeft, a.iconSet.datetime.arrowRight];
    return true === a.lang.rtl ? e2.reverse() : e2;
  }), H = computed(() => void 0 !== e.firstDayOfWeek ? Number(e.firstDayOfWeek) : g.value.firstDayOfWeek), j = computed(() => {
    const e2 = g.value.daysShort, t2 = H.value;
    return t2 > 0 ? e2.slice(t2, 7).concat(e2.slice(0, t2)) : e2;
  }), U = computed(() => {
    const t2 = w.value;
    return "persian" !== e.calendar ? new Date(t2.year, t2.month, 0).getDate() : jalaaliMonthLength(t2.year, t2.month);
  }), K = computed(() => "function" === typeof e.eventColor ? e.eventColor : () => e.eventColor), W = computed(() => {
    if (void 0 === e.navigationMinYearMonth)
      return null;
    const t2 = e.navigationMinYearMonth.split("/");
    return { year: parseInt(t2[0], 10), month: parseInt(t2[1], 10) };
  }), Y = computed(() => {
    if (void 0 === e.navigationMaxYearMonth)
      return null;
    const t2 = e.navigationMaxYearMonth.split("/");
    return { year: parseInt(t2[0], 10), month: parseInt(t2[1], 10) };
  }), G = computed(() => {
    const e2 = { month: { prev: true, next: true }, year: { prev: true, next: true } };
    return null !== W.value && W.value.year >= w.value.year && (e2.year.prev = false, W.value.year === w.value.year && W.value.month >= w.value.month && (e2.month.prev = false)), null !== Y.value && Y.value.year <= w.value.year && (e2.year.next = false, Y.value.year === w.value.year && Y.value.month <= w.value.month && (e2.month.next = false)), e2;
  }), X = computed(() => {
    const e2 = {};
    return O.value.forEach((t2) => {
      const o2 = getMonthHash(t2);
      void 0 === e2[o2] && (e2[o2] = []), e2[o2].push(t2.day);
    }), e2;
  }), Z = computed(() => {
    const e2 = {};
    return A.value.forEach((t2) => {
      const o2 = getMonthHash(t2.from), n2 = getMonthHash(t2.to);
      if (void 0 === e2[o2] && (e2[o2] = []), e2[o2].push({ from: t2.from.day, to: o2 === n2 ? t2.to.day : void 0, range: t2 }), o2 < n2) {
        let o3;
        const { year: a2, month: l2 } = t2.from, i2 = l2 < 12 ? { year: a2, month: l2 + 1 } : { year: a2 + 1, month: 1 };
        while ((o3 = getMonthHash(i2)) <= n2)
          void 0 === e2[o3] && (e2[o3] = []), e2[o3].push({ from: void 0, to: o3 === n2 ? t2.to.day : void 0, range: t2 }), i2.month++, i2.month > 12 && (i2.year++, i2.month = 1);
      }
    }), e2;
  }), J = computed(() => {
    if (null === P.value)
      return;
    const { init: e2, initHash: t2, final: o2, finalHash: n2 } = P.value, [a2, l2] = t2 <= n2 ? [e2, o2] : [o2, e2], i2 = getMonthHash(a2), r2 = getMonthHash(l2);
    if (i2 !== ee.value && r2 !== ee.value)
      return;
    const s2 = {};
    return i2 === ee.value ? (s2.from = a2.day, s2.includeFrom = true) : s2.from = 1, r2 === ee.value ? (s2.to = l2.day, s2.includeTo = true) : s2.to = U.value, s2;
  }), ee = computed(() => getMonthHash(w.value)), te = computed(() => {
    const t2 = {};
    if (void 0 === e.options) {
      for (let e2 = 1; e2 <= U.value; e2++)
        t2[e2] = true;
      return t2;
    }
    const o2 = "function" === typeof e.options ? e.options : (t3) => e.options.includes(t3);
    for (let e2 = 1; e2 <= U.value; e2++) {
      const n2 = ee.value + "/" + pad(e2);
      t2[e2] = o2(n2);
    }
    return t2;
  }), oe = computed(() => {
    const t2 = {};
    if (void 0 === e.events)
      for (let e2 = 1; e2 <= U.value; e2++)
        t2[e2] = false;
    else {
      const o2 = "function" === typeof e.events ? e.events : (t3) => e.events.includes(t3);
      for (let e2 = 1; e2 <= U.value; e2++) {
        const n2 = ee.value + "/" + pad(e2);
        t2[e2] = true === o2(n2) && K.value(n2);
      }
    }
    return t2;
  }), ne = computed(() => {
    let t2, o2;
    const { year: n2, month: a2 } = w.value;
    if ("persian" !== e.calendar)
      t2 = new Date(n2, a2 - 1, 1), o2 = new Date(n2, a2 - 1, 0).getDate();
    else {
      const e2 = toGregorian(n2, a2, 1);
      t2 = new Date(e2.gy, e2.gm - 1, e2.gd);
      let l2 = a2 - 1, i2 = n2;
      0 === l2 && (l2 = 12, i2--), o2 = jalaaliMonthLength(i2, l2);
    }
    return { days: t2.getDay() - H.value - 1, endDay: o2 };
  }), ae = computed(() => {
    const e2 = [], { days: t2, endDay: o2 } = ne.value, n2 = t2 < 0 ? t2 + 7 : t2;
    if (n2 < 6)
      for (let i2 = o2 - n2; i2 <= o2; i2++)
        e2.push({ i: i2, fill: true });
    const a2 = e2.length;
    for (let i2 = 1; i2 <= U.value; i2++) {
      const t3 = { i: i2, event: oe.value[i2], classes: [] };
      true === te.value[i2] && (t3.in = true, t3.flat = true), e2.push(t3);
    }
    if (void 0 !== X.value[ee.value] && X.value[ee.value].forEach((t3) => {
      const o3 = a2 + t3 - 1;
      Object.assign(e2[o3], { selected: true, unelevated: true, flat: false, color: M.value, textColor: B.value });
    }), void 0 !== Z.value[ee.value] && Z.value[ee.value].forEach((t3) => {
      if (void 0 !== t3.from) {
        const o3 = a2 + t3.from - 1, n3 = a2 + (t3.to || U.value) - 1;
        for (let a3 = o3; a3 <= n3; a3++)
          Object.assign(e2[a3], { range: t3.range, unelevated: true, color: M.value, textColor: B.value });
        Object.assign(e2[o3], { rangeFrom: true, flat: false }), void 0 !== t3.to && Object.assign(e2[n3], { rangeTo: true, flat: false });
      } else if (void 0 !== t3.to) {
        const o3 = a2 + t3.to - 1;
        for (let n3 = a2; n3 <= o3; n3++)
          Object.assign(e2[n3], { range: t3.range, unelevated: true, color: M.value, textColor: B.value });
        Object.assign(e2[o3], { flat: false, rangeTo: true });
      } else {
        const o3 = a2 + U.value - 1;
        for (let n3 = a2; n3 <= o3; n3++)
          Object.assign(e2[n3], { range: t3.range, unelevated: true, color: M.value, textColor: B.value });
      }
    }), void 0 !== J.value) {
      const t3 = a2 + J.value.from - 1, o3 = a2 + J.value.to - 1;
      for (let n3 = t3; n3 <= o3; n3++)
        e2[n3].color = M.value, e2[n3].editRange = true;
      true === J.value.includeFrom && (e2[t3].editRangeFrom = true), true === J.value.includeTo && (e2[o3].editRangeTo = true);
    }
    w.value.year === S.value.year && w.value.month === S.value.month && (e2[a2 + S.value.day - 1].today = true);
    const l2 = e2.length % 7;
    if (l2 > 0) {
      const t3 = 7 - l2;
      for (let o3 = 1; o3 <= t3; o3++)
        e2.push({ i: o3, fill: true });
    }
    return e2.forEach((e3) => {
      let t3 = "q-date__calendar-item ";
      true === e3.fill ? t3 += "q-date__calendar-item--fill" : (t3 += `q-date__calendar-item--${true === e3.in ? "in" : "out"}`, void 0 !== e3.range && (t3 += ` q-date__range${true === e3.rangeTo ? "-to" : true === e3.rangeFrom ? "-from" : ""}`), true === e3.editRange && (t3 += ` q-date__edit-range${true === e3.editRangeFrom ? "-from" : ""}${true === e3.editRangeTo ? "-to" : ""}`), void 0 === e3.range && true !== e3.editRange || (t3 += ` text-${e3.color}`)), e3.classes = t3;
    }), e2;
  }), le = computed(() => true === e.disable ? { "aria-disabled": "true" } : true === e.readonly ? { "aria-readonly": "true" } : {});
  function ie() {
    const e2 = S.value, t2 = X.value[getMonthHash(e2)];
    void 0 !== t2 && false !== t2.includes(e2.day) || qe(e2), ue(e2.year, e2.month);
  }
  function re(e2) {
    true === viewIsValid(e2) && (C.value = e2);
  }
  function se(e2, t2) {
    if (["month", "year"].includes(e2)) {
      const o2 = "month" === e2 ? fe : he;
      o2(true === t2 ? -1 : 1);
    }
  }
  function ue(e2, t2) {
    C.value = "Calendar", we(e2, t2);
  }
  function ce(t2, o2) {
    if (false === e.range || !t2)
      return void (P.value = null);
    const n2 = Object.assign({ ...w.value }, t2), a2 = void 0 !== o2 ? Object.assign({ ...w.value }, o2) : n2;
    P.value = { init: n2, initHash: getDayHash(n2), final: a2, finalHash: getDayHash(a2) }, ue(n2.year, n2.month);
  }
  function de() {
    return "persian" === e.calendar ? "YYYY/MM/DD" : e.mask;
  }
  function pe(t2, o2, n2) {
    return __splitDate(t2, o2, n2, e.calendar, { hour: 0, minute: 0, second: 0, millisecond: 0 });
  }
  function ve(t2, o2) {
    const n2 = true === Array.isArray(e.modelValue) ? e.modelValue : e.modelValue ? [e.modelValue] : [];
    if (0 === n2.length)
      return me();
    const a2 = n2[n2.length - 1], l2 = pe(void 0 !== a2.from ? a2.from : a2, t2, o2);
    return null === l2.dateHash ? me() : l2;
  }
  function me() {
    let t2, o2;
    if (void 0 !== e.defaultYearMonth) {
      const n2 = e.defaultYearMonth.split("/");
      t2 = parseInt(n2[0], 10), o2 = parseInt(n2[1], 10);
    } else {
      const e2 = void 0 !== S.value ? S.value : c();
      t2 = e2.year, o2 = e2.month;
    }
    return { year: t2, month: o2, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0, dateHash: t2 + "/" + pad(o2) + "/01" };
  }
  function fe(e2) {
    let t2 = w.value.year, o2 = Number(w.value.month) + e2;
    13 === o2 ? (o2 = 1, t2++) : 0 === o2 && (o2 = 12, t2--), we(t2, o2), true === Q.value && xe("month");
  }
  function he(e2) {
    const t2 = Number(w.value.year) + e2;
    we(t2, w.value.month), true === Q.value && xe("year");
  }
  function ge(t2) {
    we(t2, w.value.month), C.value = "Years" === e.defaultView ? "Months" : "Calendar", true === Q.value && xe("year");
  }
  function be(e2) {
    we(w.value.year, e2), C.value = "Calendar", true === Q.value && xe("month");
  }
  function ye(e2, t2) {
    const o2 = X.value[t2], n2 = void 0 !== o2 && true === o2.includes(e2.day) ? Te : qe;
    n2(e2);
  }
  function Se(e2) {
    return { year: e2.year, month: e2.month, day: e2.day };
  }
  function we(e2, t2) {
    null !== W.value && e2 <= W.value.year && (e2 = W.value.year, t2 < W.value.month && (t2 = W.value.month)), null !== Y.value && e2 >= Y.value.year && (e2 = Y.value.year, t2 > Y.value.month && (t2 = Y.value.month));
    const o2 = e2 + "/" + pad(t2) + "/01";
    o2 !== w.value.dateHash && (k.value = w.value.dateHash < o2 === (true !== a.lang.rtl) ? "left" : "right", e2 !== w.value.year && (_.value = k.value), nextTick(() => {
      T.value = e2 - e2 % yearsInterval - (e2 < 0 ? yearsInterval : 0), Object.assign(w.value, { year: e2, month: t2, day: 1, dateHash: o2 });
    }));
  }
  function Ce(t2, n2, a2) {
    const l2 = null !== t2 && 1 === t2.length && false === e.multiple ? t2[0] : t2;
    d = l2;
    const { reason: i2, details: r2 } = ke(n2, a2);
    o("update:modelValue", l2, i2, r2);
  }
  function xe(t2) {
    const n2 = void 0 !== O.value[0] && null !== O.value[0].dateHash ? { ...O.value[0] } : { ...w.value };
    nextTick(() => {
      n2.year = w.value.year, n2.month = w.value.month;
      const a2 = "persian" !== e.calendar ? new Date(n2.year, n2.month, 0).getDate() : jalaaliMonthLength(n2.year, n2.month);
      n2.day = Math.min(Math.max(1, n2.day), a2);
      const l2 = _e(n2);
      d = l2;
      const { details: i2 } = ke("", n2);
      o("update:modelValue", l2, t2, i2);
    });
  }
  function ke(e2, t2) {
    return void 0 !== t2.from ? { reason: `${e2}-range`, details: { ...Se(t2.target), from: Se(t2.from), to: Se(t2.to) } } : { reason: `${e2}-day`, details: Se(t2) };
  }
  function _e(e2, t2, o2) {
    return void 0 !== e2.from ? { from: R.value(e2.from, t2, o2), to: R.value(e2.to, t2, o2) } : R.value(e2, t2, o2);
  }
  function qe(t2) {
    let o2;
    if (true === e.multiple)
      if (void 0 !== t2.from) {
        const e2 = getDayHash(t2.from), n2 = getDayHash(t2.to), a2 = O.value.filter((t3) => t3.dateHash < e2 || t3.dateHash > n2), l2 = A.value.filter(({ from: t3, to: o3 }) => o3.dateHash < e2 || t3.dateHash > n2);
        o2 = a2.concat(l2).concat(t2).map((e3) => _e(e3));
      } else {
        const e2 = E.value.slice();
        e2.push(_e(t2)), o2 = e2;
      }
    else
      o2 = _e(t2);
    Ce(o2, "add", t2);
  }
  function Te(t2) {
    if (true === e.noUnset)
      return;
    let o2 = null;
    if (true === e.multiple && true === Array.isArray(e.modelValue)) {
      const n2 = _e(t2);
      o2 = void 0 !== t2.from ? e.modelValue.filter((e2) => void 0 === e2.from || e2.from !== n2.from && e2.to !== n2.to) : e.modelValue.filter((e2) => e2 !== n2), 0 === o2.length && (o2 = null);
    }
    Ce(o2, "remove", t2);
  }
  function Pe(t2, n2, a2) {
    const l2 = O.value.concat(A.value).map((e2) => _e(e2, t2, n2)).filter((e2) => {
      return void 0 !== e2.from ? null !== e2.from.dateHash && null !== e2.to.dateHash : null !== e2.dateHash;
    });
    o("update:modelValue", (true === e.multiple ? l2 : l2[0]) || null, a2);
  }
  function $e() {
    if (true !== e.minimal)
      return h("div", { class: "q-date__header " + s.value }, [h("div", { class: "relative-position" }, [h(Transition, { name: "q-transition--fade" }, () => h("div", { key: "h-yr-" + V.value, class: "q-date__header-subtitle q-date__header-link " + ("Years" === C.value ? "q-date__header-link--active" : "cursor-pointer"), tabindex: r.value, ...i("vY", { onClick() {
        C.value = "Years";
      }, onKeyup(e2) {
        13 === e2.keyCode && (C.value = "Years");
      } }) }, [V.value]))]), h("div", { class: "q-date__header-title relative-position flex no-wrap" }, [h("div", { class: "relative-position col" }, [h(Transition, { name: "q-transition--fade" }, () => h("div", { key: "h-sub" + z.value, class: "q-date__header-title-label q-date__header-link " + ("Calendar" === C.value ? "q-date__header-link--active" : "cursor-pointer"), tabindex: r.value, ...i("vC", { onClick() {
        C.value = "Calendar";
      }, onKeyup(e2) {
        13 === e2.keyCode && (C.value = "Calendar");
      } }) }, [z.value]))]), true === e.todayBtn ? h(QBtn, { class: "q-date__header-today self-start", icon: a.iconSet.datetime.today, flat: true, size: "sm", round: true, tabindex: r.value, onClick: ie }) : null])]);
  }
  function Me({ label: e2, type: t2, key: o2, dir: n2, goTo: a2, boundaries: l2, cls: s2 }) {
    return [h("div", { class: "row items-center q-date__arrow" }, [h(QBtn, { round: true, dense: true, size: "sm", flat: true, icon: N.value[0], tabindex: r.value, disable: false === l2.prev, ...i("go-#" + t2, { onClick() {
      a2(-1);
    } }) })]), h("div", { class: "relative-position overflow-hidden flex flex-center" + s2 }, [h(Transition, { name: "q-transition--jump-" + n2 }, () => h("div", { key: o2 }, [h(QBtn, { flat: true, dense: true, noCaps: true, label: e2, tabindex: r.value, ...i("view#" + t2, { onClick: () => {
      C.value = t2;
    } }) })]))]), h("div", { class: "row items-center q-date__arrow" }, [h(QBtn, { round: true, dense: true, size: "sm", flat: true, icon: N.value[1], tabindex: r.value, disable: false === l2.next, ...i("go+#" + t2, { onClick() {
      a2(1);
    } }) })])];
  }
  watch(() => e.modelValue, (e2) => {
    if (d === e2)
      d = 0;
    else {
      const { year: e3, month: t2 } = ve(f.value, g.value);
      we(e3, t2);
    }
  }), watch(C, () => {
    null !== m.value && m.value.focus();
  }), watch(() => w.value.year, (e2) => {
    o("navigation", { year: e2, month: w.value.month });
  }), watch(() => w.value.month, (e2) => {
    o("navigation", { year: w.value.year, month: e2 });
  }), watch(b, (e2) => {
    Pe(e2, g.value, "mask"), f.value = e2;
  }), watch(y, (e2) => {
    Pe(f.value, e2, "locale"), g.value = e2;
  });
  const Be = { Calendar: () => [h("div", { key: "calendar-view", class: "q-date__view q-date__calendar" }, [h("div", { class: "q-date__navigation row items-center no-wrap" }, Me({ label: g.value.months[w.value.month - 1], type: "Months", key: w.value.month, dir: k.value, goTo: fe, boundaries: G.value.month, cls: " col" }).concat(Me({ label: w.value.year, type: "Years", key: w.value.year, dir: _.value, goTo: he, boundaries: G.value.year, cls: "" }))), h("div", { class: "q-date__calendar-weekdays row items-center no-wrap" }, j.value.map((e2) => h("div", { class: "q-date__calendar-item" }, [h("div", e2)]))), h("div", { class: "q-date__calendar-days-container relative-position overflow-hidden" }, [h(Transition, { name: "q-transition--slide-" + k.value }, () => h("div", { key: ee.value, class: "q-date__calendar-days fit" }, ae.value.map((e2) => h("div", { class: e2.classes }, [true === e2.in ? h(QBtn, { class: true === e2.today ? "q-date__today" : "", dense: true, flat: e2.flat, unelevated: e2.unelevated, color: e2.color, textColor: e2.textColor, label: e2.i, tabindex: r.value, ...i("day#" + e2.i, { onClick: () => {
    Qe(e2.i);
  }, onMouseover: () => {
    Ee(e2.i);
  } }) }, false !== e2.event ? () => h("div", { class: "q-date__event bg-" + e2.event }) : null) : h("div", "" + e2.i)]))))])])], Months() {
    const t2 = w.value.year === S.value.year, o2 = (e2) => {
      return null !== W.value && w.value.year === W.value.year && W.value.month > e2 || null !== Y.value && w.value.year === Y.value.year && Y.value.month < e2;
    }, n2 = g.value.monthsShort.map((e2, n3) => {
      const a2 = w.value.month === n3 + 1;
      return h("div", { class: "q-date__months-item flex flex-center" }, [h(QBtn, { class: true === t2 && S.value.month === n3 + 1 ? "q-date__today" : null, flat: true !== a2, label: e2, unelevated: a2, color: true === a2 ? M.value : null, textColor: true === a2 ? B.value : null, tabindex: r.value, disable: o2(n3 + 1), ...i("month#" + n3, { onClick: () => {
        be(n3 + 1);
      } }) })]);
    });
    return true === e.yearsInMonthView && n2.unshift(h("div", { class: "row no-wrap full-width" }, [Me({ label: w.value.year, type: "Years", key: w.value.year, dir: _.value, goTo: he, boundaries: G.value.year, cls: " col" })])), h("div", { key: "months-view", class: "q-date__view q-date__months flex flex-center" }, n2);
  }, Years() {
    const e2 = T.value, t2 = e2 + yearsInterval, o2 = [], n2 = (e3) => {
      return null !== W.value && W.value.year > e3 || null !== Y.value && Y.value.year < e3;
    };
    for (let a2 = e2; a2 <= t2; a2++) {
      const e3 = w.value.year === a2;
      o2.push(h("div", { class: "q-date__years-item flex flex-center" }, [h(QBtn, { key: "yr" + a2, class: S.value.year === a2 ? "q-date__today" : null, flat: !e3, label: a2, dense: true, unelevated: e3, color: true === e3 ? M.value : null, textColor: true === e3 ? B.value : null, tabindex: r.value, disable: n2(a2), ...i("yr#" + a2, { onClick: () => {
        ge(a2);
      } }) })]));
    }
    return h("div", { class: "q-date__view q-date__years flex flex-center" }, [h("div", { class: "col-auto" }, [h(QBtn, { round: true, dense: true, flat: true, icon: N.value[0], tabindex: r.value, disable: n2(e2), ...i("y-", { onClick: () => {
      T.value -= yearsInterval;
    } }) })]), h("div", { class: "q-date__years-content col self-stretch row items-center" }, o2), h("div", { class: "col-auto" }, [h(QBtn, { round: true, dense: true, flat: true, icon: N.value[1], tabindex: r.value, disable: n2(t2), ...i("y+", { onClick: () => {
      T.value += yearsInterval;
    } }) })])]);
  } };
  function Qe(t2) {
    const n2 = { ...w.value, day: t2 };
    if (false !== e.range)
      if (null === P.value) {
        const a2 = ae.value.find((e2) => true !== e2.fill && e2.i === t2);
        if (true !== e.noUnset && void 0 !== a2.range)
          return void Te({ target: n2, from: a2.range.from, to: a2.range.to });
        if (true === a2.selected)
          return void Te(n2);
        const l2 = getDayHash(n2);
        P.value = { init: n2, initHash: l2, final: n2, finalHash: l2 }, o("range-start", Se(n2));
      } else {
        const e2 = P.value.initHash, t3 = getDayHash(n2), a2 = e2 <= t3 ? { from: P.value.init, to: n2 } : { from: n2, to: P.value.init };
        P.value = null, qe(e2 === t3 ? n2 : { target: n2, ...a2 }), o("range-end", { from: Se(a2.from), to: Se(a2.to) });
      }
    else
      ye(n2, ee.value);
  }
  function Ee(e2) {
    if (null !== P.value) {
      const t2 = { ...w.value, day: e2 };
      Object.assign(P.value, { final: t2, finalHash: getDayHash(t2) });
    }
  }
  return Object.assign(n, { setToday: ie, setView: re, offsetCalendar: se, setCalendarTo: ue, setEditingRange: ce }), () => {
    const o2 = [h("div", { class: "q-date__content col relative-position" }, [h(Transition, { name: "q-transition--fade" }, Be[C.value])])], n2 = hSlot(t.default);
    return void 0 !== n2 && o2.push(h("div", { class: "q-date__actions" }, n2)), void 0 !== e.name && true !== e.disable && v(o2, "push"), h("div", { class: $.value, ...le.value }, [$e(), h("div", { ref: m, class: "q-date__main col column", tabindex: -1 }, o2)]);
  };
} });
function useHistory(e, t, o) {
  function a() {
  }
  return onBeforeUnmount(() => {
    true === e.value && a();
  }), { removeFromHistory: a, addToHistory() {
  } };
}
let scrollPositionX, scrollPositionY, maxScrollTop, bodyLeft, bodyTop, closeTimer, registered = 0, vpPendingUpdate = false;
function onWheel(e) {
  shouldPreventScroll(e) && stopAndPrevent(e);
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop"))
    return true;
  const t = getEventPath(e), o = e.shiftKey && !e.deltaX, n = !o && Math.abs(e.deltaX) <= Math.abs(e.deltaY), a = o || n ? e.deltaY : e.deltaX;
  for (let l = 0; l < t.length; l++) {
    const e2 = t[l];
    if (hasScrollbar(e2, n))
      return n ? a < 0 && 0 === e2.scrollTop || a > 0 && e2.scrollTop + e2.clientHeight === e2.scrollHeight : a < 0 && 0 === e2.scrollLeft || a > 0 && e2.scrollLeft + e2.clientWidth === e2.scrollWidth;
  }
  return true;
}
function onAppleScroll(e) {
  e.target === document && (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function onAppleResize(e) {
  true !== vpPendingUpdate && (vpPendingUpdate = true, requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height: t } = e.target, { clientHeight: o, scrollTop: n } = document.scrollingElement;
    void 0 !== maxScrollTop && t === window.innerHeight || (maxScrollTop = o - t, document.scrollingElement.scrollTop = n), n > maxScrollTop && (document.scrollingElement.scrollTop -= Math.ceil((n - maxScrollTop) / 8));
  }));
}
function apply$1(e) {
  const t = document.body, o = void 0 !== window.visualViewport;
  if ("add" === e) {
    const { overflowY: e2, overflowX: n } = window.getComputedStyle(t);
    scrollPositionX = getHorizontalScrollPosition(window), scrollPositionY = getVerticalScrollPosition(window), bodyLeft = t.style.left, bodyTop = t.style.top, t.style.left = `-${scrollPositionX}px`, t.style.top = `-${scrollPositionY}px`, "hidden" !== n && ("scroll" === n || t.scrollWidth > window.innerWidth) && t.classList.add("q-body--force-scrollbar-x"), "hidden" !== e2 && ("scroll" === e2 || t.scrollHeight > window.innerHeight) && t.classList.add("q-body--force-scrollbar-y"), t.classList.add("q-body--prevent-scroll"), document.qScrollPrevented = true, true === client.is.ios && (true === o ? (window.scrollTo(0, 0), window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture), window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture), window.scrollTo(0, 0)) : window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture));
  }
  true === client.is.desktop && true === client.is.mac && window[`${e}EventListener`]("wheel", onWheel, listenOpts.notPassive), "remove" === e && (true === client.is.ios && (true === o ? (window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture), window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture)) : window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture)), t.classList.remove("q-body--prevent-scroll"), t.classList.remove("q-body--force-scrollbar-x"), t.classList.remove("q-body--force-scrollbar-y"), document.qScrollPrevented = false, t.style.left = bodyLeft, t.style.top = bodyTop, window.scrollTo(scrollPositionX, scrollPositionY), maxScrollTop = void 0);
}
function preventScroll(e) {
  let t = "add";
  if (true === e) {
    if (registered++, void 0 !== closeTimer)
      return clearTimeout(closeTimer), void (closeTimer = void 0);
    if (registered > 1)
      return;
  } else {
    if (0 === registered)
      return;
    if (registered--, registered > 0)
      return;
    if (t = "remove", true === client.is.ios && true === client.is.nativeMobile)
      return clearTimeout(closeTimer), void (closeTimer = setTimeout(() => {
        apply$1(t), closeTimer = void 0;
      }, 100));
  }
  apply$1(t);
}
function usePreventScroll() {
  let e;
  return { preventBodyScroll(t) {
    t === e || void 0 === e && true !== t || (e = t, preventScroll(t));
  } };
}
let maximizedModals = 0;
const positionClass$1 = { standard: "fixed-full flex-center", top: "fixed-top justify-center", bottom: "fixed-bottom justify-center", right: "fixed-right items-center", left: "fixed-left items-center" }, transitions = { standard: ["scale", "scale"], top: ["slide-down", "slide-up"], bottom: ["slide-up", "slide-down"], right: ["slide-left", "slide-right"], left: ["slide-right", "slide-left"] };
var QDialog = createComponent({ name: "QDialog", inheritAttrs: false, props: { ...useModelToggleProps, ...useTransitionProps, transitionShow: String, transitionHide: String, persistent: Boolean, autoClose: Boolean, allowFocusOutside: Boolean, noEscDismiss: Boolean, noBackdropDismiss: Boolean, noRouteDismiss: Boolean, noRefocus: Boolean, noFocus: Boolean, noShake: Boolean, seamless: Boolean, maximized: Boolean, fullWidth: Boolean, fullHeight: Boolean, square: Boolean, position: { type: String, default: "standard", validator: (e) => "standard" === e || ["top", "bottom", "left", "right"].includes(e) } }, emits: [...useModelToggleEmits, "shake", "click", "escape-key"], setup(e, { slots: t, emit: o, attrs: n }) {
  const a = getCurrentInstance(), l = ref(null), i = ref(false), r = ref(false), s = ref(false);
  let u, c, d, p2 = null;
  const v = computed(() => true !== e.persistent && true !== e.noRouteDismiss && true !== e.seamless), { preventBodyScroll: m } = usePreventScroll(), { registerTimeout: f } = useTimeout(), { registerTick: g, removeTick: b } = useTick(), { showPortal: y, hidePortal: S, portalIsAccessible: w, renderPortal: C } = usePortal(a, l, H, true), { hide: x } = useModelToggle({ showing: i, hideOnRouteChange: v, handleShow: O, handleHide: A, processOnMount: true }), { addToHistory: k, removeFromHistory: _ } = useHistory(i), q = computed(() => `q-dialog__inner flex no-pointer-events q-dialog__inner--${true === e.maximized ? "maximized" : "minimized"} q-dialog__inner--${e.position} ${positionClass$1[e.position]}` + (true === s.value ? " q-dialog__inner--animating" : "") + (true === e.fullWidth ? " q-dialog__inner--fullwidth" : "") + (true === e.fullHeight ? " q-dialog__inner--fullheight" : "") + (true === e.square ? " q-dialog__inner--square" : "")), T = computed(() => "q-transition--" + (void 0 === e.transitionShow ? transitions[e.position][0] : e.transitionShow)), P = computed(() => "q-transition--" + (void 0 === e.transitionHide ? transitions[e.position][1] : e.transitionHide)), $ = computed(() => true === r.value ? P.value : T.value), M = computed(() => `--q-transition-duration: ${e.transitionDuration}ms`), B = computed(() => true === i.value && true !== e.seamless), Q = computed(() => true === e.autoClose ? { onClick: I } : {}), E = computed(() => [`q-dialog fullscreen no-pointer-events q-dialog--${true === B.value ? "modal" : "seamless"}`, n.class]);
  function O(t2) {
    k(), p2 = false === e.noRefocus && null !== document.activeElement ? document.activeElement : null, F(e.maximized), y(), s.value = true, true !== e.noFocus ? (null !== document.activeElement && document.activeElement.blur(), g(L)) : b(), f(() => {
      if (true === a.proxy.$q.platform.is.ios) {
        if (true !== e.seamless && document.activeElement) {
          const { top: e2, bottom: t3 } = document.activeElement.getBoundingClientRect(), { innerHeight: o2 } = window, n2 = void 0 !== window.visualViewport ? window.visualViewport.height : o2;
          e2 > 0 && t3 > n2 / 2 && (document.scrollingElement.scrollTop = Math.min(document.scrollingElement.scrollHeight - n2, t3 >= o2 ? 1 / 0 : Math.ceil(document.scrollingElement.scrollTop + t3 - n2 / 2))), document.activeElement.scrollIntoView();
        }
        d = true, l.value.click(), d = false;
      }
      y(true), s.value = false, o("show", t2);
    }, e.transitionDuration);
  }
  function A(t2) {
    b(), _(), z(true), s.value = true, S(), null !== p2 && (p2.focus(), p2 = null), f(() => {
      S(true), s.value = false, o("hide", t2);
    }, e.transitionDuration);
  }
  function L(e2) {
    addFocusFn(() => {
      let t2 = l.value;
      null !== t2 && true !== t2.contains(document.activeElement) && (t2 = t2.querySelector(e2 || "[autofocus], [data-autofocus]") || t2, t2.focus({ preventScroll: true }));
    });
  }
  function R() {
    L(), o("shake");
    const e2 = l.value;
    null !== e2 && (e2.classList.remove("q-animate--scale"), e2.classList.add("q-animate--scale"), clearTimeout(u), u = setTimeout(() => {
      null !== l.value && (e2.classList.remove("q-animate--scale"), L());
    }, 170));
  }
  function D() {
    true !== e.seamless && (true === e.persistent || true === e.noEscDismiss ? true !== e.maximized && true !== e.noShake && R() : (o("escape-key"), x()));
  }
  function z(t2) {
    clearTimeout(u), true !== t2 && true !== i.value || (F(false), true !== e.seamless && (m(false), removeFocusout(N), removeEscapeKey(D))), true !== t2 && (p2 = null);
  }
  function F(e2) {
    true === e2 ? true !== c && (maximizedModals < 1 && document.body.classList.add("q-body--dialog"), maximizedModals++, c = true) : true === c && (maximizedModals < 2 && document.body.classList.remove("q-body--dialog"), maximizedModals--, c = false);
  }
  function I(e2) {
    true !== d && (x(e2), o("click", e2));
  }
  function V(t2) {
    true !== e.persistent && true !== e.noBackdropDismiss ? x(t2) : true !== e.noShake && R();
  }
  function N(t2) {
    true !== e.allowFocusOutside && true === w.value && true !== childHasFocus(l.value, t2.target) && L('[tabindex]:not([tabindex="-1"])');
  }
  function H() {
    return h("div", { "aria-modal": "true", ...n, class: E.value }, [h(Transition, { name: "q-transition--fade", appear: true }, () => true === B.value ? h("div", { class: "q-dialog__backdrop fixed-full", style: M.value, "aria-hidden": "true", onMousedown: V }) : null), h(Transition, { name: $.value, appear: true }, () => true === i.value ? h("div", { ref: l, class: q.value, style: M.value, tabindex: -1, ...Q.value }, hSlot(t.default)) : null)]);
  }
  return watch(i, (e2) => {
    nextTick(() => {
      r.value = e2;
    });
  }), watch(() => e.maximized, (e2) => {
    true === i.value && F(e2);
  }), watch(B, (e2) => {
    m(e2), true === e2 ? (addFocusout(N), addEscapeKey(D)) : (removeFocusout(N), removeEscapeKey(D));
  }), Object.assign(a.proxy, { focus: L, shake: R, __updateRefocusTarget(e2) {
    p2 = e2 || null;
  } }), onBeforeUnmount(z), C;
} });
const duration = 150;
var QDrawer = createComponent({ name: "QDrawer", inheritAttrs: false, props: { ...useModelToggleProps, ...useDarkProps, side: { type: String, default: "left", validator: (e) => ["left", "right"].includes(e) }, width: { type: Number, default: 300 }, mini: Boolean, miniToOverlay: Boolean, miniWidth: { type: Number, default: 57 }, breakpoint: { type: Number, default: 1023 }, showIfAbove: Boolean, behavior: { type: String, validator: (e) => ["default", "desktop", "mobile"].includes(e), default: "default" }, bordered: Boolean, elevated: Boolean, overlay: Boolean, persistent: Boolean, noSwipeOpen: Boolean, noSwipeClose: Boolean, noSwipeBackdrop: Boolean }, emits: [...useModelToggleEmits, "on-layout", "mini-state"], setup(e, { slots: t, emit: o, attrs: n }) {
  const a = getCurrentInstance(), { proxy: { $q: l } } = a, i = useDark(e, l), { preventBodyScroll: r } = usePreventScroll(), { registerTimeout: s, removeTimeout: u } = useTimeout(), c = inject(layoutKey, () => {
    console.error("QDrawer needs to be child of QLayout");
  });
  let d, p2, v;
  const m = ref("mobile" === e.behavior || "desktop" !== e.behavior && c.totalWidth.value <= e.breakpoint), f = computed(() => true === e.mini && true !== m.value), g = computed(() => true === f.value ? e.miniWidth : e.width), b = ref(true === e.showIfAbove && false === m.value || true === e.modelValue), y = computed(() => true !== e.persistent && (true === m.value || true === R.value));
  function S(e2, t2) {
    if (k(), false !== e2 && c.animate(), G(0), true === m.value) {
      const e3 = c.instances[E.value];
      void 0 !== e3 && true === e3.belowBreakpoint && e3.hide(false), X(1), true !== c.isContainer.value && r(true);
    } else
      X(0), false !== e2 && Z(false);
    s(() => {
      false !== e2 && Z(true), true !== t2 && o("show", e2);
    }, duration);
  }
  function w(e2, t2) {
    _(), false !== e2 && c.animate(), X(0), G(P.value * g.value), oe(), true !== t2 ? s(() => {
      o("hide", e2);
    }, duration) : u();
  }
  const { show: C, hide: x } = useModelToggle({ showing: b, hideOnRouteChange: y, handleShow: S, handleHide: w }), { addToHistory: k, removeFromHistory: _ } = useHistory(b), q = { belowBreakpoint: m, hide: x }, T = computed(() => "right" === e.side), P = computed(() => (true === l.lang.rtl ? -1 : 1) * (true === T.value ? 1 : -1)), $ = ref(0), M = ref(false), B = ref(false), Q = ref(g.value * P.value), E = computed(() => true === T.value ? "left" : "right"), O = computed(() => true === b.value && false === m.value && false === e.overlay ? true === e.miniToOverlay ? e.miniWidth : g.value : 0), A = computed(() => true === e.overlay || true === e.miniToOverlay || c.view.value.indexOf(T.value ? "R" : "L") > -1 || true === l.platform.is.ios && true === c.isContainer.value), L = computed(() => false === e.overlay && true === b.value && false === m.value), R = computed(() => true === e.overlay && true === b.value && false === m.value), D = computed(() => "fullscreen q-drawer__backdrop" + (false === b.value && false === M.value ? " hidden" : "")), z = computed(() => ({ backgroundColor: `rgba(0,0,0,${0.4 * $.value})` })), F = computed(() => true === T.value ? "r" === c.rows.value.top[2] : "l" === c.rows.value.top[0]), I = computed(() => true === T.value ? "r" === c.rows.value.bottom[2] : "l" === c.rows.value.bottom[0]), V = computed(() => {
    const e2 = {};
    return true === c.header.space && false === F.value && (true === A.value ? e2.top = `${c.header.offset}px` : true === c.header.space && (e2.top = `${c.header.size}px`)), true === c.footer.space && false === I.value && (true === A.value ? e2.bottom = `${c.footer.offset}px` : true === c.footer.space && (e2.bottom = `${c.footer.size}px`)), e2;
  }), N = computed(() => {
    const e2 = { width: `${g.value}px`, transform: `translateX(${Q.value}px)` };
    return true === m.value ? e2 : Object.assign(e2, V.value);
  }), H = computed(() => "q-drawer__content fit " + (true !== c.isContainer.value ? "scroll" : "overflow-auto")), j = computed(() => `q-drawer q-drawer--${e.side}` + (true === B.value ? " q-drawer--mini-animate" : "") + (true === e.bordered ? " q-drawer--bordered" : "") + (true === i.value ? " q-drawer--dark q-dark" : "") + (true === M.value ? " no-transition" : true === b.value ? "" : " q-layout--prevent-focus") + (true === m.value ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${true === f.value ? "mini" : "standard"}` + (true === A.value || true !== L.value ? " fixed" : "") + (true === e.overlay || true === e.miniToOverlay ? " q-drawer--on-top" : "") + (true === F.value ? " q-drawer--top-padding" : ""))), U = computed(() => {
    const t2 = true === l.lang.rtl ? e.side : E.value;
    return [[TouchPan, ee, void 0, { [t2]: true, mouse: true }]];
  }), K = computed(() => {
    const t2 = true === l.lang.rtl ? E.value : e.side;
    return [[TouchPan, te, void 0, { [t2]: true, mouse: true }]];
  }), W = computed(() => {
    const t2 = true === l.lang.rtl ? E.value : e.side;
    return [[TouchPan, te, void 0, { [t2]: true, mouse: true, mouseAllDir: true }]];
  });
  function Y() {
    ae(m, "mobile" === e.behavior || "desktop" !== e.behavior && c.totalWidth.value <= e.breakpoint);
  }
  function G(e2) {
    void 0 === e2 ? nextTick(() => {
      e2 = true === b.value ? 0 : g.value, G(P.value * e2);
    }) : (true !== c.isContainer.value || true !== T.value || true !== m.value && Math.abs(e2) !== g.value || (e2 += P.value * c.scrollbarWidth.value), Q.value = e2);
  }
  function X(e2) {
    $.value = e2;
  }
  function Z(e2) {
    const t2 = true === e2 ? "remove" : true !== c.isContainer.value ? "add" : "";
    "" !== t2 && document.body.classList[t2]("q-body--drawer-toggle");
  }
  function J() {
    clearTimeout(p2), a.proxy && a.proxy.$el && a.proxy.$el.classList.add("q-drawer--mini-animate"), B.value = true, p2 = setTimeout(() => {
      B.value = false, a && a.proxy && a.proxy.$el && a.proxy.$el.classList.remove("q-drawer--mini-animate");
    }, 150);
  }
  function ee(e2) {
    if (false !== b.value)
      return;
    const t2 = g.value, o2 = between(e2.distance.x, 0, t2);
    if (true === e2.isFinal) {
      const e3 = o2 >= Math.min(75, t2);
      return true === e3 ? C() : (c.animate(), X(0), G(P.value * t2)), void (M.value = false);
    }
    G((true === l.lang.rtl ? true !== T.value : T.value) ? Math.max(t2 - o2, 0) : Math.min(0, o2 - t2)), X(between(o2 / t2, 0, 1)), true === e2.isFirst && (M.value = true);
  }
  function te(t2) {
    if (true !== b.value)
      return;
    const o2 = g.value, n2 = t2.direction === e.side, a2 = (true === l.lang.rtl ? true !== n2 : n2) ? between(t2.distance.x, 0, o2) : 0;
    if (true === t2.isFinal) {
      const e2 = Math.abs(a2) < Math.min(75, o2);
      return true === e2 ? (c.animate(), X(1), G(0)) : x(), void (M.value = false);
    }
    G(P.value * a2), X(between(1 - a2 / o2, 0, 1)), true === t2.isFirst && (M.value = true);
  }
  function oe() {
    r(false), Z(true);
  }
  function ne(t2, o2) {
    c.update(e.side, t2, o2);
  }
  function ae(e2, t2) {
    e2.value !== t2 && (e2.value = t2);
  }
  function le(t2, o2) {
    ne("size", true === t2 ? e.miniWidth : o2);
  }
  return watch(m, (t2) => {
    true === t2 ? (d = b.value, true === b.value && x(false)) : false === e.overlay && "mobile" !== e.behavior && false !== d && (true === b.value ? (G(0), X(0), oe()) : C(false));
  }), watch(() => e.side, (e2, t2) => {
    c.instances[t2] === q && (c.instances[t2] = void 0, c[t2].space = false, c[t2].offset = 0), c.instances[e2] = q, c[e2].size = g.value, c[e2].space = L.value, c[e2].offset = O.value;
  }), watch(c.totalWidth, () => {
    true !== c.isContainer.value && true === document.qScrollPrevented || Y();
  }), watch(() => e.behavior + e.breakpoint, Y), watch(c.isContainer, (e2) => {
    true === b.value && r(true !== e2), true === e2 && Y();
  }), watch(c.scrollbarWidth, () => {
    G(true === b.value ? 0 : void 0);
  }), watch(O, (e2) => {
    ne("offset", e2);
  }), watch(L, (e2) => {
    o("on-layout", e2), ne("space", e2);
  }), watch(T, () => {
    G();
  }), watch(g, (t2) => {
    G(), le(e.miniToOverlay, t2);
  }), watch(() => e.miniToOverlay, (e2) => {
    le(e2, g.value);
  }), watch(() => l.lang.rtl, () => {
    G();
  }), watch(() => e.mini, () => {
    true === e.modelValue && (J(), c.animate());
  }), watch(f, (e2) => {
    o("mini-state", e2);
  }), c.instances[e.side] = q, le(e.miniToOverlay, g.value), ne("space", L.value), ne("offset", O.value), true === e.showIfAbove && true !== e.modelValue && true === b.value && void 0 !== e["onUpdate:modelValue"] && o("update:modelValue", true), onMounted(() => {
    o("on-layout", L.value), o("mini-state", f.value), d = true === e.showIfAbove;
    const t2 = () => {
      const e2 = true === b.value ? S : w;
      e2(false, true);
    };
    0 === c.totalWidth.value ? v = watch(c.totalWidth, () => {
      v(), v = void 0, false === b.value && true === e.showIfAbove && false === m.value ? C(false) : t2();
    }) : nextTick(t2);
  }), onBeforeUnmount(() => {
    void 0 !== v && v(), clearTimeout(p2), true === b.value && oe(), c.instances[e.side] === q && (c.instances[e.side] = void 0, ne("size", 0), ne("offset", 0), ne("space", false));
  }), () => {
    const o2 = [];
    true === m.value && (false === e.noSwipeOpen && o2.push(withDirectives(h("div", { key: "open", class: `q-drawer__opener fixed-${e.side}`, "aria-hidden": "true" }), U.value)), o2.push(hDir("div", { ref: "backdrop", class: D.value, style: z.value, "aria-hidden": "true", onClick: x }, void 0, "backdrop", true !== e.noSwipeBackdrop && true === b.value, () => W.value)));
    const a2 = true === f.value && void 0 !== t.mini, l2 = [h("div", { ...n, key: "" + a2, class: [H.value, n.class] }, true === a2 ? t.mini() : hSlot(t.default))];
    return true === e.elevated && true === b.value && l2.push(h("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), o2.push(hDir("aside", { ref: "content", class: j.value, style: N.value }, l2, "contentclose", true !== e.noSwipeClose && true === m.value, () => K.value)), h("div", { class: "q-drawer-container" }, o2);
  };
} });
function getBlockElement(e, t) {
  if (t && e === t)
    return null;
  const o = e.nodeName.toLowerCase();
  if (true === ["div", "li", "ul", "ol", "blockquote"].includes(o))
    return e;
  const n = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle, a = n.display;
  return "block" === a || "table" === a ? e : getBlockElement(e.parentNode);
}
function isChildOf(e, t, o) {
  return !(!e || e === document.body) && (true === o && e === t || (t === document ? document.body : t).contains(e.parentNode));
}
function createRange(e, t, o) {
  if (o || (o = document.createRange(), o.selectNode(e), o.setStart(e, 0)), 0 === t.count)
    o.setEnd(e, t.count);
  else if (t.count > 0)
    if (e.nodeType === Node.TEXT_NODE)
      e.textContent.length < t.count ? t.count -= e.textContent.length : (o.setEnd(e, t.count), t.count = 0);
    else
      for (let n = 0; 0 !== t.count && n < e.childNodes.length; n++)
        o = createRange(e.childNodes[n], t, o);
  return o;
}
const urlRegex = /^https?:\/\//;
class Caret {
  constructor(e, t) {
    this.el = e, this.eVm = t, this._range = null;
  }
  get selection() {
    if (this.el) {
      const e = document.getSelection();
      if (isChildOf(e.anchorNode, this.el, true) && isChildOf(e.focusNode, this.el, true))
        return e;
    }
    return null;
  }
  get hasSelection() {
    return null !== this.selection && this.selection.toString().length > 0;
  }
  get range() {
    const e = this.selection;
    return null !== e && e.rangeCount ? e.getRangeAt(0) : this._range;
  }
  get parent() {
    const e = this.range;
    if (null !== e) {
      const t = e.startContainer;
      return t.nodeType === document.ELEMENT_NODE ? t : t.parentNode;
    }
    return null;
  }
  get blockParent() {
    const e = this.parent;
    return null !== e ? getBlockElement(e, this.el) : null;
  }
  save(e = this.range) {
    null !== e && (this._range = e);
  }
  restore(e = this._range) {
    const t = document.createRange(), o = document.getSelection();
    null !== e ? (t.setStart(e.startContainer, e.startOffset), t.setEnd(e.endContainer, e.endOffset), o.removeAllRanges(), o.addRange(t)) : (o.selectAllChildren(this.el), o.collapseToEnd());
  }
  savePosition() {
    let e, t = -1;
    const o = document.getSelection(), n = this.el.parentNode;
    if (o.focusNode && isChildOf(o.focusNode, n)) {
      e = o.focusNode, t = o.focusOffset;
      while (e && e !== n)
        e !== this.el && e.previousSibling ? (e = e.previousSibling, t += e.textContent.length) : e = e.parentNode;
    }
    this.savedPos = t;
  }
  restorePosition(e = 0) {
    if (this.savedPos > 0 && this.savedPos < e) {
      const e2 = window.getSelection(), t = createRange(this.el, { count: this.savedPos });
      t && (t.collapse(false), e2.removeAllRanges(), e2.addRange(t));
    }
  }
  hasParent(e, t) {
    const o = t ? this.parent : this.blockParent;
    return null !== o && o.nodeName.toLowerCase() === e.toLowerCase();
  }
  hasParents(e, t, o = this.parent) {
    return null !== o && (true === e.includes(o.nodeName.toLowerCase()) || true === t && this.hasParents(e, t, o.parentNode));
  }
  is(e, t) {
    if (null === this.selection)
      return false;
    switch (e) {
      case "formatBlock":
        return "DIV" === t && this.parent === this.el || this.hasParent(t, "PRE" === t);
      case "link":
        return this.hasParent("A", true);
      case "fontSize":
        return document.queryCommandValue(e) === t;
      case "fontName":
        const o = document.queryCommandValue(e);
        return o === `"${t}"` || o === t;
      case "fullscreen":
        return this.eVm.inFullscreen.value;
      case "viewsource":
        return this.eVm.isViewingSource.value;
      case void 0:
        return false;
      default:
        const n = document.queryCommandState(e);
        return void 0 !== t ? n === t : n;
    }
  }
  getParentAttribute(e) {
    return null !== this.parent ? this.parent.getAttribute(e) : null;
  }
  can(e) {
    return "outdent" === e ? this.hasParents(["blockquote", "li"], true) : "indent" === e ? this.hasParents(["li"], true) : "link" === e ? null !== this.selection || this.is("link") : void 0;
  }
  apply(e, t, o = noop) {
    if ("formatBlock" === e)
      ["BLOCKQUOTE", "H1", "H2", "H3", "H4", "H5", "H6"].includes(t) && this.is(e, t) && (e = "outdent", t = null), "PRE" === t && this.is(e, "PRE") && (t = "P");
    else {
      if ("print" === e) {
        o();
        const e2 = window.open();
        return e2.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `), e2.print(), void e2.close();
      }
      if ("link" === e) {
        const e2 = this.getParentAttribute("href");
        if (null === e2) {
          const e3 = this.selectWord(this.selection), t2 = e3 ? e3.toString() : "";
          if (!t2.length && (!this.range || !this.range.cloneContents().querySelector("img")))
            return;
          this.eVm.editLinkUrl.value = urlRegex.test(t2) ? t2 : "https://", document.execCommand("createLink", false, this.eVm.editLinkUrl.value), this.save(e3.getRangeAt(0));
        } else
          this.eVm.editLinkUrl.value = e2, this.range.selectNodeContents(this.parent), this.save();
        return;
      }
      if ("fullscreen" === e)
        return this.eVm.toggleFullscreen(), void o();
      if ("viewsource" === e)
        return this.eVm.isViewingSource.value = false === this.eVm.isViewingSource.value, this.eVm.setContent(this.eVm.props.modelValue), void o();
    }
    document.execCommand(e, false, t), o();
  }
  selectWord(e) {
    if (null === e || true !== e.isCollapsed || void 0 === e.modify)
      return e;
    const t = document.createRange();
    t.setStart(e.anchorNode, e.anchorOffset), t.setEnd(e.focusNode, e.focusOffset);
    const o = t.collapsed ? ["backward", "forward"] : ["forward", "backward"];
    t.detach();
    const n = e.focusNode, a = e.focusOffset;
    return e.collapse(e.anchorNode, e.anchorOffset), e.modify("move", o[0], "character"), e.modify("move", o[1], "word"), e.extend(n, a), e.modify("extend", o[1], "character"), e.modify("extend", o[0], "word"), e;
  }
}
var QTooltip = createComponent({ name: "QTooltip", inheritAttrs: false, props: { ...useAnchorProps, ...useModelToggleProps, ...useTransitionProps, maxHeight: { type: String, default: null }, maxWidth: { type: String, default: null }, transitionShow: { default: "jump-down" }, transitionHide: { default: "jump-up" }, anchor: { type: String, default: "bottom middle", validator: validatePosition }, self: { type: String, default: "top middle", validator: validatePosition }, offset: { type: Array, default: () => [14, 14], validator: validateOffset }, scrollTarget: { default: void 0 }, delay: { type: Number, default: 0 }, hideDelay: { type: Number, default: 0 } }, emits: [...useModelToggleEmits], setup(e, { slots: t, emit: o, attrs: n }) {
  let a, l;
  const i = getCurrentInstance(), { proxy: { $q: r } } = i, s = ref(null), u = ref(false), c = computed(() => parsePosition(e.anchor, r.lang.rtl)), d = computed(() => parsePosition(e.self, r.lang.rtl)), p2 = computed(() => true !== e.persistent), { registerTick: v, removeTick: m } = useTick(), { registerTimeout: f } = useTimeout(), { transition: g, transitionStyle: b } = useTransition(e, u), { localScrollTarget: y, changeScrollEvent: S, unconfigureScrollTarget: w } = useScrollTarget(e, R), { anchorEl: C, canShow: x, anchorEvents: k } = useAnchor({ showing: u, configureAnchorEl: L }), { show: _, hide: q } = useModelToggle({ showing: u, canShow: x, handleShow: M, handleHide: B, hideOnRouteChange: p2, processOnMount: true });
  Object.assign(k, { delayShow: O, delayHide: A });
  const { showPortal: T, hidePortal: P, renderPortal: $ } = usePortal(i, s, z);
  if (true === r.platform.is.mobile) {
    const t2 = { anchorEl: C, innerRef: s, onClickOutside(e2) {
      return q(e2), e2.target.classList.contains("q-dialog__backdrop") && stopAndPrevent(e2), true;
    } }, o2 = computed(() => null === e.modelValue && true !== e.persistent && true === u.value);
    watch(o2, (e2) => {
      const o3 = true === e2 ? addClickOutside : removeClickOutside;
      o3(t2);
    }), onBeforeUnmount(() => {
      removeClickOutside(t2);
    });
  }
  function M(t2) {
    T(), v(() => {
      l = new MutationObserver(() => E()), l.observe(s.value, { attributes: false, childList: true, characterData: true, subtree: true }), E(), R();
    }), void 0 === a && (a = watch(() => r.screen.width + "|" + r.screen.height + "|" + e.self + "|" + e.anchor + "|" + r.lang.rtl, E)), f(() => {
      T(true), o("show", t2);
    }, e.transitionDuration);
  }
  function B(t2) {
    m(), P(), Q(), f(() => {
      P(true), o("hide", t2);
    }, e.transitionDuration);
  }
  function Q() {
    void 0 !== l && (l.disconnect(), l = void 0), void 0 !== a && (a(), a = void 0), w(), cleanEvt(k, "tooltipTemp");
  }
  function E() {
    const t2 = s.value;
    null !== C.value && t2 && setPosition({ el: t2, offset: e.offset, anchorEl: C.value, anchorOrigin: c.value, selfOrigin: d.value, maxHeight: e.maxHeight, maxWidth: e.maxWidth });
  }
  function O(t2) {
    if (true === r.platform.is.mobile) {
      clearSelection(), document.body.classList.add("non-selectable");
      const e2 = C.value, t3 = ["touchmove", "touchcancel", "touchend", "click"].map((t4) => [e2, t4, "delayHide", "passiveCapture"]);
      addEvt(k, "tooltipTemp", t3);
    }
    f(() => {
      _(t2);
    }, e.delay);
  }
  function A(t2) {
    true === r.platform.is.mobile && (cleanEvt(k, "tooltipTemp"), clearSelection(), setTimeout(() => {
      document.body.classList.remove("non-selectable");
    }, 10)), f(() => {
      q(t2);
    }, e.hideDelay);
  }
  function L() {
    if (true === e.noParentEvent || null === C.value)
      return;
    const t2 = true === r.platform.is.mobile ? [[C.value, "touchstart", "delayShow", "passive"]] : [[C.value, "mouseenter", "delayShow", "passive"], [C.value, "mouseleave", "delayHide", "passive"]];
    addEvt(k, "anchor", t2);
  }
  function R() {
    if (null !== C.value || void 0 !== e.scrollTarget) {
      y.value = getScrollTarget(C.value, e.scrollTarget);
      const t2 = true === e.noParentEvent ? E : q;
      S(y.value, t2);
    }
  }
  function D() {
    return true === u.value ? h("div", { ...n, ref: s, class: ["q-tooltip q-tooltip--style q-position-engine no-pointer-events", n.class], style: [n.style, b.value], role: "complementary" }, hSlot(t.default)) : null;
  }
  function z() {
    return h(Transition, { name: g.value, appear: true }, D);
  }
  return onBeforeUnmount(Q), Object.assign(i.proxy, { updatePosition: E }), $;
} }), QItem = createComponent({ name: "QItem", props: { ...useDarkProps, ...useRouterLinkProps, tag: { type: String, default: "div" }, active: { type: Boolean, default: null }, clickable: Boolean, dense: Boolean, insetLevel: Number, tabindex: [String, Number], focused: Boolean, manualFocus: Boolean }, emits: ["click", "keyup"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useDark(e, n), { hasLink: l, linkAttrs: i, linkClass: r, linkTag: s, navigateOnClick: u } = useRouterLink(), c = ref(null), d = ref(null), p2 = computed(() => true === e.clickable || true === l.value || "label" === e.tag), v = computed(() => true !== e.disable && true === p2.value), m = computed(() => "q-item q-item-type row no-wrap" + (true === e.dense ? " q-item--dense" : "") + (true === a.value ? " q-item--dark" : "") + (true === l.value && null === e.active ? r.value : true === e.active ? ` q-item--active${void 0 !== e.activeClass ? ` ${e.activeClass}` : ""}` : "") + (true === e.disable ? " disabled" : "") + (true === v.value ? " q-item--clickable q-link cursor-pointer " + (true === e.manualFocus ? "q-manual-focusable" : "q-focusable q-hoverable") + (true === e.focused ? " q-manual-focusable--focused" : "") : "")), f = computed(() => {
    if (void 0 === e.insetLevel)
      return null;
    const t2 = true === n.lang.rtl ? "Right" : "Left";
    return { ["padding" + t2]: 16 + 56 * e.insetLevel + "px" };
  });
  function g(e2) {
    true === v.value && (null !== d.value && (true !== e2.qKeyEvent && document.activeElement === c.value ? d.value.focus() : document.activeElement === d.value && c.value.focus()), u(e2));
  }
  function b(e2) {
    if (true === v.value && true === isKeyCode(e2, 13)) {
      stopAndPrevent(e2), e2.qKeyEvent = true;
      const t2 = new MouseEvent("click", e2);
      t2.qKeyEvent = true, c.value.dispatchEvent(t2);
    }
    o("keyup", e2);
  }
  function y() {
    const e2 = hUniqueSlot(t.default, []);
    return true === v.value && e2.unshift(h("div", { class: "q-focus-helper", tabindex: -1, ref: d })), e2;
  }
  return () => {
    const t2 = { ref: c, class: m.value, style: f.value, onClick: g, onKeyup: b };
    return true === v.value ? (t2.tabindex = e.tabindex || "0", Object.assign(t2, i.value)) : true === p2.value && (t2["aria-disabled"] = "true"), h(s.value, t2, y());
  };
} }), QItemSection = createComponent({ name: "QItemSection", props: { avatar: Boolean, thumbnail: Boolean, side: Boolean, top: Boolean, noWrap: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => `q-item__section column q-item__section--${true === e.avatar || true === e.side || true === e.thumbnail ? "side" : "main"}` + (true === e.top ? " q-item__section--top justify-start" : " justify-center") + (true === e.avatar ? " q-item__section--avatar" : "") + (true === e.thumbnail ? " q-item__section--thumbnail" : "") + (true === e.noWrap ? " q-item__section--nowrap" : ""));
  return () => h("div", { class: o.value }, hSlot(t.default));
} });
function run(e, t, o) {
  t.handler ? t.handler(e, o, o.caret) : o.runCmd(t.cmd, t.param);
}
function getGroup(e) {
  return h("div", { class: "q-editor__toolbar-group" }, e);
}
function getBtn(e, t, o, n = false) {
  const a = n || "toggle" === t.type && (t.toggled ? t.toggled(e) : t.cmd && e.caret.is(t.cmd, t.param)), l = [];
  if (t.tip && e.$q.platform.is.desktop) {
    const e2 = t.key ? h("div", [h("small", `(CTRL + ${String.fromCharCode(t.key)})`)]) : null;
    l.push(h(QTooltip, { delay: 1e3 }, () => [h("div", { innerHTML: t.tip }), e2]));
  }
  return h(QBtn, { ...e.buttonProps.value, icon: null !== t.icon ? t.icon : void 0, color: a ? t.toggleColor || e.props.toolbarToggleColor : t.color || e.props.toolbarColor, textColor: a && !e.props.toolbarPush ? null : t.textColor || e.props.toolbarTextColor, label: t.label, disable: !!t.disable && ("function" !== typeof t.disable || t.disable(e)), size: "sm", onClick(n2) {
    o && o(), run(n2, t, e);
  } }, () => l);
}
function getDropdown(e, t) {
  const o = "only-icons" === t.list;
  let n, a, l = t.label, i = null !== t.icon ? t.icon : void 0;
  function r() {
    u.component.proxy.hide();
  }
  if (o)
    a = t.options.map((t2) => {
      const o2 = void 0 === t2.type && e.caret.is(t2.cmd, t2.param);
      return o2 && (l = t2.tip, i = null !== t2.icon ? t2.icon : void 0), getBtn(e, t2, r, o2);
    }), n = e.toolbarBackgroundClass.value, a = [getGroup(a)];
  else {
    const o2 = void 0 !== e.props.toolbarToggleColor ? `text-${e.props.toolbarToggleColor}` : null, s2 = void 0 !== e.props.toolbarTextColor ? `text-${e.props.toolbarTextColor}` : null, u2 = "no-icons" === t.list;
    a = t.options.map((t2) => {
      const n2 = !!t2.disable && t2.disable(e), a2 = void 0 === t2.type && e.caret.is(t2.cmd, t2.param);
      a2 && (l = t2.tip, i = null !== t2.icon ? t2.icon : void 0);
      const c = t2.htmlTip;
      return h(QItem, { active: a2, activeClass: o2, clickable: true, disable: n2, dense: true, onClick(o3) {
        r(), null !== e.contentRef.value && e.contentRef.value.focus(), e.caret.restore(), run(o3, t2, e);
      } }, () => [true === u2 ? null : h(QItemSection, { class: a2 ? o2 : s2, side: true }, () => h(QIcon, { name: null !== t2.icon ? t2.icon : void 0 })), h(QItemSection, c ? () => h("div", { class: "text-no-wrap", innerHTML: t2.htmlTip }) : t2.tip ? () => h("div", { class: "text-no-wrap" }, t2.tip) : void 0)]);
    }), n = [e.toolbarBackgroundClass.value, s2];
  }
  const s = t.highlight && l !== t.label, u = h(QBtnDropdown, { ...e.buttonProps.value, noCaps: true, noWrap: true, color: s ? e.props.toolbarToggleColor : e.props.toolbarColor, textColor: s && !e.props.toolbarPush ? null : e.props.toolbarTextColor, label: t.fixedLabel ? t.label : l, icon: t.fixedIcon ? null !== t.icon ? t.icon : void 0 : i, contentClass: n }, () => a);
  return u;
}
function getToolbar(e) {
  if (e.caret)
    return e.buttons.value.filter((t) => {
      return !e.isViewingSource.value || t.find((e2) => "viewsource" === e2.cmd);
    }).map((t) => getGroup(t.map((t2) => {
      return (!e.isViewingSource.value || "viewsource" === t2.cmd) && ("slot" === t2.type ? hSlot(e.slots[t2.slot]) : "dropdown" === t2.type ? getDropdown(e, t2) : getBtn(e, t2));
    })));
}
function getFonts(e, t, o, n = {}) {
  const a = Object.keys(n);
  if (0 === a.length)
    return {};
  const l = { default_font: { cmd: "fontName", param: e, icon: o, tip: t } };
  return a.forEach((e2) => {
    const t2 = n[e2];
    l[e2] = { cmd: "fontName", param: t2, icon: o, tip: t2, htmlTip: `<font face="${t2}">${t2}</font>` };
  }), l;
}
function getLinkEditor(e) {
  if (e.caret) {
    const t = e.props.toolbarColor || e.props.toolbarTextColor;
    let o = e.editLinkUrl.value;
    const n = () => {
      e.caret.restore(), o !== e.editLinkUrl.value && document.execCommand("createLink", false, "" === o ? " " : o), e.editLinkUrl.value = null;
    };
    return [h("div", { class: `q-mx-xs text-${t}` }, `${e.$q.lang.editor.url}: `), h("input", { key: "qedt_btm_input", class: "col q-editor__link-input", value: o, onInput: (e2) => {
      stop(e2), o = e2.target.value;
    }, onKeydown: (t2) => {
      if (true !== shouldIgnoreKey(t2))
        switch (t2.keyCode) {
          case 13:
            return prevent(t2), n();
          case 27:
            prevent(t2), e.caret.restore(), e.editLinkUrl.value && "https://" !== e.editLinkUrl.value || document.execCommand("unlink"), e.editLinkUrl.value = null;
            break;
        }
    } }), getGroup([h(QBtn, { key: "qedt_btm_rem", tabindex: -1, ...e.buttonProps.value, label: e.$q.lang.label.remove, noCaps: true, onClick: () => {
      e.caret.restore(), document.execCommand("unlink"), e.editLinkUrl.value = null;
    } }), h(QBtn, { key: "qedt_btm_upd", ...e.buttonProps.value, label: e.$q.lang.label.update, noCaps: true, onClick: n })])];
  }
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(e, t) {
  const o = { listeners: ref({}), attributes: ref({}) };
  function n() {
    const n2 = {}, a = {};
    for (const t2 in e)
      "class" !== t2 && "style" !== t2 && false === listenerRE.test(t2) && (n2[t2] = e[t2]);
    for (const e2 in t.props)
      true === listenerRE.test(e2) && (a[e2] = t.props[e2]);
    o.attributes.value = n2, o.listeners.value = a;
  }
  return onBeforeUpdate(n), n(), o;
}
const toString = Object.prototype.toString, hasOwn = Object.prototype.hasOwnProperty, notPlainObject = new Set(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"].map((e) => "[object " + e + "]"));
function isPlainObject(e) {
  if (e !== Object(e) || true === notPlainObject.has(toString.call(e)))
    return false;
  if (e.constructor && false === hasOwn.call(e, "constructor") && false === !hasOwn.call(e.constructor.prototype, "isPrototypeOf"))
    return false;
  let t;
  for (t in e)
    ;
  return void 0 === t || hasOwn.call(e, t);
}
function extend() {
  let e, t, o, n, a, l, i = arguments[0] || {}, r = 1, s = false;
  const u = arguments.length;
  for ("boolean" === typeof i && (s = i, i = arguments[1] || {}, r = 2), Object(i) !== i && "function" !== typeof i && (i = {}), u === r && (i = this, r--); r < u; r++)
    if (null !== (e = arguments[r]))
      for (t in e)
        o = i[t], n = e[t], i !== n && (true === s && n && ((a = Array.isArray(n)) || true === isPlainObject(n)) ? (l = true === a ? true === Array.isArray(o) ? o : [] : true === isPlainObject(o) ? o : {}, i[t] = extend(s, l, n)) : void 0 !== n && (i[t] = n));
  return i;
}
var QEditor = createComponent({ name: "QEditor", props: { ...useDarkProps, ...useFullscreenProps, modelValue: { type: String, required: true }, readonly: Boolean, disable: Boolean, minHeight: { type: String, default: "10rem" }, maxHeight: String, height: String, definitions: Object, fonts: Object, placeholder: String, toolbar: { type: Array, validator: (e) => 0 === e.length || e.every((e2) => e2.length), default() {
  return [["left", "center", "right", "justify"], ["bold", "italic", "underline", "strike"], ["undo", "redo"]];
} }, toolbarColor: String, toolbarBg: String, toolbarTextColor: String, toolbarToggleColor: { type: String, default: "primary" }, toolbarOutline: Boolean, toolbarPush: Boolean, toolbarRounded: Boolean, paragraphTag: { type: String, validator: (e) => ["div", "p"].includes(e), default: "div" }, contentStyle: Object, contentClass: [Object, Array, String], square: Boolean, flat: Boolean, dense: Boolean }, emits: [...useFullscreenEmits, "update:modelValue", "keydown", "click", "mouseup", "keyup", "touchend", "focus", "blur"], setup(e, { slots: t, emit: o, attrs: n }) {
  const { proxy: a, vnode: l } = getCurrentInstance(), { $q: i } = a, r = useDark(e, i), { inFullscreen: s, toggleFullscreen: u } = useFullscreen(), c = useSplitAttrs(n, l), d = ref(null), p2 = ref(null), v = ref(null), m = ref(false), f = computed(() => !e.readonly && !e.disable);
  let g, b, y = e.modelValue;
  document.execCommand("defaultParagraphSeparator", false, e.paragraphTag), g = window.getComputedStyle(document.body).fontFamily;
  const S = computed(() => e.toolbarBg ? ` bg-${e.toolbarBg}` : ""), w = computed(() => {
    const t2 = true !== e.toolbarOutline && true !== e.toolbarPush;
    return { type: "a", flat: t2, noWrap: true, outline: e.toolbarOutline, push: e.toolbarPush, rounded: e.toolbarRounded, dense: true, color: e.toolbarColor, disable: !f.value, size: "sm" };
  }), C = computed(() => {
    const t2 = i.lang.editor, o2 = i.iconSet.editor;
    return { bold: { cmd: "bold", icon: o2.bold, tip: t2.bold, key: 66 }, italic: { cmd: "italic", icon: o2.italic, tip: t2.italic, key: 73 }, strike: { cmd: "strikeThrough", icon: o2.strikethrough, tip: t2.strikethrough, key: 83 }, underline: { cmd: "underline", icon: o2.underline, tip: t2.underline, key: 85 }, unordered: { cmd: "insertUnorderedList", icon: o2.unorderedList, tip: t2.unorderedList }, ordered: { cmd: "insertOrderedList", icon: o2.orderedList, tip: t2.orderedList }, subscript: { cmd: "subscript", icon: o2.subscript, tip: t2.subscript, htmlTip: "x<subscript>2</subscript>" }, superscript: { cmd: "superscript", icon: o2.superscript, tip: t2.superscript, htmlTip: "x<superscript>2</superscript>" }, link: { cmd: "link", disable: (e2) => e2.caret && !e2.caret.can("link"), icon: o2.hyperlink, tip: t2.hyperlink, key: 76 }, fullscreen: { cmd: "fullscreen", icon: o2.toggleFullscreen, tip: t2.toggleFullscreen, key: 70 }, viewsource: { cmd: "viewsource", icon: o2.viewSource, tip: t2.viewSource }, quote: { cmd: "formatBlock", param: "BLOCKQUOTE", icon: o2.quote, tip: t2.quote, key: 81 }, left: { cmd: "justifyLeft", icon: o2.left, tip: t2.left }, center: { cmd: "justifyCenter", icon: o2.center, tip: t2.center }, right: { cmd: "justifyRight", icon: o2.right, tip: t2.right }, justify: { cmd: "justifyFull", icon: o2.justify, tip: t2.justify }, print: { type: "no-state", cmd: "print", icon: o2.print, tip: t2.print, key: 80 }, outdent: { type: "no-state", disable: (e2) => e2.caret && !e2.caret.can("outdent"), cmd: "outdent", icon: o2.outdent, tip: t2.outdent }, indent: { type: "no-state", disable: (e2) => e2.caret && !e2.caret.can("indent"), cmd: "indent", icon: o2.indent, tip: t2.indent }, removeFormat: { type: "no-state", cmd: "removeFormat", icon: o2.removeFormat, tip: t2.removeFormat }, hr: { type: "no-state", cmd: "insertHorizontalRule", icon: o2.hr, tip: t2.hr }, undo: { type: "no-state", cmd: "undo", icon: o2.undo, tip: t2.undo, key: 90 }, redo: { type: "no-state", cmd: "redo", icon: o2.redo, tip: t2.redo, key: 89 }, h1: { cmd: "formatBlock", param: "H1", icon: o2.heading1 || o2.heading, tip: t2.heading1, htmlTip: `<h1 class="q-ma-none">${t2.heading1}</h1>` }, h2: { cmd: "formatBlock", param: "H2", icon: o2.heading2 || o2.heading, tip: t2.heading2, htmlTip: `<h2 class="q-ma-none">${t2.heading2}</h2>` }, h3: { cmd: "formatBlock", param: "H3", icon: o2.heading3 || o2.heading, tip: t2.heading3, htmlTip: `<h3 class="q-ma-none">${t2.heading3}</h3>` }, h4: { cmd: "formatBlock", param: "H4", icon: o2.heading4 || o2.heading, tip: t2.heading4, htmlTip: `<h4 class="q-ma-none">${t2.heading4}</h4>` }, h5: { cmd: "formatBlock", param: "H5", icon: o2.heading5 || o2.heading, tip: t2.heading5, htmlTip: `<h5 class="q-ma-none">${t2.heading5}</h5>` }, h6: { cmd: "formatBlock", param: "H6", icon: o2.heading6 || o2.heading, tip: t2.heading6, htmlTip: `<h6 class="q-ma-none">${t2.heading6}</h6>` }, p: { cmd: "formatBlock", param: e.paragraphTag, icon: o2.heading, tip: t2.paragraph }, code: { cmd: "formatBlock", param: "PRE", icon: o2.code, htmlTip: `<code>${t2.code}</code>` }, "size-1": { cmd: "fontSize", param: "1", icon: o2.size1 || o2.size, tip: t2.size1, htmlTip: `<font size="1">${t2.size1}</font>` }, "size-2": { cmd: "fontSize", param: "2", icon: o2.size2 || o2.size, tip: t2.size2, htmlTip: `<font size="2">${t2.size2}</font>` }, "size-3": { cmd: "fontSize", param: "3", icon: o2.size3 || o2.size, tip: t2.size3, htmlTip: `<font size="3">${t2.size3}</font>` }, "size-4": { cmd: "fontSize", param: "4", icon: o2.size4 || o2.size, tip: t2.size4, htmlTip: `<font size="4">${t2.size4}</font>` }, "size-5": { cmd: "fontSize", param: "5", icon: o2.size5 || o2.size, tip: t2.size5, htmlTip: `<font size="5">${t2.size5}</font>` }, "size-6": { cmd: "fontSize", param: "6", icon: o2.size6 || o2.size, tip: t2.size6, htmlTip: `<font size="6">${t2.size6}</font>` }, "size-7": { cmd: "fontSize", param: "7", icon: o2.size7 || o2.size, tip: t2.size7, htmlTip: `<font size="7">${t2.size7}</font>` } };
  }), x = computed(() => {
    const t2 = e.definitions || {}, o2 = e.definitions || e.fonts ? extend(true, {}, C.value, t2, getFonts(g, i.lang.editor.defaultFont, i.iconSet.editor.font, e.fonts)) : C.value;
    return e.toolbar.map((e2) => e2.map((e3) => {
      if (e3.options)
        return { type: "dropdown", icon: e3.icon, label: e3.label, size: "sm", dense: true, fixedLabel: e3.fixedLabel, fixedIcon: e3.fixedIcon, highlight: e3.highlight, list: e3.list, options: e3.options.map((e4) => o2[e4]) };
      const n2 = o2[e3];
      return n2 ? "no-state" === n2.type || t2[e3] && (void 0 === n2.cmd || C.value[n2.cmd] && "no-state" === C.value[n2.cmd].type) ? n2 : Object.assign({ type: "toggle" }, n2) : { type: "slot", slot: e3 };
    }));
  }), k = { $q: i, props: e, slots: t, inFullscreen: s, toggleFullscreen: u, runCmd: I, isViewingSource: m, editLinkUrl: v, toolbarBackgroundClass: S, buttonProps: w, contentRef: p2, buttons: x, setContent: F };
  watch(() => e.modelValue, (e2) => {
    y !== e2 && (y = e2, F(e2, true));
  });
  const _ = computed(() => e.toolbar && e.toolbar.length > 0), q = computed(() => {
    const e2 = {}, t2 = (t3) => {
      t3.key && (e2[t3.key] = { cmd: t3.cmd, param: t3.param });
    };
    return x.value.forEach((e3) => {
      e3.forEach((e4) => {
        e4.options ? e4.options.forEach(t2) : t2(e4);
      });
    }), e2;
  }), T = computed(() => s.value ? e.contentStyle : [{ minHeight: e.minHeight, height: e.height, maxHeight: e.maxHeight }, e.contentStyle]), P = computed(() => `q-editor q-editor--${true === m.value ? "source" : "default"}` + (true === e.disable ? " disabled" : "") + (true === s.value ? " fullscreen column" : "") + (true === e.square ? " q-editor--square no-border-radius" : "") + (true === e.flat ? " q-editor--flat" : "") + (true === e.dense ? " q-editor--dense" : "") + (true === r.value ? " q-editor--dark q-dark" : "")), $ = computed(() => [e.contentClass, "q-editor__content", { col: s.value, "overflow-auto": s.value || e.maxHeight }]), M = computed(() => true === e.disable ? { "aria-disabled": "true" } : true === e.readonly ? { "aria-readonly": "true" } : {});
  function B() {
    if (null !== p2.value) {
      const t2 = `inner${true === m.value ? "Text" : "HTML"}`, n2 = p2.value[t2];
      n2 !== e.modelValue && (y = n2, o("update:modelValue", n2));
    }
  }
  function Q(e2) {
    if (o("keydown", e2), true !== e2.ctrlKey || true === shouldIgnoreKey(e2))
      return void V();
    const t2 = e2.keyCode, n2 = q.value[t2];
    if (void 0 !== n2) {
      const { cmd: t3, param: o2 } = n2;
      stopAndPrevent(e2), I(t3, o2, false);
    }
  }
  function E(e2) {
    V(), o("click", e2);
  }
  function O(e2) {
    if (null !== p2.value) {
      const { scrollTop: e3, scrollHeight: t2 } = p2.value;
      b = t2 - e3;
    }
    k.caret.save(), o("blur", e2);
  }
  function A(e2) {
    nextTick(() => {
      null !== p2.value && void 0 !== b && (p2.value.scrollTop = p2.value.scrollHeight - b);
    }), o("focus", e2);
  }
  function L(e2) {
    const t2 = d.value;
    if (null !== t2 && true === t2.contains(e2.target) && (null === e2.relatedTarget || true !== t2.contains(e2.relatedTarget))) {
      const e3 = `inner${true === m.value ? "Text" : "HTML"}`;
      k.caret.restorePosition(p2.value[e3].length), V();
    }
  }
  function R(e2) {
    const t2 = d.value;
    null === t2 || true !== t2.contains(e2.target) || null !== e2.relatedTarget && true === t2.contains(e2.relatedTarget) || (k.caret.savePosition(), V());
  }
  function D() {
    b = void 0;
  }
  function z(e2) {
    k.caret.save();
  }
  function F(e2, t2) {
    if (null !== p2.value) {
      true === t2 && k.caret.savePosition();
      const o2 = `inner${true === m.value ? "Text" : "HTML"}`;
      p2.value[o2] = e2, true === t2 && (k.caret.restorePosition(p2.value[o2].length), V());
    }
  }
  function I(e2, t2, o2 = true) {
    N(), k.caret.restore(), k.caret.apply(e2, t2, () => {
      N(), k.caret.save(), o2 && V();
    });
  }
  function V() {
    setTimeout(() => {
      v.value = null, a.$forceUpdate();
    }, 1);
  }
  function N() {
    addFocusFn(() => {
      null !== p2.value && p2.value.focus({ preventScroll: true });
    });
  }
  function H() {
    return p2.value;
  }
  return onMounted(() => {
    k.caret = a.caret = new Caret(p2.value, k), F(e.modelValue), V(), document.addEventListener("selectionchange", z);
  }), onBeforeUnmount(() => {
    document.removeEventListener("selectionchange", z);
  }), Object.assign(a, { runCmd: I, refreshToolbar: V, focus: N, getContentEl: H }), () => {
    let t2;
    if (_.value) {
      const e2 = [h("div", { key: "qedt_top", class: "q-editor__toolbar row no-wrap scroll-x" + S.value }, getToolbar(k))];
      null !== v.value && e2.push(h("div", { key: "qedt_btm", class: "q-editor__toolbar row no-wrap items-center scroll-x" + S.value }, getLinkEditor(k))), t2 = h("div", { key: "toolbar_ctainer", class: "q-editor__toolbars-container" }, e2);
    }
    return h("div", { ref: d, class: P.value, style: { height: true === s.value ? "100%" : null }, ...M.value, onFocusin: L, onFocusout: R }, [t2, h("div", { ref: p2, style: T.value, class: $.value, contenteditable: f.value, placeholder: e.placeholder, ...{}, ...c.listeners.value, onInput: B, onKeydown: Q, onClick: E, onBlur: O, onFocus: A, onMousedown: D, onTouchstartPassive: D })]);
  };
} }), QItemLabel = createComponent({ name: "QItemLabel", props: { overline: Boolean, caption: Boolean, header: Boolean, lines: [Number, String] }, setup(e, { slots: t }) {
  const o = computed(() => parseInt(e.lines, 10)), n = computed(() => "q-item__label" + (true === e.overline ? " q-item__label--overline text-overline" : "") + (true === e.caption ? " q-item__label--caption text-caption" : "") + (true === e.header ? " q-item__label--header" : "") + (1 === o.value ? " ellipsis" : "")), a = computed(() => {
    return void 0 !== e.lines && o.value > 1 ? { overflow: "hidden", display: "-webkit-box", "-webkit-box-orient": "vertical", "-webkit-line-clamp": o.value } : null;
  });
  return () => h("div", { style: a.value, class: n.value }, hSlot(t.default));
} }), QSlideTransition = createComponent({ name: "QSlideTransition", props: { appear: Boolean, duration: { type: Number, default: 300 } }, emits: ["show", "hide"], setup(e, { slots: t, emit: o }) {
  let n, a, l, i, r, s, u = false;
  function c() {
    n && n(), n = null, u = false, clearTimeout(l), clearTimeout(i), void 0 !== a && a.removeEventListener("transitionend", r), r = null;
  }
  function d(t2, o2, a2) {
    t2.style.overflowY = "hidden", void 0 !== o2 && (t2.style.height = `${o2}px`), t2.style.transition = `height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`, u = true, n = a2;
  }
  function p2(e2, t2) {
    e2.style.overflowY = null, e2.style.height = null, e2.style.transition = null, c(), t2 !== s && o(t2);
  }
  function v(t2, o2) {
    let n2 = 0;
    a = t2, true === u ? (c(), n2 = t2.offsetHeight === t2.scrollHeight ? 0 : void 0) : s = "hide", d(t2, n2, o2), l = setTimeout(() => {
      t2.style.height = `${t2.scrollHeight}px`, r = (e2) => {
        Object(e2) === e2 && e2.target !== t2 || p2(t2, "show");
      }, t2.addEventListener("transitionend", r), i = setTimeout(r, 1.1 * e.duration);
    }, 100);
  }
  function m(t2, o2) {
    let n2;
    a = t2, true === u ? c() : (s = "show", n2 = t2.scrollHeight), d(t2, n2, o2), l = setTimeout(() => {
      t2.style.height = 0, r = (e2) => {
        Object(e2) === e2 && e2.target !== t2 || p2(t2, "hide");
      }, t2.addEventListener("transitionend", r), i = setTimeout(r, 1.1 * e.duration);
    }, 100);
  }
  return onBeforeUnmount(() => {
    true === u && c();
  }), () => h(Transition, { css: false, appear: e.appear, onEnter: v, onLeave: m }, t.default);
} });
const insetMap = { true: "inset", item: "item-inset", "item-thumbnail": "item-thumbnail-inset" }, margins = { xs: 2, sm: 4, md: 8, lg: 16, xl: 24 };
var QSeparator = createComponent({ name: "QSeparator", props: { ...useDarkProps, spaced: [Boolean, String], inset: [Boolean, String], vertical: Boolean, color: String, size: String }, setup(e) {
  const t = getCurrentInstance(), o = useDark(e, t.proxy.$q), n = computed(() => true === e.vertical ? "vertical" : "horizontal"), a = computed(() => ` q-separator--${n.value}`), l = computed(() => false !== e.inset ? `${a.value}-${insetMap[e.inset]}` : ""), i = computed(() => `q-separator${a.value}${l.value}` + (void 0 !== e.color ? ` bg-${e.color}` : "") + (true === o.value ? " q-separator--dark" : "")), r = computed(() => {
    const t2 = {};
    if (void 0 !== e.size && (t2[true === e.vertical ? "width" : "height"] = e.size), false !== e.spaced) {
      const o2 = true === e.spaced ? `${margins.md}px` : e.spaced in margins ? `${margins[e.spaced]}px` : e.spaced, n2 = true === e.vertical ? ["Left", "Right"] : ["Top", "Bottom"];
      t2[`margin${n2[0]}`] = t2[`margin${n2[1]}`] = o2;
    }
    return t2;
  });
  return () => h("hr", { class: i.value, style: r.value, "aria-orientation": n.value });
} });
const itemGroups = shallowReactive({}), LINK_PROPS = Object.keys(useRouterLinkProps);
var QExpansionItem = createComponent({ name: "QExpansionItem", props: { ...useRouterLinkProps, ...useModelToggleProps, ...useDarkProps, icon: String, label: String, labelLines: [Number, String], caption: String, captionLines: [Number, String], dense: Boolean, toggleAriaLabel: String, expandIcon: String, expandedIcon: String, expandIconClass: [Array, String, Object], duration: Number, headerInsetLevel: Number, contentInsetLevel: Number, expandSeparator: Boolean, defaultOpened: Boolean, hideExpandIcon: Boolean, expandIconToggle: Boolean, switchToggleSide: Boolean, denseToggle: Boolean, group: String, popup: Boolean, headerStyle: [Array, String, Object], headerClass: [Array, String, Object] }, emits: [...useModelToggleEmits, "click", "after-show", "after-hide"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useDark(e, n), l = ref(null !== e.modelValue ? e.modelValue : e.defaultOpened), i = ref(null), r = uid$3(), { show: s, hide: u, toggle: c } = useModelToggle({ showing: l });
  let d, p2;
  const v = computed(() => `q-expansion-item q-item-type q-expansion-item--${true === l.value ? "expanded" : "collapsed"} q-expansion-item--${true === e.popup ? "popup" : "standard"}`), m = computed(() => {
    if (void 0 === e.contentInsetLevel)
      return null;
    const t2 = true === n.lang.rtl ? "Right" : "Left";
    return { ["padding" + t2]: 56 * e.contentInsetLevel + "px" };
  }), f = computed(() => true !== e.disable && (void 0 !== e.href || void 0 !== e.to && null !== e.to && "" !== e.to)), g = computed(() => {
    const t2 = {};
    return LINK_PROPS.forEach((o2) => {
      t2[o2] = e[o2];
    }), t2;
  }), b = computed(() => true === f.value || true !== e.expandIconToggle), y = computed(() => void 0 !== e.expandedIcon && true === l.value ? e.expandedIcon : e.expandIcon || n.iconSet.expansionItem[true === e.denseToggle ? "denseIcon" : "icon"]), S = computed(() => true !== e.disable && (true === f.value || true === e.expandIconToggle)), w = computed(() => ({ expanded: true === l.value, detailsId: e.targetUid, toggle: c, show: s, hide: u })), C = computed(() => {
    const t2 = void 0 !== e.toggleAriaLabel ? e.toggleAriaLabel : n.lang.label[true === l.value ? "collapse" : "expand"](e.label);
    return { role: "button", "aria-expanded": true === l.value ? "true" : "false", "aria-owns": r, "aria-controls": r, "aria-label": t2 };
  });
  function x(e2) {
    true !== f.value && c(e2), o("click", e2);
  }
  function k(e2) {
    13 === e2.keyCode && _(e2, true);
  }
  function _(e2, t2) {
    true !== t2 && null !== i.value && i.value.focus(), c(e2), stopAndPrevent(e2);
  }
  function q() {
    o("after-show");
  }
  function T() {
    o("after-hide");
  }
  function P() {
    void 0 === d && (d = uid$3()), true === l.value && (itemGroups[e.group] = d);
    const t2 = watch(l, (t3) => {
      true === t3 ? itemGroups[e.group] = d : itemGroups[e.group] === d && delete itemGroups[e.group];
    }), o2 = watch(() => itemGroups[e.group], (e2, t3) => {
      t3 === d && void 0 !== e2 && e2 !== d && u();
    });
    p2 = () => {
      t2(), o2(), itemGroups[e.group] === d && delete itemGroups[e.group], p2 = void 0;
    };
  }
  function $() {
    const t2 = { class: [`q-focusable relative-position cursor-pointer${true === e.denseToggle && true === e.switchToggleSide ? " items-end" : ""}`, e.expandIconClass], side: true !== e.switchToggleSide, avatar: e.switchToggleSide }, o2 = [h(QIcon, { class: "q-expansion-item__toggle-icon" + (void 0 === e.expandedIcon && true === l.value ? " q-expansion-item__toggle-icon--rotated" : ""), name: y.value })];
    return true === S.value && (Object.assign(t2, { tabindex: 0, ...C.value, onClick: _, onKeyup: k }), o2.unshift(h("div", { ref: i, class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded", tabindex: -1 }))), h(QItemSection, t2, () => o2);
  }
  function M() {
    let o2;
    return void 0 !== t.header ? o2 = [].concat(t.header(w.value)) : (o2 = [h(QItemSection, () => [h(QItemLabel, { lines: e.labelLines }, () => e.label || ""), e.caption ? h(QItemLabel, { lines: e.captionLines, caption: true }, () => e.caption) : null])], e.icon && o2[true === e.switchToggleSide ? "push" : "unshift"](h(QItemSection, { side: true === e.switchToggleSide, avatar: true !== e.switchToggleSide }, () => h(QIcon, { name: e.icon })))), true !== e.disable && true !== e.hideExpandIcon && o2[true === e.switchToggleSide ? "unshift" : "push"]($()), o2;
  }
  function B() {
    const t2 = { ref: "item", style: e.headerStyle, class: e.headerClass, dark: a.value, disable: e.disable, dense: e.dense, insetLevel: e.headerInsetLevel };
    return true === b.value && (t2.clickable = true, t2.onClick = x, Object.assign(t2, true === f.value ? g.value : C.value)), h(QItem, t2, M);
  }
  function Q() {
    return withDirectives(h("div", { key: "e-content", class: "q-expansion-item__content relative-position", style: m.value, id: r }, hSlot(t.default)), [[vShow, l.value]]);
  }
  function E() {
    const t2 = [B(), h(QSlideTransition, { duration: e.duration, onShow: q, onHide: T }, Q)];
    return true === e.expandSeparator && t2.push(h(QSeparator, { class: "q-expansion-item__border q-expansion-item__border--top absolute-top", dark: a.value }), h(QSeparator, { class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom", dark: a.value })), t2;
  }
  return watch(() => e.group, (e2) => {
    void 0 !== p2 && p2(), void 0 !== e2 && P();
  }), void 0 !== e.group && P(), onBeforeUnmount(() => {
    void 0 !== p2 && p2();
  }), () => h("div", { class: v.value }, [h("div", { class: "q-expansion-item__container relative-position" }, E())]);
} });
const labelPositions = ["top", "right", "bottom", "left"], useFabProps = { type: { type: String, default: "a" }, outline: Boolean, push: Boolean, flat: Boolean, unelevated: Boolean, color: String, textColor: String, glossy: Boolean, square: Boolean, padding: String, label: { type: [String, Number], default: "" }, labelPosition: { type: String, default: "right", validator: (e) => labelPositions.includes(e) }, externalLabel: Boolean, hideLabel: { type: Boolean }, labelClass: [Array, String, Object], labelStyle: [Array, String, Object], disable: Boolean, tabindex: [Number, String] };
function useFab(e, t) {
  return { formClass: computed(() => `q-fab--form-${true === e.square ? "square" : "rounded"}`), stacked: computed(() => false === e.externalLabel && ["top", "bottom"].includes(e.labelPosition)), labelProps: computed(() => {
    if (true === e.externalLabel) {
      const o = null === e.hideLabel ? false === t.value : e.hideLabel;
      return { action: "push", data: { class: [e.labelClass, `q-fab__label q-tooltip--style q-fab__label--external q-fab__label--external-${e.labelPosition}` + (true === o ? " q-fab__label--external-hidden" : "")], style: e.labelStyle } };
    }
    return { action: ["left", "top"].includes(e.labelPosition) ? "unshift" : "push", data: { class: [e.labelClass, `q-fab__label q-fab__label--internal q-fab__label--internal-${e.labelPosition}` + (true === e.hideLabel ? " q-fab__label--internal-hidden" : "")], style: e.labelStyle } };
  }) };
}
const directions = ["up", "right", "down", "left"], alignValues = ["left", "center", "right"];
var QFab = createComponent({ name: "QFab", props: { ...useFabProps, ...useModelToggleProps, icon: String, activeIcon: String, hideIcon: Boolean, hideLabel: { default: null }, direction: { type: String, default: "right", validator: (e) => directions.includes(e) }, persistent: Boolean, verticalActionsAlign: { type: String, default: "center", validator: (e) => alignValues.includes(e) } }, emits: useModelToggleEmits, setup(e, { slots: t }) {
  const o = ref(null), n = ref(true === e.modelValue), a = uid$3(), { proxy: { $q: l } } = getCurrentInstance(), { formClass: i, labelProps: r } = useFab(e, n), s = computed(() => true !== e.persistent), { hide: u, toggle: c } = useModelToggle({ showing: n, hideOnRouteChange: s }), d = computed(() => ({ opened: n.value })), p2 = computed(() => `q-fab z-fab row inline justify-center q-fab--align-${e.verticalActionsAlign} ${i.value}` + (true === n.value ? " q-fab--opened" : " q-fab--closed")), v = computed(() => `q-fab__actions flex no-wrap inline q-fab__actions--${e.direction} q-fab__actions--${true === n.value ? "opened" : "closed"}`), m = computed(() => {
    const e2 = { id: a };
    return true === n.value ? e2.role = "menu" : e2["aria-hidden"] = "true", e2;
  }), f = computed(() => `q-fab__icon-holder  q-fab__icon-holder--${true === n.value ? "opened" : "closed"}`);
  function g(o2, n2) {
    const a2 = t[o2], i2 = `q-fab__${o2} absolute-full`;
    return void 0 === a2 ? h(QIcon, { class: i2, name: e[n2] || l.iconSet.fab[n2] }) : h("div", { class: i2 }, a2(d.value));
  }
  function b() {
    const o2 = [];
    return true !== e.hideIcon && o2.push(h("div", { class: f.value }, [g("icon", "icon"), g("active-icon", "activeIcon")])), "" === e.label && void 0 === t.label || o2[r.value.action](h("div", r.value.data, void 0 !== t.label ? t.label(d.value) : [e.label])), hMergeSlot(t.tooltip, o2);
  }
  return provide(fabKey, { showing: n, onChildClick(e2) {
    u(e2), null !== o.value && o.value.$el.focus();
  } }), () => h("div", { class: p2.value }, [h(QBtn, { ref: o, class: i.value, ...e, noWrap: true, stack: e.stacked, align: void 0, icon: void 0, label: void 0, noCaps: true, fab: true, "aria-expanded": true === n.value ? "true" : "false", "aria-haspopup": "true", "aria-controls": a, "aria-owns": a, onClick: c }, b), h("div", { class: v.value, ...m.value }, hSlot(t.default))]);
} });
const anchorMap = { start: "self-end", center: "self-center", end: "self-start" }, anchorValues = Object.keys(anchorMap);
var QFabAction = createComponent({ name: "QFabAction", props: { ...useFabProps, icon: { type: String, default: "" }, anchor: { type: String, validator: (e) => anchorValues.includes(e) }, to: [String, Object], replace: Boolean }, emits: ["click"], setup(e, { slots: t, emit: o }) {
  const n = inject(fabKey, () => ({ showing: { value: true }, onChildClick: noop })), { formClass: a, labelProps: l } = useFab(e, n.showing), i = computed(() => {
    const t2 = anchorMap[e.anchor];
    return a.value + (void 0 !== t2 ? ` ${t2}` : "");
  }), r = computed(() => true === e.disable || true !== n.showing.value);
  function s(e2) {
    n.onChildClick(e2), o("click", e2);
  }
  function u() {
    const o2 = [];
    return void 0 !== t.icon ? o2.push(t.icon()) : "" !== e.icon && o2.push(h(QIcon, { name: e.icon })), "" === e.label && void 0 === t.label || o2[l.value.action](h("div", l.value.data, void 0 !== t.label ? t.label() : [e.label])), hMergeSlot(t.default, o2);
  }
  const c = getCurrentInstance();
  return Object.assign(c.proxy, { click: s }), () => h(QBtn, { class: i.value, ...e, noWrap: true, stack: e.stacked, icon: void 0, label: void 0, noCaps: true, fabMini: true, disable: r.value, onClick: s }, u);
} });
function useFormChild({ validate: e, resetValidation: t, requiresQForm: o }) {
  const n = inject(formKey, false);
  if (false !== n) {
    const { props: o2, proxy: a } = getCurrentInstance();
    Object.assign(a, { validate: e, resetValidation: t }), watch(() => o2.disable, (e2) => {
      true === e2 ? ("function" === typeof t && t(), n.unbindComponent(a)) : n.bindComponent(a);
    }), onMounted(() => {
      true !== o2.disable && n.bindComponent(a);
    }), onBeforeUnmount(() => {
      true !== o2.disable && n.unbindComponent(a);
    });
  } else
    true === o && console.error("Parent QForm not found on useFormChild()!");
}
const lazyRulesValues = [true, false, "ondemand"], useValidateProps = { modelValue: {}, error: { type: Boolean, default: null }, errorMessage: String, noErrorIcon: Boolean, rules: Array, reactiveRules: Boolean, lazyRules: { type: [Boolean, String], validator: (e) => lazyRulesValues.includes(e) } };
function useValidate(e, t) {
  const { props: o, proxy: n } = getCurrentInstance(), a = ref(false), l = ref(null), i = ref(null);
  useFormChild({ validate: m, resetValidation: v });
  let r, s = 0;
  const u = computed(() => void 0 !== o.rules && null !== o.rules && o.rules.length > 0), c = computed(() => true !== o.disable && true === u.value), d = computed(() => true === o.error || true === a.value), p2 = computed(() => "string" === typeof o.errorMessage && o.errorMessage.length > 0 ? o.errorMessage : l.value);
  function v() {
    s++, t.value = false, i.value = null, a.value = false, l.value = null, h2.cancel();
  }
  function m(e2 = o.modelValue) {
    if (true !== c.value)
      return true;
    const n2 = ++s, r2 = true !== t.value ? () => {
      i.value = true;
    } : () => {
    }, u2 = (e3, o2) => {
      true === e3 && r2(), a.value = e3, l.value = o2 || null, t.value = false;
    }, d2 = [];
    for (let t2 = 0; t2 < o.rules.length; t2++) {
      const n3 = o.rules[t2];
      let a2;
      if ("function" === typeof n3 ? a2 = n3(e2, testPattern) : "string" === typeof n3 && void 0 !== testPattern[n3] && (a2 = testPattern[n3](e2)), false === a2 || "string" === typeof a2)
        return u2(true, a2), false;
      true !== a2 && void 0 !== a2 && d2.push(a2);
    }
    return 0 === d2.length ? (u2(false), true) : (t.value = true, Promise.all(d2).then((e3) => {
      if (void 0 === e3 || false === Array.isArray(e3) || 0 === e3.length)
        return n2 === s && u2(false), true;
      const t2 = e3.find((e4) => false === e4 || "string" === typeof e4);
      return n2 === s && u2(void 0 !== t2, t2), void 0 === t2;
    }, (e3) => {
      return n2 === s && (console.error(e3), u2(true)), false;
    }));
  }
  function f(e2) {
    true === c.value && "ondemand" !== o.lazyRules && (true === i.value || true !== o.lazyRules && true !== e2) && h2();
  }
  watch(() => o.modelValue, () => {
    f();
  }), watch(() => o.reactiveRules, (e2) => {
    true === e2 ? void 0 === r && (r = watch(() => o.rules, () => {
      f(true);
    })) : void 0 !== r && (r(), r = void 0);
  }, { immediate: true }), watch(e, (e2) => {
    true === e2 ? null === i.value && (i.value = false) : false === i.value && (i.value = true, true === c.value && "ondemand" !== o.lazyRules && false === t.value && h2());
  });
  const h2 = debounce(m, 0);
  return onBeforeUnmount(() => {
    void 0 !== r && r(), h2.cancel();
  }), Object.assign(n, { resetValidation: v, validate: m }), injectProp(n, "hasError", () => d.value), { isDirtyModel: i, hasRules: u, hasError: d, errorMessage: p2, validate: m, resetValidation: v };
}
function getTargetUid(e) {
  return void 0 === e ? `f_${uid$3()}` : e;
}
function fieldValueIsFilled(e) {
  return void 0 !== e && null !== e && ("" + e).length > 0;
}
const useFieldProps = { ...useDarkProps, ...useValidateProps, label: String, stackLabel: Boolean, hint: String, hideHint: Boolean, prefix: String, suffix: String, labelColor: String, color: String, bgColor: String, filled: Boolean, outlined: Boolean, borderless: Boolean, standout: [Boolean, String], square: Boolean, loading: Boolean, labelSlot: Boolean, bottomSlots: Boolean, hideBottomSpace: Boolean, rounded: Boolean, dense: Boolean, itemAligned: Boolean, counter: Boolean, clearable: Boolean, clearIcon: String, disable: Boolean, readonly: Boolean, autofocus: Boolean, for: String, maxlength: [Number, String] }, useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popup-show", "popup-hide"];
function useFieldState() {
  const { props: e, attrs: t, proxy: o, vnode: n } = getCurrentInstance(), a = useDark(e, o.$q);
  return { isDark: a, editable: computed(() => true !== e.disable && true !== e.readonly), innerLoading: ref(false), focused: ref(false), hasPopupOpen: false, splitAttrs: useSplitAttrs(t, n), targetUid: ref(getTargetUid(e.for)), rootRef: ref(null), targetRef: ref(null), controlRef: ref(null) };
}
function useField(e) {
  const { props: t, emit: o, slots: n, attrs: a, proxy: l } = getCurrentInstance(), { $q: i } = l;
  let r;
  void 0 === e.hasValue && (e.hasValue = computed(() => fieldValueIsFilled(t.modelValue))), void 0 === e.emitValue && (e.emitValue = (e2) => {
    o("update:modelValue", e2);
  }), void 0 === e.controlEvents && (e.controlEvents = { onFocusin: q, onFocusout: T }), Object.assign(e, { clearValue: P, onControlFocusin: q, onControlFocusout: T, focus: k }), void 0 === e.computedCounter && (e.computedCounter = computed(() => {
    if (false !== t.counter) {
      const e2 = "string" === typeof t.modelValue || "number" === typeof t.modelValue ? ("" + t.modelValue).length : true === Array.isArray(t.modelValue) ? t.modelValue.length : 0, o2 = void 0 !== t.maxlength ? t.maxlength : t.maxValues;
      return e2 + (void 0 !== o2 ? " / " + o2 : "");
    }
  }));
  const { isDirtyModel: s, hasRules: u, hasError: c, errorMessage: d, resetValidation: p2 } = useValidate(e.focused, e.innerLoading), v = void 0 !== e.floatingLabel ? computed(() => true === t.stackLabel || true === e.focused.value || true === e.floatingLabel.value) : computed(() => true === t.stackLabel || true === e.focused.value || true === e.hasValue.value), m = computed(() => true === t.bottomSlots || void 0 !== t.hint || true === u.value || true === t.counter || null !== t.error), f = computed(() => {
    return true === t.filled ? "filled" : true === t.outlined ? "outlined" : true === t.borderless ? "borderless" : t.standout ? "standout" : "standard";
  }), g = computed(() => `q-field row no-wrap items-start q-field--${f.value}` + (void 0 !== e.fieldClass ? ` ${e.fieldClass.value}` : "") + (true === t.rounded ? " q-field--rounded" : "") + (true === t.square ? " q-field--square" : "") + (true === v.value ? " q-field--float" : "") + (true === y.value ? " q-field--labeled" : "") + (true === t.dense ? " q-field--dense" : "") + (true === t.itemAligned ? " q-field--item-aligned q-item-type" : "") + (true === e.isDark.value ? " q-field--dark" : "") + (void 0 === e.getControl ? " q-field--auto-height" : "") + (true === e.focused.value ? " q-field--focused" : "") + (true === c.value ? " q-field--error" : "") + (true === c.value || true === e.focused.value ? " q-field--highlighted" : "") + (true !== t.hideBottomSpace && true === m.value ? " q-field--with-bottom" : "") + (true === t.disable ? " q-field--disabled" : true === t.readonly ? " q-field--readonly" : "")), b = computed(() => "q-field__control relative-position row no-wrap" + (void 0 !== t.bgColor ? ` bg-${t.bgColor}` : "") + (true === c.value ? " text-negative" : "string" === typeof t.standout && t.standout.length > 0 && true === e.focused.value ? ` ${t.standout}` : void 0 !== t.color ? ` text-${t.color}` : "")), y = computed(() => true === t.labelSlot || void 0 !== t.label), S = computed(() => "q-field__label no-pointer-events absolute ellipsis" + (void 0 !== t.labelColor && true !== c.value ? ` text-${t.labelColor}` : "")), w = computed(() => ({ id: e.targetUid.value, editable: e.editable.value, focused: e.focused.value, floatingLabel: v.value, modelValue: t.modelValue, emitValue: e.emitValue })), C = computed(() => {
    const o2 = { for: e.targetUid.value };
    return true === t.disable ? o2["aria-disabled"] = "true" : true === t.readonly && (o2["aria-readonly"] = "true"), o2;
  });
  function x() {
    const t2 = document.activeElement;
    let o2 = void 0 !== e.targetRef && e.targetRef.value;
    !o2 || null !== t2 && t2.id === e.targetUid.value || (true === o2.hasAttribute("tabindex") || (o2 = o2.querySelector("[tabindex]")), o2 && o2 !== t2 && o2.focus({ preventScroll: true }));
  }
  function k() {
    addFocusFn(x);
  }
  function _() {
    removeFocusFn(x);
    const t2 = document.activeElement;
    null !== t2 && e.rootRef.value.contains(t2) && t2.blur();
  }
  function q(t2) {
    clearTimeout(r), true === e.editable.value && false === e.focused.value && (e.focused.value = true, o("focus", t2));
  }
  function T(t2, n2) {
    clearTimeout(r), r = setTimeout(() => {
      (true !== document.hasFocus() || true !== e.hasPopupOpen && void 0 !== e.controlRef && null !== e.controlRef.value && false === e.controlRef.value.contains(document.activeElement)) && (true === e.focused.value && (e.focused.value = false, o("blur", t2)), void 0 !== n2 && n2());
    });
  }
  function P(n2) {
    if (stopAndPrevent(n2), true !== i.platform.is.mobile) {
      const t2 = void 0 !== e.targetRef && e.targetRef.value || e.rootRef.value;
      t2.focus();
    } else
      true === e.rootRef.value.contains(document.activeElement) && document.activeElement.blur();
    "file" === t.type && (e.inputRef.value.value = null), o("update:modelValue", null), o("clear", t.modelValue), nextTick(() => {
      p2(), true !== i.platform.is.mobile && (s.value = false);
    });
  }
  function $() {
    const o2 = [];
    return void 0 !== n.prepend && o2.push(h("div", { class: "q-field__prepend q-field__marginal row no-wrap items-center", key: "prepend", onClick: prevent }, n.prepend())), o2.push(h("div", { class: "q-field__control-container col relative-position row no-wrap q-anchor--skip" }, M())), true === c.value && false === t.noErrorIcon && o2.push(Q("error", [h(QIcon, { name: i.iconSet.field.error, color: "negative" })])), true === t.loading || true === e.innerLoading.value ? o2.push(Q("inner-loading-append", void 0 !== n.loading ? n.loading() : [h(QSpinner, { color: t.color })])) : true === t.clearable && true === e.hasValue.value && true === e.editable.value && o2.push(Q("inner-clearable-append", [h(QIcon, { class: "q-field__focusable-action", tag: "button", name: t.clearIcon || i.iconSet.field.clear, tabindex: 0, type: "button", "aria-hidden": null, role: null, onClick: P })])), void 0 !== n.append && o2.push(h("div", { class: "q-field__append q-field__marginal row no-wrap items-center", key: "append", onClick: prevent }, n.append())), void 0 !== e.getInnerAppend && o2.push(Q("inner-append", e.getInnerAppend())), void 0 !== e.getControlChild && o2.push(e.getControlChild()), o2;
  }
  function M() {
    const o2 = [];
    return void 0 !== t.prefix && null !== t.prefix && o2.push(h("div", { class: "q-field__prefix no-pointer-events row items-center" }, t.prefix)), void 0 !== e.getShadowControl && true === e.hasShadow.value && o2.push(e.getShadowControl()), void 0 !== e.getControl ? o2.push(e.getControl()) : void 0 !== n.rawControl ? o2.push(n.rawControl()) : void 0 !== n.control && o2.push(h("div", { ref: e.targetRef, class: "q-field__native row", tabindex: -1, ...e.splitAttrs.attributes.value, "data-autofocus": true === t.autofocus || void 0 }, n.control(w.value))), true === y.value && o2.push(h("div", { class: S.value }, hSlot(n.label, t.label))), void 0 !== t.suffix && null !== t.suffix && o2.push(h("div", { class: "q-field__suffix no-pointer-events row items-center" }, t.suffix)), o2.concat(hSlot(n.default));
  }
  function B() {
    let o2, a2;
    true === c.value ? null !== d.value ? (o2 = [h("div", { role: "alert" }, d.value)], a2 = `q--slot-error-${d.value}`) : (o2 = hSlot(n.error), a2 = "q--slot-error") : true === t.hideHint && true !== e.focused.value || (void 0 !== t.hint ? (o2 = [h("div", t.hint)], a2 = `q--slot-hint-${t.hint}`) : (o2 = hSlot(n.hint), a2 = "q--slot-hint"));
    const l2 = true === t.counter || void 0 !== n.counter;
    if (true === t.hideBottomSpace && false === l2 && void 0 === o2)
      return;
    const i2 = h("div", { key: a2, class: "q-field__messages col" }, o2);
    return h("div", { class: "q-field__bottom row items-start q-field__bottom--" + (true !== t.hideBottomSpace ? "animated" : "stale"), onClick: prevent }, [true === t.hideBottomSpace ? i2 : h(Transition, { name: "q-transition--field-message" }, () => i2), true === l2 ? h("div", { class: "q-field__counter" }, void 0 !== n.counter ? n.counter() : e.computedCounter.value) : null]);
  }
  function Q(e2, t2) {
    return null === t2 ? null : h("div", { key: e2, class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip" }, t2);
  }
  watch(() => t.for, (t2) => {
    e.targetUid.value = getTargetUid(t2);
  });
  let E = false;
  return onDeactivated(() => {
    E = true;
  }), onActivated(() => {
    true === E && true === t.autofocus && l.focus();
  }), onMounted(() => {
    true === isRuntimeSsrPreHydration.value && void 0 === t.for && (e.targetUid.value = getTargetUid()), true === t.autofocus && l.focus();
  }), onBeforeUnmount(() => {
    clearTimeout(r);
  }), Object.assign(l, { focus: k, blur: _ }), function() {
    const o2 = void 0 === e.getControl && void 0 === n.control ? { ...e.splitAttrs.attributes.value, "data-autofocus": true === t.autofocus || void 0, ...C.value } : C.value;
    return h("label", { ref: e.rootRef, class: [g.value, a.class], style: a.style, ...o2 }, [void 0 !== n.before ? h("div", { class: "q-field__before q-field__marginal row no-wrap items-center", onClick: prevent }, n.before()) : null, h("div", { class: "q-field__inner relative-position col self-stretch" }, [h("div", { ref: e.controlRef, class: b.value, tabindex: -1, ...e.controlEvents }, $()), true === m.value ? B() : null]), void 0 !== n.after ? h("div", { class: "q-field__after q-field__marginal row no-wrap items-center", onClick: prevent }, n.after()) : null]);
  };
}
var QField = createComponent({ name: "QField", inheritAttrs: false, props: useFieldProps, emits: useFieldEmits, setup() {
  return useField(useFieldState());
} });
function filterFiles(e, t, o, n) {
  const a = [];
  return e.forEach((e2) => {
    true === n(e2) ? a.push(e2) : t.push({ failedPropValidation: o, file: e2 });
  }), a;
}
function stopAndPreventDrag(e) {
  e && e.dataTransfer && (e.dataTransfer.dropEffect = "copy"), stopAndPrevent(e);
}
const useFileProps = { multiple: Boolean, accept: String, capture: String, maxFileSize: [Number, String], maxTotalSize: [Number, String], maxFiles: [Number, String], filter: Function }, useFileEmits = ["rejected"];
function useFile({ editable: e, dnd: t, getFileInput: o, addFilesToQueue: n }) {
  const { props: a, emit: l, proxy: i } = getCurrentInstance(), r = ref(null), s = computed(() => void 0 !== a.accept ? a.accept.split(",").map((e2) => {
    return e2 = e2.trim(), "*" === e2 ? "*/" : (e2.endsWith("/*") && (e2 = e2.slice(0, e2.length - 1)), e2.toUpperCase());
  }) : null), u = computed(() => parseInt(a.maxFiles, 10)), c = computed(() => parseInt(a.maxTotalSize, 10));
  function d(t2) {
    if (e.value)
      if (t2 !== Object(t2) && (t2 = { target: null }), null !== t2.target && true === t2.target.matches('input[type="file"]'))
        0 === t2.clientX && 0 === t2.clientY && stop(t2);
      else {
        const e2 = o();
        e2 && e2 !== t2.target && e2.click(t2);
      }
  }
  function p2(t2) {
    e.value && t2 && n(null, t2);
  }
  function v(e2, t2, o2, n2) {
    let i2 = Array.from(t2 || e2.target.files);
    const r2 = [], d2 = () => {
      r2.length > 0 && l("rejected", r2);
    };
    if (void 0 !== a.accept && -1 === s.value.indexOf("*/") && (i2 = filterFiles(i2, r2, "accept", (e3) => {
      return s.value.some((t3) => e3.type.toUpperCase().startsWith(t3) || e3.name.toUpperCase().endsWith(t3));
    }), 0 === i2.length))
      return d2();
    if (void 0 !== a.maxFileSize) {
      const e3 = parseInt(a.maxFileSize, 10);
      if (i2 = filterFiles(i2, r2, "max-file-size", (t3) => {
        return t3.size <= e3;
      }), 0 === i2.length)
        return d2();
    }
    if (true !== a.multiple && i2.length > 0 && (i2 = [i2[0]]), i2.forEach((e3) => {
      e3.__key = e3.webkitRelativePath + e3.lastModified + e3.name + e3.size;
    }), true === n2) {
      const e3 = o2.map((e4) => e4.__key);
      i2 = filterFiles(i2, r2, "duplicate", (t3) => {
        return false === e3.includes(t3.__key);
      });
    }
    if (0 === i2.length)
      return d2();
    if (void 0 !== a.maxTotalSize) {
      let e3 = true === n2 ? o2.reduce((e4, t3) => e4 + t3.size, 0) : 0;
      if (i2 = filterFiles(i2, r2, "max-total-size", (t3) => {
        return e3 += t3.size, e3 <= c.value;
      }), 0 === i2.length)
        return d2();
    }
    if ("function" === typeof a.filter) {
      const e3 = a.filter(i2);
      i2 = filterFiles(i2, r2, "filter", (t3) => {
        return e3.includes(t3);
      });
    }
    if (void 0 !== a.maxFiles) {
      let e3 = true === n2 ? o2.length : 0;
      if (i2 = filterFiles(i2, r2, "max-files", () => {
        return e3++, e3 <= u.value;
      }), 0 === i2.length)
        return d2();
    }
    return d2(), i2.length > 0 ? i2 : void 0;
  }
  function m(e2) {
    stopAndPreventDrag(e2), true !== t.value && (t.value = true);
  }
  function f(e2) {
    stopAndPrevent(e2), e2.relatedTarget !== r.value && (t.value = false);
  }
  function g(e2) {
    stopAndPreventDrag(e2);
    const o2 = e2.dataTransfer.files;
    o2.length > 0 && n(null, o2), t.value = false;
  }
  function b(e2) {
    if (true === t.value)
      return h("div", { ref: r, class: `q-${e2}__dnd absolute-full`, onDragenter: stopAndPreventDrag, onDragover: stopAndPreventDrag, onDragleave: f, onDrop: g });
  }
  return Object.assign(i, { pickFiles: d, addFiles: p2 }), { pickFiles: d, addFiles: p2, onDragover: m, processFiles: v, getDndNode: b, maxFilesNumber: u, maxTotalSizeNumber: c };
}
function useFileFormDomProps(e, t) {
  function o() {
    const t2 = e.modelValue;
    try {
      const e2 = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      return Object(t2) === t2 && ("length" in t2 ? Array.from(t2) : [t2]).forEach((t3) => {
        e2.items.add(t3);
      }), { files: e2.files };
    } catch (e2) {
      return { files: void 0 };
    }
  }
  return computed(true === t ? () => {
    if ("file" === e.type)
      return o();
  } : o);
}
var QFile = createComponent({ name: "QFile", inheritAttrs: false, props: { ...useFieldProps, ...useFormProps, ...useFileProps, modelValue: [File, FileList, Array], append: Boolean, useChips: Boolean, displayValue: [String, Number], tabindex: { type: [String, Number], default: 0 }, counterLabel: Function, inputClass: [Array, String, Object], inputStyle: [Array, String, Object] }, emits: [...useFieldEmits, ...useFileEmits], setup(e, { slots: t, emit: o, attrs: n }) {
  const { proxy: a } = getCurrentInstance(), l = useFieldState(), i = ref(null), r = ref(false), s = useFormInputNameAttr(e), { pickFiles: u, onDragover: c, onDragleave: d, processFiles: p2, getDndNode: v } = useFile({ editable: l.editable, dnd: r, getFileInput: $, addFilesToQueue: M }), m = useFileFormDomProps(e), f = computed(() => Object(e.modelValue) === e.modelValue ? "length" in e.modelValue ? Array.from(e.modelValue) : [e.modelValue] : []), g = computed(() => fieldValueIsFilled(f.value)), b = computed(() => f.value.map((e2) => e2.name).join(", ")), y = computed(() => humanStorageSize(f.value.reduce((e2, t2) => e2 + t2.size, 0))), S = computed(() => ({ totalSize: y.value, filesNumber: f.value.length, maxFiles: e.maxFiles })), w = computed(() => ({ tabindex: -1, type: "file", title: "", accept: e.accept, capture: e.capture, name: s.value, ...n, id: l.targetUid.value, disabled: true !== l.editable.value })), C = computed(() => "q-file q-field--auto-height" + (true === r.value ? " q-file--dnd" : "")), x = computed(() => true === e.multiple && true === e.append);
  function k(e2) {
    const t2 = f.value.slice();
    t2.splice(e2, 1), q(t2);
  }
  function _(e2) {
    const t2 = f.value.findIndex(e2);
    t2 > -1 && k(t2);
  }
  function q(t2) {
    o("update:modelValue", true === e.multiple ? t2 : t2[0]);
  }
  function T(e2) {
    13 === e2.keyCode && prevent(e2);
  }
  function P(e2) {
    13 !== e2.keyCode && 32 !== e2.keyCode || u(e2);
  }
  function $() {
    return i.value;
  }
  function M(t2, o2) {
    const n2 = p2(t2, o2, f.value, x.value), a2 = $();
    void 0 !== a2 && null !== a2 && (a2.value = ""), void 0 !== n2 && ((true === e.multiple ? e.modelValue && n2.every((e2) => f.value.includes(e2)) : e.modelValue === n2[0]) || q(true === x.value ? f.value.concat(n2) : n2));
  }
  function B() {
    return [h("input", { class: [e.inputClass, "q-file__filler"], style: e.inputStyle })];
  }
  function Q() {
    if (void 0 !== t.file)
      return 0 === f.value.length ? B() : f.value.map((e2, o3) => t.file({ index: o3, file: e2, ref: this }));
    if (void 0 !== t.selected)
      return 0 === f.value.length ? B() : t.selected({ files: f.value, ref: this });
    if (true === e.useChips)
      return 0 === f.value.length ? B() : f.value.map((t2, o3) => h(QChip, { key: "file-" + o3, removable: l.editable.value, dense: true, textColor: e.color, tabindex: e.tabindex, onRemove: () => {
        k(o3);
      } }, () => h("span", { class: "ellipsis", textContent: t2.name })));
    const o2 = void 0 !== e.displayValue ? e.displayValue : b.value;
    return o2.length > 0 ? [h("div", { class: e.inputClass, style: e.inputStyle, textContent: o2 })] : B();
  }
  function E() {
    const t2 = { ref: i, ...w.value, ...m.value, class: "q-field__input fit absolute-full cursor-pointer", onChange: M };
    return true === e.multiple && (t2.multiple = true), h("input", t2);
  }
  return Object.assign(l, { fieldClass: C, emitValue: q, hasValue: g, inputRef: i, innerValue: f, floatingLabel: computed(() => true === g.value || fieldValueIsFilled(e.displayValue)), computedCounter: computed(() => {
    if (void 0 !== e.counterLabel)
      return e.counterLabel(S.value);
    const t2 = e.maxFiles;
    return `${f.value.length}${void 0 !== t2 ? " / " + t2 : ""} (${y.value})`;
  }), getControlChild: () => v("file"), getControl: () => {
    const t2 = { ref: l.targetRef, class: "q-field__native row items-center cursor-pointer", tabindex: e.tabindex };
    return true === l.editable.value && Object.assign(t2, { onDragover: c, onDragleave: d, onKeydown: T, onKeyup: P }), h("div", t2, [E()].concat(Q()));
  } }), Object.assign(a, { removeAtIndex: k, removeFile: _, getNativeElement: () => i.value }), useField(l);
} }), QFooter = createComponent({ name: "QFooter", props: { modelValue: { type: Boolean, default: true }, reveal: Boolean, bordered: Boolean, elevated: Boolean, heightHint: { type: [String, Number], default: 50 } }, emits: ["reveal", "focusin"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = inject(layoutKey, () => {
    console.error("QFooter needs to be child of QLayout");
  }), l = ref(parseInt(e.heightHint, 10)), i = ref(true), r = ref(true === isRuntimeSsrPreHydration.value || true === a.isContainer.value ? 0 : window.innerHeight), s = computed(() => true === e.reveal || a.view.value.indexOf("F") > -1 || n.platform.is.ios && true === a.isContainer.value), u = computed(() => true === a.isContainer.value ? a.containerHeight.value : r.value), c = computed(() => {
    if (true !== e.modelValue)
      return 0;
    if (true === s.value)
      return true === i.value ? l.value : 0;
    const t2 = a.scroll.value.position + u.value + l.value - a.height.value;
    return t2 > 0 ? t2 : 0;
  }), d = computed(() => true !== e.modelValue || true === s.value && true !== i.value), p2 = computed(() => true === e.modelValue && true === d.value && true === e.reveal), v = computed(() => "q-footer q-layout__section--marginal " + (true === s.value ? "fixed" : "absolute") + "-bottom" + (true === e.bordered ? " q-footer--bordered" : "") + (true === d.value ? " q-footer--hidden" : "") + (true !== e.modelValue ? " q-layout--prevent-focus" + (true !== s.value ? " hidden" : "") : "")), m = computed(() => {
    const e2 = a.rows.value.bottom, t2 = {};
    return "l" === e2[0] && true === a.left.space && (t2[true === n.lang.rtl ? "right" : "left"] = `${a.left.size}px`), "r" === e2[2] && true === a.right.space && (t2[true === n.lang.rtl ? "left" : "right"] = `${a.right.size}px`), t2;
  });
  function f(e2, t2) {
    a.update("footer", e2, t2);
  }
  function g(e2, t2) {
    e2.value !== t2 && (e2.value = t2);
  }
  function b({ height: e2 }) {
    g(l, e2), f("size", e2);
  }
  function y() {
    if (true !== e.reveal)
      return;
    const { direction: t2, position: o2, inflectionPoint: n2 } = a.scroll.value;
    g(i, "up" === t2 || o2 - n2 < 100 || a.height.value - u.value - o2 - l.value < 300);
  }
  function S(e2) {
    true === p2.value && g(i, true), o("focusin", e2);
  }
  watch(() => e.modelValue, (e2) => {
    f("space", e2), g(i, true), a.animate();
  }), watch(c, (e2) => {
    f("offset", e2);
  }), watch(() => e.reveal, (t2) => {
    false === t2 && g(i, e.modelValue);
  }), watch(i, (e2) => {
    a.animate(), o("reveal", e2);
  }), watch([l, a.scroll, a.height], y), watch(() => n.screen.height, (e2) => {
    true !== a.isContainer.value && g(r, e2);
  });
  const w = {};
  return a.instances.footer = w, true === e.modelValue && f("size", l.value), f("space", e.modelValue), f("offset", c.value), onBeforeUnmount(() => {
    a.instances.footer === w && (a.instances.footer = void 0, f("size", 0), f("offset", 0), f("space", false));
  }), () => {
    const o2 = hMergeSlot(t.default, [h(QResizeObserver, { debounce: 0, onResize: b })]);
    return true === e.elevated && o2.push(h("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), h("footer", { class: v.value, style: m.value, onFocusin: S }, o2);
  };
} }), QForm = createComponent({ name: "QForm", props: { autofocus: Boolean, noErrorFocus: Boolean, noResetFocus: Boolean, greedy: Boolean, onSubmit: Function }, emits: ["reset", "validation-success", "validation-error"], setup(e, { slots: t, emit: o }) {
  const n = getCurrentInstance(), a = ref(null);
  let l = 0;
  const i = [];
  function r(t2) {
    const n2 = "boolean" === typeof t2 ? t2 : true !== e.noErrorFocus, a2 = ++l, r2 = (e2, t3) => {
      o("validation-" + (true === e2 ? "success" : "error"), t3);
    }, s2 = (e2) => {
      const t3 = e2.validate();
      return "function" === typeof t3.then ? t3.then((t4) => ({ valid: t4, comp: e2 }), (t4) => ({ valid: false, comp: e2, err: t4 })) : Promise.resolve({ valid: t3, comp: e2 });
    }, u2 = true === e.greedy ? Promise.all(i.map(s2)).then((e2) => e2.filter((e3) => true !== e3.valid)) : i.reduce((e2, t3) => e2.then(() => {
      return s2(t3).then((e3) => {
        if (false === e3.valid)
          return Promise.reject(e3);
      });
    }), Promise.resolve()).catch((e2) => [e2]);
    return u2.then((e2) => {
      if (void 0 === e2 || 0 === e2.length)
        return a2 === l && r2(true), true;
      if (a2 === l) {
        const { comp: t3, err: o2 } = e2[0];
        if (void 0 !== o2 && console.error(o2), r2(false, t3), true === n2) {
          const t4 = e2.find(({ comp: e3 }) => "function" === typeof e3.focus && false === vmIsDestroyed(e3.$));
          void 0 !== t4 && t4.comp.focus();
        }
      }
      return false;
    });
  }
  function s() {
    l++, i.forEach((e2) => {
      "function" === typeof e2.resetValidation && e2.resetValidation();
    });
  }
  function u(t2) {
    void 0 !== t2 && stopAndPrevent(t2);
    const n2 = l + 1;
    r().then((a2) => {
      n2 === l && true === a2 && (void 0 !== e.onSubmit ? o("submit", t2) : void 0 !== t2 && void 0 !== t2.target && "function" === typeof t2.target.submit && t2.target.submit());
    });
  }
  function c(t2) {
    void 0 !== t2 && stopAndPrevent(t2), o("reset"), nextTick(() => {
      s(), true === e.autofocus && true !== e.noResetFocus && d();
    });
  }
  function d() {
    addFocusFn(() => {
      if (null === a.value)
        return;
      const e2 = a.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(a.value.querySelectorAll("[tabindex]"), (e3) => e3.tabIndex > -1);
      null !== e2 && void 0 !== e2 && e2.focus({ preventScroll: true });
    });
  }
  provide(formKey, { bindComponent(e2) {
    i.push(e2);
  }, unbindComponent(e2) {
    const t2 = i.indexOf(e2);
    t2 > -1 && i.splice(t2, 1);
  } });
  let p2 = false;
  return onDeactivated(() => {
    p2 = true;
  }), onActivated(() => {
    true === p2 && true === e.autofocus && d();
  }), onMounted(() => {
    true === e.autofocus && d();
  }), Object.assign(n.proxy, { validate: r, resetValidation: s, submit: u, reset: c, focus: d, getValidationComponents: () => i }), () => h("form", { class: "q-form", ref: a, onSubmit: u, onReset: c }, hSlot(t.default));
} }), QFormChildMixin = { inject: { [formKey]: { default: noop } }, watch: { disable(e) {
  const t = this.$.provides[formKey];
  void 0 !== t && (true === e ? (this.resetValidation(), t.unbindComponent(this)) : t.bindComponent(this));
} }, methods: { validate() {
}, resetValidation() {
} }, mounted() {
  const e = this.$.provides[formKey];
  void 0 !== e && true !== this.disable && e.bindComponent(this);
}, beforeUnmount() {
  const e = this.$.provides[formKey];
  void 0 !== e && true !== this.disable && e.unbindComponent(this);
} }, QHeader = createComponent({ name: "QHeader", props: { modelValue: { type: Boolean, default: true }, reveal: Boolean, revealOffset: { type: Number, default: 250 }, bordered: Boolean, elevated: Boolean, heightHint: { type: [String, Number], default: 50 } }, emits: ["reveal", "focusin"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = inject(layoutKey, () => {
    console.error("QHeader needs to be child of QLayout");
  }), l = ref(parseInt(e.heightHint, 10)), i = ref(true), r = computed(() => true === e.reveal || a.view.value.indexOf("H") > -1 || n.platform.is.ios && true === a.isContainer.value), s = computed(() => {
    if (true !== e.modelValue)
      return 0;
    if (true === r.value)
      return true === i.value ? l.value : 0;
    const t2 = l.value - a.scroll.value.position;
    return t2 > 0 ? t2 : 0;
  }), u = computed(() => true !== e.modelValue || true === r.value && true !== i.value), c = computed(() => true === e.modelValue && true === u.value && true === e.reveal), d = computed(() => "q-header q-layout__section--marginal " + (true === r.value ? "fixed" : "absolute") + "-top" + (true === e.bordered ? " q-header--bordered" : "") + (true === u.value ? " q-header--hidden" : "") + (true !== e.modelValue ? " q-layout--prevent-focus" : "")), p2 = computed(() => {
    const e2 = a.rows.value.top, t2 = {};
    return "l" === e2[0] && true === a.left.space && (t2[true === n.lang.rtl ? "right" : "left"] = `${a.left.size}px`), "r" === e2[2] && true === a.right.space && (t2[true === n.lang.rtl ? "left" : "right"] = `${a.right.size}px`), t2;
  });
  function v(e2, t2) {
    a.update("header", e2, t2);
  }
  function m(e2, t2) {
    e2.value !== t2 && (e2.value = t2);
  }
  function f({ height: e2 }) {
    m(l, e2), v("size", e2);
  }
  function g(e2) {
    true === c.value && m(i, true), o("focusin", e2);
  }
  watch(() => e.modelValue, (e2) => {
    v("space", e2), m(i, true), a.animate();
  }), watch(s, (e2) => {
    v("offset", e2);
  }), watch(() => e.reveal, (t2) => {
    false === t2 && m(i, e.modelValue);
  }), watch(i, (e2) => {
    a.animate(), o("reveal", e2);
  }), watch(a.scroll, (t2) => {
    true === e.reveal && m(i, "up" === t2.direction || t2.position <= e.revealOffset || t2.position - t2.inflectionPoint < 100);
  });
  const b = {};
  return a.instances.header = b, true === e.modelValue && v("size", l.value), v("space", e.modelValue), v("offset", s.value), onBeforeUnmount(() => {
    a.instances.header === b && (a.instances.header = void 0, v("size", 0), v("offset", 0), v("space", false));
  }), () => {
    const o2 = hUniqueSlot(t.default, []);
    return true === e.elevated && o2.push(h("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), o2.push(h(QResizeObserver, { debounce: 0, onResize: f })), h("header", { class: d.value, style: p2.value, onFocusin: g }, o2);
  };
} });
const useRatioProps = { ratio: [String, Number] };
function useRatio(e, t) {
  return computed(() => {
    const o = Number(e.ratio || (void 0 !== t ? t.value : void 0));
    return true !== isNaN(o) && o > 0 ? { paddingBottom: `${100 / o}%` } : null;
  });
}
const defaultRatio = 16 / 9;
var QImg = createComponent({ name: "QImg", props: { ...useRatioProps, src: String, srcset: String, sizes: String, alt: String, crossorigin: String, decoding: String, referrerpolicy: String, draggable: Boolean, loading: { type: String, default: "lazy" }, fetchpriority: { type: String, default: "auto" }, width: String, height: String, initialRatio: { type: [Number, String], default: defaultRatio }, placeholderSrc: String, fit: { type: String, default: "cover" }, position: { type: String, default: "50% 50%" }, imgClass: String, imgStyle: Object, noSpinner: Boolean, noNativeMenu: Boolean, noTransition: Boolean, spinnerColor: String, spinnerSize: String }, emits: ["load", "error"], setup(e, { slots: t, emit: o }) {
  const n = ref(e.initialRatio), a = useRatio(e, n);
  let l;
  const i = [ref(null), ref(void 0 !== e.placeholderSrc ? { src: e.placeholderSrc } : null)], r = ref(0), s = ref(false), u = ref(false), c = computed(() => `q-img q-img--${true === e.noNativeMenu ? "no-" : ""}menu`), d = computed(() => ({ width: e.width, height: e.height })), p2 = computed(() => `q-img__image ${void 0 !== e.imgClass ? e.imgClass + " " : ""}q-img__image--with${true === e.noTransition ? "out" : ""}-transition`), v = computed(() => ({ ...e.imgStyle, objectFit: e.fit, objectPosition: e.position }));
  function m() {
    return e.src || e.srcset || e.sizes ? { src: e.src, srcset: e.srcset, sizes: e.sizes } : null;
  }
  function f(e2) {
    if (clearTimeout(l), u.value = false, null === e2)
      return s.value = false, i[0].value = null, void (i[1].value = null);
    s.value = true, i[r.value].value = e2;
  }
  function g({ target: e2 }) {
    null !== l && (clearTimeout(l), n.value = 0 === e2.naturalHeight ? 0.5 : e2.naturalWidth / e2.naturalHeight, b(e2, 1));
  }
  function b(e2, t2) {
    null !== l && 1e3 !== t2 && (true === e2.complete ? y(e2) : l = setTimeout(() => {
      b(e2, t2 + 1);
    }, 50));
  }
  function y(e2) {
    null !== l && (r.value = 1 === r.value ? 0 : 1, i[r.value].value = null, s.value = false, u.value = false, o("load", e2.currentSrc || e2.src));
  }
  function S(e2) {
    clearTimeout(l), s.value = false, u.value = true, i[0].value = null, i[1].value = null, o("error", e2);
  }
  function w(e2, t2) {
    return h("div", { class: "q-img__container absolute-full", key: e2 }, t2);
  }
  function C(t2) {
    const o2 = i[t2].value, n2 = { key: "img_" + t2, class: p2.value, style: v.value, crossorigin: e.crossorigin, decoding: e.decoding, referrerpolicy: e.referrerpolicy, height: e.height, width: e.width, loading: e.loading, fetchpriority: e.fetchpriority, "aria-hidden": "true", draggable: e.draggable, ...o2 };
    return r.value === t2 ? (n2.class += " q-img__image--waiting", Object.assign(n2, { onLoad: g, onError: S })) : n2.class += " q-img__image--loaded", w("img" + t2, h("img", n2));
  }
  function x() {
    return true !== s.value ? h("div", { key: "content", class: "q-img__content absolute-full q-anchor--skip" }, hSlot(t[true === u.value ? "error" : "default"])) : h("div", { key: "loading", class: "q-img__loading absolute-full flex flex-center" }, void 0 !== t.loading ? t.loading() : true === e.noSpinner ? void 0 : [h(QSpinner, { color: e.spinnerColor, size: e.spinnerSize })]);
  }
  return watch(() => m(), f), f(m()), onBeforeUnmount(() => {
    clearTimeout(l), l = null;
  }), () => {
    const t2 = [];
    return null !== a.value && t2.push(h("div", { key: "filler", style: a.value })), true !== u.value && (null !== i[0].value && t2.push(C(0)), null !== i[1].value && t2.push(C(1))), t2.push(h(Transition, { name: "q-transition--fade" }, x)), h("div", { class: c.value, style: d.value, role: "img", "aria-label": e.alt }, t2);
  };
} });
const { passive: passive$3 } = listenOpts;
var QInfiniteScroll = createComponent({ name: "QInfiniteScroll", props: { offset: { type: Number, default: 500 }, debounce: { type: [String, Number], default: 100 }, scrollTarget: { default: void 0 }, initialIndex: Number, disable: Boolean, reverse: Boolean }, emits: ["load"], setup(e, { slots: t, emit: o }) {
  const n = ref(false), a = ref(true), l = ref(null);
  let i, r, s = e.initialIndex || 0;
  const u = computed(() => "q-infinite-scroll__loading" + (true === n.value ? "" : " invisible"));
  function c() {
    if (true === e.disable || true === n.value || false === a.value)
      return;
    const t2 = getScrollHeight(i), o2 = getVerticalScrollPosition(i), l2 = height(i);
    false === e.reverse ? Math.round(o2 + l2 + e.offset) >= Math.round(t2) && d() : Math.round(o2) <= e.offset && d();
  }
  function d() {
    if (true === e.disable || true === n.value || false === a.value)
      return;
    s++, n.value = true;
    const t2 = getScrollHeight(i);
    o("load", s, (o2) => {
      true === a.value && (n.value = false, nextTick(() => {
        if (true === e.reverse) {
          const e2 = getScrollHeight(i), o3 = getVerticalScrollPosition(i), n2 = e2 - t2;
          setVerticalScrollPosition(i, o3 + n2);
        }
        true === o2 ? m() : l.value && l.value.closest("body") && r();
      }));
    });
  }
  function p2() {
    s = 0;
  }
  function v() {
    false === a.value && (a.value = true, i.addEventListener("scroll", r, passive$3)), c();
  }
  function m() {
    true === a.value && (a.value = false, n.value = false, i.removeEventListener("scroll", r, passive$3), void 0 !== r && void 0 !== r.cancel && r.cancel());
  }
  function f() {
    if (i && true === a.value && i.removeEventListener("scroll", r, passive$3), i = getScrollTarget(l.value, e.scrollTarget), true === a.value) {
      if (i.addEventListener("scroll", r, passive$3), true === e.reverse) {
        const e2 = getScrollHeight(i), t2 = height(i);
        setVerticalScrollPosition(i, e2 - t2);
      }
      c();
    }
  }
  function g(e2) {
    s = e2;
  }
  function b(e2) {
    e2 = parseInt(e2, 10);
    const t2 = r;
    r = e2 <= 0 ? c : debounce(c, true === isNaN(e2) ? 100 : e2), i && true === a.value && (void 0 !== t2 && i.removeEventListener("scroll", t2, passive$3), i.addEventListener("scroll", r, passive$3));
  }
  watch(() => e.disable, (e2) => {
    true === e2 ? m() : v();
  }), watch(() => e.reverse, (e2) => {
    false === n.value && true === a.value && c();
  }), watch(() => e.scrollTarget, f), watch(() => e.debounce, b);
  let y = false;
  onActivated(() => {
    false !== y && i && setVerticalScrollPosition(i, y);
  }), onDeactivated(() => {
    y = !!i && getVerticalScrollPosition(i);
  }), onBeforeUnmount(() => {
    true === a.value && i.removeEventListener("scroll", r, passive$3);
  }), onMounted(() => {
    b(e.debounce), f();
  });
  const S = getCurrentInstance();
  return Object.assign(S.proxy, { poll: () => {
    void 0 !== r && r();
  }, trigger: d, stop: m, reset: p2, resume: v, setIndex: g }), () => {
    const o2 = hUniqueSlot(t.default, []);
    return true !== e.disable && true === a.value && o2[false === e.reverse ? "push" : "unshift"](h("div", { class: u.value }, hSlot(t.loading))), h("div", { class: "q-infinite-scroll", ref: l }, o2);
  };
} }), QInnerLoading = createComponent({ name: "QInnerLoading", props: { ...useDarkProps, ...useTransitionProps, showing: Boolean, color: String, size: { type: [String, Number], default: 42 }, label: String, labelClass: String, labelStyle: [String, Array, Object] }, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark(e, o.proxy.$q), { transition: a, transitionStyle: l } = useTransition(e, computed(() => e.showing)), i = computed(() => "q-inner-loading absolute-full column flex-center" + (true === n.value ? " q-inner-loading--dark" : "")), r = computed(() => "q-inner-loading__label" + (void 0 !== e.labelClass ? ` ${e.labelClass}` : ""));
  function s() {
    const t2 = [h(QSpinner, { size: e.size, color: e.color })];
    return void 0 !== e.label && t2.push(h("div", { class: r.value, style: e.labelStyle }, [e.label])), t2;
  }
  function u() {
    return true === e.showing ? h("div", { class: i.value, style: l.value }, void 0 !== t.default ? t.default() : s()) : null;
  }
  return () => h(Transition, { name: a.value, appear: true }, u);
} });
const NAMED_MASKS = { date: "####/##/##", datetime: "####/##/## ##:##", time: "##:##", fulltime: "##:##:##", phone: "(###) ### - ####", card: "#### #### #### ####" }, TOKENS = { "#": { pattern: "[\\d]", negate: "[^\\d]" }, S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" }, N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" }, A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (e) => e.toLocaleUpperCase() }, a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (e) => e.toLocaleLowerCase() }, X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (e) => e.toLocaleUpperCase() }, x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (e) => e.toLocaleLowerCase() } }, KEYS = Object.keys(TOKENS);
KEYS.forEach((e) => {
  TOKENS[e].regex = new RegExp(TOKENS[e].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g, MARKER = String.fromCharCode(1), useMaskProps = { mask: String, reverseFillMask: Boolean, fillMask: [Boolean, String], unmaskedValue: Boolean };
function useMask(e, t, o, n) {
  let a, l, i, r;
  const s = ref(null), u = ref(d());
  function c() {
    return true === e.autogrow || ["textarea", "text", "search", "url", "tel", "password"].includes(e.type);
  }
  function d() {
    if (v(), true === s.value) {
      const t2 = b(S(e.modelValue));
      return false !== e.fillMask ? w(t2) : t2;
    }
    return e.modelValue;
  }
  function p2(e2) {
    if (e2 < a.length)
      return a.slice(-e2);
    let t2 = "", o2 = a;
    const n2 = o2.indexOf(MARKER);
    if (n2 > -1) {
      for (let n3 = e2 - o2.length; n3 > 0; n3--)
        t2 += MARKER;
      o2 = o2.slice(0, n2) + t2 + o2.slice(n2);
    }
    return o2;
  }
  function v() {
    if (s.value = void 0 !== e.mask && e.mask.length > 0 && c(), false === s.value)
      return r = void 0, a = "", void (l = "");
    const t2 = void 0 === NAMED_MASKS[e.mask] ? e.mask : NAMED_MASKS[e.mask], o2 = "string" === typeof e.fillMask && e.fillMask.length > 0 ? e.fillMask.slice(0, 1) : "_", n2 = o2.replace(escRegex, "\\$&"), u2 = [], d2 = [], p3 = [];
    let v2 = true === e.reverseFillMask, m2 = "", f2 = "";
    t2.replace(tokenRegexMask, (e2, t3, o3, n3, a2) => {
      if (void 0 !== n3) {
        const e3 = TOKENS[n3];
        p3.push(e3), f2 = e3.negate, true === v2 && (d2.push("(?:" + f2 + "+)?(" + e3.pattern + "+)?(?:" + f2 + "+)?(" + e3.pattern + "+)?"), v2 = false), d2.push("(?:" + f2 + "+)?(" + e3.pattern + ")?");
      } else if (void 0 !== o3)
        m2 = "\\" + ("\\" === o3 ? "" : o3), p3.push(o3), u2.push("([^" + m2 + "]+)?" + m2 + "?");
      else {
        const e3 = void 0 !== t3 ? t3 : a2;
        m2 = "\\" === e3 ? "\\\\\\\\" : e3.replace(escRegex, "\\\\$&"), p3.push(e3), u2.push("([^" + m2 + "]+)?" + m2 + "?");
      }
    });
    const h3 = new RegExp("^" + u2.join("") + "(" + ("" === m2 ? "." : "[^" + m2 + "]") + "+)?$"), g2 = d2.length - 1, b2 = d2.map((t3, o3) => {
      return 0 === o3 && true === e.reverseFillMask ? new RegExp("^" + n2 + "*" + t3) : o3 === g2 ? new RegExp("^" + t3 + "(" + ("" === f2 ? "." : f2) + "+)?" + (true === e.reverseFillMask ? "$" : n2 + "*")) : new RegExp("^" + t3);
    });
    i = p3, r = (e2) => {
      const t3 = h3.exec(e2);
      null !== t3 && (e2 = t3.slice(1).join(""));
      const o3 = [], n3 = b2.length;
      for (let a2 = 0, l2 = e2; a2 < n3; a2++) {
        const e3 = b2[a2].exec(l2);
        if (null === e3)
          break;
        l2 = l2.slice(e3.shift().length), o3.push(...e3);
      }
      return o3.length > 0 ? o3.join("") : e2;
    }, a = p3.map((e2) => "string" === typeof e2 ? e2 : MARKER).join(""), l = a.split(MARKER).join(o2);
  }
  function m(t2, i2, r2) {
    const s2 = n.value, c2 = s2.selectionEnd, d2 = s2.value.length - c2, p3 = S(t2);
    true === i2 && v();
    const m2 = b(p3), f2 = false !== e.fillMask ? w(m2) : m2, g2 = u.value !== f2;
    s2.value !== f2 && (s2.value = f2), true === g2 && (u.value = f2), document.activeElement === s2 && nextTick(() => {
      if (f2 !== l)
        if ("insertFromPaste" !== r2 || true === e.reverseFillMask)
          if (["deleteContentBackward", "deleteContentForward"].indexOf(r2) > -1) {
            const t3 = true === e.reverseFillMask ? 0 === c2 ? f2.length > m2.length ? 1 : 0 : Math.max(0, f2.length - (f2 === l ? 0 : Math.min(m2.length, d2) + 1)) + 1 : c2;
            s2.setSelectionRange(t3, t3, "forward");
          } else if (true === e.reverseFillMask)
            if (true === g2) {
              const e2 = Math.max(0, f2.length - (f2 === l ? 0 : Math.min(m2.length, d2 + 1)));
              1 === e2 && 1 === c2 ? s2.setSelectionRange(e2, e2, "forward") : h2.rightReverse(s2, e2, e2);
            } else {
              const e2 = f2.length - d2;
              s2.setSelectionRange(e2, e2, "backward");
            }
          else if (true === g2) {
            const e2 = Math.max(0, a.indexOf(MARKER), Math.min(m2.length, c2) - 1);
            h2.right(s2, e2, e2);
          } else {
            const e2 = c2 - 1;
            h2.right(s2, e2, e2);
          }
        else {
          const e2 = c2 - 1;
          h2.right(s2, e2, e2);
        }
      else {
        const t3 = true === e.reverseFillMask ? l.length : 0;
        s2.setSelectionRange(t3, t3, "forward");
      }
    });
    const y2 = true === e.unmaskedValue ? S(f2) : f2;
    String(e.modelValue) !== y2 && o(y2, true);
  }
  function f(e2, t2, o2) {
    const n2 = b(S(e2.value));
    t2 = Math.max(0, a.indexOf(MARKER), Math.min(n2.length, t2)), e2.setSelectionRange(t2, o2, "forward");
  }
  watch(() => e.type + e.autogrow, v), watch(() => e.mask, (o2) => {
    if (void 0 !== o2)
      m(u.value, true);
    else {
      const o3 = S(u.value);
      v(), e.modelValue !== o3 && t("update:modelValue", o3);
    }
  }), watch(() => e.fillMask + e.reverseFillMask, () => {
    true === s.value && m(u.value, true);
  }), watch(() => e.unmaskedValue, () => {
    true === s.value && m(u.value);
  });
  const h2 = { left(e2, t2, o2, n2) {
    const l2 = -1 === a.slice(t2 - 1).indexOf(MARKER);
    let i2 = Math.max(0, t2 - 1);
    for (; i2 >= 0; i2--)
      if (a[i2] === MARKER) {
        t2 = i2, true === l2 && t2++;
        break;
      }
    if (i2 < 0 && void 0 !== a[t2] && a[t2] !== MARKER)
      return h2.right(e2, 0, 0);
    t2 >= 0 && e2.setSelectionRange(t2, true === n2 ? o2 : t2, "backward");
  }, right(e2, t2, o2, n2) {
    const l2 = e2.value.length;
    let i2 = Math.min(l2, o2 + 1);
    for (; i2 <= l2; i2++) {
      if (a[i2] === MARKER) {
        o2 = i2;
        break;
      }
      a[i2 - 1] === MARKER && (o2 = i2);
    }
    if (i2 > l2 && void 0 !== a[o2 - 1] && a[o2 - 1] !== MARKER)
      return h2.left(e2, l2, l2);
    e2.setSelectionRange(n2 ? t2 : o2, o2, "forward");
  }, leftReverse(e2, t2, o2, n2) {
    const a2 = p2(e2.value.length);
    let l2 = Math.max(0, t2 - 1);
    for (; l2 >= 0; l2--) {
      if (a2[l2 - 1] === MARKER) {
        t2 = l2;
        break;
      }
      if (a2[l2] === MARKER && (t2 = l2, 0 === l2))
        break;
    }
    if (l2 < 0 && void 0 !== a2[t2] && a2[t2] !== MARKER)
      return h2.rightReverse(e2, 0, 0);
    t2 >= 0 && e2.setSelectionRange(t2, true === n2 ? o2 : t2, "backward");
  }, rightReverse(e2, t2, o2, n2) {
    const a2 = e2.value.length, l2 = p2(a2), i2 = -1 === l2.slice(0, o2 + 1).indexOf(MARKER);
    let r2 = Math.min(a2, o2 + 1);
    for (; r2 <= a2; r2++)
      if (l2[r2 - 1] === MARKER) {
        o2 = r2, o2 > 0 && true === i2 && o2--;
        break;
      }
    if (r2 > a2 && void 0 !== l2[o2 - 1] && l2[o2 - 1] !== MARKER)
      return h2.leftReverse(e2, a2, a2);
    e2.setSelectionRange(true === n2 ? t2 : o2, o2, "forward");
  } };
  function g(t2) {
    if (true === shouldIgnoreKey(t2))
      return;
    const o2 = n.value, a2 = o2.selectionStart, l2 = o2.selectionEnd;
    if (37 === t2.keyCode || 39 === t2.keyCode) {
      const n2 = h2[(39 === t2.keyCode ? "right" : "left") + (true === e.reverseFillMask ? "Reverse" : "")];
      t2.preventDefault(), n2(o2, a2, l2, t2.shiftKey);
    } else
      8 === t2.keyCode && true !== e.reverseFillMask && a2 === l2 ? h2.left(o2, a2, l2, true) : 46 === t2.keyCode && true === e.reverseFillMask && a2 === l2 && h2.rightReverse(o2, a2, l2, true);
  }
  function b(t2) {
    if (void 0 === t2 || null === t2 || "" === t2)
      return "";
    if (true === e.reverseFillMask)
      return y(t2);
    const o2 = i;
    let n2 = 0, a2 = "";
    for (let e2 = 0; e2 < o2.length; e2++) {
      const l2 = t2[n2], i2 = o2[e2];
      if ("string" === typeof i2)
        a2 += i2, l2 === i2 && n2++;
      else {
        if (void 0 === l2 || !i2.regex.test(l2))
          return a2;
        a2 += void 0 !== i2.transform ? i2.transform(l2) : l2, n2++;
      }
    }
    return a2;
  }
  function y(e2) {
    const t2 = i, o2 = a.indexOf(MARKER);
    let n2 = e2.length - 1, l2 = "";
    for (let a2 = t2.length - 1; a2 >= 0 && n2 > -1; a2--) {
      const i2 = t2[a2];
      let r2 = e2[n2];
      if ("string" === typeof i2)
        l2 = i2 + l2, r2 === i2 && n2--;
      else {
        if (void 0 === r2 || !i2.regex.test(r2))
          return l2;
        do {
          l2 = (void 0 !== i2.transform ? i2.transform(r2) : r2) + l2, n2--, r2 = e2[n2];
        } while (o2 === a2 && void 0 !== r2 && i2.regex.test(r2));
      }
    }
    return l2;
  }
  function S(e2) {
    return "string" !== typeof e2 || void 0 === r ? "number" === typeof e2 ? r("" + e2) : e2 : r(e2);
  }
  function w(t2) {
    return l.length - t2.length <= 0 ? t2 : true === e.reverseFillMask && t2.length > 0 ? l.slice(0, -t2.length) + t2 : t2 + l.slice(t2.length);
  }
  return { innerValue: u, hasMask: s, moveCursorForPaste: f, updateMaskValue: m, onMaskedKeydown: g };
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/, isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u, isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/, isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(e) {
  return function(t) {
    if ("compositionend" === t.type || "change" === t.type) {
      if (true !== t.target.qComposing)
        return;
      t.target.qComposing = false, e(t);
    } else if ("compositionupdate" === t.type && true !== t.target.qComposing && "string" === typeof t.data) {
      const e2 = true === client.is.firefox ? false === isPlainText.test(t.data) : true === isJapanese.test(t.data) || true === isChinese.test(t.data) || true === isKorean.test(t.data);
      true === e2 && (t.target.qComposing = true);
    }
  };
}
var QInput = createComponent({ name: "QInput", inheritAttrs: false, props: { ...useFieldProps, ...useMaskProps, ...useFormProps, modelValue: { required: false }, shadowText: String, type: { type: String, default: "text" }, debounce: [String, Number], autogrow: Boolean, inputClass: [Array, String, Object], inputStyle: [Array, String, Object] }, emits: [...useFieldEmits, "paste", "change"], setup(e, { emit: t, attrs: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = {};
  let i, r, s, u, c = NaN;
  const d = ref(null), p2 = useFormInputNameAttr(e), { innerValue: v, hasMask: m, moveCursorForPaste: f, updateMaskValue: g, onMaskedKeydown: b } = useMask(e, t, B, d), y = useFileFormDomProps(e, true), S = computed(() => fieldValueIsFilled(v.value)), w = useKeyComposition(M), C = useFieldState(), x = computed(() => "textarea" === e.type || true === e.autogrow), k = computed(() => true === x.value || ["text", "search", "url", "tel", "password"].includes(e.type)), _ = computed(() => {
    const t2 = { ...C.splitAttrs.listeners.value, onInput: M, onPaste: $, onChange: E, onBlur: O, onFocus: stop };
    return t2.onCompositionstart = t2.onCompositionupdate = t2.onCompositionend = w, true === m.value && (t2.onKeydown = b), true === e.autogrow && (t2.onAnimationend = Q), t2;
  }), q = computed(() => {
    const t2 = { tabindex: 0, "data-autofocus": true === e.autofocus || void 0, rows: "textarea" === e.type ? 6 : void 0, "aria-label": e.label, name: p2.value, ...C.splitAttrs.attributes.value, id: C.targetUid.value, maxlength: e.maxlength, disabled: true === e.disable, readonly: true === e.readonly };
    return false === x.value && (t2.type = e.type), true === e.autogrow && (t2.rows = 1), t2;
  });
  function T() {
    addFocusFn(() => {
      const e2 = document.activeElement;
      null === d.value || d.value === e2 || null !== e2 && e2.id === C.targetUid.value || d.value.focus({ preventScroll: true });
    });
  }
  function P() {
    null !== d.value && d.value.select();
  }
  function $(o2) {
    if (true === m.value && true !== e.reverseFillMask) {
      const e2 = o2.target;
      f(e2, e2.selectionStart, e2.selectionEnd);
    }
    t("paste", o2);
  }
  function M(o2) {
    if (!o2 || !o2.target)
      return;
    if ("file" === e.type)
      return void t("update:modelValue", o2.target.files);
    const n2 = o2.target.value;
    if (true !== o2.target.qComposing) {
      if (true === m.value)
        g(n2, false, o2.inputType);
      else if (B(n2), true === k.value && o2.target === document.activeElement) {
        const { selectionStart: e2, selectionEnd: t2 } = o2.target;
        void 0 !== e2 && void 0 !== t2 && nextTick(() => {
          o2.target === document.activeElement && 0 === n2.indexOf(o2.target.value) && o2.target.setSelectionRange(e2, t2);
        });
      }
      true === e.autogrow && Q();
    } else
      l.value = n2;
  }
  function B(o2, n2) {
    u = () => {
      "number" !== e.type && true === l.hasOwnProperty("value") && delete l.value, e.modelValue !== o2 && c !== o2 && (c = o2, true === n2 && (r = true), t("update:modelValue", o2), nextTick(() => {
        c === o2 && (c = NaN);
      })), u = void 0;
    }, "number" === e.type && (i = true, l.value = o2), void 0 !== e.debounce ? (clearTimeout(s), l.value = o2, s = setTimeout(u, e.debounce)) : u();
  }
  function Q() {
    requestAnimationFrame(() => {
      const e2 = d.value;
      if (null !== e2) {
        const t2 = e2.parentNode.style, { overflow: o2 } = e2.style;
        true !== a.platform.is.firefox && (e2.style.overflow = "hidden"), e2.style.height = "1px", t2.marginBottom = e2.scrollHeight - 1 + "px", e2.style.height = e2.scrollHeight + "px", e2.style.overflow = o2, t2.marginBottom = "";
      }
    });
  }
  function E(e2) {
    w(e2), clearTimeout(s), void 0 !== u && u(), t("change", e2.target.value);
  }
  function O(t2) {
    void 0 !== t2 && stop(t2), clearTimeout(s), void 0 !== u && u(), i = false, r = false, delete l.value, "file" !== e.type && setTimeout(() => {
      null !== d.value && (d.value.value = void 0 !== v.value ? v.value : "");
    });
  }
  function A() {
    return true === l.hasOwnProperty("value") ? l.value : void 0 !== v.value ? v.value : "";
  }
  watch(() => e.type, () => {
    d.value && (d.value.value = e.modelValue);
  }), watch(() => e.modelValue, (t2) => {
    if (true === m.value) {
      if (true === r && (r = false, String(t2) === c))
        return;
      g(t2);
    } else
      v.value !== t2 && (v.value = t2, "number" === e.type && true === l.hasOwnProperty("value") && (true === i ? i = false : delete l.value));
    true === e.autogrow && nextTick(Q);
  }), watch(() => e.autogrow, (e2) => {
    true === e2 ? nextTick(Q) : null !== d.value && o.rows > 0 && (d.value.style.height = "auto");
  }), watch(() => e.dense, () => {
    true === e.autogrow && nextTick(Q);
  }), onBeforeUnmount(() => {
    O();
  }), onMounted(() => {
    true === e.autogrow && Q();
  }), Object.assign(C, { innerValue: v, fieldClass: computed(() => `q-${true === x.value ? "textarea" : "input"}` + (true === e.autogrow ? " q-textarea--autogrow" : "")), hasShadow: computed(() => "file" !== e.type && "string" === typeof e.shadowText && e.shadowText.length > 0), inputRef: d, emitValue: B, hasValue: S, floatingLabel: computed(() => true === S.value || fieldValueIsFilled(e.displayValue)), getControl: () => {
    return h(true === x.value ? "textarea" : "input", { ref: d, class: ["q-field__native q-placeholder", e.inputClass], style: e.inputStyle, ...q.value, ..._.value, ..."file" !== e.type ? { value: A() } : y.value });
  }, getShadowControl: () => {
    return h("div", { class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (true === x.value ? "" : " text-no-wrap") }, [h("span", { class: "invisible" }, A()), h("span", e.shadowText)]);
  } });
  const L = useField(C);
  return Object.assign(n, { focus: T, select: P, getNativeElement: () => d.value }), L;
} });
const defaultCfg$1 = { threshold: 0, root: null, rootMargin: "0px" };
function update$3(e, t, o) {
  let n, a, l;
  "function" === typeof o ? (n = o, a = defaultCfg$1, l = void 0 === t.cfg) : (n = o.handler, a = Object.assign({}, defaultCfg$1, o.cfg), l = void 0 === t.cfg || false === isDeepEqual(t.cfg, a)), t.handler !== n && (t.handler = n), true === l && (t.cfg = a, void 0 !== t.observer && t.observer.unobserve(e), t.observer = new IntersectionObserver(([o2]) => {
    if ("function" === typeof t.handler) {
      if (null === o2.rootBounds && true === document.body.contains(e))
        return t.observer.unobserve(e), void t.observer.observe(e);
      const n2 = t.handler(o2, t.observer);
      (false === n2 || true === t.once && true === o2.isIntersecting) && destroy$1(e);
    }
  }, a), t.observer.observe(e));
}
function destroy$1(e) {
  const t = e.__qvisible;
  void 0 !== t && (void 0 !== t.observer && t.observer.unobserve(e), delete e.__qvisible);
}
var Intersection = createDirective({ name: "intersection", mounted(e, { modifiers: t, value: o }) {
  const n = { once: true === t.once };
  update$3(e, n, o), e.__qvisible = n;
}, updated(e, t) {
  const o = e.__qvisible;
  void 0 !== o && update$3(e, o, t.value);
}, beforeUnmount: destroy$1 }), QIntersection = createComponent({ name: "QIntersection", props: { tag: { type: String, default: "div" }, once: Boolean, transition: String, transitionDuration: { type: [String, Number], default: 300 }, ssrPrerender: Boolean, margin: String, threshold: [Number, Array], root: { default: null }, disable: Boolean, onVisibility: Function }, setup(e, { slots: t, emit: o }) {
  const n = ref(true === isRuntimeSsrPreHydration.value && e.ssrPrerender), a = computed(() => void 0 !== e.root || void 0 !== e.margin || void 0 !== e.threshold ? { handler: s, cfg: { root: e.root, rootMargin: e.margin, threshold: e.threshold } } : s), l = computed(() => true !== e.disable && (true !== isRuntimeSsrPreHydration.value || true !== e.once || true !== e.ssrPrerender)), i = computed(() => {
    return [[Intersection, a.value, void 0, { once: e.once }]];
  }), r = computed(() => `--q-transition-duration: ${e.transitionDuration}ms`);
  function s(t2) {
    n.value !== t2.isIntersecting && (n.value = t2.isIntersecting, void 0 !== e.onVisibility && o("visibility", n.value));
  }
  function u() {
    return true === n.value ? [h("div", { key: "content", style: r.value }, hSlot(t.default))] : void 0;
  }
  return () => {
    const t2 = e.transition ? [h(Transition, { name: "q-transition--" + e.transition }, u)] : u();
    return hDir(e.tag, { class: "q-intersection" }, t2, "main", l.value, () => i.value);
  };
} }), QList = createComponent({ name: "QList", props: { ...useDarkProps, bordered: Boolean, dense: Boolean, separator: Boolean, padding: Boolean }, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark(e, o.proxy.$q), a = computed(() => "q-list" + (true === e.bordered ? " q-list--bordered" : "") + (true === e.dense ? " q-list--dense" : "") + (true === e.separator ? " q-list--separator" : "") + (true === n.value ? " q-list--dark" : "") + (true === e.padding ? " q-list--padding" : ""));
  return () => h("div", { class: a.value }, hSlot(t.default));
} });
const keyCodes$1 = [34, 37, 40, 33, 39, 38], commonPropsName = Object.keys(useCircularCommonProps);
var QKnob = createComponent({ name: "QKnob", props: { ...useFormProps, ...useCircularCommonProps, modelValue: { type: Number, required: true }, innerMin: Number, innerMax: Number, step: { type: Number, default: 1, validator: (e) => e >= 0 }, tabindex: { type: [Number, String], default: 0 }, disable: Boolean, readonly: Boolean }, emits: ["update:modelValue", "change", "drag-value"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = ref(e.modelValue), i = ref(false), r = computed(() => true === isNaN(e.innerMin) || e.innerMin < e.min ? e.min : e.innerMin), s = computed(() => true === isNaN(e.innerMax) || e.innerMax > e.max ? e.max : e.innerMax);
  let u;
  function c() {
    l.value = null === e.modelValue ? r.value : between(e.modelValue, r.value, s.value), P(true);
  }
  watch(() => `${e.modelValue}|${r.value}|${s.value}`, c), c();
  const d = computed(() => false === e.disable && false === e.readonly), p2 = computed(() => "q-knob non-selectable" + (true === d.value ? " q-knob--editable" : true === e.disable ? " disabled" : "")), v = computed(() => (String(e.step).trim("0").split(".")[1] || "").length), m = computed(() => 0 === e.step ? 1 : e.step), f = computed(() => true === e.instantFeedback || true === i.value), g = true === a.platform.is.mobile ? computed(() => true === d.value ? { onClick: k } : {}) : computed(() => true === d.value ? { onMousedown: x, onClick: k, onKeydown: _, onKeyup: T } : {}), b = computed(() => true === d.value ? { tabindex: e.tabindex } : { [`aria-${true === e.disable ? "disabled" : "readonly"}`]: "true" }), y = computed(() => {
    const t2 = {};
    return commonPropsName.forEach((o2) => {
      t2[o2] = e[o2];
    }), t2;
  });
  function S(e2) {
    e2.isFinal ? (q(e2.evt, true), i.value = false) : e2.isFirst ? (C(), i.value = true, q(e2.evt)) : q(e2.evt);
  }
  const w = computed(() => {
    return [[TouchPan, S, void 0, { prevent: true, stop: true, mouse: true }]];
  });
  function C() {
    const { top: e2, left: t2, width: o2, height: a2 } = n.$el.getBoundingClientRect();
    u = { top: e2 + a2 / 2, left: t2 + o2 / 2 };
  }
  function x(e2) {
    C(), q(e2);
  }
  function k(e2) {
    C(), q(e2, true);
  }
  function _(e2) {
    if (!keyCodes$1.includes(e2.keyCode))
      return;
    stopAndPrevent(e2);
    const t2 = ([34, 33].includes(e2.keyCode) ? 10 : 1) * m.value, o2 = [34, 37, 40].includes(e2.keyCode) ? -t2 : t2;
    l.value = between(parseFloat((l.value + o2).toFixed(v.value)), r.value, s.value), P();
  }
  function q(t2, n2) {
    const i2 = position(t2), c2 = Math.abs(i2.top - u.top), d2 = Math.sqrt(c2 ** 2 + Math.abs(i2.left - u.left) ** 2);
    let p3 = Math.asin(c2 / d2) * (180 / Math.PI);
    p3 = i2.top < u.top ? u.left < i2.left ? 90 - p3 : 270 + p3 : u.left < i2.left ? p3 + 90 : 270 - p3, true === a.lang.rtl ? p3 = normalizeToInterval(-p3 - e.angle, 0, 360) : e.angle && (p3 = normalizeToInterval(p3 - e.angle, 0, 360)), true === e.reverse && (p3 = 360 - p3);
    let f2 = e.min + p3 / 360 * (e.max - e.min);
    if (0 !== m.value) {
      const e2 = f2 % m.value;
      f2 = f2 - e2 + (Math.abs(e2) >= m.value / 2 ? (e2 < 0 ? -1 : 1) * m.value : 0), f2 = parseFloat(f2.toFixed(v.value));
    }
    f2 = between(f2, r.value, s.value), o("drag-value", f2), l.value !== f2 && (l.value = f2), P(n2);
  }
  function T(e2) {
    keyCodes$1.includes(e2.keyCode) && P(true);
  }
  function P(t2) {
    e.modelValue !== l.value && o("update:modelValue", l.value), true === t2 && o("change", l.value);
  }
  const $ = useFormAttrs(e);
  function M() {
    return h("input", $.value);
  }
  return () => {
    const o2 = { class: p2.value, role: "slider", "aria-valuemin": r.value, "aria-valuemax": s.value, "aria-valuenow": e.modelValue, ...b.value, ...y.value, value: l.value, instantFeedback: f.value, ...g.value }, n2 = { default: t.default };
    return true === d.value && void 0 !== e.name && (n2.internal = M), hDir(QCircularProgress, o2, n2, "knob", d.value, () => w.value);
  };
} });
const { passive: passive$2 } = listenOpts, axisValues = ["both", "horizontal", "vertical"];
var QScrollObserver = createComponent({ name: "QScrollObserver", props: { axis: { type: String, validator: (e) => axisValues.includes(e), default: "vertical" }, debounce: [String, Number], scrollTarget: { default: void 0 } }, emits: ["scroll"], setup(e, { emit: t }) {
  const o = { position: { top: 0, left: 0 }, direction: "down", directionChanged: false, delta: { top: 0, left: 0 }, inflectionPoint: { top: 0, left: 0 } };
  let n, a, l = null;
  function i() {
    null !== l && l();
    const a2 = Math.max(0, getVerticalScrollPosition(n)), i2 = getHorizontalScrollPosition(n), r2 = { top: a2 - o.position.top, left: i2 - o.position.left };
    if ("vertical" === e.axis && 0 === r2.top || "horizontal" === e.axis && 0 === r2.left)
      return;
    const s2 = Math.abs(r2.top) >= Math.abs(r2.left) ? r2.top < 0 ? "up" : "down" : r2.left < 0 ? "left" : "right";
    o.position = { top: a2, left: i2 }, o.directionChanged = o.direction !== s2, o.delta = r2, true === o.directionChanged && (o.direction = s2, o.inflectionPoint = o.position), t("scroll", { ...o });
  }
  function r() {
    n = getScrollTarget(a, e.scrollTarget), n.addEventListener("scroll", u, passive$2), u(true);
  }
  function s() {
    void 0 !== n && (n.removeEventListener("scroll", u, passive$2), n = void 0);
  }
  function u(t2) {
    if (true === t2 || 0 === e.debounce || "0" === e.debounce)
      i();
    else if (null === l) {
      const [t3, o2] = e.debounce ? [setTimeout(i, e.debounce), clearTimeout] : [requestAnimationFrame(i), cancelAnimationFrame];
      l = () => {
        o2(t3), l = null;
      };
    }
  }
  watch(() => e.scrollTarget, () => {
    s(), r();
  });
  const { proxy: c } = getCurrentInstance();
  return onMounted(() => {
    a = c.$el.parentNode, r();
  }), onBeforeUnmount(() => {
    null !== l && l(), s();
  }), Object.assign(c, { trigger: u, getPosition: () => o }), noop;
} }), QLayout = createComponent({ name: "QLayout", props: { container: Boolean, view: { type: String, default: "hhh lpr fff", validator: (e) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase()) }, onScroll: Function, onScrollHeight: Function, onResize: Function }, setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = ref(null), l = ref(n.screen.height), i = ref(true === e.container ? 0 : n.screen.width), r = ref({ position: 0, direction: "down", inflectionPoint: 0 }), s = ref(0), u = ref(true === isRuntimeSsrPreHydration.value ? 0 : getScrollbarWidth()), c = computed(() => "q-layout q-layout--" + (true === e.container ? "containerized" : "standard")), d = computed(() => false === e.container ? { minHeight: n.screen.height + "px" } : null), p2 = computed(() => 0 !== u.value ? { [true === n.lang.rtl ? "left" : "right"]: `${u.value}px` } : null), v = computed(() => 0 !== u.value ? { [true === n.lang.rtl ? "right" : "left"]: 0, [true === n.lang.rtl ? "left" : "right"]: `-${u.value}px`, width: `calc(100% + ${u.value}px)` } : null);
  function m(t2) {
    if (true === e.container || true !== document.qScrollPrevented) {
      const n2 = { position: t2.position.top, direction: t2.direction, directionChanged: t2.directionChanged, inflectionPoint: t2.inflectionPoint.top, delta: t2.delta.top };
      r.value = n2, void 0 !== e.onScroll && o("scroll", n2);
    }
  }
  function f(t2) {
    const { height: n2, width: a2 } = t2;
    let r2 = false;
    l.value !== n2 && (r2 = true, l.value = n2, void 0 !== e.onScrollHeight && o("scroll-height", n2), b()), i.value !== a2 && (r2 = true, i.value = a2), true === r2 && void 0 !== e.onResize && o("resize", t2);
  }
  function g({ height: e2 }) {
    s.value !== e2 && (s.value = e2, b());
  }
  function b() {
    if (true === e.container) {
      const e2 = l.value > s.value ? getScrollbarWidth() : 0;
      u.value !== e2 && (u.value = e2);
    }
  }
  let y;
  const S = { instances: {}, view: computed(() => e.view), isContainer: computed(() => e.container), rootRef: a, height: l, containerHeight: s, scrollbarWidth: u, totalWidth: computed(() => i.value + u.value), rows: computed(() => {
    const t2 = e.view.toLowerCase().split(" ");
    return { top: t2[0].split(""), middle: t2[1].split(""), bottom: t2[2].split("") };
  }), header: reactive({ size: 0, offset: 0, space: false }), right: reactive({ size: 300, offset: 0, space: false }), footer: reactive({ size: 0, offset: 0, space: false }), left: reactive({ size: 300, offset: 0, space: false }), scroll: r, animate() {
    void 0 !== y ? clearTimeout(y) : document.body.classList.add("q-body--layout-animate"), y = setTimeout(() => {
      document.body.classList.remove("q-body--layout-animate"), y = void 0;
    }, 155);
  }, update(e2, t2, o2) {
    S[e2][t2] = o2;
  } };
  if (provide(layoutKey, S), getScrollbarWidth() > 0) {
    let w = function() {
      t2 = null, o2.classList.remove("hide-scrollbar");
    }, C = function() {
      if (null === t2) {
        if (o2.scrollHeight > n.screen.height)
          return;
        o2.classList.add("hide-scrollbar");
      } else
        clearTimeout(t2);
      t2 = setTimeout(w, 300);
    }, x = function(e2) {
      null !== t2 && "remove" === e2 && (clearTimeout(t2), w()), window[`${e2}EventListener`]("resize", C);
    };
    let t2 = null;
    const o2 = document.body;
    watch(() => true !== e.container ? "add" : "remove", x), true !== e.container && x("add"), onUnmounted(() => {
      x("remove");
    });
  }
  return () => {
    const o2 = hMergeSlot(t.default, [h(QScrollObserver, { onScroll: m }), h(QResizeObserver, { onResize: f })]), n2 = h("div", { class: c.value, style: d.value, ref: true === e.container ? void 0 : a, tabindex: -1 }, o2);
    return true === e.container ? h("div", { class: "q-layout-container overflow-hidden", ref: a }, [h(QResizeObserver, { onResize: g }), h("div", { class: "absolute-full", style: p2.value }, [h("div", { class: "scroll", style: v.value }, [n2])])]) : n2;
  };
} });
const separatorValues = ["horizontal", "vertical", "cell", "none"];
var QMarkupTable = createComponent({ name: "QMarkupTable", props: { ...useDarkProps, dense: Boolean, flat: Boolean, bordered: Boolean, square: Boolean, wrapCells: Boolean, separator: { type: String, default: "horizontal", validator: (e) => separatorValues.includes(e) } }, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark(e, o.proxy.$q), a = computed(() => `q-markup-table q-table__container q-table__card q-table--${e.separator}-separator` + (true === n.value ? " q-table--dark q-table__card--dark q-dark" : "") + (true === e.dense ? " q-table--dense" : "") + (true === e.flat ? " q-table--flat" : "") + (true === e.bordered ? " q-table--bordered" : "") + (true === e.square ? " q-table--square" : "") + (false === e.wrapCells ? " q-table--no-wrap" : ""));
  return () => h("div", { class: a.value }, [h("table", { class: "q-table" }, hSlot(t.default))]);
} }), QNoSsr = createComponent({ name: "QNoSsr", props: { tag: { type: String, default: "div" }, placeholder: String }, setup(e, { slots: t }) {
  const o = useCanRender();
  return () => {
    const n = {};
    if (true === o.value) {
      const o2 = hSlot(t.default);
      return void 0 === o2 ? o2 : o2.length > 1 ? h(e.tag, n, o2) : o2[0];
    }
    n.class = "q-no-ssr-placeholder";
    const a = hSlot(t.placeholder);
    return void 0 !== a ? a.length > 1 ? h(e.tag, n, a) : a[0] : void 0 !== e.placeholder ? h(e.tag, n, e.placeholder) : void 0;
  };
} });
const svg$m = h("svg", { key: "svg", class: "q-radio__bg absolute non-selectable", viewBox: "0 0 24 24" }, [h("path", { d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12" }), h("path", { class: "q-radio__check", d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6" })]);
var QRadio = createComponent({ name: "QRadio", props: { ...useDarkProps, ...useSizeProps, ...useFormProps, modelValue: { required: true }, val: { required: true }, label: String, leftLabel: Boolean, checkedIcon: String, uncheckedIcon: String, color: String, keepColor: Boolean, dense: Boolean, disable: Boolean, tabindex: [String, Number] }, emits: ["update:modelValue"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), a = useDark(e, n.$q), l = useSize(e, optionSizes), i = ref(null), { refocusTargetEl: r, refocusTarget: s } = useRefocusTarget(e, i), u = computed(() => toRaw(e.modelValue) === toRaw(e.val)), c = computed(() => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (true === e.disable ? " disabled" : "") + (true === a.value ? " q-radio--dark" : "") + (true === e.dense ? " q-radio--dense" : "") + (true === e.leftLabel ? " reverse" : "")), d = computed(() => {
    const t2 = void 0 === e.color || true !== e.keepColor && true !== u.value ? "" : ` text-${e.color}`;
    return `q-radio__inner relative-position q-radio__inner--${true === u.value ? "truthy" : "falsy"}${t2}`;
  }), p2 = computed(() => (true === u.value ? e.checkedIcon : e.uncheckedIcon) || null), v = computed(() => true === e.disable ? -1 : e.tabindex || 0), m = computed(() => {
    const t2 = { type: "radio" };
    return void 0 !== e.name && Object.assign(t2, { "^checked": true === u.value ? "checked" : void 0, name: e.name, value: e.val }), t2;
  }), f = useFormInject(m);
  function g(t2) {
    void 0 !== t2 && (stopAndPrevent(t2), s(t2)), true !== e.disable && true !== u.value && o("update:modelValue", e.val, t2);
  }
  function b(e2) {
    13 !== e2.keyCode && 32 !== e2.keyCode || stopAndPrevent(e2);
  }
  function y(e2) {
    13 !== e2.keyCode && 32 !== e2.keyCode || g(e2);
  }
  return Object.assign(n, { set: g }), () => {
    const o2 = null !== p2.value ? [h("div", { key: "icon", class: "q-radio__icon-container absolute-full flex flex-center no-wrap" }, [h(QIcon, { class: "q-radio__icon", name: p2.value })])] : [svg$m];
    true !== e.disable && f(o2, "unshift", " q-radio__native q-ma-none q-pa-none");
    const n2 = [h("div", { class: d.value, style: l.value, "aria-hidden": "true" }, o2)];
    null !== r.value && n2.push(r.value);
    const a2 = void 0 !== e.label ? hMergeSlot(t.default, [e.label]) : hSlot(t.default);
    return void 0 !== a2 && n2.push(h("div", { class: "q-radio__label q-anchor--skip" }, a2)), h("div", { ref: i, class: c.value, tabindex: v.value, role: "radio", "aria-label": e.label, "aria-checked": true === u.value ? "true" : "false", "aria-disabled": true === e.disable ? "true" : void 0, onClick: g, onKeydown: b, onKeyup: y }, n2);
  };
} }), QToggle = createComponent({ name: "QToggle", props: { ...useCheckboxProps, icon: String, iconColor: String }, emits: useCheckboxEmits, setup(e) {
  function t(t2, o) {
    const n = computed(() => (true === t2.value ? e.checkedIcon : true === o.value ? e.indeterminateIcon : e.uncheckedIcon) || e.icon), a = computed(() => true === t2.value ? e.iconColor : null);
    return () => [h("div", { class: "q-toggle__track" }), h("div", { class: "q-toggle__thumb absolute flex flex-center no-wrap" }, void 0 !== n.value ? [h(QIcon, { name: n.value, color: a.value })] : void 0)];
  }
  return useCheckbox("toggle", t);
} });
const components$1 = { radio: QRadio, checkbox: QCheckbox, toggle: QToggle }, typeValues = Object.keys(components$1);
var QOptionGroup = createComponent({ name: "QOptionGroup", props: { ...useDarkProps, modelValue: { required: true }, options: { type: Array, validator: (e) => e.every((e2) => "value" in e2 && "label" in e2) }, name: String, type: { default: "radio", validator: (e) => typeValues.includes(e) }, color: String, keepColor: Boolean, dense: Boolean, size: String, leftLabel: Boolean, inline: Boolean, disable: Boolean }, emits: ["update:modelValue"], setup(e, { emit: t, slots: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = Array.isArray(e.modelValue);
  "radio" === e.type ? true === a && console.error("q-option-group: model should not be array") : false === a && console.error("q-option-group: model should be array in your case");
  const l = useDark(e, n), i = computed(() => components$1[e.type]), r = computed(() => "q-option-group q-gutter-x-sm" + (true === e.inline ? " q-option-group--inline" : "")), s = computed(() => {
    const t2 = {};
    return "radio" === e.type && (t2.role = "radiogroup", true === e.disable && (t2["aria-disabled"] = "true")), t2;
  });
  function u(e2) {
    t("update:modelValue", e2);
  }
  return () => h("div", { class: r.value, ...s.value }, e.options.map((t2, n2) => {
    const a2 = void 0 !== o["label-" + n2] ? () => o["label-" + n2](t2) : void 0 !== o.label ? () => o.label(t2) : void 0;
    return h("div", [h(i.value, { modelValue: e.modelValue, val: t2.value, name: void 0 === t2.name ? e.name : t2.name, disable: e.disable || t2.disable, label: void 0 === a2 ? t2.label : null, leftLabel: void 0 === t2.leftLabel ? e.leftLabel : t2.leftLabel, color: void 0 === t2.color ? e.color : t2.color, checkedIcon: t2.checkedIcon, uncheckedIcon: t2.uncheckedIcon, dark: t2.dark || l.value, size: void 0 === t2.size ? e.size : t2.size, dense: e.dense, keepColor: void 0 === t2.keepColor ? e.keepColor : t2.keepColor, "onUpdate:modelValue": u }, a2)]);
  }));
} }), QPage = createComponent({ name: "QPage", props: { padding: Boolean, styleFn: Function }, setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = inject(layoutKey);
  inject(pageContainerKey, () => {
    console.error("QPage needs to be child of QPageContainer");
  });
  const a = computed(() => {
    const t2 = (true === n.header.space ? n.header.size : 0) + (true === n.footer.space ? n.footer.size : 0);
    if ("function" === typeof e.styleFn) {
      const a2 = true === n.isContainer.value ? n.containerHeight.value : o.screen.height;
      return e.styleFn(t2, a2);
    }
    return { minHeight: true === n.isContainer.value ? n.containerHeight.value - t2 + "px" : 0 === o.screen.height ? 0 !== t2 ? `calc(100vh - ${t2}px)` : "100vh" : o.screen.height - t2 + "px" };
  }), l = computed(() => `q-page${true === e.padding ? " q-layout-padding" : ""}`);
  return () => h("main", { class: l.value, style: a.value }, hSlot(t.default));
} }), QPageContainer = createComponent({ name: "QPageContainer", setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = inject(layoutKey, () => {
    console.error("QPageContainer needs to be child of QLayout");
  });
  provide(pageContainerKey, true);
  const a = computed(() => {
    const e2 = {};
    return true === n.header.space && (e2.paddingTop = `${n.header.size}px`), true === n.right.space && (e2[`padding${true === o.lang.rtl ? "Left" : "Right"}`] = `${n.right.size}px`), true === n.footer.space && (e2.paddingBottom = `${n.footer.size}px`), true === n.left.space && (e2[`padding${true === o.lang.rtl ? "Right" : "Left"}`] = `${n.left.size}px`), e2;
  });
  return () => h("div", { class: "q-page-container", style: a.value }, hSlot(t.default));
} });
const usePageStickyProps = { position: { type: String, default: "bottom-right", validator: (e) => ["top-right", "top-left", "bottom-right", "bottom-left", "top", "right", "bottom", "left"].includes(e) }, offset: { type: Array, validator: (e) => 2 === e.length }, expand: Boolean };
function usePageSticky() {
  const { props: e, proxy: { $q: t } } = getCurrentInstance(), o = inject(layoutKey, () => {
    console.error("QPageSticky needs to be child of QLayout");
  }), n = computed(() => {
    const t2 = e.position;
    return { top: t2.indexOf("top") > -1, right: t2.indexOf("right") > -1, bottom: t2.indexOf("bottom") > -1, left: t2.indexOf("left") > -1, vertical: "top" === t2 || "bottom" === t2, horizontal: "left" === t2 || "right" === t2 };
  }), a = computed(() => o.header.offset), l = computed(() => o.right.offset), i = computed(() => o.footer.offset), r = computed(() => o.left.offset), s = computed(() => {
    let o2 = 0, s2 = 0;
    const u2 = n.value, c2 = true === t.lang.rtl ? -1 : 1;
    true === u2.top && 0 !== a.value ? s2 = `${a.value}px` : true === u2.bottom && 0 !== i.value && (s2 = `${-i.value}px`), true === u2.left && 0 !== r.value ? o2 = `${c2 * r.value}px` : true === u2.right && 0 !== l.value && (o2 = `${-c2 * l.value}px`);
    const d = { transform: `translate(${o2}, ${s2})` };
    return e.offset && (d.margin = `${e.offset[1]}px ${e.offset[0]}px`), true === u2.vertical ? (0 !== r.value && (d[true === t.lang.rtl ? "right" : "left"] = `${r.value}px`), 0 !== l.value && (d[true === t.lang.rtl ? "left" : "right"] = `${l.value}px`)) : true === u2.horizontal && (0 !== a.value && (d.top = `${a.value}px`), 0 !== i.value && (d.bottom = `${i.value}px`)), d;
  }), u = computed(() => `q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${true === e.expand ? "expand" : "shrink"}`);
  function c(t2) {
    const o2 = hSlot(t2.default);
    return h("div", { class: u.value, style: s.value }, true === e.expand ? o2 : [h("div", o2)]);
  }
  return { $layout: o, getStickyContent: c };
}
var QPageScroller = createComponent({ name: "QPageScroller", props: { ...usePageStickyProps, scrollOffset: { type: Number, default: 1e3 }, reverse: Boolean, duration: { type: Number, default: 300 }, offset: { default: () => [18, 18] } }, emits: ["click"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), { $layout: a, getStickyContent: l } = usePageSticky(), i = ref(null);
  let r;
  const s = computed(() => a.height.value - (true === a.isContainer.value ? a.containerHeight.value : n.screen.height));
  function u() {
    return true === e.reverse ? s.value - a.scroll.value.position > e.scrollOffset : a.scroll.value.position > e.scrollOffset;
  }
  const c = ref(u());
  function d() {
    const e2 = u();
    c.value !== e2 && (c.value = e2);
  }
  function p2() {
    true === e.reverse ? void 0 === r && (r = watch(s, d)) : v();
  }
  function v() {
    void 0 !== r && (r(), r = void 0);
  }
  function m(t2) {
    const n2 = getScrollTarget(true === a.isContainer.value ? i.value : a.rootRef.value);
    setVerticalScrollPosition(n2, true === e.reverse ? a.height.value : 0, e.duration), o("click", t2);
  }
  function f() {
    return true === c.value ? h("div", { ref: i, class: "q-page-scroller", onClick: m }, l(t)) : null;
  }
  return watch(a.scroll, d), watch(() => e.reverse, p2), p2(), onBeforeUnmount(v), () => h(Transition, { name: "q-transition--fade" }, f);
} }), QPageSticky = createComponent({ name: "QPageSticky", props: usePageStickyProps, setup(e, { slots: t }) {
  const { getStickyContent: o } = usePageSticky();
  return () => o(t);
} }), QPagination = createComponent({ name: "QPagination", props: { ...useDarkProps, modelValue: { type: Number, required: true }, min: { type: Number, default: 1 }, max: { type: Number, required: true }, color: { type: String, default: "primary" }, textColor: String, activeColor: String, activeTextColor: String, inputStyle: [Array, String, Object], inputClass: [Array, String, Object], size: String, disable: Boolean, input: Boolean, iconPrev: String, iconNext: String, iconFirst: String, iconLast: String, toFn: Function, boundaryLinks: { type: Boolean, default: null }, boundaryNumbers: { type: Boolean, default: null }, directionLinks: { type: Boolean, default: null }, ellipses: { type: Boolean, default: null }, maxPages: { type: Number, default: 0, validator: (e) => e >= 0 }, ripple: { type: [Boolean, Object], default: null }, round: Boolean, rounded: Boolean, flat: Boolean, outline: Boolean, unelevated: Boolean, push: Boolean, glossy: Boolean, dense: Boolean, padding: { type: String, default: "3px 2px" } }, emits: ["update:modelValue"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), { $q: n } = o, a = useDark(e, n), l = ref(null), i = computed({ get: () => e.modelValue, set: (o2) => {
    if (o2 = parseInt(o2, 10), e.disable || isNaN(o2))
      return;
    const n2 = between(o2, e.min, e.max);
    e.modelValue !== n2 && t("update:modelValue", n2);
  } });
  function r(e2, t2) {
    return [true, false].includes(e2) ? e2 : t2;
  }
  watch(() => e.min + e.max, () => {
    i.value = e.modelValue;
  });
  const s = computed(() => "q-pagination row no-wrap items-center" + (true === e.disable ? " disabled" : "")), u = computed(() => i.value + " / " + e.max), c = computed(() => r(e.boundaryLinks, e.input)), d = computed(() => r(e.boundaryNumbers, !e.input)), p2 = computed(() => r(e.directionLinks, e.input)), v = computed(() => r(e.ellipses, !e.input)), m = computed(() => {
    const t2 = [e.iconFirst || n.iconSet.pagination.first, e.iconPrev || n.iconSet.pagination.prev, e.iconNext || n.iconSet.pagination.next, e.iconLast || n.iconSet.pagination.last];
    return true === n.lang.rtl ? t2.reverse() : t2;
  }), f = computed(() => true === e.disable ? { "aria-disabled": "true" } : {}), g = computed(() => ({ round: e.round, rounded: e.rounded, outline: e.outline, unelevated: e.unelevated, push: e.push, glossy: e.glossy, dense: e.dense, padding: e.padding, color: e.color, flat: true, size: e.size, ripple: null === e.ripple || e.ripple })), b = computed(() => ({ flat: e.flat, color: e.activeColor || e.color, textColor: e.activeTextColor || e.textColor }));
  function y(e2) {
    i.value = e2;
  }
  function S(e2) {
    i.value = i.value + e2;
  }
  function w() {
    i.value = l.value, l.value = null;
  }
  function C(t2, o2) {
    const n2 = { ...g.value, ...t2 };
    return void 0 !== o2 && (void 0 !== e.toFn ? n2.to = e.toFn(o2) : n2.onClick = () => y(o2)), h(QBtn, n2);
  }
  return Object.assign(o, { set: y, setByOffset: S }), () => {
    const t2 = [], o2 = [], n2 = [];
    if (c.value && (t2.push(C({ key: "bls", disable: e.disable || e.modelValue <= e.min, icon: m.value[0] }, e.min)), o2.unshift(C({ key: "ble", disable: e.disable || e.modelValue >= e.max, icon: m.value[3] }, e.max))), p2.value && (t2.push(C({ key: "bdp", disable: e.disable || e.modelValue <= e.min, icon: m.value[1] }, e.modelValue - 1)), o2.unshift(C({ key: "bdn", disable: e.disable || e.modelValue >= e.max, icon: m.value[2] }, e.modelValue + 1))), true === e.input)
      n2.push(h(QInput, { class: "inline", style: { width: `${u.value.length / 1.5}em` }, type: "number", dense: true, value: l.value, disable: e.disable, dark: a.value, borderless: true, inputClass: e.inputClass, inputStyle: e.inputStyle, placeholder: u.value, min: e.min, max: e.max, "onUpdate:modelValue"(e2) {
        l.value = e2;
      }, onKeyup(e2) {
        true === isKeyCode(e2, 13) && w();
      }, onBlur: w }));
    else {
      let a2 = Math.max(e.maxPages, 1 + (v.value ? 2 : 0) + (d.value ? 2 : 0)), l2 = e.min, i2 = e.max, r2 = false, s2 = false, u2 = false, c2 = false;
      e.maxPages && a2 < e.max - e.min + 1 && (a2 = 1 + 2 * Math.floor(a2 / 2), l2 = Math.max(e.min, Math.min(e.max - a2 + 1, e.modelValue - Math.floor(a2 / 2))), i2 = Math.min(e.max, l2 + a2 - 1), d.value && (u2 = true, l2 += 1), v.value && l2 > e.min + (d.value ? 1 : 0) && (r2 = true, l2 += 1), d.value && (c2 = true, i2 -= 1), v.value && i2 < e.max - (d.value ? 1 : 0) && (s2 = true, i2 -= 1));
      const p3 = { minWidth: `${Math.max(2, String(e.max).length)}em` };
      if (u2) {
        const o3 = e.min === e.modelValue;
        t2.push(C({ key: "bns", style: p3, disable: e.disable, flat: !o3, label: e.min, ...o3 ? b.value : {} }, e.min));
      }
      if (c2) {
        const t3 = e.max === e.modelValue;
        o2.unshift(C({ key: "bne", style: p3, disable: e.disable, flat: !t3, label: e.max, ...t3 ? b.value : {} }, e.max));
      }
      r2 && t2.push(C({ key: "bes", style: p3, disable: e.disable, label: "\u2026", ripple: false }, l2 - 1)), s2 && o2.unshift(C({ key: "bee", style: p3, disable: e.disable, label: "\u2026", ripple: false }, i2 + 1));
      for (let t3 = l2; t3 <= i2; t3++) {
        const o3 = { key: `bpg${t3}`, style: p3, disable: e.disable, label: t3 };
        t3 === e.modelValue && Object.assign(o3, b.value), n2.push(C(o3, t3));
      }
    }
    return h("div", { class: s.value, ...f.value }, [t2, h("div", { class: "row justify-center" }, [n2]), o2]);
  };
} });
function frameDebounce(e) {
  let t, o, n = false;
  function a() {
    o = arguments, true !== n && (n = true, t = requestAnimationFrame(() => {
      e.apply(this, o), o = void 0, n = false;
    }));
  }
  return a.cancel = () => {
    window.cancelAnimationFrame(t), n = false;
  }, a;
}
const { passive: passive$1 } = listenOpts;
var QParallax = createComponent({ name: "QParallax", props: { src: String, height: { type: Number, default: 500 }, speed: { type: Number, default: 1, validator: (e) => e >= 0 && e <= 1 }, scrollTarget: { default: void 0 }, onScroll: Function }, setup(e, { slots: t, emit: o }) {
  const n = ref(0), a = ref(null), l = ref(null), i = ref(null);
  let r, s, u, c, d, p2;
  watch(() => e.height, () => {
    true === r && m();
  }), watch(() => e.scrollTarget, () => {
    true === r && (y(), b());
  });
  let v = (t2) => {
    n.value = t2, void 0 !== e.onScroll && o("scroll", t2);
  };
  function m() {
    let t2, o2, n2;
    p2 === window ? (t2 = 0, n2 = o2 = window.innerHeight) : (t2 = offset(p2).top, o2 = height(p2), n2 = t2 + o2);
    const l2 = offset(a.value).top, i2 = l2 + e.height;
    if (void 0 !== d || i2 > t2 && l2 < n2) {
      const t3 = (n2 - l2) / (e.height + o2);
      f((u - e.height) * t3 * e.speed), v(t3);
    }
  }
  let f = (e2) => {
    s.style.transform = `translate3d(-50%,${Math.round(e2)}px,0)`;
  };
  function g() {
    u = s.naturalHeight || s.videoHeight || height(s), true === r && m();
  }
  function b() {
    r = true, p2 = getScrollTarget(a.value, e.scrollTarget), p2.addEventListener("scroll", m, passive$1), window.addEventListener("resize", c, passive$1), m();
  }
  function y() {
    true === r && (r = false, p2.removeEventListener("scroll", m, passive$1), window.removeEventListener("resize", c, passive$1), p2 = void 0, f.cancel(), v.cancel(), c.cancel());
  }
  return onMounted(() => {
    f = frameDebounce(f), v = frameDebounce(v), c = frameDebounce(g), s = void 0 !== t.media ? l.value.children[0] : i.value, s.onload = s.onloadstart = s.loadedmetadata = g, g(), s.style.display = "initial", void 0 !== window.IntersectionObserver ? (d = new IntersectionObserver((e2) => {
      const t2 = true === e2[0].isIntersecting ? b : y;
      t2();
    }), d.observe(a.value)) : b();
  }), onBeforeUnmount(() => {
    y(), void 0 !== d && d.disconnect(), s.onload = s.onloadstart = s.loadedmetadata = null;
  }), () => {
    return h("div", { ref: a, class: "q-parallax", style: { height: `${e.height}px` } }, [h("div", { ref: l, class: "q-parallax__media absolute-full" }, void 0 !== t.media ? t.media() : [h("img", { ref: i, src: e.src })]), h("div", { class: "q-parallax__content absolute-full column flex-center" }, void 0 !== t.content ? t.content({ percentScrolled: n.value }) : hSlot(t.default))]);
  };
} });
function cloneDeep(e, t = /* @__PURE__ */ new WeakMap()) {
  if (Object(e) !== e)
    return e;
  if (t.has(e))
    return t.get(e);
  const o = e instanceof Date ? new Date(e) : e instanceof RegExp ? new RegExp(e.source, e.flags) : e instanceof Set ? /* @__PURE__ */ new Set() : e instanceof Map ? /* @__PURE__ */ new Map() : "function" !== typeof e.constructor ? /* @__PURE__ */ Object.create(null) : void 0 !== e.prototype && "function" === typeof e.prototype.constructor ? e : new e.constructor();
  if ("function" === typeof e.constructor && "function" === typeof e.valueOf) {
    const o2 = e.valueOf();
    if (Object(o2) !== o2) {
      const n = new e.constructor(o2);
      return t.set(e, n), n;
    }
  }
  return t.set(e, o), e instanceof Set ? e.forEach((e2) => {
    o.add(cloneDeep(e2, t));
  }) : e instanceof Map && e.forEach((e2, n) => {
    o.set(n, cloneDeep(e2, t));
  }), Object.assign(o, ...Object.keys(e).map((o2) => ({ [o2]: cloneDeep(e[o2], t) })));
}
var QPopupEdit = createComponent({ name: "QPopupEdit", props: { modelValue: { required: true }, title: String, buttons: Boolean, labelSet: String, labelCancel: String, color: { type: String, default: "primary" }, validate: { type: Function, default: () => true }, autoSave: Boolean, cover: { type: Boolean, default: true }, disable: Boolean }, emits: ["update:modelValue", "save", "cancel", "before-show", "show", "before-hide", "hide"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = ref(null), i = ref(""), r = ref("");
  let s = false;
  const u = computed(() => {
    return injectProp({ initialValue: i.value, validate: e.validate, set: c, cancel: d, updatePosition: p2 }, "value", () => r.value, (e2) => {
      r.value = e2;
    });
  });
  function c() {
    false !== e.validate(r.value) && (true === v() && (o("save", r.value, i.value), o("update:modelValue", r.value)), m());
  }
  function d() {
    true === v() && o("cancel", r.value, i.value), m();
  }
  function p2() {
    nextTick(() => {
      l.value.updatePosition();
    });
  }
  function v() {
    return false === isDeepEqual(r.value, i.value);
  }
  function m() {
    s = true, l.value.hide();
  }
  function f() {
    s = false, i.value = cloneDeep(e.modelValue), r.value = cloneDeep(e.modelValue), o("before-show");
  }
  function g() {
    o("show");
  }
  function b() {
    false === s && true === v() && (true === e.autoSave && true === e.validate(r.value) ? (o("save", r.value, i.value), o("update:modelValue", r.value)) : o("cancel", r.value, i.value)), o("before-hide");
  }
  function y() {
    o("hide");
  }
  function S() {
    const o2 = void 0 !== t.default ? [].concat(t.default(u.value)) : [];
    return e.title && o2.unshift(h("div", { class: "q-dialog__title q-mt-sm q-mb-sm" }, e.title)), true === e.buttons && o2.push(h("div", { class: "q-popup-edit__buttons row justify-center no-wrap" }, [h(QBtn, { flat: true, color: e.color, label: e.labelCancel || a.lang.label.cancel, onClick: d }), h(QBtn, { flat: true, color: e.color, label: e.labelSet || a.lang.label.set, onClick: c })])), o2;
  }
  return Object.assign(n, { set: c, cancel: d, show(e2) {
    null !== l.value && l.value.show(e2);
  }, hide(e2) {
    null !== l.value && l.value.hide(e2);
  }, updatePosition: p2 }), () => {
    if (true !== e.disable)
      return h(QMenu, { ref: l, class: "q-popup-edit", cover: e.cover, onBeforeShow: f, onShow: g, onBeforeHide: b, onHide: y, onEscapeKey: d }, S);
  };
} }), QPopupProxy = createComponent({ name: "QPopupProxy", props: { ...useAnchorProps, breakpoint: { type: [String, Number], default: 450 } }, emits: ["show", "hide"], setup(e, { slots: t, emit: o, attrs: n }) {
  const { proxy: a } = getCurrentInstance(), { $q: l } = a, i = ref(false), r = ref(null), s = computed(() => parseInt(e.breakpoint, 10)), { canShow: u } = useAnchor({ showing: i });
  function c() {
    return l.screen.width < s.value || l.screen.height < s.value ? "dialog" : "menu";
  }
  const d = ref(c()), p2 = computed(() => "menu" === d.value ? { maxHeight: "99vh" } : {});
  function v(e2) {
    i.value = true, o("show", e2);
  }
  function m(e2) {
    i.value = false, d.value = c(), o("hide", e2);
  }
  return watch(() => c(), (e2) => {
    true !== i.value && (d.value = e2);
  }), Object.assign(a, { show(e2) {
    true === u(e2) && r.value.show(e2);
  }, hide(e2) {
    r.value.hide(e2);
  }, toggle(e2) {
    r.value.toggle(e2);
  } }), () => {
    const o2 = { ref: r, ...p2.value, ...n, onShow: v, onHide: m };
    let a2;
    return "dialog" === d.value ? a2 = QDialog : (a2 = QMenu, Object.assign(o2, { target: e.target, contextMenu: e.contextMenu, noParentEvent: true, separateClosePopup: true })), h(a2, o2, t.default);
  };
} });
const defaultSizes = { xs: 2, sm: 4, md: 6, lg: 10, xl: 14 };
function width(e, t, o) {
  return { transform: true === t ? `translateX(${true === o.lang.rtl ? "-" : ""}100%) scale3d(${-e},1,1)` : `scale3d(${e},1,1)` };
}
var QLinearProgress = createComponent({ name: "QLinearProgress", props: { ...useDarkProps, ...useSizeProps, value: { type: Number, default: 0 }, buffer: Number, color: String, trackColor: String, reverse: Boolean, stripe: Boolean, indeterminate: Boolean, query: Boolean, rounded: Boolean, animationSpeed: { type: [String, Number], default: 2100 }, instantFeedback: Boolean }, setup(e, { slots: t }) {
  const { proxy: o } = getCurrentInstance(), n = useDark(e, o.$q), a = useSize(e, defaultSizes), l = computed(() => true === e.indeterminate || true === e.query), i = computed(() => e.reverse !== e.query), r = computed(() => ({ ...null !== a.value ? a.value : {}, "--q-linear-progress-speed": `${e.animationSpeed}ms` })), s = computed(() => "q-linear-progress" + (void 0 !== e.color ? ` text-${e.color}` : "") + (true === e.reverse || true === e.query ? " q-linear-progress--reverse" : "") + (true === e.rounded ? " rounded-borders" : "")), u = computed(() => width(void 0 !== e.buffer ? e.buffer : 1, i.value, o.$q)), c = computed(() => `q-linear-progress__track absolute-full q-linear-progress__track--with${true === e.instantFeedback ? "out" : ""}-transition q-linear-progress__track--${true === n.value ? "dark" : "light"}` + (void 0 !== e.trackColor ? ` bg-${e.trackColor}` : "")), d = computed(() => width(true === l.value ? 1 : e.value, i.value, o.$q)), p2 = computed(() => `q-linear-progress__model absolute-full q-linear-progress__model--with${true === e.instantFeedback ? "out" : ""}-transition q-linear-progress__model--${true === l.value ? "in" : ""}determinate`), v = computed(() => ({ width: `${100 * e.value}%` })), m = computed(() => `q-linear-progress__stripe absolute-${true === e.reverse ? "right" : "left"}`);
  return () => {
    const o2 = [h("div", { class: c.value, style: u.value }), h("div", { class: p2.value, style: d.value })];
    return true === e.stripe && false === l.value && o2.push(h("div", { class: m.value, style: v.value })), h("div", { class: s.value, style: r.value, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 1, "aria-valuenow": true === e.indeterminate ? void 0 : e.value }, hMergeSlot(t.default, o2));
  };
} });
const PULLER_HEIGHT = 40, OFFSET_TOP = 20;
var QPullToRefresh = createComponent({ name: "QPullToRefresh", props: { color: String, bgColor: String, icon: String, noMouse: Boolean, disable: Boolean, scrollTarget: { default: void 0 } }, emits: ["refresh"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = ref("pull"), i = ref(0), r = ref(false), s = ref(-PULLER_HEIGHT), u = ref(false), c = ref({}), d = computed(() => ({ opacity: i.value, transform: `translateY(${s.value}px) rotate(${360 * i.value}deg)` })), p2 = computed(() => "q-pull-to-refresh__puller row flex-center" + (true === u.value ? " q-pull-to-refresh__puller--animating" : "") + (void 0 !== e.bgColor ? ` bg-${e.bgColor}` : ""));
  function v(e2) {
    if (true === e2.isFinal)
      return void (true === r.value && (r.value = false, "pulled" === l.value ? (l.value = "refreshing", b({ pos: OFFSET_TOP }), g()) : "pull" === l.value && b({ pos: -PULLER_HEIGHT, ratio: 0 })));
    if (true === u.value || "refreshing" === l.value)
      return false;
    if (true === e2.isFirst) {
      if (0 !== getVerticalScrollPosition(S) || "down" !== e2.direction)
        return true === r.value && (r.value = false, l.value = "pull", b({ pos: -PULLER_HEIGHT, ratio: 0 })), false;
      r.value = true;
      const { top: t3, left: o3 } = y.getBoundingClientRect();
      c.value = { top: t3 + "px", left: o3 + "px", width: window.getComputedStyle(y).getPropertyValue("width") };
    }
    prevent(e2.evt);
    const t2 = Math.min(140, Math.max(0, e2.distance.y));
    s.value = t2 - PULLER_HEIGHT, i.value = between(t2 / (OFFSET_TOP + PULLER_HEIGHT), 0, 1);
    const o2 = s.value > OFFSET_TOP ? "pulled" : "pull";
    l.value !== o2 && (l.value = o2);
  }
  const m = computed(() => {
    const t2 = { down: true, mightPrevent: true };
    return true !== e.noMouse && (t2.mouse = true), [[TouchPan, v, void 0, t2]];
  }), f = computed(() => `q-pull-to-refresh__content${true === r.value ? " no-pointer-events" : ""}`);
  function g() {
    o("refresh", () => {
      b({ pos: -PULLER_HEIGHT, ratio: 0 }, () => {
        l.value = "pull";
      });
    });
  }
  function b({ pos: e2, ratio: t2 }, o2) {
    u.value = true, s.value = e2, void 0 !== t2 && (i.value = t2), clearTimeout(w), w = setTimeout(() => {
      u.value = false, o2 && o2();
    }, 300);
  }
  let y, S, w;
  function C() {
    S = getScrollTarget(y, e.scrollTarget);
  }
  return watch(() => e.scrollTarget, C), onMounted(() => {
    y = n.$el, C();
  }), onBeforeUnmount(() => {
    clearTimeout(w);
  }), Object.assign(n, { trigger: g, updateScrollTarget: C }), () => {
    const o2 = [h("div", { class: f.value }, hSlot(t.default)), h("div", { class: "q-pull-to-refresh__puller-container fixed row flex-center no-pointer-events z-top", style: c.value }, [h("div", { class: p2.value, style: d.value }, ["refreshing" !== l.value ? h(QIcon, { name: e.icon || a.iconSet.pullToRefresh.icon, color: e.color, size: "32px" }) : h(QSpinner, { size: "24px", color: e.color })])])];
    return hDir("div", { class: "q-pull-to-refresh" }, o2, "main", false === e.disable, () => m.value);
  };
} });
const dragType = { MIN: 0, RANGE: 1, MAX: 2 };
var QRange = createComponent({ name: "QRange", props: { ...useSliderProps, modelValue: { type: Object, default: () => ({ min: null, max: null }), validator: (e) => "min" in e && "max" in e }, dragRange: Boolean, dragOnlyRange: Boolean, leftLabelColor: String, leftLabelTextColor: String, rightLabelColor: String, rightLabelTextColor: String, leftLabelValue: [String, Number], rightLabelValue: [String, Number], leftThumbColor: String, rightThumbColor: String }, emits: useSliderEmits, setup(e, { emit: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), { state: n, methods: a } = useSlider({ updateValue: _, updatePosition: T, getDragging: q, formAttrs: computed(() => ({ type: "hidden", name: e.name, value: `${e.modelValue.min}|${e.modelValue.max}` })) }), l = ref(null), i = ref(0), r = ref(0), s = ref({ min: 0, max: 0 });
  function u() {
    s.value.min = null === e.modelValue.min ? n.innerMin.value : between(e.modelValue.min, n.innerMin.value, n.innerMax.value), s.value.max = null === e.modelValue.max ? n.innerMax.value : between(e.modelValue.max, n.innerMin.value, n.innerMax.value);
  }
  watch(() => `${e.modelValue.min}|${e.modelValue.max}|${n.innerMin.value}|${n.innerMax.value}`, u), u();
  const c = computed(() => a.convertModelToRatio(s.value.min)), d = computed(() => a.convertModelToRatio(s.value.max)), p2 = computed(() => true === n.active.value ? i.value : c.value), v = computed(() => true === n.active.value ? r.value : d.value), m = computed(() => {
    const t2 = { [n.positionProp.value]: `${100 * p2.value}%`, [n.sizeProp.value]: `${100 * (v.value - p2.value)}%` };
    return void 0 !== e.selectionImg && (t2.backgroundImage = `url(${e.selectionImg}) !important`), t2;
  }), f = computed(() => {
    if (true !== n.editable.value)
      return {};
    if (true === o.platform.is.mobile)
      return { onClick: a.onMobileClick };
    const t2 = { onMousedown: a.onActivate };
    return true !== e.dragRange && true !== e.dragOnlyRange || Object.assign(t2, { onFocus: () => {
      n.focus.value = "both";
    }, onBlur: a.onBlur, onKeydown: P, onKeyup: a.onKeyup }), t2;
  });
  function g(t2) {
    return true !== o.platform.is.mobile && true === n.editable.value && true !== e.dragOnlyRange ? { onFocus: () => {
      n.focus.value = t2;
    }, onBlur: a.onBlur, onKeydown: P, onKeyup: a.onKeyup } : {};
  }
  const b = computed(() => true !== e.dragOnlyRange ? n.tabindex.value : null), y = computed(() => true === o.platform.is.mobile || !e.dragRange && true !== e.dragOnlyRange ? null : n.tabindex.value), S = ref(null), w = computed(() => g("min")), C = a.getThumbRenderFn({ focusValue: "min", getNodeData: () => ({ ref: S, key: "tmin", ...w.value, tabindex: b.value }), ratio: p2, label: computed(() => void 0 !== e.leftLabelValue ? e.leftLabelValue : s.value.min), thumbColor: computed(() => e.leftThumbColor || e.thumbColor || e.color), labelColor: computed(() => e.leftLabelColor || e.labelColor), labelTextColor: computed(() => e.leftLabelTextColor || e.labelTextColor) }), x = computed(() => g("max")), k = a.getThumbRenderFn({ focusValue: "max", getNodeData: () => ({ ...x.value, key: "tmax", tabindex: b.value }), ratio: v, label: computed(() => void 0 !== e.rightLabelValue ? e.rightLabelValue : s.value.max), thumbColor: computed(() => e.rightThumbColor || e.thumbColor || e.color), labelColor: computed(() => e.rightLabelColor || e.labelColor), labelTextColor: computed(() => e.rightLabelTextColor || e.labelTextColor) });
  function _(o2) {
    s.value.min === e.modelValue.min && s.value.max === e.modelValue.max || t("update:modelValue", { ...s.value }), true === o2 && t("change", { ...s.value });
  }
  function q(t2) {
    const { left: o2, top: n2, width: i2, height: r2 } = l.value.getBoundingClientRect(), u2 = true === e.dragOnlyRange ? 0 : true === e.vertical ? S.value.offsetHeight / (2 * r2) : S.value.offsetWidth / (2 * i2), p3 = { left: o2, top: n2, width: i2, height: r2, valueMin: s.value.min, valueMax: s.value.max, ratioMin: c.value, ratioMax: d.value }, v2 = a.getDraggingRatio(t2, p3);
    return true !== e.dragOnlyRange && v2 < p3.ratioMin + u2 ? p3.type = dragType.MIN : true === e.dragOnlyRange || v2 < p3.ratioMax - u2 ? true === e.dragRange || true === e.dragOnlyRange ? (p3.type = dragType.RANGE, Object.assign(p3, { offsetRatio: v2, offsetModel: a.convertRatioToModel(v2), rangeValue: p3.valueMax - p3.valueMin, rangeRatio: p3.ratioMax - p3.ratioMin })) : p3.type = p3.ratioMax - v2 < v2 - p3.ratioMin ? dragType.MAX : dragType.MIN : p3.type = dragType.MAX, p3;
  }
  function T(t2, o2 = n.dragging.value) {
    let l2;
    const u2 = a.getDraggingRatio(t2, o2), c2 = a.convertRatioToModel(u2);
    switch (o2.type) {
      case dragType.MIN:
        u2 <= o2.ratioMax ? (l2 = { minR: u2, maxR: o2.ratioMax, min: c2, max: o2.valueMax }, n.focus.value = "min") : (l2 = { minR: o2.ratioMax, maxR: u2, min: o2.valueMax, max: c2 }, n.focus.value = "max");
        break;
      case dragType.MAX:
        u2 >= o2.ratioMin ? (l2 = { minR: o2.ratioMin, maxR: u2, min: o2.valueMin, max: c2 }, n.focus.value = "max") : (l2 = { minR: u2, maxR: o2.ratioMin, min: c2, max: o2.valueMin }, n.focus.value = "min");
        break;
      case dragType.RANGE:
        const t3 = u2 - o2.offsetRatio, a2 = between(o2.ratioMin + t3, 0, 1 - o2.rangeRatio), i2 = c2 - o2.offsetModel, r2 = between(o2.valueMin + i2, e.min, e.max - o2.rangeValue);
        l2 = { minR: a2, maxR: a2 + o2.rangeRatio, min: parseFloat(r2.toFixed(n.decimals.value)), max: parseFloat((r2 + o2.rangeValue).toFixed(n.decimals.value)) }, n.focus.value = "both";
        break;
    }
    s.value = null === s.value.min || null === s.value.max ? { min: l2.min || e.min, max: l2.max || e.max } : { min: l2.min, max: l2.max }, true !== e.snap || 0 === e.step ? (i.value = l2.minR, r.value = l2.maxR) : (i.value = a.convertModelToRatio(s.value.min), r.value = a.convertModelToRatio(s.value.max));
  }
  function P(t2) {
    if (!keyCodes$2.includes(t2.keyCode))
      return;
    stopAndPrevent(t2);
    const o2 = ([34, 33].includes(t2.keyCode) ? 10 : 1) * n.step.value, a2 = ([34, 37, 40].includes(t2.keyCode) ? -1 : 1) * (true === n.isReversed.value ? -1 : 1) * (true === e.vertical ? -1 : 1) * o2;
    if ("both" === n.focus.value) {
      const e2 = s.value.max - s.value.min, t3 = between(parseFloat((s.value.min + a2).toFixed(n.decimals.value)), n.innerMin.value, n.innerMax.value - e2);
      s.value = { min: t3, max: parseFloat((t3 + e2).toFixed(n.decimals.value)) };
    } else {
      if (false === n.focus.value)
        return;
      {
        const e2 = n.focus.value;
        s.value = { ...s.value, [e2]: between(parseFloat((s.value[e2] + a2).toFixed(n.decimals.value)), "min" === e2 ? n.innerMin.value : s.value.min, "max" === e2 ? n.innerMax.value : s.value.max) };
      }
    }
    _();
  }
  return () => {
    const t2 = a.getContent(m, y, f, (e2) => {
      e2.push(C(), k());
    });
    return h("div", { ref: l, class: "q-range " + n.classes.value + (null === e.modelValue.min || null === e.modelValue.max ? " q-slider--no-value" : ""), ...n.attributes.value, "aria-valuenow": e.modelValue.min + "|" + e.modelValue.max }, t2);
  };
} }), QRating = createComponent({ name: "QRating", props: { ...useSizeProps, ...useFormProps, modelValue: { type: Number, required: true }, max: { type: [String, Number], default: 5 }, icon: [String, Array], iconHalf: [String, Array], iconSelected: [String, Array], iconAriaLabel: [String, Array], color: [String, Array], colorHalf: [String, Array], colorSelected: [String, Array], noReset: Boolean, noDimming: Boolean, readonly: Boolean, disable: Boolean }, emits: ["update:modelValue"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useSize(e), l = useFormAttrs(e), i = useFormInject(l), r = ref(0);
  let s = {};
  const u = computed(() => true !== e.readonly && true !== e.disable), c = computed(() => `q-rating row inline items-center q-rating--${true === u.value ? "" : "non-"}editable` + (true === e.noDimming ? " q-rating--no-dimming" : "") + (true === e.disable ? " disabled" : "") + (void 0 !== e.color && false === Array.isArray(e.color) ? ` text-${e.color}` : "")), d = computed(() => {
    const t2 = true === Array.isArray(e.icon) ? e.icon.length : 0, o2 = true === Array.isArray(e.iconSelected) ? e.iconSelected.length : 0, n2 = true === Array.isArray(e.iconHalf) ? e.iconHalf.length : 0, a2 = true === Array.isArray(e.color) ? e.color.length : 0, l2 = true === Array.isArray(e.colorSelected) ? e.colorSelected.length : 0, i2 = true === Array.isArray(e.colorHalf) ? e.colorHalf.length : 0;
    return { iconLen: t2, icon: t2 > 0 ? e.icon[t2 - 1] : e.icon, selIconLen: o2, selIcon: o2 > 0 ? e.iconSelected[o2 - 1] : e.iconSelected, halfIconLen: n2, halfIcon: n2 > 0 ? e.iconHalf[o2 - 1] : e.iconHalf, colorLen: a2, color: a2 > 0 ? e.color[a2 - 1] : e.color, selColorLen: l2, selColor: l2 > 0 ? e.colorSelected[l2 - 1] : e.colorSelected, halfColorLen: i2, halfColor: i2 > 0 ? e.colorHalf[i2 - 1] : e.colorHalf };
  }), p2 = computed(() => {
    if ("string" === typeof e.iconAriaLabel) {
      const t2 = e.iconAriaLabel.length > 0 ? `${e.iconAriaLabel} ` : "";
      return (e2) => `${t2}${e2}`;
    }
    if (true === Array.isArray(e.iconAriaLabel)) {
      const t2 = e.iconAriaLabel.length;
      if (t2 > 0)
        return (o2) => e.iconAriaLabel[Math.min(o2, t2) - 1];
    }
    return (e2, t2) => `${t2} ${e2}`;
  }), v = computed(() => {
    const t2 = [], o2 = d.value, a2 = Math.ceil(e.modelValue), l2 = true === u.value ? 0 : null, i2 = void 0 === e.iconHalf || a2 === e.modelValue ? -1 : a2;
    for (let s2 = 1; s2 <= e.max; s2++) {
      const u2 = 0 === r.value && e.modelValue >= s2 || r.value > 0 && r.value >= s2, c2 = i2 === s2 && r.value < s2, d2 = r.value > 0 && (true === c2 ? a2 : e.modelValue) >= s2 && r.value < s2, v2 = true === c2 ? s2 <= o2.halfColorLen ? e.colorHalf[s2 - 1] : o2.halfColor : void 0 !== o2.selColor && true === u2 ? s2 <= o2.selColorLen ? e.colorSelected[s2 - 1] : o2.selColor : s2 <= o2.colorLen ? e.color[s2 - 1] : o2.color, m2 = (true === c2 ? s2 <= o2.halfIconLen ? e.iconHalf[s2 - 1] : o2.halfIcon : void 0 === o2.selIcon || true !== u2 && true !== d2 ? s2 <= o2.iconLen ? e.icon[s2 - 1] : o2.icon : s2 <= o2.selIconLen ? e.iconSelected[s2 - 1] : o2.selIcon) || n.iconSet.rating.icon;
      t2.push({ name: (true === c2 ? s2 <= o2.halfIconLen ? e.iconHalf[s2 - 1] : o2.halfIcon : void 0 === o2.selIcon || true !== u2 && true !== d2 ? s2 <= o2.iconLen ? e.icon[s2 - 1] : o2.icon : s2 <= o2.selIconLen ? e.iconSelected[s2 - 1] : o2.selIcon) || n.iconSet.rating.icon, attrs: { tabindex: l2, role: "radio", "aria-checked": e.modelValue === s2 ? "true" : "false", "aria-label": p2.value(s2, m2) }, iconClass: "q-rating__icon" + (true === u2 || true === c2 ? " q-rating__icon--active" : "") + (true === d2 ? " q-rating__icon--exselected" : "") + (r.value === s2 ? " q-rating__icon--hovered" : "") + (void 0 !== v2 ? ` text-${v2}` : "") });
    }
    return t2;
  }), m = computed(() => {
    const t2 = { role: "radiogroup" };
    return true === e.disable && (t2["aria-disabled"] = "true"), true === e.readonly && (t2["aria-readonly"] = "true"), t2;
  });
  function f(t2) {
    if (true === u.value) {
      const n2 = between(parseInt(t2, 10), 1, parseInt(e.max, 10)), a2 = true !== e.noReset && e.modelValue === n2 ? 0 : n2;
      a2 !== e.modelValue && o("update:modelValue", a2), r.value = 0;
    }
  }
  function g(e2) {
    true === u.value && (r.value = e2);
  }
  function b(e2, t2) {
    switch (e2.keyCode) {
      case 13:
      case 32:
        return f(t2), stopAndPrevent(e2);
      case 37:
      case 40:
        return s[`rt${t2 - 1}`] && s[`rt${t2 - 1}`].$el.focus(), stopAndPrevent(e2);
      case 39:
      case 38:
        return s[`rt${t2 + 1}`] && s[`rt${t2 + 1}`].$el.focus(), stopAndPrevent(e2);
    }
  }
  function y() {
    r.value = 0;
  }
  return onBeforeUpdate(() => {
    s = {};
  }), () => {
    const o2 = [];
    return v.value.forEach(({ iconClass: e2, name: n2, attrs: a2 }, l2) => {
      const i2 = l2 + 1;
      o2.push(h("div", { key: i2, ref: (e3) => {
        s[`rt${i2}`] = e3;
      }, class: "q-rating__icon-container flex flex-center", ...a2, onClick() {
        f(i2);
      }, onMouseover() {
        g(i2);
      }, onMouseout: y, onFocus() {
        g(i2);
      }, onBlur: y, onKeyup(e3) {
        b(e3, i2);
      } }, hMergeSlot(t[`tip-${i2}`], [h(QIcon, { class: e2, name: n2 })])));
    }), void 0 !== e.name && true !== e.disable && i(o2, "push"), h("div", { class: c.value, style: a.value, ...m.value }, o2);
  };
} }), QResponsive = createComponent({ name: "QResponsive", props: useRatioProps, setup(e, { slots: t }) {
  const o = useRatio(e);
  return () => h("div", { class: "q-responsive" }, [h("div", { class: "q-responsive__filler overflow-hidden" }, [h("div", { style: o.value })]), h("div", { class: "q-responsive__content absolute-full fit" }, hSlot(t.default))]);
} });
const axisList = ["vertical", "horizontal"], dirProps = { vertical: { offset: "offsetY", scroll: "scrollTop", dir: "down", dist: "y" }, horizontal: { offset: "offsetX", scroll: "scrollLeft", dir: "right", dist: "x" } }, panOpts = { prevent: true, mouse: true, mouseAllDir: true }, getMinThumbSize = (e) => e >= 250 ? 50 : Math.ceil(e / 5);
var QScrollArea = createComponent({ name: "QScrollArea", props: { ...useDarkProps, thumbStyle: Object, verticalThumbStyle: Object, horizontalThumbStyle: Object, barStyle: [Array, String, Object], verticalBarStyle: [Array, String, Object], horizontalBarStyle: [Array, String, Object], contentStyle: [Array, String, Object], contentActiveStyle: [Array, String, Object], delay: { type: [String, Number], default: 1e3 }, visible: { type: Boolean, default: null }, tabindex: [String, Number], onScroll: Function }, setup(e, { slots: t, emit: o }) {
  const n = ref(false), a = ref(false), l = ref(false), i = { vertical: ref(0), horizontal: ref(0) }, r = { vertical: { ref: ref(null), position: ref(0), size: ref(0) }, horizontal: { ref: ref(null), position: ref(0), size: ref(0) } }, { proxy: s } = getCurrentInstance(), u = useDark(e, s.$q);
  let c, d;
  const p2 = ref(null), v = computed(() => "q-scrollarea" + (true === u.value ? " q-scrollarea--dark" : ""));
  r.vertical.percentage = computed(() => {
    const e2 = r.vertical.size.value - i.vertical.value;
    if (e2 <= 0)
      return 0;
    const t2 = between(r.vertical.position.value / e2, 0, 1);
    return Math.round(1e4 * t2) / 1e4;
  }), r.vertical.thumbHidden = computed(() => true !== (null === e.visible ? l.value : e.visible) && false === n.value && false === a.value || r.vertical.size.value <= i.vertical.value + 1), r.vertical.thumbStart = computed(() => r.vertical.percentage.value * (i.vertical.value - r.vertical.thumbSize.value)), r.vertical.thumbSize = computed(() => Math.round(between(i.vertical.value * i.vertical.value / r.vertical.size.value, getMinThumbSize(i.vertical.value), i.vertical.value))), r.vertical.style = computed(() => {
    return { ...e.thumbStyle, ...e.verticalThumbStyle, top: `${r.vertical.thumbStart.value}px`, height: `${r.vertical.thumbSize.value}px` };
  }), r.vertical.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (true === r.vertical.thumbHidden.value ? " q-scrollarea__thumb--invisible" : "")), r.vertical.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (true === r.vertical.thumbHidden.value ? " q-scrollarea__bar--invisible" : "")), r.horizontal.percentage = computed(() => {
    const e2 = r.horizontal.size.value - i.horizontal.value;
    if (e2 <= 0)
      return 0;
    const t2 = between(r.horizontal.position.value / e2, 0, 1);
    return Math.round(1e4 * t2) / 1e4;
  }), r.horizontal.thumbHidden = computed(() => true !== (null === e.visible ? l.value : e.visible) && false === n.value && false === a.value || r.horizontal.size.value <= i.horizontal.value + 1), r.horizontal.thumbStart = computed(() => r.horizontal.percentage.value * (i.horizontal.value - r.horizontal.thumbSize.value)), r.horizontal.thumbSize = computed(() => Math.round(between(i.horizontal.value * i.horizontal.value / r.horizontal.size.value, getMinThumbSize(i.horizontal.value), i.horizontal.value))), r.horizontal.style = computed(() => {
    return { ...e.thumbStyle, ...e.horizontalThumbStyle, left: `${r.horizontal.thumbStart.value}px`, width: `${r.horizontal.thumbSize.value}px` };
  }), r.horizontal.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (true === r.horizontal.thumbHidden.value ? " q-scrollarea__thumb--invisible" : "")), r.horizontal.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (true === r.horizontal.thumbHidden.value ? " q-scrollarea__bar--invisible" : ""));
  const m = computed(() => true === r.vertical.thumbHidden.value && true === r.horizontal.thumbHidden.value ? e.contentStyle : e.contentActiveStyle), f = [[TouchPan, (e2) => {
    k(e2, "vertical");
  }, void 0, { vertical: true, ...panOpts }]], g = [[TouchPan, (e2) => {
    k(e2, "horizontal");
  }, void 0, { horizontal: true, ...panOpts }]];
  function b() {
    const e2 = {};
    return axisList.forEach((t2) => {
      const o2 = r[t2];
      e2[t2 + "Position"] = o2.position.value, e2[t2 + "Percentage"] = o2.percentage.value, e2[t2 + "Size"] = o2.size.value, e2[t2 + "ContainerSize"] = i[t2].value;
    }), e2;
  }
  const y = debounce(() => {
    const e2 = b();
    e2.ref = s, o("scroll", e2);
  }, 0);
  function S(e2, t2, o2) {
    if (false === axisList.includes(e2))
      return void console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
    const n2 = "vertical" === e2 ? setVerticalScrollPosition : setHorizontalScrollPosition;
    n2(p2.value, t2, o2);
  }
  function w({ height: e2, width: t2 }) {
    let o2 = false;
    i.vertical.value !== e2 && (i.vertical.value = e2, o2 = true), i.horizontal.value !== t2 && (i.horizontal.value = t2, o2 = true), true === o2 && P();
  }
  function C({ position: e2 }) {
    let t2 = false;
    r.vertical.position.value !== e2.top && (r.vertical.position.value = e2.top, t2 = true), r.horizontal.position.value !== e2.left && (r.horizontal.position.value = e2.left, t2 = true), true === t2 && P();
  }
  function x({ height: e2, width: t2 }) {
    r.horizontal.size.value !== t2 && (r.horizontal.size.value = t2, P()), r.vertical.size.value !== e2 && (r.vertical.size.value = e2, P());
  }
  function k(e2, t2) {
    const o2 = r[t2];
    if (true === e2.isFirst) {
      if (true === o2.thumbHidden.value)
        return;
      d = o2.position.value, a.value = true;
    } else if (true !== a.value)
      return;
    true === e2.isFinal && (a.value = false);
    const n2 = dirProps[t2], l2 = i[t2].value, s2 = (o2.size.value - l2) / (l2 - o2.thumbSize.value), u2 = e2.distance[n2.dist], c2 = d + (e2.direction === n2.dir ? 1 : -1) * u2 * s2;
    $(c2, t2);
  }
  function _(e2, t2) {
    const o2 = r[t2];
    if (true !== o2.thumbHidden.value) {
      const n2 = e2[dirProps[t2].offset];
      if (n2 < o2.thumbStart.value || n2 > o2.thumbStart.value + o2.thumbSize.value) {
        const e3 = n2 - o2.thumbSize.value / 2;
        $(e3 / i[t2].value * o2.size.value, t2);
      }
      null !== o2.ref.value && o2.ref.value.dispatchEvent(new MouseEvent(e2.type, e2));
    }
  }
  function q(e2) {
    _(e2, "vertical");
  }
  function T(e2) {
    _(e2, "horizontal");
  }
  function P() {
    true === n.value ? clearTimeout(c) : n.value = true, c = setTimeout(() => {
      n.value = false;
    }, e.delay), void 0 !== e.onScroll && y();
  }
  function $(e2, t2) {
    p2.value[dirProps[t2].scroll] = e2;
  }
  function M() {
    l.value = true;
  }
  function B() {
    l.value = false;
  }
  let Q = null;
  return onDeactivated(() => {
    Q = { top: r.vertical.position.value, left: r.horizontal.position.value };
  }), onActivated(() => {
    if (null === Q)
      return;
    const e2 = p2.value;
    null !== e2 && (setHorizontalScrollPosition(e2, Q.left), setVerticalScrollPosition(e2, Q.top));
  }), onBeforeUnmount(y.cancel), Object.assign(s, { getScrollTarget: () => p2.value, getScroll: b, getScrollPosition: () => ({ top: r.vertical.position.value, left: r.horizontal.position.value }), getScrollPercentage: () => ({ top: r.vertical.percentage.value, left: r.horizontal.percentage.value }), setScrollPosition: S, setScrollPercentage(e2, t2, o2) {
    S(e2, t2 * (r[e2].size.value - i[e2].value), o2);
  } }), () => {
    return h("div", { class: v.value, onMouseenter: M, onMouseleave: B }, [h("div", { ref: p2, class: "q-scrollarea__container scroll relative-position fit hide-scrollbar", tabindex: void 0 !== e.tabindex ? e.tabindex : void 0 }, [h("div", { class: "q-scrollarea__content absolute", style: m.value }, hMergeSlot(t.default, [h(QResizeObserver, { debounce: 0, onResize: x })])), h(QScrollObserver, { axis: "both", onScroll: C })]), h(QResizeObserver, { debounce: 0, onResize: w }), h("div", { class: r.vertical.barClass.value, style: [e.barStyle, e.verticalBarStyle], "aria-hidden": "true", onMousedown: q }), h("div", { class: r.horizontal.barClass.value, style: [e.barStyle, e.horizontalBarStyle], "aria-hidden": "true", onMousedown: T }), withDirectives(h("div", { ref: r.vertical.ref, class: r.vertical.thumbClass.value, style: r.vertical.style.value, "aria-hidden": "true" }), f), withDirectives(h("div", { ref: r.horizontal.ref, class: r.horizontal.thumbClass.value, style: r.horizontal.style.value, "aria-hidden": "true" }), g)]);
  };
} });
const aggBucketSize = 1e3, scrollToEdges = ["start", "center", "end", "start-force", "center-force", "end-force"], filterProto = Array.prototype.filter, setOverflowAnchor = void 0 === window.getComputedStyle(document.body).overflowAnchor ? noop : function(e, t) {
  null !== e && (cancelAnimationFrame(e._qOverflowAnimationFrame), e._qOverflowAnimationFrame = requestAnimationFrame(() => {
    if (null === e)
      return;
    const o = e.children || [];
    filterProto.call(o, (e2) => e2.dataset && void 0 !== e2.dataset.qVsAnchor).forEach((e2) => {
      delete e2.dataset.qVsAnchor;
    });
    const n = o[t];
    n && n.dataset && (n.dataset.qVsAnchor = "");
  }));
};
function sumFn(e, t) {
  return e + t;
}
function getScrollDetails(e, t, o, n, a, l, i, r) {
  const s = e === window ? document.scrollingElement || document.documentElement : e, u = true === a ? "offsetWidth" : "offsetHeight", c = { scrollStart: 0, scrollViewSize: -i - r, scrollMaxSize: 0, offsetStart: -i, offsetEnd: -r };
  if (true === a ? (e === window ? (c.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, c.scrollViewSize += document.documentElement.clientWidth) : (c.scrollStart = s.scrollLeft, c.scrollViewSize += s.clientWidth), c.scrollMaxSize = s.scrollWidth, true === l && (c.scrollStart = (true === rtlHasScrollBug ? c.scrollMaxSize - c.scrollViewSize : 0) - c.scrollStart)) : (e === window ? (c.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0, c.scrollViewSize += document.documentElement.clientHeight) : (c.scrollStart = s.scrollTop, c.scrollViewSize += s.clientHeight), c.scrollMaxSize = s.scrollHeight), null !== o)
    for (let d = o.previousElementSibling; null !== d; d = d.previousElementSibling)
      false === d.classList.contains("q-virtual-scroll--skip") && (c.offsetStart += d[u]);
  if (null !== n)
    for (let d = n.nextElementSibling; null !== d; d = d.nextElementSibling)
      false === d.classList.contains("q-virtual-scroll--skip") && (c.offsetEnd += d[u]);
  if (t !== e) {
    const o2 = s.getBoundingClientRect(), n2 = t.getBoundingClientRect();
    true === a ? (c.offsetStart += n2.left - o2.left, c.offsetEnd -= n2.width) : (c.offsetStart += n2.top - o2.top, c.offsetEnd -= n2.height), e !== window && (c.offsetStart += c.scrollStart), c.offsetEnd += c.scrollMaxSize - c.offsetStart;
  }
  return c;
}
function setScroll(e, t, o, n) {
  "end" === t && (t = (e === window ? document.body : e)[true === o ? "scrollWidth" : "scrollHeight"]), e === window ? true === o ? (true === n && (t = (true === rtlHasScrollBug ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - t), window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0)) : window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t) : true === o ? (true === n && (t = (true === rtlHasScrollBug ? e.scrollWidth - e.offsetWidth : 0) - t), e.scrollLeft = t) : e.scrollTop = t;
}
function sumSize(e, t, o, n) {
  if (o >= n)
    return 0;
  const a = t.length, l = Math.floor(o / aggBucketSize), i = Math.floor((n - 1) / aggBucketSize) + 1;
  let r = e.slice(l, i).reduce(sumFn, 0);
  return o % aggBucketSize !== 0 && (r -= t.slice(l * aggBucketSize, o).reduce(sumFn, 0)), n % aggBucketSize !== 0 && n !== a && (r -= t.slice(n, i * aggBucketSize).reduce(sumFn, 0)), r;
}
const commonVirtScrollProps = { virtualScrollSliceSize: { type: [Number, String], default: null }, virtualScrollSliceRatioBefore: { type: [Number, String], default: 1 }, virtualScrollSliceRatioAfter: { type: [Number, String], default: 1 }, virtualScrollItemSize: { type: [Number, String], default: 24 }, virtualScrollStickySizeStart: { type: [Number, String], default: 0 }, virtualScrollStickySizeEnd: { type: [Number, String], default: 0 }, tableColspan: [Number, String] }, commonVirtPropsList = Object.keys(commonVirtScrollProps), useVirtualScrollProps = { virtualScrollHorizontal: Boolean, onVirtualScroll: Function, ...commonVirtScrollProps };
function useVirtualScroll({ virtualScrollLength: e, getVirtualScrollTarget: t, getVirtualScrollEl: o, virtualScrollItemSizeComputed: n }) {
  const a = getCurrentInstance(), { props: l, emit: i, proxy: r } = a, { $q: s } = r;
  let u, c, d, p2, v = [];
  const m = ref(0), f = ref(0), g = ref({}), b = ref(null), y = ref(null), S = ref(null), w = ref({ from: 0, to: 0 }), C = computed(() => void 0 !== l.tableColspan ? l.tableColspan : 100);
  void 0 === n && (n = computed(() => l.virtualScrollItemSize));
  const x = computed(() => n.value + ";" + l.virtualScrollHorizontal), k = computed(() => x.value + ";" + l.virtualScrollSliceRatioBefore + ";" + l.virtualScrollSliceRatioAfter);
  function _() {
    Q(c, true);
  }
  function q(e2) {
    Q(void 0 === e2 ? c : e2);
  }
  function T(n2, a2) {
    const i2 = t();
    if (void 0 === i2 || null === i2 || 8 === i2.nodeType)
      return;
    const r2 = getScrollDetails(i2, o(), b.value, y.value, l.virtualScrollHorizontal, s.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd);
    d !== r2.scrollViewSize && E(r2.scrollViewSize), $(i2, r2, Math.min(e.value - 1, Math.max(0, parseInt(n2, 10) || 0)), 0, scrollToEdges.indexOf(a2) > -1 ? a2 : c > -1 && n2 > c ? "end" : "start");
  }
  function P() {
    const n2 = t();
    if (void 0 === n2 || null === n2 || 8 === n2.nodeType)
      return;
    const a2 = getScrollDetails(n2, o(), b.value, y.value, l.virtualScrollHorizontal, s.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd), i2 = e.value - 1, r2 = a2.scrollMaxSize - a2.offsetStart - a2.offsetEnd - f.value;
    if (u === a2.scrollStart)
      return;
    if (a2.scrollMaxSize <= 0)
      return void $(n2, a2, 0, 0);
    d !== a2.scrollViewSize && E(a2.scrollViewSize), M(w.value.from);
    const c2 = Math.floor(a2.scrollMaxSize - Math.max(a2.scrollViewSize, a2.offsetEnd) - Math.min(p2[i2], a2.scrollViewSize / 2));
    if (c2 > 0 && Math.ceil(a2.scrollStart) >= c2)
      return void $(n2, a2, i2, a2.scrollMaxSize - a2.offsetEnd - v.reduce(sumFn, 0));
    let h2 = 0, g2 = a2.scrollStart - a2.offsetStart, S2 = g2;
    if (g2 <= r2 && g2 + a2.scrollViewSize >= m.value)
      g2 -= m.value, h2 = w.value.from, S2 = g2;
    else
      for (let e2 = 0; g2 >= v[e2] && h2 < i2; e2++)
        g2 -= v[e2], h2 += aggBucketSize;
    while (g2 > 0 && h2 < i2)
      g2 -= p2[h2], g2 > -a2.scrollViewSize ? (h2++, S2 = g2) : S2 = p2[h2] + g2;
    $(n2, a2, h2, S2);
  }
  function $(t2, o2, n2, a2, i2) {
    const r2 = "string" === typeof i2 && i2.indexOf("-force") > -1, c2 = true === r2 ? i2.replace("-force", "") : i2, d2 = void 0 !== c2 ? c2 : "start";
    let h2 = Math.max(0, n2 - g.value[d2]), b2 = h2 + g.value.total;
    b2 > e.value && (b2 = e.value, h2 = Math.max(0, b2 - g.value.total)), u = o2.scrollStart;
    const y2 = h2 !== w.value.from || b2 !== w.value.to;
    if (false === y2 && void 0 === c2)
      return void A(n2);
    const { activeElement: C2 } = document, x2 = S.value;
    true === y2 && null !== x2 && x2 !== C2 && true === x2.contains(C2) && (x2.addEventListener("focusout", B), setTimeout(() => {
      null !== x2 && x2.removeEventListener("focusout", B);
    })), setOverflowAnchor(x2, n2 - h2);
    const k2 = void 0 !== c2 ? p2.slice(h2, n2).reduce(sumFn, 0) : 0;
    if (true === y2) {
      const t3 = b2 >= w.value.from && h2 <= w.value.to ? w.value.to : b2;
      w.value = { from: h2, to: t3 }, m.value = sumSize(v, p2, 0, h2), f.value = sumSize(v, p2, b2, e.value), requestAnimationFrame(() => {
        w.value.to !== b2 && u === o2.scrollStart && (w.value = { from: w.value.from, to: b2 }, f.value = sumSize(v, p2, b2, e.value));
      });
    }
    requestAnimationFrame(() => {
      if (u !== o2.scrollStart)
        return;
      true === y2 && M(h2);
      const e2 = p2.slice(h2, n2).reduce(sumFn, 0), i3 = e2 + o2.offsetStart + m.value, d3 = i3 + p2[n2];
      let v2 = i3 + a2;
      if (void 0 !== c2) {
        const t3 = e2 - k2, a3 = o2.scrollStart + t3;
        v2 = true !== r2 && a3 < i3 && d3 < a3 + o2.scrollViewSize ? a3 : "end" === c2 ? d3 - o2.scrollViewSize : i3 - ("start" === c2 ? 0 : Math.round((o2.scrollViewSize - p2[n2]) / 2));
      }
      u = v2, setScroll(t2, v2, l.virtualScrollHorizontal, s.lang.rtl), A(n2);
    });
  }
  function M(e2) {
    const t2 = S.value;
    if (t2) {
      const o2 = filterProto.call(t2.children, (e3) => e3.classList && false === e3.classList.contains("q-virtual-scroll--skip")), n2 = o2.length, a2 = true === l.virtualScrollHorizontal ? (e3) => e3.getBoundingClientRect().width : (e3) => e3.offsetHeight;
      let i2, r2, s2 = e2;
      for (let e3 = 0; e3 < n2; ) {
        i2 = a2(o2[e3]), e3++;
        while (e3 < n2 && true === o2[e3].classList.contains("q-virtual-scroll--with-prev"))
          i2 += a2(o2[e3]), e3++;
        r2 = i2 - p2[s2], 0 !== r2 && (p2[s2] += r2, v[Math.floor(s2 / aggBucketSize)] += r2), s2++;
      }
    }
  }
  function B() {
    null !== S.value && void 0 !== S.value && S.value.focus();
  }
  function Q(t2, o2) {
    const a2 = 1 * n.value;
    true !== o2 && false !== Array.isArray(p2) || (p2 = []);
    const l2 = p2.length;
    p2.length = e.value;
    for (let n2 = e.value - 1; n2 >= l2; n2--)
      p2[n2] = a2;
    const i2 = Math.floor((e.value - 1) / aggBucketSize);
    v = [];
    for (let n2 = 0; n2 <= i2; n2++) {
      let t3 = 0;
      const o3 = Math.min((n2 + 1) * aggBucketSize, e.value);
      for (let e2 = n2 * aggBucketSize; e2 < o3; e2++)
        t3 += p2[e2];
      v.push(t3);
    }
    c = -1, u = void 0, m.value = sumSize(v, p2, 0, w.value.from), f.value = sumSize(v, p2, w.value.to, e.value), t2 >= 0 ? (M(w.value.from), nextTick(() => {
      T(t2);
    })) : L();
  }
  function E(e2) {
    if (void 0 === e2 && "undefined" !== typeof window) {
      const n2 = t();
      void 0 !== n2 && null !== n2 && 8 !== n2.nodeType && (e2 = getScrollDetails(n2, o(), b.value, y.value, l.virtualScrollHorizontal, s.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd).scrollViewSize);
    }
    d = e2;
    const a2 = parseFloat(l.virtualScrollSliceRatioBefore) || 0, i2 = parseFloat(l.virtualScrollSliceRatioAfter) || 0, r2 = 1 + a2 + i2, u2 = void 0 === e2 || e2 <= 0 ? 1 : Math.ceil(e2 / n.value), c2 = Math.max(1, u2, Math.ceil((l.virtualScrollSliceSize > 0 ? l.virtualScrollSliceSize : 10) / r2));
    g.value = { total: Math.ceil(c2 * r2), start: Math.ceil(c2 * a2), center: Math.ceil(c2 * (0.5 + a2)), end: Math.ceil(c2 * (1 + a2)), view: u2 };
  }
  function O(e2, t2) {
    const o2 = true === l.virtualScrollHorizontal ? "width" : "height", a2 = { ["--q-virtual-scroll-item-" + o2]: n.value + "px" };
    return ["tbody" === e2 ? h(e2, { class: "q-virtual-scroll__padding", key: "before", ref: b }, [h("tr", [h("td", { style: { [o2]: `${m.value}px`, ...a2 }, colspan: C.value })])]) : h(e2, { class: "q-virtual-scroll__padding", key: "before", ref: b, style: { [o2]: `${m.value}px`, ...a2 } }), h(e2, { class: "q-virtual-scroll__content", key: "content", ref: S, tabindex: -1 }, t2.flat()), "tbody" === e2 ? h(e2, { class: "q-virtual-scroll__padding", key: "after", ref: y }, [h("tr", [h("td", { style: { [o2]: `${f.value}px`, ...a2 }, colspan: C.value })])]) : h(e2, { class: "q-virtual-scroll__padding", key: "after", ref: y, style: { [o2]: `${f.value}px`, ...a2 } })];
  }
  function A(e2) {
    c !== e2 && (void 0 !== l.onVirtualScroll && i("virtual-scroll", { index: e2, from: w.value.from, to: w.value.to - 1, direction: e2 < c ? "decrease" : "increase", ref: r }), c = e2);
  }
  watch(k, () => {
    E();
  }), watch(x, _), E();
  const L = debounce(P, true === s.platform.is.ios ? 120 : 35);
  onBeforeMount(() => {
    E();
  });
  let R = false;
  return onDeactivated(() => {
    R = true;
  }), onActivated(() => {
    if (true !== R)
      return;
    const e2 = t();
    void 0 !== u && void 0 !== e2 && null !== e2 && 8 !== e2.nodeType ? setScroll(e2, u, l.virtualScrollHorizontal, s.lang.rtl) : T(c);
  }), onBeforeUnmount(() => {
    L.cancel();
  }), Object.assign(r, { scrollTo: T, reset: _, refresh: q }), { virtualScrollSliceRange: w, virtualScrollSliceSizeComputed: g, setVirtualScrollSize: E, onVirtualScrollEvt: L, localResetVirtualScroll: Q, padVirtualScroll: O, scrollTo: T, reset: _, refresh: q };
}
const validateNewValueMode = (e) => ["add", "add-unique", "toggle"].includes(e), reEscapeList = ".*+?^${}()|[]\\", fieldPropsList = Object.keys(useFieldProps);
var QSelect = createComponent({ name: "QSelect", inheritAttrs: false, props: { ...useVirtualScrollProps, ...useFormProps, ...useFieldProps, modelValue: { required: true }, multiple: Boolean, displayValue: [String, Number], displayValueHtml: Boolean, dropdownIcon: String, options: { type: Array, default: () => [] }, optionValue: [Function, String], optionLabel: [Function, String], optionDisable: [Function, String], hideSelected: Boolean, hideDropdownIcon: Boolean, fillInput: Boolean, maxValues: [Number, String], optionsDense: Boolean, optionsDark: { type: Boolean, default: null }, optionsSelectedClass: String, optionsHtml: Boolean, optionsCover: Boolean, menuShrink: Boolean, menuAnchor: String, menuSelf: String, menuOffset: Array, popupContentClass: String, popupContentStyle: [String, Array, Object], useInput: Boolean, useChips: Boolean, newValueMode: { type: String, validator: validateNewValueMode }, mapOptions: Boolean, emitValue: Boolean, inputDebounce: { type: [Number, String], default: 500 }, inputClass: [Array, String, Object], inputStyle: [Array, String, Object], tabindex: { type: [String, Number], default: 0 }, autocomplete: String, transitionShow: String, transitionHide: String, transitionDuration: [String, Number], behavior: { type: String, validator: (e) => ["default", "menu", "dialog"].includes(e), default: "default" }, virtualScrollItemSize: { type: [Number, String], default: void 0 }, onNewValue: Function, onFilter: Function }, emits: [...useFieldEmits, "add", "remove", "input-value", "new-value", "keyup", "keypress", "keydown", "filter-abort"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = ref(false), i = ref(false), r = ref(-1), s = ref(""), u = ref(false), c = ref(false);
  let d, p2, v, m, f, g, b, y, S;
  const w = ref(null), C = ref(null), x = ref(null), k = ref(null), _ = ref(null), q = useFormInputNameAttr(e), T = useKeyComposition(Te), P = computed(() => Array.isArray(e.options) ? e.options.length : 0), $ = computed(() => void 0 === e.virtualScrollItemSize ? true === e.optionsDense ? 24 : 48 : e.virtualScrollItemSize), { virtualScrollSliceRange: M, virtualScrollSliceSizeComputed: B, localResetVirtualScroll: Q, padVirtualScroll: E, onVirtualScrollEvt: O, scrollTo: A, setVirtualScrollSize: L } = useVirtualScroll({ virtualScrollLength: P, getVirtualScrollTarget: xe, getVirtualScrollEl: Ce, virtualScrollItemSizeComputed: $ }), R = useFieldState(), D = computed(() => {
    const t2 = true === e.mapOptions && true !== e.multiple, o2 = void 0 === e.modelValue || null === e.modelValue && true !== t2 ? [] : true === e.multiple && Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue];
    if (true === e.mapOptions && true === Array.isArray(e.options)) {
      const n2 = true === e.mapOptions && void 0 !== p2 ? p2 : [], a2 = o2.map((e2) => me(e2, n2));
      return null === e.modelValue && true === t2 ? a2.filter((e2) => null !== e2) : a2;
    }
    return o2;
  }), z = computed(() => {
    const t2 = {};
    return fieldPropsList.forEach((o2) => {
      const n2 = e[o2];
      void 0 !== n2 && (t2[o2] = n2);
    }), t2;
  }), F = computed(() => null === e.optionsDark ? R.isDark.value : e.optionsDark), I = computed(() => fieldValueIsFilled(D.value)), V = computed(() => {
    let t2 = "q-field__input q-placeholder col";
    return true === e.hideSelected || 0 === D.value.length ? [t2, e.inputClass] : (t2 += " q-field__input--padding", void 0 === e.inputClass ? t2 : [t2, e.inputClass]);
  }), N = computed(() => (true === e.virtualScrollHorizontal ? "q-virtual-scroll--horizontal" : "") + (e.popupContentClass ? " " + e.popupContentClass : "")), H = computed(() => 0 === P.value), j = computed(() => D.value.map((e2) => ne.value(e2)).join(", ")), U = computed(() => true === e.optionsHtml ? () => true : (e2) => void 0 !== e2 && null !== e2 && true === e2.html), K = computed(() => true === e.displayValueHtml || void 0 === e.displayValue && (true === e.optionsHtml || D.value.some(U.value))), W = computed(() => true === R.focused.value ? e.tabindex : -1), Y = computed(() => {
    const t2 = { tabindex: e.tabindex, role: "combobox", "aria-label": e.label, "aria-readonly": true === e.readonly ? "true" : "false", "aria-autocomplete": true === e.useInput ? "list" : "none", "aria-expanded": true === l.value ? "true" : "false", "aria-owns": `${R.targetUid.value}_lb`, "aria-controls": `${R.targetUid.value}_lb` };
    return t2;
  }), G = computed(() => {
    const t2 = { id: `${R.targetUid.value}_lb`, role: "listbox", "aria-multiselectable": true === e.multiple ? "true" : "false" };
    return r.value >= 0 && (t2["aria-activedescendant"] = `${R.targetUid.value}_${r.value}`), t2;
  }), X = computed(() => {
    return D.value.map((e2, t2) => ({ index: t2, opt: e2, html: U.value(e2), selected: true, removeAtIndex: ue, toggleOption: de, tabindex: W.value }));
  }), Z = computed(() => {
    if (0 === P.value)
      return [];
    const { from: t2, to: o2 } = M.value;
    return e.options.slice(t2, o2).map((o3, n2) => {
      const i2 = true === ae.value(o3), s2 = t2 + n2, u2 = { clickable: true, active: false, activeClass: te.value, manualFocus: true, focused: false, disable: i2, tabindex: -1, dense: e.optionsDense, dark: F.value, role: "option", id: `${R.targetUid.value}_${s2}`, onClick: () => {
        de(o3);
      } };
      return true !== i2 && (true === he(o3) && (u2.active = true), r.value === s2 && (u2.focused = true), u2["aria-selected"] = true === u2.active ? "true" : "false", true === a.platform.is.desktop && (u2.onMousemove = () => {
        true === l.value && pe(s2);
      })), { index: s2, opt: o3, html: U.value(o3), label: ne.value(o3), selected: u2.active, focused: u2.focused, toggleOption: de, setOptionIndex: pe, itemProps: u2 };
    });
  }), J = computed(() => void 0 !== e.dropdownIcon ? e.dropdownIcon : a.iconSet.arrow.dropdown), ee = computed(() => false === e.optionsCover && true !== e.outlined && true !== e.standout && true !== e.borderless && true !== e.rounded), te = computed(() => void 0 !== e.optionsSelectedClass ? e.optionsSelectedClass : void 0 !== e.color ? `text-${e.color}` : ""), oe = computed(() => fe(e.optionValue, "value")), ne = computed(() => fe(e.optionLabel, "label")), ae = computed(() => fe(e.optionDisable, "disable")), le = computed(() => D.value.map((e2) => oe.value(e2))), ie = computed(() => {
    const e2 = { onInput: Te, onChange: T, onKeydown: we, onKeyup: ye, onKeypress: Se, onFocus: ge, onClick(e3) {
      true === v && stop(e3);
    } };
    return e2.onCompositionstart = e2.onCompositionupdate = e2.onCompositionend = T, e2;
  });
  function re(t2) {
    return true === e.emitValue ? oe.value(t2) : t2;
  }
  function se(t2) {
    if (t2 > -1 && t2 < D.value.length)
      if (true === e.multiple) {
        const n2 = e.modelValue.slice();
        o("remove", { index: t2, value: n2.splice(t2, 1)[0] }), o("update:modelValue", n2);
      } else
        o("update:modelValue", null);
  }
  function ue(e2) {
    se(e2), R.focus();
  }
  function ce(t2, n2) {
    const a2 = re(t2);
    if (true !== e.multiple)
      return true === e.fillInput && $e(ne.value(t2), true, true), void o("update:modelValue", a2);
    if (0 === D.value.length)
      return o("add", { index: 0, value: a2 }), void o("update:modelValue", true === e.multiple ? [a2] : a2);
    if (true === n2 && true === he(t2))
      return;
    if (void 0 !== e.maxValues && e.modelValue.length >= e.maxValues)
      return;
    const l2 = e.modelValue.slice();
    o("add", { index: l2.length, value: a2 }), l2.push(a2), o("update:modelValue", l2);
  }
  function de(t2, n2) {
    if (true !== R.editable.value || void 0 === t2 || true === ae.value(t2))
      return;
    const a2 = oe.value(t2);
    if (true !== e.multiple)
      return true !== n2 && ($e(true === e.fillInput ? ne.value(t2) : "", true, true), Ve()), null !== C.value && C.value.focus(), void (0 !== D.value.length && true === isDeepEqual(oe.value(D.value[0]), a2) || o("update:modelValue", true === e.emitValue ? a2 : t2));
    if ((true !== v || true === u.value) && R.focus(), ge(), 0 === D.value.length) {
      const n3 = true === e.emitValue ? a2 : t2;
      return o("add", { index: 0, value: n3 }), void o("update:modelValue", true === e.multiple ? [n3] : n3);
    }
    const l2 = e.modelValue.slice(), i2 = le.value.findIndex((e2) => isDeepEqual(e2, a2));
    if (i2 > -1)
      o("remove", { index: i2, value: l2.splice(i2, 1)[0] });
    else {
      if (void 0 !== e.maxValues && l2.length >= e.maxValues)
        return;
      const n3 = true === e.emitValue ? a2 : t2;
      o("add", { index: l2.length, value: n3 }), l2.push(n3);
    }
    o("update:modelValue", l2);
  }
  function pe(e2) {
    if (true !== a.platform.is.desktop)
      return;
    const t2 = e2 > -1 && e2 < P.value ? e2 : -1;
    r.value !== t2 && (r.value = t2);
  }
  function ve(t2 = 1, o2) {
    if (true === l.value) {
      let n2 = r.value;
      do {
        n2 = normalizeToInterval(n2 + t2, -1, P.value - 1);
      } while (-1 !== n2 && n2 !== r.value && true === ae.value(e.options[n2]));
      r.value !== n2 && (pe(n2), A(n2), true !== o2 && true === e.useInput && true === e.fillInput && Pe(n2 >= 0 ? ne.value(e.options[n2]) : g));
    }
  }
  function me(t2, o2) {
    const n2 = (e2) => isDeepEqual(oe.value(e2), t2);
    return e.options.find(n2) || o2.find(n2) || t2;
  }
  function fe(e2, t2) {
    const o2 = void 0 !== e2 ? e2 : t2;
    return "function" === typeof o2 ? o2 : (e3) => null !== e3 && "object" === typeof e3 && o2 in e3 ? e3[o2] : e3;
  }
  function he(e2) {
    const t2 = oe.value(e2);
    return void 0 !== le.value.find((e3) => isDeepEqual(e3, t2));
  }
  function ge(t2) {
    true === e.useInput && null !== C.value && (void 0 === t2 || C.value === t2.target && t2.target.value === j.value) && C.value.select();
  }
  function be(e2) {
    true === isKeyCode(e2, 27) && true === l.value && (stop(e2), Ve(), Ne()), o("keyup", e2);
  }
  function ye(t2) {
    const { value: o2 } = t2.target;
    if (void 0 === t2.keyCode)
      if (t2.target.value = "", clearTimeout(d), Ne(), "string" === typeof o2 && o2.length > 0) {
        const t3 = o2.toLocaleLowerCase(), n2 = (o3) => {
          const n3 = e.options.find((e2) => o3.value(e2).toLocaleLowerCase() === t3);
          return void 0 !== n3 && (-1 === D.value.indexOf(n3) ? de(n3) : Ve(), true);
        }, a2 = (e2) => {
          true !== n2(oe) && true !== n2(ne) && true !== e2 && Me(o2, true, () => a2(true));
        };
        a2();
      } else
        R.clearValue(t2);
    else
      be(t2);
  }
  function Se(e2) {
    o("keypress", e2);
  }
  function we(t2) {
    if (o("keydown", t2), true === shouldIgnoreKey(t2))
      return;
    const n2 = s.value.length > 0 && (void 0 !== e.newValueMode || void 0 !== e.onNewValue), a2 = true !== t2.shiftKey && true !== e.multiple && (r.value > -1 || true === n2);
    if (27 === t2.keyCode)
      return void prevent(t2);
    if (9 === t2.keyCode && false === a2)
      return void Fe();
    if (void 0 === t2.target || t2.target.id !== R.targetUid.value)
      return;
    if (40 === t2.keyCode && true !== R.innerLoading.value && false === l.value)
      return stopAndPrevent(t2), void Ie();
    if (8 === t2.keyCode && true !== e.hideSelected && 0 === s.value.length)
      return void (true === e.multiple && true === Array.isArray(e.modelValue) ? se(e.modelValue.length - 1) : true !== e.multiple && null !== e.modelValue && o("update:modelValue", null));
    35 !== t2.keyCode && 36 !== t2.keyCode || "string" === typeof s.value && 0 !== s.value.length || (stopAndPrevent(t2), r.value = -1, ve(36 === t2.keyCode ? 1 : -1, e.multiple)), 33 !== t2.keyCode && 34 !== t2.keyCode || void 0 === B.value || (stopAndPrevent(t2), r.value = Math.max(-1, Math.min(P.value, r.value + (33 === t2.keyCode ? -1 : 1) * B.value.view)), ve(33 === t2.keyCode ? 1 : -1, e.multiple)), 38 !== t2.keyCode && 40 !== t2.keyCode || (stopAndPrevent(t2), ve(38 === t2.keyCode ? -1 : 1, e.multiple));
    const i2 = P.value;
    if ((void 0 === y || S < Date.now()) && (y = ""), i2 > 0 && true !== e.useInput && void 0 !== t2.key && 1 === t2.key.length && t2.altKey === t2.ctrlKey && (32 !== t2.keyCode || y.length > 0)) {
      true !== l.value && Ie(t2);
      const o2 = t2.key.toLocaleLowerCase(), n3 = 1 === y.length && y[0] === o2;
      S = Date.now() + 1500, false === n3 && (stopAndPrevent(t2), y += o2);
      const a3 = new RegExp("^" + y.split("").map((e2) => reEscapeList.indexOf(e2) > -1 ? "\\" + e2 : e2).join(".*"), "i");
      let s2 = r.value;
      if (true === n3 || s2 < 0 || true !== a3.test(ne.value(e.options[s2])))
        do {
          s2 = normalizeToInterval(s2 + 1, -1, i2 - 1);
        } while (s2 !== r.value && (true === ae.value(e.options[s2]) || true !== a3.test(ne.value(e.options[s2]))));
      r.value !== s2 && nextTick(() => {
        pe(s2), A(s2), s2 >= 0 && true === e.useInput && true === e.fillInput && Pe(ne.value(e.options[s2]));
      });
    } else if (13 === t2.keyCode || 32 === t2.keyCode && true !== e.useInput && "" === y || 9 === t2.keyCode && false !== a2)
      if (9 !== t2.keyCode && stopAndPrevent(t2), r.value > -1 && r.value < i2)
        de(e.options[r.value]);
      else {
        if (true === n2) {
          const t3 = (t4, o2) => {
            if (o2) {
              if (true !== validateNewValueMode(o2))
                return;
            } else
              o2 = e.newValueMode;
            if (void 0 === t4 || null === t4)
              return;
            $e("", true !== e.multiple, true);
            const n3 = "toggle" === o2 ? de : ce;
            n3(t4, "add-unique" === o2), true !== e.multiple && (null !== C.value && C.value.focus(), Ve());
          };
          if (void 0 !== e.onNewValue ? o("new-value", s.value, t3) : t3(s.value), true !== e.multiple)
            return;
        }
        true === l.value ? Fe() : true !== R.innerLoading.value && Ie();
      }
  }
  function Ce() {
    return true === v ? _.value : null !== x.value && null !== x.value.__qPortalInnerRef.value ? x.value.__qPortalInnerRef.value : void 0;
  }
  function xe() {
    return Ce();
  }
  function ke() {
    return true === e.hideSelected ? [] : void 0 !== t["selected-item"] ? X.value.map((e2) => t["selected-item"](e2)).slice() : void 0 !== t.selected ? [].concat(t.selected()) : true === e.useChips ? X.value.map((t2, o2) => h(QChip, { key: "option-" + o2, removable: true === R.editable.value && true !== ae.value(t2.opt), dense: true, textColor: e.color, tabindex: W.value, onRemove() {
      t2.removeAtIndex(o2);
    } }, () => h("span", { class: "ellipsis", [true === t2.html ? "innerHTML" : "textContent"]: ne.value(t2.opt) }))) : [h("span", { [true === K.value ? "innerHTML" : "textContent"]: void 0 !== e.displayValue ? e.displayValue : j.value })];
  }
  function _e() {
    if (true === H.value)
      return void 0 !== t["no-option"] ? t["no-option"]({ inputValue: s.value }) : void 0;
    const e2 = void 0 !== t.option ? t.option : (e3) => {
      return h(QItem, { key: e3.index, ...e3.itemProps }, () => {
        return h(QItemSection, () => h(QItemLabel, () => h("span", { [true === e3.html ? "innerHTML" : "textContent"]: e3.label })));
      });
    };
    let o2 = E("div", Z.value.map(e2));
    return void 0 !== t["before-options"] && (o2 = t["before-options"]().concat(o2)), hMergeSlot(t["after-options"], o2);
  }
  function qe(t2, o2) {
    const n2 = true === o2 ? { ...Y.value, ...R.splitAttrs.attributes.value } : void 0, a2 = { ref: true === o2 ? C : void 0, key: "i_t", class: V.value, style: e.inputStyle, value: void 0 !== s.value ? s.value : "", type: "search", ...n2, id: true === o2 ? R.targetUid.value : void 0, maxlength: e.maxlength, autocomplete: e.autocomplete, "data-autofocus": true !== t2 && true === e.autofocus || void 0, disabled: true === e.disable, readonly: true === e.readonly, ...ie.value };
    return true !== t2 && true === v && (true === Array.isArray(a2.class) ? a2.class = [...a2.class, "no-pointer-events"] : a2.class += " no-pointer-events"), h("input", a2);
  }
  function Te(t2) {
    clearTimeout(d), t2 && t2.target && true === t2.target.qComposing || (Pe(t2.target.value || ""), m = true, g = s.value, true === R.focused.value || true === v && true !== u.value || R.focus(), void 0 !== e.onFilter && (d = setTimeout(() => {
      Me(s.value);
    }, e.inputDebounce)));
  }
  function Pe(e2) {
    s.value !== e2 && (s.value = e2, o("input-value", e2));
  }
  function $e(t2, o2, n2) {
    m = true !== n2, true === e.useInput && (Pe(t2), true !== o2 && true === n2 || (g = t2), true !== o2 && Me(t2));
  }
  function Me(t2, a2, i2) {
    if (void 0 === e.onFilter || true !== a2 && true !== R.focused.value)
      return;
    true === R.innerLoading.value ? o("filter-abort") : (R.innerLoading.value = true, c.value = true), "" !== t2 && true !== e.multiple && D.value.length > 0 && true !== m && t2 === ne.value(D.value[0]) && (t2 = "");
    const r2 = setTimeout(() => {
      true === l.value && (l.value = false);
    }, 10);
    clearTimeout(f), f = r2, o("filter", t2, (e2, t3) => {
      true !== a2 && true !== R.focused.value || f !== r2 || (clearTimeout(f), "function" === typeof e2 && e2(), c.value = false, nextTick(() => {
        R.innerLoading.value = false, true === R.editable.value && (true === a2 ? true === l.value && Ve() : true === l.value ? He(true) : l.value = true), "function" === typeof t3 && nextTick(() => {
          t3(n);
        }), "function" === typeof i2 && nextTick(() => {
          i2(n);
        });
      }));
    }, () => {
      true === R.focused.value && f === r2 && (clearTimeout(f), R.innerLoading.value = false, c.value = false), true === l.value && (l.value = false);
    });
  }
  function Be() {
    return h(QMenu, { ref: x, class: N.value, style: e.popupContentStyle, modelValue: l.value, fit: true !== e.menuShrink, cover: true === e.optionsCover && true !== H.value && true !== e.useInput, anchor: e.menuAnchor, self: e.menuSelf, offset: e.menuOffset, dark: F.value, noParentEvent: true, noRefocus: true, noFocus: true, square: ee.value, transitionShow: e.transitionShow, transitionHide: e.transitionHide, transitionDuration: e.transitionDuration, separateClosePopup: true, ...G.value, onScrollPassive: O, onBeforeShow: Ke, onBeforeHide: Qe, onShow: Ee }, _e);
  }
  function Qe(e2) {
    We(e2), Fe();
  }
  function Ee() {
    L();
  }
  function Oe(e2) {
    stop(e2), null !== C.value && C.value.focus(), u.value = true, window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
  }
  function Ae(e2) {
    stop(e2), nextTick(() => {
      u.value = false;
    });
  }
  function Le() {
    const o2 = [h(QField, { class: `col-auto ${R.fieldClass.value}`, ...z.value, for: R.targetUid.value, dark: F.value, square: true, loading: c.value, itemAligned: false, filled: true, stackLabel: s.value.length > 0, ...R.splitAttrs.listeners.value, onFocus: Oe, onBlur: Ae }, { ...t, rawControl: () => R.getControl(true), before: void 0, after: void 0 })];
    return true === l.value && o2.push(h("div", { ref: _, class: N.value + " scroll", style: e.popupContentStyle, ...G.value, onClick: prevent, onScrollPassive: O }, _e())), h(QDialog, { ref: k, modelValue: i.value, position: true === e.useInput ? "top" : void 0, transitionShow: b, transitionHide: e.transitionHide, transitionDuration: e.transitionDuration, onBeforeShow: Ke, onBeforeHide: Re, onHide: De, onShow: ze }, () => h("div", { class: "q-select__dialog" + (true === F.value ? " q-select__dialog--dark q-dark" : "") + (true === u.value ? " q-select__dialog--focused" : "") }, o2));
  }
  function Re(e2) {
    We(e2), null !== k.value && k.value.__updateRefocusTarget(R.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")), R.focused.value = false;
  }
  function De(e2) {
    Ve(), false === R.focused.value && o("blur", e2), Ne();
  }
  function ze() {
    const e2 = document.activeElement;
    null !== e2 && e2.id === R.targetUid.value || null === C.value || C.value === e2 || C.value.focus(), L();
  }
  function Fe() {
    true !== i.value && (r.value = -1, true === l.value && (l.value = false), false === R.focused.value && (clearTimeout(f), f = void 0, true === R.innerLoading.value && (o("filter-abort"), R.innerLoading.value = false, c.value = false)));
  }
  function Ie(o2) {
    true === R.editable.value && (true === v ? (R.onControlFocusin(o2), i.value = true, nextTick(() => {
      R.focus();
    })) : R.focus(), void 0 !== e.onFilter ? Me(s.value) : true === H.value && void 0 === t["no-option"] || (l.value = true));
  }
  function Ve() {
    i.value = false, Fe();
  }
  function Ne() {
    true === e.useInput && $e(true !== e.multiple && true === e.fillInput && D.value.length > 0 && ne.value(D.value[0]) || "", true, true);
  }
  function He(t2) {
    let o2 = -1;
    if (true === t2) {
      if (D.value.length > 0) {
        const t3 = oe.value(D.value[0]);
        o2 = e.options.findIndex((e2) => isDeepEqual(oe.value(e2), t3));
      }
      Q(o2);
    }
    pe(o2);
  }
  function je(e2, t2) {
    true === l.value && false === R.innerLoading.value && (Q(-1, true), nextTick(() => {
      true === l.value && false === R.innerLoading.value && (e2 > t2 ? Q() : He(true));
    }));
  }
  function Ue() {
    false === i.value && null !== x.value && x.value.updatePosition();
  }
  function Ke(e2) {
    void 0 !== e2 && stop(e2), o("popup-show", e2), R.hasPopupOpen = true, R.onControlFocusin(e2);
  }
  function We(e2) {
    void 0 !== e2 && stop(e2), o("popup-hide", e2), R.hasPopupOpen = false, R.onControlFocusout(e2);
  }
  function Ye() {
    v = (true === a.platform.is.mobile || "dialog" === e.behavior) && ("menu" !== e.behavior && (true !== e.useInput || (void 0 !== t["no-option"] || void 0 !== e.onFilter || false === H.value))), b = true === a.platform.is.ios && true === v && true === e.useInput ? "fade" : e.transitionShow;
  }
  return watch(D, (t2) => {
    p2 = t2, true === e.useInput && true === e.fillInput && true !== e.multiple && true !== R.innerLoading.value && (true !== i.value && true !== l.value || true !== I.value) && (true !== m && Ne(), true !== i.value && true !== l.value || Me(""));
  }, { immediate: true }), watch(() => e.fillInput, Ne), watch(l, He), watch(P, je), onBeforeUpdate(Ye), onUpdated(Ue), Ye(), onBeforeUnmount(() => {
    clearTimeout(d);
  }), Object.assign(n, { showPopup: Ie, hidePopup: Ve, removeAtIndex: se, add: ce, toggleOption: de, getOptionIndex: () => r.value, setOptionIndex: pe, moveOptionSelection: ve, filter: Me, updateMenuPosition: Ue, updateInputValue: $e, isOptionSelected: he, getEmittingOptionValue: re, isOptionDisabled: (...e2) => true === ae.value.apply(null, e2), getOptionValue: (...e2) => oe.value.apply(null, e2), getOptionLabel: (...e2) => ne.value.apply(null, e2) }), Object.assign(R, { innerValue: D, fieldClass: computed(() => `q-select q-field--auto-height q-select--with${true !== e.useInput ? "out" : ""}-input q-select--with${true !== e.useChips ? "out" : ""}-chips q-select--${true === e.multiple ? "multiple" : "single"}`), inputRef: w, targetRef: C, hasValue: I, showPopup: Ie, floatingLabel: computed(() => true !== e.hideSelected && true === I.value || "number" === typeof s.value || s.value.length > 0 || fieldValueIsFilled(e.displayValue)), getControlChild: () => {
    if (false !== R.editable.value && (true === i.value || true !== H.value || void 0 !== t["no-option"]))
      return true === v ? Le() : Be();
    true === R.hasPopupOpen && (R.hasPopupOpen = false);
  }, controlEvents: { onFocusin(e2) {
    R.onControlFocusin(e2);
  }, onFocusout(e2) {
    R.onControlFocusout(e2, () => {
      Ne(), Fe();
    });
  }, onClick(e2) {
    if (prevent(e2), true !== v && true === l.value)
      return Fe(), void (null !== C.value && C.value.focus());
    Ie(e2);
  } }, getControl: (t2) => {
    const o2 = ke(), n2 = true === t2 || true !== i.value || true !== v;
    if (true === e.useInput)
      o2.push(qe(t2, n2));
    else if (true === R.editable.value) {
      const a3 = true === n2 ? Y.value : void 0;
      o2.push(h("input", { ref: true === n2 ? C : void 0, key: "d_t", class: "q-select__focus-target", id: true === n2 ? R.targetUid.value : void 0, readonly: true, "data-autofocus": true !== t2 && true === e.autofocus || void 0, ...a3, onKeydown: we, onKeyup: be, onKeypress: Se })), true === n2 && "string" === typeof e.autocomplete && e.autocomplete.length > 0 && o2.push(h("input", { class: "q-select__autocomplete-input", autocomplete: e.autocomplete, tabindex: -1, onKeyup: ye }));
    }
    if (void 0 !== q.value && true !== e.disable && le.value.length > 0) {
      const t3 = le.value.map((e2) => h("option", { value: e2, selected: true }));
      o2.push(h("select", { class: "hidden", name: q.value, multiple: e.multiple }, t3));
    }
    const a2 = true === e.useInput || true !== n2 ? void 0 : R.splitAttrs.attributes.value;
    return h("div", { class: "q-field__native row items-center", ...a2 }, o2);
  }, getInnerAppend: () => true !== e.loading && true !== c.value && true !== e.hideDropdownIcon ? [h(QIcon, { class: "q-select__dropdown-icon" + (true === l.value ? " rotate-180" : ""), name: J.value })] : null }), useField(R);
} });
const skeletonTypes = ["text", "rect", "circle", "QBtn", "QBadge", "QChip", "QToolbar", "QCheckbox", "QRadio", "QToggle", "QSlider", "QRange", "QInput", "QAvatar"], skeletonAnimations = ["wave", "pulse", "pulse-x", "pulse-y", "fade", "blink", "none"];
var QSkeleton = createComponent({ name: "QSkeleton", props: { ...useDarkProps, tag: { type: String, default: "div" }, type: { type: String, validator: (e) => skeletonTypes.includes(e), default: "rect" }, animation: { type: String, validator: (e) => skeletonAnimations.includes(e), default: "wave" }, animationSpeed: { type: [String, Number], default: 1500 }, square: Boolean, bordered: Boolean, size: String, width: String, height: String }, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark(e, o.proxy.$q), a = computed(() => {
    const t2 = void 0 !== e.size ? [e.size, e.size] : [e.width, e.height];
    return { "--q-skeleton-speed": `${e.animationSpeed}ms`, width: t2[0], height: t2[1] };
  }), l = computed(() => `q-skeleton q-skeleton--${true === n.value ? "dark" : "light"} q-skeleton--type-${e.type}` + ("none" !== e.animation ? ` q-skeleton--anim q-skeleton--anim-${e.animation}` : "") + (true === e.square ? " q-skeleton--square" : "") + (true === e.bordered ? " q-skeleton--bordered" : ""));
  return () => h(e.tag, { class: l.value, style: a.value }, hSlot(t.default));
} });
const slotsDef = [["left", "center", "start", "width"], ["right", "center", "end", "width"], ["top", "start", "center", "height"], ["bottom", "end", "center", "height"]];
var QSlideItem = createComponent({ name: "QSlideItem", props: { ...useDarkProps, leftColor: String, rightColor: String, topColor: String, bottomColor: String, onSlide: Function }, emits: ["action", "top", "right", "bottom", "left"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = useDark(e, a), { getCacheWithFn: i } = useCache(), r = ref(null);
  let s, u = {}, c = {}, d = {};
  const p2 = computed(() => true === a.lang.rtl ? { left: "right", right: "left" } : { left: "left", right: "right" }), v = computed(() => "q-slide-item q-item-type overflow-hidden" + (true === l.value ? " q-slide-item--dark q-dark" : ""));
  function m() {
    r.value.style.transform = "translate(0,0)";
  }
  function f(t2, n2, a2) {
    void 0 !== e.onSlide && o("slide", { side: t2, ratio: n2, isReset: a2 });
  }
  function g(e2) {
    const n2 = r.value;
    if (e2.isFirst)
      u = { dir: null, size: { left: 0, right: 0, top: 0, bottom: 0 }, scale: 0 }, n2.classList.add("no-transition"), slotsDef.forEach((e3) => {
        if (void 0 !== t[e3[0]]) {
          const t2 = d[e3[0]];
          t2.style.transform = "scale(1)", u.size[e3[0]] = t2.getBoundingClientRect()[e3[3]];
        }
      }), u.axis = "up" === e2.direction || "down" === e2.direction ? "Y" : "X";
    else {
      if (e2.isFinal)
        return n2.classList.remove("no-transition"), void (1 === u.scale ? (n2.style.transform = `translate${u.axis}(${100 * u.dir}%)`, s = setTimeout(() => {
          o(u.showing, { reset: m }), o("action", { side: u.showing, reset: m });
        }, 230)) : (n2.style.transform = "translate(0,0)", f(u.showing, 0, true)));
      e2.direction = "X" === u.axis ? e2.offset.x < 0 ? "left" : "right" : e2.offset.y < 0 ? "up" : "down";
    }
    if (void 0 === t.left && e2.direction === p2.value.right || void 0 === t.right && e2.direction === p2.value.left || void 0 === t.top && "down" === e2.direction || void 0 === t.bottom && "up" === e2.direction)
      return void (n2.style.transform = "translate(0,0)");
    let a2, l2, i2;
    "X" === u.axis ? (l2 = "left" === e2.direction ? -1 : 1, a2 = 1 === l2 ? p2.value.left : p2.value.right, i2 = e2.distance.x) : (l2 = "up" === e2.direction ? -2 : 2, a2 = 2 === l2 ? "top" : "bottom", i2 = e2.distance.y), null !== u.dir && Math.abs(l2) !== Math.abs(u.dir) || (u.dir !== l2 && (["left", "right", "top", "bottom"].forEach((e3) => {
      c[e3] && (c[e3].style.visibility = a2 === e3 ? "visible" : "hidden");
    }), u.showing = a2, u.dir = l2), u.scale = Math.max(0, Math.min(1, (i2 - 40) / u.size[a2])), n2.style.transform = `translate${u.axis}(${i2 * l2 / Math.abs(l2)}px)`, d[a2].style.transform = `scale(${u.scale})`, f(a2, u.scale, false));
  }
  return onBeforeUpdate(() => {
    c = {}, d = {};
  }), onBeforeUnmount(() => {
    clearTimeout(s);
  }), Object.assign(n, { reset: m }), () => {
    const o2 = [], n2 = { left: void 0 !== t[p2.value.right], right: void 0 !== t[p2.value.left], up: void 0 !== t.bottom, down: void 0 !== t.top }, a2 = Object.keys(n2).filter((e2) => true === n2[e2]);
    slotsDef.forEach((n3) => {
      const a3 = n3[0];
      void 0 !== t[a3] && o2.push(h("div", { ref: (e2) => {
        c[a3] = e2;
      }, class: `q-slide-item__${a3} absolute-full row no-wrap items-${n3[1]} justify-${n3[2]}` + (void 0 !== e[a3 + "Color"] ? ` bg-${e[a3 + "Color"]}` : "") }, [h("div", { ref: (e2) => {
        d[a3] = e2;
      } }, t[a3]())]));
    });
    const l2 = h("div", { key: `${0 === a2.length ? "only-" : ""} content`, ref: r, class: "q-slide-item__content" }, hSlot(t.default));
    return 0 === a2.length ? o2.push(l2) : o2.push(withDirectives(l2, i("dir#" + a2.join(""), () => {
      const e2 = { prevent: true, stop: true, mouse: true };
      return a2.forEach((t2) => {
        e2[t2] = true;
      }), [[TouchPan, g, void 0, e2]];
    }))), h("div", { class: v.value }, o2);
  };
} });
const space = h("div", { class: "q-space" });
var QSpace = createComponent({ name: "QSpace", setup() {
  return () => space;
} });
const svg$l = [h("g", { transform: "matrix(1 0 0 -1 0 80)" }, [h("rect", { width: "10", height: "20", rx: "3" }, [h("animate", { attributeName: "height", begin: "0s", dur: "4.3s", values: "20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "15", width: "10", height: "80", rx: "3" }, [h("animate", { attributeName: "height", begin: "0s", dur: "2s", values: "80;55;33;5;75;23;73;33;12;14;60;80", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "30", width: "10", height: "50", rx: "3" }, [h("animate", { attributeName: "height", begin: "0s", dur: "1.4s", values: "50;34;78;23;56;23;34;76;80;54;21;50", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "45", width: "10", height: "30", rx: "3" }, [h("animate", { attributeName: "height", begin: "0s", dur: "2s", values: "30;45;13;80;56;72;45;76;34;23;67;30", calcMode: "linear", repeatCount: "indefinite" })])])];
var QSpinnerAudio = createComponent({ name: "QSpinnerAudio", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 55 80", xmlns: "http://www.w3.org/2000/svg" }, svg$l);
} });
const svg$k = [h("g", { transform: "translate(1 1)", "stroke-width": "2", fill: "none", "fill-rule": "evenodd" }, [h("circle", { cx: "5", cy: "50", r: "5" }, [h("animate", { attributeName: "cy", begin: "0s", dur: "2.2s", values: "50;5;50;50", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "cx", begin: "0s", dur: "2.2s", values: "5;27;49;5", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "27", cy: "5", r: "5" }, [h("animate", { attributeName: "cy", begin: "0s", dur: "2.2s", from: "5", to: "5", values: "5;50;50;5", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "cx", begin: "0s", dur: "2.2s", from: "27", to: "27", values: "27;49;5;27", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "49", cy: "50", r: "5" }, [h("animate", { attributeName: "cy", begin: "0s", dur: "2.2s", values: "50;50;5;50", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "cx", from: "49", to: "49", begin: "0s", dur: "2.2s", values: "49;5;27;49", calcMode: "linear", repeatCount: "indefinite" })])])];
var QSpinnerBall = createComponent({ name: "QSpinnerBall", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, stroke: "currentColor", width: t.value, height: t.value, viewBox: "0 0 57 57", xmlns: "http://www.w3.org/2000/svg" }, svg$k);
} });
const svg$j = [h("rect", { y: "10", width: "15", height: "120", rx: "6" }, [h("animate", { attributeName: "height", begin: "0.5s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0.5s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "30", y: "10", width: "15", height: "120", rx: "6" }, [h("animate", { attributeName: "height", begin: "0.25s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0.25s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "60", width: "15", height: "140", rx: "6" }, [h("animate", { attributeName: "height", begin: "0s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "90", y: "10", width: "15", height: "120", rx: "6" }, [h("animate", { attributeName: "height", begin: "0.25s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0.25s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "120", y: "10", width: "15", height: "120", rx: "6" }, [h("animate", { attributeName: "height", begin: "0.5s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0.5s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })])];
var QSpinnerBars = createComponent({ name: "QSpinnerBars", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 135 140", xmlns: "http://www.w3.org/2000/svg" }, svg$j);
} });
const svg$i = [h("rect", { x: "25", y: "25", width: "50", height: "50", fill: "none", "stroke-width": "4", stroke: "currentColor" }, [h("animateTransform", { id: "spinnerBox", attributeName: "transform", type: "rotate", from: "0 50 50", to: "180 50 50", dur: "0.5s", begin: "rectBox.end" })]), h("rect", { x: "27", y: "27", width: "46", height: "50", fill: "currentColor" }, [h("animate", { id: "rectBox", attributeName: "height", begin: "0s;spinnerBox.end", dur: "1.3s", from: "50", to: "0", fill: "freeze" })])];
var QSpinnerBox = createComponent({ name: "QSpinnerBox", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$i);
} });
const svg$h = [h("circle", { cx: "50", cy: "50", r: "48", fill: "none", "stroke-width": "4", "stroke-miterlimit": "10", stroke: "currentColor" }), h("line", { "stroke-linecap": "round", "stroke-width": "4", "stroke-miterlimit": "10", stroke: "currentColor", x1: "50", y1: "50", x2: "85", y2: "50.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "2s", repeatCount: "indefinite" })]), h("line", { "stroke-linecap": "round", "stroke-width": "4", "stroke-miterlimit": "10", stroke: "currentColor", x1: "50", y1: "50", x2: "49.5", y2: "74" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "15s", repeatCount: "indefinite" })])];
var QSpinnerClock = createComponent({ name: "QSpinnerClock", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$h);
} });
const svg$g = [h("rect", { x: "0", y: "0", width: " 100", height: "100", fill: "none" }), h("path", { d: "M78,19H22c-6.6,0-12,5.4-12,12v31c0,6.6,5.4,12,12,12h37.2c0.4,3,1.8,5.6,3.7,7.6c2.4,2.5,5.1,4.1,9.1,4 c-1.4-2.1-2-7.2-2-10.3c0-0.4,0-0.8,0-1.3h8c6.6,0,12-5.4,12-12V31C90,24.4,84.6,19,78,19z", fill: "currentColor" }), h("circle", { cx: "30", cy: "47", r: "5", fill: "#fff" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", values: "0;1;1", keyTimes: "0;0.2;1", dur: "1s", repeatCount: "indefinite" })]), h("circle", { cx: "50", cy: "47", r: "5", fill: "#fff" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", values: "0;0;1;1", keyTimes: "0;0.2;0.4;1", dur: "1s", repeatCount: "indefinite" })]), h("circle", { cx: "70", cy: "47", r: "5", fill: "#fff" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", values: "0;0;1;1", keyTimes: "0;0.4;0.6;1", dur: "1s", repeatCount: "indefinite" })])];
var QSpinnerComment = createComponent({ name: "QSpinnerComment", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, svg$g);
} });
const svg$f = [h("rect", { x: "0", y: "0", width: " 100", height: "100", fill: "none" }), h("g", { transform: "translate(25 25)" }, [h("rect", { x: "-20", y: "-20", width: " 40", height: "40", fill: "currentColor", opacity: "0.9" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "1.5", to: "1", repeatCount: "indefinite", begin: "0s", dur: "1s", calcMode: "spline", keySplines: "0.2 0.8 0.2 0.8", keyTimes: "0;1" })])]), h("g", { transform: "translate(75 25)" }, [h("rect", { x: "-20", y: "-20", width: " 40", height: "40", fill: "currentColor", opacity: "0.8" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "1.5", to: "1", repeatCount: "indefinite", begin: "0.1s", dur: "1s", calcMode: "spline", keySplines: "0.2 0.8 0.2 0.8", keyTimes: "0;1" })])]), h("g", { transform: "translate(25 75)" }, [h("rect", { x: "-20", y: "-20", width: " 40", height: "40", fill: "currentColor", opacity: "0.7" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "1.5", to: "1", repeatCount: "indefinite", begin: "0.3s", dur: "1s", calcMode: "spline", keySplines: "0.2 0.8 0.2 0.8", keyTimes: "0;1" })])]), h("g", { transform: "translate(75 75)" }, [h("rect", { x: "-20", y: "-20", width: " 40", height: "40", fill: "currentColor", opacity: "0.6" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "1.5", to: "1", repeatCount: "indefinite", begin: "0.2s", dur: "1s", calcMode: "spline", keySplines: "0.2 0.8 0.2 0.8", keyTimes: "0;1" })])])];
var QSpinnerCube = createComponent({ name: "QSpinnerCube", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, svg$f);
} });
const svg$e = [h("circle", { cx: "15", cy: "15", r: "15" }, [h("animate", { attributeName: "r", from: "15", to: "15", begin: "0s", dur: "0.8s", values: "15;9;15", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "fill-opacity", from: "1", to: "1", begin: "0s", dur: "0.8s", values: "1;.5;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "60", cy: "15", r: "9", "fill-opacity": ".3" }, [h("animate", { attributeName: "r", from: "9", to: "9", begin: "0s", dur: "0.8s", values: "9;15;9", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "fill-opacity", from: ".5", to: ".5", begin: "0s", dur: "0.8s", values: ".5;1;.5", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "105", cy: "15", r: "15" }, [h("animate", { attributeName: "r", from: "15", to: "15", begin: "0s", dur: "0.8s", values: "15;9;15", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "fill-opacity", from: "1", to: "1", begin: "0s", dur: "0.8s", values: "1;.5;1", calcMode: "linear", repeatCount: "indefinite" })])];
var QSpinnerDots = createComponent({ name: "QSpinnerDots", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 120 30", xmlns: "http://www.w3.org/2000/svg" }, svg$e);
} });
const svg$d = [h("g", { transform: "translate(20 50)" }, [h("rect", { x: "-10", y: "-30", width: " 20", height: "60", fill: "currentColor", opacity: "0.6" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "2", to: "1", begin: "0s", repeatCount: "indefinite", dur: "1s", calcMode: "spline", keySplines: "0.1 0.9 0.4 1", keyTimes: "0;1", values: "2;1" })])]), h("g", { transform: "translate(50 50)" }, [h("rect", { x: "-10", y: "-30", width: " 20", height: "60", fill: "currentColor", opacity: "0.8" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "2", to: "1", begin: "0.1s", repeatCount: "indefinite", dur: "1s", calcMode: "spline", keySplines: "0.1 0.9 0.4 1", keyTimes: "0;1", values: "2;1" })])]), h("g", { transform: "translate(80 50)" }, [h("rect", { x: "-10", y: "-30", width: " 20", height: "60", fill: "currentColor", opacity: "0.9" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "2", to: "1", begin: "0.2s", repeatCount: "indefinite", dur: "1s", calcMode: "spline", keySplines: "0.1 0.9 0.4 1", keyTimes: "0;1", values: "2;1" })])])];
var QSpinnerFacebook = createComponent({ name: "QSpinnerFacebook", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid" }, svg$d);
} });
const svg$c = [h("g", { transform: "translate(-20,-20)" }, [h("path", { d: "M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z", fill: "currentColor" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "90 50 50", to: "0 50 50", dur: "1s", repeatCount: "indefinite" })])]), h("g", { transform: "translate(20,20) rotate(15 50 50)" }, [h("path", { d: "M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z", fill: "currentColor" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "90 50 50", dur: "1s", repeatCount: "indefinite" })])])];
var QSpinnerGears = createComponent({ name: "QSpinnerGears", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$c);
} });
const svg$b = [h("circle", { cx: "12.5", cy: "12.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "0s", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "12.5", cy: "52.5", r: "12.5", "fill-opacity": ".5" }, [h("animate", { attributeName: "fill-opacity", begin: "100ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "52.5", cy: "12.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "300ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "52.5", cy: "52.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "600ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "92.5", cy: "12.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "800ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "92.5", cy: "52.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "400ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "12.5", cy: "92.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "700ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "52.5", cy: "92.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "500ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "92.5", cy: "92.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "200ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })])];
var QSpinnerGrid = createComponent({ name: "QSpinnerGrid", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 105 105", xmlns: "http://www.w3.org/2000/svg" }, svg$b);
} });
const svg$a = [h("path", { d: "M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.716-6.002 11.47-7.65 17.304-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z", "fill-opacity": ".5" }, [h("animate", { attributeName: "fill-opacity", begin: "0s", dur: "1.4s", values: "0.5;1;0.5", calcMode: "linear", repeatCount: "indefinite" })]), h("path", { d: "M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.593-2.32 17.308 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z", "fill-opacity": ".5" }, [h("animate", { attributeName: "fill-opacity", begin: "0.7s", dur: "1.4s", values: "0.5;1;0.5", calcMode: "linear", repeatCount: "indefinite" })]), h("path", { d: "M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z" })];
var QSpinnerHearts = createComponent({ name: "QSpinnerHearts", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 140 64", xmlns: "http://www.w3.org/2000/svg" }, svg$a);
} });
const svg$9 = [h("g", [h("path", { fill: "none", stroke: "currentColor", "stroke-width": "5", "stroke-miterlimit": "10", d: "M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z" }), h("clipPath", { id: "uil-hourglass-clip1" }, [h("rect", { x: "15", y: "20", width: " 70", height: "25" }, [h("animate", { attributeName: "height", from: "25", to: "0", dur: "1s", repeatCount: "indefinite", values: "25;0;0", keyTimes: "0;0.5;1" }), h("animate", { attributeName: "y", from: "20", to: "45", dur: "1s", repeatCount: "indefinite", values: "20;45;45", keyTimes: "0;0.5;1" })])]), h("clipPath", { id: "uil-hourglass-clip2" }, [h("rect", { x: "15", y: "55", width: " 70", height: "25" }, [h("animate", { attributeName: "height", from: "0", to: "25", dur: "1s", repeatCount: "indefinite", values: "0;25;25", keyTimes: "0;0.5;1" }), h("animate", { attributeName: "y", from: "80", to: "55", dur: "1s", repeatCount: "indefinite", values: "80;55;55", keyTimes: "0;0.5;1" })])]), h("path", { d: "M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z", "clip-path": "url(#uil-hourglass-clip1)", fill: "currentColor" }), h("path", { d: "M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z", "clip-path": "url(#uil-hourglass-clip2)", fill: "currentColor" }), h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "180 50 50", repeatCount: "indefinite", dur: "1s", values: "0 50 50;0 50 50;180 50 50", keyTimes: "0;0.7;1" })])];
var QSpinnerHourglass = createComponent({ name: "QSpinnerHourglass", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$9);
} });
const svg$8 = [h("path", { d: "M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z", fill: "none", stroke: "currentColor", "stroke-width": "8", "stroke-dasharray": "10.691205342610678 10.691205342610678", "stroke-dashoffset": "0" }, [h("animate", { attributeName: "stroke-dashoffset", from: "0", to: "21.382410685221355", begin: "0", dur: "2s", repeatCount: "indefinite", fill: "freeze" })])];
var QSpinnerInfinity = createComponent({ name: "QSpinnerInfinity", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, svg$8);
} });
const svg$7 = [h("g", { "stroke-width": "4", "stroke-linecap": "round" }, [h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(180)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(210)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: "0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(240)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(270)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(300)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(330)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(0)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(30)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(60)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(90)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(120)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(150)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1", repeatCount: "indefinite" })])])];
var QSpinnerIos = createComponent({ name: "QSpinnerIos", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, stroke: "currentColor", fill: "currentColor", viewBox: "0 0 64 64" }, svg$7);
} });
const svg$6 = [h("circle", { cx: "50", cy: "50", r: "44", fill: "none", "stroke-width": "4", "stroke-opacity": ".5", stroke: "currentColor" }), h("circle", { cx: "8", cy: "54", r: "6", fill: "currentColor", "stroke-width": "3", stroke: "currentColor" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 48", to: "360 50 52", dur: "2s", repeatCount: "indefinite" })])];
var QSpinnerOrbit = createComponent({ name: "QSpinnerOrbit", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$6);
} });
const svg$5 = [h("g", { transform: "translate(1 1)", "stroke-width": "2", fill: "none", "fill-rule": "evenodd" }, [h("circle", { "stroke-opacity": ".5", cx: "18", cy: "18", r: "18" }), h("path", { d: "M36 18c0-9.94-8.06-18-18-18" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "1s", repeatCount: "indefinite" })])])];
var QSpinnerOval = createComponent({ name: "QSpinnerOval", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, stroke: "currentColor", width: t.value, height: t.value, viewBox: "0 0 38 38", xmlns: "http://www.w3.org/2000/svg" }, svg$5);
} });
const svg$4 = [h("path", { d: "M0 50A50 50 0 0 1 50 0L50 50L0 50", fill: "currentColor", opacity: "0.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "0.8s", repeatCount: "indefinite" })]), h("path", { d: "M50 0A50 50 0 0 1 100 50L50 50L50 0", fill: "currentColor", opacity: "0.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "1.6s", repeatCount: "indefinite" })]), h("path", { d: "M100 50A50 50 0 0 1 50 100L50 50L100 50", fill: "currentColor", opacity: "0.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "2.4s", repeatCount: "indefinite" })]), h("path", { d: "M50 100A50 50 0 0 1 0 50L50 50L50 100", fill: "currentColor", opacity: "0.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "3.2s", repeatCount: "indefinite" })])];
var QSpinnerPie = createComponent({ name: "QSpinnerPie", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$4);
} });
const svg$3 = [h("g", { fill: "none", "fill-rule": "evenodd", "stroke-width": "2" }, [h("circle", { cx: "22", cy: "22", r: "1" }, [h("animate", { attributeName: "r", begin: "0s", dur: "1.8s", values: "1; 20", calcMode: "spline", keyTimes: "0; 1", keySplines: "0.165, 0.84, 0.44, 1", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-opacity", begin: "0s", dur: "1.8s", values: "1; 0", calcMode: "spline", keyTimes: "0; 1", keySplines: "0.3, 0.61, 0.355, 1", repeatCount: "indefinite" })]), h("circle", { cx: "22", cy: "22", r: "1" }, [h("animate", { attributeName: "r", begin: "-0.9s", dur: "1.8s", values: "1; 20", calcMode: "spline", keyTimes: "0; 1", keySplines: "0.165, 0.84, 0.44, 1", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-opacity", begin: "-0.9s", dur: "1.8s", values: "1; 0", calcMode: "spline", keyTimes: "0; 1", keySplines: "0.3, 0.61, 0.355, 1", repeatCount: "indefinite" })])])];
var QSpinnerPuff = createComponent({ name: "QSpinnerPuff", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, stroke: "currentColor", width: t.value, height: t.value, viewBox: "0 0 44 44", xmlns: "http://www.w3.org/2000/svg" }, svg$3);
} });
const svg$2 = [h("g", { transform: "scale(0.55)" }, [h("circle", { cx: "30", cy: "150", r: "30", fill: "currentColor" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", dur: "1s", begin: "0", repeatCount: "indefinite", keyTimes: "0;0.5;1", values: "0;1;1" })]), h("path", { d: "M90,150h30c0-49.7-40.3-90-90-90v30C63.1,90,90,116.9,90,150z", fill: "currentColor" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", dur: "1s", begin: "0.1", repeatCount: "indefinite", keyTimes: "0;0.5;1", values: "0;1;1" })]), h("path", { d: "M150,150h30C180,67.2,112.8,0,30,0v30C96.3,30,150,83.7,150,150z", fill: "currentColor" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", dur: "1s", begin: "0.2", repeatCount: "indefinite", keyTimes: "0;0.5;1", values: "0;1;1" })])])];
var QSpinnerRadio = createComponent({ name: "QSpinnerRadio", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$2);
} });
const svg$1 = [h("g", { fill: "none", "fill-rule": "evenodd", transform: "translate(1 1)", "stroke-width": "2" }, [h("circle", { cx: "22", cy: "22", r: "6" }, [h("animate", { attributeName: "r", begin: "1.5s", dur: "3s", values: "6;22", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-opacity", begin: "1.5s", dur: "3s", values: "1;0", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-width", begin: "1.5s", dur: "3s", values: "2;0", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "22", cy: "22", r: "6" }, [h("animate", { attributeName: "r", begin: "3s", dur: "3s", values: "6;22", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-opacity", begin: "3s", dur: "3s", values: "1;0", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-width", begin: "3s", dur: "3s", values: "2;0", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "22", cy: "22", r: "8" }, [h("animate", { attributeName: "r", begin: "0s", dur: "1.5s", values: "6;1;2;3;4;5;6", calcMode: "linear", repeatCount: "indefinite" })])])];
var QSpinnerRings = createComponent({ name: "QSpinnerRings", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, stroke: "currentColor", width: t.value, height: t.value, viewBox: "0 0 45 45", xmlns: "http://www.w3.org/2000/svg" }, svg$1);
} });
const svg = [h("defs", [h("linearGradient", { x1: "8.042%", y1: "0%", x2: "65.682%", y2: "23.865%", id: "a" }, [h("stop", { "stop-color": "currentColor", "stop-opacity": "0", offset: "0%" }), h("stop", { "stop-color": "currentColor", "stop-opacity": ".631", offset: "63.146%" }), h("stop", { "stop-color": "currentColor", offset: "100%" })])]), h("g", { transform: "translate(1 1)", fill: "none", "fill-rule": "evenodd" }, [h("path", { d: "M36 18c0-9.94-8.06-18-18-18", stroke: "url(#a)", "stroke-width": "2" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "0.9s", repeatCount: "indefinite" })]), h("circle", { fill: "currentColor", cx: "36", cy: "18", r: "1" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "0.9s", repeatCount: "indefinite" })])])];
var QSpinnerTail = createComponent({ name: "QSpinnerTail", props: useSpinnerProps, setup(e) {
  const { cSize: t, classes: o } = useSpinner(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 38 38", xmlns: "http://www.w3.org/2000/svg" }, svg);
} }), QSplitter = createComponent({ name: "QSplitter", props: { ...useDarkProps, modelValue: { type: Number, required: true }, reverse: Boolean, unit: { type: String, default: "%", validator: (e) => ["%", "px"].includes(e) }, limits: { type: Array, validator: (e) => {
  return 2 === e.length && ("number" === typeof e[0] && "number" === typeof e[1] && (e[0] >= 0 && e[0] <= e[1]));
} }, emitImmediately: Boolean, horizontal: Boolean, disable: Boolean, beforeClass: [Array, String, Object], afterClass: [Array, String, Object], separatorClass: [Array, String, Object], separatorStyle: [Array, String, Object] }, emits: ["update:modelValue"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useDark(e, n), l = ref(null), i = { before: ref(null), after: ref(null) }, r = computed(() => `q-splitter no-wrap ${true === e.horizontal ? "q-splitter--horizontal column" : "q-splitter--vertical row"} q-splitter--${true === e.disable ? "disabled" : "workable"}` + (true === a.value ? " q-splitter--dark" : "")), s = computed(() => true === e.horizontal ? "height" : "width"), u = computed(() => true !== e.reverse ? "before" : "after"), c = computed(() => void 0 !== e.limits ? e.limits : "%" === e.unit ? [10, 90] : [50, 1 / 0]);
  function d(t2) {
    return ("%" === e.unit ? t2 : Math.round(t2)) + e.unit;
  }
  const p2 = computed(() => ({ [u.value]: { [s.value]: d(e.modelValue) } }));
  let v, m, f, g, b;
  function y(t2) {
    if (true === t2.isFirst) {
      const t3 = l.value.getBoundingClientRect()[s.value];
      return v = true === e.horizontal ? "up" : "left", m = "%" === e.unit ? 100 : t3, f = Math.min(m, c.value[1], Math.max(c.value[0], e.modelValue)), g = (true !== e.reverse ? 1 : -1) * (true === e.horizontal ? 1 : true === n.lang.rtl ? -1 : 1) * ("%" === e.unit ? 0 === t3 ? 0 : 100 / t3 : 1), void l.value.classList.add("q-splitter--active");
    }
    if (true === t2.isFinal)
      return b !== e.modelValue && o("update:modelValue", b), void l.value.classList.remove("q-splitter--active");
    const a2 = f + g * (t2.direction === v ? -1 : 1) * t2.distance[true === e.horizontal ? "y" : "x"];
    b = Math.min(m, c.value[1], Math.max(c.value[0], a2)), i[u.value].value.style[s.value] = d(b), true === e.emitImmediately && e.modelValue !== b && o("update:modelValue", b);
  }
  const S = computed(() => {
    return [[TouchPan, y, void 0, { [true === e.horizontal ? "vertical" : "horizontal"]: true, prevent: true, stop: true, mouse: true, mouseAllDir: true }]];
  });
  function w(e2, t2) {
    e2 < t2[0] ? o("update:modelValue", t2[0]) : e2 > t2[1] && o("update:modelValue", t2[1]);
  }
  return watch(() => e.modelValue, (e2) => {
    w(e2, c.value);
  }), watch(() => e.limits, () => {
    nextTick(() => {
      w(e.modelValue, c.value);
    });
  }), () => {
    const o2 = [h("div", { ref: i.before, class: ["q-splitter__panel q-splitter__before" + (true === e.reverse ? " col" : ""), e.beforeClass], style: p2.value.before }, hSlot(t.before)), h("div", { class: ["q-splitter__separator", e.separatorClass], style: e.separatorStyle, "aria-disabled": true === e.disable ? "true" : void 0 }, [hDir("div", { class: "q-splitter__separator-area absolute-full" }, hSlot(t.separator), "sep", true !== e.disable, () => S.value)]), h("div", { ref: i.after, class: ["q-splitter__panel q-splitter__after" + (true === e.reverse ? "" : " col"), e.afterClass], style: p2.value.after }, hSlot(t.after))];
    return h("div", { class: r.value, ref: l }, hMergeSlot(t.default, o2));
  };
} }), StepHeader = createComponent({ name: "StepHeader", props: { stepper: {}, step: {}, goToPanel: Function }, setup(e, { attrs: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = ref(null), a = computed(() => e.stepper.modelValue === e.step.name), l = computed(() => {
    const t2 = e.step.disable;
    return true === t2 || "" === t2;
  }), i = computed(() => {
    const t2 = e.step.error;
    return true === t2 || "" === t2;
  }), r = computed(() => {
    const t2 = e.step.done;
    return false === l.value && (true === t2 || "" === t2);
  }), s = computed(() => {
    const t2 = e.step.headerNav, o2 = true === t2 || "" === t2 || void 0 === t2;
    return false === l.value && e.stepper.headerNav && o2;
  }), u = computed(() => {
    return e.step.prefix && (false === a.value || "none" === e.stepper.activeIcon) && (false === i.value || "none" === e.stepper.errorIcon) && (false === r.value || "none" === e.stepper.doneIcon);
  }), c = computed(() => {
    const t2 = e.step.icon || e.stepper.inactiveIcon;
    if (true === a.value) {
      const n2 = e.step.activeIcon || e.stepper.activeIcon;
      return "none" === n2 ? t2 : n2 || o.iconSet.stepper.active;
    }
    if (true === i.value) {
      const n2 = e.step.errorIcon || e.stepper.errorIcon;
      return "none" === n2 ? t2 : n2 || o.iconSet.stepper.error;
    }
    if (false === l.value && true === r.value) {
      const n2 = e.step.doneIcon || e.stepper.doneIcon;
      return "none" === n2 ? t2 : n2 || o.iconSet.stepper.done;
    }
    return t2;
  }), d = computed(() => {
    const t2 = true === i.value ? e.step.errorColor || e.stepper.errorColor : void 0;
    if (true === a.value) {
      const o2 = e.step.activeColor || e.stepper.activeColor || e.step.color;
      return void 0 !== o2 ? o2 : t2;
    }
    return void 0 !== t2 ? t2 : false === l.value && true === r.value ? e.step.doneColor || e.stepper.doneColor || e.step.color || e.stepper.inactiveColor : e.step.color || e.stepper.inactiveColor;
  }), p2 = computed(() => {
    return "q-stepper__tab col-grow flex items-center no-wrap relative-position" + (void 0 !== d.value ? ` text-${d.value}` : "") + (true === i.value ? " q-stepper__tab--error q-stepper__tab--error-with-" + (true === u.value ? "prefix" : "icon") : "") + (true === a.value ? " q-stepper__tab--active" : "") + (true === r.value ? " q-stepper__tab--done" : "") + (true === s.value ? " q-stepper__tab--navigation q-focusable q-hoverable" : "") + (true === l.value ? " q-stepper__tab--disabled" : "");
  }), v = computed(() => true === e.stepper.headerNav && s.value);
  function m() {
    null !== n.value && n.value.focus(), false === a.value && e.goToPanel(e.step.name);
  }
  function f(t2) {
    13 === t2.keyCode && false === a.value && e.goToPanel(e.step.name);
  }
  return () => {
    const o2 = { class: p2.value };
    true === s.value && (o2.onClick = m, o2.onKeyup = f, Object.assign(o2, true === l.value ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: t.tabindex || 0 }));
    const a2 = [h("div", { class: "q-focus-helper", tabindex: -1, ref: n }), h("div", { class: "q-stepper__dot row flex-center q-stepper__line relative-position" }, [h("span", { class: "row flex-center" }, [true === u.value ? e.step.prefix : h(QIcon, { name: c.value })])])];
    if (void 0 !== e.step.title && null !== e.step.title) {
      const t2 = [h("div", { class: "q-stepper__title" }, e.step.title)];
      void 0 !== e.step.caption && null !== e.step.caption && t2.push(h("div", { class: "q-stepper__caption" }, e.step.caption)), a2.push(h("div", { class: "q-stepper__label q-stepper__line relative-position" }, t2));
    }
    return withDirectives(h("div", o2, a2), [[Ripple, v.value]]);
  };
} });
function getStepWrapper(e) {
  return h("div", { class: "q-stepper__step-content" }, [h("div", { class: "q-stepper__step-inner" }, hSlot(e.default))]);
}
const PanelWrapper = { setup(e, { slots: t }) {
  return () => getStepWrapper(t);
} };
var QStep = createComponent({ name: "QStep", props: { ...usePanelChildProps, icon: String, color: String, title: { type: String, required: true }, caption: String, prefix: [String, Number], doneIcon: String, doneColor: String, activeIcon: String, activeColor: String, errorIcon: String, errorColor: String, headerNav: { type: Boolean, default: true }, done: Boolean, error: Boolean, onScroll: [Function, Array] }, setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = inject(stepperKey, () => {
    console.error("QStep needs to be child of QStepper");
  }), { getCacheWithFn: l } = useCache(), i = ref(null), r = computed(() => a.value.modelValue === e.name), s = computed(() => true !== n.platform.is.ios && true === n.platform.is.chrome || true !== r.value || true !== a.value.vertical ? {} : { onScroll(t2) {
    const { target: n2 } = t2;
    n2.scrollTop > 0 && (n2.scrollTop = 0), void 0 !== e.onScroll && o("scroll", t2);
  } }), u = computed(() => "string" === typeof e.name || "number" === typeof e.name ? e.name : String(e.name));
  function c() {
    const e2 = a.value.vertical;
    return true === e2 && true === a.value.keepAlive ? h(KeepAlive, a.value.keepAliveProps.value, true === r.value ? [h(true === a.value.needsUniqueKeepAliveWrapper.value ? l(u.value, () => ({ ...PanelWrapper, name: u.value })) : PanelWrapper, { key: u.value }, t.default)] : void 0) : true !== e2 || true === r.value ? getStepWrapper(t) : void 0;
  }
  return () => h("div", { ref: i, class: "q-stepper__step", ...s.value }, true === a.value.vertical ? [h(StepHeader, { stepper: a.value, step: e, goToPanel: a.value.goToPanel }), true === a.value.animated ? h(QSlideTransition, c) : c()] : [c()]);
} });
const camelRE = /(-\w)/g;
function camelizeProps(e) {
  const t = {};
  for (const o in e) {
    const n = o.replace(camelRE, (e2) => e2[1].toUpperCase());
    t[n] = e[o];
  }
  return t;
}
var QStepper = createComponent({ name: "QStepper", props: { ...useDarkProps, ...usePanelProps, flat: Boolean, bordered: Boolean, alternativeLabels: Boolean, headerNav: Boolean, contracted: Boolean, headerClass: String, inactiveColor: String, inactiveIcon: String, doneIcon: String, doneColor: String, activeIcon: String, activeColor: String, errorIcon: String, errorColor: String }, emits: usePanelEmits, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark(e, o.proxy.$q), { updatePanelsList: a, isValidPanelName: l, updatePanelIndex: i, getPanelContent: r, getPanels: s, panelDirectives: u, goToPanel: c, keepAliveProps: d, needsUniqueKeepAliveWrapper: p2 } = usePanel();
  provide(stepperKey, computed(() => ({ goToPanel: c, keepAliveProps: d, needsUniqueKeepAliveWrapper: p2, ...e })));
  const v = computed(() => `q-stepper q-stepper--${true === e.vertical ? "vertical" : "horizontal"}` + (true === e.flat || true === n.value ? " q-stepper--flat no-shadow" : "") + (true === e.bordered || true === n.value && false === e.flat ? " q-stepper--bordered" : "") + (true === n.value ? " q-stepper--dark q-dark" : "")), m = computed(() => `q-stepper__header row items-stretch justify-between q-stepper__header--${true === e.alternativeLabels ? "alternative" : "standard"}-labels` + (false === e.flat || true === e.bordered ? " q-stepper__header--border" : "") + (true === e.contracted ? " q-stepper__header--contracted" : "") + (void 0 !== e.headerClass ? ` ${e.headerClass}` : ""));
  function f() {
    const o2 = hSlot(t.message, []);
    if (true === e.vertical) {
      l(e.modelValue) && i();
      const n2 = h("div", { class: "q-stepper__content" }, hSlot(t.default));
      return void 0 === o2 ? [n2] : o2.concat(n2);
    }
    return [h("div", { class: m.value }, s().map((t2) => {
      const o3 = camelizeProps(t2.props);
      return h(StepHeader, { key: o3.name, stepper: e, step: o3, goToPanel: c });
    })), o2, hDir("div", { class: "q-stepper__content q-panel-parent" }, r(), "cont", e.swipeable, () => u.value)];
  }
  return () => {
    return a(t), h("div", { class: v.value }, hMergeSlot(t.navigation, f()));
  };
} }), QStepperNavigation = createComponent({ name: "QStepperNavigation", setup(e, { slots: t }) {
  return () => h("div", { class: "q-stepper__nav" }, hSlot(t.default));
} }), QTh = createComponent({ name: "QTh", props: { props: Object, autoWidth: Boolean }, emits: ["click"], setup(e, { slots: t, emit: o }) {
  const n = getCurrentInstance(), { proxy: { $q: a } } = n, l = (e2) => {
    o("click", e2);
  };
  return () => {
    if (void 0 === e.props)
      return h("th", { class: true === e.autoWidth ? "q-table--col-auto-width" : "", onClick: l }, hSlot(t.default));
    let o2, i;
    const r = n.vnode.key;
    if (r) {
      if (o2 = e.props.colsMap[r], void 0 === o2)
        return;
    } else
      o2 = e.props.col;
    if (true === o2.sortable) {
      const e2 = "right" === o2.align ? "unshift" : "push";
      i = hUniqueSlot(t.default, []), i[e2](h(QIcon, { class: o2.__iconClass, name: a.iconSet.table.arrowUp }));
    } else
      i = hSlot(t.default);
    const s = { class: o2.__thClass + (true === e.autoWidth ? " q-table--col-auto-width" : ""), style: o2.headerStyle, onClick: (t2) => {
      true === o2.sortable && e.props.sort(o2), l(t2);
    } };
    return h("th", s, i);
  };
} });
function getTableMiddle(e, t) {
  return h("div", e, [h("table", { class: "q-table" }, t)]);
}
const comps = { list: QList, table: QMarkupTable }, typeOptions = ["list", "table", "__qtable"];
var QVirtualScroll = createComponent({ name: "QVirtualScroll", props: { ...useVirtualScrollProps, type: { type: String, default: "list", validator: (e) => typeOptions.includes(e) }, items: { type: Array, default: () => [] }, itemsFn: Function, itemsSize: Number, scrollTarget: { default: void 0 } }, setup(e, { slots: t, attrs: o }) {
  let n;
  const a = ref(null), l = computed(() => e.itemsSize >= 0 && void 0 !== e.itemsFn ? parseInt(e.itemsSize, 10) : Array.isArray(e.items) ? e.items.length : 0), { virtualScrollSliceRange: i, localResetVirtualScroll: r, padVirtualScroll: s, onVirtualScrollEvt: u } = useVirtualScroll({ virtualScrollLength: l, getVirtualScrollTarget: m, getVirtualScrollEl: v }), c = computed(() => {
    if (0 === l.value)
      return [];
    const t2 = (e2, t3) => ({ index: i.value.from + t3, item: e2 });
    return void 0 === e.itemsFn ? e.items.slice(i.value.from, i.value.to).map(t2) : e.itemsFn(i.value.from, i.value.to - i.value.from).map(t2);
  }), d = computed(() => "q-virtual-scroll q-virtual-scroll" + (true === e.virtualScrollHorizontal ? "--horizontal" : "--vertical") + (void 0 !== e.scrollTarget ? "" : " scroll")), p2 = computed(() => void 0 !== e.scrollTarget ? {} : { tabindex: 0 });
  function v() {
    return a.value.$el || a.value;
  }
  function m() {
    return n;
  }
  function f() {
    n = getScrollTarget(v(), e.scrollTarget), n.addEventListener("scroll", u, listenOpts.passive);
  }
  function g() {
    void 0 !== n && (n.removeEventListener("scroll", u, listenOpts.passive), n = void 0);
  }
  function b() {
    let o2 = s("list" === e.type ? "div" : "tbody", c.value.map(t.default));
    return void 0 !== t.before && (o2 = t.before().concat(o2)), hMergeSlot(t.after, o2);
  }
  return watch(l, () => {
    r();
  }), watch(() => e.scrollTarget, () => {
    g(), f();
  }), onBeforeMount(() => {
    r();
  }), onMounted(() => {
    f();
  }), onActivated(() => {
    f();
  }), onDeactivated(() => {
    g();
  }), onBeforeUnmount(() => {
    g();
  }), () => {
    if (void 0 !== t.default)
      return "__qtable" === e.type ? getTableMiddle({ ref: a, class: "q-table__middle " + d.value }, b()) : h(comps[e.type], { ...o, ref: a, class: [o.class, d.value], ...p2.value }, b);
    console.error("QVirtualScroll: default scoped slot is required for rendering");
  };
} });
function sortDate(e, t) {
  return new Date(e) - new Date(t);
}
const useTableSortProps = { sortMethod: Function, binaryStateSort: Boolean, columnSortOrder: { type: String, validator: (e) => "ad" === e || "da" === e, default: "ad" } };
function useTableSort(e, t, o, n) {
  const a = computed(() => {
    const { sortBy: e2 } = t.value;
    return e2 && o.value.find((t2) => t2.name === e2) || null;
  }), l = computed(() => void 0 !== e.sortMethod ? e.sortMethod : (e2, t2, n2) => {
    const a2 = o.value.find((e3) => e3.name === t2);
    if (void 0 === a2 || void 0 === a2.field)
      return e2;
    const l2 = true === n2 ? -1 : 1, i2 = "function" === typeof a2.field ? (e3) => a2.field(e3) : (e3) => e3[a2.field];
    return e2.sort((e3, t3) => {
      let o2 = i2(e3), n3 = i2(t3);
      return null === o2 || void 0 === o2 ? -1 * l2 : null === n3 || void 0 === n3 ? 1 * l2 : void 0 !== a2.sort ? a2.sort(o2, n3, e3, t3) * l2 : true === isNumber(o2) && true === isNumber(n3) ? (o2 - n3) * l2 : true === isDate(o2) && true === isDate(n3) ? sortDate(o2, n3) * l2 : "boolean" === typeof o2 && "boolean" === typeof n3 ? (o2 - n3) * l2 : ([o2, n3] = [o2, n3].map((e4) => (e4 + "").toLocaleString().toLowerCase()), o2 < n3 ? -1 * l2 : o2 === n3 ? 0 : l2);
    });
  });
  function i(a2) {
    let l2 = e.columnSortOrder;
    if (true === isObject(a2))
      a2.sortOrder && (l2 = a2.sortOrder), a2 = a2.name;
    else {
      const e2 = o.value.find((e3) => e3.name === a2);
      void 0 !== e2 && e2.sortOrder && (l2 = e2.sortOrder);
    }
    let { sortBy: i2, descending: r } = t.value;
    i2 !== a2 ? (i2 = a2, r = "da" === l2) : true === e.binaryStateSort ? r = !r : true === r ? "ad" === l2 ? i2 = null : r = false : "ad" === l2 ? r = true : i2 = null, n({ sortBy: i2, descending: r, page: 1 });
  }
  return { columnToSort: a, computedSortMethod: l, sort: i };
}
const useTableFilterProps = { filter: [String, Object], filterMethod: Function };
function useTableFilter(e, t) {
  const o = computed(() => void 0 !== e.filterMethod ? e.filterMethod : (e2, t2, o2, n) => {
    const a = t2 ? t2.toLowerCase() : "";
    return e2.filter((e3) => o2.some((t3) => {
      const o3 = n(t3, e3) + "", l = "undefined" === o3 || "null" === o3 ? "" : o3.toLowerCase();
      return -1 !== l.indexOf(a);
    }));
  });
  return watch(() => e.filter, () => {
    nextTick(() => {
      t({ page: 1 }, true);
    });
  }, { deep: true }), { computedFilterMethod: o };
}
function samePagination(e, t) {
  for (const o in t)
    if (t[o] !== e[o])
      return false;
  return true;
}
function fixPagination(e) {
  return e.page < 1 && (e.page = 1), void 0 !== e.rowsPerPage && e.rowsPerPage < 1 && (e.rowsPerPage = 0), e;
}
const useTablePaginationProps = { pagination: Object, rowsPerPageOptions: { type: Array, default: () => [5, 7, 10, 15, 20, 25, 50, 0] }, "onUpdate:pagination": [Function, Array] };
function useTablePaginationState(e, t) {
  const { props: o, emit: n } = e, a = ref(Object.assign({ sortBy: null, descending: false, page: 1, rowsPerPage: o.rowsPerPageOptions.length > 0 ? o.rowsPerPageOptions[0] : 5 }, o.pagination)), l = computed(() => {
    const e2 = void 0 !== o["onUpdate:pagination"] ? { ...a.value, ...o.pagination } : a.value;
    return fixPagination(e2);
  }), i = computed(() => void 0 !== l.value.rowsNumber);
  function r(e2) {
    s({ pagination: e2, filter: o.filter });
  }
  function s(e2 = {}) {
    nextTick(() => {
      n("request", { pagination: e2.pagination || l.value, filter: e2.filter || o.filter, getCellValue: t });
    });
  }
  function u(e2, t2) {
    const s2 = fixPagination({ ...l.value, ...e2 });
    true !== samePagination(l.value, s2) ? true !== i.value ? void 0 !== o.pagination && void 0 !== o["onUpdate:pagination"] ? n("update:pagination", s2) : a.value = s2 : r(s2) : true === i.value && true === t2 && r(s2);
  }
  return { innerPagination: a, computedPagination: l, isServerSide: i, requestServerInteraction: s, setPagination: u };
}
function useTablePagination(e, t, o, n, a, l) {
  const { props: i, emit: r, proxy: { $q: s } } = e, u = computed(() => true === n.value ? o.value.rowsNumber || 0 : l.value), c = computed(() => {
    const { page: e2, rowsPerPage: t2 } = o.value;
    return (e2 - 1) * t2;
  }), d = computed(() => {
    const { page: e2, rowsPerPage: t2 } = o.value;
    return e2 * t2;
  }), p2 = computed(() => 1 === o.value.page), v = computed(() => 0 === o.value.rowsPerPage ? 1 : Math.max(1, Math.ceil(u.value / o.value.rowsPerPage))), m = computed(() => 0 === d.value || o.value.page >= v.value), f = computed(() => {
    const e2 = i.rowsPerPageOptions.includes(t.value.rowsPerPage) ? i.rowsPerPageOptions : [t.value.rowsPerPage].concat(i.rowsPerPageOptions);
    return e2.map((e3) => ({ label: 0 === e3 ? s.lang.table.allRows : "" + e3, value: e3 }));
  });
  function h2() {
    a({ page: 1 });
  }
  function g() {
    const { page: e2 } = o.value;
    e2 > 1 && a({ page: e2 - 1 });
  }
  function b() {
    const { page: e2, rowsPerPage: t2 } = o.value;
    d.value > 0 && e2 * t2 < u.value && a({ page: e2 + 1 });
  }
  function y() {
    a({ page: v.value });
  }
  return watch(v, (e2, t2) => {
    if (e2 === t2)
      return;
    const n2 = o.value.page;
    e2 && !n2 ? a({ page: 1 }) : e2 < n2 && a({ page: e2 });
  }), void 0 !== i["onUpdate:pagination"] && r("update:pagination", { ...o.value }), { firstRowIndex: c, lastRowIndex: d, isFirstPage: p2, isLastPage: m, pagesNumber: v, computedRowsPerPageOptions: f, computedRowsNumber: u, firstPage: h2, prevPage: g, nextPage: b, lastPage: y };
}
const useTableRowSelectionProps = { selection: { type: String, default: "none", validator: (e) => ["single", "multiple", "none"].includes(e) }, selected: { type: Array, default: () => [] } }, useTableRowSelectionEmits = ["update:selected", "selection"];
function useTableRowSelection(e, t, o, n) {
  const a = computed(() => {
    const t2 = {};
    return e.selected.map(n.value).forEach((e2) => {
      t2[e2] = true;
    }), t2;
  }), l = computed(() => {
    return "none" !== e.selection;
  }), i = computed(() => {
    return "single" === e.selection;
  }), r = computed(() => {
    return "multiple" === e.selection;
  }), s = computed(() => o.value.length > 0 && o.value.every((e2) => true === a.value[n.value(e2)])), u = computed(() => true !== s.value && o.value.some((e2) => true === a.value[n.value(e2)])), c = computed(() => e.selected.length);
  function d(e2) {
    return true === a.value[e2];
  }
  function p2() {
    t("update:selected", []);
  }
  function v(o2, a2, l2, r2) {
    t("selection", { rows: a2, added: l2, keys: o2, evt: r2 });
    const s2 = true === i.value ? true === l2 ? a2 : [] : true === l2 ? e.selected.concat(a2) : e.selected.filter((e2) => false === o2.includes(n.value(e2)));
    t("update:selected", s2);
  }
  return { hasSelectionMode: l, singleSelection: i, multipleSelection: r, allRowsSelected: s, someRowsSelected: u, rowsSelectedNumber: c, isRowSelected: d, clearSelection: p2, updateSelection: v };
}
function getVal(e) {
  return Array.isArray(e) ? e.slice() : [];
}
const useTableRowExpandProps = { expanded: Array }, useTableRowExpandEmits = ["update:expanded"];
function useTableRowExpand(e, t) {
  const o = ref(getVal(e.expanded));
  function n(e2) {
    return o.value.includes(e2);
  }
  function a(n2) {
    void 0 !== e.expanded ? t("update:expanded", n2) : o.value = n2;
  }
  function l(e2, t2) {
    const n2 = o.value.slice(), l2 = n2.indexOf(e2);
    true === t2 ? -1 === l2 && (n2.push(e2), a(n2)) : -1 !== l2 && (n2.splice(l2, 1), a(n2));
  }
  return watch(() => e.expanded, (e2) => {
    o.value = getVal(e2);
  }), { isRowExpanded: n, setExpanded: a, updateExpanded: l };
}
const useTableColumnSelectionProps = { visibleColumns: Array };
function useTableColumnSelection(e, t, o) {
  const n = computed(() => {
    if (void 0 !== e.columns)
      return e.columns;
    const t2 = e.rows[0];
    return void 0 !== t2 ? Object.keys(t2).map((e2) => ({ name: e2, label: e2.toUpperCase(), field: e2, align: isNumber(t2[e2]) ? "right" : "left", sortable: true })) : [];
  }), a = computed(() => {
    const { sortBy: o2, descending: a2 } = t.value, l2 = void 0 !== e.visibleColumns ? n.value.filter((t2) => true === t2.required || true === e.visibleColumns.includes(t2.name)) : n.value;
    return l2.map((e2) => {
      const t2 = e2.align || "right", n2 = `text-${t2}`;
      return { ...e2, align: t2, __iconClass: `q-table__sort-icon q-table__sort-icon--${t2}`, __thClass: n2 + (void 0 !== e2.headerClasses ? " " + e2.headerClasses : "") + (true === e2.sortable ? " sortable" : "") + (e2.name === o2 ? ` sorted ${true === a2 ? "sort-desc" : ""}` : ""), __tdStyle: void 0 !== e2.style ? "function" !== typeof e2.style ? () => e2.style : e2.style : () => null, __tdClass: void 0 !== e2.classes ? "function" !== typeof e2.classes ? () => n2 + " " + e2.classes : (t3) => n2 + " " + e2.classes(t3) : () => n2 };
    });
  }), l = computed(() => {
    const e2 = {};
    return a.value.forEach((t2) => {
      e2[t2.name] = t2;
    }), e2;
  }), i = computed(() => {
    return void 0 !== e.tableColspan ? e.tableColspan : a.value.length + (true === o.value ? 1 : 0);
  });
  return { colList: n, computedCols: a, computedColsMap: l, computedColspan: i };
}
const bottomClass = "q-table__bottom row items-center", commonVirtPropsObj = {};
commonVirtPropsList.forEach((e) => {
  commonVirtPropsObj[e] = {};
});
var QTable = createComponent({ name: "QTable", props: { rows: { type: Array, default: () => [] }, rowKey: { type: [String, Function], default: "id" }, columns: Array, loading: Boolean, iconFirstPage: String, iconPrevPage: String, iconNextPage: String, iconLastPage: String, title: String, hideHeader: Boolean, grid: Boolean, gridHeader: Boolean, dense: Boolean, flat: Boolean, bordered: Boolean, square: Boolean, separator: { type: String, default: "horizontal", validator: (e) => ["horizontal", "vertical", "cell", "none"].includes(e) }, wrapCells: Boolean, virtualScroll: Boolean, virtualScrollTarget: { default: void 0 }, ...commonVirtPropsObj, noDataLabel: String, noResultsLabel: String, loadingLabel: String, selectedRowsLabel: Function, rowsPerPageLabel: String, paginationLabel: Function, color: { type: String, default: "grey-8" }, titleClass: [String, Array, Object], tableStyle: [String, Array, Object], tableClass: [String, Array, Object], tableHeaderStyle: [String, Array, Object], tableHeaderClass: [String, Array, Object], cardContainerClass: [String, Array, Object], cardContainerStyle: [String, Array, Object], cardStyle: [String, Array, Object], cardClass: [String, Array, Object], hideBottom: Boolean, hideSelectedBanner: Boolean, hideNoData: Boolean, hidePagination: Boolean, onRowClick: Function, onRowDblclick: Function, onRowContextmenu: Function, ...useDarkProps, ...useFullscreenProps, ...useTableColumnSelectionProps, ...useTableFilterProps, ...useTablePaginationProps, ...useTableRowExpandProps, ...useTableRowSelectionProps, ...useTableSortProps }, emits: ["request", "virtual-scroll", ...useFullscreenEmits, ...useTableRowExpandEmits, ...useTableRowSelectionEmits], setup(e, { slots: t, emit: o }) {
  const n = getCurrentInstance(), { proxy: { $q: a } } = n, l = useDark(e, a), { inFullscreen: i, toggleFullscreen: r } = useFullscreen(), s = computed(() => "function" === typeof e.rowKey ? e.rowKey : (t2) => t2[e.rowKey]), u = ref(null), c = ref(null), d = computed(() => true !== e.grid && true === e.virtualScroll), p2 = computed(() => " q-table__card" + (true === l.value ? " q-table__card--dark q-dark" : "") + (true === e.square ? " q-table--square" : "") + (true === e.flat ? " q-table--flat" : "") + (true === e.bordered ? " q-table--bordered" : "")), v = computed(() => `q-table__container q-table--${e.separator}-separator column no-wrap` + (true === e.grid ? " q-table--grid" : p2.value) + (true === l.value ? " q-table--dark" : "") + (true === e.dense ? " q-table--dense" : "") + (false === e.wrapCells ? " q-table--no-wrap" : "") + (true === i.value ? " fullscreen scroll" : "")), m = computed(() => v.value + (true === e.loading ? " q-table--loading" : ""));
  watch(() => e.tableStyle + e.tableClass + e.tableHeaderStyle + e.tableHeaderClass + v.value, () => {
    true === d.value && null !== c.value && c.value.reset();
  });
  const { innerPagination: f, computedPagination: g, isServerSide: b, requestServerInteraction: y, setPagination: S } = useTablePaginationState(n, me), { computedFilterMethod: w } = useTableFilter(e, S), { isRowExpanded: C, setExpanded: x, updateExpanded: k } = useTableRowExpand(e, o), _ = computed(() => {
    let t2 = e.rows;
    if (true === b.value || 0 === t2.length)
      return t2;
    const { sortBy: o2, descending: n2 } = g.value;
    return e.filter && (t2 = w.value(t2, e.filter, D.value, me)), null !== I.value && (t2 = V.value(e.rows === t2 ? t2.slice() : t2, o2, n2)), t2;
  }), q = computed(() => _.value.length), T = computed(() => {
    let t2 = _.value;
    if (true === b.value)
      return t2;
    const { rowsPerPage: o2 } = g.value;
    return 0 !== o2 && (0 === H.value && e.rows !== t2 ? t2.length > j.value && (t2 = t2.slice(0, j.value)) : t2 = t2.slice(H.value, j.value)), t2;
  }), { hasSelectionMode: P, singleSelection: $, multipleSelection: M, allRowsSelected: B, someRowsSelected: Q, rowsSelectedNumber: E, isRowSelected: O, clearSelection: A, updateSelection: L } = useTableRowSelection(e, o, T, s), { colList: R, computedCols: D, computedColsMap: z, computedColspan: F } = useTableColumnSelection(e, g, P), { columnToSort: I, computedSortMethod: V, sort: N } = useTableSort(e, g, R, S), { firstRowIndex: H, lastRowIndex: j, isFirstPage: U, isLastPage: K, pagesNumber: W, computedRowsPerPageOptions: Y, computedRowsNumber: G, firstPage: X, prevPage: Z, nextPage: J, lastPage: ee } = useTablePagination(n, f, g, b, S, q), te = computed(() => 0 === T.value.length), oe = computed(() => {
    const t2 = {};
    return commonVirtPropsList.forEach((o2) => {
      t2[o2] = e[o2];
    }), void 0 === t2.virtualScrollItemSize && (t2.virtualScrollItemSize = true === e.dense ? 28 : 48), t2;
  });
  function ne() {
    true === d.value && c.value.reset();
  }
  function ae() {
    if (true === e.grid)
      return Te();
    const o2 = true !== e.hideHeader ? be : null;
    if (true === d.value) {
      const n3 = t["top-row"], a2 = t["bottom-row"], l2 = { default: (e2) => se(e2.item, t.body, e2.index) };
      if (void 0 !== n3) {
        const e2 = h("tbody", n3({ cols: D.value }));
        l2.before = null === o2 ? () => e2 : () => [o2()].concat(e2);
      } else
        null !== o2 && (l2.before = o2);
      return void 0 !== a2 && (l2.after = () => h("tbody", a2({ cols: D.value }))), h(QVirtualScroll, { ref: c, class: e.tableClass, style: e.tableStyle, ...oe.value, scrollTarget: e.virtualScrollTarget, items: T.value, type: "__qtable", tableColspan: F.value, onVirtualScroll: ie }, l2);
    }
    const n2 = [ue()];
    return null !== o2 && n2.unshift(o2()), getTableMiddle({ class: ["q-table__middle scroll", e.tableClass], style: e.tableStyle }, n2);
  }
  function le(t2, n2) {
    if (null !== c.value)
      return void c.value.scrollTo(t2, n2);
    t2 = parseInt(t2, 10);
    const a2 = u.value.querySelector(`tbody tr:nth-of-type(${t2 + 1})`);
    if (null !== a2) {
      const n3 = u.value.querySelector(".q-table__middle.scroll"), l2 = a2.offsetTop - e.virtualScrollStickySizeStart, i2 = l2 < n3.scrollTop ? "decrease" : "increase";
      n3.scrollTop = l2, o("virtual-scroll", { index: t2, from: 0, to: f.value.rowsPerPage - 1, direction: i2 });
    }
  }
  function ie(e2) {
    o("virtual-scroll", e2);
  }
  function re() {
    return [h(QLinearProgress, { class: "q-table__linear-progress", color: e.color, dark: l.value, indeterminate: true, trackColor: "transparent" })];
  }
  function se(n2, a2, i2) {
    const r2 = s.value(n2), u2 = O(r2);
    if (void 0 !== a2)
      return a2(ce({ key: r2, row: n2, pageIndex: i2, __trClass: u2 ? "selected" : "" }));
    const c2 = t["body-cell"], d2 = D.value.map((e2) => {
      const o2 = t[`body-cell-${e2.name}`], a3 = void 0 !== o2 ? o2 : c2;
      return void 0 !== a3 ? a3(de({ key: r2, row: n2, pageIndex: i2, col: e2 })) : h("td", { class: e2.__tdClass(n2), style: e2.__tdStyle(n2) }, me(e2, n2));
    });
    if (true === P.value) {
      const o2 = t["body-selection"], a3 = void 0 !== o2 ? o2(pe({ key: r2, row: n2, pageIndex: i2 })) : [h(QCheckbox, { modelValue: u2, color: e.color, dark: l.value, dense: e.dense, "onUpdate:modelValue": (e2, t2) => {
        L([r2], [n2], e2, t2);
      } })];
      d2.unshift(h("td", { class: "q-table--col-auto-width" }, a3));
    }
    const p3 = { key: r2, class: { selected: u2 } };
    return void 0 !== e.onRowClick && (p3.class["cursor-pointer"] = true, p3.onClick = (e2) => {
      o("RowClick", e2, n2, i2);
    }), void 0 !== e.onRowDblclick && (p3.class["cursor-pointer"] = true, p3.onDblclick = (e2) => {
      o("RowDblclick", e2, n2, i2);
    }), void 0 !== e.onRowContextmenu && (p3.class["cursor-pointer"] = true, p3.onContextmenu = (e2) => {
      o("RowContextmenu", e2, n2, i2);
    }), h("tr", p3, d2);
  }
  function ue() {
    const e2 = t.body, o2 = t["top-row"], n2 = t["bottom-row"];
    let a2 = T.value.map((t2, o3) => se(t2, e2, o3));
    return void 0 !== o2 && (a2 = o2({ cols: D.value }).concat(a2)), void 0 !== n2 && (a2 = a2.concat(n2({ cols: D.value }))), h("tbody", a2);
  }
  function ce(e2) {
    return ve(e2), e2.cols = e2.cols.map((t2) => injectProp({ ...t2 }, "value", () => me(t2, e2.row))), e2;
  }
  function de(e2) {
    return ve(e2), injectProp(e2, "value", () => me(e2.col, e2.row)), e2;
  }
  function pe(e2) {
    return ve(e2), e2;
  }
  function ve(t2) {
    Object.assign(t2, { cols: D.value, colsMap: z.value, sort: N, rowIndex: H.value + t2.pageIndex, color: e.color, dark: l.value, dense: e.dense }), true === P.value && injectProp(t2, "selected", () => O(t2.key), (e2, o2) => {
      L([t2.key], [t2.row], e2, o2);
    }), injectProp(t2, "expand", () => C(t2.key), (e2) => {
      k(t2.key, e2);
    });
  }
  function me(e2, t2) {
    const o2 = "function" === typeof e2.field ? e2.field(t2) : t2[e2.field];
    return void 0 !== e2.format ? e2.format(o2, t2) : o2;
  }
  const fe = computed(() => ({ pagination: g.value, pagesNumber: W.value, isFirstPage: U.value, isLastPage: K.value, firstPage: X, prevPage: Z, nextPage: J, lastPage: ee, inFullscreen: i.value, toggleFullscreen: r }));
  function he() {
    const o2 = t.top, n2 = t["top-left"], a2 = t["top-right"], l2 = t["top-selection"], i2 = true === P.value && void 0 !== l2 && E.value > 0, r2 = "q-table__top relative-position row items-center";
    if (void 0 !== o2)
      return h("div", { class: r2 }, [o2(fe.value)]);
    let s2;
    return true === i2 ? s2 = l2(fe.value).slice() : (s2 = [], void 0 !== n2 ? s2.push(h("div", { class: "q-table-control" }, [n2(fe.value)])) : e.title && s2.push(h("div", { class: "q-table__control" }, [h("div", { class: ["q-table__title", e.titleClass] }, e.title)]))), void 0 !== a2 && (s2.push(h("div", { class: "q-table__separator col" })), s2.push(h("div", { class: "q-table__control" }, [a2(fe.value)]))), 0 !== s2.length ? h("div", { class: r2 }, s2) : void 0;
  }
  const ge = computed(() => true === Q.value ? null : B.value);
  function be() {
    const o2 = ye();
    return true === e.loading && void 0 === t.loading && o2.push(h("tr", { class: "q-table__progress" }, [h("th", { class: "relative-position", colspan: F.value }, re())])), h("thead", o2);
  }
  function ye() {
    const o2 = t.header, n2 = t["header-cell"];
    if (void 0 !== o2)
      return o2(Se({ header: true })).slice();
    const a2 = D.value.map((e2) => {
      const o3 = t[`header-cell-${e2.name}`], a3 = void 0 !== o3 ? o3 : n2, l2 = Se({ col: e2 });
      return void 0 !== a3 ? a3(l2) : h(QTh, { key: e2.name, props: l2 }, () => e2.label);
    });
    if (true === $.value && true !== e.grid)
      a2.unshift(h("th", { class: "q-table--col-auto-width" }, " "));
    else if (true === M.value) {
      const o3 = t["header-selection"], n3 = void 0 !== o3 ? o3(Se({})) : [h(QCheckbox, { color: e.color, modelValue: ge.value, dark: l.value, dense: e.dense, "onUpdate:modelValue": we })];
      a2.unshift(h("th", { class: "q-table--col-auto-width" }, n3));
    }
    return [h("tr", { class: e.tableHeaderClass, style: e.tableHeaderStyle }, a2)];
  }
  function Se(t2) {
    return Object.assign(t2, { cols: D.value, sort: N, colsMap: z.value, color: e.color, dark: l.value, dense: e.dense }), true === M.value && injectProp(t2, "selected", () => ge.value, we), t2;
  }
  function we(e2) {
    true === Q.value && (e2 = false), L(T.value.map(s.value), T.value, e2);
  }
  const Ce = computed(() => {
    const t2 = [e.iconFirstPage || a.iconSet.table.firstPage, e.iconPrevPage || a.iconSet.table.prevPage, e.iconNextPage || a.iconSet.table.nextPage, e.iconLastPage || a.iconSet.table.lastPage];
    return true === a.lang.rtl ? t2.reverse() : t2;
  });
  function xe() {
    if (true === e.hideBottom)
      return;
    if (true === te.value) {
      if (true === e.hideNoData)
        return;
      const o3 = true === e.loading ? e.loadingLabel || a.lang.table.loading : e.filter ? e.noResultsLabel || a.lang.table.noResults : e.noDataLabel || a.lang.table.noData, n3 = t["no-data"], l2 = void 0 !== n3 ? [n3({ message: o3, icon: a.iconSet.table.warning, filter: e.filter })] : [h(QIcon, { class: "q-table__bottom-nodata-icon", name: a.iconSet.table.warning }), o3];
      return h("div", { class: bottomClass + " q-table__bottom--nodata" }, l2);
    }
    const o2 = t.bottom;
    if (void 0 !== o2)
      return h("div", { class: bottomClass }, [o2(fe.value)]);
    const n2 = true !== e.hideSelectedBanner && true === P.value && E.value > 0 ? [h("div", { class: "q-table__control" }, [h("div", [(e.selectedRowsLabel || a.lang.table.selectedRecords)(E.value)])])] : [];
    return true !== e.hidePagination ? h("div", { class: bottomClass + " justify-end" }, _e(n2)) : n2.length > 0 ? h("div", { class: bottomClass }, n2) : void 0;
  }
  function ke(e2) {
    S({ page: 1, rowsPerPage: e2.value });
  }
  function _e(o2) {
    let n2;
    const { rowsPerPage: i2 } = g.value, r2 = e.paginationLabel || a.lang.table.pagination, s2 = t.pagination, u2 = e.rowsPerPageOptions.length > 1;
    if (o2.push(h("div", { class: "q-table__separator col" })), true === u2 && o2.push(h("div", { class: "q-table__control" }, [h("span", { class: "q-table__bottom-item" }, [e.rowsPerPageLabel || a.lang.table.recordsPerPage]), h(QSelect, { class: "q-table__select inline q-table__bottom-item", color: e.color, modelValue: i2, options: Y.value, displayValue: 0 === i2 ? a.lang.table.allRows : i2, dark: l.value, borderless: true, dense: true, optionsDense: true, optionsCover: true, "onUpdate:modelValue": ke })])), void 0 !== s2)
      n2 = s2(fe.value);
    else if (n2 = [h("span", 0 !== i2 ? { class: "q-table__bottom-item" } : {}, [i2 ? r2(H.value + 1, Math.min(j.value, G.value), G.value) : r2(1, q.value, G.value)])], 0 !== i2 && W.value > 1) {
      const t2 = { color: e.color, round: true, dense: true, flat: true };
      true === e.dense && (t2.size = "sm"), W.value > 2 && n2.push(h(QBtn, { key: "pgFirst", ...t2, icon: Ce.value[0], disable: U.value, onClick: X })), n2.push(h(QBtn, { key: "pgPrev", ...t2, icon: Ce.value[1], disable: U.value, onClick: Z }), h(QBtn, { key: "pgNext", ...t2, icon: Ce.value[2], disable: K.value, onClick: J })), W.value > 2 && n2.push(h(QBtn, { key: "pgLast", ...t2, icon: Ce.value[3], disable: K.value, onClick: ee }));
    }
    return o2.push(h("div", { class: "q-table__control" }, n2)), o2;
  }
  function qe() {
    const o2 = true === e.gridHeader ? [h("table", { class: "q-table" }, [be()])] : true === e.loading && void 0 === t.loading ? re() : void 0;
    return h("div", { class: "q-table__middle" }, o2);
  }
  function Te() {
    const n2 = void 0 !== t.item ? t.item : (n3) => {
      const a2 = n3.cols.map((e2) => h("div", { class: "q-table__grid-item-row" }, [h("div", { class: "q-table__grid-item-title" }, [e2.label]), h("div", { class: "q-table__grid-item-value" }, [e2.value])]));
      if (true === P.value) {
        const o2 = t["body-selection"], i3 = void 0 !== o2 ? o2(n3) : [h(QCheckbox, { modelValue: n3.selected, color: e.color, dark: l.value, dense: e.dense, "onUpdate:modelValue": (e2, t2) => {
          L([n3.key], [n3.row], e2, t2);
        } })];
        a2.unshift(h("div", { class: "q-table__grid-item-row" }, i3), h(QSeparator, { dark: l.value }));
      }
      const i2 = { class: ["q-table__grid-item-card" + p2.value, e.cardClass], style: e.cardStyle };
      return void 0 === e.onRowClick && void 0 === e.onRowDblclick || (i2.class[0] += " cursor-pointer", void 0 !== e.onRowClick && (i2.onClick = (e2) => {
        o("RowClick", e2, n3.row, n3.pageIndex);
      }), void 0 !== e.onRowDblclick && (i2.onDblclick = (e2) => {
        o("RowDblclick", e2, n3.row, n3.pageIndex);
      })), h("div", { class: "q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3" + (true === n3.selected ? " q-table__grid-item--selected" : "") }, [h("div", i2, a2)]);
    };
    return h("div", { class: ["q-table__grid-content row", e.cardContainerClass], style: e.cardContainerStyle }, T.value.map((e2, t2) => {
      return n2(ce({ key: s.value(e2), row: e2, pageIndex: t2 }));
    }));
  }
  return Object.assign(n.proxy, { requestServerInteraction: y, setPagination: S, firstPage: X, prevPage: Z, nextPage: J, lastPage: ee, isRowSelected: O, clearSelection: A, isRowExpanded: C, setExpanded: x, sort: N, resetVirtualScroll: ne, scrollTo: le, getCellValue: me }), injectMultipleProps(n.proxy, { filteredSortedRows: () => _.value, computedRows: () => T.value, computedRowsNumber: () => G.value }), () => {
    const o2 = [he()], n2 = { ref: u, class: m.value };
    return true === e.grid ? o2.push(qe()) : Object.assign(n2, { class: [n2.class, e.cardClass], style: e.cardStyle }), o2.push(ae(), xe()), true === e.loading && void 0 !== t.loading && o2.push(t.loading()), h("div", n2, o2);
  };
} }), QTr = createComponent({ name: "QTr", props: { props: Object, noHover: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => "q-tr" + (void 0 === e.props || true === e.props.header ? "" : " " + e.props.__trClass) + (true === e.noHover ? " q-tr--no-hover" : ""));
  return () => h("tr", { class: o.value }, hSlot(t.default));
} }), QTd = createComponent({ name: "QTd", props: { props: Object, autoWidth: Boolean, noHover: Boolean }, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = computed(() => "q-td" + (true === e.autoWidth ? " q-table--col-auto-width" : "") + (true === e.noHover ? " q-td--no-hover" : "") + " ");
  return () => {
    if (void 0 === e.props)
      return h("td", { class: n.value }, hSlot(t.default));
    const a = o.vnode.key, l = (void 0 !== e.props.colsMap ? e.props.colsMap[a] : null) || e.props.col;
    if (void 0 === l)
      return;
    const { row: i } = e.props;
    return h("td", { class: n.value + l.__tdClass(i), style: l.__tdStyle(i) }, hSlot(t.default));
  };
} }), QRouteTab = createComponent({ name: "QRouteTab", props: { ...useRouterLinkProps, ...useTabProps }, emits: useTabEmits, setup(e, { slots: t, emit: o }) {
  const n = useRouterLink({ useDisableForRouterLinkProps: false }), { renderTab: a, $tabs: l } = useTab(e, t, o, { exact: computed(() => e.exact), ...n });
  return watch(() => `${e.name} | ${e.exact} | ${(n.resolvedLink.value || {}).href}`, () => {
    l.verifyRouteModel();
  }), () => a(n.linkTag.value, n.linkAttrs.value);
} });
function getViewByModel(e, t) {
  if (null !== e.hour) {
    if (null === e.minute)
      return "minute";
    if (true === t && null === e.second)
      return "second";
  }
  return "hour";
}
function getCurrentTime() {
  const e = new Date();
  return { hour: e.getHours(), minute: e.getMinutes(), second: e.getSeconds(), millisecond: e.getMilliseconds() };
}
var QTime = createComponent({ name: "QTime", props: { ...useDarkProps, ...useFormProps, ...useDatetimeProps, mask: { default: null }, format24h: { type: Boolean, default: null }, defaultDate: { type: String, validator: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e) }, options: Function, hourOptions: Array, minuteOptions: Array, secondOptions: Array, withSeconds: Boolean, nowBtn: Boolean }, emits: useDatetimeEmits, setup(e, { slots: t, emit: o }) {
  const n = getCurrentInstance(), { $q: a } = n.proxy, l = useDark(e, a), { tabindex: i, headerClass: r, getLocale: s, getCurrentDate: u } = useDatetime(e, a), c = useFormAttrs(e), d = useFormInject(c);
  let p2, v;
  const m = ref(null), f = computed(() => V()), g = computed(() => s()), b = computed(() => N()), y = __splitDate(e.modelValue, f.value, g.value, e.calendar, b.value), S = ref(getViewByModel(y)), w = ref(y), C = ref(null === y.hour || y.hour < 12), x = computed(() => `q-time q-time--${true === e.landscape ? "landscape" : "portrait"}` + (true === l.value ? " q-time--dark q-dark" : "") + (true === e.disable ? " disabled" : true === e.readonly ? " q-time--readonly" : "") + (true === e.bordered ? " q-time--bordered" : "") + (true === e.square ? " q-time--square no-border-radius" : "") + (true === e.flat ? " q-time--flat no-shadow" : "")), k = computed(() => {
    const e2 = w.value;
    return { hour: null === e2.hour ? "--" : true === _.value ? pad(e2.hour) : String(true === C.value ? 0 === e2.hour ? 12 : e2.hour : e2.hour > 12 ? e2.hour - 12 : e2.hour), minute: null === e2.minute ? "--" : pad(e2.minute), second: null === e2.second ? "--" : pad(e2.second) };
  }), _ = computed(() => null !== e.format24h ? e.format24h : a.lang.date.format24h), q = computed(() => {
    const e2 = "hour" === S.value, t2 = true === e2 ? 12 : 60, o2 = w.value[S.value], n2 = Math.round(o2 * (360 / t2)) - 180;
    let a2 = `rotate(${n2}deg) translateX(-50%)`;
    return true === e2 && true === _.value && w.value.hour >= 12 && (a2 += " scale(.7)"), { transform: a2 };
  }), T = computed(() => null !== w.value.hour), P = computed(() => true === T.value && null !== w.value.minute), $ = computed(() => void 0 !== e.hourOptions ? (t2) => e.hourOptions.includes(t2) : void 0 !== e.options ? (t2) => e.options(t2, null, null) : null), M = computed(() => void 0 !== e.minuteOptions ? (t2) => e.minuteOptions.includes(t2) : void 0 !== e.options ? (t2) => e.options(w.value.hour, t2, null) : null), B = computed(() => void 0 !== e.secondOptions ? (t2) => e.secondOptions.includes(t2) : void 0 !== e.options ? (t2) => e.options(w.value.hour, w.value.minute, t2) : null), Q = computed(() => {
    if (null === $.value)
      return null;
    const e2 = z(0, 11, $.value), t2 = z(12, 11, $.value);
    return { am: e2, pm: t2, values: e2.values.concat(t2.values) };
  }), E = computed(() => null !== M.value ? z(0, 59, M.value) : null), O = computed(() => null !== B.value ? z(0, 59, B.value) : null), A = computed(() => {
    switch (S.value) {
      case "hour":
        return Q.value;
      case "minute":
        return E.value;
      case "second":
        return O.value;
    }
  }), L = computed(() => {
    let e2, t2, o2 = 0, n2 = 1;
    const a2 = null !== A.value ? A.value.values : void 0;
    "hour" === S.value ? true === _.value ? (e2 = 0, t2 = 23) : (e2 = 0, t2 = 11, false === C.value && (o2 = 12)) : (e2 = 0, t2 = 55, n2 = 5);
    const l2 = [];
    for (let i2 = e2, r2 = e2; i2 <= t2; i2 += n2, r2++) {
      const e3 = i2 + o2, t3 = void 0 !== a2 && false === a2.includes(e3), n3 = "hour" === S.value && 0 === i2 ? true === _.value ? "00" : "12" : i2;
      l2.push({ val: e3, index: r2, disable: t3, label: n3 });
    }
    return l2;
  }), R = computed(() => {
    return [[TouchPan, U, void 0, { stop: true, prevent: true, mouse: true }]];
  });
  function D() {
    const e2 = { ...u(), ...getCurrentTime() };
    ce(e2), Object.assign(w.value, e2), S.value = "hour";
  }
  function z(e2, t2, o2) {
    const n2 = Array.apply(null, { length: t2 + 1 }).map((t3, n3) => {
      const a2 = n3 + e2;
      return { index: a2, val: true === o2(a2) };
    }).filter((e3) => true === e3.val).map((e3) => e3.index);
    return { min: n2[0], max: n2[n2.length - 1], values: n2, threshold: t2 + 1 };
  }
  function F(e2, t2, o2) {
    const n2 = Math.abs(e2 - t2);
    return Math.min(n2, o2 - n2);
  }
  function I(e2, { min: t2, max: o2, values: n2, threshold: a2 }) {
    if (e2 === t2)
      return t2;
    if (e2 < t2 || e2 > o2)
      return F(e2, t2, a2) <= F(e2, o2, a2) ? t2 : o2;
    const l2 = n2.findIndex((t3) => e2 <= t3), i2 = n2[l2 - 1], r2 = n2[l2];
    return e2 - i2 <= r2 - e2 ? i2 : r2;
  }
  function V() {
    return "persian" !== e.calendar && null !== e.mask ? e.mask : `HH:mm${true === e.withSeconds ? ":ss" : ""}`;
  }
  function N() {
    if ("string" !== typeof e.defaultDate) {
      const e2 = u(true);
      return e2.dateHash = getDayHash(e2), e2;
    }
    return __splitDate(e.defaultDate, "YYYY/MM/DD", void 0, e.calendar);
  }
  function H() {
    return true === vmIsDestroyed(n) || null !== A.value && (0 === A.value.values.length || "hour" === S.value && true !== _.value && 0 === Q.value[true === C.value ? "am" : "pm"].values.length);
  }
  function j() {
    const e2 = m.value, { top: t2, left: o2, width: n2 } = e2.getBoundingClientRect(), a2 = n2 / 2;
    return { top: t2 + a2, left: o2 + a2, dist: 0.7 * a2 };
  }
  function U(e2) {
    if (true !== H()) {
      if (true === e2.isFirst)
        return p2 = j(), void (v = W(e2.evt, p2));
      v = W(e2.evt, p2, v), true === e2.isFinal && (p2 = false, v = null, K());
    }
  }
  function K() {
    "hour" === S.value ? S.value = "minute" : e.withSeconds && "minute" === S.value && (S.value = "second");
  }
  function W(e2, t2, o2) {
    const n2 = position(e2), a2 = Math.abs(n2.top - t2.top), l2 = Math.sqrt(Math.pow(Math.abs(n2.top - t2.top), 2) + Math.pow(Math.abs(n2.left - t2.left), 2));
    let i2, r2 = Math.asin(a2 / l2) * (180 / Math.PI);
    if (r2 = n2.top < t2.top ? t2.left < n2.left ? 90 - r2 : 270 + r2 : t2.left < n2.left ? r2 + 90 : 270 - r2, "hour" === S.value) {
      if (i2 = r2 / 30, null !== Q.value) {
        const e3 = true !== _.value ? true === C.value : Q.value.am.values.length > 0 && Q.value.pm.values.length > 0 ? l2 >= t2.dist : Q.value.am.values.length > 0;
        i2 = I(i2 + (true === e3 ? 0 : 12), Q.value[true === e3 ? "am" : "pm"]);
      } else
        i2 = Math.round(i2), true === _.value ? l2 < t2.dist ? i2 < 12 && (i2 += 12) : 12 === i2 && (i2 = 0) : true === C.value && 12 === i2 ? i2 = 0 : false === C.value && 12 !== i2 && (i2 += 12);
      true === _.value && (C.value = i2 < 12);
    } else
      i2 = Math.round(r2 / 6) % 60, "minute" === S.value && null !== E.value ? i2 = I(i2, E.value) : "second" === S.value && null !== O.value && (i2 = I(i2, O.value));
    return o2 !== i2 && ie[S.value](i2), i2;
  }
  watch(() => e.modelValue, (t2) => {
    const o2 = __splitDate(t2, f.value, g.value, e.calendar, b.value);
    o2.dateHash === w.value.dateHash && o2.timeHash === w.value.timeHash || (w.value = o2, null === o2.hour ? S.value = "hour" : C.value = o2.hour < 12);
  }), watch([f, g], () => {
    nextTick(() => {
      ce();
    });
  });
  const Y = { hour() {
    S.value = "hour";
  }, minute() {
    S.value = "minute";
  }, second() {
    S.value = "second";
  } };
  function G(e2) {
    13 === e2.keyCode && re();
  }
  function X(e2) {
    13 === e2.keyCode && se();
  }
  function Z(e2) {
    true !== H() && (true !== a.platform.is.desktop && W(e2, j()), K());
  }
  function J(e2) {
    true !== H() && W(e2, j());
  }
  function ee(e2) {
    if (13 === e2.keyCode)
      S.value = "hour";
    else if ([37, 39].includes(e2.keyCode)) {
      const t2 = 37 === e2.keyCode ? -1 : 1;
      if (null !== Q.value) {
        const e3 = true === _.value ? Q.value.values : Q.value[true === C.value ? "am" : "pm"].values;
        if (0 === e3.length)
          return;
        if (null === w.value.hour)
          ne(e3[0]);
        else {
          const o2 = (e3.length + e3.indexOf(w.value.hour) + t2) % e3.length;
          ne(e3[o2]);
        }
      } else {
        const e3 = true === _.value ? 24 : 12, o2 = true !== _.value && false === C.value ? 12 : 0, n2 = null === w.value.hour ? -t2 : w.value.hour;
        ne(o2 + (24 + n2 + t2) % e3);
      }
    }
  }
  function te(e2) {
    if (13 === e2.keyCode)
      S.value = "minute";
    else if ([37, 39].includes(e2.keyCode)) {
      const t2 = 37 === e2.keyCode ? -1 : 1;
      if (null !== E.value) {
        const e3 = E.value.values;
        if (0 === e3.length)
          return;
        if (null === w.value.minute)
          ae(e3[0]);
        else {
          const o2 = (e3.length + e3.indexOf(w.value.minute) + t2) % e3.length;
          ae(e3[o2]);
        }
      } else {
        const e3 = null === w.value.minute ? -t2 : w.value.minute;
        ae((60 + e3 + t2) % 60);
      }
    }
  }
  function oe(e2) {
    if (13 === e2.keyCode)
      S.value = "second";
    else if ([37, 39].includes(e2.keyCode)) {
      const t2 = 37 === e2.keyCode ? -1 : 1;
      if (null !== O.value) {
        const e3 = O.value.values;
        if (0 === e3.length)
          return;
        if (null === w.value.seconds)
          le(e3[0]);
        else {
          const o2 = (e3.length + e3.indexOf(w.value.second) + t2) % e3.length;
          le(e3[o2]);
        }
      } else {
        const e3 = null === w.value.second ? -t2 : w.value.second;
        le((60 + e3 + t2) % 60);
      }
    }
  }
  function ne(e2) {
    w.value.hour !== e2 && (w.value.hour = e2, ue());
  }
  function ae(e2) {
    w.value.minute !== e2 && (w.value.minute = e2, ue());
  }
  function le(e2) {
    w.value.second !== e2 && (w.value.second = e2, ue());
  }
  const ie = { hour: ne, minute: ae, second: le };
  function re() {
    false === C.value && (C.value = true, null !== w.value.hour && (w.value.hour -= 12, ue()));
  }
  function se() {
    true === C.value && (C.value = false, null !== w.value.hour && (w.value.hour += 12, ue()));
  }
  function ue() {
    return null !== $.value && true !== $.value(w.value.hour) ? (w.value = __splitDate(), void (S.value = "hour")) : null !== M.value && true !== M.value(w.value.minute) ? (w.value.minute = null, w.value.second = null, void (S.value = "minute")) : true === e.withSeconds && null !== B.value && true !== B.value(w.value.second) ? (w.value.second = null, void (S.value = "second")) : void (null === w.value.hour || null === w.value.minute || true === e.withSeconds && null === w.value.second || ce());
  }
  function ce(t2) {
    const n2 = Object.assign({ ...w.value }, t2), a2 = "persian" === e.calendar ? pad(n2.hour) + ":" + pad(n2.minute) + (true === e.withSeconds ? ":" + pad(n2.second) : "") : formatDate(new Date(n2.year, null === n2.month ? null : n2.month - 1, n2.day, n2.hour, n2.minute, n2.second, n2.millisecond), f.value, g.value, n2.year, n2.timezoneOffset);
    n2.changed = a2 !== e.modelValue, o("update:modelValue", a2, n2);
  }
  function de() {
    const t2 = [h("div", { class: "q-time__link " + ("hour" === S.value ? "q-time__link--active" : "cursor-pointer"), tabindex: i.value, onClick: Y.hour, onKeyup: ee }, k.value.hour), h("div", ":"), h("div", true === T.value ? { class: "q-time__link " + ("minute" === S.value ? "q-time__link--active" : "cursor-pointer"), tabindex: i.value, onKeyup: te, onClick: Y.minute } : { class: "q-time__link" }, k.value.minute)];
    true === e.withSeconds && t2.push(h("div", ":"), h("div", true === P.value ? { class: "q-time__link " + ("second" === S.value ? "q-time__link--active" : "cursor-pointer"), tabindex: i.value, onKeyup: oe, onClick: Y.second } : { class: "q-time__link" }, k.value.second));
    const o2 = [h("div", { class: "q-time__header-label row items-center no-wrap", dir: "ltr" }, t2)];
    return false === _.value && o2.push(h("div", { class: "q-time__header-ampm column items-between no-wrap" }, [h("div", { class: "q-time__link " + (true === C.value ? "q-time__link--active" : "cursor-pointer"), tabindex: i.value, onClick: re, onKeyup: G }, "AM"), h("div", { class: "q-time__link " + (true !== C.value ? "q-time__link--active" : "cursor-pointer"), tabindex: i.value, onClick: se, onKeyup: X }, "PM")])), h("div", { class: "q-time__header flex flex-center no-wrap " + r.value }, o2);
  }
  function pe() {
    const t2 = w.value[S.value];
    return h("div", { class: "q-time__content col relative-position" }, [h(Transition, { name: "q-transition--scale" }, () => h("div", { key: "clock" + S.value, class: "q-time__container-parent absolute-full" }, [h("div", { ref: m, class: "q-time__container-child fit overflow-hidden" }, [withDirectives(h("div", { class: "q-time__clock cursor-pointer non-selectable", onClick: Z, onMousedown: J }, [h("div", { class: "q-time__clock-circle fit" }, [h("div", { class: "q-time__clock-pointer" + (null === w.value[S.value] ? " hidden" : void 0 !== e.color ? ` text-${e.color}` : ""), style: q.value }), L.value.map((e2) => h("div", { class: `q-time__clock-position row flex-center q-time__clock-pos-${e2.index}` + (e2.val === t2 ? " q-time__clock-position--active " + r.value : true === e2.disable ? " q-time__clock-position--disable" : "") }, [h("span", e2.label)]))])]), R.value)])])), true === e.nowBtn ? h(QBtn, { class: "q-time__now-button absolute", icon: a.iconSet.datetime.now, unelevated: true, size: "sm", round: true, color: e.color, textColor: e.textColor, tabindex: i.value, onClick: D }) : null]);
  }
  return n.proxy.setNow = D, () => {
    const o2 = [pe()], n2 = hSlot(t.default);
    return void 0 !== n2 && o2.push(h("div", { class: "q-time__actions" }, n2)), void 0 !== e.name && true !== e.disable && d(o2, "push"), h("div", { class: x.value, tabindex: -1 }, [de(), h("div", { class: "q-time__main col overflow-auto" }, o2)]);
  };
} }), QTimeline = createComponent({ name: "QTimeline", props: { ...useDarkProps, color: { type: String, default: "primary" }, side: { type: String, default: "right", validator: (e) => ["left", "right"].includes(e) }, layout: { type: String, default: "dense", validator: (e) => ["dense", "comfortable", "loose"].includes(e) } }, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark(e, o.proxy.$q);
  provide(timelineKey, e);
  const a = computed(() => `q-timeline q-timeline--${e.layout} q-timeline--${e.layout}--${e.side}` + (true === n.value ? " q-timeline--dark" : ""));
  return () => h("ul", { class: a.value }, hSlot(t.default));
} }), QTimelineEntry = createComponent({ name: "QTimelineEntry", props: { heading: Boolean, tag: { type: String, default: "h3" }, side: { type: String, default: "right", validator: (e) => ["left", "right"].includes(e) }, icon: String, avatar: String, color: String, title: String, subtitle: String, body: String }, setup(e, { slots: t }) {
  const o = inject(timelineKey, () => {
    console.error("QTimelineEntry needs to be child of QTimeline");
  }), n = computed(() => `q-timeline__entry q-timeline__entry--${e.side}` + (void 0 !== e.icon || void 0 !== e.avatar ? " q-timeline__entry--icon" : "")), a = computed(() => `q-timeline__dot text-${e.color || o.color}`), l = computed(() => "comfortable" === o.layout && "left" === o.side);
  return () => {
    const o2 = hUniqueSlot(t.default, []);
    if (void 0 !== e.body && o2.unshift(e.body), true === e.heading) {
      const t2 = [h("div"), h("div"), h(e.tag, { class: "q-timeline__heading-title" }, o2)];
      return h("div", { class: "q-timeline__heading" }, true === l.value ? t2.reverse() : t2);
    }
    let i;
    void 0 !== e.icon ? i = [h(QIcon, { class: "row items-center justify-center", name: e.icon })] : void 0 !== e.avatar && (i = [h("img", { class: "q-timeline__dot-img", src: e.avatar })]);
    const r = [h("div", { class: "q-timeline__subtitle" }, [h("span", {}, hSlot(t.subtitle, [e.subtitle]))]), h("div", { class: a.value }, i), h("div", { class: "q-timeline__content" }, [h("h6", { class: "q-timeline__title" }, hSlot(t.title, [e.title]))].concat(o2))];
    return h("li", { class: n.value }, true === l.value ? r.reverse() : r);
  };
} }), QToolbar = createComponent({ name: "QToolbar", props: { inset: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => "q-toolbar row no-wrap items-center" + (true === e.inset ? " q-toolbar--inset" : ""));
  return () => h("div", { class: o.value }, hSlot(t.default));
} }), QToolbarTitle = createComponent({ name: "QToolbarTitle", props: { shrink: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => "q-toolbar__title ellipsis" + (true === e.shrink ? " col-shrink" : ""));
  return () => h("div", { class: o.value }, hSlot(t.default));
} });
const tickStrategyOptions = ["none", "strict", "leaf", "leaf-filtered"];
var QTree = createComponent({ name: "QTree", props: { ...useDarkProps, nodes: { type: Array, required: true }, nodeKey: { type: String, required: true }, labelKey: { type: String, default: "label" }, childrenKey: { type: String, default: "children" }, dense: Boolean, color: String, controlColor: String, textColor: String, selectedColor: String, icon: String, tickStrategy: { type: String, default: "none", validator: (e) => tickStrategyOptions.includes(e) }, ticked: Array, expanded: Array, selected: {}, noSelectionUnset: Boolean, defaultExpandAll: Boolean, accordion: Boolean, filter: String, filterMethod: Function, duration: Number, noConnectors: Boolean, noNodesLabel: String, noResultsLabel: String }, emits: ["update:expanded", "update:ticked", "update:selected", "lazy-load", "after-show", "after-hide"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = useDark(e, a), i = ref({}), r = ref(e.ticked || []), s = ref(e.expanded || []);
  let u = {};
  onBeforeUpdate(() => {
    u = {};
  });
  const c = computed(() => `q-tree q-tree--${true === e.dense ? "dense" : "standard"}` + (true === e.noConnectors ? " q-tree--no-connectors" : "") + (true === l.value ? " q-tree--dark" : "") + (void 0 !== e.color ? ` text-${e.color}` : "")), d = computed(() => void 0 !== e.selected), p2 = computed(() => e.icon || a.iconSet.tree.icon), v = computed(() => e.controlColor || e.color), m = computed(() => void 0 !== e.textColor ? ` text-${e.textColor}` : ""), f = computed(() => {
    const t2 = e.selectedColor || e.color;
    return t2 ? ` text-${t2}` : "";
  }), g = computed(() => void 0 !== e.filterMethod ? e.filterMethod : (t2, o2) => {
    const n2 = o2.toLowerCase();
    return t2[e.labelKey] && t2[e.labelKey].toLowerCase().indexOf(n2) > -1;
  }), b = computed(() => {
    const t2 = {}, o2 = (n2, a2) => {
      const l2 = n2.tickStrategy || (a2 ? a2.tickStrategy : e.tickStrategy), u2 = n2[e.nodeKey], c2 = n2[e.childrenKey] && n2[e.childrenKey].length > 0, p3 = true !== c2, v2 = true !== n2.disabled && true === d.value && false !== n2.selectable, m2 = true !== n2.disabled && false !== n2.expandable, f2 = "none" !== l2, h2 = "strict" === l2, b2 = "leaf-filtered" === l2, y2 = "leaf" === l2 || "leaf-filtered" === l2;
      let S2 = true !== n2.disabled && false !== n2.tickable;
      true === y2 && true === S2 && a2 && true !== a2.tickable && (S2 = false);
      let w2 = n2.lazy;
      true === w2 && void 0 !== i.value[u2] && true === Array.isArray(n2[e.childrenKey]) && (w2 = i.value[u2]);
      const C2 = { key: u2, parent: a2, isParent: c2, isLeaf: p3, lazy: w2, disabled: n2.disabled, link: true !== n2.disabled && (true === v2 || true === m2 && (true === c2 || true === w2)), children: [], matchesFilter: !e.filter || g.value(n2, e.filter), selected: u2 === e.selected && true === v2, selectable: v2, expanded: true === c2 && s.value.includes(u2), expandable: m2, noTick: true === n2.noTick || true !== h2 && w2 && "loaded" !== w2, tickable: S2, tickStrategy: l2, hasTicking: f2, strictTicking: h2, leafFilteredTicking: b2, leafTicking: y2, ticked: true === h2 ? r.value.includes(u2) : true === p3 && r.value.includes(u2) };
      if (t2[u2] = C2, true === c2 && (C2.children = n2[e.childrenKey].map((e2) => o2(e2, C2)), e.filter && (true !== C2.matchesFilter ? C2.matchesFilter = C2.children.some((e2) => e2.matchesFilter) : true !== C2.noTick && true !== C2.disabled && true === C2.tickable && true === b2 && true === C2.children.every((e2) => true !== e2.matchesFilter || true === e2.noTick || true !== e2.tickable) && (C2.tickable = false)), true === C2.matchesFilter && (true !== C2.noTick && true !== h2 && true === C2.children.every((e2) => e2.noTick) && (C2.noTick = true), y2))) {
        if (C2.ticked = false, C2.indeterminate = C2.children.some((e2) => true === e2.indeterminate), C2.tickable = true === C2.tickable && C2.children.some((e2) => e2.tickable), true !== C2.indeterminate) {
          const e2 = C2.children.reduce((e3, t3) => true === t3.ticked ? e3 + 1 : e3, 0);
          e2 === C2.children.length ? C2.ticked = true : e2 > 0 && (C2.indeterminate = true);
        }
        true === C2.indeterminate && (C2.indeterminateNextState = C2.children.every((e2) => true !== e2.tickable || true !== e2.ticked));
      }
      return C2;
    };
    return e.nodes.forEach((e2) => o2(e2, null)), t2;
  });
  function y(t2) {
    const o2 = [].reduce, n2 = (a2, l2) => {
      return a2 || !l2 ? a2 : true === Array.isArray(l2) ? o2.call(Object(l2), n2, a2) : l2[e.nodeKey] === t2 ? l2 : l2[e.childrenKey] ? n2(null, l2[e.childrenKey]) : void 0;
    };
    return n2(null, e.nodes);
  }
  function S() {
    return r.value.map((e2) => y(e2));
  }
  function w() {
    return s.value.map((e2) => y(e2));
  }
  function C(e2) {
    return !(!e2 || !b.value[e2]) && b.value[e2].expanded;
  }
  function x() {
    void 0 !== e.expanded ? o("update:expanded", []) : s.value = [];
  }
  function k() {
    const t2 = s.value, n2 = (o2) => {
      o2[e.childrenKey] && o2[e.childrenKey].length > 0 && false !== o2.expandable && true !== o2.disabled && (t2.push(o2[e.nodeKey]), o2[e.childrenKey].forEach(n2));
    };
    e.nodes.forEach(n2), void 0 !== e.expanded ? o("update:expanded", t2) : s.value = t2;
  }
  function _(t2, n2, a2 = y(t2), l2 = b.value[t2]) {
    if (l2.lazy && "loaded" !== l2.lazy) {
      if ("loading" === l2.lazy)
        return;
      i.value[t2] = "loading", true !== Array.isArray(a2[e.childrenKey]) && (a2[e.childrenKey] = []), o("lazy-load", { node: a2, key: t2, done: (o2) => {
        i.value[t2] = "loaded", a2[e.childrenKey] = true === Array.isArray(o2) ? o2 : [], nextTick(() => {
          const e2 = b.value[t2];
          e2 && true === e2.isParent && q(t2, true);
        });
      }, fail: () => {
        delete i.value[t2], 0 === a2[e.childrenKey].length && delete a2[e.childrenKey];
      } });
    } else
      true === l2.isParent && true === l2.expandable && q(t2, n2);
  }
  function q(t2, n2) {
    let a2 = s.value;
    const l2 = void 0 !== e.expanded;
    if (true === l2 && (a2 = a2.slice()), n2) {
      if (e.accordion && b.value[t2]) {
        const o2 = [];
        b.value[t2].parent ? b.value[t2].parent.children.forEach((e2) => {
          e2.key !== t2 && true === e2.expandable && o2.push(e2.key);
        }) : e.nodes.forEach((n3) => {
          const a3 = n3[e.nodeKey];
          a3 !== t2 && o2.push(a3);
        }), o2.length > 0 && (a2 = a2.filter((e2) => false === o2.includes(e2)));
      }
      a2 = a2.concat([t2]).filter((e2, t3, o2) => o2.indexOf(e2) === t3);
    } else
      a2 = a2.filter((e2) => e2 !== t2);
    true === l2 ? o("update:expanded", a2) : s.value = a2;
  }
  function T(e2) {
    return !(!e2 || !b.value[e2]) && b.value[e2].ticked;
  }
  function P(t2, n2) {
    let a2 = r.value;
    const l2 = void 0 !== e.ticked;
    true === l2 && (a2 = a2.slice()), a2 = n2 ? a2.concat(t2).filter((e2, t3, o2) => o2.indexOf(e2) === t3) : a2.filter((e2) => false === t2.includes(e2)), true === l2 && o("update:ticked", a2);
  }
  function $(t2, o2, a2) {
    const i2 = { tree: n, node: t2, key: a2, color: e.color, dark: l.value };
    return injectProp(i2, "expanded", () => {
      return o2.expanded;
    }, (e2) => {
      e2 !== o2.expanded && _(a2, e2);
    }), injectProp(i2, "ticked", () => {
      return o2.ticked;
    }, (e2) => {
      e2 !== o2.ticked && P([a2], e2);
    }), i2;
  }
  function M(t2) {
    return (e.filter ? t2.filter((t3) => b.value[t3[e.nodeKey]].matchesFilter) : t2).map((e2) => O(e2));
  }
  function B(e2) {
    if (void 0 !== e2.icon)
      return h(QIcon, { class: "q-tree__icon q-mr-sm", name: e2.icon, color: e2.iconColor });
    const t2 = e2.img || e2.avatar;
    return t2 ? h("img", { class: `q-tree__${e2.img ? "img" : "avatar"} q-mr-sm`, src: t2 }) : void 0;
  }
  function Q() {
    o("after-show");
  }
  function E() {
    o("after-hide");
  }
  function O(o2) {
    const n2 = o2[e.nodeKey], a2 = b.value[n2], i2 = o2.header && t[`header-${o2.header}`] || t["default-header"], r2 = true === a2.isParent ? M(o2[e.childrenKey]) : [], s2 = r2.length > 0 || a2.lazy && "loaded" !== a2.lazy;
    let c2 = o2.body && t[`body-${o2.body}`] || t["default-body"];
    const d2 = void 0 !== i2 || void 0 !== c2 ? $(o2, a2, n2) : null;
    return void 0 !== c2 && (c2 = h("div", { class: "q-tree__node-body relative-position" }, [h("div", { class: m.value }, [c2(d2)])])), h("div", { key: n2, class: `q-tree__node relative-position q-tree__node--${true === s2 ? "parent" : "child"}` }, [h("div", { class: "q-tree__node-header relative-position row no-wrap items-center" + (true === a2.link ? " q-tree__node--link q-hoverable q-focusable" : "") + (true === a2.selected ? " q-tree__node--selected" : "") + (true === a2.disabled ? " q-tree__node--disabled" : ""), tabindex: true === a2.link ? 0 : -1, onClick: (e2) => {
      L(o2, a2, e2);
    }, onKeypress(e2) {
      true !== shouldIgnoreKey(e2) && (13 === e2.keyCode ? L(o2, a2, e2, true) : 32 === e2.keyCode && R(o2, a2, e2, true));
    } }, [h("div", { class: "q-focus-helper", tabindex: -1, ref: (e2) => {
      u[a2.key] = e2;
    } }), "loading" === a2.lazy ? h(QSpinner, { class: "q-tree__spinner", color: v.value }) : true === s2 ? h(QIcon, { class: "q-tree__arrow" + (true === a2.expanded ? " q-tree__arrow--rotate" : ""), name: p2.value, onClick(e2) {
      R(o2, a2, e2);
    } }) : null, true === a2.hasTicking && true !== a2.noTick ? h(QCheckbox, { class: "q-tree__tickbox", modelValue: true === a2.indeterminate ? null : a2.ticked, color: v.value, dark: l.value, dense: true, keepColor: true, disable: true !== a2.tickable, onKeydown: stopAndPrevent, "onUpdate:modelValue": (e2) => {
      D(a2, e2);
    } }) : null, h("div", { class: "q-tree__node-header-content col row no-wrap items-center" + (true === a2.selected ? f.value : m.value) }, [i2 ? i2(d2) : [B(o2), h("div", o2[e.labelKey])]])]), true === s2 ? h(QSlideTransition, { duration: e.duration, onShow: Q, onHide: E }, () => withDirectives(h("div", { class: "q-tree__node-collapsible" + m.value, key: `${n2}__q` }, [c2, h("div", { class: "q-tree__children" + (true === a2.disabled ? " q-tree__node--disabled" : "") }, r2)]), [[vShow, a2.expanded]])) : c2]);
  }
  function A(e2) {
    const t2 = u[e2];
    t2 && t2.focus();
  }
  function L(t2, n2, a2, l2) {
    true !== l2 && A(n2.key), d.value && n2.selectable ? false === e.noSelectionUnset ? o("update:selected", n2.key !== e.selected ? n2.key : null) : n2.key !== e.selected && o("update:selected", void 0 === n2.key ? null : n2.key) : R(t2, n2, a2, l2), "function" === typeof t2.handler && t2.handler(t2);
  }
  function R(e2, t2, o2, n2) {
    void 0 !== o2 && stopAndPrevent(o2), true !== n2 && A(t2.key), _(t2.key, !t2.expanded, e2, t2);
  }
  function D(e2, t2) {
    if (true === e2.indeterminate && (t2 = e2.indeterminateNextState), e2.strictTicking)
      P([e2.key], t2);
    else if (e2.leafTicking) {
      const o2 = [], n2 = (e3) => {
        e3.isParent ? (true !== t2 && true !== e3.noTick && true === e3.tickable && o2.push(e3.key), true === e3.leafTicking && e3.children.forEach(n2)) : true === e3.noTick || true !== e3.tickable || true === e3.leafFilteredTicking && true !== e3.matchesFilter || o2.push(e3.key);
      };
      n2(e2), P(o2, t2);
    }
  }
  return watch(() => e.ticked, (e2) => {
    r.value = e2;
  }), watch(() => e.expanded, (e2) => {
    s.value = e2;
  }), true === e.defaultExpandAll && k(), Object.assign(n, { getNodeByKey: y, getTickedNodes: S, getExpandedNodes: w, isExpanded: C, collapseAll: x, expandAll: k, setExpanded: _, isTicked: T, setTicked: P }), () => {
    const t2 = M(e.nodes);
    return h("div", { class: c.value }, 0 === t2.length ? e.filter ? e.noResultsLabel || a.lang.tree.noResults : e.noNodesLabel || a.lang.tree.noNodes : t2);
  };
} });
function getProgressLabel(e) {
  return (100 * e).toFixed(2) + "%";
}
const coreProps = { ...useDarkProps, ...useFileProps, label: String, color: String, textColor: String, square: Boolean, flat: Boolean, bordered: Boolean, noThumbnails: Boolean, autoUpload: Boolean, hideUploadBtn: Boolean, disable: Boolean, readonly: Boolean }, coreEmits = [...useFileEmits, "start", "finish", "added", "removed"];
function getRenderer(e) {
  const t = getCurrentInstance(), { props: o, slots: n, emit: a, proxy: l } = t, { $q: i } = l, r = useDark(o, i);
  function s(e2, t2, o2) {
    if (e2.__status = t2, "idle" === t2)
      return e2.__uploaded = 0, e2.__progress = 0, e2.__sizeLabel = humanStorageSize(e2.size), void (e2.__progressLabel = "0.00%");
    "failed" !== t2 ? (e2.__uploaded = "uploaded" === t2 ? e2.size : o2, e2.__progress = "uploaded" === t2 ? 1 : Math.min(0.9999, e2.__uploaded / e2.size), e2.__progressLabel = getProgressLabel(e2.__progress), l.$forceUpdate()) : l.$forceUpdate();
  }
  const u = computed(() => true !== o.disable && true !== o.readonly), c = ref(false), d = ref(null), p2 = ref(null), v = { files: ref([]), queuedFiles: ref([]), uploadedFiles: ref([]), uploadedSize: ref(0), updateFileStatus: s, isAlive: () => false === vmIsDestroyed(t) }, { pickFiles: m, addFiles: f, onDragover: g, onDragleave: b, processFiles: y, getDndNode: S, maxFilesNumber: w, maxTotalSizeNumber: C } = useFile({ editable: u, dnd: c, getFileInput: R, addFilesToQueue: D });
  Object.assign(v, e({ props: o, slots: n, emit: a, helpers: v })), void 0 === v.isBusy && (v.isBusy = ref(false));
  const x = ref(0), k = computed(() => 0 === x.value ? 0 : v.uploadedSize.value / x.value), _ = computed(() => getProgressLabel(k.value)), q = computed(() => humanStorageSize(x.value)), T = computed(() => true === u.value && true !== v.isUploading.value && (true === o.multiple || 0 === v.queuedFiles.value.length) && (void 0 === o.maxFiles || v.files.value.length < w.value) && (void 0 === o.maxTotalSize || x.value < C.value)), P = computed(() => true === u.value && true !== v.isBusy.value && true !== v.isUploading.value && v.queuedFiles.value.length > 0);
  provide(uploaderKey, I);
  const $ = computed(() => "q-uploader column no-wrap" + (true === r.value ? " q-uploader--dark q-dark" : "") + (true === o.bordered ? " q-uploader--bordered" : "") + (true === o.square ? " q-uploader--square no-border-radius" : "") + (true === o.flat ? " q-uploader--flat no-shadow" : "") + (true === o.disable ? " disabled q-uploader--disable" : "") + (true === c.value ? " q-uploader--dnd" : "")), M = computed(() => "q-uploader__header" + (void 0 !== o.color ? ` bg-${o.color}` : "") + (void 0 !== o.textColor ? ` text-${o.textColor}` : ""));
  function B() {
    false === o.disable && (v.abort(), v.uploadedSize.value = 0, x.value = 0, L(), v.files.value = [], v.queuedFiles.value = [], v.uploadedFiles.value = []);
  }
  function Q() {
    false === o.disable && O(["uploaded"], () => {
      v.uploadedFiles.value = [];
    });
  }
  function E() {
    O(["idle", "failed"], ({ size: e2 }) => {
      x.value -= e2, v.queuedFiles.value = [];
    });
  }
  function O(e2, t2) {
    if (true === o.disable)
      return;
    const n2 = { files: [], size: 0 }, l2 = v.files.value.filter((t3) => {
      return -1 === e2.indexOf(t3.__status) || (n2.size += t3.size, n2.files.push(t3), void 0 !== t3.__img && window.URL.revokeObjectURL(t3.__img.src), false);
    });
    n2.files.length > 0 && (v.files.value = l2, t2(n2), a("removed", n2.files));
  }
  function A(e2) {
    o.disable || ("uploaded" === e2.__status ? v.uploadedFiles.value = v.uploadedFiles.value.filter((t2) => t2.__key !== e2.__key) : "uploading" === e2.__status ? e2.__abort() : x.value -= e2.size, v.files.value = v.files.value.filter((t2) => {
      return t2.__key !== e2.__key || (void 0 !== t2.__img && window.URL.revokeObjectURL(t2.__img.src), false);
    }), v.queuedFiles.value = v.queuedFiles.value.filter((t2) => t2.__key !== e2.__key), a("removed", [e2]));
  }
  function L() {
    v.files.value.forEach((e2) => {
      void 0 !== e2.__img && window.URL.revokeObjectURL(e2.__img.src);
    });
  }
  function R() {
    return p2.value || d.value.getElementsByClassName("q-uploader__input")[0];
  }
  function D(e2, t2) {
    const n2 = y(e2, t2, v.files.value, true), l2 = R();
    void 0 !== l2 && null !== l2 && (l2.value = ""), void 0 !== n2 && (n2.forEach((e3) => {
      if (v.updateFileStatus(e3, "idle"), x.value += e3.size, true !== o.noThumbnails && e3.type.toUpperCase().startsWith("IMAGE")) {
        const t3 = new Image();
        t3.src = window.URL.createObjectURL(e3), e3.__img = t3;
      }
    }), v.files.value = v.files.value.concat(n2), v.queuedFiles.value = v.queuedFiles.value.concat(n2), a("added", n2), true === o.autoUpload && v.upload());
  }
  function z() {
    true === P.value && v.upload();
  }
  function F(e2, t2, o2) {
    if (true === e2) {
      const e3 = { type: "a", key: t2, icon: i.iconSet.uploader[t2], flat: true, dense: true };
      let n2 = void 0;
      return "add" === t2 ? (e3.onClick = m, n2 = I) : e3.onClick = o2, h(QBtn, e3, n2);
    }
  }
  function I() {
    return h("input", { ref: p2, class: "q-uploader__input overflow-hidden absolute-full", tabindex: -1, type: "file", title: "", accept: o.accept, multiple: true === o.multiple ? "multiple" : void 0, capture: o.capture, onMousedown: stop, onClick: m, onChange: D });
  }
  function V() {
    return void 0 !== n.header ? n.header(H) : [h("div", { class: "q-uploader__header-content column" }, [h("div", { class: "flex flex-center no-wrap q-gutter-xs" }, [F(v.queuedFiles.value.length > 0, "removeQueue", E), F(v.uploadedFiles.value.length > 0, "removeUploaded", Q), true === v.isUploading.value ? h(QSpinner, { class: "q-uploader__spinner" }) : null, h("div", { class: "col column justify-center" }, [void 0 !== o.label ? h("div", { class: "q-uploader__title" }, [o.label]) : null, h("div", { class: "q-uploader__subtitle" }, [q.value + " / " + _.value])]), F(T.value, "add"), F(false === o.hideUploadBtn && true === P.value, "upload", v.upload), F(v.isUploading.value, "clear", v.abort)])])];
  }
  function N() {
    return void 0 !== n.list ? n.list(H) : v.files.value.map((e2) => h("div", { key: e2.__key, class: "q-uploader__file relative-position" + (true !== o.noThumbnails && void 0 !== e2.__img ? " q-uploader__file--img" : "") + ("failed" === e2.__status ? " q-uploader__file--failed" : "uploaded" === e2.__status ? " q-uploader__file--uploaded" : ""), style: true !== o.noThumbnails && void 0 !== e2.__img ? { backgroundImage: 'url("' + e2.__img.src + '")' } : null }, [h("div", { class: "q-uploader__file-header row flex-center no-wrap" }, ["failed" === e2.__status ? h(QIcon, { class: "q-uploader__file-status", name: i.iconSet.type.negative, color: "negative" }) : null, h("div", { class: "q-uploader__file-header-content col" }, [h("div", { class: "q-uploader__title" }, [e2.name]), h("div", { class: "q-uploader__subtitle row items-center no-wrap" }, [e2.__sizeLabel + " / " + e2.__progressLabel])]), "uploading" === e2.__status ? h(QCircularProgress, { value: e2.__progress, min: 0, max: 1, indeterminate: 0 === e2.__progress }) : h(QBtn, { round: true, dense: true, flat: true, icon: i.iconSet.uploader["uploaded" === e2.__status ? "done" : "clear"], onClick: () => {
      A(e2);
    } })])]));
  }
  watch(v.isUploading, (e2, t2) => {
    false === t2 && true === e2 ? a("start") : true === t2 && false === e2 && a("finish");
  }), onBeforeUnmount(() => {
    true === v.isUploading.value && v.abort(), v.files.value.length > 0 && L();
  });
  const H = {};
  for (const h2 in v)
    true === isRef(v[h2]) ? injectProp(H, h2, () => v[h2].value) : H[h2] = v[h2];
  return Object.assign(H, { upload: z, reset: B, removeUploadedFiles: Q, removeQueuedFiles: E, removeFile: A, pickFiles: m, addFiles: f }), injectMultipleProps(H, { canAddFiles: () => T.value, canUpload: () => P.value, uploadSizeLabel: () => q.value, uploadProgressLabel: () => _.value }), Object.assign(l, H), () => {
    const e2 = [h("div", { class: M.value }, V()), h("div", { class: "q-uploader__list scroll" }, N()), S("uploader")];
    true === v.isBusy.value && e2.push(h("div", { class: "q-uploader__overlay absolute-full flex flex-center" }, [h(QSpinner)]));
    const t2 = { ref: d, class: $.value };
    return true === T.value && Object.assign(t2, { onDragover: g, onDragleave: b }), h("div", t2, e2);
  };
}
const trueFn = () => true;
function getEmitsObject(e) {
  const t = {};
  return e.forEach((e2) => {
    t[e2] = trueFn;
  }), t;
}
const coreEmitsObject = getEmitsObject(coreEmits);
var createUploaderComponent = ({ name: e, props: t, emits: o, injectPlugin: n }) => createComponent({ name: e, props: { ...coreProps, ...t }, emits: true === isObject(o) ? { ...coreEmitsObject, ...o } : [...coreEmits, ...o], setup() {
  return getRenderer(n);
} });
function getFn(e) {
  return "function" === typeof e ? e : () => e;
}
const props$2 = { url: [Function, String], method: { type: [Function, String], default: "POST" }, fieldName: { type: [Function, String], default: () => {
  return (e) => e.name;
} }, headers: [Function, Array], formFields: [Function, Array], withCredentials: [Function, Boolean], sendRaw: [Function, Boolean], batch: [Function, Boolean], factory: Function }, emits$1 = ["factory-failed", "uploaded", "failed", "uploading"];
function injectPlugin({ props: e, emit: t, helpers: o }) {
  const n = ref([]), a = ref([]), l = ref(0), i = computed(() => ({ url: getFn(e.url), method: getFn(e.method), headers: getFn(e.headers), formFields: getFn(e.formFields), fieldName: getFn(e.fieldName), withCredentials: getFn(e.withCredentials), sendRaw: getFn(e.sendRaw), batch: getFn(e.batch) })), r = computed(() => l.value > 0), s = computed(() => a.value.length > 0);
  let u;
  function c() {
    n.value.forEach((e2) => {
      e2.abort();
    }), a.value.length > 0 && (u = true);
  }
  function d() {
    const e2 = o.queuedFiles.value.slice(0);
    o.queuedFiles.value = [], i.value.batch(e2) ? p2(e2) : e2.forEach((e3) => {
      p2([e3]);
    });
  }
  function p2(n2) {
    if (l.value++, "function" !== typeof e.factory)
      return void v(n2, {});
    const i2 = e.factory(n2);
    if (i2)
      if ("function" === typeof i2.catch && "function" === typeof i2.then) {
        a.value.push(i2);
        const e2 = (e3) => {
          true === o.isAlive() && (a.value = a.value.filter((e4) => e4 !== i2), 0 === a.value.length && (u = false), o.queuedFiles.value = o.queuedFiles.value.concat(n2), n2.forEach((e4) => {
            o.updateFileStatus(e4, "failed");
          }), t("factory-failed", e3, n2), l.value--);
        };
        i2.then((t2) => {
          true === u ? e2(new Error("Aborted")) : true === o.isAlive() && (a.value = a.value.filter((e3) => e3 !== i2), v(n2, t2));
        }).catch(e2);
      } else
        v(n2, i2 || {});
    else
      t("factory-failed", new Error("QUploader: factory() does not return properly"), n2), l.value--;
  }
  function v(e2, a2) {
    const r2 = new FormData(), s2 = new XMLHttpRequest(), u2 = (e3, t2) => {
      return void 0 !== a2[e3] ? getFn(a2[e3])(t2) : i.value[e3](t2);
    }, c2 = u2("url", e2);
    if (!c2)
      return console.error("q-uploader: invalid or no URL specified"), void l.value--;
    const d2 = u2("formFields", e2);
    void 0 !== d2 && d2.forEach((e3) => {
      r2.append(e3.name, e3.value);
    });
    let p3, v2 = 0, m = 0, f = 0, h2 = 0;
    s2.upload.addEventListener("progress", (t2) => {
      if (true === p3)
        return;
      const n2 = Math.min(h2, t2.loaded);
      o.uploadedSize.value += n2 - f, f = n2;
      let a3 = f - m;
      for (let l2 = v2; a3 > 0 && l2 < e2.length; l2++) {
        const t3 = e2[l2], n3 = a3 > t3.size;
        if (!n3)
          return void o.updateFileStatus(t3, "uploading", a3);
        a3 -= t3.size, v2++, m += t3.size, o.updateFileStatus(t3, "uploading", t3.size);
      }
    }, false), s2.onreadystatechange = () => {
      s2.readyState < 4 || (s2.status && s2.status < 400 ? (o.uploadedFiles.value = o.uploadedFiles.value.concat(e2), e2.forEach((e3) => {
        o.updateFileStatus(e3, "uploaded");
      }), t("uploaded", { files: e2, xhr: s2 })) : (p3 = true, o.uploadedSize.value -= f, o.queuedFiles.value = o.queuedFiles.value.concat(e2), e2.forEach((e3) => {
        o.updateFileStatus(e3, "failed");
      }), t("failed", { files: e2, xhr: s2 })), l.value--, n.value = n.value.filter((e3) => e3 !== s2));
    }, s2.open(u2("method", e2), c2), true === u2("withCredentials", e2) && (s2.withCredentials = true);
    const g = u2("headers", e2);
    void 0 !== g && g.forEach((e3) => {
      s2.setRequestHeader(e3.name, e3.value);
    });
    const b = u2("sendRaw", e2);
    e2.forEach((e3) => {
      o.updateFileStatus(e3, "uploading", 0), true !== b && r2.append(u2("fieldName", e3), e3, e3.name), e3.xhr = s2, e3.__abort = () => {
        s2.abort();
      }, h2 += e3.size;
    }), t("uploading", { files: e2, xhr: s2 }), n.value.push(s2), true === b ? s2.send(new Blob(e2)) : s2.send(r2);
  }
  return { isUploading: r, isBusy: s, abort: c, upload: d };
}
var xhrUploaderPlugin = { name: "QUploader", props: props$2, emits: emits$1, injectPlugin }, QUploader = createUploaderComponent(xhrUploaderPlugin), QUploaderAddTrigger = createComponent({ name: "QUploaderAddTrigger", setup() {
  return inject(uploaderKey, () => {
    console.error("QUploaderAddTrigger needs to be child of QUploader");
  });
} }), QVideo = createComponent({ name: "QVideo", props: { ...useRatioProps, src: { type: String, required: true }, title: String, fetchpriority: { type: String, default: "auto" }, loading: { type: String, default: "eager" }, referrerpolicy: { type: String, default: "strict-origin-when-cross-origin" } }, setup(e) {
  const t = useRatio(e), o = computed(() => "q-video" + (void 0 !== e.ratio ? " q-video--responsive" : ""));
  return () => h("div", { class: o.value, style: t.value }, [h("iframe", { src: e.src, title: e.title, fetchpriority: e.fetchpriority, loading: e.loading, referrerpolicy: e.referrerpolicy, frameborder: "0", allowfullscreen: true })]);
} });
Object.freeze({ __proto__: null, QAjaxBar, QAvatar, QBadge, QBanner, QBar, QBreadcrumbs, QBreadcrumbsEl, QBtn, QBtnDropdown, QBtnGroup, QBtnToggle, QCard, QCardSection, QCardActions, QCarousel, QCarouselSlide, QCarouselControl, QChatMessage, QCheckbox, QChip, QCircularProgress, QColor, QDate, QDialog, QDrawer, QEditor, QExpansionItem, QFab, QFabAction, QField, QFile, QFooter, QForm, QFormChildMixin, QHeader, QIcon, QImg, QInfiniteScroll, QInnerLoading, QInput, QIntersection, QList, QItem, QItemSection, QItemLabel, QKnob, QLayout, QMarkupTable, QMenu, QNoSsr, QOptionGroup, QPage, QPageContainer, QPageScroller, QPageSticky, QPagination, QParallax, QPopupEdit, QPopupProxy, QLinearProgress, QPullToRefresh, QRadio, QRange, QRating, QResizeObserver, QResponsive, QScrollArea, QScrollObserver, QSelect, QSeparator, QSkeleton, QSlideItem, QSlideTransition, QSlider, QSpace, QSpinner, QSpinnerAudio, QSpinnerBall, QSpinnerBars, QSpinnerBox, QSpinnerClock, QSpinnerComment, QSpinnerCube, QSpinnerDots, QSpinnerFacebook, QSpinnerGears, QSpinnerGrid, QSpinnerHearts, QSpinnerHourglass, QSpinnerInfinity, QSpinnerIos, QSpinnerOrbit, QSpinnerOval, QSpinnerPie, QSpinnerPuff, QSpinnerRadio, QSpinnerRings, QSpinnerTail, QSplitter, QStep, QStepper, QStepperNavigation, QTabPanels, QTabPanel, QTable, QTh, QTr, QTd, QTabs, QTab, QRouteTab, QTime, QTimeline, QTimelineEntry, QToggle, QToolbar, QToolbarTitle, QTooltip, QTree, QUploader, QUploaderAddTrigger, QVideo, QVirtualScroll });
function getDepth(e) {
  if (false === e)
    return 0;
  if (true === e || void 0 === e)
    return 1;
  const t = parseInt(e, 10);
  return isNaN(t) ? 0 : t;
}
var ClosePopup = createDirective({ name: "close-popup", beforeMount(e, { value: t }) {
  const o = { depth: getDepth(t), handler(t2) {
    0 !== o.depth && setTimeout(() => {
      const n = getPortalProxy(e);
      void 0 !== n && closePortals(n, t2, o.depth);
    });
  }, handlerKey(e2) {
    true === isKeyCode(e2, 13) && o.handler(e2);
  } };
  e.__qclosepopup = o, e.addEventListener("click", o.handler), e.addEventListener("keyup", o.handlerKey);
}, updated(e, { value: t, oldValue: o }) {
  t !== o && (e.__qclosepopup.depth = getDepth(t));
}, beforeUnmount(e) {
  const t = e.__qclosepopup;
  e.removeEventListener("click", t.handler), e.removeEventListener("keyup", t.handlerKey), delete e.__qclosepopup;
} });
let id = 0, offsetBase = void 0;
function getAbsolutePosition(e, t) {
  void 0 === offsetBase && (offsetBase = document.createElement("div"), offsetBase.style.cssText = "position: absolute; left: 0; top: 0", document.body.appendChild(offsetBase));
  const o = e.getBoundingClientRect(), n = offsetBase.getBoundingClientRect(), { marginLeft: a, marginRight: l, marginTop: i, marginBottom: r } = window.getComputedStyle(e), s = parseInt(a, 10) + parseInt(l, 10), u = parseInt(i, 10) + parseInt(r, 10);
  return { left: o.left - n.left, top: o.top - n.top, width: o.right - o.left, height: o.bottom - o.top, widthM: o.right - o.left + (true === t ? 0 : s), heightM: o.bottom - o.top + (true === t ? 0 : u), marginH: true === t ? s : 0, marginV: true === t ? u : 0 };
}
function getAbsoluteSize(e) {
  return { width: e.scrollWidth, height: e.scrollHeight };
}
const styleEdges = ["Top", "Right", "Bottom", "Left"], styleBorderRadiuses = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], reStyleSkipKey = /-block|-inline|block-|inline-/, reStyleSkipRule = /(-block|-inline|block-|inline-).*:/;
function getComputedStyle$1(e, t) {
  const o = window.getComputedStyle(e), n = {};
  for (let a = 0; a < t.length; a++) {
    const e2 = t[a];
    if ("" === o[e2])
      if ("cssText" === e2) {
        const t2 = o.length;
        let a2 = "";
        for (let e3 = 0; e3 < t2; e3++)
          true !== reStyleSkipKey.test(o[e3]) && (a2 += o[e3] + ": " + o[o[e3]] + "; ");
        n[e2] = a2;
      } else if (["borderWidth", "borderStyle", "borderColor"].indexOf(e2) > -1) {
        const t2 = e2.replace("border", "");
        let a2 = "";
        for (let e3 = 0; e3 < styleEdges.length; e3++) {
          const n2 = "border" + styleEdges[e3] + t2;
          a2 += o[n2] + " ";
        }
        n[e2] = a2;
      } else if ("borderRadius" === e2) {
        let t2 = "", a2 = "";
        for (let e3 = 0; e3 < styleBorderRadiuses.length; e3++) {
          const n2 = o[styleBorderRadiuses[e3]].split(" ");
          t2 += n2[0] + " ", a2 += (void 0 === n2[1] ? n2[0] : n2[1]) + " ";
        }
        n[e2] = t2 + "/ " + a2;
      } else
        n[e2] = o[e2];
    else
      n[e2] = "cssText" === e2 ? o[e2].split(";").filter((e3) => true !== reStyleSkipRule.test(e3)).join(";") : o[e2];
  }
  return n;
}
const zIndexPositions = ["absolute", "fixed", "relative", "sticky"];
function getMaxZIndex(e) {
  let t = e, o = 0;
  while (null !== t && t !== document) {
    const { position: n, zIndex: a } = window.getComputedStyle(t), l = Number(a);
    l > o && (t === e || true === zIndexPositions.includes(n)) && (o = l), t = t.parentNode;
  }
  return o;
}
function normalizeElements(e) {
  return { from: e.from, to: void 0 !== e.to ? e.to : e.from };
}
function normalizeOptions(e) {
  return "number" === typeof e ? e = { duration: e } : "function" === typeof e && (e = { onEnd: e }), { ...e, waitFor: void 0 === e.waitFor ? 0 : e.waitFor, duration: true === isNaN(e.duration) ? 300 : parseInt(e.duration, 10), easing: "string" === typeof e.easing && e.easing.length > 0 ? e.easing : "ease-in-out", delay: true === isNaN(e.delay) ? 0 : parseInt(e.delay, 10), fill: "string" === typeof e.fill && e.fill.length > 0 ? e.fill : "none", resize: true === e.resize, useCSS: true === e.useCSS, hideFromClone: true === e.hideFromClone, keepToClone: true === e.keepToClone, tween: true === e.tween, tweenFromOpacity: true === isNaN(e.tweenFromOpacity) ? 0.6 : parseFloat(e.tweenFromOpacity), tweenToOpacity: true === isNaN(e.tweenToOpacity) ? 0.5 : parseFloat(e.tweenToOpacity) };
}
function getElement(e) {
  const t = typeof e;
  return "function" === t ? e() : "string" === t ? document.querySelector(e) : e;
}
function isValidElement(e) {
  return e && e.ownerDocument === document && null !== e.parentNode;
}
function morph(e) {
  let t = () => false, o = false, n = true;
  const a = normalizeElements(e), l = normalizeOptions(e), i = getElement(a.from);
  if (true !== isValidElement(i))
    return t;
  "function" === typeof i.qMorphCancel && i.qMorphCancel();
  let r = void 0, s = void 0, u = void 0, c = void 0;
  const d = i.parentNode, p2 = i.nextElementSibling, v = getAbsolutePosition(i, l.resize), { width: m, height: f } = getAbsoluteSize(d), { borderWidth: h2, borderStyle: g, borderColor: b, borderRadius: y, backgroundColor: S, transform: w, position: C, cssText: x } = getComputedStyle$1(i, ["borderWidth", "borderStyle", "borderColor", "borderRadius", "backgroundColor", "transform", "position", "cssText"]), k = i.classList.toString(), _ = i.style.cssText, q = i.cloneNode(true), T = true === l.tween ? i.cloneNode(true) : void 0;
  void 0 !== T && (T.className = T.classList.toString().split(" ").filter((e2) => false === /^bg-/.test(e2)).join(" ")), true === l.hideFromClone && q.classList.add("q-morph--internal"), q.setAttribute("aria-hidden", "true"), q.style.transition = "none", q.style.animation = "none", q.style.pointerEvents = "none", d.insertBefore(q, p2), i.qMorphCancel = () => {
    o = true, q.remove(), void 0 !== T && T.remove(), true === l.hideFromClone && q.classList.remove("q-morph--internal"), i.qMorphCancel = void 0;
  };
  const P = () => {
    const e2 = getElement(a.to);
    if (true === o || true !== isValidElement(e2))
      return void ("function" === typeof i.qMorphCancel && i.qMorphCancel());
    i !== e2 && "function" === typeof e2.qMorphCancel && e2.qMorphCancel(), true !== l.keepToClone && e2.classList.add("q-morph--internal"), q.classList.add("q-morph--internal");
    const { width: p3, height: P2 } = getAbsoluteSize(d), { width: $, height: M } = getAbsoluteSize(e2.parentNode);
    true !== l.hideFromClone && q.classList.remove("q-morph--internal"), e2.qMorphCancel = () => {
      o = true, q.remove(), void 0 !== T && T.remove(), true === l.hideFromClone && q.classList.remove("q-morph--internal"), true !== l.keepToClone && e2.classList.remove("q-morph--internal"), i.qMorphCancel = void 0, e2.qMorphCancel = void 0;
    };
    const B = () => {
      if (true === o)
        return void ("function" === typeof e2.qMorphCancel && e2.qMorphCancel());
      true !== l.hideFromClone && (q.classList.add("q-morph--internal"), q.innerHTML = "", q.style.left = 0, q.style.right = "unset", q.style.top = 0, q.style.bottom = "unset", q.style.transform = "none"), true !== l.keepToClone && e2.classList.remove("q-morph--internal");
      const a2 = e2.parentNode, { width: B2, height: Q } = getAbsoluteSize(a2), E = e2.cloneNode(l.keepToClone);
      E.setAttribute("aria-hidden", "true"), true !== l.keepToClone && (E.style.left = 0, E.style.right = "unset", E.style.top = 0, E.style.bottom = "unset", E.style.transform = "none", E.style.pointerEvents = "none"), E.classList.add("q-morph--internal");
      const O = e2 === i && d === a2 ? q : e2.nextElementSibling;
      a2.insertBefore(E, O);
      const { borderWidth: A, borderStyle: L, borderColor: R, borderRadius: D, backgroundColor: z, transform: F, position: I, cssText: V } = getComputedStyle$1(e2, ["borderWidth", "borderStyle", "borderColor", "borderRadius", "backgroundColor", "transform", "position", "cssText"]), N = e2.classList.toString(), H = e2.style.cssText;
      e2.style.cssText = V, e2.style.transform = "none", e2.style.animation = "none", e2.style.transition = "none", e2.className = N.split(" ").filter((e3) => false === /^bg-/.test(e3)).join(" ");
      const j = getAbsolutePosition(e2, l.resize), U = v.left - j.left, K = v.top - j.top, W = v.width / (j.width > 0 ? j.width : 10), Y = v.height / (j.height > 0 ? j.height : 100), G = m - p3, X = f - P2, Z = B2 - $, J = Q - M, ee = Math.max(v.widthM, G), te = Math.max(v.heightM, X), oe = Math.max(j.widthM, Z), ne = Math.max(j.heightM, J), ae = i === e2 && false === ["absolute", "fixed"].includes(I) && false === ["absolute", "fixed"].includes(C);
      let le = "fixed" === I, ie = a2;
      while (true !== le && ie !== document)
        le = "fixed" === window.getComputedStyle(ie).position, ie = ie.parentNode;
      if (true !== l.hideFromClone && (q.style.display = "block", q.style.flex = "0 0 auto", q.style.opacity = 0, q.style.minWidth = "unset", q.style.maxWidth = "unset", q.style.minHeight = "unset", q.style.maxHeight = "unset", q.classList.remove("q-morph--internal")), true !== l.keepToClone && (E.style.display = "block", E.style.flex = "0 0 auto", E.style.opacity = 0, E.style.minWidth = "unset", E.style.maxWidth = "unset", E.style.minHeight = "unset", E.style.maxHeight = "unset"), E.classList.remove("q-morph--internal"), "string" === typeof l.classes && (e2.className += " " + l.classes), "string" === typeof l.style)
        e2.style.cssText += " " + l.style;
      else if (true === isObject(l.style))
        for (const t2 in l.style)
          e2.style[t2] = l.style[t2];
      const re = getMaxZIndex(q), se = getMaxZIndex(e2), ue = true === le ? document.documentElement : { scrollLeft: 0, scrollTop: 0 };
      e2.style.position = true === le ? "fixed" : "absolute", e2.style.left = `${j.left - ue.scrollLeft}px`, e2.style.right = "unset", e2.style.top = `${j.top - ue.scrollTop}px`, e2.style.margin = 0, true === l.resize && (e2.style.minWidth = "unset", e2.style.maxWidth = "unset", e2.style.minHeight = "unset", e2.style.maxHeight = "unset", e2.style.overflow = "hidden", e2.style.overflowX = "hidden", e2.style.overflowY = "hidden"), document.body.appendChild(e2), void 0 !== T && (T.style.cssText = x, T.style.transform = "none", T.style.animation = "none", T.style.transition = "none", T.style.position = e2.style.position, T.style.left = `${v.left - ue.scrollLeft}px`, T.style.right = "unset", T.style.top = `${v.top - ue.scrollTop}px`, T.style.margin = 0, T.style.pointerEvents = "none", true === l.resize && (T.style.minWidth = "unset", T.style.maxWidth = "unset", T.style.minHeight = "unset", T.style.maxHeight = "unset", T.style.overflow = "hidden", T.style.overflowX = "hidden", T.style.overflowY = "hidden"), document.body.appendChild(T));
      const ce = (o2) => {
        i === e2 && true !== n ? (e2.style.cssText = _, e2.className = k) : (e2.style.cssText = H, e2.className = N), E.parentNode === a2 && a2.insertBefore(e2, E), q.remove(), E.remove(), void 0 !== T && T.remove(), t = () => false, i.qMorphCancel = void 0, e2.qMorphCancel = void 0, "function" === typeof l.onEnd && l.onEnd(true === n ? "to" : "from", true === o2);
      };
      if (true !== l.useCSS && "function" === typeof e2.animate) {
        const a3 = true === l.resize ? { transform: `translate(${U}px, ${K}px)`, width: `${ee}px`, height: `${te}px` } : { transform: `translate(${U}px, ${K}px) scale(${W}, ${Y})` }, d2 = true === l.resize ? { width: `${oe}px`, height: `${ne}px` } : {}, p4 = true === l.resize ? { width: `${ee}px`, height: `${te}px` } : {}, m2 = true === l.resize ? { transform: `translate(${-1 * U}px, ${-1 * K}px)`, width: `${oe}px`, height: `${ne}px` } : { transform: `translate(${-1 * U}px, ${-1 * K}px) scale(${1 / W}, ${1 / Y})` }, f2 = void 0 !== T ? { opacity: l.tweenToOpacity } : { backgroundColor: S }, C2 = void 0 !== T ? { opacity: 1 } : { backgroundColor: z };
        c = e2.animate([{ margin: 0, borderWidth: h2, borderStyle: g, borderColor: b, borderRadius: y, zIndex: re, transformOrigin: "0 0", ...a3, ...f2 }, { margin: 0, borderWidth: A, borderStyle: L, borderColor: R, borderRadius: D, zIndex: se, transformOrigin: "0 0", transform: F, ...d2, ...C2 }], { duration: l.duration, easing: l.easing, fill: l.fill, delay: l.delay }), s = void 0 === T ? void 0 : T.animate([{ opacity: l.tweenFromOpacity, margin: 0, borderWidth: h2, borderStyle: g, borderColor: b, borderRadius: y, zIndex: re, transformOrigin: "0 0", transform: w, ...p4 }, { opacity: 0, margin: 0, borderWidth: A, borderStyle: L, borderColor: R, borderRadius: D, zIndex: se, transformOrigin: "0 0", ...m2 }], { duration: l.duration, easing: l.easing, fill: l.fill, delay: l.delay }), r = true === l.hideFromClone || true === ae ? void 0 : q.animate([{ margin: `${X < 0 ? X / 2 : 0}px ${G < 0 ? G / 2 : 0}px`, width: `${ee + v.marginH}px`, height: `${te + v.marginV}px` }, { margin: 0, width: 0, height: 0 }], { duration: l.duration, easing: l.easing, fill: l.fill, delay: l.delay }), u = true === l.keepToClone ? void 0 : E.animate([true === ae ? { margin: `${X < 0 ? X / 2 : 0}px ${G < 0 ? G / 2 : 0}px`, width: `${ee + v.marginH}px`, height: `${te + v.marginV}px` } : { margin: 0, width: 0, height: 0 }, { margin: `${J < 0 ? J / 2 : 0}px ${Z < 0 ? Z / 2 : 0}px`, width: `${oe + j.marginH}px`, height: `${ne + j.marginV}px` }], { duration: l.duration, easing: l.easing, fill: l.fill, delay: l.delay });
        const x2 = (e3) => {
          void 0 !== r && r.cancel(), void 0 !== s && s.cancel(), void 0 !== u && u.cancel(), c.cancel(), c.removeEventListener("finish", x2), c.removeEventListener("cancel", x2), ce(e3), r = void 0, s = void 0, u = void 0, c = void 0;
        };
        i.qMorphCancel = () => {
          i.qMorphCancel = void 0, o = true, x2();
        }, e2.qMorphCancel = () => {
          e2.qMorphCancel = void 0, o = true, x2();
        }, c.addEventListener("finish", x2), c.addEventListener("cancel", x2), t = (e3) => {
          return true !== o && void 0 !== c && (true === e3 ? (x2(true), true) : (n = true !== n, void 0 !== r && r.reverse(), void 0 !== s && s.reverse(), void 0 !== u && u.reverse(), c.reverse(), true));
        };
      } else {
        const a3 = `q-morph-anim-${++id}`, r2 = document.createElement("style"), s2 = true === l.resize ? `
            transform: translate(${U}px, ${K}px);
            width: ${ee}px;
            height: ${te}px;
          ` : `transform: translate(${U}px, ${K}px) scale(${W}, ${Y});`, u2 = true === l.resize ? `
            width: ${oe}px;
            height: ${ne}px;
          ` : "", c2 = true === l.resize ? `
            width: ${ee}px;
            height: ${te}px;
          ` : "", d2 = true === l.resize ? `
            transform: translate(${-1 * U}px, ${-1 * K}px);
            width: ${oe}px;
            height: ${ne}px;
          ` : `transform: translate(${-1 * U}px, ${-1 * K}px) scale(${1 / W}, ${1 / Y});`, p4 = void 0 !== T ? `opacity: ${l.tweenToOpacity};` : `background-color: ${S};`, m2 = void 0 !== T ? "opacity: 1;" : `background-color: ${z};`, f2 = void 0 === T ? "" : `
            @keyframes ${a3}-from-tween {
              0% {
                opacity: ${l.tweenFromOpacity};
                margin: 0;
                border-width: ${h2};
                border-style: ${g};
                border-color: ${b};
                border-radius: ${y};
                z-index: ${re};
                transform-origin: 0 0;
                transform: ${w};
                ${c2}
              }

              100% {
                opacity: 0;
                margin: 0;
                border-width: ${A};
                border-style: ${L};
                border-color: ${R};
                border-radius: ${D};
                z-index: ${se};
                transform-origin: 0 0;
                ${d2}
              }
            }
          `, C2 = true === l.hideFromClone || true === ae ? "" : `
            @keyframes ${a3}-from {
              0% {
                margin: ${X < 0 ? X / 2 : 0}px ${G < 0 ? G / 2 : 0}px;
                width: ${ee + v.marginH}px;
                height: ${te + v.marginV}px;
              }

              100% {
                margin: 0;
                width: 0;
                height: 0;
              }
            }
          `, x2 = true === ae ? `
            margin: ${X < 0 ? X / 2 : 0}px ${G < 0 ? G / 2 : 0}px;
            width: ${ee + v.marginH}px;
            height: ${te + v.marginV}px;
          ` : "\n            margin: 0;\n            width: 0;\n            height: 0;\n          ", k2 = true === l.keepToClone ? "" : `
            @keyframes ${a3}-to {
              0% {
                ${x2}
              }

              100% {
                margin: ${J < 0 ? J / 2 : 0}px ${Z < 0 ? Z / 2 : 0}px;
                width: ${oe + j.marginH}px;
                height: ${ne + j.marginV}px;
              }
            }
          `;
        r2.innerHTML = `
          @keyframes ${a3} {
            0% {
              margin: 0;
              border-width: ${h2};
              border-style: ${g};
              border-color: ${b};
              border-radius: ${y};
              background-color: ${S};
              z-index: ${re};
              transform-origin: 0 0;
              ${s2}
              ${p4}
            }

            100% {
              margin: 0;
              border-width: ${A};
              border-style: ${L};
              border-color: ${R};
              border-radius: ${D};
              background-color: ${z};
              z-index: ${se};
              transform-origin: 0 0;
              transform: ${F};
              ${u2}
              ${m2}
            }
          }

          ${C2}

          ${f2}

          ${k2}
        `, document.head.appendChild(r2);
        let _2 = "normal";
        q.style.animation = `${l.duration}ms ${l.easing} ${l.delay}ms ${_2} ${l.fill} ${a3}-from`, void 0 !== T && (T.style.animation = `${l.duration}ms ${l.easing} ${l.delay}ms ${_2} ${l.fill} ${a3}-from-tween`), E.style.animation = `${l.duration}ms ${l.easing} ${l.delay}ms ${_2} ${l.fill} ${a3}-to`, e2.style.animation = `${l.duration}ms ${l.easing} ${l.delay}ms ${_2} ${l.fill} ${a3}`;
        const P3 = (t2) => {
          t2 === Object(t2) && t2.animationName !== a3 || (e2.removeEventListener("animationend", P3), e2.removeEventListener("animationcancel", P3), ce(), r2.remove());
        };
        i.qMorphCancel = () => {
          i.qMorphCancel = void 0, o = true, P3();
        }, e2.qMorphCancel = () => {
          e2.qMorphCancel = void 0, o = true, P3();
        }, e2.addEventListener("animationend", P3), e2.addEventListener("animationcancel", P3), t = (t2) => {
          return !!(true !== o && e2 && q && E) && (true === t2 ? (P3(), true) : (n = true !== n, _2 = "normal" === _2 ? "reverse" : "normal", q.style.animationDirection = _2, T.style.animationDirection = _2, E.style.animationDirection = _2, e2.style.animationDirection = _2, true));
        };
      }
    };
    if (l.waitFor > 0 || "transitionend" === l.waitFor || l.waitFor === Object(l.waitFor) && "function" === typeof l.waitFor.then) {
      const t2 = l.waitFor > 0 ? new Promise((e3) => setTimeout(e3, l.waitFor)) : "transitionend" === l.waitFor ? new Promise((t3) => {
        const o2 = setTimeout(() => {
          n2();
        }, 400), n2 = (a2) => {
          clearTimeout(o2), e2 && (e2.removeEventListener("transitionend", n2), e2.removeEventListener("transitioncancel", n2)), t3();
        };
        e2.addEventListener("transitionend", n2), e2.addEventListener("transitioncancel", n2);
      }) : l.waitFor;
      t2.then(B).catch(() => {
        "function" === typeof e2.qMorphCancel && e2.qMorphCancel();
      });
    } else
      B();
  };
  return "function" === typeof e.onToggle && e.onToggle(), requestAnimationFrame(P), (e2) => t(e2);
}
const morphGroups = {}, props$1 = ["duration", "delay", "easing", "fill", "classes", "style", "duration", "resize", "useCSS", "hideFromClone", "keepToClone", "tween", "tweenFromOpacity", "tweenToOpacity", "waitFor", "onEnd"], mods = ["resize", "useCSS", "hideFromClone", "keepToClone", "tween"];
function changeClass(e, t) {
  e.clsAction !== t && (e.clsAction = t, e.el.classList[t]("q-morph--invisible"));
}
function trigger(e) {
  if (true === e.animating || e.queue.length < 2)
    return;
  const [t, o] = e.queue;
  e.animating = true, t.animating = true, o.animating = true, changeClass(t, "remove"), changeClass(o, "remove");
  const n = morph({ from: t.el, to: o.el, onToggle() {
    changeClass(t, "add"), changeClass(o, "remove");
  }, ...o.opts, onEnd(n2, a) {
    void 0 !== o.opts.onEnd && o.opts.onEnd(n2, a), true !== a && (t.animating = false, o.animating = false, e.animating = false, e.cancel = void 0, e.queue.shift(), trigger(e));
  } });
  e.cancel = () => {
    n(true), e.cancel = void 0;
  };
}
function updateModifiers(e, t) {
  const o = t.opts;
  mods.forEach((t2) => {
    o[t2] = true === e[t2];
  });
}
function insertArgs(e, t) {
  const o = "string" === typeof e && e.length > 0 ? e.split(":") : [];
  t.name = o[0], t.group = o[1], Object.assign(t.opts, { duration: true === isNaN(o[2]) ? 300 : parseFloat(o[2]), waitFor: o[3] });
}
function updateArgs(e, t) {
  void 0 !== e.group && (t.group = e.group), void 0 !== e.name && (t.name = e.name);
  const o = t.opts;
  props$1.forEach((t2) => {
    void 0 !== e[t2] && (o[t2] = e[t2]);
  });
}
function updateModel(e, t) {
  if (t.name !== e)
    false === t.animating && changeClass(t, "add");
  else {
    const o = morphGroups[t.group];
    void 0 === o ? (morphGroups[t.group] = { name: t.group, model: e, queue: [t], animating: false }, changeClass(t, "remove")) : o.model !== e && (o.model = e, o.queue.push(t), false === o.animating && 2 === o.queue.length && trigger(o));
  }
}
function updateValue(e, t) {
  let o;
  Object(t) === t ? (o = "" + t.model, updateArgs(t, e), updateModifiers(t, e)) : o = "" + t, o !== e.model ? (e.model = o, updateModel(o, e)) : false === e.animating && void 0 !== e.clsAction && e.el.classList[e.clsAction]("q-morph--invisible");
}
var Morph = createDirective({ name: "morph", mounted(e, t) {
  const o = { el: e, animating: false, opts: {} };
  updateModifiers(t.modifiers, o), insertArgs(t.arg, o), updateValue(o, t.value), e.__qmorph = o;
}, updated(e, t) {
  updateValue(e.__qmorph, t.value);
}, beforeUnmount(e) {
  const t = e.__qmorph, o = morphGroups[t.group];
  if (void 0 !== o) {
    const e2 = o.queue.indexOf(t);
    -1 !== e2 && (o.queue = o.queue.filter((e3) => e3 !== t), 0 === o.queue.length && (void 0 !== o.cancel && o.cancel(), delete morphGroups[t.group]));
  }
  "add" === t.clsAction && e.classList.remove("q-morph--invisible"), delete e.__qmorph;
} });
const defaultCfg = { childList: true, subtree: true, attributes: true, characterData: true, attributeOldValue: true, characterDataOldValue: true };
function update$2(e, t, o) {
  t.handler = o, void 0 !== t.observer && t.observer.disconnect(), t.observer = new MutationObserver((o2) => {
    if ("function" === typeof t.handler) {
      const n = t.handler(o2);
      false !== n && true !== t.once || destroy(e);
    }
  }), t.observer.observe(e, t.opts);
}
function destroy(e) {
  const t = e.__qmutation;
  void 0 !== t && (void 0 !== t.observer && t.observer.disconnect(), delete e.__qmutation);
}
var Mutation = createDirective({ name: "mutation", mounted(e, { modifiers: { once: t, ...o }, value: n }) {
  const a = { once: t, opts: 0 === Object.keys(o).length ? defaultCfg : o };
  update$2(e, a, n), e.__qmutation = a;
}, updated(e, { oldValue: t, value: o }) {
  const n = e.__qmutation;
  void 0 !== n && t !== o && update$2(e, n, o);
}, beforeUnmount: destroy });
const { passive } = listenOpts;
function update$1(e, { value: t, oldValue: o }) {
  "function" === typeof t ? (e.handler = t, "function" !== typeof o && (e.scrollTarget.addEventListener("scroll", e.scroll, passive), e.scroll())) : e.scrollTarget.removeEventListener("scroll", e.scroll, passive);
}
var ScrollFire = createDirective({ name: "scroll-fire", mounted(e, t) {
  const o = { scrollTarget: getScrollTarget(e), scroll: debounce(() => {
    let t2, n;
    o.scrollTarget === window ? (n = e.getBoundingClientRect().bottom, t2 = window.innerHeight) : (n = offset(e).top + height(e), t2 = offset(o.scrollTarget).top + height(o.scrollTarget)), n > 0 && n < t2 && (o.scrollTarget.removeEventListener("scroll", o.scroll, passive), o.handler(e));
  }, 25) };
  update$1(o, t), e.__qscrollfire = o;
}, updated(e, t) {
  t.value !== t.oldValue && update$1(e.__qscrollfire, t);
}, beforeUnmount(e) {
  const t = e.__qscrollfire;
  t.scrollTarget.removeEventListener("scroll", t.scroll, passive), t.scroll.cancel(), delete e.__qscrollfire;
} });
function update(e, { value: t, oldValue: o }) {
  "function" === typeof t ? (e.handler = t, "function" !== typeof o && e.scrollTarget.addEventListener("scroll", e.scroll, listenOpts.passive)) : e.scrollTarget.removeEventListener("scroll", e.scroll, listenOpts.passive);
}
var Scroll = createDirective({ name: "scroll", mounted(e, t) {
  const o = { scrollTarget: getScrollTarget(e), scroll() {
    o.handler(getVerticalScrollPosition(o.scrollTarget), getHorizontalScrollPosition(o.scrollTarget));
  } };
  update(o, t), e.__qscroll = o;
}, updated(e, t) {
  void 0 !== e.__qscroll && t.oldValue !== t.value && update(e.__qscroll, t);
}, beforeUnmount(e) {
  const t = e.__qscroll;
  t.scrollTarget.removeEventListener("scroll", t.scroll, listenOpts.passive), delete e.__qscroll;
} }), TouchHold = createDirective({ name: "touch-hold", beforeMount(e, t) {
  const { modifiers: o } = t;
  if (true !== o.mouse && true !== client.has.touch)
    return;
  const n = { handler: t.value, noop, mouseStart(e2) {
    "function" === typeof n.handler && true === leftClick(e2) && (addEvt(n, "temp", [[document, "mousemove", "move", "passiveCapture"], [document, "click", "end", "notPassiveCapture"]]), n.start(e2, true));
  }, touchStart(e2) {
    if (void 0 !== e2.target && "function" === typeof n.handler) {
      const t2 = e2.target;
      addEvt(n, "temp", [[t2, "touchmove", "move", "passiveCapture"], [t2, "touchcancel", "end", "notPassiveCapture"], [t2, "touchend", "end", "notPassiveCapture"]]), n.start(e2);
    }
  }, start(e2, t2) {
    n.origin = position(e2);
    const o2 = Date.now();
    true === client.is.mobile && (document.body.classList.add("non-selectable"), clearSelection(), n.styleCleanup = (e3) => {
      n.styleCleanup = void 0;
      const t3 = () => {
        document.body.classList.remove("non-selectable");
      };
      true === e3 ? (clearSelection(), setTimeout(t3, 10)) : t3();
    }), n.triggered = false, n.sensitivity = true === t2 ? n.mouseSensitivity : n.touchSensitivity, n.timer = setTimeout(() => {
      clearSelection(), n.triggered = true, n.handler({ evt: e2, touch: true !== t2, mouse: true === t2, position: n.origin, duration: Date.now() - o2 });
    }, n.duration);
  }, move(e2) {
    const { top: t2, left: o2 } = position(e2);
    (Math.abs(o2 - n.origin.left) >= n.sensitivity || Math.abs(t2 - n.origin.top) >= n.sensitivity) && clearTimeout(n.timer);
  }, end(e2) {
    cleanEvt(n, "temp"), void 0 !== n.styleCleanup && n.styleCleanup(n.triggered), true === n.triggered ? void 0 !== e2 && stopAndPrevent(e2) : clearTimeout(n.timer);
  } }, a = [600, 5, 7];
  "string" === typeof t.arg && t.arg.length > 0 && t.arg.split(":").forEach((e2, t2) => {
    const o2 = parseInt(e2, 10);
    o2 && (a[t2] = o2);
  }), [n.duration, n.touchSensitivity, n.mouseSensitivity] = a, e.__qtouchhold = n, true === o.mouse && addEvt(n, "main", [[e, "mousedown", "mouseStart", `passive${true === o.mouseCapture ? "Capture" : ""}`]]), true === client.has.touch && addEvt(n, "main", [[e, "touchstart", "touchStart", `passive${true === o.capture ? "Capture" : ""}`], [e, "touchend", "noop", "notPassiveCapture"]]);
}, updated(e, t) {
  const o = e.__qtouchhold;
  void 0 !== o && t.oldValue !== t.value && ("function" !== typeof t.value && o.end(), o.handler = t.value);
}, beforeUnmount(e) {
  const t = e.__qtouchhold;
  void 0 !== t && (cleanEvt(t, "main"), cleanEvt(t, "temp"), clearTimeout(t.timer), void 0 !== t.styleCleanup && t.styleCleanup(), delete e.__qtouchhold);
} });
const keyCodes = { esc: 27, tab: 9, enter: 13, space: 32, up: 38, left: 37, right: 39, down: 40, delete: [8, 46] }, keyRegex = new RegExp(`^([\\d+]+|${Object.keys(keyCodes).join("|")})$`, "i");
function shouldEnd(e, t) {
  const { top: o, left: n } = position(e);
  return Math.abs(n - t.left) >= 7 || Math.abs(o - t.top) >= 7;
}
var TouchRepeat = createDirective({ name: "touch-repeat", beforeMount(e, { modifiers: t, value: o, arg: n }) {
  const a = Object.keys(t).reduce((e2, t2) => {
    if (true === keyRegex.test(t2)) {
      const o2 = isNaN(parseInt(t2, 10)) ? keyCodes[t2.toLowerCase()] : parseInt(t2, 10);
      o2 >= 0 && e2.push(o2);
    }
    return e2;
  }, []);
  if (true !== t.mouse && true !== client.has.touch && 0 === a.length)
    return;
  const l = "string" === typeof n && n.length > 0 ? n.split(":").map((e2) => parseInt(e2, 10)) : [0, 600, 300], i = l.length - 1, r = { keyboard: a, handler: o, noop, mouseStart(e2) {
    void 0 === r.event && "function" === typeof r.handler && true === leftClick(e2) && (addEvt(r, "temp", [[document, "mousemove", "move", "passiveCapture"], [document, "click", "end", "notPassiveCapture"]]), r.start(e2, true));
  }, keyboardStart(t2) {
    if ("function" === typeof r.handler && true === isKeyCode(t2, a)) {
      if ((0 === l[0] || void 0 !== r.event) && (stopAndPrevent(t2), e.focus(), void 0 !== r.event))
        return;
      addEvt(r, "temp", [[document, "keyup", "end", "notPassiveCapture"], [document, "click", "end", "notPassiveCapture"]]), r.start(t2, false, true);
    }
  }, touchStart(e2) {
    if (void 0 !== e2.target && "function" === typeof r.handler) {
      const t2 = e2.target;
      addEvt(r, "temp", [[t2, "touchmove", "move", "passiveCapture"], [t2, "touchcancel", "end", "notPassiveCapture"], [t2, "touchend", "end", "notPassiveCapture"]]), r.start(e2);
    }
  }, start(e2, t2, o2) {
    function n2(e3) {
      r.styleCleanup = void 0, document.documentElement.style.cursor = "";
      const t3 = () => {
        document.body.classList.remove("non-selectable");
      };
      true === e3 ? (clearSelection(), setTimeout(t3, 10)) : t3();
    }
    true !== o2 && (r.origin = position(e2)), true === client.is.mobile && (document.body.classList.add("non-selectable"), clearSelection(), r.styleCleanup = n2), r.event = { touch: true !== t2 && true !== o2, mouse: true === t2, keyboard: true === o2, startTime: Date.now(), repeatCount: 0 };
    const a2 = () => {
      if (void 0 === r.event)
        return;
      0 === r.event.repeatCount && (r.event.evt = e2, true === o2 ? r.event.keyCode = e2.keyCode : r.event.position = position(e2), true !== client.is.mobile && (document.documentElement.style.cursor = "pointer", document.body.classList.add("non-selectable"), clearSelection(), r.styleCleanup = n2)), r.event.duration = Date.now() - r.event.startTime, r.event.repeatCount += 1, r.handler(r.event);
      const t3 = i < r.event.repeatCount ? i : r.event.repeatCount;
      r.timer = setTimeout(a2, l[t3]);
    };
    0 === l[0] ? a2() : r.timer = setTimeout(a2, l[0]);
  }, move(e2) {
    void 0 !== r.event && true === shouldEnd(e2, r.origin) && clearTimeout(r.timer);
  }, end(e2) {
    void 0 !== r.event && (void 0 !== r.styleCleanup && r.styleCleanup(true), void 0 !== e2 && r.event.repeatCount > 0 && stopAndPrevent(e2), cleanEvt(r, "temp"), clearTimeout(r.timer), r.event = void 0);
  } };
  e.__qtouchrepeat = r, true === t.mouse && addEvt(r, "main", [[e, "mousedown", "mouseStart", `passive${true === t.mouseCapture ? "Capture" : ""}`]]), true === client.has.touch && addEvt(r, "main", [[e, "touchstart", "touchStart", `passive${true === t.capture ? "Capture" : ""}`], [e, "touchend", "noop", "passiveCapture"]]), a.length > 0 && addEvt(r, "main", [[e, "keydown", "keyboardStart", `notPassive${true === t.keyCapture ? "Capture" : ""}`]]);
}, updated(e, { oldValue: t, value: o }) {
  const n = e.__qtouchrepeat;
  void 0 !== n && t !== o && ("function" !== typeof o && n.end(), n.handler = o);
}, beforeUnmount(e) {
  const t = e.__qtouchrepeat;
  void 0 !== t && (clearTimeout(t.timer), cleanEvt(t, "main"), cleanEvt(t, "temp"), void 0 !== t.styleCleanup && t.styleCleanup(), delete e.__qtouchrepeat);
} });
Object.freeze({ __proto__: null, ClosePopup, Intersection, Morph, Mutation, Ripple, ScrollFire, Scroll, TouchHold, TouchPan, TouchRepeat, TouchSwipe });
function getCssVar(e, t = document.body) {
  if ("string" !== typeof e)
    throw new TypeError("Expected a string as propName");
  if (!(t instanceof Element))
    throw new TypeError("Expected a DOM element");
  return getComputedStyle(t).getPropertyValue(`--q-${e}`).trim() || null;
}
let metaValue;
function getProp() {
  return client.is.winphone ? "msapplication-navbutton-color" : client.is.safari ? "apple-mobile-web-app-status-bar-style" : "theme-color";
}
function getMetaTag(e) {
  const t = document.getElementsByTagName("META");
  for (const o in t)
    if (t[o].name === e)
      return t[o];
}
function setColor(e) {
  void 0 === metaValue && (metaValue = getProp());
  let t = getMetaTag(metaValue);
  const o = void 0 === t;
  o && (t = document.createElement("meta"), t.setAttribute("name", metaValue)), t.setAttribute("content", e), o && document.head.appendChild(t);
}
({ set: true !== client.is.mobile || true !== client.is.nativeMobile && true !== client.is.winphone && true !== client.is.safari && true !== client.is.webkit && true !== client.is.vivaldi ? noop : (e) => {
  const t = e || getCssVar("primary");
  true === client.is.nativeMobile && window.StatusBar ? window.StatusBar.backgroundColorByHexString(t) : setColor(t);
}, install({ $q: e }) {
  e.addressbarColor = this, e.config.addressbarColor && this.set(e.config.addressbarColor);
} });
const prefixes = {};
function assignFn(e) {
  Object.assign(Plugin$6, { request: e, exit: e, toggle: e });
}
function getFullscreenElement() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
}
function updateEl() {
  const e = Plugin$6.activeEl = false === Plugin$6.isActive ? null : getFullscreenElement();
  changeGlobalNodesTarget(null === e || e === document.documentElement ? document.body : e);
}
function togglePluginState() {
  Plugin$6.isActive = false === Plugin$6.isActive, updateEl();
}
function promisify(e, t) {
  try {
    const o = e[t]();
    return void 0 === o ? Promise.resolve() : o;
  } catch (e2) {
    return Promise.reject(e2);
  }
}
const Plugin$6 = defineReactivePlugin({ isActive: false, activeEl: null }, { isCapable: false, install({ $q: e }) {
  e.fullscreen = this;
} });
prefixes.request = ["requestFullscreen", "msRequestFullscreen", "mozRequestFullScreen", "webkitRequestFullscreen"].find((e) => void 0 !== document.documentElement[e]), Plugin$6.isCapable = void 0 !== prefixes.request, false === Plugin$6.isCapable ? assignFn(() => Promise.reject("Not capable")) : (Object.assign(Plugin$6, { request(e) {
  const t = e || document.documentElement, { activeEl: o } = Plugin$6;
  if (t === o)
    return Promise.resolve();
  const n = null !== o && true === t.contains(o) ? Plugin$6.exit() : Promise.resolve();
  return n.finally(() => promisify(t, prefixes.request));
}, exit() {
  return true === Plugin$6.isActive ? promisify(document, prefixes.exit) : Promise.resolve();
}, toggle(e) {
  return true === Plugin$6.isActive ? Plugin$6.exit() : Plugin$6.request(e);
} }), prefixes.exit = ["exitFullscreen", "msExitFullscreen", "mozCancelFullScreen", "webkitExitFullscreen"].find((e) => document[e]), Plugin$6.isActive = Boolean(getFullscreenElement()), true === Plugin$6.isActive && updateEl(), ["onfullscreenchange", "onmsfullscreenchange", "onwebkitfullscreenchange"].forEach((e) => {
  document[e] = togglePluginState;
}));
const Plugin$5 = defineReactivePlugin({ appVisible: true }, { install({ $q: e }) {
  injectProp(e, "appVisible", () => this.appVisible);
} });
{
  let e, t;
  if ("undefined" !== typeof document.hidden ? (e = "hidden", t = "visibilitychange") : "undefined" !== typeof document.msHidden ? (e = "msHidden", t = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (e = "webkitHidden", t = "webkitvisibilitychange"), t && "undefined" !== typeof document[e]) {
    const o = () => {
      Plugin$5.appVisible = !document[e];
    };
    document.addEventListener(t, o, false);
  }
}
createComponent({ name: "BottomSheetPlugin", props: { ...useDarkProps, title: String, message: String, actions: Array, grid: Boolean, cardClass: [String, Array, Object], cardStyle: [String, Array, Object] }, emits: ["ok", "hide"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), n = useDark(e, o.$q), a = ref(null);
  function l() {
    a.value.show();
  }
  function i() {
    a.value.hide();
  }
  function r(e2) {
    t("ok", e2), i();
  }
  function s() {
    t("hide");
  }
  function u() {
    return e.actions.map((e2) => {
      const t2 = e2.avatar || e2.img;
      return void 0 === e2.label ? h(QSeparator, { class: "col-all", dark: n.value }) : h("div", { class: ["q-bottom-sheet__item q-hoverable q-focusable cursor-pointer relative-position", e2.class], tabindex: 0, onClick() {
        r(e2);
      }, onKeyup(t3) {
        13 === t3.keyCode && r(e2);
      } }, [h("div", { class: "q-focus-helper" }), e2.icon ? h(QIcon, { name: e2.icon, color: e2.color }) : t2 ? h("img", { class: e2.avatar ? "q-bottom-sheet__avatar" : "", src: t2 }) : h("div", { class: "q-bottom-sheet__empty-icon" }), h("div", e2.label)]);
    });
  }
  function c() {
    return e.actions.map((e2) => {
      const t2 = e2.avatar || e2.img;
      return void 0 === e2.label ? h(QSeparator, { spaced: true, dark: n.value }) : h(QItem, { class: ["q-bottom-sheet__item", e2.classes], tabindex: 0, clickable: true, dark: n.value, onClick() {
        r(e2);
      }, onKeyup(t3) {
        13 === t3.keyCode && r(e2);
      } }, () => [h(QItemSection, { avatar: true }, () => e2.icon ? h(QIcon, { name: e2.icon, color: e2.color }) : t2 ? h("img", { class: e2.avatar ? "q-bottom-sheet__avatar" : "", src: t2 }) : null), h(QItemSection, () => e2.label)]);
    });
  }
  function d() {
    const t2 = [];
    return e.title && t2.push(h(QCardSection, { class: "q-dialog__title" }, () => e.title)), e.message && t2.push(h(QCardSection, { class: "q-dialog__message" }, () => e.message)), t2.push(true === e.grid ? h("div", { class: "row items-stretch justify-start" }, u()) : h("div", c())), t2;
  }
  function p2() {
    return [h(QCard, { class: [`q-bottom-sheet q-bottom-sheet--${true === e.grid ? "grid" : "list"}` + (true === n.value ? " q-bottom-sheet--dark q-dark" : ""), e.cardClass], style: e.cardStyle }, d)];
  }
  return Object.assign(o, { show: l, hide: i }), () => h(QDialog, { ref: a, position: "bottom", onHide: s }, p2);
} });
function encode$1(e) {
  return encodeURIComponent(e);
}
function decode$1(e) {
  return decodeURIComponent(e);
}
function stringifyCookieValue(e) {
  return encode$1(e === Object(e) ? JSON.stringify(e) : "" + e);
}
function read(e) {
  if ("" === e)
    return e;
  0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")), e = decode$1(e.replace(/\+/g, " "));
  try {
    const t = JSON.parse(e);
    t !== Object(t) && true !== Array.isArray(t) || (e = t);
  } catch (e2) {
  }
  return e;
}
function getString(e) {
  const t = new Date();
  return t.setMilliseconds(t.getMilliseconds() + e), t.toUTCString();
}
function parseExpireString(e) {
  let t = 0;
  const o = e.match(/(\d+)d/), n = e.match(/(\d+)h/), a = e.match(/(\d+)m/), l = e.match(/(\d+)s/);
  return o && (t += 864e5 * o[1]), n && (t += 36e5 * n[1]), a && (t += 6e4 * a[1]), l && (t += 1e3 * l[1]), 0 === t ? e : getString(t);
}
function set(e, t, o = {}, n) {
  let a, l;
  void 0 !== o.expires && ("[object Date]" === Object.prototype.toString.call(o.expires) ? a = o.expires.toUTCString() : "string" === typeof o.expires ? a = parseExpireString(o.expires) : (l = parseFloat(o.expires), a = false === isNaN(l) ? getString(864e5 * l) : o.expires));
  const i = `${encode$1(e)}=${stringifyCookieValue(t)}`, r = [i, void 0 !== a ? "; Expires=" + a : "", o.path ? "; Path=" + o.path : "", o.domain ? "; Domain=" + o.domain : "", o.sameSite ? "; SameSite=" + o.sameSite : "", o.httpOnly ? "; HttpOnly" : "", o.secure ? "; Secure" : "", o.other ? "; " + o.other : ""].join("");
  if (n) {
    n.req.qCookies ? n.req.qCookies.push(r) : n.req.qCookies = [r], n.res.setHeader("Set-Cookie", n.req.qCookies);
    let t2 = n.req.headers.cookie || "";
    if (void 0 !== a && l < 0) {
      const o2 = get(e, n);
      void 0 !== o2 && (t2 = t2.replace(`${e}=${o2}; `, "").replace(`; ${e}=${o2}`, "").replace(`${e}=${o2}`, ""));
    } else
      t2 = t2 ? `${i}; ${t2}` : r;
    n.req.headers.cookie = t2;
  } else
    document.cookie = r;
}
function get(e, t) {
  const o = t ? t.req.headers : document, n = o.cookie ? o.cookie.split("; ") : [], a = n.length;
  let l, i, r, s = e ? null : {}, u = 0;
  for (; u < a; u++)
    if (l = n[u].split("="), i = decode$1(l.shift()), r = l.join("="), e) {
      if (e === i) {
        s = read(r);
        break;
      }
    } else
      s[i] = r;
  return s;
}
function remove(e, t, o) {
  set(e, "", { expires: -1, ...t }, o);
}
function has(e, t) {
  return null !== get(e, t);
}
function getObject(e) {
  return { get: (t) => get(t, e), set: (t, o, n) => set(t, o, n, e), has: (t) => has(t, e), remove: (t, o) => remove(t, o, e), getAll: () => get(null, e) };
}
const Plugin$4 = { install({ $q: e, ssrContext: t }) {
  e.cookies = this;
} };
Object.assign(Plugin$4, getObject());
createComponent({ name: "DialogPlugin", props: { ...useDarkProps, title: String, message: String, prompt: Object, options: Object, progress: [Boolean, Object], html: Boolean, ok: { type: [String, Object, Boolean], default: true }, cancel: [String, Object, Boolean], focus: { type: String, default: "ok", validator: (e) => ["ok", "cancel", "none"].includes(e) }, stackButtons: Boolean, color: String, cardClass: [String, Array, Object], cardStyle: [String, Array, Object] }, emits: ["ok", "hide"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), { $q: n } = o, a = useDark(e, n), l = ref(null), i = ref(void 0 !== e.prompt ? e.prompt.model : void 0 !== e.options ? e.options.model : void 0), r = computed(() => "q-dialog-plugin" + (true === a.value ? " q-dialog-plugin--dark q-dark" : "") + (false !== e.progress ? " q-dialog-plugin--progress" : "")), s = computed(() => e.color || (true === a.value ? "amber" : "primary")), u = computed(() => false === e.progress ? null : true === isObject(e.progress) ? { component: e.progress.spinner || QSpinner, props: { color: e.progress.color || s.value } } : { component: QSpinner, props: { color: s.value } }), c = computed(() => void 0 !== e.prompt || void 0 !== e.options), d = computed(() => {
    if (true !== c.value)
      return {};
    const { model: t2, isValid: o2, items: n2, ...a2 } = void 0 !== e.prompt ? e.prompt : e.options;
    return a2;
  }), p2 = computed(() => true === isObject(e.ok) ? n.lang.label.ok : true === e.ok ? n.lang.label.ok : e.ok), v = computed(() => true === isObject(e.cancel) ? n.lang.label.cancel : true === e.cancel ? n.lang.label.cancel : e.cancel), m = computed(() => {
    return void 0 !== e.prompt ? void 0 !== e.prompt.isValid && true !== e.prompt.isValid(i.value) : void 0 !== e.options && (void 0 !== e.options.isValid && true !== e.options.isValid(i.value));
  }), f = computed(() => ({ color: s.value, label: p2.value, ripple: false, disable: m.value, ...true === isObject(e.ok) ? e.ok : { flat: true }, "data-autofocus": "ok" === e.focus && true !== c.value || void 0, onClick: S })), g = computed(() => ({ color: s.value, label: v.value, ripple: false, ...true === isObject(e.cancel) ? e.cancel : { flat: true }, "data-autofocus": "cancel" === e.focus && true !== c.value || void 0, onClick: w }));
  function b() {
    l.value.show();
  }
  function y() {
    l.value.hide();
  }
  function S() {
    t("ok", toRaw(i.value)), y();
  }
  function w() {
    y();
  }
  function C() {
    t("hide");
  }
  function x(e2) {
    i.value = e2;
  }
  function k(t2) {
    true !== m.value && "textarea" !== e.prompt.type && true === isKeyCode(t2, 13) && S();
  }
  function _(t2, o2) {
    return true === e.html ? h(QCardSection, { class: t2, innerHTML: o2 }) : h(QCardSection, { class: t2 }, () => o2);
  }
  function q() {
    return [h(QInput, { modelValue: i.value, ...d.value, color: s.value, dense: true, autofocus: true, dark: a.value, "onUpdate:modelValue": x, onKeyup: k })];
  }
  function T() {
    return [h(QOptionGroup, { modelValue: i.value, ...d.value, color: s.value, options: e.options.items, dark: a.value, "onUpdate:modelValue": x })];
  }
  function P() {
    const t2 = [];
    return e.cancel && t2.push(h(QBtn, g.value)), e.ok && t2.push(h(QBtn, f.value)), h(QCardActions, { class: true === e.stackButtons ? "items-end" : "", vertical: e.stackButtons, align: "right" }, () => t2);
  }
  function $() {
    const t2 = [];
    return e.title && t2.push(_("q-dialog__title", e.title)), false !== e.progress && t2.push(h(QCardSection, { class: "q-dialog__progress" }, () => h(u.value.component, u.value.props))), e.message && t2.push(_("q-dialog__message", e.message)), void 0 !== e.prompt ? t2.push(h(QCardSection, { class: "scroll q-dialog-plugin__form" }, q)) : void 0 !== e.options && t2.push(h(QSeparator, { dark: a.value }), h(QCardSection, { class: "scroll q-dialog-plugin__form" }, T), h(QSeparator, { dark: a.value })), (e.ok || e.cancel) && t2.push(P()), t2;
  }
  function M() {
    return [h(QCard, { class: [r.value, e.cardClass], style: e.cardStyle, dark: a.value }, $)];
  }
  return watch(() => e.prompt && e.prompt.model, x), watch(() => e.options && e.options.model, x), Object.assign(o, { show: b, hide: y }), () => h(QDialog, { ref: l, onHide: C }, M);
} });
const barRef = ref(null), Plugin$3 = defineReactivePlugin({ isActive: false }, { start: noop, stop: noop, increment: noop, setDefaults: noop, install({ $q: e, parentApp: t }) {
  if (e.loadingBar = this, true === this.__installed)
    return void (void 0 !== e.config.loadingBar && this.setDefaults(e.config.loadingBar));
  const o = ref(void 0 !== e.config.loadingBar ? { ...e.config.loadingBar } : {});
  function n() {
    Plugin$3.isActive = true;
  }
  function a() {
    Plugin$3.isActive = false;
  }
  const l = createGlobalNode("q-loading-bar");
  createChildApp({ name: "LoadingBar", devtools: { hide: true }, setup: () => () => h(QAjaxBar, { ...o.value, onStart: n, onStop: a, ref: barRef }) }, t).mount(l), Object.assign(this, { start(e2) {
    barRef.value.start(e2);
  }, stop() {
    barRef.value.stop();
  }, increment() {
    barRef.value.increment.apply(null, arguments);
  }, setDefaults(e2) {
    true === isObject(e2) && Object.assign(o.value, e2);
  } });
} });
let app, vm, timeout, uid$1 = 0, props = {}, activeGroups = {};
const originalDefaults = { group: "__default_quasar_group__", delay: 0, message: false, html: false, spinnerSize: 80, spinnerColor: "", messageColor: "", backgroundColor: "", boxClass: "", spinner: QSpinner, customClass: "" }, defaults$1 = { ...originalDefaults };
function registerProps(e) {
  if (e && void 0 !== e.group && void 0 !== activeGroups[e.group])
    return Object.assign(activeGroups[e.group], e);
  const t = true === isObject(e) && true === e.ignoreDefaults ? { ...originalDefaults, ...e } : { ...defaults$1, ...e };
  return activeGroups[t.group] = t, t;
}
const Plugin$2 = defineReactivePlugin({ isActive: false }, { show(e) {
  props = registerProps(e);
  const { group: t } = props;
  return Plugin$2.isActive = true, void 0 !== app ? (props.uid = uid$1, vm.$forceUpdate()) : (props.uid = ++uid$1, clearTimeout(timeout), timeout = setTimeout(() => {
    timeout = void 0;
    const e2 = createGlobalNode("q-loading");
    app = createApp({ name: "QLoading", setup() {
      function t2() {
        true !== Plugin$2.isActive && void 0 !== app && (preventScroll(false), app.unmount(e2), removeGlobalNode(e2), app = void 0, vm = void 0);
      }
      function o() {
        if (true !== Plugin$2.isActive)
          return null;
        const e3 = [h(props.spinner, { class: "q-loading__spinner", color: props.spinnerColor, size: props.spinnerSize })];
        return props.message && e3.push(h("div", { class: "q-loading__message" + (props.messageColor ? ` text-${props.messageColor}` : ""), [true === props.html ? "innerHTML" : "textContent"]: props.message })), h("div", { class: "q-loading fullscreen flex flex-center z-max " + props.customClass.trim(), key: props.uid }, [h("div", { class: "q-loading__backdrop" + (props.backgroundColor ? ` bg-${props.backgroundColor}` : "") }), h("div", { class: "q-loading__box column items-center " + props.boxClass }, e3)]);
      }
      return onMounted(() => {
        preventScroll(true);
      }), () => h(Transition, { name: "q-transition--fade", appear: true, onAfterLeave: t2 }, o);
    } }), vm = app.mount(e2);
  }, props.delay)), (e2) => {
    void 0 !== e2 && Object(e2) === e2 ? Plugin$2.show({ ...e2, group: t }) : Plugin$2.hide(t);
  };
}, hide(e) {
  if (true === Plugin$2.isActive) {
    if (void 0 === e)
      activeGroups = {};
    else {
      if (void 0 === activeGroups[e])
        return;
      {
        delete activeGroups[e];
        const t = Object.keys(activeGroups);
        if (0 !== t.length) {
          const e2 = t[t.length - 1];
          return void Plugin$2.show({ group: e2 });
        }
      }
    }
    void 0 !== timeout && (clearTimeout(timeout), timeout = void 0), Plugin$2.isActive = false;
  }
}, setDefaults(e) {
  true === isObject(e) && Object.assign(defaults$1, e);
}, install({ $q: e }) {
  e.loading = this, void 0 !== e.config.loading && this.setDefaults(e.config.loading);
} });
function encode(e) {
  return true === isDate(e) ? "__q_date|" + e.toUTCString() : true === isRegexp(e) ? "__q_expr|" + e.source : "number" === typeof e ? "__q_numb|" + e : "boolean" === typeof e ? "__q_bool|" + (e ? "1" : "0") : "string" === typeof e ? "__q_strn|" + e : "function" === typeof e ? "__q_strn|" + e.toString() : e === Object(e) ? "__q_objt|" + JSON.stringify(e) : e;
}
function decode(e) {
  const t = e.length;
  if (t < 9)
    return e;
  const o = e.substring(0, 8), n = e.substring(9);
  switch (o) {
    case "__q_date":
      return new Date(n);
    case "__q_expr":
      return new RegExp(n);
    case "__q_numb":
      return Number(n);
    case "__q_bool":
      return Boolean("1" === n);
    case "__q_strn":
      return "" + n;
    case "__q_objt":
      return JSON.parse(n);
    default:
      return e;
  }
}
function getEmptyStorage() {
  const e = () => null;
  return { has: () => false, getLength: () => 0, getItem: e, getIndex: e, getKey: e, getAll: () => {
  }, getAllKeys: () => [], set: noop, remove: noop, clear: noop, isEmpty: () => true };
}
function getStorage(e) {
  const t = window[e + "Storage"], o = (e2) => {
    const o2 = t.getItem(e2);
    return o2 ? decode(o2) : null;
  };
  return { has: (e2) => null !== t.getItem(e2), getLength: () => t.length, getItem: o, getIndex: (e2) => {
    return e2 < t.length ? o(t.key(e2)) : null;
  }, getKey: (e2) => {
    return e2 < t.length ? t.key(e2) : null;
  }, getAll: () => {
    let e2;
    const n = {}, a = t.length;
    for (let l = 0; l < a; l++)
      e2 = t.key(l), n[e2] = o(e2);
    return n;
  }, getAllKeys: () => {
    const e2 = [], o2 = t.length;
    for (let n = 0; n < o2; n++)
      e2.push(t.key(n));
    return e2;
  }, set: (e2, o2) => {
    t.setItem(e2, encode(o2));
  }, remove: (e2) => {
    t.removeItem(e2);
  }, clear: () => {
    t.clear();
  }, isEmpty: () => 0 === t.length };
}
const storage$1 = false === client.has.webStorage ? getEmptyStorage() : getStorage("local"), Plugin$1 = { install({ $q: e }) {
  e.localStorage = storage$1;
} };
Object.assign(Plugin$1, storage$1);
const storage = false === client.has.webStorage ? getEmptyStorage() : getStorage("session"), Plugin = { install({ $q: e }) {
  e.sessionStorage = storage;
} };
Object.assign(Plugin, storage);
const emits = ["ok", "hide"];
getEmitsObject(emits);
const createModelEvent = (name) => {
  return "onUpdate:" + name;
};
const createModelEmit = (name) => {
  return "update:" + name;
};
const createBinding = (name, props2, context) => {
  const eventName = createModelEvent(name);
  const emitName = createModelEmit(name);
  const vModel = {};
  vModel[name] = props2[name];
  vModel[eventName] = (value2) => {
    context.emit(emitName, value2);
  };
  return { ...vModel };
};
const createModels = (models, props2, context) => {
  let result = {};
  Object.keys(models).forEach((key) => {
    const model = createBinding(key, props2, context);
    result = Object.assign(result, model);
  });
  return result;
};
const renderSchema = (schemas, props2, context) => {
  return schemas.map((schema) => {
    const children = schema.children ? schema.children : [];
    const models = schema.models ? schema.models : {};
    let vModels = {};
    if (models) {
      vModels = createModels(models, props2, context);
    }
    if (schema.children) {
      return h(
        resolveComponent(schema.tag),
        { ...schema.attrs, ...vModels },
        () => renderSchema(children, props2, context)
      );
    } else {
      return h(
        resolveComponent(schema.tag),
        { ...schema.attrs, ...vModels },
        schema.text ? () => schema.text : () => {
        }
      );
    }
  });
};
const SCHEMA_DEFINITIONS = {
  TEXT_FIELD: {
    name: "TEXT_FIELD",
    schema: {
      title: "\u5355\u884C\u6587\u672C",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "\u5355\u884C\u6587\u672C",
        type: "text"
      },
      models: {
        modelValue: { name: "", type: "String" }
      }
    }
  },
  TEXT_AREA: {
    name: "TEXT_AREA",
    schema: {
      title: "\u591A\u884C\u6587\u672C",
      tag: "q-input",
      attrs: {
        filled: true,
        label: "\u591A\u884C\u6587\u672C",
        type: "textarea"
      },
      models: {
        modelValue: { name: "", type: "String" }
      }
    }
  },
  PASSWORD: {
    name: "PASSWORD",
    schema: {
      title: "\u5BC6\u7801\u8F93\u5165",
      tag: "q-input",
      attrs: {
        filled: true,
        label: "\u5BC6\u7801\u8F93\u5165",
        type: "password"
      },
      models: {
        modelValue: { name: "", type: "String" }
      }
    }
  },
  DATE_PICKER: {
    name: "DATE_PICKER",
    schema: {
      title: "\u65E5\u671F\u9009\u62E9",
      tag: "q-input",
      attrs: {
        filled: true,
        label: "\u65E5\u671F\u9009\u62E9",
        "stack-label": true,
        type: "date"
      },
      models: {
        modelValue: { name: "", type: "String" }
      }
    }
  },
  TIME_PICKER: {
    name: "TIME_PICKER",
    schema: {
      title: "\u65F6\u95F4\u9009\u62E9",
      tag: "q-input",
      attrs: {
        filled: true,
        label: "\u65F6\u95F4\u9009\u62E9",
        "stack-label": true,
        type: "time"
      },
      models: {
        modelValue: { name: "", type: "String" }
      }
    }
  },
  SLIDER: {
    name: "SLIDER",
    schema: {
      title: "\u6ED1\u5757",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {
        modelValue: { name: "", type: "String" }
      }
    }
  },
  RANGE_SLIDER: {
    name: "RANGE_SLIDER",
    schema: {
      title: "\u8303\u56F4\u6ED1\u5757",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {
        modelValue: { name: "", type: "String" }
      }
    }
  },
  CHECKBOX: {
    name: "CHECKBOX",
    schema: {
      title: "\u590D\u9009\u6846",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {
        modelValue: { name: "", type: "String" }
      }
    }
  },
  SWITCHS: {
    name: "SWITCHS",
    schema: {
      title: "\u5F00\u5173",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {
        modelValue: { name: "", type: "String" }
      }
    }
  },
  SELECT_SINGLE: {
    name: "SELECT_SINGLE",
    schema: {
      title: "\u5355\u9879\u4E0B\u62C9",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {}
    }
  },
  COMBOBOX: {
    name: "COMBOBOX",
    schema: {
      title: "\u7EC4\u5408\u6846",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {}
    }
  },
  COLOR_PICKER: {
    name: "COLOR_PICKER",
    schema: {
      title: "\u989C\u8272\u9009\u62E9",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {}
    }
  },
  RADIO: {
    name: "RADIO",
    schema: {
      title: "\u5355\u9009\u6846\u7EC4",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {}
    }
  },
  FILE_INPUT: {
    name: "FILE_INPUT",
    schema: {
      title: "\u4E0A\u4F20",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {}
    }
  },
  IMAGES: {
    name: "IMAGES",
    schema: {
      title: "\u56FE\u7247",
      tag: "q-input",
      attrs: {
        rounded: true,
        filled: true,
        label: "Rounded filled"
      },
      models: {}
    }
  }
};
const INPUT_WIDGETS = [
  {
    title: SCHEMA_DEFINITIONS.TEXT_FIELD.schema.title,
    icon: "mdi-form-textbox",
    name: "TextField",
    document: "https://quasar.dev/vue-components/input",
    schemaName: SCHEMA_DEFINITIONS.TEXT_FIELD.name
  },
  {
    title: SCHEMA_DEFINITIONS.TEXT_AREA.schema.title,
    icon: "mdi-form-textarea",
    name: "TextArea",
    document: "https://quasar.dev/vue-components/input",
    schemaName: SCHEMA_DEFINITIONS.TEXT_AREA.name
  },
  {
    title: SCHEMA_DEFINITIONS.PASSWORD.schema.title,
    icon: "mdi-form-textbox-password",
    name: "Password",
    document: "https://quasar.dev/vue-components/input",
    schemaName: SCHEMA_DEFINITIONS.PASSWORD.name
  }
];
const SELECT_WIDGETS = [
  {
    title: SCHEMA_DEFINITIONS.SLIDER.schema.title,
    icon: "mdi-tune-variant",
    name: "Slider",
    document: "https://vuetifyjs.com/zh-Hans/components/sliders/",
    schemaName: SCHEMA_DEFINITIONS.SLIDER.name
  },
  {
    title: SCHEMA_DEFINITIONS.RANGE_SLIDER.schema.title,
    icon: "mdi-valve-closed",
    name: "Range_Slider",
    document: "https://vuetifyjs.com/zh-Hans/components/sliders/",
    schemaName: SCHEMA_DEFINITIONS.RANGE_SLIDER.name
  },
  {
    title: SCHEMA_DEFINITIONS.CHECKBOX.schema.title,
    icon: "mdi-checkbox-marked",
    name: "Checkbox",
    document: "https://vuetifyjs.com/zh-Hans/components/checkboxes/",
    schemaName: SCHEMA_DEFINITIONS.CHECKBOX.name
  },
  {
    title: SCHEMA_DEFINITIONS.SWITCHS.schema.title,
    icon: "mdi-toggle-switch",
    name: "Switch",
    document: "https://vuetifyjs.com/zh-Hans/components/switches/",
    schemaName: SCHEMA_DEFINITIONS.SWITCHS.name
  },
  {
    title: SCHEMA_DEFINITIONS.DATE_PICKER.schema.title,
    icon: "mdi-calendar",
    name: "Date",
    document: "https://quasar.dev/vue-components/input",
    schemaName: SCHEMA_DEFINITIONS.DATE_PICKER.name
  },
  {
    title: SCHEMA_DEFINITIONS.TIME_PICKER.schema.title,
    icon: "mdi-clock-outline",
    name: "Time",
    document: "https://quasar.dev/vue-components/input",
    schemaName: SCHEMA_DEFINITIONS.TIME_PICKER.name
  },
  {
    title: SCHEMA_DEFINITIONS.SELECT_SINGLE.schema.title,
    icon: "mdi-form-dropdown",
    name: "Select",
    document: "https://vuetifyjs.com/zh-Hans/components/selects/",
    schemaName: SCHEMA_DEFINITIONS.SELECT_SINGLE.name
  },
  {
    title: SCHEMA_DEFINITIONS.COMBOBOX.schema.title,
    icon: "mdi-vector-difference-ab",
    name: "Combobox",
    document: "https://vuetifyjs.com/zh-Hans/components/combobox/",
    schemaName: SCHEMA_DEFINITIONS.COMBOBOX.name
  },
  {
    title: SCHEMA_DEFINITIONS.RADIO.schema.title,
    icon: "mdi-checkbox-marked-circle",
    name: "Select",
    document: "https://vuetifyjs.com/zh-Hans/components/selection-controls/",
    schemaName: SCHEMA_DEFINITIONS.RADIO.name
  },
  {
    title: SCHEMA_DEFINITIONS.COLOR_PICKER.schema.title,
    icon: "mdi-calendar",
    name: "Select",
    document: "https://vuetifyjs.com/zh-Hans/components/color-pickers/",
    schemaName: SCHEMA_DEFINITIONS.COLOR_PICKER.name
  },
  {
    title: SCHEMA_DEFINITIONS.FILE_INPUT.schema.title,
    icon: "mdi-calendar",
    name: "Select",
    document: "https://vuetifyjs.com/zh-Hans/components/file-inputs/",
    schemaName: SCHEMA_DEFINITIONS.FILE_INPUT.name
  },
  {
    title: SCHEMA_DEFINITIONS.IMAGES.schema.title,
    icon: "mdi-file-image",
    name: "Image",
    document: "https://vuetifyjs.com/zh-Hans/components/images/",
    schemaName: SCHEMA_DEFINITIONS.IMAGES.name
  }
];
const WIDGET_DEFINITIONS = [
  {
    title: "\u8F93\u5165\u578B\u7EC4\u4EF6",
    list: INPUT_WIDGETS
  },
  {
    title: "\u9009\u62E9\u578B\u7EC4\u4EF6",
    list: SELECT_WIDGETS
  }
];
const _DataObjectUtilities = class {
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  generateShortId() {
    return shortid.generate();
  }
  getDefinition(schema) {
    return SCHEMA_DEFINITIONS[schema];
  }
  setDataObjectValues(schema, widgetName, panelName) {
    const dataObject = { id: "", config: {}, schema: {} };
    const formId = widgetName + "_" + this.generateShortId();
    dataObject.id = formId;
    dataObject.config.formId = formId;
    dataObject.config.renderKey = +new Date();
    dataObject.config.name = widgetName;
    dataObject.config.panel = panelName;
    dataObject.schema = lodash.cloneDeep(schema);
    return dataObject;
  }
  create(widget) {
    const definition = this.getDefinition(widget.schemaName);
    const schema = definition.schema;
    const panelName = definition.name;
    const widgetName = widget.name;
    return this.setDataObjectValues(schema, widgetName, panelName);
  }
};
let DataObjectUtilities = _DataObjectUtilities;
__publicField(DataObjectUtilities, "instance", new _DataObjectUtilities());
const DataObjectUtils = DataObjectUtilities.getInstance();
const _sfc_main$1 = defineComponent({
  name: "HRendererEngine",
  props: {
    modelValue: { type: [String, Number, Array, Object] },
    schemas: { type: Array, default: () => [] }
  },
  setup(props2, context) {
    const schemas = props2.schemas;
    return () => renderSchema(schemas, props2, context);
  }
});
const _sfc_main = defineComponent({
  name: "HRendererForm",
  props: {
    modelValue: { type: Object, default: () => {
    }, required: true },
    dataObjects: { type: Array, required: true }
  },
  emits: ["update:modelValue"],
  setup(props2, { emit: emit2 }) {
    const modelObject = computed({
      get: () => props2.modelValue,
      set: (newValue) => {
        emit2("update:modelValue", newValue);
      }
    });
    const getDefaultModel = (item) => {
      return item.schema.models.modelValue;
    };
    const getModelDefaultValue = (type) => {
      switch (type) {
        case "Number":
          return 0;
        case "Array":
          return [];
        case "Object":
          return {};
        default:
          return "";
      }
    };
    const createModels2 = () => {
      const models = {};
      if (props2.dataObjects) {
        props2.dataObjects.map((item) => {
          const model = getDefaultModel(item);
          if (model.name) {
            models[model.name] = getModelDefaultValue(model.type);
          }
        });
      }
      return models;
    };
    const state = reactive(createModels2());
    watch(state, (newValue) => {
      modelObject.value = { ...newValue };
    });
    return {
      getDefaultModel,
      modelObject,
      state
    };
  }
});
const _export_sfc = (sfc, props2) => {
  const target2 = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target2[key] = val;
  }
  return target2;
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_h_renderer_engine = _sfc_main$1;
  const _component_q_card_section = QCardSection;
  const _component_q_card = QCard;
  return openBlock(), createBlock(_component_q_card, null, {
    default: withCtx(() => [
      createVNode(_component_q_card_section, { class: "q-pt-none" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dataObjects, (item) => {
            return openBlock(), createBlock(_component_h_renderer_engine, {
              key: item.id,
              modelValue: _ctx.state[_ctx.getDefaultModel(item).name],
              "onUpdate:modelValue": ($event) => _ctx.state[_ctx.getDefaultModel(item).name] = $event,
              schemas: [item.schema]
            }, null, 8, ["modelValue", "onUpdate:modelValue", "schemas"]);
          }), 128))
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const HRendererForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
HRendererForm.install = (app2) => {
  app2.component(HRendererForm.name, HRendererForm);
};
_sfc_main$1.install = (app2) => {
  app2.component(_sfc_main$1.name, _sfc_main$1);
};
const components = [_sfc_main$1, HRendererForm];
const install = (app2) => {
  components.map((component) => app2.component(component.name, component));
};
const index = {
  install
};
export {
  DataObjectUtils,
  _sfc_main$1 as HRendererEngine,
  HRendererForm,
  SCHEMA_DEFINITIONS,
  WIDGET_DEFINITIONS,
  index as default,
  renderSchema
};
