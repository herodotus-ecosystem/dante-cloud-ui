import{g as t}from"./npm-get-intrinsic.52444c4b.js";import{f as r}from"./npm-function-bind.afde194d.js";var e={exports:{}};!function(e){var n=r,o=t,p=o("%Function.prototype.apply%"),a=o("%Function.prototype.call%"),i=o("%Reflect.apply%",!0)||n.call(a,p),c=o("%Object.getOwnPropertyDescriptor%",!0),l=o("%Object.defineProperty%",!0),f=o("%Math.max%");if(l)try{l({},"a",{value:1})}catch(s){l=null}e.exports=function(t){var r=i(n,a,arguments);if(c&&l){var e=c(r,"length");e.configurable&&l(r,"length",{value:1+f(0,t.length-(arguments.length-1))})}return r};var u=function(){return i(n,p,arguments)};l?l(e.exports,"apply",{value:u}):e.exports.apply=u}(e);var n=t,o=e.exports,p=o(n("String.prototype.indexOf")),a=function(t,r){var e=n(t,!!r);return"function"==typeof e&&p(t,".prototype.")>-1?o(e):e};export{a as c};
