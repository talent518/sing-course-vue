(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18854970"],{"7db0":function(t,e,a){"use strict";var i=a("23e7"),n=a("b727").find,o=a("44d2"),r=a("ae40"),s="find",l=!0,c=r(s);s in[]&&Array(1)[s]((function(){l=!1})),i({target:"Array",proto:!0,forced:l||!c},{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),o(s)},a833:function(t,e,a){"use strict";a("4de4"),a("7db0"),a("4160"),a("a9e3"),a("b680"),a("ac1f"),a("5319"),a("159b"),a("96cf");var i=a("1da1"),n=a("5530"),o=a("2f62");e["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(n["a"])({},Object(o["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{filterEnum:function(t,e){return this.dictoryObj[t].find((function(t){return t.key==e})).value},openLoading:function(){this.loading=!0},formatNum:function(t){return t=Number(t),(t.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(t,e,a){this.$confirm(t,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.t0=e,!t.t0){t.next=5;break}return t.next=4,e();case 4:t.t0=t.sent;case 5:i=t.t0,"number"!=typeof i&&a&&a();case 7:case"end":return t.stop()}}),t)}))))},tipMessage:function(t,e){this.$message({showClose:!0,message:t,type:e})},getTreeList:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=arguments.length>3?arguments[3]:void 0;if(Array.isArray(t))return t.forEach((function(o){if(o.parentId===a)return i.push(o),o.children=[],e.getTreeList(t,o[n],o.children,n)})),i},flatten:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return t.forEach((function(t){t.index=a,i.push(t),t.children&&e.flatten(t.children,a+1,i)})),i},filterAllChild:function(){},remoteMethod:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.ApiUser.getSelectUsers(t);case 2:e.userList=a.sent;case 3:case"end":return a.stop()}}),a)})))()},getTarget:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.filter((function(t){if(t.parentId===e)return t}))}}}},dac8:function(t,e,a){"use strict";var i=a("ddfb"),n=a.n(i);n.a},ddfb:function(t,e,a){},e55d:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{staticClass:"section-search",attrs:{size:"small",inline:""}},[a("el-form-item",[a("el-button",{attrs:{type:"success",plain:""},on:{click:t.handleAdd}},[t._v("新增环节")])],1)],1),a("my-table",{attrs:{data:t.list}},[a("el-table-column",{attrs:{prop:"id",label:"id"}}),a("el-table-column",{attrs:{prop:"code",label:"编号"}}),a("el-table-column",{attrs:{prop:"title",label:"标题"}}),a("el-table-column",{attrs:{prop:"status_text",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("cc-cell-switch",{attrs:{value:e.row.status},on:{click:function(a){return t.handleSwitch(e.row.id,e.row.status)}}})]}}])}),a("el-table-column",{attrs:{prop:"type_text",label:"类别"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{plain:"",size:"small",type:"primary"},on:{click:function(a){return t.handlePreview(e.row)}}},[t._v("预览 ")]),a("el-button",{attrs:{plain:"",size:"small",type:"warning"},on:{click:function(a){return t.handleEdit(e.row)}}},[t._v("编辑 ")])]}}])})],1),a("el-pagination",{staticClass:"m20",attrs:{background:"",layout:"prev, pager, next,total",total:t.page.total,"page-size":t.page.size,"current-page":t.page.index},on:{"current-change":t.pageCurrentChange,"update:currentPage":function(e){return t.$set(t.page,"index",e)},"update:current-page":function(e){return t.$set(t.page,"index",e)}}}),a("segment-dialog",{attrs:{"dialog-data":t.dialogData}})],1)},n=[],o=(a("96cf"),a("1da1")),r=a("a833"),s=a("bcaf"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"segement-dialog",attrs:{top:"5vh",title:t.title,visible:t.dialogData.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.dialogData,"show",e)}}},[a("div",[a("el-form",{attrs:{model:t.form,"label-width":"80px",size:"small"}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66"},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1),a("el-form-item",{attrs:{label:"类别"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},t._l(t.dictoryObj.SegmentTypeEnum,(function(t){return a("el-option",{key:t.key,attrs:{label:t.value,value:t.key}})})),1)],1),a("el-form-item",{attrs:{label:"样式"}},[a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"image/*","show-file-list":!1,"http-request":t.uploadFile,"list-type":"picture-card",multiple:""}},[t.form.preview_image?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{fit:"contain",src:t.form.preview_image}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1)],1)],1)],1),"view"!==t.dialogData.type?a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.dialogToggle}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogSave}},[t._v("确 定")])],1):t._e()])},c=[],u=a("91b6"),d={title:"",type:"",status:1,preview_image:""},p={name:"SegmentDialog",mixins:[r["a"],s["a"]],props:{dialogData:{type:Object,default:{show:!1,type:"",param:{id:0}}}},data:function(){return{title:"",form:JSON.parse(JSON.stringify(d))}},watch:{"dialogData.show":function(t){t&&this.init()}},methods:{init:function(){console.log(this.dictoryObj),"add"==this.dialogData.type?(this.title="新增环节模板",this.form=JSON.parse(JSON.stringify(d))):"edit"==this.dialogData.type?(this.title="编辑环节模板",this.form=this.dialogData.param):"view"==this.dialogData.type&&(this.title="查看环节模板",this.form=this.dialogData.param)},uploadFile:function(t){var e=this;Object(u["a"])(t.file).then((function(t){e.form.preview_image=t.url}))},openMedia:function(t){console.log("media url",t),window.open(t,"_blank")},dialogToggle:function(){this.dialogData.show=!this.dialogData.show},dialogSave:function(){var t,e=this,a=this.form,i={title:a.title,type:a.type,status:a.status,preview_image:a.preview_image};this.dialogData.param.id?(i.id=this.dialogData.param.id,t=this.ApiBasic.putSegment):t=this.ApiBasic.postSegment,t(i).then((function(t){e.$message({type:"success",message:"保存成功"}),e.dialogToggle(),e.$parent.getData()}))}}},f=p,g=(a("dac8"),a("2877")),m=Object(g["a"])(f,l,c,!1,null,null,null),h=m.exports,v={name:"Segment",mixins:[r["a"],s["a"]],components:{SegmentDialog:h},data:function(){return{loading:!0,dialogData:{show:!1},list:[],page:{total:0,index:1,size:10}}},mounted:function(){this.getData()},methods:{handleAdd:function(){this.dialogData={show:!0,type:"add",param:{id:0}}},handleEdit:function(t){this.dialogData={show:!0,type:"edit",param:t}},handlePreview:function(t){this.dialogData={show:!0,type:"view",param:t}},handleSwitch:function(t,e){var a,i=this,n="";0===e?(a="enable",n="启用"):1===e&&(a="disable",n="停用"),this.$confirm("确定 ".concat(n," 环节？"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){i.loading=!0;var e={id:t,status:a};i.ApiBasic.postSegmentStatus(e).then((function(t){i.$message({type:"success",message:"修改成功!"}),i.getData(),i.loading=!1})).catch((function(t){console.log(t),i.loading=!1}))})).catch((function(){i.$message({type:"info",message:"已取消"})}))},getData:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={pageIndex:t.page.index,pageSize:t.page.size},e.next=3,t.ApiBasic.getSegment(a);case 3:i=e.sent,t.loading=!1,t.list=i.items,t.page.total=i.total;case 7:case"end":return e.stop()}}),e)})))()},pageCurrentChange:function(t){this.page.index=t,this.getData()}}},b=v,w=Object(g["a"])(b,i,n,!1,null,"0ff7287c",null);e["default"]=w.exports}}]);