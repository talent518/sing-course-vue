(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-84fed9bc"],{"12e8":function(e,t,r){"use strict";r.r(t);var a,n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",[r("div",{staticClass:"textLeft m20"},[r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"DictCreate",expression:"'DictCreate'"}],attrs:{type:"success"},on:{click:e.addRoot}},[e._v("添加 ")])],1),r("my-table",{attrs:{data:e.data}},[e._l(e.columnslist,(function(e){return r("el-table-column",{key:e.prop,attrs:{prop:e.prop,label:e.label}})})),r("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"DictView",expression:"'DictView'"}],attrs:{type:"text",size:"small"},on:{click:function(r){return e.list(t)}}},[e._v(" 列表 ")]),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"DictUpdate",expression:"'DictUpdate'"}],attrs:{type:"text",size:"small"},on:{click:function(r){return e.edit(t)}}},[e._v(" 编辑 ")]),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"DictCreate",expression:"'DictCreate'"}],attrs:{type:"text",size:"small"},on:{click:function(r){return e.add(t)}}},[e._v(" 添加 ")]),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"DictGenerate",expression:"'DictGenerate'"}],attrs:{type:"text",size:"small"},on:{click:function(r){return e.release(t)}}},[e._v(" 发布 ")]),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"DictDelete",expression:"'DictDelete'"}],attrs:{type:"text",size:"small"},on:{click:function(r){return e.del(t)}}},[e._v(" 删除 ")])]}}])})],2),e.dialogFormVisible1?r("el-dialog",{attrs:{title:"添加字典",visible:e.dialogFormVisible1},on:{"update:visible":function(t){e.dialogFormVisible1=t}}},[r("my-form",{attrs:{model:e.childDataObj,rules:e.rules}},[r("el-form-item",{attrs:{label:"属性名",prop:"propName"}},[r("el-input",{attrs:{placeholder:"请输入属性名"},model:{value:e.childDataObj.propName,callback:function(t){e.$set(e.childDataObj,"propName",t)},expression:"childDataObj.propName"}})],1),r("el-form-item",{attrs:{label:"属性值",prop:"propValue"}},[r("el-input",{attrs:{placeholder:"请输入属性名"},model:{value:e.childDataObj.propValue,callback:function(t){e.$set(e.childDataObj,"propValue",t)},expression:"childDataObj.propValue"}})],1),r("el-form-item",{attrs:{label:"缩写"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.childDataObj.t,callback:function(t){e.$set(e.childDataObj,"t",t)},expression:"childDataObj.t"}})],1),r("el-form-item",{attrs:{label:"全写"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.childDataObj.translate,callback:function(t){e.$set(e.childDataObj,"translate",t)},expression:"childDataObj.translate"}})],1),r("el-form-item",{attrs:{label:"注释"}},[r("el-input",{attrs:{placeholder:"请写入注释"},model:{value:e.childDataObj.comment,callback:function(t){e.$set(e.childDataObj,"comment",t)},expression:"childDataObj.comment"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")])],1)],1)],1):e._e(),e.dialogFormVisible?r("el-dialog",{attrs:{title:e.title,visible:e.dialogFormVisible,"close-on-click-modal":e.clickmodal},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("my-table",{attrs:{data:e.childData}},[e._l(e.childList,(function(e){return r("el-table-column",{key:e.prop,attrs:{prop:e.prop,label:e.label}})})),r("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"OrgUpdate",expression:"'OrgUpdate'"}],attrs:{type:"text",size:"small"},on:{click:function(r){return e.edit1(t)}}},[e._v(" 编辑 ")]),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"OrgDelete",expression:"'OrgDelete'"}],attrs:{type:"text",size:"small"},on:{click:function(r){return e.del1(t)}}},[e._v(" 删除 ")])]}}],null,!1,152749542)})],2)],1):e._e(),e.dialogFormVisible2?r("el-dialog",{attrs:{title:e.title1,visible:e.dialogFormVisible2,"close-on-click-modal":e.clickmodal},on:{"update:visible":function(t){e.dialogFormVisible2=t}}},[r("my-form",{staticClass:"textLeft",attrs:{model:e.model,rules:e.rules1}},[r("el-form-item",{attrs:{label:"数据类型：",prop:"dataType"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择数据类型"},model:{value:e.model.dataType,callback:function(t){e.$set(e.model,"dataType",t)},expression:"model.dataType"}},e._l(e.listData,(function(e){return r("el-option",{key:e.index,attrs:{label:e.name,value:e.index}})})),1)],1),r("el-form-item",{attrs:{label:"规则："}},[r("el-input",{attrs:{placeholder:"请输入规则",clearable:""},model:{value:e.model.pattern,callback:function(t){e.$set(e.model,"pattern",t)},expression:"model.pattern"}})],1),r("el-form-item",{attrs:{label:"是否唯一："}},[r("el-checkbox",{model:{value:e.model.isUnique,callback:function(t){e.$set(e.model,"isUnique",t)},expression:"model.isUnique"}})],1),r("el-form-item",{attrs:{label:"字典Key："}},[r("el-input",{attrs:{placeholder:"请输入字典名称",clearable:""},model:{value:e.model.className,callback:function(t){e.$set(e.model,"className",t)},expression:"model.className"}})],1),r("el-form-item",{attrs:{label:"字典名称："}},[r("el-input",{attrs:{placeholder:"请输入类标题",clearable:""},model:{value:e.model.classTitle,callback:function(t){e.$set(e.model,"classTitle",t)},expression:"model.classTitle"}})],1),r("el-form-item",{attrs:{label:"注释："}},[r("el-input",{attrs:{placeholder:"请输入注释",clearable:""},model:{value:e.model.comment,callback:function(t){e.$set(e.model,"comment",t)},expression:"model.comment"}})],1),r("el-form-item",{attrs:{label:""}},[r("el-button",{attrs:{type:"success"},on:{click:e.saveD}},[e._v("保存")])],1)],1)],1):e._e(),e.dialogFormVisible3?r("el-dialog",{attrs:{title:"数据字典发布",visible:e.dialogFormVisible3,"close-on-click-modal":e.clickmodal},on:{"update:visible":function(t){e.dialogFormVisible3=t}}},[r("div",{staticStyle:{"text-align":"left"},domProps:{innerHTML:e._s(e.html)}})]):e._e()],1)},i=[],s=(r("d81d"),r("a9e3"),r("ade3")),l=r("5530"),o=(r("96cf"),r("1da1")),c=r("bcaf"),u=r("a833"),p=r("43e5"),d={name:"DataDictManager",mixins:[c["a"],u["a"],p["a"]],data:function(){return{data:[],listData:[],html:"",columnslist:[{prop:"classTitle",label:"字典名称"},{prop:"className",label:"字典key"},{prop:"classId",label:"字典值"},{prop:"comment",label:"注释"}],childList:[{prop:"propName",label:"属性名"},{prop:"propValue",label:"属性值"},{prop:"t",label:"缩写"},{prop:"translate",label:"全写"},{prop:"comment",label:"注释"}],childDataObj:{propName:"",propValue:"",t:"",translate:"",comment:""},rules:{propName:[{required:!0,message:"请输入属性名",trigger:["blur","change"]}],propValue:[{required:!0,message:"请输入属性值",trigger:["blur","change"]}]},parentId:"",childData:[],state:0,dialogFormVisible1:!1,title:"",state1:0,dialogFormVisible2:!1,dialogFormVisible3:!1,checkedList:[1],model:{fromId:0,dataType:"",pattern:"",isUnique:!1,className:"",classTitle:"",comment:""},rules1:{dataType:[{required:!0,message:"请选择数据类型",trigger:["blur","change"]}]}}},computed:{title1:function(){return 0===this.state1?"添加字典类":"编辑字典类"}},methods:(a={open3:function(){this.dialogFormVisible3=!0},close3:function(){this.dialogFormVisible3=!1},release:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=e.row,t.html="",t.open3(),r.next=5,t.ApiOther.getDDCLassGenerate(a.classId);case 5:t.html=r.sent;case 6:case"end":return r.stop()}}),r)})))()},saveD:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=Object(l["a"])({},e.model),r.isUnique=Number(r.isUnique),0!==e.state1){t.next=9;break}return t.next=5,e.ApiOther.postDClass(r);case 5:a=t.sent,a===e.saveSuccess&&(e.close2(),e.getddClassList()),t.next=13;break;case 9:return t.next=11,e.ApiOther.putDClass(r);case 11:n=t.sent,n===e.saveSuccess&&(e.close2(),e.getddClassList());case 13:case"end":return t.stop()}}),t)})))()},getddClassList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiOther.getDClass();case 2:r=t.sent,e.data=r;case 4:case"end":return t.stop()}}),t)})))()},resetData:function(){this.childDataObj={propName:"",propValue:"",t:"",translate:"",comment:""}},open1:function(){this.dialogFormVisible1=!0},close1:function(){this.dialogFormVisible1=!1},edit:function(e){var t=e.row;this.open2(),this.state1=1,Object.assign(this.model,t),this.model.isUnique=Boolean(Number(this.model.isUnique))},add:function(e){var t=e.row;this.resetData(),this.parentId=t.classId,this.state=0,this.open1()},edit1:function(e){var t=e.row;this.state=1,Object.assign(this.childDataObj,t),this.childDataObj.id=this.childDataObj.propId,this.open1()},add1:function(e){e.row},save:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r={},0!==e.state){t.next=7;break}return t.next=4,e.ApiOther.addDdProperty(Object(l["a"])({id:e.parentId},e.childDataObj));case 4:r=t.sent,t.next=11;break;case 7:if(1!==e.state){t.next=11;break}return t.next=10,e.ApiOther.putDdProperty(e.childDataObj);case 10:r=t.sent;case 11:r===e.saveSuccess&&(e.refleshData(),e.close1());case 12:case"end":return t.stop()}}),t)})))()},refleshData:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiOther.getDdProperty(e.parentId);case 2:e.childData=t.sent;case 3:case"end":return t.stop()}}),t)})))()},del1:function(e){var t=this,r=e.row;this.state=3,this.parentId=r.classId,this.confirmDelMessage("确定要删除该属性吗",Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",t.ApiOther.delDdProperty(r.propId));case 1:case"end":return e.stop()}}),e)}))),Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.refleshData();case 1:case"end":return e.stop()}}),e)}))))},open2:function(){this.dialogFormVisible2=!0},close2:function(){this.dialogFormVisible2=!1}},Object(s["a"])(a,"resetData",(function(){this.model={fromId:0,dataType:"",pattern:"",isUnique:!1,className:"",classTitle:"",comment:""}})),Object(s["a"])(a,"addRoot",(function(){this.state1=0,this.resetData(),this.open2()})),Object(s["a"])(a,"list",(function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=e.row,t.title=a.classTitle+"列表",t.parentId=a.classId,t.state=5,r.next=6,t.ApiOther.getDdProperty(a.classId);case 6:n=r.sent,t.childData=n,t.open();case 9:case"end":return r.stop()}}),r)})))()})),Object(s["a"])(a,"getDataTypes",(function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiOther.getDataTypes();case 2:r=t.sent,e.listData=r.map((function(e,t){return{name:e,index:t}}));case 4:case"end":return t.stop()}}),t)})))()})),Object(s["a"])(a,"del",(function(e){var t=this,r=e.row;this.confirmDelMessage("确定要删除该字典吗",Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",t.ApiOther.delDClass(r.classId));case 1:case"end":return e.stop()}}),e)}))),Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getDataTypes(),t.getddClassList();case 2:case"end":return e.stop()}}),e)}))))})),a),mounted:function(){this.getDataTypes(),this.getddClassList()}},m=d,h=r("2877"),f=Object(h["a"])(m,n,i,!1,null,null,null);t["default"]=f.exports},"43e5":function(e,t,r){"use strict";r("4de4"),r("4160"),r("159b"),r("96cf");var a=r("1da1");t["a"]={data:function(){return{orgId:"",productId:"",uid:"",beginDate:"",endDate:"",orgs:[],products:[],userList:[],valueDate:[],inventoryList:[],type:"",allProCityList:[],provinceList:[],reportList:[]}},methods:{getOrgs:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiOther.getOrgs();case 2:r=t.sent,a=e.getTreeList(r,0,[],"orgId"),r=e.flattenOrgs(a),e.orgs=r;case 6:case"end":return t.stop()}}),t)})))()},getProduct:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiProduction.getProduct();case 2:e.products=t.sent;case 3:case"end":return t.stop()}}),t)})))()},flattenOrgs:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.forEach((function(e){e.index=a,r.push(e),e.children&&t.flattenOrgs(e.children,r,a+1)})),r},getUsers:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.ApiUser.getSelectUsers(e);case 2:t.userList=r.sent;case 3:case"end":return r.stop()}}),r)})))()},getInventorTypes:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiProduction.productPurchaseType();case 2:e.inventoryList=t.sent;case 3:case"end":return t.stop()}}),t)})))()},getAllProvince:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiOther.dictProvince();case 2:e.allProCityList=t.sent,e.provinceList=e.getTarget(e.allProCityList);case 4:case"end":return t.stop()}}),t)})))()},getTarget:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.filter((function(e){if(e.parentId===t)return e}))}}}},a833:function(e,t,r){"use strict";r("4de4"),r("4160"),r("a9e3"),r("b680"),r("ac1f"),r("5319"),r("159b"),r("96cf");var a=r("1da1"),n=r("5530"),i=r("2f62");t["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(n["a"])({},Object(i["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{openLoading:function(){this.loading=!0},formatNum:function(e){return e=Number(e),(e.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(e,t,r){this.$confirm(e,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.t0=t,!e.t0){e.next=5;break}return e.next=4,t();case 4:e.t0=e.sent;case 5:a=e.t0,"number"!=typeof a&&r&&r();case 7:case"end":return e.stop()}}),e)}))))},tipMessage:function(e,t){this.$message({showClose:!0,message:e,type:t})},getTreeList:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=arguments.length>3?arguments[3]:void 0;if(Array.isArray(e))return e.forEach((function(i){if(i.parentId===r)return a.push(i),i.children=[],t.getTreeList(e,i[n],i.children,n)})),a},flatten:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return e.forEach((function(e){e.index=r,a.push(e),e.children&&t.flatten(e.children,r+1,a)})),a},filterAllChild:function(){},remoteMethod:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.ApiUser.getSelectUsers(e);case 2:t.userList=r.sent;case 3:case"end":return r.stop()}}),r)})))()},getTarget:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.filter((function(e){if(e.parentId===t)return e}))}}}}}]);