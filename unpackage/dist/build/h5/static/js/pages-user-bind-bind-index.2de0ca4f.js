(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-bind-bind-index"],{"1cc9":function(e,t,a){"use strict";var o=a("4ea4");a("ac1f"),a("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var n=o(a("1da1")),r=o(a("9161")),s=o(a("e422")),i={data:function(){return{form:{data:{roomId:"",userNumber:"",userName:"",userAddress:"",phoneNumber:"",encryptPhoneNumber:"",smsCode:""},rules:{phoneNumber:r.default.bind.phoneNumber,smsCode:r.default.bind.smsCode}},userInput:!0,codeText:"发送验证码",disabledCode:!1}},onLoad:function(e){this.form.data.roomId=e.roomId,this.form.data.roomName=e.roomName,this.form.data.userName=e.userName,this.form.data.userAddress=e.userAddress,this.form.data.phoneNumber=e.phoneNumber,this.form.data.encryptPhoneNumber=this.encryptMobile(e.phoneNumber),e.roomId&&(this.userInput=!1),this.userInput||e.phoneNumber&&0!==e.phoneNumber.length&&"null"!==e.phoneNumber||(this.form.data.phoneNumber="",this.form.data.encryptPhoneNumber="",this.$u.toast("请先联系业主添加手机"))},methods:{search:function(){var e=this,t=uni.getStorageSync("userInfo");console.log("search userInfo:",t),console.log("search roomName:",this.roomName),this.$http("user.roomInfo",{AccountId:t.id,RoomName:this.form.data.roomName}).then((function(t){console.log("bind bind onLoad search $http res:",t),200===t.code?(e.form.data.roomId=t.data.roomInfo.id,e.form.data.roomName=t.data.roomInfo.roomName,e.form.data.userName=t.data.roomInfo.userName,e.form.data.userAddress=t.data.roomInfo.userAddress,e.form.data.phoneNumber=t.data.roomInfo.phoneNumber,e.form.data.encryptPhoneNumber=e.encryptMobile(t.data.roomInfo.phoneNumber),e.form.data.phoneNumber||e.$u.toast("请先联系业主添加手机")):(e.$u.toast(t.message),e.form.data.roomId="",e.form.data.userName="",e.form.data.userAddress="",e.form.data.phoneNumber="",e.form.data.encryptPhoneNumber="")}))},encryptMobile:function(e){if(null!=e&&void 0!=e){var t=/(\d{3})\d*(\d{4})/;return e.replace(t,"$1****$2")}return""},checkValue:function(e){var t=this,a=!0,o=this.form.data[e],n=this.form.rules[e];return s.default.validation(e,o,n,(function(e){e&&(a=!1,t.$u.toast(e))})),a},checkAll:function(){var e=s.default.validateAll(this.form.data,this.form.rules);return e},getSmsCode:function(e){var t=this;this.checkValue("phoneNumber")&&(this.disabledCode?this.$u.toast("请稍后再试"):this.$http("common.smsSend",{Telephone:this.form.data.phoneNumber,SmsType:e},"获取验证码中...").then((function(e){console.log(e),200===e.code?(t.codeChange(),t.$u.toast("验证码已发送，请注意查收短信")):t.$u.toast(e.msg)})))},codeChange:function(){var e=this;if(!this.disabledCode){this.disabledCode=!0;var t=60;this.codeText=t+"s";var a=setInterval((function(){t-=1,t<0&&clearInterval(a),e.codeText=t+"s",e.codeText<"0s"&&(e.disabledCode=!1,e.codeText="重新发送")}),1e3)}},bindSubmit:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function t(){var a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("######bindSubmit######"),a=e,o=uni.getStorageSync("userInfo"),t.next=5,a.checkAll();case 5:if(t.t0=t.sent,!t.t0){t.next=8;break}a.$http("user.bindRoom",{accountId:o.id,roomId:a.form.data.roomId,phoneNumber:a.form.data.phoneNumber,code:a.form.data.smsCode},"绑定中...").then((function(e){console.log(e),a.$u.toast(e.message),200===e.code?uni.navigateTo({url:"/pages/user/bind/bind/result?type=sucess&resultMsg=绑定成功"}):uni.navigateTo({url:"/pages/user/bind/bind/result?type=fail&resultMsg="+e.message})}));case 8:case"end":return t.stop()}}),t)})))()}}};t.default=i},"38a1":function(e,t,a){var o=a("24fb");t=o(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.bind-wrap[data-v-38f05468]{display:flex;flex-direction:column}.bind-wrap .prompt-text[data-v-38f05468]{padding-left:%?32?%;padding-right:%?32?%;padding-top:%?22?%;padding-bottom:%?22?%}.bind-wrap .smscode-btn[data-v-38f05468]{width:%?180?%;font-size:%?24?%}.bind-wrap .bind-btn-box[data-v-38f05468]{margin-top:%?62?%;margin-left:%?32?%;margin-right:%?32?%}.bind-wrap .bind-btn-box .bind-btn[data-v-38f05468]{font-size:%?36?%}',""]),e.exports=t},"3e4f":function(e,t,a){"use strict";var o=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("1cc9")),r=n.default;t.default=r},"458f":function(e,t,a){"use strict";a.r(t);var o=a("6502"),n=a("9f59");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("de15"),a("8deb");var s,i=a("f0c5"),u=Object(i["a"])(n["default"],o["b"],o["c"],!1,null,"38f05468",null,!1,o["a"],s);t["default"]=u.exports},6502:function(e,t,a){"use strict";var o;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return o}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"bind-wrap"},[a("cu-custom",{staticStyle:{color:"#000000"},attrs:{isBack:!0,bgColor:"bg-white"}},[a("template",{attrs:{slot:"backText"},slot:"backText"},[e._v("添加绑定新用户")]),a("template",{attrs:{slot:"content"},slot:"content"})],2),a("v-uni-view",{staticClass:"prompt-text text-gray"},[e._v("确认用户信息输入手机号验证码点击“绑定用户”按钮")]),a("v-uni-form",[a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("用户号")]),a("v-uni-input",{attrs:{placeholder:"请输入用户号",disabled:!e.userInput},model:{value:e.form.data.roomName,callback:function(t){e.$set(e.form.data,"roomName",t)},expression:"form.data.roomName"}}),e.userInput?a("v-uni-button",{staticClass:"cu-btn bg-blue",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.search.apply(void 0,arguments)}}},[e._v("查询")]):e._e()],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("用户名")]),a("v-uni-input",{attrs:{placeholder:"",disabled:!0},model:{value:e.form.data.userName,callback:function(t){e.$set(e.form.data,"userName",t)},expression:"form.data.userName"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("用电地址")]),a("v-uni-input",{attrs:{placeholder:"",disabled:!0},model:{value:e.form.data.userAddress,callback:function(t){e.$set(e.form.data,"userAddress",t)},expression:"form.data.userAddress"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("业主手机")]),a("v-uni-input",{attrs:{placeholder:"",disabled:!0},model:{value:e.form.data.encryptPhoneNumber,callback:function(t){e.$set(e.form.data,"encryptPhoneNumber",t)},expression:"form.data.encryptPhoneNumber"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("验证码")]),a("v-uni-input",{attrs:{placeholder:"请输入验证码",type:"number"},model:{value:e.form.data.smsCode,callback:function(t){e.$set(e.form.data,"smsCode",t)},expression:"form.data.smsCode"}}),a("v-uni-button",{staticClass:"cu-btn bg-blue smscode-btn",attrs:{disabled:e.disabledCode},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getSmsCode("5")}}},[e._v(e._s(e.codeText))])],1)],1),a("v-uni-view",{staticClass:"bind-btn-box"},[a("v-uni-button",{staticClass:"bg-gradual-blue bind-btn shadow",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.bindSubmit.apply(void 0,arguments)}}},[e._v("绑定用户")])],1)],1)},r=[]},6999:function(e,t,a){var o=a("8f55");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=a("4f06").default;n("3d59b8b7",o,!0,{sourceMap:!1,shadowMode:!1})},"8d8d":function(e,t,a){var o=a("38a1");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=a("4f06").default;n("5eda665c",o,!0,{sourceMap:!1,shadowMode:!1})},"8deb":function(e,t,a){"use strict";var o=a("6999"),n=a.n(o);n.a},"8f55":function(e,t,a){var o=a("24fb");t=o(!1),t.push([e.i,".cu-form-group .title[data-v-38f05468]{min-width:calc(4em + 15px)}",""]),e.exports=t},9161:function(e,t,a){"use strict";var o=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("1288")),r={bind:{phoneNumber:[{required:!0,message:"业主手机不能为空"},{validator:function(e,t,a){return n.default.mobile(t)},message:"业主手机不符合规则"}],smsCode:[{required:!0,len:6,message:"请输入6位验证码"}]}};t.default=r},"9f59":function(e,t,a){"use strict";a.r(t);var o=a("3e4f"),n=a.n(o);for(var r in o)"default"!==r&&function(e){a.d(t,e,(function(){return o[e]}))}(r);t["default"]=n.a},de15:function(e,t,a){"use strict";var o=a("8d8d"),n=a.n(o);n.a},e422:function(e,t,a){"use strict";var o=a("4ea4");a("d81d"),a("b64b"),a("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("ade3")),r=o(a("5e75")),s=(o(a("9161")),{validation:function(e,t,a){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){};if(console.log("validate validation key, value, rule:",e,t,a),!a||0===a.length)return o("");var s=new r.default((0,n.default)({},e,a));s.validate((0,n.default)({},e,t),{firstFields:!0},(function(e,t){console.log("validate validation errors, fields:",e,t),e?"error":"success";var a=e?e[0].message:"";o(a)}))},validateAll:function(e,t){console.log("validate validateAll values, rules:",e,t);var a=this;return new Promise((function(o){var n=!0,r=0,s=[];Object.keys(e).map((function(i){var u=e[i],d=t[i];a.validation(i,u,d,(function(t){t&&(n=!1,s.push(t)),++r===Object.keys(e).length&&(o(n),s.length&&uni.showToast({title:s[0],icon:"none",duration:1e3,mask:!0}),"function"==typeof callback&&callback(n))}))}))}))}});t.default=s}}]);