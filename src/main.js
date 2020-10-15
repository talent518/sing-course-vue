import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueDND from "awe-dnd";

import "@assets/style/index.scss"; // eslint-disable-line
import "@/plugins";
import "@util/filter";
import "@util/directive";
import "@/permission"
import vueTime from "@util/time";
import myTable from "@components/myTable";
import myForm from "@components/myForm";
import myBreadcrumb from "@components/breadcrumb/breadcrumb";

Vue.component("myTable", myTable);
Vue.component("myForm", myForm);
Vue.component("myBreadcrumb", myBreadcrumb);
Vue.use(vueTime).use(VueDND);


import CcNumberRange from "@components/cc/CcNumberRange"; // 数字区间 组件
import CcFormUpload from "@components/cc/CcFormUpload"; // 表单上传图片 组件
import CcCellSwitch from "@components/cc/CcCellSwitch"; // 表格内开关 组件
import CcCellAudio from "@components/cc/CcCellAudio"; // 表格内音频 组件
import CcCellVideo from "@components/cc/CcCellVideo"; // 表格内视频 组件
import CcCellImage from "@components/cc/CcCellImage"; // 表格内图片 组件
import CcCheckBox from "@components/cc/CcCheckBox"; // 多选

Vue.component("CcNumberRange", CcNumberRange);
Vue.component("CcFormUpload", CcFormUpload);
Vue.component("CcCellSwitch", CcCellSwitch);
Vue.component("CcCellAudio", CcCellAudio);
Vue.component("CcCellVideo", CcCellVideo);
Vue.component("CcCellImage", CcCellImage);
Vue.component("CcCheckBox", CcCheckBox);

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
