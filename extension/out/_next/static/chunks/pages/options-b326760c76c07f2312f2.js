_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[8],{"/0+H":function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=a,t.useAmp=function(){return a(o.default.useContext(i.AmpStateContext))};var r,o=(r=n("q1tI"))&&r.__esModule?r:{default:r},i=n("lwAK");function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,o=void 0!==r&&r,i=e.hasQuery,a=void 0!==i&&i;return n||o&&a}},"7W2i":function(e,t,n){var r=n("SksO");e.exports=function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},"8Kt/":function(e,t,n){"use strict";n("lSNA");t.__esModule=!0,t.defaultHead=l,t.default=void 0;var r,o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n("q1tI")),i=(r=n("Xuae"))&&r.__esModule?r:{default:r},a=n("lwAK"),s=n("FYa8"),c=n("/0+H");function u(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function l(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var d=["name","httpEquiv","charSet","itemProp"];function p(e,t){return e.reduce((function(e,t){var n=o.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(f,[]).reverse().concat(l(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(o){var i=!0,a=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){a=!0;var s=o.key.slice(o.key.indexOf("$")+1);e.has(s)?i=!1:e.add(s)}switch(o.type){case"title":case"base":t.has(o.type)?i=!1:t.add(o.type);break;case"meta":for(var c=0,u=d.length;c<u;c++){var l=d[c];if(o.props.hasOwnProperty(l))if("charSet"===l)n.has(l)?i=!1:n.add(l);else{var f=o.props[l],p=r[l]||new Set;"name"===l&&a||!p.has(f)?(p.add(f),r[l]=p):i=!1}}}return i}}()).reverse().map((function(e,t){var n=e.key||t;return o.default.cloneElement(e,{key:n})}))}function m(e){var t=e.children,n=(0,o.useContext)(a.AmpStateContext),r=(0,o.useContext)(s.HeadManagerContext);return o.default.createElement(i.default,{reduceComponentsToState:p,headManager:r,inAmpMode:(0,c.isInAmpMode)(n)},t)}m.rewind=function(){};var b=m;t.default=b},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},BsWD:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("a3WO");function o(e,t){if(e){if("string"===typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},EbDI:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},FYa8:function(e,t,n){"use strict";var r;t.__esModule=!0,t.HeadManagerContext=void 0;var o=((r=n("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});t.HeadManagerContext=o},Ijbi:function(e,t,n){var r=n("WkPL");e.exports=function(e){if(Array.isArray(e))return r(e)}},KQm4:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("a3WO");var o=n("BsWD");function i(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(o.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},Nsbk:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},PJYZ:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},Qetd:function(e,t,n){"use strict";var r=Object.assign.bind(Object);e.exports=r,e.exports.default=e.exports},RIqP:function(e,t,n){var r=n("Ijbi"),o=n("EbDI"),i=n("ZhPi"),a=n("Bnag");e.exports=function(e){return r(e)||o(e)||i(e)||a()}},SksO:function(e,t){function n(t,r){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,r)}e.exports=n},"UN/f":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/options",function(){return n("nL8s")}])},W8MJ:function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}},WkPL:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}},Xuae:function(e,t,n){"use strict";var r=n("RIqP"),o=n("lwsE"),i=n("W8MJ"),a=(n("PJYZ"),n("7W2i")),s=n("a1gu"),c=n("Nsbk");function u(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=c(e);if(t){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return s(this,n)}}t.__esModule=!0,t.default=void 0;var l=n("q1tI"),f=function(e){a(n,e);var t=u(n);function n(e){var i;return o(this,n),(i=t.call(this,e))._hasHeadManager=void 0,i.emitChange=function(){i._hasHeadManager&&i.props.headManager.updateHead(i.props.reduceComponentsToState(r(i.props.headManager.mountedInstances),i.props))},i._hasHeadManager=i.props.headManager&&i.props.headManager.mountedInstances,i}return i(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(l.Component);t.default=f},ZhPi:function(e,t,n){var r=n("WkPL");e.exports=function(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},a1gu:function(e,t,n){var r=n("cDf5"),o=n("PJYZ");e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!==typeof t?o(e):t}},a3WO:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},cDf5:function(e,t){function n(t){return"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},g4pe:function(e,t,n){e.exports=n("8Kt/")},lSNA:function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},lwAK:function(e,t,n){"use strict";var r;t.__esModule=!0,t.AmpStateContext=void 0;var o=((r=n("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=o},lwsE:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},nL8s:function(e,t,n){"use strict";n.r(t);var r=n("nKUr"),o=n("q1tI"),i=n("KQm4"),a=function(){return Object(r.jsx)("svg",{className:"w-5 h-5 text-red-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:Object(r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})},s=function(){var e=Object(o.useState)(["facebook.com","youtube.com","reddit.com"]),t=e[0],n=e[1],s=Object(o.useState)(""),c=s[0],u=s[1],l=Object(o.useState)(""),f=l[0],d=l[1];Object(o.useEffect)((function(){chrome.storage.sync.get({blockedSites:[]},(function(e){var t=e.blockedSites;n(t)}))}),[]);var p=function(e){if(""===e)d("You must block something!");else if(m(e))if(t.includes(e))d("You have already blocked this site!");else{var r=[].concat(Object(i.a)(t),[e]);n(r),u(""),d(""),chrome.storage.sync.set({blockedSites:r})}else d("You must put a valid URL!")},m=function(e){return null!==e.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)};return Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{className:"font-semibold text-xl mb-2",children:"Blocked sites"}),Object(r.jsxs)("div",{children:[Object(r.jsx)("input",{type:"text",className:"flex-row flex-1 mb-2 mr-2 py-1 pl-2 text-base  border border-gray-200 rounded-sm",placeholder:"Block a site",value:c,onKeyUp:function(e){"Enter"===e.key&&c&&p(c)},onChange:function(e){u(e.target.value)}}),Object(r.jsx)("button",{disabled:""===c,className:"bg-red-500 text-white text-base font-semibold w-20 py-1  shadow hover:shadow-lg transition-all duration-200 rounded  disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",onClick:function(e){p(c)},children:"Block"})]}),f&&Object(r.jsx)("div",{className:"text-sm ml-1 mb-1 text-red-500",children:f}),Object(r.jsx)("ul",{className:"pl-2 text-base w-64",children:t.map((function(e){return Object(r.jsxs)("li",{className:"flex justify-between mb-1",children:[Object(r.jsx)("div",{children:e}),Object(r.jsx)("button",{className:"ml-2",onClick:function(){var r=t.filter((function(t){return t!==e}));n(r),chrome.storage.sync.set({blockedSites:r})},children:Object(r.jsx)(a,{})})]},e)}))})]})},c=n("g4pe"),u=n.n(c);t.default=function(){var e=Object(o.useState)(!0),t=e[0],n=e[1],i=Object(o.useState)(!1),a=i[0],c=i[1],l=Object(o.useState)(.5),f=l[0],d=l[1],p=Object(o.useState)(null),m=p[0],b=p[1],h=Object(o.useState)(!0),y=h[0],v=h[1];Object(o.useEffect)((function(){b(new Audio("sounds/chime.mp3")),chrome.storage.sync.get({tabPermissions:!1,notificationPermissions:!1,volume:.5},(function(e){var t=e.tabPermissions,r=e.notificationPermissions,o=e.volume;n(t),c(r),d(o),v(!1)}))}),[]);return y?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(u.a,{children:Object(r.jsx)("title",{children:"Options"})}),Object(r.jsx)("div",{className:"bg-gray-50 min-h-screen"})]}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(u.a,{children:Object(r.jsx)("title",{children:"Options"})}),Object(r.jsxs)("div",{className:"bg-gray-50 min-h-screen p-10 pl-14",children:[Object(r.jsx)("div",{className:"font-bold text-4xl mb-4",children:"Options"}),Object(r.jsx)("div",{className:"font-semibold text-xl mb-1",children:"Alarm Volume"}),Object(r.jsx)("input",{type:"range",defaultValue:100*f,onMouseUp:function(e){var t=e.target,n=Number(t.value)/100;d(n),null!==m&&(m.volume=n,m.load(),m.play()),chrome.storage.sync.set({volume:n})}}),Object(r.jsx)("div",{className:"font-semibold text-xl mt-2",children:"Permissions"}),Object(r.jsxs)("div",{children:[Object(r.jsx)("input",{id:"notifications",type:"checkbox",className:"mr-2",checked:a,onChange:function(e){a?(chrome.permissions.remove({permissions:["notifications"]}),c(!1),chrome.storage.sync.set({notificationPermissions:!1})):chrome.permissions.request({permissions:["notifications"]},(function(e){e&&(c(!0),chrome.storage.sync.set({notificationPermissions:!0}))}))}}),Object(r.jsx)("label",{className:"text-base",htmlFor:"notifications",children:"Show notifications for alarms"})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("input",{id:"block-sites",type:"checkbox",className:"mr-2 mb-4",checked:t,onChange:function(e){t?(chrome.permissions.remove({permissions:["tabs"]}),n(!1),chrome.storage.sync.set({tabPermissions:!1})):chrome.permissions.request({permissions:["tabs"]},(function(e){e&&(n(!0),chrome.storage.sync.set({tabPermissions:!0}))}))}}),Object(r.jsx)("label",{className:"text-base",htmlFor:"block-sites",children:"Block sites when working"})]}),Object(r.jsx)(s,{})]})]})}}},[["UN/f",0,1]]]);