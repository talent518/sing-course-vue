(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-110e9793"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"22e6":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"theme-management"},[i("el-form",{attrs:{inline:"",size:"small"}},[i("div",{staticClass:"theme-management-form"},[i("el-form-item",{attrs:{label:"课程标题："}},[i("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入课程标题"},model:{value:t.search.title,callback:function(e){t.$set(t.search,"title",e)},expression:"search.title"}})],1),i("el-button",{attrs:{type:"primary",plain:"",size:"small"},on:{click:t.handleSearch}},[t._v("查询")]),i("el-button",{attrs:{plain:"",size:"small"},on:{click:t.clearSearch}},[t._v("清除")])],1)]),i("el-divider"),i("el-button",{attrs:{type:"success",size:"small"},on:{click:t.addTheme}},[t._v("新增")]),i("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"全部",name:"all"}}),i("el-tab-pane",{attrs:{label:"启用",name:"enable"}}),i("el-tab-pane",{attrs:{label:"禁用",name:"disable"}})],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.classList,size:"small",border:""}},[i("el-table-column",{attrs:{prop:"code",label:"编号",width:""}}),i("el-table-column",{attrs:{prop:"title",label:"主題标题",width:""}}),i("el-table-column",{attrs:{prop:"textbook_num",label:"教材",width:""}}),i("el-table-column",{attrs:{prop:"status_text",label:"状态",width:""}}),i("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticStyle:{display:"flex","justify-content":"space-around"}},[i("el-link",{attrs:{plain:"",type:"primary",size:"mini"},on:{click:function(i){return t.editTheme(e.row)}}},[t._v("编辑")]),i("el-link",{attrs:{plain:"",type:"primary",size:"mini"},on:{click:function(i){return t.relationMaterial(e.row.id)}}},[t._v("关联教材")]),[i("el-popconfirm",{attrs:{title:"确定要删除主题吗？"},on:{onConfirm:function(i){return t.delTheme(e.row.id)}}},[i("el-link",{attrs:{slot:"reference",plain:"",type:"primary",size:"mini"},slot:"reference"},[t._v("删除")])],1)]],2)]}}])})],1),i("page",{attrs:{nowPage:t.page.now,total:t.page.total,limit:t.page.limit},on:{pageChange:t.onPageChange,sizeChange:t.onSizeChange}}),i("dialog-com",{attrs:{dialogObj:t.dialogObj},on:{reflash:t.init}}),i("relation-dialog",{attrs:{dialogObj:t.relationObj},on:{reflash:t.init}})],1)},l=[],n=(i("ac1f"),i("841c"),i("96cf"),i("1da1")),s=i("d748"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"theme-dialog"},[i("el-dialog",{attrs:{width:"800px",title:t.dialogObj.name,visible:t.dialogObj.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.dialogObj,"show",e)}}},[i("el-form",{ref:"form",attrs:{model:t.form,size:"small","label-width":"100px"}},[i("el-form-item",{attrs:{label:"课程标题"}},[i("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),i("el-form-item",{attrs:{label:"课程副标题"}},[i("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.form.sub_title,callback:function(e){t.$set(t.form,"sub_title",e)},expression:"form.sub_title"}})],1),i("el-form-item",{attrs:{label:"课程封面"}},[i("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"image/*","show-file-list":!1,"http-request":t.uploadFile,"list-type":"picture-card",multiple:""}},[t.form.cover?i("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{fit:"contain",src:t.form.cover}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1)],1),i("el-form-item",{attrs:{label:"状态"}},[i("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66"},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogObj.show=!1}}},[t._v("取 消")]),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.sub}},[t._v("保 存")])],1)],1)],1)},r=[],c=i("91b6"),u={mixins:[s["a"]],name:"ThemeDialog",props:["dialogObj"],data:function(){return{form:{title:"",sub_title:"",cover:"",status:1}}},methods:{sub:function(){var t,e=this,i=this.form,a={title:i.title,sub_title:i.sub_title,status:i.status,cover:i.cover};2==this.dialogObj.type?(a.id=this.dialogObj.id,t=this.ApiTeach.putThemeAPi):t=this.ApiTeach.postThemeApi,t(a).then((function(t){e.$message({type:"success",message:"保存成功"}),e.$emit("reflash"),e.dialogObj.show=!1}))},uploadFile:function(t){var e=this;Object(c["a"])(t.file).then((function(t){e.form.cover=t.url}))}},watch:{"dialogObj.show":function(t){var e=this;t&&this.$nextTick((function(){e.form.title="",e.form.sub_title=[],e.form.cover="",e.form.status=1,2==e.dialogObj.type&&(e.form={title:e.dialogObj.title,sub_title:e.dialogObj.sub_title,cover:e.dialogObj.cover,status:e.dialogObj.status})}))}}},d=u,h=(i("c2f2"),i("2877")),m=Object(h["a"])(d,o,r,!1,null,"71f215a0",null),p=m.exports,f=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"relation-dialog"},[i("el-dialog",{attrs:{width:"800px",title:"唱唱VIP口语配音课",visible:t.dialogObj.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.dialogObj,"show",e)}}},[i("div",{staticClass:"handle-box"},[i("el-link",{attrs:{plain:"",type:"primary",size:"mini"},on:{click:t.relationMaterial}},[t._v("关联教材")]),[i("el-popconfirm",{attrs:{title:"确定要移除所有吗？"},on:{onConfirm:t.deleteAllClass}},[i("el-link",{attrs:{slot:"reference",plain:"",type:"primary",size:"mini"},on:{click:function(t){}},slot:"reference"},[t._v("全部清除")])],1)]],2),i("div",{staticClass:"class-list-box"},t._l(t.list,(function(e,a){return i("div",{directives:[{name:"dragging",rawName:"v-dragging",value:{item:e,list:t.list,group:"list"},expression:"{ item: item, list: list, group: 'list' }"}],key:a,staticClass:"class-box"},[i("div",{staticClass:"title"},[t._v(" "+t._s(e.textbook.title)+" ")]),i("div",{staticClass:"img-box"},[i("img",{attrs:{src:e.textbook.cover,alt:""}}),[i("el-popconfirm",{attrs:{title:"确定要移除吗？"},on:{onConfirm:function(i){return t.deleteClass(e.id)}}},[i("i",{staticClass:"iconfont el-icon-delete",attrs:{slot:"reference"},slot:"reference"})])]],2)])})),0)]),i("relation-material-dialog",{attrs:{dialogObj:t.relationMaterialObj},on:{reflash:t.init}})],1)},g=[],b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"relation-dialog"},[i("el-dialog",{attrs:{width:"800px",title:"教材列表",visible:t.dialogObj.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.dialogObj,"show",e)}}},[i("el-form",{attrs:{inline:"",size:"small"}},[i("div",{staticClass:"course-management-form"},[i("el-form-item",{attrs:{label:"教材编号："}},[i("el-select",{staticStyle:{width:"200px"},attrs:{multiple:"",filterable:"",clearable:"",placeholder:""},model:{value:t.search.label,callback:function(e){t.$set(t.search,"label",e)},expression:"search.label"}},t._l(t.watchList,(function(t,e){return i("el-option",{key:e,attrs:{label:t.title,value:t.id}})})),1)],1),i("el-form-item",{attrs:{label:"教材标题："}},[i("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入课程标题"},model:{value:t.search.title,callback:function(e){t.$set(t.search,"title",e)},expression:"search.title"}})],1),i("el-button",{attrs:{type:"primary",plain:"",size:"small"},on:{click:t.handleSearch}},[t._v("查询")]),i("el-button",{attrs:{plain:"",size:"small"},on:{click:t.clearSearch}},[t._v("清除")])],1)]),i("el-divider"),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.list,size:"mini",border:""},on:{"selection-change":t.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"40"}}),i("el-table-column",{attrs:{prop:"code",label:"教材编号"}}),i("el-table-column",{attrs:{prop:"title",label:"教材标题"}}),i("el-table-column",{attrs:{label:"封面",width:""},scopedSlots:t._u([{key:"default",fn:function(t){return[i("img",{staticClass:"coverImg",attrs:{src:t.row.cover,alt:""}})]}}])})],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogObj.show=!1}}},[t._v("取 消")]),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.sub}},[t._v("保 存")])],1)],1)],1)},v=[],w=(i("4160"),i("a15b"),i("159b"),{mixins:[s["a"]],name:"RelationMaterialDialog",props:["dialogObj"],data:function(){return{loading:!1,search:{title:"",label:""},list:[],watchList:[{id:5,title:5},{id:6,title:6},{id:10,title:10},{id:12,title:12},{id:20,title:20}],selected:[]}},mounted:function(){},methods:{sub:function(){var t=this,e={theme_id:this.dialogObj.id},i=[];this.selected.forEach((function(t){i.push(t.id)})),e.element_id=i.join(","),this.ApiTeach.postThemeDetailApi(e).then((function(e){t.$message({type:"success",message:"保存成功"}),t.$emit("reflash"),t.dialogObj.show=!1}))},init:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i={scene:"all",title:t.search.title,code:t.search.code},e.next=3,t.ApiTeach.getTextbookListApi(i);case 3:a=e.sent,t.list=a.items;case 5:case"end":return e.stop()}}),e)})))()},handleSearch:function(){this.init()},clearSearch:function(){this.search.title=""},handleSelectionChange:function(t){this.selected=t}},watch:{"dialogObj.show":function(t){t&&this.init()}}}),j=w,x=(i("c225"),Object(h["a"])(j,b,v,!1,null,"7b74ff16",null)),O=x.exports,_={mixins:[s["a"]],name:"RelationDialog",props:["dialogObj"],components:{RelationMaterialDialog:O},data:function(){return{relationMaterialObj:{show:!1},list:[]}},mounted:function(){this.$dragging.$on("dragged",(function(t){var e=t.value;console.log(e.list)})),this.$dragging.$on("dragend",(function(){}))},methods:{init:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i={theme_id:t.id,scene:"all"},e.next=3,t.ApiTeach.getThemeDetailRelationApi(i);case 3:a=e.sent,t.list=a.items;case 5:case"end":return e.stop()}}),e)})))()},sub:function(){},relationMaterial:function(){this.relationMaterialObj={show:!0,id:this.id}},deleteClass:function(t){var e=this;this.ApiTeach.delThemeDetailApi(t).then((function(t){e.init()}))},deleteAllClass:function(){var t=this,e={is_all:"all",theme_id:this.id};this.ApiTeach.delAllThemeDetailApi(e).then((function(e){t.init()}))}},watch:{"dialogObj.show":function(t){var e=this;t&&this.$nextTick((function(){e.id=e.dialogObj.id,e.init()}))}}},k=_,y=(i("5bcc"),Object(h["a"])(k,f,g,!1,null,"5f81c316",null)),C=y.exports,z=i("ff3c"),T={mixins:[s["a"]],components:{dialogCom:p,page:z["a"],relationDialog:C},name:"ThemeManagement",data:function(){return{loading:!1,params:{},activeName:"all",search:{title:""},classList:[],page:{now:1,total:0,limit:10},dialogObj:{type:0,show:!1,name:""},relationObj:{id:"",show:!1}}},mounted:function(){this.init()},methods:{init:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i={pageIndex:t.page.now,pageSize:t.page.limit,title:t.search.title},"enable"==t.activeName?i.status=1:"disable"==t.activeName&&(i.status=0),e.next=4,t.ApiTeach.getThemeListApi(i);case 4:a=e.sent,t.classList=a.items,t.page.total=a.total;case 7:case"end":return e.stop()}}),e)})))()},delTheme:function(t){var e=this;this.ApiTeach.delThemeApi(t).then((function(t){e.init()}))},handleSearch:function(){this.page.now=1,this.init()},clearSearch:function(){this.search.title=""},relationMaterial:function(t){this.relationObj={id:t,show:!0}},onPageChange:function(t){this.page.now=t,this.init()},onSizeChange:function(t){this.page.now=1,this.page.limit=t,this.init()},addTheme:function(){this.dialogObj={type:1,show:!0,name:"新增主题"}},editTheme:function(t){this.dialogObj={type:2,show:!0,name:"修改主题",title:t.title,sub_title:t.sub_title,status:t.status,cover:t.cover,id:t.id}},handleClick:function(t){this.init()}}},S=T,$=(i("e831"),Object(h["a"])(S,a,l,!1,null,"347729e0",null));e["default"]=$.exports},"5bcc":function(t,e,i){"use strict";var a=i("aab1"),l=i.n(a);l.a},"841c":function(t,e,i){"use strict";var a=i("d784"),l=i("825a"),n=i("1d80"),s=i("129f"),o=i("14c3");a("search",1,(function(t,e,i){return[function(e){var i=n(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,i):new RegExp(e)[t](String(i))},function(t){var a=i(e,t,this);if(a.done)return a.value;var n=l(t),r=String(this),c=n.lastIndex;s(c,0)||(n.lastIndex=0);var u=o(n,r);return s(n.lastIndex,c)||(n.lastIndex=c),null===u?-1:u.index}]}))},9981:function(t,e,i){"use strict";var a=i("d718"),l=i.n(a);l.a},a109:function(t,e,i){},a15b:function(t,e,i){"use strict";var a=i("23e7"),l=i("44ad"),n=i("fc6a"),s=i("a640"),o=[].join,r=l!=Object,c=s("join",",");a({target:"Array",proto:!0,forced:r||!c},{join:function(t){return o.call(n(this),void 0===t?",":t)}})},aab1:function(t,e,i){},c225:function(t,e,i){"use strict";var a=i("f34e"),l=i.n(a);l.a},c2f2:function(t,e,i){"use strict";var a=i("f22f"),l=i.n(a);l.a},d718:function(t,e,i){},d748:function(t,e,i){"use strict";e["a"]={inject:["ApiTeach"]}},e831:function(t,e,i){"use strict";var a=i("a109"),l=i.n(a);l.a},f22f:function(t,e,i){},f34e:function(t,e,i){},ff3c:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-div"},[i("el-pagination",{attrs:{small:t.small,"page-size":t.limit,"page-sizes":t.pageSize,"current-page":t.nowPage,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},l=[],n={name:"page",data:function(){return{nowPage:1,pageSize:[5,10,20,30,40,50,60,80,100]}},props:{currentPage:{required:!1},edition:{required:!1},total:{required:!0},limit:{default:10},small:{required:!1,type:Boolean,default:!1}},created:function(){"1000"==this.edition&&(this.pageSize=[5,10,20,30,40,50,60,80,100,500,1e3])},watch:{currentPage:function(t){"number"===typeof t&&(console.log("prop currentPage!!!"),this.nowPage=t)}},methods:{handleCurrentChange:function(t){console.log("methods pageChange!!!"),this.$emit("pageChange",t)},handleSizeChange:function(t){this.nowPage=1,this.$emit("sizeChange",t)}}},s=n,o=(i("9981"),i("2877")),r=Object(o["a"])(s,a,l,!1,null,"13e53760",null);e["a"]=r.exports}}]);