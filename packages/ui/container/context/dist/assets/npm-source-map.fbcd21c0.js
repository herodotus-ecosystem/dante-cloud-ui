var e={},n={},r={},t={},o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");t.encode=function(e){if(0<=e&&e<o.length)return o[e];throw new TypeError("Must be between 0 and 63: "+e)},t.decode=function(e){return 65<=e&&e<=90?e-65:97<=e&&e<=122?e-97+26:48<=e&&e<=57?e-48+52:43==e?62:47==e?63:-1};var i=t;r.encode=function(e){var n,r="",t=function(e){return e<0?1+(-e<<1):0+(e<<1)}(e);do{n=31&t,(t>>>=5)>0&&(n|=32),r+=i.encode(n)}while(t>0);return r},r.decode=function(e,n,r){var t,o,s,a,u=e.length,l=0,c=0;do{if(n>=u)throw new Error("Expected more digits in base 64 VLQ value.");if(-1===(o=i.decode(e.charCodeAt(n++))))throw new Error("Invalid base64 digit: "+e.charAt(n-1));t=!!(32&o),l+=(o&=31)<<c,c+=5}while(t);r.value=(a=(s=l)>>1,1==(1&s)?-a:a),r.rest=n};var s={};!function(e){e.getArg=function(e,n,r){if(n in e)return e[n];if(3===arguments.length)return r;throw new Error('"'+n+'" is a required argument.')};var n=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,r=/^data:.+\,.+$/;function t(e){var r=e.match(n);return r?{scheme:r[1],auth:r[2],host:r[3],port:r[4],path:r[5]}:null}function o(e){var n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function i(n){var r=n,i=t(n);if(i){if(!i.path)return n;r=i.path}for(var s,a=e.isAbsolute(r),u=r.split(/\/+/),l=0,c=u.length-1;c>=0;c--)"."===(s=u[c])?u.splice(c,1):".."===s?l++:l>0&&(""===s?(u.splice(c+1,l),l=0):(u.splice(c,2),l--));return""===(r=u.join("/"))&&(r=a?"/":"."),i?(i.path=r,o(i)):r}function s(e,n){""===e&&(e="."),""===n&&(n=".");var s=t(n),a=t(e);if(a&&(e=a.path||"/"),s&&!s.scheme)return a&&(s.scheme=a.scheme),o(s);if(s||n.match(r))return n;if(a&&!a.host&&!a.path)return a.host=n,o(a);var u="/"===n.charAt(0)?n:i(e.replace(/\/+$/,"")+"/"+n);return a?(a.path=u,o(a)):u}e.urlParse=t,e.urlGenerate=o,e.normalize=i,e.join=s,e.isAbsolute=function(e){return"/"===e.charAt(0)||n.test(e)},e.relative=function(e,n){""===e&&(e="."),e=e.replace(/\/$/,"");for(var r=0;0!==n.indexOf(e+"/");){var t=e.lastIndexOf("/");if(t<0)return n;if((e=e.slice(0,t)).match(/^([^\/]+:\/)?\/*$/))return n;++r}return Array(r+1).join("../")+n.substr(e.length+1)};var a=!("__proto__"in Object.create(null));function u(e){return e}function l(e){if(!e)return!1;var n=e.length;if(n<9)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(var r=n-10;r>=0;r--)if(36!==e.charCodeAt(r))return!1;return!0}function c(e,n){return e===n?0:null===e?1:null===n?-1:e>n?1:-1}e.toSetString=a?u:function(e){return l(e)?"$"+e:e},e.fromSetString=a?u:function(e){return l(e)?e.slice(1):e},e.compareByOriginalPositions=function(e,n,r){var t=c(e.source,n.source);return 0!==t||0!==(t=e.originalLine-n.originalLine)||0!==(t=e.originalColumn-n.originalColumn)||r||0!==(t=e.generatedColumn-n.generatedColumn)||0!==(t=e.generatedLine-n.generatedLine)?t:c(e.name,n.name)},e.compareByGeneratedPositionsDeflated=function(e,n,r){var t=e.generatedLine-n.generatedLine;return 0!==t||0!==(t=e.generatedColumn-n.generatedColumn)||r||0!==(t=c(e.source,n.source))||0!==(t=e.originalLine-n.originalLine)||0!==(t=e.originalColumn-n.originalColumn)?t:c(e.name,n.name)},e.compareByGeneratedPositionsInflated=function(e,n){var r=e.generatedLine-n.generatedLine;return 0!==r||0!==(r=e.generatedColumn-n.generatedColumn)||0!==(r=c(e.source,n.source))||0!==(r=e.originalLine-n.originalLine)||0!==(r=e.originalColumn-n.originalColumn)?r:c(e.name,n.name)},e.parseSourceMapInput=function(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))},e.computeSourceURL=function(e,n,r){if(n=n||"",e&&("/"!==e[e.length-1]&&"/"!==n[0]&&(e+="/"),n=e+n),r){var a=t(r);if(!a)throw new Error("sourceMapURL could not be parsed");if(a.path){var u=a.path.lastIndexOf("/");u>=0&&(a.path=a.path.substring(0,u+1))}n=s(o(a),n)}return i(n)}}(s);var a={},u=s,l=Object.prototype.hasOwnProperty,c="undefined"!=typeof Map;function g(){this._array=[],this._set=c?new Map:Object.create(null)}g.fromArray=function(e,n){for(var r=new g,t=0,o=e.length;t<o;t++)r.add(e[t],n);return r},g.prototype.size=function(){return c?this._set.size:Object.getOwnPropertyNames(this._set).length},g.prototype.add=function(e,n){var r=c?e:u.toSetString(e),t=c?this.has(e):l.call(this._set,r),o=this._array.length;t&&!n||this._array.push(e),t||(c?this._set.set(e,o):this._set[r]=o)},g.prototype.has=function(e){if(c)return this._set.has(e);var n=u.toSetString(e);return l.call(this._set,n)},g.prototype.indexOf=function(e){if(c){var n=this._set.get(e);if(n>=0)return n}else{var r=u.toSetString(e);if(l.call(this._set,r))return this._set[r]}throw new Error('"'+e+'" is not in the set.')},g.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},g.prototype.toArray=function(){return this._array.slice()},a.ArraySet=g;var p={},h=s;function d(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}d.prototype.unsortedForEach=function(e,n){this._array.forEach(e,n)},d.prototype.add=function(e){var n,r,t,o,i,s;n=this._last,r=e,t=n.generatedLine,o=r.generatedLine,i=n.generatedColumn,s=r.generatedColumn,o>t||o==t&&s>=i||h.compareByGeneratedPositionsInflated(n,r)<=0?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))},d.prototype.toArray=function(){return this._sorted||(this._array.sort(h.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},p.MappingList=d;var f=r,m=s,_=a.ArraySet,v=p.MappingList;function y(e){e||(e={}),this._file=m.getArg(e,"file",null),this._sourceRoot=m.getArg(e,"sourceRoot",null),this._skipValidation=m.getArg(e,"skipValidation",!1),this._sources=new _,this._names=new _,this._mappings=new v,this._sourcesContents=null}y.prototype._version=3,y.fromSourceMap=function(e){var n=e.sourceRoot,r=new y({file:e.file,sourceRoot:n});return e.eachMapping((function(e){var t={generated:{line:e.generatedLine,column:e.generatedColumn}};null!=e.source&&(t.source=e.source,null!=n&&(t.source=m.relative(n,t.source)),t.original={line:e.originalLine,column:e.originalColumn},null!=e.name&&(t.name=e.name)),r.addMapping(t)})),e.sources.forEach((function(t){var o=t;null!==n&&(o=m.relative(n,t)),r._sources.has(o)||r._sources.add(o);var i=e.sourceContentFor(t);null!=i&&r.setSourceContent(t,i)})),r},y.prototype.addMapping=function(e){var n=m.getArg(e,"generated"),r=m.getArg(e,"original",null),t=m.getArg(e,"source",null),o=m.getArg(e,"name",null);this._skipValidation||this._validateMapping(n,r,t,o),null!=t&&(t=String(t),this._sources.has(t)||this._sources.add(t)),null!=o&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:n.line,generatedColumn:n.column,originalLine:null!=r&&r.line,originalColumn:null!=r&&r.column,source:t,name:o})},y.prototype.setSourceContent=function(e,n){var r=e;null!=this._sourceRoot&&(r=m.relative(this._sourceRoot,r)),null!=n?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[m.toSetString(r)]=n):this._sourcesContents&&(delete this._sourcesContents[m.toSetString(r)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))},y.prototype.applySourceMap=function(e,n,r){var t=n;if(null==n){if(null==e.file)throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');t=e.file}var o=this._sourceRoot;null!=o&&(t=m.relative(o,t));var i=new _,s=new _;this._mappings.unsortedForEach((function(n){if(n.source===t&&null!=n.originalLine){var a=e.originalPositionFor({line:n.originalLine,column:n.originalColumn});null!=a.source&&(n.source=a.source,null!=r&&(n.source=m.join(r,n.source)),null!=o&&(n.source=m.relative(o,n.source)),n.originalLine=a.line,n.originalColumn=a.column,null!=a.name&&(n.name=a.name))}var u=n.source;null==u||i.has(u)||i.add(u);var l=n.name;null==l||s.has(l)||s.add(l)}),this),this._sources=i,this._names=s,e.sources.forEach((function(n){var t=e.sourceContentFor(n);null!=t&&(null!=r&&(n=m.join(r,n)),null!=o&&(n=m.relative(o,n)),this.setSourceContent(n,t))}),this)},y.prototype._validateMapping=function(e,n,r,t){if(n&&"number"!=typeof n.line&&"number"!=typeof n.column)throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");if((!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0)||n||r||t)&&!(e&&"line"in e&&"column"in e&&n&&"line"in n&&"column"in n&&e.line>0&&e.column>=0&&n.line>0&&n.column>=0&&r))throw new Error("Invalid mapping: "+JSON.stringify({generated:e,source:r,original:n,name:t}))},y.prototype._serializeMappings=function(){for(var e,n,r,t,o=0,i=1,s=0,a=0,u=0,l=0,c="",g=this._mappings.toArray(),p=0,h=g.length;p<h;p++){if(e="",(n=g[p]).generatedLine!==i)for(o=0;n.generatedLine!==i;)e+=";",i++;else if(p>0){if(!m.compareByGeneratedPositionsInflated(n,g[p-1]))continue;e+=","}e+=f.encode(n.generatedColumn-o),o=n.generatedColumn,null!=n.source&&(t=this._sources.indexOf(n.source),e+=f.encode(t-l),l=t,e+=f.encode(n.originalLine-1-a),a=n.originalLine-1,e+=f.encode(n.originalColumn-s),s=n.originalColumn,null!=n.name&&(r=this._names.indexOf(n.name),e+=f.encode(r-u),u=r)),c+=e}return c},y.prototype._generateSourcesContent=function(e,n){return e.map((function(e){if(!this._sourcesContents)return null;null!=n&&(e=m.relative(n,e));var r=m.toSetString(e);return Object.prototype.hasOwnProperty.call(this._sourcesContents,r)?this._sourcesContents[r]:null}),this)},y.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return null!=this._file&&(e.file=this._file),null!=this._sourceRoot&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e},y.prototype.toString=function(){return JSON.stringify(this.toJSON())},n.SourceMapGenerator=y;var C={},S={};!function(e){function n(r,t,o,i,s,a){var u=Math.floor((t-r)/2)+r,l=s(o,i[u],!0);return 0===l?u:l>0?t-u>1?n(u,t,o,i,s,a):a==e.LEAST_UPPER_BOUND?t<i.length?t:-1:u:u-r>1?n(r,u,o,i,s,a):a==e.LEAST_UPPER_BOUND?u:r<0?-1:r}e.GREATEST_LOWER_BOUND=1,e.LEAST_UPPER_BOUND=2,e.search=function(r,t,o,i){if(0===t.length)return-1;var s=n(-1,t.length,r,t,o,i||e.GREATEST_LOWER_BOUND);if(s<0)return-1;for(;s-1>=0&&0===o(t[s],t[s-1],!0);)--s;return s}}(S);var A={};function L(e,n,r){var t=e[n];e[n]=e[r],e[r]=t}function M(e,n,r,t){if(r<t){var o=r-1;L(e,(u=r,l=t,Math.round(u+Math.random()*(l-u))),t);for(var i=e[t],s=r;s<t;s++)n(e[s],i)<=0&&L(e,o+=1,s);L(e,o+1,s);var a=o+1;M(e,n,r,a-1),M(e,n,a+1,t)}var u,l}A.quickSort=function(e,n){M(e,n,0,e.length-1)};var w=s,O=S,E=a.ArraySet,R=r,b=A.quickSort;function P(e,n){var r=e;return"string"==typeof e&&(r=w.parseSourceMapInput(e)),null!=r.sections?new U(r,n):new G(r,n)}function G(e,n){var r=e;"string"==typeof e&&(r=w.parseSourceMapInput(e));var t=w.getArg(r,"version"),o=w.getArg(r,"sources"),i=w.getArg(r,"names",[]),s=w.getArg(r,"sourceRoot",null),a=w.getArg(r,"sourcesContent",null),u=w.getArg(r,"mappings"),l=w.getArg(r,"file",null);if(t!=this._version)throw new Error("Unsupported version: "+t);s&&(s=w.normalize(s)),o=o.map(String).map(w.normalize).map((function(e){return s&&w.isAbsolute(s)&&w.isAbsolute(e)?w.relative(s,e):e})),this._names=E.fromArray(i.map(String),!0),this._sources=E.fromArray(o,!0),this._absoluteSources=this._sources.toArray().map((function(e){return w.computeSourceURL(s,e,n)})),this.sourceRoot=s,this.sourcesContent=a,this._mappings=u,this._sourceMapURL=n,this.file=l}function N(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function U(e,n){var r=e;"string"==typeof e&&(r=w.parseSourceMapInput(e));var t=w.getArg(r,"version"),o=w.getArg(r,"sections");if(t!=this._version)throw new Error("Unsupported version: "+t);this._sources=new E,this._names=new E;var i={line:-1,column:0};this._sections=o.map((function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var r=w.getArg(e,"offset"),t=w.getArg(r,"line"),o=w.getArg(r,"column");if(t<i.line||t===i.line&&o<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=r,{generatedOffset:{generatedLine:t+1,generatedColumn:o+1},consumer:new P(w.getArg(e,"map"),n)}}))}P.fromSourceMap=function(e,n){return G.fromSourceMap(e,n)},P.prototype._version=3,P.prototype.__generatedMappings=null,Object.defineProperty(P.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),P.prototype.__originalMappings=null,Object.defineProperty(P.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),P.prototype._charIsMappingSeparator=function(e,n){var r=e.charAt(n);return";"===r||","===r},P.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},P.GENERATED_ORDER=1,P.ORIGINAL_ORDER=2,P.GREATEST_LOWER_BOUND=1,P.LEAST_UPPER_BOUND=2,P.prototype.eachMapping=function(e,n,r){var t,o=n||null;switch(r||P.GENERATED_ORDER){case P.GENERATED_ORDER:t=this._generatedMappings;break;case P.ORIGINAL_ORDER:t=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var i=this.sourceRoot;t.map((function(e){var n=null===e.source?null:this._sources.at(e.source);return{source:n=w.computeSourceURL(i,n,this._sourceMapURL),generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}}),this).forEach(e,o)},P.prototype.allGeneratedPositionsFor=function(e){var n=w.getArg(e,"line"),r={source:w.getArg(e,"source"),originalLine:n,originalColumn:w.getArg(e,"column",0)};if(r.source=this._findSourceIndex(r.source),r.source<0)return[];var t=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",w.compareByOriginalPositions,O.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(void 0===e.column)for(var s=i.originalLine;i&&i.originalLine===s;)t.push({line:w.getArg(i,"generatedLine",null),column:w.getArg(i,"generatedColumn",null),lastColumn:w.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var a=i.originalColumn;i&&i.originalLine===n&&i.originalColumn==a;)t.push({line:w.getArg(i,"generatedLine",null),column:w.getArg(i,"generatedColumn",null),lastColumn:w.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return t},C.SourceMapConsumer=P,G.prototype=Object.create(P.prototype),G.prototype.consumer=P,G.prototype._findSourceIndex=function(e){var n,r=e;if(null!=this.sourceRoot&&(r=w.relative(this.sourceRoot,r)),this._sources.has(r))return this._sources.indexOf(r);for(n=0;n<this._absoluteSources.length;++n)if(this._absoluteSources[n]==e)return n;return-1},G.fromSourceMap=function(e,n){var r=Object.create(G.prototype),t=r._names=E.fromArray(e._names.toArray(),!0),o=r._sources=E.fromArray(e._sources.toArray(),!0);r.sourceRoot=e._sourceRoot,r.sourcesContent=e._generateSourcesContent(r._sources.toArray(),r.sourceRoot),r.file=e._file,r._sourceMapURL=n,r._absoluteSources=r._sources.toArray().map((function(e){return w.computeSourceURL(r.sourceRoot,e,n)}));for(var i=e._mappings.toArray().slice(),s=r.__generatedMappings=[],a=r.__originalMappings=[],u=0,l=i.length;u<l;u++){var c=i[u],g=new N;g.generatedLine=c.generatedLine,g.generatedColumn=c.generatedColumn,c.source&&(g.source=o.indexOf(c.source),g.originalLine=c.originalLine,g.originalColumn=c.originalColumn,c.name&&(g.name=t.indexOf(c.name)),a.push(g)),s.push(g)}return b(r.__originalMappings,w.compareByOriginalPositions),r},G.prototype._version=3,Object.defineProperty(G.prototype,"sources",{get:function(){return this._absoluteSources.slice()}}),G.prototype._parseMappings=function(e,n){for(var r,t,o,i,s,a=1,u=0,l=0,c=0,g=0,p=0,h=e.length,d=0,f={},m={},_=[],v=[];d<h;)if(";"===e.charAt(d))a++,d++,u=0;else if(","===e.charAt(d))d++;else{for((r=new N).generatedLine=a,i=d;i<h&&!this._charIsMappingSeparator(e,i);i++);if(o=f[t=e.slice(d,i)])d+=t.length;else{for(o=[];d<i;)R.decode(e,d,m),s=m.value,d=m.rest,o.push(s);if(2===o.length)throw new Error("Found a source, but no line and column");if(3===o.length)throw new Error("Found a source and line, but no column");f[t]=o}r.generatedColumn=u+o[0],u=r.generatedColumn,o.length>1&&(r.source=g+o[1],g+=o[1],r.originalLine=l+o[2],l=r.originalLine,r.originalLine+=1,r.originalColumn=c+o[3],c=r.originalColumn,o.length>4&&(r.name=p+o[4],p+=o[4])),v.push(r),"number"==typeof r.originalLine&&_.push(r)}b(v,w.compareByGeneratedPositionsDeflated),this.__generatedMappings=v,b(_,w.compareByOriginalPositions),this.__originalMappings=_},G.prototype._findMapping=function(e,n,r,t,o,i){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[t]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[t]);return O.search(e,n,o,i)},G.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},G.prototype.originalPositionFor=function(e){var n={generatedLine:w.getArg(e,"line"),generatedColumn:w.getArg(e,"column")},r=this._findMapping(n,this._generatedMappings,"generatedLine","generatedColumn",w.compareByGeneratedPositionsDeflated,w.getArg(e,"bias",P.GREATEST_LOWER_BOUND));if(r>=0){var t=this._generatedMappings[r];if(t.generatedLine===n.generatedLine){var o=w.getArg(t,"source",null);null!==o&&(o=this._sources.at(o),o=w.computeSourceURL(this.sourceRoot,o,this._sourceMapURL));var i=w.getArg(t,"name",null);return null!==i&&(i=this._names.at(i)),{source:o,line:w.getArg(t,"originalLine",null),column:w.getArg(t,"originalColumn",null),name:i}}}return{source:null,line:null,column:null,name:null}},G.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some((function(e){return null==e})))},G.prototype.sourceContentFor=function(e,n){if(!this.sourcesContent)return null;var r=this._findSourceIndex(e);if(r>=0)return this.sourcesContent[r];var t,o=e;if(null!=this.sourceRoot&&(o=w.relative(this.sourceRoot,o)),null!=this.sourceRoot&&(t=w.urlParse(this.sourceRoot))){var i=o.replace(/^file:\/\//,"");if("file"==t.scheme&&this._sources.has(i))return this.sourcesContent[this._sources.indexOf(i)];if((!t.path||"/"==t.path)&&this._sources.has("/"+o))return this.sourcesContent[this._sources.indexOf("/"+o)]}if(n)return null;throw new Error('"'+o+'" is not in the SourceMap.')},G.prototype.generatedPositionFor=function(e){var n=w.getArg(e,"source");if((n=this._findSourceIndex(n))<0)return{line:null,column:null,lastColumn:null};var r={source:n,originalLine:w.getArg(e,"line"),originalColumn:w.getArg(e,"column")},t=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",w.compareByOriginalPositions,w.getArg(e,"bias",P.GREATEST_LOWER_BOUND));if(t>=0){var o=this._originalMappings[t];if(o.source===r.source)return{line:w.getArg(o,"generatedLine",null),column:w.getArg(o,"generatedColumn",null),lastColumn:w.getArg(o,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},C.BasicSourceMapConsumer=G,U.prototype=Object.create(P.prototype),U.prototype.constructor=P,U.prototype._version=3,Object.defineProperty(U.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var r=0;r<this._sections[n].consumer.sources.length;r++)e.push(this._sections[n].consumer.sources[r]);return e}}),U.prototype.originalPositionFor=function(e){var n={generatedLine:w.getArg(e,"line"),generatedColumn:w.getArg(e,"column")},r=O.search(n,this._sections,(function(e,n){var r=e.generatedLine-n.generatedOffset.generatedLine;return r||e.generatedColumn-n.generatedOffset.generatedColumn})),t=this._sections[r];return t?t.consumer.originalPositionFor({line:n.generatedLine-(t.generatedOffset.generatedLine-1),column:n.generatedColumn-(t.generatedOffset.generatedLine===n.generatedLine?t.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},U.prototype.hasContentsOfAllSources=function(){return this._sections.every((function(e){return e.consumer.hasContentsOfAllSources()}))},U.prototype.sourceContentFor=function(e,n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r].consumer.sourceContentFor(e,!0);if(t)return t}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},U.prototype.generatedPositionFor=function(e){for(var n=0;n<this._sections.length;n++){var r=this._sections[n];if(-1!==r.consumer._findSourceIndex(w.getArg(e,"source"))){var t=r.consumer.generatedPositionFor(e);if(t)return{line:t.line+(r.generatedOffset.generatedLine-1),column:t.column+(r.generatedOffset.generatedLine===t.line?r.generatedOffset.generatedColumn-1:0)}}}return{line:null,column:null}},U.prototype._parseMappings=function(e,n){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var t=this._sections[r],o=t.consumer._generatedMappings,i=0;i<o.length;i++){var s=o[i],a=t.consumer._sources.at(s.source);a=w.computeSourceURL(t.consumer.sourceRoot,a,this._sourceMapURL),this._sources.add(a),a=this._sources.indexOf(a);var u=null;s.name&&(u=t.consumer._names.at(s.name),this._names.add(u),u=this._names.indexOf(u));var l={source:a,generatedLine:s.generatedLine+(t.generatedOffset.generatedLine-1),generatedColumn:s.generatedColumn+(t.generatedOffset.generatedLine===s.generatedLine?t.generatedOffset.generatedColumn-1:0),originalLine:s.originalLine,originalColumn:s.originalColumn,name:u};this.__generatedMappings.push(l),"number"==typeof l.originalLine&&this.__originalMappings.push(l)}b(this.__generatedMappings,w.compareByGeneratedPositionsDeflated),b(this.__originalMappings,w.compareByOriginalPositions)},C.IndexedSourceMapConsumer=U;var B={},j=n.SourceMapGenerator,x=s,I=/(\r?\n)/,T="$$$isSourceNode$$$";function D(e,n,r,t,o){this.children=[],this.sourceContents={},this.line=null==e?null:e,this.column=null==n?null:n,this.source=null==r?null:r,this.name=null==o?null:o,this[T]=!0,null!=t&&this.add(t)}D.fromStringWithSourceMap=function(e,n,r){var t=new D,o=e.split(I),i=0,s=function(){return e()+(e()||"");function e(){return i<o.length?o[i++]:void 0}},a=1,u=0,l=null;return n.eachMapping((function(e){if(null!==l){if(!(a<e.generatedLine)){var n=(r=o[i]||"").substr(0,e.generatedColumn-u);return o[i]=r.substr(e.generatedColumn-u),u=e.generatedColumn,c(l,n),void(l=e)}c(l,s()),a++,u=0}for(;a<e.generatedLine;)t.add(s()),a++;if(u<e.generatedColumn){var r=o[i]||"";t.add(r.substr(0,e.generatedColumn)),o[i]=r.substr(e.generatedColumn),u=e.generatedColumn}l=e}),this),i<o.length&&(l&&c(l,s()),t.add(o.splice(i).join(""))),n.sources.forEach((function(e){var o=n.sourceContentFor(e);null!=o&&(null!=r&&(e=x.join(r,e)),t.setSourceContent(e,o))})),t;function c(e,n){if(null===e||void 0===e.source)t.add(n);else{var o=r?x.join(r,e.source):e.source;t.add(new D(e.originalLine,e.originalColumn,o,n,e.name))}}},D.prototype.add=function(e){if(Array.isArray(e))e.forEach((function(e){this.add(e)}),this);else{if(!e[T]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);e&&this.children.push(e)}return this},D.prototype.prepend=function(e){if(Array.isArray(e))for(var n=e.length-1;n>=0;n--)this.prepend(e[n]);else{if(!e[T]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);this.children.unshift(e)}return this},D.prototype.walk=function(e){for(var n,r=0,t=this.children.length;r<t;r++)(n=this.children[r])[T]?n.walk(e):""!==n&&e(n,{source:this.source,line:this.line,column:this.column,name:this.name})},D.prototype.join=function(e){var n,r,t=this.children.length;if(t>0){for(n=[],r=0;r<t-1;r++)n.push(this.children[r]),n.push(e);n.push(this.children[r]),this.children=n}return this},D.prototype.replaceRight=function(e,n){var r=this.children[this.children.length-1];return r[T]?r.replaceRight(e,n):"string"==typeof r?this.children[this.children.length-1]=r.replace(e,n):this.children.push("".replace(e,n)),this},D.prototype.setSourceContent=function(e,n){this.sourceContents[x.toSetString(e)]=n},D.prototype.walkSourceContents=function(e){for(var n=0,r=this.children.length;n<r;n++)this.children[n][T]&&this.children[n].walkSourceContents(e);var t=Object.keys(this.sourceContents);for(n=0,r=t.length;n<r;n++)e(x.fromSetString(t[n]),this.sourceContents[t[n]])},D.prototype.toString=function(){var e="";return this.walk((function(n){e+=n})),e},D.prototype.toStringWithSourceMap=function(e){var n={code:"",line:1,column:0},r=new j(e),t=!1,o=null,i=null,s=null,a=null;return this.walk((function(e,u){n.code+=e,null!==u.source&&null!==u.line&&null!==u.column?(o===u.source&&i===u.line&&s===u.column&&a===u.name||r.addMapping({source:u.source,original:{line:u.line,column:u.column},generated:{line:n.line,column:n.column},name:u.name}),o=u.source,i=u.line,s=u.column,a=u.name,t=!0):t&&(r.addMapping({generated:{line:n.line,column:n.column}}),o=null,t=!1);for(var l=0,c=e.length;l<c;l++)10===e.charCodeAt(l)?(n.line++,n.column=0,l+1===c?(o=null,t=!1):t&&r.addMapping({source:u.source,original:{line:u.line,column:u.column},generated:{line:n.line,column:n.column},name:u.name})):n.column++})),this.walkSourceContents((function(e,n){r.setSourceContent(e,n)})),{code:n.code,map:r}},B.SourceNode=D,e.SourceMapGenerator=n.SourceMapGenerator,e.SourceMapConsumer=C.SourceMapConsumer,e.SourceNode=B.SourceNode;export{e as s};
