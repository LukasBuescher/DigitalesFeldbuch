webpackJsonp([5],{JY6s:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.applyPolyfill=function(e,t){
/*! document-register-element, 1.7.0
https://github.com/WebReflection/document-register-element
(C) Andrea Giammarchi - @WebReflection - Mit Style License */
e["s-ce1"]||(e["s-ce1"]=!0,function(e,t){function n(){var e=b.splice(0,b.length);for(Ge=0;e.length;)e.shift().call(null,e.shift())}function r(e,t){for(var n=0,r=e.length;n<r;n++)p(e[n],t)}function o(e){return function(t){Pe(t)&&(p(t,e),re.length&&r(t.querySelectorAll(re),e))}}function l(e){var t=ke.call(e,"is"),n=e.nodeName.toUpperCase(),r=le.call(te,t?W+t.toUpperCase():Q+n);return t&&-1<r&&!a(n,t)?-1:r}function a(e,t){return-1<re.indexOf(e+'[is="'+t+'"]')}function i(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,o=e.target,l=e[z]||2,a=e[J]||3;We&&(!o||o===t)&&t[_]&&"style"!==r&&(e.prevValue!==e.newValue||""===e.newValue&&(n===l||n===a))&&t[_](r,n===l?null:e.prevValue,n===a?null:e.newValue)}function c(e){var t=o(e);return function(e){b.push(t,e.target),Ge&&clearTimeout(Ge),Ge=setTimeout(n,1)}}function u(e){Qe&&(Qe=!1,e.currentTarget.removeEventListener(X,u)),re.length&&r((e.target||H).querySelectorAll(re),e.detail===U?U:V),Se&&function(){for(var e,t=0,n=Ie.length;t<n;t++)e=Ie[t],oe.contains(e)||(n--,Ie.splice(t--,1),p(e,U))}()}function s(e,t){var n=this;xe.call(n,e,t),C.call(n,{target:n})}function m(e,t){Oe(e,t),O?O.observe(e,Ze):(Ye&&(e.setAttribute=s,e[P]=A(e),e[I](Y,C)),e[I](K,i)),e[B]&&We&&(e.created=!0,e[B](),e.created=!1)}function f(e){throw new Error("A "+e+" type is already registered")}function p(e,t){var n,r,o=l(e);-1<o&&(D(e,ne[o]),o=0,t!==V||e[V]?t===U&&!e[U]&&(e[V]=!1,e[U]=!0,r="disconnected",o=1):(e[U]=!1,e[V]=!0,r="connected",o=1,Se&&le.call(Ie,e)<0&&Ie.push(e)),o&&(n=e[t+R]||e[r+R])&&n.call(e))}function d(){}function h(e,t,n){var r=n&&n[k]||"",o=t.prototype,l=Ae(o),a=t.observedAttributes||se,i={prototype:l};Fe(l,B,{value:function(){if(ge)ge=!1;else if(!this[Te]){this[Te]=!0,new t(this),o[B]&&o[B].call(this);var e=ye[Ce.get(t)];(!Me||e.create.length>1)&&M(this)}}}),Fe(l,_,{value:function(e){-1<le.call(a,e)&&o[_].apply(this,arguments)}}),o[x]&&Fe(l,q,{value:o[x]}),o[j]&&Fe(l,Z,{value:o[j]}),r&&(i[k]=r),e=e.toUpperCase(),ye[e]={constructor:t,create:r?[r,we(e)]:[e]},Ce.set(t,e),H[F](e.toLowerCase(),i),L(e),be[e].r()}function T(e){var t=ye[e.toUpperCase()];return t&&t.constructor}function E(e){return"string"==typeof e?e:e&&e.is||""}function M(e){for(var t,n=e[_],r=n?e.attributes:se,o=r.length;o--;)t=r[o],n.call(e,t.name||t.nodeName,null,t.value||t.nodeValue)}function L(e){return(e=e.toUpperCase())in be||(be[e]={},be[e].p=new He(function(t){be[e].r=t})),be[e].p}function v(){Ee&&delete e.customElements,ue(e,"customElements",{configurable:!0,value:new d}),ue(e,"CustomElementRegistry",{configurable:!0,value:d});for(var t=function(t){var n=e[t];if(n){e[t]=function(e){var t,r;return e||(e=this),e[Te]||(ge=!0,t=ye[Ce.get(e.constructor)],r=Me&&1===t.create.length,(e=r?Reflect.construct(n,se,t.constructor):H.createElement.apply(H,t.create))[Te]=!0,ge=!1,r||M(e)),e},e[t].prototype=n.prototype;try{n.prototype.constructor=e[t]}catch(r){!0,ue(n,Te,{value:e[t]})}}},n=y.get(/^HTML[A-Z]*[a-z]/),r=n.length;r--;t(n[r]));H.createElement=function(e,t){var n=E(t);return n?Be.call(this,e,we(n)):Be.call(this,e)},Je||(Xe=!0,H[F](""))}var H=e.document,g=e.Object,y=function(e){var t,n,r,o,l=/^[A-Z]+[a-z]/,a=function(e,t){(t=t.toLowerCase())in i||(i[e]=(i[e]||[]).concat(t),i[t]=i[t.toUpperCase()]=e)},i=(g.create||g)(null),c={};for(n in e)for(o in e[n])for(r=e[n][o],i[o]=r,t=0;t<r.length;t++)i[r[t].toLowerCase()]=i[r[t].toUpperCase()]=o;return c.get=function(e){return"string"==typeof e?i[e]||(l.test(e)?[]:""):function(e){var t,n=[];for(t in i)e.test(t)&&n.push(t);return n}(e)},c.set=function(e,t){return l.test(e)?a(e,t):a(t,e),c},c}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});"object"!=typeof t&&(t={type:t||"auto"});var b,C,w,A,O,N,D,S,F="registerElement",P="__"+F+(1e5*e.Math.random()>>0),I="addEventListener",V="attached",R="Callback",U="detached",k="extends",_="attributeChanged"+R,q=V+R,x="connected"+R,j="disconnected"+R,B="created"+R,Z=U+R,z="ADDITION",G="MODIFICATION",J="REMOVAL",K="DOMAttrModified",X="DOMContentLoaded",Y="DOMSubtreeModified",Q="<",W="=",$=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,ee=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],te=[],ne=[],re="",oe=H.documentElement,le=te.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},ae=g.prototype,ie=ae.hasOwnProperty,ce=ae.isPrototypeOf,ue=g.defineProperty,se=[],me=g.getOwnPropertyDescriptor,fe=g.getOwnPropertyNames,pe=g.getPrototypeOf,de=g.setPrototypeOf,he=!!g.__proto__,Te="__dreCEv1",Ee=e.customElements,Me=!/^force/.test(t.type)&&!!(Ee&&Ee.define&&Ee.get&&Ee.whenDefined),Le=g.create||g,ve=e.Map||function(){var e,t=[],n=[];return{get:function(e){return n[le.call(t,e)]},set:function(r,o){(e=le.call(t,r))<0?n[t.push(r)-1]=o:n[e]=o}}},He=e.Promise||function(e){function t(e){for(r=!0;n.length;)n.shift()(e)}var n=[],r=!1,o={catch:function(){return o},then:function(e){return n.push(e),r&&setTimeout(t,1),o}};return e(t),o},ge=!1,ye=Le(null),be=Le(null),Ce=new ve,we=function(e){return e.toLowerCase()},Ae=g.create||function e(t){return t?(e.prototype=t,new e):this},Oe=de||(he?function(e,t){return e.__proto__=t,e}:fe&&me?function(){function e(e,t){for(var n,r=fe(t),o=0,l=r.length;o<l;o++)n=r[o],ie.call(e,n)||ue(e,n,me(t,n))}return function(t,n){do{e(t,n)}while((n=pe(n))&&!ce.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),Ne=e.MutationObserver||e.WebKitMutationObserver,De=(e.HTMLElement||e.Element||e.Node).prototype,Se=!ce.call(De,oe),Fe=Se?function(e,t,n){return e[t]=n.value,e}:ue,Pe=Se?function(e){return 1===e.nodeType}:function(e){return ce.call(De,e)},Ie=Se&&[],Ve=De.attachShadow,Re=De.cloneNode,Ue=De.dispatchEvent,ke=De.getAttribute,_e=De.hasAttribute,qe=De.removeAttribute,xe=De.setAttribute,je=H.createElement,Be=je,Ze=Ne&&{attributes:!0,characterData:!0,attributeOldValue:!0},ze=Ne||function(e){Ye=!1,oe.removeEventListener(K,ze)},Ge=0,Je=F in H&&!/^force-all/.test(t.type),Ke=!0,Xe=!1,Ye=!0,Qe=!0,We=!0;if(Je||(de||he?(D=function(e,t){ce.call(t,e)||m(e,t)},S=m):S=D=function(e,t){e[P]||(e[P]=g(!0),m(e,t))},Se?(Ye=!1,function(){var e=me(De,I),t=e.value,n=function(e){var t=new CustomEvent(K,{bubbles:!0});t.attrName=e,t.prevValue=ke.call(this,e),t.newValue=null,t[J]=t.attrChange=2,qe.call(this,e),Ue.call(this,t)},r=function(e,t){var n=_e.call(this,e),r=n&&ke.call(this,e),o=new CustomEvent(K,{bubbles:!0});xe.call(this,e,t),o.attrName=e,o.prevValue=n?r:null,o.newValue=t,n?o[G]=o.attrChange=1:o[z]=o.attrChange=0,Ue.call(this,o)},o=function(e){var t,n=e.currentTarget,r=n[P],o=e.propertyName;r.hasOwnProperty(o)&&(r=r[o],(t=new CustomEvent(K,{bubbles:!0})).attrName=r.name,t.prevValue=r.value||null,t.newValue=r.value=n[o]||null,null==t.prevValue?t[z]=t.attrChange=0:t[G]=t.attrChange=1,Ue.call(n,t))};e.value=function(e,l,a){e===K&&this[_]&&this.setAttribute!==r&&(this[P]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",o)),t.call(this,e,l,a)},ue(De,I,e)}()):Ne||(oe[I](K,ze),oe.setAttribute(P,1),oe.removeAttribute(P),Ye&&(C=function(e){var t,n,r,o=this;if(o===e.target){for(r in t=o[P],o[P]=n=A(o),n){if(!(r in t))return w(0,o,r,t[r],n[r],z);if(n[r]!==t[r])return w(1,o,r,t[r],n[r],G)}for(r in t)if(!(r in n))return w(2,o,r,t[r],n[r],J)}},w=function(e,t,n,r,o,l){var a={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:o};a[l]=e,i(a)},A=function(e){for(var t,n,r={},o=e.attributes,l=0,a=o.length;l<a;l++)t=o[l],"setAttribute"!==(n=t.name)&&(r[n]=t.value);return r})),H[F]=function(e,t){if(n=e.toUpperCase(),Ke&&(Ke=!1,Ne?(O=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new Ne(function(r){for(var o,l,a,i=0,c=r.length;i<c;i++)"childList"===(o=r[i]).type?(n(o.addedNodes,e),n(o.removedNodes,t)):(l=o.target,We&&l[_]&&"style"!==o.attributeName&&((a=ke.call(l,o.attributeName))!==o.oldValue&&l[_](o.attributeName,o.oldValue,a)))})}(o(V),o(U)),(N=function(e){return O.observe(e,{childList:!0,subtree:!0}),e})(H),Ve&&(De.attachShadow=function(){return N(Ve.apply(this,arguments))})):(b=[],H[I]("DOMNodeInserted",c(V)),H[I]("DOMNodeRemoved",c(U))),H[I](X,u),H[I]("readystatechange",u),De.cloneNode=function(e){var t=Re.call(this,!!e),n=l(t);return-1<n&&S(t,ne[n]),e&&re.length&&function(e){for(var t,n=0,r=e.length;n<r;n++)t=e[n],S(t,ne[l(t)])}(t.querySelectorAll(re)),t}),Xe)return Xe=!1;if(-2<le.call(te,W+n)+le.call(te,Q+n)&&f(e),!$.test(n)||-1<le.call(ee,n))throw new Error("The type "+e+" is invalid");var n,a,i=function(){return m?H.createElement(p,n):H.createElement(p)},s=t||ae,m=ie.call(s,k),p=m?t[k].toUpperCase():n;return m&&-1<le.call(te,Q+p)&&f(p),a=te.push((m?W:Q)+n)-1,re=re.concat(re.length?",":"",m?p+'[is="'+e.toLowerCase()+'"]':p),i.prototype=ne[a]=ie.call(s,"prototype")?s.prototype:Ae(De),re.length&&r(H.querySelectorAll(re),V),i},H.createElement=Be=function(e,t){var n=E(t),r=n?je.call(H,e,we(n)):je.call(H,e),o=""+e,l=le.call(te,(n?W:Q)+(n||o).toUpperCase()),i=-1<l;return n&&(r.setAttribute("is",n=n.toLowerCase()),i&&(i=a(o.toUpperCase(),n))),We=!H.createElement.innerHTMLHelper,i&&S(r,ne[l]),r}),d.prototype={constructor:d,define:Me?function(e,t,n){if(n)h(e,t,n);else{var r=e.toUpperCase();ye[r]={constructor:t,create:[r]},Ce.set(t,r),Ee.define(e,t)}}:h,get:Me?function(e){return Ee.get(e)||T(e)}:T,whenDefined:Me?function(e){return He.race([Ee.whenDefined(e),L(e)])}:L},!Ee||/^force/.test(t.type))v();else if(!t.noBuiltIn)try{!function(t,n,r){if(n[k]="a",(t.prototype=Ae(HTMLAnchorElement.prototype)).constructor=t,e.customElements.define(r,t,n),ke.call(H.createElement("a",{is:r}),"is")!==r||Me&&ke.call(new t,"is")!==r)throw n}(function e(){return Reflect.construct(HTMLAnchorElement,[],e)},{},"document-register-element-a")}catch(e){v()}if(!t.noBuiltIn)try{je.call(H,"a","a")}catch(e){we=function(e){return{is:e.toLowerCase()}}}}(e))
/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/;
/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/
r=e.Element.prototype,"function"!=typeof r.matches&&(r.matches=r.msMatchesSelector||r.mozMatchesSelector||r.webkitMatchesSelector||function(e){e=(this.document||this.ownerDocument).querySelectorAll(e);for(var t=0;e[t]&&e[t]!==this;)++t;return!!e[t]}),"function"!=typeof r.closest&&(r.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null}),
/*!
Element.getRootNode()
*/
function(e){function t(e){return e.parentNode?t(e.parentNode):e}"function"!=typeof e.getRootNode&&(e.getRootNode=function(e){return e&&e.composed?function e(n){n=t(n);return 11===n.nodeType?e(n.host):n}(this):t(this)})}(Element.prototype),
/*!
Element.remove()
*/
n=[Element.prototype,CharacterData.prototype,DocumentType.prototype],n.forEach(function(e){e.hasOwnProperty("remove")||Object.defineProperty(e,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){null!==this.parentNode&&this.parentNode.removeChild(this)}})});var n;var r}}});
//# sourceMappingURL=5.9ca96ad1d3f363d00d89.js.map