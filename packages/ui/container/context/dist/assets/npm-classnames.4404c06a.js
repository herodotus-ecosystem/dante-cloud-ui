var t,r={exports:{}};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/t=r,function(){var r={}.hasOwnProperty;function e(){for(var t=[],n=0;n<arguments.length;n++){var o=arguments[n];if(o){var i=typeof o;if("string"===i||"number"===i)t.push(o);else if(Array.isArray(o)){if(o.length){var s=e.apply(null,o);s&&t.push(s)}}else if("object"===i){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){t.push(o.toString());continue}for(var a in o)r.call(o,a)&&o[a]&&t.push(a)}}}return t.join(" ")}t.exports?(e.default=e,t.exports=e):window.classNames=e}();const e=r.exports;export{e as c};
