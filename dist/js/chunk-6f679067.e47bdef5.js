(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f679067"],{"0a20":function(e,t,r){},"43e5":function(e,t,r){"use strict";r("4de4"),r("4160"),r("159b"),r("96cf");var n=r("1da1");t["a"]={data:function(){return{orgId:"",productId:"",uid:"",beginDate:"",endDate:"",orgs:[],products:[],userList:[],valueDate:[],inventoryList:[],type:"",allProCityList:[],provinceList:[],reportList:[]}},methods:{getOrgs:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiOther.getOrgs();case 2:r=t.sent,n=e.getTreeList(r,0,[],"orgId"),r=e.flattenOrgs(n),e.orgs=r;case 6:case"end":return t.stop()}}),t)})))()},getProduct:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiProduction.getProduct();case 2:e.products=t.sent;case 3:case"end":return t.stop()}}),t)})))()},flattenOrgs:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.forEach((function(e){e.index=n,r.push(e),e.children&&t.flattenOrgs(e.children,r,n+1)})),r},getUsers:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.ApiUser.getSelectUsers(e);case 2:t.userList=r.sent;case 3:case"end":return r.stop()}}),r)})))()},getInventorTypes:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiProduction.productPurchaseType();case 2:e.inventoryList=t.sent;case 3:case"end":return t.stop()}}),t)})))()},getAllProvince:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiOther.dictProvince();case 2:e.allProCityList=t.sent,e.provinceList=e.getTarget(e.allProCityList);case 4:case"end":return t.stop()}}),t)})))()},getTarget:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.filter((function(e){if(e.parentId===t)return e}))}}}},"61be":function(e,t,r){"use strict";var n=r("b52c"),a=r.n(n);t["default"]=a.a},"7db0":function(e,t,r){"use strict";var n=r("23e7"),a=r("b727").find,i=r("44d2"),o=r("ae40"),s="find",c=!0,l=o(s);s in[]&&Array(1)[s]((function(){c=!1})),n({target:"Array",proto:!0,forced:c||!l},{find:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),i(s)},a833:function(e,t,r){"use strict";r("4de4"),r("7db0"),r("4160"),r("a9e3"),r("b680"),r("ac1f"),r("5319"),r("159b"),r("96cf");var n=r("1da1"),a=r("5530"),i=r("2f62");t["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(a["a"])({},Object(i["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{filterEnum:function(e,t){return this.dictoryObj[e].find((function(e){return e.key==t})).value},openLoading:function(){this.loading=!0},formatNum:function(e){return e=Number(e),(e.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(e,t,r){this.$confirm(e,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.t0=t,!e.t0){e.next=5;break}return e.next=4,t();case 4:e.t0=e.sent;case 5:n=e.t0,"number"!=typeof n&&r&&r();case 7:case"end":return e.stop()}}),e)}))))},tipMessage:function(e,t){this.$message({showClose:!0,message:e,type:t})},getTreeList:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3?arguments[3]:void 0;if(Array.isArray(e))return e.forEach((function(i){if(i.parentId===r)return n.push(i),i.children=[],t.getTreeList(e,i[a],i.children,a)})),n},flatten:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return e.forEach((function(e){e.index=r,n.push(e),e.children&&t.flatten(e.children,r+1,n)})),n},filterAllChild:function(){},remoteMethod:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.ApiUser.getSelectUsers(e);case 2:t.userList=r.sent;case 3:case"end":return r.stop()}}),r)})))()},getTarget:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.filter((function(e){if(e.parentId===t)return e}))}}}},a90c:function(e,t,r){"use strict";var n=r("0a20"),a=r.n(n);a.a},b52c:function(e,t,r){e.exports={myInput:"NaturalReport_myInput_1m12f",provinceManager:"NaturalReport_provinceManager_1PpkU",textLeft:"NaturalReport_textLeft_1KuFp"}},c740:function(e,t,r){"use strict";var n=r("23e7"),a=r("b727").findIndex,i=r("44d2"),o=r("ae40"),s="findIndex",c=!0,l=o(s);s in[]&&Array(1)[s]((function(){c=!1})),n({target:"Array",proto:!0,forced:c||!l},{findIndex:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),i(s)},d648:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{class:e.$style.provinceManager},[r("el-row",{staticClass:"textLeft m20 el-form100",attrs:{gutter:20}},[r("el-col",{attrs:{span:4}},[r("el-select",{attrs:{placeholder:"请选择省份",clearable:""},on:{change:e.selectCity},model:{value:e.model.provId,callback:function(t){e.$set(e.model,"provId",t)},expression:"model.provId"}},e._l(e.provinceList,(function(e){return r("el-option",{key:e.provId,attrs:{label:e.provName,value:e.provId}})})),1)],1),r("el-col",{attrs:{span:4}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择城市"},model:{value:e.model.cityId,callback:function(t){e.$set(e.model,"cityId",t)},expression:"model.cityId"}},e._l(e.citys,(function(e){return r("el-option",{key:e.provId,attrs:{label:e.provName,value:e.provId}})})),1)],1),r("el-col",{attrs:{span:4}},[r("el-select",{attrs:{placeholder:"请选择业绩月",clearable:""},model:{value:e.model.id,callback:function(t){e.$set(e.model,"id",t)},expression:"model.id"}},e._l(e.reportList,(function(e){return r("el-option",{key:e.naturalId,attrs:{value:e.naturalId,label:e.label}})})),1)],1),r("el-col",{attrs:{span:5}},[r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"NaturalReportView",expression:"'NaturalReportView'"}],attrs:{type:"primary"},on:{click:e.searchM}},[e._v("查询 ")]),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"ExportNatural",expression:"'ExportNatural'"}],attrs:{type:"success"},on:{click:e.export1}},[e._v(" 导出 ")])],1)],1),r("div",{staticClass:"m20 textLeft red"},[e._v("最后统计时间："+e._s(e.makeTime))]),e._m(0)],1)},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"},[r("table",{staticClass:"el-table__body",attrs:{id:"j-report-natural",width:"100%"}},[r("thead",[r("tr",[r("th",{staticClass:"nm",attrs:{width:"400"}},[e._v("省市")]),r("th",{staticClass:"tt"},[e._v("总计分润")]),r("th",{staticClass:"pd"},[e._v("产品")]),r("th",{staticClass:"am"},[e._v("订单数")]),r("th",{staticClass:"rf"},[e._v("退单数")]),r("th",{staticClass:"mn"},[e._v("分润金额")])])]),r("tbody")])])}],i=(r("4de4"),r("7db0"),r("c740"),r("4160"),r("fb6a"),r("159b"),r("96cf"),r("1da1")),o=r("bcaf"),s=r("a833"),c=r("43e5"),l=(r("2f62"),{name:"ProfitReport",mixins:[o["a"],s["a"],c["a"]],data:function(){return{data:[],model:{provId:"",cityId:"",id:""},province:[],citys:[],isShowTable:!1,makeTime:"",cols:[{prop:"productName",label:"产品"},{prop:"amounts",label:"订单数"},{prop:"refunds",label:"退单数"},{prop:"money1",label:"分润金额"}]}},methods:{getNoAuthProvince:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiOther.dictProvince();case 2:e.Allprovince=t.sent,e.province=e.getTarget(e.cloneDeep(e.Allprovince));case 4:case"end":return t.stop()}}),t)})))()},export1:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiReport.exportNatural(e.model.id);case 2:r=t.sent,document.location.href=r;case 4:case"end":return t.stop()}}),t)})))()},rowClick:function(e,t,r){this.findIcon(r);var n=e.products.length||1;r.target.isShow=!r.target.isShow;var a=this.cloneDeep(this.allData),i=this.getTreeList(a,e.provId,[],"provId"),o=0;i.forEach((function(e){o+=e.products.length}));var s=$(r.target).closest(".el-table__row"),c=$(r.target).closest("tbody"),l=this.data.findIndex((function(t){return t.provId===e.provId})),u=l+n,d=u+o,p=c.find(".el-table__row").slice(u,d),f=p.filter(".fold");f.length&&(p=p.slice(0,p.index(f)+1)),r.target.isShow?(s.addClass("fold"),p.hide()):(s.removeClass("fold"),p.show())},searchM:function(){this.getNaturalReport()},getNaturalReport:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e,t.next=3,e.ApiReport.getNaturalReport(e.model);case 3:r=t.sent,n=$("#j-report-natural tbody").empty(),a={},$.each(r,(function(e,t){t.parentId in a||(a[t.parentId]=[]),a[t.parentId].push(t)})),i=[],$.each(a[0],(function(e,t){i.push(t),t.childrens=t.products.length,t.provId in a&&$.each(a[t.provId],(function(e,r){i.push(r),r.childrens=r.products.length,t.childrens+=r.childrens}))})),$.each(i,(function(e,t){var r=t.products.length,a=$("<tr/>").attr({parentId:t.parentId,provId:t.provId,childrens:t.childrens,n:r}).appendTo(n),i=t.products.shift(),o=$('<td class="nm"/>').attr("rowspan",r).text(t.provName).appendTo(a);t.parentId?o.css("paddingLeft","52px"):o.prepend('<i class="el-icon-arrow-down iconmenu"></i>'),$('<td class="tt"/>').attr("rowspan",r).text(t.money).appendTo(a),$('<td class="pd"/>').text(i.productName).appendTo(a),$('<td class="am"/>').text(i.amounts).appendTo(a),$('<td class="rf"/>').text(i.refunds).appendTo(a),$('<td class="mn"/>').text(i.money).appendTo(a),$.each(t.products,(function(e,r){var a=$("<tr/>").attr({parentId:t.parentId,provId:t.provId}).appendTo(n);$('<td class="pd"/>').text(r.productName).appendTo(a),$('<td class="am"/>').text(r.amounts).appendTo(a),$('<td class="rf"/>').text(r.refunds).appendTo(a),$('<td class="mn"/>').text(r.money).appendTo(a)}))})),$("#j-report-natural").off().on("click",".iconmenu",(function(){var e=$(this),t=e.parent().parent(),r=t.nextAll('[parentId="'+t.attr("provId")+'"]'),n=r.filter(".fold");n.length&&(r=r.slice(0,r.index(n)+parseInt(n.attr("n")))),e.is(".el-icon-arrow-down")?(e.removeClass("el-icon-arrow-down").addClass("el-icon-arrow-right"),t.addClass("fold"),r.hide()):(t.removeClass("fold"),r.show(),e.removeClass("el-icon-arrow-right").addClass("el-icon-arrow-down"))})),$("#j-report-natural").find(".iconmenu").trigger("click");case 12:case"end":return t.stop()}}),t)})))()},getNaturalReportBySelect:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiReport.getNaturalReportBySelect();case 2:r=t.sent,r.forEach((function(e){e.label=e.beginDate+"~"+e.endDate})),e.reportList=r,e.$nextTick((function(){e.model.id=r[0].naturalId,e.makeTime=r[0].makeTime}));case 6:case"end":return t.stop()}}),t)})))()},selectCity:function(){this.model.cityId="",this.citys=this.getTarget(this.cloneDeep(this.allProCityList),this.model.provId)}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getNaturalReportBySelect();case 2:e.getAllProvince(),e.closeLoading(),e.getNaturalReport();case 5:case"end":return t.stop()}}),t)})))()}}),u=l,d=r("61be"),p=(r("a90c"),r("2877"));function f(e){this["$style"]=d["default"].locals||d["default"]}var h=Object(p["a"])(u,n,a,!1,f,null,null);t["default"]=h.exports}}]);