(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f5e233f"],{"22d3":function(t,e,a){},"7db0":function(t,e,a){"use strict";var i=a("23e7"),l=a("b727").find,n=a("44d2"),r=a("ae40"),o="find",s=!0,c=r(o);o in[]&&Array(1)[o]((function(){s=!1})),i({target:"Array",proto:!0,forced:s||!c},{find:function(t){return l(this,t,arguments.length>1?arguments[1]:void 0)}}),n(o)},"9e11":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{staticClass:"section-search",attrs:{size:"small",inline:""}},[a("el-form-item",[a("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){return t.handleDialog("add")}}},[t._v("新增教材模板 ")])],1)],1),a("my-table",{attrs:{data:t.list}},[a("el-table-column",{attrs:{prop:"id",label:"id"}}),a("el-table-column",{attrs:{prop:"code",label:"编号"}}),a("el-table-column",{attrs:{prop:"title",label:"标题"}}),a("el-table-column",{attrs:{prop:"title",label:"关联环节"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.template_data_details.length?t._l(e.row.template_data_details,(function(e){return a("div",[t._v(" "+t._s(t.filterEnum("SegmentTypeEnum",e.lead_type))+" ")])})):[t._v("-")]]}}])}),a("el-table-column",{attrs:{prop:"status_text",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("cc-cell-switch",{attrs:{value:e.row.status},on:{click:function(a){return t.handleSwitch(e.row.id,e.row.status)}}})]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{plain:"",size:"small",type:"primary"},on:{click:function(a){return t.handleDialog("view",e.row)}}},[t._v("预览 ")]),a("el-button",{attrs:{plain:"",size:"small",type:"warning"},on:{click:function(a){return t.handleDialog("edit",e.row)}}},[t._v("编辑 ")])]}}])})],1),a("el-pagination",{staticClass:"m20",attrs:{background:"",layout:"prev, pager, next,total",total:t.page.total,"page-size":t.page.size,"current-page":t.page.index},on:{"current-change":t.pageCurrentChange,"update:currentPage":function(e){return t.$set(t.page,"index",e)},"update:current-page":function(e){return t.$set(t.page,"index",e)}}}),a("template-resource-dialog",{attrs:{"dialog-data":t.dialogData}})],1)},l=[],n=(a("96cf"),a("1da1")),r=a("a833"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"template-resource-dialog",attrs:{top:"5vh",width:"1200px",title:t.title,visible:t.dialogData.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.dialogData,"show",e)}}},[a("div",[a("el-form",{attrs:{model:t.form,"label-width":"100px",size:"small"}},[a("el-form-item",{attrs:{label:"名称："}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.form.template_data.title,callback:function(e){t.$set(t.form.template_data,"title",e)},expression:"form.template_data.title"}})],1),a("el-form-item",{attrs:{label:"状态："}},[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66"},model:{value:t.form.template_data.status,callback:function(e){t.$set(t.form.template_data,"status",e)},expression:"form.template_data.status"}})],1),a("el-form-item",{attrs:{label:"模板："}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.template_data.layout,callback:function(e){t.$set(t.form.template_data,"layout",e)},expression:"form.template_data.layout"}},[a("el-option",{attrs:{label:"横向大卡片",value:1}})],1)],1),a("el-form-item",{attrs:{label:"过渡环节："}},[a("el-radio-group",{model:{value:t.form.template_data.is_excessive,callback:function(e){t.$set(t.form.template_data,"is_excessive",e)},expression:"form.template_data.is_excessive"}},[a("el-radio",{staticStyle:{"margin-right":"0"},attrs:{label:1,border:""}},[t._v("是")]),a("el-radio",{attrs:{label:0,border:""}},[t._v("否")])],1)],1),a("el-form-item",{attrs:{label:"关联环节："}},[a("div",{staticClass:"segment-card"},t._l(t.form.template_data_details,(function(e,i){return a("div",{staticClass:"card-item"},[a("div",{staticClass:"card-item-header"},[a("el-select",{attrs:{placeholder:"选择环节"},model:{value:e.segment_template_id,callback:function(a){t.$set(e,"segment_template_id",a)},expression:"segement.segment_template_id"}},t._l(t.listSegment,(function(t){return a("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})})),1),a("el-button-group",[a("el-button",{attrs:{type:"default",icon:"el-icon-minus",disabled:t.form.template_data_details.length<2},on:{click:function(e){return t.segmentDel(i)}}}),a("el-button",{attrs:{type:"default",icon:"el-icon-plus"},on:{click:function(e){return t.segmentAdd(i)}}})],1)],1),a("el-card",{attrs:{shadow:"hover","body-style":{padding:"12px"}}},[a("div",{staticClass:"header"},[a("el-input",{attrs:{placeholder:"标题"},model:{value:e.title,callback:function(a){t.$set(e,"title",a)},expression:"segement.title"}})],1),a("el-divider"),a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"image/*","show-file-list":!1,"http-request":function(e){return t.uploadFile(e,i)},"list-type":"picture-card",multiple:""}},[e.cover?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{fit:"cover",src:e.cover}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1),a("el-divider"),a("el-select",{attrs:{placeholder:"关联引导",clearable:""},model:{value:e.lead_type,callback:function(a){t.$set(e,"lead_type",a)},expression:"segement.lead_type"}},t._l(t.dictoryObj.SegmentLeadTypeEnum,(function(t){return a("el-option",{key:t.key,attrs:{label:t.value,value:t.key}})})),1)],1)],1)})),0)])],1)],1),"view"!==t.dialogData.type?a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.dialogToggle}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogSave}},[t._v("确 定")])],1):t._e()])},s=[],c=(a("4160"),a("a434"),a("159b"),a("bcaf")),d=a("91b6"),u={template_data:{title:"",layout:1,status:1,is_excessive:1},template_data_details:[{segment_template_id:"",lead_type:"",title:"",cover:""}]},p={segment_template_id:"",lead_type:"",title:"",cover:""},m={name:"TemplateResourceDialog",mixins:[r["a"],c["a"]],props:{dialogData:{type:Object,default:{show:!1,type:"",param:{id:0}}}},data:function(){return{title:"",listSegment:[],SEGMENT_ITEM:p,form:JSON.parse(JSON.stringify(u))}},watch:{"dialogData.show":function(t){t&&this.init()}},methods:{init:function(){console.log(this.dictoryObj),this.getSegmentAll(),"add"==this.dialogData.type?(this.title="新增教材模板",this.form=JSON.parse(JSON.stringify(u))):"edit"==this.dialogData.type?(this.title="编辑教材模板",this.form={template_data:this.dialogData.param,template_data_details:this.dialogData.param.template_data_details.length?this.dialogData.param.template_data_details:u.template_data_details},this.form.template_data_details.forEach((function(t){0==t.lead_type&&(t.lead_type="")}))):"view"==this.dialogData.type&&(this.title="查看教材模板",this.form={template_data:this.dialogData.param,template_data_details:this.dialogData.param.template_data_details.length?this.dialogData.param.template_data_details:u.template_data_details})},getSegmentAll:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiBasic.getSegment({scene:"all",status:1});case 2:a=e.sent,t.listSegment=a.items;case 4:case"end":return e.stop()}}),e)})))()},segmentAdd:function(t){this.form.template_data_details.splice(t+1,0,JSON.parse(JSON.stringify(p)))},segmentDel:function(t){this.form.template_data_details.splice(t,1)},uploadFile:function(t,e){var a=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var l;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,Object(d["a"])(t.file);case 2:l=i.sent,a.form.template_data_details[e].cover=l.url;case 4:case"end":return i.stop()}}),i)})))()},openMedia:function(t){console.log("media url",t),window.open(t,"_blank")},dialogToggle:function(){this.dialogData.show=!this.dialogData.show},dialogSave:function(){var t=this;if(!this.form.template_data.title)return this.$message({type:"error",message:"请输入名称!"}),!1;var e,a={template_data:JSON.stringify(this.form.template_data),template_data_details:JSON.stringify(this.form.template_data_details)};console.log(a),this.dialogData.param.id?(a.id=this.dialogData.param.id,e=this.ApiBasic.putResource):e=this.ApiBasic.postResource,e(a).then((function(e){t.dialogToggle(),t.$parent.getData()}))}}},f=m,g=(a("d0d1"),a("2877")),h=Object(g["a"])(f,o,s,!1,null,null,null),_=h.exports,b=(a("df35"),{name:"TemplateResource",mixins:[r["a"]],components:{TemplateResourceDialog:_},data:function(){return{loading:!0,dialogData:{show:!1},list:[],page:{total:0,index:1,size:10}}},mounted:function(){this.getData()},methods:{handleDialog:function(t,e){this.dialogData={show:!0,type:t,param:e||{id:0}}},handleSwitch:function(t,e){var a,i=this,l="";0===e?(a="enable",l="启用"):1===e&&(a="disable",l="停用"),this.$confirm("确定 ".concat(l," 模板？"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){i.loading=!0;var e={id:t,status:a};i.ApiBasic.postResourceStatus(e).then((function(t){i.$message.success("修改成功"),i.getData(),i.loading=!1})).catch((function(t){console.log(t),i.loading=!1}))})).catch((function(){i.$message.info("已取消")}))},getData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={pageIndex:t.page.index,pageSize:t.page.size},e.next=3,t.ApiBasic.getResource(a);case 3:i=e.sent,t.loading=!1,t.list=i.items,t.page.total=i.total;case 7:case"end":return e.stop()}}),e)})))()},pageCurrentChange:function(t){this.page.index=t,this.getData()}}}),v=b,y=Object(g["a"])(v,i,l,!1,null,"6dc276e0",null);e["default"]=y.exports},a434:function(t,e,a){"use strict";var i=a("23e7"),l=a("23cb"),n=a("a691"),r=a("50c4"),o=a("7b0b"),s=a("65f0"),c=a("8418"),d=a("1dde"),u=a("ae40"),p=d("splice"),m=u("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,g=Math.min,h=9007199254740991,_="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!p||!m},{splice:function(t,e){var a,i,d,u,p,m,b=o(this),v=r(b.length),y=l(t,v),w=arguments.length;if(0===w?a=i=0:1===w?(a=0,i=v-y):(a=w-2,i=g(f(n(e),0),v-y)),v+a-i>h)throw TypeError(_);for(d=s(b,i),u=0;u<i;u++)p=y+u,p in b&&c(d,u,b[p]);if(d.length=i,a<i){for(u=y;u<v-i;u++)p=u+i,m=u+a,p in b?b[m]=b[p]:delete b[m];for(u=v;u>v-i+a;u--)delete b[u-1]}else if(a>i)for(u=v-i;u>y;u--)p=u+i-1,m=u+a-1,p in b?b[m]=b[p]:delete b[m];for(u=0;u<a;u++)b[u+y]=arguments[u+2];return b.length=v-i+a,d}})},a833:function(t,e,a){"use strict";a("4de4"),a("7db0"),a("4160"),a("a9e3"),a("b680"),a("ac1f"),a("5319"),a("159b"),a("96cf");var i=a("1da1"),l=a("5530"),n=a("2f62");e["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(l["a"])({},Object(n["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{filterEnum:function(t,e){console.log("123",this.dictoryObj[t]);var a=this.dictoryObj[t].find((function(t){return t.key==e}));return console.log("filterEnum",a),a&&a.value?a.value:"-"},openLoading:function(){this.loading=!0},formatNum:function(t){return t=Number(t),(t.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(t,e,a){this.$confirm(t,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.t0=e,!t.t0){t.next=5;break}return t.next=4,e();case 4:t.t0=t.sent;case 5:i=t.t0,"number"!=typeof i&&a&&a();case 7:case"end":return t.stop()}}),t)}))))},tipMessage:function(t,e){this.$message({showClose:!0,message:t,type:e})},getTreeList:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],l=arguments.length>3?arguments[3]:void 0;if(Array.isArray(t))return t.forEach((function(n){if(n.parentId===a)return i.push(n),n.children=[],e.getTreeList(t,n[l],n.children,l)})),i},flatten:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return t.forEach((function(t){t.index=a,i.push(t),t.children&&e.flatten(t.children,a+1,i)})),i},filterAllChild:function(){},remoteMethod:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.ApiUser.getSelectUsers(t);case 2:e.userList=a.sent;case 3:case"end":return a.stop()}}),a)})))()},getTarget:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.filter((function(t){if(t.parentId===e)return t}))}}}},bcaf:function(t,e,a){"use strict";var i=a("5530"),l=a("2f62");e["a"]={data:function(){return{defaultProps:{children:"children",label:"menuName"},dialogFormVisible:!1,curPage:1,pageSize:10,total:0,labelPosition:"left",checkStrictly:!1,saveSuccess:"保存成功",code:200,labelWidth:"100px",buttonAuths:{}}},computed:Object(i["a"])({},Object(l["c"])("menu",{allMenu:"allMenu"}),{},Object(l["c"])("user",{role:"role"})),methods:Object(i["a"])({},Object(l["b"])("menu",{getAllMenu:"getAllMenu",getMenu:"getMenu"}),{},Object(l["b"])("user",{getRole:"getRole"}),{open:function(){this.dialogFormVisible=!0},close:function(){this.dialogFormVisible=!1,this.resetData1&&this.resetData1()}})}},d0d1:function(t,e,a){"use strict";var i=a("22d3"),l=a.n(i);l.a}}]);