(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02ee276f"],{4194:function(e,t,n){"use strict";var r=n("1c8b"),a=n("5dfd").find,i=n("258f"),o=n("ff9c"),s="find",u=!0,l=o(s);s in[]&&Array(1)[s]((function(){u=!1})),r({target:"Array",proto:!0,forced:u||!l},{find:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),i(s)},5045:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("el-row",{staticClass:"m20 el-form100",attrs:{gutter:20}},[n("el-col",{attrs:{span:4}},[n("el-input",{attrs:{placeholder:e.placeholder}})],1),n("el-col",{staticClass:"textLeft",attrs:{span:16}},[n("el-button",{attrs:{type:"primary"}},[e._v("查询")]),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"MenuCreate",expression:"'MenuCreate'"}],attrs:{type:"success"},on:{click:e.addMenu}},[e._v("添加菜单 ")])],1)],1),n("my-table",{attrs:{data:e.dataMenu,"row-key":"menuId","tree-props":{children:"children",hasChildren:"hasChildren"}}},[e._l(e.columnslist,(function(e){return n("el-table-column",{key:e.menuId,attrs:{prop:e.prop,label:e.label}})})),n("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[2!=t.row.menuType?n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"MenuUpdate",expression:"'MenuUpdate'"}],attrs:{type:"text",size:"small"},on:{click:function(n){return e.moveMenu(t)}}},[e._v("移动菜单 ")]):e._e(),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"MenuUpdate",expression:"'MenuUpdate'"}],attrs:{type:"text",size:"small"},on:{click:function(n){return e.editMenu(t)}}},[e._v(" 编辑 ")]),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"MenuDelete",expression:"'MenuDelete'"}],attrs:{type:"text",size:"small"},on:{click:function(n){return e.delMenuMethod(t)}}},[e._v(" 删除 ")]),2!=t.row.menuType?n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"MenuCreate",expression:"'MenuCreate'"}],attrs:{type:"text",size:"small"},on:{click:function(n){return e.addChildMenu(t)}}},[e._v(" 添加下级菜单 ")]):e._e()]}}])})],2),e.dialogFormVisible?n("el-dialog",{attrs:{title:e.title,visible:e.dialogFormVisible,"close-on-click-modal":e.clickmodal},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("my-form",{ref:"ruleForm",attrs:{model:e.model,rules:e.rules}},[2==e.state?n("el-form-item",{attrs:{label:"上级菜单"}},[n("el-input",{attrs:{disabled:"",placeholder:""},model:{value:e.model.parentName,callback:function(t){e.$set(e.model,"parentName",t)},expression:"model.parentName"}})],1):e._e(),n("el-form-item",{staticClass:"textLeft",attrs:{label:"菜单类型",prop:"menuType"}},[n("el-radio-group",{model:{value:e.model.menuType,callback:function(t){e.$set(e.model,"menuType",t)},expression:"model.menuType"}},[n("el-radio",{attrs:{label:0}},[e._v("目录")]),n("el-radio",{attrs:{label:1}},[e._v("菜单")]),n("el-radio",{attrs:{label:2}},[e._v("功能")])],1)],1),n("el-form-item",{attrs:{label:"菜单名称",prop:"menuName"}},[n("el-input",{attrs:{placeholder:"请输入菜单名"},model:{value:e.model.menuName,callback:function(t){e.$set(e.model,"menuName",t)},expression:"model.menuName"}})],1),n("el-form-item",{attrs:{label:"链接地址"}},[n("el-input",{attrs:{placeholder:"请输入链接地址"},model:{value:e.model.menuLink,callback:function(t){e.$set(e.model,"menuLink",t)},expression:"model.menuLink"}})],1),n("el-form-item",{attrs:{label:"菜单键",prop:"menuKey"}},[n("el-input",{attrs:{placeholder:"请输入菜单键"},model:{value:e.model.menuKey,callback:function(t){e.$set(e.model,"menuKey",t)},expression:"model.menuKey"}})],1),n("el-form-item",{attrs:{label:"菜单序号",prop:"menuKey"}},[n("el-input",{attrs:{placeholder:"请输入菜单键"},model:{value:e.model.menuSort,callback:function(t){e.$set(e.model,"menuSort",t)},expression:"model.menuSort"}})],1),n("el-form-item",{staticClass:"textRight",attrs:{label:""}},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.save("ruleForm")}}},[e._v("保存")])],1)],1)],1):e._e(),e.dialogFormVisible1?n("el-dialog",{attrs:{title:"移动菜单",visible:e.dialogFormVisible1,"close-on-click-modal":e.clickmodal},on:{"update:visible":function(t){e.dialogFormVisible1=t}}},[e.filterMenu.length?n("el-select",{attrs:{placeholder:"请选择移动菜单"},model:{value:e.model1.toId,callback:function(t){e.$set(e.model1,"toId",t)},expression:"model1.toId"}},e._l(e.filterMenu,(function(t){return 2!=t.menuType?n("el-option",{key:t.menuId,attrs:{value:t.menuId,label:t.menuName}},[e._l(t.index,(function(t){return n("span",{staticClass:"opcaity"},[e._v("13")])})),n("span",[e._v(e._s(t.menuName))])],2):e._e()})),1):e._e(),n("el-button",{attrs:{type:"success"},on:{click:e.saveMoveMenu}},[e._v("保存")])],1):e._e()],1)},a=[],i=(n("b4fb"),n("dbb3"),n("4194"),n("b449"),n("ae9a")),o=n("c52d"),s=n("0eaa"),u=n("ae8c"),l=n("bcaf"),c=n("a833"),m={name:"SysMenu",mixins:[l["a"],c["a"]],data:function(){return{placeholder:"请输入菜单名",columnslist:[{prop:"menuName",label:"菜单名称"},{prop:"menuKey",label:"菜单键"},{prop:"type",label:"类型"}],state:0,dialogFormVisible1:!1,model:{menuName:"",menuKey:"",menuLink:"",menuType:"",parentName:"",menuSort:9999},model1:{fromId:"",toId:""},rules:{menuType:[{required:!0,message:"请选择类型",trigger:["blur","change"]}],menuKey:[{required:!0,message:"请输入key值",trigger:["blur","change"]}],menuName:[{required:!0,message:"请输入菜单名称",trigger:"change"}]},filterMenu:[]}},methods:Object(s["a"])(Object(s["a"])({},Object(u["b"])("menu",{getAllMenu:"getAllMenu"})),{},{moveMenu:function(e){var t=e.row,n=this.flatten(this.cloneDeep(this.allMenu));n=[{menuName:"根菜单",menuId:0,index:0}].concat(Object(o["a"])(n));var r=this.cloneDeep(t),a=this.flatten(r.children,0);delete r.children,a=[r].concat(Object(o["a"])(a)),this.filterMenu=n.filter((function(e){return!a.find((function(t){return e.menuId===t.menuId}))})),this.model1.fromId=t.menuId,this.open1()},saveMoveMenu:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ApiMenu.postMenuMove(e.model1);case 2:n=t.sent,n==e.saveSuccess&&(e.close1(),e.getAllMenu());case 4:case"end":return t.stop()}}),t)})))()},open1:function(){this.dialogFormVisible1=!0},close1:function(){this.dialogFormVisible1=!1},editMenu:function(e){var t=e.row;this.state=1,Object.assign(this.model,t),this.open()},resetData:function(){this.model={menuName:"",menuKey:"",menuLink:"",menuType:"",parentName:"",menuSort:""}},addMenu:function(e){e.row;this.state=0,this.open()},addChildMenu:function(e){var t=e.row;this.resetData(),this.model.parentName=t.menuName,this.model.parentId=t.menuId,this.state=3,this.open()},addMenuMehtod:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.ApiMenu.postMenu(e);case 2:r=n.sent,r===t.saveSuccess&&(t.getAllMenu(),t.close());case 4:case"end":return n.stop()}}),n)})))()},updateMenuMehtod:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.ApiMenu.putMenu(e);case 2:r=n.sent,r===t.saveSuccess&&(t.getAllMenu(),t.close());case 4:case"end":return n.stop()}}),n)})))()},delMenuMethod:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=e.row,t.confirmDelMessage("确定要删除该菜单吗",Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiMenu.delMenu(r.menuId);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getAllMenu();case 1:case"end":return e.stop()}}),e)}))));case 2:case"end":return n.stop()}}),n)})))()},deleteAuth:function(e){e.row},save:function(e){var t=this;this.$refs[e].$children[0].validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=4;break}0===t.state?(t.model.parentId=0,t.addMenuMehtod(t.model)):2===t.state?t.addMenuMehtod(t.model):1===t.state&&t.updateMenuMehtod(t.model),e.next=6;break;case 4:return console.log("error submit!!"),e.abrupt("return",!1);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}),computed:{title:function(){return 0==this.state?"添加菜单":1==this.state?"编辑菜单":3==this.state?"添加下级菜单":void 0},dataMenu:function(){return this.allMenu||[]}},created:function(){this.getAllMenu()}},d=m,p=n("5d9b"),f=n("4023");function h(e){this["$style"]=p["default"].locals||p["default"]}var b=Object(f["a"])(d,r,a,!1,h,null,null);t["default"]=b.exports},"5d9b":function(e,t,n){"use strict";var r=n("fb43"),a=n.n(r);t["default"]=a.a},a833:function(e,t,n){"use strict";n("dbb3"),n("4194"),n("fe59"),n("513c"),n("20a5"),n("e35a"),n("5e9f"),n("08ba"),n("b449");var r=n("ae9a"),a=n("0eaa"),i=n("ae8c");t["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(a["a"])({},Object(i["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{filterEnum:function(e,t){return this.dictoryObj[e].find((function(e){return e.key==t})).value},openLoading:function(){this.loading=!0},formatNum:function(e){return e=Number(e),(e.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(e,t,n){this.$confirm(e,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.t0=t,!e.t0){e.next=5;break}return e.next=4,t();case 4:e.t0=e.sent;case 5:r=e.t0,"number"!=typeof r&&n&&n();case 7:case"end":return e.stop()}}),e)}))))},tipMessage:function(e,t){this.$message({showClose:!0,message:e,type:t})},getTreeList:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3?arguments[3]:void 0;if(Array.isArray(e))return e.forEach((function(i){if(i.parentId===n)return r.push(i),i.children=[],t.getTreeList(e,i[a],i.children,a)})),r},flatten:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return e.forEach((function(e){e.index=n,r.push(e),e.children&&t.flatten(e.children,n+1,r)})),r},filterAllChild:function(){},remoteMethod:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.ApiUser.getSelectUsers(e);case 2:t.userList=n.sent;case 3:case"end":return n.stop()}}),n)})))()},getTarget:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.filter((function(e){if(e.parentId===t)return e}))}}}},fb43:function(e,t,n){e.exports={sysSearch:"SysMenu_sysSearch_AmIrZ"}}}]);