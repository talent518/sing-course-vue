(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71773b7c"],{"4a33":function(t,e,a){"use strict";var i=a("ea9c"),o=a.n(i);o.a},"7db0":function(t,e,a){"use strict";var i=a("23e7"),o=a("b727").find,r=a("44d2"),n=a("ae40"),s="find",l=!0,c=n(s);s in[]&&Array(1)[s]((function(){l=!1})),i({target:"Array",proto:!0,forced:l||!c},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),r(s)},8480:function(t,e,a){"use strict";var i=a("e133"),o=a.n(i);o.a},a833:function(t,e,a){"use strict";a("4de4"),a("7db0"),a("4160"),a("a9e3"),a("b680"),a("ac1f"),a("5319"),a("159b"),a("96cf");var i=a("1da1"),o=a("5530"),r=a("2f62");e["a"]={inject:["ApiBasic","ApiResource","ApiBase","ApiProduction","ApiOther","ApiUser","ApiReport","cloneDeep","ApiMenu","dayjs","ApiOrder","ApiCourse"],computed:Object(o["a"])({},Object(r["c"])("course",{dictoryObj:"dictoryObj"})),data:function(){return{loading:!0,total:1,uid:"",userList:[],clickmodal:!1}},methods:{filterEnum:function(t,e){return this.dictoryObj[t].find((function(t){return t.key==e})).value},openLoading:function(){this.loading=!0},formatNum:function(t){return t=Number(t),(t.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},closeLoading:function(){this.loading=!1},confirmDelMessage:function(t,e,a){this.$confirm(t,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.t0=e,!t.t0){t.next=5;break}return t.next=4,e();case 4:t.t0=t.sent;case 5:i=t.t0,"number"!=typeof i&&a&&a();case 7:case"end":return t.stop()}}),t)}))))},tipMessage:function(t,e){this.$message({showClose:!0,message:t,type:e})},getTreeList:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o=arguments.length>3?arguments[3]:void 0;if(Array.isArray(t))return t.forEach((function(r){if(r.parentId===a)return i.push(r),r.children=[],e.getTreeList(t,r[o],r.children,o)})),i},flatten:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return t.forEach((function(t){t.index=a,i.push(t),t.children&&e.flatten(t.children,a+1,i)})),i},filterAllChild:function(){},remoteMethod:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.ApiUser.getSelectUsers(t);case 2:e.userList=a.sent;case 3:case"end":return a.stop()}}),a)})))()},getTarget:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.filter((function(t){if(t.parentId===e)return t}))}}}},c740:function(t,e,a){"use strict";var i=a("23e7"),o=a("b727").findIndex,r=a("44d2"),n=a("ae40"),s="findIndex",l=!0,c=n(s);s in[]&&Array(1)[s]((function(){l=!1})),i({target:"Array",proto:!0,forced:l||!c},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),r(s)},cd45:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{staticClass:"section-search",attrs:{size:"small",inline:""}},[a("el-form-item",[a("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){return t.handleDialog("add")}}},[t._v("新增教材")])],1)],1),a("my-table",{attrs:{data:t.list}},[a("el-table-column",{attrs:{prop:"id",label:"id"}}),a("el-table-column",{attrs:{prop:"code",label:"编号"}}),a("el-table-column",{attrs:{prop:"title",label:"标题"}}),a("el-table-column",{attrs:{prop:"cover",label:"封面"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.row.cover,fit:"fit"}})]}}])}),a("el-table-column",{attrs:{prop:"title",label:"关联环节"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.template_data_details.length?t._l(e.row.template_data_details,(function(e){return a("div",[t._v(" "+t._s(e.title)+" ")])})):[t._v("-")]]}}])}),a("el-table-column",{attrs:{prop:"status_text",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("cc-cell-switch",{attrs:{value:e.row.status},on:{click:function(a){return t.handleSwitch(e.row.id,e.row.status)}}})]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{plain:"",size:"small",type:"primary"},on:{click:function(a){return t.handleDialog("view",e.row)}}},[t._v("预览 ")]),a("el-button",{attrs:{plain:"",size:"small",type:"warning"},on:{click:function(a){return t.handleDialog("edit",e.row)}}},[t._v("编辑 ")])]}}])})],1),a("el-pagination",{staticClass:"m20",attrs:{background:"",layout:"prev, pager, next,total",total:t.page.total,"page-size":t.page.size,"current-page":t.page.index},on:{"current-change":t.pageCurrentChange,"update:currentPage":function(e){return t.$set(t.page,"index",e)},"update:current-page":function(e){return t.$set(t.page,"index",e)}}}),a("resource-dialog",{attrs:{"dialog-data":t.dialogData}})],1)},o=[],r=(a("96cf"),a("1da1")),n=a("a833"),s=a("bcaf"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"resource-dialog",attrs:{top:"5vh",width:"1200px",title:t.title,visible:t.dialogData.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.dialogData,"show",e)}}},[a("div",[a("el-form",{attrs:{model:t.form,"label-width":"100px",size:"small"}},[a("el-form-item",{attrs:{label:"课节标题："}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.form.textbook_data.title,callback:function(e){t.$set(t.form.textbook_data,"title",e)},expression:"form.textbook_data.title"}})],1),a("el-form-item",{attrs:{label:"课节副标题："}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.form.textbook_data.sub_title,callback:function(e){t.$set(t.form.textbook_data,"sub_title",e)},expression:"form.textbook_data.sub_title"}})],1),a("el-form-item",{attrs:{label:"封面："}},[a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"image/*","show-file-list":!1,"http-request":t.uploadFileCover,"list-type":"picture-card",multiple:""}},[t.form.textbook_data.cover?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{fit:"contain",src:t.form.textbook_data.cover}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1)],1),a("el-form-item",{attrs:{label:"状态："}},[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66"},model:{value:t.form.textbook_data.status,callback:function(e){t.$set(t.form.textbook_data,"status",e)},expression:"form.textbook_data.status"}})],1),a("el-form-item",{attrs:{label:"教材模板："}},[a("el-radio-group",{staticStyle:{"margin-bottom":"-10px"},on:{change:t.templateResourceChange},model:{value:t.form.textbook_data.textbook_template_id,callback:function(e){t.$set(t.form.textbook_data,"textbook_template_id",e)},expression:"form.textbook_data.textbook_template_id"}},t._l(t.listTemplateResource,(function(e){return a("el-radio",{key:e.id,staticStyle:{"margin-right":"10px","margin-left":"0","margin-bottom":"10px"},attrs:{label:e.id,border:""}},[t._v(t._s(e.title))])})),1)],1),a("el-form-item",{attrs:{label:"关联环节："}},[a("div",{staticClass:"segment-card"},t._l(t.form.template_data_details,(function(e,i){return a("div",{staticClass:"card-item"},[a("el-card",{attrs:{shadow:"hover","body-style":{padding:"12px"}}},[a("div",{staticClass:"header"},[a("el-input",{attrs:{disabled:"",placeholder:"标题"},model:{value:e.title,callback:function(a){t.$set(e,"title",a)},expression:"segement.title"}})],1),a("el-divider"),a("el-upload",{staticClass:"upload-item",attrs:{disabled:"",action:"/api/public/upload",accept:"image/*","show-file-list":!1,"http-request":function(e){return t.uploadFile(e,i)},"list-type":"picture-card",multiple:""}},[e.cover?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{fit:"cover",src:e.cover}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1),a("el-divider"),a("el-button",{staticStyle:{width:"100%"},attrs:{type:"default"},on:{click:function(a){return t.segementLink(e,i)}}},[t._v(" 关联内容 ")])],1)],1)})),0)])],1)],1),"view"!==t.dialogData.type?a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.dialogToggle}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogSave}},[t._v("确 定")])],1):t._e(),a("resource-dialog-segment",{attrs:{"dialog-data":t.dialogSegmentData}})],1)},c=[],u=(a("7db0"),a("c740"),a("91b6")),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"resource-dialog-segment",attrs:{top:"5vh",title:t.title,visible:t.dialogData.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.dialogData,"show",e)}}},[a("div",[t.form?a("el-form",{attrs:{model:t.form,"label-width":"100px",size:"small"}},["测评"==t.dialogData.segementType?[a("el-form-item",{attrs:{label:"评分规则："}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.score_config_id,callback:function(e){t.$set(t.form,"score_config_id",e)},expression:"form.score_config_id"}},t._l(t.listScore,(function(t){return a("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:"练习题："}},[a("el-select",{attrs:{multiple:"",filterable:"",placeholder:"请选择"},on:{change:t.cehnayng},model:{value:t.form.resources_content.question_ids,callback:function(e){t.$set(t.form.resources_content,"question_ids",e)},expression:"form.resources_content.question_ids"}},t._l(t.listQuestion,(function(t){return a("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})})),1)],1)]:a("el-form-item",{attrs:{label:"播放规则："}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.resources_content.auto_play,callback:function(e){t.$set(t.form.resources_content,"auto_play",e)},expression:"form.resources_content.auto_play"}},t._l(t.dictoryObj.EvaluationSwitchTypeEnum,(function(t){return a("el-option",{key:t.key,attrs:{label:t.value,value:t.key}})})),1)],1),"视频"==t.dialogData.segementType?a("el-form-item",{attrs:{label:"视频："}},[a("div",{staticClass:"upload-wrapper"},[a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"video/mp4","show-file-list":!1,"http-request":t.uploadFile,"list-type":"picture-card",multiple:""}},[t.form.resources_content.urls.length?t._l(t.form.resources_content.urls,(function(t){return a("div",{staticClass:"video-wrapper"},[a("video",{staticClass:"upload-video",attrs:{src:t,controls:""}})])})):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],2)],1)]):t._e(),"音频"==t.dialogData.segementType?a("el-form-item",{attrs:{label:"音频："}},[a("div",{staticClass:"upload-wrapper"},[t.form.resources_content.urls.length?t._l(t.form.resources_content.urls,(function(t){return a("div",{staticClass:"video-wrapper"},[a("audio",{staticClass:"upload-audio",attrs:{src:t,controls:""}})])})):t._e(),a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"audio/mp3","show-file-list":!1,"http-request":t.uploadFile,"list-type":"picture-card",multiple:""}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],2)]):t._e()],2):t._e()],1),"view"!==t.dialogData.type?a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.dialogToggle}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogSave}},[t._v("确 定")])],1):t._e()])},p=[],m={segment_template_id:"",resources_content:{auto_play:2,urls:[]}},g={segment_template_id:"",score_config_id:"",resources_content:{switch_type:1,question_ids:[]}},f={name:"ResourceDialogSegment",mixins:[n["a"],s["a"]],props:{dialogData:{type:Object,default:{show:!1,type:"",index:"",param:{id:0}}}},data:function(){return{title:"",listScore:[],listQuestion:[],form:{resources_content:{}}}},watch:{"dialogData.show":function(t){t&&this.init()}},methods:{cehnayng:function(t){console.log(t)},init:function(){this.getQuestionAll(),this.getScoreAll(),"add"==this.dialogData.type?(this.title="新增教材","测评"==this.dialogData.segementType?this.form=JSON.parse(JSON.stringify(g)):this.form=JSON.parse(JSON.stringify(m))):"edit"==this.dialogData.type?(this.title="编辑教材",this.form.resources_content=this.dialogData.param,"测评"==this.dialogData.segementType?(this.form.score_config_id=this.dialogData.param.segment_template_detail.segment_detail.resources_content.switch_type,this.form.resources_content.question_ids=JSON.parse(JSON.stringify(this.dialogData.param.segment_template_detail.segment_detail.resources_content.question_ids))):(this.form.resources_content.urls=this.dialogData.param.segment_template_detail.segment_detail.resources_content.urls,this.form.resources_content.auto_play=this.dialogData.param.segment_template_detail.segment_detail.resources_content.auto_play),console.log(this.dialogData.param.segment_template_detail.segment_detail.resources_content)):"view"==this.dialogData.type&&(this.title="查看教材",this.form.resources_content=this.dialogData.param)},getQuestionAll:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiCourse.getVoiceQuestions({scene:"all",status:1});case 2:a=e.sent,t.listQuestion=a.items;case 4:case"end":return e.stop()}}),e)})))()},getScoreAll:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiBasic.getScoreAll();case 2:a=e.sent,t.listScore=a;case 4:case"end":return e.stop()}}),e)})))()},uploadFile:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(u["a"])(t.file);case 2:i=a.sent,e.form.resources_content.urls.push(i.url);case 4:case"end":return a.stop()}}),a)})))()},openMedia:function(t){console.log("media url",t),window.open(t,"_blank")},dialogToggle:function(){this.dialogData.show=!this.dialogData.show},dialogSave:function(){var t=this.form,e={segment_template_id:this.dialogData.param.segment_template_id,score_config_id:t.score_config_id?t.score_config_id:"",resources_content:{}};if("测评"==this.dialogData.segementType)e.resources_content={switch_type:1,question_ids:t.resources_content.question_ids};else{if(!t.resources_content.auto_play)return this.$message({type:"error",message:"请选择播放规则!"}),!1;e.resources_content={auto_play:t.resources_content.auto_play,urls:t.resources_content.urls}}this.$parent.$parent.form.textbook_segment_data_details[this.dialogData.index]=e,this.dialogToggle()}}},_=f,h=(a("4a33"),a("2877")),b=Object(h["a"])(_,d,p,!1,null,null,null),v=b.exports,y={textbook_data:{textbook_template_id:"",title:"",sub_title:"",cover:"",status:1},template_data_details:[{textbook_template_id:"",segment_template_id:"",lead_type:"",title:"",cover:"",id:""}],textbook_segment_data_details:[{segment_template_id:"",score_config_id:"",resources_content:{auto_play:"",urls:[]}}]},x={segment_template_id:"",lead_type:"",title:"",cover:""},w={name:"ResourceDialog",components:{ResourceDialogSegment:v},mixins:[n["a"],s["a"]],props:{dialogData:{type:Object,default:{show:!1,type:"",param:{id:0}}}},data:function(){return{title:"",listSegment:[],listTemplateResource:[],SEGMENT_ITEM:x,form:JSON.parse(JSON.stringify(y)),dialogSegmentData:{show:!1}}},watch:{"dialogData.show":function(t){t&&this.init()}},methods:{init:function(){var t=this;this.getTemplateResourceAll().then((function(e){"add"==t.dialogData.type?(t.title="新增教材",t.form=JSON.parse(JSON.stringify(y))):"edit"==t.dialogData.type?(t.title="编辑教材",t.form.textbook_data=t.dialogData.param,t.templateResourceChange(t.form.textbook_data.textbook_template_detail.id)):"view"==t.dialogData.type&&(t.title="查看教材",t.form.textbook_data=t.dialogData.param,t.templateResourceChange(t.form.textbook_data.textbook_template_detail.id))}))},getTemplateResourceAll:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.ApiBasic.getResource({scene:"all",status:1});case 2:a=e.sent,t.listTemplateResource=a.items,"add"==t.dialogData.type&&(t.form.textbook_template_id=a.items[0].id,t.form.textbook_data.textbook_template_id=a.items[0].id,t.templateResourceChange(a.items[0].id));case 5:case"end":return e.stop()}}),e)})))()},templateResourceChange:function(t){var e=this.listTemplateResource.findIndex((function(e){return e.id==t})),a=this.listTemplateResource[e].template_data_details;a&&a.length?this.form.template_data_details=a:this.form.template_data_details=JSON.parse(JSON.stringify(y.template_data_details))},segementLink:function(t,e){var a=this.dictoryObj.SegmentTypeEnum.find((function(e){return e.key==t.lead_type})).value;this.dialogSegmentData={show:!0,type:this.dialogData.type,segementType:a,index:e,param:t}},uploadFileCover:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(u["a"])(t.file);case 2:i=a.sent,e.form.textbook_data.cover=i.url;case 4:case"end":return a.stop()}}),a)})))()},uploadFile:function(t,e){var a=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){var o;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,Object(u["a"])(t.file);case 2:o=i.sent,a.form.template_data_details[e].cover=o.url;case 4:case"end":return i.stop()}}),i)})))()},openMedia:function(t){console.log("media url",t),window.open(t,"_blank")},dialogToggle:function(){this.dialogData.show=!this.dialogData.show},dialogSave:function(){var t=this;if(!this.form.textbook_data.title)return this.$message({type:"error",message:"请输入标题!"}),!1;if(!this.form.textbook_data.cover)return this.$message({type:"error",message:"请上传封面!"}),!1;var e,a={textbook_data:this.form.textbook_data,template_data_details:this.form.template_data_details,textbook_segment_data_details:this.form.textbook_segment_data_details},i={textbook_data:JSON.stringify(this.form.textbook_data),template_data_details:JSON.stringify(this.form.template_data_details),textbook_segment_data_details:JSON.stringify(this.form.textbook_segment_data_details)};console.log(a),this.dialogData.param.id?(i.id=this.dialogData.param.id,e=this.ApiResource.putResource):e=this.ApiResource.postResource,e(i).then((function(e){t.$message({type:"success",message:"保存成功"}),t.dialogToggle(),t.$parent.getData()}))}}},k=w,D=(a("8480"),Object(h["a"])(k,l,c,!1,null,null,null)),S=D.exports,R={name:"Resource",mixins:[n["a"],s["a"]],components:{ResourceDialog:S},data:function(){return{loading:!0,dialogData:{show:!1},list:[],page:{total:0,index:1,size:10}}},mounted:function(){this.getData()},methods:{handleDialog:function(t,e){this.dialogData={show:!0,type:t,param:e||{id:0}}},handleSwitch:function(t,e){var a,i=this,o="";0===e?(a="enable",o="启用"):1===e&&(a="disable",o="停用"),this.$confirm("确定 ".concat(o," 教材？"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){i.loading=!0;var e={id:t,status:a};i.ApiResource.postResourceStatus(e).then((function(t){i.$message({type:"success",message:"修改成功!"}),i.getData(),i.loading=!1})).catch((function(t){console.log(t),i.loading=!1}))})).catch((function(){i.$message({type:"info",message:"已取消"})}))},getData:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={pageIndex:t.page.index,pageSize:t.page.size},e.next=3,t.ApiResource.getResource(a);case 3:i=e.sent,t.loading=!1,t.list=i.items,t.page.total=i.total;case 7:case"end":return e.stop()}}),e)})))()},pageCurrentChange:function(t){this.page.index=t,this.getData()}}},O=R,C=Object(h["a"])(O,i,o,!1,null,"7a16284d",null);e["default"]=C.exports},e133:function(t,e,a){},ea9c:function(t,e,a){}}]);