(window.webpackJsonp=window.webpackJsonp||[]).push([["npm.moddle-xml"],{f615:function(e,t,n){"use strict";n.d(t,"a",(function(){return O})),n.d(t,"b",(function(){return C}));var r=n("b2ea"),i=n("0d53"),a=n("aff6");function o(e){return e.xml&&"lowerCase"===e.xml.tagAlias}var s={xsi:"http://www.w3.org/2001/XMLSchema-instance",xml:"http://www.w3.org/XML/1998/namespace"};function p(e){return e.xml&&e.xml.serialize}function c(e){return"xsi:type"===p(e)}function u(e,t){return o(t)?e.prefix+":"+((n=e.localName).charAt(0).toUpperCase()+n.slice(1)):e.name;var n}function l(e){return new Error(e)}function f(e){return e.$descriptor}function h(e){Object(r.assign)(this,e),this.elementsById={},this.references=[],this.warnings=[],this.addReference=function(e){this.references.push(e)},this.addElement=function(e){if(!e)throw l("expected element");var t,n=this.elementsById,r=f(e).idProperty;if(r&&(t=e.get(r.name))){if(!/^([a-z][\w-.]*:)?[a-z_][\w-.]*$/i.test(t))throw new Error("illegal ID <"+t+">");if(n[t])throw l("duplicate ID <"+t+">");n[t]=e}},this.addWarning=function(e){this.warnings.push(e)}}function d(){}function m(){}function y(){}function g(e,t){this.property=e,this.context=t}function b(e,t){this.element=t,this.propertyDesc=e}function v(){}function N(e,t,n){this.model=e,this.type=e.getType(t),this.context=n}function x(e,t,n){N.call(this,e,t,n)}function w(e,t,n){this.model=e,this.context=n}function O(e){e instanceof a.a&&(e={model:e}),Object(r.assign)(this,{lax:!1},e)}d.prototype.handleEnd=function(){},d.prototype.handleText=function(){},d.prototype.handleNode=function(){},m.prototype=Object.create(d.prototype),m.prototype.handleNode=function(){return this},y.prototype=Object.create(d.prototype),y.prototype.handleText=function(e){this.body=(this.body||"")+e},g.prototype=Object.create(y.prototype),g.prototype.handleNode=function(e){if(this.element)throw l("expected no sub nodes");return this.element=this.createReference(e),this},g.prototype.handleEnd=function(){this.element.id=this.body},g.prototype.createReference=function(e){return{property:this.property.ns.name,id:""}},b.prototype=Object.create(y.prototype),b.prototype.handleEnd=function(){var e=this.body||"",t=this.element,n=this.propertyDesc;e=Object(a.b)(n.type,e),n.isMany?t.get(n.name).push(e):t.set(n.name,e)},v.prototype=Object.create(y.prototype),v.prototype.handleNode=function(e){var t=this,n=this.element;return n?t=this.handleChild(e):(n=this.element=this.createElement(e),this.context.addElement(n)),t},N.prototype=Object.create(v.prototype),N.prototype.addReference=function(e){this.context.addReference(e)},N.prototype.handleText=function(e){if(!f(this.element).bodyProperty)throw l("unexpected body text <"+e+">");y.prototype.handleText.call(this,e)},N.prototype.handleEnd=function(){var e=this.body,t=this.element,n=f(t).bodyProperty;n&&void 0!==e&&(e=Object(a.b)(n.type,e),t.set(n.name,e))},N.prototype.createElement=function(e){var t,n=e.attributes,i=this.type,o=f(i),s=this.context,p=new i({}),c=this.model;return Object(r.forEach)(n,(function(e,n){var i,u=o.propertiesByName[n];u&&u.isReference?u.isMany?(i=e.split(" "),Object(r.forEach)(i,(function(e){s.addReference({element:p,property:u.ns.name,id:e})}))):s.addReference({element:p,property:u.ns.name,id:e}):(u?e=Object(a.b)(u.type,e):"xmlns"!==n&&(t=Object(a.d)(n,o.ns.prefix),c.getPackage(t.prefix)&&s.addWarning({message:"unknown attribute <"+n+">",element:p,property:n,value:e})),p.set(n,e))})),p},N.prototype.getPropertyForNode=function(e){var t,n,i=e.name,o=Object(a.d)(i),s=this.type,p=this.model,h=f(s),d=o.name,m=h.propertiesByName[d];if(m&&!m.isAttr)return c(m)&&(t=e.attributes["xsi:type"])?(t=function(e,t){var n=Object(a.d)(e);return function(e,t){var n=e.name,r=e.localName,i=t.xml&&t.xml.typePrefix;return i&&0===r.indexOf(i)?e.prefix+":"+r.slice(i.length):n}(n,t.getPackage(n.prefix))}(t,p),n=p.getType(t),Object(r.assign)({},m,{effectiveType:f(n).name})):m;var y=p.getPackage(o.prefix);if(y){if(t=u(o,y),n=p.getType(t),m=Object(r.find)(h.properties,(function(e){return!e.isVirtual&&!e.isReference&&!e.isAttribute&&n.hasType(e.type)})))return Object(r.assign)({},m,{effectiveType:f(n).name})}else if(m=Object(r.find)(h.properties,(function(e){return!e.isReference&&!e.isAttribute&&"Element"===e.type})))return m;throw l("unrecognized element <"+o.name+">")},N.prototype.toString=function(){return"ElementDescriptor["+f(this.type).name+"]"},N.prototype.valueHandler=function(e,t){return new b(e,t)},N.prototype.referenceHandler=function(e){return new g(e,this.context)},N.prototype.handler=function(e){return"Element"===e?new w(this.model,e,this.context):new N(this.model,e,this.context)},N.prototype.handleChild=function(e){var t,n,i,o;if(t=this.getPropertyForNode(e),i=this.element,n=t.effectiveType||t.type,Object(a.c)(n))return this.valueHandler(t,i);var s=(o=t.isReference?this.referenceHandler(t).handleNode(e):this.handler(n).handleNode(e)).element;return void 0!==s&&(t.isMany?i.get(t.name).push(s):i.set(t.name,s),t.isReference?(Object(r.assign)(s,{element:i}),this.context.addReference(s)):s.$parent=i),o},x.prototype=Object.create(N.prototype),x.prototype.createElement=function(e){var t=e.name,n=Object(a.d)(t),r=this.model,i=this.type,o=r.getPackage(n.prefix),s=o&&u(n,o)||t;if(!i.hasType(s))throw l("unexpected element <"+e.originalName+">");return N.prototype.createElement.call(this,e)},w.prototype=Object.create(v.prototype),w.prototype.createElement=function(e){var t=e.name,n=Object(a.d)(t).prefix,r=e.ns[n+"$uri"],i=e.attributes;return this.model.createAny(t,r,i)},w.prototype.handleChild=function(e){var t=new w(this.model,"Element",this.context).handleNode(e),n=this.element,r=t.element;return void 0!==r&&((n.$children=n.$children||[]).push(r),r.$parent=n),t},w.prototype.handleEnd=function(){this.body&&(this.element.$body=this.body)},O.prototype.fromXML=function(e,t,n){var a=t.rootHandler;t instanceof N?(a=t,t={}):"string"==typeof t?(a=this.handler(t),t={}):"string"==typeof a&&(a=this.handler(a));var o=this.model,s=this.lax,p=new h(Object(r.assign)({},t,{rootHandler:a})),c=new i.a({proxy:!0}),u=function(){var e=[];return Object.defineProperty(e,"peek",{value:function(){return this[this.length-1]}}),e}();function d(e,t,n){var r=t(),i=r.line,a=r.column,o=r.data;"<"===o.charAt(0)&&-1!==o.indexOf(" ")&&(o=o.slice(0,o.indexOf(" "))+">");var s="unparsable content "+(o?o+" ":"")+"detected\n\tline: "+i+"\n\tcolumn: "+a+"\n\tnested error: "+e.message;if(n)return p.addWarning({message:s,error:e}),!0;throw l(s)}function y(e,t){return d(e,t,!0)}a.context=p,u.push(a);var g=/^<\?xml /i,b=/ encoding="([^"]+)"/i,v=/^utf-8$/i;function x(e,t){try{u.peek().handleText(e)}catch(e){y(e,t)}}var w=o.getPackages().reduce((function(e,t){return e[t.uri]=t.prefix,e}),{"http://www.w3.org/XML/1998/namespace":"xml"});return c.ns(w).on("openTag",(function(e,t,n,r){var i=e.attrs||{},a=Object.keys(i).reduce((function(e,n){var r=t(i[n]);return e[n]=r,e}),{});!function(e,t){var n=u.peek();try{u.push(n.handleNode(e))}catch(e){d(e,t,s)&&u.push(new m)}}({name:e.name,originalName:e.originalName,attributes:a,ns:e.ns},r)})).on("question",(function(e){if(g.test(e)){var t=b.exec(e),n=t&&t[1];n&&!v.test(n)&&p.addWarning({message:"unsupported document encoding <"+n+">, falling back to UTF-8"})}})).on("closeTag",(function(){u.pop().handleEnd()})).on("cdata",x).on("text",(function(e,t,n){!function(e,t){e.trim()&&x(e,t)}(t(e),n)})).on("error",d).on("warn",y),new Promise((function(t,n){var r;try{c.parse(e),function(){var e,t,n=p.elementsById,r=p.references;for(e=0;t=r[e];e++){var i=t.element,a=n[t.id],o=f(i).propertiesByName[t.property];if(a||p.addWarning({message:"unresolved reference <"+t.id+">",element:t.element,property:t.property,value:t.id}),o.isMany){var s=i.get(o.name),c=s.indexOf(t);-1===c&&(c=s.length),a?s[c]=a:s.splice(c,1)}else i.set(o.name,a)}}()}catch(e){r=e}var i=a.element;r||i||(r=l("failed to parse document as <"+a.type.$descriptor.name+">"));var o=p.warnings,s=p.references,u=p.elementsById;return r?(r.warnings=o,n(r)):t({rootElement:i,elementsById:u,references:s,warnings:o})}))},O.prototype.handler=function(e){return new x(this.model,e)};var j=/<|>|'|"|&|\n\r|\n/g,E=/<|>|&/g;function T(e){var t={},n={},r={},i=[],a=[];this.byUri=function(t){return n[t]||e&&e.byUri(t)},this.add=function(e,t){n[e.uri]=e,t?i.push(e):a.push(e),this.mapPrefix(e.prefix,e.uri)},this.uriByPrefix=function(e){return t[e||"xmlns"]},this.mapPrefix=function(e,n){t[e||"xmlns"]=n},this.getNSKey=function(e){return void 0!==e.prefix?e.uri+"|"+e.prefix:e.uri},this.logUsed=function(t){var n=t.uri,i=this.getNSKey(t);r[i]=this.byUri(n),e&&e.logUsed(t)},this.getUsed=function(e){var t=this;return[].concat(i,a).filter((function(e){var n=t.getNSKey(e);return r[n]}))}}function A(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function P(e){return Object(r.isString)(e)?e:(e.prefix?e.prefix+":":"")+e.localName}var U={"\n":"#10","\n\r":"#10",'"':"#34","'":"#39","<":"#60",">":"#62","&":"#38"},$={"<":"lt",">":"gt","&":"amp"};function k(e,t,n){return(e=Object(r.isString)(e)?e:""+e).replace(t,(function(e){return"&"+n[e]+";"}))}function R(e){this.tagName=e}function z(){}function L(e){this.tagName=e}function B(e,t){this.body=[],this.attrs=[],this.parent=e,this.propertyDescriptor=t}function I(e,t){B.call(this,e,t)}function M(){this.value="",this.write=function(e){this.value+=e}}function S(e,t){var n=[""];this.append=function(t){return e.write(t),this},this.appendNewLine=function(){return t&&e.write("\n"),this},this.appendIndent=function(){return t&&e.write(n.join("  ")),this},this.indent=function(){return n.push(""),this},this.unindent=function(){return n.pop(),this}}function C(e){return e=Object(r.assign)({format:!1,preamble:!0},e||{}),{toXML:function(t,n){var r=n||new M,i=new S(r,e.format);if(e.preamble&&i.append('<?xml version="1.0" encoding="UTF-8"?>\n'),(new B).build(t).serializeTo(i),!n)return r.value}}}R.prototype.build=function(e){return this.element=e,this},R.prototype.serializeTo=function(e){e.appendIndent().append("<"+this.tagName+">"+this.element.id+"</"+this.tagName+">").appendNewLine()},z.prototype.serializeValue=z.prototype.serializeTo=function(e){e.append(this.escape?k(this.value,E,$):this.value)},z.prototype.build=function(e,t){return this.value=t,"String"===e.type&&-1!==t.search(E)&&(this.escape=!0),this},A(L,z),L.prototype.serializeTo=function(e){e.appendIndent().append("<"+this.tagName+">"),this.serializeValue(e),e.append("</"+this.tagName+">").appendNewLine()},B.prototype.build=function(e){this.element=e;var t,n,i,a=e.$descriptor,o=this.propertyDescriptor,s=a.isGeneric;return t=s?this.parseGeneric(e):this.parseNsAttributes(e),this.ns=o?this.nsPropertyTagName(o):this.nsTagName(a),this.tagName=this.addTagName(this.ns),s||(n=function(e){var t=e.$descriptor;return Object(r.filter)(t.properties,(function(t){var n=t.name;if(t.isVirtual)return!1;if(!Object(r.has)(e,n))return!1;var i=e[n];return i!==t.default&&(null!==i&&(!t.isMany||i.length))}))}(e),this.parseAttributes((i=n,Object(r.filter)(i,(function(e){return e.isAttr})))),this.parseContainments(function(e){return Object(r.filter)(e,(function(e){return!e.isAttr}))}(n))),this.parseGenericAttributes(e,t),this},B.prototype.nsTagName=function(e){return function(e,t){return t.isGeneric?Object(r.assign)({localName:t.ns.localName},e):Object(r.assign)({localName:(n=t.ns.localName,i=t.$pkg,o(i)?(a=n).charAt(0).toLowerCase()+a.slice(1):n)},e);var n,i,a}(this.logNamespaceUsed(e.ns),e)},B.prototype.nsPropertyTagName=function(e){return function(e,t){return Object(r.assign)({localName:t.ns.localName},e)}(this.logNamespaceUsed(e.ns),e)},B.prototype.isLocalNs=function(e){return e.uri===this.ns.uri},B.prototype.nsAttributeName=function(e){var t;if(t=Object(r.isString)(e)?Object(a.d)(e):e.ns,e.inherited)return{localName:t.localName};var n=this.logNamespaceUsed(t);return this.getNamespaces().logUsed(n),this.isLocalNs(n)?{localName:t.localName}:Object(r.assign)({localName:t.localName},n)},B.prototype.parseGeneric=function(e){var t=this,n=this.body,i=[];return Object(r.forEach)(e,(function(a,o){"$body"===o?n.push((new z).build({type:"String"},a)):"$children"===o?Object(r.forEach)(a,(function(e){n.push(new B(t).build(e))})):0!==o.indexOf("$")&&t.parseNsAttribute(e,o,a)&&i.push({name:o,value:a})})),i},B.prototype.parseNsAttribute=function(e,t,n){var r,i=e.$model,o=Object(a.d)(t);if("xmlns"===o.prefix&&(r={prefix:o.localName,uri:n}),o.prefix||"xmlns"!==o.localName||(r={uri:n}),!r)return{name:t,value:n};if(i&&i.getPackage(n))this.logNamespace(r,!0,!0);else{var s=this.logNamespaceUsed(r,!0);this.getNamespaces().logUsed(s)}},B.prototype.parseNsAttributes=function(e,t){var n=this,i=e.$attrs,a=[];return Object(r.forEach)(i,(function(t,r){var i=n.parseNsAttribute(e,r,t);i&&a.push(i)})),a},B.prototype.parseGenericAttributes=function(e,t){var n=this;Object(r.forEach)(t,(function(t){if("xsi:type"!==t.name)try{n.addAttribute(n.nsAttributeName(t.name),t.value)}catch(n){console.warn("missing namespace information for ",t.name,"=",t.value,"on",e,n)}}))},B.prototype.parseContainments=function(e){var t=this,n=this.body,i=this.element;Object(r.forEach)(e,(function(e){var o=i.get(e.name),s=e.isReference;if(e.isMany||(o=[o]),e.isBody)n.push((new z).build(e,o[0]));else if(Object(a.c)(e.type))Object(r.forEach)(o,(function(r){n.push(new L(t.addTagName(t.nsPropertyTagName(e))).build(e,r))}));else if(s)Object(r.forEach)(o,(function(r){n.push(new R(t.addTagName(t.nsPropertyTagName(e))).build(r))}));else{var u=c(e),l=function(e){return"property"===p(e)}(e);Object(r.forEach)(o,(function(r){var i;i=u?new I(t,e):l?new B(t,e):new B(t),n.push(i.build(r))}))}}))},B.prototype.getNamespaces=function(e){var t,n=this.namespaces,r=this.parent;return n||(t=r&&r.getNamespaces(),e||!t?this.namespaces=n=new T(t):n=t),n},B.prototype.logNamespace=function(e,t,n){var r=this.getNamespaces(n),i=e.uri,a=e.prefix;return r.byUri(i)&&!n||r.add(e,t),r.mapPrefix(a,i),e},B.prototype.logNamespaceUsed=function(e,t){var n,r,i,a=this.element.$model,o=this.getNamespaces(t),p=e.prefix,c=e.uri;if(!p&&!c)return{localName:e.localName};if(i=s[p]||a&&(a.getPackage(p)||{}).uri,!(c=c||i||o.uriByPrefix(p)))throw new Error("no namespace uri given for prefix <"+p+">");if(!(e=o.byUri(c))){for(n=p,r=1;o.uriByPrefix(n);)n=p+"_"+r++;e=this.logNamespace({prefix:n,uri:c},i===c)}return p&&o.mapPrefix(p,c),e},B.prototype.parseAttributes=function(e){var t=this,n=this.element;Object(r.forEach)(e,(function(e){var i=n.get(e.name);if(e.isReference)if(e.isMany){var a=[];Object(r.forEach)(i,(function(e){a.push(e.id)})),i=a.join(" ")}else i=i.id;t.addAttribute(t.nsAttributeName(e),i)}))},B.prototype.addTagName=function(e){var t=this.logNamespaceUsed(e);return this.getNamespaces().logUsed(t),P(e)},B.prototype.addAttribute=function(e,t){var n=this.attrs;Object(r.isString)(t)&&(t=k(t,j,U)),n.push({name:e,value:t})},B.prototype.serializeAttributes=function(e){var t=this.attrs,n=this.namespaces;n&&(t=function(e){return e.getUsed().filter((function(e){return"xml"!==e.prefix})).map((function(e){return{name:"xmlns"+(e.prefix?":"+e.prefix:""),value:e.uri}}))}(n).concat(t)),Object(r.forEach)(t,(function(t){e.append(" ").append(P(t.name)).append('="').append(t.value).append('"')}))},B.prototype.serializeTo=function(e){var t=this.body[0],n=t&&t.constructor!==z;e.appendIndent().append("<"+this.tagName),this.serializeAttributes(e),e.append(t?">":" />"),t&&(n&&e.appendNewLine().indent(),Object(r.forEach)(this.body,(function(t){t.serializeTo(e)})),n&&e.unindent().appendIndent(),e.append("</"+this.tagName+">")),e.appendNewLine()},A(I,B),I.prototype.parseNsAttributes=function(e){var t=B.prototype.parseNsAttributes.call(this,e),n=e.$descriptor;if(n.name===this.propertyDescriptor.type)return t;var r=this.typeNs=this.nsTagName(n);this.getNamespaces().logUsed(this.typeNs);var i=e.$model.getPackage(r.uri),a=i.xml&&i.xml.typePrefix||"";return this.addAttribute(this.nsAttributeName("xsi:type"),(r.prefix?r.prefix+":":"")+a+n.ns.localName),t},I.prototype.isLocalNs=function(e){return e.uri===(this.typeNs||this.ns).uri}}}]);