(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71773b7c"],{"4a33":function(t,e,a){"use strict";var i=a("ea9c"),r=a.n(i);r.a},"7db0":function(t,e,a){"use strict";var i=a("23e7"),r=a("b727").find,o=a("44d2"),l=a("ae40"),n="find",s=!0,c=l(n);n in[]&&Array(1)[n]((function(){s=!1})),i({target:"Array",proto:!0,forced:s||!c},{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),o(n)},8480:function(t,e,a){"use strict";var i=a("e133"),r=a.n(i);r.a},a833:function(t,e,a){"use strict";a("4de4"),a("4160"),a("a9e3"),a("b680"),a("ac1f"),a("5319"),a("159b"),a("96cf");var i=a("1da1"),r=a("5530"),o=a("2f62");e["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(r["a"])({},Object(o["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{openLoading:function(){this.loading=!0},formatNum:function(t){return t=Number(t),(t.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(t,e,a){this.$confirm(t,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.t0=e,!t.t0){t.next=5;break}return t.next=4,e();case 4:t.t0=t.sent;case 5:i=t.t0,"number"!=typeof i&&a&&a();case 7:case"end":return t.stop()}}),t)}))))},tipMessage:function(t,e){this.$message({showClose:!0,message:t,type:e})},getTreeList:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3?arguments[3]:void 0;if(Array.isArray(t))return t.forEach((function(o){if(o.parentId===a)return i.push(o),o.children=[],e.getTreeList(t,o[r],o.children,r)})),i},flatten:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return t.forEach((function(t){t.index=a,i.push(t),t.children&&e.flatten(t.children,a+1,i)})),i},filterAllChild:function(){},remoteMethod:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.ApiUser.getSelectUsers(t);case 2:e.userList=a.sent;case 3:case"end":return a.stop()}}),a)})))()},getTarget:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.filter((function(t){if(t.parentId===e)return t}))}}}},c740:function(t,e,a){"use strict";var i=a("23e7"),r=a("b727").findIndex,o=a("44d2"),l=a("ae40"),n="findIndex",s=!0,c=l(n);n in[]&&Array(1)[n]((function(){s=!1})),i({target:"Array",proto:!0,forced:s||!c},{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),o(n)},cd45:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{staticClass:"section-search",attrs:{size:"small",inline:""}},[a("el-form-item",[a("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){return t.handleDialog("add")}}},[t._v("新增教材")])],1)],1),a("my-table",{attrs:{data:t.list}},[a("el-table-column",{attrs:{prop:"id",label:"id"}}),a("el-table-column",{attrs:{prop:"code",label:"编号"}}),a("el-table-column",{attrs:{prop:"title",label:"标题"}}),a("el-table-column",{attrs:{prop:"cover",label:"封面"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.row.cover,fit:"fit"}})]}}])}),a("el-table-column",{attrs:{prop:"title",label:"关联环节"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.template_data_details.length?t._l(e.row.template_data_details,(function(e){return a("div",[t._v(" "+t._s(e.title)+" ")])})):[t._v("-")]]}}])}),a("el-table-column",{attrs:{prop:"status_text",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("cc-cell-switch",{attrs:{value:e.row.status},on:{click:function(a){return t.handleSwitch(e.row.id,e.row.status)}}})]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{plain:"",size:"small",type:"primary"},on:{click:function(a){return t.handleDialog("add",e.row)}}},[t._v("预览 ")]),a("el-button",{attrs:{plain:"",size:"small",type:"warning"},on:{click:function(a){return t.handleDialog("edit",e.row)}}},[t._v("编辑 ")])]}}])})],1),a("el-pagination",{staticClass:"m20",attrs:{background:"",layout:"prev, pager, next,total",total:t.page.total,"page-size":t.page.size,"current-page":t.page.index},on:{"current-change":t.pageCurrentChange,"update:currentPage":function(e){return t.$set(t.page,"index",e)},"update:current-page":function(e){return t.$set(t.page,"index",e)}}}),a("resource-dialog",{attrs:{"dialog-data":t.dialogData}})],1)},r=[],o=(a("96cf"),a("1da1")),l=a("a833"),n=a("bcaf"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"resource-dialog",attrs:{top:"5vh",width:"1200px",title:t.title,visible:t.dialogData.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.dialogData,"show",e)}}},[a("div",[a("el-form",{attrs:{model:t.form,"label-width":"100px",size:"small"}},[a("el-form-item",{attrs:{label:"课节标题："}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.form.template_data.title,callback:function(e){t.$set(t.form.template_data,"title",e)},expression:"form.template_data.title"}})],1),a("el-form-item",{attrs:{label:"课节副标题："}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.form.template_data.sub_title,callback:function(e){t.$set(t.form.template_data,"sub_title",e)},expression:"form.template_data.sub_title"}})],1),a("el-form-item",{attrs:{label:"封面："}},[a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"image/*","show-file-list":!1,"http-request":t.uploadFileCover,"list-type":"picture-card",multiple:""}},[t.form.template_data.cover?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{fit:"contain",src:t.form.template_data.cover}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1)],1),a("el-form-item",{attrs:{label:"状态："}},[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66"},model:{value:t.form.template_data.status,callback:function(e){t.$set(t.form.template_data,"status",e)},expression:"form.template_data.status"}})],1),a("el-form-item",{attrs:{label:"教材模板："}},[a("el-radio-group",{on:{change:t.templateResourceChange},model:{value:t.form.template_data.textbook_template_id,callback:function(e){t.$set(t.form.template_data,"textbook_template_id",e)},expression:"form.template_data.textbook_template_id"}},t._l(t.listTemplateResource,(function(e){return a("el-radio",{staticStyle:{"margin-right":"0"},attrs:{label:e.id,border:""}},[t._v(t._s(e.title))])})),1)],1),a("el-form-item",{attrs:{label:"关联环节："}},[a("div",{staticClass:"segment-card"},t._l(t.form.template_data_details,(function(e,i){return a("div",{staticClass:"card-item"},[a("el-card",{attrs:{shadow:"hover","body-style":{padding:"12px"}}},[a("div",{staticClass:"header"},[a("el-input",{attrs:{placeholder:"标题"},model:{value:e.title,callback:function(a){t.$set(e,"title",a)},expression:"segement.title"}})],1),a("el-divider"),a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"image/*","show-file-list":!1,"http-request":function(e){return t.uploadFile(e,i)},"list-type":"picture-card",multiple:""}},[e.cover?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{fit:"cover",src:e.cover}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1),a("el-divider"),a("el-button",{staticStyle:{width:"100%"},attrs:{type:"default"},on:{click:function(a){return t.segementLink(e,i)}}},[t._v(" 关联内容 ")])],1)],1)})),0)])],1)],1),"view"!==t.dialogData.type?a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.dialogToggle}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogSave}},[t._v("确 定")])],1):t._e(),a("resource-dialog-segment",{attrs:{"dialog-data":t.dialogSegmentData}})],1)},c=[],u=(a("7db0"),a("c740"),a("91b6")),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"resource-dialog-segment",attrs:{top:"5vh",title:t.title,visible:t.dialogData.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.dialogData,"show",e)}}},[a("div",[a("el-form",{attrs:{model:t.form,"label-width":"100px",size:"small"}},[a("el-form-item",{attrs:{label:"播放规则："}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.resources_content.auto_play,callback:function(e){t.$set(t.form.resources_content,"auto_play",e)},expression:"form.resources_content.auto_play"}},t._l(t.dictoryObj.EvaluationSwitchTypeEnum,(function(t){return a("el-option",{key:t.key,attrs:{label:t.value,value:t.key}})})),1)],1),"视频"==t.dialogData.type?a("el-form-item",{attrs:{label:"视频："}},[a("div",{staticClass:"upload-wrapper"},[t.form.resources_content.urls.length?t._l(t.form.resources_content.urls,(function(t){return a("div",{staticClass:"video-wrapper"},[a("video",{staticClass:"upload-video",attrs:{src:t,controls:""}})])})):t._e(),a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"video/mp4","show-file-list":!1,"http-request":t.uploadFile,"list-type":"picture-card",multiple:""}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],2)]):t._e(),"音频"==t.dialogData.type?a("el-form-item",{attrs:{label:"音频："}},[a("div",{staticClass:"upload-wrapper"},[t.form.resources_content.urls.length?t._l(t.form.resources_content.urls,(function(t){return a("div",{staticClass:"video-wrapper"},[a("audio",{staticClass:"upload-audio",attrs:{src:t,controls:""}})])})):t._e(),a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"audio/mp3","show-file-list":!1,"http-request":t.uploadFile,"list-type":"picture-card",multiple:""}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],2)]):t._e()],1)],1),"view"!==t.dialogData.type?a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.dialogToggle}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogSave}},[t._v("确 定")])],1):t._e()])},p=[],m={segment_template_id:"",resources_content:{auto_play:2,urls:[]},score_config_id:""},f={segment_template_id:"",lead_type:"",title:"",cover:""},g={name:"ResourceDialogSegment",mixins:[l["a"],n["a"]],props:{dialogData:{type:Object,default:{show:!1,type:"",index:"",param:{id:0}}}},data:function(){return{title:"",listSegment:[],listTemplateResource:[],SEGMENT_ITEM:f,form:JSON.parse(JSON.stringify(m))}},watch:{"dialogData.show":function(t){t&&this.init()}},methods:{init:function(){console.log(this.dictoryObj),this.getTemplateResourceAll(),"add"==this.dialogData.type?(this.title="新增教材",this.form=JSON.parse(JSON.stringify(m))):"edit"==this.dialogData.type?(this.title="编辑教材",this.form=this.dialogData.param):"view"==this.dialogData.type&&(this.title="查看教材",this.form=this.dialogData.param)},getTemplateResourceAll:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiBasic.getResource({scene:"all"});case 2:a=e.sent,t.listTemplateResource=a.items,"add"==t.dialogData.type&&(t.form.template_data.textbook_template_id=a.items[0].id,t.templateResourceChange(a.items[0].id));case 5:case"end":return e.stop()}}),e)})))()},templateResourceChange:function(t){var e=this.listTemplateResource.findIndex((function(e){return e.id==t})),a=this.listTemplateResource[e].template_data_details;a&&a.length?this.form.template_data_details=a:this.form.template_data_details=JSON.parse(JSON.stringify(m.template_data_details))},uploadFile:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(u["a"])(t.file);case 2:i=a.sent,e.form.resources_content.urls.push(i.url);case 4:case"end":return a.stop()}}),a)})))()},openMedia:function(t){console.log("media url",t),window.open(t,"_blank")},dialogToggle:function(){this.dialogData.show=!this.dialogData.show},dialogSave:function(){var t=this.form;this.$parent.$parent.form.textbook_segment_data_details[this.dialogData.index]={segment_template_id:this.dialogData.param.id,resources_content:{auto_play:t.resources_content.auto_play,urls:t.resources_content.urls},score_config_id:t.resources_content.score_config_id?t.resources_content.score_config_id:""},this.dialogToggle()}}},h=g,_=(a("4a33"),a("2877")),v=Object(_["a"])(h,d,p,!1,null,null,null),b=v.exports,y={template_data:{textbook_template_id:"",title:"",sub_title:"",cover:"",status:1},template_data_details:[{textbook_template_id:"",segment_template_id:"",lead_type:"",title:"",cover:""}],textbook_segment_data_details:[{segment_template_id:"",resources_content:{auto_play:"",urls:[""]},score_config_id:""}]},w={segment_template_id:"",lead_type:"",title:"",cover:""},x={name:"ResourceDialog",components:{ResourceDialogSegment:b},mixins:[l["a"],n["a"]],props:{dialogData:{type:Object,default:{show:!1,type:"",param:{id:0}}}},data:function(){return{title:"",listSegment:[],listTemplateResource:[],SEGMENT_ITEM:w,form:JSON.parse(JSON.stringify(y)),dialogSegmentData:{show:!1}}},watch:{"dialogData.show":function(t){t&&this.init()}},methods:{init:function(){console.log(this.dictoryObj),this.getTemplateResourceAll(),"add"==this.dialogData.type?(this.title="新增教材",this.form=JSON.parse(JSON.stringify(y))):"edit"==this.dialogData.type?(this.title="编辑教材",this.form=this.dialogData.param):"view"==this.dialogData.type&&(this.title="查看教材",this.form=this.dialogData.param)},getTemplateResourceAll:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiBasic.getResource({scene:"all"});case 2:a=e.sent,t.listTemplateResource=a.items,"add"==t.dialogData.type&&(t.form.template_data.textbook_template_id=a.items[0].id,t.templateResourceChange(a.items[0].id));case 5:case"end":return e.stop()}}),e)})))()},templateResourceChange:function(t){var e=this.listTemplateResource.findIndex((function(e){return e.id==t})),a=this.listTemplateResource[e].template_data_details;a&&a.length?this.form.template_data_details=a:this.form.template_data_details=JSON.parse(JSON.stringify(y.template_data_details))},segementLink:function(t,e){var a=this.dictoryObj.SegmentTypeEnum.find((function(e){return e.key==t.lead_type})).value;this.dialogSegmentData={show:!0,type:a,index:e,param:t}},uploadFileCover:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(u["a"])(t.file);case 2:i=a.sent,e.form.template_data.cover=i.url;case 4:case"end":return a.stop()}}),a)})))()},uploadFile:function(t,e){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function i(){var r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,Object(u["a"])(t.file);case 2:r=i.sent,a.form.template_data_details[e].cover=r.url;case 4:case"end":return i.stop()}}),i)})))()},openMedia:function(t){console.log("media url",t),window.open(t,"_blank")},dialogToggle:function(){this.dialogData.show=!this.dialogData.show},dialogSave:function(){var t,e=this,a={template_data:JSON.stringify(this.form.template_data),template_data_details:JSON.stringify(this.form.template_data_details),textbook_segment_data_details:JSON.stringify(this.form.textbook_segment_data_details)};console.log(a),this.dialogData.param.id?(a.id=this.dialogData.param.id,t=this.ApiResource.putResource):t=this.ApiResource.postResource,t(a).then((function(t){e.$message({type:"success",message:"保存成功"}),e.dialogToggle(),e.$parent.getData()}))}}},k=x,D=(a("8480"),Object(_["a"])(k,s,c,!1,null,null,null)),R=D.exports,S={name:"Resource",mixins:[l["a"],n["a"]],components:{ResourceDialog:R},data:function(){return{loading:!0,dialogData:{show:!1},list:[],page:{total:0,index:1,size:10}}},mounted:function(){this.getData()},methods:{handleDialog:function(t,e){this.dialogData={show:!0,type:t,param:e||{id:0}}},getData:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={pageIndex:t.page.index,pageSize:t.page.size},e.next=3,t.ApiResource.getResource(a);case 3:i=e.sent,t.loading=!1,t.list=i.items,t.page.total=i.total;case 7:case"end":return e.stop()}}),e)})))()},pageCurrentChange:function(t){this.page.index=t,this.getData()}}},O=S,C=Object(_["a"])(O,i,r,!1,null,"74d27c08",null);e["default"]=C.exports},e133:function(t,e,a){},ea9c:function(t,e,a){}}]);