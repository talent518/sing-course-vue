(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aa4cabe8"],{"2f58":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"profitReport",class:t.$style.provinceManager},[r("el-row",{staticClass:"textLeft m20 el-form100",attrs:{gutter:20}},[r("el-col",{attrs:{span:4}},[r("el-select",{attrs:{placeholder:"请选择组织","value-key":"orgId",clearable:""},model:{value:t.model.orgId,callback:function(e){t.$set(t.model,"orgId",e)},expression:"model.orgId"}},t._l(t.orgs,(function(e){return r("el-option",{key:e.orgId,attrs:{label:e.orgName,value:e.orgId}},[t._l(e.index,(function(e){return r("span",{staticClass:"opcaity"},[t._v("13")])})),r("span",[t._v(t._s(e.orgName))])],2)})),1)],1),r("el-col",{attrs:{span:4}},[r("el-select",{attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请选择经销人员","remote-method":t.getUsers,"value-key":"id",clearable:""},model:{value:t.model.uid,callback:function(e){t.$set(t.model,"uid",e)},expression:"model.uid"}},t._l(t.userList,(function(t){return r("el-option",{key:t.uid,attrs:{label:t.nickname,value:t.uid}})})),1)],1),r("el-col",{attrs:{span:4}},[r("el-select",{attrs:{placeholder:"请选择业绩月"},model:{value:t.model.id,callback:function(e){t.$set(t.model,"id",e)},expression:"model.id"}},t._l(t.reportList,(function(t){return r("el-option",{key:t.profitId,attrs:{value:t.profitId,label:t.label}})})),1)],1),r("el-col",{attrs:{span:5}},[r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"ProfitReportView",expression:"'ProfitReportView'"}],attrs:{type:"primary"},on:{click:t.searchM}},[t._v("查询 ")]),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"ExportProfit",expression:"'ExportProfit'"}],attrs:{type:"success"},on:{click:t.export1}},[t._v(" 导出 ")])],1)],1),r("div",{staticClass:"m20 textLeft red"},[t._v("最后统计时间："+t._s(t.makeTime))]),t._m(0),t.dialogFormVisible?r("el-dialog",{attrs:{title:"业绩明细",visible:t.dialogFormVisible,"close-on-click-modal":t.clickmodal,width:"70%;",top:"10vh"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("div",{staticClass:"m20b textLeft"},[r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"ExportProfitLog",expression:"'ExportProfitLog'"}],attrs:{type:"success"},on:{click:t.exportProfitLogM}},[t._v("导出 ")])],1),r("el-table",{attrs:{data:t.data1,border:"",fit:""}},[r("el-table-column",{attrs:{label:"订单号",prop:"orderNO",width:"245"}}),r("el-table-column",{attrs:{label:"收支类型",prop:"isPay"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[0==n.isPay?r("span",{staticClass:"red"},[t._v(" 收入 ")]):r("span",[t._v(" 支出 ")])]}}],null,!1,1218636911)}),r("el-table-column",{attrs:{label:"实付金额",prop:"productPrice"}}),r("el-table-column",{attrs:{label:"付款时间",prop:"createTime",width:"180"}}),r("el-table-column",{attrs:{label:"订单类型",prop:"typeV"}}),r("el-table-column",{attrs:{label:"经销人员",width:"280"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[r("ul",[r("li",[t._v("所属组织："+t._s(n.orgName))]),r("li",[t._v("经销人员："+t._s(n.nickname))]),r("li",[t._v("身份："+t._s(n.identityName))])])]}}],null,!1,3060693040)}),r("el-table-column",{attrs:{label:"分润金额",prop:"money"}})],1),r("el-pagination",{staticClass:"m20",attrs:{background:"",layout:"prev, pager, next,total",total:t.model1.total,"page-size":t.model1.pageSize,"current-page":t.model1.curPage},on:{"current-change":t.currentChange,"update:currentPage":function(e){return t.$set(t.model1,"curPage",e)},"update:current-page":function(e){return t.$set(t.model1,"curPage",e)}}})],1):t._e()],1)},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"},[r("table",{staticClass:"el-table__body",attrs:{id:"j-report-profit",width:"100%"}},[r("thead",[r("tr",[r("th",{staticClass:"nm",attrs:{rowspan:"2",width:"600"}},[t._v("组织与分销人员信息")]),r("th",{attrs:{rowspan:"2"}},[t._v("总计分润")]),r("th",{staticClass:"pd",attrs:{rowspan:"2"}},[t._v("产品")]),r("th",{staticClass:"fs",attrs:{colspan:"3"}},[t._v("首次分销")]),r("th",{staticClass:"sc",attrs:{colspan:"3"}},[t._v("二次裂变")]),r("th",{staticClass:"tt",attrs:{rowspan:"2"}},[t._v("合计分润")])]),r("tr",[r("th",{staticClass:"fs t1"},[t._v("订单")]),r("th",{staticClass:"fs t2"},[t._v("退单")]),r("th",{staticClass:"fs t3"},[t._v("分润金额")]),r("th",{staticClass:"sc t1"},[t._v("订单")]),r("th",{staticClass:"sc t1"},[t._v("退单")]),r("th",{staticClass:"sc t1"},[t._v("分润金额")])])]),r("tbody")])])}],o=(r("99af"),r("4de4"),r("7db0"),r("4160"),r("caad"),r("fb6a"),r("b0c0"),r("2532"),r("159b"),r("5530")),s=(r("96cf"),r("1da1")),i=r("bcaf"),c=r("a833"),l=r("43e5"),d=(r("2f62"),{name:"ProfitReport",mixins:[i["a"],c["a"],l["a"]],data:function(){return{data:[],data1:[],provId:"",cityId:"",province:[],citys:[],reportList:[],id:2,loading:!1,isShowTable:!1,model:{id:2,uid:"",orgId:""},makeTime:"",model1:{id:2,uid:"",orgId:"",pageSize:5,curPage:1,total:0},mh:500,types:[]}},methods:{exportProfitLogM:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiReport.exportProfitLog(t.model1);case 2:r=e.sent,location.href=r;case 4:case"end":return e.stop()}}),e)})))()},payLog:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var n,a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.open(),n=t.uid||0,a=e.model.id,s=t.orgId,e.model1=Object(o["a"])({},e.model1,{uid:n,id:a,orgId:s}),e.getLogList();case 6:case"end":return r.stop()}}),r)})))()},getLogList:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiReport.payLog(t.model1);case 2:r=e.sent,r.list.forEach((function(e){t.types.forEach((function(t){e.orderType==t.value&&(e.typeV=t.name)}))})),t.model1.total=r.rowCount,t.data1=r.list;case 6:case"end":return e.stop()}}),e)})))()},getNoAuthProvince:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiOther.dictProvince();case 2:t.Allprovince=e.sent,t.province=t.getTarget(t.cloneDeep(t.Allprovince));case 4:case"end":return e.stop()}}),e)})))()},searchM:function(){this.getTable()},currentChange:function(t){this.model1.curPage=t,this.getLogList()},selectCity:function(){this.citys=this.getTarget(this.cloneDeep(this.Allprovince),this.provId)},export1:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiReport.exportProfit(t.model.id);case 2:r=e.sent,document.location.href=r;case 4:case"end":return e.stop()}}),e)})))()},findAllOrgPerson:function(t,e){arguments.length>2&&void 0!==arguments[2]&&arguments[2];var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return t.forEach((function(t){t.orgId!==e||t.isOrg||r.push(t)})),r},findChildOrg:function(t,e){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"parentId",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return t.forEach((function(o){o[n]===e&&o.isOrg&&(a.push(o),a.concat(r.findChildOrg(t,o.orgId,n,a)))})),a},getReportList:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r,n,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,t.isShowTable=!1,e.next=4,t.ApiReport.getOrderReport(t.model);case 4:r=e.sent,n=r.orgs,a=r.users,n=t.gerOrgsbyUsers(n,a),n=t.sortParent(n),s=[],n.forEach((function(t){Array.isArray(t.products)&&t.products.forEach((function(e){s.push(Object(o["a"])({},t,{},e,{isOrg:!0,total1:t.totalMoney}))})),Array.isArray(t.user)&&t.user.forEach((function(e){e.childrens.length?e.childrens.forEach((function(r){s.push(Object(o["a"])({},e,{},r,{index:t.index,total1:e.totalMoney}))})):s.push(Object(o["a"])({},e,{index:t.index,total1:e.totalMoney}))}))})),t.allData=t.cloneDeep(s),t.data=s,t.isShowTable=!0,t.loading=!1;case 15:case"end":return e.stop()}}),e)})))()},sortParent:function(t){var e=this.getTreeList(t,0,[],"orgId"),r=this.flatten(e);return r},arraySpanMethod:function(t){var e=t.row,r=(t.column,t.rowIndex),n=t.columnIndex,a=0;try{e.products&&e.products.length?a=e.products.length:e.childrens&&(a=e.childrens.length||1)}catch(o){a=1}if(0===n||1===n)return r%a===0?{rowspan:a,colspan:1}:{rowspan:0,colspan:0}},findIcon:function(t){var e=$(t.target).closest(".el-table__row"),r=e.find("i");if(r.length){r.attr("class").includes("right");t.target.isShow?r.removeClass().addClass("el-icon-arrow-down"):r.removeClass().addClass("el-icon-arrow-right")}},orderTypes:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiOrder.orderTypes();case 2:t.types=e.sent;case 3:case"end":return e.stop()}}),e)})))()},getOrderReportBySelect:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiReport.getOrderReportBySelect();case 2:r=e.sent,r.forEach((function(t){t.label=t.beginDate+"~"+t.endDate})),t.reportList=r,t.$nextTick((function(){t.model.id=r[0].profitId,t.makeTime=r[0].makeTime}));case 6:case"end":return e.stop()}}),e)})))()},allHide:function(){},gerOrgsbyUsers:function(t,e){return t.forEach((function(t){e.forEach((function(e){t.orgId===e.orgId&&(t["user"]||(t["user"]=[]),t.user.push(e))}))})),t},setH:function(){},getOrgAndPerson:function(t,e,r){var n=this,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];r.forEach((function(r){n.getOrgAndPerson(t,e,"orgId",a)}))},getTable:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r,n,a,o,s,i,c,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t,{},e.next=4,t.ApiReport.getOrderReport(t.model);case 4:return n=e.sent,a={},$.each(n.users,(function(){this.orgId in a||(a[this.orgId]=[]),a[this.orgId].push(this)})),o={},$.each(n.orgs,(function(){this.parentId in o||(o[this.parentId]=[]),o[this.parentId].push(this)})),s=0,i=[],c=function t(e,r,n){if(!(e in o))return 0;s=Math.max(s,r);var c=0;return $.each(o[e],(function(){if(i.push(this),this.path=n+this.orgId+",",this.grade=r,this.childrens=t(this.orgId,r+1,this.path),this.orgId in a){var e=0;$.each(a[this.orgId],(function(){e+=Math.max(1,this.childrens.length)})),this.childrens+=e}c+=this.products.length,c+=this.childrens})),c},c(0,0,""),l=$("#j-report-profit>tbody").empty(),$.each(i,(function(t,e){var n=e.products.length,o=$("<tr></tr>").attr({orgId:e.orgId,path:e.path,childrens:e.childrens,n:n}).appendTo(l);$('<td class="nm"><i class="el-icon-arrow-down iconmenu"></i></td>').css("paddingLeft",10+14*e.grade).attr("rowspan",e.products.length).append(e.orgName).appendTo(o),$('<td class="tt logd"/>').attr("rowspan",e.products.length).text(e.totalMoney).appendTo(o).click((function(){r.payLog({uid:0,orgId:e.orgId})}));var s=e.products.shift();$('<td class="pd"/>').text(s.productName).appendTo(o),$('<td class="fs t1"/>').text(s.firstAmount).appendTo(o),$('<td class="fs t2"/>').text(s.firstRefundAmount).appendTo(o),$('<td class="fs t3"/>').text(s.firstMoney).appendTo(o),$('<td class="sc t1"/>').text(s.secondAmount).appendTo(o),$('<td class="sc t2"/>').text(s.secondRefundAmount).appendTo(o),$('<td class="sc t3"/>').text(s.secondMoney).appendTo(o),$('<td class="tt"/>').text(s.totalMoney).appendTo(o),$.each(e.products,(function(t,r){var n=$("<tr></tr>").attr({orgId:e.orgId,path:e.path.substring(0,e.path.length-1)+"P",childrens:e.childrens}).appendTo(l);$('<td class="pd"/>').text(r.productName).appendTo(n),$('<td class="fs t1"/>').text(r.firstAmount).appendTo(n),$('<td class="fs t2"/>').text(r.firstRefundAmount).appendTo(n),$('<td class="fs t3"/>').text(r.firstMoney).appendTo(n),$('<td class="sc t1"/>').text(r.secondAmount).appendTo(n),$('<td class="sc t2"/>').text(r.secondRefundAmount).appendTo(n),$('<td class="sc t3"/>').text(r.secondMoney).appendTo(n),$('<td class="tt"/>').text(r.totalMoney).appendTo(n)})),e.orgId in a&&$.each(a[e.orgId],(function(t,r){var n=Math.max(1,r.childrens.length),a=$("<tr></tr>").attr({orgId:r.orgId,path:e.path,uid:r.uid}).appendTo(l);$('<td class="nm"/>').css("paddingLeft",24+14*e.grade).attr("rowspan",n).html("<p>所属组织："+r.orgName+"</p><p>分销人员："+(r.nickname||r.username)+"</p><p>身份："+r.identityName+"</p>").appendTo(a),$('<td class="tt logd"/>').attr("rowspan",n).text(r.totalMoney).appendTo(a).click((function(){logDialog.call(a,r.nickname||r.username,r.orgId,r.uid)}));var o=r.childrens.length?r.childrens.shift():r;$('<td class="pd"/>').text(o.productName).appendTo(a),$('<td class="fs t1"/>').text(o.firstAmount).appendTo(a),$('<td class="fs t2"/>').text(o.firstRefundAmount).appendTo(a),$('<td class="fs t3"/>').text(o.firstMoney).appendTo(a),$('<td class="sc t1"/>').text(o.secondAmount).appendTo(a),$('<td class="sc t2"/>').text(o.secondRefundAmount).appendTo(a),$('<td class="sc t3"/>').text(o.secondMoney).appendTo(a),$('<td class="tt"/>').text(o.totalMoney).appendTo(a),$.each(r.childrens,(function(t,n){var a=$("<tr></tr>").attr({orgId:r.orgId,path:e.path,uid:r.uid}).appendTo(l);$('<td class="pd"/>').text(n.productName).appendTo(a),$('<td class="fs t1"/>').text(n.firstAmount).appendTo(a),$('<td class="fs t2"/>').text(n.firstRefundAmount).appendTo(a),$('<td class="fs t3"/>').text(n.firstMoney).appendTo(a),$('<td class="sc t1"/>').text(n.secondAmount).appendTo(a),$('<td class="sc t2"/>').text(n.secondRefundAmount).appendTo(a),$('<td class="sc t3"/>').text(n.secondMoney).appendTo(a),$('<td class="tt"/>').text(n.totalMoney).appendTo(a)}))}))})),$("#j-report-profit").off().on("click",".iconmenu",(function(){var t=$(this),e=t.parent().parent(),r=e.nextAll('[path^="'+e.attr("path")+'"]'),n=r.filter(".fold");n.length&&(r=r.slice(0,r.index(n)+parseInt(n.attr("n")))),t.is(".el-icon-arrow-down")?(t.removeClass("el-icon-arrow-down").addClass("el-icon-arrow-right"),e.addClass("fold"),r.hide()):(e.removeClass("fold"),r.show(),t.removeClass("el-icon-arrow-right").addClass("el-icon-arrow-down"))})),$("#j-report-profit").find(".iconmenu").trigger("click"),e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e)})))()}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.setH(),e.next=3,t.getOrderReportBySelect();case 3:t.getNoAuthProvince(),t.closeLoading(),t.getOrgs(),t.getUsers(""),t.getTable(),t.orderTypes();case 9:case"end":return e.stop()}}),e)})))()}}),u=d,p=r("3b37"),f=(r("603e"),r("2877"));function h(t){this["$style"]=p["default"].locals||p["default"]}var g=Object(f["a"])(u,n,a,!1,h,null,null);e["default"]=g.exports},"3b37":function(t,e,r){"use strict";var n=r("e612"),a=r.n(n);e["default"]=a.a},"43e5":function(t,e,r){"use strict";r("4de4"),r("4160"),r("159b"),r("96cf");var n=r("1da1");e["a"]={data:function(){return{orgId:"",productId:"",uid:"",beginDate:"",endDate:"",orgs:[],products:[],userList:[],valueDate:[],inventoryList:[],type:"",allProCityList:[],provinceList:[],reportList:[]}},methods:{getOrgs:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiOther.getOrgs();case 2:r=e.sent,n=t.getTreeList(r,0,[],"orgId"),r=t.flattenOrgs(n),t.orgs=r;case 6:case"end":return e.stop()}}),e)})))()},getProduct:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiProduction.getProduct();case 2:t.products=e.sent;case 3:case"end":return e.stop()}}),e)})))()},flattenOrgs:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return t.forEach((function(t){t.index=n,r.push(t),t.children&&e.flattenOrgs(t.children,r,n+1)})),r},getUsers:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.ApiUser.getSelectUsers(t);case 2:e.userList=r.sent;case 3:case"end":return r.stop()}}),r)})))()},getInventorTypes:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiProduction.productPurchaseType();case 2:t.inventoryList=e.sent;case 3:case"end":return e.stop()}}),e)})))()},getAllProvince:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiOther.dictProvince();case 2:t.allProCityList=e.sent,t.provinceList=t.getTarget(t.allProCityList);case 4:case"end":return e.stop()}}),e)})))()},getTarget:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.filter((function(t){if(t.parentId===e)return t}))}}}},"603e":function(t,e,r){"use strict";var n=r("77e5"),a=r.n(n);a.a},"77e5":function(t,e,r){},"7db0":function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").find,o=r("44d2"),s=r("ae40"),i="find",c=!0,l=s(i);i in[]&&Array(1)[i]((function(){c=!1})),n({target:"Array",proto:!0,forced:c||!l},{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),o(i)},a833:function(t,e,r){"use strict";r("4de4"),r("7db0"),r("4160"),r("a9e3"),r("b680"),r("ac1f"),r("5319"),r("159b"),r("96cf");var n=r("1da1"),a=r("5530"),o=r("2f62");e["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(a["a"])({},Object(o["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{filterEnum:function(t,e){return this.dictoryObj[t].find((function(t){return t.key==e})).value},openLoading:function(){this.loading=!0},formatNum:function(t){return t=Number(t),(t.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(t,e,r){this.$confirm(t,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.t0=e,!t.t0){t.next=5;break}return t.next=4,e();case 4:t.t0=t.sent;case 5:n=t.t0,"number"!=typeof n&&r&&r();case 7:case"end":return t.stop()}}),t)}))))},tipMessage:function(t,e){this.$message({showClose:!0,message:t,type:e})},getTreeList:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3?arguments[3]:void 0;if(Array.isArray(t))return t.forEach((function(o){if(o.parentId===r)return n.push(o),o.children=[],e.getTreeList(t,o[a],o.children,a)})),n},flatten:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return t.forEach((function(t){t.index=r,n.push(t),t.children&&e.flatten(t.children,r+1,n)})),n},filterAllChild:function(){},remoteMethod:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.ApiUser.getSelectUsers(t);case 2:e.userList=r.sent;case 3:case"end":return r.stop()}}),r)})))()},getTarget:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.filter((function(t){if(t.parentId===e)return t}))}}}},e612:function(t,e,r){t.exports={myInput:"ProfitReport_myInput_A31gJ",provinceManager:"ProfitReport_provinceManager_1lYiJ",textLeft:"ProfitReport_textLeft_14HDA"}}}]);