import{h as r}from"./npm-has-symbols.cd106ef4.js";import{f as t}from"./npm-function-bind.afde194d.js";import{s as e}from"./npm-has.b7ae4643.js";var o,n=SyntaxError,a=Function,y=TypeError,p=function(r){try{return a('"use strict"; return ('+r+").constructor;")()}catch(t){}},i=Object.getOwnPropertyDescriptor;if(i)try{i({},"")}catch(O){i=null}var f=function(){throw new y},c=i?function(){try{return f}catch(r){try{return i(arguments,"callee").get}catch(t){return f}}}():f,s=r(),l=Object.getPrototypeOf||function(r){return r.__proto__},u={},A="undefined"==typeof Uint8Array?o:l(Uint8Array),d={"%AggregateError%":"undefined"==typeof AggregateError?o:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?o:ArrayBuffer,"%ArrayIteratorPrototype%":s?l([][Symbol.iterator]()):o,"%AsyncFromSyncIteratorPrototype%":o,"%AsyncFunction%":u,"%AsyncGenerator%":u,"%AsyncGeneratorFunction%":u,"%AsyncIteratorPrototype%":u,"%Atomics%":"undefined"==typeof Atomics?o:Atomics,"%BigInt%":"undefined"==typeof BigInt?o:BigInt,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?o:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?o:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?o:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?o:FinalizationRegistry,"%Function%":a,"%GeneratorFunction%":u,"%Int8Array%":"undefined"==typeof Int8Array?o:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?o:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?o:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":s?l(l([][Symbol.iterator]())):o,"%JSON%":"object"==typeof JSON?JSON:o,"%Map%":"undefined"==typeof Map?o:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&s?l((new Map)[Symbol.iterator]()):o,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?o:Promise,"%Proxy%":"undefined"==typeof Proxy?o:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?o:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?o:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&s?l((new Set)[Symbol.iterator]()):o,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?o:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":s?l(""[Symbol.iterator]()):o,"%Symbol%":s?Symbol:o,"%SyntaxError%":n,"%ThrowTypeError%":c,"%TypedArray%":A,"%TypeError%":y,"%Uint8Array%":"undefined"==typeof Uint8Array?o:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?o:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?o:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?o:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?o:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?o:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?o:WeakSet},P=function r(t){var e;if("%AsyncFunction%"===t)e=p("async function () {}");else if("%GeneratorFunction%"===t)e=p("function* () {}");else if("%AsyncGeneratorFunction%"===t)e=p("async function* () {}");else if("%AsyncGenerator%"===t){var o=r("%AsyncGeneratorFunction%");o&&(e=o.prototype)}else if("%AsyncIteratorPrototype%"===t){var n=r("%AsyncGenerator%");n&&(e=l(n.prototype))}return d[t]=e,e},m={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},g=t,S=e,E=g.call(Function.call,Array.prototype.concat),h=g.call(Function.apply,Array.prototype.splice),F=g.call(Function.call,String.prototype.replace),I=g.call(Function.call,String.prototype.slice),b=g.call(Function.call,RegExp.prototype.exec),R=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,U=/\\(\\)?/g,v=function(r){var t=I(r,0,1),e=I(r,-1);if("%"===t&&"%"!==e)throw new n("invalid intrinsic syntax, expected closing `%`");if("%"===e&&"%"!==t)throw new n("invalid intrinsic syntax, expected opening `%`");var o=[];return F(r,R,(function(r,t,e,n){o[o.length]=e?F(n,U,"$1"):t||r})),o},w=function(r,t){var e,o=r;if(S(m,o)&&(o="%"+(e=m[o])[0]+"%"),S(d,o)){var a=d[o];if(a===u&&(a=P(o)),void 0===a&&!t)throw new y("intrinsic "+r+" exists, but is not available. Please file an issue!");return{alias:e,name:o,value:a}}throw new n("intrinsic "+r+" does not exist!")},x=function(r,t){if("string"!=typeof r||0===r.length)throw new y("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof t)throw new y('"allowMissing" argument must be a boolean');if(null===b(/^%?[^%]*%?$/,r))throw new n("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var e=v(r),o=e.length>0?e[0]:"",a=w("%"+o+"%",t),p=a.name,f=a.value,c=!1,s=a.alias;s&&(o=s[0],h(e,E([0,1],s)));for(var l=1,u=!0;l<e.length;l+=1){var A=e[l],P=I(A,0,1),m=I(A,-1);if(('"'===P||"'"===P||"`"===P||'"'===m||"'"===m||"`"===m)&&P!==m)throw new n("property names with quotes must have matching quotes");if("constructor"!==A&&u||(c=!0),S(d,p="%"+(o+="."+A)+"%"))f=d[p];else if(null!=f){if(!(A in f)){if(!t)throw new y("base intrinsic for "+r+" exists, but the property is not available.");return}if(i&&l+1>=e.length){var g=i(f,A);f=(u=!!g)&&"get"in g&&!("originalValue"in g.get)?g.get:f[A]}else u=S(f,A),f=f[A];u&&!c&&(d[p]=f)}}return f};export{x as g};
