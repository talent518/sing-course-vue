(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00c6cdd3"],{"0a46":function(e,t,r){},a833:function(e,t,r){"use strict";r("dbb3"),r("fe59"),r("513c"),r("20a5"),r("e35a"),r("5e9f"),r("08ba"),r("b449");var n=r("ae9a"),a=r("0eaa"),i=r("ae8c");t["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(a["a"])({},Object(i["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{openLoading:function(){this.loading=!0},formatNum:function(e){return e=Number(e),(e.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(e,t,r){this.$confirm(e,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.t0=t,!e.t0){e.next=5;break}return e.next=4,t();case 4:e.t0=e.sent;case 5:n=e.t0,"number"!=typeof n&&r&&r();case 7:case"end":return e.stop()}}),e)}))))},tipMessage:function(e,t){this.$message({showClose:!0,message:e,type:t})},getTreeList:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3?arguments[3]:void 0;if(Array.isArray(e))return e.forEach((function(i){if(i.parentId===r)return n.push(i),i.children=[],t.getTreeList(e,i[a],i.children,a)})),n},flatten:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return e.forEach((function(e){e.index=r,n.push(e),e.children&&t.flatten(e.children,r+1,n)})),n},filterAllChild:function(){},remoteMethod:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.ApiUser.getSelectUsers(e);case 2:t.userList=r.sent;case 3:case"end":return r.stop()}}),r)})))()},getTarget:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.filter((function(e){if(e.parentId===t)return e}))}}}},b9cd:function(e,t,r){"use strict";var n=r("f75c"),a=r.n(n);t["default"]=a.a},c28f:function(e,t,r){"use strict";var n=r("0a46"),a=r.n(n);a.a},e43b:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",[r("div",{class:e.$style.searchWrap},[r("div",{class:e.$style.search},[r("div",{class:e.$style.inputW},[r("el-input",{attrs:{placeholder:"请输入角色名"},model:{value:e.roleName,callback:function(t){e.roleName=t},expression:"roleName"}})],1),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"RoleView",expression:"'RoleView'"}],attrs:{type:"primary"},on:{click:e.searchM}},[e._v("查询 ")])],1),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"RoleCreate",expression:"'RoleCreate'"}],attrs:{type:"success"},on:{click:e.addRole}},[e._v("添加角色 ")])],1),r("el-table",{attrs:{data:e.role,border:""}},[e._l(e.columnslist,(function(e){return r("el-table-column",{key:e.roleKey,attrs:{prop:e.prop,label:e.label}})})),r("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"RoleUpdate",expression:"'RoleUpdate'"}],attrs:{type:"text",size:"small"},on:{click:function(r){return e.editAuth(t.$index,e.role)}}},[e._v(" 编辑 ")]),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"RoleDelete",expression:"'RoleDelete'"}],attrs:{type:"text",size:"small"},on:{click:function(r){return e.deleteM(t.$index,e.role)}}},[e._v(" 删除 ")])]}}])})],2),e.dialogFormVisible?r("el-dialog",{staticClass:"roleDialog",attrs:{title:e.isState,visible:e.dialogFormVisible,"before-close":e.beforeClose,"close-on-click-modal":e.clickmodal},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.model,"label-width":"120px","label-position":e.labelPosition,rules:e.rules}},[r("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[r("el-input",{model:{value:e.model.roleName,callback:function(t){e.$set(e.model,"roleName",t)},expression:"model.roleName"}})],1),r("el-form-item",{attrs:{label:"备注"}},[r("el-input",{attrs:{placeholder:"具备操作权限"},model:{value:e.model.remark,callback:function(t){e.$set(e.model,"remark",t)},expression:"model.remark"}})],1)],1),r("el-row",[r("el-col",{attrs:{span:10}},[r("el-tree",{ref:"mytree",attrs:{data:e.menus,"show-checkbox":"","default-expand-all":"","highlight-current":"","node-key":"menuId",props:e.defaultProps,"check-strictly":e.checkStrictly}})],1),r("el-col",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保存 ")])],1)],1)],1):e._e()],1)},a=[],i=(r("fe59"),r("e35a"),r("0d7a"),r("08ba"),r("0eaa")),s=(r("b449"),r("ae9a")),o=r("bcaf"),l=r("a833"),c=r("c24f"),u=r("1f27"),d={add:"添加角色",edit:"编辑角色"},m={name:"roleList",mixins:[o["a"],l["a"]],data:function(){return{columnslist:[{prop:"roleKey",label:"角色键"},{prop:"roleName",label:"业务员"},{prop:"remark",label:"备注"}],input:"",state:"",model:{roleName:"",remark:""},roleName:"",labelPosition:"left",menus:[],rules:{roleName:[{required:!0,message:"请输入角色名称",trigger:["blur","change"]}]}}},computed:{isState:function(){return d[this.state]}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u["a"].dictMenus();case 2:r=t.sent,e.menus=p(r);case 4:case"end":return t.stop()}}),t)})))()},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=16;break}if(n="",a=t.$refs.mytree.getCheckedKeys(!0),Array.isArray(a)||(a=a.split(",")),"add"!==t.state){e.next=10;break}return e.next=7,c["a"].postRole(Object(i["a"])(Object(i["a"])({},t.model),{},{menuIds:a}));case 7:n=e.sent,e.next=13;break;case 10:return e.next=12,c["a"].putRole(Object(i["a"])(Object(i["a"])({},t.model),{},{menuIds:a}));case 12:n=e.sent;case 13:n==t.saveSuccess&&(t.close(),t.resetData(),t.getRole()),e.next=18;break;case 16:return console.log("error submit!!"),e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},editAuth:function(e,t){this.open(),this.state="edit";var r=t[e];this.model=r;var n=r.menuIds;this.setMenus(n.split(","))},setMenus:function(e){var t=this;this.$nextTick((function(){t.$refs.mytree.setCheckedKeys(e)}))},addRole:function(){this.open(),this.state="add"},resetData:function(){this.model={roleName:"",remark:""}},beforeClose:function(e){this.resetData(),e()},searchM:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.getRole(e.roleName);case 1:case"end":return t.stop()}}),t)})))()},deleteM:function(e,t){var r=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r.confirmDelMessage("要删除该角色吗",Object(s["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=t[e],r.abrupt("return",c["a"].delRole(n.roleId));case 2:case"end":return r.stop()}}),r)}))),Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r.getRole();case 1:case"end":return e.stop()}}),e)}))));case 1:case"end":return n.stop()}}),n)})))()},save:function(){this.close()}}},p=function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return t.forEach((function(a){if(a.parentId===r)return n.push(a),a.children=[],e(t,a.menuId,a.children)})),n},f=m,h=r("b9cd"),b=(r("c28f"),r("4023"));function v(e){this["$style"]=h["default"].locals||h["default"]}var g=Object(b["a"])(f,n,a,!1,v,null,null);t["default"]=g.exports},f75c:function(e,t,r){e.exports={search:"RoleList_search_1bLlB",inputW:"RoleList_inputW_2_8-g",static:"RoleList_static_3MyMF",searchWrap:"RoleList_searchWrap_3s2M8",search1:"RoleList_search1_3FykD",min30:"RoleList_min30_2gbWV",m20:"RoleList_m20_lMPd3"}}}]);