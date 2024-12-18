!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).Airbrake={})}(this,(function(t){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,r)};function r(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}var n=function(){return(n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};var o=setTimeout;function i(t){return Boolean(t&&void 0!==t.length)}function s(){}function a(t){if(!(this instanceof a))throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(t,this)}function u(t,e){for(;3===t._state;)t=t._value;0!==t._state?(t._handled=!0,a._immediateFn((function(){var r=1===t._state?e.onFulfilled:e.onRejected;if(null!==r){var n;try{n=r(t._value)}catch(t){return void h(e.promise,t)}c(e.promise,n)}else(1===t._state?c:h)(e.promise,t._value)}))):t._deferreds.push(e)}function c(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof a)return t._state=3,t._value=e,void f(t);if("function"==typeof r)return void l((n=r,o=e,function(){n.apply(o,arguments)}),t)}t._state=1,t._value=e,f(t)}catch(e){h(t,e)}var n,o}function h(t,e){t._state=2,t._value=e,f(t)}function f(t){2===t._state&&0===t._deferreds.length&&a._immediateFn((function(){t._handled||a._unhandledRejectionFn(t._value)}));for(var e=0,r=t._deferreds.length;e<r;e++)u(t,t._deferreds[e]);t._deferreds=null}function p(t,e,r){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=r}function l(t,e){var r=!1;try{t((function(t){r||(r=!0,c(e,t))}),(function(t){r||(r=!0,h(e,t))}))}catch(t){if(r)return;r=!0,h(e,t)}}a.prototype.catch=function(t){return this.then(null,t)},a.prototype.then=function(t,e){var r=new this.constructor(s);return u(this,new p(t,e,r)),r},a.prototype.finally=function(t){var e=this.constructor;return this.then((function(r){return e.resolve(t()).then((function(){return r}))}),(function(r){return e.resolve(t()).then((function(){return e.reject(r)}))}))},a.all=function(t){return new a((function(e,r){if(!i(t))return r(new TypeError("Promise.all accepts an array"));var n=Array.prototype.slice.call(t);if(0===n.length)return e([]);var o=n.length;function s(t,i){try{if(i&&("object"==typeof i||"function"==typeof i)){var a=i.then;if("function"==typeof a)return void a.call(i,(function(e){s(t,e)}),r)}n[t]=i,0==--o&&e(n)}catch(t){r(t)}}for(var a=0;a<n.length;a++)s(a,n[a])}))},a.allSettled=function(t){return new this((function(e,r){if(!t||void 0===t.length)return r(new TypeError(typeof t+" "+t+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var n=Array.prototype.slice.call(t);if(0===n.length)return e([]);var o=n.length;function i(t,r){if(r&&("object"==typeof r||"function"==typeof r)){var s=r.then;if("function"==typeof s)return void s.call(r,(function(e){i(t,e)}),(function(r){n[t]={status:"rejected",reason:r},0==--o&&e(n)}))}n[t]={status:"fulfilled",value:r},0==--o&&e(n)}for(var s=0;s<n.length;s++)i(s,n[s])}))},a.resolve=function(t){return t&&"object"==typeof t&&t.constructor===a?t:new a((function(e){e(t)}))},a.reject=function(t){return new a((function(e,r){r(t)}))},a.race=function(t){return new a((function(e,r){if(!i(t))return r(new TypeError("Promise.race accepts an array"));for(var n=0,o=t.length;n<o;n++)a.resolve(t[n]).then(e,r)}))},a._immediateFn="function"==typeof setImmediate&&function(t){setImmediate(t)}||function(t){o(t,0)},a._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)};function d(t,e){return t>>e||1}var y=function(){function t(t){this.maxStringLength=1024,this.maxObjectLength=128,this.maxArrayLength=128,this.maxDepth=8,this.keys=[],this.keysBlocklist=[],this.seen=[];var e=t.level||0;this.keysBlocklist=t.keysBlocklist||[],this.maxStringLength=d(this.maxStringLength,e),this.maxObjectLength=d(this.maxObjectLength,e),this.maxArrayLength=d(this.maxArrayLength,e),this.maxDepth=d(this.maxDepth,e)}return t.prototype.truncate=function(t,e,r){if(void 0===e&&(e=""),void 0===r&&(r=0),null==t)return t;switch(typeof t){case"boolean":case"number":case"function":return t;case"string":return this.truncateString(t);case"object":break;default:return this.truncateString(String(t))}if(t instanceof String)return this.truncateString(t.toString());if(t instanceof Boolean||t instanceof Number||t instanceof Date||t instanceof RegExp)return t;if(t instanceof Error)return this.truncateString(t.toString());if(this.seen.indexOf(t)>=0)return"[Circular "+this.getPath(t)+"]";var n=function(t){return Object.prototype.toString.apply(t).slice("[object ".length,-1)}(t);if(++r>this.maxDepth)return"[Truncated "+n+"]";switch(this.keys.push(e),this.seen.push(t),n){case"Array":return this.truncateArray(t,r);case"Object":return this.truncateObject(t,r);default:var o=this.maxDepth;this.maxDepth=0;var i=this.truncateObject(t,r);return i.__type=n,this.maxDepth=o,i}},t.prototype.getPath=function(t){for(var e=this.seen.indexOf(t),r=[this.keys[e]],n=e;n>=0;n--){var o=this.seen[n];o&&v(o,r[0])===t&&(t=o,r.unshift(this.keys[n]))}return"~"+r.join(".")},t.prototype.truncateString=function(t){return t.length>this.maxStringLength?t.slice(0,this.maxStringLength)+"...":t},t.prototype.truncateArray=function(t,e){void 0===e&&(e=0);for(var r=0,n=[],o=0;o<t.length;o++){var i=t[o];if(n.push(this.truncate(i,o.toString(),e)),++r>=this.maxArrayLength)break}return n},t.prototype.truncateObject=function(t,e){void 0===e&&(e=0);var r=0,n={};for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o))if(_(o,this.keysBlocklist))n[o]="[Filtered]";else{var i=v(t,o);if(void 0!==i&&"function"!=typeof i&&(n[o]=this.truncate(i,o,e),++r>=this.maxObjectLength))break}return n},t}();function m(t,e){return void 0===e&&(e={}),new y(e).truncate(t)}function v(t,e){try{return t[e]}catch(t){return}}function _(t,e){for(var r=0,n=e;r<n.length;r++){var o=n[r];if(o===t)return!0;if(o instanceof RegExp&&t.match(o))return!0}return!1}var g=function(){function t(t,e,r){this._dur=0,this._level=0,this._metric=t,this.name=e,this.startTime=r||new Date}return t.prototype.end=function(t){this.endTime=t||new Date,this._dur+=this.endTime.getTime()-this.startTime.getTime(),this._metric._incGroup(this.name,this._dur),this._metric=null},t.prototype._pause=function(){if(!this._paused()){var t=new Date;this._dur+=t.getTime()-this.startTime.getTime(),this.startTime=null}},t.prototype._resume=function(){this._paused()&&(this.startTime=new Date)},t.prototype._paused=function(){return null==this.startTime},t}(),w=function(){function t(){this._spans={},this._groups={},this.startTime=new Date}return t.prototype.end=function(t){this.endTime||(this.endTime=t||new Date)},t.prototype.isRecording=function(){return!0},t.prototype.startSpan=function(t,e){var r=this._spans[t];r?r._level++:(r=new g(this,t,e),this._spans[t]=r)},t.prototype.endSpan=function(t,e){var r=this._spans[t];r?r._level>0?r._level--:(r.end(e),delete this._spans[r.name]):console.error("airbrake: span=%s does not exist",t)},t.prototype._incGroup=function(t,e){this._groups[t]=(this._groups[t]||0)+e},t.prototype._duration=function(){return this.endTime||(this.endTime=new Date),this.endTime.getTime()-this.startTime.getTime()},t}(),b=function(){function t(){}return t.prototype.isRecording=function(){return!1},t.prototype.startSpan=function(t,e){},t.prototype.endSpan=function(t,e){},t.prototype._incGroup=function(t,e){},t}(),x=function(){function t(){this._noopMetric=new b,this._context={},this._historyMaxLen=20,this._history=[]}return t.prototype.clone=function(){var e=new t;return e._context=n({},this._context),e._history=this._history.slice(),e},t.prototype.setContext=function(t){this._context=n(n({},this._context),t)},t.prototype.context=function(){var t=n({},this._context);return this._history.length>0&&(t.history=this._history.slice()),t},t.prototype.pushHistory=function(t){this._isDupState(t)?this._lastRecord.num?this._lastRecord.num++:this._lastRecord.num=2:(t.date||(t.date=new Date),this._history.push(t),this._lastRecord=t,this._history.length>this._historyMaxLen&&(this._history=this._history.slice(-this._historyMaxLen)))},t.prototype._isDupState=function(t){if(!this._lastRecord)return!1;for(var e in t)if(t.hasOwnProperty(e)&&"date"!==e&&t[e]!==this._lastRecord[e])return!1;return!0},t.prototype.routeMetric=function(){return this._routeMetric||this._noopMetric},t.prototype.setRouteMetric=function(t){this._routeMetric=t},t.prototype.queueMetric=function(){return this._queueMetric||this._noopMetric},t.prototype.setQueueMetric=function(t){this._queueMetric=t},t}(),O="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function E(t){var e={exports:{}};return t(e,e.exports),e.exports}var T=E((function(t,e){t.exports=function(){function t(t){return!isNaN(parseFloat(t))&&isFinite(t)}function e(t){return t.charAt(0).toUpperCase()+t.substring(1)}function r(t){return function(){return this[t]}}var n=["isConstructor","isEval","isNative","isToplevel"],o=["columnNumber","lineNumber"],i=["fileName","functionName","source"],s=["args"],a=n.concat(o,i,s);function u(t){if(t)for(var r=0;r<a.length;r++)void 0!==t[a[r]]&&this["set"+e(a[r])](t[a[r]])}u.prototype={getArgs:function(){return this.args},setArgs:function(t){if("[object Array]"!==Object.prototype.toString.call(t))throw new TypeError("Args must be an Array");this.args=t},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(t){if(t instanceof u)this.evalOrigin=t;else{if(!(t instanceof Object))throw new TypeError("Eval Origin must be an Object or StackFrame");this.evalOrigin=new u(t)}},toString:function(){var t=this.getFileName()||"",e=this.getLineNumber()||"",r=this.getColumnNumber()||"",n=this.getFunctionName()||"";return this.getIsEval()?t?"[eval] ("+t+":"+e+":"+r+")":"[eval]:"+e+":"+r:n?n+" ("+t+":"+e+":"+r+")":t+":"+e+":"+r}},u.fromString=function(t){var e=t.indexOf("("),r=t.lastIndexOf(")"),n=t.substring(0,e),o=t.substring(e+1,r).split(","),i=t.substring(r+1);if(0===i.indexOf("@"))var s=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(i,""),a=s[1],c=s[2],h=s[3];return new u({functionName:n,args:o||void 0,fileName:a,lineNumber:c||void 0,columnNumber:h||void 0})};for(var c=0;c<n.length;c++)u.prototype["get"+e(n[c])]=r(n[c]),u.prototype["set"+e(n[c])]=function(t){return function(e){this[t]=Boolean(e)}}(n[c]);for(var h=0;h<o.length;h++)u.prototype["get"+e(o[h])]=r(o[h]),u.prototype["set"+e(o[h])]=function(e){return function(r){if(!t(r))throw new TypeError(e+" must be a Number");this[e]=Number(r)}}(o[h]);for(var f=0;f<i.length;f++)u.prototype["get"+e(i[f])]=r(i[f]),u.prototype["set"+e(i[f])]=function(t){return function(e){this[t]=String(e)}}(i[f]);return u}()})),j=E((function(t,e){var r,n,o,i;t.exports=(r=T,n=/(^|@)\S+:\d+/,o=/^\s*at .*(\S+:\d+|\(native\))/m,i=/^(eval@)?(\[native code])?$/,{parse:function(t){if(void 0!==t.stacktrace||void 0!==t["opera#sourceloc"])return this.parseOpera(t);if(t.stack&&t.stack.match(o))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},extractLocation:function(t){if(-1===t.indexOf(":"))return[t];var e=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t.replace(/[()]/g,""));return[e[1],e[2]||void 0,e[3]||void 0]},parseV8OrIE:function(t){return t.stack.split("\n").filter((function(t){return!!t.match(o)}),this).map((function(t){t.indexOf("(eval ")>-1&&(t=t.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(\),.*$)/g,""));var e=t.replace(/^\s+/,"").replace(/\(eval code/g,"("),n=e.match(/ (\((.+):(\d+):(\d+)\)$)/),o=(e=n?e.replace(n[0],""):e).split(/\s+/).slice(1),i=this.extractLocation(n?n[1]:o.pop()),s=o.join(" ")||void 0,a=["eval","<anonymous>"].indexOf(i[0])>-1?void 0:i[0];return new r({functionName:s,fileName:a,lineNumber:i[1],columnNumber:i[2],source:t})}),this)},parseFFOrSafari:function(t){return t.stack.split("\n").filter((function(t){return!t.match(i)}),this).map((function(t){if(t.indexOf(" > eval")>-1&&(t=t.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),-1===t.indexOf("@")&&-1===t.indexOf(":"))return new r({functionName:t});var e=/((.*".+"[^@]*)?[^@]*)(?:@)/,n=t.match(e),o=n&&n[1]?n[1]:void 0,i=this.extractLocation(t.replace(e,""));return new r({functionName:o,fileName:i[0],lineNumber:i[1],columnNumber:i[2],source:t})}),this)},parseOpera:function(t){return!t.stacktrace||t.message.indexOf("\n")>-1&&t.message.split("\n").length>t.stacktrace.split("\n").length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},parseOpera9:function(t){for(var e=/Line (\d+).*script (?:in )?(\S+)/i,n=t.message.split("\n"),o=[],i=2,s=n.length;i<s;i+=2){var a=e.exec(n[i]);a&&o.push(new r({fileName:a[2],lineNumber:a[1],source:n[i]}))}return o},parseOpera10:function(t){for(var e=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,n=t.stacktrace.split("\n"),o=[],i=0,s=n.length;i<s;i+=2){var a=e.exec(n[i]);a&&o.push(new r({functionName:a[3]||void 0,fileName:a[2],lineNumber:a[1],source:n[i]}))}return o},parseOpera11:function(t){return t.stack.split("\n").filter((function(t){return!!t.match(n)&&!t.match(/^Error created at/)}),this).map((function(t){var e,n=t.split("@"),o=this.extractLocation(n.pop()),i=n.shift()||"",s=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0;i.match(/\(([^)]*)\)/)&&(e=i.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var a=void 0===e||"[arguments not available]"===e?void 0:e.split(",");return new r({functionName:s,args:a,fileName:o[0],lineNumber:o[1],columnNumber:o[2],source:t})}),this)}})})),S="object"==typeof console&&console.warn;function k(t){try{return j.parse(t)}catch(e){S&&t.stack&&console.warn("ErrorStackParser:",e.toString(),t.stack)}return t.fileName?[t]:[]}function N(t){var e=[];if(t.noStack)e.push({function:t.functionName||"",file:t.fileName||"",line:t.lineNumber||0,column:t.columnNumber||0});else{var r=k(t);if(0===r.length)try{throw new Error("fake")}catch(t){(r=k(t)).shift(),r.shift()}for(var n=0,o=r;n<o.length;n++){var i=o[n];e.push({function:i.functionName||"",file:i.fileName||"",line:i.lineNumber||0,column:i.columnNumber||0})}}return{type:t.name?t.name:"",message:t.message?String(t.message):String(t),backtrace:e}}var A=new RegExp(["^","\\[(\\$.+)\\]","\\s","([\\s\\S]+)","$"].join(""));function L(t){var e=t.errors[0];if(""!==e.type&&"Error"!==e.type)return t;var r=e.message.match(A);return null!==r&&(e.type=r[1],e.message=r[2]),t}var D=["Script error","Script error.","InvalidAccessError"];function R(t){var e=t.errors[0];if(""===e.type&&-1!==D.indexOf(e.message))return null;if(e.backtrace&&e.backtrace.length>0&&"<anonymous>"===e.backtrace[0].file)return null;return t}var q=new RegExp(["^","Uncaught\\s","(.+?)",":\\s","(.+)","$"].join(""));function P(t){var e=t.errors[0];if(""!==e.type&&"Error"!==e.type)return t;var r=e.message.match(q);return null!==r&&(e.type=r[1],e.message=r[2]),t}var B=E((function(t,e){var r=function(t){function e(){this.fetch=!1,this.DOMException=t.DOMException}return e.prototype=t,new e}("undefined"!=typeof self?self:O);!function(t){!function(e){var r="URLSearchParams"in t,n="Symbol"in t&&"iterator"in Symbol,o="FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),i="FormData"in t,s="ArrayBuffer"in t;if(s)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(t){return t&&a.indexOf(Object.prototype.toString.call(t))>-1};function c(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function h(t){return"string"!=typeof t&&(t=String(t)),t}function f(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return n&&(e[Symbol.iterator]=function(){return e}),e}function p(t){this.map={},t instanceof p?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function l(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function d(t){return new Promise((function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}}))}function y(t){var e=new FileReader,r=d(e);return e.readAsArrayBuffer(t),r}function m(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function v(){return this.bodyUsed=!1,this._initBody=function(t){var e;this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:o&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:i&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:r&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():s&&o&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=m(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s&&(ArrayBuffer.prototype.isPrototypeOf(t)||u(t))?this._bodyArrayBuffer=m(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},o&&(this.blob=function(){var t=l(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?l(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(y)}),this.text=function(){var t,e,r,n=l(this);if(n)return n;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=d(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i&&(this.formData=function(){return this.text().then(w)}),this.json=function(){return this.text().then(JSON.parse)},this}p.prototype.append=function(t,e){t=c(t),e=h(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},p.prototype.delete=function(t){delete this.map[c(t)]},p.prototype.get=function(t){return t=c(t),this.has(t)?this.map[t]:null},p.prototype.has=function(t){return this.map.hasOwnProperty(c(t))},p.prototype.set=function(t,e){this.map[c(t)]=h(e)},p.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},p.prototype.keys=function(){var t=[];return this.forEach((function(e,r){t.push(r)})),f(t)},p.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),f(t)},p.prototype.entries=function(){var t=[];return this.forEach((function(e,r){t.push([r,e])})),f(t)},n&&(p.prototype[Symbol.iterator]=p.prototype.entries);var _=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function g(t,e){var r,n,o=(e=e||{}).body;if(t instanceof g){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new p(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,o||null==t._bodyInit||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new p(e.headers)),this.method=(r=e.method||this.method||"GET",n=r.toUpperCase(),_.indexOf(n)>-1?n:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function w(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}})),e}function b(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new p(e.headers),this.url=e.url||"",this._initBody(t)}g.prototype.clone=function(){return new g(this,{body:this._bodyInit})},v.call(g.prototype),v.call(b.prototype),b.prototype.clone=function(){return new b(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new p(this.headers),url:this.url})},b.error=function(){var t=new b(null,{status:0,statusText:""});return t.type="error",t};var x=[301,302,303,307,308];b.redirect=function(t,e){if(-1===x.indexOf(e))throw new RangeError("Invalid status code");return new b(null,{status:e,headers:{location:t}})},e.DOMException=t.DOMException;try{new e.DOMException}catch(t){e.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},e.DOMException.prototype=Object.create(Error.prototype),e.DOMException.prototype.constructor=e.DOMException}function O(t,r){return new Promise((function(n,i){var s=new g(t,r);if(s.signal&&s.signal.aborted)return i(new e.DOMException("Aborted","AbortError"));var a=new XMLHttpRequest;function u(){a.abort()}a.onload=function(){var t,e,r={status:a.status,statusText:a.statusText,headers:(t=a.getAllResponseHeaders()||"",e=new p,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}})),e)};r.url="responseURL"in a?a.responseURL:r.headers.get("X-Request-URL");var o="response"in a?a.response:a.responseText;n(new b(o,r))},a.onerror=function(){i(new TypeError("Network request failed"))},a.ontimeout=function(){i(new TypeError("Network request failed"))},a.onabort=function(){i(new e.DOMException("Aborted","AbortError"))},a.open(s.method,s.url,!0),"include"===s.credentials?a.withCredentials=!0:"omit"===s.credentials&&(a.withCredentials=!1),"responseType"in a&&o&&(a.responseType="blob"),s.headers.forEach((function(t,e){a.setRequestHeader(e,t)})),s.signal&&(s.signal.addEventListener("abort",u),a.onreadystatechange=function(){4===a.readyState&&s.signal.removeEventListener("abort",u)}),a.send(void 0===s._bodyInit?null:s._bodyInit)}))}O.polyfill=!0,t.fetch||(t.fetch=O,t.Headers=p,t.Request=g,t.Response=b),e.Headers=p,e.Request=g,e.Response=b,e.fetch=O}({})}(r),delete r.fetch.polyfill,(e=r.fetch).default=r.fetch,e.fetch=r.fetch,e.Headers=r.Headers,e.Request=r.Request,e.Response=r.Response,t.exports=e})),C={unauthorized:new Error("airbrake: unauthorized: project id or key are wrong"),ipRateLimited:new Error("airbrake: IP is rate limited")},F=0;function M(t){if(Date.now()/1e3<F)return a.reject(C.ipRateLimited);var e={method:t.method,body:t.body};return B(t.url,e).then((function(t){if(401===t.status)throw C.unauthorized;if(429===t.status){var e=t.headers.get("X-RateLimit-Delay");if(!e)throw C.ipRateLimited;var r=parseInt(e,10);throw r>0&&(F=Date.now()/1e3+r),C.ipRateLimited}if(204===t.status)return{json:null};if(404===t.status)throw new Error("404 Not Found");return t.status>=200&&t.status<300?t.json().then((function(t){return{json:t}})):t.status>=400&&t.status<500?t.json().then((function(t){throw new Error(t.message)})):t.text().then((function(e){throw new Error("airbrake: fetch: unexpected response: code="+t.status+" body='"+e+"'")}))}))}function I(t){return function(e){return function(t,e){if(Date.now()/1e3<H)return a.reject(C.ipRateLimited);return new a((function(r,n){e({url:t.url,method:t.method,body:t.body,headers:{"content-type":"application/json"},timeout:t.timeout},(function(t,e,o){if(t)n(t);else{if(!e.statusCode)return t=new Error("airbrake: request: response statusCode is "+e.statusCode),void n(t);if(401!==e.statusCode)if(429!==e.statusCode)if(204!==e.statusCode)if(e.statusCode>=200&&e.statusCode<300){var i=void 0;try{i=JSON.parse(o)}catch(t){return void n(t)}r(i)}else{if(e.statusCode>=400&&e.statusCode<500){i=void 0;try{i=JSON.parse(o)}catch(t){return void n(t)}return t=new Error(i.message),void n(t)}o=o.trim(),t=new Error("airbrake: node: unexpected response: code="+e.statusCode+" body='"+o+"'"),n(t)}else r({json:null});else{n(C.ipRateLimited);var s=e.headers["x-ratelimit-delay"];if(!s)return;var a=void 0;if("string"==typeof s)a=s;else{if(!(s instanceof Array))return;a=s[0]}var u=parseInt(a,10);u>0&&(H=Date.now()/1e3+u)}else n(C.unauthorized)}}))}))}(e,t)}}var U,H=0;function J(t){return t.request?I(t.request):M}var $=!1;try{U=require("tdigest"),$=!0}catch(t){}var G=function(){function t(){this.count=0,this.sum=0,this.sumsq=0,this._td=new U.Digest}return t.prototype.add=function(t){0===t&&(t=1e-5),this.count+=1,this.sum+=t,this.sumsq+=t*t,this._td&&this._td.push(t)},t.prototype.toJSON=function(){return{count:this.count,sum:this.sum,sumsq:this.sumsq,tdigestCentroids:W(this._td)}},t}(),X=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.groups={},e}return r(e,t),e.prototype.addGroups=function(t,e){for(var r in this.add(t),e)e.hasOwnProperty(r)&&this.addGroup(r,e[r])},e.prototype.addGroup=function(t,e){var r=this.groups[t];r||(r=new G,this.groups[t]=r),r.add(e)},e.prototype.toJSON=function(){return{count:this.count,sum:this.sum,sumsq:this.sumsq,tdigestCentroids:W(this._td),groups:this.groups}},e}(G);function W(t){var e=[],r=[];return t.centroids.each((function(t){e.push(t.mean),r.push(t.n)})),{mean:e,count:r}}var K=function(){function t(t){void 0===t&&(t=""),this.method="",this.route="",this.query="",this.func="",this.file="",this.line=0,this.startTime=new Date,this.query=t}return t.prototype._duration=function(){return this.endTime||(this.endTime=new Date),this.endTime.getTime()-this.startTime.getTime()},t}(),V=function(){function t(t){this._m={},this._opt=t,this._url=t.host+"/api/v5/projects/"+t.projectId+"/queries-stats?key="+t.projectKey,this._requester=J(t)}return t.prototype.start=function(t){return void 0===t&&(t=""),new K(t)},t.prototype.notify=function(t){var e=this;if($){var r=t._duration(),n=new Date(6e4*Math.floor(t.startTime.getTime()/6e4)),o={method:t.method,route:t.route,query:t.query,func:t.func,file:t.file,line:t.line,time:n},i=JSON.stringify(o),s=this._m[i];s||(s=new G,this._m[i]=s),s.add(r),this._timer||(this._timer=setTimeout((function(){e._flush()}),15e3))}},t.prototype._flush=function(){var t=[];for(var e in this._m)if(this._m.hasOwnProperty(e)){var r=JSON.parse(e),o=n(n({},r),this._m[e].toJSON());t.push(o)}this._m={},this._timer=null;var i=JSON.stringify({environment:this._opt.environment,queries:t}),s={method:"POST",url:this._url,body:i};this._requester(s).then((function(t){})).catch((function(t){console.error&&console.error("can not report queries stats",t)}))},t}(),z=function(t){function e(e){var r=t.call(this)||this;return r.queue=e,r.startTime=new Date,r}return r(e,t),e}(w),Q=function(){function t(t){this._m={},this._opt=t,this._url=t.host+"/api/v5/projects/"+t.projectId+"/queues-stats?key="+t.projectKey,this._requester=J(t)}return t.prototype.notify=function(t){var e=this;if($){var r=t._duration();0===r&&(r=1e-5);var n=new Date(6e4*Math.floor(t.startTime.getTime()/6e4)),o={queue:t.queue,time:n},i=JSON.stringify(o),s=this._m[i];s||(s=new X,this._m[i]=s),s.addGroups(r,t._groups),this._timer||(this._timer=setTimeout((function(){e._flush()}),15e3))}},t.prototype._flush=function(){var t=[];for(var e in this._m)if(this._m.hasOwnProperty(e)){var r=JSON.parse(e),o=n(n({},r),this._m[e].toJSON());t.push(o)}this._m={},this._timer=null;var i=JSON.stringify({environment:this._opt.environment,queues:t}),s={method:"POST",url:this._url,body:i};this._requester(s).then((function(t){})).catch((function(t){console.error&&console.error("can not report queues breakdowns",t)}))},t}(),Y=function(t){function e(e,r,n,o){void 0===e&&(e=""),void 0===r&&(r=""),void 0===n&&(n=0),void 0===o&&(o="");var i=t.call(this)||this;return i.method=e,i.route=r,i.statusCode=n,i.contentType=o,i.startTime=new Date,i}return r(e,t),e}(w),Z=function(){function t(t){this._m={},this._opt=t,this._url=t.host+"/api/v5/projects/"+t.projectId+"/routes-stats?key="+t.projectKey,this._requester=J(t)}return t.prototype.notify=function(t){var e=this;if($){var r=t._duration(),n=new Date(6e4*Math.floor(t.startTime.getTime()/6e4)),o={method:t.method,route:t.route,statusCode:t.statusCode,time:n},i=JSON.stringify(o),s=this._m[i];s||(s=new G,this._m[i]=s),s.add(r),this._timer||(this._timer=setTimeout((function(){e._flush()}),15e3))}},t.prototype._flush=function(){var t=[];for(var e in this._m)if(this._m.hasOwnProperty(e)){var r=JSON.parse(e),o=n(n({},r),this._m[e].toJSON());t.push(o)}this._m={},this._timer=null;var i=JSON.stringify({environment:this._opt.environment,routes:t}),s={method:"POST",url:this._url,body:i};this._requester(s).then((function(t){})).catch((function(t){console.error&&console.error("can not report routes stats",t)}))},t}(),tt=function(){function t(t){this._m={},this._opt=t,this._url=t.host+"/api/v5/projects/"+t.projectId+"/routes-breakdowns?key="+t.projectKey,this._requester=J(t)}return t.prototype.notify=function(t){var e=this;if($&&!(t.statusCode<200||t.statusCode>=300&&t.statusCode<400||404===t.statusCode||0===Object.keys(t._groups).length)){var r=t._duration();0===r&&(r=1e-5);var n=new Date(6e4*Math.floor(t.startTime.getTime()/6e4)),o={method:t.method,route:t.route,responseType:this._responseType(t),time:n},i=JSON.stringify(o),s=this._m[i];s||(s=new X,this._m[i]=s),s.addGroups(r,t._groups),this._timer||(this._timer=setTimeout((function(){e._flush()}),15e3))}},t.prototype._flush=function(){var t=[];for(var e in this._m)if(this._m.hasOwnProperty(e)){var r=JSON.parse(e),o=n(n({},r),this._m[e].toJSON());t.push(o)}this._m={},this._timer=null;var i=JSON.stringify({environment:this._opt.environment,routes:t}),s={method:"POST",url:this._url,body:i};this._requester(s).then((function(t){})).catch((function(t){console.error&&console.error("can not report routes breakdowns",t)}))},t.prototype._responseType=function(t){return t.statusCode>=500?"5xx":t.statusCode>=400?"4xx":t.contentType?t.contentType.split(";")[0].split("/")[-1]:""},t}(),et=function(){function t(t){var e,r,n=this;if(this._filters=[],this._performanceFilters=[],this._scope=new x,this._onClose=[],!t.projectId||!t.projectKey)throw new Error("airbrake: projectId and projectKey are required");this._opt=t,this._opt.host=this._opt.host||"https://api.airbrake.io",this._opt.timeout=this._opt.timeout||1e4,this._opt.keysBlocklist=this._opt.keysBlocklist||this._opt.keysBlacklist||[/password/,/secret/],this._url=this._opt.host+"/api/v3/projects/"+this._opt.projectId+"/notices?key="+this._opt.projectKey,this._processor=this._opt.processor||N,this._requester=J(this._opt),this.addFilter(R),this.addFilter((function(t){var n=JSON.stringify(t.errors);return n===e?null:(r&&clearTimeout(r),e=n,r=setTimeout((function(){e=""}),1e3),t)})),this.addFilter(P),this.addFilter(L),this.addFilter((function(t){return t.context.notifier={name:"airbrake-js/browser",version:"1.4.2",url:"https://github.com/airbrake/airbrake-js/tree/master/packages/browser"},n._opt.environment&&(t.context.environment=n._opt.environment),t})),this.routes=new rt(this),this.queues=new nt(this),this.queries=new V(this._opt)}return t.prototype.close=function(){for(var t=0,e=this._onClose;t<e.length;t++){(0,e[t])()}},t.prototype.scope=function(){return this._scope},t.prototype.setActiveScope=function(t){this._scope=t},t.prototype.addFilter=function(t){this._filters.push(t)},t.prototype.addPerformanceFilter=function(t){this._performanceFilters.push(t)},t.prototype.notify=function(t){var e={errors:[],context:n(n({severity:"error"},this.scope().context()),t.context),params:t.params||{},environment:t.environment||{},session:t.session||{}};if("object"==typeof t&&void 0!==t.error||(t={error:t}),!t.error)return e.error=new Error("airbrake: got err="+JSON.stringify(t.error)+", wanted an Error"),a.resolve(e);var r=this._processor(t.error);e.errors.push(r);for(var o=0,i=this._filters;o<i.length;o++){var s=(0,i[o])(e);if(null===s)return e.error=new Error("airbrake: error is filtered"),a.resolve(e);e=s}return e.context||(e.context={}),e.context.language="JavaScript",this._sendNotice(e)},t.prototype._sendNotice=function(t){var e=function(t,e){var r=void 0===e?{}:e,n=r.maxLength,o=void 0===n?64e3:n,i=r.keysBlocklist,s=void 0===i?[]:i;if(t.errors)for(var a=0;a<t.errors.length;a++){var u=new y({keysBlocklist:s});t.errors[a]=u.truncate(t.errors[a])}for(var c="",h=["context","params","environment","session"],f=0;f<8;f++){for(var p={level:f,keysBlocklist:s},l=0,d=h;l<d.length;l++)(b=t[w=d[l]])&&(t[w]=m(b,p));if((c=JSON.stringify(t)).length<o)return c}var v={json:c.slice(0,Math.floor(o/2))+"..."};h.push("errors");for(var _=0,g=h;_<g.length;_++){var w,b;(b=t[w=g[_]])&&(c=JSON.stringify(b),v[w]=c.length)}var x=new Error("airbrake: notice exceeds max length and can't be truncated");throw x.params=v,x}(t,{keysBlocklist:this._opt.keysBlocklist});if(this._opt.reporter){if("function"==typeof this._opt.reporter)return this._opt.reporter(t);console.warn("airbrake: options.reporter must be a function")}var r={method:"POST",url:this._url,body:e};return this._requester(r).then((function(e){return t.id=e.json.id,t.url=e.json.url,t})).catch((function(e){return t.error=e,t}))},t.prototype.wrap=function(t,e){if(void 0===e&&(e=[]),t._airbrake)return t;var r=this,n=function(){var e=Array.prototype.slice.call(arguments),n=r._wrapArguments(e);try{return t.apply(this,n)}catch(t){throw r.notify({error:t,params:{arguments:e}}),this._ignoreNextWindowError(),t}};for(var o in t)t.hasOwnProperty(o)&&(n[o]=t[o]);for(var i=0,s=e;i<s.length;i++){o=s[i];t.hasOwnProperty(o)&&(n[o]=t[o])}return n._airbrake=!0,n.inner=t,n},t.prototype._wrapArguments=function(t){for(var e=0;e<t.length;e++){var r=t[e];"function"==typeof r&&(t[e]=this.wrap(r))}return t},t.prototype._ignoreNextWindowError=function(){},t.prototype.call=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var n=this.wrap(t);return n.apply(this,Array.prototype.slice.call(arguments,1))},t}(),rt=function(){function t(t){this._notifier=t,this._routes=new Z(t._opt),this._breakdowns=new tt(t._opt)}return t.prototype.start=function(t,e,r,n){void 0===t&&(t=""),void 0===e&&(e=""),void 0===r&&(r=0),void 0===n&&(n="");var o=new Y(t,e,r,n),i=this._notifier.scope().clone();return i.setContext({httpMethod:t,route:e}),i.setRouteMetric(o),this._notifier.setActiveScope(i),o},t.prototype.notify=function(t){t.end();for(var e=0,r=this._notifier._performanceFilters;e<r.length;e++){if(null===(0,r[e])(t))return}this._routes.notify(t),this._breakdowns.notify(t)},t}(),nt=function(){function t(t){this._notifier=t,this._queues=new Q(t._opt)}return t.prototype.start=function(t){var e=new z(t),r=this._notifier.scope().clone();return r.setContext({queue:t}),r.setQueueMetric(e),this._notifier.setActiveScope(r),e},t.prototype.notify=function(t){t.end(),this._queues.notify(t)},t}();function ot(t){return window.navigator&&window.navigator.userAgent&&(t.context.userAgent=window.navigator.userAgent),window.location&&(t.context.url=String(window.location),t.context.rootDirectory=window.location.protocol+"//"+window.location.host),t}var it=["debug","log","info","warn","error"];var st=["type","name","src"];function at(t){var e=function(t){return function(e){var r=ct(e,"target");if(r){var n={type:e.type};try{n.target=function(t){var e=10,r=[],n=t;for(;n;){var o=ut(n);if(""!==o&&(r.push(o),r.length>e))break;n=n.parentNode}if(0===r.length)return String(t);return r.reverse().join(" > ")}(r)}catch(t){n.target="<"+String(t)+">"}t.scope().pushHistory(n)}}}(t);window.addEventListener&&(window.addEventListener("load",e),window.addEventListener("error",(function(t){ct(t,"error")||e(t)}),!0)),"object"==typeof document&&document.addEventListener&&(document.addEventListener("DOMContentLoaded",e),document.addEventListener("click",e),document.addEventListener("keypress",e))}function ut(t){if(!t)return"";var e=[];if(t.tagName&&e.push(t.tagName.toLowerCase()),t.id&&(e.push("#"),e.push(t.id)),t.classList&&Array.from)e.push("."),e.push(Array.from(t.classList).join("."));else if(t.className){var r=function(t){if(t.split)return t.split(" ").join(".");if(t.baseVal&&t.baseVal.split)return t.baseVal.split(" ").join(".");return console.error("unsupported HTMLElement.className type",typeof t),""}(t.className);""!==r&&(e.push("."),e.push(r))}if(t.getAttribute)for(var n=0,o=st;n<o.length;n++){var i=o[n],s=t.getAttribute(i);s&&e.push("["+i+'="'+s+'"]')}return e.join("")}function ct(t,e){try{return t[e]}catch(t){return null}}var ht="";function ft(){return document.location&&document.location.pathname}function pt(t,e){var r=e.indexOf("://");r>=0?(r=(e=e.slice(r+3)).indexOf("/"),e=r>=0?e.slice(r):"/"):"/"!==e.charAt(0)&&(e="/"+e),t.scope().pushHistory({type:"location",from:ht,to:e}),ht=e}var lt=function(t){function e(e){var r=t.call(this,e)||this;return r.offline=!1,r.todo=[],r._ignoreWindowError=0,r._ignoreNextXHR=0,"undefined"==typeof window||(r.addFilter(ot),window.addEventListener&&(r.onOnline=r.onOnline.bind(r),window.addEventListener("online",r.onOnline),r.onOffline=r.onOffline.bind(r),window.addEventListener("offline",r.onOffline),r.onUnhandledrejection=r.onUnhandledrejection.bind(r),window.addEventListener("unhandledrejection",r.onUnhandledrejection),r._onClose.push((function(){window.removeEventListener("online",r.onOnline),window.removeEventListener("offline",r.onOffline),window.removeEventListener("unhandledrejection",r.onUnhandledrejection)}))),r._opt.ignoreWindowError&&(e.instrumentation.onerror=!1),r._instrument(e.instrumentation)),r}return r(e,t),e.prototype._instrument=function(t){var e,r,n;if(void 0===t&&(t={}),void 0===t.console&&(t.console=!((e=this._opt.environment)&&e.startsWith&&e.startsWith("dev"))),dt(t.onerror)){var o=this,i=window.onerror;window.onerror=function(){i&&i.apply(this,arguments),o.onerror.apply(o,arguments)}}at(this),dt(t.fetch)&&"function"==typeof fetch&&(r=this,n=window.fetch,window.fetch=function(t,e){var o={type:"xhr",date:new Date};return o.method=e&&e.method?e.method:"GET","string"==typeof t?o.url=t:(o.method=t.method,o.url=t.url),r._ignoreNextXHR++,setTimeout((function(){return r._ignoreNextXHR--})),n.apply(this,arguments).then((function(t){return o.statusCode=t.status,o.duration=(new Date).getTime()-o.date.getTime(),r.scope().pushHistory(o),t})).catch((function(t){throw o.error=t,o.duration=(new Date).getTime()-o.date.getTime(),r.scope().pushHistory(o),t}))}),dt(t.history)&&"object"==typeof history&&function(t){ht=ft();var e=window.onpopstate;window.onpopstate=function(r){var n=ft();if(n&&pt(t,n),e)return e.apply(this,arguments)};var r=history.pushState;history.pushState=function(e,n,o){o&&pt(t,o.toString()),r.apply(this,arguments)}}(this),dt(t.console)&&"object"==typeof console&&function(t){for(var e=function(e){if(!(e in console))return"continue";var r=console[e],n=function(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];r.apply(console,n),t.scope().pushHistory({type:"log",severity:e,arguments:n})};n.inner=r,console[e]=n},r=0,n=it;r<n.length;r++)e(n[r])}(this),dt(t.xhr)&&"undefined"!=typeof XMLHttpRequest&&function(t){function e(e){var r=e.__state;r.statusCode=e.status,r.duration=(new Date).getTime()-r.date.getTime(),t.scope().pushHistory(r)}var r=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,n,o,i,s){0===t._ignoreNextXHR&&(this.__state={type:"xhr",method:e,url:n}),r.apply(this,arguments)};var n=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(t){var r=this.onreadystatechange;return this.onreadystatechange=function(t){if(4===this.readyState&&this.__state&&e(this),r)return r.apply(this,arguments)},this.__state&&(this.__state.date=new Date),n.apply(this,arguments)}}(this)},e.prototype.notify=function(e){var r=this;return this.offline?new a((function(t,n){for(r.todo.push({err:e,resolve:t,reject:n});r.todo.length>100;){var o=r.todo.shift();if(void 0===o)break;o.resolve({error:new Error("airbrake: offline queue is too large")})}})):t.prototype.notify.call(this,e)},e.prototype.onOnline=function(){this.offline=!1;for(var t=function(t){e.notify(t.err).then((function(e){t.resolve(e)}))},e=this,r=0,n=this.todo;r<n.length;r++){t(n[r])}this.todo=[]},e.prototype.onOffline=function(){this.offline=!0},e.prototype.onUnhandledrejection=function(t){var e=t.reason||t.detail&&t.detail.reason;if(e){var r=e.message||String(e);r.indexOf&&0===r.indexOf("airbrake: ")||("object"==typeof e&&void 0!==e.error?this.notify(n(n({},e),{context:{unhandledRejection:!0}})):this.notify({error:e,context:{unhandledRejection:!0}}))}},e.prototype.onerror=function(t,e,r,n,o){this._ignoreWindowError>0||(o?this.notify({error:o,context:{windowError:!0}}):e&&r&&this.notify({error:{message:t,fileName:e,lineNumber:r,columnNumber:n,noStack:!0},context:{windowError:!0}}))},e.prototype._ignoreNextWindowError=function(){var t=this;this._ignoreWindowError++,setTimeout((function(){return t._ignoreWindowError--}))},e}(et);function dt(t){return void 0===t||!0===t}t.BaseNotifier=et,t.Notifier=lt,t.QueryInfo=K,t.Scope=x,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=airbrake.min.js.map
;
(function() {
	var airbrake = new Airbrake.Notifier({
		projectId: '3dd566e882b6438488433bbcf20b0a54',
		projectKey: '3dd566e882b6438488433bbcf20b0a54',
    environment: 'production',
    host: 'https://errbit.owenscorning.com'
	});
  window.notifier = airbrake
  window.notify_errbit = (err) => airbrake.notify(err)
  
    airbrake.addFilter(function(notice) {
      var matcher = {
        
          message: new RegExp('.*AdelphicUniversalPixel.*'),
        
        
        
      };
      function checkError(err) {
        // having multiple matcher fields means all must match
        // i.e. they are ANDed together
        var matched = true;
        if (matcher.message) {
          matched = matched && matcher.message.test(err.message || '');
        }
        if (matcher.error_class) {
          matched = matched && matcher.error_class.test(err.type || '');
        }
        if (matcher.file) {
          var backtrace = err.backtrace || [];
          backtrace = backtrace.filter(function(t) {
            var file = t.file || '';
            return file.length > 0 && matcher.file.test(file);
          });
          matched = matched && backtrace.length > 0;
        }
        return !matched;
      }
      var oldErrors = notice.errors;
      notice.errors = (notice.errors || []).filter(checkError);
      if (notice.errors.length === 0) {
        console.log('filtered error(s), not forwarding to errbit', matcher, oldErrors);
        return null;
      }
      return notice;
    });
  
    airbrake.addFilter(function(notice) {
      var matcher = {
        
          message: new RegExp('ttd_dom_ready is not defined'),
        
        
        
      };
      function checkError(err) {
        // having multiple matcher fields means all must match
        // i.e. they are ANDed together
        var matched = true;
        if (matcher.message) {
          matched = matched && matcher.message.test(err.message || '');
        }
        if (matcher.error_class) {
          matched = matched && matcher.error_class.test(err.type || '');
        }
        if (matcher.file) {
          var backtrace = err.backtrace || [];
          backtrace = backtrace.filter(function(t) {
            var file = t.file || '';
            return file.length > 0 && matcher.file.test(file);
          });
          matched = matched && backtrace.length > 0;
        }
        return !matched;
      }
      var oldErrors = notice.errors;
      notice.errors = (notice.errors || []).filter(checkError);
      if (notice.errors.length === 0) {
        console.log('filtered error(s), not forwarding to errbit', matcher, oldErrors);
        return null;
      }
      return notice;
    });
  
    airbrake.addFilter(function(notice) {
      var matcher = {
        
          message: new RegExp('undefined is not an object .evaluating .e.message.resolution=.*'),
        
        
        
      };
      function checkError(err) {
        // having multiple matcher fields means all must match
        // i.e. they are ANDed together
        var matched = true;
        if (matcher.message) {
          matched = matched && matcher.message.test(err.message || '');
        }
        if (matcher.error_class) {
          matched = matched && matcher.error_class.test(err.type || '');
        }
        if (matcher.file) {
          var backtrace = err.backtrace || [];
          backtrace = backtrace.filter(function(t) {
            var file = t.file || '';
            return file.length > 0 && matcher.file.test(file);
          });
          matched = matched && backtrace.length > 0;
        }
        return !matched;
      }
      var oldErrors = notice.errors;
      notice.errors = (notice.errors || []).filter(checkError);
      if (notice.errors.length === 0) {
        console.log('filtered error(s), not forwarding to errbit', matcher, oldErrors);
        return null;
      }
      return notice;
    });
  
    airbrake.addFilter(function(notice) {
      var matcher = {
        
          message: new RegExp('e.message is undefined'),
        
        
        
          file: new RegExp('.*genesys.min.js'),
        
      };
      function checkError(err) {
        // having multiple matcher fields means all must match
        // i.e. they are ANDed together
        var matched = true;
        if (matcher.message) {
          matched = matched && matcher.message.test(err.message || '');
        }
        if (matcher.error_class) {
          matched = matched && matcher.error_class.test(err.type || '');
        }
        if (matcher.file) {
          var backtrace = err.backtrace || [];
          backtrace = backtrace.filter(function(t) {
            var file = t.file || '';
            return file.length > 0 && matcher.file.test(file);
          });
          matched = matched && backtrace.length > 0;
        }
        return !matched;
      }
      var oldErrors = notice.errors;
      notice.errors = (notice.errors || []).filter(checkError);
      if (notice.errors.length === 0) {
        console.log('filtered error(s), not forwarding to errbit', matcher, oldErrors);
        return null;
      }
      return notice;
    });
  
    airbrake.addFilter(function(notice) {
      var matcher = {
        
          message: new RegExp('null is not an object .evaluating .document.elementFromPoint.*'),
        
        
        
      };
      function checkError(err) {
        // having multiple matcher fields means all must match
        // i.e. they are ANDed together
        var matched = true;
        if (matcher.message) {
          matched = matched && matcher.message.test(err.message || '');
        }
        if (matcher.error_class) {
          matched = matched && matcher.error_class.test(err.type || '');
        }
        if (matcher.file) {
          var backtrace = err.backtrace || [];
          backtrace = backtrace.filter(function(t) {
            var file = t.file || '';
            return file.length > 0 && matcher.file.test(file);
          });
          matched = matched && backtrace.length > 0;
        }
        return !matched;
      }
      var oldErrors = notice.errors;
      notice.errors = (notice.errors || []).filter(checkError);
      if (notice.errors.length === 0) {
        console.log('filtered error(s), not forwarding to errbit', matcher, oldErrors);
        return null;
      }
      return notice;
    });
  
    airbrake.addFilter(function(notice) {
      var matcher = {
        
          message: new RegExp('Can.t find variable: _AutofillCallbackHandler'),
        
        
        
      };
      function checkError(err) {
        // having multiple matcher fields means all must match
        // i.e. they are ANDed together
        var matched = true;
        if (matcher.message) {
          matched = matched && matcher.message.test(err.message || '');
        }
        if (matcher.error_class) {
          matched = matched && matcher.error_class.test(err.type || '');
        }
        if (matcher.file) {
          var backtrace = err.backtrace || [];
          backtrace = backtrace.filter(function(t) {
            var file = t.file || '';
            return file.length > 0 && matcher.file.test(file);
          });
          matched = matched && backtrace.length > 0;
        }
        return !matched;
      }
      var oldErrors = notice.errors;
      notice.errors = (notice.errors || []).filter(checkError);
      if (notice.errors.length === 0) {
        console.log('filtered error(s), not forwarding to errbit', matcher, oldErrors);
        return null;
      }
      return notice;
    });
  
}());


