(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7795dc61"],{"0879":function(e,t,a){},"0ee2":function(e,t,a){},"311b":function(e,t,a){},"6cec":function(e,t,a){"use strict";var r=a("311b"),n=a.n(r);n.a},"879d":function(e,t,a){"use strict";var r=a("0ee2"),n=a.n(r);n.a},a434:function(e,t,a){"use strict";var r=a("23e7"),n=a("23cb"),i=a("a691"),o=a("50c4"),l=a("7b0b"),s=a("65f0"),c=a("8418"),u=a("1dde"),d=a("ae40"),p=u("splice"),m=d("splice",{ACCESSORS:!0,0:0,1:2}),b=Math.max,f=Math.min,g=9007199254740991,h="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!p||!m},{splice:function(e,t){var a,r,u,d,p,m,v=l(this),_=o(v.length),y=n(e,_),w=arguments.length;if(0===w?a=r=0:1===w?(a=0,r=_-y):(a=w-2,r=f(b(i(t),0),_-y)),_+a-r>g)throw TypeError(h);for(u=s(v,r),d=0;d<r;d++)p=y+d,p in v&&c(u,d,v[p]);if(u.length=r,a<r){for(d=y;d<_-r;d++)p=d+r,m=d+a,p in v?v[m]=v[p]:delete v[m];for(d=_;d>_-r+a;d--)delete v[d-1]}else if(a>r)for(d=_-r;d>y;d--)p=d+r-1,m=d+a-1,p in v?v[m]=v[p]:delete v[m];for(d=0;d<a;d++)v[d+y]=arguments[d+2];return v.length=_-r+a,u}})},bec6:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"score-dialog",attrs:{top:"5vh",title:e.title,visible:e.dialogData.show,"close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(t){return e.$set(e.dialogData,"show",t)}}},[a("div",[a("el-form",{attrs:{model:e.form,"label-width":"100px",size:"small"}},[a("el-form-item",{attrs:{label:"评分标准名"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"评分区间"}},[a("div",{staticClass:"score-item"},[a("score-star",{attrs:{star:"1"}}),a("cc-number-range",{attrs:{min:"0",max:"100",maxlength:"3"},model:{value:e.form.rule[0],callback:function(t){e.$set(e.form.rule,0,t)},expression:"form.rule[0]"}})],1),a("div",{staticClass:"score-item"},[a("score-star",{attrs:{star:"2"}}),a("cc-number-range",{attrs:{min:"0",max:"100",maxlength:"3"},model:{value:e.form.rule[1],callback:function(t){e.$set(e.form.rule,1,t)},expression:"form.rule[1]"}})],1),a("div",{staticClass:"score-item"},[a("score-star",{attrs:{star:"3"}}),a("cc-number-range",{attrs:{min:"0",max:"100",maxlength:"3"},model:{value:e.form.rule[2],callback:function(t){e.$set(e.form.rule,2,t)},expression:"form.rule[2]"}})],1)]),a("el-form-item",{attrs:{label:"评价语音"}},e._l(e.form.evaluate_voice,(function(t,r){return a("div",{staticClass:"score-item"},[a("score-star",{attrs:{star:r+1}}),a("div",{staticClass:"audio-item"},[a("el-upload",{staticClass:"upload-item",attrs:{"show-file-list":!1,action:"/api/public/upload","list-type":"text","http-request":function(t){return e.uploadFile(t,"evaluate_voice",r)}}},[a("el-button",[a("i",{staticClass:"iconfont icon-cloud-upload"}),e._v(" 上传音频")])],1),e.form.evaluate_voice[r]?a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return e.openMedia(e.form.evaluate_voice[r])}}},[a("i",{staticClass:"iconfont icon-play-circle"}),e._v(" 播放音频 ")]):e._e()],1)],1)})),0),a("el-form-item",{attrs:{label:"重试录音"}},[a("div",{staticClass:"audio-item"},[a("el-upload",{staticClass:"upload-item",attrs:{action:"/api/public/upload",accept:"audio/mp3","show-file-list":!1,"list-type":"text","http-request":function(t){return e.uploadFile(t,"retry_voice")}}},[a("el-button",[a("i",{staticClass:"iconfont icon-cloud-upload"}),e._v(" 上传音频")])],1),e.form.retry_voice?a("el-button",{attrs:{disabled:!e.form.retry_voice},on:{click:function(t){return e.openMedia(e.form.retry_voice)}}},[a("i",{staticClass:"iconfont icon-play-circle"}),e._v(" 播放音频 ")]):e._e()],1)])],1)],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.dialogToggle}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.dialogSave}},[e._v("确 定")])],1)])},n=[],i=(a("a434"),a("96cf"),a("1da1")),o=a("a833"),l=a("bcaf"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-rate",{staticClass:"score-star",style:"width: "+e.width,attrs:{value:Number(e.star),max:3,disabled:"","disabled-void-color":"#ffffff","text-color":"#ff9900"}})},c=[],u=(a("a9e3"),{name:"ScoreStar",props:{star:{type:[Number,String],default:3},width:{type:String,default:"auto"}}}),d=u,p=(a("6cec"),a("2877")),m=Object(p["a"])(d,s,c,!1,null,null,null),b=m.exports,f=a("91b6"),g=(a("2b61"),{title:"",rule:[[0,30],[31,80],[80,100]],evaluate_voice:[0,0,0],retry_voice:""}),h={name:"ScoreDialog",mixins:[o["a"],l["a"]],components:{ScoreStar:b},props:{dialogData:{type:Object,default:{show:!1,param:{id:0}}}},data:function(){return{title:"",form:JSON.parse(JSON.stringify(g))}},watch:{"dialogData.show":function(e){e&&this.init()}},methods:{init:function(){this.dialogData.param.id?(this.title="编辑",this.form=this.dialogData.param):(this.title="新增",this.form=JSON.parse(JSON.stringify(g)))},uploadFile:function(e,t,a){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(f["a"])(e.file);case 2:i=n.sent,"retry_voice"==t?r.form.retry_voice=i.url:"evaluate_voice"==t&&r.form.evaluate_voice.splice(a,1,i.url);case 4:case"end":return n.stop()}}),n)})))()},openMedia:function(e){window.open(e,"_blank")},dialogToggle:function(){this.dialogData.show=!this.dialogData.show},dialogSave:function(){var e=this,t={title:this.form.title,rule:JSON.stringify(this.form.rule),evaluate_voice:JSON.stringify(this.form.evaluate_voice),retry_voice:this.form.retry_voice};this.ApiBasic.postScore(t).then((function(t){e.$message.success("保存成功"),e.dialogToggle(),e.$parent.getData()}))}}},v=h,_=(a("ef99"),Object(p["a"])(v,r,n,!1,null,null,null));t["a"]=_.exports},dd96:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"exercises"},[a("el-row",[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"titleFlex"},[a("div",{staticClass:"title"},[e._v("配音标题：")]),a("div",[a("el-input",{model:{value:e.searchObj.title,callback:function(t){e.$set(e.searchObj,"title",t)},expression:"searchObj.title"}})],1)])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"titleFlex"},[a("div",[e._v("标签：")]),a("div",[a("el-input",{attrs:{multiple:"",placeholder:"请选择标签"},model:{value:e.searchObj.title,callback:function(t){e.$set(e.searchObj,"title",t)},expression:"searchObj.title"}})],1)])]),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1),a("el-form",{staticClass:"section-search",attrs:{size:"small",inline:""}},[a("el-form-item",[a("el-button",{attrs:{type:"success",plain:""},on:{click:e.handleAdd}},[e._v("添加习题")])],1)],1),a("my-table",{attrs:{data:e.list}},[e._l(e.cols,(function(e){return a("el-table-column",{key:e.prop,attrs:{prop:e.prop,label:e.name}})})),a("el-table-column",{attrs:{prop:"title",label:"配音素材"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[a("el-image",{attrs:{src:t.material_url}})]}}])}),a("el-table-column",{attrs:{label:"原生录音",prop:"ori_sound"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.openMediaBy(r)}}},[e._v("播放录音 ")])]}}])}),a("el-table-column",{attrs:{prop:"dubbing_content",label:"配音内容"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("div",{domProps:{innerHTML:e._s(r.dubbing_content)}})]}}])}),a("el-table-column",{attrs:{prop:"dubbing_answer",label:"配音答案"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("div",{domProps:{innerHTML:e._s(r.dubbing_answer)}})]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{plain:"",size:"small",type:"warning"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑 ")]),a("el-button",{attrs:{plain:"",size:"small",type:"danger"},on:{click:function(a){return e.handleDelete(t.row.id)}}},[e._v("删除 ")])]}}])})],2),a("el-pagination",{staticClass:"m20",attrs:{background:"",layout:"prev, pager, next,total",total:e.searchObj.total,"page-size":e.searchObj.pageSize,"current-page":e.searchObj.pageIndex},on:{"current-change":e.pageCurrentChange,"update:currentPage":function(t){return e.$set(e.searchObj,"pageIndex",t)},"update:current-page":function(t){return e.$set(e.searchObj,"pageIndex",t)}}}),e.dialogFormVisible?a("el-dialog",{attrs:{title:"制作兑换码",visible:e.dialogFormVisible,"close-on-click-modal":e.clickmodal},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("my-form",{ref:"myForm",staticClass:"textLeft",attrs:{rules:e.rules,model:e.model,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"配音标题：",prop:"title"}},[a("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.model.title,callback:function(t){e.$set(e.model,"title",t)},expression:"model.title"}})],1),a("el-form-item",{attrs:{label:"素材类型："}},[a("el-select",{attrs:{placeholder:"请选择素材",clearable:""},model:{value:e.model.material_type,callback:function(t){e.$set(e.model,"material_type",t)},expression:"model.material_type"}},e._l(e.dictoryObj.QuestionMaterialTypeEnum,(function(e){return a("el-option",{key:e.key,attrs:{label:e.value,value:e.key}})})),1)],1),a("el-form-item",{attrs:{label:"配音素材"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/public/upload","show-file-list":!1,multiple:e.multiple,"on-success":e.handleAvatarSuccess,accept:".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF","http-request":function(t){return e.uploadFile(t,"1")}}},[a("div",{staticClass:"imageWrap"},[e.model.material_url?a("img",{staticClass:"avatar",attrs:{src:e.model.material_url}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])])],1),a("el-form-item",{attrs:{label:"原声录音：",prop:"ori_sound"}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"/api/public/upload",accept:".MP3,.APE,.AAC,.WAV,.mp3,.ape,.aac,.wav","show-file-list":!1,"http-request":function(t){return e.uploadFile(t,"2")}}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("上传音频")])],1),e.model.ori_sound?a("el-button",{attrs:{size:"small",type:"success"},on:{click:e.openMedia}},[e._v("播放音频 ")]):e._e()],1),a("el-form-item",{attrs:{label:"配音类型：",prop:"dubbing_type"}},[a("el-select",{attrs:{placeholder:"请选择配音类型",clearable:""},model:{value:e.model.dubbing_type,callback:function(t){e.$set(e.model,"dubbing_type",t)},expression:"model.dubbing_type"}},e._l(e.dictoryObj.DubbingTypeEnum,(function(e){return a("el-option",{key:e.key,attrs:{label:e.value,value:e.key}})})),1)],1),a("el-form-item",{attrs:{label:"配音内容：",prop:"dubbing_content"}},[e.dialogFormVisible?a("editor-detail",{attrs:{lookData:e.desc}}):e._e()],1),a("el-form-item",{attrs:{label:"配音答案：",prop:"dubbing_answer"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.model.dubbing_answer,callback:function(t){e.$set(e.model,"dubbing_answer",t)},expression:"model.dubbing_answer"}})],1),a("el-button",{attrs:{type:"success"},on:{click:function(t){return e.save("myForm")}}},[e._v("保存")])],1)],1):e._e()],1)},n=[],i=(a("4160"),a("ac1f"),a("841c"),a("159b"),a("5530")),o=(a("96cf"),a("1da1")),l=a("a833"),s=a("bcaf"),c=a("bec6"),u=a("91b6"),d=a("2d80"),p={name:"Exercises",mixins:[l["a"],s["a"]],components:{ScoreDialog:c["a"],editorDetail:d["a"]},data:function(){return{searchObj:{title:"",total:0,pageIndex:1,pageSize:5},model:{title:"",material_type:"",material_url:"",ori_sound:"",dubbing_type:"",dubbing_content:"",dubbing_answer:""},desc:{detail:""},cols:[{name:"编号",prop:"code"},{name:"配音标题",prop:"title"},{name:"素材类型",prop:"material_typeV"},{name:"配音类型",prop:"dubbing_typeV"}],cols1:[{name:"配音内容",prop:"ori_sound"},{name:"配音答案",prop:""}],list:[],state:0,rules:{title:[{required:!0,message:"请输入配音标题",trigger:["blur","change"]}],dubbing_type:[{required:!0,message:"请输入配音类型",trigger:["blur","change"]}],ori_sound:[{required:!0,message:"请上传原声配音",trigger:["blur","change"]}],dubbing_content:[{required:!0,message:"请填写配音内容",trigger:["blur","change"]}],dubbing_answer:[{required:!0,message:"请填写配音答案",trigger:["blur","change"]}]},multiple:!1,isShowOpen:!1}},methods:{uploadFile:function(e,t,a){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(u["a"])(e.file);case 2:n=a.sent,1==t?r.model.material_url=n.url:2==t&&(r.model.ori_sound=n.url);case 4:case"end":return a.stop()}}),a)})))()},save:function(e){var t=this;this.$refs[e].$children[0].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(a){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=14;break}if(r="",0!=t.state){e.next=8;break}return e.next=5,t.addQuestion();case 5:r=e.sent,e.next=11;break;case 8:return e.next=10,t.editQuestion();case 10:r=e.sent;case 11:"number"!==typeof r&&(t.close(),t.search()),e.next=16;break;case 14:return console.log("error submit!!"),e.abrupt("return",!1);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},openMedia:function(){window.open(this.model.ori_sound,"_blank")},openMediaBy:function(e){var t=e.ori_sound;window.open(t,"_blank")},handleAvatarSuccess:function(e,t){return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},addQuestion:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.model,a.dubbing_content=e.desc.detail,t.next=4,e.ApiCourse.postVoiceQuestions(a);case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}}),t)})))()},editQuestion:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.model,a.dubbing_content=e.desc.detail,t.next=4,e.ApiCourse.putVoiceQuestions(a);case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}}),t)})))()},getQuestion:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.dictoryObj.QuestionMaterialTypeEnum,r=e.dictoryObj.DubbingTypeEnum,t.next=4,e.ApiCourse.getVoiceQuestions(e.searchObj);case 4:n=t.sent,n.items.forEach((function(e){a.forEach((function(t){e.material_type==t.key&&(e.material_typeV=t.value)})),r.forEach((function(t){e.dubbing_type==t.key&&(e.dubbing_typeV=t.value)}))})),e.list=n.items,e.searchObj.total=n.total;case 8:case"end":return t.stop()}}),t)})))()},handleAdd:function(){this.state=0,this.resetData(),this.open()},resetData:function(){this.model={title:"",material_type:"",material_url:"",ori_sound:"",dubbing_type:"",dubbing_content:"",dubbing_answer:""},this.desc={detail:""}},search:function(){this.searchObj.title="",this.searchObj.pageIndex=1,this.getQuestion()},pageCurrentChange:function(e){this.searchObj.index=e,this.getQuestion()},handleEdit:function(e){Object.assign(this.model,e);var t=Object(i["a"])({},this.model).dubbing_content;this.desc={detail:t},this.open(),this.state=1},delQuestion:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.ApiCourse.delVoiceQuestions(e);case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}}),a)})))()},handleDelete:function(e){var t=this;this.$confirm("确定要删除该问题吗","删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.delQuestion(e);case 2:r=a.sent,console.log(r);case 4:case"end":return a.stop()}}),a)}))))}},mounted:function(){this.getQuestion()}},m=p,b=(a("879d"),a("2877")),f=Object(b["a"])(m,r,n,!1,null,null,null);t["default"]=f.exports},ef99:function(e,t,a){"use strict";var r=a("0879"),n=a.n(r);n.a}}]);