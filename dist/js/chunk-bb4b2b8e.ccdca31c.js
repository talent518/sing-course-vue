(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bb4b2b8e"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},1926:function(e,t,i){},"22e6":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"theme-management"},[i("el-form",{attrs:{inline:"",size:"small"}},[i("div",{staticClass:"theme-management-form"},[i("el-form-item",{attrs:{label:"主题标题："}},[i("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入主题标题"},model:{value:e.search.title,callback:function(t){e.$set(e.search,"title",t)},expression:"search.title"}})],1),i("el-button",{attrs:{type:"primary",plain:"",size:"small"},on:{click:e.handleSearch}},[e._v("查询")]),i("el-button",{attrs:{plain:"",size:"small"},on:{click:e.clearSearch}},[e._v("清除")])],1)]),i("el-divider"),i("el-button",{attrs:{type:"success",size:"small"},on:{click:e.addTheme}},[e._v("新增")]),i("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"全部",name:"all"}}),i("el-tab-pane",{attrs:{label:"启用",name:"enable"}}),i("el-tab-pane",{attrs:{label:"禁用",name:"disable"}})],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.classList,size:"small",border:""}},[i("el-table-column",{attrs:{prop:"code",label:"编号",width:""}}),i("el-table-column",{attrs:{prop:"title",label:"主題标题",width:""}}),i("el-table-column",{attrs:{prop:"textbook_num",label:"教材",width:""}}),i("el-table-column",{attrs:{prop:"status_text",label:"状态",width:""}}),i("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticStyle:{display:"flex","justify-content":"space-around"}},[i("el-link",{attrs:{plain:"",type:"primary",size:"mini"},on:{click:function(i){return e.editTheme(t.row)}}},[e._v("编辑")]),i("el-link",{attrs:{plain:"",type:"primary",size:"mini"},on:{click:function(i){return e.relationMaterial(t.row.id)}}},[e._v("关联教材")]),[i("el-popconfirm",{attrs:{title:"确定要删除主题吗？"},on:{onConfirm:function(i){return e.delTheme(t.row.id)}}},[i("el-link",{attrs:{slot:"reference",plain:"",type:"primary",size:"mini"},slot:"reference"},[e._v("删除")])],1)]],2)]}}])})],1),i("page",{attrs:{nowPage:e.page.now,total:e.page.total,limit:e.page.limit},on:{pageChange:e.onPageChange,sizeChange:e.onSizeChange}}),i("dialog-com",{attrs:{dialogObj:e.dialogObj},on:{reflash:e.init}}),i("relation-dialog",{attrs:{dialogObj:e.relationObj},on:{reflash:e.init}})],1)},l=[],n=(i("ac1f"),i("841c"),i("96cf"),i("1da1")),s=i("d748"),o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"theme-dialog"},[i("el-dialog",{attrs:{width:"800px",title:e.dialogObj.name,visible:e.dialogObj.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(t){return e.$set(e.dialogObj,"show",t)}}},[i("el-form",{ref:"form",attrs:{model:e.form,size:"small","label-width":"100px"}},[i("el-form-item",{attrs:{label:"主题标题"}},[i("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),i("el-form-item",{attrs:{label:"主题副标题"}},[i("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:e.form.sub_title,callback:function(t){e.$set(e.form,"sub_title",t)},expression:"form.sub_title"}})],1),i("el-form-item",{attrs:{label:"主题封面"}},[i("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"image/*","show-file-list":!1,"http-request":e.uploadFile,"list-type":"picture-card",multiple:""}},[e.form.cover?i("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{fit:"contain",src:e.form.cover}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1)],1),i("el-form-item",{attrs:{label:"状态"}},[i("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogObj.show=!1}}},[e._v("取 消")]),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.sub}},[e._v("保 存")])],1)],1)],1)},r=[],c=i("91b6"),u={mixins:[s["a"]],name:"ThemeDialog",props:["dialogObj"],data:function(){return{form:{title:"",sub_title:"",cover:"",status:1}}},methods:{sub:function(){var e,t=this,i=this.form,a={title:i.title,sub_title:i.sub_title,status:i.status,cover:i.cover};return i.title?i.cover?(2==this.dialogObj.type?(a.id=this.dialogObj.id,e=this.ApiTeach.putThemeAPi):e=this.ApiTeach.postThemeApi,void e(a).then((function(e){t.$message({type:"success",message:"保存成功"}),t.$emit("reflash"),t.dialogObj.show=!1}))):(this.$message({type:"error",message:"请上传课程封面!"}),!1):(this.$message({type:"error",message:"请输入标题!"}),!1)},uploadFile:function(e){var t=this;Object(c["a"])(e.file).then((function(e){t.form.cover=e.url}))}},watch:{"dialogObj.show":function(e){var t=this;e&&this.$nextTick((function(){t.form.title="",t.form.sub_title=[],t.form.cover="",t.form.status=1,2==t.dialogObj.type&&(t.form={title:t.dialogObj.title,sub_title:t.dialogObj.sub_title,cover:t.dialogObj.cover,status:t.dialogObj.status})}))}}},d=u,h=(i("c2f2"),i("2877")),m=Object(h["a"])(d,o,r,!1,null,"3a0e9cdc",null),p=m.exports,f=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"relation-dialog"},[i("el-dialog",{attrs:{width:"800px",title:"唱唱VIP口语配音课",visible:e.dialogObj.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(t){return e.$set(e.dialogObj,"show",t)}}},[i("div",{staticClass:"handle-box"},[i("el-link",{attrs:{plain:"",type:"primary",size:"mini"},on:{click:e.relationMaterial}},[e._v("关联教材")]),[i("el-popconfirm",{attrs:{title:"确定要移除所有吗？"},on:{onConfirm:e.deleteAllClass}},[i("el-link",{attrs:{slot:"reference",plain:"",type:"primary",size:"mini"},on:{click:function(e){}},slot:"reference"},[e._v("全部清除")])],1)]],2),i("div",{staticClass:"class-list-box"},e._l(e.list,(function(t,a){return i("div",{directives:[{name:"dragging",rawName:"v-dragging",value:{item:t,list:e.list,group:"list"},expression:"{ item: item, list: list, group: 'list' }"}],key:a,staticClass:"class-box"},[i("div",{staticClass:"title"},[e._v(" "+e._s(t.textbook.title)+" ")]),i("div",{staticClass:"img-box"},[i("img",{attrs:{src:t.textbook.cover,alt:""}}),[i("el-popconfirm",{attrs:{title:"确定要移除吗？"},on:{onConfirm:function(i){return e.deleteClass(t.id)}}},[i("i",{staticClass:"iconfont el-icon-delete",attrs:{slot:"reference"},slot:"reference"})])]],2)])})),0)]),i("relation-material-dialog",{attrs:{dialogObj:e.relationMaterialObj},on:{reflash:e.init}})],1)},g=[],b=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"relation-dialog"},[i("el-dialog",{attrs:{width:"800px",title:"教材列表",visible:e.dialogObj.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(t){return e.$set(e.dialogObj,"show",t)}}},[i("el-form",{attrs:{inline:"",size:"small"}},[i("div",{staticClass:"course-management-form"},[i("el-form-item",{attrs:{label:"教材编号："}},[i("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入教材编号"},model:{value:e.search.code,callback:function(t){e.$set(e.search,"code",t)},expression:"search.code"}})],1),i("el-form-item",{attrs:{label:"教材标题："}},[i("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入教材标题"},model:{value:e.search.title,callback:function(t){e.$set(e.search,"title",t)},expression:"search.title"}})],1),i("el-button",{attrs:{type:"primary",plain:"",size:"small"},on:{click:e.handleSearch}},[e._v("查询")]),i("el-button",{attrs:{plain:"",size:"small"},on:{click:e.clearSearch}},[e._v("清除")])],1)]),i("el-divider"),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.list,size:"mini",border:""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"40"}}),i("el-table-column",{attrs:{prop:"code",label:"教材编号"}}),i("el-table-column",{attrs:{prop:"title",label:"教材标题"}}),i("el-table-column",{attrs:{label:"封面",width:""},scopedSlots:e._u([{key:"default",fn:function(e){return[i("img",{staticClass:"coverImg",attrs:{src:e.row.cover,alt:""}})]}}])})],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogObj.show=!1}}},[e._v("取 消")]),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.sub}},[e._v("保 存")])],1)],1)],1)},v=[],w=(i("4160"),i("a15b"),i("159b"),{mixins:[s["a"]],name:"RelationMaterialDialog",props:["dialogObj"],data:function(){return{loading:!1,search:{title:"",label:""},list:[],selected:[]}},mounted:function(){},methods:{sub:function(){var e=this,t={theme_id:this.dialogObj.id};if(0==this.selected.length)return this.$message({type:"error",message:"请至少勾选一个!"}),!1;var i=[];this.selected.forEach((function(e){i.push(e.id)})),t.element_id=i.join(","),this.ApiTeach.postThemeDetailApi(t).then((function(t){e.$message({type:"success",message:"保存成功"}),e.$emit("reflash"),e.dialogObj.show=!1}))},init:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={scene:"all",title:e.search.title,code:e.search.code},t.next=3,e.ApiTeach.getTextbookListApi(i);case 3:a=t.sent,e.list=a.items;case 5:case"end":return t.stop()}}),t)})))()},handleSearch:function(){this.init()},clearSearch:function(){this.search.title="",this.search.code="",this.init()},handleSelectionChange:function(e){this.selected=e}},watch:{"dialogObj.show":function(e){e&&this.clearSearch()}}}),j=w,x=(i("eb27"),Object(h["a"])(j,b,v,!1,null,"067b8192",null)),O=x.exports,y={mixins:[s["a"]],name:"RelationDialog",props:["dialogObj"],components:{RelationMaterialDialog:O},data:function(){return{relationMaterialObj:{show:!1},list:[]}},mounted:function(){this.$dragging.$on("dragged",(function(e){var t=e.value;console.log(t.list)})),this.$dragging.$on("dragend",(function(){}))},methods:{init:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={theme_id:e.id,scene:"all"},t.next=3,e.ApiTeach.getThemeDetailRelationApi(i);case 3:a=t.sent,e.list=a.items;case 5:case"end":return t.stop()}}),t)})))()},sub:function(){},relationMaterial:function(){this.relationMaterialObj={show:!0,id:this.id}},deleteClass:function(e){var t=this;this.ApiTeach.delThemeDetailApi(e).then((function(e){t.init()}))},deleteAllClass:function(){var e=this,t={is_all:"all",theme_id:this.id};this.ApiTeach.delAllThemeDetailApi(t).then((function(t){e.init()}))}},watch:{"dialogObj.show":function(e){var t=this;e&&this.$nextTick((function(){t.id=t.dialogObj.id,t.init()}))}}},_=y,k=(i("5bcc"),Object(h["a"])(_,f,g,!1,null,"5f81c316",null)),C=k.exports,z=i("ff3c"),S={mixins:[s["a"]],components:{dialogCom:p,page:z["a"],relationDialog:C},name:"ThemeManagement",data:function(){return{loading:!1,params:{},activeName:"all",search:{title:""},classList:[],page:{now:1,total:0,limit:10},dialogObj:{type:0,show:!1,name:""},relationObj:{id:"",show:!1}}},mounted:function(){this.init()},methods:{init:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={pageIndex:e.page.now,pageSize:e.page.limit,title:e.search.title},"enable"==e.activeName?i.status=1:"disable"==e.activeName&&(i.status=0),t.next=4,e.ApiTeach.getThemeListApi(i);case 4:a=t.sent,e.classList=a.items,e.page.total=a.total;case 7:case"end":return t.stop()}}),t)})))()},delTheme:function(e){var t=this;this.ApiTeach.delThemeApi(e).then((function(e){t.init()}))},handleSearch:function(){this.page.now=1,this.init()},clearSearch:function(){this.search.title=""},relationMaterial:function(e){this.relationObj={id:e,show:!0}},onPageChange:function(e){this.page.now=e,this.init()},onSizeChange:function(e){this.page.now=1,this.page.limit=e,this.init()},addTheme:function(){this.dialogObj={type:1,show:!0,name:"新增主题"}},editTheme:function(e){this.dialogObj={type:2,show:!0,name:"修改主题",title:e.title,sub_title:e.sub_title,status:e.status,cover:e.cover,id:e.id}},handleClick:function(e){this.init()}}},T=S,$=(i("3d20"),Object(h["a"])(T,a,l,!1,null,"4e485330",null));t["default"]=$.exports},"3d20":function(e,t,i){"use strict";var a=i("1926"),l=i.n(a);l.a},"5bcc":function(e,t,i){"use strict";var a=i("aab1"),l=i.n(a);l.a},"841c":function(e,t,i){"use strict";var a=i("d784"),l=i("825a"),n=i("1d80"),s=i("129f"),o=i("14c3");a("search",1,(function(e,t,i){return[function(t){var i=n(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,i):new RegExp(t)[e](String(i))},function(e){var a=i(t,e,this);if(a.done)return a.value;var n=l(e),r=String(this),c=n.lastIndex;s(c,0)||(n.lastIndex=0);var u=o(n,r);return s(n.lastIndex,c)||(n.lastIndex=c),null===u?-1:u.index}]}))},9981:function(e,t,i){"use strict";var a=i("d718"),l=i.n(a);l.a},a15b:function(e,t,i){"use strict";var a=i("23e7"),l=i("44ad"),n=i("fc6a"),s=i("a640"),o=[].join,r=l!=Object,c=s("join",",");a({target:"Array",proto:!0,forced:r||!c},{join:function(e){return o.call(n(this),void 0===e?",":e)}})},a74e:function(e,t,i){},aab1:function(e,t,i){},c2f2:function(e,t,i){"use strict";var a=i("f22f"),l=i.n(a);l.a},d718:function(e,t,i){},d748:function(e,t,i){"use strict";t["a"]={inject:["ApiTeach"]}},eb27:function(e,t,i){"use strict";var a=i("a74e"),l=i.n(a);l.a},f22f:function(e,t,i){},ff3c:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"page-div"},[i("el-pagination",{attrs:{small:e.small,"page-size":e.limit,"page-sizes":e.pageSize,"current-page":e.nowPage,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},l=[],n={name:"page",data:function(){return{nowPage:1,pageSize:[5,10,20,30,40,50,60,80,100]}},props:{currentPage:{required:!1},edition:{required:!1},total:{required:!0},limit:{default:10},small:{required:!1,type:Boolean,default:!1}},created:function(){"1000"==this.edition&&(this.pageSize=[5,10,20,30,40,50,60,80,100,500,1e3])},watch:{currentPage:function(e){"number"===typeof e&&(console.log("prop currentPage!!!"),this.nowPage=e)}},methods:{handleCurrentChange:function(e){console.log("methods pageChange!!!"),this.$emit("pageChange",e)},handleSizeChange:function(e){this.nowPage=1,this.$emit("sizeChange",e)}}},s=n,o=(i("9981"),i("2877")),r=Object(o["a"])(s,a,l,!1,null,"13e53760",null);t["a"]=r.exports}}]);