(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-room-action-index"],{"1a89":function(n,i,t){"use strict";var a=t("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=a(t("9688")),o=e.default;i.default=o},"47d5":function(n,i,t){"use strict";var a;t.d(i,"b",(function(){return e})),t.d(i,"c",(function(){return o})),t.d(i,"a",(function(){return a}));var e=function(){var n=this,i=n.$createElement,t=n._self._c||i;return t("v-uni-view",{staticClass:"action-wrap"},[t("v-uni-view",{staticClass:"line solid-bottom"},[t("v-uni-view",{staticClass:"item solid-right",on:{click:function(i){arguments[0]=i=n.$handleEvent(i),n.jump("pay")}}},[t("v-uni-image",{staticClass:"image-icon",attrs:{src:n.action1.icon,mode:"aspectFill"}}),t("v-uni-text",{staticClass:"image-name"},[n._v(n._s(n.action1.name))])],1),0==n.masterSign?t("v-uni-view",{staticClass:"item",on:{click:function(i){arguments[0]=i=n.$handleEvent(i),n.jump("approve")}}},[t("v-uni-image",{staticClass:"image-icon",attrs:{src:n.action2.icon,mode:"aspectFill"}}),t("v-uni-text",{staticClass:"image-name"},[n._v(n._s(n.action2.name))])],1):n._e()],1),t("v-uni-view",{staticClass:"line"},[0==n.masterSign?t("v-uni-view",{staticClass:"item solid-right",on:{click:function(i){arguments[0]=i=n.$handleEvent(i),n.jump("account")}}},[t("v-uni-image",{staticClass:"image-icon",attrs:{src:n.action3.icon,mode:"aspectFill"}}),t("v-uni-text",{staticClass:"image-name"},[n._v(n._s(n.action3.name))])],1):n._e(),t("v-uni-view",{staticClass:"item"},[t("v-uni-image",{staticClass:"image-icon",attrs:{src:n.action4.icon,mode:"aspectFill"}}),t("v-uni-text",{staticClass:"image-name"},[n._v(n._s(n.action4.name))])],1)],1)],1)},o=[]},9688:function(n,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{roomId:"",masterSign:"",action1:{code:"",name:"去交费",icon:"https://cdn.uviewui.com/uview/common/classify/1/7.jpg"},action2:{code:"",name:"审批分户",icon:"https://cdn.uviewui.com/uview/common/classify/1/14.jpg"},action3:{code:"",name:"房间账户",icon:"https://cdn.uviewui.com/uview/common/classify/9/3.jpg"},action4:{code:"",name:"其他功能",icon:"https://cdn.uviewui.com/uview/common/classify/9/2.jpg"}}},onLoad:function(n){console.log("action--onLoad--option",n),this.roomId=n.roomId,this.masterSign=n.masterSign},methods:{jump:function(n){if("pay"===n&&this.$Router.push("/pages/charge/pay/index/index"),"approve"===n){var i={roomId:this.roomId};this.$Router.push({path:"/pages/user/room/approve/index",query:i})}if("account"===n){var t={roomId:this.roomId};this.$Router.push({path:"/pages/user/room/account/index",query:t})}}}};i.default=a},"9cbf":function(n,i,t){"use strict";var a=t("d493"),e=t.n(a);e.a},b658:function(n,i,t){"use strict";t.r(i);var a=t("1a89"),e=t.n(a);for(var o in a)"default"!==o&&function(n){t.d(i,n,(function(){return a[n]}))}(o);i["default"]=e.a},c9df:function(n,i,t){"use strict";t.r(i);var a=t("47d5"),e=t("b658");for(var o in e)"default"!==o&&function(n){t.d(i,n,(function(){return e[n]}))}(o);t("9cbf");var c,s=t("f0c5"),u=Object(s["a"])(e["default"],a["b"],a["c"],!1,null,"53430b08",null,!1,a["a"],c);i["default"]=u.exports},d493:function(n,i,t){var a=t("f924");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var e=t("4f06").default;e("5de84ee0",a,!0,{sourceMap:!1,shadowMode:!1})},f924:function(n,i,t){var a=t("24fb");i=a(!1),i.push([n.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.action-wrap[data-v-53430b08]{display:flex;flex-direction:column}.action-wrap .line[data-v-53430b08]{display:flex}.action-wrap .line .item[data-v-53430b08]{flex:5;height:%?280?%;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#fff}.action-wrap .line .item .image-icon[data-v-53430b08]{width:%?120?%;height:%?120?%}.action-wrap .line .item .image-name[data-v-53430b08]{margin-top:%?22?%;color:#303133;font-size:%?26?%}',""]),n.exports=i}}]);