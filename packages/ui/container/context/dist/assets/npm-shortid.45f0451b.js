import{g as t}from"./npm-@bpmn-io.a2df5dec.js";import{f as r}from"./npm-nanoid.86f89435.js";var e={exports:{}},n={exports:{}},o=1;var u,a,s,i={nextValue:function(){return(o=(9301*o+49297)%233280)/233280},seed:function(t){o=t}},f="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function c(){s=!1}function p(t){if(t){if(t!==u){if(t.length!==f.length)throw new Error("Custom alphabet for shortid must be "+f.length+" unique characters. You submitted "+t.length+" characters: "+t);var r=t.split("").filter((function(t,r,e){return r!==e.lastIndexOf(t)}));if(r.length)throw new Error("Custom alphabet for shortid must be "+f.length+" unique characters. These characters were not unique: "+r.join(", "));u=t,c()}}else u!==f&&(u=f,c())}function h(){return s||(s=function(){u||p(f);for(var t,r=u.split(""),e=[],n=i.nextValue();r.length>0;)n=i.nextValue(),t=Math.floor(n*r.length),e.push(r.splice(t,1)[0]);return e.join("")}())}var l,d={get:function(){return u||f},characters:function(t){return p(t),u},seed:function(t){i.seed(t),a!==t&&(c(),a=t)},lookup:function(t){return h()[t]},shuffled:h},g="object"==typeof window&&(window.crypto||window.msCrypto);l=g&&g.getRandomValues?function(t){return g.getRandomValues(new Uint8Array(t))}:function(t){for(var r=[],e=0;e<t;e++)r.push(Math.floor(256*Math.random()));return r};var x=d,m=l,w=r;var v,b,V=function(t){for(var r,e=0,n="";!r;)n+=w(m,x.get(),1),r=t<Math.pow(16,e+1),e++;return n};var j=function(t){var r="",e=Math.floor(.001*(Date.now()-1567752802062));return e===b?v++:(v=0,b=e),r+=V(7),r+=V(t),v>0&&(r+=V(v)),r+=V(e)},y=d;var M=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+y.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)};!function(t){var r=d,e=j,n=M,o=0;function u(){return e(o)}t.exports=u,t.exports.generate=u,t.exports.seed=function(e){return r.seed(e),t.exports},t.exports.worker=function(r){return o=r,t.exports},t.exports.characters=function(t){return void 0!==t&&r.characters(t),r.shuffled()},t.exports.isValid=n}(n);const q=t(e.exports=n.exports);export{q as s};
