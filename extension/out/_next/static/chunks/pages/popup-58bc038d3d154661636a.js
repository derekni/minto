_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[9],{"/MKj":function(e,t,r){"use strict";r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return q}));var n=r("q1tI"),o=r.n(n),i=(r("17x9"),o.a.createContext(null));var a=function(e){e()},c={notify:function(){}};function u(){var e=a,t=null,r=null;return{clear:function(){t=null,r=null},notify:function(){e((function(){for(var e=t;e;)e.callback(),e=e.next}))},get:function(){for(var e=[],r=t;r;)e.push(r),r=r.next;return e},subscribe:function(e){var n=!0,o=r={callback:e,next:null,prev:r};return o.prev?o.prev.next=o:t=o,function(){n&&null!==t&&(n=!1,o.next?o.next.prev=o.prev:r=o.prev,o.prev?o.prev.next=o.next:t=o.next)}}}}var s=function(){function e(e,t){this.store=e,this.parentSub=t,this.unsubscribe=null,this.listeners=c,this.handleChangeWrapper=this.handleChangeWrapper.bind(this)}var t=e.prototype;return t.addNestedSub=function(e){return this.trySubscribe(),this.listeners.subscribe(e)},t.notifyNestedSubs=function(){this.listeners.notify()},t.handleChangeWrapper=function(){this.onStateChange&&this.onStateChange()},t.isSubscribed=function(){return Boolean(this.unsubscribe)},t.trySubscribe=function(){this.unsubscribe||(this.unsubscribe=this.parentSub?this.parentSub.addNestedSub(this.handleChangeWrapper):this.store.subscribe(this.handleChangeWrapper),this.listeners=u())},t.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.listeners.clear(),this.listeners=c)},e}();var f=function(e){var t=e.store,r=e.context,a=e.children,c=Object(n.useMemo)((function(){var e=new s(t);return e.onStateChange=e.notifyNestedSubs,{store:t,subscription:e}}),[t]),u=Object(n.useMemo)((function(){return t.getState()}),[t]);Object(n.useEffect)((function(){var e=c.subscription;return e.trySubscribe(),u!==t.getState()&&e.notifyNestedSubs(),function(){e.tryUnsubscribe(),e.onStateChange=null}}),[c,u]);var f=r||i;return o.a.createElement(f.Provider,{value:c},a)},l=r("wx14");function d(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}var p=r("2mql"),b=r.n(p),h=r("TOwV"),m="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?n.useLayoutEffect:n.useEffect,j=[],v=[null,null];function y(e,t){var r=e[1];return[t.payload,r+1]}function w(e,t,r){m((function(){return e.apply(void 0,t)}),r)}function g(e,t,r,n,o,i,a){e.current=n,t.current=o,r.current=!1,i.current&&(i.current=null,a())}function O(e,t,r,n,o,i,a,c,u,s){if(e){var f=!1,l=null,d=function(){if(!f){var e,r,d=t.getState();try{e=n(d,o.current)}catch(p){r=p,l=p}r||(l=null),e===i.current?a.current||u():(i.current=e,c.current=e,a.current=!0,s({type:"STORE_UPDATED",payload:{error:r}}))}};r.onStateChange=d,r.trySubscribe(),d();return function(){if(f=!0,r.tryUnsubscribe(),r.onStateChange=null,l)throw l}}}var x=function(){return[null,0]};function S(e,t){void 0===t&&(t={});var r=t,a=r.getDisplayName,c=void 0===a?function(e){return"ConnectAdvanced("+e+")"}:a,u=r.methodName,f=void 0===u?"connectAdvanced":u,p=r.renderCountProp,m=void 0===p?void 0:p,S=r.shouldHandleStateChanges,P=void 0===S||S,N=r.storeKey,k=void 0===N?"store":N,C=(r.withRef,r.forwardRef),E=void 0!==C&&C,M=r.context,T=void 0===M?i:M,L=d(r,["getDisplayName","methodName","renderCountProp","shouldHandleStateChanges","storeKey","withRef","forwardRef","context"]),D=T;return function(t){var r=t.displayName||t.name||"Component",i=c(r),a=Object(l.a)({},L,{getDisplayName:c,methodName:f,renderCountProp:m,shouldHandleStateChanges:P,storeKey:k,displayName:i,wrappedComponentName:r,WrappedComponent:t}),u=L.pure;var p=u?n.useMemo:function(e){return e()};function S(r){var i=Object(n.useMemo)((function(){var e=r.reactReduxForwardedRef,t=d(r,["reactReduxForwardedRef"]);return[r.context,e,t]}),[r]),c=i[0],u=i[1],f=i[2],b=Object(n.useMemo)((function(){return c&&c.Consumer&&Object(h.isContextConsumer)(o.a.createElement(c.Consumer,null))?c:D}),[c,D]),m=Object(n.useContext)(b),S=Boolean(r.store)&&Boolean(r.store.getState)&&Boolean(r.store.dispatch);Boolean(m)&&Boolean(m.store);var N=S?r.store:m.store,k=Object(n.useMemo)((function(){return function(t){return e(t.dispatch,a)}(N)}),[N]),C=Object(n.useMemo)((function(){if(!P)return v;var e=new s(N,S?null:m.subscription),t=e.notifyNestedSubs.bind(e);return[e,t]}),[N,S,m]),E=C[0],M=C[1],T=Object(n.useMemo)((function(){return S?m:Object(l.a)({},m,{subscription:E})}),[S,m,E]),L=Object(n.useReducer)(y,j,x),R=L[0][0],A=L[1];if(R&&R.error)throw R.error;var B=Object(n.useRef)(),I=Object(n.useRef)(f),W=Object(n.useRef)(),$=Object(n.useRef)(!1),_=p((function(){return W.current&&f===I.current?W.current:k(N.getState(),f)}),[N,R,f]);w(g,[I,B,$,f,_,W,M]),w(O,[P,N,E,k,I,B,$,W,M,A],[N,E,k]);var q=Object(n.useMemo)((function(){return o.a.createElement(t,Object(l.a)({},_,{ref:u}))}),[u,t,_]);return Object(n.useMemo)((function(){return P?o.a.createElement(b.Provider,{value:T},q):q}),[b,q,T])}var N=u?o.a.memo(S):S;if(N.WrappedComponent=t,N.displayName=i,E){var C=o.a.forwardRef((function(e,t){return o.a.createElement(N,Object(l.a)({},e,{reactReduxForwardedRef:t}))}));return C.displayName=i,C.WrappedComponent=t,b()(C,t)}return b()(N,t)}}function P(e,t){return e===t?0!==e||0!==t||1/e===1/t:e!==e&&t!==t}function N(e,t){if(P(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(var o=0;o<r.length;o++)if(!Object.prototype.hasOwnProperty.call(t,r[o])||!P(e[r[o]],t[r[o]]))return!1;return!0}var k=r("ANjH");function C(e){return function(t,r){var n=e(t,r);function o(){return n}return o.dependsOnOwnProps=!1,o}}function E(e){return null!==e.dependsOnOwnProps&&void 0!==e.dependsOnOwnProps?Boolean(e.dependsOnOwnProps):1!==e.length}function M(e,t){return function(t,r){r.displayName;var n=function(e,t){return n.dependsOnOwnProps?n.mapToProps(e,t):n.mapToProps(e)};return n.dependsOnOwnProps=!0,n.mapToProps=function(t,r){n.mapToProps=e,n.dependsOnOwnProps=E(e);var o=n(t,r);return"function"===typeof o&&(n.mapToProps=o,n.dependsOnOwnProps=E(o),o=n(t,r)),o},n}}var T=[function(e){return"function"===typeof e?M(e):void 0},function(e){return e?void 0:C((function(e){return{dispatch:e}}))},function(e){return e&&"object"===typeof e?C((function(t){return Object(k.b)(e,t)})):void 0}];var L=[function(e){return"function"===typeof e?M(e):void 0},function(e){return e?void 0:C((function(){return{}}))}];function D(e,t,r){return Object(l.a)({},r,e,t)}var R=[function(e){return"function"===typeof e?function(e){return function(t,r){r.displayName;var n,o=r.pure,i=r.areMergedPropsEqual,a=!1;return function(t,r,c){var u=e(t,r,c);return a?o&&i(u,n)||(n=u):(a=!0,n=u),n}}}(e):void 0},function(e){return e?void 0:function(){return D}}];function A(e,t,r,n){return function(o,i){return r(e(o,i),t(n,i),i)}}function B(e,t,r,n,o){var i,a,c,u,s,f=o.areStatesEqual,l=o.areOwnPropsEqual,d=o.areStatePropsEqual,p=!1;function b(o,p){var b=!l(p,a),h=!f(o,i);return i=o,a=p,b&&h?(c=e(i,a),t.dependsOnOwnProps&&(u=t(n,a)),s=r(c,u,a)):b?(e.dependsOnOwnProps&&(c=e(i,a)),t.dependsOnOwnProps&&(u=t(n,a)),s=r(c,u,a)):h?function(){var t=e(i,a),n=!d(t,c);return c=t,n&&(s=r(c,u,a)),s}():s}return function(o,f){return p?b(o,f):(c=e(i=o,a=f),u=t(n,a),s=r(c,u,a),p=!0,s)}}function I(e,t){var r=t.initMapStateToProps,n=t.initMapDispatchToProps,o=t.initMergeProps,i=d(t,["initMapStateToProps","initMapDispatchToProps","initMergeProps"]),a=r(e,i),c=n(e,i),u=o(e,i);return(i.pure?B:A)(a,c,u,e,i)}function W(e,t,r){for(var n=t.length-1;n>=0;n--){var o=t[n](e);if(o)return o}return function(t,n){throw new Error("Invalid value of type "+typeof e+" for "+r+" argument when connecting component "+n.wrappedComponentName+".")}}function $(e,t){return e===t}function _(e){var t=void 0===e?{}:e,r=t.connectHOC,n=void 0===r?S:r,o=t.mapStateToPropsFactories,i=void 0===o?L:o,a=t.mapDispatchToPropsFactories,c=void 0===a?T:a,u=t.mergePropsFactories,s=void 0===u?R:u,f=t.selectorFactory,p=void 0===f?I:f;return function(e,t,r,o){void 0===o&&(o={});var a=o,u=a.pure,f=void 0===u||u,b=a.areStatesEqual,h=void 0===b?$:b,m=a.areOwnPropsEqual,j=void 0===m?N:m,v=a.areStatePropsEqual,y=void 0===v?N:v,w=a.areMergedPropsEqual,g=void 0===w?N:w,O=d(a,["pure","areStatesEqual","areOwnPropsEqual","areStatePropsEqual","areMergedPropsEqual"]),x=W(e,i,"mapStateToProps"),S=W(t,c,"mapDispatchToProps"),P=W(r,s,"mergeProps");return n(p,Object(l.a)({methodName:"connect",getDisplayName:function(e){return"Connect("+e+")"},shouldHandleStateChanges:Boolean(e),initMapStateToProps:x,initMapDispatchToProps:S,initMergeProps:P,pure:f,areStatesEqual:h,areOwnPropsEqual:j,areStatePropsEqual:y,areMergedPropsEqual:g},O))}}var q=_();var F,H=r("i8i4");F=H.unstable_batchedUpdates,a=F},"2mql":function(e,t,r){"use strict";var n=r("TOwV"),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},i={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},c={};function u(e){return n.isMemo(e)?a:c[e.$$typeof]||o}c[n.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},c[n.Memo]=a;var s=Object.defineProperty,f=Object.getOwnPropertyNames,l=Object.getOwnPropertySymbols,d=Object.getOwnPropertyDescriptor,p=Object.getPrototypeOf,b=Object.prototype;e.exports=function e(t,r,n){if("string"!==typeof r){if(b){var o=p(r);o&&o!==b&&e(t,o,n)}var a=f(r);l&&(a=a.concat(l(r)));for(var c=u(t),h=u(r),m=0;m<a.length;++m){var j=a[m];if(!i[j]&&(!n||!n[j])&&(!h||!h[j])&&(!c||!c[j])){var v=d(r,j);try{s(t,j,v)}catch(y){}}}}return t}},"3UD+":function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},ANjH:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return p})),r.d(t,"d",(function(){return c}));var n=r("bCCX"),o=function(){return Math.random().toString(36).substring(7).split("").join(".")},i={INIT:"@@redux/INIT"+o(),REPLACE:"@@redux/REPLACE"+o(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+o()}};function a(e){if("object"!==typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function c(e,t,r){var o;if("function"===typeof t&&"function"===typeof r||"function"===typeof r&&"function"===typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if("function"===typeof t&&"undefined"===typeof r&&(r=t,t=void 0),"undefined"!==typeof r){if("function"!==typeof r)throw new Error("Expected the enhancer to be a function.");return r(c)(e,t)}if("function"!==typeof e)throw new Error("Expected the reducer to be a function.");var u=e,s=t,f=[],l=f,d=!1;function p(){l===f&&(l=f.slice())}function b(){if(d)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return s}function h(e){if("function"!==typeof e)throw new Error("Expected the listener to be a function.");if(d)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");var t=!0;return p(),l.push(e),function(){if(t){if(d)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");t=!1,p();var r=l.indexOf(e);l.splice(r,1),f=null}}}function m(e){if(!a(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if("undefined"===typeof e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(d)throw new Error("Reducers may not dispatch actions.");try{d=!0,s=u(s,e)}finally{d=!1}for(var t=f=l,r=0;r<t.length;r++){(0,t[r])()}return e}function j(e){if("function"!==typeof e)throw new Error("Expected the nextReducer to be a function.");u=e,m({type:i.REPLACE})}function v(){var e,t=h;return(e={subscribe:function(e){if("object"!==typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function r(){e.next&&e.next(b())}return r(),{unsubscribe:t(r)}}})[n.a]=function(){return this},e}return m({type:i.INIT}),(o={dispatch:m,subscribe:h,getState:b,replaceReducer:j})[n.a]=v,o}function u(e,t){return function(){return t(e.apply(this,arguments))}}function s(e,t){if("function"===typeof e)return u(e,t);if("object"!==typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');var r={};for(var n in e){var o=e[n];"function"===typeof o&&(r[n]=u(o,t))}return r}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(r,!0).forEach((function(t){f(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce((function(e,t){return function(){return e(t.apply(void 0,arguments))}}))}function b(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(){var r=e.apply(void 0,arguments),n=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},o={getState:r.getState,dispatch:function(){return n.apply(void 0,arguments)}},i=t.map((function(e){return e(o)}));return d({},r,{dispatch:n=p.apply(void 0,i)(r.dispatch)})}}}},AOGL:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/popup",function(){return r("PGoB")}])},BsWD:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r("a3WO");function o(e,t){if(e){if("string"===typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},KQm4:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r("a3WO");var o=r("BsWD");function i(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(o.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},PGoB:function(e,t,r){"use strict";r.r(t);var n=r("nKUr"),o=r("q1tI"),i=Object(o.createContext)({workState:{status:"idle"},updateWorkState:function(){},workLength:15e5,updateWorkLength:function(){},mints:0,updateMints:function(){},rewards:[],updateRewards:function(){}}),a=function(e){var t=e.children,r=Object(o.useState)({status:"idle"}),a=r[0],c=r[1],u=Object(o.useState)(15e5),s=u[0],f=u[1],l=Object(o.useState)(0),d=l[0],p=l[1],b=Object(o.useState)([]),h=b[0],m=b[1],j=Object(o.useState)(!0),v=j[0],y=j[1];Object(o.useEffect)((function(){chrome.storage.sync.get({workState:{status:"idle"},workLength:15e5,mints:0,rewards:[{name:"Watch Netflix",price:60}]},(function(e){var t=e.workState,r=e.workLength,n=e.mints,o=e.rewards;c(t),f(r),p(n),m(o),y(!1)}));var e=function(e){void 0!==e.workState&&c(e.workState.newValue),void 0!==e.mints&&p(e.mints.newValue),void 0!==e.workLength&&f(e.workLength.newValue)};return chrome.storage.onChanged.addListener(e),function(){chrome.storage.onChanged.removeListener(e)}}),[]);return v?null:Object(n.jsx)(i.Provider,{value:{workState:a,updateWorkState:function(e){chrome.storage.sync.set({workState:e})},workLength:s,updateWorkLength:function(e){chrome.storage.sync.set({workLength:e})},mints:d,updateMints:function(e){chrome.storage.sync.set({mints:e})},rewards:h,updateRewards:function(e){m(e),chrome.storage.sync.set({rewards:e})}},children:t})},c=function(){return Object(n.jsxs)("svg",{className:"w-6 h-6 text-white hover:text-gray-200",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[Object(n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),Object(n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})]})},u=function(){var e=Object(o.useContext)(i).mints;return Object(n.jsxs)("div",{className:"flex justify-between bg-green-500 px-2.5 h-9",children:[Object(n.jsxs)("div",{className:"flex items-center",children:[Object(n.jsx)("img",{className:"mr-1.5 w-5 h-5",src:"img/mint-128x128.png"}),Object(n.jsx)("div",{className:"text-lg font-semibold text-white",children:e})]}),Object(n.jsx)("button",{onClick:function(){return chrome.runtime.openOptionsPage()},children:Object(n.jsx)(c,{})})]})},s=r("rePB");var f=r("BsWD");function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(u){o=!0,i=u}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}}(e,t)||Object(f.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var d=r("KQm4"),p=function(){return Object(n.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:Object(n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"})})},b=function(){return Object(n.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:Object(n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})},h=r("ngQI");function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=function(e){var t=e.reward,r=e.index,a=Object(o.useContext)(i),c=a.rewards,u=a.updateRewards,s=Object(o.useState)(t.name),f=s[0],l=s[1],d=Object(o.useState)(t.price),m=d[0],v=d[1];Object(o.useEffect)((function(){u(c.map((function(e){return e.id!==t.id?e:j(j({},t),{},{name:f,price:m})})))}),[f,m]);var y=function(){u(c.filter((function(e){return e.id!==t.id})))};return Object(n.jsx)(h.b,{draggableId:String(t.id),index:r,children:function(e){return Object(n.jsx)("div",j(j({},e.draggableProps),{},{ref:e.innerRef,children:Object(n.jsxs)("li",{className:"flex items-center pb-2",children:[Object(n.jsx)("div",j(j({className:"w-4 mr-2"},e.dragHandleProps),{},{children:Object(n.jsx)(p,{})})),Object(n.jsx)("input",{className:"flex-1 mr-2 border border-gray-200 rounded-sm pl-0.5",value:f,onChange:function(e){return l(e.target.value)}}),Object(n.jsx)("input",{className:"w-8 mr-2 text-right border border-gray-200 rounded-sm pr-0.5",value:m,onChange:function(e){var t=Number(e.target.value);Number.isInteger(t)&&t>=0&&v(t)}}),Object(n.jsx)("button",{className:"w-4",onClick:y,children:Object(n.jsx)(b,{})})]})}))}})},y=function(e){var t=e.children;return Object(n.jsx)("div",{className:"flex absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 items-center justify-center",children:Object(n.jsx)("div",{className:"bg-white w-44 rounded p-4",children:t})})};function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=function(){var e=Object(o.useState)(!1),t=e[0],r=e[1],a=Object(o.useState)(null),c=a[0],u=a[1],s=Object(o.useContext)(i),f=s.rewards,p=s.updateRewards,b=s.mints,m=s.updateMints;return t?Object(n.jsxs)("div",{className:"flex flex-col flex-1 bg-gray-50 p-4",children:[Object(n.jsx)(h.a,{onDragEnd:function(e){if(e.destination){var t=function(e,t,r){var n=Array.from(e),o=l(n.splice(t,1),1)[0];return n.splice(r,0,o),n}(f,e.source.index,e.destination.index);p(t)}},children:Object(n.jsx)(h.c,{droppableId:"rewards",children:function(e){return Object(n.jsx)("div",g(g({},e.droppableProps),{},{ref:e.innerRef,children:Object(n.jsxs)("ul",{children:[f.map((function(e,t){return Object(n.jsx)(v,{reward:e,index:t},e.id)})),e.placeholder]})}))}})}),Object(n.jsx)("button",{className:"border-gray-500 border-dashed border-2 p-1 rounded mb-2",onClick:function(){chrome.storage.sync.get({nextRewardId:0},(function(e){var t=e.nextRewardId;p([].concat(Object(d.a)(f),[{id:t,name:"New reward",price:25}])),chrome.storage.sync.set({nextRewardId:t+1})}))},children:"Add new reward"}),Object(n.jsx)("button",{className:"bg-green-500 font-semibold text-white p-1 rounded shadow hover:shadow-lg transition-all duration-200",onClick:function(){r(!1)},children:"Done"})]}):Object(n.jsxs)("div",{className:"flex flex-col flex-1 bg-gray-50 p-4",children:[Object(n.jsx)("ul",{children:f.map((function(e){return Object(n.jsx)("li",{children:Object(n.jsxs)("button",{className:"flex justify-between mb-2 py-1 px-2 rounded w-full bg-white shadow hover:shadow-lg transition-all duration-200",onClick:function(){b<e.price?u({type:"error",reward:e}):u({type:"confirmation",reward:e})},children:[Object(n.jsx)("div",{className:"flex-1 truncate mr-2 text-left",children:e.name}),Object(n.jsx)("div",{children:e.price})]})},e.id)}))}),Object(n.jsx)("button",{className:"bg-gray-500 font-semibold text-white p-1 rounded shadow hover:shadow-lg transition-all duration-200",onClick:function(){r(!0)},children:"Edit shop"}),"confirmation"===(null===c||void 0===c?void 0:c.type)&&Object(n.jsx)(y,{children:Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"mb-4",children:["Are you sure you want to purchase ",c.reward.name," for"," ",c.reward.price," mints?"]}),Object(n.jsxs)("div",{className:"flex",children:[Object(n.jsx)("button",{className:"bg-gray-500 text-white p-1 rounded flex-1 mr-1",onClick:function(){return u(null)},children:"Cancel"}),Object(n.jsx)("button",{className:"bg-green-500 text-white p-1 rounded flex-1 ml-1",onClick:function(){u(null),m(b-c.reward.price)},children:"Yes"})]})]})}),"error"===(null===c||void 0===c?void 0:c.type)&&Object(n.jsx)(y,{children:Object(n.jsxs)("div",{className:"flex flex-col items-center",children:[Object(n.jsxs)("div",{className:"mb-4",children:["You need ",c.reward.price," mints for"," ",c.reward.name,"."]}),Object(n.jsx)("button",{onClick:function(){return u(null)},className:"bg-gray-500 text-white p-1 rounded w-1/2",children:"Okay"})]})})]})},x=function(e){var t=e.label,r=e.onClick,o=e.isActive,i=e.isDisabled,a="bg-gray-400 hover:bg-gray-500";return o&&(a="bg-green-500"),i&&(a="bg-gray-300 cursor-not-allowed"),Object(n.jsx)("button",{className:"".concat(a," flex-1 text-white font-semibold h-10"),onClick:r,disabled:i,children:t})},S=function(e){var t=Math.floor(e/36e5),r=Math.floor(e/6e4)%60,n=Math.floor(e/1e3)%60,o=String(r).padStart(2,"0"),i=String(n).padStart(2,"0");return t?"".concat(t,":").concat(o,":").concat(i):"".concat(o,":").concat(i)},P=function(e){var t=e.workEndTime,r=Object(o.useState)(Math.max(0,t-Date.now())),i=r[0],a=r[1];return Object(o.useEffect)((function(){var e=setInterval((function(){a(Math.max(0,t-Date.now()))}),1e3);return function(){clearInterval(e)}}),[]),Object(n.jsx)("div",{className:"text-5xl mt-1 mb-4 font-mono",children:S(i)})},N=function(){var e=Object(o.useContext)(i),t=e.workLength,r=e.updateWorkLength,a=Object(o.useState)(String(Math.floor(t/6e4)).padStart(2,"0")),c=a[0],u=a[1],s=Object(o.useState)(String(Math.floor(t/1e3)%60).padStart(2,"0")),f=s[0],l=s[1],d=Object(o.useState)(""),p=d[0],b=d[1],h=function(){var e=Number(c),n=Number(f);if(Number.isInteger(e)&&Number.isInteger(n))return b(""),void r(1e3*(60*e+n));b("Invalid values for minutes or seconds"),function(e){u(String(Math.floor(e/6e4)).padStart(2,"0")),l(String(Math.floor(e/1e3)%60).padStart(2,"0"))}(t)};return Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"flex items-center mb-4 text-5xl font-mono",children:[Object(n.jsx)("input",{className:"text-right w-28 rounded bg-transparent outline-none",type:"text",maxLength:3,value:c,onChange:function(e){u(e.target.value)},onBlur:h}),":",Object(n.jsx)("input",{className:"w-20 rounded mr-8 bg-transparent outline-none",type:"text",maxLength:2,value:f,onChange:function(e){l(e.target.value)},onBlur:h})]}),p&&Object(n.jsx)("div",{className:"text-center mb-2",children:p})]})},k=function(e){var t=e.pausedTimeLeft;return Object(n.jsx)("div",{className:"text-5xl mt-1 mb-4 font-mono",children:S(t)})},C=function(){var e=Object(o.useContext)(i),t=e.workState,r=e.updateWorkState,a=e.workLength,c=function(){r({status:"idle"}),chrome.alarms.clearAll()},u=function(){var e=null;if("idle"===t.status?e=Date.now()+a:"paused"===t.status&&(e=Date.now()+t.pausedTimeLeft),null===e)throw new Error("tried to start work when not idle or paused");r({status:"working",workEndTime:e});var n="workFor"+Math.floor(a/6e4);chrome.alarms.create(n,{when:e}),window.close()};return Object(n.jsxs)("div",{className:"flex flex-col flex-1 items-center justify-center bg-gray-50",children:["idle"===t.status&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(N,{}),Object(n.jsx)("button",{className:"bg-green-500 text-white font-semibold py-1 shadow hover:shadow-lg transition-all duration-200 w-24 rounded",onClick:u,children:"Work"})]}),"working"===t.status&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(P,{workEndTime:t.workEndTime}),Object(n.jsx)("button",{className:"bg-gray-500 text-white font-semibold w-24 py-1 shadow hover:shadow-lg transition-all duration-200 rounded mb-1",onClick:function(){if("working"===t.status){var e=t.workEndTime-Date.now();r({status:"paused",pausedTimeLeft:e}),chrome.alarms.clearAll()}},children:"Pause"}),Object(n.jsx)("button",{className:"bg-red-500 text-white font-semibold w-24 py-1 shadow hover:shadow-lg transition-all duration-200 rounded",onClick:c,children:"Stop"})]}),"paused"===t.status&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(k,{pausedTimeLeft:t.pausedTimeLeft}),Object(n.jsx)("button",{className:"bg-green-500 text-white font-semibold w-24 py-1 shadow hover:shadow-lg transition-all duration-200 rounded mb-1",onClick:u,children:"Resume"}),Object(n.jsx)("button",{className:"bg-red-500 text-white font-semibold w-24 py-1 shadow hover:shadow-lg transition-all duration-200 rounded",onClick:c,children:"Reset"})]})]})},E=function(){var e=Object(o.useState)("work"),t=e[0],r=e[1],a=Object(o.useContext)(i).workState;return Object(n.jsxs)("div",{className:"flex flex-col h-72 w-64",children:[Object(n.jsx)(u,{}),Object(n.jsxs)("div",{className:"flex flex-1 flex-col overflow-x-hidden overflow-y-auto",children:["work"===t&&Object(n.jsx)(C,{}),"shop"===t&&Object(n.jsx)(O,{})]}),Object(n.jsxs)("div",{className:"flex h-10 text-base",children:[Object(n.jsx)(x,{label:"Work",onClick:function(){return r("work")},isActive:"work"===t,isDisabled:!1}),Object(n.jsx)(x,{label:"Shop",onClick:function(){return r("shop")},isActive:"shop"===t,isDisabled:"working"===a.status})]})]})};t.default=function(){return Object(n.jsx)(a,{children:Object(n.jsx)(E,{})})}},Qetd:function(e,t,r){"use strict";var n=Object.assign.bind(Object);e.exports=n,e.exports.default=e.exports},SLVX:function(e,t,r){"use strict";function n(e){var t,r=e.Symbol;return"function"===typeof r?r.observable?t=r.observable:(t=r("observable"),r.observable=t):t="@@observable",t}r.d(t,"a",(function(){return n}))},TOwV:function(e,t,r){"use strict";e.exports=r("qT12")},Wwog:function(e,t,r){"use strict";function n(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}t.a=function(e,t){var r;void 0===t&&(t=n);var o,i=[],a=!1;return function(){for(var n=[],c=0;c<arguments.length;c++)n[c]=arguments[c];return a&&r===this&&t(n,i)||(o=e.apply(this,n),a=!0,r=this,i=n),o}}},a3WO:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},bCCX:function(e,t,r){"use strict";(function(e,n){var o,i=r("SLVX");o="undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof e?e:n;var a=Object(i.a)(o);t.a=a}).call(this,r("yLpj"),r("3UD+")(e))},dI71:function(e,t,r){"use strict";function n(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}r.d(t,"a",(function(){return n}))},"jj+N":function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return a})),r.d(t,"d",(function(){return b})),r.d(t,"e",(function(){return i})),r.d(t,"f",(function(){return l})),r.d(t,"g",(function(){return d}));var n="Invariant failed";var o=function(e,t){if(!e)throw new Error(n)},i=function(e){var t=e.top,r=e.right,n=e.bottom,o=e.left;return{top:t,right:r,bottom:n,left:o,width:r-o,height:n-t,x:o,y:t,center:{x:(r+o)/2,y:(n+t)/2}}},a=function(e,t){return{top:e.top-t.top,left:e.left-t.left,bottom:e.bottom+t.bottom,right:e.right+t.right}},c=function(e,t){return{top:e.top+t.top,left:e.left+t.left,bottom:e.bottom-t.bottom,right:e.right-t.right}},u={top:0,right:0,bottom:0,left:0},s=function(e){var t=e.borderBox,r=e.margin,n=void 0===r?u:r,o=e.border,s=void 0===o?u:o,f=e.padding,l=void 0===f?u:f,d=i(a(t,n)),p=i(c(t,s)),b=i(c(p,l));return{marginBox:d,borderBox:i(t),paddingBox:p,contentBox:b,margin:n,border:s,padding:l}},f=function(e){var t=e.slice(0,-2);if("px"!==e.slice(-2))return 0;var r=Number(t);return isNaN(r)&&o(!1),r},l=function(e,t){var r,n,o=e.borderBox,i=e.border,a=e.margin,c=e.padding,u=(n=t,{top:(r=o).top+n.y,left:r.left+n.x,bottom:r.bottom+n.y,right:r.right+n.x});return s({borderBox:u,border:i,margin:a,padding:c})},d=function(e,t){return void 0===t&&(t={x:window.pageXOffset,y:window.pageYOffset}),l(e,t)},p=function(e,t){var r={top:f(t.marginTop),right:f(t.marginRight),bottom:f(t.marginBottom),left:f(t.marginLeft)},n={top:f(t.paddingTop),right:f(t.paddingRight),bottom:f(t.paddingBottom),left:f(t.paddingLeft)},o={top:f(t.borderTopWidth),right:f(t.borderRightWidth),bottom:f(t.borderBottomWidth),left:f(t.borderLeftWidth)};return s({borderBox:e,margin:r,padding:n,border:o})},b=function(e){var t=e.getBoundingClientRect(),r=window.getComputedStyle(e);return p(t,r)}},mHlH:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return i}));var n=r("q1tI");function o(e,t){var r=Object(n.useState)((function(){return{inputs:t,result:e()}}))[0],o=Object(n.useRef)(r),i=Boolean(t&&o.current.inputs&&function(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}(t,o.current.inputs))?o.current:{inputs:t,result:e()};return Object(n.useEffect)((function(){o.current=i}),[i]),i.result}var i=o,a=function(e,t){return o((function(){return e}),t)}},qT12:function(e,t,r){"use strict";var n="function"===typeof Symbol&&Symbol.for,o=n?Symbol.for("react.element"):60103,i=n?Symbol.for("react.portal"):60106,a=n?Symbol.for("react.fragment"):60107,c=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,s=n?Symbol.for("react.provider"):60109,f=n?Symbol.for("react.context"):60110,l=n?Symbol.for("react.async_mode"):60111,d=n?Symbol.for("react.concurrent_mode"):60111,p=n?Symbol.for("react.forward_ref"):60112,b=n?Symbol.for("react.suspense"):60113,h=n?Symbol.for("react.suspense_list"):60120,m=n?Symbol.for("react.memo"):60115,j=n?Symbol.for("react.lazy"):60116,v=n?Symbol.for("react.block"):60121,y=n?Symbol.for("react.fundamental"):60117,w=n?Symbol.for("react.responder"):60118,g=n?Symbol.for("react.scope"):60119;function O(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case o:switch(e=e.type){case l:case d:case a:case u:case c:case b:return e;default:switch(e=e&&e.$$typeof){case f:case p:case j:case m:case s:return e;default:return t}}case i:return t}}}function x(e){return O(e)===d}t.AsyncMode=l,t.ConcurrentMode=d,t.ContextConsumer=f,t.ContextProvider=s,t.Element=o,t.ForwardRef=p,t.Fragment=a,t.Lazy=j,t.Memo=m,t.Portal=i,t.Profiler=u,t.StrictMode=c,t.Suspense=b,t.isAsyncMode=function(e){return x(e)||O(e)===l},t.isConcurrentMode=x,t.isContextConsumer=function(e){return O(e)===f},t.isContextProvider=function(e){return O(e)===s},t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===o},t.isForwardRef=function(e){return O(e)===p},t.isFragment=function(e){return O(e)===a},t.isLazy=function(e){return O(e)===j},t.isMemo=function(e){return O(e)===m},t.isPortal=function(e){return O(e)===i},t.isProfiler=function(e){return O(e)===u},t.isStrictMode=function(e){return O(e)===c},t.isSuspense=function(e){return O(e)===b},t.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===a||e===d||e===u||e===c||e===b||e===h||"object"===typeof e&&null!==e&&(e.$$typeof===j||e.$$typeof===m||e.$$typeof===s||e.$$typeof===f||e.$$typeof===p||e.$$typeof===y||e.$$typeof===w||e.$$typeof===g||e.$$typeof===v)},t.typeOf=O},rePB:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},w95p:function(e,t,r){"use strict";t.a=function(e){var t=[],r=null,n=function(){for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];t=o,r||(r=requestAnimationFrame((function(){r=null,e.apply(void 0,t)})))};return n.cancel=function(){r&&(cancelAnimationFrame(r),r=null)},n}},wx14:function(e,t,r){"use strict";function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}r.d(t,"a",(function(){return n}))},yLpj:function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(n){"object"===typeof window&&(r=window)}e.exports=r}},[["AOGL",0,1,3]]]);