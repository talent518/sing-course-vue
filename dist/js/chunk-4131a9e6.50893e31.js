(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4131a9e6"],{"16b1":function(t,e,n){"use strict";var a=n("fce1"),i=n.n(a);i.a},4714:function(t,e,n){"use strict";var a=n("a71a"),i=n.n(a);e["default"]=i.a},"754e":function(t,e,n){t.exports=n.p+"img/avatar.e147bdeb.png"},"7f94":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{class:t.$style.container},[a("el-container",{staticClass:"w100 h100"},[a("el-aside",{staticClass:"app-aside",attrs:{width:t.sideBarWidth}},[a("div",{class:t.$style.logo},[a("img",{attrs:{src:n("f2bd")}})]),a("el-row",{staticClass:"tac",attrs:{span:"24"}},[a("Menu")],1)],1),a("el-container",[a("AppMain")],1)],1)],1)},i=[],s=(n("4160"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),o=n("5530"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"w100 h100",class:t.$style.container},[a("header",{staticClass:"app-header"},[a("el-dropdown",{staticClass:"user-dropdown",attrs:{trigger:"click"}},[a("div",{staticClass:"user-dropdown-link"},[a("img",{staticClass:"avatar",attrs:{src:n("754e")}}),t._v(" "+t._s(t.userInfo.nickname)+" ")]),a("el-dropdown-menu",{staticClass:"user-dropdown-menu",attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{nativeOn:{click:function(e){return t.goOut(e)}}},[a("i",{staticClass:"iconfont icon-logout"}),t._v(" 退出登录 ")])],1)],1)],1),a("transition",{attrs:{name:"el-fade-in-linear",mode:"out-in"}},[a("router-view",{staticClass:"app-main"})],1)],1)},r=[],u=(n("ac1f"),n("5319"),n("2f62")),l=(n("2b61"),{name:"AppMain",data:function(){return{size:"large"}},computed:{userInfo:function(){return this.$store.state.user.userInfo}},methods:{goOut:function(){this.$store.dispatch("user/logout").then((function(){window.location.replace("http://sso.test.changchangenglish.com/site/sso?isLogout=1")}))}}}),m=l,d=(n("16b1"),n("aaee")),p=n("2877");function f(t){this["$style"]=d["default"].locals||d["default"]}var h=Object(p["a"])(m,c,r,!1,f,null,null),b=h.exports,g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-menu dark"},[n("el-menu",{attrs:{"default-active":t.name,myName:t.name,"unique-opened":t.opend}},[t._l(t.menu,(function(t){return[n("MenuItem",{key:t.name,attrs:{item:t,index:t.name}})]}))],2)],1)},v=[],_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.item.hidden?t._e():n("div",[t.item.children&&t.item.children.length?n("el-submenu",{attrs:{index:t.item.name}},[n("template",{slot:"title"},[n("div",{staticClass:"menu-text"},[n("i",{staticClass:"iconfont menu-icon",class:t.myFont(t.item)}),t._v(" "+t._s(t.item.title)+" ")])]),t._l(t.item.children,(function(t){return[n("MenuItem",{key:t.name,attrs:{item:t}})]}))],2):n("el-menu-item",{attrs:{index:t.item.name}},[n("div",{staticClass:"menu-text",on:{click:function(e){return t.goto(t.item.name)}}},[n("i",{staticClass:"iconfont menu-icon",class:t.myFont(t.item)}),t._v(" "+t._s(t.item.title)+" ")])])],1)},y=[],w={Teaching:"icon-file-copy",Basic:"icon-build"},C={name:"MenuItem",props:{item:{type:Object,default:function(){}}},methods:{myFont:function(t){return w[t.menuKey]},goto:function(t){this.$router.push({name:t})}}},O=C,E=Object(p["a"])(O,_,y,!1,null,null,null),x=E.exports,j={computed:Object(o["a"])({},Object(u["c"])("permission",{menu:"routes"}),{name:function(){return this.$route.name}}),data:function(){return{opend:!0,isCollapse:!0,open:["SysManager"]}},components:{MenuItem:x}},k=j,M=Object(p["a"])(k,g,v,!1,null,null,null),$=M.exports,T=n("a417"),I=(n("c24f"),n("bfb4"),n("dc66"),n("1f27"),n("f8b7"),n("1c31"),n("2b74"),n("6c6e"),n("cabd"),n("309e"),"240px"),A={name:"mainPage",data:function(){return{sideBarWidth:I}},components:{AppMain:b,Menu:$},computed:{},provide:function(){return{dictoryObj:this.dictoryObj}},mounted:function(){this.getEnum()},methods:Object(o["a"])({},Object(u["d"])("course",{set_dictoryObj:"set_dictoryObj"}),{getEnum:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={enum:["BooleanEnum","DubbingTypeEnum","ElementTypeEnum","EvaluationSwitchTypeEnum","QuestionMaterialTypeEnum","SegmentLeadTypeEnum","SegmentTypeEnum","CourseTypeEnum"]},a={},e.next=4,T["a"].getEnum(n);case 4:i=e.sent,i.forEach((function(t){a[t.name]=t.items})),t.set_dictoryObj(a);case 7:case"end":return e.stop()}}),e)})))()},handleOpen:function(){},handleClose:function(){}})},B=A,S=n("4714");function F(t){this["$style"]=S["default"].locals||S["default"]}var q=Object(p["a"])(B,a,i,!1,F,null,null);e["default"]=q.exports},a71a:function(t,e,n){t.exports={container:"main_container_q_Cat",logo:"main_logo_Q8g10"}},aaee:function(t,e,n){"use strict";var a=n("dcfa"),i=n.n(a);e["default"]=i.a},dcfa:function(t,e,n){t.exports={container:"AppMain_container_3bwz6",link:"AppMain_link_1PGbu"}},f2bd:function(t,e,n){t.exports=n.p+"img/logo1.f0989317.png"},fce1:function(t,e,n){}}]);