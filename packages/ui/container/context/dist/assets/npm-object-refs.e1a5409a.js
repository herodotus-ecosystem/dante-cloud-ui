import{g as e}from"./npm-@bpmn-io.a2df5dec.js";var n={exports:{}},t={};t.extend=function(e,n,t,r){var o=t.inverse;return Object.defineProperty(e,"remove",{value:function(e){var t=this.indexOf(e);return-1!==t&&(this.splice(t,1),n.unset(e,o,r)),e}}),Object.defineProperty(e,"contains",{value:function(e){return-1!==this.indexOf(e)}}),Object.defineProperty(e,"add",{value:function(e,t){var i=this.indexOf(e);if(void 0===t){if(-1!==i)return;t=this.length}-1!==i&&this.splice(i,1),this.splice(t,0,e),-1===i&&n.set(e,o,r)}}),Object.defineProperty(e,"__refs_collection",{value:!0}),e},t.isExtended=function(e){return!0===e.__refs_collection};var r,o=t;function i(e,n,t){var r=o.extend(t[n.name]||[],e,n,t);Object.defineProperty(t,n.name,{enumerable:n.enumerable,value:r}),r.length&&r.forEach((function(r){e.set(r,n.inverse,t)}))}function s(e,n){if(!(this instanceof s))return new s(e,n);e.inverse=n,n.inverse=e,this.props={},this.props[e.name]=e,this.props[n.name]=n}s.prototype.bind=function(e,n){if("string"==typeof n){if(!this.props[n])throw new Error("no property <"+n+"> in ref");n=this.props[n]}n.collection?i(this,n,e):function(e,n,t){var r=n.inverse,o=t[n.name];Object.defineProperty(t,n.name,{configurable:n.configurable,enumerable:n.enumerable,get:function(){return o},set:function(n){if(n!==o){var i=o;o=null,i&&e.unset(i,r,t),o=n,e.set(o,r,t)}}})}(this,n,e)},s.prototype.ensureRefsCollection=function(e,n){var t=e[n.name];return o.isExtended(t)||i(this,n,e),t},s.prototype.ensureBound=function(e,n){(function(e,n){return Object.prototype.hasOwnProperty.call(e,n.name||n)})(e,n)||this.bind(e,n)},s.prototype.unset=function(e,n,t){e&&(this.ensureBound(e,n),n.collection?this.ensureRefsCollection(e,n).remove(t):e[n.name]=void 0)},s.prototype.set=function(e,n,t){e&&(this.ensureBound(e,n),n.collection?this.ensureRefsCollection(e,n).add(t):e[n.name]=t)},(r=n).exports=s,r.exports.Collection=t;const u=e(n.exports);export{u as R};
