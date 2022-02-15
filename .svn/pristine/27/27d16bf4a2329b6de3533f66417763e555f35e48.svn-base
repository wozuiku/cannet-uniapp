/**
 * @description 通用方法
 * @Author luzq
 * @Date 2022-1-17
 */
import http from '@/common/request/index'
import Vue from 'vue';
export default {
	 toast(content) {
		uni.showToast({
			title: content,
			icon: "none",
			duration: 5000
		});
	},
	
	 getToken () {
		Vue.prototype.token = getLocalParam("token");
		return Vue.prototype.token;
	
	},
	
	 setLocalParam(key, value) { //同步
		uni.setStorageSync(key, value);
		// uni.setStorage({
		// 	key: key,
		// 	 data: value,
		// 	success: function(ress) {
	
		// 	}
		// });
	},
	 getLocalParam(key) { //同步,使用异步获取不到值
		let token = uni.getStorageSync(key) || "";
		// uni.getStorage({
		// 	key: key,
		// 	success: function(res) {
		// 		console.log("success");
		// 		console.log(res);
		// 		token= res.data||"123"; 
		// 	},
		// 	fail:function(){
		// 		console.log("fail");
		// 		token= "";
		// 	}
		// });
		return token;
	},
	 isWechat (){
		//return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
		 var ua = navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i)=="micromessenger") {
		        return true;
		    } else {
		        return false;
		    }
	},
	//获取单位自定义字段
	 getCustomTableList(param={},callback){
		 var that=this;
		http(
			'common.getCustomTableList', {
				"TenantId": param.tenantId,//单位id
			}, '加载中...'
		).then(res => {
			if (res.code === 200) {
				var obj={}
				for (var i = 0; i < res.data.length; i++) {
					let item=res.data[i];
					obj[this.lowercase(item.columnName)] = item;
				}
				this.setLocalParam("custom",obj);
				Vue.prototype.$custom=obj;//赋值为全局
				callback&&callback(res)
			}
		});
	},
	lowercase(name) {
	    let nameStr = name.charAt(0).toLowerCase() + name.slice(1);
	    return nameStr
	},
	getCustom(){//获取自定义字段
		let custom=this.getLocalParam("custom");
		if(custom){
			Vue.prototype.$custom=custom;//赋值为全局
		}else{
			let tenantid=this.$commom.getLocalParam("tengantid");
			this.getCustomTableList({"tenantId":that.tenantId},function(){
				custom=this.getLocalParam("custom");
			});
		}
		
		return custom;
	},
	// 获取当月有几天
	getCountDays(dateTime = ""){
		let curDate = null
		if (dateTime) {
			curDate = new Date(dateTime);
		} else {
			curDate = new Date();
		}
		/* 获取当前月份 */
		let curMonth = curDate.getMonth();
		/*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
		curDate.setMonth(curMonth + 1);
		/* 将日期设置为0,  */
		curDate.setDate(0);
		/* 返回当月的天数 */
		return curDate.getDate();
	},
	// 返回当前是几号
	getCurrentDates(dateTime = "") {
	    let curDate = null
	    if (dateTime) {
	        curDate = new Date(dateTime);
	    } else {
	        curDate = new Date();
	    }
	    /* 返回当月几号 */
	    return curDate.getDate();
	},
	//   当前时间  // isEntity 是否返回空
	dateFormat(fmt, dateTime = "", isEntity = false) {
	    let ret;
	    var date = null
	    if (dateTime) {
	        date = new Date(dateTime)
	    } else {
	        date = new Date()
	    }
	    if (isEntity && !dateTime) {
	        return ""
	    }
	    var o = {
	        "M+": date.getMonth() + 1,                 //月份   
	        "d+": date.getDate(),                    //日   
	        "h+": date.getHours(),                   //小时   
	        "m+": date.getMinutes(),                 //分   
	        "s+": date.getSeconds(),                 //秒   
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
	        "S": date.getMilliseconds()             //毫秒   
	    };
	    if (/(y+)/.test(fmt))
	        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt))
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
		
	
}