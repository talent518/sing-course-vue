(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16e757be"],{"20a4":function(e,t,n){"use strict";var r=n("65bd"),a=n.n(r);t["default"]=a.a},"65bd":function(e,t,n){e.exports={headSearch:"IdentityManag_headSearch_3CmPy"}},"75b6":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("el-row",{staticClass:"el-form100 m20",attrs:{gutter:20}},[n("el-col",{attrs:{span:4}},[n("el-input",{attrs:{placeholder:"请输入身份"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),n("el-col",{staticClass:"textLeft",attrs:{span:16}},[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"IdentityView",expression:"'IdentityView'"}],attrs:{type:"primary"},on:{click:e.searchM}},[e._v("查询 ")]),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"IdentityCreate",expression:"'IdentityCreate'"}],attrs:{type:"success"},on:{click:e.addM}},[e._v("添加身份 ")])],1)],1),n("my-table",{attrs:{data:e.data}},[e._l(e.columnslist,(function(t){return n("el-table-column",{key:t.id,attrs:{label:t.label,prop:t.prop,"label-position":e.labelPosition,"label-width":e.labelWidth}})})),n("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"IdentityUpdate",expression:"'IdentityUpdate'"}],attrs:{type:"text",size:"small"},on:{click:function(n){return e.editM(t)}}},[e._v(" 编辑 ")]),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"IdentityDelete",expression:"'IdentityDelete'"}],attrs:{type:"text",size:"small"},on:{click:function(n){return e.deleteM(t)}}},[e._v(" 删除 ")]),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"IdentityAuth",expression:"'IdentityAuth'"}],attrs:{type:"text",size:"small"},on:{click:function(n){return e.authM(t)}}},[e._v(" 系统权限 ")])]}}])})],2),e.dialogFormVisible?n("el-dialog",{attrs:{title:e.ctitle,visible:e.dialogFormVisible,"close-on-click-modal":e.clickmodal},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"ruleForm",attrs:{model:e.model,"label-position":e.labelPosition,"status-icon":"","label-width":e.labelWidth,rules:e.rules}},[n("el-form-item",{attrs:{label:"身份",prop:"name"}},[n("el-input",{attrs:{placeholder:"请输入身份"},model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),n("el-form-item",{staticClass:"textLeft",attrs:{label:"角色",prop:"roles"}},[n("el-checkbox-group",{model:{value:e.model.roles,callback:function(t){e.$set(e.model,"roles",t)},expression:"model.roles"}},e._l(e.roles,(function(t){return n("el-checkbox",{key:t.roleId,attrs:{name:"type",label:t.roleId}},[e._v(e._s(t.roleName)+" ")])})),1)],1),n("el-form-item",{attrs:{label:"备注"}},[n("el-input",{attrs:{placeholder:"请输入备注"},model:{value:e.model.remark,callback:function(t){e.$set(e.model,"remark",t)},expression:"model.remark"}})],1),n("el-form-item",{staticClass:"textLeft",attrs:{label:"状态"}},[n("el-radio",{attrs:{label:e.isState1},model:{value:e.model.enabled,callback:function(t){e.$set(e.model,"enabled",t)},expression:"model.enabled"}},[e._v("启用")]),n("el-radio",{attrs:{label:e.isState0},model:{value:e.model.enabled,callback:function(t){e.$set(e.model,"enabled",t)},expression:"model.enabled"}},[e._v("禁用")])],1),n("el-form-item",{attrs:{label:""}},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveData("ruleForm")}}},[e._v("保存 ")])],1)],1)],1):e._e(),e.authIsShow?n("el-dialog",{staticClass:"textLeft",attrs:{title:"系统权限",visible:e.authIsShow,"close-on-click-modal":e.clickmodal},on:{"update:visible":function(t){e.authIsShow=t}}},[n("el-form",{ref:"ruleForm1",attrs:{model:e.model1,rules:e.rules1}},[n("el-form-item",{attrs:{label:"可管理身份",prop:"identitys"}},[n("el-checkbox-group",{model:{value:e.model1.identitys,callback:function(t){e.$set(e.model1,"identitys",t)},expression:"model1.identitys"}},e._l(e.identitys,(function(t){return n("el-checkbox",{key:t.id,attrs:{label:t.id}},[e._v(e._s(t.name)+" ")])})),1)],1),n("el-form-item",{attrs:{label:"数据查看权限"}},[n("el-checkbox-group",{model:{value:e.model1.viewAuth,callback:function(t){e.$set(e.model1,"viewAuth",t)},expression:"model1.viewAuth"}},e._l(e.viewAuth,(function(t){return n("el-checkbox",{key:t.value,attrs:{label:t.value}},[e._v(e._s(t.name)+" ")])})),1)],1),n("el-form-item",{attrs:{label:"数据编辑权限"}},[n("el-checkbox-group",{model:{value:e.model1.editAuth,callback:function(t){e.$set(e.model1,"editAuth",t)},expression:"model1.editAuth"}},e._l(e.editAuth,(function(t){return n("el-checkbox",{key:t.value,attrs:{label:t.value}},[e._v(e._s(t.name)+" ")])})),1)],1),n("el-form-item",{attrs:{label:""}},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveAuth("ruleForm1")}}},[e._v("保存 ")])],1)],1)],1):e._e()],1)},a=[],i=(n("4160"),n("d81d"),n("b0c0"),n("a9e3"),n("ac1f"),n("1276"),n("159b"),n("5530")),s=(n("96cf"),n("1da1")),l=(n("c24f"),n("bfb4")),o=(n("2f62"),n("bcaf")),u=n("a833"),c=(n("2ef0"),{name:"IdentityManag",mixins:[o["a"],u["a"]],data:function(){return{columnslist:[{prop:"name",label:"身份"},{prop:"remark",label:"备注"},{prop:"enabledV",label:"状态"}],name:"",data:[],state:0,model:{name:"",remark:"",enabled:1,roles:[]},rules:{name:[{required:!0,message:"请输入身份",trigger:["blur","change"]}],roles:[{required:!0,message:"至少选择一个角色",trigger:["blur","change"]}]},rules1:{identitys:[{required:!0,message:"至少选择一个管理身份",trigger:["blur","change"]}]},authIsShow:!1,roles:[],isState0:0,isState1:1,model1:{identitys:[],editAuth:2,viewAuth:2},ideneityAuth:[],viewAuth:[],editAuth:[],identitys:[]}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.initData(),e.getAuthM();case 2:case"end":return t.stop()}}),t)})))()},computed:{ctitle:function(){return 0===this.state?"添加身份":"编辑身份"}},methods:{initData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l["a"].getIdentity(e.name);case 2:n=t.sent,n.forEach((function(e){e.enabledV=0===e.enabled?"禁用":"启用"})),e.identitys=n,e.data=n,e.getRole();case 7:case"end":return t.stop()}}),t)})))()},searchM:function(){this.initData()},editM:function(e){var t=e.row;this.state=1,this.open(),Object.assign(this.model,t),this.model.roles=this.model.roles.split(",").map(Number)},deleteM:function(e){var t=this,n=e.row;this.confirmDelMessage("确定要删除该身份吗",Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",l["a"].delIdentity(n.id));case 1:case"end":return e.stop()}}),e)}))),Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.initData();case 1:case"end":return e.stop()}}),e)}))))},authM:function(e){var t=e.row;this.authIsShow=!0,this.model1.identitys=t.identitys&&t.identitys.split(",").map(Number)||[],this.model1.editAuth=t.editAuth&&t.editAuth.split(",").map(Number)||[],this.model1.viewAuth=t.viewAuth&&t.viewAuth.split(",").map(Number)||[],this.authMId=t.id},addM:function(){this.model={name:"",remark:"",enabled:1,roles:[]},this.state=0,this.open()},getRole:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l["a"].dictRoles();case 2:e.roles=t.sent;case 3:case"end":return t.stop()}}),t)})))()},saveAuth:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=8;break}return e.next=3,l["a"].getIdentityAuth(Object(i["a"])({id:t.authMId},t.model1));case 3:e.sent,t.authIsShow=!1,t.initData(),e.next=9;break;case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},resetData1:function(){this.name="",this.remark="",this.enabled,this.roles=[]},getAuthM:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l["a"].viewAuth();case 2:return e.viewAuth=t.sent,t.next=5,l["a"].editAuth();case 5:e.editAuth=t.sent;case 6:case"end":return t.stop()}}),t)})))()},saveData:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=13;break}if(0!==t.state){e.next=6;break}return e.next=4,l["a"].postIdentity(t.model);case 4:e.next=9;break;case 6:if(1!==t.state){e.next=9;break}return e.next=9,l["a"].putIdentity(t.model);case 9:t.initData(),t.close(),e.next=14;break;case 13:return e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}}),d=c,m=n("20a4"),h=n("2877");function p(e){this["$style"]=m["default"].locals||m["default"]}var f=Object(h["a"])(d,r,a,!1,p,null,null);t["default"]=f.exports},a833:function(e,t,n){"use strict";n("4de4"),n("4160"),n("a9e3"),n("b680"),n("ac1f"),n("5319"),n("159b"),n("96cf");var r=n("1da1"),a=n("5530"),i=n("2f62");t["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(a["a"])({},Object(i["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{openLoading:function(){this.loading=!0},formatNum:function(e){return e=Number(e),(e.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(e,t,n){this.$confirm(e,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.t0=t,!e.t0){e.next=5;break}return e.next=4,t();case 4:e.t0=e.sent;case 5:r=e.t0,"number"!=typeof r&&n&&n();case 7:case"end":return e.stop()}}),e)}))))},tipMessage:function(e,t){this.$message({showClose:!0,message:e,type:t})},getTreeList:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3?arguments[3]:void 0;if(Array.isArray(e))return e.forEach((function(i){if(i.parentId===n)return r.push(i),i.children=[],t.getTreeList(e,i[a],i.children,a)})),r},flatten:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return e.forEach((function(e){e.index=n,r.push(e),e.children&&t.flatten(e.children,n+1,r)})),r},filterAllChild:function(){},remoteMethod:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.ApiUser.getSelectUsers(e);case 2:t.userList=n.sent;case 3:case"end":return n.stop()}}),n)})))()},getTarget:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.filter((function(e){if(e.parentId===t)return e}))}}}}}]);